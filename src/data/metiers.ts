/*
 * metiers : les quatre métiers de Lilian, dans l'ordre qu'il a donné le
 * 3 octobre 2026 (automatisation, agents IA, dashboards et outils métiers,
 * formations). Une seule source, lue par le chapitre « Expertises » de
 * l'accueil (`components/documentaire/expertises.astro`) et par l'ancien bloc
 * `home-services.astro`.
 *
 * Rien n'est affirmé qui ne soit dans PRODUCT.md ; les prix viennent de
 * `data/service-pricing`. `outils` : les outils montrés en pastilles sur
 * l'accueil (« Citron et lilas »), tous attestés par les cas clients ou les
 * pages d'offre ; leur couleur est dans `data/outils.ts`.
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
    outils: ['Make', 'n8n'],
    note: prixMetier(automationStartingPrice),
    lien: { href: '/automatisations-ia', label: 'Voir l’offre automatisation', goal: 'service_path_opened', source: 'home_metier_automation' },
  },
  {
    /* Lilian, 10 novembre 2026 : ne plus dire que l'agent « prend la main »
       ni qu'un humain la garde ; un agent IA, ici, c'est du support client et
       de l'agent vocal, « un agent qui prend les appels à ta place, qui répond
       aux clients à ta place ». Le même jour l'agence (agenceafk) passe en
       retrait : le bouton du bloc mène à l'offre du site, plus à l'agence. */
    id: 'agents-ia',
    nom: 'Agents IA',
    onglet: 'Agents IA',
    phrase: 'Un agent qui répond à votre place.',
    texte:
      'Support client, agent vocal\u00a0: il prend les appels et répond à vos clients.',
    /* L'offre « Automatisation et agents IA » n'a qu'un prix d'entrée : il
       s'affiche sur ses deux blocs, comme sur la ligne de fin de page. */
    outils: ['Claude', 'Mistral'],
    note: prixMetier(automationStartingPrice),
    lien: { href: '/automatisations-ia', label: 'Voir l’offre agents IA', goal: 'service_path_opened', source: 'home_metier_agents' },
  },
  {
    /* Le troisième métier, depuis le 3 octobre 2026 : plus de sites web sur
       l'accueil. Ce qui est affirmé vient de /llms.txt (« dashboards, portails
       clients et applications métiers, sur un périmètre chiffré
       séparément ») ; le prix est donc « sur devis », choix de Lilian. Le lien
       mène à `/outils-metiers`. La phrase est de moi : à lui de la valider.
       Les outils : Claude Code et Codex (Lilian, 10 novembre 2026, « pour les
       interfaces, les dashboards, tu peux mettre Claude Code, Codex »), ceux
       avec lesquels il construit ces outils, comme le dit déjà /llms.txt. */
    id: 'dashboards',
    nom: 'Dashboards et outils métiers',
    onglet: 'Dashboards',
    phrase: 'Vos chiffres d’un coup d’œil, et des outils taillés pour votre métier.',
    texte:
      'Dashboards, portails clients et applications internes, de la conception aux évolutions.',
    outils: ['Claude Code', 'Codex'],
    note: 'Sur devis',
    lien: { href: '/outils-metiers', label: 'Voir les outils métiers', goal: 'service_path_opened', source: 'home_metier_web' },
  },
  {
    id: 'formations',
    nom: 'Formations',
    onglet: 'Formations',
    phrase: 'J’apprends à vos équipes à le faire elles-mêmes.',
    texte:
      'Make, n8n et l’IA, appris sur vos propres cas, en ligne ou avec vos équipes.',
    outils: ['Make', 'n8n'],
    lien: { href: 'https://augmentes.fr', label: 'Voir les formations Augmentés', externe: true, goal: 'outbound_formations', source: 'home_services' },
  },
] as const;
