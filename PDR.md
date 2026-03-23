# PDR — Roadmap hacia producto vendible
## Proyecto: La Maison — Restaurant Landing Page
**Fecha:** 2026-03-22
**Stack:** Astro 6 · Tailwind CSS 4 · Sanity v5 · TypeScript

---

## 1. Estado actual

### Completado ✅
| Ítem | Detalle |
|------|---------|
| CMS integrado | Todos los schemas creados y conectados a los componentes |
| Schemas | menuItem, siteSettings, heroContent, heroContent, aboutContent, galleryImage, testimonial, contactContent |
| Páginas separadas | `/menu`, `/nosotros`, `/galeria`, `/resenas`, `/contacto` |
| Carrusel | Con drag (mouse + touch), auto-avance, dots |
| Navbar | Conectada a siteSettings (logo dinámico) |
| Studio deployado | `res.sanity.studio` |
| Vercel | Deployado y público |

---

## 2. Lo que falta para vender

### P1 — Crítico (sin esto no es vendible)

| ID | Problema | Por qué importa |
|----|----------|-----------------|
| C1 | **Responsive mobile no revisado** | El cliente lo va a abrir desde el celular el primer día |
| C2 | **Formulario de contacto no envía emails** | El restaurante no recibe reservas — el producto no cumple su función principal |
| C3 | **Webhook Sanity → Vercel no configurado** | El cliente edita contenido en Sanity y no ve los cambios en el sitio — va a pensar que está roto |

---

### P2 — Importante (afecta la calidad del producto)

| ID | Problema | Por qué importa |
|----|----------|-----------------|
| I1 | **SEO básico ausente** | Sin meta tags, og:image ni sitemap el sitio no aparece en Google |
| I2 | **Footer hardcodeado** | El teléfono, email y redes sociales no se pueden cambiar desde el Studio |
| I3 | **Página 404 genérica** | Se ve poco profesional cuando alguien entra a una URL inexistente |
| I4 | **Sin favicon personalizable** | El tab del browser muestra el ícono de Astro |
| I5 | **Primera imagen del carrusel con `loading="lazy"`** | La imagen principal tarda en cargar — mala experiencia en primer render |

---

### P3 — Menor (pulido final)

| ID | Problema | Por qué importa |
|----|----------|-----------------|
| M1 | **Sin animaciones de entrada** | Las secciones aparecen abruptamente al hacer scroll |
| M2 | **MenuHighlights no tiene fallback visual** | Si no hay platos destacados en Sanity la sección queda vacía sin mensaje |
| M3 | **Horarios en Contact tienen formato manual** | El cliente tiene que saber escribir `Lunes | 10:00 - 22:00` — confuso |

---

## 3. Plan de implementación

### Fase 1 — Lo crítico (hacer antes de mostrar a cualquier cliente)

#### C1: Responsive mobile
- Revisar cada página en 375px (iPhone SE) y 390px (iPhone 14)
- Ajustar tipografías, padding, grillas
- Verificar que el carrusel funcione con touch en mobile real

#### C2: Formulario de contacto funcional
Opciones recomendadas:
- **Resend** (más simple, gratis hasta 3000 emails/mes) — instalar `resend`, crear API route en Astro
- **Formspree** (sin código, solo cambiar el `action` del form) — para una solución rápida

```
Astro SSR necesario para API routes:
pnpm add @astrojs/node
```

Cambiar `output: 'static'` → `output: 'hybrid'` en `astro.config.mjs`

#### C3: Webhook Sanity → Vercel
```
1. Vercel → proyecto → Settings → Git → Deploy Hooks → crear hook → copiar URL
2. Sanity Dashboard → proyecto → API → Webhooks → crear webhook
   URL: [la URL de Vercel]
   Trigger: on document publish
   Filter: _type in ["menuItem", "siteSettings", "heroContent", "galleryImage", "testimonial", "aboutContent", "contactContent"]
```

Resultado: cada vez que el cliente publica contenido en Sanity, Vercel redeploya automáticamente en ~30 segundos.

---

### Fase 2 — Calidad del producto

#### I1: SEO
Agregar en `Layout.astro`:
```html
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:type" content="website" />
<link rel="canonical" href={Astro.url} />
```

Crear `public/sitemap.xml` o instalar `@astrojs/sitemap`.

#### I2: Footer conectado a Sanity
- Importar `getSiteSettings()` en `Footer.astro`
- Mostrar teléfono, email, dirección, redes sociales desde `siteSettings`

#### I3: Página 404
- Crear `src/pages/404.astro`
- Diseño simple con el estilo del sitio y link al inicio

#### I4: Favicon
- Agregar campo `favicon` (image) al schema `siteSettings`
- En `Layout.astro` usar la URL del favicon desde Sanity

#### I5: Primera imagen del carrusel
- Cambiar `loading='lazy'` → `loading='eager'` solo en el primer slide

---

### Fase 3 — Starter kit (después de que el producto esté terminado)

| Tarea | Detalle |
|-------|---------|
| Archivo de tema | `src/config/theme.ts` con colores y fuentes configurables |
| Limpiar branding | Reemplazar "La Maison" por variables de configuración |
| README completo | Setup, deploy, cómo usar el Studio, cómo personalizar |
| Script de datos demo | `sanity dataset import` con contenido de ejemplo |
| `.env.example` | Ya existe ✅ |

---

## 4. Prioridad de venta

Para mostrarle el producto a un cliente real necesitás **mínimo**:
1. ✅ Responsive mobile
2. ✅ Formulario funcional
3. ✅ Webhook configurado

Con esas tres cosas el producto cumple su promesa. Todo lo demás es pulido.

---

## 5. Consideraciones de precio (actualizado)

| Entregable | Precio sugerido |
|------------|-----------------|
| Landing básica (sin CMS) | $300 – $500 |
| Landing + Sanity CMS | $600 – $900 |
| Landing + CMS + dominio + 1 mes soporte | $800 – $1200 |
| Mantenimiento mensual | $30 – $50/mes |

Los $100 que pensabas cobrar no cubren ni el valor del tiempo invertido. Este producto vale mínimo $600 con CMS incluido.

---

*PDR actualizado el 2026-03-22 · La Maison Restaurant Landing Page*
