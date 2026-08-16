# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for Lilian Sevoumian, a No-Code freelance expert specializing in Make, n8n, and Airtable automation. Built with Astro 5.x.

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
├── data/                      # brands.ts, faq.ts
├── lib/                       # roi.ts, tool-chip.ts, reservation.ts
├── layouts/
│   ├── Layout.astro           # SEO, JSON-LD, embed cal.com, failsafe reveal
│   └── PageExpertOutil.astro  # charpente commune des pages SEO par outil
├── pages/
│   ├── index.astro
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

Colors (zinc-based palette):
- Background: `zinc-100`
- Cards/Surfaces: `white`
- Text primary: `zinc-900`
- Text secondary: `zinc-500`
- Text muted: `zinc-400`
- Borders: `zinc-200`

Typography:
- Sans: Geist (`font-sans`)
- Mono: Geist Mono (`font-mono`)

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
- Single-page landing with smooth scroll navigation
- JSON-LD structured data for SEO (Person + ProfessionalService schemas)
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Custom scrollbar styling and infinite scroll animations in global.css
- Site URL: https://liliansevoumian.fr
