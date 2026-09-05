export interface MaintenanceOffer {
  name: string;
  price: string;
  schemaPrice: number;
  minimum?: boolean;
  promise: string;
  includes: readonly string[];
}

export const maintenanceIncludes = ['Hébergement', 'Maintenance', 'Petits ajustements de l’existant'] as const;
export const maintenanceScope = 'Les nouveaux processus, agents, fonctionnalités et pages font l’objet d’un devis complémentaire.';

export const automationSubscriptions: readonly MaintenanceOffer[] = [
  {
    name: 'Automatisation sans IA',
    price: '90\u00a0€\u00a0HT / mois',
    schemaPrice: 90,
    promise: 'Pour vos workflows et les connexions entre vos outils.',
    includes: maintenanceIncludes,
  },
  {
    name: 'Automatisation IA & agents',
    price: '190\u00a0€\u00a0HT / mois',
    schemaPrice: 190,
    promise: 'Pour vos automatisations avec IA et vos agents. Coûts IA inclus.',
    includes: [...maintenanceIncludes, 'Coûts IA inclus'],
  },
];

export const webSubscriptions: readonly MaintenanceOffer[] = [
  {
    name: 'Landing page',
    price: 'Dès 90\u00a0€\u00a0HT / mois',
    schemaPrice: 90,
    minimum: true,
    promise: 'Une page pour présenter votre offre.',
    includes: maintenanceIncludes,
  },
  {
    name: 'Site multipage',
    price: '190\u00a0€\u00a0HT / mois',
    schemaPrice: 190,
    promise: 'Plusieurs pages pour présenter votre activité et vos services.',
    includes: maintenanceIncludes,
  },
  {
    name: 'Site avec blog',
    price: '390\u00a0€\u00a0HT / mois',
    schemaPrice: 390,
    promise: 'Un site avec un espace pour publier vos contenus.',
    includes: maintenanceIncludes,
  },
];
