// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://crcabogados.com.ar',
  output: 'static',
  integrations: [
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
