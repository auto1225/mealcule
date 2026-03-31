// POST /api/generate-meal-plan
// AI-powered weekly meal plan generation based on health profile + saved recipes
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY missing' });

  const {
    savedRecipes = [],
    conditions = [],
    traits = [],
    substances = [],
    age, gender, weight, height, activityLevel,
    ethnicity, country,
    preferences = {},
    userLang = 'en',
  } = req.body || {};

  const LANG_NAME = {
    ko:'Korean', ja:'Japanese', zh:'Chinese', en:'English', fr:'French',
    de:'German', it:'Italian', es:'Spanish', th:'Thai', vi:'Vietnamese',
  };
  const outputLang = LANG_NAME[userLang] || 'English';

  // Build recipe context (top 20 saved recipes by most recent)
  const recipeCtx = savedRecipes.slice(0, 20).map(r => {
    const cal = r.nutrition_snapshot?.calories || r.nutrition_snapshot?.kcal || '?';
    const p = r.nutrition_snapshot?.protein || '?';
    return `- ${r.name} (${r.name_en || r.name}): ${cal}kcal, P${p}g, cuisine=${r.cuisine || '?'}`;
  }).join('\n');

  // Build health context
  const healthParts = [];
  if (age) healthParts.push(`Age: ${age}`);
  if (gender) healthParts.push(`Gender: ${gender}`);
  if (weight && height) {
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    healthParts.push(`BMI: ${bmi} (${weight}kg/${height}cm)`);
  }
  if (activityLevel) healthParts.push(`Activity: ${activityLevel}`);
  if (conditions.length) healthParts.push(`Conditions: ${conditions.join(', ')}`);
  if (traits.length) healthParts.push(`Dietary traits: ${traits.join(', ')}`);
  if (substances.length) healthParts.push(`Medications/supplements: ${substances.join(', ')}`);
  const healthStr = healthParts.join('\n') || 'No health profile provided';

  // Preferences
  const prefParts = [];
  if (preferences.targetCalories) prefParts.push(`Target: ~${preferences.targetCalories} kcal/day`);
  if (preferences.mealsPerDay) prefParts.push(`Meals per day: ${preferences.mealsPerDay}`);
  if (preferences.cuisinePreference) prefParts.push(`Cuisine preference: ${preferences.cuisinePreference}`);
  if (preferences.avoidIngredients?.length) prefParts.push(`Avoid: ${preferences.avoidIngredients.join(', ')}`);
  if (preferences.budgetLevel) prefParts.push(`Budget: ${preferences.budgetLevel}`);
  const prefStr = prefParts.join('\n') || 'No specific preferences';

  const prompt = `You are a certified nutritionist and meal planning expert. Generate a 7-day meal plan (Monday to Sunday).

HEALTH PROFILE:
${healthStr}

PREFERENCES:
${prefStr}

USER'S SAVED RECIPES (reuse when appropriate):
${recipeCtx || 'No saved recipes yet — suggest new ones'}

Rules:
- Each day must have breakfast, lunch, dinner (and optionally snack)
- Balance macros across the day: aim for ~${preferences.targetCalories || 2000} kcal/day
- If health conditions exist, avoid contraindicated foods and prioritize beneficial ones
- Reuse saved recipes where they fit nutritionally, but also suggest new meals
- Provide estimated calories and macros (protein, fat, carbs) for each meal
- For new meals (not from saved recipes), provide a brief ingredient list
- ALL text must be in ${outputLang}
- Each meal needs name, name_en (English), emoji, and estimated nutrition

Return ONLY valid JSON, no markdown:
{
  "plan": [
    {
      "day": 0,
      "dayLabel": "Monday",
      "meals": [
        {
          "type": "breakfast",
          "name": "Meal name in ${outputLang}",
          "name_en": "English name",
          "emoji": "🥣",
          "fromSavedRecipe": false,
          "savedRecipeName": null,
          "ingredients": ["ingredient1", "ingredient2"],
          "calories": 450,
          "protein": 25,
          "fat": 15,
          "carbs": 50,
          "fiber": 5,
          "tip": "Brief nutrition tip in ${outputLang}"
        }
      ],
      "dailyTotal": { "calories": 2000, "protein": 80, "fat": 65, "carbs": 250 }
    }
  ],
  "weeklyNotes": "1-2 sentence overall nutrition note in ${outputLang}",
  "grocerySummary": ["key ingredient 1", "key ingredient 2"]
}`;

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
        max_tokens: 6000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await claudeRes.json();
    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.replace(/```[a-z]*/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in AI response');
    const result = JSON.parse(jsonMatch[0]);

    if (!result.plan || !Array.isArray(result.plan)) {
      throw new Error('Invalid plan structure');
    }

    return res.json(result);
  } catch (e) {
    return res.status(502).json({ error: 'Meal plan generation failed', detail: e.message });
  }
}
