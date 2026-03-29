// Vercel Serverless Function — GET /api/add-ingredient?name=XXX
// anon 키 + SECURITY DEFINER RPC 함수로 service_role 키 불필요
// 필요 env var: ANTHROPIC_API_KEY

const SUPABASE_URL = 'https://ojtgkvtzmedsbhqkbhwe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6c8GjizbhYKUBzQywsoUhA_3KYN25-2';
const CATEGORY_KEYS = ['meat','seafood','veg','fruit','grain','dairy','egg','nut','mushroom','legume','herb','sauce','oil','beverage','processed'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const name = (req.query.name || '').trim();
  if (!name || name.length < 1 || name.length > 80) {
    return res.status(400).json({ error: '유효하지 않은 재료명' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: '서버 설정 오류 (ANTHROPIC_API_KEY missing)' });
  }

  const sbHeaders = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };

  // ── 1. 이미 DB에 있는지 확인 ─────────────────────────────────────────────
  const existRes = await fetch(
    `${SUPABASE_URL}/rest/v1/ingredients?name=eq.${encodeURIComponent(name)}&select=*&limit=1`,
    { headers: sbHeaders }
  );
  const existing = await existRes.json();
  if (Array.isArray(existing) && existing.length > 0) {
    return res.json({ ingredient: existing[0], source: 'existing' });
  }

  // ── 2. Claude Haiku로 영양 데이터 생성 ───────────────────────────────────
  const prompt = `You are a food science database. First verify if "${name}" is a real, known food ingredient eaten by humans.

If it is NOT a real food ingredient, return ONLY:
{"exists": false}

If it IS a real food ingredient, return ONLY valid JSON (no markdown, no explanation):
{
  "exists": true,
  "name": "${name}",
  "cat": "<meat|seafood|veg|fruit|grain|dairy|egg|nut|mushroom|legume|herb|sauce|oil|beverage|processed>",
  "emoji": "<single emoji>",
  "default_g": <integer serving size>,
  "protein": <g/100g>, "fat": <g/100g>, "carbs": <g/100g>, "water": <g/100g>, "fiber": <g/100g>,
  "sodium": <mg/100g>, "potassium": <mg/100g>, "calcium": <mg/100g>, "iron": <mg/100g>,
  "vit_c": <mg/100g or null>, "vit_a": <mcg/100g or null>, "vit_b12": <mcg/100g or null>,
  "flavor_umami": <0-100>, "flavor_sweet": <0-100>, "flavor_salty": <0-100>,
  "flavor_sour": <0-100>, "flavor_bitter": <0-100>,
  "compounds": ["compound1", "compound2"],
  "amino_acids": ["amino1"]
}
Use USDA FoodData Central values. All macros per 100g.`;

  let claudeText = '';
  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 900,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const claudeData = await claudeRes.json();
    claudeText = claudeData.content?.[0]?.text || '';
  } catch (e) {
    return res.status(502).json({ error: 'Claude API 호출 실패', detail: e.message });
  }

  // ── 3. JSON 파싱 ──────────────────────────────────────────────────────────
  let ingredient;
  try {
    const jsonMatch = claudeText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON not found');
    ingredient = JSON.parse(jsonMatch[0]);
    if (ingredient.exists === false) {
      return res.status(404).json({ error: `'${name}'은(는) 실존하는 식재료가 아닙니다.` });
    }
    if (!CATEGORY_KEYS.includes(ingredient.cat)) ingredient.cat = 'processed';
    ingredient.name = name;
  } catch (e) {
    return res.status(422).json({ error: 'AI 응답 파싱 실패', raw: claudeText });
  }

  // ── 4. SECURITY DEFINER RPC로 저장 (anon 권한으로 RLS 우회) ──────────────
  const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/insert_ai_ingredient`, {
    method: 'POST',
    headers: sbHeaders,
    body: JSON.stringify({ data: ingredient }),
  });

  if (!rpcRes.ok) {
    const errBody = await rpcRes.text();
    return res.status(500).json({ error: 'DB 저장 실패', detail: errBody });
  }

  const saved = await rpcRes.json();
  return res.json({ ingredient: saved || ingredient, source: 'ai_generated' });
}
