# Restaurant Landing Page

> Starter kit profesional para restaurantes — construido con Astro 6, Tailwind CSS 4 y Sanity v5.

![Astro](https://img.shields.io/badge/Astro-6.x-FF5D01?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-v5-F03E2F?logo=sanity&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel&logoColor=white)

---

## Demo

[Ver demo en vivo](https://restaurant-landing-page-git-main-duskalors-projects.vercel.app)

---

## Features

- **Landing page completa** con secciones Hero, Menú destacado, Nosotros, Galería, Testimonios y Contacto
- **Panel de administración** con Sanity Studio — el cliente edita todo el contenido sin tocar código
- **Formulario de reservaciones** con validación del lado del servidor y envío de emails vía Resend
- **Menú completo** en página dedicada con filtro por categorías (entradas, principales, postres, bebidas)
- **Páginas independientes** para Nosotros, Galería, Reseñas y Contacto
- **Botón de WhatsApp** flotante configurable
- **Sitemap automático** generado por Astro para SEO
- **Página 404 personalizada**
- **Scroll animations** con Intersection Observer (sin dependencias externas)
- **Diseño responsive** y accesible
- **Tipografías premium** — Playfair Display para títulos + Inter para el cuerpo
- **Paleta de colores** completamente personalizable desde un solo archivo CSS

---

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| [Astro](https://astro.build) | 6.x | Framework principal, SSR con Node adapter |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos (integrado via Vite plugin) |
| [Sanity](https://sanity.io) | v5 | CMS headless + Sanity Studio embebido |
| [Resend](https://resend.com) | 6.x | Envío de emails transaccionales |
| [Valibot](https://valibot.dev) | 1.x | Validación de formularios del lado del servidor |
| [Vercel](https://vercel.com) | — | Hosting y despliegue continuo |

---

## Requisitos

Antes de empezar, asegurate de tener:

- **Node.js >= 22.12.0** — verificá con `node -v`
- **pnpm** — gestor de paquetes (`npm install -g pnpm`)
- **Cuenta en [Sanity.io](https://sanity.io)** — para el CMS (plan gratuito alcanza)
- **Cuenta en [Resend.com](https://resend.com)** — para emails (plan gratuito: 3.000 emails/mes)
- **Cuenta en [Vercel](https://vercel.com)** — para el deploy (plan gratuito alcanza)

---

## Setup paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/restaurant-landing-page.git mi-restaurante
cd mi-restaurante
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar las variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
cp .env.example .env
```

Editá `.env` con tus datos reales. Ver la tabla de [Variables de entorno](#variables-de-entorno) más abajo para saber cómo obtener cada valor.

### 4. Crear el proyecto en Sanity

Si todavía no tenés un proyecto de Sanity, crealo desde la terminal:

```bash
pnpm sanity init
```

Cuando te pregunte:
- **Create new project** → sí
- **Project name** → el nombre del restaurante
- **Dataset** → `production`
- **Project output path** → dejalo en la raíz (`.`)

Esto va a sobreescribir el `sanity.config.ts` con tu nuevo `projectId`. También podés hacerlo manualmente: entrá a [sanity.io/manage](https://sanity.io/manage), creá un proyecto nuevo y copiá el Project ID en tu `.env`.

> Si ya tenés un proyecto existente, simplemente copiá el `projectId` y el `dataset` en el `.env`.

### 5. Levantar el entorno local

```bash
pnpm dev
```

Esto levanta:
- **Sitio web** → `http://localhost:4321`
- **Sanity Studio** → `http://localhost:4321/studio`

Ingresá a Sanity Studio y cargá el contenido inicial: configuración del sitio, hero, nosotros, platos del menú, galería y testimonios.

### 6. Desplegar Sanity Studio

Para que el cliente pueda editar contenido en producción, necesitás publicar el Studio. Ejecutá:

```bash
pnpm sanity deploy
```

Cuando te pregunte por un hostname, elegí algo como `mi-restaurante`. El Studio va a quedar disponible en `https://mi-restaurante.sanity.studio`.

### 7. Configurar el webhook Sanity → Vercel

Este paso es **crítico**. Sin el webhook, cuando el cliente guarde cambios en Sanity Studio, el sitio en producción no se va a actualizar. El webhook le indica a Vercel que ejecute un nuevo deploy cada vez que hay un cambio de contenido.

**Paso a paso:**

**En Vercel:**
1. Entrá a [vercel.com](https://vercel.com) → tu proyecto → **Settings** → **Git**
2. Buscá la sección **Deploy Hooks** y hacé clic en **Create Hook**
3. Ponele un nombre (ej: `sanity-content-update`) y seleccioná la branch `main`
4. Copiá la URL generada — se ve así:
   ```
   https://api.vercel.com/v1/integrations/deploy/prj_xxx.../yyy...
   ```

**En Sanity:**
1. Entrá a [sanity.io/manage](https://sanity.io/manage) → tu proyecto → **API** → **Webhooks**
2. Hacé clic en **Add webhook** y completá:
   - **Name**: `Vercel Deploy`
   - **URL**: pegá la URL que copiaste de Vercel
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: dejalo vacío (dispara para cualquier documento)
   - **HTTP method**: `POST`
3. Guardá el webhook

A partir de ahora, cada vez que el cliente publique cambios en Sanity Studio, Vercel va a hacer un nuevo deploy automáticamente y el sitio se va a actualizar en pocos minutos.

### 8. Desplegar en Vercel

**Opción A — Desde el panel de Vercel (recomendado):**

1. Entrá a [vercel.com](https://vercel.com) → **Add New Project**
2. Importá el repositorio desde GitHub/GitLab/Bitbucket
3. En **Environment Variables**, agregá todas las variables del `.env` (ver tabla abajo)
4. Hacé clic en **Deploy**

**Opción B — Desde la CLI:**

```bash
pnpm dlx vercel
```

Seguí el asistente. Podés agregar las variables de entorno desde el panel de Vercel después del primer deploy.

**Configuración de build:**

Vercel detecta Astro automáticamente. Si por alguna razón no lo hace, configurá:
- **Framework Preset**: `Astro`
- **Build Command**: `astro build`
- **Output Directory**: `dist`

Después del primer deploy, actualizá la variable `site` en `astro.config.mjs` con tu dominio real:

```js
export default defineConfig({
  site: 'https://tu-dominio.vercel.app',
  // ...
})
```

---

## Variables de entorno

| Variable | Descripción | Dónde obtenerla |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | ID del proyecto de Sanity | [sanity.io/manage](https://sanity.io/manage) → tu proyecto → **Settings → API** |
| `PUBLIC_SANITY_DATASET` | Dataset de Sanity (normalmente `production`) | Mismo panel, sección **Datasets** |
| `SANITY_PROJECT_ID` | Mismo ID (usado por el Studio en build time) | Igual que `PUBLIC_SANITY_PROJECT_ID` |
| `SANITY_DATASET` | Mismo dataset (usado por el Studio en build time) | Igual que `PUBLIC_SANITY_DATASET` |
| `RESEND_API_KEY` | API key de Resend para enviar emails | [resend.com](https://resend.com) → **API Keys → Create API Key** |
| `CONTACT_EMAIL` | Email donde llegan las reservaciones del formulario | El email del restaurante (ej: `reservas@mirestaurante.com`) |

> **Importante — `CONTACT_EMAIL`:** si esta variable no está definida, los emails de reservación se van a enviar al mismo email del cliente que hizo la reserva. Siempre definila para que las reservas lleguen al correcto destino.

> **Importante — Resend en producción:** en el plan gratuito, el remitente es `onboarding@resend.dev` hasta que verifiques un dominio propio. Para producción, verificá el dominio del restaurante en [resend.com/domains](https://resend.com/domains) y actualizá la dirección `from` en `src/pages/api/contact.ts`.

---

## Personalización

### Cambiar colores y tipografías

Todos los colores y fuentes se definen en un solo lugar: `src/styles/global.css`.

```css
@theme {
  --color-bg: #FAFAF7;           /* Fondo general de la página */
  --color-surface: #F5F0E8;      /* Fondo de tarjetas y secciones */
  --color-primary: #C9A96E;      /* Color dorado — botones, acentos principales */
  --color-primary-dark: #A8834A; /* Versión oscura del primario — hover de botones */
  --color-text: #2C2C2C;         /* Texto principal */
  --color-muted: #6B6B6B;        /* Texto secundario / subtítulos */
  --color-border: #E8E0D0;       /* Bordes de tarjetas y separadores */
  --color-accent: #8B4513;       /* Color de acento — detalles, highlights */

  --font-serif: 'Playfair Display', Georgia, serif;  /* Títulos (h1–h4) */
  --font-sans: 'Inter', system-ui, sans-serif;       /* Texto del cuerpo */
}
```

Las fuentes **Playfair Display** e **Inter** se cargan desde Google Fonts a través del componente `src/layouts/Layout.astro`. Para cambiarlas, modificá el link de Google Fonts en ese archivo y actualizá las variables `--font-serif` y `--font-sans`.

### Cambiar el contenido del restaurante

Todo el contenido se gestiona desde **Sanity Studio**. El cliente accede a `https://mi-restaurante.sanity.studio` y puede editar:

- Nombre del restaurante, eslogan y logo
- Datos de contacto (teléfono, email, dirección, horarios)
- Redes sociales (Instagram, Facebook)
- Favicon del sitio
- Textos e imágenes de cada sección (Hero, Nosotros, Contacto)
- Platos del menú con fotos, precios y categorías
- Galería de fotos
- Testimonios de clientes

No hace falta tocar código para ninguna de estas personalizaciones.

---

## Estructura del proyecto

```
restaurant-landing-page/
├── public/
│   └── robots.txt                  # Configuración SEO para bots + URL del sitemap
├── src/
│   ├── components/
│   │   ├── Hero.astro              # Sección hero con imagen de fondo
│   │   ├── Navbar.astro            # Navegación principal con menú mobile
│   │   ├── MenuHighlights.astro    # Platos destacados en la home
│   │   ├── About.astro             # Sección "Nosotros" con historia y chef
│   │   ├── Gallery.astro           # Galería de fotos
│   │   ├── Testimonials.astro      # Reseñas de clientes
│   │   ├── Contact.astro           # Formulario de reservaciones + mapa
│   │   ├── Carousel.astro          # Carousel de imágenes reutilizable
│   │   ├── Footer.astro            # Pie de página con datos del restaurante
│   │   └── WhatsAppButton.astro    # Botón flotante de WhatsApp
│   ├── layouts/
│   │   └── Layout.astro            # Layout base (HTML shell, meta, Google Fonts)
│   ├── lib/
│   │   └── sanity.ts               # Cliente Sanity + queries GROQ + interfaces TypeScript
│   ├── pages/
│   │   ├── index.astro             # Página principal (home)
│   │   ├── menu.astro              # Menú completo con filtro por categorías
│   │   ├── nosotros.astro          # Página "Nosotros"
│   │   ├── galeria.astro           # Página de galería
│   │   ├── resenas.astro           # Página de reseñas
│   │   ├── contacto.astro          # Página de contacto
│   │   ├── 404.astro               # Página de error 404
│   │   └── api/
│   │       └── contact.ts          # Endpoint — procesa el formulario y envía email
│   ├── sanity/
│   │   └── schemaTypes/            # Tipos de contenido del CMS
│   │       ├── index.ts            # Exporta todos los schemas
│   │       ├── siteSettings.ts     # Configuración global del sitio
│   │       ├── heroContent.ts      # Contenido del hero
│   │       ├── menuItem.ts         # Platos del menú
│   │       ├── galleryImage.ts     # Fotos de la galería
│   │       ├── testimonial.ts      # Reseñas de clientes
│   │       ├── aboutContent.ts     # Sección Nosotros
│   │       └── contactContent.ts   # Sección Contacto
│   └── styles/
│       └── global.css              # Variables de diseño, fuentes y estilos base
├── astro.config.mjs                # Configuración de Astro (adapter, integraciones, URL)
├── sanity.config.ts                # Configuración del Sanity Studio embebido
├── package.json
└── .env.example                    # Plantilla de variables de entorno
```

---

## Schemas de Sanity

Estos son los tipos de contenido que el cliente puede editar desde Sanity Studio:

| Schema | Tipo | Campos principales |
|---|---|---|
| `siteSettings` | Singleton | Nombre del restaurante, logo, eslogan, teléfono, email, dirección, Instagram, Facebook, horarios, favicon |
| `heroContent` | Singleton | Título principal, subtítulo, imagen de fondo, texto del botón CTA, enlace del botón CTA |
| `aboutContent` | Singleton | Título de sección, descripción/historia, imagen, nombre del chef, cargo del chef, foto del chef |
| `contactContent` | Singleton | Título, subtítulo, teléfono, email, dirección, URL embed de Google Maps, horarios, texto del botón de reserva |
| `menuItem` | Colección | Nombre, descripción, precio, categoría (entrada / principal / postre / bebida), imagen, si es destacado, orden de aparición, slug |
| `galleryImage` | Colección | Imagen, texto alternativo, título opcional, orden de aparición |
| `testimonial` | Colección | Nombre del cliente, comentario, calificación (1–5 estrellas), fecha, orden de aparición |

Los **singletons** son documentos únicos: hay uno solo por tipo y el cliente solo puede editarlos, no crear más. Las **colecciones** permiten agregar múltiples items (ej: tantos platos o fotos como se quiera).

---

## Despliegue en Vercel

### Primer deploy

1. Hacé push del repositorio a GitHub
2. Entrá a [vercel.com](https://vercel.com) → **Add New Project** → importá el repo
3. Configurá las variables de entorno (ver tabla arriba)
4. Deploy — Vercel detecta Astro automáticamente

### Deploys automáticos

Una vez configurado:
- Cada push a `main` dispara un deploy automático del código
- Cada cambio publicado en Sanity Studio (con el webhook configurado en el paso 7) dispara un nuevo deploy del contenido

### Dominio personalizado

En **Settings → Domains**, podés agregar el dominio del restaurante. Después de agregarlo, actualizá dos archivos:

**`astro.config.mjs`:**
```js
export default defineConfig({
  site: 'https://www.mirestaurante.com',
  // ...
})
```

**`public/robots.txt`:**
```
Sitemap: https://www.mirestaurante.com/sitemap-index.xml
```

---

## Licencia

MIT — libre para uso personal y comercial.
