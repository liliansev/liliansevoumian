import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'blog'>;

/** Les articles visibles, du plus récent au plus ancien. Les brouillons ne
    sortent qu'en développement. */
export async function articlesPublies(): Promise<Article[]> {
  const tous = await getCollection('blog', (entry) => !import.meta.env.PROD || !entry.data.draft);
  return tous.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** AAAA-MM-JJ, la forme qu'attendent `tete-de-page` et le balisage. */
export const iso = (date: Date) => date.toISOString().slice(0, 10);

/** « 14 octobre 2026 ». Midi UTC : la date ne glisse pas selon le fuseau. */
export function dateEnClair(date: Date): string {
  const midi = new Date(`${iso(date)}T12:00:00Z`);
  const jour = midi.getUTCDate() === 1 ? '1er' : String(midi.getUTCDate());
  return `${jour} ${midi.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' })}`;
}

/** Minutes de lecture, à 220 mots par minute, jamais moins d'une. */
export function minutesDeLecture(markdown: string | undefined): number {
  const mots = (markdown ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 220));
}

/* Le Markdown ne pose pas les espaces insécables du français : même règle que
   les cas clients, avant `: ; ? !` et le guillemet fermant, après le guillemet
   ouvrant, entre un nombre et son unité. */
export const espaces = (texte: string) =>
  texte
    .replace(/ ([:;?!»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/(\d) (?=(?:h|min|%|€)(?![\p{L}\d]))/gu, '$1 ');
