# Scènes des pages publiques

Les deux scènes Three.js des offres partagent les fabriques de géométrie de
`../three-lab/` avec un cycle de lecture propre, sans rotation libre. Le
laboratoire reste expérimental et en `noindex`. Depuis la suppression demandée le 13 septembre 2026, la home ne monte plus
la section `#temps-retrouve` : ni relais SVG/CSS, ni ce runtime, ni Three.js.

## Répartition

| Fichier | Responsabilité |
|---|---|
| `src/components/three-scene.astro` | Élément `site-scene` des offres, commandes, canvas nommé, calque HTML, fallback et import différé du runtime. |
| `src/components/automation-control-diagram.astro` | Flux, légende des contrôles et fallback HTML avec anneaux SVG. |
| `src/components/application-system-diagram.astro` | Structure, légende de la vue commune et SVG statique. |
| `runtime.ts` | Offres : rendu, cadrage, projection des textes, lecture finie, visibilité et nettoyage. |
| `../three-lab/flow.ts` | Trois conduits, passage de traitement et éléments en circulation. |
| `../three-lab/structure.ts` | Assemblage des niveaux Données, Application et Équipe. |

Les fabriques retournent un `LabScene` : groupe, libellés avec ancrages et
`update(time, progress)`. Le runtime relit les textes à chaque rendu ; leur
contenu ne doit pas être figé lors de la création du calque HTML. La palette
provient des propriétés CSS calculées du composant, sans duplication des couleurs.

## Home : ancien composant conservé

`home-transformation.astro` reste dans le dépôt comme artefact historique.
Il n’est plus importé par `src/pages/index.astro`. Le relais SVG/CSS documenté
et vérifié le 9 septembre ne décrit donc plus le parcours de la home.

## Offres : `runtime.ts`

Flux et Structure conservent le cycle suivant :

1. Le HTML/SVG porte l’état statique dès le rendu Astro. L’import démarre à
   200 px du viewport ; une génération empêche un montage asynchrone après
   déconnexion de l’élément.
2. WebGL initialise un renderer basse consommation, avec DPR limité à 1,5.
   Le fallback reste visible jusqu’au premier rendu réussi, puis le composant
   prend l’état `ready`.
3. La transition automatique exige 25 % du viewport du canvas visible. Elle dure
   4,6 s, dont 0,65 s de tenue initiale, puis s’arrête. Les boutons fixent la
   progression à 0 ou 1 ; Pause conserve la position, Reprendre poursuit le
   parcours et Rejouer repart du début.
4. La boucle se suspend hors écran ou dans un onglet masqué. À l’arrêt, la
   parallaxe de souris demande uniquement les rendus nécessaires. Aucun
   `OrbitControls` n’est importé dans ce runtime.
5. Un redimensionnement recalcule le cadrage en conservant la progression.
6. Une erreur ou une perte du contexte WebGL remet le fallback et masque les
   commandes. La déconnexion annule le rendu, retire les écouteurs, déconnecte
   les observateurs et libère géométries, matériaux et renderer.

Avec `prefers-reduced-motion`, la scène commence à 1, le replay est masqué et
la parallaxe désactivée. Les boutons d’extrémité restent utilisables et produisent
un rendu statique. Il n’y a pas de boucle continue. Les textes projetés sont
masqués aux lecteurs d’écran ; le canvas possède une description complète et
les légendes explicatives restent dans le HTML.

## Validation locale

Le [contrat courant de la home](../../../.impeccable/review/night-home-contract.md)
et son [verdict](../../../.impeccable/review/night-home-finish-review.md) attestent
la suppression locale de la section. Les preuves `paper-home-*`,
`scroll-scenes-*` et `scroll-home-*` restent historiques.

La validation initiale des offres reste documentée par
`site-scenes-verdict.md`, `site-scenes-viewports.json` et `site-scenes-detector.json`
sous `.impeccable/review/` ; aucune nouvelle QA complète des offres n’est
revendiquée ici. Le brief courant est `.impeccable/surfaces/site-scenes.md`.
Aucun déploiement en production ni test sur appareil tactile physique n’est
attesté par cet amendement documentaire.
