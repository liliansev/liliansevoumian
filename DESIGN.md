---
name: Lilian Sevoumian
description: Opinionated no-code expert — site as proof-of-work. Vercel-grade grid, two-accent ponctuation, mono-as-texture.
colors:
  paper: "oklch(0.995 0.002 290)"
  ink: "oklch(0.16 0.008 290)"
  ink-soft: "oklch(0.22 0.008 290)"
  ink-mid: "oklch(0.40 0.006 290)"
  ink-low: "oklch(0.48 0.005 290)"
  ink-faint: "oklch(0.78 0.004 290)"
  divider: "oklch(0.92 0.004 290)"
  surface-low: "oklch(0.975 0.003 290)"
  grid-line: "oklch(0.93 0.005 290)"
  violet: "oklch(0.55 0.22 290)"
  violet-deep: "oklch(0.45 0.22 290)"
  violet-soft: "oklch(0.96 0.04 290)"
  ember: "oklch(0.66 0.14 45)"
  ember-deep: "oklch(0.50 0.14 45)"
  ember-soft: "oklch(0.96 0.03 50)"
typography:
  display:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5vw + 1rem, 5.25rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1vw + 0.875rem, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: "clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  body-large:
    fontFamily: "'Geist', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.5vw + 0.875rem, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  mono-label:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
  mono-body:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  mono-caption:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  px: "1px"
  half: "2px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "96px"
  3xl: "144px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.sm}"
    padding: "11px 18px"
  button-primary-hover:
    backgroundColor: "oklch(0.22 0.008 290)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.sm}"
    padding: "11px 18px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-low}"
  chip-tool:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  chip-tool-active:
    backgroundColor: "{colors.violet-soft}"
    textColor: "{colors.violet-deep}"
  card-default:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  card-elevated:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "32px"
  input-text:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-mid}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  nav-link-active:
    textColor: "{colors.ink}"
  code-block:
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-body}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  metric-large:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "0"
---

# Design System: Lilian Sevoumian

## 1. Overview

**Creative North Star: "The Operator's Console"**

Le site doit ressembler à l'outil que Lilian *utiliserait* — pas à la plaquette qu'il *vendrait*. Densité technique d'un dashboard infra (Vercel, Modal, Plain), tenue par une grille omniprésente et une mono qui sert de texture. La couleur est ponctuation : violet pour le signal n8n, orange ember pour Claude/Anthropic. Le reste — 90 % de la surface — est noir tinté sur papier presque blanc. Pas d'atmosphère. La lisibilité, l'alignement et la motion *sont* l'atmosphère.

Ce système rejette explicitement : le ton chaleureux d'agence (cream, terracotta, ombres colorées 3D, polices arrondies humanistes), le hero gradient bleu/violet générique, les grilles 3×3 d'icônes, le glassmorphism décoratif. Si l'écran ressemble à un site de freelance que tu as déjà vu, il est faux.

L'élément signature est la **grille technique** : lignes 1px de couleur `grid-line` traversant la page, intersections révélées par un `+` 8px aux points structurants. Elle ne décore pas, elle **structure** — toute typo, tout chiffre, toute card s'aligne dessus. C'est l'IDE rendu visible.

**Key Characteristics:**

- Papier presque blanc + encre presque noire (jamais `#FFF` ni `#000` ; tout tinté `oklch(_ _ 290)`).
- Grille structurelle 1px omniprésente avec intersections marquées.
- Mono `JetBrains Mono` comme texture : labels, chiffres, captions, code, métadonnées. Sans `Geist` pour les titres et le corps.
- Deux accents seulement, ≤10 % de surface combinée : violet (`oklch(0.55 0.22 290)`) et ember (`oklch(0.66 0.14 45)`).
- Motion choreographed : séquences scroll-driven sur 1-2 sections clés ; le reste reste discret.
- Densité avant air : on remplit la grille, on ne fuit pas le contenu.

## 2. Colors: The Two-Voice Palette

Palette restreinte de neutres tintés violet et de deux accents stricts. Tout neutre porte une chroma résiduelle de 0.002–0.008 vers le violet (hue 290) — c'est imperceptible isolément, c'est ce qui empêche l'ensemble de tomber dans le gris industriel froid.

### Primary

- **Violet Electric** (`oklch(0.55 0.22 290)`): l'accent n8n. Réservé aux : focus rings, borders d'état actif, fonds de dots/markers décoratifs, peaks d'animation. Chroma haut, contraste insuffisant (≈3.8:1) pour le **texte** — pour ce dernier usage, prendre `violet-deep`. Jamais en aplat de fond > 8 % d'une vue.
- **Violet Deep** (`oklch(0.45 0.22 290)`): la version texte du violet. Pour tout label/chiffre/marker `+` qui doit passer WCAG AA sur paper (≈5.3:1). Aussi utilisé comme color sur fond `violet-soft` (chips). En dark mode, flippe à `oklch(0.85 0.12 290)` pour rester lisible sur ink-deep.
- **Violet Soft** (`oklch(0.96 0.04 290)`): wash de fond pour les chips d'outils actifs et les sections "highlight" rares. Discret, jamais central.

### Secondary

- **Ember** (`oklch(0.66 0.14 45)`): l'accent Anthropic / Claude. Réservé aux : dots/icônes décoratives IA, fond de chip `ember-soft`. Complémentaire au violet — *jamais* avec lui dans le même composant.
- **Ember Deep** (`oklch(0.50 0.14 45)`): la version texte de l'ember. Pour tout label/chiffre IA qui doit passer WCAG AA sur paper. Aussi utilisé comme color sur fond `ember-soft` (chips IA).
- **Ember Soft** (`oklch(0.96 0.03 50)`): wash chaleureux pour zones IA-related (case study sur l'IA, badge "AI"). Encore plus rare que violet-soft.

### Neutral

- **Paper** (`oklch(0.995 0.002 290)`): surface de fond principale. Près du blanc pur, infime tint violet pour cohérence avec l'encre.
- **Ink** (`oklch(0.16 0.008 290)`): texte principal et fond des sections sombres ponctuelles. Près du noir, tinted violet — à 0.16 lightness c'est presque indiscernable mais résolument pas industriel.
- **Ink Soft** (`oklch(0.22 0.008 290)`): hover state du `btn-primary`, légèrement plus clair que ink.
- **Ink Mid** (`oklch(0.40 0.006 290)`): texte secondaire, labels mono, intitulés de section. (WCAG AA sur paper.)
- **Ink Low** (`oklch(0.48 0.005 290)`): texte tertiaire, métadonnées, timestamps, captions. (WCAG AA sur paper.)
- **Ink Faint** (`oklch(0.78 0.004 290)`): texte décoratif, watermarks, placeholder. **Decoratif uniquement** — ne pas utiliser pour du texte porteur de sens (sous WCAG AA).
- **Divider** (`oklch(0.92 0.004 290)`): bordures de cards, séparateurs entre sections, lignes 1px structurantes les plus discrètes.
- **Grid Line** (`oklch(0.93 0.005 290)`): lignes de la grille technique signature. Très proche de `divider` — niveau d'intensité quasi identique.
- **Surface Low** (`oklch(0.975 0.003 290)`): fonds différenciés (code-blocks, sections paires alternées si besoin), barely-visible.

### Named Rules

**The Two-Voice Rule.** Violet et Ember ne coexistent jamais dans le même composant ni dans la même cellule de grille. Ils alternent entre composants. Cumulés sur une vue, ils n'occupent jamais plus de 10 % de surface. Si tu hésites, tu enlèves.

**The Tinted-Neutral Rule.** Tout neutre porte une chroma résiduelle vers violet (hue 290). Pas de `#FFFFFF`, pas de `#000000`, jamais. Le gris industriel pur (`oklch(0.5 0 0)`) est interdit — il aplatit la cohérence avec les accents.

**The Pure-Black Ban.** Si tu vois `#000` dans un fichier, tu corriges immédiatement vers `var(--color-ink)` (`oklch(0.16 0.008 290)`).

## 3. Typography

**Display Font:** `Geist` (Google Fonts, fallback `system-ui, sans-serif`)
**Body Font:** `Geist` (même famille — variation par poids/taille)
**Mono Font:** `JetBrains Mono` (Google Fonts, fallback `ui-monospace, monospace`)

**Character:** Geist apporte une netteté géométrique sans la rigidité d'un grotesque industriel. JetBrains Mono est la voix technique — c'est elle qui dit "ce site est fait par quelqu'un qui ouvre un terminal tous les jours". Le pairing évite Geist Mono volontairement (trop cliché Vercel) au profit de JetBrains Mono pour signer une légère différenciation.

### Hierarchy

- **Display** (`Geist 600`, `clamp(2.75rem, 5vw + 1rem, 5.25rem)`, `line-height: 0.98`, `letter-spacing: -0.045em`): hero uniquement, une seule occurrence par page. Tracking serré pour densité visuelle.
- **Headline** (`Geist 600`, `clamp(2rem, 3vw + 0.5rem, 3rem)`, `line-height: 1.05`, `letter-spacing: -0.035em`): titres de section. Maximum un par section.
- **Title** (`Geist 500`, `clamp(1.25rem, 1vw + 0.875rem, 1.5rem)`, `line-height: 1.2`, `letter-spacing: -0.02em`): titres de cards et sous-blocs.
- **Body** (`Geist 400`, `clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)`, `line-height: 1.55`): texte courant. Cap longueur de ligne à 65–72ch pour les paragraphes denses.
- **Body Large** (`Geist 400`, `clamp(1.0625rem, 0.5vw + 0.875rem, 1.25rem)`, `line-height: 1.5`): leads, descriptions de section, intros.
- **Mono Label** (`JetBrains Mono 500`, `0.75rem`, `letter-spacing: 0.02em`, **uppercase**): labels de section ("01 — APPROCHE"), tags, badges, pied de card. La voix technique du système.
- **Mono Body** (`JetBrains Mono 400`, `0.8125rem`, `line-height: 1.6`): code-blocks, snippets de scenarios n8n, configs JSON visibles.
- **Mono Caption** (`JetBrains Mono 500`, `0.6875rem`, `letter-spacing: 0.04em`, **uppercase**): captions, métadonnées (dates, durées, IDs), légendes de grille.

### Named Rules

**The Mono-as-Voice Rule.** JetBrains Mono ne décore jamais — elle structure. Tout label, tout chiffre que l'on veut tagué "donnée" (durées, pourcentages, IDs, tools, dates) passe en mono. Geist porte la prose ; mono porte la donnée. Si on hésite entre les deux pour un nombre, c'est mono.

**The No-Italic Rule.** Pas d'italique. Pour l'emphase, on utilise le poids (500 → 600) ou la couleur (`ink` → `violet`). L'italique adoucit ; le système refuse l'adoucissement.

**The Section-Number Rule.** Chaque section porte un numéro mono `01`, `02`, … en `mono-caption` avant le headline. Métaphore d'IDE/console, signature visuelle puissante avec un coût d'implémentation nul.

## 4. Elevation

**Aucune élévation. Jamais.** Le système refuse intégralement les `box-shadow` d'élévation — au repos comme en transition. Cette interdiction est l'engagement central du système : les ombres SaaS génériques diluent l'identité technique recherchée.

La profondeur et la hiérarchie passent par **trois autres mécanismes**, dans cet ordre de priorité :

1. **Intensification de la grille** — au hover d'un élément interactif, les segments de `grid-line` qui longent ses bords passent de `grid-line` (`oklch(0.91 0.005 290)`) à `ink-faint` (`oklch(0.80 0.004 290)`), et les 4 `+` aux coins de l'élément virent à `violet`. L'élément n'est pas "élevé", il *réclame sa cellule sur la grille*. Signature unique du système.
2. **Bordure qui se durcit** — les bordures statiques `divider` passent à `ink-faint` au hover, à `violet` au focus. Le contour porte l'état, pas l'ombre.
3. **Surface qui se différencie** — `paper` ↔ `surface-low` pour départager deux zones spatiales. Pour les surfaces flottantes (dropdown, popover, modal), on durcit la bordure à `ink-faint` + on garde un fond `paper` opaque solide. La séparation visuelle vient de la bordure et du contraste de fond, pas d'une ombre.

### Focus Indicator (le seul "ring")

- **`focus-ring-violet`** (`outline: 2px solid oklch(0.55 0.22 290); outline-offset: 2px`): focus visible sur tout élément interactif. C'est un **outline**, pas une `box-shadow`. Il ne projette pas, il encadre.

### Named Rules

**The No-Elevation Rule.** Aucune `box-shadow` dans aucun composant, dans aucun état, jamais. Si tu trouves une `box-shadow` dans un fichier, tu la supprimes et tu remplaces par : (a) une bordure plus contrastée, (b) une intensification de grille, ou (c) un changement de surface. Il n'y a pas d'exception.

**The Grid-Claims-The-Cell Rule.** L'interactivité se signale par la **grille qui s'intensifie autour de l'élément** — segments de `grid-line` qui passent à `ink-faint`, `+` qui virent `violet`. C'est le replacement complet du paradigme hover-shadow-lift.

**The Border-Carries-State Rule.** L'état d'un composant (rest / hover / active / focus) se lit dans **la couleur et l'épaisseur de sa bordure**, pas dans son ombre. `divider` → `ink-faint` (hover) → `violet` (focus). Les transitions d'état sont des transitions de border-color, jamais de box-shadow.

**The Floating-Surfaces-Are-Bordered Rule.** Pour les dropdowns, popovers, modals, nav fixe : on les détache de la page par une **bordure 1px `ink-faint`** + un fond opaque `paper`. Pas de `backdrop-filter` blur décoratif (sauf cas exception nav scrolled qui peut avoir un blur léger pour la transparence du fond, mais zéro shadow).

## 5. Components

### Buttons

- **Shape:** rectangulaires à coins légèrement adoucis, `4px` (`rounded.sm`). Pas de pill par défaut — la pill est réservée aux chips.
- **Primary:** fond `ink` (`oklch(0.16 0.008 290)`), texte `paper`, typo `mono-label` (uppercase, tracking 0.02em), padding `11px 18px`.
- **Hover:** fond `oklch(0.22 0.008 290)` (légèrement plus clair), grid-lines locales s'intensifient (`grid-line` → `ink-faint`) sur les segments adjacents au bouton, transition `200ms ease-out-quint`. **Pas de translate, pas de lift, pas de shadow.**
- **Focus visible:** `outline: 2px solid violet; outline-offset: 2px`. Pas de box-shadow.
- **Active:** scale `0.98`, transition `100ms`.
- **Ghost:** fond transparent, texte `ink`, typo `mono-label`, bordure `1px solid divider` ; hover : bordure `ink-faint` + fond `surface-low`. Pour CTA secondaires.
- **Icon-only:** `36×36px` carré, icon Lucide stroke 1.5, padding `0`.

### Chips (Outils, tags)

- **Style:** fond transparent, texte `ink-mid`, typo `mono-caption`, bordure `1px solid divider`, radius `9999px` (full pill). Padding `4px 10px`.
- **State n8n / Make / workflow tools:** active = fond `violet-soft`, texte `violet-deep` (≥4.5:1 WCAG AA), bordure `transparent`.
- **State Claude / GPT / Mistral / IA:** active = fond `ember-soft`, texte `ember-deep` (≥4.5:1 WCAG AA), bordure `transparent`.
- **Hover (non-actif):** texte `ink`, bordure `ink-faint`. Pas de fond.

### Cards / Containers

- **Corner Style:** `6px` (`rounded.md`). Plus carré que rond — pas de `12px+`.
- **Background:** `paper` par défaut. `surface-low` pour différenciation latérale.
- **Border:** `1px solid divider` toujours présente. **Définit la card. Aucune ombre, jamais.**
- **Hover (cards interactives):** bordure passe à `ink-faint`, les 4 `+` aux coins virent `violet`, les segments de `grid-line` traversant la card s'intensifient à `ink-faint`. Transition `200ms ease-out-quint`. Pas de lift, pas de shadow.
- **Internal Padding:** `24px` standard, `32px` pour cards principales (case studies hero, pricing).
- **Variante "grid-card":** la card s'aligne sur les lignes de grille technique, ses bordures *sont* les lignes de grille (illusion de continuité avec la structure). Au hover, la grille entière de la card s'éveille.

### Inputs / Fields

- **Style:** fond `paper`, bordure `1px solid divider`, radius `4px`, texte `body`, padding `10px 14px`.
- **Hover:** bordure `ink-faint`. Pas de fond.
- **Focus:** bordure `violet`, `outline: 2px solid violet; outline-offset: 2px`. Pas de glow, pas de box-shadow.
- **Placeholder:** `ink-faint`.
- **Error:** bordure `oklch(0.55 0.22 25)` (rouge ember-shifted), helper text mono-caption rouge.
- **Mono inputs (numbers, durations):** typo `mono-body`, alignment right pour les valeurs numériques.

### Navigation

- **Style:** nav fixe top, fond `paper / 0.92` + `backdrop-filter: blur(12px)` (juste assez pour la transparence), bordure-bottom `1px solid divider`, hauteur `64px`. **Aucune ombre.** Au scroll, la bordure-bottom s'intensifie à `ink-faint`.
- **Logo:** logo SVG `28×28px` à gauche, mono-caption "LILIAN SEVOUMIAN" à côté.
- **Links:** typo `mono-label`, color `ink-mid` au repos, `ink` en hover. Pas d'underline animé — juste un `+` 4px qui apparaît à gauche du lien actif (signature grille).
- **Mobile:** menu plein-écran sur tap burger, links empilés en `headline` (gros, mobile-friendly).

### Code Block

- **Style:** fond `surface-low`, bordure `1px solid divider`, radius `6px`, padding `16px 20px`, typo `mono-body`.
- **Header (optionnel):** mono-caption à gauche (`scenario.json`), bouton copy à droite.
- **Syntax highlight:** keys = `violet`, strings = `ember`, numbers/booleans = `ink-mid`, comments = `ink-faint italic` (seul cas où l'italique est autorisé — convention de code).

### Signature Component — The Technical Grid

Le rasterzeau structurel du site. Pas un effet décoratif, un système de mise en page rendu visible.

- **Implementation:** SVG fixed en `position: absolute; inset: 0; pointer-events: none;`. Lignes verticales et horizontales `1px` de couleur `grid-line` espacées de `96px` (`spacing.2xl`). Aux intersections "porteuses" (4 par section principale), un `+` SVG `8×8px` de couleur `ink-mid`.
- **Behavior:** au scroll, les `+` les plus proches du viewport center *animent* discrètement (rotation 90° sur 600ms ease-out-expo, ou opacity flicker 0.4 → 1.0). C'est notre signature de motion choreographed — coût visuel nul, signal "système vivant".
- **Don't:** ne JAMAIS poser un fond gradient ou pattern dot par-dessus la grille. Elle est exclusive.

### Section Number

Avant chaque headline de section, un mono-caption `01 — APPROCHE`, color `ink-low`, espacement `tracking 0.04em`. Aligné sur la première colonne de grille. Quand la section est visible dans le viewport, le numéro vire `violet` brièvement (200ms) — réaffirme la signature au scroll.

## 6. Do's and Don'ts

### Do

- **Do** utiliser `oklch()` pour toute valeur de couleur, jamais hex sauf nécessité tooling. Le posture du projet est OKLCH-first.
- **Do** systématiquement passer chiffres, durées, IDs, dates, noms d'outils en `JetBrains Mono` (`mono-label` ou `mono-caption`).
- **Do** numéroter les sections (`01`, `02`, …) avant chaque headline — c'est la signature.
- **Do** poser la grille technique (`Signature Component`) en arrière-plan global, sous tout le reste, avec ses `+` aux intersections.
- **Do** réserver violet aux outils workflow (Make, n8n, Airtable, scenarios) et ember aux outils IA (Claude, GPT, Mistral, AI). Cohérence sémantique stricte.
- **Do** utiliser `outline: 2px solid violet; outline-offset: 2px` comme focus ring partout — uniformité d'état actif. **Outline, pas box-shadow.**
- **Do** signaler tous les hovers par : bordure qui se durcit, grid-line qui s'intensifie autour, ou changement de surface. Jamais par une ombre, jamais par un translate Y.
- **Do** caper la longueur de ligne des paragraphes à 65–72ch.
- **Do** alternances `paper` ↔ `surface-low` pour rythmer les sections, jamais `paper` ↔ couleur saturée.
- **Do** appliquer `text-wrap: balance` sur tous les headlines et `text-wrap: pretty` sur les paragraphes.
- **Do** respecter `prefers-reduced-motion` : la grille `+` ne tourne plus, le scroll-driven s'arrête, mais la palette reste identique.

### Don't

- **Don't** introduire AUCUNE `box-shadow` d'élévation, dans aucun état, dans aucun composant. Cards, buttons, dropdowns, modals, nav scrolled : zéro ombre. Si tu en vois une, tu la supprimes.
- **Don't** ré-introduire les ombres colorées 3D (orange, violet, cyan, rose) du site précédent.
- **Don't** ré-introduire la palette cream / sable / terracotta. Le fond est `paper`, jamais `#F8F7F4`.
- **Don't** utiliser Bricolage Grotesque (typo trop ronde / "créative"). Geist + JetBrains Mono uniquement.
- **Don't** poser un dot-grid radial gris (`.dot-grid`, `.dot-grid-cream`) en background — la grille technique 1px le remplace intégralement.
- **Don't** mélanger violet et ember dans le même composant. Two-Voice Rule.
- **Don't** dépasser 10 % de surface accent (violet + ember cumulés) sur une vue donnée.
- **Don't** utiliser `border-radius` ≥ `12px` — on n'est pas dans le SaaS warm. Max `8px` (`rounded.lg`), `9999px` réservé aux chips.
- **Don't** poser des gradients sur le texte (`background-clip: text`). Interdiction absolue, héritée des bans transversaux.
- **Don't** poser des translate-Y / lift sur les cards en hover. La grille s'intensifie, la card ne bouge pas.
- **Don't** poser un hero avec photo de Lilian casquette / bras croisés / fond gradient bleu-violet. Le hero est typographique pur, supporté par la grille.
- **Don't** utiliser des icônes colorées arrondies dans une grille 3×3 pour présenter les services. C'est l'anti-pattern explicite de PRODUCT.md.
- **Don't** utiliser glassmorphism décoratif (blur+saturation hors nav island). La nav peut, le reste non.
- **Don't** italiser. Sauf comments dans code-blocks.
- **Don't** styler en em-dash (`—`) abusivement dans le copy ; le système préfère les virgules et les points. (Note : les em-dashes restent acceptés dans la documentation et le code, c'est le copy site qui les évite.)
- **Don't** introduire `#FFFFFF` ou `#000000` purs. Tout neutre est tinted-violet.
