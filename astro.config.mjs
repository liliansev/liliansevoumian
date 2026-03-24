// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://liliansevoumian.fr',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    optimizeDeps: {
      exclude: ['@tailwindcss/vite']
    }
  },
  integrations: [
    icon({
      include: {
        mdi: ['headphones', 'gamepad-variant', 'airplane']
      }
    }),
    sitemap(),
    react()
  ]
});
