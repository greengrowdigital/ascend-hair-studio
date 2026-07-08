# Ascend Hair Studio — Demo

Cinematic, multilingual demo site for **Ascend Hair Studio** — natural hair care
made in Czechia (_Vyrobeno v Česku_, 100% natural formula, no needless chemicals).

Built by **GreenGrow Digital** as a client demo.

## Stack

- **Vite + React 19**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (page transitions, scroll reveals, magnetic buttons, marquee)
- **React Router DOM** (multi-page)
- **Lucide React** (icons)

## Features

- **Multi-page**: Home · Products · Services · Philosophy · Contact (+ 404)
- **Trilingual**: Čeština (default) · English · Español — persisted in `localStorage`,
  with automatic detection from the browser language
- **Responsive** across mobile / tablet / laptop / desktop XL; the hero fits in
  `100svh` on short laptops via fluid `clamp()` typography
- **Premium motion**: intro loader (drawn ASCEND emblem), floating morphing navbar,
  scroll-progress bar, parallax hero, word-by-word manifesto reveal, film grain
- **Design system**: "Obsidian Botanical" — monochrome luxury echoing the ASCEND
  emblem, warmed by a sage accent. Type: Michroma · Fraunces · Sora · Inter · IBM Plex Mono

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Deploy

Vercel-ready — `vercel.json` includes SPA rewrites. No environment variables required.

## Notes

- Product prices and the contact form are for demonstration only (the form does not
  send real data).
- Imagery is sourced from Unsplash as placeholders; swap for the client's real photos
  when available.
