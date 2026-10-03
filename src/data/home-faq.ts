import type { FaqItem } from './faq';
import { DUREE_RESERVATION_MINUTES } from '../lib/reservation';
import { automationStartingPrice } from './service-pricing';

/*
 * Les questions de la page d'accueil : le texte visible de `home-questions`
 * ET la source du balisage `FAQPage`. Une seule écriture, pour qu'un moteur ne
 * lise jamais deux réponses à la même question.
 *
 * Rien n'y est affirmé qui ne soit déjà dans PRODUCT.md ou /llms.txt : le
 * public visé, le prix d'entrée (`service-pricing`), les outils métiers sur
 * devis, le devis ferme,
 * l'abonnement de suivi, la zone, la durée de l'appel.
 */
const euros = (montant: number) => `${montant.toLocaleString('fr-FR')}\u00a0€\u00a0HT`;

export const homeFaqs: FaqItem[] = [
  {
    q: 'Pour qui travaillez-vous\u00a0?',
    a: 'Pour des dirigeants de PME, des fondateurs de startup et des responsables des opérations, le plus souvent dans des entreprises de 5\u00a0à\u00a050\u00a0personnes. Je suis basé en Île-de-France et je travaille avec des équipes partout en France.',
  },
  {
    q: 'Combien ça coûte\u00a0?',
    a: `Une automatisation ou un agent\u00a0IA démarre à ${euros(automationStartingPrice)}\u00a0; un dashboard ou un outil métier se chiffre sur devis. Le devis est ferme une fois le périmètre posé. Chaque projet livré s’accompagne d’un abonnement de suivi\u00a0: hébergement, maintenance et petits ajustements.`,
  },
  {
    q: 'Vous travaillez seul\u00a0?',
    a: 'Oui. Je suis freelance\u00a0: la personne qui cadre votre projet est celle qui le construit. Si le projet demande une équipe plus large, on le décide avant de démarrer.',
  },
  {
    q: 'Comment se passe le premier échange\u00a0?',
    a: `Vous m’écrivez en une phrase ce qui vous fait perdre du temps, par WhatsApp ou par e-mail, ou vous réservez un appel de ${DUREE_RESERVATION_MINUTES}\u00a0minutes en visio, sans engagement. On regarde ce qui est faisable, et pourquoi. Le devis vient ensuite.`,
  },
];
