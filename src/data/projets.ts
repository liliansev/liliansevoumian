/*
 * Les projets de l'accueil : ceux sur lesquels Lilian travaille en ce moment,
 * et ceux qu'il a faits pour lui.
 *
 * Demande de Lilian, 14 octobre 2026 : le site doit être un site personnel,
 * moins vendeur ; on y voit ses derniers projets et ses projets perso
 * (RuneScape, DragonWild, ses sites de jeux vidéo, meilleurs.tools).
 *
 * Les phrases de « Ce site », RuneScape et Dragonwilds ont été écrites pour
 * lui le 14 octobre 2026, à sa demande (« invente pour les phrases ») : à
 * corriger dès qu'il donne les siennes et leurs liens. Une entrée sans
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
    id: 'ce-site',
    nom: 'Ce site',
    etiquette: 'En cours',
    resume: 'Je le transforme en vrai site personnel : mes projets, mes vidéos, et bientôt un blog.',
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
  },
  {
    id: 'runescape',
    nom: 'RuneScape',
    etiquette: 'Jeu vidéo',
    resume: 'Un projet de fan autour de RuneScape, pour retrouver vite une information en pleine partie.',
  },
  {
    id: 'dragonwild',
    nom: 'Dragonwilds',
    etiquette: 'Jeu vidéo',
    resume: 'Un compagnon de jeu pour RuneScape : Dragonwilds, le jeu de survie de Jagex, dans l’esprit de Flameborn.',
  },
  {
    id: 'flameborn',
    nom: 'Flameborn',
    etiquette: 'Site de jeu vidéo',
    resume: 'La base de données française d’Enshrouded : recettes, calculateur de craft, carte, objets et quêtes.',
    href: 'https://flameborn.fr',
  },
];
