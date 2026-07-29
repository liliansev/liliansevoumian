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
    /*
     * `bascule` met en regard l'état d'avant et l'état d'après. Elle ouvre la
     * pièce « Les résultats », c'est-à-dire ce que le client achète : un écart.
     *
     * Minimum trois lignes, délibérément. Une ou deux lignes ne font pas une
     * bascule, elles font un chiffre isolé qu'on aurait tendance à compléter
     * pour équilibrer le bloc. Un cas qui n'a pas trois écarts documentés n'en
     * a pas (Celeris : un seul, et mesuré en environnement de test).
     *
     * Les deux termes doivent être écrits dans le corps du cas. Aucun « avant »
     * reconstruit pour faire valoir un « après ».
     */
    bascule: z
      .array(z.object({ avant: z.string(), apres: z.string() }))
      .min(3)
      .optional(),
    /*
     * `nomenclature` déplie le parcours étape par étape, avec l'outil qui la
     * porte et son rôle. Elle clôt « La solution ».
     *
     * La colonne `role` est le porteur de couleur le plus honnête de la page :
     * elle montre où sont les CONTRÔLES déterministes, c'est-à-dire la thèse du
     * portfolio — l'IA extrait, les règles décident. Le lime n'y marque donc
     * pas « c'est bien », il marque « ici rien n'est laissé à l'IA ».
     *
     * Minimum six lignes : en dessous, ce n'est plus une nomenclature, c'est
     * une liste, et le corps du texte la dit déjà mieux.
     */
    nomenclature: z
      .array(
        z.object({
          etape: z.string(),
          outil: z.string().optional(),
          role: z.enum(['declencheur', 'agent', 'action', 'controle']),
        }),
      )
      .min(6)
      .optional(),
    // draft: true → exclu du build de prod (visible en dev pour relecture).
    draft: z.boolean().default(false),
  }),
});

export const collections = { 'cas-clients': casClients };
