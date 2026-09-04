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
    promise: 'Une page complète pour expliquer, rassurer et provoquer la prise de contact.',
    includes: ['Cadrage du message', 'Design et intégration responsive', 'Socle SEO et mesure'],
  },
  {
    name: 'Site vitrine + blog',
    price: '3\u00a0500\u00a0€\u00a0HT',
    schemaPrice: 3500,
    useCase: 'Plusieurs offres ou un besoin éditorial durable.',
    promise: 'Une architecture de pages qui sépare clairement expertise, preuves et contenus.',
    includes: ['Pages structurantes', 'Base éditoriale', 'Maillage et indexabilité'],
  },
  {
    name: 'Site plus complexe',
    price: 'À partir de 5\u00a0500\u00a0€\u00a0HT',
    schemaPrice: 5500,
    useCase: 'Intégrations, contenus ou parcours qui dépassent un site vitrine.',
    promise: 'Un périmètre sur mesure, chiffré après avoir posé les flux et les contraintes.',
    includes: ['Architecture spécifique', 'Intégrations métier', 'Recette adaptée au projet'],
  },
];

export const subscriptionOffers: readonly SubscriptionOffer[] = [
  {
    name: 'Care',
    price: '190\u00a0€\u00a0HT / mois',
    schemaPrice: 190,
    role: 'Maintenir',
    promise: 'Le site reste propre, disponible et suivi après sa mise en ligne.',
    includes: ['Maintenance technique', 'Corrections mineures', 'Point de contrôle mensuel'],
  },
  {
    name: 'Growth',
    price: '490\u00a0€\u00a0HT / mois',
    schemaPrice: 490,
    role: 'Améliorer',
    promise: 'Les données de recherche et de conversion décident du prochain lot, pas une intuition.',
    includes: ['Tout Care', 'Analyse Search Console et OpenSEO', 'Lot mensuel d’améliorations priorisées'],
  },
];

export const manufacturingSteps: readonly ManufacturingStep[] = [
  {
    title: 'Cadrer ce qui doit être vrai',
    description: 'Offre, cible, objections, différenciation, ton, témoignages et contraintes sont posés avant toute production.',
    output: 'Un brief validé qui interdit à l’IA d’inventer le client.',
  },
  {
    title: 'Construire la base de connaissances',
    description: 'Les informations commerciales, les preuves et les réponses utiles deviennent la source de vérité du projet.',
    output: 'Un dossier de contenu relisible par vous et réutilisable ensuite.',
  },
  {
    title: 'Choisir la structure et les messages',
    description: 'Chaque page reçoit un rôle, une intention de recherche et une action. Le texte est produit en plusieurs passes puis critiqué.',
    output: 'Une architecture et des messages, pas un remplissage de maquette.',
  },
  {
    title: 'Designer et intégrer',
    description: 'Le site est conçu pour votre contenu réel, puis intégré en responsive avec les états, les performances et l’accessibilité nécessaires.',
    output: 'Un site utilisable sur mobile, tablette et desktop.',
  },
  {
    title: 'Contrôler avant de publier',
    description: 'Exactitude, naturel, liens, métadonnées, indexabilité, formulaires et mesure sont vérifiés. Vous validez les faits et les promesses.',
    output: 'Une mise en ligne assumée par un humain, jamais un bouton “générer”.',
  },
  {
    title: 'Mesurer ce qui mérite de changer',
    description: 'Après publication, Search Console, les conversions et les retours commerciaux servent à prioriser la suite.',
    output: 'Un site qui progresse par décisions documentées.',
  },
];

export const siteFaqs: readonly SiteFaq[] = [
  {
    q: 'Qu’est-ce qui est inclus dans la création du site ?',
    a: 'Le cadrage, la conception des messages, le design, l’intégration responsive, le socle SEO, la mesure et la mise en ligne. Le périmètre exact, les contenus à reprendre et les intégrations sont écrits dans le devis avant le démarrage.',
  },
  {
    q: 'Pourquoi ajouter un abonnement après la mise en ligne ?',
    a: 'Parce qu’un site se dégrade ou stagne quand personne ne le suit. Care maintient le socle. Growth ajoute une boucle de mesure et d’amélioration. L’abonnement ne remplace pas la création : il commence après elle.',
  },
  {
    q: 'Les textes sont-ils écrits par une IA ?',
    a: 'L’IA accélère la recherche, la structure, la rédaction et la critique. Elle ne décide pas des faits. Je contrôle la cohérence, le naturel et le SEO, puis vous validez les informations, les tarifs, les témoignages et les promesses.',
  },
  {
    q: 'Pouvez-vous garantir une position sur Google ?',
    a: 'Non. Je peux livrer un socle SEO solide, travailler à partir de données réelles et améliorer les pages dans le temps. Personne ne peut honnêtement garantir une position, un volume de trafic ou un chiffre d’affaires.',
  },
  {
    q: 'Combien de temps faut-il pour mettre le site en ligne ?',
    a: 'Le délai dépend du nombre de pages, de l’état des contenus et des validations nécessaires. Il est annoncé avec le périmètre, avant de commencer, plutôt que promis à l’aveugle sur cette page.',
  },
  {
    q: 'Quels projets ne sont pas couverts par cette offre ?',
    a: 'Le netlinking, la récupération après pénalité, les migrations SEO de centaines de pages, le SEO international et les contenus médicaux, financiers ou juridiques sensibles demandent des spécialistes dédiés. Je ne les vends pas sous cette formule.',
  },
];

export const productionPromises = [
  'Le contenu part d’informations validées, pas d’un prompt générique.',
  'Les recommandations SEO utilisent des données OpenSEO et Search Console quand elles sont disponibles.',
  'Un humain relit, teste et arbitre avant chaque publication.',
] as const;

export const refusedPromises = [
  'Une première position sur Google.',
  'Une croissance garantie du trafic ou des ventes.',
  'Des articles publiés automatiquement sans contrôle.',
  'Une expertise SEO avancée maquillée par des outils.',
] as const;
