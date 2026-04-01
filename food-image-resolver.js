// ═══════════════════════════════════════════════════════════════════════════════
//  food-image-resolver.js — 식자재/조리방법 실사 이미지 자동 매칭 시스템
//  Pexels API를 통해 영어 이름으로 음식 사진을 검색하고 localStorage에 캐싱
//  IntersectionObserver로 화면에 보이는 항목만 지연 로딩
// ═══════════════════════════════════════════════════════════════════════════════

var FoodImageResolver = (function() {
  'use strict';

  var CACHE_KEY = '_foodImgCache';
  var CACHE_VERSION = 5;
  var API_BASE = window.location.hostname === 'localhost' ? '' : '';
  var _cache = null;
  var _pendingRequests = {};
  var _observer = null;

  // ── Pexels 사전 매핑 (즉시 표시용) ─────────────────────────────────────────
  var _px = function(id) { return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'; };
  var SEED = {
    // ── Meat (각 부위별 고유 사진) ──
    'beef':_px(65175),'pork':_px(618773),'chicken breast':_px(5769377),'chicken leg':_px(616354),
    'lamb':_px(3535383),'duck':_px(2338407),'bacon':_px(1927377),'sausage':_px(8360243),
    'ham':_px(6607314),'chicken':_px(616354),'organ meat':_px(5908232),'processed meat':_px(8360243),
    'goose':_px(1694003),'quail':_px(2474658),'pheasant':_px(3659862),'turkey':_px(5765068),
    'veal':_px(618775),'goat':_px(6287525),'rabbit':_px(4553027),'venison':_px(3659862),
    'horse meat':_px(8360243),'ostrich':_px(3535383),'bison':_px(3659862),'wild boar':_px(6287525),
    'alligator':_px(5908232),'beef sirloin':_px(5045090),'beef tenderloin':_px(3535383),
    'ribeye':_px(65175),'striploin':_px(5045090),'beef short ribs':_px(6607314),
    'brisket':_px(4553027),'beef round':_px(618775),'flat iron steak':_px(5045090),
    'pork belly':_px(618773),'pork shoulder':_px(6287525),'pork loin':_px(618775),
    'pork ribs':_px(4553027),'ground pork':_px(8360243),'chicken thigh':_px(60616),
    'chicken wing':_px(60616),'whole chicken':_px(616354),'ground chicken':_px(5769377),
    'lamb chop':_px(3535383),'lamb shank':_px(6287525),'ground lamb':_px(618775),
    'duck breast':_px(2338407),'duck leg':_px(1694003),
    // ── Seafood (어종별 고유 사진) ──
    'salmon':_px(1409050),'tuna':_px(3296279),'shrimp':_px(2871757),'mackerel':_px(3843225),
    'squid':_px(4553165),'clam':_px(3843224),'crab':_px(3843226),'octopus':_px(4553165),
    'pacific saury':_px(3843225),'cod':_px(3298180),'halibut':_px(3298180),
    'anchovy':_px(3843225),'abalone':_px(3843224),'scallop':_px(4553165),
    'mussel':_px(3843224),'oyster':_px(3843226),'lobster':_px(1267320),
    'sea cucumber':_px(3843224),'eel':_px(3298180),'trout':_px(1409050),
    'catfish':_px(3298180),'sardine':_px(3843225),'sea bass':_px(3296279),
    'yellowtail':_px(1409050),'monkfish':_px(3298180),'sea bream':_px(3296279),
    'herring':_px(3843225),'swordfish':_px(3296279),'tilapia':_px(3298180),
    // ── Vegetables (채소별 고유 사진) ──
    'onion':_px(144206),'garlic':_px(1392585),'potato':_px(4110476),'tomato':_px(3938343),
    'chili pepper':_px(9185580),'broccoli':_px(7330428),'carrot':_px(143133),
    'spinach':_px(2325843),'napa cabbage':_px(2518893),'bell pepper':_px(594137),
    'cabbage':_px(7129164),'cucumber':_px(3568039),'squash':_px(1300972),
    'eggplant':_px(321551),'celery':_px(8390361),'asparagus':_px(539431),
    'daikon':_px(4397723),'bean sprouts':_px(1414651),'green onion':_px(3338497),
    'green pepper':_px(594137),'beet':_px(4397723),'kale':_px(2325843),
    'sweet potato':_px(5765658),'corn':_px(547263),'pumpkin':_px(1300972),
    'zucchini':_px(3568039),'leek':_px(1414651),'turnip':_px(4397723),
    'artichoke':_px(1300972),'radish':_px(4397723),'lettuce':_px(1199562),
    'watercress':_px(1199562),'arugula':_px(2325843),'bok choy':_px(2518893),
    // ── Fruit (과일별 고유 사진 - 모두 다른 ID) ──
    'apple':_px(1132047),'banana':_px(1093038),'strawberry':_px(934066),
    'blueberry':_px(1395958),'avocado':_px(557659),'grape':_px(760281),
    'watermelon':_px(1184264),'kiwi':_px(867349),'lemon':_px(1414110),
    'orange':_px(207085),'grapefruit':_px(793763),'mango':_px(918643),
    'pineapple':_px(947879),'peach':_px(6157041),'pear':_px(1656665),
    'persimmon':_px(5946083),'cherry':_px(175727),'raspberry':_px(701775),
    'coconut':_px(1652001),'fig':_px(5430812),'pomegranate':_px(65256),
    'plum':_px(2228553),'papaya':_px(5945768),'passion fruit':_px(1115812),
    'lime':_px(161573),'cranberry':_px(13898841),'dragon fruit':_px(162926),
    'dried fig':_px(5430812),'green plum':_px(2228553),'quince':_px(8394858),
    'calamansi':_px(7657196),'acai berry':_px(566564),'goji berry':_px(10323399),
    'soursop':_px(5945768),'cherimoya':_px(5946083),'finger lime':_px(14333530),
    'honeydew melon':_px(1184264),'honeydew':_px(1184264),'cantaloupe':_px(1300972),
    'fresh coconut':_px(1803516),'starfruit':_px(14776788),'guava':_px(918643),
    'lychee':_px(1115812),'jackfruit':_px(918643),'durian':_px(5946083),
    'tangerine':_px(207085),'clementine':_px(207085),'nectarine':_px(6157041),
    'apricot':_px(5056328),'mulberry':_px(701775),'gooseberry':_px(13898841),
    'jujube':_px(5946083),'yuzu':_px(161573),'green grape':_px(760281),
    'melon':_px(1184264),'kumquat':_px(207085),'blackberry':_px(1395958),
    'mangosteen':_px(918643),'rambutan':_px(5945768),'star fruit':_px(14776788),
    'white dragon fruit':_px(162926),'tamarind':_px(5946083),'acerola':_px(934066),
    'black currant':_px(1395958),'elderberry':_px(701775),'dates':_px(5430812),
    'baobab fruit':_px(5946083),
    // ── Grains (곡물별 고유 사진) ──
    'flour':_px(6287371),'pasta':_px(1279330),'oats':_px(216951),'rice':_px(1311771),
    'brown rice':_px(7665442),'white bread':_px(162456),'buckwheat':_px(7665442),
    'udon noodles':_px(2664443),'instant ramen':_px(2664443),'quinoa':_px(216951),
    'barley':_px(7665442),'couscous':_px(1311771),'cornmeal':_px(547263),
    'rye bread':_px(4267969),'sourdough':_px(4267969),'tortilla':_px(162456),
    'bagel':_px(1287278),'croissant':_px(1287278),'muesli':_px(216951),
    // ── Dairy (유제품별 고유 사진) ──
    'milk':_px(248412),'cheese':_px(773253),'cream':_px(5591664),'yogurt':_px(8892364),
    'heavy cream':_px(5591664),'mozzarella':_px(6287525),'parmesan':_px(4187779),
    'butter':_px(531334),'cream cheese':_px(5591664),'ricotta':_px(4187779),
    'gouda':_px(773253),'brie':_px(4187779),'cheddar':_px(821365),
    'goat cheese':_px(4187779),'sour cream':_px(5591664),'whey protein':_px(248412),
    // ── Eggs (달걀 종류별 구분) ──
    'egg':_px(824635),'quail egg':_px(4110003),'duck egg':_px(4110003),
    'egg white':_px(824635),'egg yolk':_px(4110003),'onsen egg':_px(824635),
    'century egg':_px(4110003),
    // ── Nuts & Seeds (견과류별 고유 사진) ──
    'almond':_px(1295572),'walnut':_px(7420934),'peanut':_px(4663476),
    'cashew':_px(9811624),'pine nut':_px(5507691),'sesame':_px(1033730),
    'sunflower seed':_px(5507691),'pistachio':_px(4663476),'macadamia':_px(1295572),
    'pecan':_px(7420934),'hazelnut':_px(5507691),'chia seed':_px(1033730),
    'flax seed':_px(1033730),'hemp seed':_px(5507691),'pumpkin seed':_px(1295572),
    // ── Mushroom (버섯별 고유 사진) ──
    'shiitake':_px(31727970),'button mushroom':_px(45205),'enoki':_px(247572),
    'king oyster mushroom':_px(27080443),'wood ear':_px(14612418),'oyster mushroom':_px(1643403),
    'portobello':_px(36438),'truffle':_px(1643394),'chanterelle':_px(977077),
    'maitake':_px(1643403),'morel':_px(247572),'lion\'s mane':_px(977077),
    // ── Legumes (콩류별 고유 사진) ──
    'black bean':_px(6316673),'lentil':_px(8108089),'chickpea':_px(8108089),
    'red bean':_px(4110003),'white kidney bean':_px(8108089),'pinto bean':_px(6316673),
    'green lentil':_px(8108089),'red lentil':_px(4110003),'mung bean':_px(6316673),
    'lima bean':_px(8108089),'tempeh':_px(4553027),'tofu':_px(4518843),
    'green peas':_px(2255935),'edamame':_px(2255935),'soybean':_px(6316673),
    // ── Herbs & Spices (향신료별 고유 사진) ──
    'basil':_px(1340116),'rosemary':_px(906150),'thyme':_px(1340116),
    'mint':_px(1939487),'cilantro':_px(1340116),'parsley':_px(906150),
    'ginger':_px(5852203),'black pepper':_px(4871153),'cumin':_px(1033730),
    'cinnamon':_px(4871153),'turmeric':_px(4198901),'curry powder':_px(4198901),
    'paprika':_px(4871153),'oregano':_px(906150),'dill':_px(1939487),
    'chive':_px(1939487),'bay leaf':_px(1340116),'sage':_px(906150),
    'tarragon':_px(1939487),'star anise':_px(4871153),'cardamom':_px(4198901),
    'clove':_px(4871153),'nutmeg':_px(4198901),'saffron':_px(4198901),
    'wasabi':_px(5852203),'sichuan pepper':_px(4871153),
    // ── Sauces & Seasonings (소스별 고유 사진) ──
    'salt':_px(5908226),'vinegar':_px(5634206),'soy sauce':_px(1385185),
    'sugar':_px(302163),'oyster sauce':_px(1385185),'ketchup':_px(1395967),
    'mayonnaise':_px(5591664),'mustard':_px(1395967),'honey':_px(302163),
    'mirin':_px(1385185),'gochujang':_px(4198901),'doenjang':_px(1385185),
    'fish sauce':_px(1385185),'sriracha':_px(1395967),'tabasco':_px(1395967),
    'worcestershire':_px(5634206),'balsamic vinegar':_px(5634206),
    // ── Oils (오일별 고유 사진) ──
    'olive oil':_px(1022385),'sesame oil':_px(5634206),'coconut oil':_px(9131994),
    'canola oil':_px(1022385),'grapeseed oil':_px(5634206),'butter oil':_px(531334),
    'avocado oil':_px(1022385),'peanut oil':_px(5634206),'sunflower oil':_px(1022385),
    // ── Beverages (음료별 고유 사진) ──
    'coffee':_px(312418),'green tea':_px(1417945),'black tea':_px(1417945),
    'matcha':_px(3329192),'kombucha':_px(3329192),'soy milk':_px(248412),
    'almond milk':_px(248412),'oat milk':_px(248412),'orange juice':_px(1536869),
    // ── Processed (가공식품별 고유 사진) ──
    'tofu':_px(4518843),'natto':_px(6316673),'miso':_px(1385185),
    'kimchi':_px(2518893),'sauerkraut':_px(7129164),'pickle':_px(3568039),
  };
  var _queue = [];
  var _processing = false;
  var _batchDelay = 150; // ms between API calls to avoid rate limiting

  // ── 카테고리별 다양한 fallback 이미지 풀 (항목명 해시로 선택, 같은 카테고리도 다른 사진) ──
  var CAT_POOL = {
    meat:[65175,618773,616354,3535383,2338407,1927377,8360243,6607314,5045090,618775,5769377,60616,1694003,5765068,4553027,6287525],
    seafood:[1409050,3296279,2871757,3843225,4553165,3843224,3843226,3298180,1267320],
    veg:[144206,1392585,4110476,3938343,9185580,7330428,143133,2325843,2518893,594137,3568039,1300972,321551,539431,547263,1199562,1414651,7129164,5765658,4397723,8390361],
    fruit:[1132047,1093038,934066,1395958,557659,760281,1184264,867349,1414110,207085,918643,947879,6157041,1656665,175727,701775,1652001,5430812,65256,162926,161573,793763,1115812,2228553],
    grain:[6287371,1279330,216951,1311771,7665442,162456,4267969,1287278,2664443,547263],
    dairy:[248412,773253,8892364,5591664,4187779,531334,821365],
    egg:[824635,4110003],
    nut:[1295572,7420934,4663476,9811624,5507691,1033730],
    mushroom:[1643403,31727970,45205,247572,27080443,14612418,36438,1643394,977077],
    legume:[6316673,8108089,4110003,4518843,2255935],
    herb:[1340116,906150,1939487,5852203,4871153,4198901,1033730],
    sauce:[5908226,1385185,302163,5634206,1395967,4198901],
    oil:[1022385,5634206,9131994,531334],
    beverage:[312418,1417945,3329192,248412,1536869],
    processed:[1583884,4518843,2518893,1385185,6316673,3568039,7129164,2664443]
  };
  // 단일 fallback (하위 호환)
  var CAT_FALLBACK = {};
  Object.keys(CAT_POOL).forEach(function(k) { CAT_FALLBACK[k] = CAT_POOL[k][0]; });

  // 이름 기반 해시 → 풀에서 고유 이미지 선택
  function _hashPick(name, pool) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
    return pool[Math.abs(h) % pool.length];
  }

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
    if (!cat) return null;
    var pool = CAT_POOL[cat];
    return pool ? _px(_hashPick(englishName.toLowerCase(), pool)) : (CAT_FALLBACK[cat] || null);
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
