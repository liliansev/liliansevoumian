import type { APIRoute } from 'astro';
import { articlesPublies } from '../../lib/blog';

// Le flux des articles publiés, généré au build. Il sert à qui suit le blog
// dans un lecteur RSS, et à tout outil d'envoi qui relève un flux.
const SITE = 'https://liliansevoumian.fr';

const echapper = (texte: string) =>
  texte.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const articles = (await articlesPublies()).filter((article) => !article.data.draft);
  const items = articles
    .map((article) => {
      const lien = `${SITE}/blog/${article.id}`;
      return `    <item>
      <title>${echapper(article.data.title)}</title>
      <link>${lien}</link>
      <guid isPermaLink="true">${lien}</guid>
      <description>${echapper(article.data.description)}</description>
      <pubDate>${article.data.date.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Le blog de Lilian Sevoumian</title>
    <link>${SITE}/blog</link>
    <description>Des idées, des essais et ce que j’apprends en construisant.</description>
    <language>fr</language>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
