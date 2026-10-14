/*
 * Les quatre expertises de Lilian, dans l'ordre qu'il a donné le 3 octobre
 * 2026 : automatisation, agents IA, dashboards et outils métiers, formations.
 *
 * Les phrases sont celles des blocs de `home-services.astro`, qui les portait
 * avec une scène animée chacun. Depuis le 14 octobre 2026, l'accueil les
 * donne en liste simple (`accueil-expertises.astro`) : un nom, une phrase,
 * une sortie.
 */

export interface Expertise {
  id: string;
  nom: string;
  phrase: string;
  lien: { href: string; label: string; externe?: boolean; goal: string; source: string };
}

export const expertises: Expertise[] = [
  {
    id: 'automatisation',
    nom: 'Automatisation',
    phrase: 'Je relie vos outils, et les ressaisies disparaissent.',
    lien: { href: '/automatisations-ia', label: 'Voir l’offre automatisation', goal: 'service_path_opened', source: 'home_metier_automation' },
  },
  {
    id: 'agents-ia',
    nom: 'Agents IA',
    phrase: 'Un agent qui va chercher la réponse à votre place.',
    lien: { href: 'https://agenceafk.fr', label: 'Voir mon agence, agenceafk', externe: true, goal: 'outbound_agence', source: 'home_services' },
  },
  {
    id: 'dashboards',
    nom: 'Dashboards et outils métiers',
    phrase: 'Un dashboard qui dit où vous en êtes, un outil fait pour votre métier.',
    lien: { href: '/sites-web-abonnement#applications', label: 'Voir les applications métier', goal: 'service_path_opened', source: 'home_metier_web' },
  },
  {
    id: 'formations',
    nom: 'Formations',
    phrase: 'J’apprends à vos équipes à le faire elles-mêmes.',
    lien: { href: 'https://augmentes.fr', label: 'Voir les formations Augmentés', externe: true, goal: 'outbound_formations', source: 'home_services' },
  },
];
