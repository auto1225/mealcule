// ── Grocery List Module ──
// Depends on globals from app.js: sbClient, dbQuery, dbRPC, currentUser, userPlan, showToast, CATEGORIES, DB, I18n

// _t defined in recipe-box.js; fallback if loaded standalone
if (typeof _t === 'undefined') var _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;

// ── State ──
let _groceryItems = [];
let _activeListId = null;
let _outdatedBanner = false;

// ── Open / Close ──
function openGroceryList(listId) {
  _activeListId = listId;
  const overlay = document.getElementById('groceryListOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  loadGroceryList(listId).then(items => {
    _groceryItems = items;
    renderGroceryList(items);
  });
}

function closeGroceryList() {
  _activeListId = null;
  _groceryItems = [];
  const overlay = document.getElementById('groceryListOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

// ── Generate from Meal Plan ──
async function generateGroceryList(mealPlanId) {
  // [TEST MODE] login gate disabled
  // if (!currentUser) { showToast(_t('로그인이 필요합니다', 'Please sign in')); return null; }
  showToast(_t('장보기 목록 생성 중...', 'Generating grocery list...'));
  const listId = await dbRPC('generate_grocery_from_plan', {
    p_plan_id: mealPlanId,
    p_user_id: currentUser?.id || 'guest'
  });
  if (!listId) {
    showToast(_t('목록 생성에 실패했습니다', 'Failed to generate list'));
    return null;
  }
  openGroceryList(listId);
  showToast(_t('장보기 목록이 생성되었습니다!', 'Grocery list created!'));
  return listId;
}

// ── Load Items ──
async function loadGroceryList(listId) {
  const data = await dbQuery('grocery_items', 'select', {
    eq: { list_id: listId },
    order: { col: 'sort_order', asc: true }
  });
  if (!data) return [];
  // Sort by category order, then checked to bottom
  const catOrder = Object.keys(CATEGORIES).filter(k => k !== 'all');
  return data.sort((a, b) => {
    if (a.is_checked !== b.is_checked) return a.is_checked ? 1 : -1;
    const ai = catOrder.indexOf(a.category);
    const bi = catOrder.indexOf(b.category);
    if (ai !== bi) return ai - bi;
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
}

// ── Render ──
function renderGroceryList(items) {
  const overlay = document.getElementById('groceryListOverlay');
  if (!overlay) return;

  const total = items.length;
  const checked = items.filter(i => i.is_checked).length;
  const remaining = total - checked;

  // Group by category
  const groups = {};
  const unchecked = items.filter(i => !i.is_checked);
  const checkedItems = items.filter(i => i.is_checked);

  unchecked.forEach(item => {
    const cat = item.category || 'processed';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });

  let html = '';

  // Header
  html += `<div class="grocery-header">
    <button class="grocery-close-btn" onclick="closeGroceryList()">&times;</button>
    <h2>${_t('장보기 목록', 'Grocery List')}</h2>
    <div class="grocery-actions">
      <button onclick="typeof orderGroceryItems==='function'&&orderGroceryItems(_groceryItems.filter(i=>!i.is_checked))" title="${_t('온라인 주문', 'Order online')}">&#x1F6D2;</button>
      <button onclick="shareGroceryList('${_activeListId}')" title="${_t('공유', 'Share')}">&#x1F517;</button>
      <button onclick="copyGroceryAsText('${_activeListId}')" title="${_t('텍스트 복사', 'Copy as text')}">&#x1F4CB;</button>
    </div>
  </div>`;

  // Summary bar
  html += `<div class="grocery-summary">
    <span>${_t('전체', 'Total')}: <strong>${total}</strong></span>
    <span>${_t('완료', 'Done')}: <strong>${checked}</strong></span>
    <span>${_t('남음', 'Left')}: <strong>${remaining}</strong></span>
    <div class="grocery-progress">
      <div class="grocery-progress-bar" style="width:${total ? Math.round(checked / total * 100) : 0}%"></div>
    </div>
  </div>`;

  // Outdated banner
  if (_outdatedBanner) {
    html += `<div class="grocery-outdated-banner">
      &#x26A0;&#xFE0F; ${_t('식단이 변경되어 목록이 최신이 아닐 수 있습니다', 'Grocery list may be outdated')}
      <button onclick="_groceryDismissOutdated()">${_t('닫기', 'Dismiss')}</button>
    </div>`;
  }

  // Category groups (unchecked)
  const catOrder = Object.keys(CATEGORIES).filter(k => k !== 'all');
  catOrder.forEach(cat => {
    const group = groups[cat];
    if (!group || group.length === 0) return;
    const catInfo = CATEGORIES[cat] || { emoji: '', label: cat, label_en: cat };
    const catName = _t(catInfo.label, catInfo.label_en);
    const catIconHtml = catInfo.img
      ? `<img src="${catInfo.img}" alt="${catName}" style="width:20px;height:20px;border-radius:4px;object-fit:cover;vertical-align:middle" onerror="this.style.display='none';this.nextElementSibling.style.display=''">`
        + `<span style="display:none">${catInfo.emoji}</span>`
      : `<span>${catInfo.emoji}</span>`;
    html += `<div class="grocery-category">
      <div class="grocery-category-header">${catIconHtml} ${catName}</div>`;
    group.forEach(item => {
      html += _renderItem(item);
    });
    html += `</div>`;
  });

  // Checked items section
  if (checkedItems.length > 0) {
    html += `<div class="grocery-category grocery-checked-section">
      <div class="grocery-category-header">${_t('완료 항목', 'Completed')}</div>`;
    checkedItems.forEach(item => {
      html += _renderItem(item);
    });
    html += `</div>`;
  }

  // Manual add button
  html += `<div class="grocery-add-section">
    <div id="groceryManualInput" class="grocery-manual-input" style="display:none">
      <input type="text" id="groceryNewName" placeholder="${_t('재료명', 'Ingredient')}" />
      <input type="number" id="groceryNewQty" placeholder="${_t('수량', 'Qty')}" min="0" step="any" />
      <input type="text" id="groceryNewUnit" placeholder="${_t('단위', 'Unit')}" />
      <button onclick="_groceryConfirmAdd()">&#x2713;</button>
      <button onclick="_groceryCancelAdd()">&times;</button>
    </div>
    <button id="groceryAddBtn" class="grocery-add-btn" onclick="addManualItem('${_activeListId}')">
      + ${_t('항목 추가', 'Add item')}
    </button>
  </div>`;

  overlay.innerHTML = `<div class="grocery-panel">${html}</div>`;
}

function _renderItem(item) {
  const isEn = window.I18n && I18n.lang === 'en';
  const checkedClass = item.is_checked ? 'grocery-item-checked' : '';
  const checkedAttr = item.is_checked ? 'checked' : '';
  const nameDisplay = isEn && item.ingredient_name_en
    ? item.ingredient_name_en
    : item.ingredient_name + (item.ingredient_name_en ? ` (${item.ingredient_name_en})` : '');
  const qty = item.quantity ? `${item.quantity}${item.unit || ''}` : '';
  const emoji = item.emoji || '';
  const recipes = item.source_recipes;
  const tooltip = recipes ? `title="${_t('사용 레시피', 'Recipes')}: ${recipes}"` : '';

  return `<div class="grocery-item ${checkedClass}" data-id="${item.id}">
    <label class="grocery-check">
      <input type="checkbox" ${checkedAttr} onchange="toggleGroceryItem('${item.id}')" />
      <span class="grocery-checkmark"></span>
    </label>
    <span class="grocery-item-emoji">${emoji}</span>
    <span class="grocery-item-name" ${tooltip}>${nameDisplay}</span>
    <span class="grocery-item-qty">${qty}</span>
    <button class="grocery-item-remove" onclick="removeGroceryItem('${item.id}')">&times;</button>
  </div>`;
}

// ── Toggle Check ──
async function toggleGroceryItem(itemId) {
  const item = _groceryItems.find(i => i.id === itemId);
  if (!item) return;
  const newVal = !item.is_checked;
  item.is_checked = newVal;

  // Animate
  const el = document.querySelector(`.grocery-item[data-id="${itemId}"]`);
  if (el) {
    el.style.transition = 'opacity 0.25s, transform 0.25s';
    el.style.opacity = '0.4';
    el.style.transform = 'translateX(8px)';
  }

  await dbQuery('grocery_items', 'update', {
    data: { is_checked: newVal },
    eq: { id: itemId }
  });

  setTimeout(() => {
    _groceryItems = _sortItems(_groceryItems);
    renderGroceryList(_groceryItems);
  }, 250);
}

function _sortItems(items) {
  const catOrder = Object.keys(CATEGORIES).filter(k => k !== 'all');
  return items.sort((a, b) => {
    if (a.is_checked !== b.is_checked) return a.is_checked ? 1 : -1;
    const ai = catOrder.indexOf(a.category);
    const bi = catOrder.indexOf(b.category);
    if (ai !== bi) return ai - bi;
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
}

// ── Add Manual Item ──
function addManualItem(listId) {
  const input = document.getElementById('groceryManualInput');
  const btn = document.getElementById('groceryAddBtn');
  if (!input || !btn) return;
  input.style.display = 'flex';
  btn.style.display = 'none';
  const nameInput = document.getElementById('groceryNewName');
  if (nameInput) nameInput.focus();
}

function _groceryCancelAdd() {
  const input = document.getElementById('groceryManualInput');
  const btn = document.getElementById('groceryAddBtn');
  if (input) input.style.display = 'none';
  if (btn) btn.style.display = '';
  // Clear fields
  const n = document.getElementById('groceryNewName');
  const q = document.getElementById('groceryNewQty');
  const u = document.getElementById('groceryNewUnit');
  if (n) n.value = '';
  if (q) q.value = '';
  if (u) u.value = '';
}

async function _groceryConfirmAdd() {
  const name = (document.getElementById('groceryNewName')?.value || '').trim();
  const rawQty = parseFloat(document.getElementById('groceryNewQty')?.value);
  const qty = !isNaN(rawQty) ? rawQty : null;
  const unit = (document.getElementById('groceryNewUnit')?.value || '').trim() || null;
  if (!name) { showToast(_t('재료명을 입력하세요', 'Enter ingredient name')); return; }
  if (!_activeListId) return;

  // Try to match from DB for category/emoji/en name
  const dbEntry = DB[name];
  const cat = dbEntry ? dbEntry.cat : 'processed';
  const emoji = dbEntry ? dbEntry.emoji : '';
  const nameEn = dbEntry ? dbEntry.en : '';
  const maxOrder = _groceryItems.reduce((m, i) => Math.max(m, i.sort_order || 0), 0);

  const newItem = {
    list_id: _activeListId,
    ingredient_name: name,
    ingredient_name_en: nameEn,
    category: cat,
    emoji: emoji,
    quantity: qty,
    unit: unit,
    is_checked: false,
    is_manual: true,
    sort_order: maxOrder + 1
  };

  await dbQuery('grocery_items', 'insert', { data: newItem });

  // Reload and re-render
  _groceryItems = await loadGroceryList(_activeListId);
  renderGroceryList(_groceryItems);
  showToast(_t('항목이 추가되었습니다', 'Item added'));
}

// ── Remove Item ──
async function removeGroceryItem(itemId) {
  const el = document.querySelector(`.grocery-item[data-id="${itemId}"]`);
  if (el) {
    el.style.transition = 'opacity 0.2s, height 0.2s';
    el.style.opacity = '0';
    el.style.height = '0';
    el.style.overflow = 'hidden';
  }

  await dbQuery('grocery_items', 'delete', { eq: { id: itemId } });
  _groceryItems = _groceryItems.filter(i => i.id !== itemId);

  setTimeout(() => renderGroceryList(_groceryItems), 200);
  showToast(_t('항목이 삭제되었습니다', 'Item removed'));
}

// ── Share ──
async function shareGroceryList(listId) {
  const data = await dbQuery('grocery_lists', 'select', {
    select: 'share_token',
    eq: { id: listId }
  });
  if (!data || !data[0]) { showToast(_t('공유 링크 생성 실패', 'Failed to create share link')); return; }
  const token = data[0].share_token;
  const url = `${window.location.origin}/grocery?token=${token}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast(_t('링크가 복사되었습니다!', 'Link copied!'));
  } catch (e) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(_t('링크가 복사되었습니다!', 'Link copied!'));
  }
}

// ── Copy as Text ──
async function copyGroceryAsText(listId) {
  const items = _activeListId === listId && _groceryItems.length
    ? _groceryItems
    : await loadGroceryList(listId);

  const catOrder = Object.keys(CATEGORIES).filter(k => k !== 'all');
  const groups = {};
  items.forEach(item => {
    const cat = item.category || 'processed';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });

  let text = '';
  catOrder.forEach(cat => {
    const group = groups[cat];
    if (!group || group.length === 0) return;
    const catInfo = CATEGORIES[cat] || { emoji: '', label_en: cat };
    text += `${catInfo.emoji || ''} ${catInfo.label_en}\n`;
    group.forEach(item => {
      const check = item.is_checked ? '\u2611' : '\u2610';
      const name = item.ingredient_name_en || item.ingredient_name;
      const qty = item.quantity ? ` \u2014 ${item.quantity}${item.unit || ''}` : '';
      text += `${check} ${name}${qty}\n`;
    });
    text += '\n';
  });

  try {
    await navigator.clipboard.writeText(text.trim());
    showToast(_t('텍스트가 복사되었습니다!', 'Copied to clipboard!'));
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text.trim();
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(_t('텍스트가 복사되었습니다!', 'Copied to clipboard!'));
  }
}

// ── Outdated Banner ──
function _groceryDismissOutdated() {
  _outdatedBanner = false;
  if (_groceryItems.length) renderGroceryList(_groceryItems);
}

// ── Init ──
function initGroceryList() {
  // Create overlay if not present
  if (!document.getElementById('groceryListOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'groceryListOverlay';
    overlay.className = 'grocery-overlay';
    overlay.style.display = 'none';
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeGroceryList();
    });
    document.body.appendChild(overlay);
  }

  // Listen for meal plan updates
  window.addEventListener('mealplan:updated', () => {
    _outdatedBanner = true;
    if (_activeListId && _groceryItems.length) {
      renderGroceryList(_groceryItems);
    }
  });

  // Inject styles
  if (!document.getElementById('groceryListStyles')) {
    const style = document.createElement('style');
    style.id = 'groceryListStyles';
    style.textContent = `
      .grocery-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px}
      .grocery-panel{background:#161819;border-radius:16px;max-width:480px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.5);padding:20px}
      .grocery-header{display:flex;align-items:center;gap:10px;margin-bottom:12px}
      .grocery-header h2{flex:1;margin:0;font-size:18px}
      .grocery-close-btn{background:none;border:none;font-size:24px;cursor:pointer;padding:0 4px;color:rgba(255,255,255,0.4)}
      .grocery-actions button{background:none;border:none;font-size:18px;cursor:pointer;padding:4px}
      .grocery-summary{display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:12px;font-size:13px;color:rgba(255,255,255,0.6)}
      .grocery-summary strong{color:#F5F5F5}
      .grocery-progress{flex-basis:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden}
      .grocery-progress-bar{height:100%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:2px;transition:width 0.4s}
      .grocery-outdated-banner{background:rgba(245,158,11,0.15);color:#F59E0B;padding:8px 12px;border-radius:8px;margin-bottom:12px;font-size:12px;display:flex;align-items:center;gap:8px}
      .grocery-outdated-banner button{background:none;border:none;cursor:pointer;font-size:11px;text-decoration:underline;color:#F59E0B;padding:0}
      .grocery-category{margin-bottom:10px}
      .grocery-category-header{font-weight:600;font-size:14px;padding:6px 0;color:#F5F5F5;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:4px}
      .grocery-checked-section{opacity:0.55}
      .grocery-item{display:flex;align-items:center;gap:8px;padding:7px 4px;border-radius:8px;transition:background 0.15s}
      .grocery-item:hover{background:rgba(255,255,255,0.04)}
      .grocery-item-checked .grocery-item-name{text-decoration:line-through;color:rgba(255,255,255,0.35)}
      .grocery-check{display:flex;align-items:center;cursor:pointer}
      .grocery-check input{width:16px;height:16px;accent-color:#10B981;cursor:pointer}
      .grocery-item-emoji{font-size:16px;min-width:20px;text-align:center}
      .grocery-item-name{flex:1;font-size:13px;color:#F5F5F5}
      .grocery-item-qty{font-size:12px;color:rgba(255,255,255,0.4);white-space:nowrap}
      .grocery-item-remove{background:none;border:none;color:rgba(255,255,255,0.35);cursor:pointer;font-size:16px;padding:2px 4px;opacity:0;transition:opacity 0.15s}
      .grocery-item:hover .grocery-item-remove{opacity:1}
      .grocery-add-section{padding:12px 0;border-top:1px solid rgba(255,255,255,0.08);margin-top:8px}
      .grocery-add-btn{background:none;border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:8px 16px;width:100%;cursor:pointer;color:rgba(255,255,255,0.4);font-size:13px;transition:border-color 0.2s}
      .grocery-add-btn:hover{border-color:#10B981;color:#10B981}
      .grocery-manual-input{display:flex;gap:6px;align-items:center}
      .grocery-manual-input input{border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px 8px;font-size:13px;background:rgba(255,255,255,0.04);color:#F5F5F5}
      .grocery-manual-input input[type="text"]{flex:2}
      .grocery-manual-input input[type="number"]{flex:1;width:60px}
      .grocery-manual-input button{background:none;border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:16px;color:#F5F5F5}
    `;
    document.head.appendChild(style);
  }
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGroceryList);
} else {
  initGroceryList();
}
