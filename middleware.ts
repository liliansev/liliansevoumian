import { next, waitUntil } from '@vercel/functions';
import { trackAICrawlerRequest } from '@datafast/ai-crawl';

/**
 * Vercel Routing Middleware (Edge) — tracking server-side des crawlers IA / bots
 * de recherche / crawlers d'entraînement via DataFast (@datafast/ai-crawl).
 *
 * Pourquoi ce fichier racine et pas src/middleware.ts (middleware Astro) :
 * le site est en `output: 'static'` (pages prérendues). Le middleware Astro ne
 * s'exécute PAS pour les pages statiques servies par Vercel. La Routing
 * Middleware Vercel, elle, s'exécute AVANT le cache pour TOUTES les requêtes,
 * y compris le HTML prérendu — c'est donc le seul endroit qui voit les requêtes
 * des bots IA (qui chargent le HTML brut sans JS front).
 * Réf : https://vercel.com/docs/routing-middleware (framework-agnostic, runs before cache).
 *
 * Best-effort : on appelle trackAICrawlerRequest SANS await ; on passe le
 * `waitUntil` de @vercel/functions (lié au contexte de la requête courante)
 * pour que l'envoi DataFast tourne en arrière-plan et que la réponse soit
 * rendue immédiatement.
 * Toutes les catégories de bots restent activées (answers + search + training + other).
 */
export default function middleware(request: Request) {
  trackAICrawlerRequest(request, { waitUntil }, {
    websiteId: 'dfid_Mq8wt9KvIisuofpYWZouo',
    // Le tracker browser (taap.it via /js/script.js) gère déjà les humains ;
    // ici on ne s'occupe que des crawlers. /api est déjà exclu par le matcher
    // ci-dessous, on le double en sécurité côté package.
    additionalIgnoredPathPrefixes: ['/api'],
  });

  // Laisse passer la requête vers la réponse normale (HTML statique, etc.).
  return next();
}

export const config = {
  // N'invoque l'edge middleware que sur les routes "document" : on exclut /api,
  // les internes Vercel/_*, le favicon, robots.txt, les sitemaps, et toute URL
  // se terminant par une extension d'asset (css/js/images/fonts/etc.).
  // Le package filtre déjà ces cas, mais le matcher évite d'invoquer la fonction
  // pour rien (coût/perf).
  matcher: [
    '/((?!api/|_|favicon\\.ico|robots\\.txt|sitemap.*\\.xml|.*\\.(?:css|js|mjs|json|map|txt|xml|png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|otf|eot|mp4|webm|pdf)$).*)',
  ],
};
