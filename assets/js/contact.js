// Country-aware WhatsApp contact.
// Canada → the Canadian line only, opened directly. Syria and everywhere else → chooser with both lines.
// Order of sources: cached country → api/contact (Vercel Edge) → browser time zone → "unknown" (both lines).
// The Syrian number is never part of the page or config.js; it is requested only once the visitor is known
// not to be Canadian.
(function () {
  const C = window.WASL || {};
  const CA = String((C.whatsappNumbers || {}).CA || '').replace(/\D/g, '');
  const KEY = 'wasl.geo', TTL = 864e5, API_TIMEOUT = 2500;
  const CA_TZ = /^America\/(Toronto|Montreal|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Dawson|Dawson_Creek|Fort_Nelson|Creston|Yellowknife|Inuvik|Cambridge_Bay|Rankin_Inlet|Resolute|Iqaluit|Swift_Current|Atikokan|Blanc-Sablon|Nipigon|Thunder_Bay|Rainy_River|Pangnirtung)$/;

  const store = {
    get() { try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && Date.now() - v.t < TTL ? v.c : null; } catch (e) { return null; } },
    set(c) { try { localStorage.setItem(KEY, JSON.stringify({ c, t: Date.now() })); } catch (e) {} }
  };

  function tzCountry() {
    try {
      const z = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (CA_TZ.test(z)) return 'CA';
      if (z === 'Asia/Damascus') return 'SY';
    } catch (e) {}
    return null;
  }

  function fetchJson(url, ms) {
    const ctl = 'AbortController' in window ? new AbortController() : null;
    const timer = ctl && setTimeout(() => ctl.abort(), ms);
    return fetch(url, { signal: ctl && ctl.signal, credentials: 'omit', cache: 'no-store' })
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .finally(() => timer && clearTimeout(timer));
  }

  function apiUrl() {
    // On Vercel (production or preview) use the deployment's own function; elsewhere (GitHub Pages) call production.
    if (/\.vercel\.app$/.test(location.hostname)) return '/api/contact';
    return C.contactApi || '';
  }

  function staticSyrian() {
    return fetchJson('assets/data/contact-intl.json', 4000)
      .then(j => String(((j && j.whatsapp) || {}).SY || '').replace(/\D/g, ''))
      .catch(() => '');
  }

  function channels(country, sy) {
    const list = [];
    if (CA) list.push({ id: 'CA', number: CA });
    if (country !== 'CA' && sy) list.push({ id: 'SY', number: sy });
    return { country: country || null, channels: list };
  }

  async function resolve() {
    const cached = store.get();
    if (cached === 'CA') return channels('CA');
    let country = null, sy = '';
    const url = apiUrl();
    if (url) {
      try {
        const j = await fetchJson(url, API_TIMEOUT);
        country = j && /^[A-Z]{2}$/.test(j.country || '') ? j.country : null;
        sy = String(((j && j.whatsapp) || {}).SY || '').replace(/\D/g, '');
      } catch (e) {}
    }
    if (!country) country = cached || tzCountry();
    if (country) store.set(country);
    if (country === 'CA') return channels('CA');
    if (!sy) sy = await staticSyrian();
    return channels(country, sy);
  }

  const ready = resolve();

  // ---------- presentation ----------
  // Display format: +1 613 305 0377 for North America, +CCC XXX XXX XXX otherwise.
  const fmt = n => n.length === 11 && n[0] === '1' ? `+1 ${n.slice(1, 4)} ${n.slice(4, 7)} ${n.slice(7)}`
    : n.length === 12 ? `+${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}` : '+' + n;
  const t = k => (window.WASLi18n ? window.WASLi18n.t(k) : k);
  const link = n => `https://wa.me/${n}?text=${encodeURIComponent(t('wa.message'))}`;
  const flag = { CA: '🇨🇦', SY: '🇸🇾' };
  let state = null;

  function renderLists() {
    document.querySelectorAll('[data-wa-list]').forEach(el => {
      el.innerHTML = '';
      if (!state) return;
      state.channels.forEach(c => {
        const a = document.createElement('a');
        a.className = 'wa-line';
        a.href = link(c.number); a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.innerHTML = `<span class="wa-flag" aria-hidden="true">${flag[c.id]}</span><span class="wa-meta"><b></b><span dir="ltr"></span></span><svg class="go" aria-hidden="true"><use href="#i-arrow"/></svg>`;
        a.querySelector('b').textContent = t('wa.country.' + c.id);
        a.querySelector('[dir]').textContent = fmt(c.number);
        el.append(a);
      });
    });
    document.querySelectorAll('[data-wa]').forEach(a => {
      if (state && state.channels.length === 1) {
        a.href = link(state.channels[0].number); a.target = '_blank'; a.rel = 'noopener noreferrer';
      } else { a.setAttribute('href', '#whatsapp'); a.removeAttribute('target'); }
    });
  }

  // Chooser sheet
  const sheet = document.getElementById('wa-sheet');
  let lastFocus = null;
  function openSheet() {
    if (!sheet) return;
    lastFocus = document.activeElement;
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add('open'));
    document.documentElement.classList.add('lock');
    setTimeout(() => (sheet.querySelector('.wa-line') || sheet.querySelector('.sheet-x')).focus(), 60);
  }
  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.classList.remove('open');
    document.documentElement.classList.remove('lock');
    setTimeout(() => { sheet.hidden = true; }, 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (sheet) {
    sheet.addEventListener('click', e => { if (e.target === sheet || e.target.closest('.sheet-x') || e.target.closest('.wa-line')) closeSheet(); });
    sheet.addEventListener('keydown', e => {
      if (e.key === 'Escape') return closeSheet();
      if (e.key !== 'Tab') return;
      const f = [...sheet.querySelectorAll('a,button')], a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    });
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('[data-wa]');
    if (!a) return;
    if (state && state.channels.length === 1) return; // real link: opens the single line directly
    e.preventDefault();
    if (sheet) sheet.classList.toggle('loading', !state);
    openSheet();
  });

  ready.then(s => {
    state = s;
    document.documentElement.dataset.country = s.country || 'unknown';
    if (sheet) sheet.classList.remove('loading');
    renderLists();
    document.dispatchEvent(new CustomEvent('wasl:contact', { detail: s }));
  });
  document.addEventListener('wasl:lang', renderLists);

  window.WASLContact = { ready, open: openSheet, close: closeSheet };
})();
