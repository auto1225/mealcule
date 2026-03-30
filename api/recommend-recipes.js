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

  const { ingredients = [], method, temp, time, conditions = [], traits = [], ethnicity, country, userLang = 'ko' } = req.body || {};

  const LANG_NAME = {
    ko:'Korean', ja:'Japanese', zh:'Chinese', 'zh-Hans':'Chinese',
    en:'English', fr:'French', de:'German', it:'Italian', es:'Spanish',
    th:'Thai', vi:'Vietnamese', hi:'Hindi', ar:'Arabic', el:'Greek',
    tr:'Turkish', id:'Indonesian', pt:'Portuguese',
  };
  const outputLang = LANG_NAME[userLang] || 'Korean';

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
- ALL text fields (name, description, healthNote, cuisine) MUST be written in ${outputLang}
- difficulty must be one word in ${outputLang} meaning Easy/Medium/Hard

Return ONLY a valid JSON array, no markdown, no explanation:
[
  {
    "name": "Recipe name in ${outputLang}",
    "name_en": "English recipe name",
    "description": "1-2 sentence description in ${outputLang}",
    "usedIngredients": ["ingredient name in ${outputLang}"],
    "healthNote": "1 sentence health benefit or caution in ${outputLang}",
    "allergens": ["allergen in English"],
    "cuisine": "Cuisine country/style in ${outputLang}",
    "difficulty": "Easy/Medium/Hard equivalent in ${outputLang}",
    "youtubeQuery": "YouTube search query in the cuisine's local language"
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
