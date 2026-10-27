/*
 * Les griffonnages du carnet : des traits faits main, tracés au build.
 *
 * Chaque forme est tirée au hasard d'une graine fixe : le dessin est le même à
 * chaque build et à chaque visite, et la page n'a besoin d'aucun script pour
 * le tracer. Les tracés sont lissés en courbes de Catmull-Rom (converties en
 * Bézier cubiques), légèrement tremblés, comme un trait de feutre.
 */

export type Forme =
  | 'vague'
  | 'coeur'
  | 'lecture'
  | 'enveloppe'
  | 'tableau'
  | 'bulle'
  | 'photo';

type Point = readonly [number, number];

/** Générateur pseudo-aléatoire mulberry32 : une graine, toujours la même suite. */
const hasard = (graine: number) => () => {
  graine |= 0;
  graine = (graine + 0x6d2b79f5) | 0;
  let t = Math.imul(graine ^ (graine >>> 15), 1 | graine);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const f = (n: number) => n.toFixed(1);

const lisse = (pts: readonly Point[]): string => {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}, ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
};

const trait = (x1: number, y1: number, x2: number, y2: number, r: () => number, courbe = 0.06): string => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const k = (r() - 0.5) * 2 * courbe;
  return lisse([
    [x1, y1],
    [mx - (y2 - y1) * k, my + (x2 - x1) * k],
    [x2 + (r() - 0.5) * 1.5, y2 + (r() - 0.5) * 1.5],
  ]);
};

const formes: Record<Forme, (w: number, h: number, r: () => number) => string[]> = {
  vague: (w, h, r) => {
    const pts: Point[] = [];
    for (let i = 0; i <= 8; i++) pts.push([(w * i) / 8, h / 2 + (i % 2 ? -1 : 1) * (h * 0.28 + r() * 2)]);
    return [lisse(pts)];
  },
  coeur: () => [lisse([[31, 50], [12, 34], [6, 18], [14, 7], [26, 9], [31, 18], [36, 8], [49, 6], [56, 17], [50, 33], [31, 50]])],
  lecture: () => [lisse([[8, 12], [44, 10], [45, 40], [8, 42], [8, 12]]), lisse([[22, 18], [34, 26], [22, 34], [22, 18]])],
  enveloppe: () => [lisse([[6, 13], [46, 12], [46, 40], [6, 40], [6, 13]]), lisse([[6, 14], [26, 29], [46, 13]])],
  tableau: (_w, _h, r) => [
    lisse([[6, 8], [46, 7], [47, 34], [6, 35], [6, 8]]),
    trait(14, 28, 22, 20, r),
    trait(22, 20, 30, 25, r),
    trait(30, 25, 40, 14, r),
    trait(20, 35, 16, 46, r),
    trait(32, 35, 36, 46, r),
  ],
  bulle: (_w, _h, r) => [
    lisse([[6, 10], [26, 6], [46, 10], [47, 28], [30, 34], [18, 34], [10, 44], [12, 34], [5, 28], [6, 10]]),
    trait(15, 18, 38, 18, r),
    trait(15, 25, 31, 25, r),
  ],
  photo: () => [
    lisse([[6, 14], [46, 13], [47, 42], [6, 43], [6, 14]]),
    lisse([[16, 14], [19, 8], [32, 8], [35, 14]]),
    lisse([[26, 20], [33, 23], [34, 30], [27, 35], [20, 32], [19, 24], [26, 20]]),
  ],
};

/** Les tracés (attribut `d`) d'une forme, pour une boîte `largeur` × `hauteur`. */
export const griffonner = (forme: Forme, largeur: number, hauteur: number, graine = 1): string[] =>
  formes[forme](largeur, hauteur, hasard(graine));

/** La boîte de chaque forme : celle dans laquelle ses points sont écrits. */
export const boites: Record<Forme, readonly [number, number]> = {
  vague: [300, 16],
  coeur: [62, 56],
  lecture: [52, 52],
  enveloppe: [52, 52],
  tableau: [52, 52],
  bulle: [52, 52],
  photo: [52, 52],
};
