// ══════════════════════════════════════════════════════════════
// MEALCULE ENGAGEMENT SYSTEM
// Streak tracking, Daily coaching tips, Food quality scoring,
// Smart goal adjustment, Celebration animations, Quick text logging
// ══════════════════════════════════════════════════════════════

var _t = typeof _t !== 'undefined' ? _t : function(ko, en) { return (window.I18n && I18n.lang === 'en') ? en : ko; };

// ═══════════════════════════════════════
// 1. STREAK SYSTEM — 연속 기록 추적
// ═══════════════════════════════════════

const STREAK_KEY = 'mc_streak';

function _getStreak() {
  try {
    var data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
    return {
      current: data.current || 0,
      longest: data.longest || 0,
      lastDate: data.lastDate || null,
      freezes: data.freezes || 0,       // 스트릭 보호권
      totalDays: data.totalDays || 0,   // 총 기록 일수
      milestones: data.milestones || [],
    };
  } catch(e) { return { current: 0, longest: 0, lastDate: null, freezes: 0, totalDays: 0, milestones: [] }; }
}

function _saveStreak(s) {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(s)); } catch(e) {}
}

/** 오늘 기록 시 호출 — 스트릭 업데이트 */
function updateStreak() {
  var s = _getStreak();
  var today = new Date().toISOString().slice(0, 10);
  if (s.lastDate === today) return s; // 이미 오늘 기록됨

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (s.lastDate === yesterdayStr) {
    // 연속 유지
    s.current += 1;
  } else if (s.lastDate && s.lastDate !== today) {
    // 끊김 — 프리즈 사용 가능?
    var daysDiff = Math.floor((new Date(today) - new Date(s.lastDate)) / 86400000);
    if (daysDiff <= 2 && s.freezes > 0) {
      s.freezes -= 1;
      s.current += 1;
    } else {
      s.current = 1; // 리셋
    }
  } else {
    s.current = 1; // 첫 기록
  }

  s.lastDate = today;
  s.totalDays += 1;
  if (s.current > s.longest) s.longest = s.current;

  // 마일스톤 체크
  var milestoneThresholds = [3, 7, 14, 30, 50, 100, 365];
  milestoneThresholds.forEach(function(m) {
    if (s.current === m && s.milestones.indexOf(m) === -1) {
      s.milestones.push(m);
      _celebrateMilestone(m);
    }
  });

  // 매 7일마다 프리즈 1개 지급 (최대 3개)
  if (s.current > 0 && s.current % 7 === 0 && s.freezes < 3) {
    s.freezes += 1;
    _showEngageToast('🛡️ ' + _t('스트릭 보호권 획득!', 'Streak freeze earned!'), 'reward');
  }

  _saveStreak(s);
  return s;
}

/** 스트릭 위젯 HTML */
function renderStreakWidget() {
  var s = _getStreak();
  var today = new Date().toISOString().slice(0, 10);
  var isActive = s.lastDate === today;

  // 최근 7일 기록 표시
  var dots = '';
  for (var i = 6; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var ds = d.toISOString().slice(0, 10);
    var dayLabel = ['일','월','화','수','목','금','토'][d.getDay()];
    if (window.I18n && I18n.lang === 'en') dayLabel = ['S','M','T','W','T','F','S'][d.getDay()];
    var filled = _wasDayLogged(ds);
    dots += '<div class="streak-day' + (filled ? ' filled' : '') + (ds === today ? ' today' : '') + '">' +
      '<div class="streak-dot"></div>' +
      '<div class="streak-day-label">' + dayLabel + '</div></div>';
  }

  return '<div class="streak-widget">' +
    '<div class="streak-top">' +
      '<div class="streak-fire">' + (s.current > 0 ? '🔥' : '💤') + '</div>' +
      '<div class="streak-count">' + s.current + '</div>' +
      '<div class="streak-text">' + _t('일 연속', ' day streak') + '</div>' +
      (s.freezes > 0 ? '<div class="streak-freezes">🛡️×' + s.freezes + '</div>' : '') +
    '</div>' +
    '<div class="streak-days">' + dots + '</div>' +
    '<div class="streak-best">' + _t('최고 기록: ', 'Best: ') + s.longest + _t('일', ' days') +
    ' · ' + _t('총 ', 'Total: ') + s.totalDays + _t('일 기록', ' days logged') + '</div>' +
  '</div>';
}

function _wasDayLogged(dateStr) {
  try {
    var meals = localStorage.getItem('mealcule_ct_meals_' + dateStr);
    if (meals && JSON.parse(meals).length > 0) return true;
    var analyses = JSON.parse(localStorage.getItem('mc_history') || '[]');
    return analyses.some(function(a) { return a.date && a.date.slice(0, 10) === dateStr; });
  } catch(e) { return false; }
}

// ═══════════════════════════════════════
// 2. DAILY COACHING TIPS — 일일 코칭
// ═══════════════════════════════════════

const COACHING_TIPS = [
  // 영양 과학
  { cat: 'nutrition', ko: '비타민 C는 열에 약해요. 채소를 먼저 씻고 짧게 볶으면 영양 손실을 줄일 수 있어요.', en: 'Vitamin C is heat-sensitive. Wash veggies first and stir-fry briefly to minimize nutrient loss.', icon: '🧬' },
  { cat: 'nutrition', ko: '철분 흡수를 높이려면 비타민 C가 풍부한 음식과 함께 드세요. 시금치+레몬이 좋은 조합!', en: 'Pair iron-rich foods with vitamin C for better absorption. Spinach + lemon is a great combo!', icon: '💪' },
  { cat: 'nutrition', ko: '단백질은 한 끼에 30g 이상 먹어도 추가 흡수가 제한적이에요. 끼니마다 나눠 드세요.', en: 'Your body can only use ~30g of protein per meal. Spread intake across meals for better results.', icon: '🥩' },
  { cat: 'nutrition', ko: '오메가-3 지방산은 뇌 건강에 필수적이에요. 연어, 고등어, 호두에 풍부해요.', en: 'Omega-3 fatty acids are essential for brain health. Found in salmon, mackerel, and walnuts.', icon: '🧠' },
  { cat: 'nutrition', ko: '식이섬유는 하루 25-30g이 권장량이에요. 대부분의 사람들은 절반도 못 먹어요.', en: 'Daily fiber target is 25-30g. Most people barely eat half. Add whole grains and veggies!', icon: '🌾' },
  { cat: 'nutrition', ko: '리코펜은 열을 가하면 오히려 흡수율이 높아져요. 토마토는 익혀 먹는 게 더 좋아요!', en: 'Lycopene absorption increases with heat. Cooked tomatoes are actually MORE nutritious!', icon: '🍅' },
  { cat: 'nutrition', ko: '칼슘 흡수에는 비타민 D가 필요해요. 하루 15분 햇빛을 쬐거나 보충제를 고려하세요.', en: 'Calcium needs vitamin D for absorption. Get 15 min of sunlight daily or consider supplements.', icon: '☀️' },
  // 조리 과학
  { cat: 'cooking', ko: '마이야르 반응은 140°C 이상에서 시작돼요. 팬을 충분히 달군 후 고기를 올리세요.', en: 'The Maillard reaction starts above 140°C. Preheat your pan well before adding meat.', icon: '🔥' },
  { cat: 'cooking', ko: '소금은 삼투압으로 수분을 빼요. 스테이크는 굽기 40분 전에 소금을 뿌리면 최상!', en: 'Salt draws moisture via osmosis. Season steak 40 min before cooking for the perfect crust.', icon: '🧂' },
  { cat: 'cooking', ko: '마늘을 다진 후 10분 기다리면 알리신이 안정화돼요. 항암 효과가 극대화됩니다.', en: 'Let crushed garlic rest 10 min before cooking. This stabilizes allicin for max health benefits.', icon: '🧄' },
  { cat: 'cooking', ko: '올리브오일의 발연점은 190°C. 고온 튀김에는 아보카도 오일(271°C)이 더 안전해요.', en: 'Olive oil smoke point is 190°C. For high-heat frying, avocado oil (271°C) is safer.', icon: '🫒' },
  { cat: 'cooking', ko: '양파를 천천히 캐러멜라이즈하면 당분이 2배로 늘어나요. 30분 이상 낮은 불에서!', en: 'Slow caramelizing onions doubles their sugar content. Cook on low heat for 30+ minutes!', icon: '🧅' },
  { cat: 'cooking', ko: '브로콜리를 3-4분만 찌면 설포라판(항암물질)이 가장 많이 보존돼요.', en: 'Steam broccoli for just 3-4 min to preserve maximum sulforaphane (anti-cancer compound).', icon: '🥦' },
  // 습관/마인드셋
  { cat: 'habit', ko: '식사 20분 전에 물 한 잔을 마시면 과식을 30% 줄일 수 있어요.', en: 'Drinking water 20 min before meals can reduce overeating by 30%.', icon: '💧' },
  { cat: 'habit', ko: '작은 접시를 사용하면 자연스럽게 20-30% 적게 먹게 돼요. 시각적 착시 효과!', en: 'Using smaller plates tricks your brain into eating 20-30% less. Visual illusion effect!', icon: '🍽️' },
  { cat: 'habit', ko: '천천히 씹으면 포만감 호르몬(렙틴)이 더 잘 분비돼요. 한 입에 20번 이상 씹기!', en: 'Chewing slowly boosts leptin (satiety hormone). Aim for 20+ chews per bite!', icon: '😋' },
  { cat: 'habit', ko: '수면이 7시간 미만이면 그렐린(배고픔 호르몬)이 15% 증가해요. 잘 자는 것도 다이어트!', en: 'Less than 7 hours of sleep increases ghrelin (hunger hormone) by 15%. Sleep is diet too!', icon: '😴' },
  { cat: 'habit', ko: '음식 기록만 해도 평균 체중 감량이 2배 증가해요. 꾸준히 기록하세요!', en: 'Just logging food doubles average weight loss. Keep tracking consistently!', icon: '📝' },
  { cat: 'habit', ko: '스트레스를 받으면 코르티솔이 올라가 복부 지방이 축적돼요. 심호흡 5분이 도움!', en: 'Stress raises cortisol, causing belly fat storage. 5 min of deep breathing helps!', icon: '🧘' },
  // 건강 지식
  { cat: 'health', ko: '장 건강은 면역의 70%를 담당해요. 발효식품(김치, 요거트)을 매일 드세요.', en: '70% of immunity is in your gut. Eat fermented foods (kimchi, yogurt) daily.', icon: '🦠' },
  { cat: 'health', ko: '항산화제가 풍부한 블루베리는 뇌 노화를 늦춰요. 하루 한 줌이면 충분!', en: 'Antioxidant-rich blueberries slow brain aging. Just one handful a day is enough!', icon: '🫐' },
  { cat: 'health', ko: '녹차의 카테킨은 지방 산화를 12% 높여요. 하루 3잔이 적당해요.', en: 'Green tea catechins boost fat oxidation by 12%. 3 cups daily is optimal.', icon: '🍵' },
  { cat: 'health', ko: '나트륨을 줄이면 혈압이 5-6mmHg 감소해요. 한국인 평균 섭취량은 권장의 2배!', en: 'Reducing sodium lowers blood pressure by 5-6 mmHg. Most people eat 2x the recommended amount.', icon: '❤️' },
  { cat: 'health', ko: '견과류 한 줌(28g)을 매일 먹으면 심장질환 위험이 30% 감소해요.', en: 'A daily handful of nuts (28g) reduces heart disease risk by 30%.', icon: '🥜' },
  { cat: 'health', ko: '강황의 커큐민은 강력한 항염증제예요. 후추와 함께 먹으면 흡수율이 2000% 증가!', en: 'Turmeric curcumin is a powerful anti-inflammatory. Eating with pepper increases absorption 2000%!', icon: '✨' },
];

function getDailyTip() {
  var today = new Date().toISOString().slice(0, 10);
  var savedTip = null;
  try { savedTip = JSON.parse(localStorage.getItem('mc_daily_tip') || 'null'); } catch(e) {}
  if (savedTip && savedTip.date === today) return savedTip.tip;

  // 날짜 기반 deterministic 선택 (매일 다른 팁)
  var seed = parseInt(today.replace(/-/g, ''));
  var idx = seed % COACHING_TIPS.length;
  var tip = COACHING_TIPS[idx];

  try { localStorage.setItem('mc_daily_tip', JSON.stringify({ date: today, tip: tip })); } catch(e) {}
  return tip;
}

function renderDailyTipWidget() {
  var tip = getDailyTip();
  var text = (window.I18n && I18n.lang === 'en') ? tip.en : tip.ko;
  var catLabels = { nutrition: _t('영양 과학', 'Nutrition Science'), cooking: _t('조리 과학', 'Cooking Science'), habit: _t('건강 습관', 'Healthy Habits'), health: _t('건강 지식', 'Health Knowledge') };
  return '<div class="daily-tip-widget">' +
    '<div class="tip-header">' +
      '<span class="tip-icon">' + tip.icon + '</span>' +
      '<span class="tip-cat">' + (catLabels[tip.cat] || '') + '</span>' +
      '<span class="tip-badge">' + _t('오늘의 팁', "Today's Tip") + '</span>' +
    '</div>' +
    '<div class="tip-text">' + text + '</div>' +
  '</div>';
}

// ═══════════════════════════════════════
// 3. FOOD QUALITY SCORING — 음식 품질 점수
// ═══════════════════════════════════════

/**
 * 식사의 영양 품질 점수 (0-100)
 * WHO/FDA 기준 기반
 */
function calcFoodQuality(meal) {
  if (!meal || !meal.cal) return { score: 0, grade: 'N/A', color: '#666', factors: [] };
  var score = 50; // 기본 점수
  var factors = [];

  // 단백질 충분성 (1g당 +0.3, 최대 +15)
  if (meal.protein) {
    var protScore = Math.min(15, meal.protein * 0.3);
    score += protScore;
    if (meal.protein >= 20) factors.push({ text: _t('단백질 충분', 'Good protein'), good: true });
  }

  // 지방 과다 체크 (칼로리의 35% 이상이면 감점)
  if (meal.fat && meal.cal) {
    var fatPct = (meal.fat * 9 / meal.cal) * 100;
    if (fatPct > 45) { score -= 15; factors.push({ text: _t('지방 과다', 'High fat'), good: false }); }
    else if (fatPct > 35) { score -= 5; }
    else if (fatPct >= 20 && fatPct <= 35) { score += 5; factors.push({ text: _t('지방 적정', 'Balanced fat'), good: true }); }
  }

  // 탄수화물 균형
  if (meal.carbs && meal.cal) {
    var carbPct = (meal.carbs * 4 / meal.cal) * 100;
    if (carbPct > 65) { score -= 10; factors.push({ text: _t('탄수화물 과다', 'High carbs'), good: false }); }
    else if (carbPct >= 45 && carbPct <= 65) { score += 5; }
  }

  // 칼로리 적정성 (한 끼 300-700 적정)
  if (meal.cal >= 300 && meal.cal <= 700) { score += 10; }
  else if (meal.cal > 900) { score -= 10; factors.push({ text: _t('고칼로리', 'High calorie'), good: false }); }
  else if (meal.cal < 150) { score -= 5; factors.push({ text: _t('칼로리 부족', 'Low calorie'), good: false }); }

  // 섬유질 보너스
  if (meal.fiber && meal.fiber >= 5) { score += 10; factors.push({ text: _t('식이섬유 풍부', 'High fiber'), good: true }); }

  score = Math.max(0, Math.min(100, Math.round(score)));

  var grade, color;
  if (score >= 80) { grade = 'A'; color = '#10b981'; }
  else if (score >= 65) { grade = 'B'; color = '#22c55e'; }
  else if (score >= 50) { grade = 'C'; color = '#eab308'; }
  else if (score >= 35) { grade = 'D'; color = '#f97316'; }
  else { grade = 'F'; color = '#ef4444'; }

  return { score: score, grade: grade, color: color, factors: factors };
}

/** 음식 품질 배지 HTML */
function renderQualityBadge(meal) {
  var q = calcFoodQuality(meal);
  return '<span class="food-quality-badge" style="background:' + q.color + '20;color:' + q.color + ';border:1px solid ' + q.color + '40" title="' + q.factors.map(function(f) { return f.text; }).join(', ') + '">' + q.grade + '</span>';
}

// ═══════════════════════════════════════
// 4. SMART GOAL ADJUSTMENT — 목표 자동 조정
// ═══════════════════════════════════════

/** 최근 7일 데이터 기반 목표 조정 제안 */
function getGoalSuggestion() {
  var weekData = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var ds = d.toISOString().slice(0, 10);
    try {
      var meals = JSON.parse(localStorage.getItem('mealcule_ct_meals_' + ds) || '[]');
      if (meals.length > 0) {
        var totals = meals.reduce(function(t, m) {
          return { cal: t.cal + (m.cal || 0), protein: t.protein + (m.protein || 0), fat: t.fat + (m.fat || 0), carbs: t.carbs + (m.carbs || 0) };
        }, { cal: 0, protein: 0, fat: 0, carbs: 0 });
        weekData.push(totals);
      }
    } catch(e) {}
  }

  if (weekData.length < 3) return null; // 데이터 부족

  var avgCal = Math.round(weekData.reduce(function(s, d) { return s + d.cal; }, 0) / weekData.length);
  var avgProt = Math.round(weekData.reduce(function(s, d) { return s + d.protein; }, 0) / weekData.length);

  var goals;
  try { goals = JSON.parse(localStorage.getItem('mealcule_ct_goals') || '{}'); } catch(e) { goals = {}; }
  var targetCal = goals.calories || 2000;

  var suggestions = [];

  // 평균 칼로리가 목표보다 계속 높으면
  if (avgCal > targetCal * 1.15) {
    suggestions.push({
      type: 'warning',
      text: _t('최근 7일 평균 섭취(' + avgCal + 'kcal)가 목표보다 15% 이상 높아요. 목표를 현실적으로 조정하거나 식단을 점검해보세요.',
        'Your 7-day average (' + avgCal + 'kcal) is 15%+ above your goal. Consider adjusting your target or reviewing your diet.'),
      action: 'adjust_up',
      suggestedCal: Math.round(avgCal * 0.95),
    });
  }

  // 평균 칼로리가 목표보다 많이 낮으면
  if (avgCal < targetCal * 0.7 && avgCal > 0) {
    suggestions.push({
      type: 'caution',
      text: _t('최근 7일 평균 섭취(' + avgCal + 'kcal)가 목표의 70% 미만이에요. 영양 부족에 주의하세요.',
        'Your 7-day average (' + avgCal + 'kcal) is below 70% of your goal. Watch for nutritional deficiency.'),
      action: 'adjust_down',
      suggestedCal: Math.round(avgCal * 1.1),
    });
  }

  // 단백질 부족
  var targetProt = goals.protein || 50;
  if (avgProt < targetProt * 0.6) {
    suggestions.push({
      type: 'tip',
      text: _t('단백질 섭취가 부족해요(평균 ' + avgProt + 'g). 달걀, 닭가슴살, 두부를 추가해보세요.',
        'Protein intake is low (avg ' + avgProt + 'g). Try adding eggs, chicken breast, or tofu.'),
    });
  }

  return suggestions.length > 0 ? suggestions : null;
}

function renderGoalSuggestions() {
  var suggestions = getGoalSuggestion();
  if (!suggestions) return '';

  return suggestions.map(function(s) {
    var bgColor = s.type === 'warning' ? 'rgba(239,68,68,0.08)' : s.type === 'caution' ? 'rgba(234,179,8,0.08)' : 'rgba(16,185,129,0.08)';
    var borderColor = s.type === 'warning' ? 'rgba(239,68,68,0.2)' : s.type === 'caution' ? 'rgba(234,179,8,0.2)' : 'rgba(16,185,129,0.2)';
    var icon = s.type === 'warning' ? '⚠️' : s.type === 'caution' ? '💡' : '✨';
    var actionBtn = '';
    if (s.suggestedCal) {
      actionBtn = ' <button onclick="_applyGoalSuggestion(' + s.suggestedCal + ')" style="margin-top:8px;padding:6px 12px;border-radius:8px;border:1px solid var(--accent);background:rgba(16,185,129,0.1);color:var(--accent);cursor:pointer;font-size:11px;font-family:inherit">' +
        _t('목표를 ' + s.suggestedCal + 'kcal로 조정', 'Adjust goal to ' + s.suggestedCal + 'kcal') + '</button>';
    }
    return '<div class="goal-suggestion" style="background:' + bgColor + ';border:1px solid ' + borderColor + '">' +
      '<span>' + icon + ' ' + s.text + '</span>' + actionBtn + '</div>';
  }).join('');
}

function _applyGoalSuggestion(cal) {
  try {
    var goals = JSON.parse(localStorage.getItem('mealcule_ct_goals') || '{}');
    goals.calories = cal;
    localStorage.setItem('mealcule_ct_goals', JSON.stringify(goals));
    _showEngageToast(_t('목표가 ' + cal + 'kcal로 조정되었습니다', 'Goal adjusted to ' + cal + 'kcal'), 'success');
    // Home 탭 리렌더링
    if (typeof _tabRendered !== 'undefined') _tabRendered.home = false;
    if (typeof renderHomeDashboard === 'function') renderHomeDashboard();
  } catch(e) {}
}

// ═══════════════════════════════════════
// 5. CELEBRATION ANIMATIONS — 축하 효과
// ═══════════════════════════════════════

function _celebrateMilestone(days) {
  var messages = {
    3: _t('🎉 3일 연속 기록! 좋은 습관이 시작되고 있어요!', '🎉 3-day streak! Great habit forming!'),
    7: _t('🔥 1주일 연속! 놀라운 꾸준함이에요!', '🔥 1 week streak! Amazing consistency!'),
    14: _t('⭐ 2주 연속! 건강한 생활이 자리잡고 있어요!', '⭐ 2 weeks! Healthy lifestyle taking root!'),
    30: _t('🏆 30일 연속! 당신은 진정한 건강 마스터!', '🏆 30 days! You are a true health master!'),
    50: _t('💎 50일 연속! 대단한 의지력이에요!', '💎 50 days! Incredible willpower!'),
    100: _t('👑 100일 연속! 전설적인 기록이에요!', '👑 100 days! Legendary achievement!'),
    365: _t('🌟 1년 연속! 당신은 영감 그 자체입니다!', '🌟 365 days! You ARE the inspiration!'),
  };
  var msg = messages[days] || ('🎊 ' + days + _t('일 연속!', ' day streak!'));

  // 컨페티 + 토스트
  _showConfetti();
  setTimeout(function() { _showEngageToast(msg, 'celebration'); }, 300);
}

function _showConfetti() {
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden';
  var colors = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

  for (var i = 0; i < 60; i++) {
    var p = document.createElement('div');
    var color = colors[Math.floor(Math.random() * colors.length)];
    var left = Math.random() * 100;
    var delay = Math.random() * 0.5;
    var size = 4 + Math.random() * 8;
    var shape = Math.random() > 0.5 ? '50%' : '0';
    p.style.cssText = 'position:absolute;top:-10px;left:' + left + '%;width:' + size + 'px;height:' + size + 'px;background:' + color + ';border-radius:' + shape + ';animation:confettiFall ' + (1.5 + Math.random()) + 's ease-out ' + delay + 's forwards;opacity:0.9';
    container.appendChild(p);
  }

  document.body.appendChild(container);
  setTimeout(function() { container.remove(); }, 3000);
}

function _showEngageToast(msg, type) {
  var el = document.createElement('div');
  var bg = type === 'celebration' ? 'linear-gradient(135deg,#10b981,#059669)' :
           type === 'reward' ? 'linear-gradient(135deg,#f59e0b,#d97706)' :
           type === 'success' ? 'rgba(16,185,129,0.95)' :
           'rgba(30,30,30,0.95)';
  el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);padding:14px 24px;border-radius:16px;background:' + bg + ';color:#fff;font-size:14px;font-weight:600;z-index:99998;opacity:0;transition:all .3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.3);text-align:center;max-width:90vw;backdrop-filter:blur(8px)';
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(function() {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(function() {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(function() { el.remove(); }, 300);
  }, 3500);
}

// ═══════════════════════════════════════
// 6. QUICK TEXT LOGGING — 텍스트 빠른 입력
// ═══════════════════════════════════════

/** AI 텍스트 빠른 입력 — "비빔밥, 계란 2개, 바나나" 같은 자연어 입력 */
function openQuickTextLog() {
  var _t = function(ko, en) { return (window.I18n && I18n.lang === 'en') ? en : ko; };

  var ov = document.createElement('div');
  ov.className = 'mc-data-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.7);display:flex;align-items:flex-end;justify-content:center;padding:0';
  ov.innerHTML = '<div style="background:var(--bg);border-radius:20px 20px 0 0;width:100%;max-width:500px;padding:24px;animation:slideUp .3s ease">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
      '<h3 style="margin:0;font-size:16px">' + _t('빠른 음식 기록', 'Quick Food Log') + '</h3>' +
      '<button onclick="this.closest(\'.mc-data-overlay\').remove()" style="background:none;border:none;color:var(--text);font-size:20px;cursor:pointer">&times;</button>' +
    '</div>' +
    '<p style="font-size:12px;color:var(--text-secondary);margin-bottom:12px">' +
      _t('먹은 음식을 자유롭게 입력하세요 (예: "비빔밥, 계란 2개, 바나나")', 'Type what you ate (e.g., "rice bowl, 2 eggs, banana")') +
    '</p>' +
    '<textarea id="quickTextInput" rows="3" placeholder="' + _t('오늘 먹은 음식을 입력하세요...', 'What did you eat today...') + '" style="width:100%;padding:14px;border-radius:12px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:14px;font-family:inherit;resize:none;outline:none"></textarea>' +
    '<div style="display:flex;gap:8px;margin-top:12px">' +
      '<button class="qt-meal-type active" onclick="_qtSelectMeal(this,\'lunch\')" data-type="lunch">🍽️ ' + _t('점심', 'Lunch') + '</button>' +
      '<button class="qt-meal-type" onclick="_qtSelectMeal(this,\'breakfast\')" data-type="breakfast">🌅 ' + _t('아침', 'Breakfast') + '</button>' +
      '<button class="qt-meal-type" onclick="_qtSelectMeal(this,\'dinner\')" data-type="dinner">🌙 ' + _t('저녁', 'Dinner') + '</button>' +
      '<button class="qt-meal-type" onclick="_qtSelectMeal(this,\'snack\')" data-type="snack">🍪 ' + _t('간식', 'Snack') + '</button>' +
    '</div>' +
    '<button id="quickTextSubmit" onclick="_submitQuickText()" style="width:100%;margin-top:16px;padding:14px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit">' +
      _t('기록하기', 'Log Food') +
    '</button>' +
  '</div>';

  ov.addEventListener('click', function(e) { if (e.target === ov) ov.remove(); });
  document.body.appendChild(ov);
  setTimeout(function() { document.getElementById('quickTextInput').focus(); }, 100);
}

var _qtMealType = 'lunch';
function _qtSelectMeal(btn, type) {
  _qtMealType = type;
  document.querySelectorAll('.qt-meal-type').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}

function _submitQuickText() {
  var input = document.getElementById('quickTextInput');
  if (!input || !input.value.trim()) return;

  var text = input.value.trim();
  var btn = document.getElementById('quickTextSubmit');
  btn.textContent = _t('분석 중...', 'Analyzing...');
  btn.disabled = true;

  // 빠른 음식 DB에서 매칭 시도
  var items = text.split(/[,，、\n]+/).map(function(s) { return s.trim(); }).filter(Boolean);
  var results = [];
  var unmatched = [];

  items.forEach(function(item) {
    var matched = _matchQuickFood(item);
    if (matched) results.push(matched);
    else unmatched.push(item);
  });

  // 매칭 안 된 항목은 DB에서 검색
  if (typeof DB !== 'undefined') {
    unmatched.forEach(function(item) {
      var found = null;
      Object.keys(DB).forEach(function(key) {
        if (!found && (key.indexOf(item) >= 0 || item.indexOf(key) >= 0 || (DB[key].en && DB[key].en.toLowerCase().indexOf(item.toLowerCase()) >= 0))) {
          found = key;
        }
      });
      if (found) {
        var d = DB[found];
        var g = d.defaultG || 100;
        results.push({
          name: (window.I18n && I18n.lang === 'en') ? (d.en || found) : found,
          cal: Math.round((d.comp.protein * 4 + d.comp.fat * 9 + d.comp.carbs * 4) * g / 100),
          protein: Math.round(d.comp.protein * g / 100),
          fat: Math.round(d.comp.fat * g / 100),
          carbs: Math.round(d.comp.carbs * g / 100),
          icon: d.emoji || '🍽️',
          meal_type: _qtMealType,
        });
      } else {
        // 기본 추정 (100kcal)
        results.push({
          name: item,
          cal: 100,
          protein: 5,
          fat: 3,
          carbs: 12,
          icon: '🍽️',
          meal_type: _qtMealType,
          estimated: true,
        });
      }
    });
  }

  // 칼로리 트래커에 추가
  results.forEach(function(r) {
    _addMealToTracker(r);
  });

  // 스트릭 업데이트
  updateStreak();

  // 닫기 + 피드백
  var overlay = document.querySelector('.mc-data-overlay');
  if (overlay) overlay.remove();

  var totalCal = results.reduce(function(s, r) { return s + r.cal; }, 0);
  _showEngageToast(results.length + _t('개 음식 기록 (+' + totalCal + 'kcal)', ' foods logged (+' + totalCal + 'kcal)'), 'success');

  // Home 탭 리렌더링
  if (typeof _tabRendered !== 'undefined') _tabRendered.home = false;
}

function _matchQuickFood(text) {
  if (typeof _CT_QUICK_FOODS === 'undefined') return null;
  var lower = text.toLowerCase();
  for (var i = 0; i < _CT_QUICK_FOODS.length; i++) {
    var f = _CT_QUICK_FOODS[i];
    if (f.name_ko.indexOf(text) >= 0 || f.name_en.toLowerCase().indexOf(lower) >= 0 ||
        text.indexOf(f.name_ko.replace(/ \d+.*$/, '')) >= 0) {
      return {
        name: (window.I18n && I18n.lang === 'en') ? f.name_en : f.name_ko,
        cal: f.cal, protein: f.protein, fat: f.fat, carbs: f.carbs,
        icon: f.icon, img: f.img, meal_type: _qtMealType,
      };
    }
  }
  return null;
}

function _addMealToTracker(item) {
  var today = new Date().toISOString().slice(0, 10);
  var meals = [];
  try { meals = JSON.parse(localStorage.getItem('mealcule_ct_meals_' + today) || '[]'); } catch(e) {}

  // 데모 데이터 제거
  meals = meals.filter(function(m) { return !m.id || !m.id.startsWith('demo-'); });

  meals.push({
    id: 'qt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
    meal_type: item.meal_type || 'lunch',
    name: item.name,
    cal: item.cal || 0,
    protein: item.protein || 0,
    fat: item.fat || 0,
    carbs: item.carbs || 0,
    time: new Date().toTimeString().slice(0, 5),
    icon: item.icon || '🍽️',
    img: item.img || '',
  });

  try { localStorage.setItem('mealcule_ct_meals_' + today, JSON.stringify(meals)); } catch(e) {}
}

// ═══════════════════════════════════════
// 7. CSS INJECTION
// ═══════════════════════════════════════

function _injectEngagementStyles() {
  if (document.getElementById('engagementStyles')) return;
  var style = document.createElement('style');
  style.id = 'engagementStyles';
  style.textContent = `
    /* Streak Widget */
    .streak-widget{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px}
    .streak-top{display:flex;align-items:center;gap:8px;margin-bottom:12px}
    .streak-fire{font-size:28px}
    .streak-count{font-size:28px;font-weight:800;color:var(--accent)}
    .streak-text{font-size:13px;color:var(--text-secondary)}
    .streak-freezes{margin-left:auto;font-size:12px;padding:4px 8px;border-radius:8px;background:rgba(245,158,11,0.1);color:#f59e0b;border:1px solid rgba(245,158,11,0.2)}
    .streak-days{display:flex;gap:6px;justify-content:space-around;margin-bottom:10px}
    .streak-day{text-align:center}
    .streak-dot{width:28px;height:28px;border-radius:50%;border:2px solid var(--border);margin:0 auto 4px;transition:all .2s}
    .streak-day.filled .streak-dot{background:var(--accent);border-color:var(--accent)}
    .streak-day.today .streak-dot{border-color:var(--accent);box-shadow:0 0 8px var(--accent-glow)}
    .streak-day-label{font-size:10px;color:var(--text-tertiary)}
    .streak-best{font-size:11px;color:var(--text-tertiary);text-align:center}

    /* Daily Tip */
    .daily-tip-widget{background:linear-gradient(135deg,rgba(16,185,129,0.06),rgba(59,130,246,0.06));border:1px solid rgba(16,185,129,0.15);border-radius:16px;padding:16px;margin-bottom:16px}
    .tip-header{display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .tip-icon{font-size:20px}
    .tip-cat{font-size:11px;color:var(--accent);font-weight:600}
    .tip-badge{margin-left:auto;font-size:10px;padding:3px 8px;border-radius:6px;background:var(--accent);color:#fff;font-weight:600}
    .tip-text{font-size:13px;line-height:1.7;color:var(--text)}

    /* Food Quality Badge */
    .food-quality-badge{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;font-size:11px;font-weight:700;flex-shrink:0}

    /* Goal Suggestion */
    .goal-suggestion{padding:12px 14px;border-radius:12px;font-size:12px;line-height:1.6;color:var(--text);margin-bottom:8px}

    /* Quick Text Meal Type */
    .qt-meal-type{padding:8px 14px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:12px;font-family:inherit;transition:all .2s}
    .qt-meal-type.active{background:var(--accent);color:#fff;border-color:var(--accent)}

    /* Home Quick Actions */
    .home-quick-log{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
    .home-quick-btn{padding:14px 12px;border-radius:14px;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;font-size:13px;font-weight:500;display:flex;align-items:center;gap:8px;transition:all .15s;font-family:inherit}
    .home-quick-btn:hover{background:var(--card-hover);border-color:var(--border-hover)}
    .home-quick-btn .qb-icon{font-size:20px}

    /* Confetti */
    @keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
    @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}

    /* Daily Summary Card */
    .daily-summary-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px}
    .daily-summary-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
    .daily-summary-ring{position:relative;width:80px;height:80px;margin:0 auto 12px}
    .daily-summary-ring svg{width:80px;height:80px}
    .daily-summary-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .daily-summary-macros{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center}
    .dsm-val{font-size:14px;font-weight:700;color:var(--text)}
    .dsm-label{font-size:10px;color:var(--text-secondary)}
    .dsm-bar{height:3px;border-radius:2px;background:rgba(255,255,255,0.08);margin-top:4px;overflow:hidden}
    .dsm-fill{height:100%;border-radius:2px;transition:width .3s ease}
  `;
  document.head.appendChild(style);
}

// Auto-inject on load
if (typeof document !== 'undefined') _injectEngagementStyles();
