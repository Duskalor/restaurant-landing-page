# PDR — Integración de Sanity CMS
## Proyecto: La Maison — Restaurant Landing Page
**Fecha:** 2026-03-19
**Stack:** Astro 6 · Tailwind CSS 4 · Sanity v5 · TypeScript

---

## 1. Estado actual

### Qué está integrado con Sanity
| Sección | Fuente de datos | Estado |
|---------|----------------|--------|
| Menú completo (`/menu`) | Sanity (`menuItem`) | ✅ Dinámico |
| Especialidades (`MenuHighlights`) | Sanity (`menuItem[featured==true]`) | ✅ Dinámico |
| Hero | Hardcoded (Unsplash) | ❌ Estático |
| About / Nosotros | Hardcoded | ❌ Estático |
| Gallery | Hardcoded (Unsplash) | ❌ Estático |
| Navbar | Hardcoded | ❌ Estático |
| Footer | Hardcoded | ❌ Estático |
| Testimonials | Hardcoded | ❌ Estático |
| Contact | Hardcoded | ❌ Estático |

### Schema actual
```
menuItem
  ├── name: string (required)
  ├── description: text
  ├── price: string ⚠️ (debería ser number)
  ├── category: string (enum: entrada | principal | postre | bebida)
  ├── image: image (hotspot: true)
  └── featured: boolean (default: false)
```

### Cliente Sanity
- `projectId`: hardcodeado en dos archivos
- `useCdn: true` — correcto para producción
- `apiVersion: '2024-01-01'`
- Sin variables de entorno

---

## 2. Problemas identificados

### P1 — Crítico
| ID | Problema | Impacto |
|----|---------|---------|
| C1 | `price` es `string` en schema y en TypeScript | No se puede ordenar por precio ni hacer cálculos |
| C2 | Imágenes servidas en resolución completa sin transformación | Performance: se carga una imagen de 1600px en una card de 200px |
| C3 | `projectId` hardcodeado en `src/lib/sanity.ts` y `sanity.config.ts` | No hay separación entre entornos |

### P2 — Importante
| ID | Problema | Impacto |
|----|---------|---------|
| I1 | No hay campo `alt` en el tipo `image` del schema | Accesibilidad y SEO deficientes |
| I2 | Sin campo `order: number` para ordenación manual | El restaurante no puede controlar el orden del menú |
| I3 | 7 secciones del sitio con contenido hardcodeado | El dueño no puede actualizar nada sin tocar código |
| I4 | Sin `slug` en `menuItem` | Imposible añadir páginas de detalle de plato en el futuro |

### P3 — Menor
| ID | Problema | Impacto |
|----|---------|---------|
| M1 | `styled-components` en dependencias sin uso aparente | Peso innecesario |
| M2 | Sin `perspective: 'published'` en el cliente | Podría mostrar borradores si se activa Live Preview |

---

## 3. Recomendaciones priorizadas

### Fase 1 — Correcciones inmediatas (sin nuevas features)

#### Fix C1: `price` como `number`
**Schema** (`src/sanity/schemaTypes/menuItem.ts`):
```ts
defineField({
  name: 'price',
  title: 'Precio',
  type: 'number',
  validation: (Rule) => Rule.required().positive(),
})
```
**TypeScript** (`src/lib/sanity.ts`):
```ts
price: number  // era: string
```
**Render** (en `.astro`):
```astro
S/. {item.price.toFixed(2)}
```

#### Fix C3: Variables de entorno
Crear `.env`:
```
PUBLIC_SANITY_PROJECT_ID=q2ywqdj2
PUBLIC_SANITY_DATASET=production
```
En `src/lib/sanity.ts`:
```ts
projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
dataset: import.meta.env.PUBLIC_SANITY_DATASET,
```

#### Fix C2: Transformación de imágenes
Instalar: `pnpm add @sanity/image-url`

```ts
// src/lib/sanity.ts
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
```

En lugar de `"image": image.asset->url`, pasar el objeto `image` completo y usar:
```astro
src={urlFor(item.image).width(400).height(208).format('webp').url()}
```

---

### Fase 2 — Mejoras al schema existente

#### Fix I1: `alt` text en imágenes
```ts
defineField({
  name: 'imageAlt',
  title: 'Texto alternativo de la imagen',
  type: 'string',
  description: 'Describe la imagen para accesibilidad y SEO',
})
```

#### Fix I2: Campo `order`
```ts
defineField({
  name: 'order',
  title: 'Orden de aparición',
  type: 'number',
  description: 'Número menor = aparece primero',
})
```
Actualizar query:
```groq
*[_type == "menuItem"] | order(order asc, _createdAt asc)
```

#### Fix I4: Slug
```ts
defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: { source: 'name', maxLength: 96 },
  validation: (Rule) => Rule.required(),
})
```

---

### Fase 3 — Nuevos schemas (contenido dinámico completo)

#### `siteSettings` (singleton)
Controla datos globales del restaurante:
```ts
defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    { name: 'restaurantName', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'address', type: 'text' },
    { name: 'openingHours', type: 'text' },
    { name: 'instagramUrl', type: 'url' },
    { name: 'reservationEmail', type: 'string' },
  ]
})
```

#### `heroContent` (singleton)
```ts
defineType({
  name: 'heroContent',
  title: 'Hero principal',
  type: 'document',
  fields: [
    { name: 'tagline', type: 'string' },
    { name: 'headline', type: 'string' },
    { name: 'subheadline', type: 'text' },
    { name: 'backgroundImage', type: 'image', options: { hotspot: true } },
    { name: 'ctaPrimaryLabel', type: 'string' },
    { name: 'ctaSecondaryLabel', type: 'string' },
  ]
})
```

#### `galleryImage`
```ts
defineType({
  name: 'galleryImage',
  title: 'Imagen de galería',
  type: 'document',
  fields: [
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'alt', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'order', type: 'number' },
    { name: 'featured', type: 'boolean', initialValue: false },
  ]
})
```

#### `testimonial`
```ts
defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    { name: 'authorName', type: 'string' },
    { name: 'quote', type: 'text' },
    { name: 'rating', type: 'number', options: { list: [1,2,3,4,5] } },
    { name: 'date', type: 'date' },
    { name: 'active', type: 'boolean', initialValue: true },
  ]
})
```

---

## 4. Estructura de archivos propuesta

```
src/
├── lib/
│   └── sanity.ts          # cliente + urlFor + queries
├── sanity/
│   └── schemaTypes/
│       ├── index.ts
│       ├── menuItem.ts     ✅ existente → actualizar
│       ├── siteSettings.ts ➕ nuevo
│       ├── heroContent.ts  ➕ nuevo
│       ├── galleryImage.ts ➕ nuevo
│       └── testimonial.ts  ➕ nuevo
```

---

## 5. Configuración de Sanity Studio

### Estructura personalizada (singletons)
```ts
// sanity.config.ts
import { structureTool } from 'sanity/structure'

structureTool({
  structure: (S) =>
    S.list().title('Contenido').items([
      S.singletonListItem().title('Configuración del sitio').id('siteSettings'),
      S.singletonListItem().title('Hero principal').id('heroContent'),
      S.documentTypeListItem('menuItem').title('Menú'),
      S.documentTypeListItem('galleryImage').title('Galería'),
      S.documentTypeListItem('testimonial').title('Testimonios'),
    ])
})
```

---

## 6. Orden de implementación recomendado

```
[Semana 1]
  1. Variables de entorno (.env)
  2. Fix price: string → number
  3. Instalar @sanity/image-url + urlFor helper

[Semana 2]
  4. Añadir alt, order, slug a menuItem
  5. Actualizar queries con order asc
  6. Migrar datos existentes en Sanity Studio

[Semana 3]
  7. Schema siteSettings + heroContent (singletons)
  8. Conectar Hero y Footer a Sanity
  9. Schema galleryImage + conectar Gallery

[Semana 4]
  10. Schema testimonial + conectar Testimonials
  11. Estructura personalizada en Studio
  12. Test de build estático final
```

---

## 7. Consideraciones de arquitectura

**Astro + Sanity en modo estático (SSG)**
- Todo el fetch ocurre en build time → cero overhead en runtime
- Cambios en Sanity requieren un nuevo deploy (considera Webhooks de Sanity → trigger de build en Vercel/Netlify)
- Para preview de borradores en el futuro: activar `perspective: 'previewDrafts'` y modo SSR en las rutas de preview

**Sanity Webhook → Deploy automático**
```
Sanity Dashboard → API → Webhooks
  URL: https://api.vercel.com/v1/deployments (o Netlify build hook)
  Trigger: on document publish
```

---

*PDR generado el 2026-03-19 · La Maison Restaurant Landing Page*
