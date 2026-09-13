export const sceneContent = {
  orbites: {
    name: 'Orbites',
    title: 'Tout ne repose plus sur vous.',
    description: 'Factures, contenus, support : les tâches s’organisent autour d’un système qui prend le relais.',
    placement: 'Sur la homepage, pour raconter le temps retrouvé.',
    before: 'Tout se croise',
    after: 'Chacun trouve sa place',
    summary: 'Trois orbites et leurs satellites passent d’un ensemble désordonné à un système organisé autour des automatisations.',
  },
  flux: {
    name: 'Flux',
    title: 'Les tâches avancent, sans les relancer.',
    description: 'Une demande entre, elle est traitée, puis déclenche une action. Le mouvement rend ce parcours visible.',
    placement: 'Sur la page Automatisation & IA, pour expliquer la méthode.',
    before: 'Des détours',
    after: 'Un parcours fluide',
    summary: 'Trois conduits sinueux se réorganisent en chemins directs. Des éléments les parcourent, des demandes jusqu’aux actions.',
  },
  structure: {
    name: 'Structure',
    title: 'Un outil qui relie votre activité.',
    description: 'Vos données, votre application et votre équipe s’assemblent dans une même structure.',
    placement: 'Sur la page Sites & applications, pour montrer un outil métier.',
    before: 'Des briques séparées',
    after: 'Un outil commun',
    summary: 'Trois niveaux représentant les données, l’application et l’équipe s’assemblent en une structure commune.',
  },
} as const;

export type SceneId = keyof typeof sceneContent;

export function isSceneId(value: string): value is SceneId {
  return Object.hasOwn(sceneContent, value);
}
