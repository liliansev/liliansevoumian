/* Source commune des réponses visibles et du JSON-LD de la page d'offre
   automatisation, reprise aussi par /llms.txt. */

import { DUREE_RESERVATION_MINUTES, LIBELLE_CONTACT_RESERVATION } from '../lib/reservation';
import { automationSubscriptions, maintenanceScope } from './maintenance';
import { automationStartingPrice } from './service-pricing';
import { pageMakeOuN8n, reponseMakeOuN8n } from './make-ou-n8n';

export interface FaqItem {
  /** Question affichée. */
  q: string;
  /** Réponse, en texte brut : c'est elle que lisent le balisage `FAQPage` et
      /llms.txt, et elle s'affiche telle quelle quand `html` est absent. */
  a: string;
  /** La même réponse pour l'affichage, quand elle porte un lien. */
  html?: string;
}

const entree = `${automationStartingPrice.toLocaleString('fr-FR')}\u00a0€\u00a0HT`;
/* « 90 € HT / mois » s'écrit « 90 € HT par mois » dans une phrase. */
const parMois = (prix: string) => prix.replace(/\s\/\smois/, '\u00a0par mois');
const reponsePrix = `Une automatisation ou un agent\u00a0IA démarre à ${entree}. Le montant exact est fixé dans un devis, après l’appel de ${DUREE_RESERVATION_MINUTES}\u00a0minutes. Chaque automatisation livrée s’accompagne d’un abonnement\u00a0: ${parMois(automationSubscriptions[0].price)} sans IA ou ${parMois(automationSubscriptions[1].price)} avec IA ou agents. Hébergement, maintenance et petits ajustements sont inclus, ainsi que les coûts IA dans l’offre à ${automationSubscriptions[1].schemaPrice}\u00a0€\u00a0HT par mois.`;
const reponseAgent = 'Un agent IA utilise un modèle d’intelligence artificielle pour traiter une tâche et agir dans les outils auxquels on lui donne accès. Il peut, par exemple, lire une demande, rechercher des informations et préparer une réponse. Je définis ses limites, les contrôles et les étapes à faire valider par votre équipe.';

export const faqs: FaqItem[] = [
  {
    q: "Combien coûte une automatisation\u00a0?",
    a: reponsePrix,
    html: `${reponsePrix} Le détail est sur la page <a class="lien-prose" href="/combien-coute-une-automatisation">Combien coûte une automatisation\u00a0?</a>`,
  },
  {
    q: "C’est quoi un agent IA\u00a0?",
    a: reponseAgent,
    html: `${reponseAgent} Par quelle tâche commencer\u00a0: <a class="lien-prose" href="/agent-ia-pour-pme">Agent IA pour PME</a>.`,
  },
  {
    q: "Quelle différence avec une automatisation\u00a0?",
    a: "Une automatisation applique des règles définies à l’avance, comme créer une facture lorsqu’un devis est signé. L’IA intervient quand il faut interpréter un document ou une demande. Les deux peuvent se combiner\u00a0: l’IA extrait les informations, puis le workflow les contrôle et prépare la suite.",
  },
  {
    q: "Je dois prendre n8n ou Make\u00a0?",
    /* Une seule réponse à cette question sur tout le site : `data/make-ou-n8n`. */
    a: `${reponseMakeOuN8n} Je vous explique le choix technique avant de construire.`,
    html: `${reponseMakeOuN8n} Je vous explique le choix technique avant de construire. Le comparatif complet est sur la page <a class="lien-prose" href="${pageMakeOuN8n.href}">${pageMakeOuN8n.libelle}</a>`,
  },
  {
    q: "Et si un de mes outils change et que tout casse\u00a0?",
    a: `L’abonnement mensuel prévoit la maintenance de la solution livrée\u00a0: je prends en charge les corrections et les petits ajustements de l’existant. ${maintenanceScope} Je peux aussi reprendre une automatisation construite par un autre prestataire, après examen de son fonctionnement.`,
  },
  {
    q: "Comment vous contacter rapidement\u00a0?",
    a: `Le bouton «\u00a0${LIBELLE_CONTACT_RESERVATION}\u00a0» ouvre une conversation\u00a0: vous écrivez une phrase, puis vous choisissez WhatsApp, l’e-mail ou un appel de ${DUREE_RESERVATION_MINUTES}\u00a0minutes, sans engagement. Nous examinons ce qui vous prend du temps et priorisons les workflows ou agents à construire. Je vous explique ce qui est faisable et pourquoi\u00a0; le devis vient ensuite.`,
  },
];
