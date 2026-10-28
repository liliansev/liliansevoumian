/*
 * L'offre « outils métiers » (dashboards, portails clients, outils internes),
 * lue par `/outils-metiers`, `/llms.txt` et le balisage. Depuis le 28 octobre
 * 2026, Lilian ne propose plus de sites web : seuls les outils métiers
 * restent, création et suivi sur devis. Les phrases viennent de l'ancienne
 * page `/sites-web-abonnement`, débarrassées de leur part « site ».
 */

export interface FormeOutil {
  nom: string;
  texte: string;
}

export interface EtapeOutil {
  title: string;
  description: string;
  output: string;
}

export interface QuestionOutil {
  q: string;
  a: string;
}

export const formesOutil: readonly FormeOutil[] = [
  {
    nom: 'Dashboard de suivi',
    texte: 'Vos chiffres, vos dossiers en cours et les actions à traiter dans une même vue.',
  },
  {
    nom: 'Portail client',
    texte: 'Un espace où vos clients retrouvent leurs documents, déposent leurs pièces et suivent leurs demandes.',
  },
  {
    nom: 'Outil interne connecté',
    texte: 'Des formulaires et des étapes de validation reliés à votre CRM, vos données et vos automatisations.',
  },
];

/* Le prix, en une phrase : il n'y a pas de grille, tout est sur devis. */
export const prixOutil = 'Création et abonnement sur devis, selon les fonctionnalités, les utilisateurs et les connexions nécessaires.';

export const etapesOutil: readonly EtapeOutil[] = [
  {
    title: 'Comprendre ce qu’il faut créer',
    description: 'Vous me montrez votre activité, vos outils et ce qui vous manque. Nous choisissons les fonctionnalités prioritaires.',
    output: 'Un devis avec le contenu du projet, son budget et son calendrier.',
  },
  {
    title: 'Valider les écrans et les parcours',
    description: 'Nous définissons les écrans, les données et les actions de chaque utilisateur.',
    output: 'Une structure validée ensemble avant le développement.',
  },
  {
    title: 'Construire et tester',
    description: 'Je réalise le design et le développement. Vous essayez une première version ; je vérifie les formulaires, les parcours et le rendu sur mobile avant la mise en service.',
    output: 'Votre outil, testé puis mis en service.',
  },
  {
    title: 'Assurer le suivi',
    description: 'Je prends en charge l’hébergement, la maintenance et les petits ajustements de ce qui a été livré. Les nouveaux besoins sont chiffrés à part.',
    output: 'Le suivi mensuel prévu au devis.',
  },
];

/* Les questions de la page : le texte visible de `questions` ET la source du
   balisage `FAQPage`. Une seule écriture. */
export const questionsOutil: readonly QuestionOutil[] = [
  {
    q: 'Combien coûte un outil métier ?',
    a: 'La création et l’abonnement sont sur devis. Nous les chiffrons selon les fonctionnalités, les utilisateurs, les données et les outils à connecter.',
  },
  {
    q: 'Que dois-je fournir pour démarrer ?',
    a: 'Quelques exemples de dossiers ou de tâches à traiter : ils nous aident à définir les écrans. Je vous indique pendant le cadrage les éléments à rassembler.',
  },
  {
    q: 'Combien de temps faut-il pour le mettre en service ?',
    a: 'Le calendrier est fixé dans le devis, selon les fonctionnalités et les données disponibles. Nous prévoyons aussi les moments où vous testez le projet.',
  },
];
