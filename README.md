# ASCEND — Matte Clay (Demo)

Apple-style, multilingual product site + demo shop for **ASCEND Hair Matte Clay**
— a matte hair clay made in Czechia (_Vyrobeno v Česku_, 92% natural, strong
restylable hold).

Built by **GreenGrow Digital** as a client demo.

## Stack

- **Vite + React 19**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (scroll-scrubbed hero, reveals, cart drawer, page crossfades)
- **React Router DOM** (multi-page)
- **Lucide React** (icons)

## Experience

- **Cinematic home**: a full-screen ASCEND wordmark knocked out over the hero
  video, then a scroll-driven white → black morph that reveals the product tin,
  followed by the product story. Scroll stays free while the video plays; the
  pill navbar fades in early and adapts its colour to the surface underneath.
- **Demo shop** (`/shop`): Apple-style product page — gallery, size selector
  (50 / 100 g / duo), quantity, add-to-bag, specs, and FAQ.
- **Cart + checkout**: slide-over cart drawer with a persistent (localStorage)
  bag, plus a full demo checkout flow (shipping form → order confirmation).
  Nothing is charged.
- **Formula** (`/science`) and **Contact** pages, plus a 404.
- **Trilingual**: Čeština (default) · English · Español — persisted in
  `localStorage`, auto-detected from the browser.
- **Responsive** mobile → desktop XL; the hero fits `100svh` on short laptops.
- **Design system**: "Apple light-first + product noir" — white, precise store
  surfaces with true-black storytelling. Type: **Michroma** (the ASCEND
  wordmark, recreated from the brand logotype) + **Archivo** (the workhorse).
  Sage/olive is the single botanical accent.

## Assets (client-supplied)

- `public/hero.mp4` — hero video (plays once, behind the knockout wordmark).
- `public/product/clay-diagonal.png` — three-quarter tin (transparent).
- `public/product/clay-top.png` — open tin, top-down (transparent).

To swap the product shots, drop new PNGs at those paths. `<ProductImage>` falls
back to an inline SVG tin if a file is missing, so the layout never breaks.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Deploy

Vercel-ready — `vercel.json` includes SPA rewrites. No environment variables.

## Notes

- Prices and the checkout are for demonstration only (no payment is processed).
- Lifestyle/texture imagery is Unsplash; the product shots are the client's.
