// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://crcabogados.com.ar',
  output: 'static',
  integrations: [
    tailwind({
      // Point to our custom config
      configFile: './tailwind.config.mjs',
    }),
    sitemap(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
});
