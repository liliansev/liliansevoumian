---
name: Lilian Sevoumian
description: "Site personnel de Lilian Sevoumian : automatisation, agents IA, formations, sites web. Bleu nuit en fond général, un seul accent pêche, le clair seulement dans un panneau inversé arrondi. Sur l'accueil, direction « tech propre » : tout se pose sur une grille, le surlignage devient une pastille droite, et chaque métier a sa scène d'interface animée."
colors:
  paper: "#111827"
  section-band: "#161f32"
  surface-low: "#1a2439"
  surface-high: "#1f2a42"
  night: "#111827"
  night-soft: "#263449"
  night-deep: "#0c121f"
  ink: "#ffffff"
  ink-mid: "#c3c9d4"
  ink-low: "#a3acbb"
  ink-faint: "#7c8799"
  divider: "#2a3548"
  service-border: "#2f3b52"
  grid-line: "#1d2739"
  grid-line-active: "#3d4a62"
  border-strong: "#8591a6"
  peche: "#ffb38a"
  peche-clair: "#ffc4a3"
  accent-soft: "#3c3439"
  focus: "#ffb38a"
  error: "#ff8073"
  panel: "#f7f8fa"
  panel-surface-low: "#eef0f4"
  panel-surface-high: "#ffffff"
  panel-ink-mid: "#4b5565"
  panel-ink-low: "#5d6777"
  panel-ink-faint: "#8b94a3"
  panel-divider: "#dce1e8"
  panel-accent-soft: "#ffe9dd"
  panel-error: "#b3261e"
  feuille: "#f7f8fa"
  feuille-trait: "#dce1e8"
  feuille-barre: "#c3c9d4"
  lueur-froide: "#6f7cff"
  braise: "#ff8a65"
typography:
  affiche:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.125rem, min(4.6vw + 0.4rem, 11svh), 4.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  story:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, min(3.6vw + 0.5rem, 8svh), 4rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  phrase:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.625rem, 2.2vw + 0.6rem, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  display-hero:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.25rem, 6vw + 1.2rem, 6.25rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  display:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 5vw + 1rem, 5.25rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title-lg:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 1.5vw + 0.75rem, 1.875rem)"
    fontWeight: 600
  title:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.25rem, 1vw + 0.875rem, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body-large:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.0625rem, 0.5vw + 0.875rem, 1.25rem)"
    fontWeight: 400
  body:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  body-sm:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  button:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(0.75rem, 3.1vw, 0.875rem)"
    fontWeight: 500
    letterSpacing: "0.02em"
  label:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
  caption:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "clamp(1rem, 0.6rem + 1.2vw, 1.5rem)"
  xl: "clamp(1.25rem, 0.6rem + 2vw, 2rem)"
  diagram: "16px"
  cta: "9999px"
  full: "9999px"
spacing:
  section-y: "clamp(5rem, 8vw, 8rem)"
  section-x: "clamp(1.5rem, 5vw, 7.5rem)"
  service-card: "clamp(1.25rem, 3vw, 2.5rem)"
  home-hero-y: "clamp(3rem, 5vw, 5rem)"
  grid-cell: "96px"
components:
  button-primary:
    backgroundColor: "{colors.peche}"
    textColor: "{colors.night}"
    typography: "{typography.button}"
    rounded: "{rounded.cta}"
    padding: "11px 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.peche-clair}"
    textColor: "{colors.night}"
  button-primary-on-panel:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cta}"
    padding: "11px 22px"
  button-primary-on-panel-hover:
    backgroundColor: "{colors.night-soft}"
    textColor: "{colors.ink}"
  link-cta:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "44px"
  link-cta-hover:
    backgroundColor: "{colors.peche}"
    textColor: "{colors.night}"
  mark:
    backgroundColor: "{colors.peche}"
    textColor: "{colors.night}"
    padding: "0.02em 0.2em"
  mark-pastille:
    backgroundColor: "{colors.peche}"
    textColor: "{colors.night}"
    rounded: "{rounded.full}"
    padding: "0.02em 0.36em 0.08em"
  logo-client:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    height: "1.5em"
  scene-cadre:
    backgroundColor: "{colors.night-deep}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  chip-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.peche}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  service-card-hover:
    backgroundColor: "{colors.section-band}"
    textColor: "{colors.ink}"
  faq-item:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px 24px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.cta}"
    height: "48px"
    padding: "0 16px"
  media:
    backgroundColor: "{colors.surface-low}"
    rounded: "{rounded.lg}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  bande-nuit:
    backgroundColor: "{colors.section-band}"
    textColor: "{colors.ink}"
  panneau-clair:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.night}"
    rounded: "{rounded.xl}"
  footer:
    backgroundColor: "{colors.night-deep}"
    textColor: "{colors.ink-mid}"
---

# Design System: Lilian Sevoumian

## Overview

**Creative North Star : « Nuit et pêche »**

Le site est celui d'une personne : Lilian, ce qu'il a fait et ce qu'il fait
aujourd'hui. L'accueil raconte, dans l'ordre fixé par lui : vous perdez du
temps, voilà pourquoi, voilà pourquoi automatiser, voilà pourquoi moi. Quatre
métiers s'y lisent sans ambiguïté (automatisation, agents IA, formations, sites
web et dashboards) ; les deux offres chiffrées, **Automatisation & IA** et
**Sites web**, gardent ensuite chacune leur page. Le site doit tenir debout
tout seul, sans ornement pour rattraper une hiérarchie molle : le contraste
vient du poids typographique, de la taille et de l'espace.

**Deux états cohabitent, et c'est su.** L'accueil porte la direction validée le
2 octobre 2026, « tech moderne, propre », décrite dans la section *L'accueil*.
Les autres pages (offres, cas clients, pages outil, principes) vivent encore
sur la version précédente de « nuit et pêche » : surlignage incliné, titres en
600, fond `#111827`. Elles suivront, sur décision de Lilian ; d'ici là, ne pas
« corriger » l'une vers l'autre au passage.

Depuis la direction validée le 1er octobre 2026, le site vit sur le bleu nuit
`#111827`, et non plus sur le papier blanc. Le texte est blanc, les gris sont
teintés vers la nuit, et il n'y a qu'un accent : la pêche `#ffb38a`. Elle
surligne les mots en bande pleine, porte les boutons primaires, et — parce
qu'elle tient 10,19:1 sur la nuit — elle a aussi le droit d'être du texte
d'accent, un trait de lien et l'anneau de focus. Le clair devient l'exception :
il ne revient que dans le panneau inversé, une île arrondie `#f7f8fa` posée sur
la nuit, où la pêche retombe à 1,64:1 et redevient une simple surface.

Plus d'angle vif. Une surface s'arrondit selon sa taille, de 6 px pour un
détail de maquette à 32 px pour un panneau, et ce qui se clique est rond :
bouton, champ, étiquette. Les deux rayons d'origine, 0 et 9999, donnaient un
site « trop carré » : c'est le retour explicite du client.

Le mouvement porte trois gestes d'auteur : le surligneur qui se trace, l'entrée
du hero, les médias qui s'ouvrent au défilement. Le reste est du retour
d'interaction ou de l'accompagnement de lecture (voir *Components → Mouvement*).

Deux choses restent retirées, et l'absence est le geste : le monospace et les
sur-titres en petites capitales espacées au-dessus des titres de section.
`SectionHeader` n'a plus de prop `label`, et la numérotation `01 / 02 / 03`
a quitté la navigation, les pages outil, les principes, la FAQ et la pagination
des cas. Les libellés fonctionnels en petites capitales (`.mono-label`,
`.mono-caption`) restent : un rôle sous un nom, une métrique de pied de page, un
statut dans une maquette, le libellé d'un curseur.

**Les noms de jetons et de classes sont hérités, leurs valeurs ne le sont pas.**
`--color-paper` vaut la nuit, `--color-ink` vaut le blanc, `.bloc-lime` est une
bande nuit relevée et `.bloc-encre` est le panneau clair. Les 25 composants
consomment les mêmes noms qu'avant : seule la valeur a changé, et toute la page
a basculé d'un coup. Ne jamais déduire une couleur d'un nom.

**Caractéristiques clés :**

- Bleu nuit en fond général ; le clair n'existe que dans une île arrondie.
- Un seul accent, la pêche. Texte posé dessus : toujours la nuit.
- Aucun angle vif ; le rayon suit la taille de la surface, le cliquable est rond.
- Aucune ombre ; la profondeur vient des filets de 1 px et des paliers de surface.
- Une seule famille, Geist Variable.
- Trois gestes d'auteur de mouvement, joués une fois, jamais bloquants.
- Sur la home, Lilian apparaît avant les offres ; les deux expertises gardent
  ensuite le même poids dans leur routeur dédié.
- Les artefacts publics et les marques tierces gardent leur palette dans leurs
  visuels, jamais dans le chrome du site.

## L'accueil : tech propre, sur une grille

Direction validée par Lilian le 2 octobre 2026, après le rejet de quatre pistes
dessinées et d'une première version jugée « IA slop ». Les références qu'il a
choisies lui-même sur un mur de vrais sites : Novu, Vimcal, Juan Mora, Qdrant.
Sa consigne tient en une ligne : « tech moderne, clean, privilégie les grilles ».
La palette ne change pas ; ce qui change, c'est la tenue.

**Ce qu'il a refusé, et qui ne revient pas :** les listes séparées par des
filets, les grilles de cartes, un titre surligné posé au-dessus de chaque
section comme seul geste, un hero décoratif sans rapport avec le métier. Une
section de l'accueil porte **un composant qui n'existe que là**, dont la forme
vient de ce qu'elle raconte.

### Le fond et le cadre

- **Fond `night-deep` `#0c121f`** sur toute la page, pas `#111827` : la grille
  et le verre ont besoin d'un noir plus profond pour se détacher. Blanc
  dessus : 18,72:1 ; pêche : 10,76:1. Le remap de `--color-paper` se fait sur
  la racine (`html:has(.accueil)`), pas sur `main` : la barre, le menu mobile,
  l'agenda en plein écran et la gouttière de défilement lisent tous ce jeton,
  et montraient sinon le bleu du reste du site autour d'une page plus sombre.
- **La maille de 96 px des gouttières (`.technical-grid`) est coupée** sur
  l'accueil : elle dessinait des fragments à cheval sur les lignes de cadre.
- **Filets adoucis** : `--color-divider` vaut 9 % de blanc, transparent. Sur
  une page quadrillée, un filet plein devient du bruit.
- **Deux lignes verticales de 1 px** courent de la fin du hero au pied de page
  (`.accueil__suite::before/::after`), à `--marge` (16 à 32 px) à l'extérieur
  de la colonne de 1 200 px. Elles appartiennent à la page, pas aux sections :
  une section qui redessine les siennes produit un escalier. Absentes sous
  1024 px, où la gouttière ne les contient pas.
- **Les repères d'angle** (`.repere`, quatre équerres de 1 px qui débordent de
  7 px) cadrent ce qui est une scène : la scène du récit, la scène de chaque
  métier, la vidéo. Jamais autour d'un texte.
- **Un seul traitement pour le texte qui se clique** : bas de casse, comme la
  barre et les boutons. Le lien fléché (`LinkCTA`) perd ici ses capitales
  espacées, et son survol déroule une pastille droite au lieu de la bande
  penchée.
- **Une offre n'a qu'un nom sur la page** : « Automatisation », « Agents IA »,
  « Formations », « Sites web et dashboards », dans la barre, les blocs des
  métiers et la ligne de prix. Le pied de page dit pareil (« Automatisation et
  agents IA », « Sites web et dashboards »).
- **On dit « dashboard », jamais « tableau de bord »** dans le texte visible :
  choix de Lilian le 2 octobre 2026, pour n'avoir qu'un mot. Les commentaires
  du code gardent le français.
- **Chaque offre qui a un prix l'affiche en « À partir de »** : 900 € HT sur
  les blocs Automatisation et Agents IA (c'est la même offre, au même prix
  d'entrée), 1 500 € HT sur Sites web et dashboards. Les formations n'en
  affichent pas : Lilian ne le veut pas.
- **Le menu mobile de l'accueil** liste ces quatre métiers en grand
  (`--text-title-lg`, sans filet entre eux), puis le reste de la page en plus
  petit (« Pourquoi moi », « Vidéos et newsletter », « Cas clients »), et se
  termine par le bouton d'appel, en bas, sous le pouce. Tout est calé vers le
  bas de l'écran. La barre n'a que les quatre métiers : le menu est la seule
  entrée vers le reste avant le pied de page.
- **Un seul bouton primaire** : bas de casse, 14 px, graisse 500, sans
  approche. Réglé une fois dans `index.astro` (`html:has(.accueil)
  .btn-primary`), jamais par composant.
- **Le pied de page et le menu parlent en bas de casse** sur l'accueil : leurs
  libellés sont écrits en bas de casse dans la source, et c'est la classe
  (`.mono-label`, `.mono-caption`) qui les met en capitales sur les autres
  pages.

### Le hero

Le titre centré, la barre d'écriture dessous, et le défilé des clients en bas.
Longtemps le titre seul, sans forme 3D (« pas nécessaire ») ; Lilian y a
ajouté la barre le 2 octobre 2026 (voir *La barre d'écriture*). Le titre est une phrase, pas un slogan :
« Salut, je m'appelle Lilian Sevoumian et je suis expert en », puis la réponse
dans une pastille pêche, « Automatisations & Agents IA ». Taille
`--text-affiche`, bornée par la hauteur (`11svh`) pour ne jamais pousser les
logos hors de l'écran. Interligne 1,12 et approche −0,028em, réglés à la
demande de Lilian (« titre trop resserré ») : ce sont les valeurs les plus
serrées de la page, aucun titre plus petit ne l'est davantage. Le nom ne se
coupe jamais entre le prénom et le nom (espace insécable). L'entrée tient en
une seconde et demie : la pastille, qui dit le métier, se pose avant la fin de
la première seconde.

Au pied de la zone du titre, **une flèche ronde de 44 px** mène au récit : le
premier écran ne donnait aucun indice qu'il y a une suite. Une flèche, pas un
mot de plus : le titre reste seul. Elle disparaît sur un écran bas.

Derrière, une **grille de maille `--spacing-maille`**, traits à
10 % de blanc, comptée depuis le centre de l'écran. Elle s'allume en pêche
sous le pointeur (`--px`, `--py`) et quelques cellules se remplissent. Rien
d'autre n'y bouge : des faisceaux de lumière la parcouraient, Lilian les a fait
retirer le 2 octobre 2026 (« il y a déjà assez d'animation avec les carrés qui
s'illuminent »). Tout élément décoratif se place en mailles (`--x`,
`--y`), jamais en pixels : c'est ce qui le garde aligné à toutes les largeurs.

### Le défilé des clients

Une seule ligne au bas du premier écran, précédée de « J'ai travaillé avec »,
qui défile en 46 s. Le bandeau va d'un bord à l'autre de l'écran mais son
contenu tient dans la colonne de 1 200 px, comme la barre : le titre est sur
le bord gauche de la colonne, l'icône de pause sur son bord droit. Elle s'arrête au survol et, pour le clavier et le doigt,
par un bouton de pause de 44 px au bout du bandeau (`aria-pressed`). La liste
vit dans `src/data/clients.ts`, les fichiers dans `public/logos/clients/`.
Les animations du hero (cellules, défilé) sont suspendues dès qu'il
sort de l'écran (`data-motion-pause`).

- **Tous les logos sont ramenés à une silhouette claire** : `filter:
  brightness(0) invert(1)`, opacité 0,78. Aucune couleur de marque dans le
  bandeau, c'est l'exception assumée à *la règle de la marque relevée* : treize
  palettes côte à côte sous le titre feraient un deuxième sujet. Il faut donc un
  fichier à fond transparent, SVG ou WebP sans perte.
- **Un logo que la silhouette abîme se corrige dans le fichier, pas dans le
  CSS.** Une forme pleine posée derrière des lettres devient une tache : on
  retire la forme (Edumiam), on ne change pas le filtre pour tout le monde.
- **La hauteur se règle à l'œil, logo par logo.** Base `1,5em`, multipliée par
  `--echelle` (champ `echelle` de la donnée) : de 0,85 pour un mot-symbole
  étiré (Jellysmack) à 1,9 pour un logo empilé (Fraich Touch). À hauteur
  égale, un logo sur deux lignes paraît deux fois plus petit qu'un mot seul.
- **`largeur` et `hauteur` sont obligatoires** et passent en attributs `width`
  et `height` : la piste a sa largeur finale avant l'arrivée des fichiers,
  sinon le défilé saute au chargement.
- **Un nom sans logo reste composé en lettres**, dans la même ligne : c'est un
  état propre, pas un trou. Un logo n'entre que s'il vient du site officiel de
  l'entreprise, provenance notée dans `clients.ts`. Dans le doute sur
  l'entreprise (deux « Reborn » en France), le nom reste en lettres.
- `prefers-reduced-motion` : plus de défilement, la liste passe à la ligne et
  n'affiche qu'un exemplaire de chaque logo.

### Le surlignage devient une pastille

Sur l'accueil, `mark` est une gélule droite : `--angle: 0deg`,
`--radius-bande: 9999px`, `display: inline-block`, padding
`0,02em 0,36em 0,08em`, bande à `inset: 0`. Plus d'inclinaison, plus de
`.inv`. Le tracé animé (`--draw`) et la règle du texte nuit sur pêche restent.

**Quatre pastilles sur la page, pas une par titre** : la réponse du hero, les
actes 1 et 3 du récit, et le titre de fin. Onze titres en portaient une, trois
dans un seul écran de téléphone : c'était devenu « un titre surligné posé
au-dessus de chaque section », ce que Lilian a refusé, et l'accent unique n'y
désignait plus rien. Les titres de section sont nus. 

### La graisse

Les `h2` et `h3` de l'accueil sont en **500**, pas 600. Le 600 serré donnait
l'affiche ; le 500 donne l'interface. Le hero et les titres du récit montent
en taille (`--text-affiche`, `--text-story`), pas en graisse.

### Les rôles de texte

Dix tailles, pas une de plus, chacune avec un rôle (passe typographique du
2 octobre 2026, mesurée à 1440, 1024, 402 et 320 px) :

| Rôle | Jeton | 402 → 1440 | Interligne, approche |
|---|---|---|---|
| Affiche (h1) | `--text-affiche` | 34 → 72 | 1,12 · −0,028em |
| Énoncé (h2 du récit, « Je fais quatre choses. », fin) | `--text-story` | 32 → 60 | `--leading-display` · `--tracking-display` |
| Titre de section (h2) | `--text-headline` | 32 → 48 | idem (1,1 · −0,03em) |
| Phrase (phrase d'un métier, citation) | `--text-phrase` | 26 → 40 | `--leading-phrase` · `--tracking-phrase` (1,14 · −0,025em) |
| Titre lg (année, titre de vidéo) | `--text-title-lg` | 24 → 30 | 1,05 à 1,15 |
| Titre (chiffre de preuve, fait, nom de site) | `--text-title` | 20 → 24 | 1,2 |
| Chapô, nom de métier | `--text-body-large` | 17 → 20 | 1,3 à 1,5 |
| Corps | `--text-body` | 16 | `--leading-body` (1,6) |
| Petit corps, tout ce qui se clique | `--text-body-sm` | 14 | 1,35 à 1,5 |
| Libellé | `--text-mono-label` | 12 | 1,4 |

- **La phrase est un rang sous le titre qui l'annonce.** Elle prenait
  `--text-headline` : la phrase d'un métier et la citation avaient exactement
  la taille du `h2` de leur section, à toutes les largeurs.
- **Un titre plus petit n'est jamais plus serré qu'un plus grand.** Les `h2`
  étaient à 1,05 / −0,04em sous une affiche à 1,12 / −0,028em.
- **Le corps n'a pas d'approche négative** sur l'accueil (`body` à 0). Le
  −0,005em hérité de `body` valait −0,08 px quelle que soit la taille : les
  textes de 14 et 12 px étaient relativement plus serrés que le corps.
- **Le français se compose** : espace insécable avant `: ; ? !`, dans les
  unités (« 45 minutes », « 24 h/24 », « 60 % ») et avant « € HT ».
- **Les scènes ont leur propre échelle**, de quatre tailles (voir plus bas).

### Les espacements

Une échelle nommée par rôle, dans `@theme`. Elle remplace 33 `clamp()` écrits
sur place dans neuf composants, qui donnaient 13 pas entre 18 et 72 px et cinq
gouttières différentes.

| Jeton | 402 → 1440 | Où |
|---|---|---|
| `--spacing-section-y` | 80 → 115 | au-dessus et au-dessous d'une section |
| `--spacing-bloc` | 48 → 80 | entre deux sous-blocs d'une section (deux métiers, deux colonnes empilées) |
| `--spacing-gouttiere` | 32 → 72 | entre deux colonnes : la même partout |
| `--spacing-groupe` | 32 → 40 | d'un titre à son composant, d'un composant à sa sortie, d'une scène à son texte |
| `--spacing-lie` | 20 → 28 | d'un titre à son chapô, d'un texte à ce qui l'étaie |
| `--spacing-colle` | 8 | d'un nom à la phrase qu'il coiffe |

Hors rythme : `--spacing-cadre` (marge des filets de cadre), `--spacing-maille`
(la grille du premier et du dernier écran), `--spacing-panneau` (marge
intérieure d'un panneau), `--spacing-barre` (hauteur de la barre : éléments
collants, et `scroll-padding-top` posé sur la racine pour toutes les ancres).

- **Les écarts disent qui va avec qui.** Dans le texte d'un métier : le nom
  colle à sa phrase (8), la phrase ouvre sur le corps (20 à 28), la preuve s'en
  détache (28), la sortie ferme (24). Un écart unique de 18 px séparait tout.
- **Deux blocs qui se lisent ensemble partent de la même ligne** : le texte
  d'un métier et sa scène, les deux titres de « Pourquoi moi », les deux
  titres de « Ce que je publie » (calés en bas de leur rangée commune).
- **Un composant ne dépasse jamais la hauteur de l'écran** : une scène empilée
  borne sa largeur sur `100svh` moins la barre.

### Le récit (`home-story`)

Trois actes en vis-à-vis d'une scène unique. La scène est une vraie situation
de travail, pas une illustration : un bon de commande en PDF à gauche, une
facture à droite, une horloge qui tourne. À la main, un curseur recopie ligne
après ligne pendant que les heures passent ; en automatique, les lignes
traversent seules et le total se calcule.

**À la troisième phrase, la scène enchaîne trois réponses**, en boucle, chacune
sur son propre sujet : *Automatisation* (le bon de commande devient sa facture
tout seul), *Agent IA* (un agent de support répond à un client en pleine nuit,
consulte sa base de connaissances puis un outil connecté, et cite sa source),
*Dashboard* (le suivi de projets d'une équipe : des indicateurs, et des cartes
qui avancent de « à faire » à « livré »). C'est la vue d'ensemble de ce que
fait Lilian, demandée par lui le 3 octobre 2026 : « une transition entre tout
ce qui est possible de faire ». D'une réponse à l'autre le plan change
d'inclinaison, les fenêtres reculent dans un flou et les suivantes arrivent
décalées ; pour l'agent, l'horloge de la scène file jusqu'à un dimanche soir
puis jusqu'en pleine nuit, et c'est elle qui dit « 24 h/24 ».
Sous la scène, des boutons disent où elle en est et permettent de choisir :
quatre sur ordinateur (« À la main », « Automatisation », « Agent IA »,
« Dashboard »), trois sur téléphone (les trois réponses).

**Sur ordinateur, le défilement joue les quatre modes, sans clic.** Demande de
Lilian le 2 octobre 2026 : « cette animation est géniale, il faudrait qu'elle
fasse les 4 pendant mon scroll, là elle s'arrête aux 2 premières et oblige
l'utilisateur à cliquer ». Cinq paliers : les actes 1 et 2 (à la main), puis
Automatisation, Agent IA, Dashboard. Le texte de l'acte 3 reste collé à gauche
pendant que les trois réponses passent à droite, et dans sa phrase la
proposition du mode en cours passe en encre pleine, les deux autres restant en
retrait. En remontant, l'ordre s'inverse. Rien ne change sans défilement : il
n'y a plus de ronde automatique sur ordinateur.

- La scène est dessinée sur un **plan fixe de 680 × 560** mis à l'échelle par
  `--k` : ses mesures sont des unités de plan, pas des tailles de texte. C'est
  la seule exception aux jetons de taille et de rayon, et elle est déclarée
  dans `.impeccable/config.json`, limitée à ce fichier.
- Elle est claire sur fond sombre : les feuilles utilisent `--color-feuille`,
  `--color-feuille-trait`, `--color-feuille-barre`. Deux lueurs seulement,
  `--color-lueur-froide` (le travail à la main) et `--color-braise` (le passage
  en automatique), plus le grain `--grain`. Aucune de ces teintes ne sort de la
  scène.
- **Ordinateur :** scène collante, pilotée par le défilement. **Sous
  1024 px, deux vues, aucune collante** : sous l'acte 1, la scène reste sur
  « à la main », sans boutons ; sous l'acte 3, une seconde vue boucle les
  trois réponses, avec leurs trois boutons. Une seule scène posée sous
  l'acte 1 enchaînait les quatre modes pendant qu'on lisait autre chose : on
  lisait « une commande recopiée à la main » à côté d'un dashboard (critique du
  2 octobre 2026). Une scène collante pilotée au doigt, sur téléphone, se
  dispute le défilement avec la page : retour direct de Lilian. Le moteur est
  instanciable (`monter(racine, scene, role)`) ; la vue des réponses est
  masquée et à l'arrêt sur ordinateur.
- **Le bouton a le dernier mot, dans son palier.** Sur ordinateur, un clic
  tient tant qu'on reste dans le palier de défilement en cours ; le défilement
  reprend la main au palier voisin, ou quand la scène sort de l'écran. Sur
  téléphone, un clic arrête la boucle tant que la vue reste à l'écran.
- **Les compteurs ne s'affichent que là où ils comptent** : « En attente » et
  « Ressaisies » sortent en Agent IA et Dashboard. « Ressaisies » est le mot
  du texte de l'acte 3 et de la scène Automatisation (il disait « Gestes
  refaits »).
- **Une commande d'arrêt par vue**, la même que celle des scènes de métiers
  (`.sm-pause`, coin bas droit du cadre). Le moteur n'a plus aucune
  minuterie : chaque attente est une animation sans effet, et l'arrêt les
  suspend toutes d'un coup. Arrêtée, la scène suit encore le défilement, en
  image fixe ; sa boucle repart à la reprise.
- **Le mode Agent IA s'ouvre sur une question déjà posée** : la fenêtre de
  conversation restait un rectangle vide deux à trois secondes.
- **Les boutons de mode restent à 14 px** à toutes les largeurs, comme tout ce
  qui se clique sur la page.
- **Le texte de la scène a quatre tailles**, les mêmes noms que le socle des
  scènes de métiers (`--sm-note`, `--sm-texte`, `--sm-fort`, `--sm-titre`).
  Rien sous 9 px à l'écran, de 320 à 1440 px (6,8 px avant). Ce qui ne tient
  pas à la taille de la note est devenu un trait ou a quitté la scène.
- **La scène est `aria-hidden`, le bouton l'annonce** : un paragraphe
  `aria-live` dit en une phrase ce que montre le mode choisi. Seulement au
  clic, jamais quand le récit avance seul.
- **Mouvement réduit :** des images fixes qui suivent le défilement, une par
  palier ; les boutons passent d'une image à l'autre. Sans script, la scène est une image fixe,
  sans ses boutons.
- **Un agent IA se montre en conversation.** Lilian a refusé l'agent qui
  « contrôle un bon de commande » : un visiteur reconnaît un agent à un
  chatbot qui répond jour et nuit et va chercher l'information dans une base
  de connaissances ou des outils connectés.
- **Pas de redite avec les métiers.** Le bon de commande, le support et le
  suivi de projets appartiennent à cette scène ; aucune scène de métier ne les
  rejoue.

### Les scènes des métiers (`src/components/metiers/`)

Chaque métier a sa scène : de petites fenêtres d'interface en 2D, reliées par
des fils, dans un cadre à repères d'angle (4:3 sur le grand plan, 9:8 sur le
plan étroit). On y voit le métier se faire.
C'est la direction que Lilian a retenue le 3 octobre 2026 parmi cinq essais
(`/explorations-metiers` : une maquette à figurines, un plateau de touches,
cette interface, un terminal en caractères, un plan d'ingénieur au trait). Les
sculptures de verre qu'elle remplace étaient belles, mais il fallait lire leur
légende pour comprendre ; elles restent visibles sur `/explorations-blocs`.

| Métier | Sujet | Silhouette, sur ordinateur puis sur téléphone |
|---|---|---|
| Automatisation | une réservation : paiement encaissé, créneau posé dans l'agenda, confirmation envoyée | un **grand agenda** en grille où le créneau vient se poser ; sur téléphone la grille prend toute la largeur, la demande et la confirmation passent par-dessus |
| Agents IA | une question (« Quelles entreprises approcher cette semaine ? »), et l'agent part chercher la réponse | une **étoile** : l'agent au centre réfléchit étape par étape, envoie des sondes vers ses sources autour, en ramène des extraits, puis compose une réponse sourcée, avec une ligne « à valider par vous » |
| Formations | le formateur monte un scénario, l'équipe le refait en hésitant une fois, puis le lance seule | **deux fenêtres jumelles**, des blocs et des curseurs |
| Sites web et dashboards | une page se compose bloc par bloc, des visiteurs cliquent, le tableau de bord compte | une **page claire** à côté d'un tableau de bord sombre ; sur téléphone, la page claire en haut sur toute la largeur et le tableau de bord en bande dessous |

**Un sujet par scène, et une silhouette par scène.** C'est la règle née du
retour de Lilian sur son téléphone : « les animations sont toutes un peu
similaires et sur les mêmes sujets ; quand on scrolle, il faut qu'à chaque
fois ce soit une animation différente, et qu'on comprenne que c'est un sujet
différent ». Des fenêtres en rang reliées par un fil, avec deux pastilles en
haut, c'est une seule silhouette, quel que soit le sujet. Avant d'écrire une
scène, on vérifie son sujet ET sa silhouette contre toutes les autres de la
page, sur le grand plan comme sur le plan étroit : c'est sur téléphone que
les scènes se ressemblent le plus vite.

- Noms d'outils génériques et chiffres d'illustration : aucune marque, aucun
  nom de client dans une scène. La scène Agents IA rejoue le cas que son bloc
  cite en preuve (M Partners) ; celle du bloc Automatisation montre un autre
  exemple que sa preuve (Fraich Touch, la facturation), parce que la facture
  appartient déjà à la scène du récit.
- **Un socle commun** : `scene-metier.css` (classes `.sm-…` : cadre, plan,
  fenêtre, feuille claire, rangées, fils, ports, nœuds, grains, bandes,
  pastilles) et `lib/metiers/scene.ts` (échelle du plan, pause hors écran et
  onglet masqué, mouvement réduit, boucle, aides d'animation). Une scène ne
  réécrit pas ces pièces : elle les compose, et n'ajoute en style scopé que ce
  qui lui est propre. Le guide d'écriture est en tête de `scene.ts`.
- **Le plan** : 760 × 570 mis à l'échelle ; sous 520 px de large, un plan
  simplifié de 360 × 320, redessiné et non rétréci, plus haut que le grand
  (9:8) : un pixel du plan y vaut à peu près un pixel d'un téléphone, et c'est
  la hauteur qui paie le texte lisible. Le cadre suit ce rapport
  (`@container scene` dans `home-services.astro`).
- **Quatre tailles de texte, pas une de plus**, déclarées par le socle :
  `--sm-note` (11,5 px sur le grand plan, 11 sur l'étroit), `--sm-texte`
  (12,5 / 12), `--sm-fort` (14 / 13,5), `--sm-titre` (16 / 15), plus
  `--sm-chiffre` pour un nombre qui se lit de loin. Aucune scène n'écrit de
  `font-size` en pixels, aucune graisse au-delà de 600. Les scènes comptaient
  dix-neuf tailles, par pas d'un demi-pixel, et un quart de leur texte passait
  sous 8 px à l'écran (22 % à 1440, 95 % à 320). Ce qui ne tient pas à la
  taille de la note devient un trait (`sm-barre`) ou sort de la scène :
  en-têtes de colonnes, numéros, graduations, sur-titres. Les trois ou quatre
  mots qui portent l'action sont en `--sm-fort`. Résultat mesuré sur l'accueil :
  au moins 9,7 px de 1280 à 1440, 10,8 px à 402, 8,25 px à 320 (la note seule).
- **Deux colonnes à partir de 1200 px seulement.** En dessous, la scène prend
  toute la largeur et son texte passe dessous (en deux colonnes de 720 à
  1199 px) : en colonne, à 1024, elle faisait 520 px et les deux tiers de son
  texte passaient sous 8 px.
- **Un seul compteur d'état sur le plan étroit**, celui qui porte la promesse
  du métier.
- **Aucun texte sous 4,5:1**, au repos comme à l'image finale : plus de
  `--color-ink-faint` pour du texte sur une fenêtre, `--color-feuille-note`
  sur une feuille claire, et un texte « pas encore actif » est absent plutôt
  que fantomatique.
- **Un tableau de bord ne se montre jamais à zéro** : la scène Sites affiche
  une conversion cohérente avec ses demandes et ses visites (5,0 à 5,5 %),
  jamais « 0,0 % » ni un tiret, sous un titre qui promet des pages qui
  convertissent.
- **La boucle** : 10 à 14 s, un seul mouvement principal à la fois, image
  finale tenue 2 à 3 s, raccord invisible. Tout le temps passe par le moteur
  (ni `setTimeout` ni `requestAnimationFrame` dans une scène), sinon la pause
  hors écran ne tient plus.
- **Le balisage est l'image finale.** Sans script et en mouvement réduit, on
  voit une scène fixe, complète et parlante.
- **Chaque scène a sa commande d'arrêt** : un bouton de pause de 28 px (cible
  de 44) dans le coin bas droit du cadre, posé par le moteur après la racine
  (qui est une image, `role="img"`). Visible au survol du cadre, au focus et
  une fois la scène arrêtée ; toujours visible au doigt. Une animation qui
  boucle à côté d'un texte doit pouvoir être arrêtée. La scène du récit a la
  même.
- **Le moteur tient lui-même ses animations.** `getAnimations()` ne rend plus
  une animation suspendue sur sa dernière image ; s'y fier laissait une scène
  figée après un aller-retour hors écran.
- **Sur une colonne, la scène passe avant son texte** : posée après, elle se
  lisait comme l'illustration du métier suivant.
- Les mesures d'une scène sont des unités de plan, comme celles de la scène
  du récit : exceptions déclarées par fichier dans `.impeccable/config.json`.

### Pourquoi moi

Le seul panneau clair de la page, à gauche, reste en place pendant que la
frise défile à droite.

- **Les quatre faits ouvrent le panneau**, un par ligne : ce qu'on retient en
  `--text-title`, ce qui le précise dessous en petit. Ils étaient le plus
  petit texte de la section, enchaînés en une ligne de 14 px sous le
  paragraphe. Ni grille 2 × 2 ni filets : une colonne de quatre lignes.
- **La frise distingue les jalons des missions.** Un jalon (un lancement, un
  poste, une fondation) garde son titre, son mois à la suite en bas de casse,
  et sa phrase ; une mission tient en une ligne, sans détail (champ `mineur`
  de `src/data/parcours.ts`). À douze entrées de même poids, la frise faisait
  plus de deux écrans et mettait un stage au rang d'une fondation.
- L'année est un repère (`--text-title-lg`, graisse 500), pas un titre : elle
  ne doit pas peser plus que « D'où je viens. ».
- **Un appel à mi-page**, à la fin du panneau : « Parlons de votre projet », en
  lien fléché (`BoutonReservation`, source `home_pourquoi_moi`). Sur un
  téléphone, le bouton de fin est à treize écrans du premier. Un lien, pas un
  second bouton plein : l'action pleine reste celle de la barre et de la fin.

### Les trois sites (`home-sites`)

Sous le bloc Sites web, trois sites réalisés, chacun dans une **fenêtre de
navigateur dessinée dans la tenue de la page** (barre fine, pastille d'adresse
avec le domaine), où la page **défile par crans** à l'intérieur. Des captures
de sites clairs posées telles quelles sur la page nuit cassaient la tenue, et
s'enchaînaient bizarrement sur téléphone : retour de Lilian.

- Une seule fenêtre défile à la fois ; les autres attendent sous un voile de
  nuit, sans filtre sur l'active. Les repères d'angle glissent vers elle.
- **Ordinateur :** une grande fenêtre et deux étroites ; celle qu'on vise
  s'ouvre en grand. **Téléphone :** une fenêtre à la fois, à faire glisser,
  avec « 1 / 3 » et deux flèches de 44 px.
- Chaque site est accompagné : son nom, ce que c'est, « Voir le site ». Rien
  d'autre que ce que porte `src/data/realisations.ts` (champ `long` pour la
  capture longue, `public/sites-web/projects/*-long.webp`).
- Une commande d'arrêt dans la barre de la fenêtre active ; rien ne défile en
  mouvement réduit ni hors écran.

### Ce que je publie (`home-content`)

Deux objets, pas deux cartes.

- **La vidéo** est cadrée comme une scène, avec les repères d'angle. Son titre
  est le vrai titre de la vidéo, suivi d'une phrase qui dit ce qu'on y voit.
  La vignette est copiée dans `public/videos/` ; la dernière vidéo se vérifie
  sur le flux de la chaîne (adresse dans le fichier). Sous la vidéo, un lien
  fléché mène à la chaîne : chaque activité a sa sortie, et celle-ci n'était
  liée que depuis le pied de page. Sous le mail, le même lien fléché mène à
  LinkedIn, le troisième endroit où il publie.
- **La newsletter est écrite comme le mail qu'on va recevoir** : une ligne
  « De », une ligne « Objet » (un exemple, inventé à la demande de Lilian, pas
  le titre d'un numéro paru), et la ligne « À » qui est le champ du
  formulaire. Pas de champ encadré dans une carte : le focus teinte la ligne
  entière. C'est le seul endroit où des filets séparent des lignes, parce que
  c'est l'objet lui-même qui en a.

### Les voix (`home-voices`)

Trois recommandations, **une à la fois**, et les trois personnes à côté sur un
rail vertical. La première est celle qui dit ce pour quoi on vient
(« son expertise en automatisation »), pas la plus générale. Le segment de la voix qui parle se remplit de pêche en 7 s, puis
la parole passe. Choisir une voix arrête le déroulé pour de bon ; le survol et
le focus le suspendent.

- **Le titre : « Ils m'ont vu travailler. »** Choisi par Lilian le 2 octobre
  2026 à la place de « Ce qu'ils en disent. », le titre le plus passe-partout
  de la page.
- **La citation est un rang sous le titre** (`--text-phrase`, graisse 500).
  Elle prenait `--text-headline`, la taille exacte du titre, et se lisait
  comme sa suite.
- **Les cas clients ne passent pas au premier plan.** La critique du 2 octobre
  2026 proposait de remplacer les citations par les résultats chiffrés des
  cas, en grand. Lilian a refusé : « je ne veux pas que les cas soient trop
  voyants, car si le client n'est pas dans ces cas il pourrait ne pas se sentir
  concerné ». La règle vaut pour toute la page : un cas client est une preuve
  discrète (une ligne de 14 px dans un bloc de métier, un lien fléché), jamais
  le sujet d'une section ni un chiffre en grand.
- Les trois citations occupent la même case de grille : la scène a toujours la
  hauteur de la plus longue, rien ne bouge autour. Le lien vers les cas est
  dans la colonne du rail, sous lui : sous la citation, il flottait à 150 ou
  210 px d'elle quand elle était courte.
- **Sur une colonne, le rail passe au-dessus de la citation**, en trois onglets
  côte à côte (un portrait, un nom), leur segment couché dessous ; le rôle
  revient sous la citation, avec la signature. Posé après elle, le rail se
  retrouvait à 137 px d'une citation courte.
- Onglets ARIA (`tablist`, flèches, une seule voix dans l'ordre de
  tabulation). Sans script, les trois citations se lisent à la suite, signées.
- Ce sont des recommandations, sans chiffre : le lien du bas mène aux cas
  clients, dont le nombre est lu dans la collection.
- Les pages d'offre gardent `Testimonials.astro`, mêmes citations.

### Les questions (`home-questions`)

Quatre questions, juste avant la fin : pour qui, combien, seul ou non, comment
se passe le premier échange. Elles sont écrites **comme un échange**, dans le
vocabulaire de la barre d'écriture : la question à droite, sur pêche, en nuit,
comme ce qu'écrit le visiteur ; la réponse à gauche, sur encre à 9 %, comme ce
que dit Lilian. Mêmes rayons que les bulles de `home-invite`, à la taille du
texte courant. La section suivante est le champ où l'on écrit vraiment.

- **Tout est à l'écran, rien n'est replié** : pas d'accordéon, pas de filets,
  pas de cartes. Un moteur lit ce qu'un visiteur lit.
- **Rien ne s'écrit tout seul** : ce sont des réponses rédigées, pas une
  conversation simulée.
- Le titre (« Avant de m'écrire. ») reste en place à gauche sur grand écran
  pendant que l'échange défile.
- Le texte vient de `data/home-faq.ts`, qui alimente aussi le `FAQPage` de la
  page : une seule écriture par réponse. Rien n'y est affirmé qui ne soit dans
  PRODUCT.md ou `/llms.txt`.

### La fin (`home-offers`)

La page se ferme comme elle s'ouvre : une phrase seule, centrée, sur la maille
du premier écran, cette fois immobile et effacée vers les bords.

- **Le titre** : « Dites-moi ce qui vous fait perdre du temps. » Il répond au
  titre qui ouvre le récit (« Vous avez la sensation de perdre votre temps ? »).
  Il disait « 45 minutes pour voir si je suis la bonne personne » tant que le
  bouton ouvrait l'agenda ; Lilian l'a fait changer quand l'appel à l'action
  est devenu la conversation.
- **Un champ et le bouton dans un même cadre**, comme une barre de prompt :
  ce qu'on y écrit devient le premier message de la conversation
  (`home-invite`). Vide, le bouton ouvre la même conversation.
- **Une ligne collée au champ** dit la suite : le visiteur choisit comment
  envoyer, WhatsApp, e-mail ou un appel de 45 minutes en visio, sans
  engagement (« en visio » vient de l'événement Cal.com, « sans engagement »
  de `/llms.txt`).
- Les deux prix tiennent en **une ligne** dessous, chacun lié à sa page
  d'offre. Hors du grand écran la section ne prend plus tout un écran
  (`min(40rem, 70svh)`).

**Un seul appel à l'action sur la page.** Tous les « Parlons de votre projet »
(barre de navigation, menu mobile, lien de « Pourquoi moi », bouton de fin)
ouvrent la conversation (`data-causerie-ouvrir`), décision de Lilian du
2 octobre 2026. Ce sont des `BoutonReservation` : sans script, ils mènent à
l'agenda.

### La barre d'écriture (`home-invite`)

Idée de Lilian (2 octobre 2026), pour ôter toute friction au premier contact :
une barre de prompt où le visiteur écrit son besoin en une phrase, et qui
ouvre une courte conversation. **Il n'y a aucun serveur derrière** : ni chat en
direct, ni IA, ni message stocké ailleurs que dans le navigateur du visiteur.
Il choisit son moyen et c'est lui qui envoie ; Lilian reçoit le message là où
il répond déjà.

- **La fenêtre ne fait pas semblant.** Sa première version affichait « je vous
  réponds moi-même », trois points de frappe, puis « Merci, c'est clair. »
  quel que soit le texte : un visiteur pouvait fermer en croyant avoir écrit à
  Lilian (critique du 2 octobre 2026). Donc : pas de frappe simulée, un
  sous-titre qui dit le mécanisme (« Vous choisissez comment l'envoyer »), et
  chaque réponse dit où en est le message (« pas encore parti », « il reste à
  l'envoyer »). Sous la barre du hero, une ligne dit ce qu'elle fait : une
  barre de prompt sous « expert en agents IA » se lisait comme un robot.
- **Deux places, un seul élément.** Sous le titre du premier écran, puis, dès
  qu'on a défilé d'un tiers d'écran, en bas à droite : elle s'y envole, et
  revient sous le titre si on remonte tout en haut. Elle s'efface quand le
  champ de fin de page est visible : jamais deux champs à la fois. Le hero
  n'est donc plus « le titre seul » : le titre, la barre, et les logos.
- **Dans le coin, elle écrit un exemple puis se range en pastille** : son
  portrait et « Écrire à Lilian » sur ordinateur, son portrait seul (56 px,
  un point pêche) sur téléphone. En barre, elle écrivait sans fin et
  recouvrait des titres, des prix et le bouton de la newsletter. Sur
  téléphone la pastille s'efface quand on descend la page et revient quand on
  remonte : elle rognait la fin des lignes. Demande de Lilian : « mets juste
  l'animation puis range la popup ».
- **Sous le titre, elle écrit toute seule** des débuts de phrase (« J'ai une
  agence de 8 personnes et je ressaisis mes devis à la main… ») tant qu'on n'y
  touche pas. Rien en mouvement réduit.
- **Entrée ouvre la conversation dans le coin** : le message du visiteur sur
  pêche, à droite ; une réponse à gauche (« Bien noté. Votre message n'est pas
  encore parti : choisissez comment me l'envoyer. »), puis trois moyens, dont
  le libellé dit ce qu'il fait :
  - **« M'écrire sur WhatsApp »** ouvre la discussion vers son WhatsApp
    Business, le message déjà écrit (`wa.me`, numéro dans `lib/contact.ts`).
  - **« M'écrire par e-mail »** ouvre la messagerie du visiteur, le message
    déjà rédigé (`mailto:` vers `EMAIL_CONTACT`). L'adresse est redite dans la
    fenêtre, pour qui n'a pas de messagerie configurée.
  - **« Réserver un appel · 45 min »** ouvre l'agenda dans la page
    (`BoutonReservation`, source `home_causerie`), le message joint à la
    réservation (`data-cal-note-from`, lu par l'embed dans Layout).
- **Ce que le visiteur ajoute complète son message**, et les trois moyens se
  mettent à jour. « Recommencer » efface tout. Le message est gardé le temps
  de l'onglet (`sessionStorage`) : un rechargement ou un retour de WhatsApp ne
  le perd pas, et la pastille dit alors « Message prêt, pas encore envoyé ».
- **Valider un champ vide ouvre la fenêtre**, avec les trois moyens proposés
  d'emblée : la flèche ne reste jamais sans effet.
- **Elle est rendue juste après le hero** dans la page, pour venir au clavier
  là où on la voit (elle était 55ᵉ sur 57 arrêts, rendue après le pied de
  page).
- **Pas d'outil de chat tiers** (Lilian ne veut pas payer Crisp), pas de bulle
  flottante générique : la fenêtre est dans la tenue de la page (nuit, filet,
  pêche, Geist), avec son portrait. Un vrai agent, branché sur une base de
  connaissances, est une suite possible ; la fenêtre est faite pour
  l'accueillir.
- Suivi : `causerie_opened` sur les boutons qui l'ouvrent, `lead_message`
  (prop `canal`) sur WhatsApp et l'e-mail, `lead_call` sur l'appel. Ils
  mesurent l'ouverture, pas l'envoi.

### Ce qui se refait à la main

`public/og-home.png` et la vignette du site dans les réalisations se refont à
chaque changement du hero. Les images de `public/formes/`, qui servaient de
repli aux sculptures de verre, ont été supprimées le 2 octobre 2026.

## Colors

Une nuit bleutée, des encres teintées vers elle plutôt que grises, une pêche
unique. Tous les contrastes ci-dessous sont recalculés (luminance relative
WCAG 2.x) sur les valeurs du bloc `@theme` de `src/styles/global.css`.

### Primary

- **Pêche** (`peche`, alias `--color-accent`, `--color-accent-text`,
  `--color-focus`) : surlignage derrière les mots, fond des boutons primaires,
  trait des liens, texte d'accent et anneau de focus **sur la nuit**. 10,19:1
  sur le fond général, 9,46:1 sur la bande, 8,90:1 sur `surface-low`, 10,76:1
  sur le pied de page.
- **Pêche claire** (`peche-clair`) : survol du bouton primaire. Le libellé nuit
  y gagne du contraste, 11,55:1 contre 10,19:1 au repos : sur un fond sombre un
  survol doit gagner de la lumière, pas en perdre.
- **Pêche éteinte** (`accent-soft`, 18 % de pêche dans la nuit) : fond de chip
  d'accent et survol des lignes du menu mobile. Blanc dessus : 12,05:1 ; pêche
  dessus : 6,93:1.

### Neutral

| Rôle | Usage | Contraste |
|---|---|---|
| `paper` / `night` | Fond général, cartes, navigation | — |
| `section-band` | Bande de section (`.section-band`, `.bloc-lime`), survol des cartes de services | 1,08:1 contre la nuit : un palier, pas un contraste |
| `surface-low` | Fond des médias, panneau newsletter, balayage FAQ | 1,14:1 contre la nuit |
| `surface-high` | Nœuds de schéma, grille d'abonnements | blanc dessus : 14,30:1 |
| `night-deep` | Pied de page, voile des captures, capture absente | blanc dessus : 18,72:1 |
| `night-soft` | Survol du bouton primaire sur panneau clair | blanc dessus : 12,58:1 |
| `ink` | Texte principal, titres | 17,74:1 (16,46:1 sur la bande) |
| `ink-mid` | Corps secondaire, chapôs | 10,67:1 (9,89:1 sur la bande, 9,32:1 sur `surface-low`) |
| `ink-low` | Légendes, libellés | 7,75:1 (7,19:1 sur la bande) |
| `ink-faint` | Traits, puces, pouce de barre de défilement ; jamais du texte de lecture | 4,88:1 |
| `border-strong` | Contour de composant : question de FAQ, champ, filet haut de liste | 5,57:1 (5,17:1 sur la bande) |
| `divider` | Filets de séparation, 1 px | 1,44:1 : un filet, pas un contour de composant |
| `service-border` | Filet au repos des cartes de services et des captures | 1,58:1 |
| `grid-line` / `grid-line-active` | Quadrillage des gouttières, trames de maquette | décoratif |
| `error` | Message d'erreur, toujours porté par une phrase | 7,25:1 |

`--color-success` vaut le blanc : la pêche étant la couleur de marque, elle ne
peut pas signifier « valide ». Le succès passe en encre, porté par un libellé.
L'erreur garde un rouge éclairci pour le fond sombre ; il est voisin de la pêche
en teinte (1,41:1 entre les deux), donc jamais seul.

Les jetons `--color-text-on-dark*`, `--color-divider-dark` et
`--color-surface-on-dark` portent les mêmes valeurs que les encres du fond
général. Ils servent aux éléments qui restent sombres quel que soit leur parent
(légende d'une capture, scènes 3D) et ne sont remappés par aucun bloc.

### Le panneau clair (`.bloc-encre`)

Le seul endroit où le clair revient. Le panneau remappe les jetons de rôle, et
les composants suivent sans variante.

| Rôle remappé | Valeur | Contraste sur le panneau |
|---|---|---|
| `paper` → `panel` | `#f7f8fa` | 16,69:1 contre la nuit qui l'entoure |
| `ink`, `border-strong`, `accent-text`, `focus`, `success` | nuit `#111827` | 16,69:1 |
| `ink-mid` → `panel-ink-mid` | `#4b5565` | 7,09:1 |
| `ink-low` → `panel-ink-low` | `#5d6777` | 5,38:1 |
| `ink-faint` → `panel-ink-faint` | `#8b94a3` | 2,88:1 : trait uniquement |
| `divider`, `service-border` → `panel-divider` | `#dce1e8` | 1,24:1 : filet |
| `surface-low`, `section-band` → `panel-surface-low` | `#eef0f4` | — |
| `surface-high` → `panel-surface-high` | `#ffffff` | — |
| `accent-soft` → `panel-accent-soft` | `#ffe9dd` | nuit dessus : 15,16:1 |
| `error` → `panel-error` | `#b3261e` | 6,15:1 |

### La bande nuit (`.bloc-lime`)

Nom hérité : la classe n'a plus rien de lime et n'est plus claire. Elle pose
`#161f32` et remappe `paper`, `section-band`, les deux surfaces, puis passe
`divider` à `rgba(255,255,255,0.14)` et `grid-line` à `rgba(255,255,255,0.08)`.
Elle rythme la page sans changer de monde : hero des pages d'offre et des pages
outil, témoignages, bloc de contact, 404, barre d'action mobile.

### Named Rules

**La règle du texte sur pêche.** Tout texte posé sur la pêche lit
`--color-night`, valeur fixe qu'aucun bloc ne remappe, jamais `--color-ink`.
`--color-ink` vaut le blanc sur la nuit, et le blanc sur la pêche tombe à
1,74:1. C'est vrai du libellé d'un bouton, d'un fragment surligné, d'une
pastille, de la sélection de texte, et de tout état de survol qui pose la pêche
derrière un libellé : le libellé change de couleur dans la même transition que
le fond.

**La règle du panneau clair.** Sur `.bloc-encre`, la pêche ne porte ni texte,
ni trait, ni focus : 1,64:1. Elle n'y reste qu'en surface, la bande d'un mot
surligné. `--color-accent-text` et `--color-focus` y repassent en nuit, le
trait de `.lien-prose` aussi, et le bouton primaire y
devient nuit à libellé blanc (16,69:1 contre le panneau), survol `night-soft`.

**La règle du remap littéral.** Un bloc qui remappe des rôles n'écrit que des
valeurs littérales. `color: var(--color-ink)` à côté de `--color-ink: <valeur>`
se résout contre la nouvelle valeur posée sur le même élément : c'est le cycle
déjà rencontré deux fois, qui avait produit du blanc sur blanc.

**La règle de la marque relevée.** Une teinte de marque tierce sombre est
relevée de blanc avant d'être posée sur la nuit. L'aubergine de Slack y tient
1,27:1, le violet d'OpenAI 1,65:1 : le logo qu'on vient de viser s'éteint.
`LogoMarquee` mélange 30 % de blanc (`color-mix(in oklab, var(--tool-c) 70%,
white)`), `WorkflowCanvas` un tiers (`66%`). Quand la plateforme publie une
teinte pour fond sombre, c'est elle qu'on prend : sur le pied de page, le bleu
LinkedIn `#70B5F9` tient 8,62:1 là où le bleu des fonds clairs tombe à 3,29:1.

**La règle du contraste calculé.** Chaque contraste écrit dans ce document ou
dans un commentaire est calculé, jamais estimé à l'œil.

## Typography

**Display Font :** Geist Variable (repli `system-ui, -apple-system, sans-serif`)
**Body Font :** Geist Variable
**Label/Mono Font :** aucune. `--font-mono` existe encore parce que onze
composants l'appellent, mais il vaut la police de texte.

**Caractère.** Une seule famille, tenue par le poids et la chasse : titres en
600 serrés (jusqu'à `-0,045em`), corps en 400 à `-0,005em`, libellés
fonctionnels en 500, capitales, `+0,06em`.

### Hierarchy

- **Display hero** (600, `clamp(3,25rem, 6vw + 1,2rem, 6,25rem)`, 0,95) :
  manifestes des landings spécialisées.
- **Display** (600, `clamp(2,25rem, 5vw + 1rem, 5,25rem)`, 0,98, `-0,045em`) :
  `h1` par défaut et `SectionHeader as="h1"`. Plancher à 2,25rem : à 320 px,
  « l'automatisation » se coupait en plein glyphe à 2,75rem.
- **Headline** (600, `clamp(2rem, 3vw + 0,5rem, 3rem)`, 1,05, `-0,035em`) :
  titres de section, toujours via `SectionHeader`.
- **Title lg / Title** (600 ou 500, jusqu'à 1,875rem / 1,5rem, 1,2) : cartes,
  listes, prix, offres du menu mobile.
- **Body large** (400, `clamp(1,0625rem, 0,5vw + 0,875rem, 1,25rem)`) : chapôs,
  questions de FAQ.
- **Body** (400, `1rem`, 1,55) : prose. Mesure plafonnée à `46ch`, soit 65 à 75
  caractères réels : le `ch` de Geist (10,53 px à 16 px) vaut une fois et demie
  un caractère moyen de prose française (6,87 px).
- **Body sm** (`0,875rem`) : légendes, liens de pied de page, liens de la
  navigation home.
- **Button** (500, `clamp(0,75rem, 3,1vw, 0,875rem)`, capitales, `+0,02em`) :
  libellé du bouton primaire.
- **Label / Caption** (500, `0,75rem` / `0,6875rem`, capitales, `+0,06em`) :
  libellés fonctionnels uniquement.

L'échelle est **fluide en haut, fixe en bas**, et la coupure est délibérée. Du
hero au chapô, chaque rang est un `clamp()`. À partir du corps les rangs sont
des valeurs fixes : à cette taille une courbe ne produirait qu'un pixel d'écart
entre les deux extrémités du viewport. Le corps portait une telle courbe et ne
descendait à 15 px que sous 400 px, précisément là où il doit être le plus
lisible : il vaut `1rem`, plancher compris.

Le rang de 13 px (`--text-mono-body`) a disparu de l'échelle rendue : il était
à 1,08 de ses deux voisins. Le jeton, qui ne survivait que comme alias de
`--text-body-sm` pour six maquettes, a été retiré avec elles. Il reste un rapport de 1,09 entre les deux
rangs de petites capitales (11 et 12 px) ; c'est un avis du détecteur, pas un
défaut bloquant.

**Une seule exception à « fixe en bas », et elle est mesurée.** Le libellé du
bouton primaire est un `clamp()` sous `0,875rem` : 12 px sous 387 px de large,
14 px au-dessus de 452. À 14 px sec, quatre des six boutons de la home
passaient de 44 à 65 px de haut à 320 px. La pente est calée sur le conteneur
le plus étroit du site, le CTA de `/principes` dans un encart à 32 px de
padding : 3,6vw le faisait déborder de 400 à 479 px, 3,1vw non.

Aucun rôle ne commute de jeton à un point de rupture : le manifeste perdait
10,2 px (−14,7 %) quand la fenêtre gagnait un pixel à 1024 px.

Pas de césure automatique sur les titres. `hyphens: auto` coupait « freelance »
en « free-lance ».

### Named Rules

**La règle de couche.** Toute valeur par défaut d'élément appartient à
`@layer base`, sans exception et quelle que soit la propriété. Hors couche, une
règle l'emporte sur tout ce que Tailwind émet dans `@layer utilities`, quelle
que soit la spécificité, sans erreur ni avertissement. Trois fois sur ce projet :

| Règle hors couche | Ce qui était demandé | Ce qui était rendu |
|---|---|---|
| `h1…h6 { font-size }` | `<h2>` à 30 px | 48 px |
| `p, li, blockquote { max-width: 72ch }` | `max-w-[43ch]`, 570 px | 955 px |
| `a, button { transition }` | quatorze `transition-colors` | aucune ne pilotait rien |

**La règle du conteneur le plus étroit.** Une courbe typographique se cale sur
le conteneur le plus étroit qui la porte, pas sur la page où on l'a écrite.

**La règle de l'échelle dans `@theme`.** Aucun `clamp()` écrit sur place dans un
composant : une courbe recopiée échappe à toute reprise globale.

## Layout

Colonne de contenu de 1 200 px au plus, centrée, avec des marges latérales
fluides (`--spacing-section-x`, de 24 à 120 px) et un rythme vertical unique
par section (`--spacing-section-y`, de 80 à 128 px). Mobile d'abord.

**Un seul seuil desktop, 1024 px.** C'est le `lg:` de Tailwind, celui où la
navigation passe du menu au wordmark, où `scrollbar-gutter: stable` s'active et
où la grille de gouttière apparaît. Les autres seuils sont des empilements
locaux, écrits avec leur composant : 900 px pour les cartes de services et les
grilles d'abonnement, 800 px pour la section « à propos », 700 px pour la liste
des publics, 520 px pour le hero de la home, 640 et 768 px pour les utilitaires
Tailwind.

**Le rythme vient du changement de surface, pas du vide.** Fond nuit, bande
relevée, île claire, pied de page plus profond. L'île claire ne touche jamais
les bords : elle garde une marge de `clamp(0,5rem, 1,5vw, 1,25rem)`, un liseré
de nuit et non une gouttière, et son contenu reste aligné sur la colonne.

**L'en-tête de section est unique.** `SectionHeader` porte le titre, son filet
et le chapô, avec un seul écart vers le contenu (48 px, 64 px au-delà de
768 px). Deux sections l'avaient refait à la main et se présentaient comme des
sous-parties.

**Les grilles partagent leurs rangées.** Les deux cartes de services et les
formules d'abonnement utilisent `subgrid` sur quatre rangées, pour que titres,
descriptions, médias et pieds s'alignent d'une carte à l'autre. Deux colonnes
égales, écart de 1,5rem ; padding fluide `--spacing-service-card`.

**Une seule maille de grille**, 96 px (`--spacing-grid-cell`). Elle vit dans les
gouttières, de part et d'autre de la colonne, en patchs radiaux décalés qui se
dissipent avant de toucher le contenu. Sous 1024 px elle n'existe pas : mesuré,
la gouttière vaut 32 px à 641, 38 à 768, 45 à 900 et 51 à 1023, il n'y tient
pas une cellule, et ce qu'on voyait était un reste de grille.

Les cibles tactiles font 44 px au moins ; la barre de navigation fait 64 px.

## Elevation & Depth

**Il n'y a pas d'ombre.** `--shadow-card` et `--shadow-card-hover` valent
`0 0 0 0 transparent`. La profondeur vient de deux choses : les filets d'un seul
poids, 1 px, et les paliers de surface. Sur la nuit, **une surface monte en
s'éclaircissant** : fond général `#111827`, bande `#161f32`, carte ou média
`#1a2439`, surface haute `#1f2a42`. Le pied de page descend au contraire, en
`#0c121f`.

Les deux jetons d'ombre restent, et c'est vérifié : quatre déclarations hors de
`global.css` les lisent (`MockupWindow`, `WorkflowCanvas` deux fois,
`CaseStudy`). Les supprimer y
rendrait `box-shadow: var(--shadow-card)` invalide à l'exécution, sans erreur.
« Pas d'élévation » est écrit comme une valeur plutôt que laissé comme un blanc
qu'on comblerait un jour au jugé.

La barre de navigation et la barre d'action mobile sont translucides (fond nuit
à 92 % et 90 %, flou de 12 px) pour rester lisibles au-dessus du contenu qui
défile ; sur la home, la barre est opaque. C'est le seul flou du site.

### Named Rules

**La règle du filet.** Un filet fait 1 px. Deux niveaux : `divider` pour séparer
(1,44:1, volontairement discret) et `border-strong` pour le contour d'un
composant qui doit tenir 3:1 (5,57:1). Un filet blanc pur éblouissait autour de
chaque question de la FAQ.

**La règle du trait de lien.** Le soulignement d'un lien (`.lien-prose`,
question de FAQ au survol) fait 2 px. Ce n'est pas un
filet : un filet sépare ou encadre une surface, celui-ci souligne des mots. Le
pixel de plus le distingue d'un filet de séparation par autre chose que la
teinte, une information portée par la seule couleur n'en étant pas une.

**La règle de la transition utile.** Aucune transition ni état de survol sur une
propriété qui ne change pas. Sept déclarations d'ombre sur des jetons
transparents ont vécu ainsi, recopiées de carte en carte parce qu'au code elles
ressemblaient à une intention.

## Shapes

**Plus d'angle vif.** Le rayon suit la taille de la surface, et ce qui se clique
est rond.

| Jeton | Valeur | Usage observé |
|---|---|---|
| `xs` | 6 px | Détail de maquette, piste du curseur |
| `sm` | 10 px | Lien de navigation, bouton de fermeture, nœud de schéma animé, vignette |
| `md` | 16 px | Carte, question de FAQ |
| `diagram` | 16 px | Nœuds des schémas de cas |
| `lg` | 16 → 24 px, fluide | Média, portrait, carte de service, panneau newsletter, grille d'abonnements |
| `xl` | 20 → 32 px, fluide | Panneau clair `.bloc-encre` |
| `cta` / `full` | 9999 px | Bouton, champ, chip, pouce de curseur, pastille |

`lg` et `xl` sont fluides : 24 et 32 px sur un panneau de 343 px de large le
transformeraient en gélule.

**L'intérieur reste plus petit que l'extérieur.** Un nœud dans une fenêtre de
maquette prend `sm` parce que la fenêtre descend à 16 px sur mobile ; la grille
d'abonnements prend `lg` parce que le panneau qui la porte prend `xl`.

**On n'arrondit pas un trait.** Les filets de séparation à l'intérieur d'un
cadre arrondi restent droits. Le cadre rogne ses filets à l'arrondi.

**Le surlignage est une bande penchée**, de rayon `0,14em`, inclinée de
`-1,8deg` (ou `+1,5deg` avec `.inv`), ramenée à `-1,3deg` / `+1,1deg` dans un
`h1`. La bande penche, les lettres restent droites.

**Le panneau clair est une île, pas une bande.** Bord à bord, il coupait la page
en trois à angle droit ; détaché et arrondi, il se lit comme un objet posé sur
la nuit.

### Named Rules

**La règle du rognage.** Une enveloppe qui porte une animation liée au
défilement rogne en `overflow: clip`, jamais en `overflow: hidden`. `hidden`
fait de l'enveloppe un conteneur de défilement : le `view()` de l'image se
résolvait contre elle et non contre la fenêtre, et l'image restait figée à la
fin de sa course. `clip` rogne sans créer de conteneur de défilement.
`overflow: hidden` reste valable partout ailleurs : cartes, cadres, balayage
de la FAQ.

## Components

### Boutons

**Le bouton primaire** est une gélule pêche à libellé nuit (10,19:1), 44 px de
haut au moins, padding `11px 22px`, libellé en capitales à `+0,02em`. Tout lien
vers l'agenda passe par `BoutonReservation`.

- **Survol et focus :** la pêche s'éclaircit (`peche-clair`), le bouton monte
  d'un pixel, la flèche avance de 3 px. Le libellé ne change pas de couleur.
- **Pressé :** `translateY(0) scale(0.98)`.
- **Désactivé :** opacité 0,55, curseur interdit.
- **Sur panneau clair :** fond nuit, libellé blanc, survol `night-soft`.
- **La sortie est plus lente que l'entrée :** 150 ms à l'aller, 200 ms au
  retour. Un survol dont l'aller et le retour durent autant se ressent comme
  une commutation.
- **Fondu croisé, jamais de balayage :** une bande qui traverse la largeur
  laisse le libellé à cheval sur deux fonds, illisible pendant tout le milieu
  du geste.
- **Mouvement réduit :** la transition de couleur reste, déplacement et échelle
  sautent.

Dans la navigation de la home, le même bouton perd ses capitales et descend à
`body-sm` ; dans la newsletter il monte à 48 px et perd ses capitales.

**Le lien secondaire fléché** (`.link-cta`) est un libellé en capitales de
12 px, blanc, suivi d'une flèche. Au survol et au focus, la bande de surligneur
se pose derrière le libellé de gauche à droite (même inclinaison et mêmes
retraits que `mark`), le libellé passe en nuit dans la même transition, et la
flèche avance de 4 px en prenant la couleur d'accent.

**Le lien de prose** (`.lien-prose`) est souligné de 2 px en pêche, encre au
survol. Il repasse en nuit sur le panneau clair. Le lien souligné fléché
(`.text-link-arrow`) a été retiré le 2 octobre 2026 avec l'ancienne home, son
seul porteur.

### Le surlignage (`mark`)

Une bande pêche pleine derrière les mots, en pseudo-élément avec `z-index: -1`
et `isolation: isolate`. Le texte surligné est en nuit, 10,19:1, partout : sur
la nuit, sur la bande, sur le panneau clair. Retraits `0,06em 0 0,1em`,
resserrés à `0,14em 0 0,16em` dans un `h1`. L'inclinaison alterne à la main via
`.inv` ; douze bandes du même côté se lisent comme un réglage.

Contrainte dure : `white-space: nowrap`. Sur un fragment qui passe à la ligne,
la bande couvre le rectangle englobant et produit un aplat informe. **Le
fragment fait de 1 à 4 mots**, à toutes les tailles. C'est aux mots d'être
courts, pas à la bande de se déformer.

### Chips

Gélule à filet `divider`, texte `ink-mid` en capitales de 11 px, padding
`4px 10px`. Survol : texte blanc, filet `ink-faint`, fond `surface-low`.
`.chip-accent` : fond `accent-soft`, texte pêche (6,93:1), sans filet, sans
survol (elle n'est pas cliquable). `.chip-dashed` : filet pointillé, `ink-low`.
Sur le panneau clair, la chip d'accent devient nuit sur pêche pâle (15,16:1).

### Cartes et conteneurs

- **Carte** (`.card`) : fond du parent, filet `divider`, rayon 16 px, padding
  24 px. Seul le filet s'anime.
- **Carte interactive** : le survol et le focus revendiquent la cellule par le
  filet, qui passe à l'accent. Sur la nuit, `ink-faint` ne se distinguait
  presque pas du filet de repos.
- **Carte de service** (home) : filet `service-border`, rayon `lg`, média en
  3:2 bord à bord entre deux filets. Au pointeur fin, le filet passe en pêche,
  le fond monte d'un palier (`section-band`), le visuel avance (`scale(1.03)`,
  350 ms à l'aller, 600 ms au retour), l'action se souligne et sa flèche
  avance de 0,2rem. Une seule destination par carte, aucun lien imbriqué.
- **Média** : rayon `lg`, fond `surface-low`, enveloppe `.media-ouvre` quand il
  s'ouvre au défilement.
- **Grille d'abonnements** (`SubscriptionGrid`) : un cadre arrondi `lg` sur
  `surface-high`, filets droits à l'intérieur, rangées alignées en `subgrid`,
  empilement sous 900 px. Elle lit les jetons de rôle et suit donc le panneau
  clair comme la bande nuit. Aucun bouton par formule.

### Champs

Le champ email de la newsletter est une gélule : 48 px de haut, filet
`border-strong` (5,57:1), fond nuit, texte blanc, indication en `ink-mid`
(10,67:1). Le texte fait 16 px : en dessous iOS zoome. Erreur en `error`,
portée par une phrase dans un statut `aria-live`.

Le curseur du simulateur (`.roi-slider`) a une zone tactile de 28 px, une piste
visible de 4 px en encre, un remplissage pêche de 10 px, un pouce rond pêche à
contour d'encre de 2 px qui grossit à 1,15 au survol et au focus.

### Focus

Anneau `2px solid var(--color-focus)`, décalage 2 px, en `outline` et jamais en
`box-shadow`. Pêche sur la nuit (10,19:1), nuit sur le panneau clair (16,69:1).
Il n'est posé que sur un appareil disposant d'un pointeur fin ou d'un survol
(`any-hover: hover` ou `any-pointer: fine`) : sur tactile pur, iOS dessine un
cadre disgracieux au tap et sur tout `.focus()` programmatique. Les champs de
saisie gardent leur anneau même sur tactile. En couleurs forcées : `CanvasText`.

### Navigation

Barre fixe de 64 px (4rem, `--spacing-barre` : elle grandit avec le texte
quand le visiteur l'agrandit), filet bas `divider` qui passe à `ink-faint` une
fois la page défilée, sans ombre. Liens en capitales de 12 px, `ink-mid`, blancs au
survol ; le lien actif se distingue par le poids (600), sans filet décoratif.
Sur la home, les liens et le wordmark sont en casse normale.

**Le repère est un emplacement, pas deux objets.** Au-dessus de 1024 px il porte
le nom en toutes lettres : « Lilian Sevoumian » sur la home, `LILIAN SEVOUMIAN`
ailleurs. En dessous, l'emplacement tombe à 28 px et porte un « L » tant que le
hero est à l'écran, puis le visage en fondu croisé. Sur les pages sans hero,
l'état est posé au rendu, pour ne pas faire clignoter un « L ».

**Une seule instance de réservation visible à la fois.** Le CTA central mobile
s'éteint quand la barre d'action mobile remonte ou quand le menu est ouvert.

**Le menu mobile** est un dialogue natif plein écran sur fond nuit : en-tête et
pied fixes, seule la liste défile, dans la hauteur dynamique du viewport et avec
les zones de sécurité du téléphone. Les deux offres sont en `title-lg` sur filet
`border-strong`, les liens en `body-large` sur filet `divider`. Passer au format
desktop ferme le menu. Son ouverture est décrite sous *Mouvement*.

**Texte agrandi : la barre passe au menu.** Ses liens demandent environ 56em de
large ; une requête de conteneur en em (`barre-nav`, dans `global.css`) masque
les liens et montre le bouton du menu dès que la place manque, y compris
au-dessus de 1024 px quand le texte est agrandi. Le menu s'ouvre tant que les
liens sont masqués, quelle que soit la largeur.

### FAQ

Chaque question est une carte de rayon 16 px à filet `border-strong`, qui passe
à `ink-low` au survol et au focus interne. La question se souligne de 2 px au
survol ; le caret pivote de 45° et prend la couleur d'accent à l'ouverture. La
réponse est en `ink-mid`, mesure `46ch`. L'ouverture anime la hauteur en 260 ms
là où `interpolate-size` existe ; ailleurs elle reste instantanée.

### Pied de page

Fond `night-deep`, filets `divider`, texte `ink-mid` (11,25:1), libellés de
colonne en capitales `ink-low` (8,18:1). Les trois canaux prennent la couleur
de leur plateforme au survol et au focus. Le bouton de réservation n'y figure
que sur la page légale, seule page sans bloc de contact.

### Mouvement

**Trois gestes d'auteur, et pas un de plus.** Ils sont joués une fois, écrits en
CSS, et aucun ne conditionne l'affichage : sans script, sans support ou en
mouvement réduit, l'élément est simplement là.

1. **Le surligneur qui se trace.** Une propriété enregistrée, `@property
   --draw` (de 0 à 1), pilote deux choses à la fois : la bande, rognée par un
   `clip-path` et non étirée par un `scaleX` (qui déplacerait le pivot de la
   rotation), et le texte, peint par un dégradé à arrêt franc, blanc là où la
   nuit est encore derrière lui, nuit là où la pêche l'a recouvert. 700 ms
   (`--duration-trace`), `ease-out-expo`, 220 ms après l'apparition du bloc qui
   le porte, 520 ms dans un hero. Armé uniquement sous `.js-ready` et là où
   `background-clip: text` existe.
2. **L'entrée du hero** (`.entree`). Chaque enfant direct monte de 18 px, se
   dévoile et fait le point (flou de 6 px), l'un après l'autre : 900 ms
   (`--duration-entree`), 110 ms entre deux, cinq crans puis un plafond.
   `backwards` et non `both` : aucun filtre ne reste sur le titre. L'entrée du
   portrait (`.entree-portrait`) a été retirée le 2 octobre 2026 avec l'ancien
   hero, son seul porteur.
3. **Les médias qui s'ouvrent au défilement** (`.media-ouvre`). Le média entre
   rogné (`inset(9% 5%)`) et grossi (`scale(1.12)`), puis s'ouvre à mesure
   qu'il monte dans la fenêtre : `animation-timeline: view()`, de `entry 5%` à
   `cover 38%` pour le cadre et `cover 45%` pour l'image. Au pire de sa course
   il reste visible à plus de 80 %.

**L'accompagnement de lecture**, qui n'est pas un geste d'auteur :

- **Révélations.** Un bloc isolé (`.reveal`) se contente d'un fondu de 380 ms,
  sans déplacement. Les éléments d'une liste (`.reveal-stagger`) montent de
  12 px en 700 ms avec 80 ms de décalage, plafonné à 400 ms au-delà du dixième.
  Le voile n'est armé que sous `.js-ready`, et un garde-fou lève tout à 2,5 s.
- **Le filet des en-têtes de section se tire** de gauche à droite (`scaleX`,
  900 ms, 120 ms de retard) après l'apparition du titre.
- **La descente de la FAQ.** Chaque question arrive à son tour (900 ms, 160 ms
  entre deux) pendant qu'une bande `surface-low` la balaie de gauche à droite.
  Les deux durées sont des jetons parce qu'elles doivent rester égales à deux
  endroits chacune. Le déclencheur est `.balaye`, pas `.is-visible`.
- **L'ouverture du menu mobile en cascade.** Le voile se fond en 260 ms, puis
  les liens montent de 14 px l'un après l'autre (560 ms, 50 ms de pas, 70 ms de
  retard). Seule l'ouverture est animée : on ne fait pas attendre quelqu'un qui
  s'en va.
- **Les transitions de page** (`@view-transition { navigation: auto }`).
  L'ancienne page se fond en 160 ms, la nouvelle entre en 420 ms avec 10 px de
  montée. La barre de navigation porte son propre nom de transition et ne
  clignote pas. Chaque page reste un chargement complet.
- **La parallaxe des gouttières**, liée au défilement, en `transform` seul.

**Le retour d'interaction** est court : 150 ms (`--duration-quick`) et 200 ms
(`--duration-default`). Trois courbes, toutes en *ease-out*, toutes dans
`@theme` : `--ease-out-quint` par défaut, `--ease-out-expo` pour les entrées
longues, `--ease-out-quart` pour les teintes de marque au survol. Les deux
défauts de transition de Tailwind pointent sur ces jetons ; l'ancien défaut
était un ease-in-out.

**Mouvement réduit.** Toutes les animations et transitions tombent à 0,01 ms,
les révélations sont forcées visibles, le surligneur est posé tracé, les
transitions de page sont coupées. La couleur continue de répondre : c'est un
retour d'information, pas du mouvement.

**Les boucles ambiantes ne tournent que si on les regarde.** Les conteneurs
marqués `data-motion-idle` mettent leurs animations en pause hors écran :
mesuré, cinquante-deux animations infinies tournaient pour des maquettes
situées six mille pixels plus bas.

**Une animation liée au défilement ne porte que des propriétés compositables**,
`transform`, `opacity`, et `clip-path` pour l'ouverture des médias. Mesuré par
trace CDP sur un scroll de 3 000 px à 1440 × 900, médiane de trois passes :

| | Paint | RasterTask |
|---|---|---|
| parallaxe + défilé des lignes en `background-position` | 867 | 967 |
| grille masquée (témoin) | 445 | 88 |
| la parallaxe seule | 445 | 94 |

Le défilé des lignes coûtait 422 peintures et 879 rastérisations pour un
mouvement que le masque efface à 72 %.

Un jeton déclaré pour être adopté plus tard vit dans un bloc `@theme static` :
Tailwind v4 n'émet pas un jeton que rien ne référence.

### La home personnelle et son routeur de services

Cette section décrit l'ancienne home, remplacée par *L'accueil* plus haut : ses
composants (`Home*.astro` en PascalCase, `service-workflow-visual.astro`) et
les images de `src/assets/home-services/` ont été supprimés le 2 octobre 2026
et restent dans l'historique git.

Le premier viewport présente d'abord la personne qui construit. Sur desktop, le
titre « Gagnez du temps avec l'IA et l'automatisation. » occupe la gauche et le
portrait de Lilian la droite ; « l'automatisation » est surligné. Le portrait
est au ratio carré, arrondi en `lg`, sans bordure ni ombre ; son nom et son
ancienneté figurent en légende. Sous 1024 px, l'image passe sous le texte, avec
une largeur maximale de 30rem. Un filet `border-strong` ferme le hero. L'unique
bouton commercial de la home, pêche à libellé nuit, ouvre l'agenda depuis
l'en-tête fixe ; le lien secondaire « Voir les services » descend vers
`#services`.

La section suivante présente Lilian sur un ton personnel, avec deux repères
sous le récit et le lien vers les cas clients. Une photo réelle dans son espace
de travail occupe la droite et s'ouvre au défilement, puis passe sous le récit
sous 800 px. `src/assets/lilian-au-bureau.jpg` est une copie du fichier fourni
par Lilian ; cette provenance reste attachée à l'actif. Le portrait est chargé
en priorité, la photo de bureau à la demande.

Le choix arrive ensuite dans deux cartes de même poids : **Automatisation & IA**
et **Sites & applications web**, décrites plus haut. À gauche,
`ServiceWorkflowVisual` affiche la capture Make originale de Lilian, recadrée ;
à droite, un suivi commercial généré, aux données fictives mentionnées comme
telles. La provenance des deux PNG était documentée dans
`src/assets/home-services/README.md`, supprimé avec eux. Les prix viennent de
`src/data/service-pricing.ts`, partagé avec les pages d'offre.

Après ce routeur, **le panneau clair** aide les fondateurs et équipes Ops, les
dirigeants de PME, puis les agences et studios à se reconnaître : une liste à
deux colonnes sur filets, empilée sous 700 px. Avant la FAQ, deux colonnes ont
chacune leur en-tête : la dernière vidéo YouTube (vignette 16:9 qui s'ouvre au
défilement, pastille « Voir la vidéo » qui passe en pêche à libellé nuit au
survol) et la newsletter (panneau `surface-low` arrondi en `lg`). Le formulaire
envoie vers `/api/newsletter` avec double opt-in ; le chargement désactive le
bouton, le succès demande la confirmation par email, l'échec conserve la saisie
et explique comment réessayer via un statut accessible.

La home se termine après la FAQ. Aucun bouton de réservation ne se répète dans
le hero, après les services ou en bas de la home. Les autres pages gardent une
seule action de contact terminale. La durée affichée vient de
`DUREE_RESERVATION_MINUTES`, dans `src/lib/reservation.ts`.

### Pages d'offre et pages de cas

Les landings ouvrent sur une bande nuit (`HeroManifesto`, typographie seule).
La landing web distingue les sites commerciaux des applications métiers par
deux ancres ; ses abonnements et un second bloc vivent sur le panneau clair.
Tarifs et inclusions viennent de `src/data/maintenance.ts`.

Les pages de cas découpent leur corps markdown en pièces, une par titre, sur
des surfaces alternées : fond nuit, bande, et **la dernière pièce est le
panneau clair**. Trois dispositifs sont pilotés par le frontmatter, chacun avec
un seuil : `flow` exige exactement trois actions, `bascule` au moins trois
lignes, `nomenclature` au moins six. **Un cas qui n'a pas la matière n'a pas le
visuel.** Un cas d'application métier peut documenter un premier lot sans KPI,
capture ni témoignage ; la date affichée est une date de publication.

### Marques tierces et preuves

**Le logo dans le fil du texte** (`Outil.astro`) prend la couleur du texte,
jamais celle de la marque. Le couple logo + nom est en `nowrap`. L'alignement
est optique et se corrige par marque.

**Les maquettes produit** (`MockupWindow`, `WorkflowCanvas`) sont des
reconstitutions schématiques. Les écrans clients sont confidentiels : aucun
visuel ne doit pouvoir passer pour une capture. Les couleurs de marque tierces
y sont posées au repos parce qu'on montre l'outil réel, relevées de blanc quand
elles sont sombres.

**Les captures de projets publics** (`ProjectVisual`) montrent une vraie page
publique, arrondie en `lg`, dans les ratios `16 / 7`, `16 / 10` ou `4 / 5`, avec
un filet `service-border` posé par-dessus l'image. La légende tient dans
l'image, sur un voile teinté vers `night-deep` et non vers le noir neutre,
limité au bas de l'image. Le survol agrandit l'image sur pointeur fin (600 ms
au retour), la légende ne bouge pas. Une image absente devient un aplat
`night-deep`, jamais une icône cassée. Ni fenêtre de navigateur ni appareil.

**La capture comme preuve.** Une capture n'est admissible que si la page est
publique, l'URL source conservée et le fichier traçable. Sa palette reste
enfermée dans l'image.

**Une couleur de marque au survol.** Dans le chrome du site, au repos, tout est
encre ; la marque tierce n'apparaît qu'au survol, et jamais sur pointeur
grossier : logos du bandeau (`LogoMarquee`), logo en tête de carte outil
(`Stack`), canaux du pied de page.

### Scènes de travail et schémas des cas clients

La page `/automatisations-ia` associe trois scènes photoréalistes à six
usages : dossiers et reporting, commandes et catalogue, prospection et demandes
entrantes. Images illustratives de personnes fictives générées par IA ;
provenance et prompts conservés dans `src/assets/work-scenes/README.md`. Photos
en 3:2, WebP responsive et chargement différé, trois colonnes puis empilement
sous 900 px.

Les visuels du carrousel utilisent `CaseIllustration.astro` : trois étapes
reliées, outils nommés et logos de marque disponibles ; les outils sans logo
utilisent une icône fonctionnelle. Les nœuds ont un rayon de 16 px
(`--radius-diagram`), un filet `ink-low` et un fond `surface-high`. Sous
380 px, le schéma passe à la verticale. M Partners cite Loxo dans le texte, le
schéma et sa fiche.

### Three.js : laboratoire et schémas intégrés

La route `/explorations-3d` réunit trois études manipulables, **Orbites**,
**Flux** et **Structure**. Elle reste expérimentale, en `noindex` et hors
sitemap. Les deux pages d'offre conservent deux scènes intégrées, Flux et
Structure ; la home n'en porte aucune.

**La règle du mouvement fini sur les offres.** Flux et Structure parcourent
leurs deux états en 4,6 secondes puis s'arrêtent. Deux boutons affichent les
extrémités ; la lecture peut être suspendue, reprise ou rejouée. Avec mouvement
réduit, l'état final est statique. Ces scènes ne reçoivent pas l'enveloppe
`.media-ouvre` : elles ont déjà leur propre mouvement.

**La règle du schéma autonome.** Le titre, les légendes et le schéma statique
HTML/SVG portent le sens avant le chargement de la 3D et en cas d'échec. Les
textes projetés sont du HTML en Geist. Les commandes conservent les cibles de
44 px.

**L'accent des scènes est la pêche.** Libellés d'accent, état sélectionné et
focus des commandes lisent `--color-peche`, comme le reste du site sur la nuit ;
le moteur lit le jeton au runtime. L'ancienne exception « lime sur encre » n'a
plus lieu d'être : ce qui était une exception locale est devenu la règle
générale. Aucun halo, verre ni nouvelle couleur.

Les compositions et seuils de chargement sont décrits dans
`src/lib/site-scenes/README.md`.

### Documents historiques

Les contrats et preuves cités par les versions précédentes de ce document
(`.impeccable/surfaces/site-scenes.md`,
`.impeccable/surfaces/src-pages-explorations-3d-astro.md`,
`.impeccable/review/night-home-contract.md`,
`.impeccable/review/night-home-finish-review.md`,
`.impeccable/review/newsletter-lumail-runtime.json`, preuves `paper-home-*` et
`scroll-scenes-*`) décrivent la direction précédente — papier blanc, encre
noire, surlignages lime, angles droits — et sont **historiques**. Ils valent
pour la structure et les comportements qu'ils ont vérifiés, pas pour les
couleurs, les rayons ni le mouvement. La critique
`.impeccable/critique/2026-09-04T11-58-59Z__src-pages-sites-web-abonnement-astro.md`
est dans le même cas.

## Do's and Don'ts

### Do:

- **Do** lire `--color-night` pour tout texte posé sur la pêche : libellé de
  bouton, fragment surligné, pastille, état de survol qui pose la pêche.
- **Do** laisser les composants lire les jetons de rôle : ils suivent la bande
  nuit et le panneau clair sans variante.
- **Do** passer le bouton primaire en nuit, et les traits et le focus en nuit,
  sur le panneau clair.
- **Do** relever de blanc une teinte de marque sombre avant de la poser sur la
  nuit, ou prendre la teinte que la plateforme publie pour les fonds sombres.
- **Do** vérifier chaque contraste par le calcul. Toutes les valeurs de ce
  document sont calculées.
- **Do** garder les fragments surlignés entre 1 et 4 mots, sur une ligne, et
  alterner l'inclinaison.
- **Do** choisir le rayon selon la taille de la surface, et garder l'intérieur
  plus petit que l'extérieur.
- **Do** rogner en `overflow: clip` toute enveloppe qui porte une animation
  liée au défilement.
- **Do** écrire une entrée de sorte que la page soit peinte dans son état final
  sans script : `@keyframes` en `backwards`, voile armé sous `.js-ready`.
- **Do** faire porter le rythme par le changement de surface, pas par le vide.
- **Do** laisser une absence quand la matière manque. Sur ce site, ce qui n'est
  pas montré est aussi une affirmation.
- **Do** montrer un projet public par une capture réelle, légendée et
  traçable ; cantonner sa palette à l'image.
- **Do** garder les deux cartes du routeur de la home strictement égales en
  poids et en nombre de surfaces interactives.
- **Do** passer par `SectionHeader` pour tout en-tête de section, et par
  `BoutonReservation` pour tout lien vers l'agenda.

### Don't:

- **Don't** écrire `color: var(--color-ink)` sur un fond pêche : c'est du blanc
  à 1,74:1.
- **Don't** poser la pêche en texte, en trait ou en anneau de focus sur le
  panneau clair : 1,64:1.
- **Don't** déduire une couleur d'un nom hérité. `.bloc-lime` est une bande
  nuit, `.bloc-encre` un panneau clair, `--color-paper` la nuit.
- **Don't** lire un jeton de rôle dans le bloc qui le remappe : valeurs
  littérales uniquement, sinon cycle.
- **Don't** réintroduire un second accent, le lime, ou un fond général clair.
- **Don't** laisser un angle vif sur une surface, un média ou un contrôle ; ni
  arrondir un filet de séparation.
- **Don't** étendre le panneau clair bord à bord : c'est une île à marge.
- **Don't** ajouter une ombre. La profondeur vient des filets et des paliers
  de surface.
- **Don't** utiliser `overflow: hidden` sur une enveloppe animée par
  `animation-timeline: view()` : l'image reste figée.
- **Don't** animer autre chose que `transform`, `opacity` ou `clip-path` sur
  une timeline de défilement.
- **Don't** ajouter un quatrième geste d'auteur, ni conditionner l'affichage
  d'un contenu à une animation ou à un script.
- **Don't** animer la fermeture du menu mobile.
- **Don't** faire balayer la pêche sur la largeur d'un bouton : le libellé
  traverse deux fonds et devient illisible au milieu du geste.
- **Don't** déclarer une transition, ou un état de survol, sur une propriété
  qui ne change pas.
- **Don't** poser un sur-titre en petites capitales espacées au-dessus d'un
  titre de section, ni une numérotation `01 / 02 / 03`. C'est la grammaire du
  site généré, retirée volontairement.
- **Don't** réintroduire une police monospace.
- **Don't** entourer une capture de projet d'un faux navigateur ou d'un
  appareil, ni faire passer une reconstitution pour une capture d'écran.
- **Don't** écrire une valeur par défaut d'élément hors de `@layer base`.
- **Don't** écrire un `clamp()`, une `cubic-bezier()` ou une durée couplée sur
  place dans un composant. L'échelle, les trois courbes et les durées vivent
  dans `@theme`.
- **Don't** commuter un rôle typographique entre deux jetons à un point de
  rupture.
- **Don't** poser un commentaire `{/* … */}` à l'intérieur d'une expression
  Astro (dans un `.map()`, un `&&`, ou entre les attributs d'un composant) : le
  compilateur rend `Expected ")" but found "$$render"` et toutes les pages
  tombent en 500. Le commentaire va avant l'expression.
- **Don't** présenter le vibe coding comme une troisième offre, ni faire
  remonter le choix entre les deux services dans le hero personnel.
