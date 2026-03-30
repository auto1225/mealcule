// POST /api/recommend-recipes
// 재료 + 건강 프로필 + 국가 기반 레시피 추천 (Claude Haiku)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY missing' });

  const { ingredients = [], method, temp, time, conditions = [], traits = [], ethnicity, country } = req.body || {};

  const CUISINE_MAP = {
    east_asian:      'Korean, Japanese, or Chinese',
    southeast_asian: 'Thai, Vietnamese, or Southeast Asian',
    south_asian:     'Indian or South Asian',
    caucasian:       'Italian, French, or European',
    african:         'West African or North African',
    hispanic:        'Mexican or Latin American',
    middle_eastern:  'Middle Eastern or Turkish',
  };

  const COUNTRY_CUISINE = {
    kr: 'Korean', jp: 'Japanese', cn: 'Chinese', th: 'Thai', vn: 'Vietnamese',
    in: 'Indian', it: 'Italian', fr: 'French', us: 'American', mx: 'Mexican',
    es: 'Spanish', tr: 'Turkish', ma: 'Moroccan', br: 'Brazilian', de: 'German',
    gr: 'Greek', lb: 'Lebanese', id: 'Indonesian', ph: 'Filipino', pe: 'Peruvian',
  };

  const cuisinePref = country
    ? (COUNTRY_CUISINE[country] || country)
    : (ethnicity ? CUISINE_MAP[ethnicity] : 'Global cuisine from any country');

  const ingList = ingredients.map(i => `${i.name}(${i.grams}g)`).join(', ');
  const healthStr = [...conditions, ...traits].filter(Boolean).join(', ') || 'none';

  const prompt = `You are a world-class chef and nutritionist. Suggest 5 recipes using the provided ingredients.

Available ingredients: ${ingList}
Cooking method: ${method || 'any'} at ${temp || '?'}°C for ${time || '?'} min
Cuisine style: ${cuisinePref}
Health conditions/traits: ${healthStr}

Rules:
- Prioritize recipes that use most of the listed ingredients
- If health conditions exist, avoid contraindicated ingredients and mention it
- Match the cuisine style strictly
- youtubeQuery should be a natural search phrase (in the cuisine's local language if possible, else English) for finding this recipe on YouTube

Return ONLY a valid JSON array, no markdown, no explanation:
[
  {
    "name": "레시피 한국어 이름",
    "name_en": "English recipe name",
    "description": "한국어 설명 1-2문장",
    "usedIngredients": ["재료1", "재료2"],
    "healthNote": "건강 혜택 또는 주의사항 1문장",
    "allergens": ["allergen1"],
    "cuisine": "요리 국가/스타일",
    "difficulty": "쉬움",
    "youtubeQuery": "YouTube search query string"
  }
]`;

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
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await claudeRes.json();
    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.replace(/```[a-z]*/g, '').replace(/```/g, '').match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array in response');
    const recipes = JSON.parse(jsonMatch[0]);
    return res.json({ recipes, cuisine: cuisinePref });
  } catch (e) {
    return res.status(502).json({ error: '레시피 추천 실패', detail: e.message });
  }
}
