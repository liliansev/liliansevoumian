import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { faqs } from '../data/faq';
import { creationOffers, subscriptionOffers } from '../data/sites-web';
import { URL_RESERVATION } from '../lib/reservation';

/*
 * /llms.txt — la carte du site à l'usage des moteurs de réponse générative.
 *
 * Il est GÉNÉRÉ AU BUILD, jamais écrit à la main : un fichier de faits rédigé
 * séparément diverge du site à la première modification, et un moteur qui lit
 * deux versions d'un même fait n'en cite aucune. Ici, les cas clients et la
 * FAQ viennent des mêmes sources que les pages.
 *
 * Ne contient que des faits sourcés. Les tarifs web viennent de la même source
 * que leur page ; les prestations d'automatisation restent sur devis.
 */
export const GET: APIRoute = async () => {
  const cas = (await getCollection('cas-clients', (e) => !e.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const ligneCas = (c: (typeof cas)[number]) => {
    const kpi = c.data.kpis[0] ? ` · ${c.data.kpis[0].value} ${c.data.kpis[0].label}` : '';
    const outils = c.data.tools.length ? ` (${c.data.tools.join(', ')})` : '';
    const scope = c.data.scopeNote ? ` — ${c.data.scopeNote}` : '';
    return `- [${c.data.title}](https://liliansevoumian.fr/cas-clients/${c.id})${outils}${kpi}${scope}`;
  };

  const corps = `# Lilian Sevoumian

> Freelance français en automatisation, intelligence artificielle et création
> de sites et applications web. Deux expertises de même niveau : automatiser les
> opérations et construire des sites commerciaux ou des outils pour les équipes.

## Identité

- Nom : Lilian Sevoumian
- Activité : freelance en automatisation, IA et création de sites web, depuis 2020
- Certifications : Make niveau 5 (premier certifié en France), Airtable Certified
- Formation : plus de 300 personnes formées
- Zone : région parisienne, France, Europe
- Contact : ${URL_RESERVATION} (appel de 20 min, sans engagement) ou bonjour@liliansevoumian.fr

## Ce que je fais

- Automatiser un processus métier de bout en bout (n8n, Make)
- Construire des agents IA qui prennent en charge une tâche entière
- Reprendre des automatisations existantes qui tombent en panne ou se sont empilées
- Former les équipes à maintenir ce qui a été livré
- Créer une landing page ou un site vitrine, puis le maintenir ou l'améliorer
- Construire des dashboards, portails clients et applications métiers, sur un périmètre chiffré séparément

## Méthode commune

- Le vibe coding accélère la construction avec Claude Code et Codex.
- Le cadrage, l'architecture, les contrôles et les choix de livraison restent humains.

## Outils utilisés au quotidien

- n8n : workflows et agents IA, auto-hébergeables
- Make : scénarios d'intégration visuels ; plateforme européenne, hébergement UE
- Notion : base clients et suivi des opérations
- Airtable : base relationnelle et vues métier (certifié Airtable)
- Claude Code (Anthropic) : développement d'outils internes sur mesure
- Codex (OpenAI) : tâches de développement déléguées, relues avant livraison
- Claude Cowork (Anthropic) : pilotage des automatisations par les équipes, sans code
- Mistral : traitement de documents sensibles sans sortie d'Europe

## Cas clients documentés

${cas.map(ligneCas).join('\n')}

## Pages

- [Accueil](https://liliansevoumian.fr/) : choix entre les deux expertises
- [Automatisation et IA](https://liliansevoumian.fr/automatisations-ia) : services, cas clients, méthode, calculateur et FAQ
- [Tous les cas clients](https://liliansevoumian.fr/cas-clients)
- [Expert Make](https://liliansevoumian.fr/expert-make)
- [Expert n8n](https://liliansevoumian.fr/expert-n8n)
- [Sites et applications web](https://liliansevoumian.fr/sites-web-abonnement)
- [Principes de travail](https://liliansevoumian.fr/principes)

## Questions fréquentes — automatisation et IA

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Notes

- Les prestations d'automatisation sont chiffrées après un appel de 20 min. Le
  devis est ferme une fois le périmètre posé.
- L'offre sites web publie ses prix d'entrée : ${creationOffers.map((offer) => `${offer.name} ${offer.price}`).join(' ; ')}. Le suivi mensuel propose ${subscriptionOffers.map((offer) => `${offer.name} ${offer.price}`).join(' ou ')}.
- La création du site et son suivi mensuel sont facturés séparément. Les applications métiers et leur suivi font l'objet d'un devis adapté au périmètre.
- Les chiffres cités dans les cas clients sont ceux mesurés chez le client
  concerné. Ils ne sont pas des moyennes et ne se transposent pas tels quels.
`;

  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
