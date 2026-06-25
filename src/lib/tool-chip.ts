/**
 * Classe des chips d'outils. Monochrome : toutes les chips sont neutres
 * (chip-accent). Le paramètre est conservé pour la signature appelée ailleurs ;
 * la distinction AI / non-AI est désormais sans effet visuel.
 */
export function chipClass(_tool?: string): string {
  return 'chip chip-accent';
}
