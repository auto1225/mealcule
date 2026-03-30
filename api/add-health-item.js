// POST /api/add-health-item
// AI 기반 건강 프로필 항목 추가 (체질/가족력/약물/질환) — Claude Haiku
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY missing' });

  const { type, name } = req.body || {};
  if (!type || !name) return res.status(400).json({ error: 'type and name required' });

  const typeDescriptions = {
    trait:     '체질/식이 특이사항 (알레르기, 식이 제한, 체질, 임신/수유, 식이 요법 등)',
    family:    '가족 병력 (직계 가족의 유전성 질환)',
    substance: '약물/영양제/생활습관 (처방약, 영양제, 음주·흡연 패턴, 생활습관)',
    condition: '개인 질환/건강 상태 (만성질환, 대사 질환, 소화기 질환 등)',
  };

  const schemas = {
    trait: `{
  "valid": true,
  "key": "snake_case_unique_key",
  "label": "한국어 표기 (10자 이내)",
  "emoji": "이모지 1개",
  "desc": "1문장 설명",
  "interactions": ["가장 중요한 식품 상호작용 1", "상호작용 2"],
  "warningFoods": ["피해야 할 음식 1", "음식 2"]
}`,
    family: `{
  "valid": true,
  "key": "fam_snake_case",
  "label": "한국어 표기 (10자 이내)",
  "emoji": "이모지 1개",
  "desc": "1문장 설명",
  "interactions": ["식이 연관성 1"],
  "warningFoods": []
}`,
    substance: `{
  "valid": true,
  "key": "med_or_sup_or_life_snake_case",
  "label": "한국어 표기 (10자 이내)",
  "emoji": "이모지 1개",
  "desc": "1문장 설명 (약효·용도 포함)",
  "category": "medication 또는 supplement 또는 lifestyle 중 하나",
  "interactions": ["식품 상호작용 1", "상호작용 2"],
  "warningFoods": ["상호작용 주의 음식 1"]
}`,
    condition: `{
  "valid": true,
  "key": "snake_case_unique_key",
  "label": "한국어 표기 (10자 이내)",
  "emoji": "이모지 1개",
  "desc": "1문장 설명",
  "avoidFoods": [{"food": "음식명", "reason": "이유"}],
  "benefitFoods": [{"food": "음식명", "benefit": "효과"}],
  "notes": ["핵심 식이 주의사항 1", "주의사항 2", "주의사항 3"]
}`,
  };

  const prompt = `당신은 영양학·임상의학 전문가입니다. 사용자가 건강 프로필에 "${name}"을(를) 추가하려 합니다.
카테고리: ${typeDescriptions[type] || type}

판단 기준:
1. 실제로 존재하는 의학/영양학적 개념인가
2. 위 카테고리에 적합한가
3. 식이·조리에 실질적인 영향을 미치는가

유효하지 않으면: {"valid": false, "reason": "거부 이유"}
유효하면 아래 스키마대로 JSON만 응답 (마크다운 없이):
${schemas[type] || schemas.trait}

주의:
- emoji는 의미에 맞게 선택 (의약품💊, 알레르기⚠️, 심혈관❤️, 소화기🫃, 간🫀, 뇌🧠 등)
- interactions/warningFoods는 임상적으로 중요한 것만 (최대 4개)
- label은 한국어, desc는 구체적으로`;

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
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await claudeRes.json();
    const text = data.content?.[0]?.text || '';
    const jsonMatch = text.replace(/```[a-z]*/g, '').replace(/```/g, '').match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const item = JSON.parse(jsonMatch[0]);
    return res.json({ item });
  } catch (e) {
    return res.status(502).json({ error: '분석 실패', detail: e.message });
  }
}
