import type { FaqItem } from './faq';
import { DUREE_RESERVATION_MINUTES } from '../lib/reservation';
import { automationSubscriptions, webSubscriptions, maintenanceScope } from './maintenance';

export const homeFaqs: FaqItem[] = [
  {
    q: 'Par quel service commencer ?',
    a: 'Automatisation & IA pour connecter vos outils et réduire les tâches manuelles. Sites & applications web pour créer une interface. Les deux peuvent se combiner.',
  },
  {
    q: 'Comment se répartit le budget ?',
    a: `La création est chiffrée au devis, puis un abonnement assure le suivi. Pour les automatisations : ${automationSubscriptions[0].price} sans IA, ${automationSubscriptions[1].price} avec IA ou agents, coûts IA inclus. Pour les sites : ${webSubscriptions.map((offer) => `${offer.name.toLowerCase()} ${offer.price}`).join(' ; ')}. Les applications métier et leur suivi sont chiffrés sur devis.`,
  },
  {
    q: 'Travaillez-vous seul ?',
    a: 'Oui, du cadrage aux améliorations prévues. Si le projet demande une équipe plus large, nous le déterminons avant de démarrer.',
  },
  {
    q: 'Que couvre l’abonnement mensuel ?',
    a: `L’abonnement fait partie de chaque projet livré. Il comprend l’hébergement, la maintenance et les petits ajustements de la solution existante. ${maintenanceScope}`,
  },
  {
    q: 'Comment se passe le premier échange ?',
    a: `Le bouton « Choisir un créneau » ouvre mon agenda pour réserver un appel de ${DUREE_RESERVATION_MINUTES} minutes. Nous décortiquons ce qui vous prend du temps, priorisons les automatisations ou les outils à construire, et je vous explique ce qui est faisable et pourquoi. Le devis vient ensuite.`,
  },
];
