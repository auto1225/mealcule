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

  if (isGuest || !currentUser) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:#888;">
        <div style="font-size:48px;margin-bottom:12px;">📦</div>
        <div style="font-size:15px;font-weight:600;margin-bottom:6px;">
          ${_t('레시피 박스', 'Recipe Box')}
        </div>
        <div style="font-size:13px;margin-bottom:16px;">
          ${_t('로그인하면 레시피를 저장하고 관리할 수 있습니다.', 'Log in to save and organize your recipes.')}
        </div>
      </div>`;
    return;
  }

  container.innerHTML = `<div style="text-align:center;padding:40px;color:#aaa;">${_t('불러오는 중...', 'Loading...')}</div>`;

  const [recipes, collections] = await Promise.all([
    loadSavedRecipes(_recipeBoxCollection),
    loadCollections(),
  ]);

  const limit = RECIPE_BOX_LIMITS[userPlan] || RECIPE_BOX_LIMITS.free;
  const atLimit = limit !== Infinity && recipes.length >= limit;

  // Header
  let html = `
    <div class="rb-header">
      <div class="rb-title">${_t('레시피 박스', 'Recipe Box')} <span class="rb-count">${recipes.length}${limit !== Infinity ? `/${limit}` : ''}</span></div>
      <div style="display:flex;gap:6px">
        <button class="rb-new-col-btn" onclick="typeof openUrlImport==='function'&&openUrlImport()">🔗 ${_t('URL 가져오기', 'Import URL')}</button>
        <button class="rb-new-col-btn" onclick="promptNewCollection()">+ ${_t('새 컬렉션', 'New Collection')}</button>
      </div>
    </div>`;

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
      html += `
        <div class="rb-card" onclick="openRecipeDetail('${recipe.id}')">
          <div class="rb-card-top">
            <div class="rb-card-name">${recipe.name}</div>
            <button class="rb-fav-btn ${recipe.is_favorite ? 'active' : ''}"
                    onclick="event.stopPropagation();toggleFavorite('${recipe.id}')"
                    title="${_t('즐겨찾기', 'Favorite')}">
              ${recipe.is_favorite ? '★' : '☆'}
            </button>
          </div>
          <div class="rb-card-meta">
            <span class="rb-card-cuisine">${recipe.cuisine || ''}</span>
            <span class="rb-card-cal">${cal !== '—' ? cal + ' kcal' : ''}</span>
          </div>
          <button class="rb-del-btn"
                  onclick="event.stopPropagation();deleteRecipe('${recipe.id}')"
                  title="${_t('삭제', 'Delete')}">🗑</button>
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
  let recipe = _recipeBoxCache.find(r => r.id === id);
  if (!recipe) {
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
                  oninput="_debounceSaveNotes('${recipe.id}')">${recipe.notes || ''}</textarea>
      </div>

      ${recipe.allergens?.length ? `
        <div class="rb-det-section">
          <strong>⚠ ${_t('알레르기', 'Allergens')}</strong>
          <div>${recipe.allergens.join(', ')}</div>
        </div>` : ''}

      <div class="rb-det-actions">
        <button class="rb-action-btn fav" onclick="toggleFavorite('${recipe.id}')">
          ${recipe.is_favorite ? '★' : '☆'} ${_t('즐겨찾기', 'Favorite')}
        </button>
        <button class="rb-action-btn" onclick="typeof shareMyRecipe==='function'?shareMyRecipe('${recipe.id}'):showToast('Community not loaded')" style="color:#7c3aed">
          🌐 ${_t('공유', 'Share')}
        </button>
        <button class="rb-action-btn del" onclick="deleteRecipe('${recipe.id}')">
          🗑 ${_t('삭제', 'Delete')}
        </button>
      </div>

      <div class="rb-det-footer">
        ${_t('저장일', 'Saved')}: ${new Date(recipe.created_at).toLocaleDateString()}
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
