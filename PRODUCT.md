# Product

## Register

brand

## Users

Décideurs qui veulent confier un système numérique à la personne qui va réellement le construire :

- **Heads of Ops / RevOps / fondateurs de startups** (cible primaire). Tech-aware, à l'aise avec les notions d'API/webhook/workflow. Cherchent un partenaire qui parle leur langue, pas un consultant qui survend du « digital ».
- **Dirigeants de PME en croissance** (cible secondaire). Ils viennent avec un process à automatiser ou un site à créer et faire évoluer. Pas devs, mais lassés des agences génériques. Doivent être rassurés par la **clarté du process**, les **preuves visibles** et les **résultats chiffrés**, pas par un ton chaleureux convenu.
- **Agences / studios** qui sous-traitent l'automatisation à un expert (cible tertiaire).

Contexte d'usage : ils arrivent depuis LinkedIn, YouTube ou une recommandation. Ils scrollent debout entre deux meetings ou tard le soir. Ils ont déjà vu 5 sites de freelance qui se ressemblent tous. Le job-to-be-done : décider en moins de 60 secondes si Lilian vaut un appel découverte.

## Product Purpose

Positionner Lilian Sevoumian autour de **deux expertises de même poids** : les automatisations et agents IA d’un côté, les sites web conçus pour évoluer de l’autre. Le vibe coding est la méthode de production commune, pas une troisième offre. L’ensemble doit rester opinionated : deux terrains précis, une même exigence, pas un freelance polyvalent qui prend tout.

Succès = le visiteur réserve un appel de découverte. Métriques secondaires : qualité des leads (ICP qui matche), taux d'acceptation des propales post-call.

Le site doit être un **signal d'expertise lui-même** — la maîtrise technique se voit dans la mise en œuvre du site, pas seulement dans les case studies. C'est le first proof of work.

## Brand Personality

Trois mots : **opinionated, technique, premium**.

- **Opinionated** — Lilian a des avis tranchés sur les outils et les process. Le site doit prendre position, pas faire la liste exhaustive de tout ce qu'il « pourrait » faire.
- **Technique** — registre de précision : pourcentages, durées, noms d'outils, intégrations nommées. Pas de jargon marketing.
- **Premium** — densité d'information élevée, exécution pixel-pour-pixel, motion subtile. Ce qui sépare un site de freelance à 1 500 € d'un partenaire à 15 000 €+.

Voix : direct, factuel, sans fioriture. Pas de « passionné par la transformation digitale ». Plutôt « j'ai fait économiser X heures par semaine à Y client en branchant Z à W ».

## Anti-references

À fuir explicitement :

- **Le site actuel** dans son ensemble : palette cream + orange chaud, ombres colorées 3D, accents quadricolores (orange/violet/cyan/rose), Bricolage Grotesque (typo trop ronde / ambiance « créative »).
- **Look agence freelance générique** : hero gradient bleu/violet, photo casquette, « bonjour je suis X et je vous accompagne », icônes colorées arrondies en grille 3×3.
- **Sur-décoration** : ombres portées multicolores, blobs flous, illustrations 3D vibrantes, dégradés sur le texte, glassmorphism décoratif.
- **Tout ton chaleureux convenu** : palette cream/sable/terracotta, polices arrondies humanistes, vocabulaire « bienveillance » / « accompagnement ».

Références positives (à étudier, pas à copier) :

- **vercel.com** — grille noir/blanc tenue partout, mono comme texture de fond, lignes fines structurantes.
- **plain.com** — micro-animations soignées, logos intégrés dans le titre, illustrations qui ponctuent (sans le vert).
- **modal.com** — grilles techniques, animations qui signalent le craft, sensation premium par la précision.

## Design Principles

1. **Le site EST la démo.** Ce que Lilian vend (rigueur d'exécution, attention au détail, automatisations qui ne cassent pas), le site doit le démontrer dans sa propre construction. Si le site bug ou flotte, le pitch est mort.
2. **Opinionated, pas exhaustif.** Une page de freelance liste 12 services et 30 outils. La nôtre montre **le cas le plus parlant** + **la méthode** + **le pourquoi** — et assume de ne pas tout dire. Anti-pattern : la grille 3×3 d'icônes.
3. **Densité avant air.** Vercel/Modal montrent que le premium passe par une grille tenue, des chiffres alignés, des micro-typographies maîtrisées — pas par 200vh d'espace blanc. Information riche, hiérarchie nette.
4. **Papier clair, bleu nuit, accents lime.** Depuis la direction explicite du 13 septembre 2026, aucun fond de section lime : les surfaces restent blanches ou gris clair, les textes principaux restent noirs, les CTA sont lime avec un libellé bleu nuit presque noir (`#111827`), et les panneaux sombres gardent ce bleu nuit. Le lime `#cdf564` reste en bande pleine derrière les mots surlignés et en petits accents ; son contraste de 1,25:1 sur blanc exclut le texte lime sur fond clair. Surfaces à angles droits, CTA et champ newsletter adoucis à `8px` (`--radius-cta`), unités rondes à `9999px`. Aucune ombre, la profondeur vient des filets et changements de surface. Une seule police, Geist ; le monospace et les sur-titres décoratifs restent retirés. Les couleurs des outils et projets restent cantonnées à leurs visuels, sans devenir le chrome du site. _(Historique : violet n8n / orange Anthropic, puis zinc et accent flamme, puis grands aplats lime désormais remplacés. Les valeurs de thème vivent dans `src/styles/global.css`.)_
5. **Motion qui prouve la maîtrise.** Animations courtes (≤300ms) qui réagissent à l'intention (hover, focus), ou ambiantes et liées au scroll (parallaxe/écoulement des grilles de gouttière, 100% CSS scroll-driven). Ease-out exponentiel, reduced-motion respecté. Aucune animation décorative gratuite : si elle ne dit rien, on la coupe.

## Accessibility & Inclusion

- **WCAG AA** sur tous les textes et états interactifs : corps ≥4,5:1 sur papier, bordures interactives ≥3:1 (`--color-border-strong`). L'anneau de focus est de l'**encre** (`--color-focus` vaut `#111111`) et non l'accent : le lime ne tient que 1,25:1 sur blanc, un anneau lime serait invisible. Il tient sur les deux surfaces, 18,88:1 sur blanc et 15,14:1 sur lime.
- **Reduced motion** respecté (déjà en place dans `global.css`, à conserver) — toutes les animations doivent dégrader proprement.
- **Navigation clavier complète** : focus rings visibles cohérents avec la palette, ordre de tab logique, skip-link vers `#main-content`.
- **Cible bilingue future possible** (FR principal, EN sans doute à terme) — éviter de hardcoder du copy long dans des composants ; structurer pour permettre l'i18n plus tard sans refonte.
