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

/**
 * Libellé par défaut d'un bouton de réservation.
 *
 * IL NOMME CE QUE LE LECTEUR VEUT, PAS CE QU'IL SUBIT. Il a porté « Réserver
 * mon diagnostic · 20 min », et ce libellé demandait deux efforts avant de
 * promettre quoi que ce soit : réserver (un créneau à bloquer) et diagnostic
 * (un examen, dont on ne ressort par définition pas indemne). L'objet du clic
 * était la procédure ; le résultat, lui, n'était écrit nulle part sur le
 * bouton. Il l'est maintenant — l'action, l'agenda et la durée sont inchangés.
 *
 * La durée est descendue dans la copy qui borde les boutons (« 20 min, sans
 * engagement »), où elle rassure au lieu de tenir la moitié d'un libellé.
 *
 * LA LONGUEUR EST UNE CONTRAINTE, pas un détail de rédaction : `.btn-primary`
 * rend son libellé en capitales, et global.css cale la courbe de --text-button
 * pour qu'il tienne sur une ligne jusqu'à 320 px de large. Mesuré dans Geist à
 * 14 px avec l'interlettrage du bouton, « AUTOMATISER MON BUSINESS » réclame
 * 216 px, contre 266 px pour l'ancien libellé le plus long : la marge s'est
 * agrandie de 50 px, elle ne s'est pas réduite. Le libellé plus long qui avait
 * été envisagé — « Automatiser une partie de mon business », 326 px — repassait
 * le bouton sur deux lignes dès 375 px de fenêtre.
 *
 * Un seul emplacement a demandé un réglage : le CTA central de la barre de nav,
 * plus étroit que n'importe quel bouton. Il est traité dans global.css, au
 * niveau de `.nav-mid-cta`.
 */
export const LIBELLE_RESERVATION = 'Automatiser mon business';
