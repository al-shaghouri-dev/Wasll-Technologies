// Bilingual content (English / Arabic) and language switching.
// The initial language is chosen before first paint by the inline script in <head>:
// ?lang= → saved manual choice → browser languages (first ar*/en*) → config fallback (en).
(function () {
  const S = {
    en: {
      'meta.title': 'WASL Technologies — Connecting Ideas With Technology',
      'meta.desc': 'WASL Technologies designs and builds websites, QR digital menus and personalized digital gifts, in English and Arabic.',
      'title.web': 'Website Development — WASL Technologies', 'title.menus': 'Digital Menus & QR — WASL Technologies',
      'title.gifts': 'Personalized Digital Gifts — WASL Technologies', 'title.privacy': 'Privacy Policy — WASL Technologies',
      'title.terms': 'Terms of Service — WASL Technologies', 'title.notfound': 'Page not found — WASL Technologies',
      'skip': 'Skip to content',
      'nav.home': 'Home', 'nav.services': 'Services', 'nav.work': 'Work', 'nav.about': 'About', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
      'nav.cta': 'Start a project', 'nav.menu': 'Open menu', 'nav.close': 'Close menu', 'nav.lang': 'Switch to Arabic', 'nav.back': 'Back to home',
      'svc.web': 'Website Development', 'svc.web.d': 'Fast, bilingual websites for businesses and personal brands.',
      'svc.menus': 'Digital Menus & QR', 'svc.menus.d': 'Restaurant menus your guests open with a single scan.',
      'svc.gifts': 'Personalized Digital Gifts', 'svc.gifts.d': 'Photos, messages and custom songs, turned into a gift.',

      'hero.eyebrow': 'Websites · Digital menus · Digital gifts',
      'hero.t1': 'Connecting ideas', 'hero.t2': 'with technology.',
      'hero.lead': 'We design and build websites, QR digital menus and personalized digital gifts. Every detail is considered, every page works in Arabic and English, and everything feels right on any screen.',
      'hero.cta1': 'Start your project', 'hero.cta2': 'Explore our services',
      'hero.p1': 'Arabic & English', 'hero.p2': 'Designed for every screen', 'hero.p3': 'Clear scope and pricing',
      'art.site': 'Website', 'art.menu': 'QR menu', 'art.gift': 'Digital gift', 'art.bistro': 'Sample Bistro', 'art.open': 'Open menu',
      'art.for': 'For Layla', 'art.msg': 'Every moment with you…', 'art.scan': 'Scan me',
      'art.d1': 'Fattoush', 'art.d2': 'Kebab', 'art.d3': 'Lemonade', 'art.h': 'Ideas, designed.',

      'stmt.a': 'WASL means', 'stmt.b': 'connection.',
      'stmt.c': 'It’s the idea behind everything we make: technology that connects businesses with their customers, and people with the moments that matter to them.',

      'svcs.eb': 'Services', 'svcs.h': 'Three services, done properly.',
      'svcs.lead': 'Each one is built around a simple goal: helping you be seen, chosen and remembered.',
      'web.h': 'A website that represents you properly.',
      'web.p': 'Business sites, portfolios, landing pages and catalogs — fast, responsive, bilingual, and built around your content rather than a template.',
      'web.b1': 'Business & corporate websites', 'web.b2': 'Portfolios & landing pages', 'web.b3': 'Redesigns, performance & maintenance',
      'web.cta': 'Explore website development',
      'menus.h': 'Your menu, one scan away.',
      'menus.p': 'A bilingual digital menu your guests open by scanning a QR code: categories, photos, prices and offers, with print-ready QR designs for your tables.',
      'menus.b1': 'Categories, photos & prices', 'menus.b2': 'Arabic & English', 'menus.b3': 'Print-ready QR designs',
      'menus.cta': 'Try the live menu demo',
      'gifts.h': 'Turn your memories into a gift they’ll keep.',
      'gifts.p': 'Digital love pages, animated letters and memory timelines with your photos and words — and custom songs written around your story.',
      'gifts.b1': 'Birthdays, anniversaries & more', 'gifts.b2': 'Photos, messages & timelines', 'gifts.b3': 'Custom song requests',
      'gifts.cta': 'Try the gift demo',
      'vis.qr': 'Scan for the menu', 'vis.qr2': 'Opens our live demo', 'vis.date': '14 · 02', 'vis.to': 'For Layla', 'vis.msg': 'Every moment with you is my favorite.',
      'vis.menu': 'Sample Bistro', 'vis.all': 'All', 'vis.mains': 'Mains', 'vis.drinks': 'Drinks',
      'custom.a': 'Have something else in mind?', 'custom.b': 'We also build custom digital experiences around your idea.', 'custom.cta': 'Tell us about it',

      'proc.eb': 'How we work', 'proc.h': 'Four clear steps',
      'proc.1': 'Understand your idea', 'proc.1d': 'We listen first: your goals, your audience and the materials you have.',
      'proc.2': 'Plan the right solution', 'proc.2d': 'A clear scope, timeline and quote before any work starts.',
      'proc.3': 'Design and develop', 'proc.3d': 'Careful design and clean code, shared with you as we go.',
      'proc.4': 'Review and deliver', 'proc.4d': 'We test on real devices, refine the details, then launch.',

      'work.eb': 'Portfolio', 'work.h': 'Demos and concepts',
      'work.lead': 'Demo and concept pieces that show our creativity and the way we build digital solutions. They are not paid client projects.',
      'tag.demo': 'Live demo', 'tag.concept': 'Concept', 'work.open': 'Open demo', 'work.ask': 'Ask about it', 'work.more': 'Learn more',
      'work.1': 'Business website', 'work.1d': 'Responsive landing page concept',
      'work.2': 'Sample restaurant menu', 'work.2d': 'Searchable bilingual menu with QR',
      'work.3': 'Love page', 'work.3d': 'Personalized gift preview',
      'work.4': 'Animated letter', 'work.4d': 'Envelope-opening letter concept',

      'why.eb': 'Why WASL', 'why.h': 'Practical, careful, clear.',
      'why.1': 'Tailored solutions', 'why.1d': 'Each project starts from your idea, not a fixed template.',
      'why.2': 'Responsive design', 'why.2d': 'Built to work well on phones, tablets and desktops.',
      'why.3': 'Attention to detail', 'why.3d': 'Typography, spacing and small interactions get real care.',
      'why.4': 'Clear communication', 'why.4d': 'You know what is included, what it costs and what happens next.',

      'about.eb': 'About us', 'about.h': 'Two founders. One idea: connection.',
      'about.p': 'WASL Technologies is a technology company founded by two partners, Ahmed and Bashar. The name comes from the Arabic word for “connection”: we use technology and creativity to connect businesses with their customers, and people with their memories.',
      'about.slogan': 'Connecting Ideas With Technology.',
      'about.f': 'The founders', 'about.ahmed': 'Ahmed', 'about.bashar': 'Bashar', 'about.role': 'Co-founder',

      'faq.eb': 'FAQ', 'faq.h': 'Frequently asked questions',

      'ct.eb': 'Contact', 'ct.h': 'Let’s talk about your project.',
      'ct.lead': 'Send us the details and we’ll get back to you. Prefer a quick chat? Message us on WhatsApp.',
      'ct.wa': 'WhatsApp', 'ct.wa.d': 'The fastest way to reach us.', 'ct.wa.btn': 'Message us on WhatsApp',
      'ct.mail': 'Email',
      'ct.note': 'We reply as soon as we can. Pricing and timelines depend on project scope.',

      'f.name': 'Full name', 'f.email': 'Email', 'f.phone': 'WhatsApp or phone (optional)', 'f.service': 'Service',
      'f.msg': 'Project details', 'f.send': 'Send request', 'f.sending': 'Sending…', 'f.req': 'required',
      'f.o.web': 'Website development', 'f.o.menu': 'Digital menu & QR', 'f.o.gift': 'Personalized digital gift', 'f.o.exp': 'Custom digital experience', 'f.o.other': 'Something else',
      'f.contact': 'Email or phone', 'f.business': 'Business name (optional)', 'f.type': 'Website type', 'f.wlang': 'Website language', 'f.budget': 'Budget range (optional)', 'f.desc': 'Project description',
      'f.t.corp': 'Business / corporate', 'f.t.port': 'Portfolio', 'f.t.land': 'Landing page', 'f.t.cat': 'Catalog', 'f.t.shop': 'Online store', 'f.t.re': 'Redesign',
      'f.l.ar': 'Arabic', 'f.l.en': 'English', 'f.l.both': 'Arabic & English',
      'f.owner': 'Your name', 'f.rest': 'Restaurant name', 'f.message': 'Message',
      'f.recipient': 'Recipient name or nickname', 'f.yourcontact': 'Your email or phone', 'f.occasion': 'Occasion', 'f.kind': 'Gift type',
      'f.plang': 'Preferred language', 'f.style': 'Music style or mood (for songs, optional)', 'f.story': 'The story or message behind it', 'f.delivery': 'Delivery preference (optional)',
      'f.oc.bday': 'Birthday', 'f.oc.ann': 'Anniversary', 'f.oc.eng': 'Engagement', 'f.oc.val': 'Valentine’s Day', 'f.oc.grad': 'Graduation', 'f.oc.sorry': 'Apology', 'f.oc.far': 'Long distance', 'f.oc.surp': 'Surprise',
      'f.k.page': 'Digital love page', 'f.k.letter': 'Animated letter', 'f.k.memory': 'Memory experience', 'f.k.song': 'Custom song',
      'f.err.req': 'Please complete the required fields.', 'f.err.email': 'Please enter a valid email address.', 'f.err.phone': 'Please enter a valid phone number.',
      'f.ok': 'Thank you — we’ve received your message and will reply soon using the details you provided.',
      'f.fail': 'We couldn’t send your message. Your details are still here — please try again, or reach us on WhatsApp or by email.',

      'cta.h': 'Have an idea? Let’s connect it with technology.', 'cta.b': 'Start your project',

      // Website development page
      'wp.eb': 'Website development', 'wp.h': 'Professional websites, built around you.',
      'wp.lead': 'From a single landing page to a full business site, we plan the structure, design every page and build it to be fast, responsive and easy to use in Arabic and English.',
      'wp.what': 'What we build',
      'wp.i1': 'Business and corporate websites', 'wp.i2': 'Portfolios and landing pages', 'wp.i3': 'Educational and service business sites',
      'wp.i4': 'Product catalogs, and online stores when a backend and integrations are available', 'wp.i5': 'Redesigns, performance work and ongoing maintenance',
      'wp.how': 'How a website comes together',
      'wp.s1': 'Discovery', 'wp.s2': 'Structure', 'wp.s3': 'Design', 'wp.s4': 'Development', 'wp.s5': 'Testing', 'wp.s6': 'Launch',
      'wp.note': 'Final pricing depends on scope, content, integrations and maintenance requirements.',
      'wp.form': 'Tell us about your website', 'wp.send': 'Send inquiry',

      // Menus page
      'mp.eb': 'Digital menus & QR', 'mp.h': 'Your menu. One scan away.',
      'mp.lead': 'Mobile-friendly bilingual menus that open by scanning a QR code: categories, photos, prices, offers, WhatsApp and location links, and print-ready QR designs.',
      'mp.inc': 'Included', 'mp.inc.d': 'Menu design, categories, search, bilingual content, and a QR code that opens your published menu.',
      'mp.opt': 'Optional (needs a backend)', 'mp.opt.d': 'Editing dashboard, login, orders, analytics and a database. Quoted separately.',
      'mp.demo': 'Live demo', 'mp.demo.d': 'Fictional dishes and illustrative prices — try searching or filtering.',
      'mp.search': 'Search dishes', 'mp.empty': 'No dishes match your search.', 'mp.sample': 'sample',
      'mp.all': 'All', 'mp.c.Starters': 'Starters', 'mp.c.Mains': 'Mains', 'mp.c.Desserts': 'Desserts', 'mp.c.Drinks': 'Drinks',
      'mp.qr': 'Scan to open this demo', 'mp.qr.d': 'This QR code opens the demo menu on our website.',
      'mp.form': 'Get a menu for your restaurant', 'mp.send': 'Send inquiry',

      // Gifts page
      'gp.eb': 'Personalized digital gifts', 'gp.h': 'Turn your memories into something unforgettable.',
      'gp.lead': 'Custom-made digital love pages, animated letters, memory timelines and original-song requests — for birthdays, anniversaries, engagements, graduations, reconciliation and long-distance love.',
      'gp.note': 'These are custom-made services, not auto-generated products. Song creation, licensing and delivery depend on the selected package and production tools.',
      'gp.demo': 'Try the demo', 'gp.demo.d': 'Sample content only — please don’t enter real private details here.',
      'gp.theme': 'Theme', 'gp.t.burgundy': 'Burgundy', 'gp.t.rose': 'Rose', 'gp.t.cream': 'Cream',
      'gp.name': 'Recipient name', 'gp.msg': 'Short message', 'gp.reset': 'Reset',
      'gp.def.name': 'For someone special', 'gp.def.msg': 'Your message appears here.',
      'gp.form': 'Request your gift', 'gp.send': 'Request your gift',

      // Legal
      'pv.h': 'Privacy Policy', 'pv.upd': 'Last updated: October 2026',
      'pv.1h': 'What we collect', 'pv.1': 'When you send a form, we receive the details you enter — such as your name, email or phone number, and message. We use them only to reply to you and discuss your project.',
      'pv.2h': 'How forms are delivered', 'pv.2': 'Form submissions are delivered to our inbox through Formspree, a third-party form service that processes them on our behalf.',
      'pv.3h': 'WhatsApp and email', 'pv.3': 'If you contact us on WhatsApp or by email, your messages are handled by those services under their own privacy policies.',
      'pv.4h': 'Approximate country', 'pv.4': 'To show the right contact options, the site checks your approximate country from your internet connection. We never request GPS access, and we don’t store your IP address.',
      'pv.5h': 'Stored on your device', 'pv.5': 'Your browser remembers your language choice, and the detected country code for up to 24 hours. You can clear both at any time in your browser settings.',
      'pv.6h': 'No tracking', 'pv.6': 'We don’t use advertising or analytics trackers, and our fonts are hosted on our own site. The site is hosted on Vercel and GitHub Pages, which may keep standard technical logs.',
      'pv.7h': 'Questions', 'pv.7': 'Questions about your data? Email us at',
      'tm.h': 'Terms of Service', 'tm.upd': 'Last updated: October 2026',
      'tm.1h': 'Our services', 'tm.1': 'Our services are custom-made and quoted per project. Pricing and timelines depend on scope, content, integrations and maintenance requirements.',
      'tm.2h': 'Before work starts', 'tm.2': 'We agree on the scope, cost, timeline and revision rounds before any work begins. Changes outside the agreed scope are discussed and quoted separately.',
      'tm.3h': 'Demos on this site', 'tm.3': 'Demos and concepts shown on this site are samples, not client projects. Dishes, prices and names in them are fictional.',
      'tm.4h': 'Third-party costs', 'tm.4': 'Domains, paid hosting and other third-party services may carry their own fees. We explain them before the project is approved.',
      'tm.5h': 'Contact', 'tm.5': 'Questions about these terms? Email us at',

      'nf.h': 'This page doesn’t exist.', 'nf.p': 'The link may be outdated. Let’s get you back on track.', 'nf.b': 'Back to home',

      'ft.tag': 'Connecting Ideas With Technology.', 'ft.contact': 'Contact', 'ft.services': 'Services', 'ft.company': 'Company',
      'ft.privacy': 'Privacy Policy', 'ft.terms': 'Terms of Service', 'ft.rights': 'All rights reserved.', 'ft.motto': 'Building Digital Tomorrow',
      'top': 'Back to top',

      'wa.title': 'Chat with us on WhatsApp', 'wa.sub': 'Choose the line that suits you.', 'wa.loading': 'Finding the right line for you…',
      'wa.close': 'Close', 'wa.fab': 'Contact us on WhatsApp',
      'wa.country.CA': 'Canada', 'wa.country.SY': 'Syria',
      'wa.message': 'Hello WASL Technologies, I’d like to ask about your services.'
    },
    ar: {
      'meta.title': 'WASL Technologies — نربط الأفكار بالتقنية',
      'meta.desc': 'تصمّم WASL Technologies وتطوّر المواقع الإلكترونية والمنيو الرقمي بتقنية QR والهدايا الرقمية المخصّصة، بالعربية والإنجليزية.',
      'title.web': 'تطوير المواقع — WASL Technologies', 'title.menus': 'المنيو الرقمي و QR — WASL Technologies',
      'title.gifts': 'الهدايا الرقمية المخصّصة — WASL Technologies', 'title.privacy': 'سياسة الخصوصية — WASL Technologies',
      'title.terms': 'شروط الخدمة — WASL Technologies', 'title.notfound': 'الصفحة غير موجودة — WASL Technologies',
      'skip': 'انتقل إلى المحتوى',
      'nav.home': 'الرئيسية', 'nav.services': 'الخدمات', 'nav.work': 'أعمالنا', 'nav.about': 'من نحن', 'nav.faq': 'الأسئلة الشائعة', 'nav.contact': 'تواصل معنا',
      'nav.cta': 'ابدأ مشروعك', 'nav.menu': 'فتح القائمة', 'nav.close': 'إغلاق القائمة', 'nav.lang': 'التبديل إلى الإنجليزية', 'nav.back': 'العودة للرئيسية',
      'svc.web': 'تطوير المواقع', 'svc.web.d': 'مواقع سريعة وثنائية اللغة للشركات والعلامات الشخصية.',
      'svc.menus': 'المنيو الرقمي و QR', 'svc.menus.d': 'منيو لمطعمك يفتحه ضيوفك بمسحة واحدة.',
      'svc.gifts': 'الهدايا الرقمية المخصّصة', 'svc.gifts.d': 'صور ورسائل وأغانٍ مخصّصة، تتحوّل إلى هدية.',

      'hero.eyebrow': 'مواقع · منيو رقمي · هدايا رقمية',
      'hero.t1': 'نربط الأفكار', 'hero.t2': 'بالتقنية.',
      'hero.lead': 'نصمّم ونطوّر المواقع الإلكترونية والمنيو الرقمي بتقنية QR والهدايا الرقمية المخصّصة. نهتم بكل تفصيل، وكل صفحة تعمل بالعربية والإنجليزية، وتبدو كما يجب على أي شاشة.',
      'hero.cta1': 'ابدأ مشروعك', 'hero.cta2': 'اكتشف خدماتنا',
      'hero.p1': 'عربي وإنجليزي', 'hero.p2': 'مصمّم لكل الشاشات', 'hero.p3': 'نطاق وتكلفة واضحان',
      'art.site': 'موقع', 'art.menu': 'منيو QR', 'art.gift': 'هدية رقمية', 'art.bistro': 'مطعم تجريبي', 'art.open': 'افتح المنيو',
      'art.for': 'إلى ليلى', 'art.msg': 'كل لحظة معك…', 'art.scan': 'امسح',
      'art.d1': 'فتوش', 'art.d2': 'كباب', 'art.d3': 'ليموناضة', 'art.h': 'أفكار، بتصميم.',

      'stmt.a': '«وصل» تعني', 'stmt.b': 'الاتصال.',
      'stmt.c': 'وهي الفكرة وراء كل ما نصنعه: تقنية تربط الأعمال بعملائها، والناس باللحظات التي تهمّهم.',

      'svcs.eb': 'الخدمات', 'svcs.h': 'ثلاث خدمات، بإتقان.',
      'svcs.lead': 'كل خدمة مبنية حول هدف بسيط: أن يراك الناس، ويختاروك، ويتذكّروك.',
      'web.h': 'موقع يمثّلك كما يليق.',
      'web.p': 'مواقع للشركات والأعمال، بورتفوليو، صفحات هبوط وكتالوجات — سريعة ومتجاوبة وثنائية اللغة، ومبنية حول محتواك لا حول قالب جاهز.',
      'web.b1': 'مواقع الشركات والأعمال', 'web.b2': 'بورتفوليو وصفحات هبوط', 'web.b3': 'إعادة تصميم وتحسين أداء وصيانة',
      'web.cta': 'تعرّف على تطوير المواقع',
      'menus.h': 'منيو مطعمك، على بُعد مسحة.',
      'menus.p': 'منيو رقمي بلغتين يفتحه ضيوفك بمسح رمز QR: أقسام وصور وأسعار وعروض، مع تصاميم QR جاهزة للطباعة على طاولاتك.',
      'menus.b1': 'أقسام وصور وأسعار', 'menus.b2': 'عربي وإنجليزي', 'menus.b3': 'تصاميم QR جاهزة للطباعة',
      'menus.cta': 'جرّب المنيو التجريبي',
      'gifts.h': 'حوّل ذكرياتكم إلى هدية لا تُنسى.',
      'gifts.p': 'صفحات حب رقمية، ورسائل متحركة، وخطوط زمنية للذكريات بصوركم وكلماتكم — وأغانٍ مخصّصة تُكتب حول قصتكم.',
      'gifts.b1': 'أعياد الميلاد والذكرى السنوية وغيرها', 'gifts.b2': 'صور ورسائل وخطوط زمنية', 'gifts.b3': 'طلبات أغانٍ مخصّصة',
      'gifts.cta': 'جرّب الهدية التجريبية',
      'vis.qr': 'امسح لفتح المنيو', 'vis.qr2': 'يفتح العرض التجريبي', 'vis.date': '14 · 02', 'vis.to': 'إلى ليلى', 'vis.msg': 'كل لحظة معك هي المفضّلة لديّ.',
      'vis.menu': 'مطعم تجريبي', 'vis.all': 'الكل', 'vis.mains': 'رئيسية', 'vis.drinks': 'مشروبات',
      'custom.a': 'لديك فكرة مختلفة؟', 'custom.b': 'نبني أيضاً تجارب رقمية مخصّصة حول فكرتك.', 'custom.cta': 'حدّثنا عنها',

      'proc.eb': 'كيف نعمل', 'proc.h': 'أربع خطوات واضحة',
      'proc.1': 'نفهم فكرتك', 'proc.1d': 'نستمع أولاً: أهدافك وجمهورك والمواد المتوفرة لديك.',
      'proc.2': 'نخطط الحل المناسب', 'proc.2d': 'نطاق ومدة وعرض سعر واضح قبل بدء أي عمل.',
      'proc.3': 'نصمّم ونطوّر', 'proc.3d': 'تصميم دقيق وكود نظيف، ونشاركك التقدّم أولاً بأول.',
      'proc.4': 'نراجع ونسلّم', 'proc.4d': 'نختبر على أجهزة حقيقية، ونحسّن التفاصيل، ثم نطلق.',

      'work.eb': 'أعمالنا', 'work.h': 'نماذج وتصوّرات',
      'work.lead': 'نماذج تجريبية وتصوّرات توضّح إبداعنا وطريقة بنائنا للحلول الرقمية، وليست مشاريع عملاء مدفوعة.',
      'tag.demo': 'عرض حي', 'tag.concept': 'تصوّر', 'work.open': 'افتح العرض', 'work.ask': 'اسألنا عنه', 'work.more': 'اعرف المزيد',
      'work.1': 'موقع أعمال', 'work.1d': 'تصوّر لصفحة هبوط متجاوبة',
      'work.2': 'منيو مطعم تجريبي', 'work.2d': 'منيو ثنائي اللغة مع بحث و QR',
      'work.3': 'صفحة حب', 'work.3d': 'معاينة هدية مخصّصة',
      'work.4': 'رسالة متحركة', 'work.4d': 'تصوّر لرسالة تُفتح كظرف',

      'why.eb': 'لماذا WASL؟', 'why.h': 'عملي ودقيق وواضح.',
      'why.1': 'حلول مفصّلة', 'why.1d': 'كل مشروع ينطلق من فكرتك وليس من قالب جاهز.',
      'why.2': 'تصميم متجاوب', 'why.2d': 'يعمل بشكل جيد على الجوال واللوحي وسطح المكتب.',
      'why.3': 'اهتمام بالتفاصيل', 'why.3d': 'نعتني بالخطوط والمسافات والتفاعلات الصغيرة.',
      'why.4': 'تواصل واضح', 'why.4d': 'تعرف ما الذي يشمله العمل وتكلفته والخطوة التالية.',

      'about.eb': 'من نحن', 'about.h': 'شريكان، وفكرة واحدة: الاتصال.',
      'about.p': 'WASL Technologies شركة تقنية أسّسها شريكان هما أحمد وبشار. اسم «وصل» يعني الاتصال والربط، ونستخدم التقنية والإبداع لربط الأعمال بعملائها، والناس بذكرياتهم.',
      'about.slogan': 'نربط الأفكار بالتقنية.',
      'about.f': 'المؤسسون', 'about.ahmed': 'أحمد', 'about.bashar': 'بشار', 'about.role': 'مؤسس مشارك',

      'faq.eb': 'الأسئلة الشائعة', 'faq.h': 'الأسئلة الشائعة',

      'ct.eb': 'تواصل معنا', 'ct.h': 'لنتحدث عن مشروعك.',
      'ct.lead': 'أرسل لنا التفاصيل وسنعود إليك. تفضّل محادثة سريعة؟ راسلنا عبر واتساب.',
      'ct.wa': 'واتساب', 'ct.wa.d': 'أسرع طريقة للتواصل معنا.', 'ct.wa.btn': 'راسلنا عبر واتساب',
      'ct.mail': 'البريد الإلكتروني',
      'ct.note': 'نردّ عليك في أقرب وقت ممكن. التكلفة والمدة تعتمدان على نطاق المشروع.',

      'f.name': 'الاسم الكامل', 'f.email': 'البريد الإلكتروني', 'f.phone': 'واتساب أو رقم الهاتف (اختياري)', 'f.service': 'الخدمة',
      'f.msg': 'تفاصيل المشروع', 'f.send': 'إرسال الطلب', 'f.sending': 'جارٍ الإرسال…', 'f.req': 'مطلوب',
      'f.o.web': 'تطوير المواقع', 'f.o.menu': 'المنيو الرقمي و QR', 'f.o.gift': 'هدية رقمية مخصّصة', 'f.o.exp': 'تجربة رقمية مخصّصة', 'f.o.other': 'شيء آخر',
      'f.contact': 'البريد أو رقم الهاتف', 'f.business': 'اسم النشاط (اختياري)', 'f.type': 'نوع الموقع', 'f.wlang': 'لغة الموقع', 'f.budget': 'الميزانية التقريبية (اختياري)', 'f.desc': 'وصف المشروع',
      'f.t.corp': 'موقع شركة / أعمال', 'f.t.port': 'بورتفوليو', 'f.t.land': 'صفحة هبوط', 'f.t.cat': 'كتالوج', 'f.t.shop': 'متجر إلكتروني', 'f.t.re': 'إعادة تصميم',
      'f.l.ar': 'العربية', 'f.l.en': 'الإنجليزية', 'f.l.both': 'العربية والإنجليزية',
      'f.owner': 'اسمك', 'f.rest': 'اسم المطعم', 'f.message': 'رسالتك',
      'f.recipient': 'اسم المستلم أو لقبه', 'f.yourcontact': 'بريدك أو رقم هاتفك', 'f.occasion': 'المناسبة', 'f.kind': 'نوع الهدية',
      'f.plang': 'اللغة المفضّلة', 'f.style': 'الأسلوب الموسيقي أو الطابع (للأغاني، اختياري)', 'f.story': 'القصة أو الرسالة وراءها', 'f.delivery': 'طريقة التسليم المفضّلة (اختياري)',
      'f.oc.bday': 'عيد ميلاد', 'f.oc.ann': 'ذكرى سنوية', 'f.oc.eng': 'خطوبة', 'f.oc.val': 'عيد الحب', 'f.oc.grad': 'تخرّج', 'f.oc.sorry': 'اعتذار', 'f.oc.far': 'حب عن بُعد', 'f.oc.surp': 'مفاجأة',
      'f.k.page': 'صفحة حب رقمية', 'f.k.letter': 'رسالة متحركة', 'f.k.memory': 'تجربة ذكريات', 'f.k.song': 'أغنية مخصّصة',
      'f.err.req': 'يرجى تعبئة الحقول المطلوبة.', 'f.err.email': 'يرجى إدخال بريد إلكتروني صحيح.', 'f.err.phone': 'يرجى إدخال رقم هاتف صحيح.',
      'f.ok': 'شكراً لك — وصلتنا رسالتك وسنردّ عليك قريباً عبر البيانات التي زوّدتنا بها.',
      'f.fail': 'تعذّر إرسال رسالتك. بياناتك ما زالت في النموذج — حاول مجدداً، أو تواصل معنا عبر واتساب أو البريد.',

      'cta.h': 'لديك فكرة؟ لنصلها بالتقنية.', 'cta.b': 'ابدأ مشروعك',

      'wp.eb': 'تطوير المواقع', 'wp.h': 'مواقع احترافية، مبنية حولك.',
      'wp.lead': 'من صفحة هبوط واحدة إلى موقع أعمال متكامل، نخطط البنية ونصمّم كل صفحة ونبنيها لتكون سريعة ومتجاوبة وسهلة الاستخدام بالعربية والإنجليزية.',
      'wp.what': 'ما نبنيه',
      'wp.i1': 'مواقع الشركات والأعمال', 'wp.i2': 'بورتفوليو وصفحات هبوط', 'wp.i3': 'مواقع تعليمية وخدمية',
      'wp.i4': 'كتالوجات منتجات، ومتاجر إلكترونية عند توفّر الخلفية البرمجية والتكاملات', 'wp.i5': 'إعادة تصميم وتحسين أداء وصيانة مستمرة',
      'wp.how': 'كيف يُبنى الموقع',
      'wp.s1': 'الاكتشاف', 'wp.s2': 'البنية', 'wp.s3': 'التصميم', 'wp.s4': 'التطوير', 'wp.s5': 'الاختبار', 'wp.s6': 'الإطلاق',
      'wp.note': 'السعر النهائي يعتمد على نطاق العمل والمحتوى والتكاملات ومتطلبات الصيانة.',
      'wp.form': 'حدّثنا عن موقعك', 'wp.send': 'إرسال الطلب',

      'mp.eb': 'المنيو الرقمي و QR', 'mp.h': 'منيو مطعمك، صار أقرب بمسحة.',
      'mp.lead': 'منيوهات سهلة على الجوال بلغتين تُفتح بمسح رمز QR: أقسام، صور، أسعار، عروض، روابط واتساب والموقع، وتصاميم QR جاهزة للطباعة.',
      'mp.inc': 'مشمول', 'mp.inc.d': 'تصميم المنيو، الأقسام، البحث، محتوى بلغتين، ورمز QR يفتح المنيو المنشور.',
      'mp.opt': 'اختياري (يحتاج خلفية برمجية)', 'mp.opt.d': 'لوحة تعديل، تسجيل دخول، طلبات، تحليلات وقاعدة بيانات. تُسعّر بشكل منفصل.',
      'mp.demo': 'عرض حي', 'mp.demo.d': 'أطباق وهمية وأسعار توضيحية — جرّب البحث أو التصفية.',
      'mp.search': 'ابحث عن طبق', 'mp.empty': 'لا توجد أطباق مطابقة لبحثك.', 'mp.sample': 'تجريبي',
      'mp.all': 'الكل', 'mp.c.Starters': 'مقبلات', 'mp.c.Mains': 'أطباق رئيسية', 'mp.c.Desserts': 'حلويات', 'mp.c.Drinks': 'مشروبات',
      'mp.qr': 'امسح لفتح هذا العرض', 'mp.qr.d': 'يفتح رمز QR هذا المنيو التجريبي على موقعنا.',
      'mp.form': 'اطلب منيو لمطعمك', 'mp.send': 'إرسال الطلب',

      'gp.eb': 'الهدايا الرقمية المخصّصة', 'gp.h': 'خلّي ذكرياتكم تعيش بطريقة مختلفة.',
      'gp.lead': 'صفحات حب رقمية، رسائل متحركة، خطوط زمنية للذكريات، وطلبات أغانٍ أصلية — لأعياد الميلاد والذكرى السنوية والخطوبة والتخرّج والمصالحة والحب عن بُعد.',
      'gp.note': 'هذه خدمات تُنفّذ حسب الطلب وليست منتجات تُولَّد تلقائياً. إنتاج الأغاني وترخيصها وتسليمها يعتمد على الباقة وأدوات الإنتاج.',
      'gp.demo': 'جرّب العرض', 'gp.demo.d': 'محتوى تجريبي فقط — يرجى عدم إدخال تفاصيل خاصة حقيقية هنا.',
      'gp.theme': 'اللون', 'gp.t.burgundy': 'عنّابي', 'gp.t.rose': 'وردي', 'gp.t.cream': 'كريمي',
      'gp.name': 'اسم المستلم', 'gp.msg': 'رسالة قصيرة', 'gp.reset': 'إعادة ضبط',
      'gp.def.name': 'إلى شخص مميّز', 'gp.def.msg': 'ستظهر رسالتك هنا.',
      'gp.form': 'اطلب هديتك', 'gp.send': 'اطلب هديتك',

      'pv.h': 'سياسة الخصوصية', 'pv.upd': 'آخر تحديث: أكتوبر 2026',
      'pv.1h': 'ما الذي نجمعه', 'pv.1': 'عند إرسال نموذج، نستلم البيانات التي تدخلها — مثل الاسم والبريد الإلكتروني أو رقم الهاتف والرسالة — ونستخدمها فقط للرد عليك ومناقشة مشروعك.',
      'pv.2h': 'كيف تصلنا النماذج', 'pv.2': 'تصل النماذج إلى بريدنا عبر Formspree، وهي خدمة خارجية لاستقبال النماذج تعالجها نيابةً عنا.',
      'pv.3h': 'واتساب والبريد الإلكتروني', 'pv.3': 'إذا تواصلت معنا عبر واتساب أو البريد الإلكتروني، تتم معالجة رسائلك عبر تلك الخدمات وفق سياسات الخصوصية الخاصة بها.',
      'pv.4h': 'البلد التقريبي', 'pv.4': 'لعرض وسائل التواصل المناسبة، يتحقق الموقع من بلدك التقريبي عبر اتصالك بالإنترنت. لا نطلب أبداً الوصول إلى موقعك الجغرافي (GPS)، ولا نخزّن عنوان IP الخاص بك.',
      'pv.5h': 'ما يُحفظ على جهازك', 'pv.5': 'يتذكّر متصفحك اختيارك للغة، ورمز البلد المكتشف لمدة تصل إلى 24 ساعة. يمكنك حذفهما في أي وقت من إعدادات المتصفح.',
      'pv.6h': 'لا تتبّع', 'pv.6': 'لا نستخدم أدوات تتبّع إعلانية أو تحليلية، والخطوط مستضافة على موقعنا نفسه. الموقع مستضاف على Vercel و GitHub Pages، وقد تحتفظ هذه الخدمات بسجلات تقنية اعتيادية.',
      'pv.7h': 'أسئلة', 'pv.7': 'لديك أسئلة حول بياناتك؟ راسلنا على',
      'tm.h': 'شروط الخدمة', 'tm.upd': 'آخر تحديث: أكتوبر 2026',
      'tm.1h': 'خدماتنا', 'tm.1': 'خدماتنا مخصّصة وتُسعّر لكل مشروع. تعتمد التكلفة والمدة على نطاق العمل والمحتوى والتكاملات ومتطلبات الصيانة.',
      'tm.2h': 'قبل بدء العمل', 'tm.2': 'نتفق على النطاق والتكلفة والمدة وجولات التعديل قبل بدء أي عمل. أي تغييرات خارج النطاق المتفق عليه تُناقش وتُسعّر بشكل منفصل.',
      'tm.3h': 'العروض على هذا الموقع', 'tm.3': 'العروض والتصوّرات المعروضة على هذا الموقع نماذج وليست مشاريع عملاء، والأطباق والأسعار والأسماء فيها وهمية.',
      'tm.4h': 'تكاليف الأطراف الثالثة', 'tm.4': 'قد تترتب على النطاقات والاستضافة المدفوعة وخدمات الأطراف الثالثة رسوم خاصة بها، ونوضحها قبل اعتماد المشروع.',
      'tm.5h': 'التواصل', 'tm.5': 'لديك أسئلة حول هذه الشروط؟ راسلنا على',

      'nf.h': 'هذه الصفحة غير موجودة.', 'nf.p': 'ربما يكون الرابط قديماً. لنعدك إلى المسار الصحيح.', 'nf.b': 'العودة للرئيسية',

      'ft.tag': 'نربط الأفكار بالتقنية.', 'ft.contact': 'تواصل', 'ft.services': 'الخدمات', 'ft.company': 'الشركة',
      'ft.privacy': 'سياسة الخصوصية', 'ft.terms': 'شروط الخدمة', 'ft.rights': 'جميع الحقوق محفوظة.', 'ft.motto': 'نبني الغد الرقمي',
      'top': 'العودة للأعلى',

      'wa.title': 'تواصل معنا عبر واتساب', 'wa.sub': 'اختر الرقم الأنسب لك.', 'wa.loading': 'نجهّز لك الرقم المناسب…',
      'wa.close': 'إغلاق', 'wa.fab': 'تواصل معنا عبر واتساب',
      'wa.country.CA': 'كندا', 'wa.country.SY': 'سوريا',
      'wa.message': 'مرحباً WASL Technologies، أودّ الاستفسار عن خدماتكم.'
    }
  };

  const FAQ = [
    ['How long does a website take?', 'It depends on the number of pages, the design, the features and any external integrations. A simple informational site may take roughly 3–7 working days; larger sites two weeks to several weeks. These are initial estimates, not a guaranteed delivery date. We set the timeline after understanding your requirements, receiving the materials we need and agreeing on the project scope.',
     'كم يستغرق تنفيذ موقع ويب؟', 'تعتمد المدة على عدد الصفحات، والتصميم المطلوب، والميزات والربط مع الخدمات الخارجية. قد يحتاج الموقع التعريفي البسيط تقريباً من 3 إلى 7 أيام عمل، وقد يحتاج الموقع الأكبر من أسبوعين إلى عدة أسابيع. هذه تقديرات أولية وليست موعد تسليم مضموناً. نحدد المدة بعد فهم المتطلبات واستلام المواد اللازمة والاتفاق على نطاق المشروع.'],
    ['What information do you need to start?', 'Your business name, a description of your services or products, your logo and colors if you have them, texts and images, contact details, and examples of sites you like. If materials aren’t ready, we can agree to prepare them within the project scope and cost.',
     'ما المعلومات المطلوبة للبدء بالمشروع؟', 'نحتاج إلى اسم النشاط التجاري، ووصف الخدمات أو المنتجات، والشعار والألوان إن وجدت، والنصوص والصور، وطرق التواصل، وأمثلة عن المواقع التي تعجبك. وإذا لم تكن المواد جاهزة، يمكننا الاتفاق على تجهيزها ضمن نطاق المشروع وتكلفته.'],
    ['How much does a website cost?', 'Cost varies with the number of pages, custom design, required features, and whether an admin panel, database or online store is needed. After receiving your project details we send a clear quote covering scope, cost, timeline and any external fees. We don’t publish fixed prices before the scope is defined.',
     'كم تبلغ تكلفة تصميم الموقع؟', 'تختلف التكلفة حسب عدد الصفحات، والتصميم المخصّص، والميزات المطلوبة، ووجود لوحة إدارة أو قاعدة بيانات أو متجر إلكتروني. بعد استلام تفاصيل المشروع، نقدّم عرضاً واضحاً يحدد نطاق العمل والتكلفة والمدة وأي رسوم خارجية محتملة. لا نعرض أسعاراً ثابتة قبل تحديد نطاق المشروع.'],
    ['Can you build a restaurant menu with a QR code?', 'Yes. We can design a mobile-friendly digital menu with categories, dishes, photos, prices and restaurant info. A QR code can open the published menu link, with print-ready designs for tables or packaging. We confirm whether managing items and prices from a dashboard is part of the package or an add-on.',
     'هل يمكن إنشاء منيو مطعم وربطه برمز QR؟', 'نعم، يمكن تصميم منيو رقمي متوافق مع الجوال، يحتوي على الأقسام والأطباق والصور والأسعار ومعلومات المطعم. يمكن إنشاء رمز QR يفتح رابط المنيو المنشور، وتجهيز تصاميم قابلة للطباعة للطاولات أو التغليف. ونوضح ما إذا كانت إدارة الأصناف وتعديل الأسعار من لوحة تحكم ضمن الباقة أو خدمة إضافية.'],
    ['Can you create a digital gift with private names, photos and messages?', 'Yes. We can design a custom gift page with names, messages, photos, important dates, visual effects and optional music. Final features depend on the agreed package. A custom song can also be requested based on your story and style, after agreeing on production, delivery and usage rights.',
     'هل يمكن إنشاء هدية رقمية بأسماء وصور ورسائل خاصة؟', 'نعم، يمكن تصميم صفحة هدية مخصّصة تتضمن الأسماء والرسائل والصور والتواريخ المهمة وتأثيرات بصرية وموسيقى اختيارية. تعتمد الخصائص النهائية على الباقة المتفق عليها. ويمكن أيضاً طلب أغنية مخصّصة وفق قصتك والأسلوب الذي تحبه، بعد الاتفاق على طريقة الإنتاج والتسليم وحقوق الاستخدام.'],
    ['Can I request changes after delivery?', 'Revision rounds can be set in the initial agreement, and extra updates or ongoing maintenance can be arranged separately. Before work starts we clarify which changes the price includes and what counts as new development outside the scope.',
     'هل يمكنني طلب تعديلات بعد تسليم الموقع؟', 'يمكن تحديد جولات تعديل ضمن الاتفاق الأولي، مع إمكانية طلب تحديثات إضافية أو صيانة مستمرة باتفاق منفصل. نوضح قبل بدء العمل ما يتضمنه السعر من تعديلات وما يُعدّ تطويراً جديداً خارج نطاق المشروع.'],
    ['Does the site include hosting and a domain name?', 'Some sites can be published on free hosting within its limits and terms. A custom domain such as .com may require annual registration and renewal fees. We explain hosting, domain and third-party costs before the project is approved, and we don’t promise everything will always be free.',
     'هل يشمل الموقع الاستضافة واسم النطاق؟', 'يمكن نشر بعض المواقع على خدمات استضافة مجانية ضمن حدودها وشروطها. أما اسم النطاق الخاص مثل .com فقد يحتاج إلى رسوم تسجيل وتجديد سنوية. نوضح تكاليف الاستضافة والنطاق والخدمات الخارجية قبل اعتماد المشروع، ولا نعد بأن جميع الميزات ستكون مجانية دائماً.'],
    ['How do I follow my request and contact the team?', 'Send your project details through a form on this site, on WhatsApp or by email. You’ll see a clear message when you submit, and we never show a success message if your request wasn’t actually sent.',
     'كيف أتابع طلبي وأتواصل مع الفريق؟', 'أرسل تفاصيل مشروعك عبر أحد النماذج في هذا الموقع، أو عبر واتساب أو البريد الإلكتروني. تظهر لك رسالة واضحة عند الإرسال، ولا نعرض رسالة نجاح إذا لم يُرسل طلبك فعلياً.']
  ];

  const KEY = 'wasl.lang';
  let lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const t = k => (S[lang] && S[lang][k]) || S.en[k] || k;

  function setMeta() {
    const d = document.querySelector('meta[name=description]');
    if (d) d.setAttribute('content', t('meta.desc'));
  }

  function renderFaq() {
    const fq = document.getElementById('faq-list');
    if (!fq) return;
    const open = [...fq.querySelectorAll('details')].map(d => d.open);
    fq.innerHTML = '';
    FAQ.forEach((f, i) => {
      const d = document.createElement('details'); d.className = 'faq-item'; d.open = !!open[i];
      d.innerHTML = '<summary><span></span><i aria-hidden="true"></i></summary><div class="faq-a"><p></p></div>';
      d.querySelector('summary span').textContent = lang === 'ar' ? f[2] : f[0];
      d.querySelector('p').textContent = lang === 'ar' ? f[3] : f[1];
      fq.append(d);
    });
  }

  function apply() {
    const root = document.documentElement;
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => { const [a, k] = pair.split(':'); if (a && k) el.setAttribute(a.trim(), t(k.trim())); });
    });
    setMeta();
    renderFaq();
    document.querySelectorAll('[data-lang-toggle]').forEach(b => {
      b.querySelectorAll('[data-l]').forEach(s => s.classList.toggle('on', s.dataset.l === lang));
    });
    document.dispatchEvent(new CustomEvent('wasl:lang', { detail: lang }));
  }

  function set(l, manual) {
    lang = l === 'ar' ? 'ar' : 'en';
    if (manual) { try { localStorage.setItem(KEY, lang); } catch (e) {} }
    apply();
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lang-toggle]');
    if (b) set(lang === 'ar' ? 'en' : 'ar', true);
  });

  window.WASLi18n = { t, set, get lang() { return lang; } };
  apply();
})();
