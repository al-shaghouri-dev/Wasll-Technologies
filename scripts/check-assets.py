#!/usr/bin/env python3
"""Run from the project root before pushing: lists every local file referenced by index.html/config.js and fails if one is missing (Vercel is case-sensitive)."""
import re,os,sys
refs=set()
for f in ['index.html','config.js','assets/css/legacy.css','assets/js/legacy.js']:
    if os.path.exists(f):
        t=open(f,encoding='utf-8').read()
        refs|=set(re.findall(r"""["'\(]((?:assets/|favicon)[\w./-]+\.(?:svg|png|jpe?g|webp|gif|ico|js))""",t))
bad=[r for r in sorted(refs) if not os.path.exists(r)]
for r in sorted(refs):print(('MISSING ' if r in bad else 'ok      ')+r)
sys.exit(1 if bad else 0)
