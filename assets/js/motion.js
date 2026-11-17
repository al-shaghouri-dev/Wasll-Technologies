// Motion layer (GSAP + ScrollTrigger + Lenis): smooth scrolling, the pinned cinematic hero story, hero title entrance,
// scroll reveals, card highlights, page transitions and the lazy Three.js particles.
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
  const dir = () => (d.dir === 'rtl' ? -1 : 1);
  d.classList.add('m-on');

  // ---------- Smooth scrolling (Lenis) on GSAP's clock, so pinned and scrubbed scenes stay in step ----------
  // Touch keeps the device's native scrolling; site.js routes its programmatic scrolls through WASLMotion.lenis.
  if (window.Lenis) {
    const lenis = new window.Lenis({ lerp: .1, smoothWheel: true });
    lenis.on('scroll', ST.update);
    G.ticker.add(t => lenis.raf(t * 1000));
    G.ticker.lagSmoothing(0);
    window.WASLMotion.lenis = lenis;
    // The mobile menu locks the page (html.lock): pause smooth scrolling with it
    let locked = false;
    new MutationObserver(() => {
      const l = d.classList.contains('lock');
      if (l !== locked) { locked = l; l ? lenis.stop() : lenis.start(); }
    }).observe(d, { attributes: true, attributeFilter: ['class'] });
  }

  // ---------- Hero title: letter by letter (English), word by word (Arabic keeps its letters joined) ----------
  const heroH = $('#hero-h'), hero = $('.hero');
  const heroIntro = $$('.hero-copy .intro:not(.ln)');
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
      .fromTo(heroIntro, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: .08, clearProps: 'transform' }, small ? .35 : .55)
      .fromTo(stage, { opacity: 0, y: small ? 40 : 80, scale: .94 }, { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'expo.out', clearProps: 'transform' }, .25)
      .fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.out' }, .2);
  }
  const stage = $('.hero .stage'), glow = $('.cx-glow');
  pieces = splitHero();
  G.set(pieces, { opacity: 0 });
  G.set([...heroIntro, stage, glow].filter(Boolean), { opacity: 0 });

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

  // ---------- Cinematic hero: pinned, scrubbed both ways ----------
  // The phone opens into five service layers that fly out with rotation and depth, drift while the camera turns,
  // then return into the phone and the invitation appears. Positions are fractions of the viewport (x mirrors in RTL).
  let h3d = null;
  const LAYERS = small ? {
    //       x     y     z  rotY rotZ scale
    web:   [-.29, -.2,   0,   0,  -8, .4],
    apps:  [ .29, -.22,  0,   0,   8, .38],
    menus: [-.29,  .16,  0,   0,   6, .38],
    gifts: [ .29,  .18,  0,   0,  -6, .4],
    music: [ 0,   -.33,  0,   0,   0, .36]
  } : {
    web:   [-.3,  -.21, 140,  24,  -6, .56],
    apps:  [ .29, -.24,  20, -22,   6, .52],
    menus: [-.31,  .21, -40,  26,   4, .54],
    gifts: [ .27,  .1,  160, -28,  -4, .56],
    music: [ .13,  .33, -120, -14,  3, .48]
  };
  function cinematic() {
    const layers = $$('.cx-layer', hero), phone = $('.cx-phone', hero), cam = $('.cx-cam', hero);
    if (!layers.length || !phone) return;
    const [lnA, lnB] = $$('.h-hero > .ln', hero), foot = $('.cx-foot', hero), end = $('.cx-end', hero);
    const marq = $('.marquee', hero), glare = $('.cx-glare', hero), labels = $$('.cx-label', layers[0].parentNode);
    const P = el => LAYERS[el.dataset.l];
    // Which side of its layer each service name sits on: always the outer side
    const sides = () => layers.forEach(el => { el.dataset.side = P(el)[0] * dir() < 0 ? 'l' : 'r'; });
    sides();
    const W = () => innerWidth, H = () => innerHeight;
    const tl = G.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
      trigger: hero, start: 'top top', end: () => '+=' + H() * (small ? 1.8 : 3), pin: true, anticipatePin: 1,
      scrub: small ? .6 : 1, invalidateOnRefresh: true, onRefresh: sides,
      // The story ends with its own WhatsApp button: the floating buttons step aside while it plays
      onToggle: s => d.classList.toggle('hero-live', s.isActive),
      onUpdate: s => h3d && h3d.setProgress(s.progress) } });

    // 1. The title steps back and the phone turns to the light
    tl.to(foot, { autoAlpha: 0, y: 24, duration: .6 }, .2)
      .to(marq, { autoAlpha: 0, duration: .5 }, .2)
      .to(lnA, { x: () => -dir() * W() * (small ? 0 : .05), opacity: .12, duration: 1.4 }, .3)
      .to(lnB, { x: () => dir() * W() * (small ? 0 : .05), opacity: .12, duration: 1.4 }, .3)
      .to(phone, { rotationY: () => dir() * (small ? 0 : -16), rotationX: small ? 0 : 6, scale: small ? .72 : .86, duration: 2, ease: 'power2.inOut' }, .6)
      .to(glow, { scale: 1.25, duration: 2, ease: 'power2.inOut' }, .6)
      .fromTo(glare, { xPercent: -30 }, { xPercent: 30, duration: 8 }, .6);
    // 2. The layers leave the phone, each to its own place in the air
    layers.forEach((el, i) => {
      const at = .8 + i * .12;
      tl.fromTo(el, { x: 0, y: 0, z: -8, rotationY: 0, rotationZ: 0, scale: 1 },
        { x: () => P(el)[0] * W() * dir(), y: () => P(el)[1] * H(), z: P(el)[2], rotationY: () => P(el)[3] * dir(), rotationZ: () => P(el)[4] * dir(),
          scale: P(el)[5], duration: 2.2, ease: 'power3.inOut' }, at)
        .fromTo(el, { opacity: 0 }, { opacity: 1, duration: .35 }, at);
    });
    tl.fromTo(labels, { opacity: 0 }, { opacity: 1, duration: .6, stagger: .08 }, 2.8);
    // 3. They drift while the camera turns slowly around the phone
    tl.to(cam, { rotationY: () => dir() * (small ? 0 : 10), rotationX: small ? 0 : -4, duration: 2.6, ease: 'sine.inOut' }, 3.4);
    layers.forEach((el, i) => tl.to(el, { z: small ? '+=0' : '+=60', y: i % 2 ? '-=14' : '+=14', rotationZ: i % 2 ? '+=3' : '-=3', duration: 2.6, ease: 'sine.inOut' }, 3.4));
    // 4. Everything returns into the phone
    tl.to(labels, { opacity: 0, duration: .4 }, 6)
      .to(cam, { rotationY: 0, rotationX: 0, duration: 2, ease: 'power2.inOut' }, 6.2);
    layers.forEach((el, i) => {
      const at = 6.2 + (layers.length - 1 - i) * .08;
      tl.to(el, { x: 0, y: 0, z: -8, rotationY: 0, rotationZ: 0, scale: 1, duration: 2, ease: 'power3.inOut' }, at)
        .to(el, { opacity: 0, duration: .3 }, at + 1.7);
    });
    tl.to(phone, { rotationY: 0, rotationX: 0, scale: 1, duration: 2, ease: 'power2.inOut' }, 6.4)
      .to(glow, { scale: 1, duration: 2, ease: 'power2.inOut' }, 6.4)
    // 5. The title comes back and the invitation appears
      .to([lnA, lnB], { x: 0, opacity: 1, duration: 1 }, 7.8)
      .fromTo(end, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .8, ease: 'power3.out' }, 8.4)
      .to({}, { duration: .6 }); // a short hold on the finished phone before the page moves on
    document.addEventListener('wasl:lang', () => { sides(); });
  }
  if (hero) cinematic();
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
    // Home: only elements the pinned hero timeline does not drive (its overwrite would cut that timeline)
    let items = v === 'home' ? $$('.hero-copy > .pill-eb, .hero-copy > .h-hero, .hero .stage', root) :$$('.page-hero .ph-txt > *, .page-hero .ph-vis, .page-hero > .wrap:not(.ph-grid) > *', root);
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
    requestAnimationFrame(() => ST.refresh()); // re-mirrors the hero story for the new direction
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());

  // ---------- Three.js gold particles behind the phone: desktop pointers only, loaded after the page is idle ----------
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
