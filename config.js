// كل الإعدادات القابلة للتعديل هنا / All editable settings live here
window.WASL = {
  name: "WASL Technologies",
  logo: "assets/logo.jpg",
  siteUrl: "https://waslltechnologies.vercel.app/", // primary site: QR codes and share links point here
  // Contact forms: paste a Formspree (or similar) endpoint URL, e.g. "https://formspree.io/f/xxxxxxx". Empty = demo mode (nothing is sent by the site itself).
  formEndpoint: "https://formspree.io/f/mrppbwyo",
  // Stats: only items with a real numeric value are shown. demo:true shows labelled sample numbers (never publish with demo:true).
  stats: { demo: false, items: [
    {id:"projects", en:"Completed projects", ar:"مشاريع منجزة", value:null, demoValue:12},
    {id:"clients",  en:"Clients",            ar:"عملاء",        value:null, demoValue:9},
    {id:"menus",    en:"Digital menus",      ar:"منيوهات رقمية", value:null, demoValue:6},
    {id:"gifts",    en:"Digital gifts",      ar:"هدايا رقمية",  value:null, demoValue:8}
  ]},
  defaultLang: "en",          // fallback only: the visitor's browser language (ar/en) is detected first
  // WhatsApp (digits only, with country code). Only the Canadian line is public configuration.
  // The Syrian line is served by api/contact (Vercel Edge) to non-Canadian visitors, with
  // assets/data/contact-intl.json as the static fallback (e.g. on GitHub Pages).
  whatsappNumbers: { CA: "16133050377" },
  contactApi: "https://waslltechnologies.vercel.app/api/contact", // used when the site is not served from *.vercel.app
  email: "technologieswasl@gmail.com",                  // e.g. "hello@yourdomain.com"
  social: { instagram:"", facebook:"", linkedin:"", github:"" } // full URLs
};
