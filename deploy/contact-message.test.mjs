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
  assert.equal((await post({ ...base, message: 'Le contexte est ici : https://monpartage.online/fr/mkt/x', jeton: await jeton() })).code, 422);
  assert.equal((await post({ ...base, message: 'voir www.monsite.fr', jeton: await jeton() })).code, 422);
  assert.equal((await post({ ...base, message: 'contexte : mondocs.my.id/fr/mkt/x', jeton: await jeton() })).code, 422);
  assert.equal((await post({ ...base, message: 'mon site : monsite.fr', jeton: await jeton() })).code, 422);
  assert.equal((await post({ ...base, email: 'a@yopmail.com', jeton: await jeton() })).code, 422);
});
test('blocked robot domains get a fake success; an e-mail or Node.js is not a link', async () => {
  let envois = 0; const post = poster(async () => { envois++; return new Response('{}'); });
  assert.equal((await post({ ...base, email: 'nicolas.hocquet6834@prodmail.online', jeton: await jeton() })).code, 200);
  assert.equal((await post({ ...base, email: 'x@mx.prodmail.online', jeton: await jeton() })).code, 200);
  assert.equal(envois, 0);
  assert.equal((await post({ ...base, message: `Sous Node.js, etc. Écrivez-moi à moi@exemple.fr ${Math.random()}`, jeton: await jeton() })).code, 200);
  assert.equal(envois, 1);
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
test('turnstile: off without both keys, required and verified once they are set', async () => {
  const sansCle = await (await emettreJetonContact(env)).json();
  assert.equal(sansCle.turnstile, undefined);
  const envCaptcha = { ...env, TURNSTILE_SITE_KEY: 'site', TURNSTILE_SECRET_KEY: 'secret' };
  assert.equal((await (await emettreJetonContact(envCaptcha)).json()).turnstile, 'site');
  let envois = 0, verifiees = [];
  const fetchImpl = async (url, init) => {
    if (String(url).includes('turnstile')) { const r = new URLSearchParams(init.body).get('response'); verifiees.push(r); return Response.json({ success: r === 'humain' }); }
    envois++; return new Response('{}');
  };
  const post = async body => {
    const response = await envoyerMessageContact(new Request(`${origin}/api/contact`, { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) }), envCaptcha, origin, fetchImpl);
    return response.status;
  };
  const j = async () => (await emettreJetonContact(envCaptcha, Date.now() - 10_000).json()).jeton;
  assert.equal(await post({ ...base, message: `Sans case ${Math.random()}`, jeton: await j() }), 403);
  assert.equal(await post({ ...base, message: `Robot ${Math.random()}`, jeton: await j(), turnstile: 'robot' }), 403);
  assert.equal(await post({ ...base, message: `Humain ${Math.random()}`, jeton: await j(), turnstile: 'humain' }), 200);
  assert.deepEqual(verifiees, ['robot', 'humain']);
  assert.equal(envois, 1);
});
