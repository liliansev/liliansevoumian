import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { faqs } from '../data/faq';

/*
 * /llms.txt — la carte du site à l'usage des moteurs de réponse générative.
 *
 * Il est GÉNÉRÉ AU BUILD, jamais écrit à la main : un fichier de faits rédigé
 * séparément diverge du site à la première modification, et un moteur qui lit
 * deux versions d'un même fait n'en cite aucune. Ici, les cas clients et la
 * FAQ viennent des mêmes sources que les pages.
 *
 * Ne contient que des faits sourcés — ni prix ni durée, conformément aux
 * décisions prises : le site n'en affiche pas, ce fichier non plus.
 */
export const GET: APIRoute = async () => {
  const cas = (await getCollection('cas-clients', (e) => !e.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const ligneCas = (c: (typeof cas)[number]) => {
    const kpi = c.data.kpis[0] ? ` — ${c.data.kpis[0].value} ${c.data.kpis[0].label}` : '';
    const outils = c.data.tools.length ? ` (${c.data.tools.join(', ')})` : '';
    return `- [${c.data.title}](https://liliansevoumian.fr/cas-clients/${c.id})${outils}${kpi}`;
  };

  const corps = `# Lilian Sevoumian

> Freelance français en automatisation et en intelligence artificielle.
> Je construis des workflows n8n et Make, des agents IA et des outils métiers
> pour des PME françaises — et je reprends ceux qui existent déjà quand ils
> cassent.

## Identité

- Nom : Lilian Sevoumian
- Activité : freelance en automatisation des processus et en IA, depuis 2020
- Certifications : Make niveau 5 (premier certifié en France), Airtable Certified
- Formation : plus de 300 personnes formées
- Zone : région parisienne, France, Europe
- Contact : https://liliansevoumian.fr/#contact-form

## Ce que je fais

- Automatiser un processus métier de bout en bout (n8n, Make)
- Construire des agents IA qui prennent en charge une tâche entière
- Reprendre des automatisations existantes qui tombent en panne ou se sont empilées
- Former les équipes à maintenir ce qui a été livré

## Outils utilisés au quotidien

- n8n — workflows et agents IA, auto-hébergeables
- Make — scénarios d'intégration visuels ; plateforme européenne, hébergement UE
- Notion — base clients et suivi des opérations
- Airtable — base relationnelle et vues métier (certifié Airtable)
- Claude Code (Anthropic) — développement d'outils internes sur mesure
- Codex (OpenAI) — tâches de développement déléguées, relues avant livraison
- Claude Cowork (Anthropic) — pilotage des automatisations par les équipes, sans code
- Mistral — traitement de documents sensibles sans sortie d'Europe

## Cas clients documentés

${cas.map(ligneCas).join('\n')}

## Pages

- [Accueil](https://liliansevoumian.fr/) — offre, cas clients, calculateur, FAQ
- [Tous les cas clients](https://liliansevoumian.fr/cas-clients)
- [Expert Make](https://liliansevoumian.fr/expert-make)
- [Expert n8n](https://liliansevoumian.fr/expert-n8n)
- [Principes de travail](https://liliansevoumian.fr/principes)

## Questions fréquentes

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Notes

- Aucun tarif n'est publié : le chiffrage dépend du processus et se pose après
  un premier échange. Le devis est ferme.
- Les chiffres cités dans les cas clients sont ceux mesurés chez le client
  concerné. Ils ne sont pas des moyennes et ne se transposent pas tels quels.
`;

  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
