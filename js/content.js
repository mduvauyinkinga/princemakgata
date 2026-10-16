/* ============================================================
   Content — business data, services, reviews, lookbook
   Edit this file to update copy across the site.
   ============================================================ */

const SITE = {
  name: "Prince Makgata The Designer",
  brand: "PMd",
  whatsapp: "27782645976",
  phoneDisplay: "078 264 5976",
  phoneCall: "060 411 5179",
  email: "pcmakgata@gmail.com",
  address: "Shop No 1, Mimosa Centre, Botha Ave, Downtown eMalahleni (Witbank), Mpumalanga, 1039",
  defaultMessage: "Hi Prince, I'd like to book a consultation.",
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/PrinceMakgatathedesigner", icon: "f" },
    { name: "Instagram", url: "https://www.instagram.com/prince_makgata_the_designer", icon: "IG" },
    { name: "TikTok", url: "https://www.tiktok.com/@princemakgatathedesigner", icon: "T" }
  ]
};

function waLink(message) {
  return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(message);
}

/* ---------- Services ---------- */
const SERVICES = [
  {
    name: "Matric Dance & Graduation Wear",
    desc: "Custom suits and luxury gowns for matriculants and graduates across Mpumalanga. Designed for the photographs you'll keep forever.",
    cta: "I'd like to enquire about matric dance or graduation wear.",
    category: "occasion"
  },
  {
    name: "Wedding & Traditional Attire",
    desc: "High-end wedding gowns, bridal party dresses, tailored groom suits, and modernized African traditional wear including modern Sepedi designs.",
    cta: "I'd like to enquire about wedding or traditional attire.",
    category: "ceremonial"
  },
  {
    name: "Bespoke Casuals & Outerwear",
    desc: "Custom coats, jackets and a signature line of designer jeans — tailored casuals with the same precision as our formal wear.",
    cta: "I'd like to see your bespoke casuals and outerwear collection.",
    category: "casual"
  },
  {
    name: "3-in-1 Dress Rentals",
    desc: "Flexible rental options curated for clients seeking wardrobe diversity for pageants and galas.",
    cta: "I'd like to hire a 3-in-1 dress rental for an upcoming event.",
    category: "rental"
  },
  {
    name: "Custom Purchases",
    desc: "Tailor-made corsets, skirts, suits and dresses constructed to your individual measurements.",
    cta: "I'd like to place a custom order made to my measurements.",
    category: "custom"
  },
  {
    name: "Alterations & Tailoring",
    desc: "Hems, tapers, rescues and refinements on garments you already own — so precise they look untouched.",
    cta: "I have garments that need alterations — can I bring them in?",
    category: "alterations"
  },
  {
    name: "Private Consultation",
    desc: "Sit down with the designer. Fabric, fit and vision — walk out with a plan. Walk in, you never get lost.",
    cta: "I'd like to book a private consultation at the atelier.",
    category: "consultation"
  }
];

/* ---------- Reviews (real, from Google) ---------- */
const REVIEWS = [
  {
    name: "Karabo MK",
    meta: "Local Guide · 20 reviews · 7 photos · 3 years ago",
    stars: 5,
    text: "When you search it you never get lost, the coordinates are right on point. Their stuff is very friendly, welcoming and easy to talk to. @Prince Makgata The Designer is a Place to be and I highly recommend."
  },
  {
    name: "Patience Magagula",
    meta: "Local Guide · 11 reviews · 12 photos",
    stars: 5,
    text: "One of the best designers I know."
  },
  {
    name: "Mswatomhle Mswatomhle",
    meta: "Google review",
    stars: 5,
    text: "⭐️⭐️⭐️⭐️⭐️"
  },
  {
    name: "Sphiwe Tshabangu",
    meta: "Google review",
    stars: 5,
    text: "⭐️⭐️⭐️⭐️⭐️"
  },
  {
    name: "PRINCE MAKGATA",
    meta: "Google review",
    stars: 5,
    text: "⭐️⭐️⭐️⭐️⭐️"
  },
  {
    name: "Nomfundo Sindane",
    meta: "Google review",
    stars: 5,
    text: "⭐️⭐️⭐️⭐️⭐️"
  },
  {
    name: "Rendani Mukwevho",
    meta: "Google review",
    stars: 5,
    text: "⭐️⭐️⭐️⭐️⭐️⭐️"
  }
];

/* ---------- Lookbook ---------- */
const LOOKBOOK = [
  { name: "The Midnight Tux", hint: "View piece", tone: "#141210", accent: "#c9a227" },
  { name: "Heritage Protocol", hint: "View piece", tone: "#171310", accent: "#d8892f" },
  { name: "Golden Hour Gown", hint: "View piece", tone: "#151114", accent: "#e0b64a" },
  { name: "Boardroom Armour", hint: "View piece", tone: "#101316", accent: "#c9a227" },
  { name: "Ceremonial Silk", hint: "View piece", tone: "#16100f", accent: "#c1452e" },
  { name: "The eMalahleni Cut", hint: "View piece", tone: "#111410", accent: "#8fae5a" }
];

/* Build a tasteful editorial SVG placeholder for a lookbook card */
function lookSvg(item, index) {
  const num = String(index + 1).padStart(2, "0");
  return `
  <svg viewBox="0 0 400 533" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${item.name} placeholder">
    <defs>
      <linearGradient id="lg${index}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${item.tone}"/>
        <stop offset="1" stop-color="#050505"/>
      </linearGradient>
      <radialGradient id="rg${index}" cx="0.5" cy="0.35" r="0.75">
        <stop offset="0" stop-color="${item.accent}" stop-opacity="0.35"/>
        <stop offset="1" stop-color="${item.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="533" fill="url(#lg${index})"/>
    <rect width="400" height="533" fill="url(#rg${index})"/>
    <rect x="18" y="18" width="364" height="497" fill="none" stroke="${item.accent}" stroke-opacity="0.4"/>
    <text x="34" y="60" font-family="Georgia,serif" font-size="30" font-style="italic" fill="${item.accent}" fill-opacity="0.9">${num}</text>
    <path d="M200 170 L244 210 L232 330 L168 330 L156 210 Z" fill="none" stroke="${item.accent}" stroke-opacity="0.55" stroke-width="1.5"/>
    <path d="M200 170 L200 330 M170 235 L230 235" fill="none" stroke="${item.accent}" stroke-opacity="0.35"/>
    <circle cx="200" cy="150" r="22" fill="none" stroke="${item.accent}" stroke-opacity="0.55"/>
    <text x="200" y="470" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="19" fill="#f1ede4" fill-opacity="0.85">${item.name}</text>
    <text x="200" y="495" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="9.5" letter-spacing="3" fill="${item.accent}" fill-opacity="0.9">PRINCE MAKGATA</text>
  </svg>`;
}