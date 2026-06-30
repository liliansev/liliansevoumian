// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://liliansevoumian.fr',
  // Barre d'outils Astro masquée en dev (gêne le picker impeccable live). Aucun impact prod.
  devToolbar: { enabled: false },
  prefetch: {
    defaultStrategy: 'hover'
  },
  vite: {
    // @ts-expect-error -- type mismatch entre @tailwindcss/vite (Plugin<any>[]) et la version Vite embarquée par Astro (PluginOption). Compatible runtime.
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
        mdi: ['headphones', 'gamepad-variant', 'airplane'],
        'simple-icons': ['n8n', 'make', 'zapier', 'notion', 'airtable', 'googlesheets', 'anthropic', 'claude', 'openai', 'mistralai', 'hubspot', 'slack', 'stripe', 'gmail', 'googledrive', 'googlecalendar', 'calendly', 'typeform', 'shopify', 'whatsapp', 'telegram', 'discord', 'mailchimp', 'brevo', 'trello']
      }
    }),
    sitemap()
  ]
});
