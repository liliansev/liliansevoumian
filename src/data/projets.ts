/*
 * Les projets sur lesquels Lilian travaille en ce moment, pour le chapitre
 * « En ce moment » de l'accueil.
 *
 * Ses projets perso (meilleurs.tools, Flameborn ; RuneScape et Dragonwilds,
 * pas finis) ont quitté l'accueil le 14 octobre 2026 : « les projets, ce doit
 * être les projets clients, pas mes projets persos ». Le chapitre des projets
 * lit désormais les cas clients (`documentaire/filmographie.astro`). Leurs
 * textes restent dans l'historique git. Rien n'est affirmé ici qui ne soit
 * dans PRODUCT.md (« Evidence on Hand ») ou donné par Lilian.
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
