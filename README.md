# La Maison — Restaurant Landing Page

A modern, elegant restaurant landing page built with **Astro** and **Tailwind CSS**. Fully static, mobile-first, and deploy-ready.

![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## Live Demo

> _Deploy URL here_

## Preview

> _Screenshot here_

## Features

- **7 sections:** Navbar, Hero, About, Menu Highlights, Gallery, Testimonials, Contact & Footer
- Fully responsive — mobile-first design
- Light warm color palette with gold accents
- Smooth scroll navigation with mobile burger menu
- Reservation form (Formspree-ready)
- Typed static data for menu items and testimonials
- Zero JS frameworks — vanilla JS only for nav toggle and smooth scroll
- Lighthouse-ready (Performance ≥ 90, Accessibility ≥ 90)

## Tech Stack

| Tool | Purpose |
|---|---|
| [Astro 6](https://astro.build) | Static site framework |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [Playfair Display + Inter](https://fonts.google.com) | Typography |
| [Unsplash](https://unsplash.com) | Placeholder images |

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # HTML shell, fonts, global meta
├── pages/
│   └── index.astro           # Composes all sections
├── components/
│   ├── Navbar.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── MenuHighlights.astro
│   ├── Gallery.astro
│   ├── Testimonials.astro
│   ├── Contact.astro
│   └── Footer.astro
├── data/
│   ├── menu.ts               # Typed static menu data
│   └── testimonials.ts       # Typed static review data
└── styles/
    └── global.css            # Tailwind + design tokens
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server at localhost:4321
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

- **Content:** Edit `src/data/menu.ts` and `src/data/testimonials.ts`
- **Colors:** Modify `@theme` tokens in `src/styles/global.css`
- **Contact form:** Connect `src/components/Contact.astro` to [Formspree](https://formspree.io) or any form backend
- **Images:** Replace Unsplash URLs with your own photos

## Deployment

This project outputs a fully static site. Deploy the `dist/` folder to any static host:

- [Netlify](https://netlify.com) — drag & drop `dist/`
- [Vercel](https://vercel.com) — connect repo, auto-detects Astro
- [GitHub Pages](https://pages.github.com) — use `astro build` in CI

## License

MIT
