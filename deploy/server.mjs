import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isIP } from 'node:net';
import { trackAICrawlerResponse } from '@datafast/ai-crawl';
const origin = 'https://liliansevoumian.fr';
const root = fileURLToPath(new URL('../dist', import.meta.url));
const mime = { html: 'text/html; charset=utf-8', css: 'text/css', js: 'text/javascript', mjs: 'text/javascript', json: 'application/json', xml: 'application/xml', txt: 'text/plain; charset=utf-8', svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif', ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', pdf: 'application/pdf', mp4: 'video/mp4', webm: 'video/webm' };
class HttpError extends Error { constructor(status) { super(`HTTP ${status}`); this.status = status; } }
async function readBody(req, limit) {
  if (Number(req.headers['content-length']) > limit) throw new HttpError(413);
  const chunks = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > limit) throw new HttpError(413); chunks.push(chunk); }
  return Buffer.concat(chunks);
}
/** Only expose through Caddy; it must overwrite X-Real-IP with the client IP. */
export function createSiteServer({ distDir = root, fetchImpl = fetch, signupNewsletter, track = trackAICrawlerResponse, analytics = true, timeoutMs = 10_000 } = {}) {
  let newsletterPromise;
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
          try { track(request, { statusCode: res.statusCode }, { websiteId: 'dfid_Mq8wt9KvIisuofpYWZouo', publicOrigin: origin, getIp: () => ip, additionalIgnoredPathPrefixes: ['/api', '/healthz'] }); }
          catch (error) { console.error('Crawler tracking failed', error.message); }
        });
      }
      if (req.headers.host?.split(':')[0] === 'formations.liliansevoumian.fr') return send(308, '', { Location: `https://lab.augmentes.fr${url.pathname}${url.search}` });
      if (url.pathname.endsWith('/') && url.pathname !== '/') return send(308, '', { Location: `${url.pathname.replace(/\/+$/, '')}${url.search}` });
      if (url.pathname === '/api/newsletter') {
        if (req.method !== 'POST') return send(405, '', { Allow: 'POST' });
        const bytes = await readBody(req, 4096);
        if (!signupNewsletter) newsletterPromise ??= import('../runtime/newsletter-signup.mjs');
        const signup = signupNewsletter ?? (await newsletterPromise).signupNewsletter;
        const response = await signup(new Request(url, { method: 'POST', headers, body: bytes }), process.env.LUMAIL_API_KEY, origin);
        return send(response.status, Buffer.from(await response.arrayBuffer()), Object.fromEntries(response.headers));
      }
      if (url.pathname === '/api/dfst-events') {
        if (req.method !== 'POST') return send(405, '', { Allow: 'POST' });
        if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415);
        const bytes = await readBody(req, 65536);
        try { const value = JSON.parse(bytes.toString()); if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(); } catch { throw new HttpError(400); }
        try {
          const response = await fetchImpl('https://datafa.st/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': req.headers['user-agent'] || '', Origin: req.headers.origin || '', 'x-datafast-real-ip': ip || '' }, body: bytes, signal: AbortSignal.timeout(timeoutMs) });
          return send(response.status, Buffer.from(await response.arrayBuffer()), { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
        } catch { throw new HttpError(502); }
      }
      if (!['GET', 'HEAD'].includes(req.method)) return send(405, '', { Allow: 'GET, HEAD' });
      if (url.pathname === '/healthz') return send(200, 'ok', { 'Cache-Control': 'no-store' });
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
      return send(200, file.bytes, { 'Content-Type': mime[extname(file.filename).slice(1)] ?? 'application/octet-stream', 'Cache-Control': url.pathname.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate' });
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
