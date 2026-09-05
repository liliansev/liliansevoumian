/* Source commune des réponses visibles et du JSON-LD de la LP automatisation. */

import { DUREE_RESERVATION_MINUTES } from '../lib/reservation';
import { automationSubscriptions, maintenanceScope } from './maintenance';

export interface FaqItem {
  /** Question affichée. */
  q: string;
  /** Réponse : texte visible ET source de l'answer JSON-LD. */
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "Combien coûte une automatisation ?",
    a: `La création est chiffrée sur devis après l’appel de ${DUREE_RESERVATION_MINUTES} minutes. Chaque automatisation livrée s’accompagne d’un abonnement : ${automationSubscriptions[0].price} sans IA ou ${automationSubscriptions[1].price} avec IA ou agents. Hébergement, maintenance et petits ajustements sont inclus, ainsi que les coûts IA dans l’offre à ${automationSubscriptions[1].schemaPrice} € HT/mois.`,
  },
  {
    q: "C'est quoi un agent IA ?",
    a: "Un agent IA utilise un modèle d’intelligence artificielle pour traiter une tâche et agir dans les outils auxquels on lui donne accès. Il peut, par exemple, lire une demande, rechercher des informations et préparer une réponse. Je définis ses limites, les contrôles et les étapes à faire valider par votre équipe.",
  },
  {
    q: "Quelle différence avec une automatisation ?",
    a: "Une automatisation applique des règles définies à l’avance, comme créer une facture lorsqu’un devis est signé. L’IA intervient quand il faut interpréter un document ou une demande. Les deux peuvent se combiner : l’IA extrait les informations, puis le workflow les contrôle et prépare la suite.",
  },
  {
    q: "Je dois prendre n8n ou Make ?",
    a: "Nous choisissons selon vos logiciels, vos données, vos contraintes d’hébergement et les tâches à automatiser. Si vous utilisez déjà n8n ou Make, je commence par examiner cet existant. Je vous explique le choix technique avant de construire.",
  },
  {
    q: "Et si un de mes outils change et que tout casse ?",
    a: `L’abonnement mensuel prévoit la maintenance de la solution livrée : je prends en charge les corrections et les petits ajustements de l’existant. ${maintenanceScope} Je peux aussi reprendre une automatisation construite par un autre prestataire, après examen de son fonctionnement.`,
  },
  {
    q: "Comment vous contacter rapidement ?",
    a: `Le bouton « Choisir un créneau » ouvre mon agenda pour réserver un appel de ${DUREE_RESERVATION_MINUTES} minutes, sans engagement. Nous examinons ce qui vous prend du temps et priorisons les workflows ou agents à construire. Je vous explique ce qui est faisable et pourquoi ; le devis vient ensuite.`,
  },
];
