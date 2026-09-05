import { webSubscriptions, maintenanceScope } from './maintenance';

export interface CreationOffer {
  name: string;
  price: string;
  schemaPrice: number;
  useCase: string;
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
    useCase: 'Présenter une offre et recevoir des demandes.',
    promise: 'Votre offre, vos références et les réponses aux questions de vos prospects, réunies sur une page.',
    includes: ['Textes et structure', 'Design adapté au mobile', 'Bases SEO et suivi des visites'],
  },
  {
    name: 'Site vitrine + blog',
    price: '3\u00a0500\u00a0€\u00a0HT',
    schemaPrice: 3500,
    useCase: 'Présenter vos services et publier vos articles.',
    promise: 'Des pages dédiées à vos offres, vos réalisations et vos contenus pour aider chaque visiteur à trouver ce qui le concerne.',
    includes: ['Pages de présentation', 'Blog prêt à publier', 'Navigation et bases SEO'],
  },
  {
    name: 'Site avec outil ou données',
    price: 'À partir de 5\u00a0500\u00a0€\u00a0HT',
    schemaPrice: 5500,
    useCase: 'Aider vos visiteurs à choisir ou à trouver une information.',
    promise: 'Un catalogue, un comparateur ou un configurateur construit à partir de vos données et relié aux outils utiles au projet.',
    includes: ['Organisation des données', 'Recherche et filtres', 'Connexions à vos outils'],
  },
];

export const subscriptionOffers = webSubscriptions;

export const manufacturingSteps: readonly ManufacturingStep[] = [
  {
    title: 'Comprendre ce qu’il faut créer',
    description: 'Vous me montrez votre activité, vos outils et ce qui vous manque. Nous choisissons les pages ou les fonctionnalités prioritaires.',
    output: 'Un devis avec le contenu du projet, son budget et son calendrier.',
  },
  {
    title: 'Valider les contenus et les parcours',
    description: 'Pour un site, nous travaillons les textes et les références à montrer. Pour une application, nous définissons les écrans, les données et les actions de chaque utilisateur.',
    output: 'Une structure validée ensemble avant le développement.',
  },
  {
    title: 'Construire et tester',
    description: 'Je réalise le design et le développement. Vous essayez une première version ; je vérifie les liens, les formulaires, les parcours et le rendu sur mobile avant publication.',
    output: 'Votre site ou votre application, testé puis mis en ligne.',
  },
  {
    title: 'Assurer le suivi',
    description: 'Je prends en charge l’hébergement, la maintenance et les petits ajustements de ce qui a été livré. Les nouveaux besoins sont chiffrés à part.',
    output: 'Le suivi mensuel prévu au devis.',
  },
];

export const siteFaqs: readonly SiteFaq[] = [
  {
    q: 'Qu’est-ce qui est inclus dans la création du site ?',
    a: 'Les textes, le design, le développement, les bases SEO, le suivi des visites et la mise en ligne. Nous précisons dans le devis les pages, les contenus à reprendre et les outils à connecter.',
  },
  {
    q: 'L’abonnement est-il obligatoire ?',
    a: `Oui, il fait partie de chaque projet et se règle en plus de la création : ${webSubscriptions.map((offer) => `${offer.name.toLowerCase()} ${offer.price}`).join(' ; ')}. Il couvre l’hébergement, la maintenance et les petits ajustements. ${maintenanceScope}`,
  },
  {
    q: 'Les tarifs des sites couvrent-ils une application métier ?',
    a: 'Les grilles concernent les sites web. Pour un dashboard, un portail client ou une application métier, la création et l’abonnement sont sur devis. Nous les chiffrons selon les fonctionnalités, les utilisateurs, les données et les outils à connecter.',
  },
  {
    q: 'L’abonnement blog comprend-il la rédaction des articles ?',
    a: `La rédaction d’articles se chiffre séparément. L’abonnement à ${webSubscriptions[2].price} couvre l’hébergement, la maintenance et les petits ajustements du site et de son blog.`,
  },
  {
    q: 'Que dois-je fournir pour démarrer ?',
    a: 'Vos offres, vos contenus existants et vos références. Pour une application, quelques exemples de dossiers ou de tâches à traiter nous aident à définir les écrans. Je vous indique pendant le cadrage les éléments à rassembler.',
  },
  {
    q: 'Que prévoyez-vous pour le référencement Google ?',
    a: 'Je travaille la structure des pages, leurs titres, leurs liens et leur accessibilité aux moteurs de recherche. Le classement dépend aussi de vos contenus, de votre marché et de la concurrence : aucune position précise n’est garantie.',
  },
  {
    q: 'Combien de temps faut-il pour mettre le site en ligne ?',
    a: 'Le calendrier est fixé dans le devis, selon le nombre de pages, les fonctionnalités et les contenus disponibles. Nous prévoyons aussi les moments où vous relisez ou testez le projet.',
  },
  {
    q: 'Quels besoins SEO se traitent séparément ?',
    a: 'L’acquisition de liens, les pénalités Google, les grosses migrations et le référencement international demandent une mission dédiée. Les contenus médicaux, financiers ou juridiques sensibles nécessitent aussi une expertise spécialisée.',
  },
];
