---
name: Lilian Sevoumian
description: Opinionated no-code expert — site as proof-of-work. Monochrome zinc (Vercel-grade), gutter-grid texture, soft-card depth, mono-as-texture.
colors:
  paper: "oklch(0.995 0.002 290)"
  ink: "oklch(0.16 0.008 290)"
  ink-soft: "oklch(0.22 0.008 290)"
  ink-mid: "oklch(0.40 0.006 290)"
  ink-low: "oklch(0.48 0.005 290)"
  ink-faint: "oklch(0.78 0.004 290)"
  divider: "oklch(0.94 0.004 290)"
  border-strong: "oklch(0.66 0.005 290)"
  surface-low: "oklch(0.975 0.003 290)"
  grid-line: "oklch(0.93 0.005 290)"
  # Monochrome total (refonte juin 2026) : aucun accent coloré.
  # Les tokens --color-violet*/--color-ember* existent encore dans global.css
  # mais pointent vers ink / surface-low (neutralisés) — voir le commentaire @theme.
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
    backgroundColor: "{colors.surface-low}"
    textColor: "{colors.ink}"
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

**Creative North Star: "The Operator's Console" — monochrome façon Vercel**

Le site doit ressembler à l'outil que Lilian *utiliserait* — pas à la plaquette qu'il *vendrait*. Densité technique d'un dashboard infra (Vercel, Modal, Plain), tenue par une mono qui sert de texture et une grille de gouttière qui vit au bord de la page. Il n'y a **aucune couleur d'accent** : tout est noir, blanc et gris tinté zinc. Le contraste et la hiérarchie viennent du **poids typographique**, de la **taille** et de l'**espace** — jamais de la teinte. Pas d'atmosphère. La lisibilité, l'alignement et la motion *sont* l'atmosphère. Référence : « Vercel pure black monochrome ».

Ce système rejette explicitement : le ton chaleureux d'agence (cream, terracotta, ombres colorées 3D, polices arrondies humanistes), le hero gradient bleu/violet générique, les grilles 3×3 d'icônes, le glassmorphism décoratif, et — depuis la refonte monochrome — **tout accent coloré** (l'ancien violet n8n et l'ember Anthropic sont supprimés). Si l'écran ressemble à un site de freelance que tu as déjà vu, il est faux.

L'élément signature est la **grille de gouttière** : un quadrillage 1px de couleur `grid-line` espacé de 96px, confiné aux **marges latérales** (gouttières) hors de la colonne de contenu, fondu en plusieurs patchs radiaux à hauteurs irrégulières qui « fleurissent » par endroits. Elle ne décore pas le contenu, elle **encadre** la colonne et signe une texture organique au bord de l'écran. C'est l'IDE rendu visible, repoussé dans les marges.

**Key Characteristics:**

- Papier presque blanc + encre presque noire (jamais `#FFF` ni `#000` ; tout tinté zinc `oklch(_ _ 290)`, chroma résiduelle ≤0.008).
- Monochrome total : zéro accent coloré. Hiérarchie portée par le poids, la taille et l'espace.
- Grille de gouttière 1px confinée aux marges, fondue en patchs radiaux organiques, masquée sous 640px.
- Profondeur douce : les cards portent une ombre légère (`--shadow-card`) qui se renforce au hover.
- Mono `JetBrains Mono` comme texture : labels, chiffres, captions, code, métadonnées. `Geist` pour les titres et le corps.
- Motion choreographed : reveals scroll-driven + écoulement/parallaxe des grilles de gouttière, 100 % CSS, coupé en `prefers-reduced-motion`.
- Densité avant air : on remplit la colonne, on ne fuit pas le contenu.

## 2. Colors: Monochrome tinté zinc

Palette **monochrome totale** : aucun accent coloré. Uniquement des neutres tintés zinc (hue 290), du papier presque blanc à l'encre presque noire. Tout neutre porte une chroma résiduelle de 0.002–0.008 vers le zinc — c'est imperceptible isolément, c'est ce qui empêche l'ensemble de tomber dans le gris industriel froid. La hiérarchie ne vient jamais de la teinte : elle vient du **poids**, de la **taille** et de l'**espace**.

> **Note tokens accent.** Les tokens `--color-violet*` et `--color-ember*` existent encore dans `global.css` mais sont **neutralisés** : ils pointent désormais vers `ink` / `surface-low` (voir le commentaire dans le bloc `@theme`). Plus aucun accent coloré n'est rendu. Pour réintroduire UN signal unique plus tard, il suffirait de redéfinir un seul de ces tokens avec une vraie valeur OKLCH.

### Neutral (toute la palette)

- **Paper** (`oklch(0.995 0.002 290)`): surface de fond principale. Près du blanc pur, infime tint zinc pour cohérence avec l'encre.
- **Ink** (`oklch(0.16 0.008 290)`): texte principal et fond des sections sombres ponctuelles. Près du noir, tinted zinc — à 0.16 lightness c'est presque indiscernable mais résolument pas industriel.
- **Ink Soft** (`oklch(0.22 0.008 290)`): hover state du `btn-primary`, légèrement plus clair que ink.
- **Ink Mid** (`oklch(0.40 0.006 290)`): texte secondaire, labels mono, intitulés de card. (WCAG AA sur paper.)
- **Ink Low** (`oklch(0.48 0.005 290)`): texte tertiaire, kickers de section, métadonnées, timestamps, captions. (WCAG AA sur paper.)
- **Ink Faint** (`oklch(0.78 0.004 290)`): texte décoratif, watermarks, placeholder, thumb de scrollbar. **Décoratif uniquement** — ne pas utiliser pour du texte porteur de sens (sous WCAG AA).
- **Divider** (`oklch(0.94 0.004 290)`): bordures de cards, séparateurs entre sections, lignes 1px structurantes les plus discrètes. Éclairci dans la refonte monochrome.
- **Border Strong** (`oklch(0.66 0.005 290)`): bordure d'élément interactif au repos qui doit passer ≥3:1 vs paper (WCAG 1.4.11 non-text), ex. les items de FAQ.
- **Grid Line** (`oklch(0.93 0.005 290)`): lignes de la grille de gouttière. Très proche de `divider` — niveau d'intensité quasi identique.
- **Surface Low** (`oklch(0.975 0.003 290)`): fonds différenciés (code-blocks, sections paires alternées si besoin), barely-visible.

### Sémantique (hors palette monochrome)

- **Error** (`oklch(0.55 0.22 25)`): bordure et helper text d'erreur de formulaire uniquement. Jamais décoratif.
- **Success** (`oklch(0.52 0.15 148)`): confirmation d'état (envoi de formulaire réussi) uniquement.

### Named Rules

**The Monochrome Rule.** Aucune teinte d'accent, jamais. Le contraste et la hiérarchie se construisent par le poids typographique (400 → 500 → 600), la taille et l'espace — pas par la couleur. Si tu veux faire ressortir un élément, tu l'alourdis, tu l'agrandis ou tu lui donnes de l'air, tu ne le colores pas. Seuls `error` et `success` portent une teinte, et strictement pour un état système.

**The Tinted-Neutral Rule.** Tout neutre porte une chroma résiduelle vers zinc (hue 290). Pas de `#FFFFFF`, pas de `#000000`, jamais. Le gris industriel pur (`oklch(0.5 0 0)`) est interdit — il aplatit la cohérence de l'ensemble.

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
- **Mono Label** (`JetBrains Mono 500`, `0.75rem`, `letter-spacing: 0.02em`, **uppercase**): kickers de section (`ROI`, `CAS CLIENTS`), tags, badges, pied de card, liens de nav. La voix technique du système.
- **Mono Body** (`JetBrains Mono 400`, `0.8125rem`, `line-height: 1.6`): code-blocks, snippets de scenarios n8n, configs JSON visibles.
- **Mono Caption** (`JetBrains Mono 500`, `0.6875rem`, `letter-spacing: 0.04em`, **uppercase**): captions, métadonnées (dates, durées, IDs), légendes de grille.

### Named Rules

**The Mono-as-Voice Rule.** JetBrains Mono ne décore jamais — elle structure. Tout label, tout chiffre que l'on veut tagué "donnée" (durées, pourcentages, IDs, tools, dates) passe en mono. Geist porte la prose ; mono porte la donnée. Si on hésite entre les deux pour un nombre, c'est mono.

**The No-Italic Rule.** Pas d'italique. Pour l'emphase, on utilise le **poids** (400 → 500 → 600) ou la **taille** — jamais la couleur (le système est monochrome). L'italique adoucit ; le système refuse l'adoucissement. Seule exception historique : les comments dans les code-blocks.

**The Section-Kicker Rule.** Chaque section porte un petit kicker mono (le label, ex. `ROI`, `CAS CLIENTS`) en `mono-caption`, color `ink-low`, avant le headline. Pas de numéro `01`, `02`, … (supprimés dans la refonte) et pas de flash de couleur au scroll-in : le kicker est statique. Métaphore d'IDE/console, signature visuelle discrète avec un coût d'implémentation nul.

## 4. Elevation

**Profondeur douce, façon Vercel.** La refonte abandonne le flat-no-shadow pur : les cards portent désormais une **ombre légère** qui les détache du papier sans tomber dans le SaaS générique. L'ombre est très diffuse et quasi achromatique (encre tintée zinc à faible opacité), jamais colorée, jamais portée par un translate-Y.

Deux tokens d'ombre, et eux seuls :

- **`--shadow-card`** (`0 1px 2px -1px oklch(0.16 0.02 290 / 0.05), 0 10px 28px -14px oklch(0.16 0.02 290 / 0.12)`): élévation au repos des cards et des items de FAQ. Double couche : un contact net 1px + une diffusion large très légère.
- **`--shadow-card-hover`** (`0 2px 4px -1px oklch(0.16 0.02 290 / 0.06), 0 16px 40px -16px oklch(0.16 0.02 290 / 0.16)`): élévation renforcée au hover/focus des cards interactives. L'ombre grandit, la card ne bouge pas.

La hiérarchie et l'état passent par **trois mécanismes combinés**, dans cet ordre :

1. **Ombre douce qui se renforce** — au hover d'une card interactive, `--shadow-card` passe à `--shadow-card-hover`. La profondeur augmente, sans lift. C'est le signal d'interactivité principal.
2. **Bordure qui se durcit** — les bordures statiques `divider` passent à `ink-faint` au hover, et le focus est porté par un outline en encre (jamais une bordure colorée). Le contour appuie l'ombre.
3. **Surface qui se différencie** — `paper` ↔ `surface-low` pour départager deux zones spatiales. Pour les surfaces flottantes (dropdown, popover, modal), on combine bordure `ink-faint` + ombre `--shadow-card` + fond `paper` opaque solide.

### Focus Indicator (le seul "ring")

- **Focus ring encre** (`outline: 2px solid var(--color-ink); outline-offset: 2px`): focus visible sur tout élément interactif. Le token utilisé dans `global.css` reste `--color-violet`, mais celui-ci pointe vers `--color-ink` (neutralisé) — le ring est donc en **encre**. C'est un **outline**, pas une `box-shadow`. Il ne projette pas, il encadre.

### Named Rules

**The Soft-Depth Rule.** Les cards portent une ombre douce (`--shadow-card`) qui se renforce au hover (`--shadow-card-hover`). L'ombre est diffuse, quasi achromatique, à faible opacité — jamais colorée, jamais dure, jamais un drop-shadow SaaS marqué. Toute nouvelle profondeur réutilise ces deux tokens, on n'invente pas d'ombre ad-hoc.

**The No-Lift Rule.** L'interactivité se signale par **l'ombre qui grandit**, pas par un `translate-Y`. La card reste à sa place ; seule sa profondeur change. Aucune translation verticale au hover.

**The Border-Carries-State Rule.** L'état d'un composant (rest / hover / active / focus) se lit dans **la couleur de sa bordure** + **l'intensité de son ombre**. `divider` → `ink-faint` (hover) ; le focus ajoute un outline encre. Les transitions d'état sont des transitions de `border-color` et de `box-shadow`, jamais d'une teinte d'accent.

**The Floating-Surfaces-Are-Bordered Rule.** Pour les dropdowns, popovers, modals, nav fixe : on les détache de la page par une **bordure 1px `ink-faint`** + un fond opaque `paper` (+ `--shadow-card` pour les surfaces flottantes). La nav scrolled peut garder un `backdrop-filter` blur léger pour la transparence du fond ; aucune autre surface n'a de blur décoratif.

## 5. Components

### Buttons

- **Shape:** rectangulaires à coins légèrement adoucis, `4px` (`rounded.sm`). Pas de pill par défaut — la pill est réservée aux chips.
- **Primary:** fond `ink` (`oklch(0.16 0.008 290)`), texte `paper`, typo `mono-label` (uppercase, tracking 0.02em), padding `11px 18px`. Pas d'ombre sur les boutons (l'ombre douce est réservée aux cards).
- **Hover:** fond `ink-soft` (`oklch(0.22 0.008 290)`, légèrement plus clair), transition `200ms ease-out-quint`. **Pas de translate, pas de lift.**
- **Focus visible:** `outline: 2px solid ink; outline-offset: 2px`. Pas de box-shadow.
- **Active:** scale `0.98`, transition `100ms`.
- **Ghost:** fond transparent, texte `ink`, typo `mono-label`, bordure `1px solid divider` ; hover : bordure `ink-faint` + fond `surface-low`. Pour CTA secondaires.
- **Icon-only:** `36×36px` carré, icon Lucide stroke 1.5, padding `0`.

### Chips (Outils, tags)

- **Style:** fond transparent, texte `ink-mid`, typo `mono-caption`, bordure `1px solid divider`, radius `9999px` (full pill). Padding `4px 10px`.
- **Active / variantes:** tous les chips sont **neutres et identiques**. Les anciennes variantes `chip-violet` et `chip-ember` existent encore comme classes mais leurs tokens de fond/texte (`violet-soft`/`violet-deep`, `ember-soft`/`ember-deep`) pointent vers des neutres (`surface-low` / `ink`) — il n'y a plus de différenciation par couleur. Plus aucun mapping sémantique outil → couleur.
- **Variante `chip-dashed`:** bordure en pointillés, texte `ink-low`. Pour signaler un item placeholder/à venir.
- **Hover (non-actif):** texte `ink`, bordure `ink-faint`, fond `surface-low`.
- **Active (press):** scale `0.98`.

### Cards / Containers

- **Corner Style:** `6px` (`rounded.md`). Plus carré que rond — pas de `12px+`.
- **Background:** `paper` par défaut. `surface-low` pour différenciation latérale.
- **Border:** `1px solid divider` toujours présente, **plus** une ombre douce `--shadow-card`. La bordure + l'ombre définissent la card.
- **Hover (cards interactives, `.card-interactive`):** bordure passe à `ink-faint`, ombre passe à `--shadow-card-hover`, et une **scan line** 1px en **encre** glisse du haut vers le bas de la card (`@keyframes card-scan`, background-position animé pour éviter `overflow:hidden`). Transition `200ms ease-out-quint`. Pas de lift.
- **Utilitaire `.card-soft`:** pour les cards au markup inline (Stack, Offres, ROI) qui n'utilisent pas `.card` mais veulent la même profondeur — applique `--shadow-card` au repos, `--shadow-card-hover` au hover.
- **Internal Padding:** `24px` standard (`.card`), `32px` pour cards principales (`.card-elevated` — case studies hero, pricing).
- **Focus clavier:** `.card-interactive:focus-visible` durcit la bordure à `ink-faint` comme le hover (et déclenche la même scan line).

### Inputs / Fields

- **Style:** fond `paper`, bordure `1px solid divider`, radius `4px`, texte `body` (forcé à `max(16px, …)` pour éviter le zoom auto iOS), padding `10px 14px`.
- **Hover:** bordure `ink-faint`. Pas de fond.
- **Focus:** bordure + `outline: 2px solid ink; outline-offset: 2px` (le token `--color-violet` du CSS pointe vers `ink`). Pas de glow, pas de box-shadow.
- **Placeholder:** `ink-low`.
- **Error:** bordure `oklch(0.55 0.22 25)` (token `error`), helper text mono-caption en `error`. Seule teinte autorisée sur un champ.
- **Mono inputs (numbers, durations):** typo `mono-body`, alignment right pour les valeurs numériques.
- **ROI slider (`.roi-slider`):** track avec fill en **encre** entre min et valeur courante (via `--slider-progress`), thumb `paper` cerclé d'`ink`. Plus de fill violet — tout est monochrome.

### Navigation

- **Style:** nav fixe top, fond `paper / 0.92` + `backdrop-filter: blur(12px)` (juste assez pour la transparence), bordure-bottom `1px solid divider`, hauteur `64px`. **Aucune ombre.** Au scroll, la bordure-bottom s'intensifie à `ink-faint`.
- **Logo:** logo SVG `28×28px` à gauche, mono-caption "LILIAN SEVOUMIAN" à côté.
- **Links:** typo `mono-label`, color `ink-mid` au repos, `ink` en hover / actif (le lien actif passe aussi en poids 600). Pas d'underline animé, **plus de `+` glissant** (retiré dans la refonte) : la nav se contente d'un shift de couleur/poids, comme sur vercel.com.
- **Mobile:** menu plein-écran sur tap burger, links empilés en `headline` (gros, mobile-friendly).

### Code Block

- **Style:** fond `surface-low`, bordure `1px solid divider`, radius `6px`, padding `16px 20px`, typo `mono-body`.
- **Header (optionnel):** mono-caption à gauche (`scenario.json`), bouton copy à droite.
- **Syntax highlight:** **tout en encre** désormais. Les classes existent encore mais sont neutralisées : `.code-key` et `.code-string` rendent en `ink` (leurs tokens `violet-deep`/`ember-deep` pointent vers l'encre), `.code-number` en `ink-mid`, `.code-comment` en `ink-faint italic` (seul cas où l'italique est autorisé — convention de code). La hiérarchie du code se lit au poids et à la teinte de gris, pas à la couleur.

### Signature Component — The Gutter Grid (`.technical-grid`)

Le quadrillage structurel du site, désormais **confiné aux gouttières**. Pas un effet décoratif derrière le contenu : une texture organique qui vit au bord de l'écran, autour de la colonne de contenu.

- **Implementation:** un seul élément `.technical-grid` (dans `Layout.astro`) en `position: absolute; inset: 0; pointer-events: none; overflow: hidden`. Il calcule la largeur de la colonne de contenu (`min(1200px, 100% - 2 × spacing-section-x)`) et la largeur de gouttière qui en découle. Deux pseudo-éléments `::before` (gouttière gauche) et `::after` (gouttière droite) portent le vrai quadrillage 96px (`linear-gradient` 1px en `grid-line`, `background-size: 96px`).
- **Texture organique:** chaque gouttière est masquée par **plusieurs patchs radiaux** à hauteurs irrégulières (`mask-image` empilées), ancrés au bord extérieur (`0%` / `100%`) → la grille « fleurit » à certains endroits et se dissipe avant de toucher le contenu. Gauche et droite sont **décalées** (positions différentes) pour casser la symétrie.
- **Plus de marqueurs `+`:** les anciennes intersections marquées d'un `+` 8px (`grid-corner`) sont **entièrement supprimées** (markup + CSS + JS retirés). Plus aucun marqueur de coin sur les cards.
- **Behavior (motion):** au page-load, fade-in subtil (`grid-fade-in`). Au scroll, les lignes **s'écoulent** verticalement (gauche ↓, droite ↑) et un léger **parallaxe de bloc** joue en sens opposés — 100 % CSS scroll-driven (`animation-timeline: scroll()`), zéro JS, coupé en `prefers-reduced-motion`, dégradation propre si non supporté. C'est la signature de motion « qui prouve la maîtrise » : calme à l'arrêt, vivant au scroll.
- **Responsive:** sous 640px les gouttières sont quasi nulles → les deux pseudo-éléments sont `display: none`, papier nu.
- **Don't:** ne JAMAIS poser un fond gradient ou pattern dot par-dessus, ni faire repasser le quadrillage **derrière** le contenu. La grille reste exclusive et cantonnée aux marges.

### Section Kicker (`.section-number`)

Avant chaque headline de section, un petit kicker mono (le label, ex. `ROI`, `CAS CLIENTS`), color `ink-low`, espacement `tracking 0.04em`, uppercase. **Plus de numéro** `01`, `02`, … et **plus de flash de couleur** au scroll-in (la chorégraphie `section-active` est supprimée). Le kicker est statique. Implémenté via le composant `SectionHeader.astro`. La classe CSS garde le nom historique `.section-number` mais ne rend plus de numéro.

### Hero

Le hero n'est **plus dans une carte bordée** : le titre flotte sur le papier nu (manifesto dé-boxé), avec une chorégraphie de page-load en cascade (`[data-hero-stagger]` : eyebrow → H1 → sous-titre → CTA → microdata). Le portrait de Lilian est en **noir & blanc** (filtre `grayscale`), sa couleur n'étant révélée qu'au survol — cohérent avec le parti monochrome.

## 6. Do's and Don'ts

### Do

- **Do** utiliser `oklch()` pour toute valeur de couleur, jamais hex sauf nécessité tooling. La posture du projet est OKLCH-first.
- **Do** systématiquement passer chiffres, durées, IDs, dates, noms d'outils en `JetBrains Mono` (`mono-label` ou `mono-caption`).
- **Do** ouvrir chaque section par un **kicker mono** (`SectionHeader.astro`, label texte sans numéro) — c'est la signature.
- **Do** poser la grille de gouttière (`Signature Component`) au bord de la page, confinée aux marges, fondue en patchs radiaux organiques. Jamais derrière le contenu.
- **Do** construire toute hiérarchie au **poids** (400 → 500 → 600), à la **taille** et à l'**espace** — jamais à la couleur.
- **Do** utiliser `outline: 2px solid ink; outline-offset: 2px` comme focus ring partout — uniformité d'état actif. **Outline, pas box-shadow.**
- **Do** signaler les hovers de card par : ombre qui se renforce (`--shadow-card` → `--shadow-card-hover`), bordure qui se durcit (`divider` → `ink-faint`), ou scan line encre. Jamais par un translate-Y.
- **Do** réutiliser les deux tokens d'ombre (`--shadow-card`, `--shadow-card-hover`) pour toute profondeur ; ne pas inventer d'ombre ad-hoc, ne pas la colorer.
- **Do** caper la longueur de ligne des paragraphes à 65–72ch.
- **Do** alterner `paper` ↔ `surface-low` pour rythmer les sections, jamais `paper` ↔ couleur saturée.
- **Do** appliquer `text-wrap: balance` sur tous les headlines et `text-wrap: pretty` sur les paragraphes.
- **Do** respecter `prefers-reduced-motion` : l'écoulement/parallaxe des grilles s'arrête, les reveals se figent, mais la palette reste identique.

### Don't

- **Don't** introduire AUCUN accent coloré. Le système est monochrome : aucune teinte violet, ember, bleu, cyan, rose. Seuls `error` et `success` portent une couleur, et strictement pour un état système.
- **Don't** ré-introduire les ombres **colorées** 3D (orange, violet, cyan, rose) du site précédent. Les seules ombres autorisées sont les deux ombres douces quasi achromatiques (`--shadow-card`, `--shadow-card-hover`).
- **Don't** ré-introduire la palette cream / sable / terracotta. Le fond est `paper`, jamais `#F8F7F4`.
- **Don't** utiliser Bricolage Grotesque (typo trop ronde / "créative"). Geist + JetBrains Mono uniquement.
- **Don't** poser un dot-grid radial gris (`.dot-grid`, `.dot-grid-cream`) en background — la grille de gouttière le remplace intégralement.
- **Don't** ré-introduire les marqueurs `+` aux coins des cards (`grid-corner`), ni le paradigme « grid-claims-the-cell » : tout ça est supprimé.
- **Don't** faire repasser le quadrillage **derrière** le contenu (papier millimétré). Il reste cantonné aux gouttières.
- **Don't** utiliser `border-radius` ≥ `12px` — on n'est pas dans le SaaS warm. Max `8px` (`rounded.lg`), `9999px` réservé aux chips.
- **Don't** poser des gradients sur le texte (`background-clip: text`). Interdiction absolue, héritée des bans transversaux.
- **Don't** poser des translate-Y / lift sur les cards en hover. L'ombre se renforce, la card ne bouge pas.
- **Don't** poser un hero dans une carte bordée, ni avec photo casquette / bras croisés / fond gradient. Le hero est typographique dé-boxé sur papier nu ; le portrait est en noir & blanc, couleur révélée au hover.
- **Don't** utiliser des icônes colorées arrondies dans une grille 3×3 pour présenter les services. C'est l'anti-pattern explicite de PRODUCT.md.
- **Don't** utiliser glassmorphism décoratif (blur+saturation hors nav island). La nav peut, le reste non.
- **Don't** italiser. Sauf comments dans code-blocks.
- **Don't** styler en em-dash (`—`) abusivement dans le copy ; le système préfère les virgules et les points. (Note : les em-dashes restent acceptés dans la documentation et le code, c'est le copy site qui les évite.)
- **Don't** introduire `#FFFFFF` ou `#000000` purs. Tout neutre est tinted-zinc.
