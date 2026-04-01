// ═══════════════════════════════════════════════════════════════════════════════
//  food-image-resolver.js — 식자재/조리방법 실사 이미지 자동 매칭 시스템
//  Pexels API를 통해 영어 이름으로 음식 사진을 검색하고 localStorage에 캐싱
//  IntersectionObserver로 화면에 보이는 항목만 지연 로딩
// ═══════════════════════════════════════════════════════════════════════════════

var FoodImageResolver = (function() {
  'use strict';

  var CACHE_KEY = '_foodImgCache';
  var CACHE_VERSION = 2;
  var API_BASE = window.location.hostname === 'localhost' ? '' : '';
  var _cache = null;
  var _pendingRequests = {};
  var _observer = null;

  // ── Pexels 사전 매핑 (즉시 표시용) ─────────────────────────────────────────
  var _px = function(id) { return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'; };
  var SEED = {
    // ── Meat ──
    'beef':_px(65175),'pork':_px(618773),'chicken breast':_px(5769377),'chicken leg':_px(616354),
    'lamb':_px(3535383),'duck':_px(2338407),'bacon':_px(1927377),'sausage':_px(8360243),
    'ham':_px(6607314),'chicken':_px(616354),'organ meat':_px(6607314),'processed meat':_px(8360243),
    'goose':_px(1694003),'quail':_px(1694003),'pheasant':_px(1694003),'turkey':_px(5765068),
    'veal':_px(618775),'goat':_px(618773),'rabbit':_px(618775),'venison':_px(618775),
    'horse meat':_px(618773),'ostrich':_px(65175),'bison':_px(65175),'wild boar':_px(65175),
    'alligator':_px(65175),'beef sirloin':_px(5045090),'beef tenderloin':_px(5045090),
    'ribeye':_px(5045090),'striploin':_px(5045090),'beef short ribs':_px(6607314),
    'brisket':_px(6607314),'beef round':_px(5045090),'flat iron steak':_px(5045090),
    'pork belly':_px(618773),'pork shoulder':_px(618773),'pork loin':_px(618773),
    'pork ribs':_px(618773),'ground pork':_px(618773),'chicken thigh':_px(616354),
    'chicken wing':_px(60616),'whole chicken':_px(616354),'ground chicken':_px(616354),
    'lamb chop':_px(3535383),'lamb shank':_px(3535383),'ground lamb':_px(3535383),
    'duck breast':_px(2338407),'duck leg':_px(2338407),
    // ── Seafood ──
    'salmon':_px(1409050),'tuna':_px(3296279),'shrimp':_px(2871757),'mackerel':_px(3296279),
    'squid':_px(3296279),'clam':_px(2871757),'crab':_px(2871757),'octopus':_px(2871757),
    'pacific saury':_px(3296279),'cod':_px(3296279),'halibut':_px(3296279),
    'anchovy':_px(3296279),'abalone':_px(2871757),'scallop':_px(2871757),
    'mussel':_px(2871757),'oyster':_px(2871757),'lobster':_px(2871757),
    'sea cucumber':_px(2871757),'eel':_px(3296279),'trout':_px(1409050),
    'catfish':_px(3296279),'sardine':_px(3296279),'sea bass':_px(3296279),
    'yellowtail':_px(3296279),'monkfish':_px(3296279),'sea bream':_px(3296279),
    'herring':_px(3296279),'swordfish':_px(3296279),'tilapia':_px(3296279),
    // ── Vegetables ──
    'onion':_px(144206),'garlic':_px(1392585),'potato':_px(4110476),'tomato':_px(3938343),
    'chili pepper':_px(9185580),'broccoli':_px(7330428),'carrot':_px(143133),
    'spinach':_px(2325843),'napa cabbage':_px(2518893),'bell pepper':_px(594137),
    'cabbage':_px(2518893),'cucumber':_px(3568039),'squash':_px(1300972),
    'eggplant':_px(321551),'celery':_px(143133),'asparagus':_px(539431),
    'daikon':_px(143133),'bean sprouts':_px(1414651),'green onion':_px(1414651),
    'green pepper':_px(594137),'beet':_px(1300972),'kale':_px(2325843),
    'sweet potato':_px(1300972),'corn':_px(547263),'pumpkin':_px(1300972),
    'zucchini':_px(321551),'leek':_px(1414651),'turnip':_px(143133),
    'artichoke':_px(321551),'radish':_px(143133),'lettuce':_px(1199562),
    'watercress':_px(1199562),'arugula':_px(1199562),'bok choy':_px(2518893),
    // ── Fruit ──
    'apple':_px(1132047),'banana':_px(1093038),'strawberry':_px(934066),
    'blueberry':_px(1395958),'avocado':_px(557659),'grape':_px(760281),
    'watermelon':_px(1068534),'kiwi':_px(867349),'lemon':_px(1414110),
    'orange':_px(207085),'grapefruit':_px(207085),'mango':_px(918643),
    'pineapple':_px(947879),'peach':_px(1028599),'pear':_px(1028599),
    'persimmon':_px(1028599),'cherry':_px(1028599),'raspberry':_px(934066),
    'coconut':_px(557659),'fig':_px(1028599),'pomegranate':_px(65175),
    'plum':_px(1028599),'papaya':_px(918643),'passion fruit':_px(918643),
    'lime':_px(1414110),'cranberry':_px(1395958),'dragon fruit':_px(918643),
    // ── Grains ──
    'flour':_px(6287371),'pasta':_px(6287371),'oats':_px(216951),'rice':_px(1311771),
    'brown rice':_px(7665442),'white bread':_px(162456),'buckwheat':_px(7665442),
    'udon noodles':_px(6287371),'instant ramen':_px(6287371),'quinoa':_px(7665442),
    'barley':_px(7665442),'couscous':_px(7665442),'cornmeal':_px(547263),
    'rye bread':_px(162456),'sourdough':_px(4267969),'tortilla':_px(162456),
    'bagel':_px(1287278),'croissant':_px(1287278),'muesli':_px(216951),
    // ── Dairy ──
    'milk':_px(248412),'cheese':_px(773253),'cream':_px(248412),'yogurt':_px(8892364),
    'heavy cream':_px(248412),'mozzarella':_px(773253),'parmesan':_px(773253),
    'butter':_px(248412),'cream cheese':_px(773253),'ricotta':_px(773253),
    'gouda':_px(773253),'brie':_px(773253),'cheddar':_px(773253),
    'goat cheese':_px(773253),'sour cream':_px(248412),'whey protein':_px(248412),
    // ── Eggs ──
    'egg':_px(824635),'quail egg':_px(824635),'duck egg':_px(824635),
    'egg white':_px(824635),'egg yolk':_px(824635),'onsen egg':_px(824635),
    'century egg':_px(824635),
    // ── Nuts & Seeds ──
    'almond':_px(1295572),'walnut':_px(7420934),'peanut':_px(1295572),
    'cashew':_px(1295572),'pine nut':_px(1295572),'sesame':_px(1295572),
    'sunflower seed':_px(1295572),'pistachio':_px(1295572),'macadamia':_px(1295572),
    'pecan':_px(1295572),'hazelnut':_px(1295572),'chia seed':_px(1295572),
    'flax seed':_px(1295572),'hemp seed':_px(1295572),'pumpkin seed':_px(1295572),
    // ── Mushroom ──
    'shiitake':_px(1643403),'button mushroom':_px(1643403),'enoki':_px(1643403),
    'king oyster mushroom':_px(1643403),'wood ear':_px(1643403),'oyster mushroom':_px(1643403),
    'portobello':_px(1643403),'truffle':_px(1643403),'chanterelle':_px(1643403),
    'maitake':_px(1643403),'morel':_px(1643403),'lion\'s mane':_px(1643403),
    // ── Legumes ──
    'black bean':_px(6316673),'lentil':_px(6316673),'chickpea':_px(6316673),
    'red bean':_px(6316673),'white kidney bean':_px(6316673),'pinto bean':_px(6316673),
    'green lentil':_px(6316673),'red lentil':_px(6316673),'mung bean':_px(6316673),
    'lima bean':_px(6316673),'tempeh':_px(6316673),'tofu':_px(6316673),
    'green peas':_px(6316673),'edamame':_px(6316673),'soybean':_px(6316673),
    // ── Herbs & Spices ──
    'basil':_px(1340116),'rosemary':_px(1340116),'thyme':_px(1340116),
    'mint':_px(1340116),'cilantro':_px(1340116),'parsley':_px(1340116),
    'ginger':_px(5852203),'black pepper':_px(4871153),'cumin':_px(4871153),
    'cinnamon':_px(4871153),'turmeric':_px(4871153),'curry powder':_px(4871153),
    'paprika':_px(4871153),'oregano':_px(1340116),'dill':_px(1340116),
    'chive':_px(1340116),'bay leaf':_px(1340116),'sage':_px(1340116),
    'tarragon':_px(1340116),'star anise':_px(4871153),'cardamom':_px(4871153),
    'clove':_px(4871153),'nutmeg':_px(4871153),'saffron':_px(4871153),
    'wasabi':_px(4871153),'sichuan pepper':_px(4871153),
    // ── Sauces & Seasonings ──
    'salt':_px(5908226),'vinegar':_px(5908226),'soy sauce':_px(5908226),
    'sugar':_px(5908226),'oyster sauce':_px(5908226),'ketchup':_px(5908226),
    'mayonnaise':_px(5908226),'mustard':_px(5908226),'honey':_px(5908226),
    'mirin':_px(5908226),'gochujang':_px(5908226),'doenjang':_px(5908226),
    'fish sauce':_px(5908226),'sriracha':_px(5908226),'tabasco':_px(5908226),
    'worcestershire':_px(5908226),'balsamic vinegar':_px(5908226),
    // ── Oils ──
    'olive oil':_px(1022385),'sesame oil':_px(1022385),'coconut oil':_px(1022385),
    'canola oil':_px(1022385),'grapeseed oil':_px(1022385),'butter':_px(1022385),
    'avocado oil':_px(1022385),'peanut oil':_px(1022385),'sunflower oil':_px(1022385),
    // ── Beverages ──
    'coffee':_px(312418),'green tea':_px(312418),'black tea':_px(312418),
    'matcha':_px(312418),'kombucha':_px(312418),'soy milk':_px(248412),
    'almond milk':_px(248412),'oat milk':_px(248412),'orange juice':_px(207085),
    // ── Processed ──
    'tofu':_px(6316673),'natto':_px(6316673),'miso':_px(5908226),
    'kimchi':_px(2518893),'sauerkraut':_px(2518893),'pickle':_px(3568039),
  };
  var _queue = [];
  var _processing = false;
  var _batchDelay = 150; // ms between API calls to avoid rate limiting

  // ── 카테고리별 fallback 이미지 (SEED에 없는 항목용) ────────────────────────
  var CAT_FALLBACK = {
    meat:_px(65175), seafood:_px(3296279), veg:_px(2255935), fruit:_px(1132047),
    grain:_px(326082), dairy:_px(773253), egg:_px(824635), nut:_px(1295572),
    mushroom:_px(1643403), legume:_px(6316673), herb:_px(1340116), sauce:_px(5908226),
    oil:_px(1022385), beverage:_px(312418), processed:_px(1583884)
  };

  // ── 캐시 로드/저장 ──────────────────────────────────────────────────────────
  function _loadCache() {
    if (_cache) return _cache;
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed._v === CACHE_VERSION) {
          _cache = parsed;
          return _cache;
        }
      }
    } catch(e) {}
    _cache = { _v: CACHE_VERSION };
    // SEED 데이터를 초기 캐시로 로드 (API 호출 없이 즉시 표시)
    Object.keys(SEED).forEach(function(k) {
      if (!_cache[k]) _cache[k] = { url: SEED[k], ts: Date.now() };
    });
    _saveCache();
    return _cache;
  }

  function _saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(_cache));
    } catch(e) {
      // localStorage full — prune oldest entries
      var keys = Object.keys(_cache).filter(function(k) { return k !== '_v'; });
      if (keys.length > 200) {
        keys.slice(0, 100).forEach(function(k) { delete _cache[k]; });
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(_cache)); } catch(e2) {}
      }
    }
  }

  // ── 캐시 키 정규화 ─────────────────────────────────────────────────────────
  function _normalizeKey(name) {
    return name.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  // ── 캐시에서 이미지 URL 가져오기 ───────────────────────────────────────────
  function getCachedUrl(englishName) {
    var cache = _loadCache();
    var key = _normalizeKey(englishName);
    var entry = cache[key];
    if (entry && entry.url) {
      // 30일 지나면 만료 (SEED 데이터는 만료 안 함)
      if (SEED[key] || Date.now() - (entry.ts || 0) <= 30 * 24 * 60 * 60 * 1000) {
        return entry.url;
      }
      delete cache[key];
    }
    // 캐시에 없으면 SEED에서 직접 확인
    if (SEED[key]) return SEED[key];
    return null;
  }

  // ── Pexels API로 이미지 검색 ───────────────────────────────────────────────
  function fetchImage(englishName) {
    var key = _normalizeKey(englishName);

    // 이미 캐시에 있으면 바로 반환
    var cached = getCachedUrl(englishName);
    if (cached !== null) return Promise.resolve(cached);

    // 이미 요청 중이면 동일 Promise 반환
    if (_pendingRequests[key]) return _pendingRequests[key];

    _pendingRequests[key] = fetch(API_BASE + '/api/food-image?q=' + encodeURIComponent(englishName))
      .then(function(res) {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(function(data) {
        var cache = _loadCache();
        cache[key] = { url: data.url || '', tiny: data.tiny || '', ts: Date.now() };
        _saveCache();
        delete _pendingRequests[key];
        return data.url || '';
      })
      .catch(function() {
        // 실패 시 빈 문자열 캐싱 (재시도 방지)
        var cache = _loadCache();
        cache[key] = { url: '', ts: Date.now() };
        _saveCache();
        delete _pendingRequests[key];
        return '';
      });

    return _pendingRequests[key];
  }

  // ── DB 카테고리 기반 fallback URL 조회 (캐싱 최적화) ───────────────────
  var _enToCatMap = null;
  function _getCatFallback(englishName) {
    if (typeof DB === 'undefined') return null;
    if (!_enToCatMap) {
      _enToCatMap = {};
      var entries = Object.entries(DB);
      for (var i = 0; i < entries.length; i++) {
        var en = entries[i][1].en;
        if (en) _enToCatMap[en.toLowerCase()] = entries[i][1].cat;
      }
    }
    var cat = _enToCatMap[englishName.toLowerCase()];
    return cat ? (CAT_FALLBACK[cat] || null) : null;
  }

  // ── 이미지 요소를 생성 (emoji fallback 포함) ──────────────────────────────
  function createImgHtml(englishName, emoji, cssClass, size) {
    cssClass = cssClass || 'fi-img';
    size = size || 40;
    var cached = getCachedUrl(englishName);

    // SEED/캐시에 없으면 카테고리 fallback 시도
    if (!cached) cached = _getCatFallback(englishName);

    if (cached) {
      return '<img src="' + cached + '" class="' + cssClass + '" alt="' + englishName +
        '" style="width:' + size + 'px;height:' + size + 'px;border-radius:6px;object-fit:cover" ' +
        'onerror="this.outerHTML=\'<span class=\\\'fi-emoji\\\'>' + (emoji || '🍽️') + '</span>\'">';
    }

    // 캐시 없으면 data-fi-name 속성으로 lazy load 대상 표시
    return '<span class="fi-lazy ' + cssClass + '" data-fi-name="' + englishName.replace(/"/g, '&quot;') +
      '" data-fi-emoji="' + (emoji || '🍽️') + '" data-fi-class="' + cssClass +
      '" data-fi-size="' + size + '">' + (emoji || '🍽️') + '</span>';
  }

  // ── Lazy Loading: 화면에 보이는 항목만 이미지 로드 ────────────────────────
  function _processQueue() {
    if (_processing || _queue.length === 0) return;
    _processing = true;

    var item = _queue.shift();
    if (!item || !item.el || !item.el.isConnected) {
      _processing = false;
      _processQueue();
      return;
    }

    fetchImage(item.name).then(function(url) {
      if (url && item.el && item.el.isConnected) {
        var size = item.el.dataset.fiSize || 40;
        var cssClass = item.el.dataset.fiClass || 'fi-img';
        var emoji = item.el.dataset.fiEmoji || '🍽️';
        item.el.outerHTML = '<img src="' + url + '" class="' + cssClass +
          '" style="width:' + size + 'px;height:' + size + 'px;border-radius:6px;object-fit:cover" ' +
          'onerror="this.outerHTML=\'<span class=\\\'fi-emoji\\\'>' + emoji + '</span>\'">';
      }
      _processing = false;
      if (_queue.length > 0) {
        setTimeout(_processQueue, _batchDelay);
      }
    }).catch(function() {
      _processing = false;
      if (_queue.length > 0) {
        setTimeout(_processQueue, _batchDelay);
      }
    });
  }

  function _initObserver() {
    if (_observer) return;
    if (!('IntersectionObserver' in window)) {
      // Fallback: observe nothing, rely on scanLazy()
      return;
    }
    _observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          _observer.unobserve(el);
          var name = el.dataset.fiName;
          if (name) {
            _queue.push({ el: el, name: name });
            _processQueue();
          }
        }
      });
    }, { rootMargin: '200px' });
  }

  // ── DOM에서 lazy 요소를 스캔하고 Observer에 등록 ──────────────────────────
  function scanLazy(container) {
    _initObserver();
    var elements = (container || document).querySelectorAll('.fi-lazy');
    elements.forEach(function(el) {
      if (_observer) {
        _observer.observe(el);
      } else {
        // No IntersectionObserver — load immediately
        var name = el.dataset.fiName;
        if (name) {
          _queue.push({ el: el, name: name });
          _processQueue();
        }
      }
    });
  }

  // ── 렌더링 후 자동 스캔 (debounced) ───────────────────────────────────────
  var _scanTimer = null;
  function scheduleScan() {
    if (_scanTimer) clearTimeout(_scanTimer);
    _scanTimer = setTimeout(function() { scanLazy(); }, 100);
  }

  // ── 커스텀 조리방법에 이미지 자동 할당 ────────────────────────────────────
  function autoAssignMethodImage(methodObj) {
    if (methodObj.img) return; // 이미 이미지 있음
    var name = methodObj.label_en || methodObj.label;
    if (!name) return;
    fetchImage(name + ' cooking').then(function(url) {
      if (url) {
        methodObj.img = url;
        if (typeof renderMethods === 'function') renderMethods();
      }
    });
  }

  // ── 공개 API ──────────────────────────────────────────────────────────────
  return {
    getCachedUrl: getCachedUrl,
    fetchImage: fetchImage,
    createImgHtml: createImgHtml,
    scanLazy: scanLazy,
    scheduleScan: scheduleScan,
    autoAssignMethodImage: autoAssignMethodImage,
  };
})();
