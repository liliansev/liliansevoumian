import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isIP } from 'node:net';
import { createHash } from 'node:crypto';
import { classifyAICrawlerUserAgent, trackAICrawlerResponse } from '@datafast/ai-crawl';
const origin = 'https://liliansevoumian.fr';
const root = fileURLToPath(new URL('../dist', import.meta.url));
/* La page de liens et son back office (liens/, TanStack Start) : son serveur
   est un simple `fetch(Request)`, chargé à la première visite de /liens/. */
const liensRoot = fileURLToPath(new URL('../liens/dist', import.meta.url));
const mime = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript', mjs: 'text/javascript', json: 'application/json', xml: 'application/xml', txt: 'text/plain; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', pdf: 'application/pdf', mp4: 'video/mp4', webm: 'video/webm' };
/* Images, polices et vidéos de public/ : leurs noms ne sont pas hachés, donc pas
   de cache définitif. Un jour, puis l'ETag les fait revalider en 304 au lieu de
   les retélécharger. Tout le reste (HTML compris) se revalide à chaque visite. */
const durable = new Set(['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'otf', 'mp4', 'webm', 'pdf']);
export function cacheControl(pathname, ext) {
  if (pathname.startsWith('/_astro/')) return 'public, max-age=31536000, immutable';
  if (durable.has(ext)) return 'public, max-age=86400, stale-while-revalidate=604800';
  return 'public, max-age=0, must-revalidate';
}
/* La dernière vidéo longue de la chaîne YouTube. « UULF » + l'identifiant de la
   chaîne sans son « UC » : la liste de ses envois, sans les Shorts. La page
   d'accueil l'interroge pour toujours montrer la plus récente. */
const videoFeed = 'https://www.youtube.com/feeds/videos.xml?playlist_id=UULFGH0eGI6I9EFsaKpuXXIisg';
const xmlEntities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" };
export function parseLatestVideo(xml) {
  const entry = /<entry>([\s\S]*?)<\/entry>/.exec(xml)?.[1];
  const id = entry && /<yt:videoId>([\w-]{11})<\/yt:videoId>/.exec(entry)?.[1];
  const title = entry && /<title>([^<]{1,300})<\/title>/.exec(entry)?.[1];
  if (!id || !title) return null;
  /* Apostrophe typographique et espace insécable devant la ponctuation haute,
     comme partout sur le site. `publiee` permet à la page de ne remplacer sa
     vidéo que par une plus récente. */
  const titre = title.replace(/&(amp|lt|gt|quot|apos|#39);/g, (_, name) => xmlEntities[name]).replace(/'/g, '’').replace(/ ([?!:;])/g, '\u00a0$1');
  return { id, titre, publiee: /<published>(\d{4}-\d{2}-\d{2})/.exec(entry)?.[1] ?? null };
}
/* Les adresses que des robots demandent encore : trois cas retirés en avril
   2026 et un en octobre, le nom courant du sitemap, et celles que des agents
   devinent. */
const moved = new Map([
  ['/sitemap.xml', '/sitemap-index.xml'],
  ['/cas-clients/chatbot-support-saas', '/cas-clients'], ['/cas-clients/onboarding-ecommerce', '/cas-clients'], ['/cas-clients/reporting-dashboards-ia', '/cas-clients'], ['/cas-clients/celeris', '/cas-clients'],
  ['/offres', '/automatisations-ia'], ['/about', '/'], ['/legal', '/mentions-legales'],
]);
const etagOf = bytes => `"${createHash('sha1').update(bytes).digest('base64url').slice(0, 27)}"`;
const matches = (header, etag) => typeof header === 'string' && header.split(',').some(tag => { const value = tag.trim(); return value === '*' || value.replace(/^W\//, '') === etag; });
class HttpError extends Error { constructor(status) { super(`HTTP ${status}`); this.status = status; } }
async function readBody(req, limit) {
  if (Number(req.headers['content-length']) > limit) throw new HttpError(413);
  const chunks = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > limit) throw new HttpError(413); chunks.push(chunk); }
  return Buffer.concat(chunks);
}
/** Only expose through Caddy; it must overwrite X-Real-IP with the client IP. */
export function createSiteServer({ distDir = root, liensDir = liensRoot, fetchImpl = fetch, signupNewsletter, sendContactMessage, track = trackAICrawlerResponse, analytics = true, timeoutMs = 10_000, videoTtlMs = 1_800_000, log = console.log } = {}) {
  let newsletterPromise;
  let contactPromise;
  let liensPromise;
  /* Les fichiers de liens/dist/client (scripts, styles, avatar) se servent
     directement ; tout le reste de /liens/ passe par le serveur de l'app. */
  async function liens(req, url, ip, send) {
    const local = url.pathname.slice('/liens'.length);
    if (/^\/(assets\/[\w.-]+|[\w-]+\.(webp|png|svg|ico))$/.test(local)) {
      const base = await realpath(resolve(liensDir, 'client'));
      try {
        const filename = await realpath(resolve(base, `.${local}`));
        if (filename.startsWith(base + sep) && (await stat(filename)).isFile()) {
          const bytes = await readFile(filename); const ext = extname(filename).slice(1).toLowerCase();
          const immutable = local.startsWith('/assets/');
          return send(200, bytes, { 'Content-Type': mime[ext] ?? 'application/octet-stream', 'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=86400', ETag: etagOf(bytes) });
        }
      } catch (error) { if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error; }
      if (local.startsWith('/assets/')) return send(404, 'Not found', { 'Cache-Control': 'no-store' });
    }
    liensPromise ??= import(pathToFileURL(resolve(liensDir, 'server/server.js')).href);
    const app = (await liensPromise).default;
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) if (typeof value === 'string' && !key.startsWith(':')) headers.set(key, value);
    if (ip) headers.set('x-real-ip', ip); else headers.delete('x-real-ip');
    const host = /^[\w.-]+(:\d+)?$/.test(req.headers.host ?? '') ? req.headers.host : new URL(origin).host;
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await readBody(req, 3_000_000);
    const response = await app.fetch(new Request(`${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${host}${req.url}`, { method: req.method, headers, body }));
    const out = {};
    response.headers.forEach((value, key) => { if (key !== 'set-cookie' && key !== 'content-length') out[key.replace(/(^|-)\w/g, c => c.toUpperCase())] = value; });
    const cookies = response.headers.getSetCookie();
    if (cookies.length) out['Set-Cookie'] = cookies;
    out['Cache-Control'] ??= 'no-store';
    // La page et le back office ne s'affichent jamais dans le cadre d'un autre site.
    out['Content-Security-Policy'] ??= "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'";
    out['X-Frame-Options'] ??= 'DENY';
    out['Referrer-Policy'] ??= local.startsWith('/admin') ? 'no-referrer' : 'strict-origin-when-cross-origin';
    return send(response.status, Buffer.from(await response.arrayBuffer()), out);
  }
  /* Le flux est relu au plus toutes les demi-heures. Si YouTube ne répond pas,
     la dernière réponse connue sert encore et on réessaie une minute plus tard. */
  let video = null, videoCheckedAt = -Infinity, videoPending = null, thumbnail = null, thumbnailPending = null;
  function latestVideo() {
    if (Date.now() - videoCheckedAt < videoTtlMs) return Promise.resolve(video);
    videoPending ??= (async () => {
      let fresh = null;
      try {
        const response = await fetchImpl(videoFeed, { signal: AbortSignal.timeout(timeoutMs) });
        if (response.ok) fresh = parseLatestVideo(await response.text());
      } catch (error) { console.error('Video feed failed', error.message); }
      if (fresh) video = fresh;
      videoCheckedAt = fresh ? Date.now() : Date.now() - videoTtlMs + Math.min(60_000, videoTtlMs);
      videoPending = null;
      return video;
    })();
    return videoPending;
  }
  const server = createServer((req, res) => {
    function send(status, value = '', headers = {}) {
      const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff', 'Content-Length': bytes.length, ...headers });
      res.end(req.method === 'HEAD' ? undefined : bytes);
    }
    async function handle() {
      if (!req.url?.startsWith('/') || req.url.startsWith('//')) throw new HttpError(400);
      let decoded;
      try { decoded = decodeURIComponent(req.url.split('?')[0]); } catch { throw new HttpError(400); }
      if (decoded.includes('\0') || decoded.includes('\\') || decoded.split('/').some(p => p === '..' || p === '.')) throw new HttpError(400);
      const url = new URL(req.url, origin);
      const headers = new Headers();
      for (const key of ['user-agent', 'referer', 'sec-fetch-dest', 'origin', 'content-type']) if (typeof req.headers[key] === 'string') headers.set(key, req.headers[key]);
      const ip = typeof req.headers['x-real-ip'] === 'string' && isIP(req.headers['x-real-ip']) ? req.headers['x-real-ip'] : null;
      if (analytics && !url.pathname.startsWith('/api') && url.pathname !== '/healthz') {
        const request = new Request(url, { method: req.method, headers });
        res.once('finish', () => {
          /* Une ligne par passage d'un robot d'IA (reconnu à son user-agent),
             pour savoir depuis les journaux du conteneur lesquels arrivent
             jusqu'ici : DataFast ne garde que ceux qu'il vérifie par IP. */
          const crawler = classifyAICrawlerUserAgent(headers.get('user-agent') ?? '');
          if (crawler) log(JSON.stringify({ crawler: crawler.agent, category: crawler.category, path: url.pathname, status: res.statusCode }));
          try { track(request, { statusCode: res.statusCode }, { websiteId: 'dfid_Mq8wt9KvIisuofpYWZouo', publicOrigin: origin, getIp: () => ip, additionalIgnoredPathPrefixes: ['/api', '/healthz', '/liens/api', '/liens/_serverFn', '/liens/admin', '/liens/media'] }); }
          catch (error) { console.error('Crawler tracking failed', error.message); }
        });
      }
      if (url.pathname === '/liens') return send(308, '', { Location: `/liens/${url.search}` });
      if (url.pathname.startsWith('/liens/')) return liens(req, url, ip, send);
      if (req.headers.host?.split(':')[0] === 'formations.liliansevoumian.fr') return send(308, '', { Location: `https://lab.augmentes.fr${url.pathname}${url.search}` });
      if (url.pathname.endsWith('/') && url.pathname !== '/') return send(308, '', { Location: `${url.pathname.replace(/\/+$/, '')}${url.search}` });
      if (moved.has(url.pathname)) return send(308, '', { Location: `${moved.get(url.pathname)}${url.search}` });
      if (url.pathname.endsWith('/index.html')) return send(308, '', { Location: `${url.pathname.slice(0, -'/index.html'.length) || '/'}${url.search}` });
      if (url.pathname === '/api/newsletter') {
        if (req.method !== 'POST') return send(405, '', { Allow: 'POST' });
        const bytes = await readBody(req, 4096);
        if (!signupNewsletter) newsletterPromise ??= import('../runtime/newsletter-signup.mjs');
        const signup = signupNewsletter ?? (await newsletterPromise).signupNewsletter;
        const response = await signup(new Request(url, { method: 'POST', headers, body: bytes }), process.env.LUMAIL_API_KEY, origin);
        return send(response.status, Buffer.from(await response.arrayBuffer()), Object.fromEntries(response.headers));
      }
      if (url.pathname === '/api/contact') {
        if (req.method !== 'POST') return send(405, '', { Allow: 'POST' });
        const bytes = await readBody(req, 8192);
        if (!sendContactMessage) contactPromise ??= import('../runtime/contact-message.mjs');
        const envoyer = sendContactMessage ?? (await contactPromise).envoyerMessageContact;
        const response = await envoyer(new Request(url, { method: 'POST', headers, body: bytes }), process.env, origin);
        return send(response.status, Buffer.from(await response.arrayBuffer()), Object.fromEntries(response.headers));
      }
      if (url.pathname === '/api/dfst-events') {
        if (req.method !== 'POST') return send(405, '', { Allow: 'POST' });
        if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415);
        const bytes = await readBody(req, 65536);
        try { const value = JSON.parse(bytes.toString()); if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(); } catch { throw new HttpError(400); }
        try {
          const response = await fetchImpl('https://datafa.st/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': req.headers['user-agent'] || '', Origin: req.headers.origin || origin, 'x-datafast-real-ip': ip || '' }, body: bytes, signal: AbortSignal.timeout(timeoutMs) });
          return send(response.status, Buffer.from(await response.arrayBuffer()), { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        } catch { throw new HttpError(502); }
      }
      if (!['GET', 'HEAD'].includes(req.method)) return send(405, '', { Allow: 'GET, HEAD' });
      if (url.pathname === '/healthz') return send(200, 'ok', { 'Cache-Control': 'no-store' });
      if (url.pathname === '/api/derniere-video') {
        const latest = await latestVideo();
        if (!latest) return send(503, '{}', { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        return send(200, JSON.stringify(latest), { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' });
      }
      /* La vignette passe par ici plutôt que par YouTube : un bloqueur la
         refuserait. Seule celle de la dernière vidéo est servie. */
      if (url.pathname === '/api/derniere-video/vignette') {
        const latest = await latestVideo();
        if (!latest || url.searchParams.get('v') !== latest.id) return send(404, 'Not found', { 'Cache-Control': 'no-store' });
        /* Une seule récupération à la fois, et son résultat gardé : la grande
           image tant que la vidéo ne change pas, la petite (repli) ou un échec
           dix minutes seulement, le temps de retenter la grande. */
        const fresh = thumbnail?.id === latest.id && (thumbnail.full || Date.now() - thumbnail.at < Math.min(600_000, videoTtlMs));
        if (!fresh) {
          thumbnailPending ??= (async () => {
            let bytes = null, full = false;
            for (const name of ['maxresdefault', 'hqdefault']) {
              try {
                const response = await fetchImpl(`https://i.ytimg.com/vi/${latest.id}/${name}.jpg`, { signal: AbortSignal.timeout(timeoutMs) });
                if (response.ok) { bytes = Buffer.from(await response.arrayBuffer()); full = name === 'maxresdefault'; break; }
              } catch (error) { console.error('Video thumbnail failed', error.message); }
            }
            if (bytes && bytes.length > 2_000_000) bytes = null;
            if (bytes || thumbnail?.id !== latest.id) thumbnail = { id: latest.id, bytes, full, at: Date.now() };
            else thumbnail.at = Date.now();
            thumbnailPending = null;
          })();
          await thumbnailPending;
        }
        if (thumbnail?.id !== latest.id || !thumbnail.bytes) throw new HttpError(502);
        return send(200, thumbnail.bytes, { 'Content-Type': 'image/jpeg', 'Cache-Control': thumbnail.full ? 'public, max-age=86400' : 'public, max-age=600' });
      }
      if (url.pathname === '/js/script.js') {
        try {
          const response = await fetchImpl('https://datafa.st/js/script.cookieless.js', { signal: AbortSignal.timeout(timeoutMs) });
          return send(response.status, Buffer.from(await response.arrayBuffer()), { 'Content-Type': 'text/javascript', 'Cache-Control': response.ok ? 'public, max-age=300' : 'no-store' });
        } catch { throw new HttpError(502); }
      }
      const base = await realpath(distDir);
      async function load(path) {
        try {
          let filename = await realpath(resolve(base, `.${path}`));
          if (filename !== base && !filename.startsWith(base + sep)) return null;
          if ((await stat(filename)).isDirectory()) filename = await realpath(resolve(filename, 'index.html'));
          if (!filename.startsWith(base + sep) || !(await stat(filename)).isFile()) return null;
          return { filename, bytes: await readFile(filename) };
        } catch (error) { if (['ENOENT', 'ENOTDIR', 'EACCES'].includes(error.code)) return null; throw error; }
      }
      const file = await load(decoded);
      if (!file) { const page = await load('/404.html'); return send(404, page?.bytes ?? 'Not found', { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }); }
      const ext = extname(file.filename).slice(1).toLowerCase();
      const caching = { 'Cache-Control': cacheControl(url.pathname, ext), ETag: etagOf(file.bytes) };
      if (matches(req.headers['if-none-match'], caching.ETag)) { res.writeHead(304, caching); return res.end(); }
      return send(200, file.bytes, { 'Content-Type': mime[ext] ?? 'application/octet-stream', ...caching });
    }
    handle().catch(error => { if (!res.headersSent) send(error instanceof HttpError ? error.status : 500, error instanceof HttpError ? error.message : 'Internal server error', { 'Cache-Control': 'no-store' }); else res.destroy(); if (!(error instanceof HttpError)) console.error(error); });
  });
  server.requestTimeout = 30_000; server.headersTimeout = 15_000;
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const server = createSiteServer();
  server.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Site server listening'));
  process.once('SIGTERM', () => { server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10_000).unref(); });
}
