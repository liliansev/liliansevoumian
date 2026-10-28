import { emettreJetonContact, envoyerMessageContact, type ContactEnvironment } from '../src/lib/contact-message.js';

// Même charpente que api/newsletter.ts : l'hôte routé, le protocole public.
export function POST(request: Request): Promise<Response> {
  const publicUrl = new URL(request.url);
  publicUrl.protocol = 'https:';
  return envoyerMessageContact(request, process.env as ContactEnvironment, publicUrl.origin);
}

// Le jeton que le formulaire demande avant d'envoyer (voir lib/contact-message).
export function GET(): Response {
  return emettreJetonContact(process.env as ContactEnvironment);
}
