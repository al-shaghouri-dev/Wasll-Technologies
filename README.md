# WASL Technologies website
Zero-dependency static site (HTML/CSS/JS). Edit `config.js` for WhatsApp, email, social links, default language.
## Run locally
    python3 -m http.server 8080   # then open http://localhost:8080
## Deploy free
Push to GitHub, then Cloudflare Pages / Netlify / GitHub Pages (no build command; publish dir = project root).
Free subdomain is provided by the host. A custom domain is a separate paid registration; add it in the host's Domains settings and set the DNS records it shows.
## Notes
- Forms open mailto/WhatsApp; with neither configured they show "demo mode" and send nothing. For real submissions use Formspree/Netlify Forms.
- QR: generated in the browser from `siteUrl` in config.js (set it to your final https URL before publishing; empty = current address). Verified to decode.
- Always upload the whole folder (index.html, config.js, assets/). Every image also has an embedded fallback inside index.html.
- Logos are the originals in /assets, untouched.
- Privacy/Terms are templates; get legal review. Add sitemap.xml with your final domain.
- Editing dashboards, login, orders, analytics, song generation and private gifts need a backend (not included).

## Where form submissions go
- `formEndpoint` empty (default) = DEMO MODE: nothing is stored by the site. If `email` or `whatsapp` is set in config.js, the form opens the visitor's mail/WhatsApp app (they must press send). If neither is set, the form says nothing was sent.
- Real delivery: create a free Formspree form (formspree.io, free tier has monthly submission limits), put its URL in `formEndpoint`. Submissions are emailed to the address you registered there. Success is shown only if the service answers HTTP 2xx. No API key is needed in the front end.
- Test: submit once from the live site and confirm the email arrives (check spam); also confirm the Formspree dashboard lists it.
- Anything beyond that (saving to a database, dashboards) needs your own backend.
## Stats
config.js `stats.items[].value`: leave null to hide. Only real numbers are shown; `demo:true` shows labelled sample data (do not publish with it).
## Favicon
assets/favicon.png is a crop of the emblem from the original logo (original files untouched).

## Contact form (Formspree) and WhatsApp
- Form posts JSON to `formEndpoint` in config.js (`https://formspree.io/f/mrppbwyo`). Success is shown only on an HTTP 2xx reply; on failure the typed data is kept.
- First use: Formspree asks the form owner to confirm the email address by link; until confirmed, submissions may not be delivered. Then submit one real test from the live site and check Inbox + Spam + the Formspree dashboard "Submissions" tab.
- Formspree free plan has a monthly submission limit and may change; check formspree.io/plans. Spam protection: the form has a hidden honeypot field; enable reCAPTCHA/spam filtering in the Formspree form settings if spam appears.
- WhatsApp: `whatsapp` in config.js (digits only). Links are built as `https://wa.me/<number>?text=<encoded Arabic message>`.
- Home page is a single scrolling page (#sec-services, #sec-work, #sec-about, #sec-faq, #sec-contact). Old routes #/work #/about #/faq #/contact still work and scroll to those sections.

## Design (black / silver / champagne-gold)
Home sections: hero, services (4 cards), work gallery (Demo/Concept only), about + founders, why/process, contact + FAQ, footer.
All visuals are inline SVG symbols defined at the top of <body> (s-laptop, s-phm, s-phg, s-qr, s-holo, s-box) — edit them there. No external images are needed.
To use real founder photos later, replace the `.av` initials circles in index.html with <img> tags (put the files in assets/).
Preview: `python3 -m http.server 8080` inside this folder, open http://localhost:8080

## Images on Vercel / GitHub (important)
- Vercel serves the repo root as the site root, and its file system is CASE-SENSITIVE: `assets/Logo.jpg` ≠ `assets/logo.jpg`.
- Upload the WHOLE folder structure to GitHub (index.html, config.js, favicon.ico, robots.txt, `assets/` incl. `assets/images/`, `scripts/`). If only index.html is uploaded, every file under `assets/` returns 404.
- Before pushing run `python3 scripts/check-assets.py` (lists every referenced file and fails if one is missing) and `git ls-files assets` to see what Git really tracks.
- After deploying, open `https://YOUR-SITE/assets/images/hero-scene.svg` and `https://YOUR-SITE/assets/logo.jpg` directly: they must show an image, not 404.
- Safety net: if an image fails, the page logs `[WASL] image failed to load: <path>` in the browser console and swaps in an embedded copy. Add `?debug` to the URL to outline failed images in red.
- Images: assets/images/{hero-scene,about-scene,footer-art,service-web,service-menu,service-gift,service-experience}.svg (vector, generated for WASL). Logo: assets/logo.jpg (original). Favicon: favicon.ico, assets/favicon.png, assets/apple-touch-icon.png.

## Logo files (transparent)
- assets/logo.jpg = the ORIGINAL (black background), kept untouched as the source.
- assets/logo-full.png (emblem + WASL + TECHNOLOGIES) and assets/logo-mark.png (emblem only) are true-alpha PNGs derived from it (metal and gold highlights preserved). The site uses these, so no black rectangles appear on the background.
- Favicon files (favicon.ico, assets/favicon.png, assets/apple-touch-icon.png) are the emblem on a near-black square.
## Mobile menu
Drawer `#drawer` + overlay `#ov` live outside <header> (a fixed element inside a header with backdrop-filter gets clipped to the header's height — that was the cause of the cut-off menu). Opens from the left, closes with ✕, overlay click, Esc or choosing a link; page scroll is locked while open. Desktop nav shows from 1025px.
