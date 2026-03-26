# PDR — Tourism Agency Landing Page

> Auditoría completa del proyecto en rama `tourism`.
> Fecha: 2026-03-25

---

## Estado General

**EN PROGRESO — No listo para entregar como starter kit.**

El núcleo turístico funciona: schemas de Sanity, queries GROQ, componentes y páginas de tours están bien conectados. Pero hay **artefactos del restaurante original sin eliminar o adaptar** (MenuHighlights, Carousel, rutas `/menu`, datos hardcodeados en `data/`), **contenido hardcodeado que debería venir de Sanity** (WhyChooseUs completo, sección "Premiado por la Guía Gastronómica Nacional" en About, textos estáticos en secciones), y **la configuración de Sanity Studio no expone los schemas de turismo** (tour, tourCategory, certification están registrados en schema pero no aparecen en el sidebar del Studio).

---

## Problemas Críticos (C)

Bloquean el uso correcto del template. Deben fixearse antes de entregar.

### C1 — Sanity Studio no muestra los schemas de turismo

**Archivo:** `sanity.config.ts` — líneas 13–48

El `structureTool` define manualmente el sidebar y solo lista: `siteSettings`, `heroContent`, `aboutContent`, `contactContent`, `menuItem`, `galleryImage`, `testimonial`. Los tipos `tour`, `tourCategory` y `certification` están registrados en `schema.types` (línea 52) pero **nunca se agregan al sidebar**. Un editor que abra Sanity Studio no verá los tours ni las certificaciones en la interfaz.

```ts
// Lo que falta en sanity.config.ts:
S.documentTypeListItem('tourCategory').title('Categorías de tour'),
S.documentTypeListItem('tour').title('Tours'),
S.documentTypeListItem('certification').title('Certificaciones'),
```

### C2 — Ruta dinámica `/tours/[slug]` no existe

**Contexto:** `src/pages/tours.astro` — línea 122 y `src/components/FeaturedTours.astro` — línea 90

Ambos generan links `href="/tours/{slug}"` pero no existe la página `src/pages/tours/[slug].astro`. Cualquier click en "Ver tour" lleva a un 404. Es el flujo principal del template.

### C3 — WhyChooseUs.astro: todo el contenido está hardcodeado

**Archivo:** `src/components/WhyChooseUs.astro` — líneas 2–33

Los 6 ítems de "¿Por qué elegirnos?" (títulos, descripciones, íconos) son arrays literales en el frontmatter. No existe schema en Sanity para manejarlos. Para un starter kit donde el cliente adapta el contenido, esto es un bloqueante.

### C4 — About.astro: bloque "restaurante" hardcodeado sin adaptar

**Archivo:** `src/components/About.astro` — líneas 43–48

```astro
<p class='font-serif text-3xl font-bold'>★★★</p>
<p class='text-xs mt-1 leading-snug'>
  Premiado por la Guía Gastronómica Nacional
</p>
```

Este bloque es texto fijo del restaurante original y nunca va a ser correcto para una agencia de turismo. No viene de Sanity.

### C5 — aboutContent schema tiene campos de restaurante

**Archivo:** `src/sanity/schemaTypes/aboutContent.ts` — líneas 33–56

Los campos `chefName`, `chefTitle`, `chefImage`, `chefImageAlt` son semánticamente incorrectos para turismo. El schema nunca fue adaptado. El componente `About.astro` no los usa (no se renderizan), pero el editor verá campos confusos en Sanity Studio.

---

## Problemas Importantes (I)

Degradan la calidad del template pero no bloquean el flujo principal.

### I1 — MenuHighlights.astro y Carousel.astro: componentes de restaurante sin adaptar

**Archivos:** `src/components/MenuHighlights.astro`, `src/components/Carousel.astro`

`MenuHighlights.astro` usa colores hardcodeados del restaurante (`#FAFAF7`, `#C9A96E`, `#2C2C2C`, `#6B6B6B`), textos hardcodeados ("Especialidades de la casa", "Lo mejor de nuestra cocina") y muestra precios en `S/.` — en vez de USD. **No se usa en `index.astro`** (buena señal), pero el archivo sigue en el proyecto y genera confusión. Carousel también mezcla galería con `getFeaturedMenuItems()` — inconsistente para turismo.

### I2 — Página `/menu` y `/menu.astro` no deberían existir en turismo

**Archivo:** `src/pages/menu.astro`

La página de menú completa es una página de restaurante intacta: colores hardcodeados (`#FAFAF7`, `#C9A96E`), textos ("Menú completo", "Nuestra cocina", "platos elaborados con ingredientes de temporada"), precios en `S/.`. No está linkeada desde el Navbar (buena señal), pero existe en el build y es accesible via URL directa.

### I3 — `src/data/testimonials.ts` y `src/data/menu.ts`: datos de restaurante sin adaptar

**Archivo:** `src/data/testimonials.ts` — líneas 10–38

Los testimonios hardcodeados son de restaurante: "Comensal frecuente", "Crítico gastronómico", "cena de aniversario", "técnica impecable". Se usan como fallback en `Testimonials.astro` (líneas 47–80) cuando Sanity no tiene datos. Cualquier demo del template mostrará reseñas de comida.

**Archivo:** `src/data/menu.ts` — completo

Datos de menú de restaurante francés (carpaccio, filete al vino tinto, crème brûlée). Sigue importándose en `Carousel.astro` línea 2.

### I4 — sanity.config.ts tiene el `title` incorrecto

**Archivo:** `sanity.config.ts` — línea 7

```ts
title: 'Restaurant Landing',
```

El Studio muestra "Restaurant Landing" como nombre. Debería ser algo relacionado con turismo.

### I5 — Layout.astro: defaults de meta son del restaurante

**Archivo:** `src/layouts/Layout.astro` — líneas 15–18

```ts
title = 'Restaurante',
description = 'Experiencia gastronómica única en el corazón de la ciudad...',
ogImage = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
```

El `ogImage` es foto de comida en una mesa. El `title` default es "Restaurante". El `description` habla de gastronomía. Cuando no se proveen estos props (ej: en rutas nuevas), el SEO por default es completamente incorrecto para turismo.

### I6 — og:site_name hardcodeado como fallback "Restaurante"

**Archivo:** `src/layouts/Layout.astro` — línea 41

```astro
<meta property="og:site_name" content={settings?.businessName ?? 'Restaurante'} />
```

Menor pero consistente con el problema de residuos de restaurante.

### I7 — nosotros.astro y contacto.astro: fallback de businessName es "Restaurante"

**Archivos:** `src/pages/nosotros.astro` línea 9, `src/pages/contacto.astro` línea 9, `src/pages/galeria.astro` línea 9, `src/pages/resenas.astro` línea 9

Todos los fallbacks dicen `?? 'Restaurante'` en lugar de algo genérico como `'Agencia de Turismo'`. El `Navbar.astro` también (línea 5).

### I8 — Tour interface: campo `difficulty` acepta `undefined` en runtime aunque TypeScript no lo permite

**Archivo:** `src/lib/sanity.ts` — línea 217

```ts
difficulty: 'facil' | 'moderado' | 'dificil' | 'muy-dificil'
```

El campo `difficulty` en el schema de Sanity no tiene `validation: Rule.required()` (`tour.ts` línea 47–60). Si un editor no completa el campo, el API devuelve `undefined` pero TypeScript espera uno de los 4 valores. En `FeaturedTours.astro` línea 53 y `tours.astro` línea 91 se accede con `difficultyColors[tour.difficulty]` — funciona por el fallback `?? 'bg-gray-500'`, pero el tipo está mal declarado.

### I9 — `getGalleryImages` GROQ no fetcha el campo `description`

**Archivo:** `src/lib/sanity.ts` — líneas 133–142

```groq
*[_type == "galleryImage"] | order(order asc) {
  _id, title, image, alt, order
}
```

El schema `galleryImage.ts` tiene un campo `description` (línea 29) pero no se incluye en la query. `Gallery.astro` usa `data-description={img.alt ?? img.title ?? ''}` (línea 31) — nunca puede usar la descripción de Sanity aunque esté cargada.

### I10 — Carousel.astro: fallback con imágenes de restaurante

**Archivo:** `src/components/Carousel.astro` — líneas 34–54

Las 4 imágenes fallback son de mesas, comedores y platos de cocina francesa. Si no hay imágenes en Sanity, el Carousel muestra fotos de restaurante.

### I11 — Contact form: email template con colores de restaurante hardcodeados

**Archivo:** `src/pages/api/contact.ts` — líneas 58–114

El HTML del email tiene colores hardcodeados del restaurante: `#FAFAF7`, `#C9A96E`, `#2C2C2C`, `#E8E0D0`, `#F5F0E8`. El texto del subject dice "Nueva reservación" (línea 57) en vez de "Nueva consulta de tour". El header del email dice "Nueva Reservación" (línea 63).

### I12 — robots.txt apunta a la URL del proyecto original

**Archivo:** `public/robots.txt` — línea 3

```
Sitemap: https://restaurant-landing-page-git-main-duskalors-projects.vercel.app/sitemap-index.xml
```

URL hardcodeada del restaurante en Vercel. Debe actualizarse con el dominio real del cliente.

### I13 — `astro.config.mjs`: el `site` usa una env var no documentada

**Archivo:** `astro.config.mjs` — línea 9

```js
site: import.meta.env.SITE_URL ?? 'http://localhost:4321',
```

`SITE_URL` no aparece en el `.env.example` del repo (solo `PUBLIC_SANITY_PROJECT_ID` y `PUBLIC_SANITY_DATASET`). Esto afecta el canonical URL y el sitemap generado.

### I14 — sanity.config.ts y sanity.cli.ts usan variables de entorno diferentes

**Archivos:** `sanity.config.ts` línea 8, `sanity.cli.ts` línea 4

`sanity.config.ts` usa `process.env.SANITY_PROJECT_ID` (sin prefijo `PUBLIC_`), mientras que `sanity.cli.ts` usa `process.env.PUBLIC_SANITY_PROJECT_ID` (con prefijo). Solo uno puede ser correcto dependiendo del contexto (CLI vs runtime de Sanity). El `sanity.config.ts` también tiene el `projectId` hardcodeado como fallback `'q2ywqdj2'` (línea 8) — el ID del proyecto de desarrollo.

---

## Mejoras Sugeridas (M)

Nice-to-have, backlog post-entrega.

### M1 — WhyChooseUs debería tener schema en Sanity

Crear schema `whyChooseUsItem` o agregar un array de objetos al schema `siteSettings` para permitir editar las razones para elegirnos desde el Studio.

### M2 — Tour: agregar campo `altImage` al schema para accesibilidad

**Archivo:** `src/sanity/schemaTypes/tour.ts` — campo `image` (línea 68)

El campo `image` del tour no tiene campo de texto alternativo. En `FeaturedTours.astro` línea 54 y `tours.astro` línea 91, el `alt` del `<img>` es `{tour.name}` — correcto como fallback, pero no permite texto descriptivo específico.

### M3 — Tour: `shortDescription` sin validación de longitud

**Archivo:** `src/sanity/schemaTypes/tour.ts` — línea 29–33

El campo tiene `description: 'Resumen para las tarjetas (máx. 2 líneas)'` pero no hay `validation: Rule.max(200)` o similar. Un editor podría poner texto largo y romper el layout de las cards.

### M4 — Testimonial: no tiene campo `origin` / `tourVisited`

Para una agencia de turismo, sería valioso poder mostrar "Viajó al Camino Inca" o "Desde Argentina" en cada reseña. El schema actual solo tiene `name`, `rating`, `comment`, `date`, `order`.

### M5 — Tour: no tiene campo `meetingPoint`

Información crucial para los viajeros. Podría ser un campo de texto en el schema de tour.

### M6 — TourCategory: `image` no es required

**Archivo:** `src/sanity/schemaTypes/tourCategory.ts` — línea 27–31

Sin imagen, la card de categoría muestra un gradiente fallback. No hay indicación en el Studio de que la imagen es recomendada.

### M7 — Página `/tours` no tiene meta `og:image` dinámica

**Archivo:** `src/pages/tours.astro` — línea 27–30

El `<Layout>` se invoca sin `ogImage`. Si hay tours featured, podría usarse la imagen del primer tour como og:image de la página.

### M8 — Favicon: cuando viene de Sanity, se sirve como WebP

**Archivo:** `src/layouts/Layout.astro` — línea 51

```astro
<link rel="icon" type="image/png" href={urlFor(settings.favicon).width(64).height(64).format('webp').url()} />
```

El `type` dice `image/png` pero la URL es `.format('webp')`. Deberían coincidir, o mejor usar `image/x-icon` para favicons.

### M9 — No hay página de `[slug].astro` para tours individuales (ya listado como C2, pero aplica)

Adicional a la ruta faltante: cuando se cree, debería incluir schema markup JSON-LD (`@type: "TouristAttraction"` o `"TravelAction"`) para SEO.

### M10 — Sitemap no filtra `/menu`

Con `@astrojs/sitemap` activo, la página `/menu` (de restaurante) se incluirá en el sitemap.xml automáticamente.

### M11 — No hay `<link rel="preload">` para la imagen hero

**Archivo:** `src/components/Hero.astro` — línea 24

La imagen de fondo del hero tiene `loading='eager'` (correcto), pero sin `<link rel="preload">` en el `<head>` se pierde la oportunidad de mejorar LCP.

---

## Schemas Sanity — Estado

| Schema | Estado | Issues |
|---|---|---|
| `siteSettings` | OK para turismo | Campo `openingHours` aplica; podría agregar `whatsapp` separado de `phone` |
| `heroContent` | OK | Sin issues |
| `aboutContent` | INCOMPLETO | Campos `chefName`, `chefTitle`, `chefImage`, `chefImageAlt` no aplican para turismo (ver C5) |
| `contactContent` | OK para turismo | Campo `reservationCtaText` aplica para consultas de tour |
| `tour` | OK | Campo `difficulty` debería ser `required`; falta `altImage`; falta `meetingPoint` (M5) |
| `tourCategory` | OK | Campo `image` debería tener hint de "recomendado" |
| `certification` | OK | Sin issues |
| `testimonial` | OK básico | Falta campo `origin`/`tourVisited` (M4) |
| `galleryImage` | OK | Sin issues |
| `menuItem` | NO APLICA | Schema de restaurante. Podría eliminarse o mantenerse si el cliente quiere combo restaurante+turismo |

---

## Componentes — Estado

| Componente | Estado | Issues puntuales |
|---|---|---|
| `Hero.astro` | Bueno | Alt text línea 25 dice "Interior del restaurante" — debería adaptarse a turismo |
| `Navbar.astro` | Bueno | Fallback `businessName` es "Restaurante" (línea 5) |
| `Footer.astro` | Bueno | Fallback `businessName` es "Restaurante" (línea 6) |
| `FeaturedTours.astro` | Bueno | Link `/tours/${tour.slug.current}` roto (C2) |
| `TourCategories.astro` | Bueno | Sin issues |
| `WhyChooseUs.astro` | CRÍTICO | Todo hardcodeado, no conecta con Sanity (C3) |
| `Certifications.astro` | Bueno | Sin issues |
| `Gallery.astro` | Bueno | `data-gallery='restaurant-gallery'` (línea 30) — atributo con nombre de restaurante |
| `Testimonials.astro` | Bueno con caveat | Fallback son testimonios de restaurante (I3) |
| `Contact.astro` | Bueno | Sin issues funcionales |
| `About.astro` | INCOMPLETO | Bloque hardcodeado "Premiado por la Guía Gastronómica Nacional" (C4); `imageUrl` fallback es foto de comida (línea 8) |
| `MenuHighlights.astro` | RESIDUO | Componente de restaurante, no se usa en index pero existe (I1) |
| `Carousel.astro` | RESIDUO | Mezcla galería con menú del restaurante; fallbacks son fotos de comida (I1, I10) |
| `WhatsAppButton.astro` | Bueno | Sin issues |

---

## Páginas — Estado

| Página | Estado | Issues |
|---|---|---|
| `index.astro` | Bueno | No incluye `MenuHighlights` ni `Carousel` — correcto |
| `tours.astro` | Bueno | Links rotos a `/tours/[slug]` (C2); categoria filter funciona con JS |
| `nosotros.astro` | OK | Fallback "Restaurante" (I7); descripción menciona "equipo de guías" (correcto) |
| `galeria.astro` | OK | Fallback "Restaurante" (I7) |
| `resenas.astro` | OK | Fallback "Restaurante" (I7) |
| `contacto.astro` | OK | Fallback "Restaurante" (I7) |
| `menu.astro` | RESIDUO | Página completa de restaurante intacta (I2) |
| `404.astro` | Bueno | Bien adaptado para turismo |
| `api/contact.ts` | OK con issues | Template HTML con colores de restaurante, texto "reservación" en vez de "consulta de tour" (I11) |

---

## SEO & Accesibilidad

### SEO

- **`og:image` default** (`Layout.astro` línea 17): foto de comida de Unsplash. Incorrecto para turismo.
- **`og:site_name` fallback** (`Layout.astro` línea 41): dice "Restaurante".
- **`robots.txt`** (`public/robots.txt` línea 3): URL de sitemap apunta al proyecto restaurante en Vercel (I12).
- **`sitemap`**: incluirá `/menu` (página de restaurante) en el índice (M10).
- **No hay `hreflang`**: el sitio es `lang="es"` y `og:locale="es_PE"` — correcto para Perú, pero sin `hreflang` si se agrega versión en inglés en el futuro.
- **Canonical URL**: funciona correctamente vía `Astro.site` + `Astro.url.pathname`. Requiere que `SITE_URL` esté seteada (I13).
- **`title` default**: `Layout.astro` línea 15 dice `'Restaurante'`. Si una ruta olvida pasar `title`, el tab del navegador muestra "Restaurante".

### Accesibilidad

- **Hero `alt`** (`Hero.astro` línea 25): `"Interior del restaurante ${businessName}"` — debería ser algo como `"Vista panorámica de los Andes desde ${businessName}"` o venir de Sanity.
- **Gallery `data-gallery`** (`Gallery.astro` línea 30): `'restaurant-gallery'` — atributo sin impacto en accesibilidad pero inconsistente.
- **Tour cards `<article>`**: usan `<article>` correctamente, tienen `alt={tour.name}` en imagen — aceptable.
- **Certifications**: logos tienen `alt={cert.name}` y `aria-label={cert.name}` — correcto.
- **Burger menu**: tiene `aria-label='Abrir menú'` pero no cambia a "Cerrar menú" cuando está abierto (`Navbar.astro` línea 73) — accesibilidad incompleta.
- **`reveal` animations**: los elementos `.reveal` empiezan con `opacity: 0`. Si JavaScript no carga, el contenido es invisible. No hay `prefers-reduced-motion` en `global.css`.
- **Testimonial con rating ≥ 5**: `Array.from({ length: t.rating ?? 5 })` en `Testimonials.astro` línea 27 — si `rating` es `undefined`, genera 5 estrellas (correcto). Pero si `rating` viene como `null` desde Sanity, `null ?? 5` da `5` (también correcto).

---

## Variables de Entorno

### Requeridas para que la app funcione

| Variable | Archivo que la usa | Descripción |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `src/lib/sanity.ts` línea 6 | Project ID de Sanity |
| `PUBLIC_SANITY_DATASET` | `src/lib/sanity.ts` línea 7 | Dataset de Sanity (ej: `production`) |
| `RESEND_API_KEY` | `src/pages/api/contact.ts` línea 8 | API key de Resend para envío de emails |
| `CONTACT_EMAIL` | `src/pages/api/contact.ts` línea 43 | Email donde llegan las consultas |

### Opcionales pero con comportamiento sin ellas

| Variable | Archivo | Comportamiento sin ella |
|---|---|---|
| `RESEND_FROM_EMAIL` | `src/pages/api/contact.ts` línea 51 | Usa `onboarding@resend.dev` (funciona en pruebas, no en producción) |
| `SITE_URL` | `astro.config.mjs` línea 9 | Usa `http://localhost:4321` — canonical URLs incorrectos en producción |

### Inconsistencia detectada

`sanity.config.ts` (línea 8) usa `process.env.SANITY_PROJECT_ID` (sin prefijo `PUBLIC_`), pero `sanity.cli.ts` (línea 4) usa `process.env.PUBLIC_SANITY_PROJECT_ID` (con prefijo). Necesitan alinearse — probablemente `sanity.config.ts` debería usar `SANITY_PROJECT_ID` sin prefijo (ya que Sanity Studio no usa Vite), y `sanity.cli.ts` también sin prefijo (I14).

### Variables no documentadas

`SITE_URL` no está en `.env.example`. El `.env.example` solo documenta `PUBLIC_SANITY_PROJECT_ID` y `PUBLIC_SANITY_DATASET`.

---

## Roadmap Recomendado

Ordenado por impacto + urgencia.

### Sprint 1 — Bloqueantes críticos (fixear antes de cualquier demo)

1. **[C1]** Agregar `tour`, `tourCategory`, `certification` al sidebar del Studio en `sanity.config.ts`
2. **[C2]** Crear `src/pages/tours/[slug].astro` con la página de detalle del tour
3. **[C4]** Eliminar el bloque "Premiado por la Guía Gastronómica Nacional" de `About.astro`
4. **[C5]** Renombrar/eliminar campos `chefName`, `chefTitle`, `chefImage`, `chefImageAlt` en `aboutContent.ts`, reemplazar por campos apropiados para turismo (ej: `founderName`, `founderRole`, `founderImage`)
5. **[I14]** Alinear variables de entorno en `sanity.config.ts` y `sanity.cli.ts`

### Sprint 2 — Limpieza de residuos del restaurante

6. **[I1]** Eliminar o comentar `MenuHighlights.astro` y `Carousel.astro` (o adaptarlos para turismo)
7. **[I2]** Eliminar `src/pages/menu.astro` o redirigir a `/tours`
8. **[I3]** Reemplazar contenido de `src/data/testimonials.ts` con testimonios de turismo
9. **[I3]** `src/data/menu.ts` — evaluar si mantener o eliminar
10. **[I4]** Cambiar `title: 'Restaurant Landing'` en `sanity.config.ts` por el nombre de la agencia
11. **[I5]** Actualizar defaults de `title`, `description` y `ogImage` en `Layout.astro`
12. **[I7]** Cambiar todos los fallbacks `?? 'Restaurante'` por `?? 'Agencia de Turismo'`

### Sprint 3 — Calidad y corrección

13. **[I8]** Hacer `difficulty` required en el schema `tour.ts`, o declararlo como opcional en la interfaz TypeScript
14. **[I9]** Agregar campo `description` a la query `getGalleryImages()` y al template `Gallery.astro`
15. **[I11]** Actualizar template HTML del email: colores → variables de la paleta, "reservación" → "consulta de tour"
16. **[I12]** Actualizar `public/robots.txt` con la URL real del cliente
17. **[I13]** Agregar `SITE_URL` al `.env.example`
18. **[Hero alt]** Cambiar alt text de la imagen hero de "Interior del restaurante" a algo relacionado con turismo
19. **[Gallery]** Cambiar `data-gallery='restaurant-gallery'` a `data-gallery='tours-gallery'`

### Sprint 4 — Mejoras de producto

20. **[C3/M1]** Crear schema `whyChooseUsItem` en Sanity y conectar `WhyChooseUs.astro`
21. **[M4]** Agregar campo `origin` o `tourVisited` al schema `testimonial`
22. **[M5]** Agregar campo `meetingPoint` al schema `tour`
23. **[M3]** Agregar validación de longitud a `shortDescription` en `tour.ts`
24. **[M8]** Corregir `type="image/png"` del favicon cuando viene como WebP
25. **[M11]** Agregar `<link rel="preload">` para la imagen hero en `Layout.astro`
26. **[Accesibilidad]** Implementar `prefers-reduced-motion` para las animaciones `.reveal`
27. **[Accesibilidad]** Actualizar `aria-label` del burger menu a "Cerrar menú" cuando está abierto
