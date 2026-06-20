/*
 * roi.ts — SOURCE UNIQUE DE VÉRITÉ de la logique du calculateur ROI.
 *
 * Avant, les 6 constantes, formatFR() et compute() étaient dupliqués VERBATIM
 * dans deux scopes du ROICalculator.astro : le frontmatter (rendu SSR initial)
 * ET le <script> client (recalcul live). Risque de divergence SSR/JS à chaque
 * édition. Désormais une seule définition importée des deux côtés.
 *
 * Modèle de style : data/pricing.ts.
 */
import { PRICING } from '../data/pricing';

/** Coût projet référence "mission complète" (tier haut) — € */
export const PROJECT_PRICE_MID = PRICING.missionCompleteRef;
/** Coût projet référence "workflow" (tier bas) — € */
export const PROJECT_PRICE_LOW = PRICING.workflowRef;
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
  const projectPrice = moneySaved < 20000 ? PROJECT_PRICE_LOW : PROJECT_PRICE_MID;
  const monthsToROI = moneySaved > 0 ? Math.max(1, Math.ceil((projectPrice * 12) / moneySaved)) : 99;
  return { cappedHours, cappedPeople, isCapped, hoursSaved, moneySaved, projectPrice, monthsToROI };
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
