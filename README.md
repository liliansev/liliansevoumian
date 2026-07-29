# liliansevoumian.fr

Landing page d'un freelance en automatisation et en intelligence artificielle.
Astro 5 en sortie statique, Tailwind v4, déployée sur Vercel.

## Commandes

```bash
pnpm dev        # serveur de développement sur localhost:4321
pnpm build      # génère dist/
pnpm preview    # sert dist/ sur localhost:4322
npx tsc --noEmit
```

## Ce qu'il faut savoir avant de toucher au code

**La direction artistique tient dans `src/styles/global.css`.** Les jetons du
bloc `@theme` sont l'unique source : les composants ne connaissent que des noms
de jetons, jamais des valeurs. Changer une valeur fait basculer tout le site.

Trois règles gouvernent l'ensemble :

- **Le lime est une surface, jamais un texte.** Il ne tient que 1,25:1 contre le
  blanc. Il prend des sections entières (`.bloc-lime`), ou il surligne
  (`<mark>`, une bande penchée posée en pseudo-élément, en `white-space: nowrap`
  donc de 1 à 4 mots).
- **Deux rayons seulement**, `0` et `9999px`. Si c'est rond, ça se clique.
- **Aucune ombre.** L'élévation vient des filets.

**Les cas clients sont une content collection** (`src/content/cas-clients/`, du
Markdown au schéma Zod typé dans `src/content.config.ts`). Trois champs de
frontmatter pilotent des visuels : `flow` (le schéma de parcours), `bascule`
(l'avant/après) et `nomenclature` (le relevé d'étapes). Chacun porte un seuil
délibéré — `flow` exige exactement trois actions, `bascule` au moins trois
lignes, `nomenclature` au moins six. Un cas qui n'a pas la matière n'a pas le
visuel, plutôt qu'un gabarit rempli avec du vide.

**Le site n'a qu'un canal de conversion** : la réservation d'un diagnostic de
20 min sur cal.com, ouverte dans un overlay embarqué. Il n'y a plus de
formulaire. Les deux goals DataFast sont `lead_call` et `call_booked` ; voir
`DATAFAST-FUNNEL.md`.

**Aucun chiffre du site n'est décoratif.** Tout ce qui est publié est traçable
dans `src/content/cas-clients/*.md` ou dans le profil. Les encadrés de réserve
des cas (« projet en phase de stabilisation », « chiffres mesurés en test »)
restreignent la portée de ce qui suit : ils ne s'allègent pas.

## QA

`agent-browser` en headless, aux deux formats de référence : 1440×900 et
402×874. **Playwright est interdit sur ce projet** — désinstallé, à ne pas
réinstaller, aucun fichier `.spec.ts`.
