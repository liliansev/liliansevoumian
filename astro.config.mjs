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
  /* `defaultStrategy` seul ne gouverne que les liens portant
     `data-astro-prefetch` ; aucun n'en portait, l'option ne pilotait donc rien.
     `prefetchAll` l'applique à tous les liens internes, ce qui est le sens
     voulu : la navigation home vers cas-clients vers un cas est le parcours le
     plus fréquent du site. */
  prefetch: {
    prefetchAll: true,
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
      /* `include` ne bundle que les icônes listées. `lucide` n'y figurait pas
         alors que 25 icônes en viennent : elles passaient par le chemin non
         restreint. La liste est complétée pour que la config décrive ce qui est
         réellement rendu. */
      include: {
        lucide: ['arrow-left', 'arrow-right', 'bell', 'building-2', 'calculator', 'clock', 'git-fork', 'linkedin', 'list-checks', 'list-ordered', 'mail', 'receipt-text', 'square-dot', 'target', 'triangle-alert', 'users', 'workflow', 'youtube'],
        'simple-icons': ['n8n', 'make', 'zapier', 'notion', 'airtable', 'googlesheets', 'anthropic', 'claude', 'openai', 'mistralai', 'hubspot', 'slack', 'stripe', 'gmail', 'googledrive', 'googlecalendar', 'calendly', 'typeform', 'shopify', 'whatsapp', 'telegram', 'discord', 'brevo', 'trello']
      }
    }),
    sitemap({
      // Elle est en noindex,nofollow : la declarer au sitemap est un signal
      // contradictoire, et Search Console le remonte comme avertissement.
      filter: (page) => !page.includes('/mentions-legales'),
      /* UN SEUL `serialize` : deux clés du même nom dans un littéral d'objet
         ne lèvent aucune erreur, la seconde écrase simplement la première.
         L'URL est normalisée sans slash final, comme le canonical et comme les
         217 liens internes — un sitemap qui déclare l'autre forme rouvrirait la
         duplication qu'on vient de fermer. */
      serialize: (item) => ({
        ...item,
        url: item.url.replace(/(.+)\/$/, '$1'),
        lastmod: item.lastmod ?? new Date().toISOString(),
      }),
    })
  ]
});
