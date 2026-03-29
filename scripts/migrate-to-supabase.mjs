// 로컬 DB (index.html) → Supabase 전체 마이그레이션
// 미네랄 누락 항목은 Claude Haiku로 일괄 보완
// 실행: ANTHROPIC_API_KEY=sk-... node scripts/migrate-to-supabase.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL  = 'https://ojtgkvtzmedsbhqkbhwe.supabase.co';
const SUPABASE_ANON = 'sb_publishable_6c8GjizbhYKUBzQywsoUhA_3KYN25-2';
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

// ── 1. index.html에서 DB 객체 추출 ───────────────────────────────────────────
function extractDB(html) {
  const marker = 'const DB = {';
  const start  = html.indexOf(marker);
  if (start === -1) throw new Error('const DB = { 를 찾을 수 없습니다');

  let depth = 0, i = start + marker.length - 1;
  for (; i < html.length; i++) {
    if (html[i] === '{') depth++;
    else if (html[i] === '}') { if (--depth === 0) break; }
  }
  return new Function('return ' + html.slice(start + 'const DB = '.length, i + 1))();
}

// ── 2. 로컬 DB 엔트리 → Supabase 행 변환 ────────────────────────────────────
function toRow(name, d) {
  return {
    name,
    cat:           d.cat || 'processed',
    emoji:         d.emoji || '🍽️',
    default_g:     Math.round(d.defaultG || 100),
    protein:       d.comp?.protein  ?? 0,
    fat:           d.comp?.fat      ?? 0,
    carbs:         d.comp?.carbs    ?? 0,
    water:         d.comp?.water    ?? 0,
    fiber:         d.comp?.fiber    ?? 0,
    sodium:        d.vit?.sodium    ?? null,
    potassium:     d.vit?.potassium ?? null,
    calcium:       d.vit?.calcium   ?? null,
    iron:          d.vit?.iron      ?? null,
    vit_c:         d.vit?.C        ?? null,
    vit_a:         d.vit?.A        ?? null,
    vit_b12:       d.vit?.B12      ?? null,
    flavor_umami:  d.flavor?.umami  ?? 0,
    flavor_sweet:  d.flavor?.sweet  ?? 0,
    flavor_salty:  d.flavor?.salty  ?? 0,
    flavor_sour:   d.flavor?.sour   ?? 0,
    flavor_bitter: d.flavor?.bitter ?? 0,
    compounds:     Array.isArray(d.compounds) ? d.compounds : [],
    amino_acids:   Array.isArray(d.amino)     ? d.amino     : [],
    source:        'local_db',
  };
}

// ── 3. Claude Haiku로 미네랄 데이터 보완 (배치 20개) ─────────────────────────
async function fillMinerals(nameList) {
  const prompt = `For each food ingredient, provide mineral values per 100g using USDA FoodData Central.
Return ONLY valid JSON (no markdown):
{
  "ingredient_name": {"sodium": <mg>, "potassium": <mg>, "calcium": <mg>, "iron": <mg>}
}
Ingredients: ${JSON.stringify(nameList)}`;

  const res  = await fetch('https://api.anthropic.com/v1/messages', {
    method:  'POST',
    headers: { 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body:    JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 3000, messages: [{ role: 'user', content: prompt }] }),
  });
  const text  = (await res.json()).content?.[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try { return JSON.parse(match[0]); } catch { return {}; }
}

// ── 4. Supabase batch_upsert_ingredients RPC 호출 ────────────────────────────
async function upsertChunk(rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/batch_upsert_ingredients`, {
    method:  'POST',
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json' },
    body:    JSON.stringify({ items: rows }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!ANTHROPIC_KEY) { console.error('❌ ANTHROPIC_API_KEY 환경변수 필요'); process.exit(1); }

  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const DB   = extractDB(html);
  const entries = Object.entries(DB);
  console.log(`📦 로컬 DB: ${entries.length}개 식재료\n`);

  // 행 변환
  const rows = entries.map(([name, d]) => toRow(name, d));

  // 미네랄 누락 항목 파악
  const needsMinerals = rows.filter(r => r.sodium == null || r.potassium == null || r.calcium == null || r.iron == null);
  console.log(`🔬 미네랄 보완 필요: ${needsMinerals.length}개`);

  // 배치 20개씩 Claude 호출
  const MINERAL_BATCH = 20;
  for (let i = 0; i < needsMinerals.length; i += MINERAL_BATCH) {
    const batch = needsMinerals.slice(i, i + MINERAL_BATCH);
    const total = Math.ceil(needsMinerals.length / MINERAL_BATCH);
    process.stdout.write(`  [${Math.floor(i/MINERAL_BATCH)+1}/${total}] ${batch.map(r=>r.name).slice(0,3).join(', ')}... `);

    const minerals = await fillMinerals(batch.map(r => r.name));

    for (const row of batch) {
      const m = minerals[row.name];
      if (m) {
        row.sodium    ??= m.sodium;
        row.potassium ??= m.potassium;
        row.calcium   ??= m.calcium;
        row.iron      ??= m.iron;
      }
    }
    console.log('✓');
    if (i + MINERAL_BATCH < needsMinerals.length) await new Promise(r => setTimeout(r, 300));
  }

  // Supabase upsert (50개씩)
  console.log(`\n💾 Supabase upsert 중...`);
  const UPSERT_CHUNK = 50;
  let ins = 0, upd = 0;

  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const chunk  = rows.slice(i, i + UPSERT_CHUNK);
    const result = await upsertChunk(chunk);
    ins += result.inserted || 0;
    upd += result.updated  || 0;
    process.stdout.write(`  ${Math.min(i + UPSERT_CHUNK, rows.length)}/${rows.length}\r`);
  }

  console.log(`\n✅ 완료! 신규 ${ins}개 | 업데이트 ${upd}개`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
