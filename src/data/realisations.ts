/*
 * Les sites réalisés par Lilian. Une seule liste, lue par la page d'offre
 * (/sites-web-abonnement) et par la page d'accueil : la capture, le lien et la
 * légende d'un site ne s'écrivent qu'ici.
 *
 * `long` est facultatif : la même page d'accueil, capturée sur toute sa
 * hauteur (ramenée à 960 px de large), pour la vitrine de l'accueil qui la
 * fait défiler dans une fenêtre. Ses dimensions sont celles du fichier : elles
 * réservent la place avant son arrivée. Un site sans `long` y montre `src`.
 */
export const projects = {
  lilian: {
    src: '/sites-web/projects/liliansevoumian-home.webp',
    href: 'https://liliansevoumian.fr',
    name: 'Lilian Sevoumian',
    detail: 'Site personnel',
    alt: 'Page d’accueil du site Lilian Sevoumian, sur fond bleu nuit',
  },
  agenceafk: {
    src: '/sites-web/projects/agenceafk-home.webp',
    href: 'https://agenceafk.fr',
    name: 'agenceafk',
    detail: 'Agence IA et automatisation',
    alt: 'Page d’accueil claire du site agenceafk',
    long: { src: '/sites-web/projects/agenceafk-long.webp', width: 960, height: 3736 },
  },
  augmentes: {
    src: '/sites-web/projects/augmentes-home.webp',
    href: 'https://augmentes.fr',
    name: 'Augmentés',
    detail: 'Plateforme de formation',
    alt: 'Page d’accueil claire du site Augmentés',
    long: { src: '/sites-web/projects/augmentes-long.webp', width: 960, height: 3526 },
  },
  youmanista: {
    src: '/sites-web/projects/youmanista-home.webp',
    href: 'https://youmanista.com',
    name: 'Youmanista',
    detail: 'Cabinet de recrutement',
    alt: 'Page d’accueil colorée du cabinet Youmanista',
    long: { src: '/sites-web/projects/youmanista-long.webp', width: 960, height: 3892 },
  },
  meilleursTools: {
    src: '/sites-web/projects/meilleurs-tools-home.webp',
    href: 'https://meilleurs.tools',
    name: 'meilleurs.tools',
    detail: 'Catalogue éditorial',
    alt: 'Page d’accueil du catalogue meilleurs.tools',
  },
  petiteStack: {
    src: '/sites-web/projects/la-petite-stack-home.webp',
    href: 'https://lapetitestack.fr',
    name: 'La Petite Stack',
    detail: 'Configurateur de logiciels',
    alt: 'Page d’accueil du configurateur La Petite Stack',
  },
} as const;

/**
 * L'ordre des deux pages, qui ouvre sur ce site-ci.
 *
 * Flameborn en est sorti le 1er octobre 2026 : flameborn.fr ne répondait plus
 * (zone DNS vide), et une vignette qui mène à un lien mort dessert la page. Sa
 * capture reste dans `public/sites-web/projects/` pour le jour où le site
 * revient.
 */
export const projectList = [
  projects.lilian,
  projects.agenceafk,
  projects.augmentes,
  projects.youmanista,
  projects.meilleursTools,
  projects.petiteStack,
] as const;
