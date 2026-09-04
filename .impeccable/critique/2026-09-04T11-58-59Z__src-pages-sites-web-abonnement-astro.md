---
target: src/pages/sites-web-abonnement.astro
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
timestamp: 2026-09-04T11-58-59Z
slug: src-pages-sites-web-abonnement-astro
---
# Impeccable critique — Sites web par abonnement

Method: dual-agent (A: critique_a_sites_web_retry · B: critique_b_sites_web_retry)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Les états de navigation, focus et réservation sont solides ; la page est surtout statique. |
| 2 | Match System / Real World | 2 | Le français est direct, mais Build / Care / Growth impose une traduction et le calendrier parle encore d'automatisation. |
| 3 | User Control and Freedom | 4 | Navigation interne, fermeture, Escape et restauration du focus fonctionnent. |
| 4 | Consistency and Standards | 3 | La DA est cohérente, mais les mêmes captures sont tantôt liens, tantôt figures statiques. |
| 5 | Error Prevention | 3 | Prix, périmètres et limites réduisent les malentendus ; le contexte du calendrier reste ambigu. |
| 6 | Recognition Rather Than Recall | 2 | Les offres sont visibles, mais leur comparaison mobile exige de mémoriser les cartes précédentes. |
| 7 | Flexibility and Efficiency | n/a | Surface Persuade. |
| 8 | Aesthetic and Minimalist Design | 2 | Le langage est fort, affaibli par 19 apparitions de 6 captures et des structures répétées. |
| 9 | Error Recovery | 4 | L'overlay de réservation prévoit message, retry, fallback et sortie. |
| 10 | Help and Documentation | n/a | Surface Persuade. |
| **Total** | | **23/32** | **Bonne base ; hiérarchie et conversion à simplifier.** |

## Design Specificity Verdict

La DA est réellement signée : lime acide en surface, encre noire, angles droits, filets fins, Geist et surlignages penchés. Elle ne ressemble pas à un template d'agence générique.

La composition est beaucoup moins spécifique. Presque toutes les sections répètent le même enchaînement titre à gauche, texte à droite, filet, capture, texte ou liste. Les six projets uniques apparaissent 19 fois. La preuve devient une texture et la galerie finale perd son rôle de révélation. L'opportunité la plus distinctive est le modèle création, maintenance, amélioration mesurée ; la page doit l'expliquer comme un système cohérent.

Le scan CLI est propre : 0 règle sur la source. L'overlay navigateur a remonté 6 signaux : un H1 occupant 46 % du viewport, trois faux positifs de contraste sur des légendes posées sur gradient sombre, un signal de longueur de ligne à vérifier et un faux positif de capitales dans le footer.

## Overall Impression

Un système visuel premium porte un catalogue trop long. Le site sait ce qu'il vend, mais prouve son savoir-faire avec les mêmes captures jusqu'à transformer la preuve en bruit. Le service doit mener ; le portfolio doit culminer une seule fois.

## What's Working

- La discipline de marque est excellente : contraste, géométrie, lime et hiérarchie typographique donnent une vraie autorité.
- L'information commerciale est honnête : prix, inclusions, livrables, limites IA et expertises exclues rassurent sans surpromesse.
- Le responsive et l'accessibilité sont solides : aucun débordement à 320/402 px, cibles tactiles, focus, reduced motion et états du calendrier sont bien traités.

## Priority Issues

### [P1] Retirer tous les exemples du hero

**Pourquoi :** le hero dépasse un viewport et met trois captures en concurrence avec la promesse.

**Fix :** hero éditorial, centré sur la promesse, l'action et un résumé compact du cycle création, maintenance, amélioration.

**Commande :** `$impeccable distill`

### [P1] Cesser d'utiliser le portfolio comme texture de fond

**Pourquoi :** 19 usages de 6 assets affaiblissent la preuve, rallongent la page et répètent les mêmes descriptions accessibles.

**Fix :** réserver les six captures à la section Réalisations ; conserver ailleurs uniquement un visuel qui explique réellement une idée.

**Commande :** `$impeccable quieter`

### [P1] Refaire les trois offres pour la comparaison

**Pourquoi :** chaque carte mélange image, cas, titre, prix, promesse et inclusions. Le troisième prix casse sur plusieurs lignes et gagne une importance accidentelle.

**Fix :** une structure texte alignée par ligne, avec numéro, usage, offre, prix et périmètre sur des repères communs.

**Commande :** `$impeccable layout`

### [P1] Rendre la réservation spécifique aux projets web

**Pourquoi :** le calendrier visible parle d'automatisation et d'IA au point le plus sensible du tunnel.

**Fix :** événement dédié ou description et questions d'entrée explicitement orientées site web.

**Commande :** `$impeccable clarify`

### [P2] Donner à chaque section une composition liée à son rôle

**Pourquoi :** pricing, méthode, limites, preuve et FAQ ressemblent à des variantes du même template.

**Fix :** comparaison pour les offres, ledger pour les abonnements, timeline pour la méthode, frontière accepte/refuse, galerie unique et FAQ texte.

**Commande :** `$impeccable shape`

## Persona Red Flags

**Jordan, premier acheteur :** voit la promesse mais doit traverser un montage avant les formats achetables ; Build, Care et Growth créent une seconde nomenclature ; le calendrier automation déclenche un doute de destination.

**Riley, stress tester :** constate que les mêmes surfaces sont parfois cliquables, parfois statiques et souvent décoratives ; le contexte de réservation ne conserve pas l'intention site web.

**Casey, mobile distrait :** profite de bonnes cibles tactiles, mais subit un hero de 1 459 px, une page de plus de 15 000 px et trois offres étalées sur près de 2 000 px.

**Camille, Head of Ops / fondatrice :** apprécie prix et limites précises, mais attend une preuve concentrée de jugement opérationnel plutôt que les mêmes homepages répétées.

## Minor Observations

- Le rail Build / Care / Growth n'oriente pas le premier viewport parce qu'il tombe sous le montage.
- Navigation française et labels anglais créent deux modèles mentaux concurrents.
- Les captures FAQ n'ont aucun lien avec les objections traitées.
- Le `directionContract` exige encore trois sites dans le hero et doit suivre la nouvelle direction.

## Questions to Consider

- Si les captures ne pouvaient apparaître qu'une fois, où créeraient-elles le meilleur pic de confiance ?
- La page vend-elle cinq packages ou un cycle unique : créer, maintenir, améliorer ?
- Quelle preuve doit porter le hero lorsqu'aucune capture n'y est autorisée ?
- Les leads sites web doivent-ils voir une description de calendrier centrée sur l'automatisation ?
