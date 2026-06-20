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

// Affichage du taux de récup en décimale FR ("0,55") piloté par la constante,
// pour qu'une source unique alimente calcul ET formule affichée.
const RECOVERY_RATE_FR = String(RECOVERY_RATE).replace('.', ',');

/**
 * Construit la string de formule affichée, p.ex. :
 *   "8H × 3 EMP × 0,55 RÉCUP × 48 SEM × 55€"
 * Les nombres magiques 0,55 (RECOVERY_RATE) et 48 (WEEKS_PER_YEAR) viennent des
 * constantes : une seule source pilote affichage ET calcul. Format (NBSP, ×, etc.)
 * préservé à l'identique du rendu historique.
 */
export function formatFormula(cappedHours: number, cappedPeople: number, hourlyCost: number): string {
  return `${cappedHours}H × ${cappedPeople} EMP × ${RECOVERY_RATE_FR} RÉCUP × ${WEEKS_PER_YEAR} SEM × ${hourlyCost}€`;
}
