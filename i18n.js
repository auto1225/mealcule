/**
 * Mealcule i18n — Internationalization Engine
 * Supports: ko (Korean), en (English)
 * Usage:
 *   t('login.title')           → translated string
 *   setLang('en')              → switch language
 *   applyTranslations()        → update all [data-i18n] elements in DOM
 */

(function () {
  // ── State ───────────────────────────────────────────────────────────────
  const SUPPORTED = ['ko', 'en'];
  const DEFAULT_LANG = 'ko';
  const STORAGE_KEY = 'mealcule_lang';

  let _lang = localStorage.getItem(STORAGE_KEY) || detectBrowserLang();
  let _strings = {};

  // ── Public API ───────────────────────────────────────────────────────────
  window.I18n = {
    /** Translate a dot-notation key. Falls back to key itself. */
    t(key, vars) {
      const val = key.split('.').reduce((obj, k) => obj && obj[k], _strings);
      if (val == null) return key;
      if (!vars) return val;
      return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
    },

    /** Current language code */
    get lang() { return _lang; },

    /** Switch language. Persists to localStorage and re-renders DOM. */
    setLang(code) {
      if (!SUPPORTED.includes(code)) return;
      _lang = code;
      localStorage.setItem(STORAGE_KEY, code);
      document.documentElement.lang = code;
      loadStrings(code).then(() => applyTranslations());
    },

    /** Re-apply all [data-i18n] translations to the DOM. */
    applyTranslations,

    /** Get supported language list */
    getSupportedLangs: () => SUPPORTED.slice(),
  };

  // Shorthand alias used throughout app.js
  window.t = (key, vars) => window.I18n.t(key, vars);

  /**
   * Translate a data object's label based on current language.
   * Usage: tl(obj)          → obj.label_en (if en) or obj.label
   *        tl(obj, 'desc')  → obj.desc_en  (if en) or obj.desc
   *        tl(obj, 'en')    → obj.en (ingredient English name) or key fallback
   */
  window.tl = function(obj, field) {
    if (!obj) return '';
    if (field === 'en') {
      // For DB ingredients: return obj.en if English, else the Korean key is used as-is
      return (_lang === 'en' && obj.en) ? obj.en : null;
    }
    const base = field || 'label';
    return (_lang === 'en' && obj[base + '_en']) ? obj[base + '_en'] : obj[base] || '';
  };

  // ── Init ─────────────────────────────────────────────────────────────────
  loadStrings(_lang).then(() => {
    document.documentElement.lang = _lang;
    applyTranslations();
    injectLangSwitcher();
  });

  // ── Internal ──────────────────────────────────────────────────────────────
  function detectBrowserLang() {
    const nav = navigator.language || '';
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('en')) return 'en';
    return DEFAULT_LANG;
  }

  async function loadStrings(code) {
    try {
      const res = await fetch(`i18n/${code}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      _strings = await res.json();
    } catch (e) {
      console.warn(`[i18n] Failed to load ${code}.json, falling back to ${DEFAULT_LANG}`, e);
      if (code !== DEFAULT_LANG) {
        _lang = DEFAULT_LANG;
        await loadStrings(DEFAULT_LANG);
      }
    }
  }

  function applyTranslations() {
    // Text content: <span data-i18n="login.title"></span>
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = window.I18n.t(key);
    });

    // Placeholder: <input data-i18n-placeholder="ingredients.searchPlaceholder">
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = window.I18n.t(el.getAttribute('data-i18n-placeholder'));
    });

    // Title attribute: <button data-i18n-title="modal.close">
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = window.I18n.t(el.getAttribute('data-i18n-title'));
    });

    // aria-label: <div data-i18n-aria="nav.ingredients">
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', window.I18n.t(el.getAttribute('data-i18n-aria')));
    });

    // HTML content (use sparingly): <div data-i18n-html="methodology.banner">
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = window.I18n.t(el.getAttribute('data-i18n-html'));
    });

    // Page title
    const titleKey = 'app.title';
    const titleVal = window.I18n.t(titleKey);
    if (titleVal !== titleKey) document.title = titleVal;

    // Emit event for app.js to react if needed
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: _lang } }));
  }

  /** Add a small language switcher button to the header */
  function injectLangSwitcher() {
    if (document.getElementById('langSwitcher')) return;
    const btn = document.createElement('button');
    btn.id = 'langSwitcher';
    btn.className = 'lang-btn';
    btn.setAttribute('aria-label', 'Switch language');
    btn.title = 'Language / 언어';
    renderLangBtn(btn);
    btn.addEventListener('click', () => {
      const next = _lang === 'ko' ? 'en' : 'ko';
      window.I18n.setLang(next);
      renderLangBtn(btn);
    });
    const actions = document.querySelector('.header-right') || document.querySelector('.header-actions');
    if (actions) actions.insertBefore(btn, actions.firstChild);
  }

  function renderLangBtn(btn) {
    btn.textContent = _lang === 'ko' ? 'EN' : '한';
  }
})();
