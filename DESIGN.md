---
name: Lilian Sevoumian
description: "Deux expertises : Automatisation & IA et Sites web. Papier blanc, encre noire, une seule couleur — un lime acide qui ne s'écrit jamais, qui prend des sections entières ou surligne un mot de travers."
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
  home-hero:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.25rem, 5vw + 0.25rem, 5.25rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  display-hero:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3.25rem, 6vw + 1.2rem, 6.25rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  home-service:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.25rem, 8.6cqi, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.05
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
    fontSize: "1rem"
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
    fontSize: "clamp(0.75rem, 3.1vw, 0.875rem)"
    textTransform: "uppercase"
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
  project-visual:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.none}"
---

# Design System: Lilian Sevoumian

## Overview

**Le lime ne s'écrit pas. Il se pose.**

Le site présente deux expertises de même poids : **Automatisation & IA** et
**Sites web**. La home oriente vers l'une ou l'autre ; elle ne les dilue pas
dans une offre généraliste. Le vibe coding est leur méthode de production
commune, jamais une troisième offre. Le site doit tenir debout tout seul, sans
ornement pour rattraper une hiérarchie molle. La base est du papier blanc et de
l'encre noire ; le contraste vient du poids typographique, de la taille et de
l'espace.

Par-dessus vit **une seule couleur**, un lime acide `#cdf564`. Elle ne peut pas
porter de texte — 1,25:1 contre le blanc — et c'est cette contrainte qui fait
tout le système : le lime est une **surface**. Il prend une section entière, ou
il passe derrière un mot comme un coup de surligneur de travers.

Trois choses ont été retirées en chemin, et l'absence est le geste : le
monospace, les sur-titres en petites capitales espacées, et les arrondis. Ce
sont, dans cet ordre, les trois marqueurs les plus universels du site généré.

**Caractéristiques clés :**

- Le lime est une surface, jamais une couleur de texte.
- Sur la home, Lilian apparaît avant les offres ; les deux expertises gardent
  ensuite le même poids dans leur routeur dédié.
- Le vibe coding relie les deux pratiques ; il ne devient jamais un troisième
  panneau de service.
- Les filets et les changements de surface portent la profondeur ; aucune ombre.
- Le rond désigne une unité ; le carré, une surface.
- Les artefacts publics peuvent garder leur palette dans une capture, jamais
  dans le chrome du site.

Ce paragraphe a longtemps décrit une intention plutôt qu'un état. Les sur-titres
étaient posés au-dessus de neuf sections de la home et de onze autres endroits,
et la numérotation `01 / 02 / 03` courait dans la navigation, les deux pages
outil, les principes, la FAQ et la pagination des cas — pendant que ce document
les déclarait retirés. Ils le sont maintenant, partout : la prop `label` de
`SectionHeader` est optionnelle et n'est plus passée nulle part, et les
informations que quelques-uns de ces sur-titres portaient réellement — le nombre
d'outils, le nombre de questions, la durée du diagnostic — sont descendues dans
le chapô, où elles se lisent dans une phrase.

**Ce qui n'est pas visé.** Les libellés fonctionnels en petites capitales
(`.mono-label`, `.mono-caption`) restent : un rôle sous un nom, une métrique de
pied de page, un statut dans une maquette, le libellé d'un curseur. Le motif
retiré est le sur-titre qui coiffe un titre en le répétant, pas la petite
capitale en soi.

## Colors

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

## Typography

**Une seule famille**, Geist Variable. `--font-mono` existe encore parce que onze
composants l'appellent, mais il vaut la police de texte : le monospace a disparu
de la DA.

L'échelle est **fluide en haut, fixe en bas**, et la coupure est délibérée. Du
hero (`3,25rem → 6,25rem`) au chapô, chaque rang est un `clamp()`. À partir du
corps les rangs sont des valeurs fixes : à cette taille une courbe ne produirait
qu'un pixel d'écart entre les deux extrémités du viewport, soit un jeton plus
difficile à lire pour aucun bénéfice visible.

**Le corps est passé de ce côté-là de la coupure.** Il portait
`clamp(0,9375rem, 0,25vw + 0,875rem, 1rem)`, c'est-à-dire exactement le cas que
l'argument ci-dessus condamne : mesuré, la courbe rendait 16 px partout au-dessus
de 800 px de large et ne descendait à 15 px que sous 400 px — un pixel de moins,
et il tombait précisément sur les écrans où le corps de texte doit être le plus
lisible. Il vaut `1rem`, plancher compris.

**Le bas de l'échelle a perdu un rang.** Elle comptait 11 / 12 / 13 / 14 / 16 px,
soit des rapports de 1,09, 1,08, 1,08 et 1,14 entre paliers voisins — deux ranges
séparés par un pixel ne peuvent rien hiérarchiser. Le rang de 13 px
(`--text-mono-body`) a disparu : ses six consommateurs étaient tous des maquettes
produit, dont deux appelaient *aussi* le rang de 14 px dans la même maquette. Le
jeton survit comme alias de `--text-body-sm`, sur le modèle de `--font-mono` qui
vaut la police de texte depuis que le monospace a quitté la DA.

Il reste un rapport de 1,09, entre les deux rangs de petites capitales (11 et
12 px), et il est le suivant sur la liste. Les résorber demande de fusionner
`.mono-caption` et `.mono-label`, qui ne diffèrent alors plus que par leur nom,
et de reprendre une quinzaine de fichiers — dont une trentaine d'étiquettes
serrées dans les maquettes.

**Une seule exception à « fixe en bas », et elle est mesurée.** Le libellé du
bouton primaire (`--text-button`) est un `clamp()` sous `0,875rem`. Il valait
`--text-mono-label`, soit 12 px : l'action la plus importante de la page portait
la taille exacte des liens secondaires et du deuxième plus petit rang du système,
et sa hiérarchie ne tenait plus que par l'aplat noir. Le monter à 14 px sec
faisait passer quatre des six boutons de la home de 44 à 65 px de haut à 320 px
de large, le libellé le plus long y réclamant 298 px dans une colonne de 261. La
courbe n'existe que pour tenir les largeurs étroites : 12 px sous 387 px, 14 px
au-dessus de 452, une seule pente monotone entre les deux.

La pente n'est pas calée sur la home mais sur le cas le plus serré du site, et
c'est ce qui l'a fait passer de 3,6vw à 3,1vw : le CTA de `/principes` vit dans
un encart lime à 32 px de padding, et sa colonne reste sous 300 px jusqu'à 480 px
de fenêtre. **Une courbe typographique se cale sur le conteneur le plus étroit
qui la porte, pas sur la page où on l'a écrite** — sans quoi elle règle une
section et en casse une autre, sur une page qu'on ne regardait pas.

Les titres de section descendent à `-0,035em` de chasse ; le plancher est
`-0,04em`, en dessous les lettres se touchent.

**La home incarnée possède son rang de titre.** Son `h1` est visible et consomme
`--text-home-hero`, une courbe unique de 52 à 84 px. Il fait face au portrait de
Lilian, sans devenir aussi monumental que les manifestes
des landings spécialisées. Plus bas, les deux titres du routeur consomment
`--text-home-service`, une courbe de 20 à 44 px calculée sur la largeur disponible
dans la carte. Le rang est partagé par **Automatisation & IA** et
**Landing pages et applications métiers**, avec deux lignes explicites par titre.
`--text-display-hero` reste le rang des landings spécialisées. Aucun de ces rôles
ne commute de jeton au point de rupture.

### La règle de couche, qui a déjà coûté deux bugs

**Toute valeur par défaut d'élément appartient à `@layer base`. Sans exception,
et quelle que soit la propriété.**

Hors couche, une règle l'emporte sur tout ce que Tailwind émet dans
`@layer utilities`, **quelle que soit la spécificité** : un sélecteur d'élément
nu bat une classe utilitaire. Le symptôme est toujours le même, une déclaration
écrite dans un composant qui ne s'applique pas, sans erreur ni avertissement.

Deux fois plutôt qu'une :

| Règle hors couche | Ce qui était demandé | Ce qui était rendu |
|---|---|---|
| `h1…h6 { font-size }` | `<h2>` à 30 px | 48 px |
| `p, li, blockquote { max-width: 72ch }` | `max-w-[43ch]`, 570 px | 955 px |

La seconde était la plus coûteuse : **aucune** contrainte de largeur écrite dans
un composant ne s'appliquait, et la colonne de texte du site mesurait 85
caractères de médiane au lieu des 65 à 75 lisibles. Une ligne déplacée dans
`@layer base` a ramené les 45 blocs de la home sous le seuil.

Pas de césure automatique sur les titres. À 96 px un tiret se voit de loin, et
`hyphens: auto` coupait « freelance » en « free-lance ».

## Elevation & Depth

**Il n'y en a pas.** `--shadow-card` et `--shadow-card-hover` valent
`0 0 0 0 transparent`. La structure vient des filets, d'un seul poids : 1 px.

Les deux jetons restent, et plus rien ne les peint. Sept déclarations le
faisaient encore dans `global.css` : trois transitions `box-shadow`, deux états
de survol dont c'était le seul contenu, et un bloc `prefers-reduced-motion` qui
coupait une animation sur un `.card-interactive::after` qui n'existe nulle part.
Une élévation qui ne rend rien coûte pourtant deux choses — une propriété que le
navigateur surveille à chaque transition, et surtout un survol vide qui se lit au
code comme une intention, si bien que la carte suivante le recopie. `.card-soft`,
qui ne déclarait que cela, a disparu en entier ; son nom traîne encore dans le
markup de deux composants, où il ne désigne plus rien.

Les jetons, eux, ne peuvent pas partir : six déclarations hors de ce fichier les
lisent, dont deux comme valeur de **repos** d'une `@keyframes` qui alterne avec un
halo de marque. Les supprimer y rendrait `box-shadow: var(--shadow-card)` invalide
à l'exécution, sans erreur ni avertissement. Et ils disent quelque chose : « pas
d'élévation » écrit comme une valeur plutôt que laissé comme un blanc qu'on
comblerait un jour au jugé.

**Un seul poids de filet, et une exception qui n'en est pas une.** Le
soulignement d'un lien de prose (`.lien-prose`) fait 2 px. Un filet sépare ou
encadre une surface ; celui-ci souligne des mots, et c'est le seul endroit où le
lime a le droit d'être un trait plutôt qu'une surface. L'argument facile serait
« le lime est trop clair pour tenir à 1 px » — il est faux, et calculé : le lime
rend 1,25:1 sur papier, `divider` en rend 1,26. Même contraste. Le vrai motif est
ailleurs : mesuré sur la home, ce lien fait 297 px de large et le filet de
séparation de la fiche qui l'entoure, 314 — deux traits de même longueur et de
même contraste, à douze pixels l'un de l'autre. À poids égal, seule la teinte
distinguerait « ceci se clique » de « ceci sépare », et une information portée
par la seule couleur n'en est pas une. Le soulignement au survol d'une question
de FAQ, du bloc contact ou de la 404 relève de la même décision, en
`text-decoration-thickness`.

**Corollaire, et il a coûté un lien invisible.** `.lime` lu en dur ne suit pas le
remap de `.bloc-lime`, qui ne redéfinit pas ce jeton. Le soulignement de
`.lien-prose` était donc du lime sur du lime — 1,00:1 — sur les deux pages outil,
où « Je le reprends » est le seul chemin vers la page des automatisations qui
cassent. Il n'apparaissait qu'au survol, c'est-à-dire jamais sur pointeur
grossier. Sur l'aplat lime, le trait passe au blanc, comme `mark` et
`.link-cta__label` le font déjà.

**Deux rayons**, `0` et `9999px`. Tous les `--radius-*` valent zéro sauf
`--radius-full`.

La règle se disait *si c'est rond, ça se clique*, et ce document déclarait dans
son propre frontmatter `chip-accent` en `{rounded.full}`. Recensé sur la home :
soixante-neuf éléments ronds, dont **soixante-trois ne se cliquent pas** — vingt-
cinq pastilles d'état dans les maquettes produit, quinze pastilles de châssis de
fenêtre, dix chips de rôle, trois portraits. La règle décrivait six éléments sur
soixante-neuf. Elle n'a jamais gouverné le site, et elle interdisait par écrit ce
que la section 2 de ce document autorise par ailleurs noir sur blanc, en rangeant
la « pastille d'état » parmi les usages légitimes du lime.

La règle réelle, celle qui rend compte des soixante-neuf, tient dans une autre
phrase : ***le rond dit « une unité », le carré dit « une surface »***. Une unité
est une chose entière et indivisible — une cible qu'on presse, un état, un
visage, un mot-étiquette. Une surface est une chose qui en contient d'autres :
une carte, un panneau, une bande, un champ, un bouton, un châssis de maquette.
Le rayon ne signale donc pas l'interaction, il signale la nature de l'objet ;
c'est pour cela qu'un bouton — qui se clique pourtant — est carré, et qu'un
portrait — qui ne se clique pas — est rond.

Ce que la règle continue d'interdire est inchangé, et c'était son vrai objet :
**une bande de surlignage arrondie devient un badge**, une carte arrondie devient
un composant de bibliothèque, un champ arrondi devient un formulaire générique.
Ce sont des surfaces, elles restent à zéro.

La profondeur, quand elle est nécessaire, vient du **changement de surface** :
papier, bande grise, aplat lime, aplat encre.

**Une seule maille de grille sur le site**, 96 px (`--spacing-grid-cell`). Elle
court dans les gouttières de chaque page et entre dans l'aplat du hero ; une
seconde maille se lirait comme une erreur d'alignement. Là où elle croise du
texte, elle doit rester **sous le seuil de perception** : mesuré, à 12 %
d'opacité les verticales coupaient les lettres du titre avec 5,3 % d'écart de
luminance, assez pour se lire comme un trait sur un mot. À 7 %, et cantonnée au
quart droit que le texte n'occupe pas, elle retombe à 0,5 %. **Sous 1024 px elle
n'existe pas** : le texte y prend toute la surface, et aucun réglage ne la rendait
à la fois visible et inoffensive.

**Ce seuil était écrit ici et nulle part ailleurs**, le code coupant à 640 px.
Entre les deux, mesuré sur la page vivante, la gouttière vaut 32 px à 641, 38 à
768, 45 à 900 et 51 à 1023 : pour une maille de 96, il n'y tient pas une cellule.
Ce qu'on y voyait n'était pas une grille atténuée mais un reste de grille — un
filet vertical collé au bord de l'écran, et des tirets horizontaux de 32 à 51 px
tous les 96. Le code coupe désormais à 1023 px, c'est-à-dire au **seul seuil
desktop du site**, celui où la navigation passe du menu au wordmark et où
`scrollbar-gutter` se stabilise. Une signature de structure apparaît là où la
mise en page desktop apparaît, pas quatre cents pixels avant.

**Et elle ne s'anime plus qu'en `transform`.** Les deux calques de gouttière
menaient deux animations liées au scroll de front : un défilé des lignes en
`background-position`, et une parallaxe en `translate3d`. La seconde est
compositable — le compositeur déplace un calque déjà peint ; la première ne l'est
pas — elle fait repeindre puis re-rastériser deux calques de la hauteur du
document, masqués par sept dégradés radiaux chacun, à chaque image de défilement.
Mesuré par trace CDP sur un même scroll de 3 000 px à 1440 × 900, médiane de
trois passes :

| | Paint | RasterTask |
|---|---|---|
| les deux animations | 867 | 967 |
| grille masquée (témoin) | 445 | 88 |
| la parallaxe seule | 445 | 94 |

Le défilé des lignes coûtait à lui seul 422 peintures et 879 rastérisations —
la rastérisation multipliée par onze — pour un mouvement que le masque efface à
72 % et dont le motif se répète de toute façon tous les 96 px. Le plus cher était
celui qu'on voyait le moins. **Une animation liée au scroll ne porte que des
propriétés compositables**, `transform` et `opacity` ; tout le reste se paie à
chaque image, et se paie sur le seul geste que le visiteur fait en continu.

## Components

### La home personnelle et son routeur de services

Le premier viewport présente d'abord la personne qui construit. Sur desktop,
le titre direct occupe la gauche et le portrait de Lilian la droite. Le portrait
est carré, sans bordure, ombre ou contrechamp ; son nom et son ancienneté figurent
en légende. Sous 1024 px, l'image passe sous le texte et garde son ratio carré,
avec une largeur maximale de 30 rem. L'action primaire descend vers `#services` : elle
oriente sans faire du hero un comparateur ni y dupliquer les deux offres.

La section suivante compacte la légitimité en deux colonnes : trajectoire et
méthode à gauche, quatre faits vérifiables à droite. Elle répond à « pourquoi
vous confier le projet ? » avant de demander au visiteur de choisir un service.

Le choix arrive ensuite dans un routeur à deux surfaces de même poids : lime
pour **Automatisation & IA**, papier pour **Landing pages et applications métiers**.
Les cartes partagent six rangées via `subgrid` : besoin, titre, description,
périmètre, preuve et action. Le conteneur de mesure typographique est le `h3`,
dont les deux lignes consomment le jeton : le poser sur chaque carte empêcherait
le partage des rangées de cette carte.
Chaque carte garde une seule destination — `/automatisations-ia` ou
`/sites-web-abonnement` — sans lien imbriqué. Sous 900 px, elles deviennent deux
rangées séparées par le même filet de 1 px. Le texte web nomme les landing pages,
dashboards, portails clients et applications métiers.

Après ce routeur, une liste sur aplat encre aide les fondateurs et équipes Ops,
les dirigeants de PME, puis les agences et studios à se reconnaître. La FAQ
ferme la home en répondant aux questions de triage. La prise de rendez-vous
n'appartient pas à cette page : chaque landing détaille son service, ses preuves
et ses limites avant de convertir. Le vibe coding reste une méthode commune,
jamais une troisième offre.

**Le surlignage** est le dispositif signature. Une bande lime en pseudo-élément
posée **derrière** le texte, avec `z-index: -1` et `isolation: isolate`. C'est la
bande qui penche, pas le `<mark>` : faire tourner l'élément inclinerait les
lettres, or on veut un coup de surligneur de travers sur un texte droit.
L'inclinaison alterne via une classe `.inv` posée à la main — `:nth-of-type` ne
peut pas le faire, chaque `<mark>` étant seul dans son parent.

Sur `.bloc-encre`, le texte du surlignage est explicitement sombre (`#111111`).
Il ne doit pas hériter de `--color-ink`, remappé en blanc dans cette section.
Les liens fléchés soulignés emploient `.text-link-arrow` : un seul pseudo-élément
porte le trait continu sous le libellé, l'espace et la flèche. La cible conserve
44 px de haut et le texte peut se répartir sur plusieurs lignes sur mobile.

Contrainte dure : `white-space: nowrap`. Sur un fragment qui passe à la ligne, la
bande couvre le rectangle englobant et produit un aplat informe. **Le fragment
fait donc de 1 à 4 mots**, à toutes les tailles. C'est aux mots d'être courts,
pas à la bande de se déformer.

**Le bouton primaire** est noir au repos et passe au lime au survol. Sur un aplat
lime il passe au blanc : le survol doit toujours changer quelque chose.

Le changement se fait en **fondu croisé**, et le lime ne balaie jamais la
largeur. La tentation d'y retrouver le geste du surligneur est forte, mais une
bande qui traverse laisse forcément le libellé à cheval sur les deux fonds :
blanc sur lime d'un côté, encre sur encre de l'autre, soit un texte illisible
pendant tout le milieu du geste. Le fondu n'a pas ce défaut, le fond et le texte
se croisant, leur écart de luminance ne s'effondre à aucune image.

**La sortie est plus lente que l'entrée.** Un survol dont l'aller et le retour
durent autant se ressent comme une commutation ; répondre vite puis relâcher
lentement est ce qui le fait ressembler à une matière qui cède.

**Le motion vit dans les jetons, exactement comme l'échelle.** Trois courbes, et
trois seulement : `--ease-out-quint` par défaut, `--ease-out-expo` pour les
entrées longues du hero, `--ease-out-quart` pour les teintes de marque au
survol. Toutes les trois sont des *ease-out* — le mouvement part vite et
s'arrête doucement, jamais l'inverse.

Deux courbes vivaient hors des jetons, et la seconde était une erreur silencieuse.
`cubic-bezier(0.25, 1, 0.5, 1)` était recopiée dans deux composants : c'est
désormais `--ease-out-quart`. Et `--default-transition-timing-function`, que toute
classe `transition-*` de Tailwind hérite, valait `cubic-bezier(0.4, 0, 0.2, 1)` —
un **ease-in-out**, l'exact contraire de ce que cette page prescrit partout
ailleurs. Quatre éléments de la home s'animaient encore dessus. Les deux défauts
de Tailwind pointent maintenant sur les jetons du projet.

Un jeton déclaré pour être adopté plus tard doit vivre dans un bloc
`@theme static` : Tailwind v4 n'émet pas un jeton que rien ne référence, et le
premier composant à l'appeler recevrait une valeur vide, donc le `ease` par
défaut du navigateur, sans erreur ni avertissement.

**Le repère de navigation est un emplacement, pas deux objets.** Au-dessus de
1024 px il porte le wordmark, `LILIAN SEVOUMIAN` en toutes lettres, en permanence.
En dessous, seize caractères en capitales ne cohabitent pas avec un CTA central et
un déclencheur de menu : l'emplacement tombe à 28 px et porte un « L » tant que le
hero est à l'écran, puis le visage, en fondu croisé, une fois le hero sorti. Le
« L » évite de répéter le portrait pendant qu'il est déjà visible en grand ; le
visage reprend l'identité dans la barre dès que ce portrait quitte l'écran.

Les deux images ne répondent donc pas à la même échelle : celle du hero présente
la personne, celle de 28 px devient ensuite un repère de marque persistant. À
28 px on ne relit pas un portrait, on reconnaît une identité. C'est aussi pourquoi
le visage ne monte pas en desktop : le wordmark complet y tient et reste la forme
la plus nette de la marque dans la navigation.

Le fondu croisé était piloté par un observateur sur `#hero`, que seule la home
possède : vérifié en runtime, sur les **dix autres pages** le repère restait un
« L » à toute hauteur de défilement, et le visage n'apparaissait jamais. L'état
est maintenant posé au rendu sur toute page sans hero — au rendu et non au
chargement, pour ne pas faire clignoter un « L » pendant 200 ms à chaque
ouverture de sous-page.

**Le monogramme** remplace le logo des marques absentes du jeu simple-icons, qui
en couvre pourtant 3 653. Un carré de 22 px au filet d'encre, la capitale au
centre, exactement la métrique du logo qu'il remplace pour que la ligne de titre
garde une seule mesure d'une carte à l'autre. Contour et non aplat : mesuré côte
à côte, un carré plein pesait plus lourd que les glyphes voisins et la ligne de
titre sautait aux yeux avant les autres. **On ne dessine pas un logo approximatif
sur un site qui vend la rigueur** : l'absence assumée se lit comme une décision,
l'à-peu-près comme une erreur.

**Le logo dans le fil du texte** (`Outil.astro`) prend la **couleur du texte**,
jamais celle de la marque : vingt logos colorés semés dans les paragraphes
rendraient au corps de texte le bruit qu'on a retiré du bandeau. Le couple
logo + nom est en `nowrap`, un logo orphelin en fin de ligne se lisant comme une
puce. Et **l'alignement se corrige par marque, pas globalement** : à taille CSS
égale, le glyphe n8n ne pose que 9 px d'encre là où celui de Make en pose 12, si
bien qu'il flottait et pesait un tiers de moins que son voisin. Toute marque
ajoutée demande la même mesure.

Le dispositif est **rare** : sur quatorze emplacements de prose examinés, trois
l'ont mérité. Partout ailleurs le logo serait un doublon à quelques pixels d'un
vrai logo, ou un ornement dans une citation, une fiche de faits ou un titre qui
porte déjà son surlignage.

**Les maquettes produit** (`MockupWindow` et les composants `Stack*`) sont des
reconstitutions schématiques. Les écrans clients sont confidentiels : aucun
visuel du site ne doit pouvoir passer pour une capture, et le châssis porte la
mention quand le doute est possible. Les couleurs de marque tierces y sont
**posées au repos** parce qu'on montre l'outil réel, pas parce qu'elles entrent
dans le chrome du site.

**Les captures de projets publics** (`ProjectVisual`) sont l'autre cas où une
palette extérieure reste visible au repos : ici l'image n'est pas un décor mais
la preuve. Le composant montre une vraie page publique et porte une légende
composée du nom et de la nature du projet. Seules les six entrées du portfolio
renvoient vers leur URL. Elles n'apparaissent nulle part ailleurs sur la page :
une preuve montrée une fois gagne en autorité, tandis qu'une capture répétée dans
le hero, les tarifs ou la méthode devient une texture décorative. Il ne simule
ni fenêtre de navigateur ni appareil ; la capture reste une surface
rectangulaire, sans ombre, dans les ratios `16 / 7`, `16 / 10` ou `4 / 5`.

Le dégradé noir n'existe que dans le tiers bas de l'image, sous la légende. Il
n'introduit pas une nouvelle matière de marque : c'est une protection de
lisibilité sur des captures dont la luminance varie. Le survol agrandit l'image
de `1,025` sur pointeur fin, la légende ne bouge pas, et le mouvement disparaît
avec `prefers-reduced-motion`. Sur mobile, seul le nom reste visible ; la nature
du projet demeure disponible aux technologies d'assistance. Une image absente
devient un aplat d'encre, jamais une icône cassée.

**La capture comme preuve.** Une capture de projet n'est admissible que si la
page est publique, l'URL source est conservée et le fichier livré possède une
provenance traçable. Sa palette reste enfermée dans l'image ; le cadre, la
légende et les interactions continuent d'obéir au système Lilian Sevoumian.

**Une couleur de marque au survol n'est pas la même chose.** Dans le chrome du
site, trois dispositifs la font apparaître au pointeur et seulement là : les
logos du bandeau
(`LogoMarquee`), le logo en tête de carte outil (`Stack`), et les trois canaux
du pied de page (`Footer`). Le raisonnement est écrit dans `LogoMarquee` :
vingt-trois couleurs posées en permanence contrediraient la promesse d'un seul
accent, la même couleur rendue au survol est un geste. La règle est donc :
**dans le chrome, au repos, tout est encre ; la marque tierce n'apparaît qu'au
survol, et jamais sur pointeur grossier**, où elle ne manque à personne
puisqu'elle ne porte pas de sens. Une capture de projet public est du contenu,
pas du chrome, et relève de la règle précédente. Sur l'encre du pied de page, la
teinte est celle que la plateforme publie pour les fonds sombres — le bleu
LinkedIn des fonds clairs y tombe à 3,32:1.

**Les pages de cas** découpent leur corps markdown en pièces, une par titre, sur
des surfaces alternées dont la dernière est l'encre. Trois dispositifs y sont
pilotés par le frontmatter, chacun avec un seuil : `flow` exige exactement trois
actions, `bascule` au moins trois lignes, `nomenclature` au moins six. **Un cas
qui n'a pas la matière n'a pas le visuel** — un gabarit qu'on peut remplir à
moitié invite à inventer pour l'équilibrer.

### L'identité hors-site

Vignette de partage, favicon, icône d'écran d'accueil. Ces trois actifs sont **les
plus vus de la marque** — chaque lien posté sur LinkedIn, chaque onglet, chaque
favori — et ils étaient les seuls que ce document ne gouvernait pas. Ils ont
porté pendant un temps un cube 3D blanc cassé aux logos multicolores : ni lime,
ni Geist, ni aucune trace de ce système, et trois des anti-références de
`PRODUCT.md` cochées d'un coup.

**La home possède sa vignette propre** (`public/og-home.png`, 1200 × 630) : elle
reprend le premier viewport livré, avec le titre personnel à gauche, le portrait
à droite sans contrechamp. Sa provenance visuelle reste attachée au code
de `HomeHeroPersonal.astro` et au portrait source
`src/assets/lilian-photo.jpg` ; elle ne réinterprète pas la home avec une
composition de campagne parallèle.

**La vignette par défaut** (`public/og-image.png`, 1200 × 630) conserve l'autre
expression de la marque : aplat lime, manifeste en Geist semibold, surlignage
blanc penché, nom en haut et outils en bas. Elle se lit à la taille d'une carte
LinkedIn. En **PNG palettisé et non en JPEG** : trois couleurs, un aplat et de la
typo — le JPEG posait un halo sur chaque bord de lettre pour 51 Ko, le PNG-8 est
net pour 14. Son `alt` décrit la vignette, pas le site.

**Les icônes** (`favicon_liliansevoumian.svg`, `favicon.png`, `apple-touch-icon.png`)
sont le monogramme à l'encre sur un carré lime, à 62 % de la largeur. Le carré
plutôt que le tracé sur fond transparent : à 16 px sur un onglet sombre, un
monogramme sans fond disparaît, et c'est le lime qui rend l'onglet
reconnaissable au coin de l'œil. Rayon `0` — un carré ne se clique pas. Les
trois sont générés depuis la même source SVG : **une seule identité**, là où le
PNG et le SVG en portaient deux différentes.

## Do's and Don'ts

**À faire**

- Poser le lime comme surface : un aplat de section, une bande de surlignage, une
  pastille d'état.
- Vérifier chaque contraste par le calcul, jamais à l'œil. Toutes les valeurs de
  ce document sont calculées.
- Garder les fragments surlignés entre 1 et 4 mots, et alterner l'inclinaison.
- Faire porter le rythme par le changement de surface, pas par le vide.
- Laisser une absence quand la matière manque. Sur ce site, ce qui n'est pas
  montré est aussi une affirmation.
- Montrer un projet public par une capture réelle, légendée et traçable ;
  cantonner sa palette à l'image.
- Garder les deux cartes du routeur de la home strictement égales en poids, en
  hauteur minimale et en nombre de surfaces interactives.

**À ne pas faire**

- Écrire du texte en lime. Jamais, nulle part, quelle que soit la taille.
- Poser un anneau de focus lime : il est invisible.
- Arrondir une surface. Deux valeurs existent, et le rond est réservé aux
  unités : une cible, un état, un visage, un mot-étiquette. Une carte, une
  bande, un panneau, un champ et un bouton restent à zéro.
- Ajouter une ombre. L'élévation vient des filets.
- Entourer une capture de projet d'un faux navigateur ou d'un appareil, ni
  employer son dégradé de lisibilité ailleurs que sous sa légende.
- Poser un sur-titre en petites capitales espacées au-dessus de chaque section,
  ni une numérotation `01 / 02 / 03` en écaille. C'est la grammaire du site
  généré, et elle a été retirée volontairement.
- Lire un jeton de rôle dans `.bloc-lime` ou `.bloc-encre` : le remap ne lit que
  des valeurs fixes, sinon il produit un cycle.
- **Écrire `var(--color-lime)` dans un composant qui peut se retrouver sur
  `.bloc-lime`** — le piège inverse du précédent. Ce jeton n'est pas remappé, il
  reste le lime, et le composant devient lime sur lime, 1,00:1. Trois
  dispositifs prévoient déjà l'inversion (`mark`, `.link-cta__label`,
  `.lien-prose`) ; tout nouveau trait ou aplat lime doit la prévoir aussi.
- **Animer autre chose que `transform` ou `opacity` sur une timeline de scroll.**
  Le reste n'est pas compositable : chaque image de défilement repasse par la
  peinture et la rastérisation. Mesuré sur les gouttières, une seule propriété
  mal choisie doublait les peintures de la page et multipliait par onze ses
  rastérisations.
- **Déclarer une transition, ou un état de survol, sur une propriété qui ne
  change pas.** Sept déclarations d'ombre sur des jetons transparents ont vécu
  ainsi : elles ne rendaient rien, et elles se recopiaient de carte en carte
  parce qu'au code elles ressemblaient à une intention.
- Faire passer une reconstitution pour une capture d'écran.
- **Écrire une valeur par défaut d'élément hors de `@layer base`.** Elle battra
  silencieusement toute classe utilitaire, quelle que soit la spécificité. Deux
  bugs sur ce projet, et rien dans l'outillage ne les signale.
- **Poser un commentaire `{/* … */}` à l'intérieur d'une expression Astro** —
  dans un `.map()`, dans un `&&`, ou entre les attributs d'un composant. Le
  compilateur le lit comme une expression et non comme un commentaire, et rend
  `Expected ")" but found "$$render"` : les huit pages du site tombent en 500
  d'un coup, sans que le message ne nomme le fichier fautif. Le commentaire va
  avant l'expression, ou passe en `<!-- -->`.
- Commuter un rôle typographique entre deux jetons à un point de rupture. Une
  seule courbe `clamp()`, sinon la taille peut décroître quand la fenêtre
  grandit.
- Faire balayer le lime sur la largeur d'un bouton : le libellé traverse les deux
  fonds et devient illisible au milieu du geste.
- Dessiner le logo d'une marque absente du jeu d'icônes. Monogramme.
- Écrire un `clamp()` sur place dans un composant. L'échelle vit dans `@theme`,
  et une courbe recopiée échappe à toute reprise globale.
- Écrire une `cubic-bezier()` sur place, pour la même raison. Trois courbes
  existent, toutes en *ease-out*, toutes dans `@theme`.
- Poser une durée en dur quand deux déclarations doivent rester égales. Le
  balayage de la FAQ en avait quatre, couplées deux à deux — la durée de
  transition de la question et celle de son animation, le pas de la cascade et
  celui du délai d'animation. Rien ne signalait une dérive entre elles.
- Refaire à la main l'en-tête d'une section. `SectionHeader` porte le titre, le
  filet et le chapô, et le filet est ce qui donne son rang à la section — deux
  sections l'avaient réimplémenté et se présentaient comme des sous-parties.
- Présenter le vibe coding comme une troisième offre, ou faire remonter le choix
  entre les deux services dans le hero personnel.
