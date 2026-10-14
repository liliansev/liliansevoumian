/*
 * Les espaces insécables du français, posées à l'affichage : les textes des
 * cas clients (Markdown, frontmatter) ne les portent pas, et sans elles un
 * deux-points, un « € » ou une unité passait seul à la ligne. Avant `: ; ? !`
 * et le guillemet fermant, après le guillemet ouvrant, entre un nombre et son
 * unité. Aucune balise ne contient ces suites : on peut l'appliquer à du HTML
 * rendu.
 */
export const espaces = (texte: string) =>
  texte
    .replace(/ ([:;?!»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/(\d) (?=(?:h|min|%|€)(?![\p{L}\d]))/gu, '$1 ');
