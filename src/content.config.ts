import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * Collection « cas-clients » — remplace l'ancien fetch Notion.
 * 1 fichier Markdown par cas dans src/content/cas-clients/.
 * Méta structurées en frontmatter, récit (entreprise → résultats) dans le corps.
 * Le nom de fichier = slug de l'URL (/cas-clients/<id>).
 */
const casClients = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cas-clients' }),
  schema: z.object({
    title: z.string(),
    // Metas redigees a la main : la generation automatique concatenait les
    // KPI (« 2-3 c Cout IA par fiche, >60 % Matching auto ») puis coupait a
    // 160 caracteres en plein mot, sur les quatre cas. Un moteur de reponse
    // cherche une phrase autonome, il trouvait un dump.
    seoTitle: z.string().optional(),
    description: z.string().optional(),
    secteur: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    tools: z.array(z.string()).default([]),
    kpis: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    /*
     * `flow` décrit le parcours réel de la donnée, tel que le corps du cas le
     * raconte. Il alimente le schéma posé en tête de « La solution ».
     *
     * La géométrie est celle de WorkflowCanvas : un déclencheur, un agent, puis
     * EXACTEMENT trois actions. Le `.length(3)` est délibérément strict — un
     * gabarit qui accepte deux actions invite à en inventer une troisième pour
     * remplir le dessin. Un cas dont la chaîne ne rentre pas dans cette forme
     * (Celeris, dont le parcours est linéaire) n'a pas de `flow` : il n'a pas
     * de schéma, plutôt qu'un schéma faux.
     */
    flow: z
      .object({
        describe: z.string(),
        trigger: z.object({ icon: z.string(), kicker: z.string(), title: z.string(), sub: z.string().optional() }),
        agent: z.object({ icon: z.string(), kicker: z.string(), title: z.string(), sub: z.string().optional() }),
        actions: z
          .array(z.object({ icon: z.string(), kicker: z.string(), title: z.string(), sub: z.string().optional() }))
          .length(3),
      })
      .optional(),
    testimonial: z
      .object({
        quote: z.string(),
        name: z.string().optional(),
        role: z.string().optional(),
      })
      .optional(),
    // draft: true → exclu du build de prod (visible en dev pour relecture).
    draft: z.boolean().default(false),
  }),
});

export const collections = { 'cas-clients': casClients };
