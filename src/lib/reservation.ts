/*
 * La réservation, en un seul endroit.
 *
 * L'agenda était écrit vingt-sept fois à la main, et le tracking en dépendait :
 * `data-fast-goal="lead_call"` et sa source sont posés en attribut sur chaque
 * lien, et rien ne les vérifiait. Un CTA ajouté sans l'attribut restait
 * parfaitement fonctionnel — il ouvrait l'agenda comme les autres — mais
 * n'apparaissait dans aucun funnel. La seule chose qui tenait l'inventaire était
 * la vigilance à la copie.
 *
 * `BoutonReservation.astro` rend la source obligatoire par le typage. Ce fichier
 * porte ce que le composant seul ne peut pas couvrir : les endroits où l'agenda
 * est cité hors composant (données du pied de page, réponses de FAQ, llms.txt).
 */

/** L'agenda. Une seule écriture pour tout le site. */
export const URL_RESERVATION = 'https://cal.com/lilian-sevoumian/20min';

/** Durée de l'événement Cal.com ; son URL historique reste inchangée. */
export const DUREE_RESERVATION_MINUTES = 45;

/**
 * Le libellé du bouton d'appel, le même sur tout le site depuis le 3 octobre
 * 2026 : il ouvre la conversation, où l'on choisit WhatsApp, l'e-mail ou un
 * appel. Il a porté « Choisir un créneau · 45 min » tant que le bouton ouvrait
 * l'agenda ; la durée se lit maintenant dans la conversation.
 */
export const LIBELLE_CONTACT_RESERVATION = 'Parlons de votre projet';
