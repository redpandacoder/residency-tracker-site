(function () {
  var KEY = 'crt-site-lang';

  function valid(lang) {
    return lang === 'en' || lang === 'zh';
  }

  function getPreference() {
    try {
      var s = localStorage.getItem(KEY);
      if (valid(s)) return s;
    } catch (e) {}
    return 'en';
  }

  function applyMeta(lang) {
    var body = document.body;
    if (!body) return;
    var titleEn = body.getAttribute('data-title-en');
    var titleZh = body.getAttribute('data-title-zh');
    if (titleEn && titleZh) {
      document.title = lang === 'zh' ? titleZh : titleEn;
    }
    var descEl = document.getElementById('meta-desc');
    var descEn = body.getAttribute('data-desc-en');
    var descZh = body.getAttribute('data-desc-zh');
    if (descEl && descEn && descZh) {
      descEl.setAttribute('content', lang === 'zh' ? descZh : descEn);
    }
  }

  function setLang(lang) {
    if (!valid(lang)) return;
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';

    document.querySelectorAll('.lang-panel').forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-lang') !== lang;
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
    });

    applyMeta(lang);
  }

  function init() {
    setLang(getPreference());
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
