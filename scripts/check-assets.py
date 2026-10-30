#!/usr/bin/env python3
"""Run from the project root before pushing: lists every local file referenced by the site and fails if one is missing (Vercel is case-sensitive)."""
import re, os, sys
files = ['index.html', 'config.js', 'site.webmanifest', 'assets/css/wasl.css', 'assets/js/site.js', 'assets/js/contact.js', 'assets/js/i18n.js']
refs = set()
for f in files:
    t = open(f, encoding='utf-8').read()
    refs |= set(re.findall(r"""["'(]((?:\.\./)?(?:assets/|fonts/|images/|favicon|site\.)[\w./-]*\.(?:svg|png|jpe?g|webp|gif|ico|json|js|css|woff2|webmanifest))\b""", t))
def resolve(r):
    if r.startswith('../'):
        return os.path.normpath(os.path.join('assets/css', r))
    return r
bad = [r for r in sorted(refs) if not os.path.exists(resolve(r))]
for r in sorted(refs):
    print(('MISSING ' if r in bad else 'ok      ') + r)
sys.exit(1 if bad else 0)
