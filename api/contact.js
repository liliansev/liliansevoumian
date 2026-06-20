/*
 * api/contact.js — endpoint serverless Vercel pour le formulaire de contact.
 *
 * Reçoit { name, email, message }, valide, et envoie un mail via l'API Resend
 * (fetch direct, pas de dépendance npm). Le visiteur en reply_to → répondre
 * = répondre au prospect.
 *
 * Variables d'env Vercel requises :
 *   - RESEND_API_KEY   (obligatoire)  clé API Resend (re_...)
 *   - CONTACT_TO       (optionnel)    destinataire, défaut bonjour@liliansevoumian.fr
 *   - CONTACT_FROM     (optionnel)    expéditeur, défaut onboarding@resend.dev
 *                                     → en prod, mettre une adresse d'un domaine
 *                                       VÉRIFIÉ dans Resend (ex. contact@liliansevoumian.fr)
 *
 * Note : en dev Astro local (pnpm dev), les fonctions /api/* ne tournent pas
 * (il faut `vercel dev`). Le formulaire bascule alors sur son fallback mailto.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // req.body peut être une string si le content-type n'est pas parsé.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'JSON invalide' });
    }
  }

  const name = (body?.name || '').toString().trim();
  const email = (body?.email || '').toString().trim();
  const message = (body?.message || '').toString().trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  if (name.length > 120 || message.length > 4000 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Champs invalides' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Pas de clé → on signale l'indisponibilité, le client bascule sur le mailto.
    return res.status(503).json({ error: 'Service email non configuré' });
  }

  const to = process.env.CONTACT_TO || 'bonjour@liliansevoumian.fr';
  const from = process.env.CONTACT_FROM || 'Landing liliansevoumian.fr <onboarding@resend.dev>';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nouvelle demande — ${name}`,
        text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ error: 'Envoi échoué', detail });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur', detail: String(err) });
  }
}
