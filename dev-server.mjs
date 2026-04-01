// 로컬 개발 서버: 정적 파일 + /api/* 라우트 처리
// 실행: node dev-server.mjs  (.env 자동 로딩)
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4000;

// ── .env 자동 로딩 ──────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
  console.log('✅ .env loaded');
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
};

async function loadHandler(name) {
  // Vercel handler를 ESM으로 동적 import
  const mod = await import(`./api/${name}.js?t=${Date.now()}`);
  return mod.default;
}

// Vercel req/res 어댑터 (Node IncomingMessage → Vercel-like req)
function makeVercelReq(req, body) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  return {
    method: req.method,
    headers: req.headers,
    query: Object.fromEntries(url.searchParams.entries()),
    body,
    url: req.url,
  };
}

function makeVercelRes(nodeRes) {
  const res = {
    _headers: {},
    _status: 200,
    status(code) { this._status = code; return this; },
    setHeader(k, v) { nodeRes.setHeader(k, v); return this; },
    end(body) {
      nodeRes.writeHead(this._status);
      nodeRes.end(body || '');
    },
    json(data) {
      nodeRes.setHeader('Content-Type', 'application/json');
      nodeRes.writeHead(this._status);
      nodeRes.end(JSON.stringify(data));
    },
  };
  return res;
}

const server = http.createServer(async (req, nodeRes) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // ── API 라우트 ──
  if (url.pathname.startsWith('/api/')) {
    const name = url.pathname.slice(5).replace(/\/$/, '');
    let body = '';
    req.on('data', d => body += d);
    await new Promise(r => req.on('end', r));

    try {
      const handler = await loadHandler(name);
      const vReq = makeVercelReq(req, body ? JSON.parse(body) : undefined);
      const vRes = makeVercelRes(nodeRes);
      await handler(vReq, vRes);
    } catch(e) {
      nodeRes.writeHead(500, { 'Content-Type': 'application/json' });
      nodeRes.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── 정적 파일 ──
  let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!fs.existsSync(filePath)) filePath = path.join(__dirname, 'index.html');

  const ext = path.extname(filePath);
  nodeRes.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  nodeRes.writeHead(200);
  fs.createReadStream(filePath).pipe(nodeRes);
});

server.listen(PORT, () => {
  console.log(`\n🚀 Dev server: http://localhost:${PORT}`);
  console.log('   API routes: /api/add-ingredient, /api/add-method');
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('   ⚠️  ANTHROPIC_API_KEY 환경변수 없음 — API 호출 실패');
  }
});
