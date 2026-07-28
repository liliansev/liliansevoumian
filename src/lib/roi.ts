/*
 * roi.ts — SOURCE UNIQUE DE VÉRITÉ de la logique du simulateur de temps.
 *
 * Avant, les constantes, formatFR() et compute() étaient dupliqués VERBATIM
 * dans deux scopes du ROICalculator.astro : le frontmatter (rendu SSR initial)
 * ET le <script> client (recalcul live). Risque de divergence SSR/JS à chaque
 * édition. Désormais une seule définition importée des deux côtés.
 *
 * Le sujet est le TEMPS repris, pas l'euro : l'euro n'est qu'une traduction du
 * temps à un coût chargé posé en hypothèse.
 *
 * Aucune référence au prix de la mission : ce simulateur estime ce que coûte
 * l'existant, il ne chiffre pas ce que coûterait de le corriger.
 */

/** Part des heures manuelles récupérées via automatisation (estimation conservatrice) */
export const RECOVERY_RATE = 0.55;
/** Semaines effectives par an */
export const WEEKS_PER_YEAR = 48;
/** Plafond raisonnable d'heures/sem au-delà duquel l'estimation est cappée */
export const MAX_REASONABLE_HOURS = 20;
/** Plafond raisonnable d'employés au-delà duquel l'estimation est cappée */
export const MAX_REASONABLE_PEOPLE = 10;
/**
 * Coût horaire chargé, en hypothèse fixe et non plus en curseur.
 *
 * Deux raisons. La justesse d'abord : les heures et les employés étaient
 * plafonnés, le taux ne l'était pas — au maximum des trois curseurs la page
 * affichait 633 600 €/an sous un intitulé « hypothèse conservatrice ». L'usage
 * ensuite : demander son coût horaire chargé à un dirigeant est la question qui
 * fait abandonner, ou mentir.
 */
export const HOURLY_COST = 55;

export function formatFR(n: number): string {
  // Intl sépare les milliers avec une espace fine insécable (U+202F), qui se
  // rend cassée en Geist 600 aux grandes tailles : on la remplace par l'espace
  // insécable standard (U+00A0).
  //
  // Les deux caractères sont écrits en séquences d'échappement, pas en
  // littéral : glissés tels quels dans le fichier ils sont invisibles à la
  // relecture, et une réécriture du fichier les normalise en espaces ASCII
  // sans que rien ne le signale — le remplacement devient alors silencieusement
  // inopérant. C'est exactement ce qui s'est produit une fois.
  return n.toLocaleString('fr-FR').replace(/\u202F/g, '\u00A0');
}

export function compute(hours: number, people: number) {
  const cappedHours = Math.min(hours, MAX_REASONABLE_HOURS);
  const cappedPeople = Math.min(people, MAX_REASONABLE_PEOPLE);
  const isCapped = hours >= MAX_REASONABLE_HOURS || people >= MAX_REASONABLE_PEOPLE;
  /** Heures passées en tâches répétitives sur l'année, avant automatisation. */
  const manualHours = Math.round(cappedHours * cappedPeople * WEEKS_PER_YEAR);
  const hoursSaved = Math.round(manualHours * RECOVERY_RATE);
  const moneySaved = hoursSaved * HOURLY_COST;
  return { cappedHours, cappedPeople, isCapped, manualHours, hoursSaved, moneySaved };
}

/**
 * Traduit un volume d'heures en semaines de travail — « 634 h » ne dit rien à
 * personne, « 18 semaines de 35 h » se voit dans un planning. Arithmétique pure
 * sur le chiffre déjà affiché, aucune hypothèse supplémentaire.
 */
export const WORK_WEEK_HOURS = 35;
export function inWorkWeeks(hours: number): number {
  return Math.round(hours / WORK_WEEK_HOURS);
}
