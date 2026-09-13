import { z } from 'astro/zod';

const signupSchema = z.object({
  email: z.string().trim().email().max(254),
  website: z.string().max(256).optional(),
});
const environmentSchema = z.object({ apiKey: z.string().trim().min(1) });
const subscriberSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['PENDING_CONFIRMATION', 'SUBSCRIBED', 'UNSUBSCRIBED', 'BOUNCED', 'BANNED', 'COMPLAINED', 'TRANSACTIONAL']),
});
const lumailUrl = 'https://lumail.io/api/v2/subscribers';
const unavailable = 'L’inscription n’a pas abouti. Réessayez dans quelques instants.';

// Only Vite's development middleware calls this export. Vercel passes its
// encrypted environment directly to signupNewsletter from api/newsletter.ts.
export function signupNewsletterFromDev(request: Request): Promise<Response> {
  return signupNewsletter(request, import.meta.env.LUMAIL_API_KEY);
}

function reply(body: { status: 'pending' | 'subscribed' | 'error'; message: string }, status = 200): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/** Shared by the Vercel function and the local Astro development middleware. */
export async function signupNewsletter(
  request: Request,
  apiKey: unknown,
  expectedOrigin = new URL(request.url).origin,
): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } });
  }
  if (request.headers.get('origin') !== expectedOrigin) {
    return reply({ status: 'error', message: 'Rechargez la page puis réessayez.' }, 403);
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return reply({ status: 'error', message: 'Le format de la demande est invalide.' }, 415);
  }

  let input: unknown;
  try {
    // Bound the body before decoding it; Content-Length is not always present.
    const reader = request.body?.getReader();
    if (!reader) return reply({ status: 'error', message: 'Indiquez votre adresse email.' }, 400);
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
  } catch {
    return reply({ status: 'error', message: 'La demande est invalide. Réessayez.' }, 400);
  }
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) return reply({ status: 'error', message: 'Indiquez une adresse email valide.' }, 422);
  if (parsed.data.website) return reply({ status: 'error', message: 'Rechargez la page puis réessayez.' }, 400);
  const environment = environmentSchema.safeParse({ apiKey });
  if (!environment.success) return reply({ status: 'error', message: unavailable }, 503);

  const headers = { Authorization: `Bearer ${environment.data.apiKey}`, 'Content-Type': 'application/json' };
  try {
    // Lumail defaults resubscribe to true. Never let this public form revive an exclusion.
    const existing = await fetch(`${lumailUrl}/${encodeURIComponent(parsed.data.email)}`, {
      headers, signal: AbortSignal.timeout(10_000),
    });
    if (existing.status !== 404) {
      if (!existing.ok) return reply({ status: 'error', message: unavailable }, existing.status === 429 ? 429 : 502);
      const subscriber = subscriberSchema.safeParse(await existing.json());
      if (!subscriber.success) return reply({ status: 'error', message: unavailable }, 502);
      if (!['PENDING_CONFIRMATION', 'SUBSCRIBED'].includes(subscriber.data.status)) {
        return reply({ status: 'error', message: 'Cette adresse ne peut pas être inscrite depuis ce formulaire. Vous pouvez me contacter pour en savoir plus.' }, 409);
      }
    }

    const response = await fetch(lumailUrl, {
      method: 'POST', headers, signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ email: parsed.data.email, tags: ['newsletter'], resubscribe: false }),
    });
    if (!response.ok) {
      return reply({ status: 'error', message: response.status === 429 ? 'Trop de demandes. Patientez une minute avant de réessayer.' : unavailable }, response.status === 429 ? 429 : 502);
    }
    const subscriber = subscriberSchema.safeParse(await response.json());
    if (!subscriber.success) return reply({ status: 'error', message: unavailable }, 502);
    if (subscriber.data.status === 'PENDING_CONFIRMATION') {
      return reply({ status: 'pending', message: 'Vérifiez votre boîte mail et cliquez sur le lien de confirmation. Pensez aussi aux indésirables.' });
    }
    if (subscriber.data.status === 'SUBSCRIBED') {
      return reply({ status: 'subscribed', message: 'Votre adresse est bien inscrite. À bientôt dans votre boîte mail.' });
    }
    return reply({ status: 'error', message: 'Cette adresse ne peut pas être inscrite depuis ce formulaire.' }, 409);
  } catch {
    return reply({ status: 'error', message: unavailable }, 502);
  }
}
