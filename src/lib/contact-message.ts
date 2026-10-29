import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { z } from 'astro/zod';
import domainesJetables from 'disposable-email-domains-js/dist/dict/disposable_email_blocklist.json';
import { EMAIL_CONTACT } from './contact';

/*
 * Le formulaire de contact (`formulaire-contact.astro`) : une adresse, un nom,
 * un message, et le tout part dans la boîte de Lilian par Resend. Le visiteur
 * n'a rien d'autre à ouvrir ; Lilian lui répond d'un simple « Répondre », le
 * `reply_to` étant l'adresse du visiteur.
 *
 * Variables d'environnement (jamais dans le code ni dans l'image) :
 *   RESEND_API_KEY   requise : la clé Resend ;
 *   CONTACT_TO       facultative : la boîte qui reçoit, `EMAIL_CONTACT` sinon ;
 *   CONTACT_FROM     facultative : l'expéditeur, sur un domaine vérifié chez
 *                    Resend, `formulaire@liliansevoumian.fr` sinon.
 *   CONTACT_SECRET   facultative : la clé qui signe les jetons du formulaire ;
 *                    dérivée de RESEND_API_KEY sinon (rien à poser en plus).
 *   TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY  facultatives, à poser ensemble :
 *                    le captcha Cloudflare Turnstile. Posées, la page le
 *                    reçoit avec son jeton et l'affiche, le serveur le vérifie ;
 *                    absentes, le formulaire marche sans.
 *
 * Les robots (28 octobre 2026, demande de Lilian), sans CAPTCHA ni service
 * tiers, le site restant sans cookie :
 *   - avant l'envoi : le formulaire demande un jeton signé (GET /api/contact)
 *     quand il approche de l'écran. Le message n'est accepté qu'avec ce jeton,
 *     au moins `DUREE_MIN` après son émission et une seule fois. Un robot qui
 *     poste directement n'en a pas ; un robot trop rapide ou qui remplit le
 *     champ piège reçoit le même succès qu'un humain, sans qu'aucun mail ne
 *     parte, pour ne rien lui apprendre. Les champs sont bornés, les liens en
 *     masse refusés ; le débit par adresse IP est limité par le serveur
 *     (`deploy/server.mjs`).
 *   - après l'envoi : le même message de la même adresse, renvoyé dans le
 *     quart d'heure, ne repart pas ; le formulaire se verrouille côté page.
 *
 * Le 29 octobre 2026, un robot passait tout cela : il ouvre la vraie page,
 * attend, et laisse un seul lien personnalisé, sous une adresse et un domaine
 * de lien différents à chaque fois, toutes les six heures. Depuis :
 *   - rien qui ressemble à un lien dans le message, pas même un nom de
 *     domaine écrit seul : le message est refusé, avec une phrase qui le dit ;
 *   - les adresses jetables connues (la liste publique tenue sur GitHub,
 *     paquet `disposable-email-domains-js`) sont refusées, avec une phrase ;
 *   - les domaines de `DOMAINES_BLOQUES`, vus chez des robots, reçoivent le
 *     succès factice : le robot croit être passé et ne change pas d'adresse ;
 *   - Cloudflare Turnstile, si ses clés sont posées : invisible le plus
 *     souvent, une case « Je suis humain » quand Cloudflare a un doute.
 */

const messageSchema = z.object({
  email: z.string().trim().email().max(254),
  nom: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(2).max(5000),
  source: z.string().trim().max(160).optional().default(''),
  jeton: z.string().max(200).optional().default(''),
  turnstile: z.string().max(4096).optional().default(''),
});
const environmentSchema = z.object({
  apiKey: z.string().trim().min(1),
  to: z.string().trim().email(),
  from: z.string().trim().min(3),
});
const resendUrl = 'https://api.resend.com/emails';
const limite = 8192;
const indisponible = `Le message n’est pas parti. Réessayez dans quelques instants, ou écrivez-moi à ${EMAIL_CONTACT}.`;

// Même règle que la newsletter : une ligne par échec, jamais l'adresse ni le
// texte du visiteur, ni la clé.
const tracer = (etape: string, detail?: unknown) => console.error(`[contact] ${etape}`, detail ?? '');

export interface ContactEnvironment {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  CONTACT_SECRET?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

/** Les deux clés Turnstile, ou rien : l'une sans l'autre n'allume rien. */
function turnstile(env: ContactEnvironment): { site: string; secret: string } | null {
  const site = env.TURNSTILE_SITE_KEY?.trim();
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  return site && secret ? { site, secret } : null;
}

const turnstileUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
async function turnstileValide(secret: string, reponse: string, ip: string | null, fetchImpl: typeof fetch): Promise<boolean> {
  if (!reponse) return false;
  try {
    const corps = new URLSearchParams({ secret, response: reponse });
    if (ip) corps.set('remoteip', ip);
    const resultat = await fetchImpl(turnstileUrl, { method: 'POST', body: corps, signal: AbortSignal.timeout(10_000) });
    const verdict = (await resultat.json()) as { success?: unknown; 'error-codes'?: unknown };
    if (verdict.success !== true) tracer('turnstile refusé', verdict['error-codes']);
    return verdict.success === true;
  } catch (erreur) {
    // Cloudflare injoignable : on ne bloque pas les humains pour autant, le
    // jeton signé et les autres règles restent.
    tracer('turnstile injoignable : vérification sautée', erreur);
    return true;
  }
}

/** Seul le serveur de développement de Vite appelle cet export. */
export function envoyerMessageContactDepuisDev(request: Request): Promise<Response> {
  return envoyerMessageContact(request, import.meta.env as ContactEnvironment);
}

/** La réponse d'un envoi réussi, que le robot écarté reçoit à l'identique. */
const envoye = 'Votre message est bien parti. Je vous réponds par e-mail.';

function reply(body: { status: 'sent' | 'error'; message: string }, status = 200): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/* ── Le jeton : `émission.nonce.signature`, en base64url ──
   Un humain ne remplit pas trois champs en quatre secondes ; la page attend
   d'elle-même ce délai si elle a dû demander son jeton au dernier moment. */
export const DUREE_MIN = 4_000;
const DUREE_MAX = 24 * 3_600_000;
const secretDeSecours = randomBytes(32);
// Les nonces déjà servis à un envoi, avec leur date d'expiration. Le serveur de
// production est un process Node persistant : la mémoire suffit.
const noncesUtilises = new Map<string, number>();
// Les messages partis récemment (empreinte de l'adresse et du texte).
const DOUBLON = 15 * 60_000;
const messagesRecents = new Map<string, number>();
const PLAFOND = 10_000;

function cle(env: ContactEnvironment): Buffer {
  const base = env.CONTACT_SECRET?.trim() || env.RESEND_API_KEY?.trim();
  return base ? createHmac('sha256', base).update('jeton-formulaire-contact').digest() : secretDeSecours;
}
const signer = (env: ContactEnvironment, charge: string) => createHmac('sha256', cle(env)).update(charge).digest('base64url');

function retenir(table: Map<string, number>, valeur: string, jusqua: number) {
  const maintenant = Date.now();
  if (table.size >= PLAFOND) for (const [k, fin] of table) if (fin <= maintenant || table.size >= PLAFOND) table.delete(k); else break;
  table.set(valeur, jusqua);
}
const encore = (table: Map<string, number>, valeur: string) => (table.get(valeur) ?? 0) > Date.now();

export function emettreJetonContact(env: ContactEnvironment, maintenant = Date.now()): Response {
  const charge = `${maintenant.toString(36)}.${randomBytes(12).toString('base64url')}`;
  const captcha = turnstile(env);
  return Response.json({ jeton: `${charge}.${signer(env, charge)}`, attente: DUREE_MIN, ...(captcha ? { turnstile: captcha.site } : {}) }, { headers: { 'Cache-Control': 'no-store' } });
}

type Verdict = 'valide' | 'absent' | 'faux' | 'perime' | 'trop-tot' | 'deja-servi';
function verifierJeton(env: ContactEnvironment, jeton: string, maintenant = Date.now()): { verdict: Verdict; nonce?: string } {
  if (!jeton) return { verdict: 'absent' };
  const [emis, nonce, signature, ...reste] = jeton.split('.');
  if (!emis || !nonce || !signature || reste.length) return { verdict: 'faux' };
  const attendue = Buffer.from(signer(env, `${emis}.${nonce}`));
  const recue = Buffer.from(signature);
  if (attendue.length !== recue.length || !timingSafeEqual(attendue, recue)) return { verdict: 'faux' };
  const age = maintenant - parseInt(emis, 36);
  if (!(age >= 0) || age > DUREE_MAX) return { verdict: 'perime' };
  if (age < DUREE_MIN) return { verdict: 'trop-tot' };
  if (encore(noncesUtilises, nonce)) return { verdict: 'deja-servi' };
  return { verdict: 'valide', nonce };
}

// Tout ce qui ressemble à un lien : un protocole, un « www. », ou un nom de
// domaine écrit seul (`monsite.fr`, `mondocs.my.id`). Les adresses e-mail sont
// retirées avant, et la liste des extensions évite « Node.js » ou « etc. ».
const extensions = 'fr|com|net|org|io|co|ai|app|dev|me|id|info|biz|online|site|website|xyz|top|click|link|live|shop|store|tech|pro|page|club|space|fun|icu|cc|tv|ly|gl|gg|to|eu|be|ch|ca|uk|de|es|it|nl|pt|us|ru|cn|in|br';
const motifLien = new RegExp(`https?:\\/\\/|www\\.|\\b[a-z0-9-]+(?:\\.[a-z0-9-]+)*\\.(?:${extensions})\\b`, 'gi');
const compterLiens = (texte: string) => texte.replace(/\S+@\S+/g, ' ').match(motifLien)?.length ?? 0;

// Les domaines d'adresse vus chez des robots qui passaient le formulaire. On y
// ajoute le domaine qui suit le @ dans un mail indésirable reçu.
const DOMAINES_BLOQUES = new Set(['prodmail.online']);
const jetables = new Set<string>(domainesJetables);
/** Le domaine et chacun de ses parents : `a.b.prodmail.online` est bloqué aussi. */
function domaineDans(email: string, liste: Set<string>): boolean {
  const parties = email.slice(email.lastIndexOf('@') + 1).toLowerCase().split('.');
  return parties.some((_, i) => i < parties.length - 1 && liste.has(parties.slice(i).join('.')));
}

/** Partagé par le serveur de production, la fonction Vercel et le serveur de dev. */
export async function envoyerMessageContact(
  request: Request,
  env: ContactEnvironment,
  expectedOrigin = new URL(request.url).origin,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  if (request.method === 'GET') return emettreJetonContact(env);
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, POST', 'Cache-Control': 'no-store' } });
  }
  if (request.headers.get('origin') !== expectedOrigin) {
    tracer('origine refusée', { recue: request.headers.get('origin'), attendue: expectedOrigin });
    return reply({ status: 'error', message: 'Rechargez la page puis réessayez.' }, 403);
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return reply({ status: 'error', message: 'Le format de la demande est invalide.' }, 415);
  }

  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ status: 'error', message: 'Écrivez votre message.' }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > limite) {
        await reader.cancel();
        return reply({ status: 'error', message: 'Le message est trop long.' }, 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
    input = JSON.parse(new TextDecoder().decode(body));
  } catch (erreur) {
    tracer('corps de la demande illisible', erreur);
    return reply({ status: 'error', message: 'La demande est invalide. Réessayez.' }, 400);
  }

  // Le champ piège, invisible pour un humain : le robot croit avoir réussi.
  const piege = (input as { website?: unknown } | null)?.website;
  if (typeof piege !== 'string' || piege.trim()) {
    tracer('champ piège rempli ou absent : succès factice');
    return reply({ status: 'sent', message: envoye });
  }
  const parsed = messageSchema.safeParse(input);
  if (!parsed.success) {
    const champ = parsed.error.issues[0]?.path[0];
    const message = champ === 'email' ? 'Indiquez une adresse e-mail valide.'
      : champ === 'message' ? 'Écrivez votre message (5 000 caractères au plus).'
      : champ === 'nom' ? 'Votre nom tient en 120 caractères au plus.'
      : 'Vérifiez les champs puis réessayez.';
    return reply({ status: 'error', message }, 422);
  }
  if (domaineDans(parsed.data.email, DOMAINES_BLOQUES)) {
    tracer('domaine bloqué : succès factice');
    return reply({ status: 'sent', message: envoye });
  }
  if (domaineDans(parsed.data.email, jetables)) {
    tracer('adresse jetable');
    return reply({ status: 'error', message: 'Cette adresse est une adresse jetable : indiquez celle où je pourrai vous répondre.' }, 422);
  }
  if (compterLiens(parsed.data.nom) > 0) {
    return reply({ status: 'error', message: 'Le champ du nom ne prend pas de lien.' }, 422);
  }
  if (compterLiens(parsed.data.message) > 0) {
    tracer('lien dans le message');
    return reply({ status: 'error', message: 'Votre message a été refusé : il contient un lien. Retirez-le, je vous demanderai l’adresse en vous répondant.' }, 422);
  }
  const { verdict, nonce } = verifierJeton(env, parsed.data.jeton);
  if (verdict === 'trop-tot' || verdict === 'deja-servi') {
    tracer(`jeton ${verdict} : succès factice`);
    return reply({ status: 'sent', message: envoye });
  }
  if (verdict === 'perime') {
    return reply({ status: 'error', message: 'La page est ouverte depuis trop longtemps. Copiez votre message, rechargez la page, puis renvoyez-le.' }, 403);
  }
  if (verdict !== 'valide' || !nonce) {
    tracer(`jeton ${verdict}`);
    return reply({ status: 'error', message: 'Rechargez la page puis réessayez.' }, 403);
  }
  const captcha = turnstile(env);
  if (captcha && !(await turnstileValide(captcha.secret, parsed.data.turnstile, request.headers.get('x-real-ip'), fetchImpl))) {
    return reply({ status: 'error', message: 'La vérification anti-robot n’a pas abouti. Cochez la case au-dessus du bouton, puis renvoyez.' }, 403);
  }
  const environment = environmentSchema.safeParse({
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_TO || EMAIL_CONTACT,
    from: env.CONTACT_FROM || 'Site liliansevoumian.fr <formulaire@liliansevoumian.fr>',
  });
  if (!environment.success) {
    tracer('RESEND_API_KEY absente ou configuration invalide : aucun envoi possible');
    return reply({ status: 'error', message: indisponible }, 503);
  }

  const { email, message } = parsed.data;
  // Même adresse, même texte, déjà parti dans le quart d'heure : on confirme
  // sans renvoyer. L'empreinte est posée avant l'appel (deux clics simultanés)
  // et retirée si l'envoi échoue.
  const empreinte = createHash('sha256').update(`${email.toLowerCase()}\n${message.replace(/\s+/g, ' ')}`).digest('base64url');
  if (encore(messagesRecents, empreinte)) {
    tracer('doublon écarté');
    return reply({ status: 'sent', message: 'Ce message est déjà parti. Je vous réponds par e-mail.' });
  }
  retenir(messagesRecents, empreinte, Date.now() + DOUBLON);
  retenir(noncesUtilises, nonce, Date.now() + DUREE_MAX);
  const oublier = () => { messagesRecents.delete(empreinte); noncesUtilises.delete(nonce); };
  // Le nom et la source tiennent sur une ligne (le sujet en dépend) : aucun
  // retour à la ligne venu du visiteur.
  const nom = parsed.data.nom.replace(/\s+/g, ' ');
  const source = parsed.data.source.replace(/\s+/g, ' ');
  const qui = nom || email;
  const texte = [
    `De : ${nom ? `${nom} <${email}>` : email}`,
    ...(source ? [`Depuis : ${source}`] : []),
    '',
    message,
    '',
    'Répondez directement à ce mail : la réponse part chez le visiteur.',
  ].join('\n');

  try {
    const response = await fetchImpl(resendUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${environment.data.apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from: environment.data.from,
        to: [environment.data.to],
        reply_to: email,
        subject: `Message du site : ${qui}`,
        text: texte,
      }),
    });
    if (!response.ok) {
      oublier();
      tracer('envoi refusé par Resend', response.status);
      return reply({ status: 'error', message: response.status === 429 ? 'Trop de messages d’un coup. Patientez une minute avant de réessayer.' : indisponible }, response.status === 429 ? 429 : 502);
    }
    return reply({ status: 'sent', message: envoye });
  } catch (erreur) {
    oublier();
    tracer('appel à Resend en échec', erreur);
    return reply({ status: 'error', message: indisponible }, 502);
  }
}
