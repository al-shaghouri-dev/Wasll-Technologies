# WASL Technologies website

**Connecting Ideas With Technology.**

A static bilingual (English / Arabic) website with no build step and no dependencies. It is served from the repository root by:

- **Vercel (primary):** https://waslltechnologies.vercel.app/ — canonical URL for SEO; runs `api/contact.js`.
- **GitHub Pages:** https://al-shaghouri-dev.github.io/Wasll-Technologies/ — same files, served under a subpath.

All paths are **relative**, so both hosts work. Never use a leading `/` in asset paths.

## Structure

```
index.html              The whole site: home + #/web, #/menus, #/gifts, #/privacy, #/terms, 404 views
config.js               Editable settings (email, Canadian WhatsApp, Formspree endpoint, socials, stats)
api/contact.js          Vercel Edge Function: visitor country + Syrian WhatsApp line for non-Canadian visitors
assets/css/wasl.css     Design system and all styles (tokens at the top)
assets/js/i18n.js       All English/Arabic text, FAQ, language switching
assets/js/contact.js    Country detection and WhatsApp routing (button, chooser, contact lists)
assets/js/site.js       Router, navigation, motion, menu & gift demos, QR code, forms
assets/js/img-fallback.js  Embedded image copies, loaded only if an image file ever fails
assets/data/contact-intl.json  Static fallback for the Syrian line (used when api/contact is unreachable)
assets/fonts/           Inter + IBM Plex Sans Arabic (self-hosted, SIL OFL)
assets/images/          Original illustrations          assets/logo*.{png,jpg,webp}  Logo originals + resized copies
assets/og-image.jpg     Social sharing preview (1200×630)
vercel.json             Security headers (CSP etc.) for Vercel only
sitemap.xml, robots.txt, site.webmanifest
prototype.html          Redirects to the home page (kept so the old preview link works)
assets/css/legacy.css, assets/js/legacy.js   Previous site's code — no longer loaded; kept for reference
```

## Run locally

```
python3 -m http.server 8080      # then open http://localhost:8080
```

Country detection falls back to the browser time zone locally (the Edge Function only runs on Vercel).

## Language

Chosen before first paint (inline script in `<head>`): `?lang=ar|en` → visitor's saved choice (`localStorage['wasl.lang']`) → first Arabic/English entry in the browser's languages → English. The EN | ع switch saves the visitor's choice. All text lives in `assets/js/i18n.js`; elements use `data-i18n="key"`.

## WhatsApp and country

| Visitor | WhatsApp button | Numbers shown |
|---|---|---|
| Canada | Opens the Canadian chat directly | Canada only |
| Syria / other / unknown | Chooser: Canada + Syria | Both |

Sources, in order: cached country (24 h) → `api/contact` (Vercel's `x-vercel-ip-country` header) → browser time zone. The Syrian number is not in `config.js` or the page; it comes from `api/contact` or `assets/data/contact-intl.json` and is requested only after the visitor is known not to be Canadian.

**Privacy limits:** the Syrian number remains public — in this repository's history, in `assets/data/contact-intl.json`, from `api/contact` for any non-Canadian request (e.g. via VPN), and to anyone who chats on WhatsApp. The setup controls what Canadian visitors see and download, not who can find the number. To keep it out of future commits, set a `WASL_WHATSAPP_SY` environment variable in Vercel (the function prefers it) — note the static fallback file would then need to be removed, which drops the Syrian option on GitHub Pages.

## Forms

All forms post JSON to `formEndpoint` (Formspree). Success is shown only on HTTP 2xx; on failure the typed data stays. A hidden `_gotcha` field catches bots.

## Security headers

`vercel.json` sets a Content-Security-Policy. It allows the single inline script in `<head>` by its SHA-256 hash: **if you edit that script, update the hash** (the browser console shows the expected value). Vercel's preview toolbar may be blocked by this policy on preview deployments; the site itself is unaffected.

## Checks

```
python3 scripts/check-assets.py   # every referenced file exists (Vercel is case-sensitive)
```
