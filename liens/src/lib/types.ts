/*
 * Le modèle de la page de liens, partagé par le serveur, le back office et la
 * page publique. Une page = des réglages (profil, thème, boutons, SEO) et une
 * liste ordonnée de blocs.
 */

export const TYPES_BLOC = ['lien', 'titre', 'texte', 'video', 'derniere-video', 'newsletter'] as const;
export type TypeBloc = (typeof TYPES_BLOC)[number];

export const ANIMATIONS = ['aucune', 'brille', 'pulse', 'secoue'] as const;
export type Animation = (typeof ANIMATIONS)[number];

export interface Bloc {
  id: string;
  type: TypeBloc;
  /** Le libellé du bouton, le titre de section ou le texte du paragraphe. */
  titre: string;
  url: string;
  sousTitre: string;
  /** Un emoji, ou le nom d'un réseau (`youtube`, `linkedin`...) pour son logo. */
  icone: string;
  /** Vignette : une URL `/liens/media/...` ou https. */
  image: string;
  /** Visible sur la page publique. Privé = seulement dans le back office. */
  public: boolean;
  /** Suivi par Google : lien `follow`, repris dans les données structurées. */
  indexable: boolean;
  /** Mis en avant : grande carte en tête de sa section. */
  vedette: boolean;
  animation: Animation;
  /** Programmation (ISO), vide = pas de borne. */
  debut: string;
  fin: string;
}

export const STYLES_BOUTON = ['plein', 'contour', 'doux', 'relief', 'verre'] as const;
export type StyleBouton = (typeof STYLES_BOUTON)[number];
export const FORMES_BOUTON = ['pilule', 'arrondi', 'carre'] as const;
export type FormeBouton = (typeof FORMES_BOUTON)[number];

export const RESEAUX = ['youtube', 'linkedin', 'instagram', 'tiktok', 'x', 'github', 'facebook', 'threads', 'twitch', 'spotify', 'email', 'site'] as const;
export type Reseau = (typeof RESEAUX)[number];

export interface Reglages {
  profil: { nom: string; bio: string; avatar: string; badge: boolean };
  reseaux: { reseau: Reseau; url: string }[];
  /** Les icônes des réseaux en haut (sous la bio) ou en bas de page. */
  reseauxPosition: 'haut' | 'bas';
  theme: string;
  bouton: { style: StyleBouton; forme: FormeBouton };
  seo: { titre: string; description: string; indexable: boolean };
  /** Le bouton « Partager » en haut de la page publique. */
  partage: boolean;
}

/** Ce que la page publique reçoit : jamais un bloc privé ni hors programmation. */
export interface PagePublique {
  reglages: Reglages;
  blocs: Bloc[];
}

export interface EtatAdmin {
  reglages: Reglages;
  blocs: Bloc[];
  /** Clics des 30 derniers jours, par bloc. */
  clics: Record<string, number>;
  /** Vrai quand la base vit en mémoire : rien ne survivra au redémarrage. */
  stockageEphemere: boolean;
}

export interface Stats {
  jours: number;
  vues: number;
  visiteurs: number;
  clics: number;
  /** Une entrée par jour, du plus ancien au plus récent. */
  serie: { jour: string; vues: number; clics: number }[];
  blocs: { id: string; titre: string; clics: number }[];
  sources: { nom: string; vues: number }[];
  appareils: { nom: string; vues: number }[];
  /** Mêmes totaux sur la période précédente, pour la tendance. */
  precedent: { vues: number; visiteurs: number; clics: number };
}

/** Ce que le back office demande au serveur (ou à la démo, dans l'aperçu). */
export interface Api {
  charger(): Promise<EtatAdmin>;
  enregistrerBloc(bloc: Bloc): Promise<Bloc>;
  supprimerBloc(id: string): Promise<void>;
  ordonner(ids: string[]): Promise<void>;
  enregistrerReglages(reglages: Reglages): Promise<Reglages>;
  envoyerImage(dataUrl: string): Promise<string>;
  stats(jours: number): Promise<Stats>;
  deconnexion(): Promise<void>;
}

export function nouveauBloc(type: TypeBloc, id: string): Bloc {
  const titres: Record<TypeBloc, string> = {
    lien: '', titre: 'Nouvelle section', texte: '', video: 'Ma vidéo', 'derniere-video': 'Ma dernière vidéo', newsletter: 'Ma newsletter',
  };
  return {
    id, type, titre: titres[type], url: '', sousTitre: type === 'newsletter' ? 'Un e-mail de temps en temps, rien de plus.' : '', icone: '', image: '',
    public: true, indexable: true, vedette: false, animation: 'aucune', debut: '', fin: '',
  };
}

/** Un bloc est-il affiché maintenant ? Public, et dans sa programmation. */
export function estEnLigne(bloc: Bloc, maintenant = Date.now()): boolean {
  if (!bloc.public) return false;
  if (bloc.debut && Date.parse(bloc.debut) > maintenant) return false;
  if (bloc.fin && Date.parse(bloc.fin) <= maintenant) return false;
  return true;
}

export function idYoutube(url: string): string | null {
  const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(url);
  return m?.[1] ?? null;
}
