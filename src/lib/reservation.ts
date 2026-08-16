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

/**
 * Sélecteur des liens que l'overlay cal.com intercepte (Layout) et que le menu
 * mobile referme (Navigation). Il vise l'URL sans son créneau : un changement de
 * durée ne doit pas décrocher silencieusement la réservation on-site.
 *
 * Les deux scripts qui l'utilisent sont inline et ne peuvent pas importer ce
 * module — ils portent la chaîne en dur. Elle est reproduite ici pour que la
 * dépendance soit lisible, et le test de build (`pnpm build`) la vérifie en
 * comptant les liens tagués dans le HTML de sortie.
 */
export const SELECTEUR_RESERVATION = 'a[href*="cal.com/lilian-sevoumian"]';

/** Libellé par défaut d'un bouton de réservation. Les insécables sont voulues. */
export const LIBELLE_RESERVATION = 'Réserver mon diagnostic · 20 min';
