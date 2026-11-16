// Motion layer (GSAP + ScrollTrigger): hero title entrance, scroll reveals, card highlights,
// page transitions and the lazy Three.js hero background.
// Progressive: with reduced motion, or if GSAP fails to load, nothing here runs and site.js keeps its simpler motion.
// Loads after i18n.js (text is in place) and before site.js (which reads window.WASLMotion and fires `wasl:view`).
(function () {
  const G = window.gsap, ST = window.ScrollTrigger;
  if (!G || !ST || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  G.registerPlugin(ST);
  window.WASLMotion = { on: true };

  const d = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const small = !fine || matchMedia('(max-width: 860px)').matches; // phones/tablets: shorter, lighter motion
  const view = v => $(`main > [data-view="${v}"]`);
  d.classList.add('m-on');

  // ---------- Hero title: letter by letter (English), word by word (Arabic keeps its letters joined) ----------
  const heroH = $('#hero-h'), hero = $('.hero');
  const heroIntro = $$('.hero-copy > .intro');
  let pieces = [], introPlayed = false;
  function splitHero() {
    if (!heroH) return [];
    const parts = $$('[data-i18n="hero.t1"], [data-i18n="hero.t2"]', heroH), ar = d.lang === 'ar', out = [];
    heroH.setAttribute('aria-label', parts.map(p => p.textContent.trim()).join(' '));
    parts.forEach(p => {
      const text = p.textContent;
      p.textContent = '';
      text.split(/(\s+)/).forEach(w => {
        if (!w) return;
        if (/^\s+$/.test(w)) { p.append(' '); return; }
        const ws = document.createElement('span');
        ws.className = 'ht-w'; ws.setAttribute('aria-hidden', 'true');
        if (ar) { ws.textContent = w; ws.classList.add('ht-c'); out.push(ws); }
        else [...w].forEach(ch => { const c = document.createElement('span'); c.className = 'ht-c'; c.textContent = ch; ws.append(c); out.push(c); });
        p.append(ws);
      });
    });
    heroH.classList.add('ht-split');
    return out;
  }
  function playIntro() {
    introPlayed = true;
    const ar = d.lang === 'ar';
    G.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(pieces, { opacity: 0, yPercent: 60, rotateX: small ? 0 : -55, transformPerspective: 700, filter: small ? 'none' : 'blur(10px)' },
        { opacity: 1, yPercent: 0, rotateX: 0, filter: 'blur(0px)', duration: small ? .8 : 1.15, stagger: ar ? .09 : (small ? .02 : .032), clearProps: 'filter,transform' }, .15)
      .fromTo(heroIntro.filter(e => e !== heroH), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08, clearProps: 'transform' }, small ? .35 : .55);
  }
  pieces = splitHero();
  G.set(pieces, { opacity: 0 });
  G.set(heroIntro.filter(e => e !== heroH), { opacity: 0 });

  // ---------- Scroll reveals (.rv, .rise), set up per view the first time it is shown ----------
  // Opacity only (never visibility), so content stays reachable by keyboard before it is revealed.
  // Hidden views measure as zero height, so their triggers would fire at once: only the shown view's triggers stay enabled.
  const triggers = {};
  function reveal(batch) {
    const heads = batch.filter(e => e.matches('.h-sec')), rest = batch.filter(e => !e.matches('.h-sec'));
    batch.forEach(e => { e.style.transition = 'none'; e.classList.add('in'); });
    const done = () => batch.forEach(e => { G.set(e, { clearProps: 'opacity,transform,clipPath' }); e.style.transition = ''; });
    const dist = small ? .55 : 1;
    if (rest.length) G.fromTo(rest,
      { opacity: 0, y: (i, e) => (e.classList.contains('rise') ? 60 : 32) * dist, scale: (i, e) => e.classList.contains('rise') ? .97 : 1 },
      { opacity: 1, y: 0, scale: 1, duration: small ? .8 : 1.15, ease: 'power3.out', stagger: .09, overwrite: true, onComplete: heads.length ? null : done });
    if (heads.length) G.fromTo(heads,
      { opacity: 0, y: 40 * dist, clipPath: 'inset(0% 0% 100% 0%)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0% -20% 0%)', duration: small ? .9 : 1.3, ease: 'expo.out', stagger: .1, overwrite: true, onComplete: done });
  }
  function setupReveals(v) {
    Object.keys(triggers).forEach(k => { if (k !== v) triggers[k].forEach(t => t.disable(false)); });
    if (triggers[v]) { triggers[v].forEach(t => t.enable(false, false)); return; }
    const els = $$('.rv, .rise', view(v)).filter(e => !e.classList.contains('in'));
    triggers[v] = els.length ? ST.batch(els, { start: 'top 88%', once: true, onEnter: reveal, interval: .08 }) : [];
  }

  // ---------- Hero scroll exit + parallax (desktop) ----------
  let h3d = null;
  if (!small && hero) {
    G.to('.hero-copy', { yPercent: -14, opacity: .2, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .5, onUpdate: s => h3d && h3d.setScroll(s.progress) } });
    G.to('.stage', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .5 } });
  }
  // Photo plates: the photo settles from a slight zoom while its section crosses the screen
  if (!small) $$('.plate img').forEach(img => G.fromTo(img, { scale: 1.14, yPercent: -3 }, { scale: 1.02, yPercent: 3, ease: 'none',
    scrollTrigger: { trigger: img.closest('.scene, .page-hero'), start: 'top bottom', end: 'bottom top', scrub: .6 } }));

  // ---------- Hover: magnetic buttons and a gold edge light that follows the pointer ----------
  if (fine) {
    $$('.btn-lg, .s-acts .btn-light').forEach(b => b.classList.add('magnetic')); // site.js drives .magnetic
    $$('.scene-txt, .cap, .work, .tile3, .founders, .genre').forEach(el => {
      el.classList.add('spot');
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      });
    });
  }

  // ---------- Page transitions ----------
  const veil = document.createElement('div');
  veil.className = 'm-veil'; veil.setAttribute('aria-hidden', 'true'); veil.innerHTML = '<i></i>';
  document.body.append(veil);
  function enter(v) {
    const root = view(v);
    if (!root) return;
    let items = v === 'home' ? $$('.hero-copy > *, .stage', root) : $$('.page-hero .ph-txt > *, .page-hero .ph-vis, .page-hero > .wrap:not(.ph-grid) > *', root);
    if (!items.length) items = $$('section > .wrap > *', root).slice(0, 6);
    if (!small) {
      const dir = d.dir === 'rtl' ? -1 : 1;
      G.fromTo(veil, { xPercent: 0, opacity: 1 }, { xPercent: 100 * dir, duration: .8, ease: 'power3.inOut', clearProps: 'transform,opacity' });
    }
    // Opacity, not visibility: the page's h1 has just received focus and must keep it.
    G.fromTo(items, { opacity: 0, y: small ? 16 : 30 }, { opacity: 1, y: 0, duration: small ? .6 : .95, ease: 'power3.out', stagger: .07, delay: small ? 0 : .22, overwrite: true, clearProps: 'opacity,transform' });
  }

  let first = true;
  document.addEventListener('wasl:view', e => {
    const { view: v, changed } = e.detail;
    if (v === 'home' && !introPlayed) playIntro();
    else if (changed && !first) enter(v);
    first = false;
    if (changed) requestAnimationFrame(() => { setupReveals(v); ST.refresh(); });
  });
  document.addEventListener('wasl:lang', () => {
    const was = pieces;
    pieces = splitHero();
    if (introPlayed && was.length) G.fromTo(pieces, { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: .7, ease: 'power3.out', stagger: d.lang === 'ar' ? .06 : .015, clearProps: 'transform' });
    else G.set(pieces, { opacity: introPlayed ? 1 : 0 });
    if (h3d) h3d.setDir(d.dir);
    requestAnimationFrame(() => ST.refresh());
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());

  // ---------- Three.js hero background: desktop pointers only, loaded after the page is idle ----------
  const conn = navigator.connection;
  if (!small && hero && !(conn && conn.saveData)) {
    const load = () => import('./hero3d.js').then(m => {
      h3d = m.mount(hero, $('.hero-bg'));
      if (h3d) d.classList.add('has-3d');
    }).catch(() => {});
    const idle = () => (window.requestIdleCallback ? requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 600));
    if (document.readyState === 'complete') idle(); else addEventListener('load', idle, { once: true });
  }
})();
