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
- **Fonts**: Geist, Geist Mono (Google Fonts)
- **Language**: French (fr)
- **QA**: agent-browser (headless). Playwright est INTERDIT sur ce projet : désinstallé, ne pas réinstaller, ne pas créer de fichier .spec.ts.

## Architecture

```
src/
├── components/
│   ├── Navigation.astro       # nav + menu mobile + overlay cal.com
│   ├── home-hero.astro        # accueil : titre seul centré, grille, défilé clients
│   ├── home-story.astro       # accueil : récit en 3 actes + scène (à la main, puis automatisation, agent IA, dashboard)
│   ├── home-services.astro    # accueil : 4 métiers, une scène d'interface animée chacun
│   ├── home-sites.astro       # accueil : trois sites dans des fenêtres de navigateur où la page défile
│   ├── metiers/               # les 4 scènes des métiers + leur socle CSS (scene-metier.css)
│   ├── explorations/          # essais non retenus (bureau, plateau, terminal, plan), page /explorations-metiers
│   ├── home-today-path.astro  # accueil : « Pourquoi moi » + frise du parcours
│   ├── home-content.astro     # accueil : dernière vidéo + newsletter écrite comme un mail
│   ├── home-voices.astro      # accueil : trois recommandations, une voix à la fois
│   ├── home-offers.astro      # accueil : fin de page, appel + prix en une ligne
│   ├── Home*.astro (PascalCase) # ancienne home, plus importés nulle part
│   ├── HeroManifesto.astro    # aplat lime, typographie seule
│   ├── LogoMarquee.astro      # bandeau d'outils défilant
│   ├── CaseStudy.astro        # carrousel des 4 cas sur la home
│   ├── Testimonials.astro     # recommandations
│   ├── APropos.astro          # trajectoire 2020 → aujourd'hui
│   ├── ROICalculator.astro    # simulateur de temps (2 curseurs)
│   ├── Stack.astro            # 10 outils en 4 familles, un appel par famille
│   ├── Offres.astro           # formats de collaboration
│   ├── FAQ.astro              # 7 objections + balayage lime
│   ├── CTA.astro              # section contact, réservation seule
│   ├── Footer.astro
│   ├── MobileCTABar.astro     # barre fixe sous le hero, mobile
│   ├── SectionHeader.astro    # label + titre + chapô, partagé
│   ├── LinkCTA.astro          # lien secondaire fléché
│   ├── BoutonReservation.astro # TOUT lien vers l'agenda passe par ici
│   ├── Outil.astro            # logo + nom d'un outil dans le fil du texte
│   └── mockups/               # mini-UI produit des cartes outils
│       ├── MockupWindow.astro     # châssis fenêtre commun
│       ├── WorkflowCanvas.astro   # faux canvas n8n/Make
│       └── Stack*.astro           # une maquette par outil
├── content/
│   └── cas-clients/           # 4 cas en .md, frontmatter typé
├── data/                      # brands.ts, faq.ts, clients.ts, realisations.ts, parcours.ts
├── lib/                       # roi.ts, reservation.ts, metiers/scene.ts (moteur des scènes), blocs/atelier.ts (formes 3D, hors accueil)
├── layouts/
│   ├── Layout.astro           # SEO, JSON-LD, embed cal.com, failsafe reveal
│   └── PageExpertOutil.astro  # charpente commune des pages SEO par outil
├── pages/
│   ├── index.astro
│   ├── automatisations-ia.astro  # offre automation complète, ancienne home
│   ├── sites-web-abonnement.astro # offre web complète
│   ├── cas-clients/index.astro et [slug].astro
│   ├── expert-make.astro · expert-n8n.astro   # contenu seul, charpente partagée
│   ├── principes.astro · mentions-legales.astro
│   └── llms.txt.ts            # fiche générée au build pour les moteurs IA
├── content.config.ts          # schéma Zod de la collection
└── styles/
    └── global.css             # jetons @theme + dispositif de la DA
api/
└── dfst-events.js             # proxy DataFast (cookieless)
```

## Design System

`DESIGN.md` is the source of truth; tokens live in the `@theme` block of
`src/styles/global.css`. In short ("nuit et pêche", October 2026):

- Background: night blue `#111827`; white text, greys tinted toward the night
- One accent: peach `#ffb38a` (highlights, CTAs, accent text, focus ring)
- Any text placed ON peach reads `--color-night`, never `--color-ink` (white)
- Light only in the inverted panel `.bloc-encre` (a rounded island);
  `.bloc-lime` is a raised night band. Both class names are legacy
- No sharp corners: radius scale `--radius-xs` to `--radius-xl`, pill controls
- Motion: traced highlighter (`<mark>`), hero entrance (`.entree`),
  scroll-opened media (`.media-ouvre`), cross-page view transitions

Typography:
- One family: Geist (`--font-display`, `--font-body`); no monospace

Home page only ("tech propre", validated 2 October 2026; see the section
*L'accueil* in `DESIGN.md`): deep night `#0c121f`, everything laid on a grid,
two page-level frame lines, `mark` as a straight pill, `h2`/`h3` at weight 500,
one animated 2D interface scene per service (`src/components/metiers/`, engine
in `src/lib/metiers/scene.ts`; the glass 3D shapes were dropped on 3 October
2026 and only remain on `/explorations-blocs`). These
rules live in the `.accueil` block of `src/pages/index.astro`. The other pages
still carry the previous look until Lilian asks to propagate it.

## Key Implementation Notes

- Tout lien vers l'agenda passe par `BoutonReservation` : sa prop `source` est
  requise, et c'est ce qui garantit que le goal `lead_call` est posé. Un `<a>`
  écrit à la main vers cal.com ouvre bien l'overlay mais n'apparaît dans aucun
  funnel. Hors composant (données du pied de page, réponses de FAQ, llms.txt),
  l'URL vient de `lib/reservation.ts`.
- Ne jamais citer les marqueurs `{/*` et `*/}` littéralement à l'intérieur d'un
  commentaire : le `*/` interne le referme, et la fin du texte est rendue comme
  du contenu. Écrire ce genre de note en commentaires de ligne, dans le
  frontmatter.
- All text content is in French
- Short dual-service home plus two dedicated offer pages
- JSON-LD structured data for SEO (Person + ProfessionalService schemas)
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Custom scrollbar styling and infinite scroll animations in global.css
- Site URL: https://liliansevoumian.fr
