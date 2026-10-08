---
name: Lilian Sevoumian
description: "Site personnel de Lilian Sevoumian : automatisation, agents IA, formations, sites web. Une seule tenue sur toutes les pages : nuit profonde en fond, un seul accent pêche, le clair seulement dans une île arrondie, titres en graisse 500, un trait pêche sous un fragment de titre, tout en bas de casse, un seul bouton qui ouvre la conversation, seul à porter la pastille pêche. L'accueil y ajoute sa grille et une scène d'interface par métier, jouée une fois."
colors:
  paper: "#0c121f"
  surface-low: "#1a2439"
  surface-high: "#1f2a42"
  night: "#111827"
  night-soft: "#263449"
  night-deep: "#0c121f"
  ink: "#ffffff"
  ink-mid: "#c3c9d4"
  ink-low: "#a3acbb"
  ink-faint: "#7c8799"
  divider: "rgb(255 255 255 / 0.09)"
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
  feuille-note: "#4b5565"
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
  display-hero:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.25rem, 6vw + 1.2rem, 6.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 5vw + 1rem, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  phrase:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.625rem, 2.2vw + 0.6rem, 2.4375rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  title-lg:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 1.5vw + 0.75rem, 1.875rem)"
    fontWeight: 500
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
    lineHeight: 1.5
  body:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  body-sm:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  button:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0"
  label:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  caption:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
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
  bloc: "clamp(3rem, 7vw, 5rem)"
  gouttiere: "clamp(2rem, 5vw, 4.5rem)"
  groupe: "clamp(2rem, 3vw, 2.5rem)"
  lie: "clamp(1.25rem, 2vw, 1.75rem)"
  colle: "0.5rem"
  cadre: "clamp(1rem, 2.2vw, 2rem)"
  maille: "clamp(3.5rem, 5.6vw, 5.5rem)"
  panneau: "clamp(1.5rem, 2.4vw, 2rem)"
  barre: "4rem"
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
    typography: "{typography.button}"
    height: "44px"
  mark:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
    height: "44px"
  question:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-large}"
    padding: "1.25rem 0"
  question-reponse:
    textColor: "{colors.ink-mid}"
    typography: "{typography.body}"
    padding: "0 2.375rem 1.5rem 0"
  bulle-visiteur:
    backgroundColor: "{colors.peche}"
    textColor: "{colors.night}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
  bulle-reponse:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
  invite:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 0.5rem 0.5rem 1.25rem"
  media:
    backgroundColor: "{colors.surface-low}"
    rounded: "{rounded.lg}"
  panneau-clair:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.night}"
    rounded: "{rounded.xl}"
  logo-client:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    height: "1.5em"
  scene-cadre:
    backgroundColor: "{colors.night-deep}"
    rounded: "{rounded.md}"
  footer:
    backgroundColor: "{colors.night-deep}"
    textColor: "{colors.ink-mid}"
---

# Design System: Lilian Sevoumian

## Overview

**Creative North Star : « Nuit et pêche »**

Le site est celui d'une personne : Lilian, ce qu'il a fait et ce qu'il fait
aujourd'hui. L'accueil raconte, dans l'ordre fixé par lui : vous perdez du
temps, voilà pourquoi, voilà pourquoi automatiser, voilà pourquoi moi. Les deux
offres chiffrées, **Automatisation & IA** et **Sites web**, gardent ensuite
chacune leur page, à côté des pages d'outil, des pages de lecture, des cas
clients et des principes. Le site doit tenir debout tout seul, sans ornement
pour rattraper une hiérarchie molle : le contraste vient de la taille, de
l'espace et d'un accent unique.

**Une seule tenue, sur toutes les pages.** La direction « tech moderne,
propre », validée par Lilian sur l'accueil le 2 octobre 2026, a été étendue à
tout le site le 3 octobre 2026 : il a demandé que tout soit homogène. Elle est
énoncée dans *La tenue commune* ; la section *L'accueil* ne décrit plus que ce
qui est propre à cette page (sa grille, ses filets de cadre, ses scènes).

Le site vit sur la nuit profonde `#0c121f`. Le texte est blanc, les gris sont
teintés vers la nuit, et il n'y a qu'un accent : la pêche `#ffb38a`. En
aplat, elle est le bouton d'appel ; et, parce qu'elle tient 10,76:1 sur le
fond, elle a aussi le droit d'être un trait (sous un fragment de titre, sous
un lien), du texte d'accent et l'anneau de focus. Le clair est l'exception : il ne revient que dans l'île,
un panneau `#f7f8fa` détaché et arrondi, où la pêche retombe à 1,64:1 et
redevient une simple surface.

Plus d'angle vif. Une surface s'arrondit selon sa taille, de 6 px pour un
détail de maquette à 32 px pour l'île, et ce qui se clique est rond : bouton,
lien de la barre, étiquette. Les deux rayons d'origine, 0 et 9999, donnaient un
site « trop carré » : c'est le retour explicite du client.

Rien n'est encadré pour être rangé. Les sections se suivent sur le même fond,
séparées par un filet d'un pixel ; à l'intérieur, les blocs de texte sont posés
à plat et c'est l'espace qui les sépare. Listes à filets, grilles de cartes
bordées et bandes de fond sont ce que Lilian a refusé comme « IA slop ».

Le mouvement porte trois gestes d'auteur : le soulignement qui se tire,
l'entrée d'un en-tête de page, les médias qui s'ouvrent au défilement. Le reste
est du retour d'interaction ou de l'accompagnement de lecture (voir
*Components → Mouvement*). Sur l'accueil, une animation joue une fois puis se
tait : Lilian a demandé le 8 octobre 2026, après relecture du site en ligne,
de réduire les animations de la page.

Trois choses restent retirées, et l'absence est le geste : le monospace, les
sur-titres au-dessus des titres, et les capitales de style. `SectionHeader` n'a
ni prop `label` ni filet, et la numérotation `01 / 02 / 03` n'existe plus que
là où l'ordre est l'information (les étapes d'une méthode, les rangs d'un
relevé).

**Les noms de jetons et de classes sont hérités, leurs valeurs ne le sont pas.**
`--color-paper` vaut la nuit, `--color-ink` vaut le blanc, `.bloc-encre` est le
panneau clair, `.mono-label` et `.mono-caption` sont des libellés en bas de
casse dans la police de texte, `--font-mono` vaut Geist, `SubscriptionGrid` est
une liste de prix à plat. Les composants consomment les mêmes noms qu'avant :
seule la valeur a changé. Ne jamais déduire une couleur ni une forme d'un nom.

**Caractéristiques clés :**

- Nuit profonde en fond, partout ; aucune bande de fond ; le clair n'existe que
  dans une île arrondie.
- Un seul accent, la pêche. Texte posé dessus : toujours `--color-night`.
- Titres en graisse 500 : c'est la taille qui parle.
- La pastille pêche pleine est le bouton d'appel, et rien d'autre.
- `mark` souligne : un trait pêche sous un fragment de titre, un par titre au
  plus.
- Tout en bas de casse, sans approche : aucun libellé en capitales.
- Aucun angle vif ; le rayon suit la taille de la surface, le cliquable est rond.
- Des blocs de texte à plat, séparés par l'espace ; ni carte bordée ni liste à
  filets.
- Un seul geste de contact : « Parlons de votre projet » ouvre la conversation.
- Une seule famille, Geist Variable.
- Trois gestes d'auteur de mouvement, joués une fois, jamais bloquants.
- Sur l'accueil, une animation joue une fois puis s'arrête ; seule la scène du
  récit continue de bouger.
- Les artefacts publics et les marques tierces gardent leur palette dans leurs
  visuels, jamais dans le chrome du site.

## La tenue commune

Les règles nées sur l'accueil, étendues à toutes les pages le 3 octobre 2026.
Elles vivent dans `src/styles/global.css` (le bloc `@theme`, puis le bloc « LA
TENUE COMMUNE ») et dans six composants partagés. Une page intérieure ne les
réécrit pas : elle les compose.

### Les neuf règles

1. **Un seul fond.** `--color-paper` vaut la nuit profonde `#0c121f` sur tout
   le site : la page, la barre, le menu mobile, l'agenda en plein écran.
   `#111827` reste `--color-night`, la couleur du texte posé sur la pêche. Les
   filets sont adoucis : `--color-divider` vaut 9 % de blanc, transparent.
2. **Aucune bande de fond.** Une section ne change pas de couleur pour se
   distinguer de sa voisine : elle trace un filet à son pied
   (`border-b`, `--color-divider`). Une surface ne monte d'un cran
   (`--color-surface-low`) que pour un panneau arrondi posé dans la colonne : un
   média, la fenêtre du simulateur, les repères de prix d'un en-tête, un relevé.
3. **Le clair n'existe que par `.bloc-encre`, sous une seule forme : l'île.**
   La `<section>` entière porte la classe ; elle se détache par une marge fine
   (`clamp(0,5rem, 1,5vw, 1,25rem)`) et le rayon `--radius-xl`, et son contenu
   reste calé sur la colonne de 1 200 px. Elle porte ce que le lecteur est venu
   vérifier : un prix, des résultats, une méthode, un comparatif, « pourquoi
   moi ». **Deux par page au plus, jamais deux de suite, jamais la première ni
   la dernière section.** La section qui précède une île ne trace pas son filet
   de pied (`section:has(+ .bloc-encre)`) : l'île se détache déjà de la nuit.
   Seule exception de forme : sur l'accueil, le panneau « Pourquoi moi » est
   une carte dans une colonne (`home-today-path`), parce qu'il n'occupe pas
   toute la largeur.
4. **Les titres sont en graisse 500**, de `h1` à `h4`. `h1` et `h2` prennent
   `--leading-display` (1,1) et `--tracking-display` (−0,03em). La règle est
   écrite une fois, avec `:root :is(…)` : ce poids de classe l'emporte sur un
   utilitaire resté dans le balisage (`font-semibold`, `leading-[1.05]`).
5. **`mark` est un soulignement, et la pastille pêche pleine est le bouton
   d'appel.** Décision de Lilian, le 8 octobre 2026. Un fragment de titre se
   distingue par un trait pêche tiré sous lui, à l'encre du titre. Un seul par
   titre, sur une page intérieure seulement dans le `h1` et dans le titre de
   fin de page, et jamais dans une île claire (voir *Components → Le
   soulignement*).
6. **Aucune capitale de style.** `.mono-label`, `.mono-caption`, `.chip`,
   `.btn-primary`, `.link-cta` et `.nav-link` sont en bas de casse, approche 0.
   Pas de sur-titre, pas de numéro de section. Un numéro reste là où l'ordre
   est l'information : les étapes de la méthode (`Methode`, compteur CSS),
   celles de la page des sites, les rangs d'un relevé de cas.
7. **La mesure est de `46ch`.** Dans Geist, `1ch` vaut environ un caractère et
   demi de prose : `46ch` donne une ligne d'environ 70 caractères. C'est le
   plafond de base de `p, li, blockquote`, le défaut de
   `SectionHeader.bodyMaxWidth`, et la largeur des chapôs.
8. **Un seul geste de contact.** Tous les boutons disent « Parlons de votre
   projet » (`LIBELLE_CONTACT_RESERVATION`, dans `lib/reservation.ts`) et
   ouvrent la conversation de `home-invite`, que `Layout` rend sur toutes les
   pages (l'accueil la place lui-même, après son premier écran).
   `BoutonReservation` ouvre la conversation par défaut ; sa prop `direct` mène
   à l'agenda, et seul le moyen « Réserver un appel » de la conversation s'en
   sert. Sans script, le bouton reste un lien vers l'agenda.
9. **Une seule barre de navigation** (`Navigation.astro`) : fond plein, nom en
   bas de casse, liens à 14 px, pastille de survol, un bouton. Seule la liste
   des liens change d'une page à l'autre. Le menu mobile a la même composition
   partout : une liste en grand, une suite plus discrète, le bouton en bas.

### Les composants communs

Ils sont dans `src/components/`, en kebab-case. Chacun remplace une chose que
plusieurs pages écrivaient à la main, chacune à sa façon.

- **`tete-de-page`** : l'en-tête d'une page intérieure. Le fil de retour, le
  `h1` (`--text-display`, largeur réglable en `ch`, un `mark` permis), le chapô
  (`--text-body-large`, `ink-mid`, `46ch`), puis au besoin le bouton (prop
  `bouton`, qui est aussi sa source dans les statistiques), une ligne de
  preuves en `--text-body-sm` et, collée dessous (`--spacing-colle`), une
  ligne de date de la même taille en `ink-low` : « Publié le 3 octobre 2026. »
  (prop `publie`) ou « Mis à jour le… » (prop `misAJour`). La date s'écrit
  dans la page et pas seulement dans le balisage : c'est ce qu'un lecteur, ou
  un agent, a pour juger de la fraîcheur d'un prix. Il dégage la barre fixe
  (`--spacing-barre` + `--spacing-bloc` au-dessus) et ses éléments arrivent par
  `.entree`. Aucun sur-titre. S'en servir pour toute page qui n'a pas un
  premier écran à elle.
- **`partie`** : une partie d'une page qu'on lit d'un bout à l'autre. Le titre
  à gauche (`--text-phrase`, `18ch`, collant sous la barre à partir de
  1024 px), le texte à droite (`40rem` au plus, `--text-body-large`,
  interligne 1,65), sur une grille `1fr / 1,4fr`. Le contenu passe par le
  slot : paragraphes, liste à puce d'encre, tableau. Un tableau n'a que des
  filets fins entre ses rangées ; sous 720 px chaque rangée devient un bloc,
  chaque cellule précédée du nom de sa colonne (`data-colonne`). La prop
  `clair` fait de la partie une île.
- **`questions`** : les questions d'une page, en FAQ classique, un accordéon
  sans script (voir *Components → Questions*). Sans `items`, elle lit
  `data/home-faq`.
- **`fin-de-page`** : la fin de chaque page, une phrase centrée sur la maille,
  le champ et le bouton (voir *Components → La fin de page*). Une page ne
  change que le titre et la phrase qui le suit ; l'accueil ajoute la ligne des
  prix (prop `prix`).
- **`pourquoi-moi`** : qui construit, dans une île claire. Le portrait rond
  (4rem) et le titre à gauche ; à droite deux voix qui ne se mélangent pas, la
  notice à la troisième personne (datée, citable) puis le texte à la première.
- **`retour`** : le fil de retour, une flèche et une destination en bas de
  casse (`--text-body-sm`, `ink-low`, cible de 44 px). `tete-de-page` le pose ;
  les pages de cas l'appellent directement.

Partagés aussi, mais plus anciens : `SectionHeader` (titre puis chapô, sans
sur-titre ni filet ; un seul écart vers le contenu, 48 px puis 64 px au-delà de
768 px), `BoutonReservation` (tout lien vers l'agenda ou la conversation ; sa
prop `source` est requise), `LinkCTA` (le lien secondaire fléché).

### Les deux gabarits

- **`layouts/PageExpertOutil.astro`** : `/expert-make` et `/expert-n8n`. Le
  plan est fixe : `tete-de-page` avec son bouton, ses preuves et sa date de
  mise à jour (prop `misAJour`, requise) ; quatre
  raisons en blocs de texte sur deux colonnes ; les usages en liste et les cas
  en une phrase chacun, titre à gauche et contenu à droite ; `pourquoi-moi`,
  l'île de la page ; `questions` ; `fin-de-page`. Tout ce qui se rédige reste
  dans la page.
- **`layouts/PageReponse.astro`** : les pages qui répondent à une question
  (`/make-ou-n8n`, `/combien-coute-une-automatisation`, `/agent-ia-pour-pme`).
  La réponse tient dans le chapô, sous le titre, avant tout développement ; la
  ligne de preuves dit qui répond, la ligne de date quand (prop `publie`, qui
  date aussi le balisage). Le corps est une suite de `partie`, dont une
  seule en île ; puis `questions` (« Questions courtes. ») et `fin-de-page`.

### Ce qu'une page intérieure n'écrit pas à la main

Un en-tête (c'est `tete-de-page`), une FAQ (`questions`), une section de
contact (`fin-de-page`), un lien de retour (`retour`), un lien vers l'agenda
(`BoutonReservation`). Trois pages gardent un premier écran à elles, parce
qu'il porte autre chose qu'un titre : `/automatisations-ia` (`HeroManifesto`),
`/sites-web-abonnement` (le titre face aux repères de prix) et les pages de cas
(la liste, dont l'en-tête et les rangées partagent une section ; un cas, avec
sa ligne de contexte et ses chiffres). Elles suivent les mêmes règles :
`h1` en `--text-display`, entrée par `.entree` ou par la cascade du manifeste,
un seul `mark` au plus.

### Où sont les îles

| Page | Île(s) |
|---|---|
| `/automatisations-ia` | la méthode (`Methode`) et les offres (`Offres`) |
| `/sites-web-abonnement` | les tarifs de création et les abonnements |
| `/expert-make`, `/expert-n8n` | `pourquoi-moi` |
| pages de lecture et page de reprise | une `partie clair` : le comparatif, le prix du suivi, la première tâche à confier |
| `/cas-clients/[slug]` | la pièce « Les résultats » |
| accueil | la carte « Pourquoi moi » |
| `/cas-clients`, `/principes`, mentions légales, 404 | aucune |

## L'accueil : ce qui lui est propre

Direction validée par Lilian le 2 octobre 2026, après le rejet de quatre pistes
dessinées et d'une première version jugée « IA slop ». Les références qu'il a
choisies lui-même sur un mur de vrais sites : Novu, Vimcal, Juan Mora, Qdrant.
Sa consigne tient en une ligne : « tech moderne, clean, privilégie les grilles ».
Le fond, la graisse des titres, le bas de casse et le bouton unique sont
devenus *La tenue commune* ; il reste ici ce que seule cette page porte.

**Le 8 octobre 2026, après relecture du site en ligne, Lilian a demandé deux
choses pour cette page : moins d'animations et moins de texte.** Plus rien n'y
joue en boucle de soi-même, à une exception près, la scène du récit (voir
*Components → Mouvement*). Les phrases du récit sont courtes, un bloc de métier
tient en quatre lignes, et aucun bloc ne mène à un cas client précis.

**Ce qu'il a refusé, et qui ne revient pas :** les listes séparées par des
filets, les grilles de cartes, un fragment accentué dans le titre de chaque
section comme seul geste, un hero décoratif sans rapport avec le métier. Une
section de l'accueil porte **un composant qui n'existe que là**, dont la forme
vient de ce qu'elle raconte.

### Le cadre

- **Deux lignes verticales de 1 px** courent de la fin du hero au pied de page
  (`.accueil__suite::before/::after`, dans `src/pages/index.astro`), à
  `--spacing-cadre` (16 à 32 px) à l'extérieur de la colonne de 1 200 px, en
  encre à 9 %. Elles appartiennent à la page, pas aux sections : une section
  qui redessine les siennes produit un escalier. Absentes sous 1024 px, où la
  marge ne les contient pas.
- **Les repères d'angle** (`.repere`, quatre équerres de 1 px) cadrent ce qui
  est une scène : la scène du récit, la scène de chaque métier, la vidéo.
  Jamais autour d'un texte.
- **Une offre n'a qu'un nom sur la page** : « Automatisation », « Agents IA »,
  « Dashboards et outils métiers », « Formations », dans cet ordre (donné par
  Lilian le 3 octobre 2026), dans les blocs des métiers et la ligne de prix.
  La barre et les onglets disent « Dashboards », faute de place. **Les sites
  web ont quitté la page d'accueil ce jour-là** : plus de bloc, plus de
  vitrine, plus de prix. Leur page d'offre reste en ligne et le pied de page y
  mène toujours.
- **On dit « dashboard », jamais « tableau de bord »** dans le texte visible :
  choix de Lilian le 2 octobre 2026, pour n'avoir qu'un mot. Les commentaires
  du code gardent le français.
- **Chaque offre qui a un prix l'affiche en « À partir de »** : 900 € HT sur
  les blocs Automatisation et Agents IA (c'est la même offre, au même prix
  d'entrée). Dashboards et outils métiers : « Sur devis ». Les formations n'en
  affichent pas : Lilian ne le veut pas.
- **Sur téléphone, les quatre métiers tiennent dans un seul bloc**
  (`home-services`, sous 720 px) : quatre onglets sous le titre, sur une
  ligne, en vrais onglets (le nom, un trait pêche sous celui qui est ouvert, un
  filet sous la rangée) ; un bloc à la fois ; au pied de chaque bloc,
  « Suivant : … ». Ils ne reprennent pas la piste à pastille des boutons de
  mode du récit, qui les précèdent d'un écran avec presque les mêmes noms :
  deux commandes voisines, deux dessins (demande de Lilian). Sur un petit
  téléphone la rangée défile. Des onglets et non un carrousel à glisser : les
  quatre noms restent visibles, rien n'est caché derrière un geste. Les liens
  de la barre et du menu ouvrent le bon onglet. Sans script, les blocs se
  suivent.
- **La barre de l'accueil nomme les quatre métiers**, et rien d'autre. Son menu
  mobile les liste en grand, puis mène à ce que la barre ne nomme pas
  (« Pourquoi moi », « Vidéos et newsletter », « Cas clients »).

### Le hero

Le titre centré, la barre d'écriture dessous, et le défilé des clients en bas.
Longtemps le titre seul, sans forme 3D (« pas nécessaire ») ; Lilian y a
ajouté la barre le 2 octobre 2026 (voir *La barre d'écriture*). Le titre est
une phrase, pas un slogan : « Salut, je m'appelle Lilian Sevoumian et je suis
expert en », puis la réponse, soulignée du trait pêche (`mark`) :
« Automatisations & Agents IA ». Elle était dans une pastille pêche jusqu'au
8 octobre 2026. À partir de 900 px elle tient sur une ligne ; en dessous elle
passe sur deux, et le trait la suit. Taille `--text-affiche`, bornée par la
hauteur (`11svh`) pour ne jamais pousser les logos hors de l'écran. Interligne
1,12 et approche −0,028em, réglés à la demande de Lilian (« titre trop
resserré ») : ce sont les valeurs les plus serrées de la page, aucun titre plus
petit ne l'est davantage. Le nom ne se coupe jamais entre le prénom et le nom
(espace insécable). L'entrée tient en une seconde et demie : les mots de la
phrase se posent un par un, puis le métier arrive, avant la fin de la première
seconde. C'est le seul titre du site qui entre mot à mot : il est l'entrée de
la page.

Au pied de la zone du titre, **une flèche ronde de 44 px** mène au récit : le
premier écran ne donnait aucun indice qu'il y a une suite. Une flèche, pas un
mot de plus : le titre reste seul. Elle est masquée sur un écran de moins de
820 px de haut (720 px avant le 8 octobre 2026 : la liste des logos, devenue
fixe, prend deux à trois lignes).

Derrière, une **grille de maille `--spacing-maille`**, traits à
10 % de blanc, comptée depuis le centre de l'écran. Elle s'allume en pêche
sous le pointeur (`--px`, `--py`), la case survolée s'éclaire et laisse une
traînée. Au chargement, deux secondes après l'arrivée du titre, dix cellules
s'allument l'une après l'autre **en un seul passage**, puis restent éteintes :
elles repassaient toutes les neuf secondes jusqu'au 8 octobre 2026. Rien
d'autre n'y bouge : des faisceaux de lumière la parcouraient, Lilian les a fait
retirer le 2 octobre 2026 (« il y a déjà assez d'animation avec les carrés qui
s'illuminent »). Tout élément décoratif se place en mailles (`--x`,
`--y`), jamais en pixels : c'est ce qui le garde aligné à toutes les largeurs.
Le premier écran ne porte plus aucune boucle : son entrée se joue au
chargement, puis il ne bouge que sous le pointeur.

### Le défilé des clients

Une seule ligne au bas du premier écran, précédée de « J'ai travaillé avec »,
qui défile en 46 s. Le bandeau va d'un bord à l'autre de l'écran mais son
contenu tient dans la colonne de 1 200 px, comme la barre : le titre est sur
le bord gauche de la colonne, l'icône de pause sur son bord droit. Elle s'arrête au survol et, pour le clavier et le doigt,
par un bouton de pause de 44 px au bout du bandeau (`aria-pressed`). La liste
vit dans `src/data/clients.ts`, les fichiers dans `public/logos/clients/`.
Les animations du hero (cellules, défilé) sont suspendues dès qu'il
sort de l'écran (`data-motion-pause`). C'est la seule boucle du premier écran : le 8 octobre
2026 la liste avait été posée, fixe, sur plusieurs lignes, et Lilian a préféré
le défilé le jour même (« c'était mieux quand ça déroulait »).

- **Tous les logos sont ramenés à une silhouette claire** : `filter:
  brightness(0) invert(1)`, opacité 0,78. Aucune couleur de marque dans le
  bandeau, c'est l'exception assumée à *la règle de la marque relevée* : autant
  de palettes côte à côte sous le titre feraient un deuxième sujet. Il faut donc un
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
  n'affiche qu'un exemplaire de chaque logo. Sous 640 px elle se resserre
  (`--text-body-sm`, 1rem entre deux logos, 0,625rem entre deux lignes) pour
  tenir en cinq lignes au lieu de sept.

### Quatre traits, pas un par titre

L'accueil est la seule page à souligner ailleurs que dans son `h1` et son titre
de fin : la réponse du hero, la première et la troisième phrase du récit, et le
titre de fin. Onze titres portaient un fragment accentué, trois dans un seul
écran de téléphone : c'était devenu « un titre surligné posé au-dessus de
chaque section », ce que Lilian a refusé, et l'accent unique n'y désignait plus
rien. Les titres de section sont nus. Le hero et les titres du récit montent
en taille (`--text-affiche`, `--text-story`), pas en graisse.

### Le récit (`home-story`)

Trois phrases courtes en vis-à-vis d'une scène unique, reprises avec Lilian
le 8 octobre 2026 : « Vous perdez du temps. Regardez où. », « Vos outils ne se
parlent pas. », « Ce qui se répète s'automatise. » La première était trop
longue, la deuxième parlait de copier-coller alors que la cause est ailleurs
(des outils qui ne sont pas synchronisés), la troisième n'était pas claire.
Sous chacune, une ou deux phrases de texte, pas plus.

- **Aucun client n'est nommé, aucun lien ne mène à un cas.** La scène rejoue un
  cas réel sans le nommer ; le texte ne dépend d'aucun client (« pas une
  phrase à reprendre le jour où le client change »). Le lien « Lire le cas »
  qui fermait la troisième phrase a disparu.
- **Les titres arrivent d'un bloc**, avec leur texte (le `.reveal` du site),
  puis le trait se tire sous le fragment souligné. Leurs mots arrivaient un
  par un, flous, comme ceux du premier écran : trois entrées de plus sur une
  page qui bougeait déjà trop. Le mot à mot reste au seul titre du premier
  écran.
- **Les coupes se règlent par des espaces insécables** : « du temps. » et
  « Regardez où. » restent chacun d'un bloc.

La scène est une vraie situation de travail, pas une illustration : un bon de commande en PDF à gauche, une
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
  « Ressaisies » sortent en Agent IA et Dashboard. « Ressaisies » reprend le
  mot du texte (« ressaisi dans l'autre », deuxième phrase) ; il disait
  « Gestes refaits ».
- **C'est la seule scène de la page qui continue de bouger**, et elle garde
  donc sa commande d'arrêt, une par vue, au dessin de celle des scènes de
  métiers (`.sm-pause`, coin bas droit du cadre). Le moteur n'a plus aucune
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

### Les scènes sur téléphone

Décidé avec Lilian le 3 octobre 2026, après son test sur iPhone :

- **Elles débordent dans les marges de la page** : 8 px de chaque côté de
  l'écran au lieu des 24 px de la colonne (récit et métiers). Dessinées à
  taille fixe puis mises à l'échelle, elles y gagnent 10 % à 402 px.
- **Le plan étroit du récit est plus haut que large** (340 × 420) : le bon de
  commande et la facture se suivent sans se recouvrir, la conversation et les
  piles du suivi ont plus de hauteur. Les boutons de mode restent juste
  dessous, calés sur la colonne du texte.
- **Aucun texte au pixel près dans sa case.** Une référence (« A-2041 »)
  tenait dans 44 px pour 44 px de texte sous Chrome ; sur iPhone, rendue un peu
  plus large, elle se coupait au trait d'union. Les valeurs d'une rangée ne
  passent jamais à la ligne (`white-space: nowrap`) et leurs cases gardent de
  la marge. Chrome ne suffit pas à valider un rendu iPhone.

### Les quatre métiers (`home-services`)

**Un bloc tient en quatre choses** : le nom du métier (`h3`), une phrase
(`--text-phrase`), une ligne de précision, la sortie avec son prix. Lilian a
jugé le bloc trop chargé le 8 octobre 2026 : il portait en plus un chiffre en
grand, le nom d'un client et un lien vers son cas. Ils sont sortis.

- **Aucun bloc de l'accueil ne mène à un cas client précis.** Un cas change,
  la page ne doit pas en dépendre. Le seul lien vers les cas est celui de leur
  index, sous les recommandations (`home-voices`). Les faits du parcours sont
  dans « Pourquoi moi », les cas dans leur page.
- **La ligne de précision est une phrase, pas un paragraphe** : « Commandes,
  factures, relances, rapports : je les automatise avec Make et n8n. » Les
  noms d'outils y sont des liens soulignés vers leur page.
- La sortie est un lien fléché vers la page d'offre, le prix à côté (« À
  partir de… », « Sur devis », rien pour les formations).

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
| Dashboards et outils métiers | un outil métier se monte bloc par bloc et passe en service, l'équipe s'en sert, le dashboard compte | un **écran clair** (l'outil) à côté d'un dashboard sombre ; sur téléphone, l'écran clair en haut sur toute la largeur et le dashboard en bande dessous |

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
  nom de client dans une scène. La scène Automatisation ne parle ni de facture
  ni de montant : ce sujet appartient à la scène du récit.
- **Un socle commun** : `scene-metier.css` (classes `.sm-…` : cadre, plan,
  fenêtre, feuille claire, rangées, fils, ports, nœuds, grains, bandes,
  pastilles) et `lib/metiers/scene.ts` (échelle du plan, pause hors écran et
  onglet masqué, mouvement réduit, tour joué une fois, aides d'animation). Une scène ne
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
- **Un dashboard ne se montre jamais à zéro** : celui de la scène Dashboards
  affiche ses « Dossiers » et son « Objectif » avec des nombres cohérents à
  chaque instant, jamais un zéro ni un tiret.
- **Une scène joue UNE fois, puis reste sur son image finale** (Lilian, le
  8 octobre 2026). Le tour part quand la scène entre à l'écran, dure 10 à
  14 s, un seul mouvement principal à la fois, et finit exactement sur l'image
  fixe : il ne range rien et ne recommence pas (`jouerTour`, dans `scene.ts`).
  Les scènes tournaient en boucle, sur trois exemples chacune ; il en reste un
  par scène. Une animation sans fin lancée pendant le tour est arrêtée avant
  qu'il rende la main. Tout le temps passe par le moteur (ni `setTimeout` ni
  `requestAnimationFrame` dans une scène), sinon la pause hors écran ne tient
  plus.
- **Le balisage est l'image finale.** Sans script et en mouvement réduit, on
  voit une scène fixe, complète et parlante : la même image que celle où le
  tour s'arrête.
- **La commande d'arrêt ne vit que le temps du tour** : un bouton de pause de
  28 px (cible de 44) dans le coin bas droit du cadre, posé par le moteur
  après la racine (qui est une image, `role="img"`). Visible au survol du
  cadre, au focus et une fois la scène arrêtée ; visible sans survol au doigt.
  Une scène qui joue plus de dix secondes à côté d'un texte doit pouvoir être
  arrêtée ; sur l'image fixe, à la fin du tour comme en mouvement réduit, il
  n'y a rien à arrêter et le bouton porte `hidden`.
- **Le moteur tient lui-même ses animations.** `getAnimations()` ne rend plus
  une animation suspendue sur sa dernière image ; s'y fier laissait une scène
  figée après un aller-retour hors écran.
- **Sur une colonne, la scène passe avant son texte** : posée après, elle se
  lisait comme l'illustration du métier suivant.
- Les mesures d'une scène sont des unités de plan, comme celles de la scène
  du récit : exceptions déclarées par fichier dans `.impeccable/config.json`.

### Pourquoi moi

Le seul panneau clair de la page, à gauche, reste en place pendant que la
frise défile à droite. C'est une carte dans sa colonne, et non une île : la
seule exception de forme à la règle 3 de *La tenue commune*. Les pages
d'outil reprennent la même question dans `pourquoi-moi`, en île.

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

### Les trois sites (`home-sites`) : hors accueil

La vitrine des trois sites (fenêtres de navigateur où la page défile par
crans) vivait sous le bloc « Sites web et dashboards ». Elle a quitté la page
d'accueil le 3 octobre 2026, avec les sites web. Le composant existe toujours
et se voit sur `/explorations-metiers/vitrine`.

### Ce que je publie (`home-content`)

Deux objets, pas deux cartes.

- **Le titre : « Ma dernière vidéo YouTube. »** (8 octobre 2026). Il disait
  « Je montre comment je fais. » : il dit maintenant ce qu'on regarde.
- **La vidéo** est cadrée comme une scène, avec les repères d'angle. Son titre
  est le vrai titre de la vidéo (`--text-title-lg`), et rien d'autre : la
  phrase de résumé qui le suivait a disparu. **C'est toujours la dernière de
  la chaîne** : la page écrit dans son HTML celle de `src/data/derniere-video.ts`
  (vignette copiée dans `public/videos/<id>.webp`), puis demande au serveur
  celle du flux (`/api/derniere-video`) et remplace le lien, le titre et la
  vignette si une plus récente est sortie, une fois la nouvelle vignette
  chargée pour que titre et image changent ensemble. Sans réponse, la page
  reste telle quelle. Sous la vidéo, un lien fléché mène à la chaîne : chaque
  activité a sa sortie, et celle-ci n'était liée que depuis le pied de page.
  Sous le mail, le même lien fléché mène à LinkedIn, le troisième endroit où
  il publie.
- **La newsletter est écrite comme le mail qu'on va recevoir** : une ligne
  « De », une ligne « Objet » (un exemple, inventé à la demande de Lilian, pas
  le titre d'un numéro paru), et la ligne « À » qui est le champ du
  formulaire. Pas de champ encadré dans une carte : le focus teinte la ligne
  entière. Des filets y séparent des lignes parce que c'est l'objet lui-même
  qui en a ; l'accueil n'en trace ailleurs que dans les questions, pour la
  même raison.

### Les voix (`home-voices`)

Trois recommandations, **une à la fois**, et les trois personnes à côté sur un
rail vertical. La première est celle qui dit ce pour quoi on vient
(« son expertise en automatisation »), pas la plus générale. **Rien n'avance
seul : on choisit une voix.** Jusqu'au 8 octobre 2026 le segment de la voix qui
parlait se remplissait de pêche en 7 s, puis la parole passait d'elle-même ; il
n'y a plus ni minuterie ni segment qui se remplit. Le segment de la voix
choisie est en pêche, les autres en encre à 12 %, et la citation change en un
fondu de 420 ms.

- **Le titre : « On a travaillé ensemble. »** (8 octobre 2026). Il remplace
  « Ils m'ont vu travailler. », lui-même choisi le 2 octobre à la place de
  « Ce qu'ils en disent. ».
- **La citation est un rang sous le titre** (`--text-phrase`, graisse 500).
  Elle prenait `--text-headline`, la taille exacte du titre, et se lisait
  comme sa suite.
- **Les cas clients ne passent pas au premier plan.** La critique du 2 octobre
  2026 proposait de remplacer les citations par les résultats chiffrés des
  cas, en grand. Lilian a refusé : « je ne veux pas que les cas soient trop
  voyants, car si le client n'est pas dans ces cas il pourrait ne pas se sentir
  concerné ». La règle vaut pour toute la page, et elle s'est durcie le
  8 octobre 2026 : aucun bloc ne cite un cas ni n'y mène. Le seul chemin vers
  les cas est le lien fléché de cette section, qui mène à leur index.
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
- Ce sont des recommandations, sans chiffre : le lien du bas (« Lire les cinq
  cas clients, avec leurs chiffres ») mène à l'index des cas, dont le nombre
  est lu dans la collection.
- `/automatisations-ia` garde `Testimonials.astro` : les mêmes citations, lues
  à la suite, la citation à gauche et qui la signe à droite.

### Les questions (`questions`)

Quatre questions, juste avant la fin : pour qui, combien, seul ou non, comment
se passe le premier échange. Le composant est celui de toutes les pages (voir
*Components → Questions*) ; ici il garde son titre par défaut, « Vos
questions. », et lit `data/home-faq.ts`, qui alimente aussi le `FAQPage` de la
page : une seule écriture par réponse. Rien n'y est affirmé qui ne soit dans
PRODUCT.md ou `/llms.txt`.

### La fin (`fin-de-page`)

La page se ferme comme elle s'ouvre : une phrase seule, centrée, sur la maille
du premier écran, cette fois immobile et effacée vers les bords. C'est le
composant de toutes les pages (voir *Components → La fin de page*), avec ce qui
est propre à l'accueil :

- **Le titre par défaut** : « Dites-moi ce qui vous fait perdre du temps. »,
  suivi de « Écrivez-moi. ». Il répond au titre qui ouvre le récit (« Vous
  perdez du temps. ») : la page se ferme sur la même idée, rendue cette fois
  au visiteur.
- **Les deux prix tiennent en une ligne** sous l'invite (prop `prix`), chacun
  lié à sa page d'offre : « Automatisation et agents IA, à partir de… » et
  « Dashboards et outils métiers, sur devis ». Sous 640 px, une offre par
  ligne. Les pages d'offre ne l'affichent pas : elles portent déjà leurs prix.
- L'ancre de la section reste `#offres` ; partout ailleurs c'est `#contact`.

**Un seul appel à l'action sur la page.** Tous les « Parlons de votre projet »
(barre de navigation, menu mobile, lien de « Pourquoi moi », bouton de fin)
ouvrent la conversation (`data-causerie-ouvrir`), décision de Lilian du
2 octobre 2026, devenue la règle de tout le site.

### La barre d'écriture (`home-invite`)

Née sur l'accueil, elle est depuis le 3 octobre 2026 la conversation de tout
le site : le nom du composant est resté.

Idée de Lilian (2 octobre 2026), pour ôter toute friction au premier contact :
une barre de prompt où le visiteur écrit son besoin en une phrase, et qui
ouvre une courte conversation. **Il n'y a aucun serveur derrière** : ni chat en
direct, ni IA, ni message stocké ailleurs que dans le navigateur du visiteur.
Il choisit son moyen et c'est lui qui envoie ; Lilian reçoit le message là où
il répond déjà.

- **La fenêtre ne fait pas semblant.** Sa première version affichait « je vous
  réponds moi-même », trois points de frappe, puis « Merci, c'est clair. »
  quel que soit le texte : un visiteur pouvait fermer en croyant avoir écrit à
  Lilian (critique du 2 octobre 2026). Donc : un sous-titre qui dit le
  mécanisme (« Vous choisissez comment l'envoyer »), et chaque réponse dit où
  en est le message (« pas encore parti », « il reste à l'envoyer »).
  **Les trois points de frappe sont revenus le 3 octobre 2026, à la demande de
  Lilian** : sans eux la réponse tombait d'un coup et la fenêtre semblait se
  rafraîchir. Ils précèdent chaque réponse, 0,9 à 1,5 s selon sa longueur,
  cachés aux lecteurs d'écran et absents en mouvement réduit. Ils donnent un
  rythme, ils ne changent pas ce qui est dit : le message n'est toujours pas
  parti tant que le visiteur n'a pas choisi son moyen. Sous la barre du hero, une ligne dit ce qu'elle fait : une
  barre de prompt sous « expert en agents IA » se lisait comme un robot.
- **Deux places, un seul élément.** Sous le titre du premier écran, puis, dès
  qu'on a défilé d'un tiers d'écran, en bas à droite : elle s'y envole, et
  revient sous le titre si on remonte tout en haut. Elle s'efface quand le
  champ de fin de page est visible : jamais deux champs à la fois. À
  l'inverse, conversation ouverte, c'est le champ de fin de page qui se met en
  retrait (inerte, à 35 %) ; le toucher mène au champ de la conversation.
  Constaté par Lilian sur son téléphone le 3 octobre 2026 : la fenêtre
  s'ouvrait juste sous ce champ resté actif, il y écrivait, et la conversation
  se refermait. Le hero n'est donc plus « le titre seul » : le titre, la barre,
  et les logos.
- **Au doigt, seul le visiteur referme la conversation** (chevron). Le repli
  automatique quand le focus quitte la fenêtre ne vaut qu'au clavier, sur un
  écran étroit, où le focus passerait derrière elle.
- **Dans le coin, elle reste en barre six secondes puis se range en
  pastille** : son portrait et « Écrire à Lilian » sur ordinateur, son
  portrait seul (56 px, un point pêche) sur téléphone. Restée en barre, elle
  recouvrait des titres, des prix et le bouton de la newsletter. Sur
  téléphone la pastille s'efface quand on descend la page et revient quand on
  remonte : elle rognait la fin des lignes. Tant qu'on y écrit, qu'elle a le
  focus ou que la conversation est ouverte, elle reste dépliée.
- **Elle n'écrit plus rien toute seule.** Jusqu'au 8 octobre 2026 des exemples
  s'y tapaient lettre à lettre, quatre en boucle sous le titre puis un dernier
  dans le coin. L'invite est fixe, « Écrivez-moi… » : celle que voyait déjà le
  mouvement réduit. Les trois points de la conversation restent : ils
  répondent à un geste du visiteur.
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
- **Sur l'accueil, elle est rendue juste après le hero**, pour venir au
  clavier là où on la voit (elle était 55ᵉ sur 57 arrêts, rendue après le pied
  de page). **Sur les autres pages, c'est `Layout` qui la rend** (prop
  `causerie`, vraie par défaut) : sans premier écran pour l'accueillir, elle
  vit dans le coin, et tous les boutons de la page l'ouvrent.
- **Pas d'outil de chat tiers** (Lilian ne veut pas payer Crisp), pas de bulle
  flottante générique : la fenêtre est dans la tenue de la page (nuit, filet,
  pêche, Geist), avec son portrait. Un vrai agent, branché sur une base de
  connaissances, est une suite possible ; la fenêtre est faite pour
  l'accueillir.
- Suivi : `causerie_opened` sur les boutons qui l'ouvrent et sur la barre
  elle-même (sources `barre_hero` et `barre_coin`, une fois par page),
  `lead_message`
  (prop `canal`) sur WhatsApp et l'e-mail, `lead_call` sur l'appel. Ils
  mesurent l'ouverture, pas l'envoi.

### Ce qui se refait à la main

`public/og-home.png` et la vignette du site dans les réalisations se refont à
chaque changement du hero. Les images de `public/formes/`, qui servaient de
repli aux sculptures de verre, ont été supprimées le 2 octobre 2026.

## Colors

Une nuit bleutée, des encres teintées vers elle plutôt que grises, une pêche
unique. Tous les contrastes ci-dessous sont recalculés (luminance relative
WCAG 2.x) sur les valeurs du bloc `@theme` de `src/styles/global.css`, contre
le fond général `#0c121f`.

### Primary

- **Pêche** (`peche`, alias `--color-accent`, `--color-accent-text`,
  `--color-focus`) : en aplat, le fond du bouton d'appel, et dans la
  conversation le message du visiteur ; en trait, sous un fragment de titre
  et sous les liens ; texte d'accent et anneau de focus **sur la nuit**.
  10,76:1 sur le fond général, 8,90:1 sur `surface-low`.
- **Pêche claire** (`peche-clair`) : survol du bouton. Le libellé nuit y gagne
  du contraste, 11,55:1 contre 10,19:1 au repos : sur un fond sombre un survol
  doit gagner de la lumière, pas en perdre.
- **Pêche éteinte** (`accent-soft`, 18 % de pêche dans la nuit) : survol des
  lignes et du bouton de fermeture du menu mobile. Blanc dessus : 12,05:1.

### Neutral

| Rôle | Usage | Contraste |
|---|---|---|
| `paper` / `night-deep` | Fond général, barre, menu mobile, agenda, pied de page | — |
| `night` | Texte posé sur la pêche, valeur fixe ; fond du bouton sur l'île | 10,19:1 sur la pêche |
| `surface-low` | Panneau arrondi relevé d'un cran : média, fenêtre du simulateur, repères de prix, relevé d'un cas | 1,21:1 contre le fond : un palier, pas un contraste |
| `surface-high` | Nœuds de schéma, fenêtres de maquette, flèches du carrousel | blanc dessus : 14,30:1 |
| `night-soft` | Survol du bouton sur l'île claire | blanc dessus : 12,58:1 |
| `ink` | Texte principal, titres | 18,72:1 |
| `ink-mid` | Corps secondaire, chapôs | 11,25:1 (9,32:1 sur `surface-low`) |
| `ink-low` | Légendes, notes, fil de retour | 8,18:1 |
| `ink-faint` | Traits, puces, pouce de barre de défilement, filet de la barre une fois la page défilée ; jamais du texte de lecture | 5,15:1 |
| `border-strong` | Contour d'un contrôle rond : flèches du carrousel, rang d'une étape | 5,88:1 |
| `divider` | Filet de pied de section, filets d'un tableau, 1 px, 9 % de blanc | 1,25:1 : un filet, pas un contour de composant |
| `service-border` | Filet posé sur une vignette de projet | 1,67:1 |
| `grid-line` / `grid-line-active` | Trames et fils des maquettes et schémas | décoratif |
| `error` | Message d'erreur, toujours porté par une phrase | 7,65:1 |

`--color-success` vaut le blanc : la pêche étant la couleur de marque, elle ne
peut pas signifier « valide ». Le succès passe en encre, porté par un libellé.
L'erreur garde un rouge éclairci pour le fond sombre ; il est voisin de la pêche
en teinte (1,41:1 entre les deux), donc jamais seul.

Deux surfaces ne sont pas des jetons mais des mélanges d'encre, écrits avec
`color-mix` : l'encre à 9 % (réponse de la conversation, pastille de survol
de la barre ; blanc dessus : 14,94:1) et les filets de cadre et de maille (encre à 9
ou 10 %).

Les jetons `--color-text-on-dark*`, `--color-divider-dark` et
`--color-surface-on-dark` portent les mêmes valeurs que les encres du fond
général. Ils servent aux éléments qui restent sombres quel que soit leur parent
(légende d'une vignette de projet, scènes 3D) et ne sont remappés par aucun
bloc. Les teintes `feuille*`, `lueur-froide` et `braise` n'existent que dans
les scènes de l'accueil.

### Le panneau clair (`.bloc-encre`)

Le seul endroit où le clair revient, sous une seule forme : l'île (règle 3 de
*La tenue commune*). La classe remappe les jetons de rôle, et les composants
suivent sans variante : une liste de prix, un tableau, une méthode se posent
dans l'île tels quels.

| Rôle remappé | Valeur | Contraste sur le panneau |
|---|---|---|
| `paper` → `panel` | `#f7f8fa` | 17,61:1 contre la nuit qui l'entoure |
| `ink`, `border-strong`, `accent-text`, `focus`, `success` | nuit `#111827` | 16,69:1 |
| `ink-mid` → `panel-ink-mid` | `#4b5565` | 7,09:1 |
| `ink-low` → `panel-ink-low` | `#5d6777` | 5,38:1 |
| `ink-faint` → `panel-ink-faint` | `#8b94a3` | 2,88:1 : trait uniquement |
| `divider`, `service-border` → `panel-divider` | `#dce1e8` | 1,24:1 : filet |
| `surface-low` → `panel-surface-low` | `#eef0f4` | — |
| `surface-high` → `panel-surface-high` | `#ffffff` | — |
| `accent-soft` → `panel-accent-soft` | `#ffe9dd` | nuit dessus : 15,16:1 |
| `error` → `panel-error` | `#b3261e` | 6,15:1 |

Un schéma ou une fenêtre de maquette posés dans l'île restent sombres : ils
lisent les jetons fixes, pas les rôles.

### Named Rules

**La règle du texte sur pêche.** Tout texte posé sur la pêche lit
`--color-night`, valeur fixe qu'aucun bloc ne remappe, jamais `--color-ink`.
`--color-ink` vaut le blanc sur la nuit, et le blanc sur la pêche tombe à
1,74:1. C'est vrai du libellé du bouton, du message du visiteur dans la
conversation, de la sélection de texte, et de tout contrôle rond dont le
survol pose la pêche derrière un glyphe : le glyphe change de couleur dans la
même transition que le fond. Un fragment souligné n'est pas concerné : le
trait passe sous lui, il garde l'encre du titre.

**La règle de la pastille.** La pastille pêche pleine est la forme du bouton
d'appel, et elle ne sert qu'à lui (Lilian, le 8 octobre 2026). Ce qu'on veut
faire ressortir dans un texte ne la reprend pas : un fragment de titre est
souligné, un résultat se lit à l'encre, un rôle à signaler passe en
`--color-accent-text`. Trois pastilles sont tombées ce jour-là : celle de
`mark`, celle des résultats du carrousel de cas, celle du rôle « contrôle »
d'une nomenclature.

**La règle du panneau clair.** Sur `.bloc-encre`, la pêche ne porte ni texte,
ni trait, ni focus : 1,64:1. Aucun `mark` ne se pose donc dans une île : son
trait y serait invisible. `--color-accent-text` et `--color-focus` y repassent
en nuit, le trait de `.lien-prose` aussi, et le bouton primaire y
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
**Label/Mono Font :** aucune. `--font-mono` existe encore parce que des
composants l'appellent, mais il vaut la police de texte.

**Caractère.** Une seule famille et une graisse moyenne : les titres sont en
500, c'est la taille qui fait la hiérarchie. Le 600 serré donnait l'affiche ;
le 500 donne l'interface. Corps en 400, sans approche ; libellés en 500, en bas
de casse, sans approche. Du texte clair sur fond sombre demande un peu d'air,
pas un serrage.

### Hierarchy

Douze rôles, chacun avec sa taille (mesurées à 402 et 1440 px) :

| Rôle | Jeton | 402 → 1440 | Graisse, interligne, approche |
|---|---|---|---|
| Affiche (`h1` de l'accueil) | `--text-affiche` | 34 → 72 | 500 · 1,12 · −0,028em |
| Manifeste (`h1` de `/automatisations-ia`) | `--text-display-hero` | 52 → 100 | 500 · 1,1 · −0,03em |
| Titre de page (`h1` des pages intérieures) | `--text-display` | 36 → 84 | 500 · 1,1 · −0,03em |
| Énoncé (titres du récit, titre de fin de page) | `--text-story` | 32 → 60 | 500 · 1,1 · −0,03em |
| Titre de section (`h2`) | `--text-headline` | 32 → 48 | 500 · 1,1 · −0,03em |
| Phrase (titre d'une `partie`, principe, phrase d'un métier, citation) | `--text-phrase` | 26 → 39 | 500 · 1,14 · −0,025em |
| Lien du menu mobile | `--text-menu` | 32 → 48 | 500 · 1,15 · −0,03em |
| Titre lg (prix d'une formule, titre d'un cas dans la liste) | `--text-title-lg` | 24 → 30 | 500 · 1,15 à 1,2 |
| Titre (`h3`, fait de « Pourquoi moi », nom d'un site) | `--text-title` | 20 → 24 | 500 · 1,2 · −0,02em |
| Chapô, texte d'une `partie`, usages ; l'intitulé d'une question, en 500 | `--text-body-large` | 17 → 20 | 400 · 1,35 à 1,65 |
| Corps | `--text-body` | 16 | 400 · 1,55 à 1,6 · 0 |
| Petit corps, et tout ce qui se clique | `--text-body-sm` | 14 | 400, 500 pour un contrôle |
| Libellé (`.mono-label`, `.mono-caption`, `.chip`) | `--text-mono-label` | 12 | 500 · 1,4 · 0 |

- **Tout ce qui se clique est à 14 px, en bas de casse, graisse 500** : le
  bouton, le lien fléché, les liens de la barre. Une action n'a qu'un seul
  traitement sur le site.
- **La phrase est un rang sous le titre qui l'annonce.** Elle prenait
  `--text-headline` : la phrase d'un métier et la citation avaient exactement
  la taille du `h2` de leur section, à toutes les largeurs.
- **Un titre plus petit n'est jamais plus serré qu'un plus grand.** Interligne
  et approche sont des jetons par rôle (`--leading-display`,
  `--tracking-display`, `--leading-phrase`, `--tracking-phrase`,
  `--leading-body`), pas des littéraux recopiés.
- **Le corps n'a pas d'approche négative** (`body` à 0) : héritée en longueur
  absolue, elle serrait davantage les petits corps que le texte courant.
- **Mesure : `46ch`**, soit environ 70 caractères : le `ch` de Geist (10,53 px à
  16 px) vaut une fois et demie un caractère moyen de prose française
  (6,87 px).
- **Le français se compose** : espace insécable avant `: ; ? !`, dans les
  unités (« 45 minutes », « 24 h/24 », « 60 % ») et avant « € HT ».
- **Les scènes de l'accueil ont leur propre échelle**, de quatre tailles (voir
  *L'accueil*). `--text-mono-caption` (11 px) ne sert plus qu'aux maquettes des
  pages de cas.

L'échelle est **fluide en haut, fixe en bas**, et la coupure est délibérée. Du
manifeste au chapô, chaque rang est un `clamp()`. À partir du corps les rangs
sont des valeurs fixes : à cette taille une courbe ne produirait qu'un pixel
d'écart entre les deux extrémités du viewport, et le corps ne doit pas
descendre sous 16 px, plancher sous lequel iOS zoome un champ de saisie.

Aucun rôle ne commute de jeton à un point de rupture. Le plancher de
`--text-display` est à 2,25rem : à 320 px, « l'automatisation » se coupait en
plein glyphe à 2,75rem. Le manifeste et le titre de fin de page sont en plus
bornés par la largeur (`min(…, 14,5vw)`, `min(…, 8,6vw)`) pour qu'un mot long
tienne à 320 px.

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
fluides (`--spacing-section-x`, de 24 à 120 px). Mobile d'abord. Une section
s'écrit toujours de la même façon : marges `section-x`, rythme vertical
`section-y`, contenu en `max-w-[1200px]`, filet `divider` à son pied.

**Une échelle d'espacement nommée par rôle**, dans `@theme`. Les écarts disent
qui va avec qui.

| Jeton | 402 → 1440 | Où |
|---|---|---|
| `--spacing-section-y` | 56 → 115 | au-dessus et au-dessous d'une section |
| `--spacing-bloc` | 40 → 80 | entre deux sous-blocs d'une section ; au-dessus et au-dessous d'une `partie` |
| `--spacing-gouttiere` | 32 → 72 | entre deux colonnes : la même partout |
| `--spacing-groupe` | 32 → 40 | d'un titre à son composant, d'un composant à sa sortie |
| `--spacing-lie` | 20 → 28 | d'un titre à son chapô, d'un texte à ce qui l'étaie |
| `--spacing-colle` | 8 | d'un nom à la phrase qu'il coiffe |

Sous 640 px, `section-y` tombe à 56 px et `bloc` à 40 px (ils vaudraient 80 et
48) : sur un téléphone l'écart entre deux sections ne doit pas coûter un demi-
écran. Hors rythme : `--spacing-cadre` (marge des filets de cadre de
l'accueil), `--spacing-maille` (la grille du premier écran de l'accueil et de
la fin de page), `--spacing-panneau` (marge intérieure d'un panneau),
`--spacing-barre` (hauteur de la barre : éléments collants, et
`scroll-padding-top` posé sur la racine pour toutes les ancres).

**Le titre à gauche, ce qu'il annonce à droite.** C'est la composition de base
d'une section intérieure à partir de 1024 px : une grille `1fr / 1,4fr`, écart
`gouttiere`, le titre collant sous la barre pendant qu'on lit la colonne de
droite (`partie`, `questions`, les sections de `PageExpertOutil`, `Methode`,
les pièces d'un cas). En dessous, le titre passe au-dessus.

**Des blocs de texte à plat.** Quatre raisons, quatre outils, trois formats :
un titre `h3` et un paragraphe, posés sur une grille de deux ou trois colonnes,
sans cadre, sans fond, sans filet. L'espace (`groupe` entre les rangées,
`gouttiere` entre les colonnes) fait le travail. Une liste est une liste : un
cas par rangée, une formule par ligne.

**Le rythme vient du filet et de l'île, pas d'un changement de fond.** Les
sections se suivent sur la nuit ; une île claire, deux au plus, marque le pic
de la page. Elle garde une marge de `clamp(0,5rem, 1,5vw, 1,25rem)`, un liseré
de nuit et non une gouttière, et son contenu reste aligné sur la colonne.

**Les seuils.** 1024 px est le seuil des deux colonnes titre/contenu, des
titres collants, du nom en toutes lettres dans la barre, des filets de cadre de
l'accueil et de `scrollbar-gutter: stable`. Les autres sont des empilements
locaux, écrits avec leur composant : 1200 px (texte d'un métier à côté de sa
scène), 900 px (liste de prix, offres, témoignages, scènes de travail), 768 px
(blocs sur deux colonnes), 720 px (tableau d'une
`partie` replié en blocs, onglets des métiers), 640 px (rythme de téléphone,
fin de page empilée). La barre ne suit pas un seuil en pixels mais une requête
de conteneur en em (voir *Components → Navigation*).

**Deux blocs qui se lisent ensemble partent de la même ligne** : le nom, la
phrase et le prix d'une formule (`subgrid`, même ligne de base), les prix d'une
liste (une colonne commune, pour qu'ils tombent les uns sous les autres), le
texte d'un métier et sa scène.

**Un composant ne dépasse jamais la hauteur de l'écran** : une scène empilée
borne sa largeur sur `100svh` moins la barre.

Les cibles tactiles font 44 px au moins ; la barre de navigation fait 64 px
(4rem : elle grandit avec le texte).

## Elevation & Depth

**Une surface de page n'a pas d'ombre.** `--shadow-card` et
`--shadow-card-hover` valent `0 0 0 0 transparent`. La profondeur vient de trois
choses : les filets d'un seul poids, 1 px ; un seul palier de surface,
`surface-low`, réservé aux panneaux arrondis ; et l'île claire. Le pied de page
n'est plus un palier : il est sur le même fond que la page, séparé par un
filet.

Les deux jetons d'ombre restent, et c'est vérifié : des déclarations hors de
`global.css` les lisent (`MockupWindow`, `WorkflowCanvas`, `CaseStudy`). Les
supprimer y rendrait `box-shadow: var(--shadow-card)` invalide à l'exécution,
sans erreur. « Pas d'élévation » est écrit comme une valeur plutôt que laissé
comme un blanc qu'on comblerait un jour au jugé.

**Ce qui flotte au-dessus de la page fait exception, et seulement cela.** La
fenêtre de conversation (`home-invite`), fixe dans le coin, porte une ombre
teintée `night-deep` et un liseré intérieur d'encre à 9 % ; les fenêtres des
scènes de l'accueil, qui sont des dessins d'interface, ont leurs ombres et
leur verre dépoli à elles. Ni l'un ni l'autre ne passe à une section, à un bloc
ou à un bouton. La barre de navigation est opaque : aucun flou dans le chrome.

### Named Rules

**La règle du filet.** Un filet fait 1 px. Deux niveaux : `divider` pour séparer
(9 % de blanc, 1,25:1, volontairement discret) et `border-strong` pour le
contour d'un contrôle qui doit tenir 3:1 (5,88:1). Sur une page tenue par une
grille, un filet plein devient du bruit.

**La règle du trait de lien.** Le soulignement d'un lien de prose
(`.lien-prose`) fait 2 px. Ce n'est pas un filet : un filet sépare ou encadre
une surface, celui-ci souligne des mots. Le pixel de plus le distingue d'un
filet de séparation par autre chose que la teinte, une information portée par
la seule couleur n'en étant pas une.

**La règle de la transition utile.** Aucune transition ni état de survol sur une
propriété qui ne change pas. Sept déclarations d'ombre sur des jetons
transparents ont vécu ainsi, recopiées de carte en carte parce qu'au code elles
ressemblaient à une intention.

## Shapes

**Plus d'angle vif.** Le rayon suit la taille de la surface, et ce qui se clique
est rond.

| Jeton | Valeur | Usage observé |
|---|---|---|
| `xs` | 6 px | Détail de maquette, piste du curseur, l'angle « queue » d'une bulle |
| `sm` | 10 px | Bouton de fermeture de l'agenda, nœud de schéma animé |
| `md` | 16 px | Bulle de la conversation, relevé d'un cas, cadre d'une scène |
| `diagram` | 16 px | Nœuds des schémas de cas |
| `lg` | 16 → 24 px, fluide | Média, vignette de projet, invite de fin de page, fenêtre de conversation, repères de prix |
| `xl` | 20 → 32 px, fluide | Île claire `.bloc-encre` |
| `cta` / `full` | 9999 px | Bouton, lien de la barre et sa pastille de survol, chip, pouce de curseur, portrait |

`lg` et `xl` sont fluides : 24 et 32 px sur un panneau de 343 px de large le
transformeraient en gélule.

**L'intérieur reste plus petit que l'extérieur.** Un nœud dans une fenêtre de
maquette prend `sm` parce que la fenêtre descend à 16 px sur mobile ; le champ
d'une invite prend `xs` parce que l'invite prend `lg`.

**On n'arrondit pas un trait.** Les filets de séparation à l'intérieur d'un
cadre arrondi restent droits. Le cadre rogne ses filets à l'arrondi.

**Le soulignement est un trait droit, sans rayon.** Son épaisseur est un
jeton, `--trait-souligne` (`max(2px, 0,075em)`) : elle suit la taille du titre
et ne descend pas sous 2 px. `--radius-bande`, le rayon de l'ancienne pastille
de `mark`, n'existe plus.

**Une bulle a une queue.** Dans la conversation (`home-invite`), le message du
visiteur arrondit trois angles en `md` et le quatrième, en bas à droite, en
`xs` ; la réponse fait de même en bas à gauche. Il n'y a de bulles que là :
les questions d'une page n'en sont plus.

**Le panneau clair est une île, pas une bande.** Bord à bord, il coupait la page
en trois à angle droit ; détaché et arrondi, il se lit comme un objet posé sur
la nuit.

### Named Rules

**La règle du rognage.** Une enveloppe qui porte une animation liée au
défilement rogne en `overflow: clip`, jamais en `overflow: hidden`. `hidden`
fait de l'enveloppe un conteneur de défilement : le `view()` de l'image se
résolvait contre elle et non contre la fenêtre, et l'image restait figée à la
fin de sa course. `clip` rogne sans créer de conteneur de défilement.
`overflow: hidden` reste valable partout ailleurs.

## Components

### Boutons

**Le bouton** est une gélule pêche à libellé nuit (10,19:1), 44 px de haut au
moins, padding `11px 22px`, libellé en bas de casse à 14 px, graisse 500, sans
approche. Il se distingue par son aplat de pêche, pas par des capitales. Il n'y
en a qu'un sur le site : « Parlons de votre projet », posé par
`BoutonReservation` (voir règle 8 de *La tenue commune*).

- **Survol et focus :** la pêche s'éclaircit (`peche-clair`), le bouton monte
  d'un pixel, la flèche avance de 3 px. Le libellé ne change pas de couleur.
- **Pressé :** `translateY(0) scale(0.98)`.
- **Désactivé :** opacité 0,55, curseur interdit.
- **Sur l'île claire :** fond nuit, libellé blanc, survol `night-soft`.
- **La sortie est plus lente que l'entrée :** 150 ms à l'aller, 200 ms au
  retour. Un survol dont l'aller et le retour durent autant se ressent comme
  une commutation.
- **Fondu croisé, jamais de balayage :** une bande qui traverse la largeur
  laisse le libellé à cheval sur deux fonds, illisible pendant tout le milieu
  du geste.
- **Mouvement réduit :** la transition de couleur reste, déplacement et échelle
  sautent.
- **Dans la barre**, le même bouton se resserre (`6px 10px`, puis `11px 18px` à
  partir de 1024 px) et perd sa flèche sous 480 px ; son libellé tient sur une
  ligne jusqu'à 320 px.

**Le lien secondaire fléché** (`.link-cta`, composant `LinkCTA`) est un libellé
blanc en bas de casse à 14 px, graisse 500, suivi d'une flèche Lucide. Au
survol et au focus, le même trait pêche que sous un titre se tire sous le
libellé, de gauche à droite (fond d'une ligne de 2 px, `background-size` de 0 à
100 % en 200 ms) ; le libellé garde sa couleur, et la flèche avance de 4 px en
prenant la couleur d'accent. Il déroulait une pastille pêche jusqu'au
8 octobre 2026. Réservé aux actions secondaires : une sortie vers une autre
page, une ancre, « Lire le détail ».

**Le lien de prose** (`.lien-prose`) est souligné de 2 px en pêche, encre au
survol. Il repasse en nuit sur l'île claire. Un nom qui mène à un récit (cas
d'une page d'outil, prix de la fin de l'accueil, liens de la 404) est souligné
d'un trait fin d'encre atténuée, qui passe à la pêche ou s'épaissit au survol :
un lien se signale par un trait, pas par sa seule teinte.

### Le soulignement (`mark`)

Un trait pêche tiré sous un fragment de titre, à l'encre du titre (`color:
inherit`). Décision de Lilian, le 8 octobre 2026 : la pastille pleine est la
forme du bouton d'appel, elle ne sert plus qu'à lui.

- **Le trait est un fond d'une ligne**, calé au pied du fragment
  (`linear-gradient` pêche, `no-repeat 0 100%`), d'épaisseur
  `--trait-souligne` et de largeur `calc(var(--draw) * 100%)`. Ce n'est pas un
  `text-decoration`, qui ne passe pas sous des enfants en bloc en ligne.
- **Le fragment reste un élément en ligne** : il passe à la ligne avec le
  titre et le trait le suit. La contrainte « un fragment tient sur une ligne
  à 320 px » a disparu avec la pastille ; un titre peut encore garder son
  fragment d'un bloc par des espaces insécables, par goût et non par
  nécessité.
- **Un seul par titre, et pas dans chaque titre.** Sur une page intérieure, il
  n'apparaît que dans le `h1` et dans le titre de fin de page ; l'accueil en
  compte quatre. Posé sur chaque titre de section, il ne désignait plus rien.
- **Jamais hors d'un titre, jamais dans une île claire** : la pêche n'y tient
  que 1,64:1. La colonne « Après » de la bascule d'un cas, qui portait un
  `mark` dans l'île des résultats, se lit maintenant à l'encre, en graisse
  500.
- La sélection de texte reste un aplat : pêche, texte nuit.

### Chips

Une étiquette : gélule à filet `divider`, texte `ink-mid` en bas de casse à
12 px, graisse 500, padding `4px 10px`. Survol : texte blanc, filet
`ink-faint`, fond `surface-low`. Elle nomme un outil dans la liste des cas, et
c'est son seul emploi : pas de variante d'accent, pas de variante pointillée.

### Blocs de texte et conteneurs

Il n'y a plus de carte bordée. Ce qui était une grille de cartes est devenu :

- **Un bloc de texte à plat** : un `h3` (`--text-title`), un paragraphe en
  `ink-mid` (`46ch`), sur deux ou trois colonnes, sans cadre ni filet (raisons
  d'une page d'outil, outils de `Stack`, formats d'`Offres`).
- **Une liste de prix** (`SubscriptionGrid`, nom hérité) : une formule par
  ligne, son nom à gauche, ce qu'elle est et ce qu'elle comprend au milieu, le
  prix à droite. Ni cadre, ni fond, ni filet. À partir de 900 px les trois
  colonnes sont communes à toute la liste (`subgrid`) : les prix tombent les
  uns sous les autres, sur la même ligne de base que le nom. Le montant est en
  `--text-title-lg`, chiffres tabulaires, insécable ; ce qui est compris se lit
  en une ligne, les termes séparés par un point médian. Sur téléphone, le prix
  vient juste sous le nom. Elle ne lit que des jetons de rôle, et se pose donc
  telle quelle dans une île. Aucun bouton par formule.
- **Une liste de cas** (`/cas-clients`) : un cas par rangée, ce qu'il est à
  gauche, ses chiffres à droite, ses outils en chips au pied. Le lien est le
  titre et s'étend à toute la rangée. Rien ne l'encadre.
- **Un tableau** (dans une `partie`) : des données, donc des filets fins entre
  les rangées et rien autour ; il se replie en blocs sous 720 px.
- **Un panneau relevé** : quand un objet doit se lire comme un seul bloc (la
  fenêtre du simulateur, les repères de prix d'un en-tête, le relevé d'étapes
  d'un cas), il prend `surface-low` et un rayon `md` ou `lg`. C'est la seule
  surface qui monte, et jamais sur toute la largeur.
- **Un média** : rayon `lg`, fond `surface-low`, enveloppe `.media-ouvre` quand
  il s'ouvre au défilement.

### Champs

Un champ est dans un cadre qui porte le focus à sa place : l'invite de la fin
de page et la barre de conversation (voir *La fin de page*), la ligne « À » du
mail de la newsletter sur l'accueil. Le texte fait 16 px : en dessous iOS
zoome. Une erreur est en `error`, portée par une phrase dans un statut
`aria-live`.

Le curseur du simulateur (`.roi-slider`) a une zone tactile de 28 px, une piste
visible de 4 px en encre, un remplissage pêche de 10 px, un pouce rond pêche à
contour d'encre de 2 px qui grossit à 1,15 au survol et au focus.

### Focus

Anneau `2px solid var(--color-focus)`, décalage 2 px, en `outline`. Pêche sur
la nuit (10,76:1), nuit sur l'île claire (16,69:1). Il n'est posé que sur un
appareil disposant d'un pointeur fin ou d'un survol (`any-hover: hover` ou
`any-pointer: fine`) : sur tactile pur, iOS dessine un cadre disgracieux au tap
et sur tout `.focus()` programmatique. Les champs de saisie gardent leur anneau
même sur tactile. En couleurs forcées : `CanvasText`.

### Navigation

La même barre sur toutes les pages. Fixe, 64 px (4rem, `--spacing-barre` : elle
grandit avec le texte quand le visiteur l'agrandit), fond plein `paper`, filet
bas `divider` qui passe à `ink-faint` une fois la page défilée, sans ombre ni
flou.

- **Le nom** : « Lilian Sevoumian », en bas de casse, 16 px, graisse 600,
  approche −0,02em, à partir de 1024 px. En dessous, le même emplacement tombe
  à 28 px et porte un « L » tant qu'un hero est à l'écran, puis le visage en
  fondu croisé. Sur les pages sans hero, l'état est posé au rendu, pour ne pas
  faire clignoter un « L ».
- **Les liens** : 14 px, graisse 500, `ink-mid`, blancs au survol, cible de
  44 px. Une pastille (encre à 9 %, liseré intérieur à 13 %, 36 px de haut)
  glisse d'un lien à l'autre sous le pointeur : une seule forme qui se déplace,
  pas un fond par lien. Le lien de la section en cours passe en 600 et garde un
  point pêche de 4 px dessous.
- **La liste change, pas la barre** : l'accueil nomme ses quatre métiers, une
  page d'offre ses ancres, les autres pages les liens du site (les deux offres,
  les cas clients, la méthode, le parcours).
- **Un seul bouton**, le même au bureau et sur téléphone : au centre de la
  barre sur téléphone, à droite au bureau.

**Le menu mobile** est un dialogue natif plein écran sur fond nuit : en-tête et
pied fixes, seule la liste défile, dans la hauteur dynamique du viewport et
avec les zones de sécurité du téléphone. Même composition partout : une liste
en grand, en haut (`--text-menu`, 32 à 48 px, graisse 500 : les quatre métiers
sur l'accueil, les deux offres ailleurs), une suite plus discrète en bas
(`--text-body-large`, `ink-mid`), puis le bouton, sous le pouce. L'écran est
tenu par ses deux bouts et l'espace qui reste est entre les deux groupes
(`align-content: space-between`). Deux essais avant : la liste collée en haut
laissait un grand vide dessous ; calée en bas, elle laissait le même au-dessus
(capture d'iPhone de Lilian, le 8 octobre 2026). C'était la taille des liens
qui ne tenait pas l'écran, pas leur place. Pas de filet entre les liens : c'est
la taille qui les sépare. Survol en `accent-soft`. Passer au format bureau
ferme le menu.

**Texte agrandi : la barre passe au menu.** Ses liens demandent environ 56em de
large ; une requête de conteneur en em (`barre-nav`, dans `global.css`) masque
les liens et montre le bouton du menu dès que la place manque, y compris
au-dessus de 1024 px quand le texte est agrandi.

### Questions (`questions`)

Une seule façon de poser une question sur le site : **une FAQ classique**. La
liste des questions, une ligne chacune, et la réponse qui s'ouvre dessous.
Lilian a écarté le 8 octobre 2026 la présentation en bulles de conversation
(« j'aime pas du tout ce layout, restons sur une FAQ classique »). Titre par
défaut : « Vos questions. ».

- **Un accordéon sans script** : des `details` qui portent le même `name`
  (`questions-<id>`), en ouvrir une referme la précédente. **La première est
  ouverte à l'arrivée**, pour que la section ne soit pas une liste de titres.
  Toutes les réponses sont dans le HTML, ouvertes ou non : un moteur les lit
  dans tous les cas.
- **La ligne entière se clique** : la question à gauche (`h3`,
  `--text-body-large`, graisse 500, interligne 1,35), un « plus » à droite
  (0,875rem, traits de 1,5 px, `ink-low`) dont le trait vertical se couche en
  260 ms pour faire un « moins ». Cible de 44 px au moins, `1,25rem` au-dessus
  et au-dessous.
- **La réponse** : texte courant en `ink-mid`, en retrait à droite de la
  largeur du signe (`2,375rem`). Elle ne s'anime pas.
- **Des filets, pas des cadres** : un filet `divider` au-dessus de chaque
  question et un au pied de la liste, sur `44rem` au plus. C'est une liste de
  données qu'on déplie, l'un des cas où un filet entre des lignes est l'objet
  lui-même.
- Le titre reste en place à gauche pendant que la liste défile (grille
  `1fr / 1,4fr` à partir de 1024 px). La même présentation à toutes les
  largeurs : plus de version « tout ouvert » sur grand écran.
- Une réponse peut porter un `.lien-prose` (champ `html`) ; le balisage
  `FAQPage` est posé par la page à partir de la même liste, en texte brut.
  L'objectif `faq_opened` compte le geste d'ouvrir une question fermée.

### La fin de page (`fin-de-page`)

Toutes les pages se ferment de la même façon, sauf les mentions légales et la
404. Une section d'un écran au plus (`min(46rem, 88svh)`, `min(40rem, 70svh)`
sous 1024 px), sans filet, sur une maille (`--spacing-maille`, traits d'encre à
10 %) comptée depuis le centre, immobile, effacée vers les bords par un masque
radial.

- **Un titre** en `--text-story`, centré, avec son fragment souligné ; chaque
  page écrit le sien, en question courte (« Un cas précis en tête ? », « Que
  voulez-vous créer ? »). **Une phrase** dessous, en `--text-body-large` : par
  défaut « Écrivez-moi. ».
- **L'invite** : un champ et le bouton dans un même cadre, comme une barre de
  prompt (rayon `lg`, filet d'encre à 18 %, fond nuit relevé d'encre). Le focus
  se lit sur le cadre entier : filet pêche et halo de 3 px. Le champ grandit
  avec ce qu'on y écrit ; Entrée envoie. Ce qu'on y écrit devient le premier
  message de la conversation ; vide, le bouton ouvre la même conversation. Sous
  640 px, le champ au-dessus, le bouton dessous, pleine largeur.
- **Une ligne collée à l'invite** dit la suite : le visiteur choisit comment
  envoyer, WhatsApp, e-mail ou un appel de 45 minutes en visio, sans
  engagement. La durée vient de `DUREE_RESERVATION_MINUTES`.
- Conversation ouverte, l'invite se met en retrait (inerte, à 35 %) : jamais
  deux champs où écrire à l'écran.

La conversation elle-même est décrite dans *L'accueil → La barre d'écriture* :
c'est le même composant sur toutes les pages.

### Pied de page

Sur le fond général, séparé par un filet `divider`. Texte `ink-mid` (11,25:1),
titres de colonne en bas de casse `ink-low` (8,18:1), à 12 px. La colonne des
deux structures de Lilian s'intitule « Mes activités » (« Ailleurs » avant le
8 octobre 2026). Les trois canaux
prennent la couleur de leur plateforme au survol et au focus. Le bouton n'y
figure que sur la page légale (`showContact`), seule page sans fin de page.
Quand la barre d'écriture est rendue, le pied garde 5,5rem sous ses derniers
liens pour qu'ils ne restent pas dessous.

### Mouvement

**Trois gestes d'auteur, et pas un de plus.** Ils sont joués une fois, écrits en
CSS, et aucun ne conditionne l'affichage : sans script, sans support ou en
mouvement réduit, l'élément est simplement là.

1. **Le soulignement qui se tire.** Une propriété enregistrée, `@property
   --draw` (de 0 à 1), règle la largeur du trait : il ne s'allume pas, il est
   tiré de gauche à droite, comme on souligne. Le texte, lui, est là dès le
   départ et ne change pas de couleur. 700 ms (`--duration-trace`),
   `ease-out-expo`, 140 ms après l'apparition du bloc qui le porte, 420 ms
   dans un en-tête (`@keyframes mark-trace`). Armé uniquement sous
   `.js-ready`.
2. **L'entrée d'un en-tête** (`.entree`). Chaque enfant direct monte de 18 px,
   se dévoile et fait le point (flou de 6 px), l'un après l'autre : 900 ms
   (`--duration-entree`), 110 ms entre deux, cinq crans puis un plafond.
   `backwards` et non `both` : aucun filtre ne reste sur le titre. C'est
   l'entrée de `tete-de-page`, des pages de cas, de la page des sites et de la
   404. Le manifeste de `/automatisations-ia` garde son `h1` peint dès la
   première image et fait entrer la suite en cascade (`data-hero-stagger`).
3. **Les médias qui s'ouvrent au défilement** (`.media-ouvre`). Le média entre
   rogné (`inset(9% 5%)`) et grossi (`scale(1.12)`), puis s'ouvre à mesure
   qu'il monte dans la fenêtre : `animation-timeline: view()`, de `entry 5%` à
   `cover 38%` pour le cadre et `cover 45%` pour l'image. Au pire de sa course
   il reste visible à plus de 80 %.

**L'accompagnement de lecture**, qui n'est pas un geste d'auteur :

- **Révélations.** Un bloc isolé (`.reveal`) se contente d'un fondu de 380 ms,
  sans déplacement. Les éléments d'une liste (`.reveal-stagger`) montent de
  12 px en 700 ms avec 80 ms de décalage. Le voile n'est armé que sous
  `.js-ready`, et un garde-fou lève tout à 2,5 s.
- **La pastille de la barre** glisse d'un lien à l'autre en 420 ms
  (`ease-out-expo`).
- **Le signe d'une question** passe du « plus » au « moins » en 260 ms ; la
  réponse s'ouvre sans animation.
- **L'ouverture du menu mobile en cascade.** Le voile se fond en 260 ms, puis
  les liens montent de 14 px l'un après l'autre (560 ms, 50 ms de pas, 70 ms de
  retard). Seule l'ouverture est animée : on ne fait pas attendre quelqu'un qui
  s'en va.
- **Les transitions de page** (`@view-transition { navigation: auto }`).
  L'ancienne page se fond en 160 ms, la nouvelle entre en 420 ms avec 10 px de
  montée. La barre de navigation porte son propre nom de transition et ne
  clignote pas. Chaque page reste un chargement complet.

**Le retour d'interaction** est court : 150 ms (`--duration-quick`) et 200 ms
(`--duration-default`). Trois courbes, toutes en *ease-out*, toutes dans
`@theme` : `--ease-out-quint` par défaut, `--ease-out-expo` pour les entrées
longues, `--ease-out-quart` pour les teintes de marque au survol. Les deux
défauts de transition de Tailwind pointent sur ces jetons ; l'ancien défaut
était un ease-in-out.

**Mouvement réduit.** Toutes les animations et transitions tombent à 0,01 ms,
les révélations sont forcées visibles, le trait d'un titre est posé tiré, les
transitions de page sont coupées. La couleur continue de répondre : c'est un
retour d'information, pas du mouvement.

**Sur l'accueil, une animation joue une fois, puis se tait.** Demande de
Lilian, le 8 octobre 2026 : réduire les animations de la page. Ce qui tournait
en boucle sans action du visiteur a été arrêté, dispositif par dispositif :

| Dispositif | Avant | Depuis le 8 octobre 2026 |
|---|---|---|
| Cellules de la grille du premier écran | un passage toutes les neuf secondes | un seul passage, deux secondes après le chargement |
| Barre d'écriture | des exemples qui se tapaient seuls | une invite fixe, « Écrivez-moi… » |
| Titres du récit | les mots un par un | le titre d'un bloc, puis son trait |
| Scènes des métiers | une boucle de 10 à 14 s | un tour, puis l'image finale |
| Recommandations | la parole passait seule toutes les 7 s | on choisit une voix |

Deux boucles restent, par choix : le défilé des logos du premier écran (Lilian
l'a redemandé le jour même) et la scène du récit. Chacune a sa commande
d'arrêt et s'endort hors de l'écran.

**La scène du récit est la seule qui continue de bouger.** Sur ordinateur le
défilement choisit ce qu'elle montre ; le mode en cours s'y joue tant qu'il
est à l'écran. Sous 1024 px, sa seconde vue enchaîne encore seule les trois
réponses. Elle garde donc sa commande d'arrêt, et s'endort hors écran. Ce qui
répond à un geste du visiteur (l'éclairage de la grille sous le pointeur, les
trois points de la conversation, un survol) n'est pas concerné.

**Ce qui boucle encore ne tourne que si on le regarde.** Les conteneurs
marqués `data-motion-pause` (la scène du récit, le bandeau d'outils
`LogoMarquee` de `/automatisations-ia`) reçoivent `data-motion-idle` hors
écran, qui met leurs animations en pause : mesuré, cinquante-deux animations
infinies tournaient pour des maquettes situées six mille pixels plus bas. Le
premier écran de l'accueil ne porte plus cet attribut : il n'a plus de boucle
à suspendre.

**Une animation liée au défilement ne porte que des propriétés compositables**,
`transform`, `opacity`, et `clip-path` pour l'ouverture des médias.

Un jeton déclaré pour être adopté plus tard vit dans un bloc `@theme static` :
Tailwind v4 n'émet pas un jeton que rien ne référence.

### Pages d'offre et pages de cas

**`/automatisations-ia`** ouvre sur `HeroManifesto` : typographie seule, sur la
nuit, sans portrait. Le `h1` en `--text-display-hero`, un chapô, le bouton et
un lien fléché, puis une phrase qui dit ce que le bouton ouvre. Une trame de
96 px (`--spacing-grid-cell`, encre à 5 %) entre par la droite et se dissipe
avant le titre ; elle n'existe pas sous 1024 px. Suivent le bandeau d'outils,
les besoins, le carrousel de cas, la méthode (île), les recommandations, « à
propos », les outils, les offres (île), les questions, le simulateur, la fin.
Le simulateur précède la fin : il fait compter les heures perdues, elle demande
lesquelles. Dans le carrousel (`CaseStudy`), les résultats d'un cas se lisent
à la suite, à l'encre, séparés par un point médian en `ink-low` : chacun était
dans une pastille pêche jusqu'au 8 octobre 2026.

**`/sites-web-abonnement`** ouvre sur son titre face aux repères de prix : un
panneau `surface-low` arrondi en `lg`, seule surface du premier écran. Les
tarifs de création puis les abonnements sont deux îles, séparées par la partie
des applications métier ; chacune porte une liste de prix. Tarifs et inclusions
viennent de `src/data/maintenance.ts`.

**Les pages de cas** (`/cas-clients/[slug]`) ouvrent sur le fil de retour, le
titre, une ligne de contexte (secteur, sujets, date de publication) et les
chiffres du cas, un par colonne, sans cadre. Le corps markdown est découpé en
pièces, une par `h2`, toutes sur la nuit et séparées par un filet, titre à
gauche et texte à droite. **Seule la pièce « Les résultats » est une île** :
c'est le pic de la page, et les filets s'effacent autour d'elle. Trois
dispositifs sont pilotés par le frontmatter, chacun avec un seuil : `flow`
exige exactement trois actions, `bascule` au moins trois lignes,
`nomenclature` au moins six. Dans la bascule, la colonne « Après » se lit à
l'encre, en graisse 500, sans surlignage ; dans la nomenclature, le rôle
« contrôle » est le seul mot en pêche (`--color-accent-text`, graisse 600 ;
nuit dans une île), et non plus une pastille. **Un cas qui n'a pas la matière
n'a pas le visuel.** Un cas d'application métier peut documenter un premier lot sans KPI,
capture ni témoignage ; la date affichée est une date de publication. Deux
« autres cas » ferment la page avant la fin commune.

**`/principes`** : une phrase qui se dit en grand (`--text-phrase`), puis ce
qui la précise, à gauche et à droite à partir de 1024 px. L'espace sépare les
principes ; il n'y a ni cadre, ni filet, ni numéro.

**La 404** n'a pas l'air d'une erreur : un titre, une phrase, le bouton et un
lien fléché, puis quatre liens soulignés vers les routes qui couvrent à peu
près toutes les intentions.

### Marques tierces et preuves

**Le logo dans le fil du texte** (`Outil.astro`) prend la couleur du texte,
jamais celle de la marque. Le couple logo + nom est en `nowrap`. L'alignement
est optique et se corrige par marque.

**Les maquettes produit** (`MockupWindow`, `WorkflowCanvas`) sont des
reconstitutions schématiques, sur les pages de cas. Les écrans clients sont
confidentiels : aucun visuel ne doit pouvoir passer pour une capture. Les
couleurs de marque tierces y sont posées au repos parce qu'on montre l'outil
réel, relevées de blanc quand elles sont sombres.

**Les vignettes de projets publics** (`ProjectVisual`, sur la page des sites)
montrent une vraie page publique : la capture en haut (16 / 9,4, calée en
haut), un pied plein dessous sur `night-deep` avec le nom du site
(`--text-title`, graisse 500) et ce qu'il est. La vignette entière est un lien
qui s'ouvre dans un nouvel onglet. Rayon `lg`, filet `service-border` posé
par-dessus l'image ; au survol et au focus le filet passe en pêche, la capture
avance (`scale(1.03)`, 350 ms à l'aller, 600 ms au retour) et la flèche part
vers l'extérieur. La légende n'est pas incrustée sur la capture : sur un voile,
le détail tombait sous 4,5:1 dès que la capture était claire. Une image absente
laisse un aplat, jamais une icône cassée. Ni fenêtre de navigateur ni appareil.

**La capture comme preuve.** Une capture n'est admissible que si la page est
publique, l'URL source conservée et le fichier traçable. Sa palette reste
enfermée dans l'image.

**Une couleur de marque au survol.** Dans le chrome du site, au repos, tout est
encre ; la marque tierce n'apparaît qu'au survol, et jamais sur pointeur
grossier : logos du bandeau d'outils (`LogoMarquee`), canaux du pied de page.
Une marque dont la teinte est un noir (Notion) reste à l'encre.

### Scènes de travail et schémas des cas clients

La page `/automatisations-ia` associe trois scènes photoréalistes à six
usages : dossiers et reporting, commandes et catalogue, prospection et demandes
entrantes. Images illustratives de personnes fictives générées par IA ;
provenance et prompts conservés dans `src/assets/work-scenes/README.md`. Photos
en 3:2, qui s'ouvrent au défilement, trois colonnes puis empilement sous
900 px.

Les visuels du carrousel utilisent `CaseIllustration.astro` : trois étapes
reliées, outils nommés et logos de marque disponibles ; les outils sans logo
utilisent une icône fonctionnelle. Les nœuds ont un rayon de 16 px
(`--radius-diagram`), un filet `ink-low` et un fond `surface-high`. Sous
380 px, le schéma passe à la verticale.

### Three.js : laboratoire et schémas intégrés

La route `/explorations-3d` réunit trois études manipulables. Elle reste
expérimentale, en `noindex` et hors sitemap. Les deux pages d'offre conservent
chacune une scène intégrée (le schéma des contrôles dans la méthode, le schéma
d'application sur la page des sites) ; l'accueil n'en porte aucune.

**La règle du mouvement fini sur les offres.** Une scène intégrée parcourt ses
deux états en 4,6 secondes puis s'arrête. Deux boutons affichent les
extrémités ; la lecture peut être suspendue, reprise ou rejouée. Avec mouvement
réduit, l'état final est statique. Ces scènes ne reçoivent pas l'enveloppe
`.media-ouvre` : elles ont déjà leur propre mouvement.

**La règle du schéma autonome.** Le titre, les légendes et le schéma statique
HTML/SVG portent le sens avant le chargement de la 3D et en cas d'échec. Les
textes projetés sont du HTML en Geist. Les commandes conservent les cibles de
44 px.

**L'accent des scènes est la pêche.** Libellés d'accent, état sélectionné et
focus des commandes lisent `--color-peche` ; le moteur lit le jeton au runtime.
Posée dans une île, la scène reste une fenêtre sombre. Les compositions et
seuils de chargement sont décrits dans `src/lib/site-scenes/README.md`.

## Do's and Don'ts

### Do:

- **Do** composer une page intérieure avec `tete-de-page`, `partie`,
  `questions`, `fin-de-page`, `pourquoi-moi` et `retour`, ou partir d'un des
  deux gabarits (`PageExpertOutil`, `PageReponse`).
- **Do** séparer deux sections par un filet `divider` d'un pixel, sur le même
  fond.
- **Do** réserver l'île claire à ce que le lecteur est venu vérifier : deux par
  page au plus, jamais deux de suite, jamais la première ni la dernière
  section.
- **Do** lire `--color-night` pour tout texte posé sur la pêche : libellé du
  bouton, message du visiteur dans la conversation, glyphe d'un contrôle rond
  dont le survol pose la pêche.
- **Do** réserver la pastille pêche pleine au bouton d'appel, et souligner un
  fragment de titre par `mark`.
- **Do** laisser les composants lire les jetons de rôle : ils suivent l'île
  claire sans variante.
- **Do** passer le bouton en nuit, et les traits et le focus en nuit, sur l'île
  claire.
- **Do** garder les titres en graisse 500 et faire monter la taille, pas le
  poids.
- **Do** garder un fragment souligné court : un à trois mots, la chute du
  titre.
- **Do** écrire une animation de l'accueil pour qu'elle joue une fois et
  finisse sur une image fixe, la même que sans script.
- **Do** écrire tout libellé en bas de casse dans la source.
- **Do** poser des blocs de texte à plat, séparés par l'espace, et aligner
  leurs colonnes sur l'échelle (`gouttiere`, `groupe`, `lie`, `colle`).
- **Do** passer par `BoutonReservation` pour tout bouton d'appel, avec sa
  `source` ; l'URL de l'agenda vient de `lib/reservation.ts`.
- **Do** relever de blanc une teinte de marque sombre avant de la poser sur la
  nuit, ou prendre la teinte que la plateforme publie pour les fonds sombres.
- **Do** vérifier chaque contraste par le calcul. Toutes les valeurs de ce
  document sont calculées.
- **Do** choisir le rayon selon la taille de la surface, et garder l'intérieur
  plus petit que l'extérieur.
- **Do** rogner en `overflow: clip` toute enveloppe qui porte une animation
  liée au défilement.
- **Do** écrire une entrée de sorte que la page soit peinte dans son état final
  sans script : `@keyframes` en `backwards`, voile armé sous `.js-ready`.
- **Do** laisser une absence quand la matière manque. Sur ce site, ce qui n'est
  pas montré est aussi une affirmation.
- **Do** montrer un projet public par une capture réelle, légendée et
  traçable ; cantonner sa palette à l'image.
- **Do** donner à chaque section de l'accueil un composant qui n'existe que là,
  dont la forme vient de ce qu'elle raconte.

### Don't:

- **Don't** écrire à la main, sur une page intérieure, un en-tête, une FAQ, une
  section de contact ou un lien de retour : ce sont `tete-de-page`,
  `questions`, `fin-de-page`, `retour`.
- **Don't** poser une bande de fond bord à bord, ni changer de fond pour
  rythmer la page. Une surface ne monte que pour un panneau arrondi dans la
  colonne.
- **Don't** étendre le panneau clair bord à bord, ni en faire une carte hors de
  l'accueil : c'est une île à marge, la section entière.
- **Don't** composer une section en grille de cartes bordées ou en liste à
  filets : c'est ce que Lilian a rejeté comme « IA slop ».
- **Don't** encadrer les questions ni les récrire en bulles de conversation :
  c'est une FAQ classique, des lignes séparées par un filet.
- **Don't** poser une pastille pêche derrière un mot, un résultat ou un rôle :
  elle est la forme du bouton d'appel.
- **Don't** souligner deux fragments dans un titre, ni poser un `mark` hors
  d'un titre ou dans une île claire.
- **Don't** ajouter à l'accueil une animation qui tourne en boucle sans action
  du visiteur : ni défilé, ni texte qui se tape seul, ni minuterie. La scène
  du récit est la seule à continuer, avec sa commande d'arrêt.
- **Don't** écrire un libellé en capitales, que ce soit par une classe ou tapé
  tel quel dans le texte, ni lui donner une approche positive.
- **Don't** poser un sur-titre au-dessus d'un titre, ni une numérotation de
  section `01 / 02 / 03`. Un numéro ne reste que là où l'ordre est
  l'information.
- **Don't** remonter un titre en graisse 600 par un utilitaire : la règle
  commune l'emporte, et le balisage mentirait.
- **Don't** ajouter un second libellé de bouton, ni un bouton qui ouvre
  l'agenda sans passer par la conversation (hors du moyen « Réserver un
  appel »).
- **Don't** écrire `color: var(--color-ink)` sur un fond pêche : c'est du blanc
  à 1,74:1.
- **Don't** poser la pêche en texte, en trait ou en anneau de focus sur l'île
  claire : 1,64:1.
- **Don't** déduire une couleur ou une forme d'un nom hérité. `.bloc-encre` est
  un panneau clair, `--color-paper` la nuit, `.mono-label` un libellé en bas
  de casse, `SubscriptionGrid` une liste.
- **Don't** lire un jeton de rôle dans le bloc qui le remappe : valeurs
  littérales uniquement, sinon cycle.
- **Don't** réintroduire un second accent, le lime, ou un fond général clair.
- **Don't** laisser un angle vif sur une surface, un média ou un contrôle ; ni
  arrondir un filet de séparation.
- **Don't** ajouter une ombre à une section, à un bloc ou à un bouton. Seul ce
  qui flotte au-dessus de la page en porte une.
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
- **Don't** mettre un cas client au premier plan de l'accueil, ni lier un de
  ses blocs à un cas précis ; ni y remettre une forme 3D, une scène collante
  sous 1024 px ou les prix en rangées.
- **Don't** présenter le vibe coding comme une troisième offre.
