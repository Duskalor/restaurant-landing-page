# Proposal: Restaurant Landing Page

## Intent

Build a modern, visually appealing restaurant landing page using Astro. The goal is to present the restaurant's brand, menu highlights, ambiance, and contact information in a light-themed, elegant layout that converts visitors into customers — through reservations, orders, or visits.

## Scope

### In Scope
- Hero section with full-width image, restaurant name, tagline, and CTA button
- About/Story section with imagery and brand narrative
- Menu highlights section (featured dishes with photos, names, short descriptions)
- Testimonials / Reviews section
- Gallery section (photo grid of food and interior)
- Contact & Reservation section (address, phone, hours, reservation form or link)
- Footer with social links, copyright
- Responsive design (mobile-first)
- Light color palette — warm whites, creams, soft earth tones, gold accents
- Modern typography with elegant serif + clean sans-serif pairing

### Out of Scope
- Full menu CMS or backend
- Online ordering system
- User authentication
- Multi-language support
- Payment processing

## Approach

Use **Astro** as the static site framework. Build with component-based architecture — each section is its own `.astro` component. Style with **Tailwind CSS** using a custom light color theme. No JavaScript framework needed beyond minimal vanilla JS for mobile nav toggle and smooth scroll. Deploy-ready as a static export.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/index.astro` | New | Main page composing all sections |
| `src/components/` | New | Hero, About, Menu, Gallery, Testimonials, Contact, Footer components |
| `src/layouts/Layout.astro` | New | Base layout with meta, fonts, global styles |
| `src/styles/global.css` | New | Tailwind base + custom CSS variables for color palette |
| `public/images/` | New | Restaurant photos, dish images, hero background |
| `tailwind.config.mjs` | New/Modified | Custom color tokens, font families |
| `astro.config.mjs` | Modified | Tailwind integration |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No real restaurant photos available | Medium | Use high-quality placeholder images from Unsplash (food/restaurant category) |
| Tailwind config conflicts | Low | Initialize fresh config, no legacy styles to merge |
| Performance on image-heavy sections | Medium | Use Astro's `<Image />` component for optimization, lazy loading |

## Rollback Plan

Project is a fresh directory — no existing code to break. To revert: delete all generated files. No database or deployed environment at risk.

## Dependencies

- Node.js >= 18
- Astro >= 4.x
- `@astrojs/tailwind` integration
- `tailwindcss` >= 3.x
- Google Fonts (Playfair Display + Inter) via `<link>` in layout

## Success Criteria

- [ ] All 7 sections render correctly on desktop and mobile
- [ ] Lighthouse performance score >= 90
- [ ] Lighthouse accessibility score >= 90
- [ ] Page loads with no layout shift (CLS = 0)
- [ ] CTA button links to reservation section (smooth scroll)
- [ ] Light color palette applied consistently across all sections
- [ ] Zero broken images or missing assets
