import { z } from 'astro/zod';
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
 */

const messageSchema = z.object({
  email: z.string().trim().email().max(254),
  nom: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  source: z.string().trim().max(80).optional().default(''),
  website: z.string().max(256).optional(),
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
}

/** Seul le serveur de développement de Vite appelle cet export. */
export function envoyerMessageContactDepuisDev(request: Request): Promise<Response> {
  return envoyerMessageContact(request, import.meta.env as ContactEnvironment);
}

function reply(body: { status: 'sent' | 'error'; message: string }, status = 200): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/** Partagé par le serveur de production, la fonction Vercel et le serveur de dev. */
export async function envoyerMessageContact(
  request: Request,
  env: ContactEnvironment,
  expectedOrigin = new URL(request.url).origin,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } });
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

  const parsed = messageSchema.safeParse(input);
  if (!parsed.success) {
    const champ = parsed.error.issues[0]?.path[0];
    const message = champ === 'email' ? 'Indiquez une adresse e-mail valide.'
      : champ === 'message' ? 'Écrivez votre message (5 000 caractères au plus).'
      : 'Vérifiez les champs puis réessayez.';
    return reply({ status: 'error', message }, 422);
  }
  if (parsed.data.website) {
    tracer('champ piège rempli');
    return reply({ status: 'error', message: 'Rechargez la page puis réessayez.' }, 400);
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
      tracer('envoi refusé par Resend', response.status);
      return reply({ status: 'error', message: response.status === 429 ? 'Trop de messages d’un coup. Patientez une minute avant de réessayer.' : indisponible }, response.status === 429 ? 429 : 502);
    }
    return reply({ status: 'sent', message: 'Votre message est bien parti. Je vous réponds par e-mail.' });
  } catch (erreur) {
    tracer('appel à Resend en échec', erreur);
    return reply({ status: 'error', message: indisponible }, 502);
  }
}
