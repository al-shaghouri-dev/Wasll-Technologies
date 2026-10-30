// Homepage interactions: navigation, motion, scroll-linked "connection" line, contact form.
(function () {
  const C = window.WASL || {};
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const t = k => window.WASLi18n.t(k);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Intro sequence
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('ready')));

  // ---------- Navigation ----------
  const nav = $('#nav'), fab = $('.wa-fab'), top = $('.to-top');
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('scrolled', y > 24);
    if (fab) fab.classList.toggle('show', y > 280);
    if (top) top.classList.toggle('show', y > 900);
    progress();
  }

  // Services panel (click + hover on desktop)
  const ddBtn = $('#svc-btn'), panel = $('#svc-panel');
  function setPanel(open) { panel.classList.toggle('open', open); ddBtn.setAttribute('aria-expanded', open); }
  if (ddBtn) {
    ddBtn.addEventListener('click', () => setPanel(!panel.classList.contains('open')));
    const dd = ddBtn.parentElement; let hoverT;
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

  // Mobile menu
  const burger = $('#burger'), mnav = $('#mnav'); let lastF;
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.menu'));
    mnav.classList.toggle('open', open);
    mnav.setAttribute('aria-hidden', !open);
    mnav.inert = !open;
    document.documentElement.classList.toggle('lock', open);
    if (open) { lastF = document.activeElement; $$('.m-l', mnav).forEach((a, i) => (a.style.transitionDelay = 60 + i * 45 + 'ms')); setTimeout(() => $('a', mnav).focus(), 80); }
    else if (lastF) lastF.focus();
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

  // Active section in nav
  if ('IntersectionObserver' in window) {
    const links = $$('.nav-links a.nav-l[href^="#"]');
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['services', 'work', 'about', 'faq', 'contact'].forEach(id => { const el = document.getElementById(id); el && spy.observe(el); });
  }

  // ---------- Reveal on scroll ----------
  const rv = $$('.rv');
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  // ---------- Statement: words light up as you scroll ----------
  const stmt = $('#stmt-p');
  function splitWords() {
    if (!stmt) return;
    const words = stmt.textContent.trim().split(/\s+/);
    stmt.innerHTML = '';
    words.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; stmt.append(s); if (i < words.length - 1) stmt.append(' '); });
  }

  // ---------- Process rail ----------
  const proc = $('.proc'), steps = $$('.step');
  function progress() {
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
      steps.forEach((s, i) => s.classList.toggle('lit', p >= i / (steps.length - 1) - .02 || RM));
    }
  }

  // ---------- Pointer effects (desktop only) ----------
  if (fine && !RM) {
    const art = $('.hero-art');
    if (art) {
      const hero = $('.hero');
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        art.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
        art.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
      });
      hero.addEventListener('pointerleave', () => { art.style.setProperty('--px', 0); art.style.setProperty('--py', 0); });
    }
    $$('.card').forEach(c => c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
    }));
    $$('.magnetic').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  // Pause ambient hero animation while off-screen
  if ('IntersectionObserver' in window) {
    const hero = $('.hero');
    new IntersectionObserver(([e]) => hero.classList.toggle('paused', !e.isIntersecting)).observe(hero);
  }

  // ---------- Misc ----------
  if (top) top.addEventListener('click', () => scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }));
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  $$('[data-mail]').forEach(a => { if (C.email) { a.href = 'mailto:' + C.email; if (a.hasAttribute('data-mail-text')) a.textContent = C.email; } });
  const soc = $('#soc');
  if (soc) Object.entries(C.social || {}).filter(([, v]) => v).forEach(([k, v]) => {
    const li = document.createElement('li'), a = document.createElement('a');
    a.href = v; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = k[0].toUpperCase() + k.slice(1);
    li.append(a); soc.append(li);
  });

  // ---------- Contact form (Formspree; same behaviour as the previous site) ----------
  const form = $('#project-form');
  if (form) {
    const msg = $('.msg', form), btn = $('button[type=submit]', form);
    form.addEventListener('submit', async e => {
      e.preventDefault();
      msg.className = 'msg show';
      $$('[aria-invalid]', form).forEach(i => i.removeAttribute('aria-invalid'));
      const fail = (el, k) => { msg.classList.add('err'); msg.textContent = t(k); if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } };
      const miss = $$('[required]', form).find(i => !i.value.trim());
      if (miss) return fail(miss, 'f.req');
      const em = form.elements.email, ph = form.elements.phone;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())) return fail(em, 'f.bademail');
      if (ph.value.trim() && !/^\+?[0-9\s\-()]{7,18}$/.test(ph.value.trim())) return fail(ph, 'f.badphone');
      if (form.elements._gotcha.value) return;
      const data = {};
      $$('input,select,textarea', form).forEach(i => { if (i.name && i.name !== '_gotcha') data[i.name] = i.value.trim().slice(0, 2000); });
      data._form = 'Project request'; data._lang = window.WASLi18n.lang; data._subject = 'WASL website inquiry';
      if (!C.formEndpoint) return fail(null, 'f.fail');
      if (form._busy) return; form._busy = true;
      const label = btn.textContent; btn.disabled = true; btn.textContent = t('f.sending'); msg.textContent = t('f.sending');
      try {
        const r = await fetch(C.formEndpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw 0;
        msg.textContent = t('f.ok'); form.reset();
      } catch (x) { fail(null, 'f.fail'); }
      finally { form._busy = false; btn.disabled = false; btn.textContent = label; }
    });
  }

  document.addEventListener('wasl:lang', () => { splitWords(); progress(); if (burger) burger.setAttribute('aria-label', t(burger.getAttribute('aria-expanded') === 'true' ? 'nav.close' : 'nav.menu')); });
  splitWords();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', progress, { passive: true });
  onScroll();
})();
