import test from 'node:test';
import assert from 'node:assert/strict';
// Le module tel que le serveur le charge (bâti par esbuild, voir Dockerfile).
import { envoyerMessageContact, emettreJetonContact } from '../runtime/contact-message.mjs';
const origin = 'https://liliansevoumian.fr';
const env = { RESEND_API_KEY: 'test-key' };
const base = { email: 'test@example.com', nom: 'Test', message: 'Bonjour, un test.', website: '' };
const jeton = async (ilYa = 10_000) => (await emettreJetonContact(env, Date.now() - ilYa).json()).jeton;
function poster(fetchImpl) {
  return async body => {
    const response = await envoyerMessageContact(new Request(`${origin}/api/contact`, { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) }), env, origin, fetchImpl);
    return { ...(await response.json()), code: response.status };
  };
}
test('robots: honeypot and too-fast tokens get a fake success, no mail', async () => {
  let envois = 0; const post = poster(async () => { envois++; return new Response('{}'); });
  assert.equal((await post({ ...base, website: 'http://spam', jeton: await jeton() })).code, 200);
  assert.equal((await post({ ...base, jeton: await jeton(500) })).code, 200);
  assert.equal(envois, 0);
});
test('missing, forged or expired tokens are refused; links are bounded', async () => {
  const post = poster(async () => assert.fail('no mail'));
  assert.equal((await post(base)).code, 403);
  assert.equal((await post({ ...base, jeton: 'a.b.c' })).code, 403);
  assert.equal((await post({ ...base, jeton: await jeton(25 * 3_600_000) })).code, 403);
  assert.equal((await post({ ...base, nom: 'www.spam.io', jeton: await jeton() })).code, 422);
  assert.equal((await post({ ...base, message: 'http://a http://b www.c https://d', jeton: await jeton() })).code, 422);
});
test('a message leaves once: replayed token and duplicate text send nothing more', async () => {
  let envois = 0; const post = poster(async () => { envois++; return new Response('{}'); });
  const message = `Doublon ${Math.random()}`;
  const j = await jeton();
  assert.equal((await post({ ...base, message, jeton: j })).code, 200);
  assert.equal((await post({ ...base, message: 'autre', jeton: j })).code, 200);
  assert.match((await post({ ...base, message, jeton: await jeton() })).message, /déjà parti/);
  assert.equal(envois, 1);
  assert.equal((await post({ ...base, message: `${message} suite`, jeton: await jeton() })).code, 200);
  assert.equal(envois, 2);
});
test('a failed send can be retried with the same text', async () => {
  let ok = false, envois = 0; const post = poster(async () => { envois++; return new Response('{}', { status: ok ? 200 : 500 }); });
  const message = `Échec ${Math.random()}`;
  assert.equal((await post({ ...base, message, jeton: await jeton() })).code, 502);
  ok = true;
  assert.equal((await post({ ...base, message, jeton: await jeton() })).code, 200);
  assert.equal(envois, 2);
});
