/*
 * Les projets de l'accueil : ceux sur lesquels Lilian travaille en ce moment,
 * et ceux qu'il a faits pour lui.
 *
 * Demande de Lilian, 14 octobre 2026 : le site doit être un site personnel,
 * moins vendeur ; on y voit ses derniers projets et ses projets perso
 * (RuneScape, DragonWild, ses sites de jeux vidéo, meilleurs.tools).
 *
 * PROVISOIRE. Les entrées marquées `provisoire` attendent ses textes et ses
 * liens : le titre est le sien, la phrase est à remplacer. Une entrée sans
 * `href` s'affiche sans lien. Rien n'est affirmé ici qui ne soit dans
 * PRODUCT.md (« Evidence on Hand ») ou donné par lui.
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
  /** Texte en attente de Lilian. */
  provisoire?: true;
}

/** Ce sur quoi Lilian travaille en ce moment. Trois au plus. */
export const enCours: Projet[] = [
  {
    id: 'agenceafk',
    nom: 'agenceafk',
    etiquette: 'Mon agence',
    resume:
      'Des agents IA, des automatisations Make et n8n et des outils métiers sur mesure, pour les entreprises de 5 à 50 personnes.',
    href: 'https://agenceafk.fr',
  },
  {
    id: 'augmentes',
    nom: 'Augmentés',
    etiquette: 'Mes formations',
    resume: 'Des formations pratiques à Make, à n8n et à l’IA, en ligne ou directement avec les équipes.',
    href: 'https://augmentes.fr',
  },
  {
    id: 'projet-en-cours',
    nom: 'Projet en cours',
    etiquette: 'En cours',
    resume: 'Le projet sur lequel je travaille cette semaine, en une phrase.',
    provisoire: true,
  },
];

/** Ce que Lilian a construit pour lui, hors missions. */
export const persos: Projet[] = [
  {
    id: 'meilleurs-tools',
    nom: 'meilleurs.tools',
    etiquette: 'Catalogue',
    resume: 'Mon catalogue des outils que j’utilise et que je recommande.',
    href: 'https://meilleurs.tools',
    image: '/sites-web/projects/meilleurs-tools-home.webp',
    provisoire: true,
  },
  {
    id: 'runescape',
    nom: 'RuneScape',
    etiquette: 'Jeu vidéo',
    resume: 'Un projet autour de RuneScape, en une phrase.',
    provisoire: true,
  },
  {
    id: 'dragonwild',
    nom: 'DragonWild',
    etiquette: 'Jeu vidéo',
    resume: 'Un projet autour de DragonWild, en une phrase.',
    provisoire: true,
  },
  {
    id: 'sites-jeux-video',
    nom: 'Mes sites de jeux vidéo',
    etiquette: 'Sites',
    resume: 'Les sites que j’ai lancés autour des jeux vidéo, en une phrase.',
    provisoire: true,
  },
];
