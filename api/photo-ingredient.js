// POST /api/photo-ingredient
// Photo → ingredient recognition using Claude Vision
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY missing' });

  const { image, userLang = 'en' } = req.body || {};
  // image: base64 data URI (e.g. "data:image/jpeg;base64,...")
  if (!image) return res.status(400).json({ error: 'image (base64) required' });

  // Parse base64
  const match = image.match(/^data:(image\/(jpeg|png|gif|webp));base64,(.+)$/);
  if (!match) return res.status(400).json({ error: 'Invalid image format. Send data:image/...;base64,...' });

  const mediaType = match[1];
  const base64Data = match[3];

  // Validate size (max ~10MB base64 ≈ 13.3M chars)
  if (base64Data.length > 13_000_000) {
    return res.status(400).json({ error: 'Image too large. Max 10MB.' });
  }

  const LANG_NAME = {
    ko:'Korean', ja:'Japanese', zh:'Chinese', en:'English', fr:'French',
    de:'German', it:'Italian', es:'Spanish', th:'Thai', vi:'Vietnamese',
  };
  const outputLang = LANG_NAME[userLang] || 'English';

  const prompt = `Identify all food ingredients visible in this image. For each ingredient:
1. Identify the ingredient name
2. Estimate the approximate amount in grams
3. Determine its food category

Rules:
- Only identify actual food/cooking ingredients (not plates, utensils, packaging brand names)
- If the image is not food-related, return an empty array
- Be specific: "chicken breast" not just "chicken", "red bell pepper" not just "pepper"
- Estimate grams based on visual portion size
- Category must be one of: meat, seafood, vegetable, fruit, dairy, grains, eggs, oil, sauces, nuts, legumes, mushroom, herbs, processed, beverages
- ALL names must be in ${outputLang}, with English in name_en
- confidence: "high" if clearly visible, "medium" if partially visible/uncertain, "low" if guessing

Return ONLY valid JSON array, no markdown:
[
  {
    "name": "Ingredient in ${outputLang}",
    "name_en": "English name",
    "category": "meat",
    "emoji": "🥩",
    "estimatedGrams": 200,
    "confidence": "high"
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
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64Data },
            },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });

    const data = await claudeRes.json();
    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.replace(/```[a-z]*/g, '').replace(/```/g, '').match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array in response');
    const ingredients = JSON.parse(jsonMatch[0]);

    return res.json({
      ingredients,
      count: ingredients.length,
      hasFood: ingredients.length > 0,
    });
  } catch (e) {
    return res.status(502).json({ error: 'Photo analysis failed', detail: e.message });
  }
}
