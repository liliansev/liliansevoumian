/*
 * plateau.ts — « Le plateau », proposition B pour le métier Automatisation.
 *
 * Un plateau de laque sombre vu de dessus, à peine incliné, où les outils
 * font le travail sans personne. La phrase à faire comprendre : « Je relie
 * vos outils, et les ressaisies disparaissent. » Elle se joue en trois temps
 * sur une boucle de douze secondes et demie :
 *
 *   l'attente   rien n'est relié. Les jetons sortent de la touche Mail et
 *               s'entassent contre une butée, rainures éteintes ;
 *   le lien     les rainures s'allument une à une, la butée s'efface ;
 *   la marche   chaque jeton passe sous le portique qui lit le bon de
 *               commande, se dédouble au bec de l'aiguillage, puis va
 *               enfoncer la touche Commande (le compteur tourne) et la
 *               touche Facture (le tampon s'abat). Trois passages, de plus
 *               en plus serrés, puis la machine s'éteint et recommence.
 *
 * Les outils sont des touches : une touche qui s'enfonce toute seule, c'est
 * exactement une ressaisie qui disparaît.
 *
 * Toute la scène est une fonction du temps : la même image revient à chaque
 * tour, il n'y a rien à remettre à zéro, et l'image fixe du mouvement réduit
 * n'est qu'un instant choisi de la boucle. Seul le compteur avance d'un tour
 * sur l'autre.
 *
 * Three.js n'arrive qu'avec ce module, chargé à la demande par le composant.
 * Le rendu s'arrête hors écran et dans un onglet masqué.
 */
import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  ClampToEdgeWrapping,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  NoColorSpace,
  OrthographicCamera,
  Path,
  PCFShadowMap,
  Plane,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  RepeatWrapping,
  Scene,
  ShadowMaterial,
  Shape,
  SRGBColorSpace,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';

/** Un point du plan du plateau : x vers la droite, z vers le bas de l'écran. */
interface Pt {
  x: number;
  z: number;
}

/* ── Les cotes du plateau (le dessus de la laque est à la hauteur zéro) ── */
const DEMI_X = 4.8;
const DEMI_Z = 3.85;
const CREUX = 0.12;
const DEMI_RAINURE = 0.17;
const VIRAGE = 0.5;
const X_MAIL = -3.4;
const X_LECTEUR = -0.75;
const X_NOEUD = 1.15;
const X_SORTIE = 3.4;
const Z_BRANCHE = 2.1;
/** Les rainures commencent et finissent sous les touches. */
const X_DEBUT = X_MAIL + 0.3;
const X_FIN = X_SORTIE - 0.3;
const DEMI_TOUCHE = 0.8;
const EPAISSEUR_TOUCHE = 0.3;
/** Le jour sous une touche au repos : c'est sa course. */
const GARDE = 0.06;
const COURSE = 0.046;
/** La file d'attente devant Mail : première place, puis un pas par jeton. */
const X_FILE = -1.97;
const PAS_FILE = 0.28;
const X_BUTEE = X_FILE + 0.17;
const X_CACHE = X_MAIL + 0.25;
/** Le portique balaie la feuille de gauche à droite, comme on lit. */
const X_REPOS = X_LECTEUR - 0.72;
const X_BOUT = X_LECTEUR + 0.72;
/** Au repos le tampon est relevé au-delà de la verticale : il montre sa semelle. */
const REPOS_TAMPON = (105 * Math.PI) / 180;

/* ── La chronologie d'un tour ── */
const DUREE = 12.5;
/** L'instant montré en mouvement réduit : tout est relié, les jetons sont en route. */
const IMAGE_FIXE = 6.9;
const COMPTE_DEPART = 27;

interface Passage {
  /** Le jeton sort de Mail. */
  emission: number;
  /** La butée le laisse partir. */
  depart: number;
  aller: number;
  /** Le portique commence à lire. */
  lecture: number;
  dureeLecture: number;
  /** Le jeton ressort du lecteur. */
  sortie: number;
  trajet: number;
}

/* Trois passages : le premier prend son temps pour qu'on suive chaque étape,
   les suivants se resserrent. Les arrivées tombent à intervalle régulier
   (7,15 s, 8,6 s, 10 s) : c'est le battement de la machine. */
const PASSAGES: Passage[] = [
  { emission: 0.2, depart: 4.1, aller: 0.7, lecture: 4.85, dureeLecture: 0.9, sortie: 5.8, trajet: 1.35 },
  { emission: 0.7, depart: 6.0, aller: 0.6, lecture: 6.65, dureeLecture: 0.7, sortie: 7.45, trajet: 1.15 },
  { emission: 1.2, depart: 7.75, aller: 0.55, lecture: 8.35, dureeLecture: 0.55, sortie: 8.95, trajet: 1.05 },
];
const arriveeDe = (p: Passage) => p.sortie + p.trajet;
/** Le tampon touche la facture un peu après l'arrivée du jeton. */
const impactDe = (p: Passage) => arriveeDe(p) + 0.24;
const LIEN = { mail: 2.1, lecteur: 2.75, haut: 3.1, bas: 3.4, butee: 3.95 };
const EXTINCTION = 11.1;

/* ── Les courbes ── */
const borne = (t: number) => Math.min(1, Math.max(0, t));
const adoucir = (t: number) => {
  const u = borne(t);
  return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
};
const doux = (t: number) => {
  const u = borne(t);
  return u * u * (3 - 2 * u);
};
const sortir = (t: number) => 1 - Math.pow(1 - borne(t), 3);
const rebond = (t: number) => {
  const u = borne(t);
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2);
};
const lisse = (a: number, b: number, x: number) => doux((x - a) / (b - a));
const cloche = (ecart: number, largeur: number) => Math.exp(-(ecart * ecart) / (largeur * largeur));
/** Un éclat : plein d'un coup, puis qui retombe. */
const eclat = (t: number, depuis: number, duree: number) => (t < depuis ? 0 : Math.exp(-(t - depuis) / duree));
/** Une touche qu'on enfonce : descente sèche, tenue, puis remontée avec un léger dépassement. */
const appui = (t: number, depuis: number) => {
  const d = t - depuis;
  if (d <= 0 || d >= 0.62) return 0;
  if (d < 0.08) return sortir(d / 0.08);
  if (d < 0.2) return 1;
  return 1 - rebond((d - 0.2) / 0.42);
};
/** Le tampon : il tombe en accélérant, marque, puis se relève sans hâte. */
const frappe = (t: number, arrivee: number) => {
  const d = t - arrivee - 0.05;
  if (d <= 0 || d >= 0.95) return 0;
  if (d < 0.19) return Math.pow(d / 0.19, 2.4);
  if (d < 0.29) return 1;
  return 1 - adoucir((d - 0.29) / 0.66);
};
/** L'allure d'un jeton entre le lecteur et sa touche : lancé, puis qui arrive encore vif. */
const allure = (t: number) => {
  const u = borne(t);
  return 0.35 * u + 0.65 * doux(u);
};

/* ── Le tracé ── */
const rad = (deg: number) => (deg * Math.PI) / 180;
const arc = (cx: number, cz: number, rayon: number, de: number, a: number, pas = 12): Pt[] =>
  Array.from({ length: pas + 1 }, (_, i) => {
    const angle = rad(de + ((a - de) * i) / pas);
    return { x: cx + rayon * Math.cos(angle), z: cz + rayon * Math.sin(angle) };
  });
const miroir = (pts: Pt[]): Pt[] => pts.map((p) => ({ x: p.x, z: -p.z }));

/** Le contour d'un rectangle aux coins arrondis, centré. */
const contourArrondi = (demiX: number, demiZ: number, rayon: number, pas = 10): Pt[] => [
  ...arc(demiX - rayon, -demiZ + rayon, rayon, -90, 0, pas),
  ...arc(demiX - rayon, demiZ - rayon, rayon, 0, 90, pas),
  ...arc(-demiX + rayon, demiZ - rayon, rayon, 90, 180, pas),
  ...arc(-demiX + rayon, -demiZ + rayon, rayon, 180, 270, pas),
];

/* Les deux virages d'une branche : on quitte la ligne droite vers le haut,
   puis on repart vers la droite jusqu'à la touche. */
const C1 = { x: X_NOEUD - VIRAGE, z: -VIRAGE };
const C2 = { x: X_NOEUD + VIRAGE, z: -Z_BRANCHE + VIRAGE };
const brancheHaute = (jusque: number): Pt[] => [
  ...arc(C1.x, C1.z, VIRAGE, 90, 0),
  ...arc(C2.x, C2.z, VIRAGE, 180, 270),
  { x: jusque, z: -Z_BRANCHE },
];

/**
 * Le contour de la rainure, d'un seul tenant : une fourche. Les deux branches
 * se séparent sur un bec, comme un aiguillage ; c'est là que le jeton se
 * dédouble. La moitié basse est le miroir de la moitié haute.
 */
const contourRainure = (): Pt[] => {
  const h = DEMI_RAINURE;
  const angleBec = (Math.asin(VIRAGE / (VIRAGE + h)) * 180) / Math.PI;
  const haut: Pt[] = [
    { x: X_DEBUT, z: -h },
    ...arc(C1.x, C1.z, VIRAGE - h, 90, 0),
    ...arc(C2.x, C2.z, VIRAGE + h, 180, 270),
    { x: X_FIN, z: -Z_BRANCHE - h },
    { x: X_FIN, z: -Z_BRANCHE + h },
    ...arc(C2.x, C2.z, VIRAGE - h, 270, 180),
    ...arc(C1.x, C1.z, VIRAGE + h, 0, angleBec),
  ];
  return [...haut, ...miroir(haut).reverse().slice(1)];
};

interface Trajet {
  pts: Pt[];
  cumul: number[];
  longueur: number;
  point: (distance: number) => Pt;
}

const trajet = (pts: Pt[]): Trajet => {
  const cumul = [0];
  for (let i = 1; i < pts.length; i++) {
    cumul.push(cumul[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z));
  }
  const longueur = cumul[cumul.length - 1];
  const point = (distance: number): Pt => {
    const d = Math.min(longueur, Math.max(0, distance));
    let i = 1;
    while (i < pts.length - 1 && cumul[i] < d) i++;
    const k = (d - cumul[i - 1]) / (cumul[i] - cumul[i - 1] || 1);
    return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k, z: pts[i - 1].z + (pts[i].z - pts[i - 1].z) * k };
  };
  return { pts, cumul, longueur, point };
};

/* ── La géométrie ── */

/**
 * Une dalle : un contour extrudé vers le bas depuis la hauteur zéro, arêtes
 * chanfreinées. Les trous traversent toute l'épaisseur.
 */
const dalle = (contour: Pt[], epaisseur: number, chanfrein: number, trous: Pt[][] = []): BufferGeometry => {
  /* Le plan d'une forme est (x, y) : la profondeur du plateau y devient -y,
     pour qu'elle retombe sur z une fois la dalle couchée. */
  const enPlan = (pts: Pt[]) => pts.map((p) => new Vector2(p.x, -p.z));
  const forme = new Shape(enPlan(contour));
  for (const trou of trous) forme.holes.push(new Path(enPlan(trou)));
  const brute = new ExtrudeGeometry(forme, {
    depth: epaisseur - 2 * chanfrein,
    bevelEnabled: chanfrein > 0,
    bevelThickness: chanfrein,
    bevelSize: chanfrein,
    /* Le chanfrein mord dans la forme au lieu de la faire grossir : les cotes
       données restent les cotes extérieures. */
    bevelOffset: -chanfrein,
    bevelSegments: 2,
    steps: 1,
  });
  brute.rotateX(-Math.PI / 2);
  brute.translate(0, -(epaisseur - chanfrein), 0);
  /* Sans cela chaque facette d'un coin arrondi garde sa propre normale, et la
     laque renvoie des bandes. L'angle reste sous celui du chanfrein : fondu
     avec lui, le dessus pencherait ses normales d'un bord à l'autre et la
     laque se couvrirait de faux reflets. */
  const lissee = toCreasedNormals(brute, rad(16));
  brute.dispose();
  return lissee;
};

/** Un ruban plat qui suit un trajet ; `u` court de 0 à 1 le long du trajet. */
const ruban = (chemin: Trajet, demiLargeur: number, hauteur: number): BufferGeometry => {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const dernier = chemin.pts.length - 1;
  chemin.pts.forEach((p, i) => {
    const avant = chemin.pts[Math.max(0, i - 1)];
    const apres = chemin.pts[Math.min(dernier, i + 1)];
    const dx = apres.x - avant.x;
    const dz = apres.z - avant.z;
    const n = Math.hypot(dx, dz) || 1;
    const nx = (-dz / n) * demiLargeur;
    const nz = (dx / n) * demiLargeur;
    positions.push(p.x + nx, hauteur, p.z + nz, p.x - nx, hauteur, p.z - nz);
    const u = chemin.cumul[i] / chemin.longueur;
    uvs.push(u, 0, u, 1);
    if (i > 0) {
      const k = i * 2;
      indices.push(k - 2, k - 1, k, k, k - 1, k + 1);
    }
  });
  const geometrie = new BufferGeometry();
  geometrie.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometrie.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometrie.setIndex(indices);
  return geometrie;
};

/** Un plan couché sur le plateau : le haut de sa texture regarde le fond. */
const planCouche = (largeur: number, profondeur: number) => new PlaneGeometry(largeur, profondeur).rotateX(-Math.PI / 2);

/* ── Le dessin des textures ── */
const feuilleDeDessin = (largeur: number, hauteur: number) => {
  const toile = document.createElement('canvas');
  toile.width = largeur;
  toile.height = hauteur;
  const pinceau = toile.getContext('2d');
  if (!pinceau) throw new Error('plateau : le dessin 2D est indisponible');
  return { toile, pinceau };
};

const pave = (pinceau: CanvasRenderingContext2D, x: number, y: number, l: number, h: number, rayon: number) => {
  pinceau.beginPath();
  /* `roundRect` manque aux navigateurs d'avant 2023 : un pavé à angles vifs
     vaut mieux qu'une scène qui renonce pour un arrondi de trois pixels. */
  if (typeof pinceau.roundRect === 'function') pinceau.roundRect(x, y, l, h, rayon);
  else pinceau.rect(x, y, l, h);
  pinceau.fill();
};

/**
 * Monte le plateau dans son cadre et rend la fonction qui le démonte.
 * Lève si WebGL est indisponible : à l'appelant de garder l'image de repli.
 */
export function monterPlateau(racine: HTMLElement): () => void {
  const toile = racine.querySelector('canvas');
  if (!toile) throw new Error('plateau : la toile est absente du composant');
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
  const teinte = (nom: string, repli: string) => {
    const valeur = css.getPropertyValue(nom).trim();
    if (!valeur) console.warn(`plateau : jeton ${nom} absent, repli sur ${repli}`);
    return new Color(valeur || repli);
  };
  const nuit = teinte('--color-night-deep', '#0c121f');
  const peche = teinte('--color-peche', '#ffb38a');
  const braise = teinte('--color-braise', '#ff8a65');
  const papier = teinte('--color-feuille', '#f7f8fa');
  const police = css.getPropertyValue('--font-display').trim() || 'system-ui, sans-serif';
  /* En volume, sous la lumière, la pêche du site vire au crème : la matière
     est un ton plus soutenue pour être lue comme la même couleur. */
  const pecheMatiere = new Color('#ff9a68');
  const hexa = (c: Color) => `#${c.getHexString()}`;

  const ecranEtroit = window.matchMedia('(max-width: 640px)');
  const densite = () => Math.min(window.devicePixelRatio || 1, ecranEtroit.matches ? 1.5 : 2);
  rendu.setPixelRatio(densite());
  rendu.outputColorSpace = SRGBColorSpace;
  /* Le rendu neutre garde la pêche pêche : un rendu « cinéma » la délave. */
  rendu.toneMapping = NeutralToneMapping;
  rendu.toneMappingExposure = 1.08;
  rendu.shadowMap.enabled = true;
  rendu.shadowMap.type = PCFShadowMap;
  /* L'encre de lecture est révélée par un plan de coupe qui suit le portique. */
  rendu.localClippingEnabled = true;

  const scene = new Scene();
  scene.background = nuit;
  const pmrem = new PMREMGenerator(rendu);
  const piece = new RoomEnvironment();
  /* La cible est gardée : c'est elle qu'il faut libérer, et refaire quand le
     contexte revient. */
  let reflets = pmrem.fromScene(piece, 0.04);
  scene.environment = reflets.texture;
  scene.environmentIntensity = 0.42;

  /* ── La lumière ── Une clé qui vient du fond à gauche et porte les ombres
     vers le lecteur ; une nappe froide qui dégrade la laque d'un coin à
     l'autre (sous une caméra sans perspective, une surface plane renvoie
     partout la même chose : c'est la nappe qui lui donne du modelé) ; un
     contre-jour pêche qui monte quand les outils sont reliés. */
  const cle = new DirectionalLight('#fff2e6', 1.5);
  cle.position.set(-6, 10, -5.5);
  cle.castShadow = true;
  cle.shadow.mapSize.set(ecranEtroit.matches ? 1024 : 2048, ecranEtroit.matches ? 1024 : 2048);
  cle.shadow.radius = 5;
  cle.shadow.bias = -0.0004;
  cle.shadow.normalBias = 0.015;
  Object.assign(cle.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 });
  scene.add(cle);
  const nappe = new PointLight('#c9d6ff', 66, 0, 2);
  /* Placée pour que son reflet dans le vernis tombe hors du plateau : on
     n'en garde que la traîne, un satiné qui descend du bord du fond. */
  nappe.position.set(-2.6, 4.8, -7.6);
  scene.add(nappe);
  const CONTRE = 16;
  const contre = new PointLight(peche, CONTRE, 14, 1.7);
  contre.position.set(4.6, 1.7, 3.4);
  scene.add(contre);

  /* ── Les matières : laque sombre, métal usiné, et la pêche pour ce qui vit ── */
  /* La laque porte une trame de points gravés : c'est un plateau de jeu, pas
     une dalle nue. La trame se répète en unités de scène, parce qu'une dalle
     extrudée prend ses coordonnées de texture dans son propre plan. */
  const carteTrame = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(64, 64);
    p.fillStyle = '#121a31';
    p.fillRect(0, 0, 64, 64);
    p.fillStyle = '#1f2a4b';
    p.beginPath();
    p.arc(32, 32, 3.4, 0, Math.PI * 2);
    p.fill();
    return c;
  })();
  const laque = new MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.26 });
  const laqueTouche = new MeshPhysicalMaterial({
    color: '#27345a',
    roughness: 0.36,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    emissive: peche,
    emissiveIntensity: 0,
  });
  const metal = new MeshStandardMaterial({ color: '#9aa3b7', metalness: 1, roughness: 0.36 });
  const metalSombre = new MeshStandardMaterial({ color: '#3d475f', metalness: 1, roughness: 0.48 });
  const noir = new MeshStandardMaterial({ color: '#0a0f1b', roughness: 0.7 });

  const textures: Texture[] = [];
  const texture = (source: HTMLCanvasElement, couleur = true) => {
    const t = new CanvasTexture(source);
    t.colorSpace = couleur ? SRGBColorSpace : NoColorSpace;
    t.anisotropy = rendu.capabilities.getMaxAnisotropy();
    textures.push(t);
    return t;
  };

  const trame = texture(carteTrame);
  trame.wrapS = trame.wrapT = RepeatWrapping;
  trame.repeat.set(1 / 0.35, 1 / 0.35);
  trame.offset.set(0.5, 0.5);
  laque.map = trame;

  const poser = <M extends Material | Material[]>(geometrie: BufferGeometry, matiere: M, parent: Group | Scene = scene) => {
    const maille = new Mesh(geometrie, matiere);
    maille.castShadow = maille.receiveShadow = true;
    parent.add(maille);
    return maille;
  };
  /** Une lumière peinte : ajoutée à l'image, sans ombre ni profondeur. */
  const lueur = (carte: Texture) =>
    new MeshBasicMaterial({
      map: carte,
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

  /* ── Le plateau : un châssis de métal, une plaque de laque où les rainures
     sont réellement découpées. Leur fond, c'est le métal du châssis. ── */
  poser(dalle(contourArrondi(DEMI_X, DEMI_Z, 0.56), 0.4, 0.05), metalSombre).position.y = -CREUX;
  poser(dalle(contourArrondi(DEMI_X - 0.1, DEMI_Z - 0.1, 0.47), CREUX, 0.022, [contourRainure()]), laque);
  /* L'ombre du plateau sur la page : le fond reste exactement celui du site. */
  const sol = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: 0.6 }));
  sol.rotation.x = -Math.PI / 2;
  sol.position.y = -CREUX - 0.4;
  sol.receiveShadow = true;
  scene.add(sol);

  /* Quatre vis aux coins : on doit croire à un objet qu'on a monté. */
  const tete = new CylinderGeometry(0.1, 0.1, 0.03, 24);
  const fente = new BoxGeometry(0.15, 0.012, 0.028);
  for (const [sx, sz] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    const vis = new Group();
    vis.position.set(sx * (DEMI_X - 0.44), 0.012, sz * (DEMI_Z - 0.44));
    vis.rotation.y = 0.5 + sx * 0.9 + sz * 0.4;
    scene.add(vis);
    poser(tete, metal, vis);
    poser(fente, noir, vis).position.y = 0.012;
  }

  /* ── Les rainures qui s'allument ── Le trait et son halo sont deux rubans
     dont la texture est une moitié allumée, une moitié éteinte, avec une tête
     plus vive à la jonction. Faire glisser la texture fait avancer la lumière
     le long de la rainure, sans programme graphique sur mesure. */
  const carteTrait = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(512, 4);
    const allume = p.createLinearGradient(0, 0, 512, 0);
    allume.addColorStop(0, 'rgba(255, 173, 130, 1)');
    allume.addColorStop(0.455, 'rgba(255, 173, 130, 1)');
    allume.addColorStop(0.488, 'rgba(255, 236, 222, 1)');
    allume.addColorStop(0.5, 'rgba(255, 236, 222, 0)');
    p.fillStyle = allume;
    p.fillRect(0, 0, 512, 4);
    return c;
  })();
  const carteHalo = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(512, 32);
    p.fillStyle = '#000';
    p.fillRect(0, 0, 512, 32);
    const travers = p.createLinearGradient(0, 0, 0, 32);
    travers.addColorStop(0, '#000');
    travers.addColorStop(0.5, '#4d2715');
    travers.addColorStop(1, '#000');
    p.fillStyle = travers;
    p.fillRect(0, 0, 246, 32);
    const tete = p.createRadialGradient(244, 16, 0, 244, 16, 16);
    tete.addColorStop(0, '#9c5a38');
    tete.addColorStop(1, '#000');
    p.globalCompositeOperation = 'lighten';
    p.fillStyle = tete;
    p.fillRect(226, 0, 36, 32);
    return c;
  })();

  /* Un ruban par destination, de Mail jusqu'à la touche : les deux se
     recouvrent sur le tronc commun et se quittent au bec sans couture. */
  interface Rail {
    cartes: Texture[];
    halo: MeshBasicMaterial;
    trait: MeshBasicMaterial;
    /** La part du ruban qui court sur le tronc commun. */
    tronc: number;
  }
  const rail = (branche: Pt[]): Rail => {
    const chemin = trajet([{ x: X_DEBUT, z: 0 }, ...branche]);
    const cartes = [carteTrait, carteHalo].map((source) => {
      const t = texture(source);
      t.wrapS = t.wrapT = ClampToEdgeWrapping;
      t.repeat.set(0.5, 1);
      return t;
    });
    const trait = new MeshBasicMaterial({ map: cartes[0], transparent: true, depthWrite: false, side: DoubleSide });
    const halo = lueur(cartes[1]);
    /* Le trait flotte au ras de la laque plutôt qu'au fond de la rainure :
       vu de biais, le fond se décale sous son ouverture et le trait
       paraîtrait collé à un bord. */
    scene.add(new Mesh(ruban(chemin, 0.034, -0.004), trait), new Mesh(ruban(chemin, 0.42, 0.004), halo));
    return { cartes, trait, halo, tronc: (X_NOEUD - VIRAGE - X_DEBUT) / chemin.longueur };
  };
  const reglerRail = (r: Rail, frontTronc: number, frontBranche: number, force: number) => {
    const front = r.tronc * frontTronc + (1 - r.tronc) * frontBranche;
    /* À zéro la fenêtre est tout entière dans le noir, à un tout entière dans
       la lumière : la tête ne reste jamais posée au bout du ruban. */
    r.cartes.forEach((carte) => (carte.offset.x = 0.56 - 0.62 * front));
    r.trait.opacity = force;
    r.halo.opacity = force * 0.8;
  };
  const cheminHaut = brancheHaute(X_FIN);
  const rails = [rail(cheminHaut), rail(miroir(cheminHaut))];
  /** La part du tronc qui va de Mail au lecteur. */
  const PART_LECTEUR = (X_LECTEUR - 0.85 - X_DEBUT) / (X_NOEUD - VIRAGE - X_DEBUT);

  /* La butée : tant qu'elle est levée, rien ne passe. */
  const butee = poser(new BoxGeometry(0.07, 0.16, DEMI_RAINURE * 2 - 0.05), metal);
  butee.position.set(X_BUTEE, 0, 0);

  /* ── Les touches ── */
  const contourTouche = contourArrondi(DEMI_TOUCHE, DEMI_TOUCHE, 0.28);
  const geoTouche = dalle(contourTouche, EPAISSEUR_TOUCHE, 0.05);
  /* Sous chaque touche, un filet de métal incrusté dans la laque. */
  const geoCollerette = dalle(contourArrondi(DEMI_TOUCHE + 0.085, DEMI_TOUCHE + 0.085, 0.36), 0.012, 0, [
    contourArrondi(DEMI_TOUCHE + 0.05, DEMI_TOUCHE + 0.05, 0.325),
  ]);
  const geoFace = planCouche(DEMI_TOUCHE * 2, DEMI_TOUCHE * 2);
  const POINTS = 320;

  const tracePicto = (cle: string) => {
    const d = racine.querySelector(`[data-picto="${cle}"]`)?.getAttribute('d');
    if (!d) throw new Error(`plateau : pictogramme « ${cle} » introuvable dans l'image de repli`);
    return d;
  };
  /** Le pictogramme gravé sur une touche : `taille` et `decalage` en unités de scène. */
  const cartePicto = (cle: string, taille: number, decalage: number) => {
    const { toile: c, pinceau: p } = feuilleDeDessin(512, 512);
    p.fillStyle = '#000';
    p.fillRect(0, 0, 512, 512);
    const echelle = (taille * POINTS) / 24;
    p.translate(256 - 12 * echelle, 256 + decalage * POINTS - 12 * echelle);
    p.scale(echelle, echelle);
    p.lineCap = p.lineJoin = 'round';
    p.lineWidth = 1.5;
    p.strokeStyle = '#fff';
    p.stroke(new Path2D(tracePicto(cle)));
    return texture(c, false);
  };

  interface Touche {
    groupe: Group;
    corps: MeshPhysicalMaterial;
    face: MeshStandardMaterial;
  }
  const touche = (x: number, z: number, cle: string, taille: number, decalage = 0): Touche => {
    poser(geoCollerette, metal).position.set(x, 0.012, z);
    const groupe = new Group();
    groupe.position.set(x, GARDE + EPAISSEUR_TOUCHE, z);
    scene.add(groupe);
    const corps = laqueTouche.clone();
    poser(geoTouche, corps, groupe);
    /* Blanc sur noir, la même carte sert deux fois : elle découpe le trait
       dans une matière claire, et dit où la pêche s'allume quand l'outil
       travaille. */
    const carte = cartePicto(cle, taille, decalage);
    const face = new MeshStandardMaterial({
      color: '#dfe5f0',
      alphaMap: carte,
      emissive: pecheMatiere,
      emissiveMap: carte,
      emissiveIntensity: 0,
      roughness: 0.5,
      transparent: true,
      depthWrite: false,
    });
    const plan = new Mesh(geoFace, face);
    plan.position.y = 0.003;
    groupe.add(plan);
    return { groupe, corps, face };
  };
  const reglerTouche = (t: Touche, enfonce: number, feu: number) => {
    t.groupe.position.y = GARDE + EPAISSEUR_TOUCHE - COURSE * Math.min(1.15, enfonce);
    t.face.emissiveIntensity = Math.min(2.4, feu * 2.2);
    t.corps.emissiveIntensity = Math.min(0.03, feu * 0.02);
  };

  const mail = touche(X_MAIL, 0, 'mail', 0.98);
  const commande = touche(X_SORTIE, -Z_BRANCHE, 'commande', 0.64, -0.3);
  const facture = touche(X_SORTIE, Z_BRANCHE, 'facture', 0.98);

  /* Mail : la pastille du courrier non lu, tant qu'il reste des jetons à traiter. */
  const pastille = poser(
    new CylinderGeometry(0.15, 0.15, 0.07, 28),
    new MeshStandardMaterial({ color: pecheMatiere, emissive: peche, emissiveIntensity: 0.9, roughness: 0.4 }),
    mail.groupe,
  );
  pastille.position.set(DEMI_TOUCHE - 0.24, 0.035, -DEMI_TOUCHE + 0.24);

  /* Commande : un compteur à rouleaux. Chaque rouleau est un grand tambour
     dont seul le sommet dépasse de la touche, derrière une fenêtre de métal. */
  const RAYON_ROULEAU = 0.62;
  const LARGEUR_ROULEAU = 0.36;
  const carteChiffres = texture(feuilleDeDessin(1024, 95).toile);
  const dessinerChiffres = () => {
    const c = carteChiffres.image as HTMLCanvasElement;
    const p = c.getContext('2d');
    if (!p) return;
    p.fillStyle = '#0b111e';
    p.fillRect(0, 0, 1024, 95);
    p.fillStyle = '#f2f4f8';
    p.font = `600 92px ${police}`;
    p.textAlign = 'center';
    p.textBaseline = 'middle';
    for (let k = 0; k < 10; k++) {
      /* Le sommet du tambour lit la texture aux trois quarts de son tour ;
         les chiffres y sont couchés d'un quart de tour pour se lire debout. */
      p.save();
      p.translate(((0.75 + k / 10) % 1) * 1024, 50);
      p.rotate(-Math.PI / 2);
      p.fillText(String(k), 0, 0);
      p.restore();
    }
    carteChiffres.needsUpdate = true;
  };
  dessinerChiffres();
  /* Un tambour assez grand pour porter de gros chiffres dépasse de la touche
     par tous les côtés : on n'en garde que ce qui sort par le dessus. */
  const coupeRouleaux = new Plane(new Vector3(0, 1, 0), 0);
  const matiereRouleau = new MeshStandardMaterial({
    map: carteChiffres,
    clippingPlanes: [coupeRouleaux],
    emissive: pecheMatiere,
    emissiveMap: carteChiffres,
    emissiveIntensity: 0,
    roughness: 0.55,
  });
  const geoRouleau = new CylinderGeometry(RAYON_ROULEAU, RAYON_ROULEAU, LARGEUR_ROULEAU, 64, 1, true).rotateZ(-Math.PI / 2);
  const Z_COMPTEUR = 0.4;
  const rouleaux = [-1, 1].map((cote) => {
    const rouleau = new Mesh(geoRouleau, matiereRouleau);
    rouleau.position.set(cote * (LARGEUR_ROULEAU / 2 + 0.02), -RAYON_ROULEAU * Math.cos(rad(21)), Z_COMPTEUR);
    commande.groupe.add(rouleau);
    return rouleau;
  });
  /* La fenêtre : un cadre de métal qui ne laisse voir qu'un chiffre par rouleau. */
  const demiFenetre = { x: LARGEUR_ROULEAU + 0.02, z: 0.2 };
  poser(
    dalle(contourArrondi(demiFenetre.x + 0.07, demiFenetre.z + 0.07, 0.09), 0.05, 0.012, [
      contourArrondi(demiFenetre.x, demiFenetre.z, 0.04),
    ]),
    metal,
    commande.groupe,
  ).position.set(0, 0.05, Z_COMPTEUR);

  /* Facture : un tampon à levier, articulé derrière la touche, et la marque
     qu'il laisse. La même coche est gravée sur sa semelle : relevé, il la
     montre, et l'on comprend ce qu'il va faire avant qu'il ne tombe. */
  const dessinerCoche = (p: CanvasRenderingContext2D, taille: number, couleur: string) => {
    const k = taille / 256;
    p.save();
    p.translate(taille / 2, taille / 2);
    p.rotate(rad(-12));
    p.strokeStyle = couleur;
    p.lineCap = p.lineJoin = 'round';
    p.lineWidth = 13 * k;
    p.beginPath();
    p.arc(0, 0, 96 * k, 0, Math.PI * 2);
    p.stroke();
    p.lineWidth = 20 * k;
    p.beginPath();
    p.moveTo(-44 * k, 4 * k);
    p.lineTo(-12 * k, 36 * k);
    p.lineTo(46 * k, -32 * k);
    p.stroke();
    p.restore();
  };
  const carteMarque = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(256, 256);
    p.fillStyle = '#000';
    p.fillRect(0, 0, 256, 256);
    dessinerCoche(p, 256, '#fff');
    return texture(c, false);
  })();
  const carteSemelle = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(256, 256);
    p.fillStyle = '#f08a58';
    p.fillRect(0, 0, 256, 256);
    dessinerCoche(p, 256, '#ffe7d8');
    return texture(c);
  })();
  const matiereMarque = new MeshBasicMaterial({
    color: braise,
    alphaMap: carteMarque,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  });
  /* La marque tombe dans le coin de la facture, comme un visa. */
  const MARQUE = { x: 0.3, z: 0.26 };
  const marque = new Mesh(planCouche(0.7, 0.7), matiereMarque);
  marque.position.set(MARQUE.x, 0.006, MARQUE.z);
  facture.groupe.add(marque);

  const Z_AXE = Z_BRANCHE - DEMI_TOUCHE - 0.24;
  const HAUT_AXE = GARDE + EPAISSEUR_TOUCHE + 0.17;
  const BRAS = DEMI_TOUCHE + 0.24 + MARQUE.z;
  const X_AXE = X_SORTIE + MARQUE.x;
  poser(dalle(contourArrondi(0.24, 0.11, 0.05), HAUT_AXE + 0.07, 0.02), metalSombre).position.set(X_AXE, HAUT_AXE + 0.07, Z_AXE);
  const levier = new Group();
  levier.position.set(X_AXE, HAUT_AXE, Z_AXE);
  scene.add(levier);
  poser(new CylinderGeometry(0.06, 0.06, 0.6, 20).rotateZ(Math.PI / 2), metal, levier);
  poser(dalle(contourArrondi(0.055, BRAS / 2 + 0.05, 0.05), 0.07, 0.015), metal, levier).position.set(0, 0.035, BRAS / 2);
  const tampon = new Group();
  tampon.position.set(0, 0, BRAS);
  levier.add(tampon);
  poser(new CylinderGeometry(0.13, 0.17, 0.12, 32), metal, tampon).position.y = 0.01;
  poser(new CylinderGeometry(0.31, 0.31, 0.11, 40), metalSombre, tampon).position.y = -0.105;
  const semelle = new Mesh(
    new CircleGeometry(0.295, 40).rotateX(Math.PI / 2),
    new MeshStandardMaterial({ map: carteSemelle, emissive: '#ffffff', emissiveMap: carteSemelle, emissiveIntensity: 0.25, roughness: 0.6 }),
  );
  semelle.position.y = -0.162;
  tampon.add(semelle);

  /* ── Le lecteur : la feuille du bon de commande sur sa platine, et le
     portique qui la balaie. Le jeton passe dessous, par la rainure. ── */
  poser(dalle(contourArrondi(0.85, 1.05, 0.18), 0.06, 0.016), laqueTouche).position.set(X_LECTEUR, 0.06, 0);
  const DEMI_FEUILLE = { x: 0.6, z: 0.8 };
  const HAUT_FEUILLE = 0.074;
  poser(
    dalle(contourArrondi(DEMI_FEUILLE.x, DEMI_FEUILLE.z, 0.035), 0.014, 0),
    new MeshStandardMaterial({ color: papier, roughness: 0.95 }),
  ).position.set(X_LECTEUR, HAUT_FEUILLE, 0);

  /* Le bon : un en-tête, quatre lignes d'articles, un total. Dessiné deux
     fois, à l'identique : en gris pour le papier, en braise pour ce que le
     portique vient de lire. */
  const carteBon = (lu: boolean) => {
    const { toile: c, pinceau: p } = feuilleDeDessin(300, 400);
    if (!lu) {
      p.fillStyle = hexa(papier);
      p.fillRect(0, 0, 300, 400);
      p.fillStyle = '#26314c';
      pave(p, 26, 28, 36, 36, 8);
      pave(p, 76, 30, 112, 13, 6);
      p.fillStyle = '#b4bccb';
      pave(p, 76, 52, 70, 9, 4);
      p.fillRect(26, 92, 248, 2);
    }
    p.fillStyle = lu ? hexa(braise) : '#98a3b8';
    for (let i = 0; i < 4; i++) {
      const y = 116 + i * 46;
      pave(p, 26, y, 26, 14, 5);
      pave(p, 64, y, 96 + ((i * 37) % 44), 14, 5);
      pave(p, 222, y, 52, 14, 5);
    }
    if (!lu) p.fillRect(26, 300, 248, 2);
    p.fillStyle = lu ? hexa(braise) : '#26314c';
    pave(p, 172, 326, 102, 22, 7);
    return texture(c);
  };
  const impression = new Mesh(
    planCouche(DEMI_FEUILLE.x * 2, DEMI_FEUILLE.z * 2),
    new MeshStandardMaterial({ map: carteBon(false), roughness: 0.95 }),
  );
  impression.position.set(X_LECTEUR, HAUT_FEUILLE + 0.001, 0);
  impression.receiveShadow = true;
  scene.add(impression);
  /* Le plan de coupe ne garde que ce qui est à gauche du portique. */
  const coupe = new Plane(new Vector3(-1, 0, 0), X_REPOS);
  const matiereEncre = new MeshBasicMaterial({
    map: carteBon(true),
    transparent: true,
    depthWrite: false,
    clippingPlanes: [coupe],
  });
  const encre = new Mesh(planCouche(DEMI_FEUILLE.x * 2, DEMI_FEUILLE.z * 2), matiereEncre);
  encre.position.set(X_LECTEUR, HAUT_FEUILLE + 0.002, 0);
  scene.add(encre);

  const Z_GUIDE = 1.24;
  for (const cote of [-1, 1]) {
    poser(new BoxGeometry(2.1, 0.035, 0.07), metal).position.set(X_LECTEUR, 0.0175, cote * Z_GUIDE);
  }
  const portique = new Group();
  scene.add(portique);
  const geoPied = dalle(contourArrondi(0.14, 0.13, 0.05), 0.4, 0.02);
  for (const cote of [-1, 1]) poser(geoPied, metalSombre, portique).position.set(0, 0.4, cote * Z_GUIDE);
  poser(dalle(contourArrondi(0.095, Z_GUIDE + 0.13, 0.06), 0.11, 0.02), metal, portique).position.y = 0.5;
  const matiereVoyant = new MeshStandardMaterial({ color: '#2a1a14', emissive: peche, emissiveIntensity: 0, roughness: 0.4 });
  poser(new BoxGeometry(0.05, 0.012, DEMI_FEUILLE.z * 2), matiereVoyant, portique).position.y = 0.506;
  /* Le trait de lecture, posé sur la feuille, juste sous la barre. */
  const carteFaisceau = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(64, 4);
    const d = p.createLinearGradient(0, 0, 64, 0);
    d.addColorStop(0, '#000');
    d.addColorStop(0.42, '#7a3a1e');
    d.addColorStop(0.5, '#ffc4a0');
    d.addColorStop(0.58, '#7a3a1e');
    d.addColorStop(1, '#000');
    p.fillStyle = d;
    p.fillRect(0, 0, 64, 4);
    return texture(c);
  })();
  const matiereFaisceau = lueur(carteFaisceau);
  const faisceau = new Mesh(planCouche(0.5, DEMI_FEUILLE.z * 2 + 0.1), matiereFaisceau);
  faisceau.position.y = HAUT_FEUILLE + 0.004;
  portique.add(faisceau);

  /* ── Les jetons ── Trois par tour, et pour chacun son double, qui naît au
     bec de l'aiguillage. Ils remplissent la rainure, à fleur de laque : tout
     ce qui est posé sur le plateau (touches, platine, portique) leur passe
     au-dessus, et les cache le temps du passage. */
  const carteJeton = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(64, 64);
    p.fillStyle = '#ffa678';
    p.fillRect(0, 0, 64, 64);
    p.strokeStyle = '#d9663a';
    p.lineWidth = 5;
    p.beginPath();
    p.arc(32, 32, 16, 0, Math.PI * 2);
    p.stroke();
    return texture(c);
  })();
  const carteAura = (() => {
    const { toile: c, pinceau: p } = feuilleDeDessin(128, 128);
    const d = p.createRadialGradient(64, 64, 0, 64, 64, 64);
    /* Un anneau plutôt qu'un disque : la lueur entoure le jeton sans le noyer. */
    d.addColorStop(0, '#000');
    d.addColorStop(0.2, '#000');
    d.addColorStop(0.27, '#542b18');
    d.addColorStop(0.5, '#1f0f08');
    d.addColorStop(1, '#000');
    p.fillStyle = d;
    p.fillRect(0, 0, 128, 128);
    return texture(c);
  })();
  const RAYON_JETON = 0.128;
  /* Son dessus dépasse d'un cheveu : il passe ainsi devant les lueurs peintes
     sur la laque, qui sinon le blanchiraient. */
  const HAUT_JETON = CREUX + 0.005;
  const geoJeton = new CylinderGeometry(RAYON_JETON, RAYON_JETON, HAUT_JETON, 32);
  const flancJeton = new MeshStandardMaterial({ color: pecheMatiere, emissive: peche, emissiveIntensity: 0.35, roughness: 0.4 });
  const dessusJeton = new MeshStandardMaterial({
    map: carteJeton,
    emissive: '#ffffff',
    emissiveMap: carteJeton,
    emissiveIntensity: 0.42,
    roughness: 0.4,
  });
  const geoAura = planCouche(1.1, 1.1);

  interface Jeton {
    corps: Mesh;
    aura: Mesh;
    matiereAura: MeshBasicMaterial;
  }
  const jeton = (): Jeton => {
    const corps = poser(geoJeton, [flancJeton, dessusJeton, flancJeton]);
    corps.position.y = -CREUX + 0.005 + HAUT_JETON / 2;
    const matiereAura = lueur(carteAura);
    const aura = new Mesh(geoAura, matiereAura);
    aura.position.y = 0.005;
    scene.add(aura);
    corps.visible = aura.visible = false;
    return { corps, aura, matiereAura };
  };
  const jetons = PASSAGES.map(() => ({ haut: jeton(), bas: jeton() }));
  /* Une lampe par jeton en route, une de plus pour le double : elles font
     glisser un reflet pêche sur la laque et le flanc des touches. */
  const lampes = [0, 1, 2, 3].map(() => {
    const lampe = new PointLight(peche, 0, 2.8, 1.8);
    lampe.position.y = 0.34;
    scene.add(lampe);
    return lampe;
  });
  /** Ce qu'on voit d'un jeton : rien sous une touche ou sous la platine. */
  const expose = (p: Pt) =>
    lisse(X_MAIL + DEMI_TOUCHE - 0.1, X_MAIL + DEMI_TOUCHE + 0.12, p.x) * (1 - lisse(X_LECTEUR - 0.97, X_LECTEUR - 0.8, p.x)) +
    lisse(X_LECTEUR + 0.8, X_LECTEUR + 0.97, p.x) * (1 - lisse(X_SORTIE - DEMI_TOUCHE - 0.12, X_SORTIE - DEMI_TOUCHE + 0.1, p.x));
  const placer = (j: Jeton, p: Pt | null, gonfle: number, lampe?: PointLight) => {
    const vu = p ? expose(p) : 0;
    j.corps.visible = j.aura.visible = p !== null;
    if (p) {
      j.corps.position.x = j.aura.position.x = p.x;
      j.corps.position.z = j.aura.position.z = p.z;
      j.corps.scale.set(gonfle, 1, gonfle);
      j.matiereAura.opacity = vu;
    }
    if (lampe) {
      lampe.intensity = vu * 1.1;
      if (p) lampe.position.set(p.x, 0.34, p.z);
    }
  };

  /* Du lecteur à la touche : la ligne droite, puis les deux virages. La route
     part du bord de la platine et s'arrête à peine entrée sous la touche :
     le jeton reparaît sitôt la lecture finie, et la touche s'enfonce sitôt
     qu'il a disparu dessous. */
  const X_ROUTE = X_LECTEUR + 0.55;
  const routeHaut = trajet([{ x: X_ROUTE, z: 0 }, ...brancheHaute(X_SORTIE - 0.42)]);
  const routeBas = trajet(miroir(routeHaut.pts));
  const D_NOEUD = X_NOEUD - VIRAGE - X_ROUTE;

  /* ── Les légendes : posées en HTML sous chaque outil, pour rester nettes
     et lisibles à 320 px de large. ── */
  const legendes = (
    [
      ['mail', X_MAIL, DEMI_TOUCHE + 0.28],
      ['bon', X_LECTEUR, Z_GUIDE + 0.36],
      ['commande', X_SORTIE, -Z_BRANCHE + DEMI_TOUCHE + 0.28],
      ['facture', X_SORTIE, Z_BRANCHE + DEMI_TOUCHE + 0.28],
    ] as const
  ).flatMap(([cle, x, z]) => {
    const el = racine.querySelector<HTMLElement>(`[data-legende="${cle}"]`);
    return el ? [{ cle, el, ancre: new Vector3(x, 0, z), actif: false }] : [];
  });
  const annoncer = (cle: string, actif: boolean) => {
    const legende = legendes.find((l) => l.cle === cle);
    if (!legende || legende.actif === actif) return;
    legende.actif = actif;
    legende.el.toggleAttribute('data-actif', actif);
  };

  /* ── La mise à jour : tout découle du temps écoulé ── */
  const maj = (s: number) => {
    const tour = Math.floor(s / DUREE);
    const t = s - tour * DUREE;
    const allume = 1 - doux((t - EXTINCTION) / 0.8);

    /* Le lien : les rainures s'allument l'une après l'autre. */
    const tronc = PART_LECTEUR * adoucir((t - LIEN.mail) / 0.5) + (1 - PART_LECTEUR) * adoucir((t - LIEN.lecteur) / 0.4);
    const branches = [adoucir((t - LIEN.haut) / 0.5), adoucir((t - LIEN.bas) / 0.5)];
    rails.forEach((r, i) => reglerRail(r, tronc, branches[i], allume));
    const relie = ((tronc + branches[0] + branches[1]) / 3) * allume;
    contre.intensity = CONTRE * (0.25 + 0.75 * relie);
    const ouverte = doux((t - LIEN.butee) / 0.15) * (1 - doux((t - EXTINCTION - 0.3) / 0.25));
    butee.position.y = -0.02 - ouverte * (CREUX + 0.08);

    /* Les jetons. */
    let double: Pt | null = null;
    PASSAGES.forEach((p, i) => {
      let ici: Pt | null = null;
      let copie: Pt | null = null;
      let gonfle = 1;
      if (t >= p.emission && t < p.depart) {
        /* Sortie de Mail, puis attente dans la file ; elle avance d'un pas
           chaque fois qu'un jeton de devant est parti. */
        let x = X_CACHE + (X_FILE - i * PAS_FILE - X_CACHE) * sortir((t - p.emission) / 0.5);
        for (let k = 0; k < i; k++) x += PAS_FILE * adoucir((t - PASSAGES[k].depart - 0.08) / 0.3);
        ici = { x, z: 0 };
      } else if (t >= p.depart && t < p.sortie) {
        ici = { x: X_FILE + (X_LECTEUR - X_FILE) * adoucir((t - p.depart) / p.aller), z: 0 };
      } else if (t >= p.sortie && t < arriveeDe(p) + 0.1) {
        const d = routeHaut.longueur * allure((t - p.sortie) / p.trajet);
        ici = routeHaut.point(d);
        /* Au bec, le jeton enfle, et ce sont deux jetons qui repartent. */
        gonfle = 1 + 0.26 * cloche(d - D_NOEUD - 0.08, 0.3);
        if (d > D_NOEUD) copie = routeBas.point(d);
      }
      placer(jetons[i].haut, ici, gonfle, lampes[i]);
      placer(jetons[i].bas, copie, gonfle);
      if (copie) double = copie;
    });
    const vuDouble = double ? expose(double) : 0;
    lampes[3].intensity = vuDouble * 1.1;
    if (double) lampes[3].position.set((double as Pt).x, 0.34, (double as Pt).z);

    /* Le lecteur : le portique balaie, l'encre suit, puis il rentre. */
    let balayage = 0;
    let lit = 0;
    let encrage = 0;
    let xPortique = X_REPOS + 0.15 * cloche(t - LIEN.lecteur - 0.12, 0.13);
    for (const p of PASSAGES) {
      if (t < p.lecture) continue;
      const u = (t - p.lecture) / p.dureeLecture;
      balayage = adoucir(u);
      lit = u < 1 ? Math.min(1, u / 0.1, (1 - u) / 0.1) : 0;
      encrage = 1 - doux((t - p.sortie) / 0.45);
      xPortique =
        t < p.sortie
          ? X_REPOS + (X_BOUT - X_REPOS) * balayage
          : X_BOUT + (X_REPOS - X_BOUT) * adoucir((t - p.sortie) / 0.5);
    }
    portique.position.x = xPortique;
    coupe.constant = X_REPOS + (X_BOUT - X_REPOS) * balayage;
    matiereEncre.opacity = encrage;
    matiereFaisceau.opacity = lit;
    matiereVoyant.emissiveIntensity = 0.5 * relie + 2.2 * lit;
    annoncer('bon', lit > 0);

    /* Mail : la touche s'enfonce à chaque jeton sorti. */
    let enfonce = 0.4 * appui(t, LIEN.mail);
    let feu = 0.5 * eclat(t, LIEN.mail, 0.3);
    let travaille = false;
    for (const p of PASSAGES) {
      enfonce += appui(t, p.emission);
      feu += eclat(t, p.emission, 0.32);
      travaille ||= t >= p.emission && t < p.emission + 0.45;
    }
    reglerTouche(mail, enfonce, feu);
    annoncer('mail', travaille);
    const dernierDepart = PASSAGES[PASSAGES.length - 1].depart;
    const pastilleVue = rebond((t - PASSAGES[0].emission) / 0.35) * (1 - sortir((t - dernierDepart) / 0.22));
    /* Tant que rien n'est relié, elle bat : du courrier attend. */
    const bat = 1 + 0.09 * Math.sin(t * 7) * (1 - doux((t - LIEN.mail) / 0.6));
    pastille.scale.setScalar(Math.max(0.001, pastilleVue * bat));

    /* Commande : la touche s'enfonce, le compteur tourne d'un cran. */
    enfonce = 0.45 * appui(t, LIEN.haut + 0.5);
    feu = 0.5 * eclat(t, LIEN.haut + 0.5, 0.3);
    travaille = false;
    let compte = COMPTE_DEPART + tour * PASSAGES.length;
    let roule = 0;
    for (const p of PASSAGES) {
      const a = arriveeDe(p);
      enfonce += appui(t, a - 0.06);
      feu += eclat(t, a - 0.04, 0.5);
      travaille ||= t >= a - 0.06 && t < a + 0.7;
      compte += rebond((t - a) / 0.45);
      roule += eclat(t, a, 0.4);
    }
    reglerTouche(commande, enfonce, feu);
    coupeRouleaux.constant = -(commande.groupe.position.y - 0.004);
    annoncer('commande', travaille);
    /* Les dizaines n'avancent que pendant le passage de neuf à zéro. */
    const dizaines = Math.floor(compte / 10) + Math.max(0, (compte % 10) - 9);
    rouleaux[0].rotation.x = -dizaines * (Math.PI / 5);
    rouleaux[1].rotation.x = -compte * (Math.PI / 5);
    matiereRouleau.emissiveIntensity = Math.min(1, roule) * 0.9;

    /* Facture : la touche s'enfonce, le tampon s'abat et laisse sa marque. */
    enfonce = 0.45 * appui(t, LIEN.bas + 0.5);
    feu = 0.5 * eclat(t, LIEN.bas + 0.5, 0.3);
    travaille = false;
    let coup = 0;
    let trace = 0;
    for (const p of PASSAGES) {
      const a = arriveeDe(p);
      const impact = impactDe(p);
      enfonce += appui(t, a - 0.06) + 0.7 * appui(t, impact);
      feu += eclat(t, a - 0.04, 0.5);
      travaille ||= t >= a - 0.06 && t < a + 0.8;
      coup = Math.max(coup, frappe(t, a));
      if (t >= impact) trace = 0.5 + 0.5 * Math.exp(-(t - impact) / 0.5);
    }
    reglerTouche(facture, enfonce, feu);
    annoncer('facture', travaille);
    /* Le tampon suit la touche qu'il vient d'enfoncer. */
    levier.rotation.x = -REPOS_TAMPON * (1 - coup);
    levier.position.y = HAUT_AXE - COURSE * Math.min(1, enfonce) * coup;
    matiereMarque.opacity = trace * allume;
  };

  /* ── Le cadre ── Une caméra sans perspective, qui regarde le plateau d'en
     haut, basculée de trente degrés vers le lecteur. */
  const PLONGEE = rad(60);
  /* Le plateau tourne d'un rien sur lui-même, un aller-retour par tour : les
     chanfreins accrochent la lumière tour à tour, et l'on voit que c'est un
     objet, pas un schéma. */
  const BALANCEMENT = rad(0.65);
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 80);
  const viser = (lacet: number) => {
    camera.position
      .set(Math.sin(lacet) * Math.cos(PLONGEE), Math.sin(PLONGEE), Math.cos(lacet) * Math.cos(PLONGEE))
      .multiplyScalar(30);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
  };
  viser(0);
  /* Ce qui doit tenir dans le cadre : le plateau entier, et le tampon levé. */
  const emprise = [-1, 1]
    .flatMap((sx) => [-1, 1].flatMap((sz) => [0, -CREUX - 0.4].map((y) => new Vector3(sx * DEMI_X, y, sz * DEMI_Z))))
    .map((p) => p.applyMatrix4(camera.matrixWorldInverse));
  const bornes = {
    gauche: Math.min(...emprise.map((p) => p.x)),
    droite: Math.max(...emprise.map((p) => p.x)),
    bas: Math.min(...emprise.map((p) => p.y)),
    haut: Math.max(...emprise.map((p) => p.y)),
  };
  const MARGE = 1.07;

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false;
  let image = 0;
  let detruit = false;
  let pret = false;
  let temps = 0;
  let dernierePasse = -1;
  /** Un instant imposé de l'extérieur (voir `plateau:image`) : la boucle s'arrête dessus. */
  let fige: number | null = reduit ? IMAGE_FIXE : null;

  const projete = new Vector3();
  const taille = { l: 0, h: 0 };
  const legender = () => {
    for (const legende of legendes) {
      projete.copy(legende.ancre).project(camera);
      const x = ((projete.x + 1) / 2) * taille.l;
      const y = ((1 - projete.y) / 2) * taille.h;
      legende.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translateX(-50%)`;
    }
  };
  const tailler = () => {
    const l = racine.clientWidth;
    const h = racine.clientHeight;
    if (!l || !h) return false;
    /* Relue à chaque fois : une rotation d'écran change la densité utile. */
    rendu.setPixelRatio(densite());
    rendu.setSize(l, h, false);
    const rapport = l / h;
    const demiL = Math.max(((bornes.droite - bornes.gauche) / 2) * MARGE, ((bornes.haut - bornes.bas) / 2) * MARGE * rapport);
    const demiH = demiL / rapport;
    const cx = (bornes.gauche + bornes.droite) / 2;
    const cy = (bornes.bas + bornes.haut) / 2;
    camera.left = cx - demiL;
    camera.right = cx + demiL;
    camera.top = cy + demiH;
    camera.bottom = cy - demiH;
    camera.updateProjectionMatrix();
    taille.l = l;
    taille.h = h;
    return true;
  };

  const dessiner = () => {
    const s = fige ?? temps;
    maj(s);
    viser(reduit ? 0 : BALANCEMENT * Math.sin((s / DUREE) * Math.PI * 2));
    legender();
    rendu.render(scene, camera);
    /* Posé une fois, et seulement si quelque chose a vraiment été dessiné :
       c'est ce drapeau qui fait apparaître la toile par-dessus son image. */
    if (!pret && !rendu.getContext().isContextLost()) {
      pret = true;
      toile.dataset.pret = '';
      racine.dataset.etat = 'vivant';
    }
  };

  const boucle = (ms: number) => {
    image = 0;
    if (detruit) return;
    /* Le temps n'avance que pendant qu'on dessine : au retour à l'écran, la
       machine reprend où elle s'était arrêtée, sans saut. */
    if (dernierePasse >= 0) temps += Math.min(0.1, (ms - dernierePasse) / 1000);
    dernierePasse = ms;
    dessiner();
    if (visible && !document.hidden && fige === null) image = requestAnimationFrame(boucle);
  };
  const relancer = () => {
    if (detruit || fige !== null || image || !pret || !visible || document.hidden) return;
    dernierePasse = -1;
    image = requestAnimationFrame(boucle);
  };

  const guetteur = new IntersectionObserver(
    (entrees) => {
      visible = entrees[entrees.length - 1]?.isIntersecting ?? false;
      relancer();
    },
    { rootMargin: '60px 0px' },
  );

  /* Changer la taille vide la toile : on redessine dans la foulée, sinon
     chaque pas de redimensionnement laisserait une image vide. */
  const observateur = new ResizeObserver(() => {
    if (detruit || !pret) return;
    if (tailler()) dessiner();
  });

  /* Le contexte peut être repris par le système (onglet en arrière-plan sur
     téléphone, pilote graphique qui redémarre). La toile s'efface alors
     devant son image de repli, puis revient avec ses reflets refaits. */
  const surPerte = (evenement: Event) => {
    evenement.preventDefault();
    cancelAnimationFrame(image);
    image = 0;
    pret = false;
    delete toile.dataset.pret;
    delete racine.dataset.etat;
  };
  const surRetour = () => {
    if (detruit) return;
    reflets.dispose();
    reflets = pmrem.fromScene(piece, 0.04);
    scene.environment = reflets.texture;
    dessiner();
    relancer();
  };
  /* Pour les captures et la relecture : `plateau:image` avec un nombre de
     secondes fige la boucle sur cet instant ; sans nombre, elle repart. */
  const surImage = (evenement: Event) => {
    const instant = evenement instanceof CustomEvent ? (evenement.detail as unknown) : null;
    if (typeof instant === 'number' && Number.isFinite(instant)) {
      fige = Math.max(0, instant);
      cancelAnimationFrame(image);
      image = 0;
      if (pret) dessiner();
    } else if (!reduit) {
      fige = null;
      relancer();
    }
  };

  document.addEventListener('visibilitychange', relancer);
  toile.addEventListener('webglcontextlost', surPerte);
  toile.addEventListener('webglcontextrestored', surRetour);
  racine.addEventListener('plateau:image', surImage);

  /* Les chiffres du compteur attendent la police du site : on les redessine
     quand elle est là, et l'image fixe avec eux. */
  document.fonts
    .load(`600 92px ${police}`)
    .then(() => {
      if (detruit) return;
      dessinerChiffres();
      if (pret && (fige !== null || !image)) dessiner();
    })
    .catch((erreur: unknown) => console.warn('plateau : police du compteur indisponible', erreur));

  /* Les matières se compilent avant la première image, sans bloquer le
     défilement ; puis une image est dessinée tout de suite, pour que la toile
     ait fini d'apparaître quand elle arrive à l'écran. */
  const demarrer = () => {
    if (detruit) return;
    tailler();
    dessiner();
    observateur.observe(racine);
    guetteur.observe(racine);
  };
  tailler();
  rendu
    .compileAsync(scene, camera)
    .catch((erreur: unknown) => console.warn('plateau : compilation différée indisponible', erreur))
    .then(demarrer)
    .catch((erreur: unknown) => console.error('plateau : première image en échec', erreur));

  return () => {
    detruit = true;
    cancelAnimationFrame(image);
    observateur.disconnect();
    guetteur.disconnect();
    document.removeEventListener('visibilitychange', relancer);
    toile.removeEventListener('webglcontextlost', surPerte);
    toile.removeEventListener('webglcontextrestored', surRetour);
    racine.removeEventListener('plateau:image', surImage);
    delete toile.dataset.pret;
    delete racine.dataset.etat;
    scene.traverse((objet) => {
      if (objet instanceof Mesh) {
        objet.geometry.dispose();
        (Array.isArray(objet.material) ? objet.material : [objet.material]).forEach((m: Material) => m.dispose());
      }
    });
    textures.forEach((t) => t.dispose());
    piece.dispose();
    /* Ni `pmrem.dispose()` ni `rendu.dispose()` ne libèrent ces deux cibles. */
    reflets.dispose();
    cle.shadow.map?.dispose();
    cle.dispose();
    pmrem.dispose();
    const contexte = rendu.getContext();
    rendu.dispose();
    /* Le contexte est rendu tout de suite, sans attendre le ramasse-miettes :
       un navigateur n'en tient qu'un petit nombre à la fois. */
    contexte.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
