// ── Calorie Tracker Module ──
// Quick calorie logging, daily budget, macro rings, water intake, photo scan
// Inspired by: MyFitnessPal, Cronometer, 닥터다이어리, Kaloria.ai
// Depends on globals from app.js: sbClient, dbQuery, dbRPC, currentUser, userPlan, isGuest, showToast, I18n

var _t = typeof _t !== 'undefined' ? _t : function(ko, en) { return (window.I18n && I18n.lang === 'en') ? en : ko; };

// ── State ──
let _ctOverlay = null;
let _ctDate = new Date().toISOString().slice(0, 10); // today
let _ctMeals = []; // logged meals for _ctDate
let _ctWater = 0;  // ml consumed today
let _ctGoals = { calories: 2000, protein: 50, fat: 65, carbs: 300, water: 2000 }; // daily targets
let _ctStyleInjected = false;

// ── Quick Food Database (common foods for instant search) ──
const _CT_QUICK_FOODS = [
  // Korean foods
  { name_ko: '흰쌀밥 1공기', name_en: 'White Rice (1 bowl)', cal: 310, protein: 6, fat: 1, carbs: 68, icon: '🍚', img: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '김치찌개 1인분', name_en: 'Kimchi Stew (1 serving)', cal: 200, protein: 12, fat: 8, carbs: 18, icon: '🍲', img: 'https://images.pexels.com/photos/13774731/pexels-photo-13774731.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '된장찌개 1인분', name_en: 'Doenjang Stew (1 serving)', cal: 150, protein: 10, fat: 5, carbs: 15, icon: '🥘', img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '불고기 1인분', name_en: 'Bulgogi (1 serving)', cal: 320, protein: 28, fat: 15, carbs: 18, icon: '🥩', img: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '비빔밥', name_en: 'Bibimbap', cal: 550, protein: 22, fat: 12, carbs: 85, icon: '🍛', img: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '삼겹살 1인분', name_en: 'Pork Belly (1 serving)', cal: 450, protein: 18, fat: 38, carbs: 2, icon: '🥓', img: 'https://images.pexels.com/photos/8753665/pexels-photo-8753665.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '떡볶이 1인분', name_en: 'Tteokbokki (1 serving)', cal: 380, protein: 8, fat: 6, carbs: 72, icon: '🌶️', img: 'https://images.pexels.com/photos/8471732/pexels-photo-8471732.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '김밥 1줄', name_en: 'Gimbap (1 roll)', cal: 420, protein: 12, fat: 10, carbs: 72, icon: '🍙', img: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '라면 1봉지', name_en: 'Instant Ramen (1 pack)', cal: 500, protein: 10, fat: 16, carbs: 78, icon: '🍜', img: 'https://images.pexels.com/photos/12984979/pexels-photo-12984979.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '삼계탕', name_en: 'Samgyetang', cal: 480, protein: 35, fat: 18, carbs: 38, icon: '🐔', img: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  // International foods
  { name_ko: '시저 샐러드', name_en: 'Caesar Salad', cal: 350, protein: 15, fat: 22, carbs: 20, icon: '🥗', img: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '치킨 브레스트 구이', name_en: 'Grilled Chicken Breast', cal: 280, protein: 42, fat: 8, carbs: 0, icon: '🍗', img: 'https://images.pexels.com/photos/361184/pexels-photo-361184.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '연어 스테이크', name_en: 'Salmon Steak', cal: 360, protein: 34, fat: 22, carbs: 0, icon: '🐟', img: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '아보카도 토스트', name_en: 'Avocado Toast', cal: 350, protein: 8, fat: 18, carbs: 38, icon: '🥑', img: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '그릭 요거트', name_en: 'Greek Yogurt', cal: 130, protein: 15, fat: 4, carbs: 8, icon: '🥛', img: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '바나나 1개', name_en: 'Banana', cal: 105, protein: 1, fat: 0, carbs: 27, icon: '🍌', img: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '사과 1개', name_en: 'Apple', cal: 95, protein: 0, fat: 0, carbs: 25, icon: '🍎', img: 'https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '계란 2개', name_en: '2 Eggs', cal: 156, protein: 12, fat: 10, carbs: 1, icon: '🥚', img: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '오트밀 1그릇', name_en: 'Oatmeal (1 bowl)', cal: 300, protein: 10, fat: 6, carbs: 54, icon: '🥣', img: 'https://images.pexels.com/photos/543730/pexels-photo-543730.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '파스타 1인분', name_en: 'Pasta (1 serving)', cal: 550, protein: 18, fat: 12, carbs: 88, icon: '🍝', img: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '스테이크 200g', name_en: 'Steak 200g', cal: 500, protein: 44, fat: 34, carbs: 0, icon: '🥩', img: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '피자 2조각', name_en: 'Pizza (2 slices)', cal: 540, protein: 22, fat: 24, carbs: 56, icon: '🍕', img: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '햄버거', name_en: 'Hamburger', cal: 580, protein: 28, fat: 30, carbs: 42, icon: '🍔', img: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '프로틴 쉐이크', name_en: 'Protein Shake', cal: 200, protein: 30, fat: 3, carbs: 12, icon: '🥤', img: 'https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '아메리카노', name_en: 'Americano', cal: 5, protein: 0, fat: 0, carbs: 1, icon: '☕', img: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '카페라떼', name_en: 'Cafe Latte', cal: 190, protein: 8, fat: 8, carbs: 18, icon: '☕', img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  // Snacks
  { name_ko: '견과류 한줌', name_en: 'Handful of Nuts', cal: 170, protein: 5, fat: 14, carbs: 8, icon: '🥜', img: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '초콜릿 바', name_en: 'Chocolate Bar', cal: 250, protein: 3, fat: 14, carbs: 30, icon: '🍫', img: 'https://images.pexels.com/photos/65882/pexels-photo-65882.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '고구마 1개', name_en: 'Sweet Potato', cal: 180, protein: 2, fat: 0, carbs: 42, icon: '🍠', img: 'https://images.pexels.com/photos/5765658/pexels-photo-5765658.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { name_ko: '두부 반모', name_en: 'Tofu (half block)', cal: 120, protein: 14, fat: 6, carbs: 3, icon: '🧈', img: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
];

// ── Demo Logged Meals for today ──
const _CT_DEMO_MEALS = [
  { id: 'demo-1', meal_type: 'breakfast', name: _t('그릭 요거트 & 그래놀라', 'Greek Yogurt & Granola'), cal: 320, protein: 18, fat: 10, carbs: 42, time: '08:15', icon: '🥣', img: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { id: 'demo-2', meal_type: 'breakfast', name: _t('아메리카노', 'Americano'), cal: 5, protein: 0, fat: 0, carbs: 1, time: '08:20', icon: '☕', img: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { id: 'demo-3', meal_type: 'lunch', name: _t('비빔밥', 'Bibimbap'), cal: 550, protein: 22, fat: 12, carbs: 85, time: '12:30', icon: '🍛', img: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  { id: 'demo-4', meal_type: 'snack', name: _t('바나나 1개', 'Banana'), cal: 105, protein: 1, fat: 0, carbs: 27, time: '15:00', icon: '🍌', img: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
];

// ═══════════════════════════════════════
// OPEN / CLOSE
// ═══════════════════════════════════════

function openCalorieTracker() {
  if (_ctOverlay) { _ctOverlay.style.display = 'flex'; _renderCT(); return; }
  _injectCTStyles();

  _ctOverlay = document.createElement('div');
  _ctOverlay.className = 'ct-overlay';
  _ctOverlay.onclick = e => { if (e.target === _ctOverlay) closeCalorieTracker(); };
  document.body.appendChild(_ctOverlay);

  // Load saved goals from localStorage
  try {
    const saved = localStorage.getItem('mealcule_ct_goals');
    if (saved) _ctGoals = JSON.parse(saved);
    const savedWater = localStorage.getItem('mealcule_ct_water_' + _ctDate);
    if (savedWater) _ctWater = parseInt(savedWater);
  } catch(e) {}

  _renderCT();
}

function closeCalorieTracker() {
  if (_ctOverlay) _ctOverlay.style.display = 'none';
}

// ═══════════════════════════════════════
// MAIN RENDER
// ═══════════════════════════════════════

function _renderCT() {
  const meals = _getActiveMeals();
  const totals = _calcTotals(meals);
  const remaining = _ctGoals.calories - totals.calories;
  const pct = Math.min(100, Math.round((totals.calories / _ctGoals.calories) * 100));

  // Macro percentages
  const protPct = Math.min(100, Math.round((totals.protein / _ctGoals.protein) * 100));
  const fatPct = Math.min(100, Math.round((totals.fat / _ctGoals.fat) * 100));
  const carbsPct = Math.min(100, Math.round((totals.carbs / _ctGoals.carbs) * 100));
  const waterPct = Math.min(100, Math.round((_ctWater / _ctGoals.water) * 100));

  const isDemo = meals.length > 0 && meals[0].id && meals[0].id.startsWith('demo-');

  // Group by meal type
  const groups = { breakfast: [], lunch: [], dinner: [], snack: [] };
  meals.forEach(m => {
    if (groups[m.meal_type]) groups[m.meal_type].push(m);
    else groups.snack.push(m);
  });

  var _ctMealIconBreakfast = '<img src="https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML=\'🌅\'">';
  var _ctMealIconLunch = '<img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML=\'☀️\'">';
  var _ctMealIconDinner = '<img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML=\'🌙\'">';
  var _ctMealIconSnack = '<img src="https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML=\'🍪\'">';
  const mealLabels = {
    breakfast: { icon: _ctMealIconBreakfast, ko: '아침', en: 'Breakfast' },
    lunch: { icon: _ctMealIconLunch, ko: '점심', en: 'Lunch' },
    dinner: { icon: _ctMealIconDinner, ko: '저녁', en: 'Dinner' },
    snack: { icon: _ctMealIconSnack, ko: '간식', en: 'Snack' },
  };

  const dateObj = new Date(_ctDate + 'T00:00:00');
  const dateLabel = _ctDate === new Date().toISOString().slice(0, 10)
    ? _t('오늘', 'Today')
    : dateObj.toLocaleDateString(I18n && I18n.lang === 'en' ? 'en-US' : 'ko-KR', { month: 'short', day: 'numeric', weekday: 'short' });

  _ctOverlay.innerHTML = `
    <div class="ct-panel">
      <!-- Header -->
      <div class="ct-header">
        <div class="ct-header-left">
          <button class="ct-close" onclick="closeCalorieTracker()">←</button>
          <h2 class="ct-title">${_t('칼로리 트래커', 'Calorie Tracker')}</h2>
        </div>
        <div class="ct-date-nav">
          <button class="ct-date-btn" onclick="_ctChangeDate(-1)">‹</button>
          <span class="ct-date-label">${dateLabel}</span>
          <button class="ct-date-btn" onclick="_ctChangeDate(1)">›</button>
        </div>
      </div>

      ${isDemo ? `<div class="ct-demo-banner"><img src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='💡'"> ${_t('샘플 데이터입니다. 음식을 직접 기록해보세요!', 'Sample data. Start logging your own meals!')}</div>` : ''}

      <!-- Calorie Ring -->
      <div class="ct-ring-section">
        <div class="ct-ring-container">
          <svg class="ct-ring-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="${remaining >= 0 ? '#10b981' : '#ef4444'}" stroke-width="10"
              stroke-dasharray="${2 * Math.PI * 52}" stroke-dashoffset="${2 * Math.PI * 52 * (1 - pct / 100)}"
              stroke-linecap="round" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset .6s ease"/>
          </svg>
          <div class="ct-ring-inner">
            <div class="ct-ring-remaining" style="color:${remaining >= 0 ? '#10b981' : '#ef4444'}">${remaining >= 0 ? remaining.toLocaleString() : '+' + Math.abs(remaining).toLocaleString()}</div>
            <div class="ct-ring-label">${remaining >= 0 ? _t('남은 칼로리', 'Remaining') : _t('초과', 'Over')}</div>
          </div>
        </div>
        <div class="ct-ring-stats">
          <div class="ct-stat">
            <div class="ct-stat-val">${_ctGoals.calories.toLocaleString()}</div>
            <div class="ct-stat-lbl">${_t('목표', 'Goal')}</div>
          </div>
          <div class="ct-stat">
            <div class="ct-stat-val">${totals.calories.toLocaleString()}</div>
            <div class="ct-stat-lbl">${_t('섭취', 'Eaten')}</div>
          </div>
          <div class="ct-stat">
            <div class="ct-stat-val" style="color:${remaining >= 0 ? '#10b981' : '#ef4444'}">${remaining >= 0 ? remaining.toLocaleString() : '-' + Math.abs(remaining).toLocaleString()}</div>
            <div class="ct-stat-lbl">${_t('남은', 'Left')}</div>
          </div>
        </div>
      </div>

      <!-- Macro Bars -->
      <div class="ct-macros">
        <div class="ct-macro">
          <div class="ct-macro-header">
            <span class="ct-macro-name">${_t('단백질', 'Protein')}</span>
            <span class="ct-macro-val">${totals.protein}g / ${_ctGoals.protein}g</span>
          </div>
          <div class="ct-macro-bar"><div class="ct-macro-fill ct-prot" style="width:${protPct}%"></div></div>
        </div>
        <div class="ct-macro">
          <div class="ct-macro-header">
            <span class="ct-macro-name">${_t('지방', 'Fat')}</span>
            <span class="ct-macro-val">${totals.fat}g / ${_ctGoals.fat}g</span>
          </div>
          <div class="ct-macro-bar"><div class="ct-macro-fill ct-fat" style="width:${fatPct}%"></div></div>
        </div>
        <div class="ct-macro">
          <div class="ct-macro-header">
            <span class="ct-macro-name">${_t('탄수화물', 'Carbs')}</span>
            <span class="ct-macro-val">${totals.carbs}g / ${_ctGoals.carbs}g</span>
          </div>
          <div class="ct-macro-bar"><div class="ct-macro-fill ct-carbs" style="width:${carbsPct}%"></div></div>
        </div>
      </div>

      <!-- Water Tracker -->
      <div class="ct-water">
        <div class="ct-water-header">
          <span><img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='💧'"> ${_t('수분 섭취', 'Water Intake')}</span>
          <span class="ct-water-val">${(_ctWater / 1000).toFixed(1)}L / ${(_ctGoals.water / 1000).toFixed(1)}L</span>
        </div>
        <div class="ct-macro-bar"><div class="ct-macro-fill ct-water-fill" style="width:${waterPct}%"></div></div>
        <div class="ct-water-btns">
          <button class="ct-water-btn" onclick="_ctAddWater(250)">+250ml</button>
          <button class="ct-water-btn" onclick="_ctAddWater(500)">+500ml</button>
          <button class="ct-water-btn ct-water-custom" onclick="_ctCustomWater()"><img src="https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='✏️'"></button>
          ${_ctWater > 0 ? `<button class="ct-water-btn ct-water-undo" onclick="_ctAddWater(-250)">↩</button>` : ''}
        </div>
      </div>

      <!-- Quick Add Button -->
      <div class="ct-add-section">
        <button class="ct-add-btn" onclick="_ctOpenQuickAdd()">
          + ${_t('음식 기록하기', 'Log Food')}
        </button>
        <button class="ct-photo-btn" onclick="_ctPhotoScan()">
          <img src="https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='📷'"> ${_t('사진으로 기록', 'Photo Scan')}
        </button>
      </div>

      <!-- Meal Groups -->
      <div class="ct-meals">
        ${Object.entries(groups).map(([type, items]) => `
          <div class="ct-meal-group">
            <div class="ct-meal-group-header" onclick="_ctOpenQuickAdd('${type}')">
              <span>${mealLabels[type].icon} ${_t(mealLabels[type].ko, mealLabels[type].en)}</span>
              <span class="ct-meal-group-cal">${items.reduce((s, m) => s + m.cal, 0)} kcal</span>
              <button class="ct-meal-add-small">+</button>
            </div>
            ${items.length > 0 ? items.map(item => `
              <div class="ct-meal-item" ${!item.id.startsWith('demo-') ? `onclick="_ctRemoveMeal('${item.id}')"` : ''}>
                ${item.img ? '<img class="ct-meal-thumb" src="' + item.img + '" alt="" onerror="this.outerHTML=\'<span class=ct-meal-icon>' + (item.icon||'') + '</span>\'">' : '<img class="ct-meal-thumb" src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop" alt="" onerror="this.outerHTML=\'<span class=ct-meal-icon>🍽️</span>\'">'}
                <div class="ct-meal-info">
                  <div class="ct-meal-name">${item.name}</div>
                  <div class="ct-meal-meta">${item.time || ''} · P ${item.protein}g · F ${item.fat}g · C ${item.carbs}g</div>
                </div>
                ${typeof renderQualityBadge === 'function' ? renderQualityBadge(item) : ''}
                <span class="ct-meal-cal">${item.cal}</span>
              </div>
            `).join('') : `
              <div class="ct-meal-empty" onclick="_ctOpenQuickAdd('${type}')">
                ${_t('탭하여 음식 추가', 'Tap to add food')}
              </div>
            `}
          </div>
        `).join('')}
      </div>

      <!-- Goal Settings -->
      <button class="ct-settings-btn" onclick="_ctOpenGoalSettings()">
        <img src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='⚙️'"> ${_t('목표 설정', 'Goal Settings')}
      </button>
    </div>
  `;
}

// ═══════════════════════════════════════
// DATA HELPERS
// ═══════════════════════════════════════

function _getActiveMeals() {
  if (_ctMeals.length > 0) return _ctMeals;
  // Load from localStorage
  try {
    const saved = localStorage.getItem('mealcule_ct_meals_' + _ctDate);
    if (saved) { _ctMeals = JSON.parse(saved); return _ctMeals; }
  } catch(e) {}
  // Demo fallback for today only
  if (_ctDate === new Date().toISOString().slice(0, 10)) return _CT_DEMO_MEALS;
  return [];
}

function _calcTotals(meals) {
  return meals.reduce((t, m) => ({
    calories: t.calories + (m.cal || 0),
    protein: t.protein + (m.protein || 0),
    fat: t.fat + (m.fat || 0),
    carbs: t.carbs + (m.carbs || 0),
  }), { calories: 0, protein: 0, fat: 0, carbs: 0 });
}

function _ctChangeDate(delta) {
  const d = new Date(_ctDate + 'T00:00:00');
  d.setDate(d.getDate() + delta);
  _ctDate = d.toISOString().slice(0, 10);
  _ctMeals = []; // reset to reload for new date
  _ctWater = 0;
  try {
    const savedWater = localStorage.getItem('mealcule_ct_water_' + _ctDate);
    if (savedWater) _ctWater = parseInt(savedWater);
  } catch(e) {}
  _renderCT();
}

// ═══════════════════════════════════════
// QUICK ADD MODAL
// ═══════════════════════════════════════

function _ctOpenQuickAdd(mealType) {
  mealType = mealType || 'snack';

  const mealLabels = {
    breakfast: _t('아침', 'Breakfast'),
    lunch: _t('점심', 'Lunch'),
    dinner: _t('저녁', 'Dinner'),
    snack: _t('간식', 'Snack'),
  };

  const modal = document.createElement('div');
  modal.className = 'ct-quickadd-overlay';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="ct-quickadd-panel">
      <div class="ct-quickadd-header">
        <h3>${_t('음식 기록', 'Log Food')} — ${mealLabels[mealType]}</h3>
        <button class="ct-close" onclick="this.closest('.ct-quickadd-overlay').remove()">✕</button>
      </div>

      <!-- Meal Type Tabs -->
      <div class="ct-meal-tabs">
        ${Object.entries(mealLabels).map(([k, v]) => `
          <button class="ct-meal-tab ${k === mealType ? 'active' : ''}" onclick="_ctSwitchMealTab(this,'${k}')">${v}</button>
        `).join('')}
      </div>

      <!-- Search -->
      <div class="ct-search-wrap">
        <input type="text" class="ct-search-input" id="ctSearchInput"
          placeholder="${_t('음식 검색... (예: 비빔밥, 닭가슴살)', 'Search food... (e.g. rice, chicken)')}"
          oninput="_ctFilterFoods(this.value)">
      </div>

      <!-- Quick Number Entry -->
      <div class="ct-quick-entry">
        <span class="ct-quick-label">${_t('빠른 칼로리 입력:', 'Quick calorie entry:')}</span>
        <input type="number" class="ct-quick-cal" id="ctQuickCal" placeholder="kcal" min="0" max="5000">
        <input type="text" class="ct-quick-name" id="ctQuickName" placeholder="${_t('음식명 (선택)', 'Food name (optional)')}">
        <button class="ct-quick-add-btn" onclick="_ctQuickAddCal('${mealType}')">+</button>
      </div>

      <!-- Food List -->
      <div class="ct-food-list" id="ctFoodList">
        ${_renderFoodList(_CT_QUICK_FOODS, mealType)}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  setTimeout(() => {
    const input = modal.querySelector('#ctSearchInput');
    if (input) input.focus();
  }, 100);
}

function _ctSwitchMealTab(btn, type) {
  const tabs = btn.parentElement.querySelectorAll('.ct-meal-tab');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  // Update the quick add button's meal type
  const addBtn = btn.closest('.ct-quickadd-panel').querySelector('.ct-quick-add-btn');
  if (addBtn) addBtn.setAttribute('onclick', `_ctQuickAddCal('${type}')`);
  // Update food list buttons
  const listEl = btn.closest('.ct-quickadd-panel').querySelector('#ctFoodList');
  if (listEl) listEl.innerHTML = _renderFoodList(_CT_QUICK_FOODS, type);
}

function _renderFoodList(foods, mealType) {
  return foods.map((f, i) => `
    <div class="ct-food-item" onclick="_ctAddFood(${i}, '${mealType}')">
      ${f.img ? '<img class="ct-food-thumb" src="' + f.img + '" alt="" onerror="this.outerHTML=\'<span class=ct-food-icon>' + f.icon + '</span>\'">' : '<span class="ct-food-icon">' + f.icon + '</span>'}
      <div class="ct-food-info">
        <div class="ct-food-name">${_t(f.name_ko, f.name_en)}</div>
        <div class="ct-food-macros">P ${f.protein}g · F ${f.fat}g · C ${f.carbs}g</div>
      </div>
      <span class="ct-food-cal">${f.cal}<small>kcal</small></span>
    </div>
  `).join('');
}

function _ctFilterFoods(query) {
  const q = query.toLowerCase().trim();
  const listEl = document.getElementById('ctFoodList');
  if (!listEl) return;

  // Get active meal type
  const activeTab = document.querySelector('.ct-meal-tab.active');
  const mealType = activeTab ? activeTab.getAttribute('onclick').match(/'(\w+)'/)?.[1] || 'snack' : 'snack';

  if (!q) {
    listEl.innerHTML = _renderFoodList(_CT_QUICK_FOODS, mealType);
    return;
  }

  const filtered = _CT_QUICK_FOODS.filter(f =>
    f.name_ko.toLowerCase().includes(q) ||
    f.name_en.toLowerCase().includes(q)
  );
  listEl.innerHTML = filtered.length > 0
    ? _renderFoodList(filtered, mealType)
    : `<div class="ct-food-empty">${_t('검색 결과 없음. 직접 칼로리를 입력해보세요.', 'No results. Try entering calories manually.')}</div>`;
}

function _ctAddFood(index, mealType) {
  const food = _CT_QUICK_FOODS[index];
  if (!food) return;

  const now = new Date();
  const meal = {
    id: 'ct-' + Date.now(),
    meal_type: mealType,
    name: _t(food.name_ko, food.name_en),
    cal: food.cal,
    protein: food.protein,
    fat: food.fat,
    carbs: food.carbs,
    time: now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'),
    icon: food.icon,
    img: food.img || '',
  };

  // If currently showing demo, replace with real data
  if (_ctMeals.length === 0) {
    const current = _getActiveMeals();
    if (current.length > 0 && current[0].id && current[0].id.startsWith('demo-')) {
      _ctMeals = []; // Start fresh, discard demo
    }
  }
  _ctMeals.push(meal);
  _saveMeals();

  // Close modal & re-render
  const overlay = document.querySelector('.ct-quickadd-overlay');
  if (overlay) overlay.remove();
  _renderCT();

  if (typeof showToast === 'function') showToast(_t(`${food.name_ko} 추가됨 (+${food.cal}kcal)`, `${food.name_en} added (+${food.cal}kcal)`));
}

function _ctQuickAddCal(mealType) {
  const calInput = document.getElementById('ctQuickCal');
  const nameInput = document.getElementById('ctQuickName');
  if (!calInput) return;

  const cal = parseInt(calInput.value);
  if (!cal || isNaN(cal) || cal <= 0) {
    // Show validation feedback
    calInput.style.borderColor = '#EF4444';
    calInput.style.animation = 'none';
    calInput.offsetHeight; // trigger reflow
    calInput.style.animation = 'ctShake 0.3s';
    calInput.placeholder = _t('숫자를 입력하세요', 'Enter a number');
    calInput.focus();
    setTimeout(() => { calInput.style.borderColor = ''; }, 1500);
    return;
  }

  const name = (nameInput && nameInput.value.trim()) || _t('빠른 기록', 'Quick Entry');
  const now = new Date();

  if (_ctMeals.length === 0) {
    const current = _getActiveMeals();
    if (current.length > 0 && current[0].id && current[0].id.startsWith('demo-')) {
      _ctMeals = [];
    }
  }

  _ctMeals.push({
    id: 'ct-' + Date.now(),
    meal_type: mealType,
    name: name,
    cal: cal,
    protein: 0, fat: 0, carbs: 0,
    time: now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'),
    icon: '🍽️',
    img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
  });
  _saveMeals();

  const overlay = document.querySelector('.ct-quickadd-overlay');
  if (overlay) overlay.remove();
  _renderCT();
  if (typeof showToast === 'function') showToast(_t(`${cal}kcal 추가됨`, `${cal}kcal added`));
}

function _ctRemoveMeal(id) {
  if (typeof confirmAction === 'function') {
    confirmAction(_t('이 식사를 삭제하시겠습니까?', 'Delete this meal?'), () => {
      _ctMeals = _ctMeals.filter(m => m.id !== id);
      _saveMeals();
      _renderCT();
    });
  } else {
    if (!confirm(_t('이 식사를 삭제하시겠습니까?', 'Delete this meal?'))) return;
    _ctMeals = _ctMeals.filter(m => m.id !== id);
    _saveMeals();
    _renderCT();
  }
}

function _saveMeals() {
  try {
    localStorage.setItem('mealcule_ct_meals_' + _ctDate, JSON.stringify(_ctMeals));
    // 스트릭 업데이트
    if (typeof updateStreak === 'function') updateStreak();
    // Home 탭 리렌더링 플래그
    if (typeof _tabRendered !== 'undefined') _tabRendered.home = false;
  } catch(e) {}
}

// ═══════════════════════════════════════
// WATER TRACKER
// ═══════════════════════════════════════

function _ctAddWater(ml) {
  _ctWater = Math.max(0, _ctWater + ml);
  try { localStorage.setItem('mealcule_ct_water_' + _ctDate, _ctWater.toString()); } catch(e) {}
  _renderCT();
}

function _ctCustomWater() {
  const ml = prompt(_t('수분 섭취량 (ml):', 'Water intake (ml):'));
  if (ml && parseInt(ml) > 0) _ctAddWater(parseInt(ml));
}

// ═══════════════════════════════════════
// PHOTO SCAN (integrates with existing photo-ingredient API)
// ═══════════════════════════════════════

function _ctPhotoScan() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (typeof showToast === 'function') showToast(_t('사진 분석 중...', 'Analyzing photo...'));

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        const resp = await fetch('/api/photo-ingredient', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        if (!resp.ok) throw new Error('API error');
        const data = await resp.json();

        if (data.foods && data.foods.length > 0) {
          // AI returned recognized foods with calories
          data.foods.forEach(food => {
            _ctMeals.push({
              id: 'ct-' + Date.now() + Math.random().toString(36).slice(2, 5),
              meal_type: _guessCurrentMealType(),
              name: food.name || _t('인식된 음식', 'Recognized Food'),
              cal: food.calories || 0,
              protein: food.protein || 0,
              fat: food.fat || 0,
              carbs: food.carbs || 0,
              time: new Date().toTimeString().slice(0, 5),
              icon: '📷',
              img: 'https://images.pexels.com/photos/821749/pexels-photo-821749.jpeg?auto=compress&cs=tinysrgb&w=36&h=36&fit=crop',
            });
          });
          _saveMeals();
          _renderCT();
          if (typeof showToast === 'function') showToast(_t(`${data.foods.length}개 음식 인식됨!`, `${data.foods.length} food(s) recognized!`));
        } else {
          if (typeof showToast === 'function') showToast(_t('음식을 인식하지 못했습니다. 직접 입력해주세요.', 'Could not recognize food. Please enter manually.'));
        }
      };
      reader.readAsDataURL(file);
    } catch(err) {
      if (typeof showToast === 'function') showToast(_t('사진 분석 실패. 네트워크를 확인해주세요.', 'Photo analysis failed. Check your network.'));
    }
  };
  input.click();
}

function _guessCurrentMealType() {
  const h = new Date().getHours();
  if (h < 10) return 'breakfast';
  if (h < 14) return 'lunch';
  if (h < 18) return 'snack';
  return 'dinner';
}

// ═══════════════════════════════════════
// GOAL SETTINGS
// ═══════════════════════════════════════

function _ctOpenGoalSettings() {
  const modal = document.createElement('div');
  modal.className = 'ct-quickadd-overlay';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="ct-quickadd-panel" style="max-width:400px">
      <div class="ct-quickadd-header">
        <h3><img src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='⚙️'"> ${_t('일일 목표 설정', 'Daily Goal Settings')}</h3>
        <button class="ct-close" onclick="this.closest('.ct-quickadd-overlay').remove()">✕</button>
      </div>
      <div class="ct-goal-form">
        <label class="ct-goal-row">
          <span><img src="https://images.pexels.com/photos/266526/pexels-photo-266526.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='🔥'"> ${_t('칼로리', 'Calories')} (kcal)</span>
          <input type="number" id="ctGoalCal" value="${_ctGoals.calories}" min="500" max="10000">
        </label>
        <label class="ct-goal-row">
          <span><img src="https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='🥩'"> ${_t('단백질', 'Protein')} (g)</span>
          <input type="number" id="ctGoalProt" value="${_ctGoals.protein}" min="10" max="500">
        </label>
        <label class="ct-goal-row">
          <span><img src="https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='🧈'"> ${_t('지방', 'Fat')} (g)</span>
          <input type="number" id="ctGoalFat" value="${_ctGoals.fat}" min="10" max="500">
        </label>
        <label class="ct-goal-row">
          <span><img src="https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='🌾'"> ${_t('탄수화물', 'Carbs')} (g)</span>
          <input type="number" id="ctGoalCarbs" value="${_ctGoals.carbs}" min="10" max="1000">
        </label>
        <label class="ct-goal-row">
          <span><img src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:16px;height:16px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='💧'"> ${_t('수분', 'Water')} (ml)</span>
          <input type="number" id="ctGoalWater" value="${_ctGoals.water}" min="500" max="10000">
        </label>
        <div style="margin-top:12px;padding:12px;background:rgba(16,185,129,0.08);border-radius:10px;font-size:11px;color:#10B981">
          <img src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&fit=crop" style="width:14px;height:14px;border-radius:3px;vertical-align:middle;object-fit:cover" onerror="this.outerHTML='💡'"> ${_t('일반 성인 권장: 2,000kcal · 단백질 50g · 지방 65g · 탄수화물 300g · 수분 2L', 'Recommended: 2,000kcal · Protein 50g · Fat 65g · Carbs 300g · Water 2L')}
        </div>
        <button class="ct-add-btn" style="margin-top:16px" onclick="_ctSaveGoals()">
          ${_t('저장', 'Save')}
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function _ctSaveGoals() {
  const cal = parseInt(document.getElementById('ctGoalCal')?.value) || 2000;
  const prot = parseInt(document.getElementById('ctGoalProt')?.value) || 50;
  const fat = parseInt(document.getElementById('ctGoalFat')?.value) || 65;
  const carbs = parseInt(document.getElementById('ctGoalCarbs')?.value) || 300;
  const water = parseInt(document.getElementById('ctGoalWater')?.value) || 2000;

  _ctGoals = { calories: cal, protein: prot, fat: fat, carbs: carbs, water: water };
  try { localStorage.setItem('mealcule_ct_goals', JSON.stringify(_ctGoals)); } catch(e) {}

  const overlay = document.querySelector('.ct-quickadd-overlay');
  if (overlay) overlay.remove();
  _renderCT();
  if (typeof showToast === 'function') showToast(_t('목표가 저장되었습니다', 'Goals saved'));
}

// ═══════════════════════════════════════
// STYLES
// ═══════════════════════════════════════

function _injectCTStyles() {
  if (_ctStyleInjected) return;
  _ctStyleInjected = true;

  const css = document.createElement('style');
  css.textContent = `
  /* ── Calorie Tracker Overlay ── */
  .ct-overlay {
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);
    display:flex; justify-content:center; align-items:flex-start;
    overflow-y:auto; padding:20px 10px;
  }
  .ct-panel {
    background:#161819; border-radius:20px; width:100%; max-width:480px;
    box-shadow:0 20px 60px rgba(0,0,0,0.2); padding:0 0 24px;
    animation: ctSlideUp .3s ease;
  }
  @keyframes ctSlideUp { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
  @keyframes ctShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }

  /* Header */
  .ct-header {
    display:flex; justify-content:space-between; align-items:center;
    padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .ct-header-left { display:flex; align-items:center; gap:12px; }
  .ct-close {
    background:none; border:none; font-size:20px; cursor:pointer; color:rgba(255,255,255,0.4); padding:0 4px;
    font-weight:600;
  }
  .ct-close:hover { color:#F5F5F5; }
  .ct-title { font-size:17px; font-weight:700; color:#F5F5F5; margin:0; }
  .ct-date-nav { display:flex; align-items:center; gap:8px; }
  .ct-date-btn {
    background:none; border:1px solid rgba(255,255,255,0.08); border-radius:8px;
    width:28px; height:28px; cursor:pointer; font-size:16px; color:rgba(255,255,255,0.4);
    display:flex; align-items:center; justify-content:center;
  }
  .ct-date-btn:hover { background:rgba(255,255,255,0.07); color:#F5F5F5; }
  .ct-date-label { font-size:13px; font-weight:600; color:#F5F5F5; }

  /* Demo Banner */
  .ct-demo-banner {
    margin:12px 20px 0; padding:8px 14px; background:rgba(16,185,129,0.08); border-radius:10px;
    font-size:11px; color:#10B981; text-align:center;
  }

  /* Calorie Ring */
  .ct-ring-section { display:flex; align-items:center; justify-content:center; gap:24px; padding:20px 20px 12px; }
  .ct-ring-container { position:relative; width:120px; height:120px; }
  .ct-ring-svg { width:120px; height:120px; }
  .ct-ring-inner {
    position:absolute; inset:0; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
  }
  .ct-ring-remaining { font-size:24px; font-weight:800; line-height:1; }
  .ct-ring-label { font-size:10px; color:rgba(255,255,255,0.35); margin-top:2px; }
  .ct-ring-stats { display:flex; flex-direction:column; gap:8px; }
  .ct-stat { text-align:center; }
  .ct-stat-val { font-size:18px; font-weight:700; color:#F5F5F5; }
  .ct-stat-lbl { font-size:10px; color:rgba(255,255,255,0.35); }

  /* Macro Bars */
  .ct-macros { padding:0 20px 12px; display:flex; flex-direction:column; gap:8px; }
  .ct-macro-header { display:flex; justify-content:space-between; margin-bottom:2px; }
  .ct-macro-name { font-size:12px; font-weight:600; color:#F5F5F5; }
  .ct-macro-val { font-size:11px; color:rgba(255,255,255,0.35); }
  .ct-macro-bar {
    height:8px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden;
  }
  .ct-macro-fill {
    height:100%; border-radius:4px; transition:width .4s ease;
  }
  .ct-prot { background:linear-gradient(90deg,#6366f1,#818cf8); }
  .ct-fat { background:linear-gradient(90deg,#f59e0b,#fbbf24); }
  .ct-carbs { background:linear-gradient(90deg,#10b981,#34d399); }

  /* Water */
  .ct-water { padding:12px 20px; }
  .ct-water-header {
    display:flex; justify-content:space-between; margin-bottom:4px;
    font-size:13px; font-weight:600; color:#F5F5F5;
  }
  .ct-water-val { font-size:11px; color:rgba(255,255,255,0.35); font-weight:400; }
  .ct-water-fill { background:linear-gradient(90deg,#3b82f6,#60a5fa); }
  .ct-water-btns { display:flex; gap:8px; margin-top:8px; }
  .ct-water-btn {
    flex:1; padding:6px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);
    background:rgba(255,255,255,0.04); font-size:12px; font-weight:600; color:#F5F5F5; cursor:pointer;
  }
  .ct-water-btn:hover { background:rgba(59,130,246,0.1); border-color:rgba(59,130,246,0.3); }
  .ct-water-undo { flex:0 0 auto; padding:6px 12px; }
  .ct-water-custom { flex:0 0 auto; padding:6px 12px; }

  /* Add Food Section */
  .ct-add-section { padding:16px 20px; display:flex; gap:8px; }
  .ct-add-btn {
    flex:1; padding:12px; border-radius:12px; border:none;
    background:linear-gradient(135deg,#10b981,#059669); color:#fff;
    font-size:14px; font-weight:700; cursor:pointer;
    box-shadow:0 2px 8px rgba(16,185,129,0.3);
  }
  .ct-add-btn:hover { filter:brightness(1.05); transform:translateY(-1px); }
  .ct-photo-btn {
    padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.08);
    background:rgba(255,255,255,0.04); font-size:13px; font-weight:600; color:#F5F5F5; cursor:pointer;
  }
  .ct-photo-btn:hover { background:rgba(255,255,255,0.07); }

  /* Meal Groups */
  .ct-meals { padding:0 20px; }
  .ct-meal-group { margin-bottom:12px; }
  .ct-meal-group-header {
    display:flex; align-items:center; justify-content:space-between;
    padding:8px 0; cursor:pointer; font-size:13px; font-weight:700; color:#F5F5F5;
  }
  .ct-meal-group-cal { font-size:12px; color:rgba(255,255,255,0.35); font-weight:500; }
  .ct-meal-add-small {
    width:24px; height:24px; border-radius:6px; border:1px dashed rgba(255,255,255,0.15);
    background:none; font-size:14px; color:rgba(255,255,255,0.35); cursor:pointer;
    display:flex; align-items:center; justify-content:center;
  }
  .ct-meal-add-small:hover { background:rgba(255,255,255,0.07); color:#F5F5F5; }
  .ct-meal-item {
    display:flex; align-items:center; gap:10px; padding:8px 12px;
    border-radius:10px; margin-bottom:4px; cursor:pointer;
    background:rgba(255,255,255,0.04); transition:background .15s;
  }
  .ct-meal-item:hover { background:rgba(239,68,68,0.1); }
  .ct-meal-icon { font-size:20px; }
  .ct-meal-thumb, .ct-food-thumb {
    width:36px; height:36px; border-radius:10px; object-fit:cover;
    background:rgba(255,255,255,0.04); flex-shrink:0;
  }
  .ct-food-thumb {
    width:40px; height:40px;
  }
  .ct-meal-info { flex:1; min-width:0; }
  .ct-meal-name { font-size:13px; font-weight:600; color:#F5F5F5; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .ct-meal-meta { font-size:10px; color:rgba(255,255,255,0.35); margin-top:1px; }
  .ct-meal-cal { font-size:14px; font-weight:700; color:#F5F5F5; white-space:nowrap; }
  .ct-meal-empty {
    padding:12px; text-align:center; border:1px dashed rgba(255,255,255,0.08); border-radius:10px;
    font-size:12px; color:rgba(255,255,255,0.35); cursor:pointer; margin-bottom:4px;
  }
  .ct-meal-empty:hover { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.15); }

  /* Settings */
  .ct-settings-btn {
    display:block; margin:12px auto 0; padding:8px 20px; border-radius:10px;
    border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.04); font-size:12px; font-weight:500;
    color:rgba(255,255,255,0.4); cursor:pointer;
  }
  .ct-settings-btn:hover { background:rgba(255,255,255,0.07); }

  /* ── Quick Add Modal ── */
  .ct-quickadd-overlay {
    position:fixed; inset:0; z-index:9500;
    background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);
    display:flex; justify-content:center; align-items:flex-start;
    overflow-y:auto; padding:40px 10px;
  }
  .ct-quickadd-panel {
    background:#161819; border-radius:20px; width:100%; max-width:500px;
    box-shadow:0 20px 60px rgba(0,0,0,0.2); padding:0 0 20px;
    animation: ctSlideUp .25s ease;
  }
  .ct-quickadd-header {
    display:flex; justify-content:space-between; align-items:center;
    padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .ct-quickadd-header h3 { font-size:15px; font-weight:700; margin:0; }
  .ct-meal-tabs { display:flex; gap:4px; padding:12px 20px; }
  .ct-meal-tab {
    flex:1; padding:6px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);
    background:rgba(255,255,255,0.04); font-size:11px; font-weight:600; color:rgba(255,255,255,0.4); cursor:pointer;
    text-align:center;
  }
  .ct-meal-tab.active { background:#10b981; color:#fff; border-color:#10b981; }
  .ct-search-wrap { padding:0 20px 8px; }
  .ct-search-input {
    width:100%; padding:10px 14px; border:1px solid rgba(255,255,255,0.08); border-radius:10px;
    font-size:13px; outline:none; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;
  }
  .ct-search-input:focus { border-color:#10B981; box-shadow:0 0 0 3px rgba(16,185,129,0.1); }
  .ct-quick-entry {
    display:flex; gap:6px; padding:0 20px 12px; align-items:center; flex-wrap:wrap;
  }
  .ct-quick-label { font-size:11px; color:rgba(255,255,255,0.4); font-weight:600; width:100%; margin-bottom:2px; }
  .ct-quick-cal, .ct-quick-name {
    flex:1; padding:8px 10px; border:1px solid rgba(255,255,255,0.08); border-radius:8px;
    font-size:13px; min-width:0; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;
  }
  .ct-quick-cal { max-width:80px; }
  .ct-quick-add-btn {
    width:36px; height:36px; border-radius:8px; border:none;
    background:#10b981; color:#fff; font-size:18px; font-weight:700; cursor:pointer;
  }
  .ct-food-list { max-height:360px; overflow-y:auto; padding:0 20px; }
  .ct-food-item {
    display:flex; align-items:center; gap:10px; padding:10px 12px;
    border-radius:10px; cursor:pointer; transition:background .15s;
  }
  .ct-food-item:hover { background:rgba(16,185,129,0.08); }
  .ct-food-icon { font-size:22px; }
  .ct-food-info { flex:1; min-width:0; }
  .ct-food-name { font-size:13px; font-weight:600; color:#F5F5F5; }
  .ct-food-macros { font-size:10px; color:rgba(255,255,255,0.35); margin-top:1px; }
  .ct-food-cal { font-size:14px; font-weight:700; color:#10B981; white-space:nowrap; }
  .ct-food-cal small { font-size:9px; color:rgba(255,255,255,0.35); font-weight:400; margin-left:1px; }
  .ct-food-empty { padding:20px; text-align:center; font-size:12px; color:rgba(255,255,255,0.35); }

  /* Goal Settings Form */
  .ct-goal-form { padding:16px 20px; }
  .ct-goal-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.08);
  }
  .ct-goal-row span { font-size:13px; font-weight:600; color:#F5F5F5; }
  .ct-goal-row input {
    width:100px; padding:6px 10px; border:1px solid rgba(255,255,255,0.08); border-radius:8px;
    font-size:14px; font-weight:600; text-align:right; box-sizing:border-box; background:rgba(255,255,255,0.04); color:#F5F5F5;
  }
  .ct-goal-row input:focus { border-color:#10B981; outline:none; }

  /* ── Mobile Responsive ── */
  @media (max-width:600px) {
    .ct-overlay { padding:0; }
    .ct-panel { border-radius:0; min-height:100vh; max-width:100%; }
    .ct-ring-section { flex-direction:column; gap:12px; }
    .ct-ring-stats { flex-direction:row; gap:24px; }
    .ct-add-section { flex-direction:column; }
  }
  `;
  document.head.appendChild(css);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Expose global
  window.openCalorieTracker = openCalorieTracker;
});
