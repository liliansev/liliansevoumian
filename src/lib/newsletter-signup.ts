import { z } from 'astro/zod';

const signupSchema = z.object({
  email: z.string().trim().email().max(254),
  website: z.string().max(256).optional(),
});
const environmentSchema = z.object({ apiKey: z.string().trim().min(1) });
const contactSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['active', 'pending', 'unsubscribed', 'bounced', 'complained', 'dormant']),
  created: z.boolean(),
});
const errorSchema = z.object({ error: z.object({ code: z.string(), message: z.string() }) });
const mailcheapUrl = 'https://mailcheap.ai/api/v1/contacts';
// « Lilian l'indé super augmenté », la newsletter commune avec augmentes.fr, en
// double opt-in. Par son ID : le slug se renomme dans Mailcheap, l'ID jamais.
const newsletterId = '6ad500cebd2734069bf04c2e';
// Mailcheap n'a pas de tags : la provenance tient dans `source`, posée à la
// première inscription seulement.
const source = 'newsletter-liliansevoumian';
// Seul format observé (2026-10-18) d'un domaine mal orthographié : « Did you mean jane@gmail.com? ».
const suggestion = /^Did you mean (\S+@\S+)\?$/;
const unavailable = 'L’inscription n’a pas abouti. Réessayez dans quelques instants.';

// Chaque échec laisse une ligne dans les journaux du serveur, avec un préfixe
// stable. Jamais l'adresse du visiteur ni la clé : seulement l'étape et sa cause.
// Sans ça, le formulaire peut rester en panne des semaines sans que rien ne le dise.
const tracer = (etape: string, detail?: unknown) => console.error(`[newsletter] ${etape}`, detail ?? '');

// Only Vite's development middleware calls this export. The production server
// (deploy/server.mjs) passes its runtime environment directly to signupNewsletter.
export function signupNewsletterFromDev(request: Request): Promise<Response> {
  return signupNewsletter(request, import.meta.env.MAILCHEAP_API_KEY);
}

function reply(body: { status: 'pending' | 'subscribed' | 'error'; message: string }, status = 200): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/**
 * Shared by the production server, the Vercel function and the local Astro
 * development middleware.
 * `ip` is the visitor's address: Mailcheap allows 5 signups per visitor in 10 minutes.
 */
export async function signupNewsletter(
  request: Request,
  apiKey: unknown,
  expectedOrigin = new URL(request.url).origin,
  ip?: string,
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
    // Bound the body before decoding it; Content-Length is not always present.
    const reader = request.body?.getReader();
    if (!reader) return reply({ status: 'error', message: 'Indiquez votre adresse e-mail.' }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 4096) {
        await reader.cancel();
        return reply({ status: 'error', message: 'La demande est trop volumineuse.' }, 413);
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
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return reply({ status: 'error', message: 'Indiquez une adresse e-mail valide.' }, 422);
  if (parsed.data.website) {
    tracer('champ piège rempli');
    return reply({ status: 'error', message: 'Rechargez la page puis réessayez.' }, 400);
  }
  const environment = environmentSchema.safeParse({ apiKey });
  if (!environment.success) {
    tracer('MAILCHEAP_API_KEY absente ou vide : aucune inscription possible');
    return reply({ status: 'error', message: unavailable }, 503);
  }

  try {
    const response = await fetch(mailcheapUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${environment.data.apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
      // Never let this public form revive an unsubscribed contact.
      body: JSON.stringify({
        newsletter: newsletterId, email: parsed.data.email, source, resubscribe: false,
        ...(ip && ip.length <= 45 ? { ip } : {}),
      }),
    });
    const body: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const failure = errorSchema.safeParse(body);
      const code = failure.success ? failure.data.error.code : undefined;
      tracer('inscription refusée par Mailcheap', { status: response.status, code });
      if (code === 'validation_failed') {
        // Domaine mal orthographié, adresse piège ou boîte connue pour rejeter les e-mails.
        const proposee = failure.success ? suggestion.exec(failure.data.error.message)?.[1] : undefined;
        return reply({
          status: 'error',
          message: proposee
            ? `Adresse e-mail refusée. Vouliez-vous dire ${proposee} ?`
            : 'Cette adresse e-mail ne peut pas recevoir mes e-mails. Vérifiez-la ou utilisez-en une autre.',
        }, 422);
      }
      if (code === 'rate_limited' || response.status === 429) {
        return reply({ status: 'error', message: 'Trop de demandes. Patientez quelques minutes avant de réessayer.' }, 429);
      }
      return reply({ status: 'error', message: unavailable }, 502);
    }
    const contact = contactSchema.safeParse(body);
    if (!contact.success) {
      tracer('réponse Mailcheap hors schéma', contact.error.issues);
      return reply({ status: 'error', message: unavailable }, 502);
    }
    if (contact.data.status === 'pending') {
      return reply({ status: 'pending', message: 'Vérifiez votre boîte mail et cliquez sur le lien de confirmation. Pensez aussi aux indésirables.' });
    }
    if (contact.data.status === 'active') {
      // Nouveau et déjà actif : la confirmation a été coupée dans Mailcheap.
      if (contact.data.created) tracer('contact créé sans double opt-in : vérifier requireConfirmation dans Mailcheap');
      return reply({ status: 'subscribed', message: 'Votre adresse est bien inscrite. À bientôt dans votre boîte mail.' });
    }
    return reply({ status: 'error', message: 'Cette adresse ne peut pas être inscrite depuis ce formulaire. Vous pouvez me contacter pour en savoir plus.' }, 409);
  } catch (erreur) {
    tracer('appel à Mailcheap en échec', erreur);
    return reply({ status: 'error', message: unavailable }, 502);
  }
}
