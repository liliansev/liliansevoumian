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
    fontSize: "clamp(3.25rem, 6vw + 1.2rem, 6.25rem)"
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

**Le manifeste du hero est une courbe unique, jamais deux jetons commutés.** Il y
a eu une bascule à `1024px` vers un second jeton plus petit que le premier : le
titre perdait 14,7 % en gagnant un pixel de largeur, et ne repassait au-dessus de
sa taille de 1023 px que vers 1180. Toute la plage des iPad en paysage affichait
un hero plus petit que sur une tablette. La courbe est calée à **×1,20 de
`--text-display`** sur toute la plage : le titre de la home ne peut plus se
retrouver plus petit que celui d'une page secondaire, ce qui était le cas
(76 px contre 84).

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

## 4. Elevation

**Il n'y en a pas.** `--shadow-card` et `--shadow-card-hover` valent
`0 0 0 0 transparent`. La structure vient des filets, d'un seul poids : 1 px.

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
mention quand le doute est possible. C'est le seul endroit où les couleurs de
marque tierces sont **posées au repos** — on y montre l'outil réel.

**Une couleur de marque au survol n'est pas la même chose.** Trois dispositifs
la font apparaître au pointeur et seulement là : les logos du bandeau
(`LogoMarquee`), le logo en tête de carte outil (`Stack`), et les trois canaux
du pied de page (`Footer`). Le raisonnement est écrit dans `LogoMarquee` :
vingt-trois couleurs posées en permanence contrediraient la promesse d'un seul
accent, la même couleur rendue au survol est un geste. La règle est donc :
**au repos, tout est encre ; la marque tierce n'apparaît qu'au survol, et jamais
sur pointeur grossier**, où elle ne manque à personne puisqu'elle ne porte pas
de sens. Sur l'encre du pied de page, la teinte est celle que la plateforme
publie pour les fonds sombres — le bleu LinkedIn des fonds clairs y tombe à
3,32:1.

**Les pages de cas** découpent leur corps markdown en pièces, une par titre, sur
des surfaces alternées dont la dernière est l'encre. Trois dispositifs y sont
pilotés par le frontmatter, chacun avec un seuil : `flow` exige exactement trois
actions, `bascule` au moins trois lignes, `nomenclature` au moins six. **Un cas
qui n'a pas la matière n'a pas le visuel** — un gabarit qu'on peut remplir à
moitié invite à inventer pour l'équilibrer.

## 6. L'identité hors-site

Vignette de partage, favicon, icône d'écran d'accueil. Ces trois actifs sont **les
plus vus de la marque** — chaque lien posté sur LinkedIn, chaque onglet, chaque
favori — et ils étaient les seuls que ce document ne gouvernait pas. Ils ont
porté pendant un temps un cube 3D blanc cassé aux logos multicolores : ni lime,
ni Geist, ni aucune trace de ce système, et trois des anti-références de
`PRODUCT.md` cochées d'un coup.

**La vignette** (`public/og-image.png`, 1200 × 630) est la page en petit : aplat
lime, la phrase du hero en Geist semibold, le surlignage blanc penché sur les
trois derniers mots, le nom en haut, les outils en bas. Elle se lit à la taille
d'une carte LinkedIn. En **PNG palettisé et non en JPEG** : trois couleurs, un
aplat et de la typo — le JPEG posait un halo sur chaque bord de lettre pour 51 Ko,
le PNG-8 est net pour 14. Son `alt` décrit la vignette, pas le site.

**Les icônes** (`favicon_liliansevoumian.svg`, `favicon.png`, `apple-touch-icon.png`)
sont le monogramme à l'encre sur un carré lime, à 62 % de la largeur. Le carré
plutôt que le tracé sur fond transparent : à 16 px sur un onglet sombre, un
monogramme sans fond disparaît, et c'est le lime qui rend l'onglet
reconnaissable au coin de l'œil. Rayon `0` — un carré ne se clique pas. Les
trois sont générés depuis la même source SVG : **une seule identité**, là où le
PNG et le SVG en portaient deux différentes.

## 7. Do's and Don'ts

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
- Arrondir une surface. Deux valeurs existent, et le rond est réservé aux
  unités : une cible, un état, un visage, un mot-étiquette. Une carte, une
  bande, un panneau, un champ et un bouton restent à zéro.
- Ajouter une ombre. L'élévation vient des filets.
- Poser un sur-titre en petites capitales espacées au-dessus de chaque section,
  ni une numérotation `01 / 02 / 03` en écaille. C'est la grammaire du site
  généré, et elle a été retirée volontairement.
- Lire un jeton de rôle dans `.bloc-lime` ou `.bloc-encre` : le remap ne lit que
  des valeurs fixes, sinon il produit un cycle.
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
