// Bilingual strings (English / Arabic) and language switching.
// The initial language is chosen before first paint by the inline script in <head> (see detectLang there):
// ?lang= → saved manual choice → browser languages (first ar*/en*) → config fallback (en).
(function () {
  const S = {
    en: {
      'meta.title': 'WASL Technologies — Digital Experiences That Connect',
      'skip': 'Skip to content',
      'nav.home': 'Home', 'nav.services': 'Services', 'nav.work': 'Work', 'nav.about': 'About', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
      'nav.cta': 'Start a project', 'nav.menu': 'Menu', 'nav.close': 'Close menu', 'nav.lang': 'Switch language',
      'svc.web': 'Website Development', 'svc.web.d': 'Professional, responsive websites for companies, personal brands and projects.',
      'svc.menus': 'Digital Menus & QR', 'svc.menus.d': 'Modern restaurant menus linked straight to your customers through a QR code.',
      'svc.gifts': 'Personalized Digital Gifts', 'svc.gifts.d': 'Unique designs with photos, personal messages and custom songs.',
      'svc.exp': 'Digital Experiences', 'svc.exp.d': 'Custom solutions that fit your needs and turn your ideas into digital reality.',

      'hero.eyebrow': 'Websites · Digital menus · Digital gifts',
      'hero.t1': 'We turn your ideas into', 'hero.t2': 'exceptional digital experiences',
      'hero.lead': 'At WASL Technologies we combine creativity and technology to build websites, digital solutions and custom experiences that carry your ideas to the world.',
      'hero.cta1': 'Start your project', 'hero.cta2': 'Explore our services',
      'hero.p1': 'Bilingual, Arabic & English', 'hero.p2': 'Built for every screen', 'hero.p3': 'Clear scope & pricing',
      'art.site': 'Website', 'art.menu': 'QR menu', 'art.gift': 'Digital gift', 'art.bistro': 'Sample Bistro', 'art.open': 'Open menu',
      'art.for': 'For Layla', 'art.msg': 'Every moment with you…', 'art.live': 'Live', 'art.scan': 'Scan me',
      'art.d1': 'Fattoush', 'art.d2': 'Kebab', 'art.d3': 'Lemonade', 'art.brand': 'yourbrand.com', 'art.h': 'Ideas, designed.',

      'stmt.a': 'WASL means', 'stmt.b': 'connection.',
      'stmt.c': 'We use technology and creativity to connect businesses with their customers, and people with their memories.',

      'svcs.eb': 'Services', 'svcs.h': 'Digital solutions, crafted with care.',
      'svcs.lead': 'Innovative digital solutions that help you build a strong presence in the digital world.',
      'svcs.web.b1': 'Business & corporate sites', 'svcs.web.b2': 'Portfolios & landing pages', 'svcs.web.b3': 'Redesigns & maintenance',
      'svcs.menus.b1': 'Categories, photos & prices', 'svcs.menus.b2': 'Print-ready QR designs',
      'svcs.gifts.b1': 'Love pages & animated letters', 'svcs.gifts.b2': 'Custom song requests',
      'svcs.exp.b1': 'Tailored to your idea', 'svcs.exp.b2': 'Interactive concepts',
      'svcs.more': 'Service details', 'svcs.demo': 'Try the live demo',

      'proc.eb': 'How we work', 'proc.h': 'Four clear steps',
      'proc.1': 'Understand your idea', 'proc.1d': 'We listen first: your goals, your audience and the materials you have.',
      'proc.2': 'Plan the right solution', 'proc.2d': 'A clear scope, timeline and quote before any work starts.',
      'proc.3': 'Design and develop', 'proc.3d': 'Careful design and clean code, shared with you as we go.',
      'proc.4': 'Review and deliver', 'proc.4d': 'We test on real devices, refine the details, then launch.',

      'work.eb': 'Portfolio', 'work.h': 'Our work',
      'work.lead': 'Demo and concept pieces that show our creativity and the way we build digital solutions. They are not paid client projects.',
      'work.cta': 'Try the live demos', 'tag.demo': 'Demo', 'tag.concept': 'Concept',
      'work.1': 'Websites', 'work.1d': 'Professional website design',
      'work.2': 'Digital menus', 'work.2d': 'Interactive menus with QR',
      'work.3': 'Custom gifts', 'work.3d': 'Unique, personal digital gifts',
      'work.4': 'Creative solutions', 'work.4d': 'Custom digital experience concepts',

      'why.eb': 'Why WASL', 'why.h': 'Practical, careful, clear.',
      'why.1': 'Tailored solutions', 'why.1d': 'Each project starts from your idea, not a fixed template.',
      'why.2': 'Responsive design', 'why.2d': 'Built to work well on phones, tablets and desktops.',
      'why.3': 'Attention to detail', 'why.3d': 'Typography, spacing and small interactions get real care.',
      'why.4': 'Clear communication', 'why.4d': 'You know what is included, what it costs and what happens next.',

      'about.eb': 'About us', 'about.h': 'Two founders. One idea: connection.',
      'about.p': 'WASL Technologies is a technology company founded by two partners, Ahmed and Bashar. The name echoes the Arabic word for “connection”: we use technology and creativity to connect businesses with their customers and people with their memories.',
      'about.f': 'The founders', 'about.ahmed': 'Ahmed', 'about.bashar': 'Bashar', 'about.role': 'Co-founder',
      'about.s1': 'Technology,', 'about.s2': 'creativity,', 'about.s3': 'people.',

      'faq.eb': 'FAQ', 'faq.h': 'Frequently asked questions',

      'ct.eb': 'Contact', 'ct.h': 'Let’s build something together.',
      'ct.lead': 'We’re here to help. Send your project details and we’ll get back to you.',
      'ct.wa': 'WhatsApp', 'ct.wa.d': 'The fastest way to reach us.', 'ct.wa.btn': 'Message us',
      'ct.mail': 'Email', 'ct.mail.btn': 'Send an email',
      'ct.note': 'We reply as soon as we can. Pricing and timelines depend on project scope.',
      'f.name': 'Full name', 'f.email': 'Email', 'f.phone': 'WhatsApp or phone (optional)', 'f.service': 'Service of interest',
      'f.msg': 'Project details', 'f.send': 'Send request', 'f.sending': 'Sending…',
      'f.o1': 'Website Development', 'f.o2': 'Digital Menu & QR', 'f.o3': 'Personalized Digital Gift', 'f.o4': 'Digital Experiences', 'f.o5': 'Other',
      'f.req': 'Please complete the required fields.', 'f.bademail': 'Enter a valid email address.', 'f.badphone': 'Enter a valid phone number.',
      'f.ok': 'Thank you! We have received your inquiry and will contact you soon using the details you provided.',
      'f.fail': 'Sending failed. Your details are still here — please try again or contact us on WhatsApp or by email.',

      'cta.h': 'Have an idea? Let’s connect it to the world.', 'cta.b': 'Start your project',

      'ft.tag': 'Connecting People, Businesses and Ideas', 'ft.contact': 'Contact', 'ft.services': 'Services', 'ft.company': 'Company',
      'ft.privacy': 'Privacy Policy', 'ft.terms': 'Terms', 'ft.rights': 'All rights reserved.', 'ft.motto': 'Building Digital Tomorrow',
      'top': 'Back to top',

      'wa.title': 'Chat with us on WhatsApp', 'wa.sub': 'Choose the line that suits you.', 'wa.loading': 'Finding the right line for you…',
      'wa.close': 'Close', 'wa.fab': 'Contact us on WhatsApp',
      'wa.country.CA': 'Canada', 'wa.country.SY': 'Syria',
      'wa.message': 'Hello WASL Technologies, I would like to ask about your services.'
    },
    ar: {
      'meta.title': 'WASL Technologies — تجارب رقمية تصنع الاتصال',
      'skip': 'انتقل إلى المحتوى',
      'nav.home': 'الرئيسية', 'nav.services': 'الخدمات', 'nav.work': 'أعمالنا', 'nav.about': 'من نحن', 'nav.faq': 'الأسئلة الشائعة', 'nav.contact': 'تواصل معنا',
      'nav.cta': 'ابدأ مشروعك', 'nav.menu': 'القائمة', 'nav.close': 'إغلاق القائمة', 'nav.lang': 'تغيير اللغة',
      'svc.web': 'تطوير المواقع', 'svc.web.d': 'مواقع احترافية وسريعة الاستجابة لكل الأعمال والمشاريع.',
      'svc.menus': 'المنيو الرقمي و QR', 'svc.menus.d': 'قوائم طعام عصرية للمطاعم تربط مباشرة مع عملائك برمز QR.',
      'svc.gifts': 'هدايا رقمية مخصصة', 'svc.gifts.d': 'تصاميم فريدة وصور ورسائل خاصة وأغانٍ مخصصة بحسب طلبك.',
      'svc.exp': 'تجارب رقمية وحلول إبداعية', 'svc.exp.d': 'حلول مخصصة تناسب احتياجاتك وتحوّل أفكارك إلى واقع رقمي.',

      'hero.eyebrow': 'مواقع · منيو رقمي · هدايا رقمية',
      'hero.t1': 'نحوّل أفكارك إلى', 'hero.t2': 'تجارب رقمية استثنائية',
      'hero.lead': 'في WASL Technologies نجمع بين الإبداع والتقنية لصنع مواقع وحلول رقمية وتجارب مخصصة تساعد أفكارك على الوصول إلى العالم.',
      'hero.cta1': 'ابدأ مشروعك', 'hero.cta2': 'اكتشف خدماتنا',
      'hero.p1': 'ثنائي اللغة: عربي وإنجليزي', 'hero.p2': 'متجاوب مع كل الشاشات', 'hero.p3': 'نطاق وتكلفة واضحان',
      'art.site': 'موقع', 'art.menu': 'منيو QR', 'art.gift': 'هدية رقمية', 'art.bistro': 'مطعم تجريبي', 'art.open': 'افتح المنيو',
      'art.for': 'إلى ليلى', 'art.msg': 'كل لحظة معك…', 'art.live': 'مباشر', 'art.scan': 'امسح',
      'art.d1': 'فتوش', 'art.d2': 'كباب', 'art.d3': 'ليمون', 'art.brand': 'yourbrand.com', 'art.h': 'أفكار، بتصميم.',

      'stmt.a': '«وصل» تعني', 'stmt.b': 'الاتصال.',
      'stmt.c': 'نستخدم التقنية والإبداع لربط الأعمال بعملائها، والناس بذكرياتهم.',

      'svcs.eb': 'الخدمات', 'svcs.h': 'حلول رقمية، مصنوعة بعناية.',
      'svcs.lead': 'نقدم حلولاً رقمية مبتكرة تساعدك على بناء حضور قوي في العالم الرقمي.',
      'svcs.web.b1': 'مواقع الشركات والأعمال', 'svcs.web.b2': 'بورتفوليو وصفحات هبوط', 'svcs.web.b3': 'إعادة تصميم وصيانة',
      'svcs.menus.b1': 'أقسام وصور وأسعار', 'svcs.menus.b2': 'تصاميم QR جاهزة للطباعة',
      'svcs.gifts.b1': 'صفحات حب ورسائل متحركة', 'svcs.gifts.b2': 'طلبات أغانٍ مخصصة',
      'svcs.exp.b1': 'مصممة حول فكرتك', 'svcs.exp.b2': 'تصورات تفاعلية',
      'svcs.more': 'تفاصيل الخدمة', 'svcs.demo': 'جرّب العرض الحي',

      'proc.eb': 'كيف نعمل', 'proc.h': 'أربع خطوات واضحة',
      'proc.1': 'نفهم فكرتك', 'proc.1d': 'نستمع أولاً: أهدافك وجمهورك والمواد المتوفرة لديك.',
      'proc.2': 'نخطط الحل المناسب', 'proc.2d': 'نطاق ومدة وعرض سعر واضح قبل بدء أي عمل.',
      'proc.3': 'نصمم ونطوّر', 'proc.3d': 'تصميم دقيق وكود نظيف، ونشاركك التقدم أولاً بأول.',
      'proc.4': 'نراجع ونسلّم', 'proc.4d': 'نختبر على أجهزة حقيقية، ونحسّن التفاصيل، ثم نطلق.',

      'work.eb': 'أعمالنا', 'work.h': 'أعمالنا',
      'work.lead': 'نماذج تجريبية وتصورات توضّح إبداعنا وطريقة بنائنا للحلول الرقمية، وليست مشاريع عملاء مدفوعة.',
      'work.cta': 'جرّب العروض الحيّة', 'tag.demo': 'تجريبي', 'tag.concept': 'تصوّر',
      'work.1': 'مواقع إلكترونية', 'work.1d': 'تصميم وتطوير مواقع احترافية',
      'work.2': 'قوائم رقمية', 'work.2d': 'منيوهات تفاعلية مع QR',
      'work.3': 'هدايا مخصصة', 'work.3d': 'هدايا رقمية فريدة وشخصية',
      'work.4': 'حلول إبداعية', 'work.4d': 'تجارب رقمية مخصصة',

      'why.eb': 'لماذا WASL؟', 'why.h': 'عملي ودقيق وواضح.',
      'why.1': 'حلول مفصّلة', 'why.1d': 'كل مشروع ينطلق من فكرتك وليس من قالب جاهز.',
      'why.2': 'تصميم متجاوب', 'why.2d': 'يعمل بشكل جيد على الجوال واللوحي وسطح المكتب.',
      'why.3': 'اهتمام بالتفاصيل', 'why.3d': 'نعتني بالخطوط والمسافات والتفاعلات الصغيرة.',
      'why.4': 'تواصل واضح', 'why.4d': 'تعرف ما الذي يشمله العمل وتكلفته والخطوة التالية.',

      'about.eb': 'من نحن', 'about.h': 'شريكان. وفكرة واحدة: الاتصال.',
      'about.p': 'WASL Technologies شركة تقنية أسّسها شريكان هما أحمد وبشار. اسم «وصل» يعني الاتصال والربط، ونستخدم التقنية والإبداع لربط الأعمال بعملائها والناس بذكرياتهم.',
      'about.f': 'المؤسسون', 'about.ahmed': 'أحمد', 'about.bashar': 'بشار', 'about.role': 'مؤسس مشارك',
      'about.s1': 'تقنية،', 'about.s2': 'إبداع،', 'about.s3': 'أشخاص.',

      'faq.eb': 'الأسئلة الشائعة', 'faq.h': 'الأسئلة الشائعة',

      'ct.eb': 'تواصل معنا', 'ct.h': 'لنبنِ شيئاً معاً.',
      'ct.lead': 'نحن هنا للمساعدة! أرسل لنا تفاصيل مشروعك وسنعود إليك في أقرب وقت.',
      'ct.wa': 'واتساب', 'ct.wa.d': 'أسرع طريقة للتواصل معنا.', 'ct.wa.btn': 'راسلنا الآن',
      'ct.mail': 'البريد الإلكتروني', 'ct.mail.btn': 'إرسال بريد',
      'ct.note': 'سنقوم بالرد عليك في أقرب وقت ممكن. التكلفة والمدة تعتمدان على نطاق المشروع.',
      'f.name': 'الاسم الكامل', 'f.email': 'البريد الإلكتروني', 'f.phone': 'واتساب أو رقم الهاتف (اختياري)', 'f.service': 'الخدمة المطلوبة',
      'f.msg': 'تفاصيل المشروع', 'f.send': 'إرسال الطلب', 'f.sending': 'جارٍ الإرسال…',
      'f.o1': 'تطوير المواقع', 'f.o2': 'المنيو الرقمي و QR', 'f.o3': 'هدية رقمية مخصصة', 'f.o4': 'تجارب رقمية', 'f.o5': 'أخرى',
      'f.req': 'يرجى تعبئة الحقول المطلوبة.', 'f.bademail': 'أدخل بريداً إلكترونياً صحيحاً.', 'f.badphone': 'أدخل رقم هاتف صحيحاً.',
      'f.ok': 'شكراً لك! وصلنا استفسارك وسنتواصل معك قريباً عبر البيانات التي زوّدتنا بها.',
      'f.fail': 'تعذّر الإرسال. بياناتك ما زالت محفوظة في النموذج — حاول مجدداً أو تواصل معنا عبر واتساب أو البريد.',

      'cta.h': 'لديك فكرة؟ لنصلها بالعالم.', 'cta.b': 'ابدأ مشروعك',

      'ft.tag': 'نربط الناس والأعمال والأفكار', 'ft.contact': 'تواصل', 'ft.services': 'الخدمات', 'ft.company': 'الشركة',
      'ft.privacy': 'سياسة الخصوصية', 'ft.terms': 'الشروط', 'ft.rights': 'جميع الحقوق محفوظة.', 'ft.motto': 'نبني الغد الرقمي',
      'top': 'العودة للأعلى',

      'wa.title': 'تواصل معنا عبر واتساب', 'wa.sub': 'اختر الرقم الأنسب لك.', 'wa.loading': 'نجهّز لك الرقم المناسب…',
      'wa.close': 'إغلاق', 'wa.fab': 'تواصل معنا عبر واتساب',
      'wa.country.CA': 'كندا', 'wa.country.SY': 'سوريا',
      'wa.message': 'مرحباً WASL Technologies، أريد الاستفسار عن خدماتكم.'
    }
  };

  const FAQ = [
    ['How long does a website take?', 'It depends on the number of pages, the design, the features and any external integrations. A simple informational site may take roughly 3–7 working days; larger sites two weeks to several weeks. These are initial estimates, not a guaranteed delivery date. We set the timeline after understanding requirements, receiving the necessary materials and agreeing on the project scope.',
     'كم يستغرق تنفيذ موقع ويب؟', 'تعتمد المدة على عدد الصفحات، والتصميم المطلوب، والميزات والربط مع الخدمات الخارجية. يمكن أن يحتاج الموقع التعريفي البسيط تقريباً من 3 إلى 7 أيام عمل، وقد يحتاج الموقع الأكبر من أسبوعين إلى عدة أسابيع. هذه تقديرات أولية وليست موعد تسليم مضموناً. نحدد المدة بعد فهم المتطلبات واستلام المواد اللازمة والاتفاق على نطاق المشروع.'],
    ['What information do you need to start?', 'Your business name, a description of your services or products, your logo and colors if you have them, texts and images, contact details, and examples of sites you like. If materials aren’t ready, we can agree to prepare them within the project scope and cost.',
     'ما المعلومات المطلوبة للبدء بالمشروع؟', 'نحتاج إلى اسم النشاط التجاري، ووصف الخدمات أو المنتجات، والشعار والألوان إن وجدت، والنصوص والصور، وطرق التواصل، وأمثلة عن المواقع التي تعجب العميل. وإذا لم تكن المواد جاهزة، يمكننا الاتفاق على تجهيزها ضمن نطاق المشروع وتكلفته.'],
    ['How much does a website cost?', 'Cost varies with the number of pages, custom design, required features, and whether an admin panel, database or online store is needed. After receiving your project details we send a clear quote covering scope, cost, timeline and any external fees. We don’t publish fixed prices before the scope is defined.',
     'كم تبلغ تكلفة تصميم الموقع؟', 'تختلف التكلفة حسب عدد الصفحات، والتصميم المخصص، والميزات المطلوبة، ووجود لوحة إدارة أو قاعدة بيانات أو متجر إلكتروني. بعد استلام تفاصيل المشروع، نقدم عرضاً واضحاً يحدد نطاق العمل والتكلفة والمدة وأي رسوم خارجية محتملة. لا نعرض أسعاراً ثابتة معتمدة قبل تحديد نطاق المشروع.'],
    ['Can you build a restaurant menu with a QR code?', 'Yes. We can design a mobile-friendly digital menu with categories, dishes, photos, prices and restaurant info. A QR code can open the published menu link, with print-ready designs for tables or packaging. We confirm whether managing items and prices from a dashboard is part of the package or an add-on.',
     'هل يمكن إنشاء منيو مطعم وربطه برمز QR؟', 'نعم، يمكن تصميم منيو رقمي متوافق مع الموبايل، يحتوي على التصنيفات والأطباق والصور والأسعار ومعلومات المطعم. يمكن إنشاء QR يفتح رابط المنيو المنشور، وتجهيز تصاميم قابلة للطباعة للطاولات أو التغليف. يجب تحديد ما إذا كانت إدارة الأصناف وتعديل الأسعار من لوحة تحكم ضمن الباقة أو خدمة إضافية.'],
    ['Can you create a digital gift with private names, photos and messages?', 'Yes. We can design a custom gift page with names, messages, photos, important dates, visual effects and optional music. Final features depend on the agreed package. A custom song can also be requested based on your story and style, after agreeing on production, delivery and usage rights.',
     'هل يمكن إنشاء هدية رقمية بأسماء وصور ورسائل خاصة؟', 'نعم، يمكن تصميم صفحة هدية مخصصة تتضمن الأسماء والرسائل والصور والتواريخ المهمة وتأثيرات بصرية وموسيقى اختيارية. تعتمد الخصائص النهائية على الباقة المتفق عليها. يمكن أيضاً طلب أغنية مخصصة وفق القصة والأسلوب المطلوب، بعد الاتفاق على طريقة الإنتاج والتسليم وحقوق الاستخدام.'],
    ['Can I request changes after delivery?', 'Revision rounds can be set in the initial agreement, and extra updates or ongoing maintenance can be arranged separately. Before work starts we clarify which changes the price includes and what counts as new development outside the scope.',
     'هل يمكنني طلب تعديلات بعد تسليم الموقع؟', 'يمكن تحديد جولات تعديل ضمن الاتفاق الأولي، مع إمكانية طلب تحديثات إضافية أو صيانة مستمرة باتفاق منفصل. نوضح قبل بدء العمل ما يتضمنه السعر من تعديلات وما يعتبر تطويراً جديداً خارج نطاق المشروع.'],
    ['Does the site include hosting and a domain name?', 'Some sites can be published on free hosting within its limits and terms. A custom domain such as .com may require annual registration and renewal fees. We explain hosting, domain and third-party costs before the project is approved, and we don’t promise everything will always be free.',
     'هل يشمل الموقع الاستضافة واسم النطاق؟', 'يمكن نشر بعض المواقع على خدمات استضافة مجانية ضمن حدودها وشروطها. أما اسم النطاق الخاص مثل .com فقد يحتاج إلى رسوم تسجيل وتجديد سنوية. نوضح للعميل تكاليف الاستضافة والنطاق والخدمات الخارجية قبل اعتماد المشروع، ولا نعد بأن جميع الميزات ستكون مجانية دائماً.'],
    ['How do I follow my request and contact the team?', 'Send your project details through the contact form, WhatsApp or email. You’ll see a clear message when you submit, and which channel the team receives it through. We never show a success message if the request wasn’t actually sent.',
     'كيف أتابع طلبي وأتواصل مع الفريق؟', 'يمكنك إرسال تفاصيل المشروع عبر نموذج التواصل أو واتساب أو البريد الإلكتروني. تظهر لك رسالة واضحة عند إرسال الطلب، وتعرف وسيلة التواصل التي سيستقبل الفريق الطلب من خلالها. لا نعرض رسالة نجاح إذا لم يتم إرسال الطلب فعلياً.']
  ];

  const KEY = 'wasl.lang';
  let lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const t = k => (S[lang] && S[lang][k]) || S.en[k] || k;

  function apply() {
    const root = document.documentElement;
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => { const [a, k] = pair.split(':'); if (a && k) el.setAttribute(a.trim(), t(k.trim())); });
    });
    document.title = t('meta.title');
    const fq = document.getElementById('faq-list');
    if (fq) {
      fq.innerHTML = '';
      FAQ.forEach((f, i) => {
        const d = document.createElement('details'); d.className = 'faq-item';
        d.innerHTML = '<summary><span></span><i aria-hidden="true"></i></summary><div class="faq-a"><p></p></div>';
        d.querySelector('summary span').textContent = lang === 'ar' ? f[2] : f[0];
        d.querySelector('p').textContent = lang === 'ar' ? f[3] : f[1];
        fq.append(d);
      });
    }
    document.querySelectorAll('[data-lang-toggle]').forEach(b => {
      b.setAttribute('aria-pressed', 'false');
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
