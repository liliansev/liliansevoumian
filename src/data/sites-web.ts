export interface CreationOffer {
  name: string;
  price: string;
  schemaPrice: number;
  useCase: string;
  promise: string;
  includes: readonly string[];
}

export interface SubscriptionOffer {
  name: string;
  price: string;
  schemaPrice: number;
  role: string;
  promise: string;
  includes: readonly string[];
}

export interface ManufacturingStep {
  title: string;
  description: string;
  output: string;
}

export interface SiteFaq {
  q: string;
  a: string;
}

export const creationOffers: readonly CreationOffer[] = [
  {
    name: 'Landing page',
    price: '1\u00a0900\u00a0€\u00a0HT',
    schemaPrice: 1900,
    useCase: 'Une offre, une cible, une action principale.',
    promise: 'Une page complète pour présenter l’offre et guider le visiteur vers la prise de contact.',
    includes: ['Message et structure', 'Design et intégration responsive', 'Socle SEO et mesure'],
  },
  {
    name: 'Site vitrine + blog',
    price: '3\u00a0500\u00a0€\u00a0HT',
    schemaPrice: 3500,
    useCase: 'Plusieurs offres ou un besoin éditorial durable.',
    promise: 'Un site qui organise vos offres, vos preuves et vos contenus dans des pages faciles à parcourir.',
    includes: ['Pages principales', 'Base éditoriale', 'Maillage et indexabilité'],
  },
  {
    name: 'Site avec outil ou données',
    price: 'À partir de 5\u00a0500\u00a0€\u00a0HT',
    schemaPrice: 5500,
    useCase: 'Configurateur, catalogue, base de données ou espace interactif.',
    promise: 'Un outil web pour rechercher, filtrer, comparer ou guider le visiteur à partir de vos données.',
    includes: ['Modélisation des données', 'Interface interactive', 'Intégrations métier'],
  },
];

export const subscriptionOffers: readonly SubscriptionOffer[] = [
  {
    name: 'Care',
    price: '190\u00a0€\u00a0HT / mois',
    schemaPrice: 190,
    role: 'Maintenir',
    promise: 'Je maintiens le site, corrige les problèmes mineurs et fais un point chaque mois.',
    includes: ['Maintenance technique', 'Corrections mineures', 'Point de contrôle mensuel'],
  },
  {
    name: 'Growth',
    price: '490\u00a0€\u00a0HT / mois',
    schemaPrice: 490,
    role: 'Améliorer',
    promise: 'J’utilise Search Console et les données de conversion pour prioriser le prochain lot d’améliorations.',
    includes: ['Tout Care', 'Analyse Search Console et OpenSEO', 'Lot mensuel d’améliorations priorisées'],
  },
];

export const manufacturingSteps: readonly ManufacturingStep[] = [
  {
    title: 'Valider les informations de départ',
    description: 'Nous posons l’offre, la cible, les objections, le ton, les témoignages et les contraintes avant de produire les pages.',
    output: 'Un brief commun qui sert de référence à tout le projet.',
  },
  {
    title: 'Rassembler la matière',
    description: 'Je regroupe les informations commerciales, les preuves, les réponses utiles et les contenus à reprendre.',
    output: 'Un dossier de contenu que vous pouvez relire et compléter.',
  },
  {
    title: 'Écrire les pages',
    description: 'Chaque page reçoit un rôle, un message et une action. Je rédige, je coupe et je reprends le texte avant de passer au design.',
    output: 'Une architecture de pages et des messages validés.',
  },
  {
    title: 'Designer et intégrer',
    description: 'Je conçois le site avec le contenu réel, puis je l’intègre pour le mobile, la tablette et le desktop.',
    output: 'Une version complète à tester dans le navigateur.',
  },
  {
    title: 'Tester et publier',
    description: 'Je vérifie les faits, les liens, les métadonnées, l’indexabilité, les formulaires, la mesure et le rendu responsive.',
    output: 'Une mise en ligne relue et testée sous contrôle humain.',
  },
  {
    title: 'Choisir la suite',
    description: 'Après publication, Search Console, les conversions et vos retours commerciaux aident à choisir la prochaine amélioration.',
    output: 'Une liste d’actions priorisée à partir des données disponibles.',
  },
];

export const siteFaqs: readonly SiteFaq[] = [
  {
    q: 'Qu’est-ce qui est inclus dans la création du site ?',
    a: 'Le cadrage, la conception des messages, le design, l’intégration responsive, le socle SEO, la mesure et la mise en ligne. Le périmètre exact, les contenus à reprendre et les intégrations sont écrits dans le devis avant le démarrage.',
  },
  {
    q: 'Pourquoi ajouter un abonnement après la mise en ligne ?',
    a: 'Care couvre la maintenance après la mise en ligne. Growth ajoute une analyse des données et un lot d’améliorations chaque mois. Dans les deux cas, le périmètre mensuel est défini avant le démarrage.',
  },
  {
    q: 'Les textes sont-ils écrits par une IA ?',
    a: 'J’utilise l’IA pour accélérer la recherche, la structure, la rédaction et la critique. Je contrôle ensuite la cohérence, le naturel et le SEO. Vous validez les informations, les tarifs, les témoignages et les promesses.',
  },
  {
    q: 'Pouvez-vous garantir une position sur Google ?',
    a: 'Je livre un socle SEO solide et j’améliore les pages à partir de données réelles. Les positions, le trafic et le chiffre d’affaires dépendent ensuite du marché, de l’offre et de la concurrence.',
  },
  {
    q: 'Combien de temps faut-il pour mettre le site en ligne ?',
    a: 'Le délai dépend du nombre de pages, de l’état des contenus et des validations nécessaires. Il figure dans le devis après le cadrage du projet.',
  },
  {
    q: 'Quels projets demandent un spécialiste dédié ?',
    a: 'Le netlinking, la récupération après pénalité, les migrations SEO de centaines de pages, le SEO international et les contenus médicaux, financiers ou juridiques sensibles sortent de ce périmètre.',
  },
];

export const productionPromises = [
  'Les informations de départ sont validées avec vous.',
  'Les recommandations SEO s’appuient sur OpenSEO et Search Console quand les données sont disponibles.',
  'Je relis, teste et arbitre avant chaque publication.',
] as const;

export const refusedPromises = [
  'Netlinking et récupération après pénalité.',
  'Migration SEO de plusieurs centaines de pages.',
  'SEO international complexe.',
  'Contenus médicaux, financiers ou juridiques sensibles.',
] as const;
