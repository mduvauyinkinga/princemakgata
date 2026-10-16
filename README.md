# PrinceMakgataWebsite

Official website for **Prince Makgata The Designer** — a fashion accessories store in eMalahleni, South Africa.

**Design direction:** Runway Cinematic — dark luxury, gold on black, editorial typography.
**Stack:** 100% static HTML + CSS + vanilla JavaScript. No build step, no dependencies.

## Sections

1. Cinematic preloader (once per session, skippable)
2. Hero with animated title reveal + gold light flare
3. Infinite marquee ticker
4. The Designer (about + animated stats)
5. Lookbook (drag/scroll horizontal gallery + lightbox)
6. Services (each card opens WhatsApp with a pre-filled message)
7. Reviews (real Google reviews, 5.0 ★ / 7 reviews)
8. Visit us (address, hours, embedded Google Map, directions)
9. "LET'S TALK" finale CTA → WhatsApp
10. Footer + persistent floating WhatsApp button

## Editing content

All copy lives in plain files — no tools required:

- `js/content.js` — services, reviews, lookbook items, WhatsApp number
- `index.html` — hero text, about copy, hours, address, footer links
- `css/style.css` — colors (`:root` variables at the top), fonts, spacing

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploy on GitHub Pages

1. Create a GitHub repo (e.g. `PrinceMakgataWebsite`) and push this folder to `main`:

   ```bash
   git init
   git add .
   git commit -m "Initial commit — Prince Makgata The Designer"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/PrinceMakgataWebsite.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.
3. Site goes live at `https://YOUR-USERNAME.github.io/PrinceMakgataWebsite/`.
4. Replace `YOUR-USERNAME` placeholders in `sitemap.xml` and `robots.txt`.

> All asset paths are relative, so the site works from a subpath and from a custom domain.

## Placeholders to replace with real photos

- `index.html` → about portrait SVG (`#about .about-portrait`)
- `js/content.js` → `lookSvg()` generates editorial placeholders; swap `.look-art` content for `<img>` tags when real photos are ready.

## Business details

- **Address:** Shop No 1, Mimosa Centre, Botha Ave, eMalahleni, 1039
- **WhatsApp / Call:** 078 264 5976 (`wa.me/27782645976`)
- **Hours:** Mon–Fri 08:00–17:30 · Sat 08:00–14:00 · Sun closed *(verify)*
- **Rating:** 5.0 ★ from 7 Google reviews