/*
 * La newsletter : « Augmentés », sur Substack (newsletter.augmentes.fr).
 *
 * Depuis le 9 novembre 2026, le site n'inscrit plus personne lui-même : Lilian
 * a quitté Mailcheap et tout passe par son Substack. Le formulaire du blog
 * ouvre la page d'inscription de Substack avec l'adresse déjà remplie ; c'est
 * Substack qui envoie la confirmation. Aucune clé, aucune route serveur.
 *
 * Un fait, une source : le nom et les adresses ne s'écrivent qu'ici.
 */
const base = 'https://newsletter.augmentes.fr';

export const newsletter = {
  nom: 'Augmentés',
  url: base,
  /** La page d'inscription de Substack ; `?email=` la préremplit. */
  inscription: `${base}/subscribe`,
  archive: `${base}/archive`,
} as const;
