/*
 * metiers : les quatre métiers de Lilian, dans l'ordre qu'il a donné le
 * 3 octobre 2026 (automatisation, agents IA, dashboards et outils métiers,
 * formations). Une seule source, lue par le chapitre « Expertises » de
 * l'accueil (`components/documentaire/expertises.astro`) et par l'ancien bloc
 * `home-services.astro`.
 *
 * Rien n'est affirmé qui ne soit dans PRODUCT.md ; les prix viennent de
 * `data/service-pricing`.
 */
import { automationStartingPrice } from './service-pricing';

export const prixMetier = (montant: number) => `À partir de ${montant.toLocaleString('fr-FR')}\u00a0€\u00a0HT`;

export const metiers = [
  {
    id: 'automatisation',
    nom: 'Automatisation',
    onglet: 'Automatisation',
    phrase: 'Je relie vos outils, et les ressaisies disparaissent.',
    /* Seul texte de la liste qui porte du balisage : Make et n8n mènent à leur
       page. Il est rendu par `set:html`, comme les trois autres ; tous sont
       écrits ici, aucun ne vient d'une saisie. */
    texte:
      'Commandes, factures, relances, rapports\u00a0: je les automatise avec <a href="/expert-make">Make</a> et <a href="/expert-n8n">n8n</a>.',
    note: prixMetier(automationStartingPrice),
    lien: { href: '/automatisations-ia', label: 'Voir l’offre automatisation', goal: 'service_path_opened', source: 'home_metier_automation' },
  },
  {
    id: 'agents-ia',
    nom: 'Agents IA',
    onglet: 'Agents IA',
    phrase: 'Un agent qui va chercher la réponse à votre place.',
    texte:
      'Il lit vos documents et vos outils, répond sources à l’appui, et un humain garde la main.',
    /* L'offre « Automatisation et agents IA » n'a qu'un prix d'entrée : il
       s'affiche sur ses deux blocs, comme sur la ligne de fin de page. */
    note: prixMetier(automationStartingPrice),
    /* Le bouton sort vers l'agence ; le prix, lui, mène à l'offre du site,
       qui couvre automatisation et agents IA. */
    noteHref: '/automatisations-ia',
    lien: { href: 'https://agenceafk.fr', label: 'Voir mon agence, agenceafk', externe: true, goal: 'outbound_agence', source: 'home_services' },
  },
  {
    /* Le troisième métier, depuis le 3 octobre 2026 : plus de sites web sur
       l'accueil. Ce qui est affirmé vient de /llms.txt (« dashboards, portails
       clients et applications métiers, sur un périmètre chiffré
       séparément ») ; le prix est donc « sur devis », choix de Lilian. Le lien
       mène à la partie « Applications » de la page d'offre, qui reste en
       ligne. La phrase est de moi : à lui de la valider. */
    id: 'dashboards',
    nom: 'Dashboards et outils métiers',
    onglet: 'Dashboards',
    phrase: 'Vos chiffres d’un coup d’œil, et des outils taillés pour votre métier.',
    texte:
      'Dashboards, portails clients et applications internes, de la conception aux évolutions.',
    note: 'Sur devis',
    lien: { href: '/sites-web-abonnement#applications', label: 'Voir les applications métier', goal: 'service_path_opened', source: 'home_metier_web' },
  },
  {
    id: 'formations',
    nom: 'Formations',
    onglet: 'Formations',
    phrase: 'J’apprends à vos équipes à le faire elles-mêmes.',
    texte:
      'Make, n8n et l’IA, appris sur vos propres cas, en ligne ou avec vos équipes.',
    lien: { href: 'https://augmentes.fr', label: 'Voir les formations Augmentés', externe: true, goal: 'outbound_formations', source: 'home_services' },
  },
] as const;
