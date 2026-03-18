# Design: Restaurant Landing Page (MDR)

## Technical Approach

Build a fully static Astro 4.x site using component-based architecture. Each page section maps to one `.astro` component. Tailwind CSS handles all styling via a custom design token set (light palette). Zero client-side JS frameworks — only vanilla JS for nav toggle and anchor smooth-scroll. Output is a pure HTML/CSS static export, deployable to Netlify, Vercel, or GitHub Pages.

---

## Architecture Decisions

### Decision: Astro as Framework

**Choice**: Astro 4.x (static output mode)
**Alternatives considered**: Next.js, plain HTML/CSS, Nuxt
**Rationale**: Astro ships zero JS by default, ideal for a marketing landing page. Component model avoids duplication. Faster cold builds than Next.js for fully static sites.

---

### Decision: Tailwind CSS for Styling

**Choice**: Tailwind CSS 3.x with custom config tokens
**Alternatives considered**: CSS Modules, Sass, Vanilla CSS
**Rationale**: Utility-first approach enables rapid iteration directly in markup. Custom `theme.extend` tokens enforce the light palette design system. Purge/JIT ensures minimal bundle size.

---

### Decision: Google Fonts via `<link>` (not npm package)

**Choice**: Load `Playfair Display` (serif) + `Inter` (sans-serif) via Google Fonts CDN
**Alternatives considered**: Self-hosting via `fontsource`, system fonts
**Rationale**: Simplest setup for a static page. Google Fonts CDN is cached globally. `font-display: swap` prevents FOUT. Self-hosting can be added later if privacy requirements change.

---

### Decision: No JS UI Framework (vanilla only)

**Choice**: Vanilla JS for mobile nav + smooth scroll only
**Alternatives considered**: React islands, Vue islands, Alpine.js
**Rationale**: The page is purely presentational. No interactive state needed. Astro islands would add unnecessary complexity and bundle weight.

---

### Decision: Unsplash for Placeholder Images

**Choice**: Direct Unsplash CDN URLs with descriptive alt text
**Alternatives considered**: Lorem Picsum, local placeholder SVGs
**Rationale**: Unsplash provides real food/restaurant photography, making the design feel production-ready. URLs are stable enough for development and demo.

---

## Color Palette (Design Tokens)

```
Light Theme — Warm & Elegant
─────────────────────────────
Background:   #FAFAF7   (warm off-white)
Surface:      #F5F0E8   (cream / parchment)
Primary:      #C9A96E   (warm gold)
Primary Dark: #A8834A   (deep gold for hover states)
Text:         #2C2C2C   (near-black, soft)
Text Muted:   #6B6B6B   (gray for captions)
Border:       #E8E0D0   (subtle warm border)
Accent:       #8B4513   (saddle brown for highlights)
Success:      #5A7A52   (muted green)
White:        #FFFFFF
```

---

## Typography Scale

```
Font Families:
  serif:   'Playfair Display', Georgia, serif     → headings, taglines
  sans:    'Inter', system-ui, sans-serif          → body, labels, nav

Font Sizes (Tailwind extend):
  display: clamp(2.5rem, 6vw, 5rem)   → hero headline
  h1:      2.5rem / 3rem
  h2:      1.875rem / 2.25rem
  h3:      1.375rem
  body:    1rem / 1.125rem
  small:   0.875rem
```

---

## Component Architecture

```
src/
├── layouts/
│   └── Layout.astro              ← <html>, <head>, fonts, global meta
├── pages/
│   └── index.astro               ← Composes all section components
├── components/
│   ├── Navbar.astro              ← Logo + nav links + mobile burger
│   ├── Hero.astro                ← Full-width bg image, headline, CTA
│   ├── About.astro               ← Story text + side image
│   ├── MenuHighlights.astro      ← Card grid of featured dishes
│   ├── Gallery.astro             ← Masonry/grid photo layout
│   ├── Testimonials.astro        ← Quote cards / carousel
│   ├── Contact.astro             ← Address, hours, reservation form
│   └── Footer.astro              ← Links, socials, copyright
├── styles/
│   └── global.css                ← @tailwind directives + :root tokens
└── data/
    ├── menu.ts                   ← Static array of dish objects
    └── testimonials.ts           ← Static array of review objects
```

---

## Data Flow

```
Static Data (menu.ts, testimonials.ts)
         │
         ▼
  index.astro  ──imports──▶  MenuHighlights.astro
                         ├──▶  Testimonials.astro
                         ├──▶  Hero.astro
                         ├──▶  About.astro
                         ├──▶  Gallery.astro
                         ├──▶  Contact.astro
                         └──▶  Footer.astro

Layout.astro wraps index.astro
  └── injects: <head> meta, fonts, global.css
```

No server-side data fetching. All content is hardcoded in `.ts` data files or inline in components.

---

## Data Interfaces

```typescript
// src/data/menu.ts
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;       // e.g. "$24"
  category: 'starter' | 'main' | 'dessert' | 'drink';
  image: string;       // Unsplash URL or local path
  featured: boolean;
}

// src/data/testimonials.ts
interface Testimonial {
  id: string;
  author: string;
  role?: string;        // e.g. "Regular Guest"
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar?: string;
}
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `astro.config.mjs` | Create | Astro config with Tailwind integration |
| `tailwind.config.mjs` | Create | Custom palette, fonts, spacing tokens |
| `src/layouts/Layout.astro` | Create | HTML shell, Google Fonts, global meta |
| `src/pages/index.astro` | Create | Composes all 8 section components |
| `src/styles/global.css` | Create | Tailwind directives + CSS custom properties |
| `src/components/Navbar.astro` | Create | Navigation with mobile toggle |
| `src/components/Hero.astro` | Create | Hero section with CTA |
| `src/components/About.astro` | Create | Restaurant story section |
| `src/components/MenuHighlights.astro` | Create | Dish card grid |
| `src/components/Gallery.astro` | Create | Photo grid |
| `src/components/Testimonials.astro` | Create | Customer reviews |
| `src/components/Contact.astro` | Create | Location, hours, reservation |
| `src/components/Footer.astro` | Create | Footer with socials |
| `src/data/menu.ts` | Create | Typed static menu data |
| `src/data/testimonials.ts` | Create | Typed static review data |
| `public/images/` | Create | Placeholder image references |

---

## Responsive Breakpoints

```
Mobile first strategy:
  sm:   640px   → single column layouts unlock
  md:   768px   → 2-column grids
  lg:   1024px  → full desktop layout (3-col menu grid, side-by-side about)
  xl:   1280px  → max content width container (max-w-7xl mx-auto)
```

---

## Section Layout Specs

| Section | Mobile | Desktop |
|---------|--------|---------|
| Navbar | Logo + burger menu → slide drawer | Horizontal links inline |
| Hero | Full-height, text centered | Text left-aligned, image fills right or full bg |
| About | Text stacked over image | 2-col: text left, image right |
| Menu | 1-col card list | 3-col card grid |
| Gallery | 2-col grid | 4-col masonry-style |
| Testimonials | Single card, prev/next | 3-col card row |
| Contact | Stacked: info then form | 2-col: info left, form right |
| Footer | Stacked columns | 4-col grid |

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Color palette, typography, spacing | Manual review in browser at 375px, 768px, 1280px |
| Lighthouse | Performance, Accessibility, SEO | `astro build` → `lighthouse` CLI or PageSpeed Insights |
| Links | Nav anchors, CTA smooth scroll | Manual click-through |
| Images | No broken images, alt text present | Browser devtools + axe accessibility tool |
| Forms | Reservation form validation | Manual submit test |

No unit test framework needed for a static landing page.

---

## Migration / Rollout

No migration required. This is a greenfield project. Deployment steps:

1. `npm create astro@latest` (or clone scaffold)
2. Install `@astrojs/tailwind` + `tailwindcss`
3. Drop in components and data files
4. `astro build` → deploy `dist/` to host of choice

---

## Open Questions

- [ ] Does the restaurant have a real name and logo? (placeholder "La Maison" used in design)
- [ ] Is there a real reservation system URL to link to, or should the form submit to a service like Formspree?
- [ ] Should the gallery use real images or remain with Unsplash placeholders at launch?
