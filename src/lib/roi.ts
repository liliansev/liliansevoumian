/*
 * roi.ts — SOURCE UNIQUE DE VÉRITÉ de la logique du calculateur ROI.
 *
 * Avant, les 6 constantes, formatFR() et compute() étaient dupliqués VERBATIM
 * dans deux scopes du ROICalculator.astro : le frontmatter (rendu SSR initial)
 * ET le <script> client (recalcul live). Risque de divergence SSR/JS à chaque
 * édition. Désormais une seule définition importée des deux côtés.
 *
 * Estimateur d'économies pur : économie €/an + heures/an. Aucune référence de
 * prix de projet (le calculateur ne chiffre pas la mission).
 */

/** Part des heures manuelles récupérées via automatisation (estimation conservatrice) */
export const RECOVERY_RATE = 0.55;
/** Semaines effectives par an */
export const WEEKS_PER_YEAR = 48;
/** Plafond raisonnable d'heures/sem au-delà duquel l'estimation est cappée */
export const MAX_REASONABLE_HOURS = 20;
/** Plafond raisonnable d'employés au-delà duquel l'estimation est cappée */
export const MAX_REASONABLE_PEOPLE = 10;

export function formatFR(n: number): string {
  // Format français avec NBSP standard (U+00A0) au lieu de narrow NBSP (U+202F)
  // qui se rend cassé en Geist 600 large size.
  return n.toLocaleString('fr-FR').replace(/ /g, ' ');
}

export function compute(hours: number, people: number, hourlyCost: number) {
  const cappedHours = Math.min(hours, MAX_REASONABLE_HOURS);
  const cappedPeople = Math.min(people, MAX_REASONABLE_PEOPLE);
  const isCapped = hours >= MAX_REASONABLE_HOURS || people >= MAX_REASONABLE_PEOPLE;
  const hoursSaved = Math.round(cappedHours * cappedPeople * RECOVERY_RATE * WEEKS_PER_YEAR);
  const moneySaved = hoursSaved * hourlyCost;
  return { cappedHours, cappedPeople, isCapped, hoursSaved, moneySaved };
}
