# Schémas éditoriaux

## automation-before-after.png

Visuel approuvé par Lilian le 7 septembre 2026. Source :
`/Users/a1207/.codex/generated_images/01a077ed-2e5d-7a02-bb5b-4f6ee1ab6205/exec-4fefac38-6eb6-4eca-87c3-28bc5ab76089.png`.

Créé et retouché avec l’outil intégré image_gen. Schéma de principe,
pas un workflow client ni une mesure de résultats. Trois scènes : les tâches
reposent sur vous ; elles s’organisent autour des automatisations ; vous
retrouvez du temps pour l’équipe et les clients. Noir, cercles fins gris/lime,
typographie blanche, filets verticaux entre les scènes.

Intégration : homepage après les deux offres. À la demande de Lilian, l’image
est désormais remplacée à toutes les tailles par du HTML/CSS et du SVG dans
`home-transformation.astro`. Le PNG reste une référence visuelle, sans requête
image dans cette section. Les trois schémas sont alignés sur grand écran et
empilés sous 1100 px ; leurs libellés sont du texte HTML sélectionnable.
Les descriptions accessibles reprennent le sens de la composition. Les arcs
effectuent un cycle à l’entrée et un relief CSS discret suit le pointeur fin ;
le réglage de réduction des animations désactive ces mouvements. Pas de
dépendance Three.js ni de scène WebGL.

Prompt final de retouche (outil intégré, pas CLI) :

> Edit the supplied black/white/lime editorial diagram into THREE CLEARLY SEPARATED COMPOSITIONS across a single landscape 16:9 canvas. The user identifies the left diagram as diagram 1, the automation diagram as diagram 2, and asks to move the little 'Vous / Équipe / Clients' diagram into ITS OWN THIRD BLOCK, separate from diagram 2. This is a structural layout edit, preserve existing visual language faithfully. Flat black background, fine grey circular outlines, lime #CDF564 central rings and highlight arcs, near-white French typography. No glow, gradients, shading, illustrations, cards, borders around panels, numbers or decorative elements. Same headline at top 'Et si tout ne passait plus par vous ?'. Below headline three well-spaced columns at x=20%, 51%, 82%, aligned on a common diagram center height. Slim subtle grey VERTICAL separator rules in the gaps between columns, with generous breathing room, do not touch circles; the column separation must be clear. DIAGRAM 1, left: preserve the original four overlapping task circles around the lime central 'Vous' node, exactly the same topology, labels 'Factures', 'Contenus', 'Relances', 'Support client'. Heading above: 'Aujourd’hui'. Caption below: 'Tout repose sur vous.' DIAGRAM 2, middle: preserve the existing ordered 2-by-2 task circles around lime central 'Automatisations', readable label and task names 'Factures', 'Contenus', 'Relances', 'Support client'. Selected arcs lime, remaining outlines grey. Heading above: 'Demain'. Caption below: 'Les tâches s’organisent.' This diagram MUST NOT contain any extra outside 'Vous' node or branches. DIAGRAM 3, right: relocate the original smaller outside 'Vous' node and its 'Équipe', 'Clients' relationships here as an independent diagram, scaled up to have a comparable visual presence while remaining simple and airy. Lime outlined circle labeled 'Vous', then two clean gently diverging curved lime connections to two grey outlined circles labeled 'Équipe' and 'Clients' respectively. Three circles ONLY in this third diagram. These are people relationships, NOT extra task rings. Heading above: 'Et vous'. Caption below: 'Du temps pour ce qui compte.' Keep diagrams fully within their own column, no overlaps between diagrams, all captions on the same baseline, matching heading and body type sizes. REMOVE the old big rising arrow between diagram 1 and 2 because the three-column reading order now communicates the sequence; no new big arrows. Retain one long thin grey horizontal line above bottom outcomes and the footer row 'Temps gagné' / 'Moins d’erreurs' / 'Support plus réactif', in refined near-white typography with tiny vertical separators. No short horizontal rules above individual captions. Every label readable, no line running through text, generous margins. Carefully resize the first two diagrams to fit without changing their internal logic. The third diagram should feel like a deliberate third chapter, not a footnote or a satellite of automation. Output one extremely polished coherent three-part visual, not three separate files.

## Autres schémas

Deux ajouts SVG natifs, sans génération d’image :

- `application-system-diagram.astro` : fichiers, demandes et outils réunis dans
  une application métier utilisée par l’équipe. Une seule occurrence dans
  l’offre sites web, section applications.
- `automation-control-diagram.astro` : contrôles et validation humaine dans
  l’offre automatisation, section méthode.

Ils expliquent des principes de fonctionnement issus du contenu des offres ;
ils ne représentent pas des interfaces, des workflows exécutables ou des
architectures propres à un client. Les cas clients conservent leurs schémas
factuels avec les outils concernés.
