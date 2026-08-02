// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

/* Les cas clients sont les seules pages du site à porter une date de
   publication réelle. On la lit ici pour alimenter le `lastmod` du sitemap
   (motif détaillé au niveau de `serialize`, plus bas).

   La clé `date` du frontmatter est déjà la source de vérité, validée par le
   schéma Zod de la collection : la relire évite d'en tenir une seconde à jour
   à la main. Le frontmatter est le premier bloc délimité par deux lignes
   `---`, ce qui reste vrai même quand le corps du cas contient des filets
   horizontaux. */
const CAS_CLIENTS_DIR = new URL('./src/content/cas-clients/', import.meta.url);

/** @type {Map<string, string>} chemin d'URL du cas → date de publication ISO */
const lastmodParCas = new Map();
for (const fichier of readdirSync(CAS_CLIENTS_DIR)) {
  if (!fichier.endsWith('.md')) continue;
  const frontmatter = readFileSync(new URL(fichier, CAS_CLIENTS_DIR), 'utf8').split(/^---\s*$/m)[1] ?? '';
  const brut = frontmatter.match(/^date:\s*(.+)$/m)?.[1]?.trim();
  if (!brut) continue;
  const date = new Date(brut);
  // Une date illisible vaut une date absente : mieux vaut ne rien déclarer pour
  // ce cas que de propager une valeur bancale jusqu'au sitemap.
  if (Number.isNaN(date.getTime())) continue;
  lastmodParCas.set(`/cas-clients/${fichier.slice(0, -'.md'.length)}`, date.toISOString());
}

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
        'simple-icons': ['n8n', 'make', 'zapier', 'notion', 'airtable', 'googlesheets', 'anthropic', 'claude', 'openai', 'mistralai', 'hubspot', 'slack', 'stripe', 'gmail', 'googledrive', 'googlecalendar', 'calendly', 'typeform', 'shopify', 'whatsapp', 'telegram', 'discord', 'brevo', 'trello'],
        /* Lovable ne figure pas dans simple-icons. La variante `-plain` de
           devicon est monochrome, donc elle prend currentColor comme tous les
           autres logos du site ; le jeu devicon standard, lui, dessine un
           dégradé de six couleurs qui ne pourrait ni passer à l'encre au repos
           ni virer à la marque au survol. */
        'devicon-plain': ['lovable']
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
         duplication qu'on vient de fermer.

         `lastmod` retombait sur `new Date()` : les 10 URL annonçaient donc la
         date du build, et chaque déploiement prétendait que tout le site venait
         de changer, y compris les pages intouchées depuis des mois. Un champ
         qui bouge à chaque passage n'apprend rien à un robot, il lui apprend à
         ne plus le lire. Seuls les cas clients ont une date réelle : eux seuls
         en déclarent une. Pour les autres, `lastmodParCas.get()` rend
         `undefined`, la balise n'est pas écrite, et c'est le résultat voulu —
         un `lastmod` absent est neutre, un `lastmod` faux est trompeur. */
      serialize: (item) => {
        const url = item.url.replace(/(.+)\/$/, '$1');
        return { ...item, url, lastmod: lastmodParCas.get(new URL(url).pathname) };
      },
    })
  ]
});
