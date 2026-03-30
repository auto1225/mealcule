// Vercel Serverless Function — GET /api/add-method?name=XXX
// 조리 방법 존재 여부 검증 + 물리화학 인자 AI 분석 + Supabase 저장
// ANTHROPIC_API_KEY 환경변수 필요

const SUPABASE_URL = 'https://ojtgkvtzmedsbhqkbhwe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6c8GjizbhYKUBzQywsoUhA_3KYN25-2';

// 기본 내장 방법 키 목록 (DB 중복 방지)
const BUILTIN_KEYS = new Set([
  'pan_fry','boil','steam','grill','oven','deep_fry','stir_fry',
  'air_fry','microwave','pressure','slow_cook','sous_vide',
  'smoke','charcoal','wok','blanch','braise','poach','tandoor','ferment','raw',
]);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const name = (req.query.name || '').trim();
  if (!name || name.length < 1 || name.length > 80) {
    return res.status(400).json({ error: '유효하지 않은 조리 방법명' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: '서버 설정 오류 (ANTHROPIC_API_KEY missing)' });

  const sbHeaders = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };

  // ── 1. DB 중복 확인 (label 또는 label_en 일치) ──────────────────────────────
  const existRes = await fetch(
    `${SUPABASE_URL}/rest/v1/cooking_methods?select=*&limit=1&or=(label.ilike.${encodeURIComponent(name)},label_en.ilike.${encodeURIComponent(name)})`,
    { headers: sbHeaders }
  );
  const existing = await existRes.json();
  if (Array.isArray(existing) && existing.length > 0) {
    return res.json({ method: existing[0], source: 'existing' });
  }

  // ── 2. Claude Haiku로 존재 여부 + 물리화학 인자 분석 ──────────────────────
  const prompt = `You are a culinary science expert. Determine if "${name}" is a real, recognized cooking technique used by humans anywhere in the world.

If it is NOT a real cooking technique, return ONLY:
{"exists": false}

If it IS a real cooking technique, return ONLY valid JSON (no markdown, no explanation):
{
  "exists": true,
  "key": "<unique_snake_case_english_identifier>",
  "label": "<Korean name for this technique>",
  "label_en": "<English name>",
  "emoji": "<single most appropriate emoji>",
  "range_min": <minimum operating temperature in Celsius as integer>,
  "range_max": <maximum operating temperature in Celsius as integer>,
  "medium": "<dry|water|steam|oil|mw|smoke|none>",
  "pressure_atm": <atmospheric pressure multiplier: 1.0=normal, 1.3=pressure cooker, 0.7=high altitude>,
  "o2_level": <oxygen exposure 0.0-1.0: 0=vacuum/sealed, 1.0=open flame>,
  "leach_factor": <water-soluble nutrient leaching 0.0-1.0: 0=dry/no loss, 0.9=full boil immersion>,
  "fat_contact": <true if food directly contacts fat or oil>,
  "browning": <true if Maillard reaction or caramelization is possible — requires dry surface >140°C>,
  "starch_h2o": <true if starch gelatinization is possible — requires water/steam contact>,
  "pah_risk": <true if combustion gases or smoke generate PAH/HCA carcinogens>,
  "uniformity": "<high=even temperature, medium=some variation, low=hot spots/uneven>"
}

Physical chemistry rules:
- medium 'dry': oven, grill, roasting — surface dehydrates enabling browning
- medium 'water': boiling, poaching, blanching — water-soluble nutrients leach out
- medium 'steam': steaming — less leaching than boiling but still hydrates starch
- medium 'oil': deep frying — fat absorption, lipid oxidation
- medium 'mw': microwave dielectric heating — uneven, no browning surface
- medium 'smoke': BBQ smoking — PAH from wood combustion
- medium 'none': fermentation, raw — no applied heat
- browning=true ONLY for dry-surface methods where moisture evaporates (not boiling/steaming/sous vide)
- pah_risk=true for open-flame grill, charcoal, smoking, tandoor`;

  let claudeText = '';
  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    claudeText = (await claudeRes.json()).content?.[0]?.text || '';
  } catch (e) {
    return res.status(502).json({ error: 'AI 분석 실패', detail: e.message });
  }

  // ── 3. JSON 파싱 및 검증 ──────────────────────────────────────────────────
  let method;
  try {
    const jsonMatch = claudeText.replace(/```[a-z]*/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON not found');
    method = JSON.parse(jsonMatch[0]);

    if (method.exists === false) {
      return res.status(404).json({ error: `'${name}'은(는) 인식된 조리 방법이 아닙니다.` });
    }

    // 필수 필드 검증
    const REQUIRED = ['key', 'label', 'label_en', 'range_min', 'range_max', 'medium'];
    const missing = REQUIRED.filter(k => method[k] == null || method[k] === '');
    if (missing.length > 0) {
      return res.status(422).json({ error: `분석 불완전: ${missing.join(', ')} 누락` });
    }

    // key 정규화: 소문자 + 밑줄만 허용
    method.key = String(method.key).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    if (!method.key) return res.status(422).json({ error: '유효한 키 생성 실패' });

    // 내장 키 충돌 방지
    if (BUILTIN_KEYS.has(method.key)) {
      return res.status(409).json({ error: `'${method.label}'은(는) 이미 기본 제공되는 조리 방법입니다.` });
    }

    // medium 검증
    const VALID_MEDIA = ['dry', 'water', 'steam', 'oil', 'mw', 'smoke', 'none'];
    if (!VALID_MEDIA.includes(method.medium)) method.medium = 'dry';

    // uniformity 검증
    if (!['high', 'medium', 'low'].includes(method.uniformity)) method.uniformity = 'medium';

    // 수치 범위 클램핑
    method.pressure_atm  = Math.max(0.5, Math.min(5.0, parseFloat(method.pressure_atm) || 1.0));
    method.o2_level      = Math.max(0.0, Math.min(1.0, parseFloat(method.o2_level) || 0.7));
    method.leach_factor  = Math.max(0.0, Math.min(1.0, parseFloat(method.leach_factor) || 0.0));

    method.source = 'ai_generated';
  } catch (e) {
    return res.status(422).json({ error: 'AI 응답 파싱 실패', raw: claudeText.slice(0, 300) });
  }

  // ── 4. Supabase SECURITY DEFINER RPC로 저장 ──────────────────────────────
  const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/insert_ai_method`, {
    method: 'POST',
    headers: sbHeaders,
    body: JSON.stringify({ data: method }),
  });

  if (!rpcRes.ok) {
    const errBody = await rpcRes.text();
    return res.status(500).json({ error: 'DB 저장 실패', detail: errBody });
  }

  const saved = await rpcRes.json();
  return res.json({ method: saved || method, source: 'ai_generated' });
}
