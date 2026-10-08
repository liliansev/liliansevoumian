import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { faqs } from '../data/faq';
import { creationOffers, subscriptionOffers } from '../data/sites-web';
import { automationSubscriptions, maintenanceScope } from '../data/maintenance';
import { DUREE_RESERVATION_MINUTES, URL_RESERVATION } from '../lib/reservation';
import { EMAIL_CONTACT } from '../lib/contact';
import { activites, organisations, parcours, profils, resume } from '../data/parcours';
import { automationStartingPrice } from '../data/service-pricing';

/*
 * /llms.txt — la carte du site à l'usage des moteurs de réponse générative.
 *
 * Il est GÉNÉRÉ AU BUILD, jamais écrit à la main : un fichier de faits rédigé
 * séparément diverge du site à la première modification, et un moteur qui lit
 * deux versions d'un même fait n'en cite aucune. Ici, les cas clients et la
 * FAQ viennent des mêmes sources que les pages.
 *
 * Ne contient que des faits sourcés. Les prix viennent des mêmes sources que
 * les pages : `service-pricing` pour les prix d'entrée, `sites-web` et
 * `maintenance` pour les formules.
 */
export const GET: APIRoute = async () => {
  const cas = (await getCollection('cas-clients', (e) => !e.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  /* Une ligne par cas, en phrases : ce qui a été fait, avec quoi, et le
     premier résultat publié. Un moteur doit pouvoir la citer telle quelle. */
  const phrase = (texte: string) => (/[.!?…]$/.test(texte.trim()) ? texte.trim() : `${texte.trim()}.`);
  const minuscule = (texte: string) => texte.charAt(0).toLowerCase() + texte.slice(1);
  const ligneCas = (c: (typeof cas)[number]) => {
    const resumeCas = c.data.description ? ` : ${phrase(c.data.description)}` : '.';
    const outils = c.data.tools.length ? ` Outils : ${c.data.tools.join(', ')}.` : '';
    /* Le premier résultat chiffré ; à défaut, le premier publié. */
    const mesure = c.data.kpis.find((k) => /\d/.test(k.value)) ?? c.data.kpis[0];
    const kpi = mesure ? ` Résultat : ${mesure.value}, ${minuscule(mesure.label)}.` : '';
    const scope = c.data.scopeNote ? ` ${phrase(c.data.scopeNote)}` : '';
    return `- [${c.data.title}](https://liliansevoumian.fr/cas-clients/${c.id})${resumeCas}${outils}${kpi}${scope}`;
  };

  /* Le parcours et les activités viennent de data/parcours.ts, comme sur la
     page d'accueil : la fiche ne peut pas dire autre chose que le site. */
  const ligneActivite = (a: (typeof activites)[number]) => {
    const url = a.lien.externe ? a.lien.href : `https://liliansevoumian.fr/${a.lien.href}`;
    return `- ${a.nom} (${a.depuis.toLowerCase()}) : ${a.resume} ${url}`;
  };
  const ligneAnnee = (p: (typeof parcours)[number]) =>
    `- ${p.annee} : ${p.etapes.map((e) => `${e.quand ? `${e.quand.toLowerCase()}, ` : ''}${e.titre}${e.detail ? ` (${e.detail})` : ''}`).join(' ; ')}`;

  const corps = `# Lilian Sevoumian

> ${resume}
> Ce site est sa page de référence : parcours, activités actuelles, réalisations,
> vidéos et newsletter. Les offres de mission y figurent aussi.

## Identité

- Nom : Lilian Sevoumian
- Activité : automatisation, agents IA, création de sites web et formation, depuis 2020
- Structures fondées : ${organisations.map((o) => `${o.nom} (${o.fondation.slice(0, 4)}, ${o.url})`).join(' ; ')}
- Certifications : Make niveau 5 (premier Français certifié, en 2022), Airtable Certified
- Formation : plus de 300 personnes formées à Make, n8n et à l'IA
- Entreprises accompagnées : plus de 100
- Zone : Île-de-France, France, Europe
- Profils : LinkedIn ${profils.linkedin} ; YouTube ${profils.youtube}
- Contact : ${URL_RESERVATION} (appel de ${DUREE_RESERVATION_MINUTES} min, sans engagement) ou ${EMAIL_CONTACT}

## Ce que je fais aujourd'hui

${activites.map(ligneActivite).join('\n')}

## Parcours

${parcours.map(ligneAnnee).join('\n')}

## Ce que je fais en mission

- Automatiser un processus métier de bout en bout (n8n, Make)
- Construire des agents IA qui prennent en charge une tâche entière
- Reprendre des automatisations existantes qui tombent en panne ou se sont empilées
- Former les équipes à utiliser et comprendre ce qui a été livré
- Créer une landing page ou un site vitrine, puis le maintenir ou l'améliorer
- Construire des dashboards, portails clients et applications métiers, sur un périmètre chiffré séparément

## Méthode commune

- Le vibe coding accélère la construction avec Claude Code et Codex.
- Le cadrage, l'architecture, les contrôles et les choix de livraison restent humains.

## Outils utilisés au quotidien

- n8n : workflows et agents IA, auto-hébergeables
- Make : scénarios d'intégration visuels
- Notion : base clients et suivi des opérations
- Airtable : base relationnelle et vues métier (certifié Airtable)
- Claude Code (Anthropic) : développement d'outils internes sur mesure
- Codex (OpenAI) : tâches de développement déléguées, relues avant livraison
- Mistral : extraction et enrichissement de données dans les cas clients présentés

## Cas clients documentés

${cas.map(ligneCas).join('\n')}

## Pages

- [Accueil](https://liliansevoumian.fr/) : parcours, activités actuelles, réalisations, vidéos et newsletter
- [Automatisation et IA](https://liliansevoumian.fr/automatisations-ia) : services, cas clients, méthode, calculateur et FAQ
- [Tous les cas clients](https://liliansevoumian.fr/cas-clients)
- [Expert Make](https://liliansevoumian.fr/expert-make)
- [Expert n8n](https://liliansevoumian.fr/expert-n8n)
- [Reprendre une automatisation qui casse](https://liliansevoumian.fr/reprendre-une-automatisation-qui-casse)
- [Make ou n8n : lequel choisir ?](https://liliansevoumian.fr/make-ou-n8n) : les critères de choix entre les deux outils, avec les cas construits sur chacun
- [Combien coûte une automatisation ?](https://liliansevoumian.fr/combien-coute-une-automatisation) : prix d'entrée, abonnement de suivi, ce qui fait varier le devis
- [Agent IA pour PME : par où commencer ?](https://liliansevoumian.fr/agent-ia-pour-pme) : par quelle tâche commencer, ce qui reste aux règles et à l'équipe
- [Sites et applications web](https://liliansevoumian.fr/sites-web-abonnement)
- [Principes de travail](https://liliansevoumian.fr/principes)

## Questions fréquentes — automatisation et IA

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Notes

- Une automatisation ou un agent IA démarre à ${automationStartingPrice.toLocaleString('fr-FR')} € HT. Le projet est chiffré après
  un appel de ${DUREE_RESERVATION_MINUTES} min, et le devis est ferme une fois le périmètre posé.
- L'offre sites web publie ses prix d'entrée : ${creationOffers.map((offer) => `${offer.name} ${offer.price}`).join(' ; ')}. Le suivi mensuel propose ${subscriptionOffers.map((offer) => `${offer.name} ${offer.price}`).join(' ou ')}.
- Chaque projet livré s'accompagne d'un abonnement de suivi, facturé séparément de la création. Les applications métiers et leur suivi font l'objet d'un devis adapté au périmètre.
- Abonnements automatisation : ${automationSubscriptions.map((offer) => `${offer.name} ${offer.price}`).join(' ; ')}. Les coûts IA sont inclus dans l'offre IA et agents.
- Le suivi comprend hébergement, maintenance et petits ajustements de l'existant. ${maintenanceScope} La rédaction récurrente d'articles est distincte de l'abonnement blog.
- Les chiffres cités dans les cas clients sont ceux mesurés chez le client
  concerné. Ils ne sont pas des moyennes et ne se transposent pas tels quels.
`;

  return new Response(corps, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
