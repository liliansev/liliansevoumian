/*
 * Le parcours de Lilian : ce qu'il fait aujourd'hui, d'où il vient, et les
 * faits qui le résument.
 *
 * UNE SEULE SOURCE, lue par trois endroits : la page d'accueil, le balisage
 * `Person` de Layout.astro et la fiche /llms.txt. Un moteur de réponse qui lit
 * deux versions d'un même fait n'en cite aucune ; ici il ne peut en lire
 * qu'une.
 *
 * Rien n'est affirmé qui ne soit documenté : chaque ligne vient du profil
 * LinkedIn public de Lilian (lu le 1er octobre 2026) ou d'un arbitrage qu'il a
 * rendu ce jour-là, consigné dans PRODUCT.md, « Evidence on Hand ». Avant
 * d'ajouter une date, un chiffre ou un nom, l'y inscrire d'abord.
 */

/** Les quatre faits du haut de page. `titre` est ce qu'on retient, `detail` le précise. */
export const faits = [
  { titre: 'Depuis 2020', detail: 'freelance en automatisation et agents IA' },
  { titre: 'Make niveau 5', detail: 'premier Français certifié, et Airtable Certified' },
  { titre: 'Plus de 300 personnes', detail: 'formées à Make, n8n et à l’IA' },
  { titre: 'Plus de 100 entreprises', detail: 'accompagnées' },
] as const;

export interface Activite {
  id: string;
  nom: string;
  /** Depuis quand, en clair. */
  depuis: string;
  resume: string;
  lien: {
    href: string;
    label: string;
    externe: boolean;
    /** Objectif DataFast et sa source, pour les sorties mesurées. */
    goal?: string;
    goalSource?: string;
  };
}

/** Ce que Lilian fait aujourd'hui, chaque activité avec sa sortie. */
export const activites: Activite[] = [
  {
    id: 'agenceafk',
    nom: 'agenceafk',
    depuis: 'Depuis janvier 2026',
    resume:
      'Mon agence : agents IA, automatisations Make et n8n et outils métiers sur mesure, pour les entreprises de 5 à 50 personnes.',
    lien: {
      href: 'https://agenceafk.fr',
      label: 'Voir l’agence',
      externe: true,
      goal: 'outbound_agence',
      goalSource: 'home_activites',
    },
  },
  {
    id: 'augmentes',
    nom: 'Augmentés',
    depuis: 'Depuis novembre 2023',
    resume:
      'Mes formations pratiques à Make, n8n et à l’IA, en ligne ou directement avec les équipes.',
    lien: {
      href: 'https://augmentes.fr',
      label: 'Voir les formations',
      externe: true,
      goal: 'outbound_formations',
      goalSource: 'home_activites',
    },
  },
  {
    id: 'contenus',
    nom: 'YouTube et newsletter',
    depuis: 'En vidéo et par mail',
    resume:
      'Des tutos, des tests et des cas concrets sur l’IA et l’automatisation, et un mail par semaine.',
    lien: { href: '#contenus', label: 'Regarder et s’abonner', externe: false },
  },
  {
    id: 'missions',
    nom: 'Missions en direct',
    depuis: 'Depuis septembre 2020',
    resume:
      'Je conçois, reprends et maintiens des automatisations, des sites et des applications métier.',
    lien: { href: '#offres', label: 'Voir les offres', externe: false },
  },
];

export interface EtapeParcours {
  /** Le moment dans l'année, quand il est connu. */
  quand?: string;
  titre: string;
  detail?: string;
}

/**
 * La frise, année par année. Une année sans étape datée n'y figure pas : 2025
 * est couverte par la mission Boost ton Biz, commencée en 2024.
 */
export const parcours: { annee: string; etapes: EtapeParcours[] }[] = [
  {
    annee: '2020',
    etapes: [
      {
        quand: 'Septembre',
        titre: 'Je me lance en freelance',
        detail: 'J’accompagne des entreprises sur leurs processus opérationnels.',
      },
    ],
  },
  {
    annee: '2021',
    etapes: [
      {
        titre: 'Premières missions : Familytrip, KlaK, Qonto',
        detail: 'En freelance, comme expert Make et Airtable.',
      },
    ],
  },
  {
    annee: '2022',
    etapes: [
      {
        quand: 'Avril',
        titre: 'No-Code Engineer chez Jellysmack',
        detail: 'Un an en CDI, jusqu’en avril 2023, à automatiser le travail des équipes.',
      },
      { titre: 'Missions Edumiam et Movecool', detail: 'En parallèle, comme expert Make.' },
    ],
  },
  {
    annee: '2023',
    etapes: [
      {
        quand: 'Avril',
        titre: 'Développeur back-end à l’École O’clock',
        detail: 'Un stage de sept mois, jusqu’en octobre.',
      },
      {
        quand: 'Novembre',
        titre: 'Je fonde Augmentés',
        detail: 'Des formations pratiques à Make et n8n, pour les indépendants et les équipes.',
      },
      {
        quand: 'Novembre',
        titre: 'Je cofonde La Capsule',
        detail:
          'Un studio de podcast dont je suis le COO jusqu’en février 2026. J’en automatise le back-office : réservations, fichiers, support et comptabilité.',
      },
      { titre: 'Missions Reborn et Deuxième Souffle' },
    ],
  },
  {
    annee: '2024',
    etapes: [
      {
        quand: 'Juillet',
        titre: 'Mission Boost ton Biz',
        detail: 'Onboarding, bases Airtable et processus entre coachs et clientes, jusqu’en août 2025.',
      },
    ],
  },
  {
    annee: '2026',
    etapes: [
      {
        quand: 'Janvier',
        titre: 'Je fonde agenceafk',
        detail: 'Agents IA, automatisations et outils métiers pour les entreprises de 5 à 50 personnes.',
      },
      {
        quand: 'Été',
        titre: 'Formateur chez Maria Schools',
        detail: 'Pour Lion, l’école qui met l’IA au service de son métier.',
      },
    ],
  },
];

/**
 * Les chiffres d'audience, chacun avec la date de son relevé. C'est le seul
 * endroit où ils s'écrivent : un chiffre non daté vieillit sans qu'on le sache.
 * LinkedIn affichait 11 444 abonnés le 1er octobre 2026. YouTube n'a pas de
 * chiffre affiché sur le site, par choix de Lilian.
 */
export const audience = {
  linkedin: { affiche: '11 K+ abonnés', releve: '2026-10-01' },
} as const;

/** Les deux structures fondées par Lilian, pour le balisage, le pied de page et /llms.txt. */
export const organisations = [
  {
    nom: 'agenceafk',
    url: 'https://agenceafk.fr',
    goal: 'outbound_agence',
    fondation: '2026-01',
    description:
      'Agence d’agents IA, d’automatisations Make et n8n et d’outils métiers sur mesure pour les entreprises de 5 à 50 personnes.',
  },
  {
    nom: 'Augmentés',
    url: 'https://augmentes.fr',
    goal: 'outbound_formations',
    fondation: '2023-11',
    description: 'Formations pratiques à Make, n8n et à l’IA, en ligne ou avec les équipes.',
  },
] as const;

/** La même chose en moins de 160 caractères, pour la méta-description de l'accueil. */
export const resumeCourt =
  'Lilian Sevoumian automatise le travail des entreprises depuis 2020. Fondateur d’agenceafk et d’Augmentés, premier Français certifié Make niveau 5.';

/** La phrase qui résume Lilian, partagée par le balisage et /llms.txt. */
export const resume =
  'Lilian Sevoumian automatise le travail des entreprises depuis 2020. Fondateur d’agenceafk et d’Augmentés, premier Français certifié Make niveau 5, il a formé plus de 300 personnes à Make, n8n et à l’IA.';
