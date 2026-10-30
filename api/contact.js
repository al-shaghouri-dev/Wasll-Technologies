// Vercel Edge Function: GET /api/contact
// Returns the visitor's approximate country (Vercel's IP geolocation header; no GPS, nothing stored)
// and, only for non-Canadian visitors, the Syrian WhatsApp line. Canadian visitors never receive it.
export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = ['https://al-shaghouri-dev.github.io'];

export default async function handler(req) {
  const origin = req.headers.get('origin') || '';
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'private, no-store',
    'vary': 'origin',
    'x-content-type-options': 'nosniff'
  };
  if (ALLOWED_ORIGINS.includes(origin)) headers['access-control-allow-origin'] = origin;
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...headers, 'access-control-allow-methods': 'GET', 'access-control-max-age': '86400' } });
  }
  if (req.method !== 'GET') return new Response('{"error":"method"}', { status: 405, headers });

  const raw = (req.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const country = /^[A-Z]{2}$/.test(raw) ? raw : null;
  const body = { country };
  if (country && country !== 'CA') {
    const sy = await syrianLine(req);
    if (sy) body.whatsapp = { SY: sy };
  }
  return new Response(JSON.stringify(body), { status: 200, headers });
}

// Prefer a Vercel environment variable (keeps the number out of the repo if you set one);
// otherwise read the same static file the client fallback uses.
async function syrianLine(req) {
  const env = typeof process !== 'undefined' && process.env ? process.env.WASL_WHATSAPP_SY : '';
  if (env) return String(env).replace(/\D/g, '');
  try {
    const r = await fetch(new URL('/assets/data/contact-intl.json', req.url));
    if (r.ok) return String(((await r.json()).whatsapp || {}).SY || '').replace(/\D/g, '');
  } catch (e) {}
  return '';
}
