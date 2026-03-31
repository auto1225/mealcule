// POST /api/import-recipe
// URL → recipe extraction using web scraping + Claude AI
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY missing' });

  const { url, userLang = 'en' } = req.body || {};
  if (!url) return res.status(400).json({ error: 'url required' });

  // Basic URL validation
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const LANG_NAME = {
    ko:'Korean', ja:'Japanese', zh:'Chinese', en:'English', fr:'French',
    de:'German', it:'Italian', es:'Spanish', th:'Thai', vi:'Vietnamese',
  };
  const outputLang = LANG_NAME[userLang] || 'English';

  try {
    // Fetch the page content
    const pageRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Mealcule/2.0; +https://mealcule.com)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!pageRes.ok) {
      return res.status(400).json({ error: `Failed to fetch URL (HTTP ${pageRes.status})` });
    }

    const html = await pageRes.text();

    // Extract useful text (strip scripts, styles, nav, etc.)
    const cleaned = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Limit to first 6000 chars to stay within token limits
    const pageText = cleaned.slice(0, 6000);

    if (pageText.length < 50) {
      return res.status(400).json({ error: 'Page has too little content to extract a recipe' });
    }

    // Also try to extract JSON-LD structured data (Recipe schema)
    const jsonLdMatch = html.match(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    let structuredData = '';
    if (jsonLdMatch) {
      for (const match of jsonLdMatch) {
        const content = match.replace(/<script[^>]*>|<\/script>/gi, '').trim();
        try {
          const parsed = JSON.parse(content);
          const recipes = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of recipes) {
            if (item['@type'] === 'Recipe' || item['@type']?.includes?.('Recipe')) {
              structuredData = JSON.stringify(item).slice(0, 3000);
              break;
            }
          }
        } catch { /* ignore malformed JSON-LD */ }
        if (structuredData) break;
      }
    }

    const prompt = `Extract the recipe from this web page content. The page is from: ${url}

${structuredData ? `STRUCTURED DATA (JSON-LD Recipe schema):\n${structuredData}\n\n` : ''}PAGE TEXT:
${pageText}

Extract the recipe and return as structured JSON. Rules:
- Extract: recipe name, description, ingredients with amounts, cooking steps, estimated nutrition
- For ingredients, estimate grams for each (convert cups/tbsp/etc. to grams)
- Identify cuisine type, difficulty, cooking method, temperature, and duration if mentioned
- ALL text fields in ${outputLang}
- If the page doesn't contain a recipe, set "isRecipe": false

Return ONLY valid JSON, no markdown:
{
  "isRecipe": true,
  "name": "Recipe name in ${outputLang}",
  "name_en": "English recipe name",
  "description": "Brief description in ${outputLang}",
  "cuisine": "Cuisine type in ${outputLang}",
  "difficulty": "Easy/Medium/Hard in ${outputLang}",
  "cookingMethod": "primary method (e.g., oven, pan fry, grill)",
  "temperature": 180,
  "duration": 30,
  "servings": 4,
  "ingredients": [
    { "name": "in ${outputLang}", "name_en": "English", "grams": 200, "emoji": "🥩", "category": "meat" }
  ],
  "steps": ["Step 1 in ${outputLang}", "Step 2..."],
  "nutrition": {
    "calories": 500,
    "protein": 30,
    "fat": 20,
    "carbs": 50,
    "fiber": 5
  },
  "allergens": ["dairy", "gluten"],
  "healthNote": "Brief health note in ${outputLang}",
  "sourceUrl": "${url}",
  "youtubeQuery": "search query for this recipe on YouTube"
}`;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await claudeRes.json();
    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.replace(/```[a-z]*/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in AI response');
    const recipe = JSON.parse(jsonMatch[0]);

    if (!recipe.isRecipe) {
      return res.status(400).json({ error: 'No recipe found on this page', isRecipe: false });
    }

    return res.json(recipe);
  } catch (e) {
    if (e.name === 'TimeoutError' || e.name === 'AbortError') {
      return res.status(408).json({ error: 'URL fetch timed out (10s limit)' });
    }
    return res.status(502).json({ error: 'Recipe import failed', detail: e.message });
  }
}
