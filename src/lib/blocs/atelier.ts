/*
 * atelier.ts — les blocs en trois dimensions.
 *
 * Lilian a retenu le verre, puis le circuit et la vague, et demandé à chaque
 * fois des formes plus inventives : pas des dalles ni des cubes, mais tout ce
 * que le verre rend beau, des sphères, des anneaux, des gemmes, des capsules.
 * Cinq sculptures portent donc la page, une par idée :
 *
 *   le circuit  (automatisation) une sphère déclenche, une gemme pêche
 *               décide, et trois objets reçoivent : une pile de disques, une
 *               capsule, un anneau. Un grain de lumière fait le trajet ;
 *   l'agent     (agents IA) un gyroscope : une sphère pêche au centre, trois
 *               anneaux qui tournent autour, et sur ces anneaux les outils
 *               que l'agent appelle l'un après l'autre ;
 *   les anneaux (formations) le jeu d'anneaux à empiler : ils tombent un à
 *               un sur leur tige, du plus large au plus petit. On apprend
 *               un niveau après l'autre ;
 *   la page     (sites et tableaux de bord) une vitre debout, avec ses trois
 *               points, un graphique en anneau, des barres rondes, une
 *               courbe et un bouton ;
 *   la vague    (premier écran) un nid d'abeilles de prismes de verre posé
 *               sur la grille, traversé par une onde.
 *
 * La boucle (ruban de Möbius) et le cube (casse-tête) restent disponibles, de
 * même que la pile d'origine avec ses trois matières.
 *
 * Three.js est déjà une dépendance du site : ce module n'est chargé qu'à la
 * demande, par un import différé. Le rendu s'arrête hors écran et dans un
 * onglet masqué. En mouvement réduit, une seule image est dessinée.
 */
import {
  BufferGeometry,
  CanvasTexture,
  CapsuleGeometry,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Fog,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PCFShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Quaternion,
  RepeatWrapping,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type StyleBloc = 'brique' | 'module' | 'verre';
export type FormeBloc = 'pile' | 'boucle' | 'cube' | 'circuit' | 'vague' | 'agent' | 'anneaux' | 'page';

export interface OptionsBlocs {
  style?: StyleBloc;
  forme?: FormeBloc;
  /**
   * 'studio' : un sol quadrillé qui se perd dans la brume (les cadres de la
   * page d'essai). 'uni' : le même, sans quadrillage, pour une page qui a déjà
   * sa grille. 'nu' : fond transparent, seule l'ombre est portée ; à éviter
   * avec le verre, qui a besoin d'un décor à réfracter.
   */
  decor?: 'studio' | 'uni' | 'nu';
  /** 'essai' : vue de trois quarts, en plongée. 'accueil' : vue large et basse, pour une bande. */
  cadrage?: 'essai' | 'accueil';
}

type Role = 'sombre' | 'clair' | 'accent';

/** Ce qu'une forme rend : sa mise à jour, et de quoi la cadrer. */
interface Forme {
  maj: (s: number, immobile: boolean) => void;
  /** Hauteur du point que regarde la caméra. */
  centre: number;
  /** Demi-largeur à tenir dans le cadre. */
  portee: number;
}

const PAS = 0.8;
const HAUT = 0.96;
const PLAQUE = 0.32;
const TOUR = Math.PI * 2;

const adoucir = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rebond = (t: number) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};
const borne = (t: number) => Math.min(1, Math.max(0, t));
/** Une cloche : 1 au centre, 0 au-delà de la largeur. */
const cloche = (ecart: number, largeur: number) => Math.exp(-(ecart * ecart) / (largeur * largeur));

/**
 * Monte une sculpture sur la toile et rend la fonction qui la démonte.
 * Lève si WebGL est indisponible : à l'appelant de garder son image de repli.
 */
export function monterBlocs(toile: HTMLCanvasElement, options: OptionsBlocs = {}): () => void {
  /* Un décor ne réclame pas la carte graphique dédiée : le réglage par défaut
     laisse la machine choisir. */
  const rendu = new WebGLRenderer({ canvas: toile, antialias: true, alpha: true });
  try {
    return construire(toile, options, rendu);
  } catch (erreur) {
    /* Une erreur à mi-montage laisserait un contexte ouvert que plus rien ne
       référence : on le rend avant de la laisser remonter. */
    rendu.dispose();
    rendu.getContext().getExtension('WEBGL_lose_context')?.loseContext();
    throw erreur;
  }
}

function construire(toile: HTMLCanvasElement, options: OptionsBlocs, rendu: WebGLRenderer): () => void {
  const { style = 'verre', forme = 'boucle', decor = 'studio', cadrage = 'essai' } = options;
  const css = getComputedStyle(toile);
  /* Un jeton absent rend une chaîne vide, et `new Color('')` donne du blanc
     sans rien dire : le repli est explicite. */
  const teinte = (nom: string, repli: string) => {
    const valeur = css.getPropertyValue(nom).trim();
    if (!valeur) console.warn(`atelier : jeton ${nom} absent, repli sur ${repli}`);
    return new Color(valeur || repli);
  };
  const nuit = teinte('--color-night-deep', '#0c121f');
  const peche = teinte('--color-peche', '#ffb38a');
  /* En volume, sous la lumière, la pêche du site vire au crème : la matière
     est un ton plus soutenue pour être lue comme la même couleur. */
  const pecheMatiere = new Color('#ff9a68');
  const ivoire = new Color('#e4dfd5');
  const ardoise = new Color(style === 'module' ? '#1b263d' : '#24365f');

  const ecranEtroit = window.matchMedia('(max-width: 640px)');
  const etroit = ecranEtroit.matches;
  const densite = () => Math.min(window.devicePixelRatio || 1, ecranEtroit.matches ? 1.5 : 2);
  rendu.setPixelRatio(densite());
  rendu.outputColorSpace = SRGBColorSpace;
  /* Le rendu neutre garde la pêche pêche : un rendu « cinéma » la délave. */
  rendu.toneMapping = NeutralToneMapping;
  rendu.toneMappingExposure = style === 'verre' ? 1.05 : 0.95;
  rendu.shadowMap.enabled = true;
  rendu.shadowMap.type = PCFShadowMap;
  /* Le verre se calcule dans une image à part : on la réduit sur téléphone. */
  rendu.transmissionResolutionScale = etroit ? 0.6 : 0.9;

  const scene = new Scene();
  if (decor === 'nu') {
    rendu.setClearColor(0x000000, 0);
  } else {
    scene.background = nuit;
    scene.fog = new Fog(nuit, 14, 30);
  }
  const pmrem = new PMREMGenerator(rendu);
  const piece = new RoomEnvironment();
  /* La cible est gardée : c'est elle qu'il faut libérer, sa texture seule ne
     suffit pas, et il faut la refaire quand le contexte revient. */
  let reflets = pmrem.fromScene(piece, 0.04);
  scene.environment = reflets.texture;
  scene.environmentIntensity = style === 'verre' ? 1.3 : 0.5;

  /* La lumière : une clé chaude qui porte les ombres, un contre-jour pêche. */
  const cle = new DirectionalLight('#fff4ea', 1.7);
  cle.position.set(4.5, 9, 5.5);
  cle.castShadow = true;
  cle.shadow.mapSize.set(1024, 1024);
  cle.shadow.radius = 7;
  cle.shadow.bias = -0.0005;
  Object.assign(cle.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 26 });
  scene.add(cle);
  const contre = new PointLight(peche, style === 'verre' ? 34 : cadrage === 'accueil' ? 9 : 26, 16, 1.6);
  contre.position.set(-4.2, 2.6, -3.4);
  scene.add(contre);

  /* Le sol. */
  let trame: CanvasTexture | undefined;
  let matiereSol: MeshStandardMaterial | ShadowMaterial;
  if (decor === 'nu') {
    matiereSol = new ShadowMaterial({ opacity: 0.5 });
  } else {
    if (decor === 'studio') {
      const toileTrame = document.createElement('canvas');
      toileTrame.width = toileTrame.height = 128;
      const pinceau = toileTrame.getContext('2d')!;
      pinceau.fillStyle = `#${nuit.getHexString()}`;
      pinceau.fillRect(0, 0, 128, 128);
      pinceau.strokeStyle = 'rgba(255, 255, 255, 0.17)';
      pinceau.lineWidth = 2;
      pinceau.strokeRect(0, 0, 128, 128);
      trame = new CanvasTexture(toileTrame);
      trame.wrapS = trame.wrapT = RepeatWrapping;
      trame.repeat.set(50, 50);
      trame.colorSpace = SRGBColorSpace;
      trame.anisotropy = rendu.capabilities.getMaxAnisotropy();
    }
    matiereSol = new MeshStandardMaterial({ color: trame ? 0xffffff : nuit, map: trame ?? null, roughness: 0.9, metalness: 0 });
  }
  const sol = new Mesh(new PlaneGeometry(60, 60), matiereSol);
  sol.rotation.x = -Math.PI / 2;
  sol.receiveShadow = true;
  scene.add(sol);

  /* ── Les matières ── */
  const matiere = (role: Role) => {
    if (style === 'verre') {
      return new MeshPhysicalMaterial({
        color: role === 'accent' ? '#ffd0b4' : role === 'sombre' ? '#c9d5f2' : '#ffffff',
        transmission: 1,
        thickness: 1.15,
        ior: 1.46,
        roughness: role === 'accent' ? 0.1 : role === 'sombre' ? 0.2 : 0.3,
        attenuationColor: role === 'accent' ? pecheMatiere : new Color(role === 'sombre' ? '#7089d8' : '#d3ddff'),
        attenuationDistance: role === 'accent' ? 1.05 : role === 'sombre' ? 2.4 : 6,
        clearcoat: 0.6,
        clearcoatRoughness: 0.14,
        dispersion: 0.28,
        emissive: peche,
        emissiveIntensity: 0,
      });
    }
    return new MeshPhysicalMaterial({
      color: role === 'accent' ? pecheMatiere : role === 'clair' ? ivoire : ardoise,
      roughness: style === 'brique' ? 0.36 : 0.74,
      clearcoat: style === 'brique' ? 0.75 : 0.08,
      clearcoatRoughness: 0.24,
      sheen: style === 'module' ? 0.5 : 0,
      sheenRoughness: 0.6,
      sheenColor: new Color('#ffffff'),
      emissive: peche,
      emissiveIntensity: 0,
    });
  };
  /** La lueur de repos de la pièce pêche. */
  const repos = style === 'verre' ? 0.42 : 0.1;

  const construction = new Group();
  scene.add(construction);

  const poser = (geometrie: BufferGeometry, role: Role, parent: Group = construction) => {
    const mat = matiere(role);
    const maille = new Mesh(geometrie, mat);
    maille.castShadow = maille.receiveShadow = true;
    parent.add(maille);
    return { maille, mat };
  };

  /* ── La pile : la construction d'origine ── */
  const formePile = (): Forme => {
    const rayon = style === 'brique' ? 0.055 : 0.15;
    const tenon = new CylinderGeometry(0.245, 0.245, 0.17, 40);
    const jeu = style === 'brique' ? 0.012 : 0.07;
    const piece3d = (large: number, profond: number, haut: number, role: Role) => {
      const groupe = new Group();
      construction.add(groupe);
      const { mat } = poser(new RoundedBoxGeometry(large * PAS - jeu, haut, profond * PAS - jeu, 5, rayon), role, groupe);
      if (style === 'brique') {
        for (let i = 0; i < large; i++) {
          for (let j = 0; j < profond; j++) {
            const t = new Mesh(tenon, mat);
            t.position.set((i - (large - 1) / 2) * PAS, haut / 2 + 0.085, (j - (profond - 1) / 2) * PAS);
            t.castShadow = true;
            groupe.add(t);
          }
        }
      }
      return { groupe, mat };
    };
    const base = PLAQUE + HAUT / 2;
    const plaque = piece3d(8, 2, PLAQUE, 'sombre');
    plaque.groupe.position.y = PLAQUE / 2;
    const gauche = piece3d(2, 2, HAUT, 'clair');
    gauche.groupe.position.set(-2.4, base, 0);
    const milieu = piece3d(2, 2, HAUT, 'sombre');
    milieu.groupe.position.set(0, base, 0);
    const droite = piece3d(2, 2, HAUT, 'clair');
    droite.groupe.position.set(2.4, base, 0);
    const accent = piece3d(2, 2, HAUT, 'accent');
    const reposAccent = base + HAUT;
    accent.groupe.position.set(0, reposAccent, 0);
    const pieces = [plaque, gauche, milieu, droite, accent];
    const hauteurs = pieces.map((p) => p.groupe.position.y);
    const relais = [gauche, milieu, droite];
    const CYCLE = 6.4;
    return {
      centre: cadrage === 'accueil' ? 1.25 : 0.8,
      portee: 3.4,
      maj: (s, immobile) => {
        pieces.forEach((p, i) => {
          const a = immobile ? 1 : borne((s - 0.15 - i * 0.16) / 0.85);
          p.groupe.position.y = hauteurs[i] + (a < 1 ? (1 - rebond(a)) * 6 : 0);
          p.groupe.visible = a > 0;
        });
        const t = immobile ? 0 : Math.max(0, s - 2.2) % CYCLE;
        const leve = adoucir(borne((t - 2.2) / 0.8)) * (1 - adoucir(borne((t - 3.7) / 0.5)));
        const tour = Math.floor(Math.max(0, s - 2.2) / CYCLE) + adoucir(borne((t - 2.3) / 1.2));
        const cale = t > 4.2 && t < 4.5 ? Math.sin(((t - 4.2) / 0.3) * Math.PI) * 0.035 : 0;
        if (s > 2.2 || immobile) {
          accent.groupe.position.y = reposAccent + leve * 1.15 - cale;
          accent.groupe.rotation.y = tour * (Math.PI / 2);
        }
        const eclat = (depuis: number) => {
          const d = t - depuis;
          return d > 0 && d < 0.9 ? Math.sin((d / 0.9) * Math.PI) : 0;
        };
        accent.mat.emissiveIntensity = repos + eclat(4.2) * 0.55;
        relais.forEach((p, i) => {
          p.mat.emissiveIntensity = eclat(4.35 + Math.abs(i - 1) * 0.22 + (i === 1 ? 0 : 0.1)) * 0.5;
        });
        plaque.mat.emissiveIntensity = eclat(4.5) * 0.18;
      },
    };
  };

  /* ── La boucle : un ruban de Möbius en tuiles ── */
  const formeBoucle = (): Forme => {
    const N = 26;
    const R = 2.45;
    const anneau = new Group();
    anneau.position.y = 2.25;
    anneau.rotation.set(-1.0, 0, 0.2);
    construction.add(anneau);
    const tuile = new RoundedBoxGeometry(0.5, 0.17, 1.08, 4, 0.08);
    const tuiles = Array.from({ length: N }, (_, i) => {
      const t = poser(tuile, i === 0 ? 'accent' : i % 2 ? 'clair' : 'sombre', anneau);
      t.maille.rotation.order = 'YXZ';
      return t;
    });
    return {
      centre: 2.0,
      portee: 4.1,
      maj: (s, immobile) => {
        const avance = immobile ? 0.4 : s * 0.2;
        const arrive = immobile ? 1 : adoucir(borne(s / 1.6));
        /* La lueur fait le tour plus vite que le ruban, en sens inverse. */
        const lueur = immobile ? 1.1 : (s * 1.15) % TOUR;
        tuiles.forEach((t, i) => {
          const a = (i / N) * TOUR + avance;
          const r = R * (0.55 + 0.45 * arrive);
          t.maille.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
          /* Un demi-tour de torsion sur l'ensemble de la boucle : le ruban
             n'a qu'une face. */
          t.maille.rotation.set(a / 2, Math.PI / 2 - a, 0);
          t.maille.scale.setScalar(0.4 + 0.6 * adoucir(borne((arrive * (N + 6) - i) / 6)));
          const ecart = Math.abs(((((i / N) * TOUR - lueur) % TOUR) + TOUR + Math.PI) % TOUR - Math.PI);
          t.mat.emissiveIntensity = (i === 0 ? repos : 0) + cloche(ecart, 0.55) * 0.5;
        });
      },
    };
  };

  /* ── Le cube : un casse-tête qui se range tout seul ── */
  const formeCube = (): Forme => {
    const PASC = 0.9;
    const cube = new Group();
    cube.position.y = 2.1;
    cube.rotation.set(0.5, 0.72, 0);
    construction.add(cube);
    const geo = new RoundedBoxGeometry(0.82, 0.82, 0.82, 4, 0.12);
    const blocs: { maille: Mesh; mat: MeshPhysicalMaterial }[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const role: Role = x === 1 && y === 1 && z === 1 ? 'accent' : (x + y + z) % 2 ? 'sombre' : 'clair';
          const b = poser(geo, role, cube);
          b.maille.position.set(x * PASC, y * PASC, z * PASC);
          blocs.push(b);
        }
      }
    }
    /* Une suite de tours tirée au sort avec une graine fixe : le mouvement
       est le même à chaque visite. */
    let graine = 11;
    const hasard = () => (graine = (graine * 16807) % 2147483647) / 2147483647;
    const axes = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];
    const DUREE = 1.9;
    let tourCourant = -1;
    let axe = 0;
    let sens = 1;
    let tranche: { maille: Mesh; p: Vector3; q: Quaternion }[] = [];
    const q = new Quaternion();
    const terminer = () => {
      tranche.forEach(({ maille, p, q: depart }) => {
        q.setFromAxisAngle(axes[axe], (sens * Math.PI) / 2);
        maille.position.copy(p).applyQuaternion(q);
        maille.position.set(
          Math.round(maille.position.x / PASC) * PASC,
          Math.round(maille.position.y / PASC) * PASC,
          Math.round(maille.position.z / PASC) * PASC,
        );
        maille.quaternion.copy(q).multiply(depart);
      });
      tranche = [];
    };
    return {
      centre: 2.05,
      portee: 3.1,
      maj: (s, immobile) => {
        const entree = immobile ? 1 : adoucir(borne(s / 1.3));
        cube.scale.setScalar(0.6 + 0.4 * entree);
        const accent = blocs.find((b) => b.mat.attenuationDistance < 1.2);
        if (accent) accent.mat.emissiveIntensity = repos + (immobile ? 0 : Math.sin(s * 1.6) * 0.12);
        if (immobile) return;
        const temps = Math.max(0, s - 1.4);
        const tour = Math.floor(temps / DUREE);
        if (tour !== tourCourant) {
          terminer();
          tourCourant = tour;
          axe = Math.floor(hasard() * 3);
          sens = hasard() < 0.5 ? -1 : 1;
          const couche = Math.floor(hasard() * 3) - 1;
          const cle2 = (['x', 'y', 'z'] as const)[axe];
          tranche = blocs
            .filter((b) => Math.round(b.maille.position[cle2] / PASC) === couche)
            .map((b) => ({ maille: b.maille, p: b.maille.position.clone(), q: b.maille.quaternion.clone() }));
        }
        const angle = adoucir(borne(((temps % DUREE) - 0.35) / 1.05)) * sens * (Math.PI / 2);
        q.setFromAxisAngle(axes[axe], angle);
        tranche.forEach(({ maille, p, q: depart }) => {
          maille.position.copy(p).applyQuaternion(q);
          maille.quaternion.copy(q).multiply(depart);
        });
      },
    };
  };

  /** Un objet fait de plusieurs volumes de la même matière. */
  const objet = (role: Role, volumes: { geo: BufferGeometry; lieu?: [number, number, number]; tourne?: [number, number, number] }[], parent: Group = construction) => {
    const groupe = new Group();
    parent.add(groupe);
    const mat = matiere(role);
    volumes.forEach(({ geo, lieu, tourne }) => {
      const maille = new Mesh(geo, mat);
      maille.castShadow = maille.receiveShadow = true;
      if (lieu) maille.position.set(...lieu);
      if (tourne) maille.rotation.set(...tourne);
      groupe.add(maille);
    });
    return { groupe, mat };
  };
  const grainMat = new MeshBasicMaterial({ color: peche, toneMapped: false });
  const filMat = new MeshStandardMaterial({ color: '#93a5cf', roughness: 0.35, metalness: 0.25, transparent: true, opacity: 0.55 });

  /* ── Le circuit : une sphère déclenche, une gemme décide, trois objets reçoivent ── */
  const formeCircuit = (): Forme => {
    const Y = 1.05;
    const lieux = {
      depart: new Vector3(-3.5, Y, 0),
      agent: new Vector3(-0.7, Y + 0.1, 0),
      sorties: [new Vector3(2.75, Y - 0.25, -1.9), new Vector3(2.9, Y - 0.3, 0.05), new Vector3(2.75, Y - 0.15, 1.95)],
    };
    const depart = objet('clair', [{ geo: new SphereGeometry(0.66, 56, 40) }]);
    depart.groupe.position.copy(lieux.depart);
    /* La gemme : vingt faces franches, pour que la lumière s'y casse. */
    const agent = objet('accent', [{ geo: new IcosahedronGeometry(0.98, 0) }]);
    agent.mat.flatShading = true;
    agent.groupe.position.copy(lieux.agent);
    const disque = new CylinderGeometry(0.66, 0.66, 0.2, 56);
    const sorties = [
      objet('sombre', [0, 1, 2].map((i) => ({ geo: disque, lieu: [0, (i - 1) * 0.3, 0] as [number, number, number] }))),
      objet('clair', [{ geo: new CapsuleGeometry(0.4, 1.0, 12, 40), tourne: [0, 0, Math.PI / 2] }]),
      objet('sombre', [{ geo: new TorusGeometry(0.56, 0.22, 28, 72), tourne: [Math.PI / 2.6, 0, 0] }]),
    ];
    sorties.forEach((s, i) => s.groupe.position.copy(lieux.sorties[i]));
    const noeuds = [depart, agent, ...sorties];
    const hauteurs = noeuds.map((n) => n.groupe.position.y);

    const fil = (a: Vector3, b: Vector3) => {
      const milieu = a.clone().lerp(b, 0.5);
      const courbe = new CatmullRomCurve3([
        a.clone().add(new Vector3(0.8, 0, 0)),
        new Vector3(milieu.x - 0.25, a.y - 0.05, a.z),
        new Vector3(milieu.x + 0.25, b.y, b.z),
        b.clone().add(new Vector3(-0.85, 0, 0)),
      ]);
      construction.add(new Mesh(new TubeGeometry(courbe, 48, 0.034, 8), filMat));
      return courbe;
    };
    const versAgent = fil(lieux.depart, lieux.agent);
    const versSorties = lieux.sorties.map((l) => fil(lieux.agent, l));
    const grainGeo = new SphereGeometry(0.11, 16, 12);
    const grains = Array.from({ length: 4 }, () => {
      const g = new Mesh(grainGeo, grainMat);
      construction.add(g);
      return g;
    });
    const CYCLE = 4.2;
    return {
      centre: 1.0,
      portee: 4.5,
      maj: (s, immobile) => {
        const t = immobile ? 0 : (Math.max(0, s - 1.2) % CYCLE) / CYCLE;
        noeuds.forEach((n, i) => {
          const a = immobile ? 1 : adoucir(borne((s - i * 0.14) / 0.9));
          n.groupe.scale.setScalar(0.4 + 0.6 * a);
          n.groupe.position.y = hauteurs[i] + (immobile ? 0 : Math.sin(s * 0.9 + i * 1.3) * 0.06);
        });
        if (!immobile) {
          agent.groupe.rotation.set(s * 0.23, s * 0.37, 0);
          sorties[2].groupe.rotation.y = s * 0.5;
        }
        const aller = borne(t / 0.3);
        grains[0].visible = !immobile && t < 0.3;
        grains[0].position.copy(versAgent.getPointAt(adoucir(aller)));
        const retour = borne((t - 0.42) / 0.36);
        versSorties.forEach((courbe, i) => {
          const g = grains[i + 1];
          g.visible = !immobile && t > 0.42 && t < 0.78;
          g.position.copy(courbe.getPointAt(adoucir(retour)));
        });
        depart.mat.emissiveIntensity = cloche(t - 0.02, 0.07) * 0.5;
        agent.mat.emissiveIntensity = repos + cloche(t - 0.36, 0.09) * 0.6;
        sorties.forEach((n, i) => {
          n.mat.emissiveIntensity = cloche(t - 0.82 - i * 0.02, 0.08) * 0.55;
        });
      },
    };
  };

  /* ── La vague : un nid d'abeilles de prismes, traversé par une onde ── */
  const formeVague = (): Forme => {
    const COLS = 14;
    const RANGS = 6;
    const R = 0.3;
    const DX = R * Math.sqrt(3) + 0.05;
    const DZ = R * 1.5 + 0.045;
    const prisme = new CylinderGeometry(R, R, 1, 6);
    const piliers: { maille: Mesh; mat: MeshPhysicalMaterial; i: number; j: number }[] = [];
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < RANGS; j++) {
        const p = poser(prisme, (i * 2 + j) % 3 ? 'clair' : 'sombre');
        p.mat.flatShading = true;
        p.maille.position.set((i - (COLS - 1) / 2 + (j % 2) * 0.5) * DX, 0.5, (j - (RANGS - 1) / 2) * DZ);
        piliers.push({ ...p, i, j });
      }
    }
    return {
      centre: 0.95,
      portee: 4.3,
      maj: (s, immobile) => {
        const temps = immobile ? 1.2 : s;
        const leve = immobile ? 1 : adoucir(borne(s / 1.4));
        piliers.forEach((p) => {
          const phase = p.i * 0.58 + p.j * 0.3 - temps * 1.5;
          const onde = 0.5 + 0.5 * Math.sin(phase);
          const h = (0.26 + 1.6 * Math.pow(onde, 1.6)) * leve + 0.05;
          p.maille.scale.y = h;
          p.maille.position.y = h / 2;
          /* La crête de l'onde est la seule à luire. */
          p.mat.emissiveIntensity = Math.pow(onde, 22) * 0.6;
        });
      },
    };
  };

  /* ── L'agent : un gyroscope, et ses outils en orbite ── */
  const formeAgent = (): Forme => {
    const coeur = new Group();
    coeur.position.y = 2.15;
    construction.add(coeur);
    const noyau = poser(new SphereGeometry(0.98, 72, 48), 'accent', coeur);
    const braise = new Mesh(new SphereGeometry(0.34, 24, 16), grainMat);
    coeur.add(braise);

    /* Trois anneaux inclinés ; chacun porte un ou deux outils, de formes
       différentes, qui tournent avec lui. */
    const outilsGeo = [
      new RoundedBoxGeometry(0.46, 0.46, 0.46, 4, 0.1),
      new ConeGeometry(0.28, 0.56, 32),
      new CylinderGeometry(0.24, 0.24, 0.5, 32),
      new OctahedronGeometry(0.36, 0),
      new SphereGeometry(0.27, 32, 24),
    ];
    const plans: { rayon: number; penche: [number, number, number]; vitesse: number; outils: number[] }[] = [
      { rayon: 1.75, penche: [1.25, 0.2, 0], vitesse: 0.5, outils: [0] },
      { rayon: 2.35, penche: [1.75, 0, 0.75], vitesse: -0.36, outils: [1, 2] },
      { rayon: 2.95, penche: [1.4, 0, -0.7], vitesse: 0.26, outils: [3, 4] },
    ];
    const satellites: { maille: Mesh; mat: MeshPhysicalMaterial }[] = [];
    const anneaux = plans.map((plan) => {
      const support = new Group();
      support.rotation.set(...plan.penche);
      coeur.add(support);
      const tourne = new Group();
      support.add(tourne);
      poser(new TorusGeometry(plan.rayon, 0.04, 14, 160), 'clair', tourne);
      plan.outils.forEach((k, n) => {
        const a = (n / plan.outils.length) * TOUR;
        const sat = poser(outilsGeo[k], n % 2 ? 'clair' : 'sombre', tourne);
        if (k === 3) sat.mat.flatShading = true;
        sat.maille.position.set(Math.cos(a) * plan.rayon, Math.sin(a) * plan.rayon, 0);
        satellites[k] = sat;
      });
      return { tourne, vitesse: plan.vitesse };
    });
    const grain = new Mesh(new SphereGeometry(0.11, 16, 12), grainMat);
    construction.add(grain);
    const ordre = [0, 3, 1, 4, 2];
    const PAS_APPEL = 1.6;
    const centre = new Vector3();
    const cible = new Vector3();
    return {
      centre: 2.1,
      portee: 3.7,
      maj: (s, immobile) => {
        const entree = immobile ? 1 : adoucir(borne(s / 1.3));
        coeur.scale.setScalar(0.5 + 0.5 * entree);
        anneaux.forEach((a, i) => {
          a.tourne.rotation.z = immobile ? i * 1.1 : s * a.vitesse + i * 1.1;
        });
        const temps = Math.max(0, s - 1.4);
        const appel = ordre[Math.floor(temps / PAS_APPEL) % ordre.length];
        const t = immobile ? 0 : (temps % PAS_APPEL) / PAS_APPEL;
        satellites.forEach((sat, k) => {
          sat.maille.rotation.set(s * 0.4 + k, s * 0.3, 0);
          sat.mat.emissiveIntensity = k === appel && !immobile ? cloche(t - 0.45, 0.13) * 0.7 : 0;
        });
        /* Le grain va de la sphère à l'outil appelé, puis revient. */
        coeur.getWorldPosition(centre);
        construction.worldToLocal(centre);
        satellites[appel].maille.getWorldPosition(cible);
        construction.worldToLocal(cible);
        const aller = adoucir(borne(t / 0.38));
        const retour = adoucir(borne((t - 0.56) / 0.38));
        grain.visible = !immobile && s > 1.4 && (t < 0.4 || t > 0.56) && t < 0.95;
        grain.position.copy(centre).lerp(cible, borne(aller - retour));
        noyau.mat.emissiveIntensity = repos + (immobile ? 0 : cloche(t - 0.98, 0.1) * 0.35 + cloche(t - 0.02, 0.08) * 0.35);
        braise.scale.setScalar(immobile ? 1 : 1 + Math.sin(s * 2.2) * 0.12);
      },
    };
  };

  /* ── Les anneaux : le jeu à empiler, un niveau après l'autre ── */
  const formeAnneaux = (): Forme => {
    const SOCLE = 0.24;
    const TUBE = 0.23;
    const rayons = [1.3, 1.08, 0.88, 0.69, 0.5];
    poser(new CylinderGeometry(1.75, 1.85, SOCLE, 72), 'sombre').maille.position.y = SOCLE / 2;
    const tige = poser(new CylinderGeometry(0.1, 0.1, 3.4, 28), 'clair');
    tige.maille.position.y = SOCLE + 1.7;
    const anneaux = rayons.map((r, i) => {
      const a = poser(new TorusGeometry(r, TUBE, 32, 96), i === rayons.length - 1 ? 'accent' : i % 2 ? 'clair' : 'sombre');
      a.maille.rotation.x = Math.PI / 2;
      return { ...a, pose: SOCLE + TUBE + i * (TUBE * 2 - 0.02) };
    });
    const N = anneaux.length;
    const CHUTE = 0.62;
    const TENUE = 2.4;
    const CYCLE = N * CHUTE + TENUE + 1.2;
    return {
      centre: 1.75,
      portee: 3.5,
      maj: (s, immobile) => {
        const temps = immobile ? N * CHUTE + 1 : Math.max(0, s - 0.6) % CYCLE;
        const depart = N * CHUTE + TENUE;
        anneaux.forEach((a, i) => {
          /* La chute, puis à la fin du cycle l'envol, du haut vers le bas. */
          const chute = borne((temps - i * CHUTE) / (CHUTE * 1.15));
          const envol = adoucir(borne((temps - depart - (N - 1 - i) * 0.14) / 0.6));
          const y = a.pose + (chute < 1 ? Math.pow(1 - chute, 2) * 5.2 : 0) + envol * 5.2;
          a.maille.position.y = y;
          a.maille.visible = temps >= i * CHUTE && envol < 0.999;
          a.maille.rotation.z = chute < 1 ? (1 - chute) * 0.5 * (i % 2 ? 1 : -1) : 0;
          a.maille.rotation.x = Math.PI / 2 + (chute < 1 ? (1 - chute) * 0.22 : 0);
          const pose = cloche(temps - (i * CHUTE + CHUTE * 1.15), 0.22);
          a.mat.emissiveIntensity = (i === N - 1 ? repos : 0) + pose * 0.55;
        });
      },
    };
  };

  /* ── La page : une vitre, et un tableau de bord posé dessus ── */
  const formePage = (): Forme => {
    const ecran = new Group();
    ecran.position.set(0, 0.25, 0);
    /* L'écran est tourné vers la caméra, et à peine couché. */
    ecran.rotation.set(-0.12, cadrage === 'accueil' ? 0.35 : 0.62, 0);
    construction.add(ecran);
    type Piece = { groupe: Group; mat: MeshPhysicalMaterial; ordre: number; lieu: Vector3 };
    const pieces: Piece[] = [];
    const piece = (role: Role, volumes: Parameters<typeof objet>[1], lieu: [number, number, number]) => {
      const o = objet(role, volumes, ecran);
      const v = new Vector3(...lieu);
      o.groupe.position.copy(v);
      const p = { ...o, ordre: pieces.length, lieu: v };
      pieces.push(p);
      return p;
    };
    piece('sombre', [{ geo: new RoundedBoxGeometry(5.2, 3.7, 0.14, 5, 0.26) }], [0, 1.95, 0]);
    const point = new SphereGeometry(0.095, 20, 16);
    piece('clair', [-0.3, 0, 0.3].map((x) => ({ geo: point, lieu: [x, 0, 0] as [number, number, number] })), [-2.0, 3.42, 0.14]);
    piece('clair', [{ geo: new CapsuleGeometry(0.085, 1.9, 8, 24), tourne: [0, 0, Math.PI / 2] }], [0.5, 3.42, 0.14]);
    /* Le graphique en anneau : un arc pêche, le reste en verre clair. */
    const part = 0.68;
    const anneau = piece(
      'clair',
      [{ geo: new TorusGeometry(0.66, 0.2, 28, 72, TOUR * (1 - part) - 0.14), tourne: [0, 0, TOUR * part + 0.07] }],
      [-1.4, 2.05, 0.3],
    );
    const arc = objet('accent', [{ geo: new TorusGeometry(0.66, 0.2, 28, 72, TOUR * part - 0.14), tourne: [0, 0, 0.07] }], anneau.groupe);
    /* Les barres : des cylindres, qui grandissent depuis leur pied. */
    const hauteurs = [0.7, 1.15, 0.9, 1.5];
    const barres = hauteurs.map((h, i) => {
      const geo = new CylinderGeometry(0.17, 0.17, h, 32);
      geo.translate(0, h / 2, 0);
      return piece(i === 3 ? 'accent' : i % 2 ? 'sombre' : 'clair', [{ geo }], [0.45 + i * 0.52, 1.35, 0.3]);
    });
    const courbe = new CatmullRomCurve3(
      [-2.1, -1.5, -0.9, -0.3, 0.3, 0.9, 1.5, 2.1].map((x, i) => new Vector3(x, 0.72 + [0.1, 0.34, 0.2, 0.46, 0.3, 0.52, 0.42, 0.62][i] * 0.6, 0.24)),
    );
    const ligne = new Mesh(new TubeGeometry(courbe, 80, 0.035, 8), filMat);
    ecran.add(ligne);
    const repere = new Mesh(new SphereGeometry(0.1, 16, 12), grainMat);
    ecran.add(repere);
    piece('accent', [{ geo: new CapsuleGeometry(0.17, 0.82, 10, 28), tourne: [0, 0, Math.PI / 2] }], [-1.4, 0.92, 0.3]);
    return {
      centre: 2.05,
      portee: 3.5,
      maj: (s, immobile) => {
        pieces.forEach((p) => {
          const a = immobile ? 1 : adoucir(borne((s - 0.15 - p.ordre * 0.11) / 0.9));
          p.groupe.position.set(p.lieu.x, p.lieu.y, p.lieu.z + (1 - a) * 4.5);
          p.groupe.visible = a > 0.001;
        });
        const pret = immobile ? 1 : adoucir(borne((s - 1.4) / 0.8));
        ligne.visible = repere.visible = pret > 0.01;
        barres.forEach((b, i) => {
          b.groupe.scale.y = immobile ? 1 : 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(s * 1.2 + i * 1.15));
        });
        if (!immobile) anneau.groupe.rotation.z = Math.sin(s * 0.5) * 0.35;
        repere.position.copy(courbe.getPointAt(immobile ? 1 : (s * 0.16) % 1));
        arc.mat.emissiveIntensity = repos + (immobile ? 0 : Math.sin(s * 1.5) * 0.1);
      },
    };
  };

  const sculpture = {
    pile: formePile,
    boucle: formeBoucle,
    cube: formeCube,
    circuit: formeCircuit,
    vague: formeVague,
    agent: formeAgent,
    anneaux: formeAnneaux,
    page: formePage,
  }[forme]();

  /* ── Le cadre ── */
  const sens = cadrage === 'accueil' ? new Vector3(0, 0.26, 1) : new Vector3(0.58, 0.39, 0.72);
  sens.normalize();
  const champ = cadrage === 'accueil' ? 20 : 24;
  const large = cadrage === 'accueil' ? 2.3 : 1.25;
  const camera = new PerspectiveCamera(champ, 1, 0.1, 80);
  const cible = new Vector3(0, sculpture.centre, 0);

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointeur = { x: 0, y: 0 };
  const incline = { x: 0, y: 0 };
  let visible = true;
  let image = 0;
  let detruit = false;
  let pret = false;

  const tailler = () => {
    const l = toile.clientWidth;
    const h = toile.clientHeight;
    if (!l || !h) return;
    /* Relue à chaque fois : une rotation d'écran change la densité utile. */
    rendu.setPixelRatio(densite());
    rendu.setSize(l, h, false);
    camera.aspect = l / h;
    /* La caméra se place à la distance qui tient la sculpture dans le cadre,
       et recule encore sur un cadre étroit. */
    const recul = Math.max(1, large / camera.aspect);
    const distance = (sculpture.portee / 3.4) * (cadrage === 'accueil' ? 8.8 : 11.9) * recul;
    camera.position.copy(cible).addScaledVector(sens, distance);
    camera.lookAt(cible);
    camera.updateProjectionMatrix();
  };

  const dessiner = (ms: number) => {
    /* La première image peut porter une heure antérieure au montage : le
       temps ne descend jamais sous zéro. */
    const s = Math.max(0, ms / 1000);
    sculpture.maj(s, reduit);
    incline.x += (pointeur.x - incline.x) * 0.06;
    incline.y += (pointeur.y - incline.y) * 0.06;
    construction.rotation.y = (cadrage === 'accueil' ? -0.42 : -0.2) + (reduit ? 0 : Math.sin(s * 0.28) * 0.16) + incline.x * 0.4;
    construction.rotation.x = incline.y * 0.07;
    rendu.render(scene, camera);
    /* Posé une fois, et seulement si quelque chose a vraiment été dessiné :
       c'est ce drapeau qui fait apparaître la toile par-dessus son image. */
    if (!pret && !rendu.getContext().isContextLost()) {
      pret = true;
      toile.dataset.pret = '';
    }
  };

  /* Le temps de la sculpture part de sa première image à l'écran, pas de son
     montage : sinon son entrée se jouait hors champ. */
  let depart = -1;
  let dernier = 0;
  const boucle = (ms: number) => {
    image = 0;
    if (detruit) return;
    if (depart < 0) depart = ms;
    dernier = ms - depart;
    dessiner(dernier);
    if (visible && !document.hidden) image = requestAnimationFrame(boucle);
  };
  const relancer = () => {
    if (detruit || reduit || image || !visible || document.hidden) return;
    image = requestAnimationFrame(boucle);
  };
  const surDefilement = () => {
    const r = toile.getBoundingClientRect();
    visible = r.bottom > 0 && r.top < window.innerHeight;
    relancer();
  };
  const surPointeur = (e: PointerEvent) => {
    const r = toile.getBoundingClientRect();
    pointeur.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointeur.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  const surSortie = () => {
    pointeur.x = pointeur.y = 0;
  };

  /* Changer la taille vide la toile : on redessine dans la foulée, sinon
     chaque pas de redimensionnement laissait une image vide. Une rotation peut
     aussi faire entrer la toile à l'écran sans défilement. */
  const observateur = new ResizeObserver(() => {
    if (detruit || !pret) return;
    tailler();
    dessiner(reduit ? 0 : dernier);
    if (!reduit) surDefilement();
  });
  tailler();

  /* Le contexte peut être repris par le système (onglet en arrière-plan sur
     téléphone, pilote graphique qui redémarre). La toile s'efface alors
     devant son image de repli, puis revient avec ses reflets refaits. */
  const surPerte = () => {
    cancelAnimationFrame(image);
    image = 0;
    pret = false;
    delete toile.dataset.pret;
  };
  const surRetour = () => {
    if (detruit) return;
    reflets.dispose();
    reflets = pmrem.fromScene(piece, 0.04);
    scene.environment = reflets.texture;
    dessiner(reduit ? 0 : dernier);
    if (!reduit) relancer();
  };

  window.addEventListener('scroll', surDefilement, { passive: true });
  document.addEventListener('visibilitychange', relancer);
  toile.addEventListener('pointermove', surPointeur);
  toile.addEventListener('pointerleave', surSortie);
  toile.addEventListener('webglcontextlost', surPerte);
  toile.addEventListener('webglcontextrestored', surRetour);

  /* Les matières du verre se compilent avant la première image, sans bloquer
     le défilement ; puis une image est dessinée tout de suite, pour que la
     toile ait fini d'apparaître quand elle arrive à l'écran. */
  const demarrer = () => {
    if (detruit) return;
    dessiner(0);
    observateur.observe(toile);
    if (!reduit) {
      surDefilement();
      relancer();
    }
  };
  rendu
    .compileAsync(scene, camera)
    .catch((erreur: unknown) => console.warn('atelier : compilation différée indisponible', erreur))
    .then(demarrer)
    .catch((erreur: unknown) => console.error('atelier : première image en échec', erreur));

  return () => {
    detruit = true;
    cancelAnimationFrame(image);
    observateur.disconnect();
    window.removeEventListener('scroll', surDefilement);
    document.removeEventListener('visibilitychange', relancer);
    toile.removeEventListener('pointermove', surPointeur);
    toile.removeEventListener('pointerleave', surSortie);
    toile.removeEventListener('webglcontextlost', surPerte);
    toile.removeEventListener('webglcontextrestored', surRetour);
    scene.traverse((objet) => {
      if (objet instanceof Mesh) {
        objet.geometry.dispose();
        (Array.isArray(objet.material) ? objet.material : [objet.material]).forEach((m) => m.dispose());
      }
    });
    trame?.dispose();
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
