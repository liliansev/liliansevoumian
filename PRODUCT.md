# Product

## Register

brand

## Users

Décideurs opérationnels qui pilotent des process et savent reconnaître un bon outil quand ils en voient un :

- **Heads of Ops / RevOps / fondateurs de startups** (cible primaire). Tech-aware, à l'aise avec les notions d'API/webhook/workflow. Cherchent un partenaire qui parle leur langue, pas un consultant qui survend du « digital ».
- **Dirigeants de PME en croissance** (cible secondaire). Pas devs, mais lassés des agences génériques. Doivent être rassurés par la **clarté du process** et les **résultats chiffrés**, pas par un ton chaleureux convenu.
- **Agences / studios** qui sous-traitent l'automatisation à un expert (cible tertiaire).

Contexte d'usage : ils arrivent depuis LinkedIn, YouTube ou une recommandation. Ils scrollent debout entre deux meetings ou tard le soir. Ils ont déjà vu 5 sites de freelance qui se ressemblent tous. Le job-to-be-done : décider en moins de 60 secondes si Lilian vaut un appel découverte.

## Product Purpose

Positionner Lilian Sevoumian comme **l'expert no-code opinionated** pour les automatisations Make / n8n / Airtable + IA. Pas un freelance polyvalent qui prend tout, un spécialiste qui a une méthode et des avis.

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
4. **Couleur comme signal, pas comme décoration.** Deux accents stricts (violet n8n, orange Anthropic) ≤10% de surface combinée, sur des éléments porteurs de sens (tags d'outils, états actifs, points de focus). Tout le reste est noir / blanc / gris tinté.
5. **Motion qui prouve la maîtrise.** Animations courtes (≤300ms), ease-out exponentiel, qui réagissent à l'intention (hover, scroll, focus). Aucune animation décorative gratuite. Si elle ne dit rien, on la coupe.

## Accessibility & Inclusion

- **WCAG AA** sur tous les textes et états interactifs (le contraste violet/orange sur blanc devra être vérifié, prévoir des dark variants si besoin pour le texte sur accent clair).
- **Reduced motion** respecté (déjà en place dans `global.css`, à conserver) — toutes les animations doivent dégrader proprement.
- **Navigation clavier complète** : focus rings visibles cohérents avec la palette, ordre de tab logique, skip-link vers `#main-content`.
- **Cible bilingue future possible** (FR principal, EN sans doute à terme) — éviter de hardcoder du copy long dans des composants ; structurer pour permettre l'i18n plus tard sans refonte.
