// ── Health Dashboard Module ──
// Depends on globals from app.js: sbClient, dbQuery, dbRPC, currentUser, userPlan, isGuest, showToast, I18n

if (typeof _t === 'undefined') var _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;

// ── State ──
let _hdPeriod = 'today';
let _hdNutritionData = [];
let _hdGoals = { calories: 2000, protein: 50, fat: 65, carbs: 300, fiber: 25 };
let _hdHealthScore = null;
let _healthProfile = null;

// ── CSS Injection ──
function _injectHDStyles() {
  if (document.getElementById('hd-styles')) return;
  const style = document.createElement('style');
  style.id = 'hd-styles';
  style.textContent = `
    .hd-overlay {
      position: fixed; inset: 0; z-index: 8000;
      background: #f5f5f5; overflow-y: auto;
      display: none; flex-direction: column;
    }
    .hd-overlay.active { display: flex; }
    .hd-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; background: #fff;
      border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 10;
    }
    .hd-header h1 { font-size: 20px; font-weight: 700; margin: 0; color: #111; }
    .hd-close-btn {
      width: 36px; height: 36px; border-radius: 50%; border: none;
      background: #f3f4f6; cursor: pointer; font-size: 20px;
      display: flex; align-items: center; justify-content: center; color: #374151;
    }
    .hd-close-btn:hover { background: #e5e7eb; }
    .hd-period-tabs {
      display: flex; gap: 8px; padding: 12px 20px; background: #fff;
      border-bottom: 1px solid #e5e7eb;
    }
    .hd-period-tab {
      padding: 6px 16px; border-radius: 20px; border: 1px solid #d1d5db;
      background: #fff; cursor: pointer; font-size: 13px; color: #374151;
      transition: all .15s;
    }
    .hd-period-tab.active {
      background: #059669; color: #fff; border-color: #059669;
    }
    .hd-body {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; padding: 20px; max-width: 1100px;
      margin: 0 auto; width: 100%;
    }
    @media (max-width: 600px) {
      .hd-body { grid-template-columns: 1fr; padding: 12px; gap: 12px; }
    }
    .hd-card {
      background: #fff; border-radius: 14px; padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,.08); overflow: hidden;
    }
    .hd-card.full-width { grid-column: 1 / -1; }
    .hd-card h2 {
      font-size: 15px; font-weight: 600; margin: 0 0 14px 0; color: #111;
    }
    .hd-ring-row { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
    .hd-ring-item { text-align: center; }
    .hd-ring-label { font-size: 11px; color: #6b7280; margin-top: 4px; }
    .hd-ring-value { font-size: 13px; font-weight: 600; color: #111; }
    .hd-btn {
      padding: 8px 16px; border-radius: 8px; border: none;
      font-size: 13px; font-weight: 500; cursor: pointer;
      transition: background .15s;
    }
    .hd-btn-primary { background: #059669; color: #fff; }
    .hd-btn-primary:hover { background: #047857; }
    .hd-btn-outline { background: #fff; color: #059669; border: 1px solid #059669; }
    .hd-btn-outline:hover { background: #ecfdf5; }
    .hd-upgrade-prompt {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; padding: 60px 20px; text-align: center;
      min-height: 60vh;
    }
    .hd-upgrade-prompt h2 { font-size: 22px; margin-bottom: 12px; color: #111; }
    .hd-upgrade-prompt p { color: #6b7280; max-width: 400px; margin-bottom: 20px; }
    .hd-bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 160px; }
    .hd-bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; }
    .hd-bar-label { font-size: 10px; color: #6b7280; margin-top: 4px; white-space: nowrap; }
    .hd-bar-value { font-size: 10px; font-weight: 600; margin-bottom: 2px; }
    .hd-macro-pie {
      width: 140px; height: 140px; border-radius: 50%; margin: 0 auto;
    }
    .hd-macro-legend { display: flex; gap: 16px; justify-content: center; margin-top: 12px; flex-wrap: wrap; }
    .hd-macro-legend-item { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #374151; }
    .hd-macro-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .hd-score-gauge { text-align: center; }
    .hd-score-factors { margin-top: 12px; }
    .hd-factor-row {
      display: flex; justify-content: space-between; padding: 6px 0;
      font-size: 13px; border-bottom: 1px solid #f3f4f6;
    }
    .hd-factor-positive { color: #059669; }
    .hd-factor-negative { color: #ef4444; }
    .hd-modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.4);
      z-index: 8500; display: flex; align-items: center; justify-content: center;
    }
    .hd-modal {
      background: #fff; border-radius: 14px; padding: 24px;
      max-width: 420px; width: 90%; max-height: 90vh; overflow-y: auto;
    }
    .hd-modal h2 { font-size: 18px; font-weight: 600; margin: 0 0 16px; }
    .hd-form-group { margin-bottom: 14px; }
    .hd-form-group label {
      display: block; font-size: 13px; font-weight: 500;
      color: #374151; margin-bottom: 4px;
    }
    .hd-form-group input, .hd-form-group select {
      width: 100%; padding: 8px 12px; border: 1px solid #d1d5db;
      border-radius: 8px; font-size: 14px; box-sizing: border-box;
    }
    .hd-form-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
    .hd-trend-chart { width: 100%; }
    @keyframes hd-ring-anim {
      from { stroke-dasharray: 0 999; }
    }
  `;
  document.head.appendChild(style);
}

// ── Open / Close ──

function openHealthDashboard() {
  _injectHDStyles();
  let overlay = document.getElementById('hdOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'hdOverlay';
    overlay.className = 'hd-overlay';
    document.body.appendChild(overlay);
  }

  // Pro-only gate
  const isFree = typeof isGuest !== 'undefined' && isGuest
    || (typeof userPlan !== 'undefined' && userPlan === 'free');

  if (isFree) {
    overlay.innerHTML = `
      <div class="hd-header">
        <h1>${_t('건강 대시보드', 'Health Dashboard')}</h1>
        <button class="hd-close-btn" onclick="closeHealthDashboard()">&times;</button>
      </div>
      <div class="hd-upgrade-prompt">
        <h2>${_t('Pro 전용 기능', 'Pro Feature')}</h2>
        <p>${_t(
          '건강 대시보드는 Pro 플랜에서 사용할 수 있습니다. 영양 목표 관리, 건강 점수, 섭취 분석 등을 이용해 보세요.',
          'The Health Dashboard is available on the Pro plan. Track nutrition goals, health scores, intake analysis and more.'
        )}</p>
        <button class="hd-btn hd-btn-primary" onclick="closeHealthDashboard(); if(typeof openPricing==='function') openPricing();">
          ${_t('업그레이드', 'Upgrade')}
        </button>
      </div>`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
  }

  _hdPeriod = 'today';
  overlay.innerHTML = _buildHeaderHTML();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  _loadProfileAndGoals().then(() => renderDashboard(_hdPeriod));
}

function closeHealthDashboard() {
  const overlay = document.getElementById('hdOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function _buildHeaderHTML() {
  const periods = [
    { key: 'today', ko: '오늘', en: 'Today' },
    { key: 'week',  ko: '이번 주', en: 'This Week' },
    { key: 'month', ko: '이번 달', en: 'This Month' },
  ];
  const tabs = periods.map(p =>
    `<button class="hd-period-tab${p.key === _hdPeriod ? ' active' : ''}" data-period="${p.key}">${_t(p.ko, p.en)}</button>`
  ).join('');
  return `
    <div class="hd-header">
      <h1>${_t('건강 대시보드', 'Health Dashboard')}</h1>
      <button class="hd-close-btn" onclick="closeHealthDashboard()">&times;</button>
    </div>
    <div class="hd-period-tabs" id="hdPeriodTabs">${tabs}</div>
    <div class="hd-body" id="hdBody"></div>`;
}

// ── Period Tab Handler ──

function _bindPeriodTabs() {
  const tabs = document.getElementById('hdPeriodTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.hd-period-tab');
    if (!btn) return;
    const period = btn.dataset.period;
    _hdPeriod = period;
    tabs.querySelectorAll('.hd-period-tab').forEach(t => t.classList.toggle('active', t.dataset.period === period));
    renderDashboard(period);
  });
}

// ── Profile & Goals Loader ──

async function _loadProfileAndGoals() {
  if (!currentUser) return;
  try {
    const [goalsRes, profileRes] = await Promise.all([
      dbQuery('nutrition_goals', 'select', { filters: { user_id: currentUser.id }, single: true }),
      dbQuery('health_profiles', 'select', { filters: { user_id: currentUser.id }, single: true }),
    ]);
    if (goalsRes && goalsRes.calories) {
      _hdGoals = {
        calories: goalsRes.calories || 2000,
        protein: goalsRes.protein || 50,
        fat: goalsRes.fat || 65,
        carbs: goalsRes.carbs || 300,
        fiber: goalsRes.fiber || 25,
      };
    }
    if (profileRes) _healthProfile = profileRes;
  } catch (e) {
    console.warn('[HealthDashboard] failed to load goals/profile', e);
  }
}

// ── Date Helpers ──

function _hdDateRange(period) {
  const now = new Date();
  const end = now.toISOString().slice(0, 10);
  let start = end;
  if (period === 'week') {
    const d = new Date(now);
    const day = d.getDay();
    d.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    start = d.toISOString().slice(0, 10);
  } else if (period === 'month') {
    start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  }
  return { start, end };
}

function _hdDaysBetween(start, end) {
  return Math.max(1, Math.round((new Date(end) - new Date(start)) / 86400000) + 1);
}

// ── Main Render ──

async function renderDashboard(period) {
  _bindPeriodTabs();
  const body = document.getElementById('hdBody');
  if (!body) return;

  body.innerHTML = `<div class="hd-card full-width" style="text-align:center;padding:40px;">
    <p style="color:#6b7280;">${_t('로딩 중...', 'Loading...')}</p>
  </div>`;

  const { start, end } = _hdDateRange(period);
  _hdNutritionData = await loadNutritionData(start, end);

  const score = calculateHealthScore(_hdNutritionData, _hdGoals);
  _hdHealthScore = score;

  body.innerHTML = '';
  body.innerHTML += renderNutritionGoalCard();
  body.innerHTML += renderHealthScoreCard();
  body.innerHTML += renderDailyIntakeChart(period);
  body.innerHTML += renderMacroBreakdown(period);
  body.innerHTML += renderWeeklyTrend();

  // Bind edit-goals button
  const editBtn = document.getElementById('hdEditGoalsBtn');
  if (editBtn) editBtn.addEventListener('click', () => editNutritionGoals());

  // Bind manual-meal button
  const addBtn = document.getElementById('hdAddMealBtn');
  if (addBtn) addBtn.addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10);
    logManualMeal(today, 'snack');
  });
}

// ── Nutrition Goal Card ──

function renderNutritionGoalCard() {
  const totals = _aggregateNutrition(_hdNutritionData);
  const days = _hdNutritionData.length > 0
    ? new Set(_hdNutritionData.map(r => r.date || r.logged_at?.slice(0, 10))).size || 1
    : 1;
  const avg = {
    calories: Math.round(totals.calories / days),
    protein: Math.round(totals.protein / days),
    fat: Math.round(totals.fat / days),
    carbs: Math.round(totals.carbs / days),
  };

  const rings = [
    { key: 'calories', label: _t('칼로리', 'Calories'), actual: avg.calories, goal: _hdGoals.calories, unit: 'kcal', color: '#059669' },
    { key: 'protein',  label: _t('단백질', 'Protein'),  actual: avg.protein,  goal: _hdGoals.protein,  unit: 'g',    color: '#3b82f6' },
    { key: 'fat',      label: _t('지방', 'Fat'),        actual: avg.fat,      goal: _hdGoals.fat,      unit: 'g',    color: '#f59e0b' },
    { key: 'carbs',    label: _t('탄수화물', 'Carbs'),   actual: avg.carbs,    goal: _hdGoals.carbs,    unit: 'g',    color: '#8b5cf6' },
  ];

  const ringSvgs = rings.map(r => {
    const pct = Math.min(r.actual / (r.goal || 1), 1);
    const radius = 32;
    const circ = 2 * Math.PI * radius;
    const dash = circ * pct;
    return `
      <div class="hd-ring-item">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="6"/>
          <circle cx="40" cy="40" r="${radius}" fill="none" stroke="${r.color}" stroke-width="6"
            stroke-dasharray="${dash} ${circ}" stroke-linecap="round"
            transform="rotate(-90 40 40)" style="animation: hd-ring-anim .8s ease-out;"/>
          <text x="40" y="38" text-anchor="middle" font-size="12" font-weight="600" fill="#111">${Math.round(pct * 100)}%</text>
          <text x="40" y="51" text-anchor="middle" font-size="8" fill="#6b7280">${r.actual}/${r.goal}</text>
        </svg>
        <div class="hd-ring-label">${r.label}</div>
      </div>`;
  }).join('');

  return `
    <div class="hd-card full-width">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <h2>${_t('영양 목표', 'Nutrition Goals')}</h2>
        <div style="display:flex;gap:8px;">
          <button class="hd-btn hd-btn-outline" id="hdAddMealBtn">${_t('식사 기록', 'Log Meal')}</button>
          <button class="hd-btn hd-btn-primary" id="hdEditGoalsBtn">${_t('목표 수정', 'Edit Goals')}</button>
        </div>
      </div>
      <div class="hd-ring-row">${ringSvgs}</div>
    </div>`;
}

// ── Daily Intake Chart ──

function renderDailyIntakeChart(period) {
  const { start, end } = _hdDateRange(period);
  const days = _hdDaysBetween(start, end);
  const dailyMap = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dailyMap[d.toISOString().slice(0, 10)] = 0;
  }
  _hdNutritionData.forEach(r => {
    const key = r.date || r.logged_at?.slice(0, 10);
    if (key && dailyMap[key] !== undefined) {
      dailyMap[key] += (r.calories || 0);
    }
  });

  const entries = Object.entries(dailyMap);
  const maxVal = Math.max(_hdGoals.calories * 1.3, ...entries.map(e => e[1]), 1);
  const barHeight = 140;
  const goalY = barHeight - ((_hdGoals.calories / maxVal) * barHeight);

  // Limit display to 14 bars max for readability
  const display = entries.length > 14
    ? entries.slice(entries.length - 14)
    : entries;

  const barW = Math.max(16, Math.floor(500 / display.length) - 6);
  const chartW = display.length * (barW + 6) + 10;

  const bars = display.map(([date, cal], i) => {
    const h = Math.max(2, (cal / maxVal) * barHeight);
    const ratio = _hdGoals.calories > 0 ? Math.abs(cal - _hdGoals.calories) / _hdGoals.calories : 0;
    let color = '#059669';
    if (ratio > 0.25) color = '#ef4444';
    else if (ratio > 0.1) color = '#eab308';
    const x = i * (barW + 6) + 5;
    const label = date.slice(5); // MM-DD
    return `
      <rect x="${x}" y="${barHeight - h}" width="${barW}" height="${h}" rx="3" fill="${color}" opacity=".85"/>
      <text x="${x + barW / 2}" y="${barHeight + 14}" text-anchor="middle" font-size="9" fill="#6b7280">${label}</text>
      ${cal > 0 ? `<text x="${x + barW / 2}" y="${barHeight - h - 4}" text-anchor="middle" font-size="9" font-weight="600" fill="${color}">${cal}</text>` : ''}`;
  }).join('');

  return `
    <div class="hd-card full-width">
      <h2>${_t('일별 칼로리 섭취', 'Daily Calorie Intake')}</h2>
      <div style="overflow-x:auto;">
        <svg width="${chartW}" height="${barHeight + 24}" style="min-width:100%;">
          <line x1="0" y1="${goalY}" x2="${chartW}" y2="${goalY}" stroke="#059669" stroke-dasharray="4 3" stroke-width="1"/>
          <text x="${chartW - 4}" y="${goalY - 4}" text-anchor="end" font-size="9" fill="#059669">${_t('목표', 'Goal')}</text>
          ${bars}
        </svg>
      </div>
      <div style="display:flex;gap:12px;margin-top:8px;font-size:11px;color:#6b7280;flex-wrap:wrap;">
        <span><span style="color:#059669;">&#9632;</span> ${_t('목표 ±10%', 'Within 10%')}</span>
        <span><span style="color:#eab308;">&#9632;</span> ${_t('10-25% 차이', '10-25% off')}</span>
        <span><span style="color:#ef4444;">&#9632;</span> ${_t('25% 초과', '>25% off')}</span>
      </div>
    </div>`;
}

// ── Macro Breakdown ──

function renderMacroBreakdown(period) {
  const totals = _aggregateNutrition(_hdNutritionData);
  const proteinCal = totals.protein * 4;
  const fatCal = totals.fat * 9;
  const carbsCal = totals.carbs * 4;
  const total = proteinCal + fatCal + carbsCal || 1;

  const pctProtein = Math.round((proteinCal / total) * 100);
  const pctFat = Math.round((fatCal / total) * 100);
  const pctCarbs = 100 - pctProtein - pctFat;

  const gradient = `conic-gradient(#3b82f6 0% ${pctProtein}%, #f59e0b ${pctProtein}% ${pctProtein + pctFat}%, #8b5cf6 ${pctProtein + pctFat}% 100%)`;

  return `
    <div class="hd-card">
      <h2>${_t('매크로 비율', 'Macro Breakdown')}</h2>
      <div class="hd-macro-pie" style="background:${gradient};"></div>
      <div class="hd-macro-legend">
        <div class="hd-macro-legend-item"><span class="hd-macro-dot" style="background:#3b82f6;"></span> ${_t('단백질', 'Protein')} ${pctProtein}%</div>
        <div class="hd-macro-legend-item"><span class="hd-macro-dot" style="background:#f59e0b;"></span> ${_t('지방', 'Fat')} ${pctFat}%</div>
        <div class="hd-macro-legend-item"><span class="hd-macro-dot" style="background:#8b5cf6;"></span> ${_t('탄수화물', 'Carbs')} ${pctCarbs}%</div>
      </div>
      <div style="text-align:center;margin-top:10px;font-size:12px;color:#6b7280;">
        ${_t('단백질', 'Protein')} ${totals.protein}g &middot;
        ${_t('지방', 'Fat')} ${totals.fat}g &middot;
        ${_t('탄수화물', 'Carbs')} ${totals.carbs}g
      </div>
    </div>`;
}

// ── Health Score Card ──

function renderHealthScoreCard() {
  const score = _hdHealthScore || { total: 0, balance: 0, variety: 0, conditions: 0, factors: [] };
  const total = score.total;
  let scoreColor = '#059669';
  if (total < 50) scoreColor = '#ef4444';
  else if (total < 75) scoreColor = '#eab308';

  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const dash = circ * (total / 100);

  const factorsHTML = (score.factors || []).map(f => {
    const cls = f.value >= 0 ? 'hd-factor-positive' : 'hd-factor-negative';
    const sign = f.value >= 0 ? '+' : '';
    return `<div class="hd-factor-row"><span>${f.label}</span><span class="${cls}">${sign}${f.value}</span></div>`;
  }).join('');

  return `
    <div class="hd-card">
      <h2>${_t('건강 점수', 'Health Score')}</h2>
      <div class="hd-score-gauge">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="#e5e7eb" stroke-width="10"/>
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="${scoreColor}" stroke-width="10"
            stroke-dasharray="${dash} ${circ}" stroke-linecap="round"
            transform="rotate(-90 70 70)" style="animation: hd-ring-anim 1s ease-out;"/>
          <text x="70" y="66" text-anchor="middle" font-size="32" font-weight="700" fill="${scoreColor}">${total}</text>
          <text x="70" y="84" text-anchor="middle" font-size="11" fill="#6b7280">/100</text>
        </svg>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;margin:10px 0;font-size:12px;color:#6b7280;">
        <span>${_t('균형', 'Balance')}: ${score.balance}/40</span>
        <span>${_t('다양성', 'Variety')}: ${score.variety}/30</span>
        <span>${_t('건강상태', 'Conditions')}: ${score.conditions}/30</span>
      </div>
      <div class="hd-score-factors">${factorsHTML || `<p style="font-size:12px;color:#9ca3af;text-align:center;">${_t('데이터가 부족합니다', 'Not enough data')}</p>`}</div>
    </div>`;
}

// ── Weekly Trend ──

function renderWeeklyTrend() {
  // Compute 4-week health score trend (simulated from available data)
  const weeks = [];
  const now = new Date();
  for (let w = 3; w >= 0; w--) {
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() - w * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() - 6);
    const label = `${weekStart.toISOString().slice(5, 10)}`;
    // Filter nutrition data for this week
    const startStr = weekStart.toISOString().slice(0, 10);
    const endStr = weekEnd.toISOString().slice(0, 10);
    const weekData = _hdNutritionData.filter(r => {
      const d = r.date || r.logged_at?.slice(0, 10);
      return d >= startStr && d <= endStr;
    });
    const s = calculateHealthScore(weekData, _hdGoals);
    weeks.push({ label, score: s.total });
  }

  const maxScore = 100;
  const chartW = 300;
  const chartH = 120;
  const padX = 30;
  const padY = 10;
  const innerW = chartW - padX * 2;
  const innerH = chartH - padY * 2;

  const points = weeks.map((w, i) => {
    const x = padX + (i / (weeks.length - 1 || 1)) * innerW;
    const y = padY + innerH - (w.score / maxScore) * innerH;
    return { x, y, label: w.label, score: w.score };
  });

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const dots = points.map(p =>
    `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#059669"/>
     <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" font-size="10" font-weight="600" fill="#059669">${p.score}</text>
     <text x="${p.x}" y="${chartH}" text-anchor="middle" font-size="9" fill="#6b7280">${p.label}</text>`
  ).join('');

  return `
    <div class="hd-card full-width">
      <h2>${_t('주간 건강 점수 추이', 'Weekly Health Score Trend')}</h2>
      <svg class="hd-trend-chart" viewBox="0 0 ${chartW} ${chartH + 10}" preserveAspectRatio="xMidYMid meet">
        <line x1="${padX}" y1="${padY}" x2="${padX}" y2="${chartH - padY}" stroke="#e5e7eb" stroke-width="1"/>
        <line x1="${padX}" y1="${chartH - padY}" x2="${chartW - padX}" y2="${chartH - padY}" stroke="#e5e7eb" stroke-width="1"/>
        <polyline points="${polyline}" fill="none" stroke="#059669" stroke-width="2.5" stroke-linejoin="round"/>
        ${dots}
      </svg>
    </div>`;
}

// ── Edit Nutrition Goals Modal ──

function editNutritionGoals() {
  const existing = document.querySelector('.hd-modal-backdrop');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.className = 'hd-modal-backdrop';
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.remove(); });

  const fields = [
    { key: 'calories', label: _t('칼로리 (kcal)', 'Calories (kcal)'), value: _hdGoals.calories },
    { key: 'protein',  label: _t('단백질 (g)', 'Protein (g)'),         value: _hdGoals.protein },
    { key: 'fat',      label: _t('지방 (g)', 'Fat (g)'),               value: _hdGoals.fat },
    { key: 'carbs',    label: _t('탄수화물 (g)', 'Carbs (g)'),          value: _hdGoals.carbs },
    { key: 'fiber',    label: _t('식이섬유 (g)', 'Fiber (g)'),          value: _hdGoals.fiber },
  ];

  const fieldsHTML = fields.map(f => `
    <div class="hd-form-group">
      <label>${f.label}</label>
      <input type="number" id="hdGoal_${f.key}" value="${f.value}" min="0" step="1"/>
    </div>
  `).join('');

  backdrop.innerHTML = `
    <div class="hd-modal">
      <h2>${_t('영양 목표 설정', 'Set Nutrition Goals')}</h2>
      ${fieldsHTML}
      <div class="hd-form-actions">
        <button class="hd-btn hd-btn-outline" id="hdGoalCancel">${_t('취소', 'Cancel')}</button>
        <button class="hd-btn hd-btn-primary" id="hdGoalSave">${_t('저장', 'Save')}</button>
      </div>
    </div>`;
  document.body.appendChild(backdrop);

  document.getElementById('hdGoalCancel').addEventListener('click', () => backdrop.remove());
  document.getElementById('hdGoalSave').addEventListener('click', async () => {
    const newGoals = {};
    fields.forEach(f => {
      newGoals[f.key] = parseInt(document.getElementById(`hdGoal_${f.key}`).value) || 0;
    });

    try {
      if (currentUser) {
        await dbQuery('nutrition_goals', 'upsert', {
          data: { user_id: currentUser.id, ...newGoals, updated_at: new Date().toISOString() },
          onConflict: 'user_id',
        });
      }
      Object.assign(_hdGoals, newGoals);
      showToast(_t('목표가 저장되었습니다', 'Goals saved'));
      backdrop.remove();
      renderDashboard(_hdPeriod);
    } catch (e) {
      console.error('[HealthDashboard] save goals error', e);
      showToast(_t('저장 실패', 'Failed to save'), 'error');
    }
  });
}

// ── Log Manual Meal Modal ──

function logManualMeal(date, mealType) {
  const existing = document.querySelector('.hd-modal-backdrop');
  if (existing) existing.remove();

  const mealLabels = {
    breakfast: _t('아침', 'Breakfast'),
    lunch:     _t('점심', 'Lunch'),
    dinner:    _t('저녁', 'Dinner'),
    snack:     _t('간식', 'Snack'),
  };
  const mealOptions = Object.entries(mealLabels).map(([k, v]) =>
    `<option value="${k}" ${k === mealType ? 'selected' : ''}>${v}</option>`
  ).join('');

  const backdrop = document.createElement('div');
  backdrop.className = 'hd-modal-backdrop';
  backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.remove(); });

  backdrop.innerHTML = `
    <div class="hd-modal">
      <h2>${_t('식사 기록', 'Log Meal')}</h2>
      <div class="hd-form-group">
        <label>${_t('날짜', 'Date')}</label>
        <input type="date" id="hdMealDate" value="${date}"/>
      </div>
      <div class="hd-form-group">
        <label>${_t('식사 유형', 'Meal Type')}</label>
        <select id="hdMealType">${mealOptions}</select>
      </div>
      <div class="hd-form-group">
        <label>${_t('음식 이름', 'Meal Name')}</label>
        <input type="text" id="hdMealName" placeholder="${_t('예: 닭가슴살 샐러드', 'e.g. Chicken salad')}"/>
      </div>
      <div class="hd-form-group">
        <label>${_t('칼로리 (kcal)', 'Calories (kcal)')}</label>
        <input type="number" id="hdMealCal" min="0" step="1" value="0"/>
      </div>
      <div class="hd-form-group">
        <label>${_t('단백질 (g)', 'Protein (g)')}</label>
        <input type="number" id="hdMealProtein" min="0" step="0.1" value="0"/>
      </div>
      <div class="hd-form-group">
        <label>${_t('지방 (g)', 'Fat (g)')}</label>
        <input type="number" id="hdMealFat" min="0" step="0.1" value="0"/>
      </div>
      <div class="hd-form-group">
        <label>${_t('탄수화물 (g)', 'Carbs (g)')}</label>
        <input type="number" id="hdMealCarbs" min="0" step="0.1" value="0"/>
      </div>
      <div class="hd-form-actions">
        <button class="hd-btn hd-btn-outline" id="hdMealCancel">${_t('취소', 'Cancel')}</button>
        <button class="hd-btn hd-btn-primary" id="hdMealSave">${_t('저장', 'Save')}</button>
      </div>
    </div>`;
  document.body.appendChild(backdrop);

  document.getElementById('hdMealCancel').addEventListener('click', () => backdrop.remove());
  document.getElementById('hdMealSave').addEventListener('click', async () => {
    const entry = {
      user_id: currentUser?.id,
      date: document.getElementById('hdMealDate').value,
      meal_type: document.getElementById('hdMealType').value,
      meal_name: document.getElementById('hdMealName').value.trim(),
      calories: parseFloat(document.getElementById('hdMealCal').value) || 0,
      protein: parseFloat(document.getElementById('hdMealProtein').value) || 0,
      fat: parseFloat(document.getElementById('hdMealFat').value) || 0,
      carbs: parseFloat(document.getElementById('hdMealCarbs').value) || 0,
      created_at: new Date().toISOString(),
    };

    if (!entry.meal_name) {
      showToast(_t('음식 이름을 입력하세요', 'Enter a meal name'), 'error');
      return;
    }

    try {
      await dbQuery('nutrition_logs', 'insert', { data: entry });
      showToast(_t('식사가 기록되었습니다', 'Meal logged'));
      backdrop.remove();
      renderDashboard(_hdPeriod);
    } catch (e) {
      console.error('[HealthDashboard] log meal error', e);
      showToast(_t('저장 실패', 'Failed to save'), 'error');
    }
  });
}

// ── Load Nutrition Data ──

async function loadNutritionData(startDate, endDate) {
  if (!currentUser) return [];
  try {
    const res = await dbQuery('nutrition_logs', 'select', {
      filters: { user_id: currentUser.id },
      gte: { date: startDate },
      lte: { date: endDate },
      order: { column: 'date', ascending: true },
    });
    return Array.isArray(res) ? res : [];
  } catch (e) {
    console.warn('[HealthDashboard] loadNutritionData error', e);
    return [];
  }
}

// ── Calculate Health Score ──

function calculateHealthScore(nutritionData, goals) {
  const result = { total: 0, balance: 0, variety: 0, conditions: 0, factors: [] };
  if (!nutritionData || nutritionData.length === 0) return result;

  const totals = _aggregateNutrition(nutritionData);
  const days = new Set(nutritionData.map(r => r.date || r.logged_at?.slice(0, 10))).size || 1;
  const avg = {
    calories: totals.calories / days,
    protein: totals.protein / days,
    fat: totals.fat / days,
    carbs: totals.carbs / days,
    fiber: (totals.fiber || 0) / days,
  };

  // ── Balance Score (0-40) ──
  let balance = 40;
  const calDiff = Math.abs(avg.calories - goals.calories) / (goals.calories || 1);
  if (calDiff > 0.25) { balance -= 15; result.factors.push({ label: _t('칼로리 크게 벗어남', 'Calories far off target'), value: -15 }); }
  else if (calDiff > 0.1) { balance -= 8; result.factors.push({ label: _t('칼로리 약간 벗어남', 'Calories slightly off'), value: -8 }); }
  else { result.factors.push({ label: _t('칼로리 목표 달성', 'Calories on target'), value: 5 }); }

  const proDiff = Math.abs(avg.protein - goals.protein) / (goals.protein || 1);
  if (proDiff > 0.3) { balance -= 8; result.factors.push({ label: _t('단백질 부족/과잉', 'Protein imbalance'), value: -8 }); }
  else { result.factors.push({ label: _t('적정 단백질', 'Good protein intake'), value: 3 }); }

  const fatDiff = Math.abs(avg.fat - goals.fat) / (goals.fat || 1);
  if (fatDiff > 0.3) { balance -= 6; result.factors.push({ label: _t('지방 불균형', 'Fat imbalance'), value: -6 }); }

  const carbDiff = Math.abs(avg.carbs - goals.carbs) / (goals.carbs || 1);
  if (carbDiff > 0.3) { balance -= 6; result.factors.push({ label: _t('탄수화물 불균형', 'Carbs imbalance'), value: -6 }); }

  if (avg.fiber >= (goals.fiber || 25)) {
    balance = Math.min(40, balance + 5);
    result.factors.push({ label: _t('높은 식이섬유', 'High fiber'), value: 5 });
  }
  balance = Math.max(0, Math.min(40, balance));
  result.balance = balance;

  // ── Variety Score (0-30) ──
  const categories = new Set();
  nutritionData.forEach(r => {
    if (r.meal_type) categories.add(r.meal_type);
    if (r.category) categories.add(r.category);
    if (r.meal_name) categories.add(r.meal_name.toLowerCase());
  });
  const uniqueFoods = new Set(nutritionData.map(r => r.meal_name).filter(Boolean)).size;
  let variety = Math.min(30, Math.round((uniqueFoods / Math.max(days * 2, 1)) * 30));
  if (uniqueFoods >= 10) {
    result.factors.push({ label: _t('다양한 식단', 'Diverse diet'), value: 5 });
  } else if (uniqueFoods <= 2 && days > 1) {
    result.factors.push({ label: _t('식단 다양성 부족', 'Low food variety'), value: -5 });
  }
  variety = Math.max(0, Math.min(30, variety));
  result.variety = variety;

  // ── Conditions Score (0-30) ──
  let conditions = 20; // Default baseline
  if (_healthProfile) {
    const hp = _healthProfile;
    if (hp.conditions && Array.isArray(hp.conditions)) {
      hp.conditions.forEach(cond => {
        const c = cond.toLowerCase();
        if (c.includes('diabetes') || c.includes('당뇨')) {
          if (avg.carbs < (goals.carbs || 300) * 0.9) {
            conditions += 5;
            result.factors.push({ label: _t('당뇨 관리 양호', 'Good diabetes management'), value: 5 });
          } else {
            conditions -= 5;
            result.factors.push({ label: _t('탄수화물 조절 필요', 'Carb control needed'), value: -5 });
          }
        }
        if (c.includes('hypertension') || c.includes('고혈압')) {
          conditions += 0; // Neutral if no sodium data
          result.factors.push({ label: _t('고혈압 주의', 'Hypertension awareness'), value: 0 });
        }
        if (c.includes('kidney') || c.includes('신장')) {
          if (avg.protein < (goals.protein || 50) * 0.8) {
            conditions += 3;
            result.factors.push({ label: _t('단백질 제한 양호', 'Protein restriction OK'), value: 3 });
          }
        }
      });
    }
  }
  conditions = Math.max(0, Math.min(30, conditions));
  result.conditions = conditions;

  result.total = Math.max(0, Math.min(100, balance + variety + conditions));
  return result;
}

// ── Aggregation Helper ──

function _aggregateNutrition(data) {
  const totals = { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 };
  if (!data) return totals;
  data.forEach(r => {
    totals.calories += r.calories || 0;
    totals.protein += r.protein || 0;
    totals.fat += r.fat || 0;
    totals.carbs += r.carbs || 0;
    totals.fiber += r.fiber || 0;
  });
  totals.calories = Math.round(totals.calories);
  totals.protein = Math.round(totals.protein);
  totals.fat = Math.round(totals.fat);
  totals.carbs = Math.round(totals.carbs);
  totals.fiber = Math.round(totals.fiber);
  return totals;
}

// ── Init ──

function initHealthDashboard() {
  _injectHDStyles();
  // Create overlay container if not present
  if (!document.getElementById('hdOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'hdOverlay';
    overlay.className = 'hd-overlay';
    document.body.appendChild(overlay);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHealthDashboard);
  } else {
    initHealthDashboard();
  }
}
