// ── Community Feed: Social Recipe Sharing & Discovery ──
// Depends on globals from app.js: sbClient, dbQuery, dbRPC, currentUser,
// userPlan, isGuest, showToast, I18n

if (typeof _t === 'undefined') var _t = (ko, en) => (window.I18n && I18n.lang === 'en') ? en : ko;

// ── State ────────────────────────────────────────────────────────────────────

let _cfOpen = false;
let _cfTab = 'latest';
let _cfOffset = 0;
let _cfLoading = false;
let _cfHasMore = true;
let _cfFeedCache = [];
let _cfSearchQuery = '';
let _cfSearchDebounce = null;
const CF_PAGE_SIZE = 20;

// ── 1. Open Community Feed ──────────────────────────────────────────────────

function openCommunityFeed() {
  if (_cfOpen) return;
  _cfOpen = true;
  _cfTab = 'latest';
  _cfOffset = 0;
  _cfHasMore = true;
  _cfFeedCache = [];
  _cfSearchQuery = '';

  _injectCommunityFeedStyles();

  let overlay = document.getElementById('cf-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cf-overlay';
    overlay.className = 'cf-overlay';
    overlay.innerHTML = `
      <div class="cf-panel">
        <div class="cf-header">
          <span class="cf-header-title">🍽️ ${_t('커뮤니티 레시피', 'Community Recipes')}</span>
          <button class="cf-close-btn" onclick="closeCommunityFeed()" aria-label="Close">&times;</button>
        </div>
        <div class="cf-search-bar">
          <input type="text" class="cf-search-input" placeholder="${_t('레시피 검색...', 'Search recipes...')}" />
        </div>
        <div class="cf-tabs">
          <button class="cf-tab active" data-tab="latest">${_t('최신', 'Latest')}</button>
          <button class="cf-tab" data-tab="featured">${_t('추천', 'Featured')}</button>
          <button class="cf-tab" data-tab="following">${_t('팔로잉', 'Following')}</button>
        </div>
        <div class="cf-feed-container" id="cf-feed-container">
          <div class="cf-feed-list" id="cf-feed-list"></div>
          <div class="cf-load-more" id="cf-load-more" style="display:none;">
            <div class="cf-spinner"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Tab switching
    overlay.querySelectorAll('.cf-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        overlay.querySelectorAll('.cf-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        _cfTab = tab.dataset.tab;
        _cfOffset = 0;
        _cfHasMore = true;
        _cfFeedCache = [];
        document.getElementById('cf-feed-list').innerHTML = '';
        _loadAndRenderFeed();
      });
    });

    // Search input
    const searchInput = overlay.querySelector('.cf-search-input');
    searchInput.addEventListener('input', (e) => {
      clearTimeout(_cfSearchDebounce);
      _cfSearchDebounce = setTimeout(() => {
        _cfSearchQuery = e.target.value.trim();
        _cfOffset = 0;
        _cfHasMore = true;
        _cfFeedCache = [];
        document.getElementById('cf-feed-list').innerHTML = '';
        _loadAndRenderFeed();
      }, 350);
    });

    // Infinite scroll
    const container = document.getElementById('cf-feed-container');
    container.addEventListener('scroll', () => {
      if (_cfLoading || !_cfHasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        _loadAndRenderFeed();
      }
    });
  }

  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
  _loadAndRenderFeed();
}

// ── 2. Close Community Feed ─────────────────────────────────────────────────

function closeCommunityFeed() {
  const overlay = document.getElementById('cf-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => {
    overlay.style.display = 'none';
    _cfOpen = false;
  }, 300);
}

// ── 3. Load Feed Recipes ────────────────────────────────────────────────────

async function loadFeedRecipes(tab, offset) {
  try {
    if (tab === 'featured') {
      const result = await dbRPC('get_community_feed', {
        feed_type: 'featured',
        search_query: _cfSearchQuery || null,
        page_offset: offset,
        page_limit: CF_PAGE_SIZE,
      });
      return result || [];
    }

    if (tab === 'following') {
      if (isGuest || !currentUser) return [];
      const result = await dbRPC('get_community_feed', {
        feed_type: 'following',
        follower_id: currentUser.id,
        search_query: _cfSearchQuery || null,
        page_offset: offset,
        page_limit: CF_PAGE_SIZE,
      });
      return result || [];
    }

    // Default: latest
    let query = {
      select: '*, author:profiles(id, display_name, avatar_url)',
      order: { column: 'created_at', ascending: false },
      range: [offset, offset + CF_PAGE_SIZE - 1],
    };
    if (_cfSearchQuery) {
      query.ilike = { title: `%${_cfSearchQuery}%` };
    }
    const result = await dbQuery('shared_recipes', 'select', query);
    return result || [];
  } catch (err) {
    console.error('loadFeedRecipes error:', err);
    return [];
  }
}

async function _loadAndRenderFeed() {
  if (_cfLoading || !_cfHasMore) return;
  _cfLoading = true;

  const loader = document.getElementById('cf-load-more');
  if (loader) loader.style.display = 'flex';

  const recipes = await loadFeedRecipes(_cfTab, _cfOffset);

  if (recipes.length < CF_PAGE_SIZE) _cfHasMore = false;
  _cfOffset += recipes.length;
  _cfFeedCache.push(...recipes);

  const list = document.getElementById('cf-feed-list');
  if (_cfOffset === recipes.length && recipes.length === 0) {
    list.innerHTML = `
      <div class="cf-empty">
        <div style="font-size:48px;margin-bottom:12px;">🌱</div>
        <div style="font-weight:600;margin-bottom:4px;">
          ${_t('아직 공유된 레시피가 없습니다', 'No shared recipes yet')}
        </div>
        <div style="font-size:12px;color:#aaa;">
          ${_t('첫 번째로 레시피를 공유해보세요!', 'Be the first to share a recipe!')}
        </div>
      </div>
    `;
  } else {
    recipes.forEach(r => {
      list.insertAdjacentHTML('beforeend', renderFeedCard(r));
    });
  }

  if (loader) loader.style.display = 'none';
  _cfLoading = false;
}

// ── 4. Render Feed Card ─────────────────────────────────────────────────────

function renderFeedCard(recipe) {
  const authorName = recipe.author?.display_name || _t('익명', 'Anonymous');
  const avatarUrl = recipe.author?.avatar_url;
  const avatarHtml = avatarUrl
    ? `<img src="${avatarUrl}" class="cf-avatar" alt="" />`
    : `<div class="cf-avatar cf-avatar-placeholder">${authorName.charAt(0).toUpperCase()}</div>`;

  const tags = (recipe.tags || []).slice(0, 3).map(t =>
    `<span class="cf-tag">${t}</span>`
  ).join('');

  const emoji = _getRecipeEmoji(recipe.cuisine || recipe.title || '');
  const likeCount = recipe.like_count || 0;
  const commentCount = recipe.comment_count || 0;
  const liked = recipe.user_liked ? 'liked' : '';
  const desc = recipe.description
    ? (recipe.description.length > 100 ? recipe.description.slice(0, 100) + '...' : recipe.description)
    : '';

  return `
    <div class="cf-card" data-id="${recipe.id}" onclick="openSharedRecipeDetail('${recipe.id}')">
      <div class="cf-card-header">
        <div class="cf-card-author">
          ${avatarHtml}
          <span class="cf-author-name">${_escCf(authorName)}</span>
        </div>
        <span class="cf-card-time">${_timeAgoCf(recipe.created_at)}</span>
      </div>
      <div class="cf-card-image">
        <span class="cf-card-emoji">${emoji}</span>
      </div>
      <div class="cf-card-body">
        <div class="cf-card-title">${_escCf(recipe.title || recipe.name || '')}</div>
        ${desc ? `<div class="cf-card-desc">${_escCf(desc)}</div>` : ''}
        ${tags ? `<div class="cf-card-tags">${tags}</div>` : ''}
      </div>
      <div class="cf-card-actions">
        <button class="cf-like-btn ${liked}" data-id="${recipe.id}" onclick="event.stopPropagation();toggleLike('${recipe.id}',this)">
          <span class="cf-heart">${liked ? '❤️' : '🤍'}</span>
          <span class="cf-like-count">${likeCount}</span>
        </button>
        <button class="cf-comment-btn" onclick="event.stopPropagation();openSharedRecipeDetail('${recipe.id}','comments')">
          💬 <span>${commentCount}</span>
        </button>
        <button class="cf-share-btn" onclick="event.stopPropagation();_copyShareLink('${recipe.id}')">
          🔗 ${_t('공유', 'Share')}
        </button>
      </div>
    </div>
  `;
}

function _getRecipeEmoji(hint) {
  const h = hint.toLowerCase();
  if (/chicken|닭/.test(h)) return '🍗';
  if (/beef|소고기|steak/.test(h)) return '🥩';
  if (/fish|생선|salmon|연어/.test(h)) return '🐟';
  if (/salad|샐러드/.test(h)) return '🥗';
  if (/pasta|파스타|noodle|면/.test(h)) return '🍝';
  if (/soup|수프|찌개|탕/.test(h)) return '🍲';
  if (/rice|밥|볶음밥/.test(h)) return '🍚';
  if (/bread|빵|bake/.test(h)) return '🍞';
  if (/cake|케이크|dessert|디저트/.test(h)) return '🍰';
  if (/korean|한식/.test(h)) return '🇰🇷';
  if (/japanese|일식/.test(h)) return '🇯🇵';
  if (/chinese|중식/.test(h)) return '🇨🇳';
  if (/indian|인도/.test(h)) return '🇮🇳';
  if (/mexican|멕시코/.test(h)) return '🇲🇽';
  return '🍽️';
}

function _escCf(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function _timeAgoCf(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return _t('방금', 'just now');
  if (mins < 60) return `${mins}${_t('분 전', 'm ago')}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}${_t('시간 전', 'h ago')}`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}${_t('일 전', 'd ago')}`;
  return new Date(dateStr).toLocaleDateString();
}

function _copyShareLink(id) {
  const url = `${location.origin}?shared=${id}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(_t('링크가 복사되었습니다!', 'Link copied!'));
  }).catch(() => {
    showToast(_t('링크 복사에 실패했습니다.', 'Failed to copy link.'));
  });
}

// ── 5. Shared Recipe Detail ─────────────────────────────────────────────────

async function openSharedRecipeDetail(id, scrollTo) {
  _injectCommunityFeedStyles();

  let modal = document.getElementById('cf-detail-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cf-detail-overlay';
    modal.className = 'cf-detail-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="cf-detail-modal">
      <button class="cf-modal-close" onclick="_closeCfDetail()">&times;</button>
      <div class="cf-detail-loading">
        <div class="cf-spinner"></div>
        <div style="margin-top:8px;font-size:13px;color:#888;">${_t('불러오는 중...', 'Loading...')}</div>
      </div>
    </div>
  `;
  modal.style.display = 'flex';

  try {
    const recipes = await dbQuery('shared_recipes', 'select', {
      select: '*, author:profiles(id, display_name, avatar_url, bio)',
      eq: { id },
    });
    const recipe = recipes?.[0];
    if (!recipe) {
      modal.querySelector('.cf-detail-loading').innerHTML = `<div style="color:#888;padding:40px;">${_t('레시피를 찾을 수 없습니다.', 'Recipe not found.')}</div>`;
      return;
    }

    const comments = await loadComments(id);
    const authorName = recipe.author?.display_name || _t('익명', 'Anonymous');
    const avatarUrl = recipe.author?.avatar_url;
    const avatarHtml = avatarUrl
      ? `<img src="${avatarUrl}" class="cf-avatar-lg" alt="" />`
      : `<div class="cf-avatar-lg cf-avatar-placeholder">${authorName.charAt(0).toUpperCase()}</div>`;
    const liked = recipe.user_liked ? 'liked' : '';
    const emoji = _getRecipeEmoji(recipe.cuisine || recipe.title || '');

    const ingredientsHtml = (recipe.ingredients || []).map(ing =>
      `<span class="cf-det-ing">${_escCf(ing.name)} ${ing.grams ? `(${ing.grams}g)` : ''}</span>`
    ).join('');

    const nutritionHtml = recipe.nutrition_snapshot ? `
      <div class="cf-det-section">
        <strong>${_t('영양 정보', 'Nutrition')}</strong>
        <div class="cf-det-nutr">
          ${recipe.nutrition_snapshot.calories ? `${_t('칼로리', 'Calories')}: ${recipe.nutrition_snapshot.calories} kcal` : ''}
          ${recipe.nutrition_snapshot.protein ? ` · ${_t('단백질', 'Protein')}: ${recipe.nutrition_snapshot.protein}g` : ''}
          ${recipe.nutrition_snapshot.carbs ? ` · ${_t('탄수화물', 'Carbs')}: ${recipe.nutrition_snapshot.carbs}g` : ''}
          ${recipe.nutrition_snapshot.fat ? ` · ${_t('지방', 'Fat')}: ${recipe.nutrition_snapshot.fat}g` : ''}
        </div>
      </div>
    ` : '';

    const tagsHtml = (recipe.tags || []).map(t => `<span class="cf-tag">${_escCf(t)}</span>`).join('');

    const isOwnRecipe = currentUser && recipe.author?.id === currentUser.id;
    const followBtnHtml = !isOwnRecipe && currentUser && recipe.author?.id ? `
      <button class="cf-follow-btn" id="cf-follow-btn-${recipe.author.id}" onclick="toggleFollow('${recipe.author.id}', this)">
        ${_t('팔로우', 'Follow')}
      </button>
    ` : '';

    const commentsHtml = _renderCommentsSection(id, comments);

    modal.querySelector('.cf-detail-modal').innerHTML = `
      <button class="cf-modal-close" onclick="_closeCfDetail()">&times;</button>
      <div class="cf-det-image">
        <span style="font-size:64px;">${emoji}</span>
      </div>
      <div class="cf-det-header">
        <h2 class="cf-det-title">${_escCf(recipe.title || recipe.name || '')}</h2>
        ${recipe.title_en ? `<div class="cf-det-title-en">${_escCf(recipe.title_en)}</div>` : ''}
        ${tagsHtml ? `<div class="cf-det-tags">${tagsHtml}</div>` : ''}
      </div>
      <div class="cf-det-author-row">
        <div class="cf-det-author-info" onclick="event.stopPropagation();renderUserProfile('${recipe.author?.id || ''}')">
          ${avatarHtml}
          <div>
            <div class="cf-author-name-lg">${_escCf(authorName)}</div>
            ${recipe.author?.bio ? `<div class="cf-author-bio">${_escCf(recipe.author.bio)}</div>` : ''}
          </div>
        </div>
        ${followBtnHtml}
      </div>
      ${recipe.description ? `<div class="cf-det-desc">${_escCf(recipe.description)}</div>` : ''}
      ${ingredientsHtml ? `
        <div class="cf-det-section">
          <strong>${_t('재료', 'Ingredients')}</strong>
          <div class="cf-det-ings">${ingredientsHtml}</div>
        </div>
      ` : ''}
      ${recipe.method ? `
        <div class="cf-det-section">
          <strong>${_t('조리법', 'Method')}: ${_escCf(recipe.method)}</strong>
        </div>
      ` : ''}
      ${nutritionHtml}
      <div class="cf-det-actions-row">
        <button class="cf-like-btn-lg ${liked}" id="cf-like-btn-${id}" onclick="toggleLike('${id}',this)">
          <span class="cf-heart">${liked ? '❤️' : '🤍'}</span>
          <span class="cf-like-count">${recipe.like_count || 0}</span> ${_t('좋아요', 'likes')}
        </button>
      </div>
      <div id="cf-comments-section-${id}" class="cf-comments-section">
        ${commentsHtml}
      </div>
    `;

    if (scrollTo === 'comments') {
      setTimeout(() => {
        const cs = document.getElementById(`cf-comments-section-${id}`);
        if (cs) cs.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  } catch (err) {
    console.error('openSharedRecipeDetail error:', err);
    modal.querySelector('.cf-detail-modal').innerHTML = `
      <button class="cf-modal-close" onclick="_closeCfDetail()">&times;</button>
      <div class="cf-detail-loading">
        <div style="color:#dc2626;">${_t('오류가 발생했습니다.', 'An error occurred.')}</div>
      </div>
    `;
  }
}

function _closeCfDetail() {
  const modal = document.getElementById('cf-detail-overlay');
  if (modal) modal.style.display = 'none';
}

// ── 6. Share My Recipe ──────────────────────────────────────────────────────

async function shareMyRecipe(savedRecipeId) {
  if (isGuest || !currentUser) {
    showToast(_t('로그인 후 레시피를 공유할 수 있습니다.', 'Please log in to share recipes.'));
    return;
  }

  // Fetch the saved recipe
  const saved = await dbQuery('saved_recipes', 'select', {
    select: '*',
    eq: { id: savedRecipeId, user_id: currentUser.id },
  });
  const recipe = saved?.[0];
  if (!recipe) {
    showToast(_t('레시피를 찾을 수 없습니다.', 'Recipe not found.'));
    return;
  }

  // Create share prompt overlay
  _injectCommunityFeedStyles();
  let overlay = document.getElementById('cf-share-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cf-share-overlay';
    overlay.className = 'cf-detail-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="cf-share-modal">
      <button class="cf-modal-close" onclick="document.getElementById('cf-share-overlay').style.display='none'">&times;</button>
      <h3 class="cf-share-heading">${_t('레시피 공유하기', 'Share Recipe')}</h3>
      <div class="cf-share-preview">
        <span style="font-size:32px;">${_getRecipeEmoji(recipe.cuisine || recipe.name || '')}</span>
        <strong>${_escCf(recipe.name || '')}</strong>
      </div>
      <label class="cf-share-label">${_t('설명', 'Description')}</label>
      <textarea id="cf-share-desc" class="cf-share-textarea" rows="3"
        placeholder="${_t('이 레시피에 대해 소개해주세요...', 'Tell others about this recipe...')}"></textarea>
      <label class="cf-share-label">${_t('태그 (쉼표로 구분)', 'Tags (comma separated)')}</label>
      <input id="cf-share-tags" class="cf-share-input" type="text"
        placeholder="${_t('예: 건강식, 다이어트, 한식', 'e.g., healthy, diet, korean')}" />
      <button class="cf-share-submit" onclick="_submitShare('${savedRecipeId}')">${_t('공유하기', 'Share')}</button>
    </div>
  `;
  overlay.style.display = 'flex';
}

async function _submitShare(savedRecipeId) {
  const desc = document.getElementById('cf-share-desc')?.value.trim() || '';
  const tagsRaw = document.getElementById('cf-share-tags')?.value || '';
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  const saved = await dbQuery('saved_recipes', 'select', {
    select: '*',
    eq: { id: savedRecipeId, user_id: currentUser.id },
  });
  const recipe = saved?.[0];
  if (!recipe) return;

  const row = {
    user_id: currentUser.id,
    saved_recipe_id: savedRecipeId,
    title: recipe.name,
    title_en: recipe.name_en || recipe.name,
    description: desc,
    cuisine: recipe.cuisine || '',
    ingredients: recipe.ingredients || [],
    method: recipe.method || '',
    nutrition_snapshot: recipe.nutrition_snapshot || null,
    tags,
    is_featured: false,
    like_count: 0,
    comment_count: 0,
    created_at: new Date().toISOString(),
  };

  const result = await dbQuery('shared_recipes', 'insert', { data: row });
  if (result) {
    showToast(_t('레시피가 공유되었습니다! 🎉', 'Recipe shared! 🎉'));
    document.getElementById('cf-share-overlay').style.display = 'none';
  } else {
    showToast(_t('공유에 실패했습니다.', 'Failed to share recipe.'));
  }
}

// ── 7. Toggle Like ──────────────────────────────────────────────────────────

async function toggleLike(sharedRecipeId, btnEl) {
  if (isGuest || !currentUser) {
    showToast(_t('로그인 후 좋아요를 누를 수 있습니다.', 'Please log in to like recipes.'));
    return;
  }

  // Optimistic UI update
  const isLiked = btnEl.classList.contains('liked');
  const countEl = btnEl.querySelector('.cf-like-count');
  const heartEl = btnEl.querySelector('.cf-heart');
  let count = parseInt(countEl?.textContent || '0', 10);

  if (isLiked) {
    btnEl.classList.remove('liked');
    heartEl.textContent = '🤍';
    count = Math.max(0, count - 1);
  } else {
    btnEl.classList.add('liked');
    heartEl.textContent = '❤️';
    btnEl.classList.add('cf-heart-pop');
    setTimeout(() => btnEl.classList.remove('cf-heart-pop'), 400);
    count += 1;
  }
  if (countEl) countEl.textContent = count;

  // Also update any duplicate like buttons (card + detail)
  document.querySelectorAll(`[data-id="${sharedRecipeId}"].cf-like-btn, #cf-like-btn-${sharedRecipeId}`).forEach(el => {
    if (el === btnEl) return;
    const c = el.querySelector('.cf-like-count');
    const h = el.querySelector('.cf-heart');
    if (c) c.textContent = count;
    if (h) h.textContent = isLiked ? '🤍' : '❤️';
    if (isLiked) el.classList.remove('liked');
    else el.classList.add('liked');
  });

  try {
    await dbRPC('toggle_recipe_like', {
      p_user_id: currentUser.id,
      p_shared_recipe_id: sharedRecipeId,
    });
  } catch (err) {
    console.error('toggleLike error:', err);
    // Revert on error
    if (isLiked) {
      btnEl.classList.add('liked');
      heartEl.textContent = '❤️';
      if (countEl) countEl.textContent = count + 1;
    } else {
      btnEl.classList.remove('liked');
      heartEl.textContent = '🤍';
      if (countEl) countEl.textContent = Math.max(0, count - 1);
    }
  }
}

// ── 8. Add Comment ──────────────────────────────────────────────────────────

async function addComment(sharedRecipeId, body, parentId = null) {
  if (isGuest || !currentUser) {
    showToast(_t('로그인 후 댓글을 작성할 수 있습니다.', 'Please log in to comment.'));
    return null;
  }

  body = body.trim();
  if (!body) return null;

  const row = {
    shared_recipe_id: sharedRecipeId,
    user_id: currentUser.id,
    body,
    parent_id: parentId || null,
    created_at: new Date().toISOString(),
  };

  const result = await dbQuery('recipe_comments', 'insert', { data: row });
  if (!result) {
    showToast(_t('댓글 작성에 실패했습니다.', 'Failed to post comment.'));
    return null;
  }

  // Re-render comments
  const comments = await loadComments(sharedRecipeId);
  const section = document.getElementById(`cf-comments-section-${sharedRecipeId}`);
  if (section) {
    section.innerHTML = _renderCommentsSection(sharedRecipeId, comments);
  }

  showToast(_t('댓글이 등록되었습니다.', 'Comment posted!'));
  return result;
}

// ── 9. Load Comments ────────────────────────────────────────────────────────

async function loadComments(sharedRecipeId) {
  try {
    const result = await dbQuery('recipe_comments', 'select', {
      select: '*, author:profiles(id, display_name, avatar_url)',
      eq: { shared_recipe_id: sharedRecipeId },
      order: { column: 'created_at', ascending: true },
    });
    return result || [];
  } catch (err) {
    console.error('loadComments error:', err);
    return [];
  }
}

function _renderCommentsSection(recipeId, comments) {
  const topLevel = comments.filter(c => !c.parent_id);
  const replies = comments.filter(c => c.parent_id);

  const commentsHtml = topLevel.map(c => {
    const childReplies = replies.filter(r => r.parent_id === c.id);
    const authorName = c.author?.display_name || _t('익명', 'Anonymous');
    const avatar = c.author?.avatar_url
      ? `<img src="${c.author.avatar_url}" class="cf-comment-avatar" alt="" />`
      : `<div class="cf-comment-avatar cf-avatar-placeholder">${authorName.charAt(0).toUpperCase()}</div>`;

    const repliesHtml = childReplies.map(r => {
      const rName = r.author?.display_name || _t('익명', 'Anonymous');
      const rAvatar = r.author?.avatar_url
        ? `<img src="${r.author.avatar_url}" class="cf-comment-avatar" alt="" />`
        : `<div class="cf-comment-avatar cf-avatar-placeholder">${rName.charAt(0).toUpperCase()}</div>`;
      return `
        <div class="cf-reply">
          <div class="cf-comment-row">
            ${rAvatar}
            <div class="cf-comment-content">
              <span class="cf-comment-author">${_escCf(rName)}</span>
              <span class="cf-comment-time">${_timeAgoCf(r.created_at)}</span>
              <div class="cf-comment-body">${_escCf(r.body)}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="cf-comment">
        <div class="cf-comment-row">
          ${avatar}
          <div class="cf-comment-content">
            <span class="cf-comment-author">${_escCf(authorName)}</span>
            <span class="cf-comment-time">${_timeAgoCf(c.created_at)}</span>
            <div class="cf-comment-body">${_escCf(c.body)}</div>
            <button class="cf-reply-toggle" onclick="_toggleReplyInput('${recipeId}','${c.id}',this)">
              ${_t('답글', 'Reply')}
            </button>
          </div>
        </div>
        ${repliesHtml ? `<div class="cf-replies">${repliesHtml}</div>` : ''}
        <div class="cf-reply-input-area" id="cf-reply-area-${c.id}" style="display:none;">
          <input type="text" class="cf-reply-input" placeholder="${_t('답글 작성...', 'Write a reply...')}" />
          <button class="cf-reply-submit" onclick="_submitReply('${recipeId}','${c.id}')">${_t('등록', 'Post')}</button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="cf-comments-header">
      <strong>💬 ${_t('댓글', 'Comments')} (${comments.length})</strong>
    </div>
    <div class="cf-comments-list">${commentsHtml}</div>
    <div class="cf-add-comment">
      <input type="text" id="cf-new-comment-${recipeId}" class="cf-comment-input"
        placeholder="${_t('댓글을 작성하세요...', 'Write a comment...')}" />
      <button class="cf-comment-submit" onclick="_submitComment('${recipeId}')">${_t('등록', 'Post')}</button>
    </div>
  `;
}

function _toggleReplyInput(recipeId, commentId, btn) {
  const area = document.getElementById(`cf-reply-area-${commentId}`);
  if (!area) return;
  const isVisible = area.style.display !== 'none';
  area.style.display = isVisible ? 'none' : 'flex';
  if (!isVisible) area.querySelector('input')?.focus();
}

async function _submitComment(recipeId) {
  const input = document.getElementById(`cf-new-comment-${recipeId}`);
  if (!input) return;
  await addComment(recipeId, input.value);
}

async function _submitReply(recipeId, parentId) {
  const area = document.getElementById(`cf-reply-area-${parentId}`);
  const input = area?.querySelector('input');
  if (!input) return;
  await addComment(recipeId, input.value, parentId);
}

// ── 10. Toggle Follow ───────────────────────────────────────────────────────

async function toggleFollow(userId, btnEl) {
  if (isGuest || !currentUser) {
    showToast(_t('로그인 후 팔로우할 수 있습니다.', 'Please log in to follow users.'));
    return;
  }
  if (userId === currentUser.id) return;

  const isFollowing = btnEl.classList.contains('following');

  // Optimistic UI
  if (isFollowing) {
    btnEl.classList.remove('following');
    btnEl.textContent = _t('팔로우', 'Follow');
  } else {
    btnEl.classList.add('following');
    btnEl.textContent = _t('팔로잉', 'Following');
  }

  try {
    await dbRPC('toggle_follow', {
      p_follower_id: currentUser.id,
      p_following_id: userId,
    });
  } catch (err) {
    console.error('toggleFollow error:', err);
    // Revert
    if (isFollowing) {
      btnEl.classList.add('following');
      btnEl.textContent = _t('팔로잉', 'Following');
    } else {
      btnEl.classList.remove('following');
      btnEl.textContent = _t('팔로우', 'Follow');
    }
  }
}

// ── 11. User Profile Card ───────────────────────────────────────────────────

async function renderUserProfile(userId) {
  if (!userId) return;
  _injectCommunityFeedStyles();

  let overlay = document.getElementById('cf-profile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cf-profile-overlay';
    overlay.className = 'cf-detail-overlay';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="cf-profile-card">
      <div class="cf-detail-loading"><div class="cf-spinner"></div></div>
    </div>
  `;
  overlay.style.display = 'flex';

  try {
    const profiles = await dbQuery('profiles', 'select', {
      select: 'id, display_name, avatar_url, bio',
      eq: { id: userId },
    });
    const profile = profiles?.[0];
    if (!profile) {
      overlay.style.display = 'none';
      return;
    }

    // Get recipe count and follower count via RPC
    let recipeCount = 0;
    let followerCount = 0;
    try {
      const stats = await dbRPC('get_user_stats', { p_user_id: userId });
      recipeCount = stats?.recipe_count || 0;
      followerCount = stats?.follower_count || 0;
    } catch (_) { /* stats unavailable */ }

    const name = profile.display_name || _t('익명', 'Anonymous');
    const avatarHtml = profile.avatar_url
      ? `<img src="${profile.avatar_url}" class="cf-profile-avatar" alt="" />`
      : `<div class="cf-profile-avatar cf-avatar-placeholder" style="font-size:28px;">${name.charAt(0).toUpperCase()}</div>`;

    const isOwn = currentUser && currentUser.id === userId;
    const followBtn = !isOwn ? `
      <button class="cf-follow-btn" id="cf-profile-follow-${userId}" onclick="toggleFollow('${userId}',this)">
        ${_t('팔로우', 'Follow')}
      </button>
    ` : '';

    overlay.querySelector('.cf-profile-card').innerHTML = `
      <button class="cf-modal-close" onclick="document.getElementById('cf-profile-overlay').style.display='none'">&times;</button>
      ${avatarHtml}
      <div class="cf-profile-name">${_escCf(name)}</div>
      ${profile.bio ? `<div class="cf-profile-bio">${_escCf(profile.bio)}</div>` : ''}
      <div class="cf-profile-stats">
        <div class="cf-stat">
          <span class="cf-stat-num">${recipeCount}</span>
          <span class="cf-stat-label">${_t('레시피', 'Recipes')}</span>
        </div>
        <div class="cf-stat">
          <span class="cf-stat-num">${followerCount}</span>
          <span class="cf-stat-label">${_t('팔로워', 'Followers')}</span>
        </div>
      </div>
      ${followBtn}
    `;
  } catch (err) {
    console.error('renderUserProfile error:', err);
    overlay.style.display = 'none';
  }
}

// ── 12. Init ────────────────────────────────────────────────────────────────

function initCommunityFeed() {
  // Keyboard shortcut: Escape closes overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const profileOverlay = document.getElementById('cf-profile-overlay');
      if (profileOverlay && profileOverlay.style.display === 'flex') {
        profileOverlay.style.display = 'none';
        return;
      }
      const shareOverlay = document.getElementById('cf-share-overlay');
      if (shareOverlay && shareOverlay.style.display === 'flex') {
        shareOverlay.style.display = 'none';
        return;
      }
      const detailOverlay = document.getElementById('cf-detail-overlay');
      if (detailOverlay && detailOverlay.style.display === 'flex') {
        _closeCfDetail();
        return;
      }
      if (_cfOpen) {
        closeCommunityFeed();
      }
    }
  });
}

// ── Styles ──────────────────────────────────────────────────────────────────

function _injectCommunityFeedStyles() {
  if (document.getElementById('cfStyles')) return;
  const style = document.createElement('style');
  style.id = 'cfStyles';
  style.textContent = `
    /* Overlay */
    .cf-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:8000;
      display:none; align-items:center; justify-content:center;
      opacity:0; transition:opacity .3s ease;
    }
    .cf-overlay.open { opacity:1; }

    /* Main Panel */
    .cf-panel {
      width:100%; max-width:560px; height:100vh; background:#fafafa;
      display:flex; flex-direction:column; position:relative;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    }
    .cf-header {
      display:flex; justify-content:space-between; align-items:center;
      padding:16px 20px; background:#fff; border-bottom:1px solid #eee;
      flex-shrink:0;
    }
    .cf-header-title { font-size:17px; font-weight:700; }
    .cf-close-btn {
      background:none; border:none; font-size:24px; cursor:pointer;
      color:#888; padding:4px 8px; border-radius:6px; line-height:1;
    }
    .cf-close-btn:hover { background:#f3f3f3; }

    /* Search */
    .cf-search-bar { padding:12px 20px 0; background:#fff; flex-shrink:0; }
    .cf-search-input {
      width:100%; padding:9px 14px; border:1px solid #e5e5e5; border-radius:10px;
      font-size:14px; outline:none; background:#f9f9f9; box-sizing:border-box;
      transition:border-color .2s;
    }
    .cf-search-input:focus { border-color:#059669; background:#fff; }

    /* Tabs */
    .cf-tabs {
      display:flex; gap:8px; padding:12px 20px; background:#fff;
      border-bottom:1px solid #eee; flex-shrink:0;
    }
    .cf-tab {
      padding:6px 16px; border-radius:20px; font-size:13px; font-weight:500;
      border:1px solid #e5e5e5; background:#fff; cursor:pointer; color:#555;
      transition:all .2s;
    }
    .cf-tab.active { background:#059669; color:#fff; border-color:#059669; }
    .cf-tab:hover:not(.active) { background:#f0fdf4; border-color:#059669; color:#059669; }

    /* Feed Container */
    .cf-feed-container { flex:1; overflow-y:auto; padding:16px 20px; }
    .cf-feed-list { display:flex; flex-direction:column; gap:16px; max-width:500px; margin:0 auto; }

    /* Feed Card */
    .cf-card {
      background:#fff; border-radius:14px; overflow:hidden;
      box-shadow:0 1px 4px rgba(0,0,0,.06); cursor:pointer;
      transition:box-shadow .2s, transform .15s; border:1px solid #f0f0f0;
    }
    .cf-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.1); transform:translateY(-1px); }
    .cf-card-header {
      display:flex; justify-content:space-between; align-items:center;
      padding:12px 16px 0;
    }
    .cf-card-author { display:flex; align-items:center; gap:8px; }
    .cf-avatar {
      width:32px; height:32px; border-radius:50%; object-fit:cover; flex-shrink:0;
    }
    .cf-avatar-placeholder {
      display:flex; align-items:center; justify-content:center;
      background:#059669; color:#fff; font-weight:600; font-size:14px;
    }
    .cf-avatar-lg { width:40px; height:40px; border-radius:50%; object-fit:cover; flex-shrink:0; }
    .cf-author-name { font-size:13px; font-weight:600; color:#333; }
    .cf-card-time { font-size:11px; color:#aaa; }

    /* Card Image placeholder */
    .cf-card-image {
      display:flex; align-items:center; justify-content:center;
      height:120px; background:linear-gradient(135deg,#f0fdf4,#ecfdf5);
      margin:12px 16px 0; border-radius:10px;
    }
    .cf-card-emoji { font-size:48px; }

    /* Card Body */
    .cf-card-body { padding:12px 16px 8px; }
    .cf-card-title { font-size:15px; font-weight:700; color:#111; margin-bottom:4px; }
    .cf-card-desc { font-size:13px; color:#666; line-height:1.4; margin-bottom:6px; }
    .cf-card-tags { display:flex; gap:6px; flex-wrap:wrap; }
    .cf-tag {
      font-size:11px; padding:2px 8px; border-radius:10px;
      background:#f0fdf4; color:#059669; font-weight:500;
    }

    /* Card Actions */
    .cf-card-actions {
      display:flex; gap:4px; padding:8px 16px 12px; border-top:1px solid #f5f5f5;
      margin-top:4px;
    }
    .cf-like-btn, .cf-comment-btn, .cf-share-btn {
      background:none; border:none; cursor:pointer; font-size:13px; color:#888;
      padding:4px 10px; border-radius:8px; display:flex; align-items:center; gap:4px;
      transition:background .15s;
    }
    .cf-like-btn:hover { background:#fef2f2; }
    .cf-comment-btn:hover { background:#f0f9ff; }
    .cf-share-btn:hover { background:#f0fdf4; }
    .cf-like-btn.liked { color:#ef4444; }

    /* Heart Animation */
    .cf-heart-pop { animation:cfHeartPop .4s ease; }
    @keyframes cfHeartPop {
      0% { transform:scale(1); }
      30% { transform:scale(1.3); }
      60% { transform:scale(0.9); }
      100% { transform:scale(1); }
    }

    /* Empty */
    .cf-empty { text-align:center; padding:48px 16px; color:#999; font-size:14px; }

    /* Load more spinner */
    .cf-load-more { display:flex; justify-content:center; padding:20px; }
    .cf-spinner {
      width:24px; height:24px; border:3px solid #e5e5e5; border-top-color:#059669;
      border-radius:50%; animation:cfSpin .7s linear infinite;
    }
    @keyframes cfSpin { to { transform:rotate(360deg); } }

    /* Detail Overlay */
    .cf-detail-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:9000;
      display:none; align-items:center; justify-content:center;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    }
    .cf-detail-modal {
      position:relative; background:#fff; border-radius:16px;
      width:92vw; max-width:520px; max-height:88vh; overflow-y:auto;
      padding:24px; box-shadow:0 12px 40px rgba(0,0,0,.2);
    }
    .cf-modal-close {
      position:absolute; top:12px; right:14px; background:none; border:none;
      font-size:22px; cursor:pointer; color:#888; z-index:1; line-height:1;
    }
    .cf-modal-close:hover { color:#333; }
    .cf-detail-loading { display:flex; flex-direction:column; align-items:center; padding:40px; }

    /* Detail Content */
    .cf-det-image {
      display:flex; align-items:center; justify-content:center;
      height:100px; background:linear-gradient(135deg,#f0fdf4,#d1fae5);
      border-radius:12px; margin-bottom:16px;
    }
    .cf-det-header { margin-bottom:12px; }
    .cf-det-title { font-size:20px; font-weight:700; margin:0; color:#111; }
    .cf-det-title-en { font-size:13px; color:#888; margin-top:2px; }
    .cf-det-tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
    .cf-det-author-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 0; border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0;
      margin-bottom:14px;
    }
    .cf-det-author-info { display:flex; align-items:center; gap:10px; cursor:pointer; }
    .cf-author-name-lg { font-size:14px; font-weight:600; }
    .cf-author-bio { font-size:12px; color:#888; margin-top:1px; }
    .cf-follow-btn {
      padding:6px 16px; border-radius:20px; font-size:12px; font-weight:600;
      background:#059669; color:#fff; border:none; cursor:pointer;
      transition:all .2s;
    }
    .cf-follow-btn:hover { background:#047857; }
    .cf-follow-btn.following {
      background:#fff; color:#059669; border:1px solid #059669;
    }
    .cf-follow-btn.following:hover { background:#f0fdf4; }
    .cf-det-desc { font-size:14px; color:#444; line-height:1.6; margin-bottom:14px; }
    .cf-det-section { margin-bottom:14px; }
    .cf-det-section strong { display:block; font-size:13px; color:#555; margin-bottom:6px; }
    .cf-det-ings { display:flex; flex-wrap:wrap; gap:4px; }
    .cf-det-ing { font-size:12px; background:#f5f5f5; padding:3px 10px; border-radius:6px; }
    .cf-det-nutr { font-size:13px; color:#666; }
    .cf-det-actions-row {
      display:flex; gap:10px; padding:14px 0; border-top:1px solid #f0f0f0;
    }
    .cf-like-btn-lg {
      display:flex; align-items:center; gap:6px; background:none; border:1px solid #e5e5e5;
      padding:8px 16px; border-radius:10px; cursor:pointer; font-size:14px; color:#555;
      transition:all .2s;
    }
    .cf-like-btn-lg:hover { background:#fef2f2; border-color:#fca5a5; }
    .cf-like-btn-lg.liked { color:#ef4444; border-color:#fca5a5; background:#fef2f2; }

    /* Comments */
    .cf-comments-section { margin-top:16px; }
    .cf-comments-header { font-size:14px; margin-bottom:12px; }
    .cf-comments-list { display:flex; flex-direction:column; gap:12px; }
    .cf-comment { border-bottom:1px solid #f5f5f5; padding-bottom:10px; }
    .cf-comment-row { display:flex; gap:8px; align-items:flex-start; }
    .cf-comment-avatar {
      width:28px; height:28px; border-radius:50%; object-fit:cover; flex-shrink:0;
      font-size:12px;
    }
    .cf-comment-content { flex:1; }
    .cf-comment-author { font-size:12px; font-weight:600; color:#333; margin-right:6px; }
    .cf-comment-time { font-size:11px; color:#bbb; }
    .cf-comment-body { font-size:13px; color:#444; line-height:1.4; margin-top:2px; }
    .cf-reply-toggle {
      background:none; border:none; color:#059669; font-size:11px;
      cursor:pointer; padding:2px 0; margin-top:2px; font-weight:500;
    }
    .cf-replies { margin-left:36px; margin-top:8px; display:flex; flex-direction:column; gap:8px; }
    .cf-reply { font-size:13px; }
    .cf-reply-input-area {
      display:flex; gap:6px; margin-left:36px; margin-top:6px;
    }
    .cf-reply-input, .cf-comment-input {
      flex:1; padding:7px 12px; border:1px solid #e5e5e5; border-radius:8px;
      font-size:13px; outline:none; box-sizing:border-box;
    }
    .cf-reply-input:focus, .cf-comment-input:focus { border-color:#059669; }
    .cf-reply-submit, .cf-comment-submit {
      padding:7px 14px; background:#059669; color:#fff; border:none;
      border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;
      white-space:nowrap; transition:background .15s;
    }
    .cf-reply-submit:hover, .cf-comment-submit:hover { background:#047857; }
    .cf-add-comment {
      display:flex; gap:8px; margin-top:14px; padding-top:12px;
      border-top:1px solid #f0f0f0;
    }

    /* Share Modal */
    .cf-share-modal {
      position:relative; background:#fff; border-radius:16px;
      width:90vw; max-width:420px; padding:24px;
      box-shadow:0 12px 40px rgba(0,0,0,.2);
    }
    .cf-share-heading { font-size:18px; font-weight:700; margin:0 0 16px; }
    .cf-share-preview {
      display:flex; align-items:center; gap:10px; padding:12px; background:#f9f9f9;
      border-radius:10px; margin-bottom:16px;
    }
    .cf-share-label {
      display:block; font-size:12px; font-weight:600; color:#555; margin-bottom:4px;
    }
    .cf-share-textarea, .cf-share-input {
      width:100%; padding:9px 12px; border:1px solid #e5e5e5; border-radius:8px;
      font-size:13px; outline:none; font-family:inherit; box-sizing:border-box;
      margin-bottom:12px; resize:vertical;
    }
    .cf-share-textarea:focus, .cf-share-input:focus { border-color:#059669; }
    .cf-share-submit {
      width:100%; padding:10px; background:#059669; color:#fff; border:none;
      border-radius:10px; font-size:14px; font-weight:600; cursor:pointer;
      transition:background .15s;
    }
    .cf-share-submit:hover { background:#047857; }

    /* Profile Card */
    .cf-profile-card {
      position:relative; background:#fff; border-radius:16px;
      width:85vw; max-width:340px; padding:30px 24px;
      box-shadow:0 12px 40px rgba(0,0,0,.2); text-align:center;
    }
    .cf-profile-avatar {
      width:64px; height:64px; border-radius:50%; object-fit:cover;
      margin:0 auto 10px;
    }
    .cf-profile-name { font-size:18px; font-weight:700; color:#111; }
    .cf-profile-bio { font-size:13px; color:#888; margin-top:4px; line-height:1.4; }
    .cf-profile-stats {
      display:flex; justify-content:center; gap:32px; margin:16px 0;
    }
    .cf-stat { display:flex; flex-direction:column; align-items:center; }
    .cf-stat-num { font-size:18px; font-weight:700; color:#111; }
    .cf-stat-label { font-size:12px; color:#888; }

    @media (max-width:560px) {
      .cf-panel { max-width:100vw; }
      .cf-detail-modal { width:96vw; padding:18px; }
      .cf-share-modal { width:96vw; }
    }
  `;
  document.head.appendChild(style);
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommunityFeed);
} else {
  initCommunityFeed();
}
