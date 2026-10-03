/*
 * « Make ou n8n ? » : une seule réponse pour tout le site.
 *
 * La question était posée à quatre endroits (les deux pages d'outil, la page
 * d'offre et la page de reprise) et recevait quatre réponses différentes, dont
 * une rangeait les agents IA du seul côté de n8n alors que l'agent de
 * M Partners tourne sur Make. Elle est écrite ici une fois ; chaque page la
 * relit, et renvoie au comparatif complet.
 */

/** La réponse courte, en texte brut : c'est elle que lit le balisage `FAQPage`. */
export const reponseMakeOuN8n =
  'Make quand votre équipe doit lire et modifier l’automatisation elle-même ; n8n quand vos données doivent rester sur vos serveurs, ou quand le flux mêle IA, contrôles par règles et code. Si vous avez déjà l’un des deux, je commence par l’examiner.';

/** Le comparatif complet. */
export const pageMakeOuN8n = {
  href: '/make-ou-n8n',
  libelle: 'Make ou n8n : lequel choisir ?',
} as const;

/** La même réponse pour l'affichage, suivie du lien vers le comparatif. */
export const reponseMakeOuN8nHtml = `${reponseMakeOuN8n} Le comparatif complet est sur la page <a class="lien-prose" href="${pageMakeOuN8n.href}">${pageMakeOuN8n.libelle}</a>`;
