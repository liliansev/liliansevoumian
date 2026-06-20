/*
 * pricing.ts — SOURCE UNIQUE DE VÉRITÉ des prix.
 *
 * Tout chiffre de prix affiché sur le site DOIT venir d'ici (Offres, ROICalculator,
 * FAQ). Avant, les montants étaient codés en dur à 3 endroits divergents :
 *   - Offres "à partir de 1 000 €"
 *   - FAQ "workflow 1 500 € / mission complète 15 000 €"
 *   - ROICalculator PROJECT_PRICE_LOW=1500 / MID=12000
 * Résultat : 12 000 € (ROI) contredisait 15 000 € (FAQ) pour la MÊME mission.
 * Désormais une seule constante par concept, importée partout.
 */

export const PRICING = {
  /** Régie "Vibe Coder" — €/jour */
  regieDayRate: 650,
  /** Mentoring 3 mois — €/mois */
  mentoringMonthly: 2500,
  /** Mission perso one-shot — plancher € */
  missionFloor: 1000,
  /** Coaching ponctuel — €/h */
  coachingHourly: 150,
  /** Coût projet référence "workflow" (ROICalculator tier bas + FAQ) — € */
  workflowRef: 1500,
  /** Coût projet référence "mission complète" (ROICalculator tier haut + FAQ) — € */
  missionCompleteRef: 12000,
} as const;

/**
 * Format FR avec NBSP standard (U+00A0) au lieu du narrow NBSP (U+202F) qui se
 * rend cassé en Geist 600 large size. Aligné sur formatFR du ROICalculator.
 */
export function eur(n: number): string {
  return n.toLocaleString('fr-FR').replace(/ /g, ' ');
}
