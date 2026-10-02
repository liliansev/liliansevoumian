/*
 * scene.ts — le moteur des scènes « métier » de l'accueil.
 *
 * Le socle visuel est dans `components/metiers/scene-metier.css` ; ce fichier
 * fait tourner ce qu'il dessine. Une scène est un composant Astro qui importe
 * les deux et n'écrit que son propos.
 *
 * ── Écrire une scène ──
 *
 * 1. Le balisage. La racine remplit son parent (4:3) et porte l'attribut qui
 *    sert de sélecteur ; tout l'intérieur est `aria-hidden`.
 *
 *      <div class="sm est-abouti" data-scene-xxx role="img" aria-label="…">
 *        <div class="sm-plan" aria-hidden="true">
 *          <div class="sm-puces">…deux `sm-puce`…</div>
 *          <svg class="sm-fils">
 *            <g class="sm-fil" data-sm-fil="a" data-de="sortie" data-vers="entree" data-sens="h">
 *              <path class="sm-fil__trait"></path><path class="sm-fil__flux"></path>
 *            </g>
 *          </svg>
 *          <div class="sm-poste poste--un">
 *            <div class="sm-fenetre">…barre, corps, feuille, rangées…</div>
 *            <span class="sm-port" data-sm-port="sortie"></span>
 *          </div>
 *          <span class="sm-noeud" data-sm-noeud="a">…icône…</span>
 *          <span class="sm-bande"></span><span class="sm-grain"></span>
 *        </div>
 *      </div>
 *
 *    Le balisage rend l'IMAGE FIXE, l'état final : c'est ce qu'on voit sans
 *    script. Aucun `id`, aucun dégradé ou `clipPath` SVG nommé : quatre scènes
 *    vivent sur la même page.
 *
 * 2. Le plan. 760 × 570 (`PLAN_LARGE`), redessiné à 360 × 320 (`PLAN_ETROIT`)
 *    quand la racine fait moins de 520 px (`SEUIL_ETROIT`). La scène place ses
 *    postes et ses ports en pixels du plan, dans son style scopé, deux fois :
 *    une pour le grand plan, une dans `@container sm (max-width: 519.98px)`.
 *    `sm-large` et `sm-etroit` masquent une pièce sur l'un ou l'autre plan.
 *    Le texte n'a que quatre tailles, déclarées par le socle (`--sm-note`,
 *    `--sm-texte`, `--sm-fort`, `--sm-titre`, et `--sm-chiffre` pour un
 *    nombre) : une scène n'écrit jamais de `font-size` en pixels.
 *
 * 3. Les fils. Un `<g data-sm-fil>` nomme ses deux ports (`data-de`,
 *    `data-vers`) et son sens de sortie (`data-sens`, `h` ou `v`). Le moteur
 *    trace le fil, pose son `sm-noeud` au milieu, et retrace tout quand le
 *    plan change. Rien à calculer dans la scène.
 *
 * 4. Le script, dans le composant :
 *
 *      import { monterScenes } from '../../lib/metiers/scene';
 *      monterScenes('[data-scene-xxx]', (s) => {
 *        const rangees = s.tous('.sm-rangee');
 *        return {
 *          figer() { …pose l'état final, d'un coup… },
 *          repos() { …pose l'état de départ, d'un coup… },
 *          async tour() { …un tour de boucle, du repos au repos… },
 *        };
 *      });
 *
 *    `figer` est l'image fixe (mouvement réduit, ou boucle en panne) ; `repos`
 *    est appelé à chaque (re)lancement ; `tour` est rappelé sans fin.
 *
 * 5. Le temps. Dans `tour`, TOUT le temps passe par le moteur : `attendre`,
 *    `animer`, `jouer`, et les gestes (`voler`, `courir`, `passer`, `lire`,
 *    `compter`). Jamais de `setTimeout` ni de `requestAnimationFrame` : c'est
 *    parce que chaque attente est une animation que la scène peut s'arrêter
 *    net hors écran et reprendre où elle en était.
 *
 * 6. L'annulation. Quand la boucle est relancée (changement de plan, de
 *    réglage de mouvement), ses animations sont annulées et l'attente en cours
 *    rejette avec `AbortError` : `tour` se défait tout seul, sans contrôle à
 *    écrire. Deux règles en découlent. Ne pas attraper les erreurs des aides
 *    (le moteur ne tait que `AbortError`, tout le reste remonte en console et
 *    fige la scène). Et toute promesse qu'on n'attend pas passe par
 *    `enMarge` : jamais de promesse flottante.
 *
 * Minutage : une boucle de 10 à 14 s, un seul mouvement principal à la fois,
 * une image finale tenue 2 à 3 s, un rangement de moins d'une seconde.
 */

export const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const ELAN = 'cubic-bezier(0.5, 0, 0.75, 0)';

export const PLAN_LARGE = { l: 760, h: 570 } as const;
export const PLAN_ETROIT = { l: 360, h: 320 } as const;
/* Le seuil est appliqué par la feuille de style (requête de conteneur) ; il
   est rappelé ici pour qui écrit une scène. */
export const SEUIL_ETROIT = 520;

export interface Pt {
  x: number;
  y: number;
}

export interface Cadre extends Pt {
  w: number;
  h: number;
}

/* Un départ ou une arrivée de bande : un élément (on prend alors sa bande de
   surlignage, sans les trois pixels du haut et du bas) ou un rectangle exact
   dans le repère du plan. */
export type Zone = HTMLElement | Cadre;

export interface OptionsVol {
  /* Durée totale, en ms (640 par défaut). */
  duree?: number;
  /* L'allure du trajet lui-même. */
  easing?: string;
  /* La bande apparaît sur place au lieu d'être déjà là. */
  eclot?: boolean;
  /* Part de la durée passée sur le départ avant de bouger (0 par défaut). */
  pose?: number;
  /* Part de la durée à laquelle la bande est arrivée ; le reste est son
     effacement, qui découvre ce qu'elle a posé (0.82 par défaut). */
  arrivee?: number;
}

export interface OptionsCourse {
  duree?: number;
  easing?: string;
}

export interface OptionsCompte {
  /* Nombre de pas (8) et durée de chacun, en ms (38). */
  pas?: number;
  intervalle?: number;
  /* Comment écrire le nombre (`euros` par défaut). */
  format?: (n: number) => string;
}

export interface Passage {
  bande: HTMLElement;
  grain: HTMLElement;
  de: HTMLElement;
  vers: HTMLElement;
  /* Le nom du fil emprunté (`data-sm-fil`). */
  fil: string;
  /* La bande apparaît sur la source au lieu d'y être déjà (une rangée qui
     n'était pas surlignée). */
  eclot?: boolean;
}

export interface Scene {
  readonly racine: HTMLElement;
  readonly plan: HTMLElement;
  /* Vrai sur le plan étroit. */
  readonly etroit: boolean;

  /* Un élément de la scène ; lève s'il manque. */
  un<T extends Element = HTMLElement>(selecteur: string): T;
  tous<T extends Element = HTMLElement>(selecteur: string): T[];
  /* Ceux qui sont affichés : le plan étroit en masque (`sm-large`). */
  affiches<T extends HTMLElement>(elements: T[]): T[];
  /* Le rectangle d'un élément dans le repère du plan. */
  cadreDe(element: HTMLElement): Cadre;
  /* Un point de ce rectangle (son centre par défaut). */
  lieu(element: HTMLElement, ax?: number, ay?: number): Pt;

  /* Lance une animation sans l'attendre. */
  jouer(element: Element, images: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions): Animation;
  /* Lance une animation et attend sa fin. */
  animer(element: Element, images: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions): Promise<void>;
  attendre(ms: number): Promise<void>;
  /* Laisse courir un travail en parallèle, sans promesse flottante. */
  enMarge(travail: Promise<unknown>): void;

  /* Une pastille d'état change de valeur, avec un petit ressort. */
  basculer(etat: HTMLElement, valeur?: string): void;
  /* Un texte change, la nouvelle valeur tombe en place. */
  tictac(element: HTMLElement, texte: string): void;
  /* Un nombre monte par petits pas jusqu'à sa valeur. */
  compter(element: HTMLElement, de: number, vers: number, options?: OptionsCompte): Promise<void>;
  /* Le trait de lecture descend son bloc ; chaque ligne reçoit `est-lu` quand
     il la traverse. */
  lire(balai: HTMLElement, lignes: HTMLElement[], duree?: number): Promise<void>;

  /* Le port nommé (`data-sm-port`). */
  port(nom: string): HTMLElement;
  /* Allume un fil, son nœud et son port de départ ; avec `entier`, son port
     d'arrivée aussi (pour l'image fixe). */
  allumer(fil: string, entier?: boolean): void;
  /* Éteint un fil et ses deux ports ; sans nom, tous les fils. */
  eteindre(fil?: string): void;
  /* Un grain parcourt le fil, de son port de départ à son port d'arrivée. */
  courir(grain: HTMLElement, fil: string, options?: OptionsCourse): Promise<void>;
  /* Une bande vole d'une zone à une autre, puis s'efface. */
  voler(bande: HTMLElement, de: Zone, vers: Zone, options?: OptionsVol): Promise<void>;
  /* Le passage complet d'une ligne par un fil : la bande se resserre dans le
     port de départ, un grain traverse, la bande se redéploie sur sa cible.
     Rend la main quand la bande est posée : c'est le moment de remplir. */
  passer(passage: Passage): Promise<void>;
}

/* Ce qu'une scène déclare. */
export interface Partition {
  /* L'image fixe : l'état final, posé d'un coup. */
  figer(): void;
  /* L'état de départ de la boucle, posé d'un coup. */
  repos(): void;
  /* Un tour de boucle, du repos au repos. */
  tour(): Promise<void>;
}

const formatEuros = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Un montant à la française, sans le signe : « 1 284,50 ». */
export const euros = (montant: number): string => formatEuros.format(montant);

/* Une animation annulée rejette avec `AbortError`. C'est la seule erreur que
   le moteur tait : elle veut dire « cette boucle n'a plus cours ». */
export const estArret = (erreur: unknown): boolean => erreur instanceof DOMException && erreur.name === 'AbortError';

interface Fil {
  groupe: SVGGElement;
  chemin: SVGPathElement;
  depart: HTMLElement;
  arrivee: HTMLElement;
  noeud: HTMLElement | null;
  sens: 'h' | 'v';
}

/* La taille d'une bande quand elle entre dans un port : un tiret. */
const TIRET = { w: 16, h: 6 };
/* Ce que le surlignage laisse en haut et en bas de sa ligne. */
const MARGE_BANDE = 3;
const OPACITE_BANDE = 0.95;

/*
 * Monte chaque scène qui répond au sélecteur, chacune sur sa propre racine et
 * avec son propre état. Sans les API nécessaires (navigateurs d'avant 2020),
 * la scène reste l'image fixe du HTML : mieux qu'un script qui s'arrête à
 * mi-chemin.
 */
export function monterScenes(selecteur: string, ecrire: (scene: Scene) => Partition): void {
  const pret = 'animate' in Element.prototype && 'ResizeObserver' in window && 'IntersectionObserver' in window;
  if (!pret) return;
  document.querySelectorAll<HTMLElement>(selecteur).forEach((racine) => {
    /* La marque est sur la racine, pas dans le module : aucun état partagé. */
    if (racine.dataset.smMontee !== undefined) return;
    racine.dataset.smMontee = '';
    try {
      monter(racine, selecteur, ecrire);
    } catch (erreur) {
      console.error(`Scène ${selecteur} : montage impossible, elle reste une image fixe`, erreur);
    }
  });
}

function monter(racine: HTMLElement, nom: string, ecrire: (scene: Scene) => Partition): void {
  const trouve = racine.querySelector<HTMLElement>('.sm-plan');
  if (!trouve) throw new Error(`Scène ${nom} : il manque le plan (.sm-plan)`);
  const plan = trouve;

  /* L'horloge : un élément sans rendu dont les animations vides portent les
     attentes. Elles se suspendent et s'annulent avec toutes les autres. */
  const horloge = document.createElement('i');
  horloge.className = 'sm-horloge';
  plan.append(horloge);

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)');
  let partition: Partition | null = null;
  let jeton = 0;
  let visible = false;
  let enMarche = false;
  /* Le visiteur a mis la scène en pause (voir la commande d'arrêt, en bas). */
  let arretee = false;
  let largeurPlan = 0;

  /* ── Le DOM ── */

  const un = <T extends Element = HTMLElement>(selecteur: string): T => {
    const element = racine.querySelector<T>(selecteur);
    if (!element) throw new Error(`Scène ${nom} : aucun élément « ${selecteur} »`);
    return element;
  };

  const tous = <T extends Element = HTMLElement>(selecteur: string): T[] => [...racine.querySelectorAll<T>(selecteur)];

  const affiches = <T extends HTMLElement>(elements: T[]): T[] => elements.filter((el) => el.offsetParent !== null);

  /* Lu sur la mise en page et non à l'écran : ni l'échelle du plan ni une
     animation en cours ne faussent le rectangle. */
  const cadreDe = (element: HTMLElement): Cadre => {
    let x = 0;
    let y = 0;
    let n: HTMLElement | null = element;
    while (n && n !== plan) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent instanceof HTMLElement ? n.offsetParent : null;
    }
    return { x, y, w: element.offsetWidth, h: element.offsetHeight };
  };

  const lieu = (element: HTMLElement, ax = 0.5, ay = 0.5): Pt => {
    const c = cadreDe(element);
    return { x: c.x + c.w * ax, y: c.y + c.h * ay };
  };

  /* ── Le temps ── */

  /* Les animations que le moteur a lancées et qui ne sont pas finies. Il les
     tient lui-même : `getAnimations()` ne rend plus une animation mise en
     pause sur sa toute dernière image, et celle-là n'était donc jamais
     relancée. Sa promesse ne se résolvait pas, la boucle l'attendait pour
     toujours, et la scène restait figée après un aller-retour hors écran. */
  const vivantes = new Set<Animation>();

  /* Une animation née pendant que la scène est hors écran naît en pause. */
  const jouer = (
    element: Element,
    images: Keyframe[] | PropertyIndexedKeyframes,
    options: KeyframeAnimationOptions,
  ): Animation => {
    const animation = element.animate(images, options);
    vivantes.add(animation);
    const oublier = () => vivantes.delete(animation);
    animation.finished.then(oublier, oublier);
    if (!enMarche) animation.pause();
    return animation;
  };

  /* Celles du moteur, plus celles que le CSS a créées dans la scène
     (transitions, animations déclarées dans une feuille de style). */
  const toutes = (): Set<Animation> => new Set([...vivantes, ...racine.getAnimations({ subtree: true })]);

  const animer = (
    element: Element,
    images: Keyframe[] | PropertyIndexedKeyframes,
    options: KeyframeAnimationOptions,
  ): Promise<void> => jouer(element, images, options).finished.then(() => undefined);

  const attendre = (ms: number): Promise<void> => animer(horloge, { opacity: [0, 0] }, { duration: Math.max(1, ms) });

  const annuler = () => toutes().forEach((animation) => animation.cancel());

  /* Une boucle qui lève s'arrêterait sans bruit, scène figée au milieu d'un
     geste. Ici elle laisse une trace et la scène retombe sur son image fixe.
     Un arrêt, lui, est attendu : la boucle a été remplacée. */
  const signaler = (erreur: unknown) => {
    if (estArret(erreur)) return;
    console.error(`Scène ${nom} : la boucle s’est arrêtée`, erreur);
    jeton += 1;
    annuler();
    partition?.figer();
  };

  const enMarge = (travail: Promise<unknown>) => {
    travail.catch(signaler);
  };

  const regler = () => {
    const voulu = visible && !document.hidden && !arretee;
    if (voulu === enMarche) return;
    enMarche = voulu;
    for (const animation of toutes()) {
      if (!voulu) {
        if (animation.playState === 'running') animation.pause();
        continue;
      }
      /* Seulement celles que la pause a suspendues : relancer une animation
         finie la rejouerait depuis le début. Et une animation suspendue sur sa
         dernière image se termine au lieu de repartir : `play()` la
         rembobinerait. */
      if (animation.playState !== 'paused') continue;
      const fin = Number(animation.effect?.getComputedTiming().endTime);
      const instant = Number(animation.currentTime);
      if (Number.isFinite(fin) && instant >= fin) animation.finish();
      else animation.play();
    }
  };

  /* ── Les fils ── */

  const ports = new Map<string, HTMLElement>();
  tous('[data-sm-port]').forEach((p) => ports.set(p.dataset.smPort ?? '', p));

  const port = (nomPort: string): HTMLElement => {
    const p = ports.get(nomPort);
    if (!p) throw new Error(`Scène ${nom} : aucun port « ${nomPort} »`);
    return p;
  };

  const fils = new Map<string, Fil>();
  tous<SVGGElement>('[data-sm-fil]').forEach((groupe) => {
    const nomFil = groupe.dataset.smFil ?? '';
    const chemin = groupe.querySelector('path');
    if (!chemin) throw new Error(`Scène ${nom} : le fil « ${nomFil} » n’a pas de tracé`);
    fils.set(nomFil, {
      groupe,
      chemin,
      depart: port(groupe.dataset.de ?? ''),
      arrivee: port(groupe.dataset.vers ?? ''),
      noeud: racine.querySelector<HTMLElement>(`[data-sm-noeud="${nomFil}"]`),
      sens: groupe.dataset.sens === 'v' ? 'v' : 'h',
    });
  });

  const filDe = (nomFil: string): Fil => {
    const fil = fils.get(nomFil);
    if (!fil) throw new Error(`Scène ${nom} : aucun fil « ${nomFil} »`);
    return fil;
  };

  /* Un fil part d'un port et arrive à l'autre en quittant chaque fenêtre
     d'équerre : à l'horizontale (`h`) ou à la verticale (`v`). Son nœud se
     pose au milieu. */
  const tracer = () => {
    tous<SVGSVGElement>('.sm-fils').forEach((svg) =>
      svg.setAttribute('viewBox', `0 0 ${plan.offsetWidth} ${plan.offsetHeight}`),
    );
    fils.forEach((fil) => {
      const de = lieu(fil.depart);
      const vers = lieu(fil.arrivee);
      const tire =
        fil.sens === 'h'
          ? Math.min(70, Math.max(22, Math.abs(vers.x - de.x) * 0.9))
          : Math.min(48, Math.max(12, Math.abs(vers.y - de.y) * 0.6));
      const d =
        fil.sens === 'h'
          ? `M${de.x} ${de.y} C${de.x + tire} ${de.y} ${vers.x - tire} ${vers.y} ${vers.x} ${vers.y}`
          : `M${de.x} ${de.y} C${de.x} ${de.y + tire} ${vers.x} ${vers.y - tire} ${vers.x} ${vers.y}`;
      fil.groupe.querySelectorAll('path').forEach((chemin) => chemin.setAttribute('d', d));
      if (!fil.noeud) return;
      const milieu = fil.chemin.getPointAtLength(fil.chemin.getTotalLength() / 2);
      fil.noeud.style.left = `${milieu.x}px`;
      fil.noeud.style.top = `${milieu.y}px`;
    });
  };

  /* Les points du fil, à pas réguliers : le grain les suit. */
  const parcours = (fil: Fil, pas = 22): Pt[] => {
    const longueur = fil.chemin.getTotalLength();
    return Array.from({ length: pas + 1 }, (_, i) => {
      const p = fil.chemin.getPointAtLength((longueur * i) / pas);
      return { x: p.x, y: p.y };
    });
  };

  const allumer = (nomFil: string, entier = false) => {
    const fil = filDe(nomFil);
    fil.groupe.classList.add('est-allume');
    fil.noeud?.classList.add('est-allume');
    fil.depart.classList.add('est-actif');
    if (entier) fil.arrivee.classList.add('est-actif');
  };

  const eteindre = (nomFil?: string) => {
    const cibles = nomFil === undefined ? [...fils.values()] : [filDe(nomFil)];
    cibles.forEach((fil) => {
      fil.groupe.classList.remove('est-allume');
      fil.noeud?.classList.remove('est-allume');
      fil.depart.classList.remove('est-actif');
      fil.arrivee.classList.remove('est-actif');
    });
  };

  /* ── Les gestes ── */

  const basculer = (etat: HTMLElement, valeur = 'fait') => {
    etat.dataset.etat = valeur;
    jouer(etat, [{ transform: 'scale(0.8)' }, { transform: 'none' }], { duration: 460, easing: EXPO });
  };

  const tictac = (element: HTMLElement, texte: string) => {
    element.textContent = texte;
    jouer(element, [{ transform: 'translateY(-38%)', opacity: 0.2 }, { transform: 'none', opacity: 1 }], {
      duration: 260,
      easing: EXPO,
    });
  };

  /* Les pas passent par l'horloge de la scène : ils s'arrêtent avec elle. */
  const compter = async (element: HTMLElement, de: number, vers: number, options: OptionsCompte = {}) => {
    const { pas = 8, intervalle = 38, format = euros } = options;
    for (let i = 1; i <= pas; i++) {
      await attendre(intervalle);
      const t = 1 - Math.pow(1 - i / pas, 3);
      element.textContent = format(de + (vers - de) * t);
    }
    element.textContent = format(vers);
  };

  const lire = async (balai: HTMLElement, lignes: HTMLElement[], duree = 1100) => {
    const bloc = balai.offsetParent instanceof HTMLElement ? balai.offsetParent : null;
    if (!bloc) throw new Error(`Scène ${nom} : le trait de lecture n’a pas de bloc à descendre`);
    const hauteur = bloc.offsetHeight;
    const haut = cadreDe(bloc).y;
    await Promise.all([
      animer(
        balai,
        [
          { transform: 'translateY(0)', opacity: 0 },
          { opacity: 1, offset: 0.08 },
          { opacity: 1, offset: 0.9 },
          { transform: `translateY(${hauteur}px)`, opacity: 0 },
        ],
        { duration: duree, easing: 'linear' },
      ),
      ...lignes.map(async (ligne) => {
        const c = cadreDe(ligne);
        await attendre((duree * (c.y - haut + c.h * 0.4)) / hauteur);
        ligne.classList.add('est-lu');
      }),
    ]);
  };

  const bandeDe = (zone: Zone): Cadre => {
    if (!(zone instanceof HTMLElement)) return zone;
    const c = cadreDe(zone);
    return { x: c.x, y: c.y + MARGE_BANDE, w: c.w, h: c.h - MARGE_BANDE * 2 };
  };

  const tiretAu = (p: Pt): Cadre => ({ x: p.x - TIRET.w / 2, y: p.y - TIRET.h / 2, w: TIRET.w, h: TIRET.h });

  /* La bande est posée sur le plus grand des deux rectangles et réduite pour
     l'autre : ses coins arrondis restent justes là où on la voit en grand. */
  const voler = (bande: HTMLElement, de: Zone, vers: Zone, options: OptionsVol = {}): Promise<void> => {
    const { duree = 640, easing = 'cubic-bezier(0.45, 0, 0.15, 1)', eclot = false, pose = 0, arrivee = 0.82 } = options;
    const a = bandeDe(de);
    const z = bandeDe(vers);
    const base = a.w * a.h >= z.w * z.h ? a : z;
    const sur = (c: Cadre) =>
      c === base
        ? 'none'
        : `translate(${c.x - base.x}px, ${c.y - base.y}px) scale(${c.w / base.w}, ${c.h / base.h})`;
    Object.assign(bande.style, {
      left: `${base.x}px`,
      top: `${base.y}px`,
      width: `${base.w}px`,
      height: `${base.h}px`,
    });
    const images: Keyframe[] =
      pose > 0
        ? [
            { transform: sur(a), opacity: eclot ? 0 : OPACITE_BANDE },
            { transform: sur(a), opacity: OPACITE_BANDE, offset: pose, easing },
          ]
        : [{ transform: sur(a), opacity: eclot ? 0 : OPACITE_BANDE, easing }];
    images.push({ transform: sur(z), opacity: OPACITE_BANDE, offset: arrivee }, { transform: sur(z), opacity: 0 });
    return animer(bande, images, { duration: duree });
  };

  const courir = (grain: HTMLElement, nomFil: string, options: OptionsCourse = {}): Promise<void> => {
    const { duree = 520, easing = 'cubic-bezier(0.45, 0, 0.25, 1)' } = options;
    const points = parcours(filDe(nomFil));
    const dernier = points.length - 1;
    return animer(
      grain,
      points.map((pt, n) => ({
        transform: `translate(${pt.x}px, ${pt.y}px)`,
        opacity: n === 0 || n === dernier ? 0 : 1,
      })),
      { duration: duree, easing },
    );
  };

  const passer = async ({ bande, grain, de, vers, fil: nomFil, eclot = false }: Passage) => {
    const fil = filDe(nomFil);
    enMarge(voler(bande, de, tiretAu(lieu(fil.depart)), { duree: 460, pose: 0.2, arrivee: 0.9, easing: ELAN, eclot }));
    await attendre(380);
    enMarge(courir(grain, nomFil));
    await attendre(210);
    /* Le grain passe le nœud : il tressaille, c'est là que ça se relie. */
    if (fil.noeud) {
      jouer(fil.noeud, [{ scale: 1 }, { scale: 1.24, offset: 0.35 }, { scale: 1 }], { duration: 320, easing: 'ease-out' });
    }
    await attendre(240);
    fil.arrivee.classList.add('est-actif');
    enMarge(
      voler(bande, tiretAu(lieu(fil.arrivee)), vers, { duree: 680, pose: 0.06, arrivee: 0.64, easing: EXPO, eclot: true }),
    );
    await attendre(400);
  };

  const scene: Scene = {
    racine,
    plan,
    get etroit() {
      return plan.offsetWidth < PLAN_LARGE.l;
    },
    un,
    tous,
    affiches,
    cadreDe,
    lieu,
    jouer,
    animer,
    attendre,
    enMarge,
    basculer,
    tictac,
    compter,
    lire,
    port,
    allumer,
    eteindre,
    courir,
    voler,
    passer,
  };

  const ecrite = ecrire(scene);
  partition = ecrite;

  /* ── La boucle ── */

  async function boucler(j: number) {
    ecrite.repos();
    while (j === jeton) await ecrite.tour();
  }

  /* Tout ce que l'ancienne boucle attendait est annulé : elle se défait sur
     son `AbortError`, et la nouvelle part d'un état propre. */
  function relancer() {
    jeton += 1;
    annuler();
    if (reduit.matches) ecrite.figer();
    else enMarge(boucler(jeton));
  }

  /* ── L'échelle ── */

  const ajuster = () => {
    const l = racine.clientWidth;
    const h = racine.clientHeight;
    if (!l || !h) return;
    const k = Math.min(l / plan.offsetWidth, h / plan.offsetHeight);
    plan.style.setProperty('--k', String(k));
    plan.style.setProperty('--x', `${(l - plan.offsetWidth * k) / 2}px`);
    plan.style.setProperty('--y', `${(h - plan.offsetHeight * k) / 2}px`);
    /* Le plan a changé de dessin (large ou étroit) : les ports ont bougé, les
       fils sont à retracer et la boucle repart sur la nouvelle mise en page,
       sans vol calculé pour l'ancienne. */
    if (plan.offsetWidth !== largeurPlan) {
      const premier = largeurPlan === 0;
      largeurPlan = plan.offsetWidth;
      tracer();
      if (!premier) relancer();
    }
  };

  ajuster();
  /* Deux images plus tard : le temps que le repos soit peint sans transition
     (voir la règle `:not([data-pret])` du socle). */
  requestAnimationFrame(() => requestAnimationFrame(() => (racine.dataset.pret = '')));
  new ResizeObserver(ajuster).observe(racine);
  new IntersectionObserver(
    (entrees) => {
      /* Le dernier relevé fait foi : un même appel peut en porter plusieurs. */
      const dernier = entrees[entrees.length - 1];
      if (!dernier) return;
      visible = dernier.intersectionRatio >= 0.12;
      regler();
    },
    { threshold: [0, 0.12] },
  ).observe(racine);
  document.addEventListener('visibilitychange', regler);
  /* `addEventListener` manque sur cet objet avant Safari 14 : sans lui, la
     scène garde simplement le régime de son chargement. */
  reduit.addEventListener?.('change', relancer);

  /* ── La commande d'arrêt ──
     Une scène qui boucle sans fin à côté d'un texte doit pouvoir être arrêtée,
     au clavier comme au doigt. Le bouton est posé APRÈS la racine, pas dedans :
     la racine est une image (`role="img"`), ce qu'elle contient n'est pas
     annoncé. Il s'appuie sur la pause du moteur : la scène s'arrête net et
     reprend où elle en était. Rien à arrêter en mouvement réduit. */
  if (!reduit.matches) {
    const commande = document.createElement('button');
    commande.type = 'button';
    commande.className = 'sm-pause';
    commande.setAttribute('aria-pressed', 'false');
    commande.innerHTML =
      '<span class="sr-only">Mettre l’animation en pause</span>' +
      '<svg class="sm-pause__arret" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/></svg>' +
      '<svg class="sm-pause__lecture" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M5.5 3.2v9.6l7.6-4.8z"/></svg>';
    const nom = commande.querySelector('.sr-only');
    commande.addEventListener('click', () => {
      arretee = !arretee;
      commande.setAttribute('aria-pressed', String(arretee));
      /* Le nom dit ce que le bouton fera. */
      if (nom) nom.textContent = arretee ? 'Relancer l’animation' : 'Mettre l’animation en pause';
      regler();
    });
    racine.after(commande);
  }

  relancer();
}
