/*
 * terminal.ts — la scène « Le terminal » (proposition D, métier Automatisation).
 *
 * Un écran en mode texte, comme un outil de terminal : une grille de cellules
 * à chasse fixe, et dans cette grille un schéma dessiné en caractères. Un bon
 * de commande arrive par mail, il est lu, puis la commande et la facture se
 * créent seules. Personne ne tape rien : le compteur « ressaisies » reste à
 * zéro pendant que « commandes traitées » monte.
 *
 * Trois partis pris, qui expliquent la forme du code :
 *
 *   1. La scène est une fonction pure du temps. `composer(T)` remplit un
 *      tampon de cellules à partir de la seule horloge de scène : aucun état
 *      ne s'accumule. L'image fixe du mouvement réduit n'est donc qu'un appel
 *      à un instant choisi, et la boucle n'a pas de raccord : les bons se
 *      suivent sans fin, l'heure et les compteurs continuent.
 *
 *   2. Les caractères de bordure, les blocs et les grains ne viennent pas de
 *      la police : ils sont tracés à la règle, cellule par cellule, comme le
 *      font les émulateurs de terminal soignés. C'est ce qui garantit des
 *      traits jointifs (aucun trou entre deux `│`) et le même dessin sur
 *      toutes les machines. Seules les lettres passent par la police.
 *
 *   3. Le tampon ne contient que de vrais caractères. On pourrait l'imprimer
 *      tel quel dans un terminal : la chasse fixe est la matière de la scène,
 *      pas son costume.
 *
 * Le rendu s'arrête hors écran et dans un onglet masqué. Aucune dépendance.
 */

export interface OptionsTerminal {
  /** Force l'image fixe, quel que soit le réglage du système. Sert aux essais. */
  fige?: boolean;
  /**
   * Arrête l'horloge de scène à cet instant, en secondes, et dessine l'image
   * telle qu'elle serait en mouvement. Sert aux captures : on peut regarder
   * un grain au milieu de son fil sans courir après lui.
   */
  instant?: number;
}

type RVB = readonly [number, number, number];
type Famille = 'large' | 'moyen' | 'etroit';
/**
 * Un même `█` ne se dessine pas pareil partout : plein dans un grand chiffre,
 * à mi-hauteur dans une jauge, détaché de son voisin dans un graphe.
 */
type Bloc = 'plein' | 'jauge' | 'colonne';

interface Cellule {
  car: string;
  encre: string;
  /** Couleur de fond de la cellule : c'est la vidéo inverse. Vide : aucun. */
  fond: string;
  /** Halo de phosphore, de 0 à 1. */
  halo: number;
  gras: boolean;
  /** Comment tracer un caractère de bloc, selon ce qu'il compose. */
  bloc: Bloc;
}

interface Zone {
  c: number;
  r: number;
  l: number;
  h: number;
}

interface Boite {
  c: number;
  r: number;
  l: number;
  nom: string;
}

/** Une cellule de fil, avec le caractère qui la dessine. */
interface Maillon {
  c: number;
  r: number;
  car: string;
}

interface Plan {
  famille: Famille;
  cols: number;
  rangs: number;
  mail: Boite;
  /** Absente du schéma simple : la lecture se fait alors à la boîte MAIL. */
  lecture: Boite | null;
  commande: Boite;
  facture: Boite;
  entree: Maillon[];
  versCommande: Maillon[];
  versFacture: Maillon[];
  /** Les sorties de boîte : le bord devient un `├` pour que le fil s'y raccorde. */
  sorties: Maillon[];
  sousMail: { c: number; r: number };
  jauge: { c: number; r: number; l: number };
  colonneEtat: number;
  journal: Zone;
  compteurs: Zone | null;
  /** Rang de la ligne de compteurs, quand ils n'ont pas leur propre volet. */
  rangCompteurs: number;
}

/** La géométrie de la grille, en pixels de l'appareil. */
interface Trame {
  X: number[];
  Y: number[];
  taille: number;
  epaisseur: number;
  base: number;
}

const POLICE = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
/* Largeur d'un caractère rapportée au corps, pour les polices à chasse fixe
   courantes (Menlo, SF Mono, Consolas : entre 0,55 et 0,60). */
const CHASSE = 0.602;

const COMMANDE = 'relier mail commande facture';

/* ─── La partition ────────────────────────────────────────────────────────
   Une ouverture, jouée une seule fois : la commande se tape, le schéma se
   dessine d'un balayage. Puis des tours de douze secondes : un bon seul, lent
   assez pour être suivi, une rafale de trois, et un silence. */
const DEBUT_FRAPPE = 0.3;
const DUREE_FRAPPE = 1.0;
const ENTREE_COMMANDE = 1.42;
const DEBUT_BALAYAGE = 1.47;
const FIN_BALAYAGE = 2.12;
const LARGEUR_FRONT = 9;
const OUVERTURE = 2.2;
const TOUR = 12;
const DEPARTS = [0.4, 4.6, 5.7, 6.8];

/* Le trajet d'un bon, en secondes depuis l'arrivée du mail. */
const FIL_ENTREE = [0.1, 0.65] as const;
const DEBUT_LECTURE = 0.65;
/* Sans boîte LECTURE, la lecture commence dès l'arrivée : rien à parcourir avant. */
const DEBUT_LECTURE_SIMPLE = 0.25;
const A_LU = 1.45;
const A_COMMANDE = 2.35;
const DEPART_FACTURE = 1.75;
const A_FACTURE = 2.8;
/* Durée de rémanence d'un fil après le passage d'un grain. */
const TRAINE = 0.3;
const PAS_GRAPHE = 0.5;
/* L'instant de l'image fixe : la fin du premier tour, quand tout est retombé. */
const INSTANT_FIXE = OUVERTURE + 11;

/* Les bons qui défilent. Le premier reprend la scène d'accueil : 5 lignes,
   348,50 €. Sept valeurs pour quatre bons par tour : la suite ne se répète
   qu'au bout de sept tours. */
const BONS = [
  { lignes: 5, montant: '348,50' },
  { lignes: 3, montant: '129,00' },
  { lignes: 8, montant: '1 204,80' },
  { lignes: 4, montant: '512,30' },
  { lignes: 2, montant: '76,40' },
  { lignes: 6, montant: '893,10' },
  { lignes: 3, montant: '264,90' },
];

const HUITIEMES_GAUCHE = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
const HUITIEMES_BAS = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

/* Les grands chiffres : 3 points de large, 5 de haut. */
const CHIFFRES: Record<string, readonly string[]> = {
  '0': ['###', '#.#', '#.#', '#.#', '###'],
  '1': ['.#.', '##.', '.#.', '.#.', '###'],
  '2': ['###', '..#', '###', '#..', '###'],
  '3': ['###', '..#', '###', '..#', '###'],
  '4': ['#.#', '#.#', '###', '..#', '..#'],
  '5': ['###', '#..', '###', '..#', '###'],
  '6': ['###', '#..', '###', '#.#', '###'],
  '7': ['###', '..#', '..#', '..#', '..#'],
  '8': ['###', '#.#', '###', '#.#', '###'],
  '9': ['###', '#.#', '###', '..#', '###'],
};

/* Bras d'un caractère de bordure : haut 1, droite 2, bas 4, gauche 8. */
const BRAS: Record<string, number> = {
  '─': 10,
  '│': 5,
  '├': 7,
  '┤': 13,
  '┬': 14,
  '┴': 11,
  '┼': 15,
};
/* Les coins sont arrondis : le site n'a aucun angle vif. */
const COINS: Record<string, readonly [number, number]> = {
  '╭': [1, 1],
  '╮': [-1, 1],
  '╰': [1, -1],
  '╯': [-1, -1],
};

const borne = (t: number) => Math.min(1, Math.max(0, t));
/** Une extinction de phosphore : 1 à l'instant de l'événement, 0 après `duree`. */
const eclat = (age: number, duree: number) => (age < 0 || age >= duree ? 0 : (1 - age / duree) ** 2);
const deux = (n: number) => String(n).padStart(2, '0');

/** Combien de bons ont franchi l'étape située `delai` secondes après leur arrivée. */
function compte(t: number, delai: number): number {
  const x = t - delai - OUVERTURE;
  if (x < 0) return 0;
  const tours = Math.floor(x / TOUR);
  const reste = x - tours * TOUR;
  let n = tours * DEPARTS.length;
  for (const d of DEPARTS) if (d <= reste) n += 1;
  return n;
}

/** L'instant où le bon numéro `k` arrive par mail. */
function arrivee(k: number): number {
  return OUVERTURE + Math.floor(k / DEPARTS.length) * TOUR + (DEPARTS[k % DEPARTS.length] ?? 0);
}

function bonNumero(k: number) {
  const bon = BONS[k % BONS.length] ?? { lignes: 5, montant: '348,50' };
  return { ...bon, fichier: `bon-${String((412 + k) % 10000).padStart(4, '0')}.pdf` };
}

/** L'horloge affichée : la scène commence à 09:12:00 et avance en temps réel. */
function heure(t: number): string {
  const s = 9 * 3600 + 12 * 60 + Math.max(0, Math.floor(t));
  return `${deux(Math.floor(s / 3600) % 24)}:${deux(Math.floor(s / 60) % 60)}:${deux(s % 60)}`;
}

/** L'activité à un instant donné : chaque bon en cours y ajoute une bosse. */
function activite(t: number): number {
  let somme = 0;
  for (let k = Math.max(0, compte(t - A_FACTURE, 0)); k < compte(t, 0); k++) {
    somme += Math.sin(Math.PI * borne((t - arrivee(k)) / A_FACTURE));
  }
  return somme;
}

/* Les instants de frappe : un rythme un peu irrégulier, avec un temps après
   chaque mot, pour qu'on sente des doigts et pas un métronome. */
const FRAPPES: number[] = (() => {
  const cumul: number[] = [];
  let x = 0;
  for (let i = 0; i < COMMANDE.length; i++) {
    x += 1 + ((i * 7) % 5) * 0.22 + (COMMANDE[i - 1] === ' ' ? 1.6 : 0);
    cumul.push(x);
  }
  return cumul.map((v) => DEBUT_FRAPPE + (v / x) * DUREE_FRAPPE);
})();

function choisirGabarit(largeur: number): { famille: Famille; cols: number; rangs: number } {
  if (largeur >= 600) return { famille: 'large', cols: 76, rangs: 25 };
  if (largeur >= 420) return { famille: 'moyen', cols: 58, rangs: 21 };
  /* En dessous, moins de colonnes et un schéma à trois boîtes : mieux vaut
     moins de choses que des caractères illisibles. */
  return { famille: 'etroit', cols: 44, rangs: 16 };
}

/** Un fil horizontal de `n` cellules, terminé par une pointe de flèche. */
function filVers(c: number, r: number, n: number): Maillon[] {
  const fil: Maillon[] = [];
  for (let i = 0; i < n; i++) fil.push({ c: c + i, r, car: i === n - 1 ? '▶' : '─' });
  return fil;
}

function dresserPlan(famille: Famille, cols: number, rangs: number): Plan {
  const simple = famille === 'etroit';
  const marge = famille === 'large' ? 2 : 1;
  const largeurDe = (nom: string) => nom.length + 2 * marge + 2;
  const lMail = largeurDe('MAIL');
  const lLecture = largeurDe('LECTURE');
  const lSortie = largeurDe('COMMANDE');
  /* À droite des boîtes de sortie : un espace, puis « ✓ 123 ». */
  const lEtat = 6;
  const haut = famille === 'large' ? 3 : 2;

  let mail: Boite;
  let lecture: Boite | null = null;
  let commande: Boite;
  let facture: Boite;
  let entree: Maillon[] = [];
  let versCommande: Maillon[];
  let versFacture: Maillon[];
  let sousMail: Plan['sousMail'];
  let jauge: Plan['jauge'];
  let hauteurSchema: number;
  const sorties: Maillon[] = [];

  if (simple) {
    /* Trois boîtes : MAIL se divise vers COMMANDE et FACTURE.
     *
     *   ╭──────╮           ╭──────────╮
     *   │ MAIL ├─────┬────▶│ COMMANDE │ ✓ 12
     *   ╰──────╯     │     ╰──────────╯
     *                │     ╭──────────╮
     *                ╰────▶│ FACTURE  │ ✓ 12
     *                      ╰──────────╯
     */
    const fils = cols - (lMail + 1 + lSortie + lEtat);
    const nBranche = Math.max(4, Math.round(fils * 0.47));
    const nTronc = Math.max(3, fils - nBranche);
    const cJonction = lMail + nTronc;
    const cSortie = cJonction + nBranche + 1;
    mail = { c: 0, r: haut, l: lMail, nom: 'MAIL' };
    commande = { c: cSortie, r: haut, l: lSortie, nom: 'COMMANDE' };
    facture = { c: cSortie, r: haut + 3, l: lSortie, nom: 'FACTURE' };
    const tronc: Maillon[] = [];
    for (let i = 0; i < nTronc; i++) tronc.push({ c: lMail + i, r: haut + 1, car: '─' });
    tronc.push({ c: cJonction, r: haut + 1, car: '┬' });
    versCommande = [...tronc, ...filVers(cJonction + 1, haut + 1, nBranche)];
    versFacture = [
      ...tronc,
      { c: cJonction, r: haut + 2, car: '│' },
      { c: cJonction, r: haut + 3, car: '│' },
      { c: cJonction, r: haut + 4, car: '╰' },
      ...filVers(cJonction + 1, haut + 4, nBranche),
    ];
    sorties.push({ c: lMail - 1, r: haut + 1, car: '├' });
    sousMail = { c: 0, r: haut + 3 };
    jauge = { c: 0, r: haut + 4, l: 6 };
    hauteurSchema = 6;
  } else {
    /* Quatre boîtes : MAIL, LECTURE, puis un embranchement symétrique.
     *
     *                                  ╭──────────╮
     *                            ╭────▶│ COMMANDE │ ✓ 12
     *                            │     ╰──────────╯
     *   ╭──────╮     ╭─────────╮ │
     *   │ MAIL ├────▶│ LECTURE ├─┤
     *   ╰──────╯     ╰─────────╯ │
     *                            │     ╭──────────╮
     *                            ╰────▶│ FACTURE  │ ✓ 12
     *                                  ╰──────────╯
     */
    const fils = cols - (lMail + lLecture + 1 + lSortie + lEtat);
    const nEntree = Math.max(4, Math.round(fils * 0.38));
    const nBranche = Math.max(4, Math.round(fils * 0.34));
    const nTronc = Math.max(3, fils - nEntree - nBranche);
    const cLecture = lMail + nEntree;
    const cJonction = cLecture + lLecture + nTronc;
    const cSortie = cJonction + nBranche + 1;
    const axe = haut + 4;
    mail = { c: 0, r: axe - 1, l: lMail, nom: 'MAIL' };
    lecture = { c: cLecture, r: axe - 1, l: lLecture, nom: 'LECTURE' };
    commande = { c: cSortie, r: haut, l: lSortie, nom: 'COMMANDE' };
    facture = { c: cSortie, r: haut + 6, l: lSortie, nom: 'FACTURE' };
    entree = filVers(lMail, axe, nEntree);
    const tronc: Maillon[] = [];
    for (let i = 0; i < nTronc; i++) tronc.push({ c: cLecture + lLecture + i, r: axe, car: '─' });
    tronc.push({ c: cJonction, r: axe, car: '┤' });
    versCommande = [
      ...tronc,
      { c: cJonction, r: axe - 1, car: '│' },
      { c: cJonction, r: axe - 2, car: '│' },
      { c: cJonction, r: axe - 3, car: '╭' },
      ...filVers(cJonction + 1, axe - 3, nBranche),
    ];
    versFacture = [
      ...tronc,
      { c: cJonction, r: axe + 1, car: '│' },
      { c: cJonction, r: axe + 2, car: '│' },
      { c: cJonction, r: axe + 3, car: '╰' },
      ...filVers(cJonction + 1, axe + 3, nBranche),
    ];
    sorties.push({ c: lMail - 1, r: axe, car: '├' }, { c: cLecture + lLecture - 1, r: axe, car: '├' });
    sousMail = { c: marge - 1, r: axe + 2 };
    jauge = { c: cLecture + marge - 1, r: axe + 2, l: famille === 'large' ? 8 : 6 };
    hauteurSchema = 9;
  }

  const debutBas = haut + hauteurSchema + (famille === 'large' ? 2 : 1);
  const lCompteurs = 28;
  const journal: Zone =
    famille === 'large'
      ? { c: 0, r: debutBas, l: cols - lCompteurs - 1, h: rangs - debutBas }
      : { c: 0, r: debutBas, l: cols, h: rangs - debutBas - 1 };
  const compteurs: Zone | null =
    famille === 'large' ? { c: cols - lCompteurs, r: debutBas, l: lCompteurs, h: rangs - debutBas } : null;

  return {
    famille,
    cols,
    rangs,
    mail,
    lecture,
    commande,
    facture,
    entree,
    versCommande,
    versFacture,
    sorties,
    sousMail,
    jauge,
    colonneEtat: commande.c + lSortie + 1,
    journal,
    compteurs,
    rangCompteurs: rangs - 1,
  };
}

/**
 * Monte la scène sur la toile et rend la fonction qui la démonte.
 * Lève si le contexte 2D est indisponible : à l'appelant de le signaler.
 */
export function monterTerminal(toile: HTMLCanvasElement, options: OptionsTerminal = {}): () => void {
  const contexte = toile.getContext('2d');
  if (!contexte) throw new Error('terminal : contexte 2D indisponible');
  const ctx: CanvasRenderingContext2D = contexte;
  const hote = toile.parentElement ?? toile;

  /* ─── Les couleurs ──────────────────────────────────────────────────── */

  const style = getComputedStyle(toile);
  const sonde = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  /* Un jeton peut être écrit en hexadécimal, en rgb() ou en oklch() : on
     laisse le navigateur le résoudre en le peignant sur un pixel. Un jeton
     absent rend une chaîne vide : le repli est explicite. */
  const teinte = (nom: string, repli: RVB): RVB => {
    const valeur = style.getPropertyValue(nom).trim();
    if (!valeur || !sonde) {
      if (!valeur) console.warn(`terminal : jeton ${nom} absent, repli en dur`);
      return repli;
    }
    sonde.clearRect(0, 0, 1, 1);
    sonde.fillStyle = valeur;
    sonde.fillRect(0, 0, 1, 1);
    const [r = repli[0], v = repli[1], b = repli[2], a = 0] = sonde.getImageData(0, 0, 1, 1).data;
    return a === 255 ? [r, v, b] : repli;
  };
  const P = {
    nuit: teinte('--color-night-deep', [12, 18, 31]),
    vif: teinte('--color-ink', [255, 255, 255]),
    moyen: teinte('--color-ink-mid', [195, 201, 212]),
    bas: teinte('--color-ink-low', [163, 172, 187]),
    pale: teinte('--color-ink-faint', [124, 135, 153]),
    peche: teinte('--color-peche', [255, 179, 138]),
  };
  const css = ([r, v, b]: RVB, alpha = 1) => (alpha >= 1 ? `rgb(${r} ${v} ${b})` : `rgb(${r} ${v} ${b} / ${alpha.toFixed(3)})`);
  const meler = (a: RVB, b: RVB, t: number): RVB => {
    const k = borne(t);
    return [
      Math.round(a[0] + (b[0] - a[0]) * k),
      Math.round(a[1] + (b[1] - a[1]) * k),
      Math.round(a[2] + (b[2] - a[2]) * k),
    ];
  };
  /* Les traits du schéma et des volets restent en retrait : ce sont les
     grains et les états qui doivent accrocher l'œil. */
  const filet = meler(P.nuit, P.pale, 0.62);
  const sourd = meler(P.nuit, P.pale, 0.42);
  const C = {
    nuit: css(P.nuit),
    vif: css(P.vif),
    moyen: css(P.moyen),
    bas: css(P.bas),
    pale: css(P.pale),
    peche: css(P.peche),
    filet: css(filet),
    sourd: css(sourd),
    point: css(P.pale, 0.16),
  };

  /* ─── Le tampon de cellules ─────────────────────────────────────────── */

  let plan = dresserPlan('large', 76, 25);
  let grille: Cellule[] = [];
  let lueurs = new Float32Array(0);
  let trame: Trame = { X: [], Y: [], taille: 12, epaisseur: 1, base: 0 };

  const allouer = () => {
    grille = Array.from({ length: plan.cols * plan.rangs }, () => ({
      car: ' ',
      encre: C.moyen,
      fond: '',
      halo: 0,
      gras: false,
      bloc: 'plein' as Bloc,
    }));
    lueurs = new Float32Array(plan.cols * plan.rangs);
  };

  const cellule = (c: number, r: number): Cellule | undefined =>
    c >= 0 && c < plan.cols && r >= 0 && r < plan.rangs ? grille[r * plan.cols + c] : undefined;

  const poser = (
    c: number,
    r: number,
    car: string,
    encre: string,
    gras = false,
    halo = 0,
    bloc: Bloc = 'plein',
  ) => {
    const cel = cellule(c, r);
    if (!cel) return;
    cel.car = car;
    cel.encre = encre;
    cel.gras = gras;
    cel.halo = halo;
    cel.bloc = bloc;
  };

  /** Écrit un texte et rend la colonne qui suit son dernier caractère. */
  const ecrire = (c: number, r: number, texte: string, encre: string, gras = false, halo = 0): number => {
    let i = 0;
    for (const car of texte) poser(c + i++, r, car, encre, gras, halo);
    return c + i;
  };

  const cadre = (z: Zone, encre: string, titre?: string) => {
    for (let x = 1; x < z.l - 1; x++) {
      poser(z.c + x, z.r, '─', encre);
      poser(z.c + x, z.r + z.h - 1, '─', encre);
    }
    for (let y = 1; y < z.h - 1; y++) {
      poser(z.c, z.r + y, '│', encre);
      poser(z.c + z.l - 1, z.r + y, '│', encre);
    }
    poser(z.c, z.r, '╭', encre);
    poser(z.c + z.l - 1, z.r, '╮', encre);
    poser(z.c, z.r + z.h - 1, '╰', encre);
    poser(z.c + z.l - 1, z.r + z.h - 1, '╯', encre);
    if (titre) ecrire(z.c + 2, z.r, ` ${titre} `, C.bas);
  };

  /**
   * Un nombre en grands chiffres de 3 points sur 5. Une cellule est deux fois
   * plus haute que large : coupée en deux par les demi-blocs `▀` et `▄`, elle
   * donne deux points à peu près carrés. Trois rangs suffisent donc.
   */
  const chiffres = (c: number, r: number, nombre: string, encre: string, halo: number) => {
    let x = c;
    for (const chiffre of nombre) {
      const points = CHIFFRES[chiffre];
      if (!points) continue;
      for (let rang = 0; rang < 3; rang++) {
        for (let col = 0; col < 3; col++) {
          const dessus = points[rang * 2]?.[col] === '#';
          const dessous = points[rang * 2 + 1]?.[col] === '#';
          if (dessus || dessous) poser(x + col, r + rang, dessus ? (dessous ? '█' : '▀') : '▄', encre, false, halo);
        }
      }
      x += 4;
    }
  };

  /** Une boîte du schéma. `e` : son éclat, de 0 (au repos) à 1 (vidéo inverse). */
  const boite = (b: Boite, e: number) => {
    cadre({ c: b.c, r: b.r, l: b.l, h: 3 }, e > 0 ? css(meler(P.pale, P.peche, e)) : C.pale);
    const debut = b.c + 1 + Math.floor((b.l - 2 - b.nom.length) / 2);
    /* En vidéo inverse le fond passe à la pêche, et le texte à la nuit : sur
       la pêche, jamais de blanc. La bascule est franche, sans dégradé : un
       gris intermédiaire se perdrait dans le fond qui s'éteint. */
    ecrire(debut, b.r + 1, b.nom, e > 0.6 ? C.nuit : C.vif, true);
    if (e > 0.02) {
      const fond = css(P.peche, e);
      for (let x = 1; x < b.l - 1; x++) {
        const cel = cellule(b.c + x, b.r + 1);
        if (cel) cel.fond = fond;
      }
    }
  };

  /* ─── La composition d'une image ────────────────────────────────────── */

  const composer = (T: number, fige: boolean) => {
    for (const cel of grille) {
      cel.car = ' ';
      cel.fond = '';
      cel.halo = 0;
      cel.gras = false;
      cel.bloc = 'plein';
    }
    lueurs.fill(0);
    const p = plan;
    const simple = p.lecture === null;
    const debutLecture = simple ? DEBUT_LECTURE_SIMPLE : DEBUT_LECTURE;

    /* La ligne de commande. */
    let tape = COMMANDE.length;
    if (!fige) {
      tape = 0;
      for (const f of FRAPPES) if (f <= T) tape += 1;
    }
    const lance = fige || T >= ENTREE_COMMANDE;
    poser(0, 0, '$', C.peche, true);
    ecrire(2, 0, COMMANDE.slice(0, tape), C.vif);
    if (fige || T >= FIN_BALAYAGE) {
      const etat = p.famille === 'etroit' ? '● en marche' : `● en marche  ${heure(T)}`;
      const debut = p.cols - etat.length;
      /* Le voyant respire : c'est lui qui dit, même au repos, que ça tourne. */
      const souffle = fige ? 0.5 : 0.5 + 0.5 * Math.sin(T * 2.4);
      poser(debut, 0, '●', css(meler(P.pale, P.peche, 0.55 + 0.45 * souffle)), false, fige ? 0 : 0.25 + 0.45 * souffle);
      ecrire(debut + 2, 0, 'en marche', C.bas);
      if (p.famille !== 'etroit') ecrire(debut + 13, 0, heure(T), C.pale);
    }

    /* Où en sont les bons. */
    const dernier = compte(T, 0) - 1;
    let eMail = 0;
    let eLecture = 0;
    let eCommande = 0;
    let eFacture = 0;
    const tetes: { m: Maillon; grain: string }[] = [];

    /* Un grain parcourt un fil cellule par cellule. Chaque cellule traversée
       garde une rémanence qui s'éteint : c'est la traîne. */
    const parcourir = (chemin: Maillon[], t0: number, t1: number, grain: string) => {
      const pas = (t1 - t0) / chemin.length;
      for (const [etape, m] of chemin.entries()) {
        const age = T - (t0 + etape * pas);
        if (age < 0) break;
        const i = m.r * p.cols + m.c;
        lueurs[i] = Math.max(lueurs[i] ?? 0, eclat(age, TRAINE));
        /* La pointe de flèche reste une flèche : elle s'allume, sans plus. */
        if (age < pas && m.car !== '▶') tetes.push({ m, grain });
      }
    };

    for (let k = Math.max(0, dernier - 3); k <= dernier; k++) {
      const s = arrivee(k);
      const age = T - s;
      eMail = Math.max(eMail, eclat(age, 0.55));
      const lit = age >= debutLecture && age < A_LU ? 1 : eclat(age - A_LU, 0.5);
      if (simple) eMail = Math.max(eMail, lit);
      else eLecture = Math.max(eLecture, lit);
      eCommande = Math.max(eCommande, eclat(age - A_COMMANDE, 0.7));
      eFacture = Math.max(eFacture, eclat(age - A_FACTURE, 0.7));
      if (!simple) parcourir(p.entree, s + FIL_ENTREE[0], s + FIL_ENTREE[1], '●');
      parcourir(p.versCommande, s + A_LU, s + A_COMMANDE, '◆');
      parcourir(p.versFacture, s + DEPART_FACTURE, s + A_FACTURE, '▪');
    }

    /* Le schéma : les boîtes, puis les fils et leur rémanence, puis les grains. */
    boite(p.mail, eMail);
    if (p.lecture) boite(p.lecture, eLecture);
    boite(p.commande, eCommande);
    boite(p.facture, eFacture);
    const tracerFil = (m: Maillon) => {
      const e = lueurs[m.r * p.cols + m.c] ?? 0;
      poser(m.c, m.r, m.car, e > 0 ? css(meler(P.pale, P.peche, e)) : C.pale, false, m.car === '▶' ? e * 0.7 : 0);
    };
    p.entree.forEach(tracerFil);
    p.versCommande.forEach(tracerFil);
    p.versFacture.forEach(tracerFil);
    for (const m of p.sorties) {
      const actif = m.c === p.mail.c + p.mail.l - 1 ? eMail : eLecture;
      poser(m.c, m.r, m.car, actif > 0 ? css(meler(P.pale, P.peche, actif)) : C.pale);
    }
    for (const { m, grain } of tetes) poser(m.c, m.r, grain, C.peche, false, 1);

    /* Sous MAIL : la pièce jointe qui vient d'arriver. */
    if (dernier >= 0) {
      const e = eclat(T - arrivee(dernier), 0.7);
      ecrire(p.sousMail.c, p.sousMail.r, bonNumero(dernier).fichier, css(meler(P.pale, P.vif, e)));
    }

    /* La jauge de lecture : le bon se lit ligne à ligne. */
    const enLecture = compte(T, debutLecture) - 1;
    const long = p.famille === 'large' ? ' lignes' : '';
    if (enLecture < 0) {
      ecrire(p.jauge.c, p.jauge.r, '·'.repeat(p.jauge.l), C.sourd);
    } else {
      const bon = bonNumero(enLecture);
      const avance = (T - arrivee(enLecture) - debutLecture) / (A_LU - debutLecture);
      if (avance < 1) {
        const huitiemes = Math.floor(avance * p.jauge.l * 8);
        for (let x = 0; x < p.jauge.l; x++) {
          const part = Math.min(8, Math.max(0, huitiemes - x * 8));
          if (part > 0) poser(p.jauge.c + x, p.jauge.r, HUITIEMES_GAUCHE[part] ?? '█', C.peche, false, 0, 'jauge');
          else poser(p.jauge.c + x, p.jauge.r, '·', C.sourd);
        }
        const lues = Math.min(bon.lignes, Math.floor(avance * bon.lignes) + 1);
        ecrire(p.jauge.c + p.jauge.l + 1, p.jauge.r, `${lues}/${bon.lignes}${long}`, C.vif);
      } else {
        for (let x = 0; x < p.jauge.l; x++) poser(p.jauge.c + x, p.jauge.r, '█', C.sourd, false, 0, 'jauge');
        const e = eclat(T - arrivee(enLecture) - A_LU, 0.8);
        poser(p.jauge.c + p.jauge.l + 1, p.jauge.r, '✓', C.peche, false, e * 0.8);
        ecrire(p.jauge.c + p.jauge.l + 3, p.jauge.r, `${bon.lignes}${long}`, C.bas);
      }
    }

    /* À droite des sorties : ce qui a été créé, sans personne. */
    const etatSortie = (b: Boite, n: number, e: number) => {
      poser(p.colonneEtat, b.r + 1, '✓', n > 0 ? C.peche : C.sourd, false, e * 0.8);
      ecrire(p.colonneEtat + 2, b.r + 1, String(n), n > 0 ? css(meler(P.vif, P.peche, e)) : C.pale, true);
    };
    const creees = compte(T, A_COMMANDE);
    const emises = compte(T, A_FACTURE);
    etatSortie(p.commande, creees, eCommande);
    etatSortie(p.facture, emises, eFacture);

    /* Le journal. Les lignes sont déduites de l'heure : on rassemble les
       derniers événements, on les trie, on garde ce qui tient dans le volet. */
    const j = p.journal;
    cadre(j, C.filet, 'journal');
    const places = j.h - 3;
    const lignes: { t: number; texte: string; somme: string }[] = [];
    for (let k = Math.max(0, dernier - 5); k <= dernier; k++) {
      const s = arrivee(k);
      const bon = bonNumero(k);
      if (T >= s + A_LU) lignes.push({ t: s + A_LU, texte: `bon de commande lu · ${bon.lignes} lignes`, somme: '' });
      if (T >= s + A_COMMANDE) lignes.push({ t: s + A_COMMANDE, texte: 'commande créée', somme: '' });
      if (T >= s + A_FACTURE) {
        lignes.push({ t: s + A_FACTURE, texte: 'facture émise · ', somme: `${bon.montant} €` });
      }
    }
    lignes.sort((a, b) => a.t - b.t);
    const vues = lignes.slice(-places);
    for (const [i, ligne] of vues.entries()) {
      const r = j.r + 1 + i;
      const age = T - ligne.t;
      const frais = fige ? 0 : eclat(age, 0.9);
      /* La ligne s'imprime d'un trait, de gauche à droite, à l'instant exact
         où le grain touche sa boîte. */
      const entier = 11 + ligne.texte.length + ligne.somme.length;
      const visibles = fige ? entier : Math.floor((age / 0.16) * entier) + 1;
      const largeur = j.l - 4;
      const depuis = j.c + 2;
      const limite = depuis + Math.min(visibles, largeur);
      const borner = (c: number, texte: string) => texte.slice(0, Math.max(0, limite - c));
      ecrire(depuis, r, borner(depuis, heure(ligne.t)), C.pale);
      if (depuis + 9 < limite) poser(depuis + 9, r, '✓', C.peche, false, frais * 0.8);
      const apres = ecrire(depuis + 11, r, borner(depuis + 11, ligne.texte), css(meler(P.moyen, P.vif, frais)));
      if (ligne.somme) ecrire(apres, r, borner(apres, ligne.somme), C.vif);
    }

    /* Les compteurs. */
    const eTraite = eFacture;
    if (p.compteurs) {
      const z = p.compteurs;
      cadre(z, C.filet, 'commandes');
      const gauche = z.c + 2;
      const droite = z.c + z.l - 3;
      /* Deux grands nombres, en demi-blocs, comme une horloge de terminal.
         À gauche celui qui monte ; à droite le zéro, en pêche : c'est lui, le
         résultat. Il s'allume à chaque commande traitée, pour rappeler qu'il
         n'a pas bougé. */
      const traitees = String(emises);
      ecrire(gauche, z.r + 1, 'traitées', C.moyen);
      ecrire(droite - 9, z.r + 1, 'ressaisies', C.moyen);
      chiffres(gauche, z.r + 2, traitees, css(meler(P.moyen, P.peche, eTraite)), eTraite * 0.22);
      chiffres(droite - 2, z.r + 2, '0', C.peche, eTraite * 0.28);

      /* Le graphe d'activité : une colonne par demi-seconde, la plus récente
         à droite, en pêche ; les plus anciennes pâlissent. */
      const hautGraphe = z.r + 7;
      const basGraphe = z.r + z.h - 3;
      const rangsGraphe = basGraphe - hautGraphe + 1;
      ecrire(gauche, z.r + 6, 'activité', C.moyen);
      if (rangsGraphe > 0) {
        const colonnes = droite - gauche + 1;
        const instant = Math.floor(T / PAS_GRAPHE) * PAS_GRAPHE;
        for (let x = 0; x < colonnes; x++) {
          const recul = colonnes - 1 - x;
          const niveau = 1 + Math.round(borne(activite(instant - recul * PAS_GRAPHE) / 2.1) * (rangsGraphe * 8 - 2));
          const encre = css(meler(sourd, P.peche, (1 - recul / colonnes) ** 2.2));
          for (let y = 0; y < rangsGraphe; y++) {
            const part = Math.min(8, Math.max(0, niveau - y * 8));
            if (part > 0) poser(gauche + x, basGraphe - y, HUITIEMES_BAS[part] ?? '█', encre, false, 0, 'colonne');
          }
        }
        ecrire(gauche, z.r + z.h - 2, '−12 s', C.sourd);
        ecrire(droite - 9, z.r + z.h - 2, 'maintenant', C.sourd);
      }
    } else {
      const r = p.rangCompteurs;
      const fin = ecrire(1, r, 'commandes traitées ', C.moyen);
      ecrire(fin, r, String(emises), css(meler(P.vif, P.peche, eTraite)), true, eTraite * 0.6);
      ecrire(p.cols - 13, r, 'ressaisies ', C.moyen);
      poser(p.cols - 2, r, '0', C.peche, true, eTraite * 0.7);
    }

    /* Le balayage d'ouverture : le schéma se dessine de gauche à droite,
       avec un front de pêche qui retombe derrière lui. */
    if (!fige && T < FIN_BALAYAGE + 0.3) {
      const front = ((T - DEBUT_BALAYAGE) / (FIN_BALAYAGE - DEBUT_BALAYAGE)) * (p.cols + LARGEUR_FRONT);
      for (let r = 1; r < p.rangs; r++) {
        for (let c = 0; c < p.cols; c++) {
          const cel = grille[r * p.cols + c];
          if (!cel) continue;
          const retard = front - c;
          if (retard < 0) {
            cel.car = ' ';
            cel.fond = '';
            cel.halo = 0;
          } else if (retard < LARGEUR_FRONT && cel.car !== ' ') {
            cel.encre = css(meler(P.pale, P.peche, 1 - retard / LARGEUR_FRONT));
          }
        }
      }
    }

    /* Le curseur : une cellule en vidéo inverse. Il attend d'abord la
       commande, puis se pose au bout du journal, là où tombera la prochaine
       ligne. Personne n'y tape : c'est tout le propos. */
    const dernierEcrit = vues.length > 0 ? (vues[vues.length - 1]?.t ?? 0) : ENTREE_COMMANDE;
    const frappe = !lance && tape > 0;
    const allume = fige || frappe || T - dernierEcrit < 0.45 || (T * 1000) % 1060 < 530;
    if (allume) {
      const cel = lance ? (T >= DEBUT_BALAYAGE || fige ? cellule(j.c + 2, j.r + 1 + vues.length) : undefined) : cellule(2 + tape, 0);
      if (cel) {
        cel.fond = C.peche;
        cel.car = ' ';
      }
    }
  };

  /* ─── Le rendu ──────────────────────────────────────────────────────── */

  /** Trace à la règle les caractères qui ne doivent rien à la police. Rend faux s'il faut la police. */
  const tracer = (cel: Cellule, x0: number, y0: number, x1: number, y1: number): boolean => {
    const car = cel.car;
    const ep = trame.epaisseur;
    const l = x1 - x0;
    const h = y1 - y0;
    /* Le coin haut gauche du croisement des traits : même colonne, même x ;
       même rang, même y. C'est ce qui rend les traits jointifs. */
    const mx = x0 + Math.floor((l - ep) / 2);
    const my = y0 + Math.floor((h - ep) / 2);
    const cx = mx + ep / 2;
    const cy = my + ep / 2;

    const bras = BRAS[car];
    if (bras !== undefined) {
      if (bras & 1) ctx.fillRect(mx, y0, ep, my + ep - y0);
      if (bras & 2) ctx.fillRect(mx, my, x1 - mx, ep);
      if (bras & 4) ctx.fillRect(mx, my, ep, y1 - my);
      if (bras & 8) ctx.fillRect(x0, my, mx + ep - x0, ep);
      return true;
    }

    const coin = COINS[car];
    if (coin) {
      const [dx, dy] = coin;
      const bordX = dx > 0 ? x1 : x0;
      const bordY = dy > 0 ? y1 : y0;
      const rayon = Math.min(Math.abs(bordX - cx), Math.abs(bordY - cy));
      ctx.lineWidth = ep;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.moveTo(cx, bordY);
      ctx.lineTo(cx, cy + dy * rayon);
      ctx.arcTo(cx, cy, cx + dx * rayon, cy, rayon);
      ctx.lineTo(bordX, cy);
      ctx.stroke();
      return true;
    }

    switch (car) {
      case '▶': {
        const demi = Math.min(h * 0.24, l * 0.6);
        ctx.beginPath();
        ctx.moveTo(x0, cy - demi);
        ctx.lineTo(x1 - ep, cy);
        ctx.lineTo(x0, cy + demi);
        ctx.closePath();
        ctx.fill();
        return true;
      }
      case '●': {
        ctx.beginPath();
        ctx.arc(x0 + l / 2, cy, l * 0.42, 0, Math.PI * 2);
        ctx.fill();
        return true;
      }
      case '◆': {
        const mi = x0 + l / 2;
        ctx.beginPath();
        ctx.moveTo(mi, cy - l * 0.66);
        ctx.lineTo(mi + l * 0.5, cy);
        ctx.lineTo(mi, cy + l * 0.66);
        ctx.lineTo(mi - l * 0.5, cy);
        ctx.closePath();
        ctx.fill();
        return true;
      }
      case '▪': {
        const cote = Math.max(2, Math.round(l * 0.72));
        ctx.fillRect(Math.round(x0 + (l - cote) / 2), Math.round(cy - cote / 2), cote, cote);
        return true;
      }
      case '✓': {
        ctx.lineWidth = ep * 1.3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(x0 + l * 0.08, cy + l * 0.04);
        ctx.lineTo(x0 + l * 0.4, cy + l * 0.4);
        ctx.lineTo(x0 + l * 0.96, cy - l * 0.46);
        ctx.stroke();
        return true;
      }
      default:
    }

    /* Les blocs. Dans un graphe, un filet de nuit sépare deux colonnes : on
       lit des barres, pas un aplat. */
    const large = cel.bloc === 'colonne' ? l - ep : l;
    if (car === '▀') {
      ctx.fillRect(x0, y0, large, Math.round(h / 2));
      return true;
    }
    const bas = HUITIEMES_BAS.indexOf(car);
    if (bas > 0 && (bas < 8 || cel.bloc !== 'jauge')) {
      const haut = bas === 4 ? h - Math.round(h / 2) : Math.round((h * bas) / 8);
      ctx.fillRect(x0, y1 - haut, large, haut);
      return true;
    }
    const gauche = HUITIEMES_GAUCHE.indexOf(car);
    if (gauche > 0) {
      const haut = cel.bloc === 'jauge' ? Math.round(h * 0.46) : h;
      ctx.fillRect(x0, y0 + Math.round((h - haut) / 2), Math.round((l * gauche) / 8), haut);
      return true;
    }
    return false;
  };

  const peindre = (T: number, fige: boolean) => {
    const { X, Y, taille, base } = trame;
    const { cols, rangs } = plan;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, toile.width, toile.height);
    ctx.shadowBlur = 0;

    /* La matrice des cellules, à peine visible : un point à chaque coin. Elle
       dit que tout ce qui suit est posé sur une grille de caractères. */
    ctx.fillStyle = C.point;
    const grain = Math.max(1, Math.round(trame.epaisseur * 0.6));
    for (let r = 0; r <= rangs; r++) {
      for (let c = 0; c <= cols; c++) ctx.fillRect((X[c] ?? 0) - grain / 2, (Y[r] ?? 0) - grain / 2, grain, grain);
    }

    for (let r = 0; r < rangs; r++) {
      for (let c = 0; c < cols; c++) {
        const cel = grille[r * cols + c];
        if (!cel?.fond) continue;
        ctx.fillStyle = cel.fond;
        ctx.fillRect(X[c] ?? 0, Y[r] ?? 0, (X[c + 1] ?? 0) - (X[c] ?? 0), (Y[r + 1] ?? 0) - (Y[r] ?? 0));
      }
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    /* Trois passes, pour ne changer ni de police ni d'ombre à chaque
       cellule : le maigre, le gras, puis ce qui porte un halo. */
    for (let passe = 0; passe < 3; passe++) {
      const halo = passe === 2;
      let gras = passe === 1;
      ctx.font = `${gras ? 700 : 400} ${taille}px ${POLICE}`;
      ctx.shadowBlur = 0;
      let encre = '';
      for (let r = 0; r < rangs; r++) {
        for (let c = 0; c < cols; c++) {
          const cel = grille[r * cols + c];
          if (!cel || cel.car === ' ') continue;
          if (halo ? cel.halo <= 0 : cel.halo > 0 || cel.gras !== gras) continue;
          if (cel.encre !== encre) {
            encre = cel.encre;
            ctx.fillStyle = encre;
            ctx.strokeStyle = encre;
          }
          if (halo) {
            if (cel.gras !== gras) {
              gras = cel.gras;
              ctx.font = `${gras ? 700 : 400} ${taille}px ${POLICE}`;
            }
            ctx.shadowColor = C.peche;
            ctx.shadowBlur = cel.halo * taille * 1.1;
          }
          const x0 = X[c] ?? 0;
          const x1 = X[c + 1] ?? x0;
          const y0 = Y[r] ?? 0;
          const y1 = Y[r + 1] ?? y0;
          if (!tracer(cel, x0, y0, x1, y1)) ctx.fillText(cel.car, (x0 + x1) / 2, y0 + base);
          /* Un grain en pleine course est repassé une fois : son halo double. */
          if (halo && cel.halo >= 1) tracer(cel, x0, y0, x1, y1);
        }
      }
    }
    ctx.shadowBlur = 0;

    /* Une touche de phosphore, très discrète : une bande de lumière qui
       descend lentement l'écran. Pas en image fixe. */
    if (!fige) {
      const haut = toile.height;
      const bande = haut * 0.34;
      const y = ((T % 8) / 8) * (haut + bande) - bande;
      const degrade = ctx.createLinearGradient(0, y, 0, y + bande);
      degrade.addColorStop(0, css(P.vif, 0));
      degrade.addColorStop(0.5, css(P.vif, 0.028));
      degrade.addColorStop(1, css(P.vif, 0));
      ctx.fillStyle = degrade;
      ctx.fillRect(0, y, toile.width, bande);
    }
  };

  /* ─── La grille suit la taille du cadre ─────────────────────────────── */

  let T = options.instant ?? 0;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)');
  const arrete = options.instant !== undefined;
  const immobile = () => !arrete && (options.fige === true || reduit.matches);

  const dessiner = () => {
    if (grille.length === 0) return;
    const fige = immobile();
    const instant = fige ? INSTANT_FIXE : T;
    composer(instant, fige);
    peindre(instant, fige);
  };

  const ajuster = () => {
    /* La taille de mise en page, pas celle à l'écran : un cadre qui entre en
       scène avec une mise à l'échelle ne doit pas changer de gabarit en route. */
    const largeur = hote.clientWidth;
    const hauteur = hote.clientHeight;
    if (largeur < 8 || hauteur < 8) return;
    /* Au-delà de trois, la densité ne se voit plus et la toile coûte cher. */
    const densite = Math.min(3, window.devicePixelRatio || 1);
    const large = Math.round(largeur * densite);
    const haut = Math.round(hauteur * densite);
    const gabarit = choisirGabarit(largeur);
    const change = gabarit.cols !== plan.cols || gabarit.rangs !== plan.rangs || grille.length === 0;
    if (!change && large === toile.width && haut === toile.height) return;
    toile.width = large;
    toile.height = haut;
    if (change) {
      plan = dresserPlan(gabarit.famille, gabarit.cols, gabarit.rangs);
      allouer();
    }

    const marge = Math.min(22, Math.max(10, largeur * 0.03)) * densite;
    /* La cellule est au moins 1,9 fois plus haute que large (un interligne de
       1,15) et au plus 2,5 fois : hors d'un cadre 4:3, la grille se centre
       plutôt que de s'étirer. */
    const lc = Math.min((large - 2 * marge) / plan.cols, (haut - 2 * marge) / plan.rangs / 1.9);
    const hc = Math.min((haut - 2 * marge) / plan.rangs, lc * 2.5);
    const ox = (large - lc * plan.cols) / 2;
    const oy = (haut - hc * plan.rangs) / 2;
    /* Chaque arête est arrondie au pixel de l'appareil : les traits restent
       nets, et deux cellules voisines partagent exactement la même arête. */
    const X = Array.from({ length: plan.cols + 1 }, (_, i) => Math.round(ox + i * lc));
    const Y = Array.from({ length: plan.rangs + 1 }, (_, i) => Math.round(oy + i * hc));
    const taille = Math.min(lc / CHASSE, hc / 1.18);
    ctx.font = `400 ${taille}px ${POLICE}`;
    const capitale = ctx.measureText('H').actualBoundingBoxAscent || taille * 0.72;
    trame = {
      X,
      Y,
      taille,
      /* Le trait suit la graisse de la police, pour que bordures et lettres
         aient l'air de sortir de la même plume. */
      epaisseur: Math.max(1, Math.round(taille * 0.085)),
      base: Math.round((hc + capitale) / 2),
    };
    dessiner();
  };

  /* ─── La boucle ─────────────────────────────────────────────────────── */

  let visible = false;
  let image = 0;
  let dernierTic = 0;

  const enMarche = () => visible && !document.hidden && !immobile() && !arrete;

  const tic = (maintenant: number) => {
    image = 0;
    if (!enMarche()) return;
    /* Après une pause (onglet masqué, scène hors écran), l'horloge reprend
       où elle s'était arrêtée : un pas trop long est ramené à une image. */
    T += Math.min(0.1, Math.max(0, (maintenant - dernierTic) / 1000));
    dernierTic = maintenant;
    dessiner();
    image = requestAnimationFrame(tic);
  };

  const planifier = () => {
    if (immobile()) {
      if (image) cancelAnimationFrame(image);
      image = 0;
      dessiner();
      return;
    }
    if (enMarche() && !image) {
      dernierTic = performance.now();
      image = requestAnimationFrame(tic);
    }
  };

  const tailles = new ResizeObserver(ajuster);
  tailles.observe(hote);
  /* Un zoom du navigateur change la densité sans changer la taille du cadre :
     l'observateur ne dit rien, la fenêtre si. */
  window.addEventListener('resize', ajuster);
  const vue = new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) visible = entree.isIntersecting;
      planifier();
    },
    { threshold: 0.15 },
  );
  vue.observe(hote);
  document.addEventListener('visibilitychange', planifier);
  /* `addEventListener` manque sur cet objet avant Safari 14 : sans lui, la
     scène garde simplement le régime de son chargement. */
  reduit.addEventListener?.('change', planifier);

  ajuster();

  return () => {
    if (image) cancelAnimationFrame(image);
    image = 0;
    tailles.disconnect();
    vue.disconnect();
    window.removeEventListener('resize', ajuster);
    document.removeEventListener('visibilitychange', planifier);
    reduit.removeEventListener?.('change', planifier);
  };
}
