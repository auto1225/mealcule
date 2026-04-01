// ── Meal Planner (Weekly) ──
// Depends on: sbClient, dbQuery, dbRPC, currentUser, userPlan, isGuest, showToast (app.js)
//             loadSavedRecipes (recipe-box.js)

// _t defined in recipe-box.js; fallback if loaded standalone
if (typeof _t === 'undefined') var _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;

var MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];
var MEAL_LABELS = {
  breakfast: { ko: '아침', en: 'Breakfast', emoji: '\uD83C\uDF05', img: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
  lunch:     { ko: '점심', en: 'Lunch',     emoji: '\u2600\uFE0F', img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
  dinner:    { ko: '저녁', en: 'Dinner',    emoji: '\uD83C\uDF19', img: 'https://images.pexels.com/photos/299348/pexels-photo-299348.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
  snack:     { ko: '간식', en: 'Snack',     emoji: '\uD83C\uDF6A', img: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
};
var DAY_LABELS = [
  { ko: '월', en: 'Mon' }, { ko: '화', en: 'Tue' }, { ko: '수', en: 'Wed' },
  { ko: '목', en: 'Thu' }, { ko: '금', en: 'Fri' }, { ko: '토', en: 'Sat' },
  { ko: '일', en: 'Sun' },
];

let _mpState = {
  planId: null,
  weekStart: null,
  items: [],
  selectedDay: 0,       // mobile single-day view index
  moveItem: null,        // mobile touch-move source item
  showingDemo: false,    // true when displaying demo data
};

// ── Demo Data (shown when DB is empty) ──

var _DEMO_MEALS = [
  // Monday (day 0) — 1850 kcal
  { id:'demo_0b', day_of_week:0, meal_type:'breakfast', custom_name:'아보카도 토스트', custom_name_en:'Avocado Toast', custom_emoji:'\uD83E\uDD51', custom_img:'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:350, protein:12, fat:18, carbs:36, fiber:7 },
  { id:'demo_0l', day_of_week:0, meal_type:'lunch', custom_name:'그릴드 치킨 샐러드', custom_name_en:'Grilled Chicken Salad', custom_emoji:'\uD83E\uDD57', custom_img:'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:480, protein:38, fat:22, carbs:28, fiber:5 },
  { id:'demo_0d', day_of_week:0, meal_type:'dinner', custom_name:'수비드 스테이크', custom_name_en:'Sous Vide Steak', custom_emoji:'\uD83E\uDD69', custom_img:'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:650, protein:52, fat:38, carbs:12, fiber:2 },
  { id:'demo_0s', day_of_week:0, meal_type:'snack', custom_name:'그릭 요거트 + 베리', custom_name_en:'Greek Yogurt + Berries', custom_emoji:'\uD83E\uDED0', custom_img:'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:180, protein:15, fat:4, carbs:22, fiber:3 },

  // Tuesday (day 1) — 1720 kcal
  { id:'demo_1b', day_of_week:1, meal_type:'breakfast', custom_name:'오버나이트 오츠', custom_name_en:'Overnight Oats', custom_emoji:'\uD83E\uDD63', custom_img:'https://images.pexels.com/photos/543730/pexels-photo-543730.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:320, protein:14, fat:10, carbs:44, fiber:6 },
  { id:'demo_1l', day_of_week:1, meal_type:'lunch', custom_name:'참치 포케 보울', custom_name_en:'Tuna Poke Bowl', custom_emoji:'\uD83C\uDF63', custom_img:'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:520, protein:36, fat:18, carbs:52, fiber:4 },
  { id:'demo_1d', day_of_week:1, meal_type:'dinner', custom_name:'레몬 허브 연어', custom_name_en:'Lemon Herb Salmon', custom_emoji:'\uD83D\uDC1F', custom_img:'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:580, protein:44, fat:32, carbs:18, fiber:3 },
  { id:'demo_1s', day_of_week:1, meal_type:'snack', custom_name:'아몬드 한 줌', custom_name_en:'Handful of Almonds', custom_emoji:'\uD83E\uDD5C', custom_img:'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:160, protein:6, fat:14, carbs:6, fiber:4 },

  // Wednesday (day 2) — 1680 kcal (no snack — realistic gap)
  { id:'demo_2b', day_of_week:2, meal_type:'breakfast', custom_name:'스크램블 에그 + 토스트', custom_name_en:'Scrambled Eggs + Toast', custom_emoji:'\uD83C\uDF73', custom_img:'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:380, protein:22, fat:20, carbs:28, fiber:2 },
  { id:'demo_2l', day_of_week:2, meal_type:'lunch', custom_name:'터키 랩', custom_name_en:'Turkey Wrap', custom_emoji:'\uD83C\uDF2F', custom_img:'https://images.pexels.com/photos/1640557/pexels-photo-1640557.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:450, protein:32, fat:16, carbs:42, fiber:4 },
  { id:'demo_2d', day_of_week:2, meal_type:'dinner', custom_name:'치킨 스터프라이', custom_name_en:'Chicken Stir-Fry', custom_emoji:'\uD83C\uDF5C', custom_img:'https://images.pexels.com/photos/2664443/pexels-photo-2664443.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:620, protein:40, fat:22, carbs:58, fiber:6 },

  // Thursday (day 3) — 2050 kcal
  { id:'demo_3b', day_of_week:3, meal_type:'breakfast', custom_name:'바나나 팬케이크', custom_name_en:'Banana Pancakes', custom_emoji:'\uD83E\uDD5E', custom_img:'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:420, protein:12, fat:14, carbs:60, fiber:3 },
  { id:'demo_3l', day_of_week:3, meal_type:'lunch', custom_name:'퀴노아 버거', custom_name_en:'Quinoa Burger', custom_emoji:'\uD83C\uDF54', custom_img:'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:550, protein:24, fat:22, carbs:58, fiber:8 },
  { id:'demo_3d', day_of_week:3, meal_type:'dinner', custom_name:'쉬림프 파스타', custom_name_en:'Shrimp Pasta', custom_emoji:'\uD83C\uDF5D', custom_img:'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:680, protein:34, fat:24, carbs:72, fiber:4 },
  { id:'demo_3s', day_of_week:3, meal_type:'snack', custom_name:'프로틴 스무디', custom_name_en:'Protein Smoothie', custom_emoji:'\uD83E\uDD64', custom_img:'https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:220, protein:25, fat:5, carbs:22, fiber:2 },

  // Friday (day 4) — 1880 kcal (no breakfast — skipped)
  { id:'demo_4l', day_of_week:4, meal_type:'lunch', custom_name:'지중해식 보울', custom_name_en:'Mediterranean Bowl', custom_emoji:'\uD83E\uDD59', custom_img:'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:510, protein:28, fat:24, carbs:46, fiber:7 },
  { id:'demo_4d', day_of_week:4, meal_type:'dinner', custom_name:'비프 타코', custom_name_en:'Beef Tacos', custom_emoji:'\uD83C\uDF2E', custom_img:'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:720, protein:42, fat:34, carbs:56, fiber:5 },
  { id:'demo_4s', day_of_week:4, meal_type:'snack', custom_name:'후무스 + 야채스틱', custom_name_en:'Hummus + Veggie Sticks', custom_emoji:'\uD83E\uDD55', custom_img:'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:190, protein:8, fat:10, carbs:18, fiber:6 },

  // Saturday (day 5) — 2180 kcal
  { id:'demo_5b', day_of_week:5, meal_type:'breakfast', custom_name:'풀 잉글리시 브렉퍼스트', custom_name_en:'Full English Breakfast', custom_emoji:'\uD83C\uDF73', custom_img:'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:550, protein:30, fat:34, carbs:32, fiber:4 },
  { id:'demo_5l', day_of_week:5, meal_type:'lunch', custom_name:'카프레제 파니니', custom_name_en:'Caprese Panini', custom_emoji:'\uD83E\uDD6A', custom_img:'https://images.pexels.com/photos/1640557/pexels-photo-1640557.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:460, protein:22, fat:20, carbs:44, fiber:3 },
  { id:'demo_5d', day_of_week:5, meal_type:'dinner', custom_name:'그릴드 램 찹', custom_name_en:'Grilled Lamb Chops', custom_emoji:'\uD83C\uDF56', custom_img:'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:700, protein:50, fat:42, carbs:16, fiber:2 },
  { id:'demo_5s', day_of_week:5, meal_type:'snack', custom_name:'다크 초콜릿 + 견과류', custom_name_en:'Dark Chocolate + Nuts', custom_emoji:'\uD83C\uDF6B', custom_img:'https://images.pexels.com/photos/65882/pexels-photo-65882.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:210, protein:5, fat:16, carbs:18, fiber:3 },

  // Sunday (day 6) — 1760 kcal (no snack)
  { id:'demo_6b', day_of_week:6, meal_type:'breakfast', custom_name:'블루베리 와플', custom_name_en:'Blueberry Waffles', custom_emoji:'\uD83E\uDDC7', custom_img:'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:400, protein:10, fat:16, carbs:54, fiber:3 },
  { id:'demo_6l', day_of_week:6, meal_type:'lunch', custom_name:'미소 라멘', custom_name_en:'Miso Ramen', custom_emoji:'\uD83C\uDF5C', custom_img:'https://images.pexels.com/photos/2664443/pexels-photo-2664443.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:580, protein:28, fat:22, carbs:62, fiber:4 },
  { id:'demo_6d', day_of_week:6, meal_type:'dinner', custom_name:'로스트 치킨', custom_name_en:'Roast Chicken', custom_emoji:'\uD83C\uDF57', custom_img:'https://images.pexels.com/photos/361184/pexels-photo-361184.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', calories:620, protein:48, fat:30, carbs:24, fiber:3 },
];

// ── Helpers ──

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function _formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function _dayDate(weekStart, dayOfWeek) {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + dayOfWeek);
  return d.toISOString().slice(0, 10);
}

function _mealLabel(type) {
  const m = MEAL_LABELS[type];
  if (!m) return type;
  const icon = m.img ? `<img src="${m.img}" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='${m.emoji}'">` : m.emoji;
  return `${icon} ${_t(m.ko, m.en)}`;
}

// ── Open / Close ──

function openMealPlanner() {
  // [TEST MODE] Pro gate disabled for testing
  // if (typeof isGuest !== 'undefined' && isGuest) { _renderProGate(); return; }
  // if (typeof userPlan !== 'undefined' && userPlan === 'free') { _renderProGate(); return; }
  // Inline rendering for Plan tab
  var inlineTarget = document.getElementById('planContent');
  if (inlineTarget) {
    inlineTarget.innerHTML = _buildPlannerShell();
    const ws = getWeekStart();
    loadOrCreateWeekPlan(ws);
    return;
  }
  // Fallback: overlay
  let overlay = document.getElementById('mealPlannerOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mealPlannerOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:8000;background:var(--bg);overflow-y:auto;display:none;flex-direction:column';
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  overlay.innerHTML = _buildPlannerShell();
  const ws = getWeekStart();
  loadOrCreateWeekPlan(ws);
}

function closeMealPlanner() {
  const overlay = document.getElementById('mealPlannerOverlay');
  if (overlay) overlay.style.display = 'none';
  _mpState.moveItem = null;
}

function _renderProGate() {
  let overlay = document.getElementById('mealPlannerOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mealPlannerOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:8000;background:rgba(0,0,0,0.6);display:none;align-items:center;justify-content:center';
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div style="background:var(--bg-secondary);border-radius:16px;padding:40px;text-align:center;max-width:360px;width:90%">
      <div style="margin-bottom:16px"><img src="https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" style="width:48px;height:48px;border-radius:8px;object-fit:cover" onerror="this.outerHTML='<span style=\'font-size:48px\'>&#x1F512;</span>'"></div>
      <h2 style="margin:0 0 8px;color:var(--text)">${_t('Pro 필요', 'Pro Required')}</h2>
      <p style="color:var(--text-secondary);margin:0 0 20px;font-size:14px">
        ${_t('주간 식단 플래너는 Pro 플랜에서 사용할 수 있습니다.', 'The Weekly Meal Planner is available on the Pro plan.')}
      </p>
      <button onclick="closeMealPlanner()" style="padding:10px 28px;border:none;border-radius:8px;background:#10B981;color:#fff;font-size:14px;cursor:pointer">
        ${_t('닫기', 'Close')}
      </button>
    </div>`;
}

function _buildPlannerShell() {
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg-secondary);border-bottom:1px solid var(--border);flex-shrink:0">
      <button onclick="closeMealPlanner()" style="background:none;border:none;font-size:22px;cursor:pointer">&larr;</button>
      <div style="display:flex;align-items:center;gap:8px">
        <button onclick="navigateWeek(-1)" style="background:none;border:none;font-size:18px;cursor:pointer">&lsaquo;</button>
        <span id="mpWeekLabel" style="font-weight:600;font-size:15px"></span>
        <button onclick="navigateWeek(1)" style="background:none;border:none;font-size:18px;cursor:pointer">&rsaquo;</button>
      </div>
      <button onclick="_openAiMealPlanGenerator()" style="background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap"><img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;object-fit:cover;vertical-align:middle;margin-right:4px" onerror="this.outerHTML='<span>&#x2728;</span>'">${_t('AI 생성', 'AI Generate')}</button>
    </div>
    <div id="mpDayTabs" style="display:none;overflow-x:auto;background:var(--bg-secondary);border-bottom:1px solid var(--border);flex-shrink:0"></div>
    <div id="mpCalendar" style="flex:1;overflow-y:auto;padding:8px"></div>
    <div id="mpWeeklySummary" style="flex-shrink:0;background:var(--bg-secondary);border-top:1px solid var(--border);padding:10px 16px"></div>`;
}

// ── Load / Create Plan ──

async function loadOrCreateWeekPlan(weekStart) {
  _mpState.weekStart = weekStart;
  _updateWeekLabel();

  if (!currentUser || isGuest) {
    _mpState.planId = null;
    _mpState.items = JSON.parse(localStorage.getItem('mp_items_' + weekStart) || '[]');
    renderMealCalendar();
    return;
  }

  // Fetch existing plan
  let plans = await dbQuery('meal_plans', 'select', {
    eq: { user_id: currentUser?.id || 'guest', week_start: weekStart },
    limit: 1,
  });

  let plan = plans?.[0];
  if (!plan) {
    const inserted = await dbQuery('meal_plans', 'insert', {
      data: { user_id: currentUser?.id || 'guest', week_start: weekStart, name: `Week ${weekStart}`, is_active: true, metadata: {} },
    });
    plan = inserted?.[0];
  }

  if (!plan) { showToast(_t('플랜 로드 실패', 'Failed to load plan')); return; }
  _mpState.planId = plan.id;

  // Load items
  const items = await dbQuery('meal_plan_items', 'select', {
    eq: { meal_plan_id: plan.id },
    order: { col: 'sort_order', asc: true },
  });
  _mpState.items = items || [];
  renderMealCalendar();
}

function _updateWeekLabel() {
  const label = document.getElementById('mpWeekLabel');
  if (!label) return;
  const ws = _mpState.weekStart;
  const end = _dayDate(ws, 6);
  label.textContent = `${_formatDate(ws)} ~ ${_formatDate(end)}`;
}

// ── Navigate Week ──

function navigateWeek(direction) {
  const d = new Date(_mpState.weekStart);
  d.setDate(d.getDate() + direction * 7);
  const ws = d.toISOString().slice(0, 10);
  loadOrCreateWeekPlan(ws);
}

// ── Render Calendar ──

function _getActiveItems() {
  if (_mpState.items.length > 0) {
    _mpState.showingDemo = false;
    return _mpState.items;
  }
  _mpState.showingDemo = true;
  return _DEMO_MEALS;
}

function renderMealCalendar() {
  const activeItems = _getActiveItems();
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    _renderDayTabs();
    _renderSingleDay(_mpState.selectedDay, activeItems);
  } else {
    _hideDayTabs();
    _renderFullGrid(activeItems);
  }
  _renderWeeklySummary(activeItems);
}

function _hideDayTabs() {
  const tabs = document.getElementById('mpDayTabs');
  if (tabs) tabs.style.display = 'none';
}

function _renderDayTabs() {
  const tabs = document.getElementById('mpDayTabs');
  if (!tabs) return;
  tabs.style.display = 'flex';
  tabs.style.cssText += ';gap:0;padding:0;justify-content:stretch';
  tabs.innerHTML = DAY_LABELS.map((d, i) => {
    const active = i === _mpState.selectedDay;
    const dateStr = _formatDate(_dayDate(_mpState.weekStart, i));
    return `<button onclick="_selectDay(${i})" style="flex:1;padding:8px 4px;border:none;border-bottom:2px solid ${active ? '#10B981' : 'transparent'};background:${active ? 'rgba(16,185,129,0.08)' : 'transparent'};cursor:pointer;font-size:13px;text-align:center">
      <div style="font-weight:${active ? '700' : '400'}">${_t(d.ko, d.en)}</div>
      <div style="font-size:11px;color:var(--text-muted)">${dateStr}</div>
    </button>`;
  }).join('');
}

function _selectDay(i) {
  _mpState.selectedDay = i;
  renderMealCalendar();
}

function _renderSingleDay(dayIndex, activeItems) {
  const cal = document.getElementById('mpCalendar');
  if (!cal) return;
  const items = activeItems || _getActiveItems();
  const dayItems = items.filter(it => it.day_of_week === dayIndex);
  let html = '';
  if (_mpState.showingDemo) {
    html += `<div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:8px;font-size:13px;color:#F59E0B">
      <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=22&h=22&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover" onerror="this.outerHTML='<span>&#x2728;</span>'">
      <span>${_t('샘플 식단입니다. 직접 추가해 보세요!', 'Sample meals shown. Add your own!')}</span>
    </div>`;
  }
  MEAL_TYPES.forEach(type => {
    const typeItems = dayItems.filter(it => it.meal_type === type);
    html += `<div style="margin-bottom:12px">
      <div style="font-weight:600;font-size:14px;margin-bottom:6px;padding:4px 0">${_mealLabel(type)}</div>
      <div class="mp-drop-zone" data-day="${dayIndex}" data-meal="${type}" style="min-height:48px;background:var(--card);border-radius:10px;padding:8px;border:1px dashed var(--border)">
        ${typeItems.map(it => _renderMealItemCard(it, _mpState.showingDemo)).join('')}
        <button onclick="addMealItem(${dayIndex},'${type}')" style="width:100%;padding:8px;border:1px dashed rgba(255,255,255,0.15);border-radius:8px;background:none;color:var(--text-muted);cursor:pointer;font-size:13px;margin-top:4px">+ ${_t('추가', 'Add')}</button>
      </div>
    </div>`;
  });
  html += `<div id="mpDayNutrition">${renderDayNutrition(dayIndex, dayItems)}</div>`;
  cal.innerHTML = html;
  _setupDropZones();
}

function _renderFullGrid(activeItems) {
  const cal = document.getElementById('mpCalendar');
  if (!cal) return;
  const items = activeItems || _getActiveItems();
  let html = '';
  if (_mpState.showingDemo) {
    html += `<div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);border-radius:10px;padding:10px 14px;margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:13px;color:#F59E0B">
      <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=22&h=22&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover" onerror="this.outerHTML='<span>&#x2728;</span>'">
      <span>${_t('샘플 식단이 표시됩니다. + 버튼으로 직접 식단을 추가해 보세요!', 'Showing sample meals. Tap + to add your own!')}</span>
    </div>`;
  }
  html += '<div style="display:grid;grid-template-columns:80px repeat(7,1fr);gap:1px;background:rgba(255,255,255,0.08);border-radius:10px;overflow:hidden">';
  // Header row
  html += '<div style="background:var(--card);padding:8px;font-size:12px;color:var(--text-muted)"></div>';
  for (let d = 0; d < 7; d++) {
    const dateStr = _formatDate(_dayDate(_mpState.weekStart, d));
    html += `<div style="background:var(--card);padding:8px;text-align:center;font-size:13px;font-weight:600;color:var(--text)">
      ${_t(DAY_LABELS[d].ko, DAY_LABELS[d].en)}<br><span style="font-weight:400;font-size:11px;color:var(--text-muted)">${dateStr}</span>
    </div>`;
  }
  // Meal rows
  MEAL_TYPES.forEach(type => {
    html += `<div style="background:var(--card);padding:8px;font-size:12px;display:flex;align-items:center;justify-content:center;color:var(--text);writing-mode:vertical-lr;text-orientation:mixed">${_mealLabel(type)}</div>`;
    for (let d = 0; d < 7; d++) {
      const cellItems = items.filter(it => it.day_of_week === d && it.meal_type === type);
      const dimStyle = _mpState.showingDemo ? 'opacity:0.7;' : '';
      html += `<div class="mp-drop-zone" data-day="${d}" data-meal="${type}" style="background:var(--card);padding:6px;min-height:80px;position:relative;${dimStyle}">
        ${cellItems.map(it => _renderMealItemCard(it, _mpState.showingDemo)).join('')}
        <button onclick="addMealItem(${d},'${type}')" style="width:100%;padding:4px;border:1px dashed var(--border);border-radius:6px;background:none;color:var(--text-tertiary);cursor:pointer;font-size:16px;margin-top:2px">+</button>
      </div>`;
    }
  });
  // Day nutrition footer
  html += '<div style="background:#f9fafb;padding:6px;font-size:11px;text-align:center;color:#888">${_t("합계","Total")}</div>';
  for (let d = 0; d < 7; d++) {
    const dayItems = items.filter(it => it.day_of_week === d);
    html += `<div style="background:var(--card);padding:6px">${renderDayNutrition(d, dayItems)}</div>`;
  }
  html += '</div>';
  cal.innerHTML = html;
  _setupDropZones();
  _setupDragHandlers();
}

function _renderMealItemCard(item, isDemo) {
  const name = _t(item.custom_name || '', item.custom_name_en || item.custom_name || '');
  var emoji = item.custom_emoji || '';
  var imgUrl = item.custom_img || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=22&h=22&fit=crop';
  var fallbackEmoji = emoji || '&#x1F37D;';
  var iconHtml = `<img src="${imgUrl}" style="width:22px;height:22px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.outerHTML='<span>${fallbackEmoji}</span>'">`; 
  const cal = item.calories ? `${Math.round(item.calories)} kcal` : '';
  const isMobile = window.innerWidth <= 768;
  const moveAttr = (!isDemo && isMobile) ? `onclick="_startMoveItem('${item.id}')"` : '';
  const draggable = isDemo ? 'false' : 'true';
  const deleteBtn = isDemo ? '' : `<button onclick="event.stopPropagation();removeMealItem('${item.id}')" style="background:none;border:none;color:var(--text-tertiary);cursor:pointer;font-size:14px;padding:2px">&times;</button>`;
  return `<div class="mp-item" draggable="${draggable}" data-item-id="${item.id}"
    style="display:flex;align-items:center;gap:6px;padding:6px 8px;margin-bottom:4px;background:var(--card);border-radius:8px;font-size:13px;color:var(--text);cursor:${isDemo ? 'default' : 'grab'};position:relative"
    ${moveAttr}>
    ${iconHtml}
    <div style="flex:1;min-width:0">
      <div style="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
      <div style="font-size:11px;color:var(--text-muted)">${cal}</div>
    </div>
    ${deleteBtn}
  </div>`;
}

// ── Day Nutrition ──

function renderDayNutrition(dayOfWeek, items) {
  const totals = { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 };
  items.forEach(it => {
    totals.calories += it.calories || 0;
    totals.protein += it.protein || 0;
    totals.fat += it.fat || 0;
    totals.carbs += it.carbs || 0;
    totals.fiber += it.fiber || 0;
  });
  const maxCal = 2500;
  const pct = Math.min(100, Math.round((totals.calories / maxCal) * 100));
  return `
    <div style="font-size:11px;color:var(--text-secondary)">
      <div style="background:rgba(255,255,255,0.08);border-radius:4px;height:6px;margin-bottom:4px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:${pct > 100 ? '#ef4444' : '#4f46e5'};border-radius:4px;transition:width 0.3s"></div>
      </div>
      <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:2px">
        <span>${Math.round(totals.calories)} kcal</span>
        <span>P ${Math.round(totals.protein)}g</span>
        <span>F ${Math.round(totals.fat)}g</span>
        <span>C ${Math.round(totals.carbs)}g</span>
      </div>
    </div>`;
}

// ── Weekly Summary ──

function _renderWeeklySummary(activeItems) {
  const el = document.getElementById('mpWeeklySummary');
  if (!el) return;
  const items = activeItems || _getActiveItems();
  const totals = { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0, days: 0 };
  for (let d = 0; d < 7; d++) {
    const dayItems = items.filter(it => it.day_of_week === d);
    if (dayItems.length === 0) continue;
    totals.days++;
    dayItems.forEach(it => {
      totals.calories += it.calories || 0;
      totals.protein += it.protein || 0;
      totals.fat += it.fat || 0;
      totals.carbs += it.carbs || 0;
      totals.fiber += it.fiber || 0;
    });
  }
  const divisor = totals.days || 1;
  const avg = {
    calories: Math.round(totals.calories / divisor),
    protein: Math.round(totals.protein / divisor),
    fat: Math.round(totals.fat / divisor),
    carbs: Math.round(totals.carbs / divisor),
    fiber: Math.round(totals.fiber / divisor),
  };
  el.innerHTML = `
    <div style="font-size:12px;font-weight:600;margin-bottom:4px">${_t('주간 평균 (일)', 'Weekly Avg / Day')}</div>
    <div style="display:flex;gap:12px;font-size:13px;flex-wrap:wrap">
      <span style="color:#10B981;font-weight:600">${avg.calories} kcal</span>
      <span>${_t('단백질', 'Protein')} ${avg.protein}g</span>
      <span>${_t('지방', 'Fat')} ${avg.fat}g</span>
      <span>${_t('탄수화물', 'Carbs')} ${avg.carbs}g</span>
      <span>${_t('식이섬유', 'Fiber')} ${avg.fiber}g</span>
    </div>`;
}

// ── Add / Remove Items ──

function addMealItem(dayOfWeek, mealType) {
  renderRecipePicker(dayOfWeek, mealType);
}

async function removeMealItem(itemId) {
  if (!currentUser || isGuest) {
    _mpState.items = _mpState.items.filter(it => it.id !== itemId);
    _saveLocalItems();
    renderMealCalendar();
    _dispatchUpdate();
    return;
  }
  await dbQuery('meal_plan_items', 'delete', { eq: { id: itemId } });
  _mpState.items = _mpState.items.filter(it => it.id !== itemId);
  renderMealCalendar();
  _dispatchUpdate();
  showToast(_t('삭제됨', 'Removed'));
}

function _dispatchUpdate() {
  document.dispatchEvent(new CustomEvent('mealplan:updated', { detail: _mpState.planId }));
}

function _saveLocalItems() {
  if (_mpState.weekStart) {
    localStorage.setItem('mp_items_' + _mpState.weekStart, JSON.stringify(_mpState.items));
  }
}

// ── Recipe Picker ──

function renderRecipePicker(dayOfWeek, mealType) {
  let modal = document.getElementById('mpRecipePicker');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mpRecipePicker';
    modal.style.cssText = 'position:fixed;inset:0;z-index:8500;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center';
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div style="background:var(--bg-secondary);border-radius:16px;max-width:480px;width:92%;max-height:80vh;display:flex;flex-direction:column;overflow:hidden">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-weight:600;font-size:15px">${_mealLabel(mealType)} — ${_t(DAY_LABELS[dayOfWeek].ko, DAY_LABELS[dayOfWeek].en)}</span>
        <button onclick="_closeRecipePicker()" style="background:none;border:none;font-size:20px;cursor:pointer">&times;</button>
      </div>
      <div style="padding:8px 16px">
        <input id="mpPickerSearch" type="text" placeholder="${_t('레시피 검색...', 'Search recipes...')}"
          style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;box-sizing:border-box;background:var(--card);color:var(--text)"
          oninput="_filterPickerRecipes(${dayOfWeek},'${mealType}')">
      </div>
      <div id="mpPickerList" style="flex:1;overflow-y:auto;padding:0 16px 8px"></div>
      <div style="border-top:1px solid var(--border);padding:12px 16px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">${_t('직접 입력', 'Manual Entry')}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <input id="mpManualName" placeholder="${_t('음식 이름', 'Food name')}" style="flex:2;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;min-width:100px;background:var(--card);color:var(--text)">
          <input id="mpManualCal" type="number" placeholder="kcal" style="flex:1;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;min-width:60px;background:var(--card);color:var(--text)">
          <button onclick="_addManualItem(${dayOfWeek},'${mealType}')" style="padding:7px 14px;border:none;border-radius:6px;background:#10B981;color:#fff;font-size:13px;cursor:pointer;white-space:nowrap">${_t('추가', 'Add')}</button>
        </div>
      </div>
    </div>`;
  _loadPickerRecipes(dayOfWeek, mealType);
}

async function _loadPickerRecipes(dayOfWeek, mealType) {
  const list = document.getElementById('mpPickerList');
  if (!list) return;
  list.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted)">${_t('로딩 중...', 'Loading...')}</div>`;

  let recipes = [];
  if (typeof loadSavedRecipes === 'function') {
    try { recipes = await loadSavedRecipes(); } catch(e) { console.warn('loadSavedRecipes error:', e); }
  }

  list._allRecipes = recipes || [];
  list._dayOfWeek = dayOfWeek;
  list._mealType = mealType;
  _renderPickerList(recipes, dayOfWeek, mealType);
}

function _filterPickerRecipes(dayOfWeek, mealType) {
  const list = document.getElementById('mpPickerList');
  const search = document.getElementById('mpPickerSearch');
  if (!list || !search) return;
  const q = search.value.toLowerCase().trim();
  const recipes = list._allRecipes || [];
  const filtered = q ? recipes.filter(r => {
    const name = (r.name || r.title || '').toLowerCase();
    const nameEn = (r.name_en || r.title_en || '').toLowerCase();
    return name.includes(q) || nameEn.includes(q);
  }) : recipes;
  _renderPickerList(filtered, dayOfWeek, mealType);
}

function _renderPickerList(recipes, dayOfWeek, mealType) {
  const list = document.getElementById('mpPickerList');
  if (!list) return;
  if (!recipes.length) {
    list.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-tertiary);font-size:13px">${_t('저장된 레시피가 없습니다', 'No saved recipes')}</div>`;
    return;
  }
  list.innerHTML = recipes.map(r => {
    const name = _t(r.name || r.title || '', r.name_en || r.title_en || r.name || r.title || '');
    const cal = r.calories || r.total_calories || 0;
    const p = r.protein || 0, f = r.fat || 0, c = r.carbs || 0;
    var recipeImg = r.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop';
    var recipeEmoji = r.emoji || '&#x1F37D;';
    return `<div onclick="_selectRecipeForPlan('${r.id}',${dayOfWeek},'${mealType}')"
      style="display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s"
      onmouseenter="this.style.background='rgba(255,255,255,0.07)'" onmouseleave="this.style.background=''">
      <img src="${recipeImg}" style="width:32px;height:32px;border-radius:6px;object-fit:cover" onerror="this.outerHTML='<span style=\\'font-size:24px\\'>${recipeEmoji}</span>'">
      <div style="flex:1;min-width:0">
        <div style="font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
        <div style="font-size:11px;color:var(--text-muted)">${Math.round(cal)} kcal | P${Math.round(p)}g F${Math.round(f)}g C${Math.round(c)}g</div>
      </div>
    </div>`;
  }).join('');
}

async function _selectRecipeForPlan(recipeId, dayOfWeek, mealType) {
  const list = document.getElementById('mpPickerList');
  const recipes = list?._allRecipes || [];
  const recipe = recipes.find(r => String(r.id) === String(recipeId));
  if (!recipe) return;

  const itemData = {
    meal_plan_id: _mpState.planId,
    user_id: currentUser?.id,
    day_of_week: dayOfWeek,
    meal_type: mealType,
    recipe_id: recipe.id,
    custom_name: recipe.name || recipe.title || '',
    custom_name_en: recipe.name_en || recipe.title_en || '',
    custom_emoji: recipe.emoji || '',
    custom_img: recipe.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
    calories: recipe.calories || recipe.total_calories || 0,
    protein: recipe.protein || 0,
    fat: recipe.fat || 0,
    carbs: recipe.carbs || 0,
    fiber: recipe.fiber || 0,
    sort_order: _mpState.items.filter(it => it.day_of_week === dayOfWeek && it.meal_type === mealType).length,
    notes: '',
  };

  if (!currentUser || isGuest) {
    itemData.id = 'local_' + Date.now();
    _mpState.items.push(itemData);
    _saveLocalItems();
  } else {
    const inserted = await dbQuery('meal_plan_items', 'insert', { data: itemData });
    if (inserted?.[0]) {
      _mpState.items.push(inserted[0]);
    } else {
      showToast(_t('추가 실패', 'Failed to add'));
      return;
    }
  }

  _closeRecipePicker();
  renderMealCalendar();
  _dispatchUpdate();
  showToast(_t('추가됨', 'Added'));
}

async function _addManualItem(dayOfWeek, mealType) {
  const nameInput = document.getElementById('mpManualName');
  const calInput = document.getElementById('mpManualCal');
  const name = nameInput?.value.trim();
  if (!name) { showToast(_t('이름을 입력하세요', 'Enter a name')); return; }
  const cal = parseFloat(calInput?.value) || 0;

  const itemData = {
    meal_plan_id: _mpState.planId,
    user_id: currentUser?.id,
    day_of_week: dayOfWeek,
    meal_type: mealType,
    recipe_id: null,
    custom_name: name,
    custom_name_en: name,
    custom_emoji: '',
    custom_img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
    calories: cal,
    protein: 0,
    fat: 0,
    carbs: 0,
    fiber: 0,
    sort_order: _mpState.items.filter(it => it.day_of_week === dayOfWeek && it.meal_type === mealType).length,
    notes: '',
  };

  if (!currentUser || isGuest) {
    itemData.id = 'local_' + Date.now();
    _mpState.items.push(itemData);
    _saveLocalItems();
  } else {
    const inserted = await dbQuery('meal_plan_items', 'insert', { data: itemData });
    if (inserted?.[0]) {
      _mpState.items.push(inserted[0]);
    } else {
      showToast(_t('추가 실패', 'Failed to add'));
      return;
    }
  }

  _closeRecipePicker();
  renderMealCalendar();
  _dispatchUpdate();
  showToast(_t('추가됨', 'Added'));
}

function _closeRecipePicker() {
  const modal = document.getElementById('mpRecipePicker');
  if (modal) modal.style.display = 'none';
}

// ── Drag & Drop (Desktop) ──

function _setupDragHandlers() {
  const items = document.querySelectorAll('.mp-item[draggable="true"]');
  items.forEach(el => {
    el.addEventListener('dragstart', _onDragStart);
    el.addEventListener('dragend', _onDragEnd);
  });
}

function _onDragStart(e) {
  const itemId = e.target.closest('.mp-item')?.dataset.itemId;
  if (!itemId) return;
  e.dataTransfer.setData('text/plain', itemId);
  e.dataTransfer.effectAllowed = 'move';
  e.target.style.opacity = '0.4';
}

function _onDragEnd(e) {
  e.target.style.opacity = '1';
}

function _setupDropZones() {
  const zones = document.querySelectorAll('.mp-drop-zone');
  zones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.style.background = 'rgba(16,185,129,0.08)';
    });
    zone.addEventListener('dragleave', () => {
      zone.style.background = '';
    });
    zone.addEventListener('drop', async (e) => {
      e.preventDefault();
      zone.style.background = '';
      const itemId = e.dataTransfer.getData('text/plain');
      const newDay = parseInt(zone.dataset.day);
      const newMeal = zone.dataset.meal;
      if (!itemId || isNaN(newDay) || !newMeal) return;
      await _moveItemTo(itemId, newDay, newMeal);
    });
  });
}

async function _moveItemTo(itemId, newDay, newMeal) {
  const item = _mpState.items.find(it => String(it.id) === String(itemId));
  if (!item) return;
  if (item.day_of_week === newDay && item.meal_type === newMeal) return;

  item.day_of_week = newDay;
  item.meal_type = newMeal;

  if (!currentUser || isGuest) {
    _saveLocalItems();
  } else {
    await dbQuery('meal_plan_items', 'update', {
      data: { day_of_week: newDay, meal_type: newMeal },
      eq: { id: itemId },
    });
  }

  renderMealCalendar();
  _dispatchUpdate();
}

// ── Touch Move (Mobile) ──

function _startMoveItem(itemId) {
  if (_mpState.moveItem === itemId) {
    // Cancel move
    _mpState.moveItem = null;
    showToast(_t('이동 취소', 'Move cancelled'));
    renderMealCalendar();
    return;
  }
  _mpState.moveItem = itemId;
  showToast(_t('이동할 위치를 탭하세요', 'Tap destination to move'));
  _highlightDropTargets();
}

function _highlightDropTargets() {
  const zones = document.querySelectorAll('.mp-drop-zone');
  zones.forEach(zone => {
    zone.style.outline = '2px dashed #10B981';
    zone.style.outlineOffset = '-2px';
    const handler = async () => {
      const newDay = parseInt(zone.dataset.day);
      const newMeal = zone.dataset.meal;
      if (_mpState.moveItem && !isNaN(newDay) && newMeal) {
        await _moveItemTo(_mpState.moveItem, newDay, newMeal);
        _mpState.moveItem = null;
      }
      _clearDropHighlights();
    };
    zone._moveHandler = handler;
    zone.addEventListener('click', handler, { once: true });
  });
}

function _clearDropHighlights() {
  const zones = document.querySelectorAll('.mp-drop-zone');
  zones.forEach(zone => {
    zone.style.outline = '';
    zone.style.outlineOffset = '';
    if (zone._moveHandler) {
      zone.removeEventListener('click', zone._moveHandler);
      delete zone._moveHandler;
    }
  });
}

// ── Init ──

function initMealPlanner() {
  // Re-render on resize for responsive switch
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (document.getElementById('mealPlannerOverlay')?.style.display === 'flex') {
        renderMealCalendar();
      }
    }, 200);
  });

  // Listen for external triggers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const picker = document.getElementById('mpRecipePicker');
      if (picker?.style.display === 'flex') {
        _closeRecipePicker();
      } else if (document.getElementById('mealPlannerOverlay')?.style.display === 'flex') {
        closeMealPlanner();
      }
    }
  });
}

// ── AI Meal Plan Generator ──

function _openAiMealPlanGenerator() {
  let modal = document.getElementById('aiMealPlanModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'aiMealPlanModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:16px';
    modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';

  const CUISINE_OPTIONS = [
    { v: '', l: _t('상관없음', 'Any style') },
    { v: 'Korean', l: _t('한식', 'Korean') },
    { v: 'Japanese', l: _t('일식', 'Japanese') },
    { v: 'Chinese', l: _t('중식', 'Chinese') },
    { v: 'Italian', l: _t('이탈리안', 'Italian') },
    { v: 'American', l: _t('미국식', 'American') },
    { v: 'Mediterranean', l: _t('지중해식', 'Mediterranean') },
    { v: 'Mexican', l: _t('멕시칸', 'Mexican') },
    { v: 'Indian', l: _t('인도식', 'Indian') },
    { v: 'Thai', l: _t('태국식', 'Thai') },
  ];
  const optionsHtml = CUISINE_OPTIONS.map(o => `<option value="${o.v}">${o.l}</option>`).join('');

  modal.innerHTML = `
    <div style="background:var(--bg-secondary);border-radius:16px;max-width:420px;width:100%;padding:24px;max-height:85vh;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="margin:0;font-size:17px"><img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:18px;height:18px;border-radius:4px;object-fit:cover;vertical-align:middle;margin-right:6px" onerror="this.outerHTML='<span>&#x2728;</span>'">${_t('AI 식단 자동 생성', 'AI Meal Plan Generator')}</h3>
        <button onclick="document.getElementById('aiMealPlanModal').style.display='none'" style="background:none;border:none;font-size:20px;cursor:pointer">&times;</button>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">${_t('건강 프로필 기반 맞춤형 7일 식단을 자동 생성합니다', 'Generate a personalized 7-day meal plan based on your health profile')}</p>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary)">${_t('일일 칼로리 목표', 'Daily calorie target')}</label>
          <input id="aiPlanCalories" type="number" value="2000" min="1200" max="4000" step="100" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;margin-top:4px;background:var(--card);color:var(--text)">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary)">${_t('요리 스타일', 'Cuisine preference')}</label>
          <select id="aiPlanCuisine" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:14px;margin-top:4px;background:var(--card);color:var(--text)">${optionsHtml}</select>
        </div>
      </div>
      <button id="aiPlanGenBtn" onclick="_runAiMealPlanGeneration()" style="width:100%;padding:12px;border:none;border-radius:10px;background:linear-gradient(135deg,#10B981,#059669);color:#fff;font-size:14px;font-weight:700;cursor:pointer">
        ${_t('7일 식단 생성', 'Generate 7-Day Plan')}
      </button>
      <div id="aiPlanResults" style="margin-top:16px"></div>
    </div>`;
}

async function _runAiMealPlanGeneration() {
  const btn = document.getElementById('aiPlanGenBtn');
  const results = document.getElementById('aiPlanResults');
  const calories = parseInt(document.getElementById('aiPlanCalories')?.value) || 2000;
  const cuisine = document.getElementById('aiPlanCuisine')?.value || '';

  if (btn) { btn.disabled = true; btn.textContent = _t('생성 중...', 'Generating...'); }
  results.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted)"><div class="loading-spinner" style="margin:0 auto 8px"></div>${_t('AI가 식단을 생성하고 있습니다...', 'AI is generating your meal plan...')}</div>`;

  // Collect health profile from app.js globals
  const profile = window._healthProfile || {};
  const savedRecipes = typeof loadSavedRecipes === 'function' ? (await loadSavedRecipes()) : [];

  try {
    const res = await fetch((typeof API_BASE!=='undefined'?API_BASE:'') + '/api/generate-meal-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        savedRecipes: savedRecipes.slice(0, 20).map(r => ({
          name: r.name, name_en: r.name_en, cuisine: r.cuisine,
          nutrition_snapshot: r.nutrition_snapshot,
        })),
        conditions: profile.conditions || [],
        traits: profile.traits || [],
        substances: profile.substances || [],
        age: profile.age, gender: profile.gender,
        weight: profile.weight, height: profile.height,
        activityLevel: profile.activity,
        ethnicity: profile.ethnicity, country: profile.country,
        preferences: { targetCalories: calories, cuisinePreference: cuisine },
        userLang: I18n?.lang || 'en',
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Generation failed');

    if (!data.plan?.length) throw new Error('Empty plan returned');

    // Render preview
    let html = `<div style="font-size:14px;font-weight:700;margin-bottom:10px">${_t('생성된 식단', 'Generated Plan')}</div>`;
    data.plan.forEach(day => {
      html += `<div style="margin-bottom:10px;padding:10px;background:var(--card);border-radius:8px">
        <div style="font-weight:600;font-size:13px;margin-bottom:6px">${day.dayLabel}</div>`;
      (day.meals || []).forEach(meal => {
        html += `<div style="display:flex;gap:6px;align-items:center;font-size:12px;padding:2px 0">
          <img src="${meal.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=22&h=22&fit=crop'}" style="width:18px;height:18px;border-radius:3px;object-fit:cover" onerror="this.outerHTML='<span>&#x1F37D;</span>'">
          <span style="flex:1">${meal.name} <span style="color:#888">${Math.round(meal.calories||0)}kcal</span></span>
        </div>`;
      });
      if (day.dailyTotal) {
        html += `<div style="font-size:11px;color:var(--text-muted);margin-top:4px;border-top:1px solid var(--border);padding-top:4px">${_t('합계', 'Total')}: ${Math.round(day.dailyTotal.calories||0)}kcal · P${Math.round(day.dailyTotal.protein||0)}g · F${Math.round(day.dailyTotal.fat||0)}g · C${Math.round(day.dailyTotal.carbs||0)}g</div>`;
      }
      html += `</div>`;
    });
    if (data.weeklyNotes) {
      html += `<div style="font-size:12px;color:#555;padding:8px;background:rgba(16,185,129,0.08);border-radius:8px;margin-bottom:10px;display:flex;align-items:start;gap:6px"><img src="https://images.pexels.com/photos/355988/pexels-photo-355988.jpeg?auto=compress&cs=tinysrgb&w=18&h=18&fit=crop" style="width:16px;height:16px;border-radius:3px;object-fit:cover;flex-shrink:0;margin-top:1px" onerror="this.outerHTML='<span>&#x1F4A1;</span>'"><span>${data.weeklyNotes}</span></div>`;
    }
    html += `<button onclick="_applyAiPlanToPlanner()" style="width:100%;padding:10px;border:none;border-radius:8px;background:#10B981;color:#fff;font-size:13px;font-weight:600;cursor:pointer">${_t('플래너에 적용', 'Apply to Planner')}</button>`;

    results.innerHTML = html;
    results._generatedPlan = data.plan;
  } catch (err) {
    results.innerHTML = `<div style="text-align:center;padding:16px;color:#ef4444">${err.message}</div>`;
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = _t('7일 식단 생성', 'Generate 7-Day Plan'); }
  }
}

async function _applyAiPlanToPlanner() {
  const results = document.getElementById('aiPlanResults');
  const plan = results?._generatedPlan;
  if (!plan?.length) return;

  for (const day of plan) {
    for (const meal of (day.meals || [])) {
      const itemData = {
        meal_plan_id: _mpState.planId,
        user_id: currentUser?.id,
        day_of_week: day.day,
        meal_type: meal.type,
        recipe_id: null,
        custom_name: meal.name,
        custom_name_en: meal.name_en || meal.name,
        custom_emoji: meal.emoji || '',
        custom_img: meal.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
        custom_ingredients: meal.ingredients ? meal.ingredients.map(i => ({ name: i, grams: 0 })) : null,
        calories: meal.calories || 0,
        protein: meal.protein || 0,
        fat: meal.fat || 0,
        carbs: meal.carbs || 0,
        fiber: meal.fiber || 0,
        sort_order: 0,
        notes: meal.tip || '',
      };

      if (!currentUser || isGuest) {
        itemData.id = 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        _mpState.items.push(itemData);
      } else {
        const inserted = await dbQuery('meal_plan_items', 'insert', { data: itemData });
        if (inserted?.[0]) _mpState.items.push(inserted[0]);
      }
    }
  }

  if (!currentUser || isGuest) _saveLocalItems();
  renderMealCalendar();
  _dispatchUpdate();
  document.getElementById('aiMealPlanModal').style.display = 'none';
  showToast(_t('식단이 플래너에 적용되었습니다!', 'Meal plan applied to planner!'));
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMealPlanner);
} else {
  initMealPlanner();
}
