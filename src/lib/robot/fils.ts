/*
 * fils.ts : les fils de l'accueil au bureau, tracés entre de vraies pièces de
 * la page (les modules de l'ouverture, ceux des parcours de cas).
 *
 * Un fil est une courbe de Bézier entre deux points, dans le repère d'une
 * racine positionnée ; un SVG sans `viewBox` la recouvre, ses unités sont
 * donc des pixels de la page et rien n'est déformé. Chaque fil a un trait
 * (toujours là) et un grain, un court tiret qui le parcourt à la demande.
 * `pathLength="1"` ramène tous les tirets à une fraction du fil, quelle que
 * soit sa longueur.
 *
 * Les places sont lues par `offsetLeft` et `offsetTop`, pas par
 * `getBoundingClientRect` : une pièce en train d'entrer en scène (décalée par
 * une transformation) est reliée là où elle se posera.
 */
const NS = 'http://www.w3.org/2000/svg';

export interface Pt { x: number; y: number }
export interface Cadre extends Pt { w: number; h: number }
export interface Fil { trait: SVGPathElement; grain: SVGPathElement }

/* Le rectangle d'une pièce dans le repère de la racine. */
export function cadre(el: HTMLElement, racine: HTMLElement): Cadre {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== racine) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent instanceof HTMLElement ? n.offsetParent : null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/* Le milieu d'un bord : `d`roite, `g`auche, `h`aut, `b`as. */
export function bord(c: Cadre, cote: 'd' | 'g' | 'h' | 'b'): Pt {
  if (cote === 'd') return { x: c.x + c.w, y: Math.round(c.y + c.h / 2) };
  if (cote === 'g') return { x: c.x, y: Math.round(c.y + c.h / 2) };
  if (cote === 'h') return { x: Math.round(c.x + c.w / 2), y: c.y };
  return { x: Math.round(c.x + c.w / 2), y: c.y + c.h };
}

function piece<K extends keyof SVGElementTagNameMap>(svg: SVGSVGElement, nom: K, attributs: Record<string, string | number>) {
  const el = document.createElementNS(NS, nom);
  for (const [cle, valeur] of Object.entries(attributs)) el.setAttribute(cle, String(valeur));
  svg.append(el);
  return el;
}

/* Un fil de `a` à `b`, qui part à l'horizontale ou à la verticale. */
export function tendre(svg: SVGSVGElement, a: Pt, b: Pt, sens: 'h' | 'v' = 'h'): Fil {
  const k = (sens === 'h' ? b.x - a.x : b.y - a.y) * 0.55;
  const d = sens === 'h'
    ? `M${a.x} ${a.y}C${a.x + k} ${a.y} ${b.x - k} ${b.y} ${b.x} ${b.y}`
    : `M${a.x} ${a.y}C${a.x} ${a.y + k} ${b.x} ${b.y - k} ${b.x} ${b.y}`;
  return {
    trait: piece(svg, 'path', { class: 'r-fil', d, pathLength: 1 }),
    grain: piece(svg, 'path', { class: 'r-fil__grain', d, pathLength: 1 }),
  };
}

/* Les ports, posés après les fils pour passer dessus ; un seul par point. */
export function ports(svg: SVGSVGElement, points: Pt[]): void {
  const vus = new Set<string>();
  for (const p of points) {
    const cle = `${p.x},${p.y}`;
    if (vus.has(cle)) continue;
    vus.add(cle);
    piece(svg, 'circle', { class: 'r-fil__port', cx: p.x, cy: p.y, r: 3.5 });
  }
}

/* Le grain parcourt le fil une fois. */
export function courir(f: Fil, delai = 0, duree = 850): Animation {
  return f.grain.animate([{ strokeDashoffset: 0.18 }, { strokeDashoffset: -1 }], { duration: duree, delay: delai, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' });
}

/* Le trait se dessine une fois, de son départ à son arrivée. */
export function dessiner(f: Fil, delai = 0, duree = 620): Animation {
  return f.trait.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: duree, delay: delai, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' });
}
