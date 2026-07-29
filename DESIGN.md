---
name: Lilian Sevoumian
description: Freelance automatisation et IA. Papier blanc, encre noire, une seule couleur — un lime acide qui ne s'écrit jamais, qui prend des sections entières ou qui surligne un mot de travers.
colors:
  paper: "#ffffff"
  surface-low: "#f7f7f7"
  ink: "#111111"
  ink-soft: "#1f1f1f"
  ink-mid: "#595959"
  ink-low: "#6b6b6b"
  ink-faint: "#949494"
  divider: "#e5e5e5"
  border-strong: "#111111"
  lime: "#cdf564"
  lime-deep: "#b8e043"
  accent-soft: "#f2fbd8"
  focus: "#111111"
  error: "#b3261e"
  text-on-dark: "#ffffff"
  text-on-dark-mid: "#c9c9c9"
  surface-on-dark: "#1c1c1c"
typography:
  display-hero:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 6vw + 0.5rem, 5.75rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.25rem, 1vw + 0.875rem, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  caption:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  section-y: "clamp(5rem, 8vw, 8rem)"
  section-x: "clamp(1.5rem, 5vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
  chip-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  mark:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.02em 0.2em"
  bloc-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  bloc-encre:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.none}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: Lilian Sevoumian

## 1. Overview

**Le lime ne s'écrit pas. Il se pose.**

Le site vend une chose : des automatisations qui ne cassent pas. Il doit donc
tenir debout tout seul, sans ornement pour rattraper une hiérarchie molle. La
base est du papier blanc et de l'encre noire ; le contraste vient du poids
typographique, de la taille et de l'espace.

Par-dessus vit **une seule couleur**, un lime acide `#cdf564`. Elle ne peut pas
porter de texte — 1,25:1 contre le blanc — et c'est cette contrainte qui fait
tout le système : le lime est une **surface**. Il prend une section entière, ou
il passe derrière un mot comme un coup de surligneur de travers.

Trois choses ont été retirées en chemin, et l'absence est le geste : le
monospace, les sur-titres en petites capitales espacées, et les arrondis. Ce
sont, dans cet ordre, les trois marqueurs les plus universels du site généré.

## 2. Colors: Papier, encre, et un lime qui ne s'écrit jamais

La palette n'a **aucune chroma résiduelle** : les gris sont de vrais gris. Un
neutre teinté est une décision colorimétrique, discrète mais réelle, et le
système n'en a qu'une à faire.

| Rôle | Valeur | Usage |
|---|---|---|
| `paper` | `#ffffff` | Fond général |
| `surface-low` | `#f7f7f7` | Bande de section, une sur deux, pour le rythme vertical |
| `ink` | `#111111` | Texte principal, bordures fortes, aplat sombre |
| `ink-mid` | `#595959` | Corps de texte secondaire — 7,0:1 sur papier |
| `ink-low` | `#6b6b6b` | Légendes, libellés — 5,33:1 |
| `ink-faint` | `#949494` | Traits, puces creuses, jamais du texte lisible |
| `divider` | `#e5e5e5` | Filets, un seul poids : 1 px |
| `lime` | `#cdf564` | **Surface uniquement.** Aplats, bandes de surlignage, pastilles d'état |
| `accent-soft` | `#f2fbd8` | Fond de chip. Encre dessus : 17,59:1 |
| `focus` | `#111111` | Anneau de focus |

**Le lime ne porte jamais de texte.** 1,25:1 sur blanc. Un mot « en lime » est
illisible ; un mot **sur** du lime tient 15,14:1.

**L'anneau de focus est de l'encre, pas l'accent.** Un anneau lime serait
invisible sur papier. L'encre tient sur les deux surfaces : 18,88:1 sur blanc,
15,14:1 sur lime.

**Le succès n'est pas lime.** Le lime étant la couleur de marque, il ne peut pas
signifier « valide » : un état correct serait indiscernable d'un élément
d'identité. Les deux états passent en encre, portés par un libellé. L'erreur, en
revanche, garde un rouge `#b3261e` : il n'est pas de la même famille, il ne
concurrence rien, et il tient 5,24:1 sur lime.

**Deux surfaces inversent la palette.** `.bloc-lime` et `.bloc-encre` remappent
les jetons de rôle : tout composant réutilisable s'y adapte sans variante à
écrire. Piège vérifié deux fois : le remap ne doit lire que des **valeurs
fixes**. Écrire `background: var(--color-ink)` dans un bloc qui redéfinit
`--color-ink` produit un cycle, et la section devient blanche sur blanc.

## 3. Typography

**Une seule famille**, Geist Variable. `--font-mono` existe encore parce que onze
composants l'appellent, mais il vaut la police de texte : le monospace a disparu
de la DA.

L'échelle est **fluide**, en `clamp()`, du hero (`2,5rem → 5,75rem`) à la légende
(`0,6875rem` fixe). Les titres de section descendent à `-0,035em` de chasse ; le
plancher est `-0,04em`, en dessous les lettres se touchent.

Les défauts d'élément vivent dans `@layer base`. **Ce n'est pas cosmétique** :
hors couche, ils l'emportent sur tout ce que Tailwind émet dans
`@layer utilities`, quelle que soit la spécificité. Un `<h2>` demandant 30 px en
rendait 48, silencieusement.

Pas de césure automatique sur les titres. À 76 px un tiret se voit de loin, et
`hyphens: auto` coupait « freelance » en « free-lance ».

## 4. Elevation

**Il n'y en a pas.** `--shadow-card` et `--shadow-card-hover` valent
`0 0 0 0 transparent`. La structure vient des filets, d'un seul poids : 1 px.

**Deux rayons**, `0` et `9999px`. Tous les `--radius-*` valent zéro sauf
`--radius-full`. La règle se dit en une phrase : *si c'est rond, ça se clique*.
Une bande de surlignage arrondie devient un badge.

La profondeur, quand elle est nécessaire, vient du **changement de surface** :
papier, bande grise, aplat lime, aplat encre.

## 5. Components

**Le surlignage** est le dispositif signature. Une bande lime en pseudo-élément
posée **derrière** le texte, avec `z-index: -1` et `isolation: isolate`. C'est la
bande qui penche, pas le `<mark>` : faire tourner l'élément inclinerait les
lettres, or on veut un coup de surligneur de travers sur un texte droit.
L'inclinaison alterne via une classe `.inv` posée à la main — `:nth-of-type` ne
peut pas le faire, chaque `<mark>` étant seul dans son parent.

Contrainte dure : `white-space: nowrap`. Sur un fragment qui passe à la ligne, la
bande couvre le rectangle englobant et produit un aplat informe. **Le fragment
fait donc de 1 à 4 mots**, à toutes les tailles. C'est aux mots d'être courts,
pas à la bande de se déformer.

**Le bouton primaire** est noir au repos et passe au lime au survol. Sur un aplat
lime il passe au blanc : le survol doit toujours changer quelque chose.

**Les maquettes produit** (`MockupWindow` et les composants `Stack*`) sont des
reconstitutions schématiques. Les écrans clients sont confidentiels : aucun
visuel du site ne doit pouvoir passer pour une capture, et le châssis porte la
mention quand le doute est possible. C'est le seul endroit où les couleurs de
marque tierces sont autorisées — on y montre l'outil réel.

**Les pages de cas** découpent leur corps markdown en pièces, une par titre, sur
des surfaces alternées dont la dernière est l'encre. Trois dispositifs y sont
pilotés par le frontmatter, chacun avec un seuil : `flow` exige exactement trois
actions, `bascule` au moins trois lignes, `nomenclature` au moins six. **Un cas
qui n'a pas la matière n'a pas le visuel** — un gabarit qu'on peut remplir à
moitié invite à inventer pour l'équilibrer.

## 6. Do's and Don'ts

**À faire**

- Poser le lime comme surface : un aplat de section, une bande de surlignage, une
  pastille d'état.
- Vérifier chaque contraste par le calcul, jamais à l'œil. Toutes les valeurs de
  ce document sont calculées.
- Garder les fragments surlignés entre 1 et 4 mots, et alterner l'inclinaison.
- Faire porter le rythme par le changement de surface, pas par le vide.
- Laisser une absence quand la matière manque. Sur ce site, ce qui n'est pas
  montré est aussi une affirmation.

**À ne pas faire**

- Écrire du texte en lime. Jamais, nulle part, quelle que soit la taille.
- Poser un anneau de focus lime : il est invisible.
- Ajouter un arrondi. Deux valeurs existent, et l'une des deux veut dire
  « cliquable ».
- Ajouter une ombre. L'élévation vient des filets.
- Poser un sur-titre en petites capitales espacées au-dessus de chaque section,
  ni une numérotation `01 / 02 / 03` en écaille. C'est la grammaire du site
  généré, et elle a été retirée volontairement.
- Lire un jeton de rôle dans `.bloc-lime` ou `.bloc-encre` : le remap ne lit que
  des valeurs fixes, sinon il produit un cycle.
- Faire passer une reconstitution pour une capture d'écran.
