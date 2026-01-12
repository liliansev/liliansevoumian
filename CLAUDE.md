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
- **Testing**: Playwright (E2E tests)

## Architecture

```
src/
├── components/         # Astro components for each section
│   ├── Navigation.astro
│   ├── Hero.astro
│   ├── Stats.astro
│   ├── Expertise.astro
│   ├── ToolsCarousel.astro
│   ├── Quote.astro
│   ├── Methodology.astro
│   ├── Testimonials.astro
│   ├── Timeline.astro
│   ├── Pricing.astro
│   ├── FAQ.astro
│   ├── CTA.astro
│   ├── Footer.astro
│   ├── ScrollingLogos.astro
│   └── ui/             # Reusable UI components
├── layouts/
│   └── Layout.astro    # Main layout with SEO/meta
├── pages/
│   └── index.astro     # Single page landing
└── styles/
    └── global.css      # Tailwind imports + custom CSS
public/
├── favicon.svg
├── logo_liliansevoumian.svg
├── og-image.svg
└── robots.txt
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

- All text content is in French
- Single-page landing with smooth scroll navigation
- JSON-LD structured data for SEO (Person + ProfessionalService schemas)
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Custom scrollbar styling and infinite scroll animations in global.css
- Site URL: https://liliansevoumian.fr
