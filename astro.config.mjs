// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://liliansevoumian.fr',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    icon({
      include: {
        mdi: ['headphones', 'gamepad-variant', 'airplane']
      }
    }),
    sitemap()
  ]
});
