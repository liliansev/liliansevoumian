# Explorations Three.js

Route de démonstration : `/explorations-3d`, hors sitemap et en `noindex`.
Trois études à faire valider par Lilian avant de choisir leur place sur le site.

- `orbites` : anneaux et satellites, d’un ensemble dispersé à des orbites organisées.
- `flux` : conduits courbes et paquets, des détours à un parcours direct.
- `structure` : niveaux d’une application, de la vue éclatée à l’assemblage.

Les volumes, trajectoires et transitions sont procéduraux. Aucun modèle, texture
ou workflow client n’est utilisé. Les textes restent en HTML. Une seule scène et
un seul moteur WebGL sont actifs ; les ressources sont libérées au changement.
La lecture est suspendue hors écran et dans un onglet masqué. La préférence de
mouvement réduit désactive la lecture automatique ; une action explicite permet
de l’activer. Le curseur reste utilisable au clavier.

## Skills installés le 7 septembre 2026

Source : https://github.com/CloudAI-X/threejs-skills
Révision inspectée : `b1c623076c661fc9b03dac19292e825a5d106823`.

`threejs-fundamentals`, `threejs-geometry`, `threejs-materials`,
`threejs-interaction`, `threejs-animation` sont installés dans
`~/.codex/skills/` par l’installateur Codex. Ces dossiers ne contiennent que leur
fichier de référence `SKILL.md`. La documentation primaire Three.js a également
été consultée via Context7 avant l’implémentation.

## Validation locale

Astro sync et TypeScript : passés. Rendu WebGL2 confirmé dans agent-browser.
Captures inspectées à 1440 × 900, 402 × 874, 834 × 1194, 1194 × 834 et
1854 × 1235. Pas de débordement horizontal constaté.

Chemins exécutés : changement des trois scènes, curseur zéro/cent, replay jusqu’à
cent, rotation par glisser et clavier, retour à la vue initiale, mouvement réduit
(aucune boucle de rendu continue), interruption WebGL et rechargement, module
réseau bloqué puis reprise. Le geste tactile sur appareil physique reste à
vérifier avant une éventuelle intégration publique.

Preuves de la revue : `.impeccable/review/three-*.png`.
