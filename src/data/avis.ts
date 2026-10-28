/*
 * Les trois recommandations, écrites une fois : l'accueil (`carnet/avis`) et
 * la page d'offre (`Testimonials`) les lisent ici. La citation est en trois
 * morceaux : avant, le passage surligné en jaune, après. Les mots sont ceux
 * des personnes, coupés seulement par phrases entières (aucun ne leur fait
 * dire plus que ce qu'elles ont écrit). Portraits dans `assets/testimonials/`.
 */
import ismail from '../assets/testimonials/ismail.jpeg';
import alexis from '../assets/testimonials/alexis.jpeg';
import benjamin from '../assets/testimonials/benjamin.png';

export interface Avis {
  citation: [string, string, string];
  nom: string;
  role: string;
  image: ImageMetadata;
}

export const avis: Avis[] = [
  {
    citation: ['Les projets qu’il prend en charge ', 'sont un succès.', ''],
    nom: 'Benjamin Potet',
    role: 'Solution Architect Customer Experience, Make',
    image: benjamin,
  },
  {
    citation: ['J’ai la chance d’avoir collaboré à de nombreuses reprises avec Lilian. Je peux témoigner de ', 'son expertise en automatisation.', ''],
    nom: 'Alexis Kovalenko',
    role: 'Cofondateur, Contournement',
    image: alexis,
  },
  {
    citation: ['', 'Un vrai bonheur de travailler avec Lilian', ' sur des sujets de connectivité via Make.'],
    nom: 'Ismail Landoulsi',
    role: 'Cofondateur & COO, CasanovaParis',
    image: ismail,
  },
];
