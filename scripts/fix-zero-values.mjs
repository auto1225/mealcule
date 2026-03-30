// 미네랄 값이 0인 항목만 골라서 Sonnet으로 재처리
// 실행: ANTHROPIC_API_KEY=sk-... node scripts/fix-zero-values.mjs

const SUPABASE_URL  = 'https://ojtgkvtzmedsbhqkbhwe.supabase.co';
const SUPABASE_ANON = 'sb_publishable_6c8GjizbhYKUBzQywsoUhA_3KYN25-2';
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

// 진짜로 0이어도 되는 순수 식재료 (소금/설탕/순수오일류)
const LEGITIMATELY_ZERO = new Set([
  '소금','굵은소금','꽃소금','천일염','죽염','설탕','백설탕','흑설탕','황설탕','올리고당',
  '올리브오일','카놀라오일','포도씨유','해바라기씨유','코코넛오일','참기름','들기름','버터오일',
  '식초','사과식초','발사믹식초','물','탄산수',
]);

async function fetchZeroItems() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/ingredients?select=name,cat,sodium,potassium,calcium,iron&or=(sodium.eq.0,potassium.eq.0,calcium.eq.0,iron.eq.0)&limit=1000`, {
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
  });
  const all = await res.json();
  return all.filter(r => !LEGITIMATELY_ZERO.has(r.name));
}

async function analyzeNutrition(nameList) {
  const prompt = `You are a food science expert. Provide precise nutritional data per 100g for each ingredient.
Use USDA FoodData Central as primary source. For Korean ingredients, use Korean National Food Composition Database.

CRITICAL RULES:
- NEVER use 0 as a placeholder. Use the real measured value, even if very small (e.g. 0.1, 0.02).
- Only use exactly 0 if the ingredient TRULY contains zero of that nutrient.
- Use null ONLY for nutrients genuinely unmeasurable for that ingredient type.
- Examples: apple calcium=6mg, banana calcium=5mg, egg calcium=56mg, egg iron=1.75mg

Return ONLY valid JSON (no markdown):
{
  "ingredient_name": {
    "sodium": <mg/100g>, "potassium": <mg/100g>, "calcium": <mg/100g>, "iron": <mg/100g>
  }
}
Ingredients: ${JSON.stringify(nameList)}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 3000, messages: [{ role: 'user', content: prompt }] }),
  });
  const text = (await res.json()).content?.[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return {};
  try { return JSON.parse(match[0]); } catch { return {}; }
}

async function patchMinerals(name, minerals) {
  const sets = [];
  if (minerals.sodium    != null) sets.push(`sodium=${minerals.sodium}`);
  if (minerals.potassium != null) sets.push(`potassium=${minerals.potassium}`);
  if (minerals.calcium   != null) sets.push(`calcium=${minerals.calcium}`);
  if (minerals.iron      != null) sets.push(`iron=${minerals.iron}`);
  if (!sets.length) return;

  const token = JSON.parse(localStorage?.getItem?.('supabase.dashboard.auth.token') || 'null')?.access_token;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/batch_upsert_ingredients`, {
    method: 'POST',
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ name, ...minerals }] }),
  });
  if (!res.ok) throw new Error(await res.text());
}

async function main() {
  if (!ANTHROPIC_KEY) { console.error('❌ ANTHROPIC_API_KEY 필요'); process.exit(1); }

  console.log('🔍 0값 항목 조회 중...');
  const items = await fetchZeroItems();
  console.log(`⚠️  보정 필요: ${items.length}개\n`);

  const BATCH = 15;
  let fixed = 0;

  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    const total = Math.ceil(items.length / BATCH);
    process.stdout.write(`  [${Math.floor(i/BATCH)+1}/${total}] ${batch.map(r=>r.name).slice(0,3).join(', ')}... `);

    const data = await analyzeNutrition(batch.map(r => r.name));

    // Supabase에 직접 PATCH (미네랄만)
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/batch_upsert_ingredients`, {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: batch.map(r => ({
          name: r.name,
          cat: r.cat,
          ...(data[r.name] || {}),
        }))
      }),
    });

    if (!patchRes.ok) {
      console.log(`❌ ${await patchRes.text()}`);
    } else {
      fixed += batch.length;
      console.log('✓');
    }

    if (i + BATCH < items.length) await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n✅ ${fixed}개 보정 완료`);

  // 최종 검증
  const verifyRes = await fetch(`${SUPABASE_URL}/rest/v1/ingredients?select=name&or=(sodium.eq.0,potassium.eq.0,calcium.eq.0,iron.eq.0)&limit=500`, {
    headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
  });
  const remaining = (await verifyRes.json()).filter(r => !LEGITIMATELY_ZERO.has(r.name));
  console.log(`\n📊 잔여 0값 항목: ${remaining.length}개${remaining.length > 0 ? '\n' + remaining.map(r=>r.name).join(', ') : ' (없음 ✓)'}`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
