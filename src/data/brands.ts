/*
 * brands.ts — couleurs officielles des marques d'outils (DA propre à chacune).
 *
 * Source : données officielles simple-icons (hex de marque), complétées pour les
 * quelques marques retirées du jeu simple-icons (Slack, Mailchimp) avec leur
 * couleur officielle connue. Claude/Anthropic : clay #D97757 = vraie couleur de
 * marque Anthropic (simple-icons la réduit au monochrome #191919, invisible en
 * dark) — choix assumé.
 *
 * Marques volontairement ABSENTES (logos monochromes : pas de couleur propre) →
 * fallback neutre theme-aware côté composant : notion, typeform, openai.
 *
 * Clé = slug simple-icons (sans le préfixe « simple-icons: »).
 */
export const brandColors: Record<string, string> = {
  n8n: '#EA4B71',
  make: '#6D00CC',
  zapier: '#FF4F00',
  airtable: '#18BFFF',
  googlesheets: '#34A853',
  slack: '#4A154B',
  hubspot: '#FF7A59',
  stripe: '#635BFF',
  anthropic: '#D97757',
  mistralai: '#FA520F',
  gmail: '#EA4335',
  googledrive: '#4285F4',
  googlecalendar: '#4285F4',
  calendly: '#006BFF',
  shopify: '#7AB55C',
  whatsapp: '#25D366',
  telegram: '#26A5E4',
  discord: '#5865F2',
  mailchimp: '#FFE01B',
  brevo: '#0B996E',
  trello: '#0052CC',
};

/** Couleur de marque pour un nom d'icône (« simple-icons:make » → « #6D00CC »). */
export function brandColorFor(icon: string): string | undefined {
  return brandColors[icon.replace(/^simple-icons:/, '')];
}
