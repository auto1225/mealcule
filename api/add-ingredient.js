// Vercel Serverless Function — POST /api/add-ingredient
// 검색 결과 없는 재료를 Claude AI로 분석해 Supabase에 자동 추가

const SUPABASE_URL = 'https://ojtgkvtzmedsbhqkbhwe.supabase.co';
const CATEGORY_KEYS = ['meat','seafood','veg','fruit','grain','dairy','egg','nut','mushroom','legume','herb','sauce','oil','beverage','processed'];

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const name = (req.query.name || '').trim();
  if (!name || name.length < 1 || name.length > 80) {
    return res.status(400).json({ error: '유효하지 않은 재료명' });
  }

  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const ANTHROPIC_API_KEY    = process.env.ANTHROPIC_API_KEY;

  if (!SUPABASE_SERVICE_KEY || !ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: '서버 설정 오류 (env vars missing)' });
  }

  const sbHeaders = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
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
  const prompt = `You are a food science database assistant. Generate accurate nutritional data for the food ingredient: "${name}"

Return ONLY a JSON object (no markdown, no explanation) with these exact fields:
{
  "name": "${name}",
  "cat": "<one of: meat|seafood|veg|fruit|grain|dairy|egg|nut|mushroom|legume|herb|sauce|oil|beverage|processed>",
  "emoji": "<single most relevant emoji>",
  "default_g": <typical serving size in grams, integer>,
  "protein": <g per 100g, number>,
  "fat": <g per 100g, number>,
  "carbs": <g per 100g, number>,
  "water": <g per 100g, number>,
  "fiber": <g per 100g, number>,
  "sodium": <mg per 100g, number>,
  "potassium": <mg per 100g, number>,
  "calcium": <mg per 100g, number>,
  "iron": <mg per 100g, number>,
  "vit_c": <mg per 100g, number or null>,
  "vit_a": <mcg RAE per 100g, number or null>,
  "vit_b12": <mcg per 100g, number or null>,
  "flavor_umami": <0-100, integer>,
  "flavor_sweet": <0-100, integer>,
  "flavor_salty": <0-100, integer>,
  "flavor_sour": <0-100, integer>,
  "flavor_bitter": <0-100, integer>,
  "compounds": [<array of 2-5 key bioactive compound names as strings>],
  "amino_acids": [<array of 1-3 key amino acids as strings, or empty array>]
}

Base values on USDA FoodData Central or peer-reviewed sources. All macros per 100g.`;

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
    if (!jsonMatch) throw new Error('JSON not found in response');
    ingredient = JSON.parse(jsonMatch[0]);

    // 카테고리 유효성 검사
    if (!CATEGORY_KEYS.includes(ingredient.cat)) ingredient.cat = 'processed';

    // 필수 필드 기본값
    ingredient.is_active = true;
    ingredient.source = 'ai_generated';
    ingredient.name = name; // 사용자 입력 이름 우선
  } catch (e) {
    return res.status(422).json({ error: 'AI 응답 파싱 실패', raw: claudeText });
  }

  // ── 4. Supabase에 저장 ────────────────────────────────────────────────────
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/ingredients`, {
    method: 'POST',
    headers: { ...sbHeaders, Prefer: 'return=representation' },
    body: JSON.stringify(ingredient),
  });

  if (!insertRes.ok) {
    const errBody = await insertRes.text();
    // 중복 삽입 시 기존 항목 반환
    if (insertRes.status === 409) {
      const dupRes = await fetch(
        `${SUPABASE_URL}/rest/v1/ingredients?name=eq.${encodeURIComponent(name)}&select=*&limit=1`,
        { headers: sbHeaders }
      );
      const dup = await dupRes.json();
      return res.json({ ingredient: dup[0] || ingredient, source: 'existing' });
    }
    return res.status(500).json({ error: 'DB 저장 실패', detail: errBody });
  }

  const saved = await insertRes.json();
  return res.json({ ingredient: saved[0] || ingredient, source: 'ai_generated' });
}
