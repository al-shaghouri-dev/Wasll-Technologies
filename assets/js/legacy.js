const C=window.WASL,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let lang=localStorage.getItem('lang')||C.defaultLang;
$$('[data-en]').forEach(e=>{ if(!e.dataset.en||e.dataset.en===e.textContent.trim()||true) e.dataset.en=e.dataset.en });
function setLang(l){lang=l;try{localStorage.setItem('lang',l)}catch(e){}
 document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';$('#lang').value=l;
 $$('[data-en]').forEach(e=>e.textContent=l==='ar'&&e.dataset.ar?e.dataset.ar:e.dataset.en);renderMenu();renderWork();renderChan();}
$('#lang').onchange=e=>setLang(e.target.value);
// Router
const titles={'/':'Home','/web':'Web Development','/menus':'Restaurant Menus & QR','/gifts':'Personalized Digital Gifts','/work':'Our Work','/about':'About','/faq':'FAQ','/contact':'Contact','/privacy':'Privacy Policy','/terms':'Terms of Service'};
function route(){let p=location.hash.replace('#','')||'/';const p0=p;if(SECM[p]){history.replaceState(null,'','#/');p='/';setTimeout(()=>go(SECM[p0]),80)}
 if(!titles[p])p='404';$$('section.pg').forEach(s=>s.classList.toggle('on',s.dataset.p===p));
 $$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+p));
 document.title=(titles[p]||'Not found')+' — WASL Technologies';scrollTo(0,0);$('#links').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');}
addEventListener('hashchange',route);
$('#burger').onclick=()=>{const o=$('#links').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o);if(o)$('#links a').focus()};
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#links').classList.contains('open')){$('#links').classList.remove('open');$('#burger').focus()}});
// Menu demo
const dishes=[['Starters','Lentil Soup','شوربة عدس',12],['Starters','Fattoush','فتوش',14],['Mains','Grilled Chicken Plate','طبق دجاج مشوي',32],['Mains','Beef Kebab','كباب لحم',38],['Mains','Veggie Rice Bowl','طبق أرز بالخضار',26],['Desserts','Date Pudding','بودينغ التمر',16],['Desserts','Kunafa Bite','لقمة كنافة',18],['Drinks','Mint Lemonade','ليمون بالنعناع',10],['Drinks','Arabic Coffee','قهوة عربية',8]];
let mcat='All';
function renderMenu(){const q=$('#mq').value.toLowerCase(),cats=['All',...new Set(dishes.map(d=>d[0]))];
 $('#mc').innerHTML='';cats.forEach(c=>{const b=document.createElement('button');b.className='chip'+(c===mcat?' on':'');b.textContent=c;b.onclick=()=>{mcat=c;renderMenu()};$('#mc').append(b)});
 const r=dishes.filter(d=>(mcat==='All'||d[0]===mcat)&&(d[1]+d[2]).toLowerCase().includes(q));
 $('#ml').innerHTML=r.map(d=>`<div class="card"><span class="tag">${d[0]}</span><h3>${lang==='ar'?d[2]:d[1]}</h3><b>${d[3]} <small class="mu">(sample)</small></b></div>`).join('');$('#me').hidden=r.length>0;}
$('#mq').oninput=renderMenu;
if(0)$('#qr').innerHTML='<b>QR placeholder</b><br>'+(location.origin.startsWith('http')?location.origin+location.pathname:'')+'#/menus';
// Portfolio
const work=[['Websites','Studio Landing Concept','Responsive landing page concept.','HTML, CSS, JS','Concept'],['Restaurant Menus','Sample Restaurant Menu','Searchable bilingual menu with fictional dishes.','HTML, JS','Demo'],['Digital Gifts','Love Page Demo','Themed personalized gift preview.','HTML, CSS, JS','Demo'],['Experimental Concepts','Animated Letter Idea','Envelope-opening letter concept.','CSS','Concept']];
let wcat='All';
function renderWork(){if(!$('#wf'))return;const cats=['All',...new Set(work.map(w=>w[0]))];$('#wf').innerHTML='';cats.forEach(c=>{const b=document.createElement('button');b.className='chip'+(c===wcat?' on':'');b.textContent=c;b.onclick=()=>{wcat=c;renderWork()};$('#wf').append(b)});
 $('#wl').innerHTML=work.filter(w=>wcat==='All'||w[0]===wcat).map(w=>`<article class="card"><span class="tag">${w[4]}</span> <span class="mu">${w[0]}</span><h3>${w[1]}</h3><p class="mu">${w[2]}</p><small class="mu">${w[3]}</small></article>`).join('');}
// Gift demo
let theme='burgundy';
function gift(){$('#gp').className='gift th-'+theme;$('#gpn').textContent=$('#gn').value.trim()||'For Someone Special';$('#gpm').textContent=$('#gm').value.trim()||'Your message appears here.';$$('#gt .chip').forEach(b=>b.classList.toggle('on',b.dataset.t===theme));}
$$('#gt .chip').forEach(b=>b.onclick=()=>{theme=b.dataset.t;gift()});$('#gn').oninput=$('#gm').oninput=gift;
$('#gr').onclick=()=>{$('#gn').value='';$('#gm').value='';theme='burgundy';gift()};
// Contact channels
const wa=C.whatsapp?`https://wa.me/${C.whatsapp.replace(/\D/g,'')}`:'';
function renderChan(){const s=[];if(wa)s.push(`<a href="${wa}" rel="noopener">WhatsApp</a>`);if(C.email)s.push(`<a href="mailto:${C.email}">${C.email}</a>`);
 Object.entries(C.social).forEach(([k,v])=>v&&s.push(`<a href="${v}" rel="noopener" target="_blank">${k}</a>`));
 const t=s.length?s.join(' · '):(lang==='ar'?'قنوات التواصل غير مضبوطة بعد (ملف config.js).':'Contact channels not configured yet (edit config.js).');
 $('#chan').innerHTML=t;$('#soc').innerHTML=s.join('<br>');$$('[data-wa]').forEach(a=>{if(wa)a.href=wa})}
// Forms
const t=(en,ar)=>lang==='ar'?ar:en;
const FAQ=[
["كم يستغرق تنفيذ موقع ويب؟","تعتمد المدة على عدد الصفحات، والتصميم المطلوب، والميزات والربط مع الخدمات الخارجية. يمكن أن يحتاج الموقع التعريفي البسيط تقريباً من 3 إلى 7 أيام عمل، وقد يحتاج الموقع الأكبر من أسبوعين إلى عدة أسابيع. هذه تقديرات أولية وليست موعد تسليم مضموناً. نحدد المدة بعد فهم المتطلبات واستلام المواد اللازمة والاتفاق على نطاق المشروع.","How long does a website take?","It depends on the number of pages, the design, the features and any external integrations. A simple informational site may take roughly 3–7 working days; larger sites two weeks to several weeks. These are initial estimates, not a guaranteed delivery date. We set the timeline after understanding requirements, receiving materials and agreeing the scope."],
["ما المعلومات المطلوبة للبدء بالمشروع؟","نحتاج إلى اسم النشاط التجاري، ووصف الخدمات أو المنتجات، والشعار والألوان إن وجدت، والنصوص والصور، وطرق التواصل، وأمثلة عن المواقع التي تعجب العميل. وإذا لم تكن المواد جاهزة، يمكننا الاتفاق على تجهيزها ضمن نطاق المشروع وتكلفته.","What information do you need to start?","Your business name, a description of your services or products, your logo and colors if you have them, texts and images, contact details, and examples of sites you like. If materials aren’t ready, we can agree to prepare them within the project scope and cost."],
["كم تبلغ تكلفة تصميم الموقع؟","تختلف التكلفة حسب عدد الصفحات، والتصميم المخصص، والميزات المطلوبة، ووجود لوحة إدارة أو قاعدة بيانات أو متجر إلكتروني. بعد استلام تفاصيل المشروع، نقدم عرضاً واضحاً يحدد نطاق العمل والتكلفة والمدة وأي رسوم خارجية محتملة. لا نعرض أسعاراً ثابتة معتمدة قبل تحديد نطاق المشروع.","How much does a website cost?","Cost varies with the number of pages, custom design, required features, and whether an admin panel, database or online store is needed. After receiving your project details we send a clear quote covering scope, cost, timeline and any external fees. We don’t publish fixed prices before the scope is defined."],
["هل يمكن إنشاء منيو مطعم وربطه برمز QR؟","نعم، يمكن تصميم منيو رقمي متوافق مع الموبايل، يحتوي على التصنيفات والأطباق والصور والأسعار ومعلومات المطعم. يمكن إنشاء QR يفتح رابط المنيو المنشور، وتجهيز تصاميم قابلة للطباعة للطاولات أو التغليف. يجب تحديد ما إذا كانت إدارة الأصناف وتعديل الأسعار من لوحة تحكم ضمن الباقة أو خدمة إضافية.","Can you build a restaurant menu with a QR code?","Yes. We can design a mobile-friendly digital menu with categories, dishes, photos, prices and restaurant info. A QR code can open the published menu link, with print-ready designs for tables or packaging. We confirm whether managing items and prices from a dashboard is part of the package or an add-on."],
["هل يمكن إنشاء هدية رقمية بأسماء وصور ورسائل خاصة؟","نعم، يمكن تصميم صفحة هدية مخصصة تتضمن الأسماء والرسائل والصور والتواريخ المهمة وتأثيرات بصرية وموسيقى اختيارية. تعتمد الخصائص النهائية على الباقة المتفق عليها. يمكن أيضاً طلب أغنية مخصصة وفق القصة والأسلوب المطلوب، بعد الاتفاق على طريقة الإنتاج والتسليم وحقوق الاستخدام.","Can you create a digital gift with private names, photos and messages?","Yes. We can design a custom gift page with names, messages, photos, important dates, visual effects and optional music. Final features depend on the agreed package. A custom song can also be requested based on your story and style, after agreeing on production, delivery and usage rights."],
["هل يمكنني طلب تعديلات بعد تسليم الموقع؟","يمكن تحديد جولات تعديل ضمن الاتفاق الأولي، مع إمكانية طلب تحديثات إضافية أو صيانة مستمرة باتفاق منفصل. نوضح قبل بدء العمل ما يتضمنه السعر من تعديلات وما يعتبر تطويراً جديداً خارج نطاق المشروع.","Can I request changes after delivery?","Revision rounds can be set in the initial agreement, and extra updates or ongoing maintenance can be arranged separately. Before work starts we clarify which changes the price includes and what counts as new development outside the scope."],
["هل يشمل الموقع الاستضافة واسم النطاق؟","يمكن نشر بعض المواقع على خدمات استضافة مجانية ضمن حدودها وشروطها. أما اسم النطاق الخاص مثل .com فقد يحتاج إلى رسوم تسجيل وتجديد سنوية. نوضح للعميل تكاليف الاستضافة والنطاق والخدمات الخارجية قبل اعتماد المشروع، ولا نعد بأن جميع الميزات ستكون مجانية دائماً.","Does the site include hosting and a domain name?","Some sites can be published on free hosting within its limits and terms. A custom domain such as .com may require annual registration and renewal fees. We explain hosting, domain and third-party costs before the project is approved, and we don’t promise everything will always be free."],
["كيف أتابع طلبي وأتواصل مع الفريق؟","يمكن للعميل إرسال تفاصيل المشروع عبر نموذج التواصل أو واتساب أو البريد الإلكتروني بعد إعداد روابط التواصل. تظهر له رسالة واضحة عند إرسال الطلب، ويعرف وسيلة التواصل التي سيستقبل الفريق الطلب من خلالها. لا نعرض رسالة نجاح إذا لم يتم إرسال الطلب فعلياً.","How do I follow my request and contact the team?","Send your project details through the contact form, WhatsApp or email once the contact links are set up. You’ll see a clear message when you submit, and which channel the team receives it through. We never show a success message if the request wasn’t actually sent."]];
function renderFaq(){$('#fq').innerHTML=FAQ.map(f=>`<details><summary>${lang==='ar'?f[0]:f[2]}</summary><p>${lang==='ar'?f[1]:f[3]}</p></details>`).join('')}
function buildForm(host,name,fields,one){const f=document.createElement('form');f.dataset.form=name;f.noValidate=true;if(one)f.dataset.one=one;
 f.innerHTML=fields.map(x=>{const wrap=(s)=>`<div class="fd${x.t==='textarea'?' full':''}">${s}</div>`;const id='f_'+name.replace(/\W/g,'')+x.n,L=`<label for="${id}" data-en="${x.en}${x.r?' *':''}" data-ar="${x.ar}${x.r?' *':''}"></label>`;
  if(x.t==='check')return `<div class="ck"><input type="checkbox" id="${id}" name="${x.n}"${x.r?' required':''}><span data-en="${x.en}" data-ar="${x.ar}"></span></div>`;
  const c=x.t==='select'?`<select id="${id}" name="${x.n}">${x.o.map(o=>`<option>${o}</option>`).join('')}</select>`:x.t==='textarea'?`<textarea id="${id}" name="${x.n}" rows="4"${x.r?' required':''}></textarea>`:`<input id="${id}" name="${x.n}" type="${x.t||'text'}"${x.r?' required':''}>`;return wrap(L+c)}).join('')+
 '<input class="hp" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn p" data-en="Send" data-ar="إرسال">Send</button><div class="msg" role="status" aria-live="polite"></div><p class="mu dm"></p>';
 host.append(f);return f}
const SV=['Website Development','Restaurant Menu & QR','Personalized Digital Gifts','Custom Songs','Other'];
buildForm($('#cf'),'Project request',[{n:'name',en:'Full name',ar:'الاسم الكامل',r:1},{n:'email',t:'email',en:'Email',ar:'البريد الإلكتروني',r:1},{n:'phone',t:'tel',en:'WhatsApp or phone (optional)',ar:'واتساب أو رقم الهاتف (اختياري)'},{n:'service',t:'select',en:'Service of interest',ar:'الخدمة المطلوبة',r:1,o:['Website Development / تطوير المواقع','Digital Menu & QR / المنيو الرقمي','Personalized Digital Gift / هدية رقمية','Digital Experiences / تجارب رقمية','Other / أخرى']},{n:'message',t:'textarea',en:'Project details',ar:'تفاصيل المشروع',r:1}]);

function wire(f){const m=$('.msg',f),note=$('.dm',f)||f.appendChild(Object.assign(document.createElement('p'),{className:'mu dm'}));note.style.cssText='font-size:13px;margin:0';
 const upd=()=>{note.textContent=C.formEndpoint?'':t('Demo mode: no form service is configured, so submitting opens your email/WhatsApp app (or sends nothing).','وضع تجريبي: لا توجد خدمة إرسال مهيأة، لذلك يفتح الإرسال تطبيق البريد/واتساب (أو لا يُرسل شيئاً).')};upd();f._upd=upd;
 f.onsubmit=async e=>{e.preventDefault();m.className='msg show';$$('[aria-invalid]',f).forEach(i=>i.removeAttribute('aria-invalid'));
  const err=(i,en,ar)=>{m.classList.add('err');m.textContent=t(en,ar);if(i){i.setAttribute('aria-invalid','true');i.focus()}};
  const miss=$$('[required]',f).find(i=>i.type==='checkbox'?!i.checked:!i.value.trim());if(miss)return err(miss,'Please complete the required fields.','يرجى تعبئة الحقول المطلوبة.');
  const em=f.elements.email,ph=f.elements.phone;
  if(em&&em.value.trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()))return err(em,'Enter a valid email address.','أدخل بريداً إلكترونياً صحيحاً.');
  if(ph&&ph.value.trim()&&!/^\+?[0-9\s\-()]{7,18}$/.test(ph.value.trim()))return err(ph,'Enter a valid phone number.','أدخل رقم هاتف صحيحاً.');
  if(f.dataset.one&&!f.dataset.one.split(',').some(n=>f.elements[n].value.trim()))return err(em,'Provide an email or a phone number.','أدخل بريداً أو رقم هاتف واحداً على الأقل.');
  if(f.elements._gotcha.value)return;
  const data={};$$('input,select,textarea',f).forEach(i=>{if(i.name&&i.name!=='_gotcha')data[i.name]=i.type==='checkbox'?(i.checked?'yes':'no'):i.value.trim().slice(0,2000)});data._form=f.dataset.form;
  const body=Object.entries(data).map(([k,v])=>k+': '+v).join('\n'),sub=`${f.dataset.form} — WASL`;
  if(C.formEndpoint){if(f._busy)return;f._busy=1;const bt=$('button',f),bl=bt.textContent;bt.disabled=true;bt.textContent=t('Sending…','جارٍ الإرسال…');m.textContent=t('Sending…','جارٍ الإرسال…');data._subject='WASL website inquiry';
   try{const r=await fetch(C.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(data)});
    if(r.ok){m.textContent=t('Thank you! We have received your inquiry and will contact you soon using the details you provided.','شكراً لك! وصلنا استفسارك وسنتواصل معك قريباً عبر البيانات التي زوّدتنا بها.');f.reset()}else throw 0}
   catch(x){err(null,'Sending failed. Your details are still here — please try again or contact us on WhatsApp or by email.','تعذّر الإرسال. بياناتك ما زالت محفوظة في النموذج — حاول مجدداً أو تواصل معنا عبر واتساب أو البريد.')}finally{f._busy=0;bt.disabled=false;bt.textContent=bl}return}
  if(C.email){location.href=`mailto:${C.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;m.textContent=t('Your email app opened; press send to complete your request.','فُتح تطبيق البريد؛ اضغط إرسال لإتمام طلبك.')}
  else if(wa){open(`${wa}?text=${encodeURIComponent(sub+'\n'+body)}`,'_blank','noopener');m.textContent=t('WhatsApp opened; send the message to complete your request.','فُتح واتساب؛ أرسل الرسالة لإتمام طلبك.')}
  else err(null,'Demo mode: nothing was sent. Configure formEndpoint, email or WhatsApp in config.js.','وضع تجريبي: لم يُرسل شيء. اضبط formEndpoint أو البريد أو واتساب في config.js.')}}
$$('form[data-form]').forEach(f=>{if(!f._upd)wire(f)});



// --- Mobile drawer ---
const DR=$('#drawer'),BG=$('#burger');let lastF=null;
function openD(){lastF=document.activeElement;document.body.classList.add('dopen','nolock');DR.setAttribute('aria-hidden','false');BG.setAttribute('aria-expanded','true');setTimeout(()=>$('#dclose').focus(),60)}
function closeD(rf){if(!document.body.classList.contains('dopen'))return;document.body.classList.remove('dopen','nolock');DR.setAttribute('aria-hidden','true');BG.setAttribute('aria-expanded','false');if(rf&&lastF&&lastF.focus)lastF.focus()}
BG.onclick=()=>document.body.classList.contains('dopen')?closeD(true):openD();
$('#dclose').onclick=()=>closeD(true);$('#ov').onclick=()=>closeD(true);
DR.addEventListener('click',e=>{if(e.target.closest('a'))closeD(false)});
document.addEventListener('keydown',e=>{if(!document.body.classList.contains('dopen'))return;if(e.key==='Escape'){closeD(true);return}
 if(e.key==='Tab'){const f=$$('a,button,select',DR);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
matchMedia('(min-width:1025px)').addEventListener('change',e=>{if(e.matches)closeD(false)});
$('#lang2').onchange=e=>setLang(e.target.value);
// --- Image safety net: logs failures, swaps in embedded fallbacks (never a broken icon) ---
const IMGFB=window.WASL_IMGFB||{},DBG=/localhost|127\.0\.0\.1/.test(location.hostname)||/[?&]debug/.test(location.search);
function imgFail(i){console.error('[WASL] image failed to load:',i.getAttribute('src'));if(DBG)i.classList.add('img-failed');if(i._f)return;i._f=1;const s=IMGFB[i.dataset.fb];if(s)i.src=s}
document.addEventListener('error',e=>{if(e.target.tagName==='IMG')imgFail(e.target)},true);
$$('img').forEach(i=>{if(i.complete&&!i.naturalWidth&&i.getAttribute('src'))imgFail(i)});
// --- Compact QR encoder (byte mode, ECC L, versions 1-5, mask 0) ---
function qrSvg(t){const d=[...new TextEncoder().encode(t)],cap=[19,34,55,80,108],en=[7,10,15,20,26];let v=0;while(v<5&&d.length+2>cap[v])v++;if(v>4)return '';const V=v+1,n=17+4*V,K=cap[v],E=en[v];
 const bits=[],P=(x,l)=>{for(let i=l-1;i>=0;i--)bits.push((x>>i)&1)};P(4,4);P(d.length,8);d.forEach(x=>P(x,8));for(let i=0;i<4&&bits.length<K*8;i++)bits.push(0);while(bits.length%8)bits.push(0);
 const cw=[];for(let i=0;i<bits.length;i+=8)cw.push(parseInt(bits.slice(i,i+8).join(''),2));for(let p=0;cw.length<K;p^=1)cw.push(p?0x11:0xEC);
 const ex=[],lg=[];let x=1;for(let i=0;i<255;i++){ex[i]=x;lg[x]=i;x<<=1;if(x>255)x^=0x11d}const mul=(a,b)=>a&&b?ex[(lg[a]+lg[b])%255]:0;
 let g=[1];for(let i=0;i<E;i++){const ng=Array(g.length+1).fill(0);g.forEach((c,j)=>{ng[j]^=c;ng[j+1]^=mul(c,ex[i])});g=ng}
 const r=[...cw,...Array(E).fill(0)];for(let i=0;i<K;i++){const c=r[i];if(c)g.forEach((q,j)=>r[i+j]^=mul(c,q))}
 const all=[...cw,...r.slice(K)],db=[];all.forEach(c=>P2(c));function P2(c){for(let i=7;i>=0;i--)db.push((c>>i)&1)}
 const m=Array.from({length:n},()=>Array(n).fill(0)),f=Array.from({length:n},()=>Array(n).fill(false)),S=(X,Y,b)=>{if(X>=0&&Y>=0&&X<n&&Y<n){m[Y][X]=b?1:0;f[Y][X]=true}};
 [[0,0],[n-7,0],[0,n-7]].forEach(([a,b])=>{for(let dy=-1;dy<=7;dy++)for(let dx=-1;dx<=7;dx++){const inn=dx>=0&&dx<=6&&dy>=0&&dy<=6;S(a+dx,b+dy,inn&&(dx==0||dx==6||dy==0||dy==6||(dx>=2&&dx<=4&&dy>=2&&dy<=4)))}});
 for(let i=8;i<n-8;i++){S(i,6,i%2==0);S(6,i,i%2==0)}
 if(V>1){const c=n-7;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)S(c+dx,c+dy,Math.max(Math.abs(dx),Math.abs(dy))!=1)}
 let rem=8;for(let i=0;i<10;i++)rem=(rem<<1)^((rem>>9)*0x537);const fm=(((8<<10)|(rem&0x3ff))^0x5412),B=i=>(fm>>i)&1;
 for(let i=0;i<=5;i++)S(8,i,B(i));S(8,7,B(6));S(8,8,B(7));S(7,8,B(8));for(let i=9;i<15;i++)S(14-i,8,B(i));
 for(let i=0;i<8;i++)S(n-1-i,8,B(i));for(let i=8;i<15;i++)S(8,n-15+i,B(i));S(8,n-8,1);
 let k=0,up=true;for(let X=n-1;X>0;X-=2){if(X==6)X--;for(let i=0;i<n;i++){const Y=up?n-1-i:i;for(let dx=0;dx<2;dx++){const C=X-dx;if(f[Y][C])continue;let b=k<db.length?db[k++]:0;if((C+Y)%2==0)b^=1;m[Y][C]=b}}up=!up}
 let s='';for(let y=0;y<n;y++)for(let X=0;X<n;X++)if(m[y][X])s+=`M${X+4} ${y+4}h1v1h-1z`;
 return `<svg viewBox="0 0 ${n+8} ${n+8}" role="img" aria-label="QR code to the demo menu" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${s}" fill="#000"/></svg>`}
const qrUrl=(C.siteUrl||location.href.split('#')[0])+'#/menus';
$$('[data-qr]').forEach(e=>e.innerHTML=qrSvg(qrUrl));
const qb=$('#qr');if(qb)qb.innerHTML=qrSvg(qrUrl)+'<div style="margin-top:6px">'+qrUrl+'</div>';
// --- Reveal, home filters, gift teaser ---
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12}):null;
$$('.rv').forEach(e=>io?io.observe(e):e.classList.add('in'));
function revealNow(){$$('.pg.on .rv').forEach(e=>{if(e.getBoundingClientRect().top<innerHeight)e.classList.add('in')})}
addEventListener('hashchange',()=>setTimeout(revealNow,50));
$$('#hwf .chip').forEach(b=>b.onclick=()=>{$$('#hwf .chip').forEach(x=>x.classList.toggle('on',x===b));$$('.mock').forEach(m=>m.hidden=b.dataset.c!=='all'&&m.dataset.c!==b.dataset.c)});
if($('#hn'))$('#hn').oninput=e=>$('#hgn').textContent=e.target.value.trim()||'For Someone Special';
// smooth in-page anchor for services
$$('a[href="#services"]').forEach(a=>a.onclick=e=>{e.preventDefault();if((location.hash||'#/')!=='#/'){location.hash='#/'}setTimeout(()=>$('#services').scrollIntoView({behavior:'smooth'}),60)});

// --- Stats, progress, top, menu close ---
function renderStats(){if(!$('#stt'))return;const S=C.stats||{},items=(S.items||[]).map(i=>({...i,v:S.demo?i.demoValue:Number(i.value)})).filter(i=>i.v>0);
 if(items.length){$('#stt').textContent=t('WASL in numbers','وصل بالأرقام');$('#stats').innerHTML=items.map(i=>`<div class="card stat"><b data-v="${i.v}">0</b>${lang==='ar'?i.ar:i.en}</div>`).join('');
  $('#statnote').textContent=S.demo?t('Demo data — sample numbers, not real figures.','بيانات تجريبية — أرقام توضيحية وليست حقيقية.'):'';
  const run=el=>{const v=+el.dataset.v;if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=v;return}let s=null;const st=ts=>{s=s||ts;const p=Math.min((ts-s)/1200,1);el.textContent=Math.round(v*p);if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)};
  const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);o.unobserve(e.target)}}));$$('#stats b').forEach(b=>o.observe(b))}
 else{$('#stt').textContent=t('What you can expect','ما يمكنك توقعه');$('#statnote').textContent='';$('#stats').innerHTML=[['3 service types','ثلاثة أنواع من الخدمات'],['Custom design support','دعم التصميم المخصص'],['Mobile-friendly solutions','حلول متوافقة مع الموبايل'],['Scalable projects','مشاريع قابلة للتطوير']].map(x=>`<div class="card stat"><b style="font-size:1.3rem">✓</b>${t(x[0],x[1])}</div>`).join('')}}
const _sl=setLang;setLang=function(l){_sl(l);if($('#lang2'))$('#lang2').value=l;renderFaq();renderStats();$$('form[data-form]').forEach(f=>f._upd&&f._upd())};
addEventListener('scroll',()=>{const d=document.documentElement,p=scrollY/(d.scrollHeight-innerHeight||1);$('#pb').style.width=(p*100)+'%';$('#top').hidden=scrollY<500},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
$$('.links a').forEach(a=>a.addEventListener('click',()=>{$('#links').classList.remove('open');$('#burger').setAttribute('aria-expanded','false')}));

// --- Navigation to sections, WhatsApp/email links ---
const SECM={'/work':'sec-work','/about':'sec-about','/faq':'sec-faq','/contact':'sec-contact'};
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function go(id){const run=()=>{const el=id==='top'?null:document.getElementById(id);if(!el)return scrollTo({top:0,behavior:RM?'auto':'smooth'});el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})};
 if((location.hash||'#/')!=='#/'){location.hash='#/';setTimeout(run,120)}else run()}
document.addEventListener('click',e=>{const a=e.target.closest('a[data-go]');if(a){e.preventDefault();go(a.dataset.go);$('#links').classList.remove('open');$('#burger').setAttribute('aria-expanded','false')}});
renderChan=function(){const w=C.whatsapp.replace(/\D/g,''),base=w?'https://wa.me/'+w:'';
 $$('[data-wa]').forEach(a=>{const m=lang==='ar'?(a.dataset.msg||''):'Hello WASL Technologies, I would like to ask about your services.';a.href=base+(m?'?text='+encodeURIComponent(m):'');a.target='_blank';a.rel='noopener noreferrer'});
 $$('[data-mail]').forEach(a=>{a.href='mailto:'+C.email;if(!a.hasAttribute('data-keep'))a.textContent=C.email});
 const so=Object.entries(C.social||{}).filter(([k,v])=>v).map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener noreferrer">${k}</a>`).join('');if($('#soc'))$('#soc').innerHTML=so};
if('IntersectionObserver'in window){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.links a[data-go]').forEach(a=>a.classList.toggle('on',a.dataset.go===(e.target.id==='hero'?'top':e.target.id)))}),{rootMargin:'-45% 0px -50% 0px'});['hero','sec-services','sec-work','sec-about','sec-faq','sec-contact'].forEach(i=>{const el=document.getElementById(i);el&&so.observe(el)})}
$('#yr').textContent=new Date().getFullYear();gift();setLang(lang);route();
