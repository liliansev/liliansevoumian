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
- **Fonts**: Geist Variable, self-hosted (`@fontsource-variable/geist`); no monospace
- **Language**: French (fr)
- **QA**: agent-browser (headless). Playwright est INTERDIT sur ce projet : désinstallé, ne pas réinstaller, ne pas créer de fichier .spec.ts.

## Architecture

```
src/
├── components/
│   │   # — communs à toutes les pages —
│   ├── Navigation.astro       # la barre, la même partout : nom, liens, un seul bouton « Parlons de votre projet », menu mobile
│   ├── Footer.astro
│   ├── BoutonReservation.astro # le bouton d'appel : ouvre la conversation (goal causerie_opened) ; `direct` pour l'agenda
│   ├── home-invite.astro      # la barre d'écriture et sa conversation (WhatsApp, e-mail, agenda), rendue par Layout sur toutes les pages, sans serveur
│   ├── tete-de-page.astro     # en-tête d'une page intérieure : retour, h1, chapô, bouton, preuves
│   ├── partie.astro           # une partie d'une page de lecture : titre à gauche, texte à droite ; `clair` en fait une île claire
│   ├── questions.astro        # la FAQ, la même partout : un accordéon classique, en `details`, sans script
│   ├── fin-de-page.astro      # la fin de chaque page : une phrase, un champ, le bouton (prix en une ligne sur l'accueil)
│   ├── pourquoi-moi.astro     # île claire : portrait, notice à la troisième personne, puis « je »
│   ├── retour.astro           # fil de retour d'une page intérieure
│   ├── SectionHeader.astro    # titre + chapô d'une section (ni sur-titre ni filet)
│   ├── LinkCTA.astro          # lien secondaire fléché
│   ├── Outil.astro            # logo + nom d'un outil dans le fil du texte
│   │   # — accueil —
│   ├── home-hero.astro        # titre centré, emplacement de la barre d'écriture, grille, défilé des logos des clients
│   ├── home-story.astro       # récit en 3 actes + scène ; au bureau le défilement joue les 4 modes, sur mobile deux vues
│   ├── home-services.astro    # 4 métiers (automatisation, agents IA, dashboards et outils métiers, formations) : un nom, une phrase, une ligne, la sortie ; une scène chacun, jouée une fois ; onglets sur téléphone
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
│   │   # — page d'offre /sites-web-abonnement —
│   ├── SubscriptionGrid.astro # liste de prix à plat (sert aussi à Offres)
│   ├── ProjectVisual.astro    # vignette d'une réalisation
│   ├── application-system-diagram.astro
│   │   # — cas clients —
│   ├── mockups/               # MockupWindow (châssis fenêtre), WorkflowCanvas (faux canvas n8n/Make)
│   │   # — hors site —
│   ├── home-sites.astro       # vitrine de trois sites, sortie de l'accueil ; visible sur /explorations-metiers/vitrine
│   └── explorations/          # essais non retenus, page /explorations-metiers
├── content/
│   └── cas-clients/           # 4 cas en .md, frontmatter typé
├── data/                      # faq.ts, home-faq.ts, make-ou-n8n.ts (une seule réponse pour tout le site), maintenance.ts et service-pricing.ts (les prix), parcours.ts, clients.ts, derniere-video.ts, realisations.ts, sites-web.ts, brands.ts
├── lib/                       # reservation.ts (agenda, libellé du bouton), contact.ts (e-mail et WhatsApp), roi.ts, metiers/scene.ts (moteur des scènes), blocs/atelier.ts (formes 3D, hors accueil)
├── layouts/
│   ├── Layout.astro           # SEO, JSON-LD, embed cal.com, barre d'écriture, suivi DataFast
│   ├── PageExpertOutil.astro  # charpente des pages d'outil (/expert-make, /expert-n8n)
│   └── PageReponse.astro      # charpente des pages-réponses (une question, sa réponse dans le chapô)
├── pages/
│   ├── index.astro
│   ├── automatisations-ia.astro   # offre automation complète
│   ├── sites-web-abonnement.astro # offre web complète
│   ├── cas-clients/index.astro et [slug].astro
│   ├── expert-make.astro · expert-n8n.astro   # contenu seul, charpente partagée
│   ├── make-ou-n8n.astro · combien-coute-une-automatisation.astro · agent-ia-pour-pme.astro   # pages-réponses
│   ├── reprendre-une-automatisation-qui-casse.astro
│   ├── principes.astro · mentions-legales.astro · 404.astro
│   └── llms.txt.ts            # fiche générée au build pour les moteurs IA
├── content.config.ts          # schéma Zod de la collection
└── styles/
    └── global.css             # jetons @theme, « La tenue commune », dispositif de la DA
api/
├── dfst-events.js             # proxy DataFast (cookieless)
└── newsletter.ts              # inscription à la newsletter (délègue à src/lib/newsletter-signup)
```

## Design System

`DESIGN.md` is the source of truth; tokens live in the `@theme` block of
`src/styles/global.css`. In short ("nuit et pêche", "tech propre"; the home
page direction of 2 October 2026 was extended to every page on 3 October 2026,
see *La tenue commune* in `global.css` and `DESIGN.md`):

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
  On the home page a movement plays once and stops (8 October 2026): the four
  service scenes rest on their final image, quotes and the writing bar stay
  still. Two loops remain by choice, each with its pause control: the client
  logo marquee of the first screen (Lilian asked for it back the same day) and
  the story scene, whose mode follows the scroll on a desktop. The tool marquee of `/automatisations-ia`
  is the one loop left on the site

Typography:
- One family: Geist (`--font-display`, `--font-body`); no monospace

Every page is built from the shared components: `Navigation`, `tete-de-page`
(or its own hero on the home and offer pages), sections, `questions`,
`fin-de-page`, `Footer`. Reading pages use `partie`. A new inner page must not
hand-roll a header, an FAQ, a contact section or a back link.

Home page only: everything laid on a grid with two page-level frame lines
(`.accueil__suite` in `src/pages/index.astro`), one animated 2D interface
scene per service (`src/components/metiers/`, engine in
`src/lib/metiers/scene.ts`; the glass 3D shapes only remain on
`/explorations-blocs`).

## Key Implementation Notes

- Un seul geste sur tout le site : « Parlons de votre projet » ouvre la
  conversation de `home-invite` (WhatsApp, e-mail ou appel). Tout bouton d'appel
  passe par `BoutonReservation` : sa prop `source` est requise, et c'est ce qui
  garantit que le goal `causerie_opened` est posé avec sa provenance. Un `<a>`
  écrit à la main vers cal.com ouvre bien l'agenda mais n'apparaît dans aucun
  funnel. Le seul lien direct vers l'agenda est le moyen « Réserver un appel »
  de la conversation (`direct`, goal `lead_call`). Hors composant (réponses de
  FAQ, llms.txt), l'URL vient de `lib/reservation.ts`. Voir `DATAFAST-FUNNEL.md`.
- Un fait, une source : les prix se lisent dans `data/service-pricing.ts` et
  `data/maintenance.ts`, la réponse « Make ou n8n » dans `data/make-ou-n8n.ts`,
  le parcours dans `data/parcours.ts`. Rien ne s'écrit sur une page qui ne soit
  dans `PRODUCT.md` (« Evidence on Hand »).
- L'accueil ne nomme aucun client dans son récit ni dans ses quatre métiers, et
  aucun de ses blocs ne mène à un cas précis : un cas change, la page ne doit
  pas en dépendre. Les cas ont leur page ; la seule sortie de l'accueil vers
  eux est le lien vers leur index, sous les recommandations.
- La dernière vidéo YouTube est relevée par le serveur de production
  (`deploy/server.mjs`, `/api/derniere-video`, flux des vidéos longues) et la
  page la remplace d'elle-même : rien à faire à chaque publication.
- Ne jamais citer les marqueurs `{/*` et `*/}` littéralement à l'intérieur d'un
  commentaire : le `*/` interne le referme, et la fin du texte est rendue comme
  du contenu. Écrire ce genre de note en commentaires de ligne, dans le
  frontmatter.
- All text content is in French
- A narrative home, two offer pages, tool pages, answer pages and case studies
- JSON-LD structured data for SEO (Person + ProfessionalService schemas)
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Custom scrollbar styling and infinite scroll animations in global.css
- Site URL: https://liliansevoumian.fr
