/*
 * Les entreprises avec lesquelles Lilian a travaillé : clients en mission,
 * employeurs, écoles où il forme. Une seule liste, lue par le bandeau de logos
 * au bas du premier écran de l'accueil.
 *
 * Tous les noms viennent du parcours (`parcours.ts`) et des cas clients
 * publiés : rien n'entre ici qui ne soit attesté ailleurs sur le site.
 *
 * `logo` décrit un fichier de `public/logos/clients/`. Le bandeau le ramène
 * à une silhouette claire, quelle que soit sa couleur d'origine : il faut donc
 * un fond transparent, SVG ou WebP. `largeur` et `hauteur` sont les dimensions
 * du fichier ; elles réservent la place avant le chargement. `echelle` corrige
 * la taille à l'œil : un logo carré ou sur deux lignes paraît plus petit qu'un
 * mot-symbole étiré à hauteur égale.
 *
 * Tant qu'un logo manque, le bandeau compose le nom en lettres : c'est un état
 * propre, pas un trou. Un logo n'entre ici que s'il vient du site officiel de
 * l'entreprise ; dans le doute sur l'entreprise, le nom reste en lettres.
 *
 * Provenance, relevée le 2 octobre 2026 :
 *   Qonto              qonto.com, mot-symbole de l'en-tête
 *   Humble+            humbleplus.com, logo de l'en-tête
 *   Jellysmack         jellysmack.com, mot-symbole de l'en-tête (police d'icônes)
 *   Fraich Touch       déjà dans le dépôt (`public/logos/fraichtouch.svg`), recadré sur son contenu
 *   La Capsule         lacapsule.studio, via l'archive du 21 mai 2025 (site fermé)
 *   Familytrip         familytrip.fr, logo blanc de l'en-tête
 *   Youmanista         youmanista.com/logo.svg
 *   Maria Schools      mariaschools.com, logo blanc
 *   Edumiam            edumiam.com, logo de l'en-tête, sans ses deux taches de
 *                      couleur : en silhouette elles recouvraient les lettres
 *   Deuxième Souffle   deuxieme-souffle.com, logo de l'en-tête
 *   Boost ton Biz      boosttonbiz.fr, logo de l'en-tête
 *   École O'clock      oclock.io, logo clair de l'en-tête
 *
 * Restent en lettres : M Partners, KlaK, Movecool (pas de site officiel
 * retrouvé) et Reborn (deux entreprises françaises portent ce nom).
 */
export interface LogoClient {
  src: string;
  largeur: number;
  hauteur: number;
  echelle?: number;
}

export interface Client {
  nom: string;
  logo?: LogoClient;
}

const logo = (fichier: string, largeur: number, hauteur: number, echelle?: number): LogoClient => ({
  src: `/logos/clients/${fichier}`,
  largeur,
  hauteur,
  echelle,
});

export const clients: Client[] = [
  { nom: 'Qonto', logo: logo('qonto.svg', 82, 24, 0.9) },
  { nom: 'Humble+', logo: logo('humble-plus.webp', 589, 120, 1.05) },
  { nom: 'Jellysmack', logo: logo('jellysmack.svg', 6769, 1024, 0.85) },
  { nom: 'M Partners' },
  { nom: 'Fraich Touch', logo: logo('fraich-touch.svg', 746, 474, 1.9) },
  { nom: 'La Capsule', logo: logo('la-capsule.webp', 457, 90) },
  { nom: 'Familytrip', logo: logo('familytrip.svg', 141, 77, 1.55) },
  { nom: 'KlaK' },
  { nom: 'Youmanista', logo: logo('youmanista.svg', 2139, 1085, 1.6) },
  { nom: 'Maria Schools', logo: logo('maria-schools.webp', 314, 120, 1.25) },
  { nom: 'Edumiam', logo: logo('edumiam.webp', 268, 109, 1.45) },
  { nom: 'Movecool' },
  { nom: 'Reborn' },
  { nom: 'Deuxième Souffle', logo: logo('deuxieme-souffle.svg', 582, 189, 1.25) },
  { nom: 'Boost ton Biz', logo: logo('boost-ton-biz.svg', 142, 95, 1.6) },
  { nom: 'École O’clock', logo: logo('oclock.webp', 500, 120, 0.9) },
];
