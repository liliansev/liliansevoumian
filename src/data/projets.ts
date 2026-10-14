/*
 * Les projets de l'accueil : ceux sur lesquels Lilian travaille en ce moment,
 * et ceux qu'il a faits pour lui.
 *
 * Demande de Lilian, 14 octobre 2026 : le site doit être un site personnel,
 * moins vendeur ; on y voit ses derniers projets et ses projets perso
 * (RuneScape, DragonWild, ses sites de jeux vidéo, meilleurs.tools).
 *
 * RuneScape et Dragonwilds en sont sortis le même jour : Lilian ne les a pas
 * finis (« pour runescape j'ai pas fini donc mets-le pas »). Ils reviendront
 * avec leur adresse. Une entrée sans `href` s'affiche sans lien. Rien n'est
 * affirmé ici qui ne soit dans PRODUCT.md (« Evidence on Hand ») ou donné
 * par lui.
 */

export interface Projet {
  id: string;
  nom: string;
  /** Une phrase : ce que c'est, pour qui. */
  resume: string;
  /** Une étiquette courte : l'état ou le type (« En cours », « Jeu vidéo »). */
  etiquette?: string;
  href?: string;
  /** Capture dans `public/`, au format 16:10. */
  image?: string;
  /** La page entière, à 960 px de large, que le plan d'« En ce moment »
   *  parcourt au survol. */
  longue?: string;
  /** Texte en attente de Lilian. */
  provisoire?: true;
  /** L'emblème dessiné de la carte, quand le projet n'a pas de capture. */
  embleme?: 'flamme' | 'rune' | 'dragon';
  /** Ce qui le compose, en deux ou trois mots chacun. */
  tags?: string[];
}

/** Ce sur quoi Lilian travaille en ce moment. Deux ou trois au plus. */
export const enCours: Projet[] = [
  {
    id: 'agenceafk',
    nom: 'agenceafk',
    etiquette: 'Mon agence',
    resume:
      'Des agents IA, des automatisations Make et n8n et des outils métiers sur mesure, pour les entreprises de 5 à 50 personnes.',
    href: 'https://agenceafk.fr',
    image: '/sites-web/projects/agenceafk-home.webp',
    longue: '/sites-web/projects/agenceafk-long.webp',
    tags: ['Agents IA', 'Make et n8n', 'Outils métiers'],
  },
  {
    id: 'augmentes',
    nom: 'Augmentés',
    etiquette: 'Mes formations',
    resume: 'Des formations pratiques à Make, à n8n et à l’IA, en ligne ou directement avec les équipes.',
    href: 'https://augmentes.fr',
    image: '/sites-web/projects/augmentes-home.webp',
    longue: '/sites-web/projects/augmentes-long.webp',
    tags: ['Make', 'n8n', 'IA'],
  },
];

/** Ce que Lilian a construit pour lui, hors missions. */
export const persos: Projet[] = [
  {
    id: 'meilleurs-tools',
    nom: 'meilleurs.tools',
    etiquette: 'Catalogue',
    resume: 'Un annuaire d’outils de productivité, avec avis, alternatives et comparatifs, pour choisir le bon logiciel.',
    href: 'https://meilleurs.tools',
    image: '/sites-web/projects/meilleurs-tools-home.webp',
    tags: ['90 outils', 'Comparatifs', 'Top 5'],
  },
  {
    id: 'flameborn',
    nom: 'Flameborn',
    etiquette: 'Site de jeu vidéo',
    resume: 'La base de données française d’Enshrouded\u00a0: recettes, calculateur de craft, carte, objets et quêtes.',
    href: 'https://flameborn.fr',
    image: '/sites-web/projects/flameborn-home.webp',
    embleme: 'flamme',
    tags: ['Enshrouded', 'Calculateur de craft', 'Carte'],
  },
];
