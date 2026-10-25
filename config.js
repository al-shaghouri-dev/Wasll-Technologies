// كل الإعدادات القابلة للتعديل هنا / All editable settings live here
window.WASL = {
  name: "WASL Technologies",
  logo: "assets/logo.jpg",
  siteUrl: "",              // deployed URL used by the QR code (empty = current address)
  // Contact forms: paste a Formspree (or similar) endpoint URL, e.g. "https://formspree.io/f/xxxxxxx". Empty = demo mode (nothing is sent by the site itself).
  formEndpoint: "https://formspree.io/f/mrppbwyo",
  // Stats: only items with a real numeric value are shown. demo:true shows labelled sample numbers (never publish with demo:true).
  stats: { demo: false, items: [
    {id:"projects", en:"Completed projects", ar:"مشاريع منجزة", value:null, demoValue:12},
    {id:"clients",  en:"Clients",            ar:"عملاء",        value:null, demoValue:9},
    {id:"menus",    en:"Digital menus",      ar:"منيوهات رقمية", value:null, demoValue:6},
    {id:"gifts",    en:"Digital gifts",      ar:"هدايا رقمية",  value:null, demoValue:8}
  ]},
  defaultLang: "ar",          // "en" or "ar"
  whatsapp: "963946540671",               // digits only with country code, e.g. "9665xxxxxxxx"
  email: "technologieswasl@gmail.com",                  // e.g. "hello@yourdomain.com"
  social: { instagram:"", facebook:"", linkedin:"", github:"" } // full URLs
};
