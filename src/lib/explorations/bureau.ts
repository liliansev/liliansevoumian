/*
 * bureau.ts — proposition A, « Le bureau ».
 *
 * Le métier Automatisation raconté par une maquette d'open space vue de
 * dessus, en argile mate, sous une lampe chaude. Trois postes en enfilade,
 * de gauche à droite : le courrier (où tombent les bons de commande), la
 * boutique (la commande), la facturation (la facture).
 *
 * La boucle dure quatorze secondes et tient en deux temps :
 *
 *   à la main  une figurine à casquette fait la navette, une feuille dans les
 *              mains : elle la prend au courrier, s'assoit à la boutique et
 *              la recopie, la porte à la facturation où sa collègue la
 *              recopie encore, puis revient en courant. Pendant ce temps la
 *              pile de courrier monte plus vite qu'elle ne descend ;
 *   relié      un conduit s'allume au sol d'un poste à l'autre, les feuilles
 *              sautent du bac et glissent seules, les écrans valident à la
 *              chaîne, la pile fond. La navette va prendre un café, la
 *              collègue fait pivoter sa chaise vers la salle et s'y renverse.
 *
 * Tout est une fonction pure du temps : aucune simulation, aucun état gardé
 * d'une image à l'autre. Le raccord de la boucle est donc exact, et l'image
 * fixe du mouvement réduit n'est qu'un instant choisi de la même fonction.
 *
 * Three.js n'est chargé qu'à la demande (import différé depuis le composant).
 * Le rendu s'arrête hors écran et dans un onglet masqué.
 */
import {
  AdditiveBlending,
  type BufferGeometry,
  CanvasTexture,
  CapsuleGeometry,
  Color,
  CylinderGeometry,
  Group,
  HemisphereLight,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  Object3D,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  PointLight,
  Quaternion,
  RepeatWrapping,
  RingGeometry,
  Scene,
  SphereGeometry,
  SpotLight,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  type Texture,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/* ── Le temps ── */

/** Durée de la boucle, en secondes. */
const T = 14;
/** La boucle s'ouvre sur la fin du premier temps : la navette revient en
    courant vers une pile déjà haute, et le conduit s'allume deux secondes
    plus tard. Le contraste est à l'écran avant que le visiteur ne décroche. */
const OUVERTURE = 4.3;
/** L'instant montré en mouvement réduit : tout est relié, les feuilles sont
    en route, la navette a son café. */
const INSTANT_FIXE = 10.3;
/** Le conduit se trace de gauche à droite, puis s'éteint d'un bloc. */
const ALLUMAGE: readonly [number, number] = [6.6, 7.3];
const EXTINCTION: readonly [number, number] = [12.5, 12.9];

type Aise = (t: number) => number;
const TOUR = Math.PI * 2;
const borne = (t: number) => Math.min(1, Math.max(0, t));
const pas = (t: number, a: number, b: number) => borne((t - a) / (b - a));
const doux: Aise = (t) => t * t * (3 - 2 * t);
const adoucir: Aise = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const sortie: Aise = (t) => 1 - Math.pow(1 - t, 3);
const rebond: Aise = (t) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const melange = (a: number, b: number, t: number) => a + (b - a) * t;
/** Monte de a à b, tient, redescend de c à d. */
const palier = (t: number, a: number, b: number, c: number, d: number) => doux(pas(t, a, b)) * (1 - doux(pas(t, c, d)));
/** Une bosse : 0, puis 1 au milieu, puis 0. */
const bosse = (t: number, debut: number, fin: number) => (t > debut && t < fin ? Math.sin(pas(t, debut, fin) * Math.PI) : 0);
/** Le temps écoulé depuis un événement, en tenant compte du raccord. */
const depuis = (t: number, evenement: number) => (((t - evenement) % T) + T) % T;

type Cle = readonly [temps: number, valeur: number];
/** Une piste de clés : la valeur à l'instant t, adoucie entre deux clés. */
const piste =
  (cles: readonly Cle[], aise: Aise = doux) =>
  (t: number) => {
    if (t <= cles[0][0]) return cles[0][1];
    for (let i = 1; i < cles.length; i++) {
      if (t <= cles[i][0]) {
        const [t0, v0] = cles[i - 1];
        const [t1, v1] = cles[i];
        return melange(v0, v1, aise(pas(t, t0, t1)));
      }
    }
    return cles[cles.length - 1][1];
  };

/* ── Le plan de la maquette ── */

const X_COURRIER = -3.15;
const X_BOUTIQUE = 0;
const X_FACTURE = 3.1;
/** Dessus des bureaux. */
const PLATEAU = 0.66;
/** Le conduit : une ligne droite au sol, qui passe sous les bureaux. */
const Z_CONDUIT = 0.04;
const X_CONDUIT_DEBUT = X_COURRIER + 1.3;
const X_CONDUIT_FIN = X_FACTURE - 0.6;
const LONGUEUR_CONDUIT = X_CONDUIT_FIN - X_CONDUIT_DEBUT;
/** Vitesse d'une feuille sur le conduit, et durée de son saut depuis le bac. */
const VITESSE = 3;
const SAUT_FEUILLE = 0.36;
const EPAISSEUR = 0.055;
/** Le bac à courrier, et l'endroit où une feuille repose sur chaque bureau. */
const BAC = { x: X_COURRIER + 0.28, y: PLATEAU + 0.05, z: 0.12 };
const POSE_BOUTIQUE = new Vector3(X_BOUTIQUE - 0.5, PLATEAU + 0.03, 0.12);
const POSE_FACTURE = new Vector3(X_FACTURE - 0.6, PLATEAU + 0.03, 0.12);
/** Les sièges. */
const TABOURET: readonly [number, number] = [X_BOUTIQUE + 0.1, 0.82];
const CHAISE: readonly [number, number] = [X_FACTURE + 0.25, 0.82];
const ASSISE = 0.47;
/** Les figurines sont un peu plus grandes que le mobilier ne le voudrait. */
const TAILLE = 1.12;
/** Où la navette se tient. */
const DEVANT_COURRIER: readonly [number, number] = [X_COURRIER + 0.28, 1.02];
const DEVANT_FACTURE: readonly [number, number] = [X_FACTURE - 1.1, 0.98];
const COIN_CAFE: readonly [number, number] = [-0.5, 3.35];
const TABLE_CAFE: readonly [number, number] = [-1.2, 3.6];

/* ── La chorégraphie de la navette ── */

interface Trajet {
  de: number;
  a: number;
  points: readonly (readonly [number, number])[];
  /** Un bond d'un point à l'autre, sans pas. */
  bond?: number;
}

const TRAJETS: readonly Trajet[] = [
  { de: 0.5, a: 1.55, points: [DEVANT_COURRIER, [-0.5, 1.3]] },
  { de: 1.55, a: 1.85, points: [[-0.5, 1.3], TABOURET], bond: 0.26 },
  { de: 3.05, a: 3.3, points: [TABOURET, [0.72, 1.3]], bond: 0.2 },
  { de: 3.3, a: 3.9, points: [[0.72, 1.3], DEVANT_FACTURE] },
  /* Le retour : une courbe qui contourne le tabouret par l'avant. */
  { de: 4.5, a: 6.2, points: [DEVANT_FACTURE, [0.2, 2.25], DEVANT_COURRIER] },
  { de: 8.3, a: 9.7, points: [DEVANT_COURRIER, COIN_CAFE] },
  { de: 12.55, a: 13.72, points: [COIN_CAFE, DEVANT_COURRIER] },
];

const longueurDe = (trajet: Trajet) => {
  let total = 0;
  for (let i = 1; i < trajet.points.length; i++) {
    total += Math.hypot(trajet.points[i][0] - trajet.points[i - 1][0], trajet.points[i][1] - trajet.points[i - 1][1]);
  }
  /* Une courbe à trois points est un peu plus courte que sa ligne brisée. */
  return trajet.points.length === 3 ? total * 0.94 : total;
};
const LONGUEURS = TRAJETS.map(longueurDe);

const pointSur = (trajet: Trajet, f: number): [number, number] => {
  const p = trajet.points;
  if (p.length === 3) {
    const u = 1 - f;
    return [u * u * p[0][0] + 2 * u * f * p[1][0] + f * f * p[2][0], u * u * p[0][1] + 2 * u * f * p[1][1] + f * f * p[2][1]];
  }
  return [melange(p[0][0], p[1][0], f), melange(p[0][1], p[1][1], f)];
};

/** Où est la navette, combien elle a marché, et à quelle hauteur elle bondit. */
const lieuNavette = (t: number) => {
  let x = TRAJETS[0].points[0][0];
  let z = TRAJETS[0].points[0][1];
  let parcouru = 0;
  let bond = 0;
  let etire = 0;
  TRAJETS.forEach((trajet, i) => {
    if (t < trajet.de) return;
    const f = pas(t, trajet.de, trajet.a);
    const fin = trajet.points[trajet.points.length - 1];
    if (f >= 1) {
      [x, z] = fin;
      if (!trajet.bond) parcouru += LONGUEURS[i];
      return;
    }
    if (trajet.bond) {
      [x, z] = pointSur(trajet, doux(f));
      bond = Math.sin(f * Math.PI) * trajet.bond;
      etire = Math.sin(f * Math.PI);
    } else {
      const avance = adoucir(f);
      [x, z] = pointSur(trajet, avance);
      parcouru += avance * LONGUEURS[i];
    }
  });
  return { x, z, parcouru, bond, etire };
};

const PI = Math.PI;
/** Le cap : 0 regarde vers la caméra, π/2 vers la droite, π vers le fond. */
const capNavette = piste([
  [0, PI],
  [0.3, PI],
  [0.52, PI / 2],
  [1.55, PI / 2],
  [1.85, PI],
  [3.05, PI],
  [3.3, 1.8],
  [3.9, 1.8],
  [4.08, 2.61],
  [4.3, 2.61],
  [4.64, 5.3],
  [6.1, 4.34],
  [6.38, PI],
  [6.72, PI],
  [7.05, 2.2],
  [8.25, 2.2],
  [8.5, 0.79],
  [9.7, 0.79],
  [10.02, 1.95],
  [12.4, 1.95],
  [12.62, 3.94],
  [13.7, 3.94],
  [13.92, PI],
  [T, PI],
]);
/** La tête : elle lit la feuille, puis l'écran, ligne après ligne ; plus tard
    elle suit la lumière, toujours un temps avant le corps. */
const lacetNavette = piste([
  [0, 0],
  [1.85, 0],
  [1.96, 0.8],
  [2.08, 0.8],
  [2.2, 0],
  [2.3, 0],
  [2.4, 0.8],
  [2.48, 0.8],
  [2.6, 0],
  [2.64, 0],
  [2.72, 0.8],
  [2.78, 0.8],
  [2.9, 0],
  [6.6, 0],
  [6.85, -0.75],
  [7.3, -0.35],
  [8.15, -0.6],
  [8.45, 0],
  [9.95, 0],
  [10.1, 0.25],
  [11.1, -0.25],
  [12.2, 0.2],
  [12.5, 0],
  [T, 0],
]);
/** Les trois lignes recopiées à la boutique, puis à la facturation. */
const LIGNES_BOUTIQUE = [2.18, 2.48, 2.76] as const;
const VALIDE_BOUTIQUE = 2.98;
const LIGNES_FACTURE = [4.85, 5.2, 5.55] as const;
const VALIDE_FACTURE = 5.9;

/* ── Le courrier : qui arrive, qui part, et comment ── */

interface FeuilleCourrier {
  /** Instants déroulés : la fenêtre commence un peu avant le raccord. */
  arrivee: number;
  depart: number;
  mode: 'portee' | 'conduit';
  rang: number;
}

/** Début de la fenêtre déroulée : la pile est vide, la première feuille du
    tour suivant n'a pas encore commencé à tomber. */
const FENETRE = 12.6;
const CHUTE = 0.42;
const derouler = (t: number) => (t < FENETRE ? t + T : t);

const ARRIVEES_MAIN = [0.6, 1.35, 2.1, 2.85, 3.6, 4.35, 5.1, 5.85];
const LANCEMENTS = Array.from({ length: 9 }, (_, k) => 7.3 + k * 0.25);

/** La pile se vide par le dessus : on rejoue les événements une fois, au
    montage, pour savoir quelle feuille part quand, et à quel rang elle a
    reposé. Rien de tout cela n'est recalculé pendant la boucle. */
const planCourrier = (): FeuilleCourrier[] => {
  type Evenement = { quand: number; quoi: 'arrive' | 'prend' | 'lance' };
  const evenements: Evenement[] = [
    { quand: 13.1, quoi: 'arrive' },
    { quand: 13.7, quoi: 'arrive' },
    { quand: T + 0.05, quoi: 'prend' },
    ...ARRIVEES_MAIN.map((a): Evenement => ({ quand: T + a, quoi: 'arrive' })),
    ...LANCEMENTS.map((l): Evenement => ({ quand: T + l, quoi: 'lance' })),
    /* Une dernière arrive quand tout est relié : elle repart aussitôt. */
    { quand: T + 9.9, quoi: 'arrive' },
    { quand: T + 10.2, quoi: 'lance' },
  ];
  evenements.sort((a, b) => a.quand - b.quand);
  const feuilles: FeuilleCourrier[] = [];
  const pile: FeuilleCourrier[] = [];
  for (const e of evenements) {
    if (e.quoi === 'arrive') {
      const feuille: FeuilleCourrier = { arrivee: e.quand, depart: Infinity, mode: 'conduit', rang: pile.length };
      pile.push(feuille);
      feuilles.push(feuille);
    } else {
      const feuille = pile.pop();
      if (!feuille) continue;
      feuille.depart = e.quand;
      feuille.mode = e.quoi === 'prend' ? 'portee' : 'conduit';
    }
  }
  return feuilles;
};

/* ── Les dessins à plat : écrans, coche, papier, halo ── */

/* À la main, les trois lignes se remplissent une à une (l1, l2, l3) puis
   l'écran valide (ok). Relié, les mêmes lignes se remplissent en un éclair à
   chaque feuille qui passe (r0, r1, r2, relie) : le même travail, sans personne. */
type EtatEcran = 'vide' | 'l1' | 'l2' | 'l3' | 'ok' | 'r0' | 'r1' | 'r2' | 'relie';
const ETATS_ECRAN: readonly EtatEcran[] = ['vide', 'l1', 'l2', 'l3', 'ok', 'r0', 'r1', 'r2', 'relie'];

const toileDe = (large: number, haut: number) => {
  const toile = document.createElement('canvas');
  toile.width = large;
  toile.height = haut;
  const pinceau = toile.getContext('2d');
  if (!pinceau) throw new Error('bureau : dessin 2D indisponible');
  return { toile, pinceau };
};

const arrondi = (p: CanvasRenderingContext2D, x: number, y: number, l: number, h: number, r: number) => {
  p.beginPath();
  p.roundRect(x, y, l, h, r);
};

/** Un écran : un pictogramme à gauche, trois lignes à remplir à droite. */
const dessinerEcran = (genre: 'panier' | 'facture', etat: EtatEcran, peche: string, nuit: string) => {
  const { toile, pinceau: p } = toileDe(320, 204);
  if (etat === 'ok') {
    p.fillStyle = peche;
    p.fillRect(0, 0, 320, 204);
    p.strokeStyle = nuit;
    p.lineWidth = 26;
    p.lineCap = 'round';
    p.lineJoin = 'round';
    p.beginPath();
    p.moveTo(104, 106);
    p.lineTo(144, 146);
    p.lineTo(220, 62);
    p.stroke();
    return toile;
  }
  const relie = etat[0] === 'r';
  p.fillStyle = '#0b1120';
  p.fillRect(0, 0, 320, 204);
  const trait = relie ? peche : '#eef0f5';
  p.strokeStyle = trait;
  p.fillStyle = trait;
  p.lineWidth = 12;
  p.lineCap = 'round';
  p.lineJoin = 'round';
  if (genre === 'panier') {
    p.beginPath();
    p.moveTo(26, 52);
    p.lineTo(48, 52);
    p.lineTo(64, 130);
    p.lineTo(126, 130);
    p.lineTo(138, 78);
    p.lineTo(54, 78);
    p.stroke();
    p.beginPath();
    p.arc(72, 158, 10, 0, TOUR);
    p.arc(120, 158, 10, 0, TOUR);
    p.fill();
  } else {
    arrondi(p, 38, 36, 92, 132, 14);
    p.stroke();
    p.lineWidth = 10;
    p.beginPath();
    p.arc(90, 102, 24, PI * 0.3, PI * 1.7);
    p.stroke();
    p.beginPath();
    p.moveTo(58, 94);
    p.lineTo(88, 94);
    p.moveTo(58, 110);
    p.lineTo(88, 110);
    p.stroke();
  }
  const remplies = etat === 'relie' ? 3 : etat === 'vide' ? 0 : Number(etat[1]);
  [52, 96, 140].forEach((y, i) => {
    p.fillStyle = i < remplies ? trait : 'rgba(255, 255, 255, 0.16)';
    arrondi(p, 172, y, i === 2 ? 84 : 122, 22, 11);
    p.fill();
  });
  return toile;
};

const dessinerCoche = (peche: string, nuit: string) => {
  const { toile, pinceau: p } = toileDe(96, 96);
  p.fillStyle = peche;
  p.beginPath();
  p.arc(48, 48, 44, 0, TOUR);
  p.fill();
  p.strokeStyle = nuit;
  p.lineWidth = 11;
  p.lineCap = 'round';
  p.lineJoin = 'round';
  p.beginPath();
  p.moveTo(28, 50);
  p.lineTo(42, 64);
  p.lineTo(68, 34);
  p.stroke();
  return toile;
};

/** Le dessus d'un bon de commande : un en-tête et quelques lignes. */
const dessinerPapier = (papier: string) => {
  const { toile, pinceau: p } = toileDe(160, 116);
  p.fillStyle = papier;
  p.fillRect(0, 0, 160, 116);
  p.fillStyle = '#39456a';
  arrondi(p, 14, 14, 58, 12, 6);
  p.fill();
  p.fillStyle = '#c3c9d4';
  [40, 58, 76, 94].forEach((y, i) => {
    arrondi(p, 14, y, [132, 110, 124, 70][i], 8, 4);
    p.fill();
  });
  return toile;
};

/** Le halo du conduit : une bande douce, effacée aux deux bouts. */
const dessinerHalo = (teinte: string) => {
  const { toile, pinceau: p } = toileDe(256, 64);
  /* `Color` range ses composantes en lumière linéaire : on repasse par
     l'écriture hexadécimale pour retrouver celles de l'écran. */
  const hex = new Color(teinte).getHexString();
  const [r, v, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const image = p.createImageData(256, 64);
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 256; x++) {
      const travers = Math.exp(-Math.pow((y - 31.5) / 13, 2));
      const bouts = doux(borne(Math.min(x, 255 - x) / 26));
      const i = (y * 256 + x) * 4;
      image.data[i] = r;
      image.data[i + 1] = v;
      image.data[i + 2] = b;
      image.data[i + 3] = Math.round(travers * bouts * 255);
    }
  }
  p.putImageData(image, 0, 0);
  return toile;
};

/* ── Les figurines ── */

interface Figurine {
  racine: Group;
  buste: Group;
  tete: Group;
  mainG: Mesh;
  mainD: Mesh;
  piedG: Mesh;
  piedD: Mesh;
  /** Là où la feuille tient entre les deux mains. */
  prise: Object3D;
}

interface Pose {
  x: number;
  z: number;
  /** Hauteur des pieds : un bond, un tabouret. */
  haut: number;
  cap: number;
  /** Le pas : sa phase, et son ampleur (0 à l'arrêt). */
  phase: number;
  allure: number;
  /** Les attitudes, chacune de 0 à 1. */
  porte: number;
  tend: number;
  tape: number;
  frappe: number;
  assis: number;
  tasse: number;
  gorgee: number;
  adosse: number;
  affaisse: number;
  /** La tête : à gauche ou à droite, vers le haut ou le bas. */
  lacet: number;
  hoche: number;
  /** Écrasement (positif) ou étirement (négatif) du buste. */
  ecrase: number;
}

const POSE_NEUTRE: Pose = {
  x: 0,
  z: 0,
  haut: 0,
  cap: 0,
  phase: 0,
  allure: 0,
  porte: 0,
  tend: 0,
  tape: 0,
  frappe: 0,
  assis: 0,
  tasse: 0,
  gorgee: 0,
  adosse: 0,
  affaisse: 0,
  lacet: 0,
  hoche: 0,
  ecrase: 0,
};

/** Place une figurine dans son attitude. Les mains et les pieds sont
    détachés du corps, comme sur un jouet : c'est ce qui rend le geste lisible
    à trente pixels de haut. */
const poserFigurine = (f: Figurine, p: Pose) => {
  f.racine.position.set(p.x, p.haut, p.z);
  f.racine.rotation.y = p.cap;
  const s = Math.sin(p.phase);
  const c = Math.cos(p.phase);
  const a = p.allure;

  f.buste.position.y = 0.1 + Math.abs(s) * 0.075 * a - p.affaisse * 0.05;
  f.buste.rotation.x = a * 0.17 + p.tape * 0.12 + p.tend * 0.14 + p.affaisse * 0.18 - p.adosse * 0.15;
  f.buste.rotation.z = s * 0.085 * a;
  const e = p.ecrase + p.affaisse * 0.07;
  f.buste.scale.set(1 + e * 0.6, 1 - e, 1 + e * 0.6);

  /* Les pieds : l'un avance levé pendant que l'autre recule posé. Assis, ils
     pendent sous le corps. */
  const pend = p.assis * 0.13 + p.adosse * 0.08;
  f.piedG.position.set(-0.13, 0.06 + Math.max(0, c) * 0.11 * a + p.adosse * 0.05, s * 0.18 * a + pend);
  f.piedD.position.set(0.13, 0.06 + Math.max(0, -c) * 0.11 * a + p.adosse * 0.05, -s * 0.18 * a + pend);

  /* Les mains : au repos elles balancent à contretemps des pieds, puis
     chaque attitude les tire vers sa propre place. */
  let gx = -0.35;
  let gy = 0.42 - p.affaisse * 0.1;
  let gz = -s * 0.16 * a;
  let dx = 0.35;
  let dy = gy;
  let dz = s * 0.16 * a;
  const vers = (poids: number, x: number, y: number, z: number, cote: 'g' | 'd' | 'gd') => {
    if (poids <= 0) return;
    if (cote !== 'd') {
      gx = melange(gx, -x, poids);
      gy = melange(gy, y, poids);
      gz = melange(gz, z, poids);
    }
    if (cote !== 'g') {
      dx = melange(dx, x, poids);
      dy = melange(dy, y, poids);
      dz = melange(dz, z, poids);
    }
  };
  vers(Math.max(p.porte, p.tend), 0.21, 0.5 + p.tend * 0.05, 0.36 + p.tend * 0.16, 'gd');
  if (p.tape > 0) {
    const frappe = Math.sin(p.frappe);
    gx = melange(gx, -0.16, p.tape);
    gy = melange(gy, 0.3 + Math.max(0, frappe) * 0.09, p.tape);
    gz = melange(gz, 0.44, p.tape);
    dx = melange(dx, 0.16, p.tape);
    dy = melange(dy, 0.3 + Math.max(0, -frappe) * 0.09, p.tape);
    dz = melange(dz, 0.44, p.tape);
  }
  /* La tasse est dans la main gauche : au coin café la figurine est de
     profil, et c'est cette main-là que voit la caméra. */
  vers(p.tasse, 0.28, 0.5, 0.26, 'g');
  vers(p.gorgee, 0.12, 0.94, 0.27, 'g');
  vers(p.adosse, 0.25, 1.16, -0.17, 'gd');
  f.mainG.position.set(gx, gy, gz);
  f.mainD.position.set(dx, dy, dz);

  f.tete.position.y = 1.1 - p.affaisse * 0.05;
  f.tete.rotation.y = p.lacet;
  f.tete.rotation.x = p.hoche + p.tape * 0.14 + p.affaisse * 0.3 - p.gorgee * 0.34 - p.adosse * 0.3;
};

/* ── Le montage ── */

/**
 * Monte la maquette dans sa racine et rend la fonction qui la démonte.
 * Lève si WebGL est indisponible : à l'appelant de garder le dessin de repli.
 */
export function monterBureau(racine: HTMLElement): () => void {
  const toile = racine.querySelector('canvas');
  if (!toile) throw new Error('bureau : toile absente');
  const rendu = new WebGLRenderer({ canvas: toile, antialias: true, alpha: false });
  try {
    return construire(racine, toile, rendu);
  } catch (erreur) {
    /* Une erreur à mi-montage laisserait un contexte ouvert que plus rien ne
       référence : on le rend avant de la laisser remonter. */
    rendu.dispose();
    rendu.getContext().getExtension('WEBGL_lose_context')?.loseContext();
    throw erreur;
  }
}

function construire(racine: HTMLElement, toile: HTMLCanvasElement, rendu: WebGLRenderer): () => void {
  const css = getComputedStyle(racine);
  /* Un jeton absent rend une chaîne vide, et `new Color('')` donne du blanc
     sans rien dire : le repli est explicite. */
  const jeton = (nom: string, repli: string) => {
    const valeur = css.getPropertyValue(nom).trim();
    if (!valeur) console.warn(`bureau : jeton ${nom} absent, repli sur ${repli}`);
    return valeur || repli;
  };
  const nuit = jeton('--color-night-deep', '#0c121f');
  const peche = jeton('--color-peche', '#ffb38a');
  const papier = jeton('--color-feuille', '#f7f8fa');
  /* La braise ne sert qu'au halo du conduit : au sol, la pêche pure blanchit. */
  const braise = jeton('--color-braise', '#ff8a65');

  const ecranEtroit = window.matchMedia('(max-width: 640px)');
  const densite = () => Math.min(window.devicePixelRatio || 1, ecranEtroit.matches ? 1.5 : 2);
  rendu.setPixelRatio(densite());
  rendu.outputColorSpace = SRGBColorSpace;
  /* Le rendu neutre garde la pêche pêche : un rendu « cinéma » la délave. */
  rendu.toneMapping = NeutralToneMapping;
  rendu.toneMappingExposure = 1.08;
  rendu.shadowMap.enabled = true;
  rendu.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  scene.background = new Color(nuit);
  const textures: Texture[] = [];
  const texture = (source: HTMLCanvasElement) => {
    const t = new CanvasTexture(source);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = Math.min(8, rendu.capabilities.getMaxAnisotropy());
    textures.push(t);
    return t;
  };

  /* ── La lumière : une lampe chaude au-dessus de la maquette ──
     Une seule source porte les ombres et dessine la flaque de lumière ; son
     bord flou commence la pénombre du cadre, que le composant achève d'un
     dégradé. Le ciel, lui, garde du bleu dans les ombres. */
  scene.add(new HemisphereLight('#cdd6f4', '#39415c', 1.85));
  const lampe = new SpotLight('#ffe7cf', 5.4, 0, 0.46, 1, 0);
  lampe.position.set(-5.2, 11, 6.4);
  lampe.target.position.set(0.2, 0, 1.1);
  lampe.castShadow = true;
  lampe.shadow.mapSize.setScalar(ecranEtroit.matches ? 1024 : 2048);
  lampe.shadow.radius = 7;
  lampe.shadow.bias = -0.0004;
  lampe.shadow.normalBias = 0.02;
  lampe.shadow.camera.near = 4;
  lampe.shadow.camera.far = 28;
  scene.add(lampe, lampe.target);

  /* ── Les matières : de l'argile, rien qui brille ── */
  const argile = (couleur: string, rugosite = 0.94) =>
    new MeshPhysicalMaterial({
      color: couleur,
      roughness: rugosite,
      metalness: 0,
      /* Un léger velours sur la tranche : c'est lui qui fait « modelé à la
         main » plutôt que plastique. */
      sheen: 0.4,
      sheenRoughness: 0.85,
      sheenColor: new Color('#ffe9d6'),
    });
  const mat = {
    ivoire: argile('#ece5d9'),
    mobilier: argile('#9aa3ba'),
    sombre: argile('#343e5c'),
    /* La gaine du conduit : un ton sous le sol, sans velours, pour se lire
       en creux quand elle est éteinte. */
    socle: new MeshStandardMaterial({ color: '#1b2238', roughness: 1, metalness: 0 }),
    /* En volume, sous la lampe, la pêche du site vire au crème : la matière
       est un ton plus soutenue pour être lue comme la même couleur. */
    peche: argile('#ff9c6e'),
    tapis: argile('#2c3655'),
    papier: argile(papier, 0.82),
    papierGris: argile('#e3e7ee', 0.82),
    feuillage: argile('#7f93b8'),
  };
  const lueur = (opacite = 1) => new MeshBasicMaterial({ color: peche, toneMapped: false, transparent: true, opacity: opacite });

  const maquette = new Group();
  scene.add(maquette);
  const poser = (geometrie: BufferGeometry, matiere: Material, parent: Object3D, x = 0, y = 0, z = 0) => {
    const maille = new Mesh(geometrie, matiere);
    maille.position.set(x, y, z);
    maille.castShadow = maille.receiveShadow = true;
    parent.add(maille);
    return maille;
  };
  const boite = (l: number, h: number, p: number, r: number) => new RoundedBoxGeometry(l, h, p, 4, r);
  const cylindre = (r: number, h: number, segments = 32) => new CylinderGeometry(r, r, h, segments);

  /* ── Le sol : la nuit, quadrillée d'un trait à peine visible ── */
  {
    const { toile: trame, pinceau } = toileDe(128, 128);
    pinceau.fillStyle = '#252e49';
    pinceau.fillRect(0, 0, 128, 128);
    pinceau.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    pinceau.lineWidth = 2;
    pinceau.strokeRect(0, 0, 128, 128);
    const carte = texture(trame);
    carte.wrapS = carte.wrapT = RepeatWrapping;
    carte.repeat.set(44, 44);
    const sol = new Mesh(new PlaneGeometry(44, 44), new MeshStandardMaterial({ map: carte, roughness: 1, metalness: 0 }));
    sol.rotation.x = -PI / 2;
    sol.receiveShadow = true;
    maquette.add(sol);
  }

  /* ── Le mobilier ── */
  const bureau = (x: number, large: number) => {
    const groupe = new Group();
    groupe.position.x = x;
    maquette.add(groupe);
    poser(boite(large, 0.1, 0.92, 0.045), mat.mobilier, groupe, 0, PLATEAU - 0.05, 0);
    const pied = cylindre(0.055, PLATEAU - 0.1, 16);
    for (const cx of [-1, 1]) {
      for (const cz of [-1, 1]) {
        poser(pied, mat.mobilier, groupe, cx * (large / 2 - 0.13), (PLATEAU - 0.1) / 2, cz * 0.37);
      }
    }
    return groupe;
  };

  const texturesEcran = (genre: 'panier' | 'facture') =>
    Object.fromEntries(ETATS_ECRAN.map((etat) => [etat, texture(dessinerEcran(genre, etat, peche, nuit))])) as Record<EtatEcran, CanvasTexture>;

  /** Un écran sur son pied, face à la caméra. Rend la dalle, pour en changer l'image. */
  const moniteur = (parent: Group, x: number, cartes: Record<EtatEcran, CanvasTexture>) => {
    const groupe = new Group();
    groupe.position.set(x, PLATEAU, -0.24);
    parent.add(groupe);
    poser(cylindre(0.2, 0.04), mat.sombre, groupe, 0, 0.02, 0);
    poser(cylindre(0.05, 0.24, 16), mat.sombre, groupe, 0, 0.14, 0);
    const haut = new Group();
    haut.position.y = 0.62;
    haut.rotation.x = -0.1;
    groupe.add(haut);
    poser(boite(1.16, 0.8, 0.1, 0.05), mat.sombre, haut);
    const dalle = new Mesh(new PlaneGeometry(1.03, 0.66), new MeshBasicMaterial({ map: cartes.vide, toneMapped: false }));
    dalle.position.z = 0.052;
    haut.add(dalle);
    return dalle;
  };

  const siege = (x: number, z: number, dossier: boolean) => {
    const groupe = new Group();
    groupe.position.set(x, 0, z);
    maquette.add(groupe);
    poser(cylindre(0.23, 0.04), mat.sombre, groupe, 0, 0.02, 0);
    /* Le siège pivote sur son pied, et tout ce qui est au-dessus bascule
       ensemble autour du bord arrière du socle : c'est la chaise qu'on fait
       tourner, puis qu'on renverse. */
    const pivot = new Group();
    groupe.add(pivot);
    const bascule = new Group();
    bascule.position.set(0, 0, 0.16);
    pivot.add(bascule);
    poser(cylindre(0.05, ASSISE - 0.1, 16), mat.sombre, bascule, 0, (ASSISE - 0.1) / 2 + 0.03, -0.16);
    poser(cylindre(0.26, 0.08), mat.mobilier, bascule, 0, ASSISE - 0.04, -0.16);
    if (dossier) {
      poser(boite(0.46, 0.4, 0.08, 0.035), mat.mobilier, bascule, 0, ASSISE + 0.34, 0.13).rotation.x = 0.08;
      poser(cylindre(0.035, 0.24, 12), mat.sombre, bascule, 0, ASSISE + 0.06, 0.1);
    }
    return { pivot, bascule };
  };

  /* Le courrier : une table, un bac, et une grande enveloppe dressée. */
  const pastille = (() => {
    const table = bureau(X_COURRIER, 1.4);
    const fond = BAC.x - X_COURRIER;
    poser(boite(0.8, 0.04, 0.62, 0.018), mat.sombre, table, fond, PLATEAU + 0.02, BAC.z);
    poser(boite(0.8, 0.16, 0.05, 0.022), mat.sombre, table, fond, PLATEAU + 0.08, BAC.z - 0.31);
    poser(boite(0.05, 0.16, 0.62, 0.022), mat.sombre, table, fond - 0.4, PLATEAU + 0.08, BAC.z);
    const enveloppe = new Group();
    enveloppe.position.set(-0.3, PLATEAU + 0.4, -0.3);
    enveloppe.rotation.x = -0.14;
    table.add(enveloppe);
    poser(boite(0.8, 0.58, 0.1, 0.045), mat.ivoire, enveloppe);
    /* Le rabat : deux traits en V, en relief. */
    for (const cote of [-1, 1]) {
      const trait = poser(boite(0.5, 0.06, 0.03, 0.014), mat.sombre, enveloppe, cote * 0.19, 0.11, 0.055);
      trait.rotation.z = cote * 0.6;
      trait.castShadow = false;
    }
    /* La pastille de notification : le seul accent du poste. Elle saute à
       chaque bon de commande qui tombe. */
    const badge = poser(new SphereGeometry(0.13, 28, 20), mat.peche, enveloppe, 0.4, 0.29, 0.05);
    return badge;
  })();

  /* La boutique : un bureau, un écran au panier, un tabouret, des colis. */
  const cartesBoutique = texturesEcran('panier');
  const ecranBoutique = (() => {
    const meuble = bureau(X_BOUTIQUE, 1.7);
    const dalle = moniteur(meuble, 0.1, cartesBoutique);
    poser(boite(0.62, 0.04, 0.2, 0.018), mat.sombre, meuble, 0.1, PLATEAU + 0.02, 0.27);
    siege(TABOURET[0], TABOURET[1], false);
    const colis = new Group();
    colis.position.set(1.5, 0, -0.45);
    colis.rotation.y = 0.22;
    maquette.add(colis);
    poser(boite(0.56, 0.42, 0.5, 0.035), mat.ivoire, colis, 0, 0.21, 0);
    poser(boite(0.565, 0.03, 0.12, 0.012), mat.mobilier, colis, 0, 0.42, 0).castShadow = false;
    const petit = poser(boite(0.38, 0.3, 0.36, 0.03), mat.ivoire, colis, 0.04, 0.57, 0.02);
    petit.rotation.y = -0.5;
    return dalle;
  })();

  /* La facturation : un bureau, un écran à la facture, une chaise à dossier. */
  const cartesFacture = texturesEcran('facture');
  const { ecranFacture, chaise } = (() => {
    const meuble = bureau(X_FACTURE, 1.8);
    const dalle = moniteur(meuble, 0.25, cartesFacture);
    poser(boite(0.62, 0.04, 0.2, 0.018), mat.sombre, meuble, 0.25, PLATEAU + 0.02, 0.27);
    /* La bannette où l'on dépose la feuille à recopier. */
    poser(boite(0.74, 0.03, 0.56, 0.014), mat.sombre, meuble, POSE_FACTURE.x - X_FACTURE, PLATEAU + 0.015, POSE_FACTURE.z);
    /* Une calculette, pour dire les comptes. */
    const calculette = new Group();
    calculette.position.set(0.74, PLATEAU + 0.03, 0.2);
    calculette.rotation.y = -0.3;
    meuble.add(calculette);
    poser(boite(0.22, 0.05, 0.3, 0.02), mat.ivoire, calculette);
    poser(boite(0.16, 0.012, 0.07, 0.005), mat.sombre, calculette, 0, 0.028, -0.09).castShadow = false;
    return { ecranFacture: dalle, chaise: siege(CHAISE[0], CHAISE[1], true) };
  })();

  /* Le coin café : une table haute, une tasse, une plante. */
  const tasse = new Group();
  const vapeurs: { maille: Mesh; matiere: MeshBasicMaterial }[] = [];
  const POSE_TASSE = new Vector3(TABLE_CAFE[0] + 0.1, 0.9, TABLE_CAFE[1] - 0.04);
  {
    const coin = new Group();
    coin.position.set(TABLE_CAFE[0], 0, TABLE_CAFE[1]);
    maquette.add(coin);
    /* Un tapis rond : le coin pause est un lieu, pas un meuble isolé. */
    poser(cylindre(1.02, 0.024, 64), mat.tapis, coin, 0.34, 0.012, -0.1).castShadow = false;
    poser(cylindre(0.27, 0.04), mat.sombre, coin, 0, 0.044, 0);
    poser(cylindre(0.055, 0.8, 16), mat.sombre, coin, 0, 0.42, 0);
    poser(cylindre(0.44, 0.07, 48), mat.mobilier, coin, 0, 0.855, 0);

    const plante = new Group();
    plante.position.set(TABLE_CAFE[0] - 0.72, 0, TABLE_CAFE[1] - 0.5);
    maquette.add(plante);
    poser(new CylinderGeometry(0.22, 0.17, 0.32, 28), mat.ivoire, plante, 0, 0.16, 0);
    const feuille = new SphereGeometry(0.2, 20, 14);
    [
      [0, 0.62, 0, 0, 0],
      [0.14, 0.5, 0.06, 0, -0.6],
      [-0.14, 0.52, -0.02, 0, 0.6],
      [0.02, 0.5, -0.14, 0.6, 0],
    ].forEach(([x, y, z, rx, rz]) => {
      const f = poser(feuille, mat.feuillage, plante, x, y, z);
      f.scale.set(0.62, 1.25, 0.62);
      f.rotation.set(rx, 0, rz);
    });

    maquette.add(tasse);
    poser(cylindre(0.085, 0.14, 24), mat.ivoire, tasse, 0, 0, 0);
    const anse = poser(new TorusGeometry(0.045, 0.016, 10, 20), mat.ivoire, tasse, 0.095, 0, 0);
    anse.castShadow = false;
    /* Trois volutes : le café est chaud, c'est l'heure de la pause. */
    const volute = new SphereGeometry(0.05, 12, 10);
    for (let i = 0; i < 3; i++) {
      const matiere = new MeshBasicMaterial({ color: '#f3ede2', transparent: true, opacity: 0, depthWrite: false });
      const maille = new Mesh(volute, matiere);
      maquette.add(maille);
      vapeurs.push({ maille, matiere });
    }
  }

  /* ── Le conduit ── */
  const trait = lueur();
  const haloMatiere = new MeshBasicMaterial({
    map: texture(dessinerHalo(braise)),
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const anneaux: { maille: Mesh; matiere: MeshBasicMaterial }[] = [];
  const { rail, halo, lueurs } = (() => {
    poser(boite(LONGUEUR_CONDUIT, 0.03, 0.3, 0.014), mat.socle, maquette, (X_CONDUIT_DEBUT + X_CONDUIT_FIN) / 2, 0.015, Z_CONDUIT).castShadow = false;
    /* Les trois prises : là où la feuille atterrit, là où elle traverse la
       boutique, là où elle entre en facturation. */
    const disque = cylindre(0.32, 0.034, 40);
    const couronne = new RingGeometry(0.18, 0.25, 40);
    for (const x of [X_CONDUIT_DEBUT, X_BOUTIQUE, X_CONDUIT_FIN]) {
      poser(disque, mat.socle, maquette, x, 0.017, Z_CONDUIT).castShadow = false;
      const matiere = lueur(0);
      const maille = new Mesh(couronne, matiere);
      maille.rotation.x = -PI / 2;
      maille.position.set(x, 0.037, Z_CONDUIT);
      maquette.add(maille);
      anneaux.push({ maille, matiere });
    }
    /* Le trait de lumière se trace depuis la gauche : sa géométrie part de
       zéro, et c'est son échelle qui l'allonge. */
    const ligne = new PlaneGeometry(LONGUEUR_CONDUIT, 0.13);
    ligne.rotateX(-PI / 2);
    ligne.translate(LONGUEUR_CONDUIT / 2, 0, 0);
    const maille = new Mesh(ligne, trait);
    maille.position.set(X_CONDUIT_DEBUT, 0.033, Z_CONDUIT);
    maquette.add(maille);
    const nappe = new PlaneGeometry(LONGUEUR_CONDUIT + 1.2, 1.5);
    nappe.rotateX(-PI / 2);
    nappe.translate((LONGUEUR_CONDUIT + 1.2) / 2, 0, 0);
    const voile = new Mesh(nappe, haloMatiere);
    voile.position.set(X_CONDUIT_DEBUT - 0.6, 0.008, Z_CONDUIT);
    maquette.add(voile);
    /* Deux lampes pêche au ras du sol : le conduit éclaire pour de vrai les
       pieds des bureaux et le bas des figurines. */
    const lampes = [-1.1, 1.5].map((x) => {
      const l = new PointLight(peche, 0, 4.2, 1.6);
      l.position.set(x, 0.42, Z_CONDUIT + 0.5);
      maquette.add(l);
      return l;
    });
    return { rail: maille, halo: voile, lueurs: lampes };
  })();

  /* ── Les feuilles ── */
  const cartePapier = texture(dessinerPapier(papier));
  const geoFeuille = boite(0.6, EPAISSEUR, 0.44, 0.02);
  const geoImprime = new PlaneGeometry(0.53, 0.37);
  geoImprime.rotateX(-PI / 2);
  const matImprime = new MeshStandardMaterial({ map: cartePapier, roughness: 0.85 });
  const feuille = (grise: boolean) => {
    const maille = poser(geoFeuille, grise ? mat.papierGris : mat.papier, maquette);
    const imprime = new Mesh(geoImprime, matImprime);
    imprime.position.y = EPAISSEUR / 2 + 0.0008;
    imprime.receiveShadow = true;
    maille.add(imprime);
    return maille;
  };
  /* Un tirage à graine fixe : la pile est en désordre, mais c'est le même
     désordre à chaque visite. */
  let graine = 7;
  const hasard = () => ((graine = (graine * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const courrier = planCourrier().map((plan, i) => {
    const lacet = hasard() * 0.3;
    const repos = new Vector3(BAC.x + hasard() * 0.05, BAC.y + EPAISSEUR / 2 + plan.rang * EPAISSEUR, BAC.z + hasard() * 0.045);
    return { ...plan, maille: feuille(i % 2 === 1), lacet, repos };
  });
  const portee = feuille(false);
  const feuillePrise = courrier.find((f) => f.mode === 'portee');
  if (!feuillePrise) throw new Error('bureau : aucune feuille à porter');

  /* Les validations : à la main, une par poste et par tour ; reliées, une
     par feuille qui passe. */
  const DELAI_BOUTIQUE = SAUT_FEUILLE + (X_BOUTIQUE - X_CONDUIT_DEBUT) / VITESSE;
  const DELAI_FACTURE = SAUT_FEUILLE + (LONGUEUR_CONDUIT - 0.2) / VITESSE;
  const autos = courrier.filter((f) => f.mode === 'conduit');
  const coches = {
    boutique: [{ quand: VALIDE_BOUTIQUE, grande: true }, ...autos.map((f) => ({ quand: (f.depart + DELAI_BOUTIQUE) % T, grande: false }))],
    facture: [{ quand: VALIDE_FACTURE, grande: true }, ...autos.map((f) => ({ quand: (f.depart + DELAI_FACTURE) % T, grande: false }))],
  };
  const arrivees = courrier.map((f) => f.arrivee % T);
  /* Ce qui fait battre chaque prise, et le point du trait où elle s'allume. */
  const battements = [
    autos.map((f) => (f.depart + SAUT_FEUILLE) % T),
    coches.boutique.filter((c) => !c.grande).map((c) => c.quand),
    coches.facture.filter((c) => !c.grande).map((c) => c.quand),
  ];
  const SEUILS = [-0.1, (X_BOUTIQUE - X_CONDUIT_DEBUT) / LONGUEUR_CONDUIT - 0.04, 0.93];
  /* L'écran relié : vide tant qu'aucune feuille n'est passée, puis trois
     lignes qui se remplissent en un dixième de seconde à chaque passage. */
  const etatRelie = (t: number, liste: { quand: number; grande: boolean }[]): EtatEcran => {
    let dernier = Infinity;
    let premier = Infinity;
    for (const c of liste) {
      if (c.grande) continue;
      dernier = Math.min(dernier, depuis(t, c.quand));
      premier = Math.min(premier, c.quand);
    }
    if (t < premier) return 'r0';
    return dernier < 0.05 ? 'r1' : dernier < 0.1 ? 'r2' : 'relie';
  };
  const lacetCollegue = piste([
    [0, 0],
    [3.55, 0],
    [3.9, 0.85],
    [4.3, 0.7],
    [4.62, 0.75],
    [4.78, 0],
    [4.98, 0.75],
    [5.12, 0],
    [5.32, 0.75],
    [5.48, 0],
    [6.95, 0],
    [7.3, 0.8],
    [8.0, 0.8],
    [8.4, 0],
    [T, 0],
  ]);

  const carteCoche = texture(dessinerCoche(peche, nuit));
  const jetons = (x: number) =>
    Array.from({ length: 3 }, () => {
      const matiere = new SpriteMaterial({ map: carteCoche, transparent: true, depthTest: false, toneMapped: false });
      const sprite = new Sprite(matiere);
      sprite.position.set(x + 0.68, PLATEAU + 0.86, -0.12);
      sprite.visible = false;
      sprite.renderOrder = 2;
      maquette.add(sprite);
      return { sprite, matiere };
    });
  const jetonsBoutique = jetons(X_BOUTIQUE + 0.1);
  const jetonsFacture = jetons(X_FACTURE + 0.25);

  /* ── Les figurines ── */
  const figurine = (accent: 'casquette' | 'echarpe', parent: Object3D): Figurine => {
    const racineFig = new Group();
    /* Un peu plus grandes que nature : ce sont elles qu'on suit des yeux. */
    racineFig.scale.setScalar(TAILLE);
    parent.add(racineFig);
    const buste = new Group();
    racineFig.add(buste);
    poser(new CapsuleGeometry(0.25, 0.36, 12, 32), mat.ivoire, buste, 0, 0.43, 0);
    const tete = new Group();
    buste.add(tete);
    poser(new SphereGeometry(0.21, 36, 26), mat.ivoire, tete);
    if (accent === 'casquette') {
      /* Sans visage, c'est la visière qui dit où la figurine regarde. */
      const calotte = poser(new SphereGeometry(0.222, 32, 14, 0, TOUR, 0, PI * 0.47), mat.peche, tete, 0, 0.012, 0);
      calotte.rotation.x = 0.16;
      const visiere = poser(cylindre(0.15, 0.03, 28), mat.peche, tete, 0, 0.05, 0.19);
      visiere.rotation.x = 0.2;
    } else {
      poser(new TorusGeometry(0.19, 0.05, 14, 36), mat.peche, buste, 0, 0.9, 0).rotation.x = PI / 2;
    }
    const main = new SphereGeometry(0.085, 20, 14);
    const pied = new SphereGeometry(0.1, 20, 14);
    const piedG = poser(pied, mat.ivoire, racineFig);
    const piedD = poser(pied, mat.ivoire, racineFig);
    piedG.scale.set(0.9, 0.6, 1.35);
    piedD.scale.copy(piedG.scale);
    const prise = new Object3D();
    prise.position.set(0, 0.57, 0.44);
    prise.rotation.x = -0.32;
    buste.add(prise);
    return { racine: racineFig, buste, tete, mainG: poser(main, mat.ivoire, buste), mainD: poser(main, mat.ivoire, buste), piedG, piedD, prise };
  };
  const navette = figurine('casquette', maquette);
  const collegue = figurine('echarpe', chaise.bascule);

  /* ── La caméra : une vue de trois quarts, sans perspective ── */
  const AZIMUT = (20 * PI) / 180;
  const SITE = (44 * PI) / 180;
  const regard = new Vector3(Math.sin(AZIMUT) * Math.cos(SITE), Math.sin(SITE), Math.cos(AZIMUT) * Math.cos(SITE));
  const versDroite = new Vector3(Math.cos(AZIMUT), 0, -Math.sin(AZIMUT));
  const versHaut = new Vector3().crossVectors(regard, versDroite);
  /* Le champ à tenir, en unités de maquette, et son centre mesuré à l'écran :
     un peu à droite et au-dessus de la boutique. */
  const CHAMP = { large: 8.5, haut: 6.375 };
  const cible = new Vector3().addScaledVector(versDroite, 0.1).addScaledVector(versHaut, 0.16);
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 90);
  camera.position.copy(cible).addScaledVector(regard, 40);
  camera.lookAt(cible);

  /* Les étiquettes sont du texte de page, posé au-dessus de chaque poste :
     elles restent nettes à toutes les tailles. */
  const ancres: Record<string, Vector3> = {
    courrier: new Vector3(X_COURRIER - 0.42, PLATEAU + 0.98, -0.3),
    boutique: new Vector3(X_BOUTIQUE + 0.1, PLATEAU + 1.3, -0.24),
    facture: new Vector3(X_FACTURE + 0.25, PLATEAU + 1.3, -0.24),
  };
  const etiquettes = [...racine.querySelectorAll<HTMLElement>('[data-ancre]')];
  const projete = new Vector3();
  const placerEtiquettes = () => {
    for (const etiquette of etiquettes) {
      const ancre = ancres[etiquette.dataset.ancre ?? ''];
      if (!ancre) continue;
      projete.copy(ancre).project(camera);
      etiquette.style.left = `${((projete.x + 1) / 2) * 100}%`;
      etiquette.style.top = `${((1 - projete.y) / 2) * 100}%`;
    }
  };

  /* ── La mise à jour : tout, à l'instant t ── */
  const pose: Pose = { ...POSE_NEUTRE };
  const poseB: Pose = { ...POSE_NEUTRE };
  const lieuPrise = new Vector3();
  const tourPrise = new Quaternion();
  const tourRepos = new Quaternion();
  const axeY = new Vector3(0, 1, 0);
  const lieuMain = new Vector3();
  let temps: 'main' | 'relie' | '' = '';
  let etatBoutique: EtatEcran = 'vide';
  let etatFacture: EtatEcran = 'vide';

  const etatManuel = (t: number, lignes: readonly number[], valide: number): EtatEcran => {
    if (t >= valide && t < valide + 0.5) return 'ok';
    if (t >= lignes[2] && t < valide) return 'l3';
    if (t >= lignes[1] && t < valide) return 'l2';
    if (t >= lignes[0] && t < valide) return 'l1';
    return 'vide';
  };

  const majJetons = (t: number, jetonsPoste: { sprite: Sprite; matiere: SpriteMaterial }[], liste: { quand: number; grande: boolean }[], base: number) => {
    jetonsPoste.forEach((j) => (j.sprite.visible = false));
    liste.forEach((coche, i) => {
      const d = depuis(t, coche.quand);
      const duree = coche.grande ? 0.9 : 0.55;
      if (d >= duree) return;
      const j = jetonsPoste[i % jetonsPoste.length];
      const taille = (coche.grande ? 0.56 : 0.4) * rebond(pas(d, 0, 0.2));
      j.sprite.visible = true;
      j.sprite.scale.setScalar(Math.max(0.001, taille));
      j.sprite.position.y = base + sortie(pas(d, 0, duree)) * 0.3;
      j.matiere.opacity = 1 - doux(pas(d, duree - 0.2, duree));
    });
  };

  const maj = (t: number) => {
    /* Le conduit. */
    const trace = adoucir(pas(t, ALLUMAGE[0], ALLUMAGE[1]));
    const eteint = doux(pas(t, EXTINCTION[0], EXTINCTION[1]));
    const allume = trace > 0 && eteint < 1;
    const eclat = allume ? 1 - eteint : 0;
    rail.visible = halo.visible = allume;
    rail.scale.x = halo.scale.x = Math.max(0.001, trace);
    trait.opacity = eclat;
    haloMatiere.opacity = eclat * 0.55;
    lueurs.forEach((l, i) => (l.intensity = eclat * 7 * borne(trace * 2 - i * 0.7)));
    const relie = t >= ALLUMAGE[0] && t < EXTINCTION[0];
    const nouveau = relie ? 'relie' : 'main';
    if (nouveau !== temps) {
      temps = nouveau;
      racine.dataset.temps = nouveau;
    }

    /* Les prises : allumées quand le trait les atteint, et un battement à
       chaque feuille qui passe. */
    anneaux.forEach((anneau, i) => {
      const atteint = pas(trace, SEUILS[i], SEUILS[i] + 0.06);
      let bat = 0;
      for (const quand of battements[i]) {
        const d = depuis(t, quand);
        if (d < 0.3) bat = Math.max(bat, Math.sin((d / 0.3) * PI));
      }
      anneau.matiere.opacity = eclat * atteint;
      anneau.maille.scale.setScalar(1 + bat * 0.22);
    });

    /* Les écrans. */
    const relieBoutique = t >= ALLUMAGE[0] + 0.32 && t < EXTINCTION[0] + 0.15;
    const relieFacture = t >= ALLUMAGE[1] && t < EXTINCTION[0] + 0.15;
    const eb: EtatEcran = relieBoutique ? etatRelie(t, coches.boutique) : etatManuel(t, LIGNES_BOUTIQUE, VALIDE_BOUTIQUE);
    const ef: EtatEcran = relieFacture ? etatRelie(t, coches.facture) : etatManuel(t, LIGNES_FACTURE, VALIDE_FACTURE);
    if (eb !== etatBoutique) {
      etatBoutique = eb;
      ecranBoutique.material.map = cartesBoutique[eb];
    }
    if (ef !== etatFacture) {
      etatFacture = ef;
      ecranFacture.material.map = cartesFacture[ef];
    }
    majJetons(t, jetonsBoutique, coches.boutique, PLATEAU + 0.86);
    majJetons(t, jetonsFacture, coches.facture, PLATEAU + 0.86);

    /* La pastille du courrier. */
    let saute = 0;
    for (const quand of arrivees) {
      const d = depuis(t, quand);
      if (d < 0.34) saute = Math.max(saute, Math.sin((d / 0.34) * PI) * (1 - d / 0.34));
    }
    pastille.scale.setScalar(1 + saute * 0.75);

    /* ── La navette ── */
    const lieu = lieuNavette(t);
    const vitesse = (lieuNavette(t + 0.012).parcouru - lieuNavette(t - 0.012).parcouru) / 0.024;
    const assis = doux(pas(t, 1.55, 1.85)) * (1 - doux(pas(t, 3.05, 3.3)));
    /* Un sursaut quand le sol s'allume. */
    const sursaut = bosse(t, 6.72, 6.98);
    /* Avant chaque départ, un temps d'appui ; après chaque bond, un tassement. */
    let ecrase = -lieu.etire * 0.1 - sursaut * 0.1;
    for (const trajet of TRAJETS) {
      if (trajet.bond) ecrase += bosse(t, trajet.a, trajet.a + 0.22) * 0.16;
      else ecrase += bosse(t, trajet.de - 0.17, trajet.de + 0.07) * 0.12;
    }
    ecrase += bosse(t, 6.98, 7.2) * 0.14;
    const tape = palier(t, 1.92, 2.05, 2.92, 3.02);
    const gorgee = bosse(t, 10.25, 10.95) + bosse(t, 11.4, 12.1);
    pose.x = lieu.x;
    pose.z = lieu.z;
    pose.haut = assis * (ASSISE - 0.1 * TAILLE) + lieu.bond + sursaut * 0.2;
    pose.cap = capNavette(t);
    pose.phase = lieu.parcouru * 5.3;
    pose.allure = Math.min(1.3, vitesse / 2.3);
    pose.porte = palier(t, 0.05, 0.3, 1.6, 1.85) + palier(t, 3.0, 3.2, 4.02, 4.3);
    /* Les bras se tendent vers le bac juste avant le raccord et le restent
       juste après : les deux bouts de la boucle portent la même valeur. */
    pose.tend = (1 - doux(pas(t, 0.18, 0.4))) * (t < 1 ? 1 : 0) + palier(t, 3.92, 4.08, 4.2, 4.4) + doux(pas(t, 13.8, 13.98));
    pose.tape = tape;
    pose.frappe = t * 24;
    pose.assis = assis;
    pose.tasse = palier(t, 9.8, 10.05, 12.22, 12.45);
    pose.gorgee = gorgee;
    pose.affaisse = palier(t, 6.22, 6.42, 6.62, 6.74);
    pose.lacet = lacetNavette(t);
    pose.hoche = -0.34 * palier(t, 6.24, 6.44, 6.6, 6.72);
    pose.ecrase = ecrase;
    poserFigurine(navette, pose);

    /* ── La collègue, à la facturation ── */
    const adosse = palier(t, 9.75, 10.4, 12.35, 12.85);
    const saisie = palier(t, 4.4, 4.62, 5.82, 5.95);
    /* Hors saisie elle pianote, en attendant la feuille suivante. */
    const attente = 1 - palier(t, 6.75, 7.1, 13.05, 13.45);
    poseB.x = 0;
    poseB.z = -0.16;
    poseB.haut = ASSISE - 0.1 * TAILLE;
    poseB.cap = PI;
    poseB.assis = 1;
    poseB.tape = Math.max(saisie, attente * 0.55) * (1 - adosse);
    poseB.frappe = saisie > 0.5 ? t * 24 : t * 9;
    poseB.adosse = adosse;
    poseB.lacet = lacetCollegue(t) * (1 - adosse);
    poseB.hoche = 0.3 * palier(t, 7.0, 7.3, 8.0, 8.4);
    poseB.ecrase = bosse(t, 5.9, 6.2) * -0.08;
    poserFigurine(collegue, poseB);
    /* Elle tourne le dos à l'écran, vers la salle, et se renverse un peu. */
    chaise.pivot.rotation.y = adoucir(adosse) * 2.15;
    chaise.bascule.rotation.x = adosse * 0.09;

    /* ── La feuille portée ── */
    const enMain = palier(t, 0.05, 0.3, 1.6, 1.86) + palier(t, 3.0, 3.2, 4.02, 4.3);
    const visiblePortee = t >= 0.05 && t < VALIDE_FACTURE + 0.22;
    portee.visible = visiblePortee;
    if (visiblePortee) {
      navette.racine.updateMatrixWorld(true);
      navette.prise.getWorldPosition(lieuPrise);
      navette.prise.getWorldQuaternion(tourPrise);
      const base = t < 1 ? feuillePrise.repos : t < 3.6 ? POSE_BOUTIQUE : POSE_FACTURE;
      tourRepos.setFromAxisAngle(axeY, t < 1 ? feuillePrise.lacet : t < 3.6 ? 0.22 : -0.1);
      portee.position.copy(base).lerp(lieuPrise, enMain);
      /* Entre le bureau et les mains, la feuille décrit un petit arc. */
      portee.position.y += Math.sin(enMain * PI) * 0.14;
      portee.quaternion.copy(tourRepos).slerp(tourPrise, enMain);
      portee.scale.setScalar(Math.max(0.001, 1 - doux(pas(t, VALIDE_FACTURE, VALIDE_FACTURE + 0.2))));
    }

    /* ── Le courrier ── */
    const tu = derouler(t);
    for (const f of courrier) {
      const m = f.maille;
      const chute = tu - (f.arrivee - CHUTE);
      if (chute < 0) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      m.scale.setScalar(1);
      if (tu < f.arrivee) {
        /* Elle tombe : de plus en plus vite, en se redressant. */
        const p = chute / CHUTE;
        m.position.set(f.repos.x, f.repos.y + (1 - p * p) * 1.05, f.repos.z);
        m.rotation.set((1 - p) * 0.5, f.lacet + (1 - p) * 0.8, (1 - p) * -0.35);
        m.scale.setScalar(Math.min(1, 0.25 + p * 2.2));
        continue;
      }
      if (tu < f.depart) {
        /* Elle repose, après un rebond minuscule. */
        const pose2 = tu - f.arrivee;
        m.position.set(f.repos.x, f.repos.y + bosse(pose2, 0, 0.2) * 0.045 * (1 - pose2 / 0.2), f.repos.z);
        m.rotation.set(0, f.lacet, 0);
        continue;
      }
      if (f.mode === 'portee') {
        m.visible = false;
        continue;
      }
      const q = tu - f.depart;
      if (q < SAUT_FEUILLE) {
        /* Elle saute du bac vers la prise, le nez en avant. */
        const p = q / SAUT_FEUILLE;
        const e = doux(p);
        m.position.set(melange(f.repos.x, X_CONDUIT_DEBUT, e), melange(f.repos.y, 0.066, e * e) + Math.sin(p * PI) * 0.34, melange(f.repos.z, Z_CONDUIT, e));
        m.rotation.set(0, f.lacet * (1 - e), -Math.sin(p * PI) * 0.5 + Math.sin(p * TOUR) * 0.2);
        continue;
      }
      /* Puis elle glisse, et rentre dans la dernière prise. */
      const s = q - SAUT_FEUILLE;
      const d = VITESSE * s;
      if (d >= LONGUEUR_CONDUIT) {
        m.visible = false;
        continue;
      }
      m.position.set(X_CONDUIT_DEBUT + d, 0.066 + bosse(s, 0, 0.16) * 0.05, Z_CONDUIT);
      m.rotation.set(0, 0, 0);
      m.scale.setScalar(Math.max(0.001, doux(borne((LONGUEUR_CONDUIT - d) / 0.42))));
    }

    /* ── La tasse et ses volutes ── */
    navette.mainG.getWorldPosition(lieuMain);
    lieuMain.y += 0.04;
    tasse.position.copy(POSE_TASSE).lerp(lieuMain, pose.tasse);
    tasse.position.y += Math.sin(pose.tasse * PI) * 0.1;
    tasse.rotation.set(0, pose.tasse * (pose.cap - 1.2), 0);
    vapeurs.forEach((v, i) => {
      const phase = (((t / 1.4 + i / 3) % 1) + 1) % 1;
      v.maille.position.set(tasse.position.x + Math.sin(phase * 5 + i * 2) * 0.035, tasse.position.y + 0.1 + phase * 0.42, tasse.position.z);
      v.maille.scale.setScalar(0.55 + phase * 0.9);
      v.matiere.opacity = Math.sin(phase * PI) * 0.42 * (1 - gorgee);
    });
  };

  /* ── Le rendu, le cadre, la boucle ── */
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* En développement, « ?t=10.3 » fige la scène à cet instant : c'est ce qui
     permet de relire la boucle image par image. Retiré de la version publiée. */
  const demande = import.meta.env.DEV ? new URLSearchParams(window.location.search).get('t') : null;
  const fige = reduit ? INSTANT_FIXE : demande !== null && Number.isFinite(Number(demande)) ? ((Number(demande) % T) + T) % T : null;

  let horloge = fige ?? OUVERTURE;
  let dernier = -1;
  let image = 0;
  let visible = true;
  let detruit = false;
  let pret = false;

  const tailler = () => {
    const l = racine.clientWidth;
    const h = racine.clientHeight;
    if (!l || !h) return false;
    /* Relue à chaque fois : une rotation d'écran change la densité utile. */
    rendu.setPixelRatio(densite());
    rendu.setSize(l, h, false);
    /* Le champ tient en entier, quel que soit le rapport du cadre. */
    const echelle = Math.max(CHAMP.large / l, CHAMP.haut / h);
    camera.left = (-l * echelle) / 2;
    camera.right = (l * echelle) / 2;
    camera.top = (h * echelle) / 2;
    camera.bottom = (-h * echelle) / 2;
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    placerEtiquettes();
    return true;
  };

  const dessiner = () => {
    maj(horloge % T);
    rendu.render(scene, camera);
    /* Posé une fois, et seulement si quelque chose a vraiment été dessiné :
       c'est ce drapeau qui fait apparaître la toile par-dessus le repli. */
    if (!pret && !rendu.getContext().isContextLost()) {
      pret = true;
      racine.dataset.pret = '';
    }
  };

  const boucle = (ms: number) => {
    image = 0;
    if (detruit) return;
    /* Le temps n'avance que pendant que la scène tourne : au retour à
       l'écran elle reprend où elle s'était arrêtée, sans saut. */
    if (dernier >= 0) horloge += Math.min(0.05, Math.max(0, (ms - dernier) / 1000));
    dernier = ms;
    dessiner();
    if (visible && !document.hidden) image = requestAnimationFrame(boucle);
  };
  const relancer = () => {
    if (detruit || fige !== null || image || !visible || document.hidden || !pret) return;
    dernier = -1;
    image = requestAnimationFrame(boucle);
  };

  const guetteur = new IntersectionObserver(
    (entrees) => {
      visible = entrees[entrees.length - 1].isIntersecting;
      relancer();
    },
    { threshold: 0.02 },
  );
  /* Changer la taille vide la toile : on redessine dans la foulée. */
  const mesureur = new ResizeObserver(() => {
    if (detruit) return;
    if (tailler()) dessiner();
  });

  /* Le contexte peut être repris par le système (onglet en arrière-plan sur
     téléphone, pilote graphique qui redémarre). La toile s'efface alors
     devant le dessin de repli, puis revient. */
  const surPerte = (e: Event) => {
    e.preventDefault();
    cancelAnimationFrame(image);
    image = 0;
    pret = false;
    delete racine.dataset.pret;
  };
  const surRetour = () => {
    if (detruit) return;
    dessiner();
    relancer();
  };
  document.addEventListener('visibilitychange', relancer);
  toile.addEventListener('webglcontextlost', surPerte);
  toile.addEventListener('webglcontextrestored', surRetour);

  tailler();
  dessiner();
  mesureur.observe(racine);
  guetteur.observe(racine);
  relancer();

  return () => {
    detruit = true;
    cancelAnimationFrame(image);
    mesureur.disconnect();
    guetteur.disconnect();
    document.removeEventListener('visibilitychange', relancer);
    toile.removeEventListener('webglcontextlost', surPerte);
    toile.removeEventListener('webglcontextrestored', surRetour);
    delete racine.dataset.pret;
    const matieres = new Set<Material>();
    const geometries = new Set<BufferGeometry>();
    scene.traverse((objet) => {
      if (objet instanceof Mesh) {
        geometries.add(objet.geometry);
        (Array.isArray(objet.material) ? objet.material : [objet.material]).forEach((m: Material) => matieres.add(m));
      } else if (objet instanceof Sprite) {
        matieres.add(objet.material);
      }
    });
    geometries.forEach((g) => g.dispose());
    matieres.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
    lampe.shadow.map?.dispose();
    lampe.dispose();
    const contexte = rendu.getContext();
    rendu.dispose();
    /* Le contexte est rendu tout de suite, sans attendre le ramasse-miettes :
       un navigateur n'en tient qu'un petit nombre à la fois. */
    contexte.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
