// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.SITE_URL ?? 'http://localhost:4321',
  adapter: vercel(),
  integrations: [
    sitemap(),
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? 'production',
      useCdn: false,
      studioBasePath: '/studio',
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});