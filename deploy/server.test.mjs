import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { request } from 'node:http';
import { createSiteServer } from './server.mjs';
async function fixture(t, options = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'site-server-'));
  await mkdir(join(dir, 'offre')); await mkdir(join(dir, '_astro'));
  await writeFile(join(dir, 'index.html'), 'home'); await writeFile(join(dir, 'offre/index.html'), 'offer');
  await writeFile(join(dir, '404.html'), 'missing'); await writeFile(join(dir, '_astro/a.woff2'), 'font');
  await symlink('/etc/passwd', join(dir, 'escape'));
  const server = createSiteServer({ distDir: dir, analytics: false, ...options });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); await rm(dir, { recursive: true, force: true }); });
  const url = `http://127.0.0.1:${server.address().port}`;
  return { url, server };
}
test('static pages, HEAD, MIME, canonical redirects and real 404', async t => {
  const { url } = await fixture(t);
  assert.equal(await (await fetch(url)).text(), 'home');
  assert.equal(await (await fetch(`${url}/offre`)).text(), 'offer');
  const head = await fetch(`${url}/offre`, { method: 'HEAD' });
  assert.equal(head.headers.get('content-length'), '5'); assert.equal(await head.text(), '');
  const redirect = await fetch(`${url}/offre/?x=1`, { redirect: 'manual' });
  assert.equal(redirect.status, 308); assert.equal(redirect.headers.get('location'), '/offre?x=1');
  const missing = await fetch(`${url}/absent`); assert.equal(missing.status, 404); assert.equal(await missing.text(), 'missing');
  const font = await fetch(`${url}/_astro/a.woff2`); assert.equal(font.headers.get('content-type'), 'font/woff2'); assert.match(font.headers.get('cache-control'), /immutable/);
  const old = await new Promise((resolve, reject) => { const req = request(`${url}/course?x=1`, { headers: { Host: 'formations.liliansevoumian.fr' } }, res => { res.resume(); resolve(res.headers.location); }); req.on('error', reject); req.end(); });
  assert.equal(old, 'https://lab.augmentes.fr/course?x=1');
  assert.equal((await fetch(`${url}/escape`)).status, 404);
});
test('rejects encoded traversal and malformed URI before filesystem lookup', async t => {
  const { url } = await fixture(t);
  for (const path of ['/%2e%2e%2fetc/passwd', '/%ZZ', '/a%00b', '/a%5cb']) {
    const status = await new Promise((resolve, reject) => { const req = request(url + path, res => { res.resume(); resolve(res.statusCode); }); req.on('error', reject); req.end(); });
    assert.equal(status, 400);
  }
});
test('events preserve upstream status, sanitize IP, bound body and reject invalid JSON', async t => {
  const calls = [];
  const { url } = await fixture(t, { fetchImpl: async (...args) => { calls.push(args); return Response.json({ ok: true }, { status: 202 }); } });
  const headers = { 'Content-Type': 'application/json', 'X-Real-IP': '203.0.113.4', 'CF-Connecting-IP': '1.1.1.1' };
  assert.equal((await fetch(`${url}/api/dfst-events`, { method: 'POST', headers, body: '{}' })).status, 202);
  assert.equal(calls[0][1].headers['x-datafast-real-ip'], '203.0.113.4');
  assert.equal((await fetch(`${url}/api/dfst-events`, { method: 'POST', headers, body: '{' })).status, 400);
  assert.equal((await fetch(`${url}/api/dfst-events`, { method: 'POST', headers, body: 'x'.repeat(65537) })).status, 413);
  assert.equal((await fetch(`${url}/api/dfst-events`)).status, 405);
  assert.equal(calls.length, 1);
});
test('upstream failures return 502 and script is served as JavaScript', async t => {
  const { url } = await fixture(t, { fetchImpl: async endpoint => { if (endpoint.includes('/events')) throw new Error('offline'); return new Response('script'); } });
  assert.equal((await fetch(`${url}/api/dfst-events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status, 502);
  const script = await fetch(`${url}/js/script.js`); assert.equal(await script.text(), 'script'); assert.equal(script.headers.get('content-type'), 'text/javascript');
});
test('newsletter delegates original body and canonical origin to shared validator', async t => {
  let received;
  const { url } = await fixture(t, { signupNewsletter: async (req, key, origin) => { received = { url: req.url, origin, body: await req.json(), header: req.headers.get('origin') }; return Response.json({ status: 'pending' }); } });
  const response = await fetch(`${url}/api/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://liliansevoumian.fr' }, body: '{"email":"test@example.com"}' });
  assert.equal(response.status, 200); assert.equal(received.origin, 'https://liliansevoumian.fr'); assert.equal(received.body.email, 'test@example.com'); assert.equal(received.header, received.origin);
  assert.equal((await fetch(`${url}/api/newsletter`, { method: 'POST', body: 'a'.repeat(4097) })).status, 413);
});
test('crawler hooks receive public URL, response status and no spoofable IP headers', async t => {
  const calls = [];
  const { url } = await fixture(t, { analytics: true, track: (...args) => calls.push(args) });
  await fetch(`${url}/absent?q=1`, { headers: { 'User-Agent': 'GPTBot', 'X-Real-IP': '203.0.113.5', 'CF-Connecting-IP': '1.1.1.1', 'X-Forwarded-For': '2.2.2.2' } });
  assert.equal(calls.length, 1); assert.equal(calls[0][0].url, 'https://liliansevoumian.fr/absent?q=1'); assert.equal(calls[0][1].statusCode, 404);
  assert.equal(calls[0][2].getIp(), '203.0.113.5'); assert.equal(calls[0][0].headers.get('cf-connecting-ip'), null); assert.equal(calls[0][0].headers.get('x-forwarded-for'), null);
});
