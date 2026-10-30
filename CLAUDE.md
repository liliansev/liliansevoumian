# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal brand site for Lilian Sevoumian: the reference point for his track record and everything he does today (client work, videos, newsletter, training, agency). The two offers (automation/AI and websites) stay, in the background. Product truth lives in `PRODUCT.md`. Built with Astro 5.x.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview production build locally
```

## Tech Stack

- **Framework**: Astro 5.x with static output
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite)
- **Icons**: astro-icon with Lucide and Simple Icons
- **Fonts**: Bricolage Grotesque (text, titles and labels) and Gochi Hand (handwritten notes), self-hosted (`@fontsource`), imported by `layouts/Layout.astro` for every page. No monospace since 30 October 2026: `@fontsource/jetbrains-mono` stays in `package.json` only for `scripts/og-carnet` (the share image). The blog alone keeps Geist Variable, imported by `layouts/Carnet.astro`
- **pnpm**: the lockfile and the Dockerfile are pnpm 10.26.2; with an older global pnpm, run `npx -y pnpm@10.26.2 <command>`
- **Language**: French (fr)
- **QA**: agent-browser (headless). Playwright est INTERDIT sur ce projet : désinstallé, ne pas réinstaller, ne pas créer de fichier .spec.ts.

## Architecture

```
src/
├── components/
│   │   # — communs à toutes les pages —
│   ├── Navigation.astro       # la barre, la même partout : nom, liens, un seul bouton « Parlons de votre projet », menu mobile
│   ├── Footer.astro
│   ├── BoutonReservation.astro # le bouton d'appel : mène au formulaire de contact (goal contact_opened) ; `direct` pour l'agenda
│   ├── formulaire-contact.astro # e-mail, nom, message, envoyés par /api/contact (Resend) dans la boîte de Lilian
│   ├── tete-de-page.astro     # en-tête d'une page intérieure : retour, h1, chapô, bouton, preuves
│   ├── partie.astro           # une partie d'une page de lecture : titre à gauche, texte à droite ; `clair` en fait une île claire
│   ├── questions.astro        # la FAQ, la même partout : un accordéon classique, en `details`, sans script
│   ├── fin-de-page.astro      # la fin de chaque page : une phrase, le formulaire de contact, le lien vers l'agenda (prix en une ligne sur l'accueil)
│   ├── pourquoi-moi.astro     # île claire : portrait, notice à la troisième personne, puis « je »
│   ├── retour.astro           # fil de retour d'une page intérieure
│   ├── SectionHeader.astro    # titre + chapô d'une section (ni sur-titre ni filet)
│   ├── LinkCTA.astro          # lien secondaire fléché
│   ├── Outil.astro            # logo + nom d'un outil dans le fil du texte
│   │   # — accueil « Le carnet » (choisi par Lilian le 27 octobre 2026) —
│   ├── carnet/                # l'accueil en carnet d'ingénieur, lu comme un scénario Make : un module coloré par section, un chemin de pointillés entre eux
│   │   ├── carnet.css         # la grammaire, rangée sous `.tenue-carnet` : jetons, voix, pilules, polaroïds, scotch, modules, chemin, cartes
│   │   ├── griffe.astro       # un griffonnage (cœur, vague, icônes) tracé au build par `lib/carnet/griffonnages.ts`
│   │   ├── tete.astro         # l'en-tête d'une section : module (couleur, griffonnage, numéro), titre, chapô ; pas de sur-titre
│   │   ├── barre.astro        # barre collante (nom, sections, « Écrire »), menu plein écran en `dialog`
│   │   ├── ouverture.astro    # le nom, la signature, « S'abonner sur YouTube », l'audience datée (data/parcours.ts, `audience`), le polaroïd du NoCode Summit
│   │   ├── defile.astro       # le défilé des logos des clients, avec son bouton pause (data/clients.ts)
│   │   ├── suivre.astro       # module 1 : dernière vidéo et newsletter en cartes (dernier numéro dans data/derniere-newsletter.ts, inscription /api/newsletter), puis LinkedIn, Augmentés, agenceafk en liens
│   │   ├── adore.astro        # module 2 : « J'adore… », huit autocollants, une couleur par type de travail
│   │   ├── methode.astro      # module 3 : le kanban d'exemple ; un toucher fait avancer une carte, glisser, Entrée et flèches, remise à zéro
│   │   ├── coulisses.astro    # module 4 : quatre polaroïds
│   │   ├── avis.astro         # module 5 : trois citations (celles de documentaire/voix.astro)
│   │   ├── contact.astro      # module 6 (`#ecrire`) : formulaire-contact en habit `carnet`, lien vers l'agenda
│   │   ├── pied.astro         # le pied de l'accueil : le nom en très grand, liens dehors et pages du site, sans année
│   │   └── chemin.astro       # le chemin de pointillés d'un module à l'autre (SVG, à partir de 768 px, là où la gouttière passe à 32 px), qui se colore en violet à la lecture ; les pastilles des modules atteints passent au vert
│   │   # — accueil « Le documentaire » (14 au 27 octobre 2026), plus rendu sur `/` —
│   ├── documentaire/          # les chapitres de l'accueil, lus comme un court documentaire sur Lilian au travail
│   │   ├── documentaire.css   # la grammaire commune : plan et sa lumière, incrustation, sous-titre, carton, crédit, étalonnage
│   │   ├── chapitre.astro     # un chapitre : `data-chapitre` (son nom dans la barre), `data-lueur` (sa teinte), carton et colonne
│   │   ├── ouverture.astro    # « Salut, je m'appelle », le nom, le métier ; le bouton « Parlons de votre projet » à droite ; le plan au bureau en cinémascope, qui s'ouvre une fois ; défilé des logos (id `hero`)
│   │   ├── defile-clients.astro # le défilé des logos des clients, avec son bouton pause (data/clients.ts)
│   │   ├── plan-large.astro   # un plan en cinémascope sur toute la colonne : lumière, incrustation, sous-titre de Lilian, source
│   │   ├── portrait.astro     # « À propos » : portrait et ce qu'il dit, le plan au micro, les faits sans date en carton, ses formations en champ et contrechamp (data/parcours.ts, `faits`)
│   │   ├── contrechamp.astro  # deux plans côte à côte (le champ, le contrechamp), chacun son incrustation, un seul sous-titre
│   │   ├── en-ce-moment.astro # les projets en cours, une affiche chacun : le texte, et le plan qui parcourt le site au survol (data/projets.ts, `enCours`)
│   │   ├── expertises.astro   # les 4 scènes des métiers en une séquence : un grand plan, la liste des plans au-dessus, la phrase en sous-titre (data/metiers.ts)
│   │   ├── publications.astro # la dernière vidéo YouTube et la newsletter (même script que l'ancien home-content)
│   │   ├── filmographie.astro # les projets clients en filmographie, lus dans les cas : un client par ligne, secteur et outils, phrase, lien, workflow en miniature
│   │   ├── voix.astro         # « Ils en parlent » : une citation en grand, le rail des trois personnes à côté (la forme de l'ancien home-voices)
│   │   ├── fin.astro          # la fin : `fin-de-page` sur la nuit, sans maille (id `fin`, chapitre « Contact » ; le générique de fin en est sorti le 14 octobre 2026)
│   │   └── barre-chapitres.astro # la barre de lecture fixe, comme une vidéo à chapitres, et l'étalonnage de la page
│   │   # — accueil d'avant, plus rendus sur `/` —
│   ├── home-hero.astro        # titre centré, bouton d'appel, grille, défilé des logos des clients
│   ├── home-story.astro       # récit en 3 actes + scène ; au bureau le défilement joue les 4 modes, sur mobile deux vues
│   ├── home-services.astro    # 4 métiers (automatisation, agents IA, dashboards et outils métiers, formations) : un nom, une phrase, une ligne, la sortie ; une scène chacun, jouée une fois ; onglets sur téléphone. Ses métiers sont dans `data/metiers.ts`
│   ├── metiers/               # les 4 scènes des métiers + leur socle CSS (scene-metier.css)
│   ├── home-today-path.astro  # « Pourquoi moi » (panneau clair) + frise du parcours
│   ├── home-content.astro     # la dernière vidéo YouTube (relevée par le serveur, voir `data/derniere-video.ts`) + newsletter écrite comme un mail
│   ├── home-voices.astro      # trois recommandations, une voix à la fois, choisie par le visiteur
│   │   # — page d'offre /automatisations-ia —
│   ├── HeroManifesto.astro    # hero : titre, chapô, bouton
│   ├── LogoMarquee.astro      # bandeau d'outils défilant
│   ├── Automatisations.astro  # les tâches qu'on automatise
│   ├── CaseStudy.astro        # carrousel de 3 projets
│   ├── Methode.astro          # 4 étapes, en île claire, + schéma (automation-control-diagram)
│   ├── Testimonials.astro     # recommandations
│   ├── APropos.astro          # trajectoire 2020 → aujourd'hui
│   ├── Stack.astro            # 4 outils (n8n, Make, Notion, Airtable), une ligne d'usage chacun
│   ├── Offres.astro           # formats, prix de création et abonnements, en île claire
│   ├── ROICalculator.astro    # simulateur de temps (2 curseurs)
│   │   # — page d'offre /outils-metiers —
│   ├── SubscriptionGrid.astro # liste de prix à plat (abonnements de /automatisations-ia)
│   ├── ProjectVisual.astro    # vignette d'une réalisation (vitrine des explorations)
│   ├── application-system-diagram.astro
│   │   # — cas clients —
│   ├── mockups/               # MockupWindow (châssis fenêtre), WorkflowCanvas (faux canvas n8n/Make)
│   │   # — hors site —
│   ├── home-sites.astro       # vitrine de trois sites, sortie de l'accueil ; visible sur /explorations-metiers/vitrine
│   └── explorations/          # essais non retenus, page /explorations-metiers
├── content/
│   └── cas-clients/           # 4 cas en .md, frontmatter typé
├── data/                      # metiers.ts (les 4 métiers), projets.ts, faq.ts, home-faq.ts, make-ou-n8n.ts (une seule réponse pour tout le site), maintenance.ts et service-pricing.ts (les prix), parcours.ts, clients.ts, derniere-video.ts, realisations.ts, outils-metiers.ts, brands.ts
├── lib/                       # reservation.ts (agenda, libellé du bouton), contact.ts (adresse de contact), contact-message.ts (envoi du formulaire par Resend), roi.ts, metiers/scene.ts (moteur des scènes), blocs/atelier.ts (formes 3D, hors accueil)
├── layouts/
│   ├── Layout.astro           # SEO, JSON-LD, embed cal.com, défilement vers le formulaire, suivi DataFast
│   ├── PageExpertOutil.astro  # charpente des pages d'outil (/expert-make, /expert-n8n)
│   └── PageReponse.astro      # charpente des pages-réponses (une question, sa réponse dans le chapô)
├── pages/
│   ├── index.astro
│   ├── automatisations-ia.astro   # offre automation complète
│   ├── outils-metiers.astro   # offre outils métiers (dashboards, portails, outils internes), sur devis ; remplace /sites-web-abonnement (redirigée) depuis le 28/10/2026
│   ├── cas-clients/index.astro et [slug].astro
│   ├── expert-make.astro · expert-n8n.astro   # contenu seul, charpente partagée
│   ├── make-ou-n8n.astro · combien-coute-une-automatisation.astro · agent-ia-pour-pme.astro   # pages-réponses
│   ├── reprendre-une-automatisation-qui-casse.astro
│   ├── contact.astro          # le formulaire seul, cible des boutons quand la page n'a pas le sien
│   ├── principes.astro · mentions-legales.astro · 404.astro
│   └── llms.txt.ts            # fiche générée au build pour les moteurs IA
├── content.config.ts          # schéma Zod de la collection
└── styles/
    └── global.css             # jetons @theme, « La tenue commune », dispositif de la DA
(liens/)                       # sorti le 17 octobre 2026 dans le dépôt liliansev/linkinbio : /liens/ est servi
                               # par son propre conteneur (linkinbio-app), Caddy y envoie /liens* avant le site
api/
├── dfst-events.js             # proxy DataFast (cookieless)
├── contact.ts                 # formulaire de contact (délègue à src/lib/contact-message)
└── newsletter.ts              # inscription à la newsletter (délègue à src/lib/newsletter-signup)
```

## Design System

`DESIGN.md` is the source of truth; tokens live in the `@theme` block of
`src/styles/global.css`.

Since 28 October 2026 every page but the blog wears « Le carnet » (see
below): `Layout` wraps the page in `.tenue-carnet` and loads
`components/carnet/carnet.css` and its two fonts; `Navigation` and `Footer`
render the carnet's `barre` and `pied`. The `@theme` tokens kept their old
names but carry carnet values (`--color-paper` = paper `#f6f2e8`,
`--color-ink` and `--color-night` = ink `#1d1a22`, `--color-peche` /
`--color-accent` = lilac `#b59cff` as a surface, `--color-accent-text` =
violet `#6a3df5`, fonts = Bricolage Grotesque, mono = Bricolage too,
`--shadow-card` empty); the last block of `global.css` (« LE CARNET SUR TOUT
LE SITE ») restyles what a token cannot: caps headings, a flat ink call pill,
violet `mark`, and `.bloc-encre` as a white sheet with an ink border, no
shadow. The carnet's object classes (`pilule`, `caps`, `meta`, `tete`…) are
scoped under `.carnet-ui` (home, barre, pied, contact form) because inner
components reuse those short names. The blog (`layouts/Carnet.astro`, an
older name) keeps its white Geist look and passes `carnet={false}`.

The list below is the former « nuit et pêche » system (3 to 28 October
2026). Its structural rules still hold (one call button, islands, shared
components, measure, motion); its colours and type no longer do:

- Background: deep night `#0c121f` everywhere (`--color-paper`); white text,
  greys tinted toward the night. `#111827` is `--color-night`
- One accent: peach `#ffb38a` (highlight, primary button, focus ring)
- Any text placed ON peach reads `--color-night`, never `--color-ink` (white)
- No full-width colour bands. Light only in `.bloc-encre`, a rounded island
  that remaps every colour token: it carries what the reader came to check
  (a price, results, a method, "pourquoi moi"). At most two per page, never
  two in a row, never the first or the last section
- No sharp corners: radius scale `--radius-xs` to `--radius-xl`, pill controls
- Headings `h1`–`h4` at weight 500; `mark` is a peach underline under a
  fragment of a title (it wraps with the text), one per title. The filled
  peach pill is the call button and nothing else (8 October 2026)
- No uppercase styling, no eyebrow above a heading, no section numbers
- Measure: in Geist `1ch` is about one and a half characters of prose, so
  `46ch` is a 70-character line (base rule on `p, li`)
- Motion: the underline is drawn once (`<mark>`), a page header enters once
  (`.entree`), media open with the scroll (`.media-ouvre`), pages cross-fade.
  On the former home page (« Le documentaire ») a movement played once and
  stopped. One loop remains by choice, with its pause
  control: the client logo marquee of the first screen. The tool marquee of
  `/automatisations-ia` is the other loop on the site

Typography:
- One family: Geist (`--font-display`, `--font-body`); no monospace

Every page is built from the shared components: `Navigation`, `tete-de-page`
(or its own hero on the home and offer pages), sections, `questions`,
`fin-de-page`, `Footer`. Reading pages use `partie`. A new inner page must not
hand-roll a header, an FAQ, a contact section or a back link.

Home page only (« Le carnet », 27 October 2026): a brand page, not a services
brochure (no prices, no prestation figures). An engineer's notebook on plain
paper: ink lines, flat surfaces, four vivid colours that code the type of
work (pink AI agent, lilac automation, blue business tool, yellow training)
and each section's module, mint for contact, handwritten notes (Gochi Hand),
condensed caps titles and bold labels (Bricolage Grotesque). The page reads
as a Make scenario: numbered round modules, left-aligned on the content edge,
joined by a dotted path through the margins. Since the taste review of 30
October 2026 (DESIGN.md, *L'accueil : le carnet*): no grid paper, no
monospace, a solid offset shadow on the polaroids only, and a seven-step type
scale in `carnet.css` (14, 17, 21, 28, 42, 77, 150 px on desktop); do not add
a size outside it. First gesture: « S'abonner sur
YouTube »; the contact form closes the page. Dated audience figures as social
proof, never the newsletter subscriber count. Grammar in
`src/components/carnet/carnet.css`; DESIGN.md, *L'accueil : le carnet*.
Inner pages wear the carnet's base since 28 October 2026 (papier, encre,
titles, pills), without its modules and dotted path.

Previous home (« Le documentaire », 14 to 27 October 2026, components kept
in `src/components/documentaire/`): the page read as a
short documentary about Lilian at work. Large rounded shots of real photos
of him that cast their light on the night, lower-thirds (name and role under
a peach line), centred peach-light subtitles, big chapter titles, a fixed
chapter bar like a YouTube progress bar, and a page grade (two fixed glows)
whose hue follows the chapter. Grammar in
`src/components/documentaire/documentaire.css`. Only real photos of Lilian
appear there; the generated work scenes never do. Lilian's own subtitles are
peach-light; other people's words (testimonials) are white, one quote at a
time beside a rail of the three people. One animated 2D interface scene per service, played as shots of
one sequence (`documentaire/expertises.astro`; scenes in
`src/components/metiers/`, engine in
`src/lib/metiers/scene.ts`; the glass 3D shapes only remain on
`/explorations-blocs`).

## Key Implementation Notes

- Un seul geste sur tout le site : « Parlons de votre projet » mène au
  formulaire de contact (14 octobre 2026 : la conversation `home-invite` est
  retirée, jugée trop compliquée par Lilian). Tout bouton d'appel passe par
  `BoutonReservation` : sa prop `source` est requise, et c'est ce qui garantit
  que le goal `contact_opened` est posé avec sa provenance. Un `<a>` écrit à la
  main vers cal.com ouvre bien l'agenda mais n'apparaît dans aucun funnel. Le
  seul lien direct vers l'agenda est « Réservez un appel », sous le formulaire
  (`direct`, goal `lead_call`). L'envoi demande `RESEND_API_KEY` dans
  l'environnement du serveur (voir `deploy/README.md`). Hors composant (réponses de
  FAQ, llms.txt), l'URL vient de `lib/reservation.ts`. Voir `DATAFAST-FUNNEL.md`.
- Un fait, une source : les prix se lisent dans `data/service-pricing.ts` et
  `data/maintenance.ts`, la réponse « Make ou n8n » dans `data/make-ou-n8n.ts`,
  le parcours dans `data/parcours.ts`. Rien ne s'écrit sur une page qui ne soit
  dans `PRODUCT.md` (« Evidence on Hand »).
- L'accueil ne nomme aucun client à la main. Le défilé des logos les cite
  tous, depuis `data/clients.ts` ; le pied de page mène à l'index des cas
  (`/cas-clients`), jamais à un cas en particulier.
- La dernière vidéo YouTube est relevée par le serveur de production
  (`deploy/server.mjs`, `/api/derniere-video`, flux des vidéos longues) et la
  page la remplace d'elle-même : rien à faire à chaque publication.
- Ne jamais citer les marqueurs `{/*` et `*/}` littéralement à l'intérieur d'un
  commentaire : le `*/` interne le referme, et la fin du texte est rendue comme
  du contenu. Écrire ce genre de note en commentaires de ligne, dans le
  frontmatter.
- All text content is in French
- A brand home, two offer pages (automation, business tools; no more websites since 28 October 2026), tool pages, answer pages and case studies
- JSON-LD structured data for SEO (Person + ProfessionalService schemas)
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Custom scrollbar styling and infinite scroll animations in global.css
- Site URL: https://liliansevoumian.fr
