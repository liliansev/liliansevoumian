/*
 * plan.ts — la planche « Le plan » : un dessin d'ingénieur qui se trace puis
 * se met en marche.
 *
 * Ce module ne tourne qu'au rendu de la page (dans le frontmatter d'Astro). Il
 * modélise quatre petites machines en volume, les projette en perspective
 * isométrique, retire les lignes cachées, et rend des tracés SVG prêts à
 * poser, avec leur minutage. Le navigateur ne reçoit que le résultat : aucune
 * géométrie n'est calculée côté client.
 *
 * Trois partis pris :
 *
 *   la géométrie est exacte. Chaque point passe par `projeter`, rien n'est
 *   placé à l'œil. Les arêtes cachées sont trouvées par calcul (un point est
 *   caché si une face se trouve entre lui et l'observateur), ce qui permet
 *   d'empiler des pièces sans tenir la liste des recouvrements à la main ;
 *
 *   le trait de plume est un tiret qui se déroule. Chaque tracé reçoit un
 *   `pathLength`, et le script anime `stroke-dashoffset`. Les pointillés des
 *   arêtes cachées ne peuvent pas se dérouler ainsi (ils portent déjà un
 *   tiret) : ils arrivent en fondu, juste après les arêtes vues ;
 *
 *   la chorégraphie est écrite ici, pas dans le script. Les pièces mobiles
 *   portent une « piste » : une liste d'étapes datées en secondes, que le
 *   script convertit en une animation de la durée de la boucle. Toutes les
 *   animations ont la même durée et tournent sans fin : le raccord est exact
 *   par construction, et la pause les arrête toutes au même instant.
 */

export const LARGEUR = 800;
export const HAUTEUR = 600;

/* ------------------------------------------------------------------ */
/* Projection                                                          */
/* ------------------------------------------------------------------ */

type V3 = readonly [number, number, number];
type V2 = readonly [number, number];

const C30 = Math.cos(Math.PI / 6);
/** Pixels (unités du viewBox) par unité de plan. */
const ECHELLE = 40;
const OX = 398;
const OY = 324;

/** La partie linéaire de la projection : un déplacement dans le plan devient un déplacement à l'écran. */
const lin = (x: number, y: number, z: number): V2 => [(x - y) * C30 * ECHELLE, (x + y) * 0.5 * ECHELLE - z * ECHELLE];

/** x part vers le bas à droite, y vers le bas à gauche, z monte. */
const projeter = (p: V3): V2 => {
  const [a, b] = lin(p[0], p[1], p[2]);
  return [OX + a, OY + b];
};

const n1 = (v: number) => String(Math.round(v * 10) / 10);
const chemin = (pts: readonly V2[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${n1(x)} ${n1(y)}`).join('');
const longueur = (pts: readonly V2[]) => {
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return l;
};
const px = ([x, y]: V2) => `translate(${n1(x)}px,${n1(y)}px)`;

/* ------------------------------------------------------------------ */
/* Lignes cachées                                                      */
/* ------------------------------------------------------------------ */

interface Face {
  n: V3;
  c: number;
  ecran: V2[];
  cadre: [number, number, number, number];
}

interface Morceau {
  vu: boolean;
  pts: V2[];
}

/* Une face ne cache un point que si elle est franchement devant lui : une
   arête posée sur une face (un détail, le pied d'une pièce) reste vue. */
const DEVANT = 1e-4;
/* En isométrie les coïncidences sont partout (un coin avant tombe sur un coin
   arrière) : un point posé sur le bord d'une face à l'écran compte comme vu. */
const MARGE = 0.06;
/* Pas d'échantillonnage le long d'une arête, en pixels. Les changements de
   visibilité sont ensuite affinés par dichotomie. */
const PAS = 2.5;

function creerFace(pts: readonly V3[]): Face {
  let nx = 0;
  let ny = 0;
  let nz = 0;
  /* Normale par la méthode de Newell : juste même si le polygone n'est pas
     un triangle, et insensible au sens de parcours (seul le plan compte). */
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1, z1] = pts[i];
    const [x2, y2, z2] = pts[(i + 1) % pts.length];
    nx += (y1 - y2) * (z1 + z2);
    ny += (z1 - z2) * (x1 + x2);
    nz += (x1 - x2) * (y1 + y2);
  }
  const ecran = pts.map(projeter);
  const xs = ecran.map((p) => p[0]);
  const ys = ecran.map((p) => p[1]);
  return {
    n: [nx, ny, nz],
    c: nx * pts[0][0] + ny * pts[0][1] + nz * pts[0][2],
    ecran,
    cadre: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
  };
}

function distanceAuSegment(p: V2, a: V2, b: V2): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.min(1, Math.max(0, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

function interieur(p: V2, poly: readonly V2[]): boolean {
  let dedans = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[j];
    const b = poly[i];
    if (distanceAuSegment(p, a, b) < MARGE) return false;
    if (b[1] > p[1] !== a[1] > p[1] && p[0] < ((a[0] - b[0]) * (p[1] - b[1])) / (a[1] - b[1]) + b[0]) dedans = !dedans;
  }
  return dedans;
}

/** L'observateur regarde depuis (1, 1, 1) : un point est caché si une face coupe ce rayon. */
function cache(p: V3, faces: readonly Face[]): boolean {
  const e = projeter(p);
  for (const f of faces) {
    const nv = f.n[0] + f.n[1] + f.n[2];
    if (Math.abs(nv) < 1e-9) continue;
    const t = (f.c - (f.n[0] * p[0] + f.n[1] * p[1] + f.n[2] * p[2])) / nv;
    if (t < DEVANT) continue;
    if (e[0] < f.cadre[0] || e[0] > f.cadre[2] || e[1] < f.cadre[1] || e[1] > f.cadre[3]) continue;
    if (interieur(e, f.ecran)) return true;
  }
  return false;
}

/** Coupe une ligne brisée en morceaux vus et cachés, aux points exacts où elle passe derrière une face. */
function decouper(pts: readonly V3[], faces: readonly Face[], ferme: boolean): Morceau[] {
  const morceaux: Morceau[] = [];
  const pousser = (vu: boolean, a: V2, b: V2) => {
    const dernier = morceaux[morceaux.length - 1];
    if (dernier && dernier.vu === vu) dernier.pts.push(b);
    else morceaux.push({ vu, pts: [a, b] });
  };

  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const ea = projeter(a);
    const eb = projeter(b);
    const l = Math.hypot(eb[0] - ea[0], eb[1] - ea[1]);
    if (l < 1e-6) continue;
    const k = Math.max(1, Math.ceil(l / PAS));
    const en = (u: number): V3 => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
    const vu = (u: number) => !cache(en(u), faces);

    let debut = 0;
    let uPrec = 0.5 / k;
    let etat = vu(uPrec);
    for (let j = 1; j < k; j++) {
      const u = (j + 0.5) / k;
      const v = vu(u);
      if (v !== etat) {
        let bas = uPrec;
        let haut = u;
        for (let n = 0; n < 16; n++) {
          const m = (bas + haut) / 2;
          if (vu(m) === etat) bas = m;
          else haut = m;
        }
        const coupe = (bas + haut) / 2;
        pousser(etat, projeter(en(debut)), projeter(en(coupe)));
        debut = coupe;
        etat = v;
      }
      uPrec = u;
    }
    pousser(etat, projeter(en(debut)), eb);
  }

  /* Les éclats de moins d'un pixel viennent des tolérances, pas du dessin :
     ils prennent l'état de leur voisin. */
  const propres: Morceau[] = [];
  for (const m of morceaux) {
    const dernier = propres[propres.length - 1];
    if (dernier && (longueur(m.pts) < 0.9 || dernier.vu === m.vu)) dernier.pts.push(...m.pts.slice(1));
    else propres.push({ vu: m.vu, pts: [...m.pts] });
  }
  /* Une boucle fermée qui commence et finit dans le même état est un seul
     trait de plume, pas deux. */
  if (ferme && propres.length > 1 && propres[0].vu === propres[propres.length - 1].vu) {
    const fin = propres.pop()!;
    propres[0] = { vu: fin.vu, pts: [...fin.pts, ...propres[0].pts.slice(1)] };
  }
  return propres;
}

/* ------------------------------------------------------------------ */
/* Ce que le module rend                                               */
/* ------------------------------------------------------------------ */

/**
 * vu : arête vue. cache : arête cachée, en pointillé. detail : gravure sur une
 * face. hachure : face dans l'ombre. axe : trait mixte. cond : conduite.
 * cote : cotation et renvois.
 */
export type Genre = 'vu' | 'cache' | 'detail' | 'hachure' | 'axe' | 'cond' | 'cote';

export interface Trait {
  d: string;
  genre: Genre;
  /** t : tracé à la plume. f : fondu. */
  mode: 't' | 'f';
  /** « début, durée, effacement », en secondes. */
  t: string;
  /** Valeur de `pathLength` : la longueur que couvre un tiret de 1. */
  pl: number;
  /** Trop fin pour un petit cadre : masqué sous 430 px. */
  fin: boolean;
}

/** Une étape de piste : l'instant en secondes, les propriétés CSS, et la courbe jusqu'à l'étape suivante. */
type Etape = [number, Record<string, string | number>] | [number, Record<string, string | number>, string];

export interface Mobile {
  d: string;
  classe: string;
  piste: string;
  pl?: number;
  fin?: boolean;
}

export interface Repere {
  n: number;
  nom: string;
  legende: string;
  cx: number;
  cy: number;
  /** Le point visé sur la machine. */
  px: number;
  py: number;
  renvoi: Trait;
  tCercle: string;
  tTexte: string;
  pisteAccent: string;
  pisteOnde: string;
  pisteLegende: string;
}

export interface Plan {
  duree: number;
  grille: string;
  traits: Trait[];
  mobiles: Mobile[];
  reperes: Repere[];
  cote: { matrice: string; t: string };
  triedre: { x: number; y: number; lettre: string; t: string }[];
  pli: { coupe: string; piste: string; contour: Trait; aplat: string; rabat: string; pisteAccent: string };
  portique: { piste: string; traits: Trait[]; lumiere: Mobile };
  rayons: { matrice: string; t: string; piste: string; bouts: { x: number; y: number }[] };
  feuilles: { coupe: string; aplat: string; encre: string; pisteGlisse: string; pisteVue: string }[];
}

/* ------------------------------------------------------------------ */
/* Minutage                                                            */
/* ------------------------------------------------------------------ */

const DUREE = 13.6;
/* Le plan se trace : une machine après l'autre, puis les conduites, puis la cotation. */
const DEBUT_STATION = [0.2, 0.9, 1.6, 2.3];
const DUREE_STATION = 1.05;
const DEBUT_CONDUITES = 3.2;
const DEBUT_COTES = 3.7;
/* La machine se met en marche : une première impulsion, puis une seconde, plus rapide. */
const MARCHE = 4.5;
const RAPIDE = 9.4;
/* Les traits se rétractent de gauche à droite. */
const EFFACE = 12.3;
const DUREE_EFFACE = 0.75;
const RETRAIT = 0.32;

/** Les instants d'un passage : l'arrivée du pli, puis chaque conduite et chaque machine. */
interface Passage {
  pli: [number, number];
  conduites: [number, number][];
  lecteur: [number, number];
  commande: [number, number];
  facture: [number, number];
}

const PASSAGES: [Passage, Passage] = [
  {
    pli: [MARCHE + 0.2, MARCHE + 0.7],
    conduites: [
      [MARCHE + 0.65, MARCHE + 1.3],
      [MARCHE + 1.95, MARCHE + 2.55],
      [MARCHE + 3.1, MARCHE + 3.7],
    ],
    lecteur: [MARCHE + 1.25, MARCHE + 2.0],
    commande: [MARCHE + 2.5, MARCHE + 3.15],
    facture: [MARCHE + 3.65, MARCHE + 4.5],
  },
  {
    pli: [RAPIDE + 0.25, RAPIDE + 0.55],
    conduites: [
      [RAPIDE + 0.5, RAPIDE + 0.8],
      [RAPIDE + 1.05, RAPIDE + 1.35],
      [RAPIDE + 1.6, RAPIDE + 1.9],
    ],
    lecteur: [RAPIDE + 0.75, RAPIDE + 1.1],
    commande: [RAPIDE + 1.3, RAPIDE + 1.65],
    facture: [RAPIDE + 1.85, RAPIDE + 2.4],
  },
];

const DOUX = 'cubic-bezier(0.45, 0, 0.2, 1)';
const CHUTE = 'cubic-bezier(0.5, 0, 0.9, 0.6)';
const SORTIE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const s2 = (v: number) => Math.round(v * 100) / 100;
const piste = (etapes: Etape[]) => JSON.stringify(etapes.map((e) => [s2(e[0]), e[1], ...(e[2] ? [e[2]] : [])]));

/* ------------------------------------------------------------------ */
/* La scène                                                            */
/* ------------------------------------------------------------------ */

type Groupe = 0 | 1 | 2 | 3 | 'conduites' | 'cotes';

interface Arete {
  /** Une ou plusieurs lignes brisées. Plusieurs : elles forment un seul trait, qui se trace d'un même geste. */
  lignes: V3[][];
  genre: Genre;
  groupe: Groupe;
  /** Que faire des parties cachées : les montrer en pointillé, ou les taire. */
  cachees: 'pointille' | 'omis';
  ferme: boolean;
  fin: boolean;
  /** Un axe ou une cote se dessine par-dessus tout : pas de lignes cachées. */
  libre: boolean;
}

interface Options {
  cachees?: 'pointille' | 'omis';
  ferme?: boolean;
  fin?: boolean;
  libre?: boolean;
}

export function dessinerPlan(): Plan {
  const faces: Face[] = [];
  const aretes: Arete[] = [];

  const arete = (groupe: Groupe, genre: Genre, lignes: V3[][], o: Options = {}) => {
    aretes.push({
      lignes: o.ferme ? lignes.map((l) => [...l, l[0]]) : lignes,
      genre,
      groupe,
      cachees: o.cachees ?? 'omis',
      ferme: o.ferme ?? false,
      fin: o.fin ?? false,
      libre: o.libre ?? false,
    });
  };
  const face = (pts: V3[]) => faces.push(creerFace(pts));

  /* Une boîte : six faces qui cachent, et douze arêtes en quatre gestes
     (la base, les trois montants vus et le quatrième, le dessus). */
  const boite = (g: Groupe, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, o: Options = {}) => {
    const bas: V3[] = [
      [x0, y0, z0],
      [x1, y0, z0],
      [x1, y1, z0],
      [x0, y1, z0],
    ];
    const haut = bas.map(([x, y]): V3 => [x, y, z1]);
    face(bas);
    face(haut);
    for (let i = 0; i < 4; i++) face([bas[i], bas[(i + 1) % 4], haut[(i + 1) % 4], haut[i]]);
    arete(g, 'vu', [bas], { ...o, ferme: true });
    for (let i = 0; i < 4; i++) arete(g, 'vu', [[bas[i], haut[i]]], o);
    arete(g, 'vu', [haut], { ...o, ferme: true });
  };

  /* Un profil dessiné dans le plan (x, z), tiré le long de y. */
  const prisme = (g: Groupe, profil: [number, number][], y0: number, y1: number, o: Options = {}) => {
    const loin = profil.map(([x, z]): V3 => [x, y0, z]);
    const pres = profil.map(([x, z]): V3 => [x, y1, z]);
    const n = profil.length;
    face(loin);
    face(pres);
    for (let i = 0; i < n; i++) face([loin[i], loin[(i + 1) % n], pres[(i + 1) % n], pres[i]]);
    arete(g, 'vu', [loin], { ...o, ferme: true });
    for (let i = 0; i < n; i++) arete(g, 'vu', [[loin[i], pres[i]]], o);
    arete(g, 'vu', [pres], { ...o, ferme: true });
  };

  const TOUR = 48;
  /* Un cercle de rayon r autour de c, dans le plan porté par e1 et e2. */
  const cercle = (c: V3, e1: V3, e2: V3, r: number): V3[] =>
    Array.from({ length: TOUR }, (_, i): V3 => {
      const a = (i / TOUR) * Math.PI * 2;
      const u = Math.cos(a) * r;
      const v = Math.sin(a) * r;
      return [c[0] + u * e1[0] + v * e2[0], c[1] + u * e1[1] + v * e2[1], c[2] + u * e1[2] + v * e2[2]];
    });

  /* Un cylindre couché le long de y. Ses deux génératrices de contour sont là
     où la tangente du cercle, à l'écran, est parallèle à l'axe : en isométrie
     cela tombe à 135° et -45°, quel que soit le rayon. */
  const rouleau = (g: Groupe, cx: number, cz: number, r: number, y0: number, y1: number, o: Options = {}) => {
    const ex: V3 = [1, 0, 0];
    const ez: V3 = [0, 0, 1];
    const loin = cercle([cx, y0, cz], ex, ez, r);
    const pres = cercle([cx, y1, cz], ex, ez, r);
    face(loin);
    face(pres);
    for (let i = 0; i < TOUR; i++) face([loin[i], loin[(i + 1) % TOUR], pres[(i + 1) % TOUR], pres[i]]);
    arete(g, 'vu', [loin], { ...o, ferme: true });
    for (const a of [(3 * Math.PI) / 4, -Math.PI / 4]) {
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      arete(g, 'vu', [[[x, y0, z], [x, y1, z]]], o);
    }
    arete(g, 'vu', [pres], { ...o, ferme: true });
  };

  /* Des hachures à 60° à l'écran sur un polygone convexe, donné dans les
     coordonnées (p, q) de sa face. Une seule pièce : toutes se tracent ensemble. */
  const hachures = (g: Groupe, poly: [number, number][], vers: (p: number, q: number) => V3, pas: number) => {
    const sommes = poly.map(([p, q]) => p + q);
    const lignes: V3[][] = [];
    for (let c = Math.min(...sommes) + pas * 0.6; c < Math.max(...sommes); c += pas) {
      const bouts: V3[] = [];
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i];
        const b = poly[(i + 1) % poly.length];
        const fa = a[0] + a[1] - c;
        const fb = b[0] + b[1] - c;
        if (fa * fb < 0) {
          const t = fa / (fa - fb);
          bouts.push(vers(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t));
        }
      }
      if (bouts.length === 2) lignes.push(bouts);
    }
    arete(g, 'hachure', lignes, { fin: true });
  };

  const rect = (a: V3, b: V3, c: V3, d: V3): V3[] => [a, b, c, d];

  /* --- Les quatre machines, alignées le long de -y : le trajet monte vers la droite. --- */

  const ENTRAXE = 4.3;
  const Y = [1.5, 0.5, -0.5, -1.5].map((k) => k * ENTRAXE);
  /* La face avant (+x) de chaque machine, où se branchent les conduites. */
  const AVANT = [1.1, 1.2, 1.1, 1.1];
  /* Le long de y : où la conduite entre, où elle sort, par rapport au centre. */
  const ENTREE = [0, 0.55, 0.55, 0.83];
  const SORTIE_Y = -0.55;

  /* Une bouche de conduite, au pied de la face avant. */
  const bouche = (g: Groupe, x: number, y: number) =>
    arete(g, 'detail', [[[x, y + 0.2, 0], [x, y + 0.2, 0.2], [x, y - 0.2, 0.2], [x, y - 0.2, 0]]]);

  /* 1. Mail : la boîte de réception. Une fente sur le dessus, une porte à serrure. */
  const fenteMail = rect([-0.75, Y[0] - 0.07, 1.5], [0.75, Y[0] - 0.07, 1.5], [0.75, Y[0] + 0.07, 1.5], [-0.75, Y[0] + 0.07, 1.5]);
  {
    const y = Y[0];
    boite(0, -1.1, y - 0.9, 0, 1.1, y + 0.9, 1.5, { cachees: 'pointille' });
    arete(0, 'detail', [fenteMail], { ferme: true });
    arete(0, 'detail', [rect([1.1, y - 0.62, 0.42], [1.1, y + 0.62, 0.42], [1.1, y + 0.62, 1.24], [1.1, y - 0.62, 1.24])], {
      ferme: true,
    });
    arete(0, 'detail', [cercle([1.1, y - 0.4, 0.83], [0, 1, 0], [0, 0, 1], 0.07)], { ferme: true, fin: true });
    bouche(0, 1.1, y + SORTIE_Y);
    hachures(
      0,
      [
        [0, 0],
        [2.2, 0],
        [2.2, 1.5],
        [0, 1.5],
      ],
      (p, q) => [-1.1 + p, y + 0.9, q],
      0.17,
    );
  }

  /* 2. Bon de commande : le lecteur. Une vitre, la feuille posée dessus, un portique qui la parcourt. */
  const lignesBon: V3[][] = [];
  {
    const y = Y[1];
    boite(1, -1.2, y - 1.05, 0, 1.2, y + 1.05, 0.7, { cachees: 'pointille' });
    arete(1, 'detail', [rect([-0.98, y - 0.9, 0.7], [0.98, y - 0.9, 0.7], [0.98, y + 0.9, 0.7], [-0.98, y + 0.9, 0.7])], {
      ferme: true,
      fin: true,
    });
    arete(1, 'detail', [rect([-0.62, y - 0.8, 0.7], [0.62, y - 0.8, 0.7], [0.62, y + 0.8, 0.7], [-0.62, y + 0.8, 0.7])], {
      ferme: true,
    });
    /* Le contenu du bon : un titre, quatre lignes, un total. */
    lignesBon.push([[-0.46, y + 0.58, 0.7], [0.02, y + 0.58, 0.7]]);
    [0.46, 0.4, 0.46, 0.3].forEach((x1, i) => lignesBon.push([[-0.46, y + 0.3 - i * 0.24, 0.7], [x1, y + 0.3 - i * 0.24, 0.7]]));
    lignesBon.push([[0.08, y - 0.6, 0.7], [0.46, y - 0.6, 0.7]]);
    for (const l of lignesBon) arete(1, 'detail', [l]);
    /* Le pupitre, sur la face avant. */
    arete(1, 'detail', [rect([1.2, y - 0.3, 0.32], [1.2, y + 0.3, 0.32], [1.2, y + 0.3, 0.54], [1.2, y - 0.3, 0.54])], {
      ferme: true,
      fin: true,
    });
    bouche(1, 1.2, y + ENTREE[1]);
    bouche(1, 1.2, y + SORTIE_Y);
    hachures(
      1,
      [
        [0, 0],
        [2.4, 0],
        [2.4, 0.7],
        [0, 0.7],
      ],
      (p, q) => [-1.2 + p, y + 1.05, q],
      0.17,
    );
  }

  /* 3. Commande : un pupitre incliné dont l'écran liste les lignes de la commande. */
  const PENTE: V3 = [-1.45, 0, 0.95];
  const LONG_PENTE = Math.hypot(PENTE[0], PENTE[2]);
  /* Repère de la face inclinée : u file vers -y (la droite à l'écran), v remonte la pente. */
  const ecran = (u: number, v: number): V3 => [
    1.1 + (PENTE[0] / LONG_PENTE) * v,
    Y[2] + 1.0 - u,
    0.5 + (PENTE[2] / LONG_PENTE) * v,
  ];
  const RANGS = [1.3, 1.02, 0.74, 0.46];
  const LARGEURS = [0.98, 0.7, 0.9, 0.56];
  {
    const y = Y[2];
    prisme(
      2,
      [
        [-1.0, 0],
        [1.1, 0],
        [1.1, 0.5],
        [-0.35, 1.45],
        [-1.0, 1.45],
      ],
      y - 1.0,
      y + 1.0,
      { cachees: 'pointille' },
    );
    arete(2, 'detail', [rect(ecran(0.16, 0.16), ecran(1.84, 0.16), ecran(1.84, 1.57), ecran(0.16, 1.57))], { ferme: true });
    RANGS.forEach((v, i) => {
      arete(2, 'detail', [rect(ecran(0.32, v - 0.085), ecran(0.49, v - 0.085), ecran(0.49, v + 0.085), ecran(0.32, v + 0.085))], {
        ferme: true,
        fin: true,
      });
      arete(2, 'detail', [[ecran(0.64, v), ecran(0.64 + LARGEURS[i], v)]]);
    });
    bouche(2, 1.1, y + ENTREE[2]);
    bouche(2, 1.1, y + SORTIE_Y);
    hachures(
      2,
      [
        [0, 0],
        [2.1, 0],
        [2.1, 0.5],
        [0.65, 1.45],
        [0, 1.45],
      ],
      (p, q) => [-1.0 + p, y + 1.0, q],
      0.17,
    );
  }

  /* 4. Facture : l'imprimante. Un rouleau entre deux flasques, une poulie, une fente, un plateau. */
  const FENTE_Z = 0.64;
  const PLATEAU_Z = 0.43;
  const AXE_X = -0.5;
  const AXE_Z = 1.6;
  {
    const y = Y[3];
    boite(3, -1.1, y - 1.15, 0, 1.1, y + 1.15, 1.25, { cachees: 'pointille' });
    boite(3, -0.85, y - 0.84, 1.25, -0.15, y - 0.72, 1.92);
    rouleau(3, AXE_X, AXE_Z, 0.23, y - 0.72, y + 0.72);
    boite(3, -0.85, y + 0.72, 1.25, -0.15, y + 0.84, 1.92);
    rouleau(3, AXE_X, AXE_Z, 0.27, y + 0.84, y + 0.94);
    arete(3, 'axe', [[[AXE_X, y + 1.45, AXE_Z], [AXE_X, y - 1.3, AXE_Z]]], { libre: true, fin: true });
    /* Le bac à papier, gravé sur le dessus. */
    arete(3, 'detail', [rect([0.15, y - 0.8, 1.25], [0.9, y - 0.8, 1.25], [0.9, y + 0.8, 1.25], [0.15, y + 0.8, 1.25])], {
      ferme: true,
      fin: true,
    });
    /* La fente de sortie, puis le plateau, son rebord et sa jambe de force. */
    arete(3, 'detail', [rect([1.1, y - 1.0, 0.6], [1.1, y + 0.44, 0.6], [1.1, y + 0.44, 0.68], [1.1, y - 1.0, 0.68])], {
      ferme: true,
    });
    boite(3, 1.1, y - 1.05, 0.36, 2.95, y + 0.5, PLATEAU_Z);
    boite(3, 2.88, y - 1.05, PLATEAU_Z, 2.95, y + 0.5, 0.56);
    arete(3, 'detail', [[[1.1, y + 0.5, 0.05], [2.0, y + 0.5, 0.36]]]);
    bouche(3, 1.1, y + ENTREE[3]);
    hachures(
      3,
      [
        [0, 0],
        [2.2, 0],
        [2.2, 1.25],
        [0, 1.25],
      ],
      (p, q) => [-1.1 + p, y + 1.15, q],
      0.17,
    );
  }

  /* --- Les conduites : trois agrafes posées au sol, devant les machines. --- */

  const AGRAFE_X = 2.05;
  const DEMI = 0.11;
  const axesConduites: V2[][] = [];
  for (let i = 0; i < 3; i++) {
    const xa = AVANT[i];
    const xb = AVANT[i + 1];
    const ya = Y[i] + SORTIE_Y;
    const yb = Y[i + 1] + ENTREE[i + 1];
    axesConduites.push(
      (
        [
          [xa, ya, 0],
          [AGRAFE_X, ya, 0],
          [AGRAFE_X, yb, 0],
          [xb, yb, 0],
        ] as V3[]
      ).map(projeter),
    );
    arete('conduites', 'cond', [
      [
        [xa, ya + DEMI, 0],
        [AGRAFE_X + DEMI, ya + DEMI, 0],
        [AGRAFE_X + DEMI, yb - DEMI, 0],
        [xb, yb - DEMI, 0],
      ],
      [
        [xa, ya - DEMI, 0],
        [AGRAFE_X - DEMI, ya - DEMI, 0],
        [AGRAFE_X - DEMI, yb + DEMI, 0],
        [xb, yb + DEMI, 0],
      ],
    ]);
  }

  /* --- La cotation : une seule cote, du premier outil au dernier. --- */

  const COTE_X = 3.5;
  arete('cotes', 'cote', [[[1.45, Y[0], 0], [COTE_X + 0.22, Y[0], 0]]], { libre: true });
  arete('cotes', 'cote', [[[3.12, Y[3], 0], [COTE_X + 0.22, Y[3], 0]]], { libre: true });
  arete('cotes', 'cote', [[[COTE_X, Y[0], 0], [COTE_X, Y[3], 0]]], { libre: true });
  for (const [y, sens] of [
    [Y[0], -1],
    [Y[3], 1],
  ] as const) {
    arete(
      'cotes',
      'cote',
      [[[COTE_X - 0.08, y + sens * 0.34, 0], [COTE_X, y, 0], [COTE_X + 0.08, y + sens * 0.34, 0]]],
      { libre: true },
    );
  }
  /* Le trièdre, en bas à gauche : il dit d'où l'on regarde. */
  const TRIEDRE: V2 = [58, 546];
  const BRAS = 0.72;
  const brasTriedre: [string, V2][] = [
    ['x', lin(BRAS, 0, 0)],
    ['y', lin(0, BRAS, 0)],
    ['z', lin(0, 0, BRAS)],
  ];

  /* ---------------------------------------------------------------- */
  /* Des arêtes aux tracés                                             */
  /* ---------------------------------------------------------------- */

  interface Brut {
    d: string;
    genre: Genre;
    mode: 't' | 'f';
    groupe: Groupe;
    l: number;
    pl: number;
    x: number;
    fin: boolean;
  }

  const brut = (pieces: V2[][], genre: Genre, mode: 't' | 'f', groupe: Groupe, fin: boolean): Brut => {
    const longueurs = pieces.map(longueur);
    const total = longueurs.reduce((a, b) => a + b, 0);
    const max = Math.max(...longueurs);
    const xs = pieces.flat().map((p) => p[0]);
    return {
      d: pieces.map(chemin).join(''),
      genre,
      mode,
      groupe,
      l: max,
      /* Plusieurs pièces : le tiret de 1 couvre la plus longue, toutes poussent du même pas. */
      pl: s2(total / max),
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      fin,
    };
  };

  const filaire = (liste: Arete[], masques: readonly Face[]): Brut[] => {
    const sortie: Brut[] = [];
    for (const a of liste) {
      const vus: V2[][] = [];
      const caches: V2[][] = [];
      for (const ligne of a.lignes) {
        if (a.libre) {
          vus.push(ligne.map(projeter));
          continue;
        }
        for (const m of decouper(ligne, masques, a.ferme)) (m.vu ? vus : caches).push(m.pts);
      }
      /* Un trait mixte porte déjà un tiret : il ne peut pas se dérouler, il arrive en fondu. */
      const mode = a.genre === 'axe' ? 'f' : 't';
      if (a.lignes.length > 1) {
        if (vus.length) sortie.push(brut(vus, a.genre, mode, a.groupe, a.fin));
      } else {
        for (const v of vus) sortie.push(brut([v], a.genre, mode, a.groupe, a.fin));
      }
      if (a.cachees === 'pointille') for (const c of caches) sortie.push(brut([c], 'cache', 'f', a.groupe, true));
    }
    return sortie;
  };

  const bruts = filaire(aretes, faces);

  /* Le trièdre ne passe pas par la projection des machines : il est posé à l'écran. */
  for (const [, v] of brasTriedre) {
    const bout: V2 = [TRIEDRE[0] + v[0], TRIEDRE[1] + v[1]];
    bruts.push({ ...brut([[TRIEDRE, bout]], 'cote', 't', 'cotes', true) });
  }

  /* L'effacement balaie la planche de gauche à droite. */
  const xs = bruts.map((b) => b.x);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const effacer = (x: number) => EFFACE + DUREE_EFFACE * Math.min(1, Math.max(0, (x - xMin) / (xMax - xMin)));

  /* La plume va à vitesse constante : chaque trait part quand la longueur
     tracée avant lui est écoulée, et dure selon sa propre longueur. */
  const VITESSE = 520;
  const debutGroupe = (g: Groupe) => (g === 'conduites' ? DEBUT_CONDUITES : g === 'cotes' ? DEBUT_COTES : DEBUT_STATION[g]);
  const dureeGroupe = (g: Groupe) => (g === 'conduites' ? 0.75 : g === 'cotes' ? 0.5 : DUREE_STATION);
  const minuter = (liste: Brut[]): Trait[] => {
    const totaux = new Map<Groupe, number>();
    for (const b of liste) totaux.set(b.groupe, (totaux.get(b.groupe) ?? 0) + b.l);
    const ecoule = new Map<Groupe, number>();
    return liste.map((b) => {
      const avant = ecoule.get(b.groupe) ?? 0;
      ecoule.set(b.groupe, avant + b.l);
      /* Les pointillés viennent en seconde passe, quand la pièce a déjà sa silhouette. */
      const avance = b.genre === 'cache' ? 0.85 : avant / (totaux.get(b.groupe) ?? 1);
      const debut = debutGroupe(b.groupe) + dureeGroupe(b.groupe) * avance;
      const duree = b.mode === 'f' ? 0.35 : Math.min(0.6, Math.max(0.16, b.l / VITESSE));
      return {
        d: b.d,
        genre: b.genre,
        mode: b.mode,
        t: `${s2(debut)},${s2(duree)},${s2(effacer(b.x))}`,
        pl: b.pl,
        fin: b.fin,
      };
    });
  };

  const traits = minuter(bruts);

  /* ---------------------------------------------------------------- */
  /* Les pièces mobiles                                                */
  /* ---------------------------------------------------------------- */

  const mobiles: Mobile[] = [];
  const [P1, P2] = PASSAGES;
  /* L'instant où chaque machine réagit, à chacun des deux passages. */
  const reactions = [
    [P1.pli[1], P2.pli[1]],
    [P1.lecteur[0], P2.lecteur[0]],
    [P1.commande[0], P2.commande[0]],
    [P1.facture[0], P2.facture[0]],
  ];

  /* Quand l'impulsion l'atteint, la machine s'éveille : ses arêtes vues
     passent un instant à la pêche, puis reviennent au blanc du plan. */
  reactions.forEach((instants, g) => {
    const aretesVues = bruts.filter((b) => b.groupe === g && b.genre === 'vu');
    const eclat: Etape[] = [[0, { opacity: 0 }]];
    for (const r of instants) {
      eclat.push([r - 0.05, { opacity: 0 }, SORTIE]);
      eclat.push([r + 0.2, { opacity: 0.9 }, DOUX]);
      eclat.push([r + 1.1, { opacity: 0 }]);
    }
    mobiles.push({ d: aretesVues.map((b) => b.d).join(''), classe: 'peche eclat', piste: piste(eclat) });
  });

  /** Une pièce pêche qui apparaît à un instant donné et reste jusqu'à l'effacement. */
  const allumer = (quand: number, x: number, monte = 0.18): string => {
    const fin = effacer(x);
    return piste([
      [0, { opacity: 0 }],
      [quand, { opacity: 0 }],
      [quand + monte, { opacity: 1 }],
      [fin, { opacity: 1 }],
      [fin + RETRAIT, { opacity: 0 }],
    ]);
  };

  /** Un trait pêche qui s'écrit, s'efface d'un coup et se réécrit plus vite au second passage. */
  const ecrire = (a: [number, number], b: [number, number] | null, x: number): string => {
    const fin = effacer(x);
    const etapes: Etape[] = [
      [0, { strokeDashoffset: 1, opacity: 0 }],
      [a[0], { strokeDashoffset: 1, opacity: 0 }],
      [a[0], { strokeDashoffset: 1, opacity: 1 }, DOUX],
      [a[1], { strokeDashoffset: 0, opacity: 1 }],
    ];
    if (b) {
      etapes.push([b[0], { strokeDashoffset: 0, opacity: 1 }]);
      etapes.push([b[0], { strokeDashoffset: 1, opacity: 1 }, DOUX]);
      etapes.push([b[1], { strokeDashoffset: 0, opacity: 1 }]);
    }
    etapes.push([fin, { strokeDashoffset: 0, opacity: 1 }]);
    etapes.push([fin + RETRAIT, { strokeDashoffset: 0, opacity: 0 }]);
    return piste(etapes);
  };

  /* Les conduites : l'impulsion court sur l'axe, et la conduite rosit derrière elle. */
  const GRAIN = 0.16;
  axesConduites.forEach((axe, i) => {
    const a = P1.conduites[i];
    const b = P2.conduites[i];
    const bords = aretes.filter((x) => x.genre === 'cond')[i].lignes.map((l) => l.map(projeter));
    const ref = brut(bords, 'cond', 't', 'conduites', false);
    mobiles.push({ d: ref.d, classe: 'peche ecrit cond-peche', pl: ref.pl, piste: ecrire(a, null, ref.x) });
    const course: Etape[] = [[0, { strokeDashoffset: GRAIN, opacity: 0 }]];
    for (const [t0, t1] of [a, b]) {
      course.push([t0, { strokeDashoffset: GRAIN, opacity: 0 }]);
      course.push([t0, { strokeDashoffset: GRAIN, opacity: 1 }, DOUX]);
      course.push([t1, { strokeDashoffset: -1, opacity: 1 }]);
      course.push([t1, { strokeDashoffset: -1, opacity: 0 }]);
    }
    mobiles.push({ d: chemin(axe), classe: 'impulsion impulsion--halo', pl: 1, piste: piste(course) });
    mobiles.push({ d: chemin(axe), classe: 'impulsion', pl: 1, piste: piste(course) });
  });

  /* 1. Le pli : une enveloppe debout au-dessus de la fente, qui y tombe. */
  const PLI_BAS = 2.5;
  const PLI_HAUT = PLI_BAS + 0.85;
  const coinsPli: V3[] = [
    [-0.65, Y[0], PLI_BAS],
    [0.65, Y[0], PLI_BAS],
    [0.65, Y[0], PLI_HAUT],
    [-0.65, Y[0], PLI_HAUT],
  ];
  const contourPli = [...coinsPli, coinsPli[0]].map(projeter);
  const rabatPli = ([coinsPli[3], [0, Y[0], PLI_HAUT - 0.44], coinsPli[2]] as V3[]).map(projeter);
  const chutePli = lin(0, 0, -(PLI_HAUT - 1.5 + 0.1));
  const centrePli = projeter([0, Y[0], PLI_BAS])[0];
  const brutPli = brut([contourPli, rabatPli], 'vu', 't', 0, false);
  const pli: Plan['pli'] = {
    /* Tout ce qui passe sous la fente disparaît : la découpe s'arrête au ras du dessus de la boîte. */
    coupe: (
      [
        [-0.78, Y[0], 1.5],
        [0.78, Y[0], 1.5],
        [0.78, Y[0], 4.4],
        [-0.78, Y[0], 4.4],
      ] as V3[]
    )
      .map(projeter)
      .map(([x, y]) => `${n1(x)},${n1(y)}`)
      .join(' '),
    contour: {
      d: brutPli.d,
      genre: 'vu',
      mode: 't',
      t: `${s2(DEBUT_STATION[0] + DUREE_STATION)},0.4,${s2(effacer(centrePli))}`,
      pl: brutPli.pl,
      fin: false,
    },
    aplat: chemin(contourPli) + 'Z',
    rabat: chemin(rabatPli),
    pisteAccent: allumer(MARCHE, centrePli),
    piste: piste([
      [0, { transform: px([0, 0]), opacity: 1 }],
      [P1.pli[0], { transform: px([0, 0]), opacity: 1 }, CHUTE],
      [P1.pli[1], { transform: px(chutePli), opacity: 1 }],
      [P1.pli[1] + 0.02, { transform: px(chutePli), opacity: 0 }],
      [P1.pli[1] + 0.04, { transform: px([0, -16]), opacity: 0 }],
      [RAPIDE, { transform: px([0, -16]), opacity: 0 }, SORTIE],
      [P2.pli[0], { transform: px([0, 0]), opacity: 1 }, CHUTE],
      [P2.pli[1], { transform: px(chutePli), opacity: 1 }],
      [P2.pli[1] + 0.02, { transform: px(chutePli), opacity: 0 }],
      [DUREE - 0.2, { transform: px([0, 0]), opacity: 0 }],
    ]),
  };
  /* La fente s'allume quand le pli y passe. */
  mobiles.push({
    d: chemin([...fenteMail, fenteMail[0]].map(projeter)),
    classe: 'peche',
    piste: piste([
      [0, { opacity: 0 }],
      [P1.pli[0] + 0.25, { opacity: 0 }],
      [P1.pli[1], { opacity: 1 }],
      [P1.pli[1] + 0.6, { opacity: 0 }],
      [P2.pli[0] + 0.1, { opacity: 0 }],
      [P2.pli[1], { opacity: 1 }],
      [P2.pli[1] + 0.5, { opacity: 0 }],
    ]),
  });

  /* 2. Le portique du lecteur parcourt la feuille, et les lignes lues passent à la pêche. */
  const PORTIQUE_Y = Y[1] + 0.78;
  const COURSE = 1.56;
  const facesPortique: Face[] = [];
  const aretesPortique: Arete[] = [];
  {
    const pieces: [number, number, number, number][] = [
      [-1.2, 0.7, -1.04, 0.98],
      [1.04, 0.7, 1.2, 0.98],
      [-1.2, 0.98, 1.2, 1.16],
    ];
    for (const [x0, z0, x1, z1] of pieces) {
      const bas: V3[] = [
        [x0, PORTIQUE_Y - 0.11, z0],
        [x1, PORTIQUE_Y - 0.11, z0],
        [x1, PORTIQUE_Y + 0.11, z0],
        [x0, PORTIQUE_Y + 0.11, z0],
      ];
      const haut = bas.map(([x, y]): V3 => [x, y, z1]);
      facesPortique.push(creerFace(bas), creerFace(haut));
      for (let i = 0; i < 4; i++) facesPortique.push(creerFace([bas[i], bas[(i + 1) % 4], haut[(i + 1) % 4], haut[i]]));
      const commun = { genre: 'vu' as Genre, groupe: 1 as Groupe, cachees: 'omis' as const, fin: false, libre: false };
      aretesPortique.push({ ...commun, lignes: [[...bas, bas[0]]], ferme: true });
      for (let i = 0; i < 4; i++) aretesPortique.push({ ...commun, lignes: [[bas[i], haut[i]]], ferme: false });
      aretesPortique.push({ ...commun, lignes: [[...haut, haut[0]]], ferme: true });
    }
  }
  const allerPortique = lin(0, -COURSE, 0);
  const lumiere = ([[-0.62, PORTIQUE_Y, 0.7], [0.62, PORTIQUE_Y, 0.7]] as V3[]).map(projeter);
  const xLecteur = projeter([0, Y[1], 0])[0];
  const portique: Plan['portique'] = {
    traits: minuter(filaire(aretesPortique, facesPortique)).map((t) => {
      /* Le portique se trace après le socle qui le porte. */
      const [, duree, fin] = t.t.split(',');
      return { ...t, t: `${s2(DEBUT_STATION[1] + DUREE_STATION * 0.8)},${duree},${fin}` };
    }),
    piste: piste([
      [0, { transform: px([0, 0]) }],
      [P1.lecteur[0], { transform: px([0, 0]) }, DOUX],
      [P1.lecteur[1], { transform: px(allerPortique) }],
      [P2.lecteur[0], { transform: px(allerPortique) }, DOUX],
      [P2.lecteur[1], { transform: px([0, 0]) }],
    ]),
    lumiere: {
      d: chemin(lumiere),
      classe: 'peche lumiere',
      piste: piste([
        [0, { opacity: 0 }],
        [P1.lecteur[0], { opacity: 0 }],
        [P1.lecteur[0] + 0.08, { opacity: 1 }],
        [P1.lecteur[1] - 0.05, { opacity: 1 }],
        [P1.lecteur[1] + 0.12, { opacity: 0 }],
        [P2.lecteur[0], { opacity: 0 }],
        [P2.lecteur[0] + 0.06, { opacity: 1 }],
        [P2.lecteur[1] - 0.04, { opacity: 1 }],
        [P2.lecteur[1] + 0.1, { opacity: 0 }],
      ]),
    },
  };
  for (const l of lignesBon) {
    /* Chaque ligne s'allume à l'instant où le portique passe au-dessus d'elle. */
    const part = Math.min(1, Math.max(0, (PORTIQUE_Y - l[0][1]) / COURSE));
    const quand = P1.lecteur[0] + (P1.lecteur[1] - P1.lecteur[0]) * part;
    mobiles.push({ d: chemin(l.map(projeter)), classe: 'peche ecrit', pl: 1, piste: ecrire([quand, quand + 0.16], null, xLecteur) });
  }

  /* 3. Les lignes de la commande s'écrivent seules, chacune suivie de sa coche. */
  const xCommande = projeter([0, Y[2], 0])[0];
  RANGS.forEach((v, i) => {
    const a = P1.commande[0] + i * 0.13;
    const b = P2.commande[0] + i * 0.06;
    mobiles.push({
      d: chemin([ecran(0.64, v), ecran(0.64 + LARGEURS[i], v)].map(projeter)),
      classe: 'peche ecrit',
      pl: 1,
      piste: ecrire([a, a + 0.22], [b, b + 0.14], xCommande),
    });
    mobiles.push({
      d: chemin([ecran(0.345, v + 0.005), ecran(0.395, v - 0.05), ecran(0.475, v + 0.07)].map(projeter)),
      classe: 'peche ecrit coche',
      pl: 1,
      piste: ecrire([a + 0.18, a + 0.32], [b + 0.1, b + 0.2], xCommande),
    });
  });

  /* 4. La poulie tourne, et une feuille pêche sort par la fente puis se pose sur le plateau. */
  const yF = Y[3];
  const centrePoulie = projeter([AXE_X, yF + 0.94, AXE_Z]);
  const R_RAYON = 0.2;
  const rayonU = lin(R_RAYON, 0, 0);
  const rayonV = lin(0, 0, R_RAYON);
  const xFacture = projeter([1.8, yF, 0])[0];
  const rayons: Plan['rayons'] = {
    /* Le cercle unité devient l'ellipse de la poulie : une rotation dans ce
       repère est une vraie rotation dans le plan de la roue. */
    matrice: `matrix(${[rayonU[0], rayonU[1], rayonV[0], rayonV[1], centrePoulie[0], centrePoulie[1]].map((v) => s2(v)).join(' ')})`,
    t: `${s2(DEBUT_STATION[3] + DUREE_STATION)},0.3,${s2(effacer(centrePoulie[0]))}`,
    bouts: [0, 1, 2].map((k) => ({ x: s2(Math.cos((k * 2 * Math.PI) / 3)), y: s2(Math.sin((k * 2 * Math.PI) / 3)) })),
    /* Trois rayons : la roue est identique à elle-même tous les 120°, le raccord de boucle ne se voit pas. */
    piste: piste([
      [0, { transform: 'rotate(0deg)' }],
      [P1.facture[0], { transform: 'rotate(0deg)' }, DOUX],
      [P1.facture[1], { transform: 'rotate(480deg)' }],
      [P2.facture[0], { transform: 'rotate(480deg)' }, DOUX],
      [P2.facture[1], { transform: 'rotate(840deg)' }],
    ]),
  };

  const GLISSE = 1.66;
  const feuilles: Plan['feuilles'] = [0, 1].map((k) => {
    /* La seconde feuille se pose un rien de travers sur la première. */
    const dx = k * 0.06;
    const dy = k * -0.07;
    const z = PLATEAU_Z + 0.012 + k * 0.035;
    /* La feuille s'arrête avant le rebord du plateau : elle ne passe jamais derrière lui. */
    const coins: V3[] = [
      [1.2 + dx, yF - 0.92 + dy, z],
      [2.7 + dx, yF - 0.92 + dy, z],
      [2.7 + dx, yF + 0.36 + dy, z],
      [1.2 + dx, yF + 0.36 + dy, z],
    ];
    const ligne = (x: number, y0: number, y1: number): V3[] => [
      [x + dx, yF + y0 + dy, z],
      [x + dx, yF + y1 + dy, z],
    ];
    const encre = [
      ligne(2.48, 0.2, -0.22),
      ligne(2.2, 0.2, -0.76),
      ligne(1.99, 0.2, -0.5),
      ligne(1.78, 0.2, -0.76),
      ligne(1.57, 0.2, -0.4),
      ligne(1.36, -0.4, -0.76),
    ];
    const p = k === 0 ? P1.facture : P2.facture;
    const sortie = p[0] + (p[1] - p[0]) * 0.72;
    const dedans = lin(-GLISSE, 0, FENTE_Z - z);
    const dehors = lin(0, 0, FENTE_Z - z);
    const fin = effacer(xFacture);
    return {
      coupe: (
        [
          /* Le contour réunit la feuille à hauteur de fente et la feuille posée :
             ce qui est encore dans la machine reste hors de la découpe. */
          [1.1, yF - 1.02, FENTE_Z + 0.02],
          [3.3, yF - 1.02, FENTE_Z + 0.02],
          [3.3, yF - 1.02, PLATEAU_Z],
          [3.3, yF + 0.46, PLATEAU_Z],
          [1.1, yF + 0.46, PLATEAU_Z],
          [1.1, yF + 0.46, FENTE_Z + 0.02],
        ] as V3[]
      )
        .map(projeter)
        .map(([x, y]) => `${n1(x)},${n1(y)}`)
        .join(' '),
      aplat: chemin(coins.map(projeter)) + 'Z',
      encre: encre.map((l) => chemin(l.map(projeter))).join(''),
      pisteGlisse: piste([
        [0, { transform: px(dedans) }],
        [p[0], { transform: px(dedans) }, SORTIE],
        [sortie, { transform: px(dehors) }, DOUX],
        [p[1], { transform: px([0, 0]) }],
        [fin + RETRAIT, { transform: px([0, 0]) }],
        [fin + RETRAIT + 0.02, { transform: px(dedans) }],
      ]),
      pisteVue: piste([
        [0, { opacity: 0 }],
        [p[0], { opacity: 0 }],
        [p[0] + 0.02, { opacity: 1 }],
        [fin, { opacity: 1 }],
        [fin + RETRAIT, { opacity: 0 }],
      ]),
    };
  });
  /* La fente de sortie s'allume pendant l'impression. */
  const fenteSortie = ([
    [1.1, yF - 1.0, 0.6],
    [1.1, yF + 0.44, 0.6],
    [1.1, yF + 0.44, 0.68],
    [1.1, yF - 1.0, 0.68],
    [1.1, yF - 1.0, 0.6],
  ] as V3[]).map(projeter);
  mobiles.push({
    d: chemin(fenteSortie),
    classe: 'peche',
    piste: piste([
      [0, { opacity: 0 }],
      [P1.facture[0] - 0.1, { opacity: 0 }],
      [P1.facture[0] + 0.1, { opacity: 1 }],
      [P1.facture[1], { opacity: 1 }],
      [P1.facture[1] + 0.4, { opacity: 0 }],
      [P2.facture[0] - 0.1, { opacity: 0 }],
      [P2.facture[0] + 0.1, { opacity: 1 }],
      [P2.facture[1], { opacity: 1 }],
      [P2.facture[1] + 0.4, { opacity: 0 }],
    ]),
  });

  /* ---------------------------------------------------------------- */
  /* Les repères : le numéro porte une information, l'ordre du trajet. */
  /* ---------------------------------------------------------------- */

  const RAYON_REPERE = 11;
  const definitions: { nom: string; legende: string; vise: V3; decalage: V2 }[] = [
    { nom: 'Mail', legende: 'reçu', vise: [-0.75, Y[0] + 0.9, 1.5], decalage: [-40, -58] },
    { nom: 'Bon de commande', legende: 'lu', vise: [-1.2, Y[1] + 0.45, 0.7], decalage: [-30, -66] },
    { nom: 'Commande', legende: 'créée', vise: [-1.0, Y[2] + 0.55, 1.45], decalage: [-32, -60] },
    { nom: 'Facture', legende: 'émise', vise: [-1.1, Y[3] + 0.75, 1.25], decalage: [-42, -60] },
  ];
  const reperes: Repere[] = definitions.map((def, i) => {
    const vise = projeter(def.vise);
    const centre: V2 = [vise[0] + def.decalage[0], vise[1] + def.decalage[1]];
    const l = Math.hypot(def.decalage[0], def.decalage[1]);
    /* Le renvoi part du bord du cercle, pas de son centre. */
    const depart: V2 = [centre[0] - (def.decalage[0] / l) * RAYON_REPERE, centre[1] - (def.decalage[1] / l) * RAYON_REPERE];
    const debut = DEBUT_STATION[i] + DUREE_STATION * 0.9;
    const fin = effacer(centre[0]);
    const [r1, r2] = reactions[i];
    const onde: Etape[] = [[0, { transform: 'scale(1)', opacity: 0 }]];
    for (const r of [r1, r2]) {
      onde.push([r, { transform: 'scale(1)', opacity: 0 }]);
      onde.push([r, { transform: 'scale(1)', opacity: 0.8 }, SORTIE]);
      onde.push([r + 0.7, { transform: 'scale(2.3)', opacity: 0 }]);
      onde.push([r + 0.72, { transform: 'scale(1)', opacity: 0 }]);
    }
    return {
      n: i + 1,
      nom: def.nom,
      legende: def.legende,
      cx: s2(centre[0]),
      cy: s2(centre[1]),
      px: s2(vise[0]),
      py: s2(vise[1]),
      renvoi: {
        d: chemin([vise, depart]),
        genre: 'cote',
        mode: 't',
        t: `${s2(debut)},0.22,${s2(fin)}`,
        pl: 1,
        fin: false,
      },
      tCercle: `${s2(debut + 0.18)},0.3,${s2(fin)}`,
      tTexte: `${s2(debut + 0.3)},0.3,${s2(fin)}`,
      pisteAccent: allumer(r1, centre[0]),
      pisteOnde: piste(onde),
      pisteLegende: allumer(r1 + 0.25, centre[0], 0.3),
    };
  });

  /* Le texte de la cote est couché sur le sol, le long du trajet : sa ligne de
     base suit -y, et ses hampes pointent vers -x. */
  const ancreCote = projeter([COTE_X - 0.16, (Y[0] + Y[3]) / 2, 0]);
  const cote: Plan['cote'] = {
    matrice: `matrix(${[C30, -0.5, C30, 0.5, ancreCote[0], ancreCote[1]].map((v) => s2(v)).join(' ')})`,
    t: `${s2(DEBUT_COTES + 0.4)},0.35,${s2(effacer(ancreCote[0]))}`,
  };

  const triedre: Plan['triedre'] = brasTriedre.map(([lettre, v]) => ({
    lettre,
    x: s2(TRIEDRE[0] + v[0] * 1.32),
    y: s2(TRIEDRE[1] + v[1] * 1.32),
    t: `${s2(DEBUT_COTES + 0.3)},0.3,${s2(effacer(TRIEDRE[0]))}`,
  }));

  /* ---------------------------------------------------------------- */
  /* Le papier : une trame isométrique, sur toute la planche.          */
  /* ---------------------------------------------------------------- */

  const grille: string[] = [];
  for (let k = -16; k <= 16; k++) {
    grille.push(chemin([projeter([-20, k, 0]), projeter([20, k, 0])]));
    grille.push(chemin([projeter([k, -20, 0]), projeter([k, 20, 0])]));
  }

  return {
    duree: DUREE,
    grille: grille.join(''),
    traits,
    mobiles,
    reperes,
    cote,
    triedre,
    pli,
    portique,
    rayons,
    feuilles,
  };
}
