// Site behaviour: routing between views, navigation, motion, demos and forms.
(function () {
  const C = window.WASL || {};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const t = k => window.WASLi18n.t(k);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const smooth = RM ? 'auto' : 'smooth';

  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('ready')));

  // ---------- Router ----------
  // "#/web" style hashes are pages; plain "#id" hashes scroll within the home page.
  // Old links (#/work, #/about, #/faq, #/contact) keep working.
  const VIEWS = { '/': 'home', '/web': 'web', '/menus': 'menus', '/gifts': 'gifts', '/privacy': 'privacy', '/terms': 'terms' };
  const LEGACY = { '/services': 'services', '/work': 'work', '/about': 'about', '/faq': 'faq', '/contact': 'contact' };
  const TITLES = { home: 'meta.title', web: 'title.web', menus: 'title.menus', gifts: 'title.gifts', privacy: 'title.privacy', terms: 'title.terms', notfound: 'title.notfound' };
  let current = null;

  function show(view, focus) {
    const changed = view !== current;
    $$('main > [data-view]').forEach(v => { v.hidden = v.dataset.view !== view; });
    current = view;
    document.title = t(TITLES[view]);
    document.documentElement.dataset.page = view;
    nav.classList.toggle('solid', view !== 'home');
    if (changed && focus) { const h = $(`[data-view="${view}"] h1`); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
    return changed;
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: smooth, block: 'start' }));
  }

  function route(e) {
    const h = decodeURIComponent(location.hash || '');
    if (!h || h === '#' || h === '#/') { const ch = show('home', !!e); if (ch || !e) scrollTo(0, 0); else scrollTo({ top: 0, behavior: smooth }); return; }
    if (h.startsWith('#/')) {
      const p = h.slice(1).replace(/\/+$/, '') || '/';
      if (VIEWS[p]) { show(VIEWS[p], !!e); scrollTo(0, 0); return; }
      if (LEGACY[p]) { show('home'); history.replaceState(null, '', '#' + LEGACY[p]); scrollToId(LEGACY[p]); return; }
      show('notfound', !!e); scrollTo(0, 0); return;
    }
    const id = h.slice(1), el = document.getElementById(id);
    if (!el) { show('home'); return; }
    const host = el.closest('[data-view]');
    show(host ? host.dataset.view : current || 'home');
    scrollToId(id);
  }

  // ---------- Navigation ----------
  const nav = $('#nav'), fab = $('.wa-fab'), top = $('.to-top');
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 24);
    if (fab) fab.classList.toggle('show', y > 280 || current !== 'home');
    if (top) top.classList.toggle('show', y > 900);
    progress();
  }

  const ddBtn = $('#svc-btn'), panel = $('#svc-panel');
  function setPanel(open) { panel.classList.toggle('open', open); ddBtn.setAttribute('aria-expanded', open); }
  if (ddBtn) {
    const dd = ddBtn.parentElement; let hoverT;
    ddBtn.addEventListener('click', () => setPanel(!panel.classList.contains('open')));
    if (fine) {
      dd.addEventListener('mouseenter', () => { clearTimeout(hoverT); setPanel(true); });
      dd.addEventListener('mouseleave', () => { hoverT = setTimeout(() => setPanel(false), 160); });
    }
    document.addEventListener('click', e => { if (!dd.contains(e.target)) setPanel(false); });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape' || !panel.classList.contains('open')) return;
      const inside = dd.contains(document.activeElement);
      setPanel(false); if (inside) ddBtn.focus();
    });
    panel.addEventListener('click', e => { if (e.target.closest('a')) setPanel(false); });
  }

  const burger = $('#burger'), mnav = $('#mnav'); let lastF;
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.menu'));
    mnav.classList.toggle('open', open);
    mnav.inert = !open;
    document.documentElement.classList.toggle('lock', open);
    if (open) { lastF = document.activeElement; $$('.m-l', mnav).forEach((a, i) => (a.style.transitionDelay = 50 + i * 40 + 'ms')); setTimeout(() => $('a', mnav).focus(), 80); }
    else if (lastF && document.body.contains(lastF)) lastF.focus();
  }
  if (burger) {
    mnav.inert = true;
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    mnav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => {
      if (!mnav.classList.contains('open')) return;
      if (e.key === 'Escape') return setMenu(false);
      if (e.key === 'Tab') {
        const f = [burger, ...$$('a,button', mnav)], a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
    matchMedia('(min-width: 1081px)').addEventListener('change', e => { if (e.matches && mnav.classList.contains('open')) setMenu(false); });
  }

  if ('IntersectionObserver' in window) {
    const links = $$('.nav-links a.nav-l[href^="#"]');
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && current === 'home') links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'work', 'about', 'faq', 'contact'].forEach(id => { const el = document.getElementById(id); el && spy.observe(el); });
  }

  // ---------- Motion ----------
  const rv = $$('.rv');
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  const stmt = $('#stmt-p');
  function splitWords() {
    if (!stmt) return;
    const words = stmt.textContent.trim().split(/\s+/);
    stmt.textContent = '';
    words.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; stmt.append(s); if (i < words.length - 1) stmt.append(' '); });
  }
  const proc = $('.proc'), steps = $$('.step');
  function progress() {
    if (current !== 'home') return;
    const vh = innerHeight;
    if (stmt) {
      const r = stmt.getBoundingClientRect(), ws = stmt.querySelectorAll('.w');
      const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
      const n = RM ? ws.length : Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle('lit', i < n));
    }
    if (proc) {
      const r = proc.getBoundingClientRect();
      const p = RM ? 1 : Math.min(1, Math.max(0, (vh * .7 - r.top) / (r.height * .9)));
      proc.style.setProperty('--p', p.toFixed(3));
      steps.forEach((s, i) => s.classList.toggle('lit', RM || p >= i / (steps.length - 1) - .02));
    }
  }

  if (fine && !RM) {
    const art = $('.hero-art'), hero = $('.hero');
    if (art) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        art.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
        art.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
      });
      hero.addEventListener('pointerleave', () => { art.style.setProperty('--px', 0); art.style.setProperty('--py', 0); });
    }
  }
  if ('IntersectionObserver' in window) {
    const hero = $('.hero');
    new IntersectionObserver(([e]) => hero.classList.toggle('paused', !e.isIntersecting)).observe(hero);
  }

  // ---------- QR code (byte mode, ECC L, versions 1–5, mask 0; verified to decode) ----------
  function qrSvg(text, label) {
    const d = [...new TextEncoder().encode(text)], cap = [19, 34, 55, 80, 108], en = [7, 10, 15, 20, 26]; let v = 0;
    while (v < 5 && d.length + 2 > cap[v]) v++; if (v > 4) return '';
    const V = v + 1, n = 17 + 4 * V, K = cap[v], E = en[v];
    const bits = [], P = (x, l) => { for (let i = l - 1; i >= 0; i--) bits.push((x >> i) & 1); };
    P(4, 4); P(d.length, 8); d.forEach(x => P(x, 8)); for (let i = 0; i < 4 && bits.length < K * 8; i++) bits.push(0); while (bits.length % 8) bits.push(0);
    const cw = []; for (let i = 0; i < bits.length; i += 8) cw.push(parseInt(bits.slice(i, i + 8).join(''), 2)); for (let p = 0; cw.length < K; p ^= 1) cw.push(p ? 0x11 : 0xEC);
    const ex = [], lg = []; let x = 1; for (let i = 0; i < 255; i++) { ex[i] = x; lg[x] = i; x <<= 1; if (x > 255) x ^= 0x11d; }
    const mul = (a, b) => (a && b ? ex[(lg[a] + lg[b]) % 255] : 0);
    let g = [1]; for (let i = 0; i < E; i++) { const ng = Array(g.length + 1).fill(0); g.forEach((c, j) => { ng[j] ^= c; ng[j + 1] ^= mul(c, ex[i]); }); g = ng; }
    const r = [...cw, ...Array(E).fill(0)]; for (let i = 0; i < K; i++) { const c = r[i]; if (c) g.forEach((q, j) => (r[i + j] ^= mul(c, q))); }
    const db = []; [...cw, ...r.slice(K)].forEach(c => { for (let i = 7; i >= 0; i--) db.push((c >> i) & 1); });
    const m = Array.from({ length: n }, () => Array(n).fill(0)), f = Array.from({ length: n }, () => Array(n).fill(false));
    const S = (X, Y, b) => { if (X >= 0 && Y >= 0 && X < n && Y < n) { m[Y][X] = b ? 1 : 0; f[Y][X] = true; } };
    [[0, 0], [n - 7, 0], [0, n - 7]].forEach(([a, b]) => { for (let dy = -1; dy <= 7; dy++) for (let dx = -1; dx <= 7; dx++) { const inn = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6; S(a + dx, b + dy, inn && (dx == 0 || dx == 6 || dy == 0 || dy == 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4))); } });
    for (let i = 8; i < n - 8; i++) { S(i, 6, i % 2 == 0); S(6, i, i % 2 == 0); }
    if (V > 1) { const c = n - 7; for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) S(c + dx, c + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1); }
    let rem = 8; for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >> 9) * 0x537);
    const fm = ((8 << 10) | (rem & 0x3ff)) ^ 0x5412, B = i => (fm >> i) & 1;
    for (let i = 0; i <= 5; i++) S(8, i, B(i)); S(8, 7, B(6)); S(8, 8, B(7)); S(7, 8, B(8)); for (let i = 9; i < 15; i++) S(14 - i, 8, B(i));
    for (let i = 0; i < 8; i++) S(n - 1 - i, 8, B(i)); for (let i = 8; i < 15; i++) S(8, n - 15 + i, B(i)); S(8, n - 8, 1);
    let k = 0, up = true;
    for (let X = n - 1; X > 0; X -= 2) { if (X == 6) X--; for (let i = 0; i < n; i++) { const Y = up ? n - 1 - i : i; for (let dx = 0; dx < 2; dx++) { const Cx = X - dx; if (f[Y][Cx]) continue; let b = k < db.length ? db[k++] : 0; if ((Cx + Y) % 2 == 0) b ^= 1; m[Y][Cx] = b; } } up = !up; }
    let s = ''; for (let y = 0; y < n; y++) for (let X = 0; X < n; X++) if (m[y][X]) s += `M${X + 4} ${y + 4}h1v1h-1z`;
    return `<svg viewBox="0 0 ${n + 8} ${n + 8}" role="img" aria-label="${label}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${s}" fill="#111"/></svg>`;
  }
  const base = (C.siteUrl || location.href.split('#')[0].split('?')[0]).replace(/\/?$/, '/');
  const qrUrl = base + '#/menus';
  function renderQr() {
    $$('[data-qr]').forEach(el => { el.innerHTML = qrSvg(qrUrl, t('mp.qr')); });
    $$('[data-qr-url]').forEach(el => { el.textContent = qrUrl.replace(/^https?:\/\//, ''); });
  }

  // ---------- Menu demo ----------
  const DISHES = [
    ['Starters', 'Lentil Soup', 'شوربة عدس', 12, ['#f3c27a', '#b46a28', '#3a220c']],
    ['Starters', 'Fattoush', 'فتوش', 14, ['#d7e3a7', '#5d7a2a', '#1b250c']],
    ['Mains', 'Grilled Chicken Plate', 'طبق دجاج مشوي', 32, ['#f1d390', '#a6672a', '#3a220c']],
    ['Mains', 'Beef Kebab', 'كباب لحم', 38, ['#f3c6a0', '#b0552a', '#3a160c']],
    ['Mains', 'Veggie Rice Bowl', 'طبق أرز بالخضار', 26, ['#f4e2a8', '#9c8a3a', '#2a250c']],
    ['Desserts', 'Date Pudding', 'بودينغ التمر', 16, ['#d9a77a', '#7a4422', '#2a140a']],
    ['Desserts', 'Kunafa Bite', 'لقمة كنافة', 18, ['#f7c96a', '#c5761e', '#40200a']],
    ['Drinks', 'Mint Lemonade', 'ليموناضة بالنعناع', 10, ['#e7f2b2', '#79a53a', '#1f2a0c']],
    ['Drinks', 'Arabic Coffee', 'قهوة عربية', 8, ['#d8b98a', '#6a4a22', '#1f140a']]
  ];
  let mcat = 'All';
  const mq = $('#mq'), mc = $('#mc'), ml = $('#ml'), me = $('#me');
  function renderMenu() {
    if (!ml) return;
    const lang = window.WASLi18n.lang, q = mq.value.trim().toLowerCase();
    const cats = ['All', ...new Set(DISHES.map(d => d[0]))];
    mc.innerHTML = '';
    cats.forEach(c => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.setAttribute('aria-pressed', c === mcat);
      b.textContent = c === 'All' ? t('mp.all') : t('mp.c.' + c);
      b.addEventListener('click', () => { mcat = c; renderMenu(); });
      mc.append(b);
    });
    const list = DISHES.filter(d => (mcat === 'All' || d[0] === mcat) && (d[1] + ' ' + d[2]).toLowerCase().includes(q));
    ml.innerHTML = '';
    list.forEach(d => {
      const el = document.createElement('div'); el.className = 'dish-c'; el.setAttribute('role', 'listitem');
      el.innerHTML = '<u aria-hidden="true"></u><div><small></small><b></b><em><span></span></em></div>';
      const u = el.querySelector('u'); u.style.setProperty('--c1', d[4][0]); u.style.setProperty('--c2', d[4][1]); u.style.setProperty('--c3', d[4][2]);
      el.querySelector('small').textContent = t('mp.c.' + d[0]);
      el.querySelector('b').textContent = lang === 'ar' ? d[2] : d[1];
      el.querySelector('em').prepend(String(d[3]));
      el.querySelector('em span').textContent = '(' + t('mp.sample') + ')';
      ml.append(el);
    });
    me.hidden = list.length > 0;
  }
  if (mq) mq.addEventListener('input', renderMenu);

  // ---------- Gift demo ----------
  let theme = 'burgundy';
  const gn = $('#gn'), gm = $('#gm'), gp = $('#gp');
  function renderGift() {
    if (!gp) return;
    gp.className = 'gift-prev t-' + theme;
    $('#gpn').textContent = gn.value.trim() || t('gp.def.name');
    $('#gpm').textContent = gm.value.trim() || t('gp.def.msg');
    $$('#gt .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === theme));
  }
  if (gp) {
    $$('#gt .chip').forEach(b => b.addEventListener('click', () => { theme = b.dataset.t; renderGift(); }));
    gn.addEventListener('input', renderGift); gm.addEventListener('input', renderGift);
    $('#gr').addEventListener('click', () => { gn.value = ''; gm.value = ''; theme = 'burgundy'; renderGift(); gn.focus(); });
  }

  // ---------- Forms (Formspree; success only on HTTP 2xx, typed data kept on failure) ----------
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, PHONE = /^\+?[0-9\s\-()]{7,18}$/;
  $$('form[data-form]').forEach(form => {
    const msg = $('.msg', form), btn = $('button[type=submit]', form);
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form._busy) return;
      msg.className = 'msg show';
      $$('[aria-invalid]', form).forEach(i => i.removeAttribute('aria-invalid'));
      const fail = (el, k) => { msg.className = 'msg show err'; msg.textContent = t(k); if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } };
      const miss = $$('[required]', form).find(i => !i.value.trim());
      if (miss) return fail(miss, 'f.err.req');
      const bad = $$('input[type=email]', form).find(i => i.value.trim() && !EMAIL.test(i.value.trim()));
      if (bad) return fail(bad, 'f.err.email');
      const badP = $$('input[type=tel]', form).find(i => i.value.trim() && !PHONE.test(i.value.trim()));
      if (badP) return fail(badP, 'f.err.phone');
      if (form.elements._gotcha && form.elements._gotcha.value) return;
      if (!C.formEndpoint) return fail(null, 'f.fail');
      const data = {};
      $$('input,select,textarea', form).forEach(i => { if (i.name && i.name !== '_gotcha') data[i.name] = i.value.trim().slice(0, 2000); });
      data._form = form.dataset.form; data._lang = window.WASLi18n.lang; data._subject = 'WASL website — ' + form.dataset.form;
      form._busy = true; btn.disabled = true;
      const label = btn.innerHTML; btn.innerHTML = '<span class="spin" aria-hidden="true"></span><span></span>'; btn.lastChild.textContent = t('f.sending');
      msg.textContent = t('f.sending');
      try {
        const r = await fetch(C.formEndpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(r.status);
        msg.className = 'msg show ok'; msg.textContent = t('f.ok'); form.reset();
      } catch (x) { fail(null, 'f.fail'); }
      finally { form._busy = false; btn.disabled = false; btn.innerHTML = label; }
    });
  });

  // ---------- Content from config ----------
  $$('[data-mail]').forEach(a => { if (C.email) { a.href = 'mailto:' + C.email; if (a.hasAttribute('data-mail-text')) a.textContent = C.email; } });
  const soc = $('#soc');
  if (soc) Object.entries(C.social || {}).filter(([, v]) => /^https:\/\//.test(v || '')).forEach(([k, v]) => {
    const li = document.createElement('li'), a = document.createElement('a');
    a.href = v; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = k[0].toUpperCase() + k.slice(1);
    li.append(a); soc.append(li);
  });
  // Stats appear only when real numbers are set in config.js (demo values are never published).
  function renderStats() {
    const box = $('#stats'); if (!box) return;
    const items = ((C.stats || {}).items || []).filter(i => Number(i.value) > 0);
    box.hidden = !items.length; box.innerHTML = '';
    items.forEach(i => { const d = document.createElement('div'); d.innerHTML = '<b></b><span class="small"></span>'; d.querySelector('b').textContent = i.value; d.querySelector('span').textContent = window.WASLi18n.lang === 'ar' ? i.ar : i.en; box.append(d); });
  }
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  if (top) top.addEventListener('click', () => { scrollTo({ top: 0, behavior: smooth }); const s = $('.skip'); if (s) s.focus({ preventScroll: true }); });

  // If an image file is ever missing, load the embedded copies on demand.
  function imgFail(img) {
    if (img._fb || !img.dataset.fb) return; img._fb = 1;
    const use = () => { const s = (window.WASL_IMGFB || {})[img.dataset.fb]; if (s) img.src = s; };
    if (window.WASL_IMGFB) return use();
    const sc = document.createElement('script'); sc.src = 'assets/js/img-fallback.js'; sc.onload = use; document.head.append(sc);
  }
  document.addEventListener('error', e => { if (e.target.tagName === 'IMG') imgFail(e.target); }, true);
  $$('img[data-fb]').forEach(i => { if (i.complete && !i.naturalWidth) imgFail(i); });

  function relang() {
    splitWords(); renderMenu(); renderGift(); renderQr(); renderStats();
    if (current) document.title = t(TITLES[current]);
    if (burger) burger.setAttribute('aria-label', t(burger.getAttribute('aria-expanded') === 'true' ? 'nav.close' : 'nav.menu'));
    progress();
  }
  document.addEventListener('wasl:lang', relang);
  addEventListener('hashchange', route);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', progress, { passive: true });
  route();
  relang();
  onScroll();
})();
