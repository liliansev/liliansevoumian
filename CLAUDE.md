# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for Lilian Sevoumian, a No-Code freelance expert specializing in Make, n8n, and Airtable automation. Built with Astro.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview production build locally
pnpm astro add  # Add integrations (e.g., pnpm astro add tailwind)
```

## Tech Stack

- **Framework**: Astro 5.x (minimal template)
- **Styling**: Tailwind CSS (to be integrated)
- **Icons**: Lucide (via Iconify CDN in reference design)
- **Fonts**: Geist, Plus Jakarta Sans (Google Fonts)
- **Language**: French (fr)

## Architecture

```
src/
└── pages/
    └── index.astro    # Main landing page
public/
└── favicon.svg
aurabuild.html         # Design reference/mockup (HTML export to convert)
```

## Design Reference

The `aurabuild.html` file contains the complete design mockup that should be converted to Astro components. Key sections:
- Navigation (fixed header with smooth scroll links)
- Hero section with availability badge and CTA
- Stats section (experience, workflows, expertise)
- Expertise cards (n8n/Make, Airtable, Integration)
- Process/methodology timeline
- Career timeline section
- Contact CTA
- Footer with social links

## Design System

Colors (zinc-based palette):
- Background: `zinc-100`
- Cards/Surfaces: `white`
- Text primary: `zinc-900`
- Text secondary: `zinc-500`
- Text muted: `zinc-400`
- Borders: `zinc-200`
- Accents: `indigo-400`, `purple-200/50`

Typography:
- Monospace base: `font-mono`
- Headings: `tracking-tight`, `font-semibold`
- Body: `font-light` for larger text

## Key Implementation Notes

- All text content is in French
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Smooth scroll behavior (`scroll-smooth` on html)
- Hover animations on cards and buttons
- Custom scrollbar styling for webkit browsers
