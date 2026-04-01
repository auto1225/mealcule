// ── Recipe Box: Save, Bookmark & Organize Recipes ──
// Depends on globals from app.js: sbClient, dbQuery, dbRPC, currentUser,
// userPlan, isGuest, showToast, selected, method, lastAnalysisResult,
// _cachedRecipes, CATEGORIES, DB, I18n

var _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;

const RECIPE_BOX_LIMITS = { free: 10, pro: Infinity, enterprise: Infinity };

let _recipeBoxOpen = false;
let _recipeBoxCollection = null;   // null = "All"
let _recipeBoxCache = [];          // loaded saved recipes
let _collectionsCache = [];        // loaded collections

// ── Demo/Sample Recipes (shown when database is empty) ─────────────────────
const _demoCollections = [
  { id: 'demo-col-fav', name: '즐겨찾기', name_en: 'Favorites', emoji: '⭐', sort_order: 0 },
  { id: 'demo-col-mol', name: '분자요리', name_en: 'Molecular', emoji: '🔬', sort_order: 1 },
  { id: 'demo-col-quick', name: '간단 요리', name_en: 'Quick Meals', emoji: '⚡', sort_order: 2 },
];

const _demoRecipes = [
  {
    id: 'demo-1',
    name: '수비드 연어 스테이크',
    name_en: 'Sous Vide Salmon',
    description: _t(
      '정밀 온도 제어로 완벽한 식감을 구현한 연어 스테이크. 52°C에서 45분간 수비드 조리하여 단백질 변성을 최소화합니다.',
      'Precision temperature-controlled salmon steak. Sous vide at 52°C for 45 minutes to minimize protein denaturation.'
    ),
    cuisine: 'Molecular',
    difficulty: 'Medium',
    health_note: _t('오메가-3 지방산이 풍부하고 저온 조리로 영양소 보존율이 높습니다.', 'Rich in omega-3 fatty acids with high nutrient retention from low-temperature cooking.'),
    allergens: ['Fish'],
    ingredients: [
      { name: 'Atlantic Salmon Fillet', grams: 200 },
      { name: 'Olive Oil', grams: 15 },
      { name: 'Lemon Juice', grams: 10 },
      { name: 'Dill', grams: 3 },
      { name: 'Sea Salt', grams: 2 },
      { name: 'Black Pepper', grams: 1 },
    ],
    method: 'Sous Vide',
    temperature: 52,
    duration: 45,
    nutrition_snapshot: { calories: 380, protein: 34, fat: 24, carbs: 1, fiber: 0 },
    flavor_snapshot: { umami: 0.8, salt: 0.4, sweet: 0.1, sour: 0.2, bitter: 0.0 },
    collection_id: 'demo-col-mol',
    notes: _t('레몬 버터 소스와 함께 서빙하면 풍미가 극대화됩니다.', 'Serve with lemon butter sauce for maximum flavor.'),
    rating: 5,
    tags: ['sous-vide', 'seafood', 'high-protein', 'molecular'],
    is_favorite: true,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-28T10:30:00Z',
    updated_at: '2026-03-28T10:30:00Z',
  },
  {
    id: 'demo-2',
    name: '저온 조리 소고기 안심',
    name_en: 'Slow-Cooked Beef Tenderloin',
    description: _t(
      '56°C 정밀 조리로 미오신 단백질만 변성시켜 최상의 육즙을 유지하는 안심 스테이크.',
      'Precision-cooked at 56°C to denature only myosin proteins, retaining maximum juiciness in beef tenderloin.'
    ),
    cuisine: 'Molecular',
    difficulty: 'Hard',
    health_note: _t('고단백 저탄수화물 식단에 적합합니다. 철분과 아연이 풍부합니다.', 'Ideal for high-protein low-carb diets. Rich in iron and zinc.'),
    allergens: [],
    ingredients: [
      { name: 'Beef Tenderloin', grams: 250 },
      { name: 'Butter', grams: 20 },
      { name: 'Garlic', grams: 8 },
      { name: 'Thyme', grams: 3 },
      { name: 'Rosemary', grams: 2 },
      { name: 'Sea Salt', grams: 3 },
      { name: 'Black Pepper', grams: 2 },
    ],
    method: 'Sous Vide',
    temperature: 56,
    duration: 120,
    nutrition_snapshot: { calories: 520, protein: 52, fat: 32, carbs: 2, fiber: 0 },
    flavor_snapshot: { umami: 0.9, salt: 0.5, sweet: 0.1, sour: 0.0, bitter: 0.0 },
    collection_id: 'demo-col-mol',
    notes: _t('시어링 전에 표면을 완전히 건조시키는 것이 핵심입니다.', 'Key is to fully dry the surface before searing.'),
    rating: 5,
    tags: ['sous-vide', 'beef', 'high-protein', 'molecular'],
    is_favorite: true,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-27T14:00:00Z',
    updated_at: '2026-03-27T14:00:00Z',
  },
  {
    id: 'demo-3',
    name: '발효 퀴노아 부다볼',
    name_en: 'Fermented Quinoa Buddha Bowl',
    description: _t(
      '발효 과정을 거친 퀴노아와 신선한 채소로 구성된 영양 균형 볼. 프로바이오틱스가 풍부합니다.',
      'Nutrient-balanced bowl with fermented quinoa and fresh vegetables. Rich in probiotics.'
    ),
    cuisine: 'Fusion',
    difficulty: 'Easy',
    health_note: _t('발효 과정이 피트산을 분해하여 미네랄 흡수율을 높입니다.', 'Fermentation breaks down phytic acid, improving mineral absorption.'),
    allergens: ['Sesame'],
    ingredients: [
      { name: 'Quinoa (fermented)', grams: 150 },
      { name: 'Avocado', grams: 80 },
      { name: 'Chickpeas', grams: 60 },
      { name: 'Kale', grams: 40 },
      { name: 'Cherry Tomatoes', grams: 50 },
      { name: 'Tahini', grams: 15 },
      { name: 'Lemon Juice', grams: 10 },
    ],
    method: 'Raw + Fermented',
    temperature: null,
    duration: 15,
    nutrition_snapshot: { calories: 445, protein: 18, fat: 22, carbs: 48, fiber: 12 },
    flavor_snapshot: { umami: 0.3, salt: 0.3, sweet: 0.3, sour: 0.4, bitter: 0.2 },
    collection_id: 'demo-col-quick',
    notes: _t('퀴노아는 24시간 발효 후 사용하세요.', 'Use quinoa after 24-hour fermentation.'),
    rating: 4,
    tags: ['fermented', 'vegan', 'high-fiber', 'probiotic'],
    is_favorite: false,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-26T09:15:00Z',
    updated_at: '2026-03-26T09:15:00Z',
  },
  {
    id: 'demo-4',
    name: '효소 활성 샐러드',
    name_en: 'Enzyme-Active Salad',
    description: _t(
      '가열하지 않아 효소가 활성 상태인 채소 샐러드. 소화 효소 보충에 효과적입니다.',
      'Unheated vegetable salad with active enzymes. Effective for supplementing digestive enzymes.'
    ),
    cuisine: 'Raw',
    difficulty: 'Easy',
    health_note: _t('가열하지 않아 비타민 C와 엽산이 100% 보존됩니다.', 'No heating preserves 100% of vitamin C and folate.'),
    allergens: ['Tree Nuts'],
    ingredients: [
      { name: 'Mixed Greens', grams: 100 },
      { name: 'Broccoli Sprouts', grams: 30 },
      { name: 'Red Bell Pepper', grams: 60 },
      { name: 'Walnuts', grams: 20 },
      { name: 'Apple Cider Vinegar', grams: 10 },
      { name: 'Extra Virgin Olive Oil', grams: 15 },
    ],
    method: 'Raw',
    temperature: null,
    duration: 10,
    nutrition_snapshot: { calories: 265, protein: 8, fat: 20, carbs: 16, fiber: 6 },
    flavor_snapshot: { umami: 0.1, salt: 0.2, sweet: 0.3, sour: 0.4, bitter: 0.3 },
    collection_id: 'demo-col-quick',
    notes: _t('브로콜리 스프라우트의 설포라판이 항산화 효과를 극대화합니다.', 'Sulforaphane in broccoli sprouts maximizes antioxidant effects.'),
    rating: 4,
    tags: ['raw', 'enzyme', 'antioxidant', 'quick'],
    is_favorite: false,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-25T11:45:00Z',
    updated_at: '2026-03-25T11:45:00Z',
  },
  {
    id: 'demo-5',
    name: '마이야르 반응 된장 라멘',
    name_en: 'Maillard Reaction Miso Ramen',
    description: _t(
      '된장의 아미노산과 당분이 마이야르 반응을 일으켜 깊은 감칠맛을 내는 라멘.',
      'Ramen where amino acids and sugars in miso undergo Maillard reaction for deep umami flavor.'
    ),
    cuisine: 'Japanese',
    difficulty: 'Medium',
    health_note: _t('된장의 이소플라본과 프로바이오틱스가 장 건강에 도움을 줍니다.', 'Isoflavones and probiotics in miso support gut health.'),
    allergens: ['Soy', 'Wheat', 'Egg'],
    ingredients: [
      { name: 'Ramen Noodles', grams: 120 },
      { name: 'White Miso Paste', grams: 40 },
      { name: 'Pork Belly', grams: 80 },
      { name: 'Soft-Boiled Egg', grams: 60 },
      { name: 'Green Onion', grams: 15 },
      { name: 'Nori Seaweed', grams: 3 },
      { name: 'Dashi Stock', grams: 400 },
    ],
    method: 'Boil + Sear',
    temperature: 100,
    duration: 30,
    nutrition_snapshot: { calories: 620, protein: 32, fat: 28, carbs: 58, fiber: 4 },
    flavor_snapshot: { umami: 0.95, salt: 0.6, sweet: 0.2, sour: 0.1, bitter: 0.0 },
    collection_id: 'demo-col-fav',
    notes: _t('된장을 직접 불에 살짝 구우면 마이야르 반응이 극대화됩니다.', 'Lightly charring miso over direct flame maximizes Maillard reaction.'),
    rating: 5,
    tags: ['maillard', 'umami', 'fermented', 'japanese'],
    is_favorite: true,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-24T18:00:00Z',
    updated_at: '2026-03-24T18:00:00Z',
  },
  {
    id: 'demo-6',
    name: '유화 기법 카르보나라',
    name_en: 'Emulsion Technique Carbonara',
    description: _t(
      '달걀 노른자와 치즈의 정밀한 유화 기법으로 크림 없이 실키한 소스를 만드는 정통 카르보나라.',
      'Authentic carbonara using precise emulsion of egg yolk and cheese for a silky sauce without cream.'
    ),
    cuisine: 'Italian',
    difficulty: 'Medium',
    health_note: _t('크림을 사용하지 않아 칼로리가 낮으면서도 풍부한 맛을 냅니다.', 'No cream used, resulting in lower calories while maintaining rich flavor.'),
    allergens: ['Egg', 'Dairy', 'Wheat'],
    ingredients: [
      { name: 'Spaghetti', grams: 160 },
      { name: 'Guanciale', grams: 80 },
      { name: 'Egg Yolk', grams: 40 },
      { name: 'Pecorino Romano', grams: 30 },
      { name: 'Parmigiano Reggiano', grams: 20 },
      { name: 'Black Pepper', grams: 3 },
    ],
    method: 'Boil + Emulsify',
    temperature: 65,
    duration: 20,
    nutrition_snapshot: { calories: 580, protein: 28, fat: 26, carbs: 56, fiber: 3 },
    flavor_snapshot: { umami: 0.85, salt: 0.5, sweet: 0.1, sour: 0.0, bitter: 0.0 },
    collection_id: 'demo-col-fav',
    notes: _t('소스 온도가 70°C를 넘으면 달걀이 응고되므로 주의하세요.', 'Be careful not to exceed 70°C or the egg will curdle.'),
    rating: 4,
    tags: ['emulsion', 'italian', 'pasta', 'technique'],
    is_favorite: true,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-23T12:30:00Z',
    updated_at: '2026-03-23T12:30:00Z',
  },
  {
    id: 'demo-7',
    name: '구형화 망고 캐비어',
    name_en: 'Spherification Mango Caviar',
    description: _t(
      '알긴산나트륨과 염화칼슘을 이용한 구형화 기법으로 만든 망고 캐비어. 분자 요리의 대표적인 기법입니다.',
      'Mango caviar made using spherification with sodium alginate and calcium chloride. A signature molecular gastronomy technique.'
    ),
    cuisine: 'Molecular',
    difficulty: 'Hard',
    health_note: _t('망고의 비타민 A와 C가 풍부하며, 알긴산은 수용성 식이섬유입니다.', 'Rich in mango vitamins A and C; alginate is a soluble dietary fiber.'),
    allergens: [],
    ingredients: [
      { name: 'Mango Puree', grams: 200 },
      { name: 'Sodium Alginate', grams: 2 },
      { name: 'Calcium Chloride', grams: 5 },
      { name: 'Sugar', grams: 10 },
      { name: 'Water', grams: 500 },
    ],
    method: 'Spherification',
    temperature: 4,
    duration: 30,
    nutrition_snapshot: { calories: 145, protein: 1, fat: 0, carbs: 36, fiber: 3 },
    flavor_snapshot: { umami: 0.0, salt: 0.1, sweet: 0.9, sour: 0.3, bitter: 0.0 },
    collection_id: 'demo-col-mol',
    notes: _t('알긴산 용액은 냉장고에서 12시간 숙성 후 사용하면 기포가 줄어듭니다.', 'Resting alginate solution in fridge for 12 hours reduces air bubbles.'),
    rating: 5,
    tags: ['spherification', 'molecular', 'dessert', 'technique'],
    is_favorite: false,
    source: 'demo',
    source_url: null,
    image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created_at: '2026-03-22T16:00:00Z',
    updated_at: '2026-03-22T16:00:00Z',
  },
];

function _getDemoRecipes(collectionId) {
  if (collectionId === '__favorites__') return _demoRecipes.filter(r => r.is_favorite);
  if (collectionId) return _demoRecipes.filter(r => r.collection_id === collectionId);
  return _demoRecipes;
}

function _isDemoRecipe(id) { return typeof id === 'string' && id.startsWith('demo-'); }

// ── 1. Save Recipe ──────────────────────────────────────────────────────────

async function saveRecipe(recipeIndex) {
  if (isGuest || !currentUser) {
    showToast(_t('로그인 후 레시피를 저장할 수 있습니다.', 'Please log in to save recipes.'));
    return null;
  }

  // Plan limit check
  const limit = RECIPE_BOX_LIMITS[userPlan] || RECIPE_BOX_LIMITS.free;
  if (limit !== Infinity) {
    const existing = await dbQuery('saved_recipes', 'select', {
      select: 'id',
      eq: { user_id: currentUser.id },
    });
    if (existing && existing.length >= limit) {
      showToast(_t(
        `무료 플랜은 최대 ${limit}개까지 저장 가능합니다. Pro로 업그레이드하세요!`,
        `Free plan allows up to ${limit} saved recipes. Upgrade to Pro!`
      ));
      return null;
    }
  }

  const recipes = _cachedRecipes?.recipes;
  if (!recipes || !recipes[recipeIndex]) {
    showToast(_t('저장할 레시피가 없습니다.', 'No recipe to save.'));
    return null;
  }

  const r = recipes[recipeIndex];
  const now = new Date().toISOString();
  const row = {
    user_id: currentUser.id,
    name: r.name,
    name_en: r.name_en || r.name,
    description: r.description || '',
    cuisine: r.cuisine || '',
    difficulty: r.difficulty || '',
    health_note: r.healthNote || '',
    allergens: r.allergens || [],
    youtube_query: r.youtubeQuery || '',
    ingredients: Object.entries(selected).map(([name, grams]) => ({ name, grams })),
    method: method || '',
    temperature: lastAnalysisResult?.temp ?? null,
    duration: lastAnalysisResult?.time ?? null,
    nutrition_snapshot: lastAnalysisResult?.nutrition ?? null,
    flavor_snapshot: lastAnalysisResult?.flavor ?? null,
    health_snapshot: lastAnalysisResult?.warns ?? null,
    collection_id: null,
    notes: '',
    rating: null,
    tags: [],
    is_favorite: false,
    source: 'ai',
    source_url: null,
    created_at: now,
    updated_at: now,
  };

  const result = await dbQuery('saved_recipes', 'insert', { data: row });
  if (!result) {
    showToast(_t('레시피 저장에 실패했습니다.', 'Failed to save recipe.'));
    return null;
  }

  const saved = Array.isArray(result) ? result[0] : result;
  showToast(_t(`"${r.name}" 레시피가 저장되었습니다!`, `"${r.name_en || r.name}" saved to Recipe Box!`));
  document.dispatchEvent(new CustomEvent('recipe:saved', { detail: saved }));
  return saved;
}

// ── 2. Load Saved Recipes ───────────────────────────────────────────────────

async function loadSavedRecipes(collectionId) {
  if (!currentUser) return [];
  const params = {
    eq: { user_id: currentUser.id },
    order: { col: 'created_at', asc: false },
  };
  if (collectionId === '__favorites__') {
    params.eq.is_favorite = true;
  } else if (collectionId) {
    params.eq.collection_id = collectionId;
  }
  const data = await dbQuery('saved_recipes', 'select', params);
  _recipeBoxCache = data || [];
  return _recipeBoxCache;
}

// ── 3. Load Collections ─────────────────────────────────────────────────────

async function loadCollections() {
  if (!currentUser) return [];
  const data = await dbQuery('recipe_collections', 'select', {
    eq: { user_id: currentUser.id },
    order: { col: 'sort_order', asc: true },
  });
  _collectionsCache = data || [];
  return _collectionsCache;
}

// ── 4. Render Recipe Box ────────────────────────────────────────────────────

async function renderRecipeBox() {
  const container = document.getElementById('recipeBoxContent');
  if (!container) return;

  container.innerHTML = `<div style="text-align:center;padding:40px;color:#aaa;">${_t('불러오는 중...', 'Loading...')}</div>`;

  let dbRecipes = [], dbCollections = [];
  if (!isGuest && currentUser) {
    [dbRecipes, dbCollections] = await Promise.all([
      loadSavedRecipes(_recipeBoxCollection),
      loadCollections(),
    ]);
  }

  // Fallback to demo content when database is empty
  const showingDemo = dbRecipes.length === 0;
  const recipes = showingDemo ? _getDemoRecipes(_recipeBoxCollection) : dbRecipes;
  const collections = showingDemo && dbCollections.length === 0 ? _demoCollections : dbCollections;
  if (showingDemo) _recipeBoxCache = recipes;

  const limit = RECIPE_BOX_LIMITS[userPlan] || RECIPE_BOX_LIMITS.free;
  const atLimit = !showingDemo && limit !== Infinity && recipes.length >= limit;

  // Header
  let html = `
    <div class="rb-header">
      <div class="rb-title">${_t('레시피 박스', 'Recipe Box')} <span class="rb-count">${showingDemo ? _t('샘플', 'Sample') : recipes.length + (limit !== Infinity ? `/${limit}` : '')}</span></div>
      <div style="display:flex;gap:6px">
        <button class="rb-new-col-btn" onclick="typeof openUrlImport==='function'&&openUrlImport()">🔗 ${_t('URL 가져오기', 'Import URL')}</button>
        <button class="rb-new-col-btn" onclick="promptNewCollection()">+ ${_t('새 컬렉션', 'New Collection')}</button>
      </div>
    </div>`;

  // Demo banner
  if (showingDemo) {
    html += `
      <div style="background:linear-gradient(135deg,#ede9fe,#dbeafe);border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12px;color:#4338ca;display:flex;align-items:center;gap:8px;">
        <span style="font-size:16px;">🧪</span>
        <span>${_t('샘플 레시피를 둘러보세요! 분석 후 나만의 레시피를 저장해 보세요.', 'Explore sample recipes! Save your own recipes after running an analysis.')}</span>
      </div>`;
  }

  // Collection tabs
  html += `<div class="rb-tabs">`;
  html += _rbTab(null, `📋 ${_t('전체', 'All')}`);
  html += _rbTab('__favorites__', `⭐ ${_t('즐겨찾기', 'Favorites')}`);
  for (const c of collections) {
    html += _rbTab(c.id, `${c.emoji || '📁'} ${_t(c.name, c.name_en || c.name)}`);
  }
  html += `</div>`;

  // Pro upgrade banner
  if (atLimit && userPlan === 'free') {
    html += `
      <div class="rb-upgrade-banner">
        <span>🚀 ${_t('무료 플랜 한도에 도달했습니다.', 'You\'ve reached the free plan limit.')}</span>
        <button onclick="openUserMenu()">${_t('Pro 업그레이드', 'Upgrade to Pro')}</button>
      </div>`;
  }

  // Recipe cards grid
  if (recipes.length === 0) {
    html += `
      <div class="rb-empty">
        <div style="font-size:40px;margin-bottom:8px;">📭</div>
        <div>${_t('저장된 레시피가 없습니다.', 'No saved recipes yet.')}</div>
        <div style="font-size:12px;color:#aaa;margin-top:4px;">
          ${_t('분석 후 레시피를 저장해 보세요!', 'Save recipes after running an analysis!')}
        </div>
      </div>`;
  } else {
    html += `<div class="rb-grid">`;
    for (const recipe of recipes) {
      const cal = recipe.nutrition_snapshot?.calories ?? recipe.nutrition_snapshot?.kcal ?? '—';
      const isDemo = _isDemoRecipe(recipe.id);
      const imgHtml = recipe.image_url
        ? `<div class="rb-card-img" style="background-image:url('${recipe.image_url}')"></div>`
        : '';
      const ratingStars = recipe.rating ? '★'.repeat(recipe.rating) + '☆'.repeat(5 - recipe.rating) : '';
      html += `
        <div class="rb-card${isDemo ? ' rb-demo-card' : ''}" onclick="openRecipeDetail('${recipe.id}')">
          ${imgHtml}
          <div class="rb-card-top">
            <div class="rb-card-name">${_t(recipe.name, recipe.name_en || recipe.name)}</div>
            <button class="rb-fav-btn ${recipe.is_favorite ? 'active' : ''}"
                    onclick="event.stopPropagation();${isDemo ? '' : `toggleFavorite('${recipe.id}')`}"
                    title="${_t('즐겨찾기', 'Favorite')}">
              ${recipe.is_favorite ? '★' : '☆'}
            </button>
          </div>
          ${ratingStars ? `<div class="rb-card-rating">${ratingStars}</div>` : ''}
          <div class="rb-card-meta">
            <span class="rb-card-cuisine">${recipe.cuisine || ''}</span>
            <span class="rb-card-cal">${cal !== '—' ? cal + ' kcal' : ''}</span>
          </div>
          ${recipe.tags?.length ? `<div class="rb-card-tags">${recipe.tags.slice(0, 3).map(t => `<span class="rb-card-tag">#${t}</span>`).join('')}</div>` : ''}
          ${isDemo ? '' : `<button class="rb-del-btn" onclick="event.stopPropagation();deleteRecipe('${recipe.id}')" title="${_t('삭제', 'Delete')}">🗑</button>`}
        </div>`;
    }
    html += `</div>`;
  }

  container.innerHTML = html;
}

function _rbTab(id, label) {
  const active = (_recipeBoxCollection === id) ? 'active' : '';
  const safeId = id === null ? 'null' : `'${id}'`;
  return `<button class="rb-tab ${active}" onclick="selectRecipeBoxTab(${safeId})">${label}</button>`;
}

async function selectRecipeBoxTab(collectionId) {
  _recipeBoxCollection = collectionId;
  await renderRecipeBox();
}

// ── 5. Create Collection ────────────────────────────────────────────────────

async function createCollection(name, emoji) {
  if (!currentUser) return null;
  const now = new Date().toISOString();
  const row = {
    user_id: currentUser.id,
    name,
    name_en: name,
    description: '',
    emoji: emoji || '📁',
    color: null,
    is_default: false,
    sort_order: _collectionsCache.length,
    created_at: now,
    updated_at: now,
  };
  const result = await dbQuery('recipe_collections', 'insert', { data: row });
  if (!result) {
    showToast(_t('컬렉션 생성에 실패했습니다.', 'Failed to create collection.'));
    return null;
  }
  showToast(_t(`"${name}" 컬렉션이 생성되었습니다!`, `"${name}" collection created!`));
  await renderRecipeBox();
  return Array.isArray(result) ? result[0] : result;
}

function promptNewCollection() {
  const name = prompt(_t('컬렉션 이름을 입력하세요:', 'Enter collection name:'));
  if (!name || !name.trim()) return;
  const emoji = prompt(_t('이모지를 선택하세요 (선택):', 'Choose an emoji (optional):')) || '📁';
  createCollection(name.trim(), emoji.trim());
}

// ── 6. Delete Recipe ────────────────────────────────────────────────────────

async function deleteRecipe(id) {
  if (typeof confirmAction === 'function') {
    confirmAction(_t('이 레시피를 삭제하시겠습니까?', 'Delete this recipe?'), async () => {
      const result = await dbQuery('saved_recipes', 'delete', { eq: { id, user_id: currentUser.id } });
      if (result === null) {
        showToast(_t('삭제에 실패했습니다.', 'Failed to delete.'));
        return;
      }
      showToast(_t('레시피가 삭제되었습니다.', 'Recipe deleted.'));
      _closeDetailModal();
      await renderRecipeBox();
    });
  } else {
    const yes = confirm(_t('이 레시피를 삭제하시겠습니까?', 'Delete this recipe?'));
    if (!yes) return;
    const result = await dbQuery('saved_recipes', 'delete', { eq: { id, user_id: currentUser.id } });
    if (result === null) {
      showToast(_t('삭제에 실패했습니다.', 'Failed to delete.'));
      return;
    }
    showToast(_t('레시피가 삭제되었습니다.', 'Recipe deleted.'));
    _closeDetailModal();
    await renderRecipeBox();
  }
}

// ── 7. Toggle Favorite ──────────────────────────────────────────────────────

async function toggleFavorite(id) {
  const recipe = _recipeBoxCache.find(r => r.id === id);
  if (!recipe) return;
  const newVal = !recipe.is_favorite;
  await dbQuery('saved_recipes', 'update', {
    data: { is_favorite: newVal, updated_at: new Date().toISOString() },
    eq: { id, user_id: currentUser.id },
  });
  recipe.is_favorite = newVal;
  showToast(newVal
    ? _t('즐겨찾기에 추가되었습니다.', 'Added to favorites.')
    : _t('즐겨찾기에서 제거되었습니다.', 'Removed from favorites.')
  );
  await renderRecipeBox();
}

// ── 8. Recipe Detail Modal ──────────────────────────────────────────────────

async function openRecipeDetail(id) {
  const isDemo = _isDemoRecipe(id);
  let recipe = _recipeBoxCache.find(r => r.id === id);
  if (!recipe && isDemo) recipe = _demoRecipes.find(r => r.id === id);
  if (!recipe && !isDemo) {
    const data = await dbQuery('saved_recipes', 'select', { eq: { id, user_id: currentUser.id } });
    recipe = data?.[0];
  }
  if (!recipe) {
    showToast(_t('레시피를 찾을 수 없습니다.', 'Recipe not found.'));
    return;
  }

  let overlay = document.getElementById('rbDetailOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'rbDetailOverlay';
    overlay.className = 'rb-overlay';
    document.body.appendChild(overlay);
  }

  const ings = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map(i => `<span class="rb-det-ing">${i.name} ${i.grams}g</span>`).join('')
    : '';

  const nutr = recipe.nutrition_snapshot;
  let nutrHtml = '';
  if (nutr) {
    const items = [
      { k: 'calories', l: 'kcal' }, { k: 'kcal', l: 'kcal' },
      { k: 'protein', l: 'g protein' }, { k: 'fat', l: 'g fat' },
      { k: 'carbs', l: 'g carbs' }, { k: 'fiber', l: 'g fiber' },
    ];
    const parts = items.filter(i => nutr[i.k] != null).map(i => `${nutr[i.k]} ${i.l}`);
    if (parts.length) nutrHtml = `<div class="rb-det-nutr">${parts.join(' · ')}</div>`;
  }

  const stars = [1,2,3,4,5].map(s =>
    `<span class="rb-star ${(recipe.rating || 0) >= s ? 'active' : ''}" onclick="updateRecipeRating('${recipe.id}',${s})">★</span>`
  ).join('');

  overlay.innerHTML = `
    <div class="rb-detail-modal">
      <button class="rb-modal-close" onclick="_closeDetailModal()">✕</button>
      ${recipe.image_url ? `<div style="width:100%;height:160px;border-radius:12px;margin-bottom:14px;background:url('${recipe.image_url}') center/cover no-repeat #f0f0f0;"></div>` : ''}
      <div class="rb-det-header">
        <h2 class="rb-det-name">${recipe.name}</h2>
        <div class="rb-det-name-en">${recipe.name_en || ''}</div>
        <div class="rb-det-tags">
          ${recipe.cuisine ? `<span class="recipe-tag cuisine">${recipe.cuisine}</span>` : ''}
          ${recipe.difficulty ? `<span class="recipe-tag diff-${recipe.difficulty}">${recipe.difficulty}</span>` : ''}
          ${recipe.is_favorite ? `<span class="recipe-tag" style="background:#fef3c7;color:#92400e;">⭐ ${_t('즐겨찾기', 'Favorite')}</span>` : ''}
        </div>
      </div>

      ${recipe.description ? `<div class="rb-det-desc">${recipe.description}</div>` : ''}
      ${recipe.health_note ? `<div class="rb-det-health">💚 ${recipe.health_note}</div>` : ''}

      ${ings ? `<div class="rb-det-section"><strong>${_t('재료', 'Ingredients')}</strong><div class="rb-det-ings">${ings}</div></div>` : ''}

      <div class="rb-det-section">
        <strong>${_t('조리 정보', 'Cooking Info')}</strong>
        <div class="rb-det-cook">
          ${recipe.method ? `<span>🍳 ${recipe.method}</span>` : ''}
          ${recipe.temperature ? `<span>🌡 ${recipe.temperature}°C</span>` : ''}
          ${recipe.duration ? `<span>⏱ ${recipe.duration}${_t('분', 'min')}</span>` : ''}
        </div>
      </div>

      ${nutrHtml ? `<div class="rb-det-section"><strong>${_t('영양 스냅샷', 'Nutrition Snapshot')}</strong>${nutrHtml}</div>` : ''}

      <div class="rb-det-section">
        <strong>${_t('평점', 'Rating')}</strong>
        <div class="rb-rating">${stars}</div>
      </div>

      <div class="rb-det-section">
        <strong>${_t('메모', 'Notes')}</strong>
        <textarea class="rb-notes-input" id="rbNotesInput"
                  placeholder="${_t('메모를 입력하세요...', 'Add notes...')}"
                  ${isDemo ? 'readonly' : `oninput="_debounceSaveNotes('${recipe.id}')"`}>${recipe.notes || ''}</textarea>
      </div>

      ${recipe.allergens?.length ? `
        <div class="rb-det-section">
          <strong>⚠ ${_t('알레르기', 'Allergens')}</strong>
          <div>${recipe.allergens.join(', ')}</div>
        </div>` : ''}

      <div class="rb-det-actions">
        ${isDemo ? `
        <div style="width:100%;text-align:center;font-size:12px;color:#7c3aed;background:#f5f3ff;padding:10px;border-radius:8px;">
          🧪 ${_t('이것은 샘플 레시피입니다. 분석 후 나만의 레시피를 저장해 보세요!', 'This is a sample recipe. Save your own recipes after running an analysis!')}
        </div>
        ` : `
        <button class="rb-action-btn fav" onclick="toggleFavorite('${recipe.id}')">
          ${recipe.is_favorite ? '★' : '☆'} ${_t('즐겨찾기', 'Favorite')}
        </button>
        <button class="rb-action-btn" onclick="typeof shareMyRecipe==='function'?shareMyRecipe('${recipe.id}'):showToast('Community not loaded')" style="color:#7c3aed">
          🌐 ${_t('공유', 'Share')}
        </button>
        <button class="rb-action-btn del" onclick="deleteRecipe('${recipe.id}')">
          🗑 ${_t('삭제', 'Delete')}
        </button>
        `}
      </div>

      <div class="rb-det-footer">
        ${isDemo ? _t('샘플 레시피', 'Sample Recipe') : _t('저장일', 'Saved') + ': ' + new Date(recipe.created_at).toLocaleDateString()}
      </div>
    </div>`;

  overlay.style.display = 'flex';
  overlay.onclick = (e) => { if (e.target === overlay) _closeDetailModal(); };
}

function _closeDetailModal() {
  const overlay = document.getElementById('rbDetailOverlay');
  if (overlay) overlay.style.display = 'none';
}

// ── 9. Update Notes ─────────────────────────────────────────────────────────

let _notesSaveTimer = null;
function _debounceSaveNotes(id) {
  clearTimeout(_notesSaveTimer);
  _notesSaveTimer = setTimeout(() => {
    const el = document.getElementById('rbNotesInput');
    if (el) updateRecipeNotes(id, el.value);
  }, 800);
}

async function updateRecipeNotes(id, notes) {
  await dbQuery('saved_recipes', 'update', {
    data: { notes, updated_at: new Date().toISOString() },
    eq: { id, user_id: currentUser.id },
  });
  const recipe = _recipeBoxCache.find(r => r.id === id);
  if (recipe) recipe.notes = notes;
}

// ── 10. Update Rating ───────────────────────────────────────────────────────

async function updateRecipeRating(id, rating) {
  if (rating < 1 || rating > 5) return;
  await dbQuery('saved_recipes', 'update', {
    data: { rating, updated_at: new Date().toISOString() },
    eq: { id, user_id: currentUser.id },
  });
  const recipe = _recipeBoxCache.find(r => r.id === id);
  if (recipe) recipe.rating = rating;
  // Re-render the stars in the open modal
  const modal = document.querySelector('.rb-detail-modal');
  if (modal) {
    const ratingDiv = modal.querySelector('.rb-rating');
    if (ratingDiv) {
      ratingDiv.innerHTML = [1,2,3,4,5].map(s =>
        `<span class="rb-star ${rating >= s ? 'active' : ''}" onclick="updateRecipeRating('${id}',${s})">★</span>`
      ).join('');
    }
  }
}

// ── 13. Toggle Recipe Box Panel ─────────────────────────────────────────────

function toggleRecipeBox() {
  _recipeBoxOpen = !_recipeBoxOpen;
  let panel = document.getElementById('recipeBoxPanel');

  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'recipeBoxPanel';
    panel.className = 'rb-panel';
    panel.innerHTML = `
      <div class="rb-panel-header">
        <span>📦 ${_t('레시피 박스', 'Recipe Box')}</span>
        <button class="rb-panel-close" onclick="toggleRecipeBox()">✕</button>
      </div>
      <div id="recipeBoxContent" class="rb-panel-body"></div>`;
    document.body.appendChild(panel);
  }

  if (_recipeBoxOpen) {
    panel.classList.add('open');
    renderRecipeBox();
  } else {
    panel.classList.remove('open');
  }
}

// ── 14. Init ────────────────────────────────────────────────────────────────

function initRecipeBox() {
  // Listen for auth changes to refresh box if open
  document.addEventListener('auth:changed', () => {
    if (_recipeBoxOpen) renderRecipeBox();
  });

  // Listen for recipe saved to refresh the box
  document.addEventListener('recipe:saved', () => {
    if (_recipeBoxOpen) renderRecipeBox();
  });

  // Inject styles
  _injectRecipeBoxStyles();
}

// ── Styles ──────────────────────────────────────────────────────────────────

function _injectRecipeBoxStyles() {
  if (document.getElementById('rbStyles')) return;
  const style = document.createElement('style');
  style.id = 'rbStyles';
  style.textContent = `
    /* Panel */
    .rb-panel {
      position:fixed; top:0; right:-420px; width:400px; max-width:95vw;
      height:100vh; background:#fff; box-shadow:-4px 0 24px rgba(0,0,0,.12);
      z-index:8000; transition:right .3s ease; display:flex; flex-direction:column;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    }
    .rb-panel.open { right:0; }
    .rb-panel-header {
      display:flex; justify-content:space-between; align-items:center;
      padding:16px 20px; font-size:16px; font-weight:700;
      border-bottom:1px solid #eee; flex-shrink:0;
    }
    .rb-panel-close {
      background:none; border:none; font-size:20px; cursor:pointer;
      color:#888; padding:4px 8px; border-radius:6px;
    }
    .rb-panel-close:hover { background:#f3f3f3; }
    .rb-panel-body { flex:1; overflow-y:auto; padding:16px; }

    /* Header */
    .rb-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .rb-title { font-size:15px; font-weight:700; }
    .rb-count { font-size:12px; color:#888; font-weight:400; margin-left:4px; }
    .rb-new-col-btn {
      font-size:12px; padding:5px 10px; border-radius:8px; border:1px solid #e0e0e0;
      background:#fafafa; cursor:pointer; color:#555; font-weight:500;
    }
    .rb-new-col-btn:hover { background:#f0f0f0; }

    /* Tabs */
    .rb-tabs { display:flex; gap:6px; overflow-x:auto; padding-bottom:10px; margin-bottom:12px; border-bottom:1px solid #f0f0f0; }
    .rb-tab {
      white-space:nowrap; padding:5px 12px; border-radius:16px; font-size:12px;
      border:1px solid #e5e5e5; background:#fafafa; cursor:pointer; color:#555;
    }
    .rb-tab.active { background:#111; color:#fff; border-color:#111; }
    .rb-tab:hover:not(.active) { background:#f0f0f0; }

    /* Grid */
    .rb-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .rb-card {
      position:relative; background:#fafafa; border:1px solid #eee; border-radius:12px;
      padding:12px; cursor:pointer; transition:box-shadow .15s;
    }
    .rb-card:hover { box-shadow:0 2px 12px rgba(0,0,0,.08); }
    .rb-card-top { display:flex; justify-content:space-between; align-items:flex-start; gap:4px; }
    .rb-card-name { font-size:13px; font-weight:600; line-height:1.3; flex:1; }
    .rb-fav-btn {
      background:none; border:none; font-size:16px; cursor:pointer;
      color:#ccc; padding:0; line-height:1;
    }
    .rb-fav-btn.active { color:#f59e0b; }
    .rb-card-meta { display:flex; gap:6px; margin-top:6px; font-size:11px; color:#888; }
    .rb-card-cuisine { background:#f0fdf4; color:#15803d; padding:1px 6px; border-radius:8px; }
    .rb-card-cal { color:#aaa; }
    .rb-del-btn {
      position:absolute; bottom:8px; right:8px; background:none; border:none;
      font-size:13px; cursor:pointer; opacity:0; transition:opacity .15s;
    }
    .rb-card:hover .rb-del-btn { opacity:0.6; }
    .rb-del-btn:hover { opacity:1 !important; }

    /* Card image */
    .rb-card-img {
      width:100%; height:80px; border-radius:8px; margin-bottom:8px;
      background-size:cover; background-position:center; background-color:#f0f0f0;
    }
    .rb-card-rating { font-size:10px; color:#f59e0b; letter-spacing:1px; margin-top:2px; }
    .rb-card-tags { display:flex; gap:3px; flex-wrap:wrap; margin-top:4px; }
    .rb-card-tag { font-size:10px; color:#7c3aed; background:#f5f3ff; padding:1px 5px; border-radius:4px; }
    .rb-demo-card { border:1px dashed #c4b5fd; background:#faf5ff; }

    /* Empty state */
    .rb-empty { text-align:center; padding:32px 12px; color:#999; font-size:13px; }

    /* Upgrade banner */
    .rb-upgrade-banner {
      display:flex; align-items:center; justify-content:space-between; gap:8px;
      background:linear-gradient(135deg,#fef3c7,#fde68a); border-radius:10px;
      padding:10px 14px; margin-bottom:14px; font-size:12px; color:#92400e;
    }
    .rb-upgrade-banner button {
      background:#111; color:#fff; border:none; padding:5px 12px; border-radius:8px;
      font-size:11px; cursor:pointer; font-weight:600; white-space:nowrap;
    }

    /* Overlay & Detail Modal */
    .rb-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:9000;
      display:none; align-items:center; justify-content:center;
    }
    .rb-detail-modal {
      position:relative; background:#fff; border-radius:16px; width:90vw; max-width:480px;
      max-height:85vh; overflow-y:auto; padding:24px; box-shadow:0 12px 40px rgba(0,0,0,.2);
    }
    .rb-modal-close {
      position:absolute; top:12px; right:14px; background:none; border:none;
      font-size:18px; cursor:pointer; color:#888; z-index:1;
    }
    .rb-det-header { margin-bottom:14px; }
    .rb-det-name { font-size:18px; font-weight:700; margin:0; }
    .rb-det-name-en { font-size:13px; color:#888; margin-top:2px; }
    .rb-det-tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
    .rb-det-desc { font-size:13px; color:#555; line-height:1.5; margin-bottom:14px; }
    .rb-det-health { font-size:12px; color:#15803d; background:#f0fdf4; padding:8px 12px; border-radius:8px; margin-bottom:14px; }
    .rb-det-section { margin-bottom:14px; }
    .rb-det-section strong { display:block; font-size:12px; color:#555; margin-bottom:6px; }
    .rb-det-ings { display:flex; flex-wrap:wrap; gap:4px; }
    .rb-det-ing { font-size:11px; background:#f5f5f5; padding:3px 8px; border-radius:6px; }
    .rb-det-cook { display:flex; gap:10px; font-size:12px; color:#666; flex-wrap:wrap; }
    .rb-det-nutr { font-size:12px; color:#666; }
    .rb-rating { display:flex; gap:2px; }
    .rb-star { font-size:22px; cursor:pointer; color:#ddd; transition:color .1s; }
    .rb-star.active { color:#f59e0b; }
    .rb-star:hover { color:#fbbf24; }
    .rb-notes-input {
      width:100%; min-height:60px; border:1px solid #e5e5e5; border-radius:8px;
      padding:8px 10px; font-size:13px; resize:vertical; font-family:inherit;
      outline:none; box-sizing:border-box;
    }
    .rb-notes-input:focus { border-color:#aaa; }
    .rb-det-actions { display:flex; gap:8px; margin-top:16px; }
    .rb-action-btn {
      flex:1; padding:8px; border-radius:8px; border:1px solid #e5e5e5;
      background:#fafafa; font-size:13px; cursor:pointer; text-align:center;
    }
    .rb-action-btn.fav:hover { background:#fef3c7; }
    .rb-action-btn.del { color:#dc2626; }
    .rb-action-btn.del:hover { background:#fef2f2; }
    .rb-det-footer { text-align:center; font-size:11px; color:#bbb; margin-top:14px; }

    @media (max-width:500px) {
      .rb-panel { width:100vw; right:-100vw; }
      .rb-grid { grid-template-columns:1fr; }
      .rb-detail-modal { width:95vw; padding:18px; }
    }
  `;
  document.head.appendChild(style);
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRecipeBox);
} else {
  initRecipeBox();
}
