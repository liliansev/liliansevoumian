import { envoyerMessageContact } from '../src/lib/contact-message.js';

// Même charpente que api/newsletter.ts : l'hôte routé, le protocole public.
export function POST(request: Request): Promise<Response> {
  const publicUrl = new URL(request.url);
  publicUrl.protocol = 'https:';
  return envoyerMessageContact(request, process.env, publicUrl.origin);
}
