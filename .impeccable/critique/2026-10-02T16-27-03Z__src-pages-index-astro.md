---
target: page d accueil, deuxieme critique apres refonte des scenes
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/a1207/CODE/landings/liliansevoumian/.claude/worktrees/site-branding-color-palette-25ecd1/src/pages/index.astro"
target_fingerprint: "sha256:46580c36dbeae34c95dc9206a92808f248bbbd534a0fabbefb70d31dab3f11f0"
target_path: /Users/a1207/CODE/landings/liliansevoumian/.claude/worktrees/site-branding-color-palette-25ecd1/src/pages/index.astro
timestamp: 2026-10-02T16-27-03Z
slug: src-pages-index-astro
---
Method: dual-agent (A : critique-a · B : critique-b), plus deux audits mesurés isolés (typographie, espacements).

## Santé du design

| # | Heuristique | Note | Constat clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | Sur mobile, la scène du récit change de mode sans lien avec le texte lu |
| 2 | Correspondance au réel | 3 | Jargon qui fuit (« Make niveau 5 », « workflows », « CRM ») ; « dashboard » et « tableau de bord » alternent |
| 3 | Contrôle et liberté | 3 | Les quatre scènes métiers bouclent sans commande d'arrêt |
| 4 | Cohérence | 3 | Deux définitions d'« agent IA », trois traitements du même bouton, cinq gouttières |
| 5 | Prévention des erreurs | 3 | Le bouton de la barre ouvre un agenda sans prévenir |
| 6 | Reconnaissance | 2 | Newsletter et vidéo à 9 300 px sans entrée de navigation ; chaîne YouTube seulement au pied de page |
| 7 | Flexibilité | n/a | Page de persuasion |
| 8 | Esthétique et minimalisme | 3 | Bruit par répétition : 11 titres à pastille, 7 cadres à repères, micro-libellés |
| 9 | Récupération d'erreur | 3 | Messages précis, lus dans le code, non exercés à l'écran |
| 10 | Aide | n/a | Page de persuasion |
| **Total** | | **23/32 (72 %)** | **Bon, bas de bande** |

## Verdict de spécificité

Revue de design : deux moments n'appartiennent qu'à ce site (scène du récit, agent en étoile). Le reste parle l'idiome « outil de dev 2025 » : propre, tenu, interchangeable, rien de clivant. La voix qui prend parti s'arrête après l'acte 3. La personne est presque absente d'un site personnel (portrait de 64 px à 7 300 px de défilement).

Détecteur : 5 constats en ligne de commande, 1 réel et mineur (`layout-transition`, `home-story.astro:1723`), 2 voulus (`codex-grid-background`), 2 faux positifs (`Footer.astro:42-43`, couleurs de marque). `--scope type` et `--scope layout` : 0. Dans la page : 61 constats sur 56 éléments, presque tous dans les scènes (dark-glow 21, layout-transition 15, tight-leading 5, heading-rhythm 5).

Superposition : navigateur sans tête, aucune superposition visible par l'humain.

Mesures : 0 débordement, 0 erreur console, 0 texte exposé sous 6,77:1, mouvement réduit propre. Écarts dans les scènes seulement : libellés de 5,2 à 11,5 px effectifs, 12 contrastes sous 4,5:1.

## Ce qui marche

- La scène du récit sur ordinateur.
- La scène Agents IA (étoile, raisonnement coché, validation humaine).
- L'ouverture et la fermeture en miroir ; le formulaire écrit comme un mail.

## Problèmes prioritaires

1. [P1] Récit désynchronisé sur mobile (`home-story.astro`, sous 1024 px). Correctif : scène de l'acte 1 verrouillée sur « à la main », vue des trois réponses sous l'acte 3. Commande : adapt.
2. [P1] Libellés des scènes trop petits (22 % sous 8 px à 1440, 66 % à 1024, 95 % à 320). Correctif : quatre tailles, un plancher, libellés inutiles supprimés, métiers empilés plus tôt. Commandes : typeset, adapt.
3. [P1] Les voix : la preuve la plus faible à la plus grande taille (citation = taille du h2 à toutes les largeurs ; 137 px de vide citation → auteur sur mobile). Correctif : inverser la hiérarchie, résultats mesurés en grand. Commandes : bolder, layout.
4. [P2] Tic de la pastille (11 titres) et gabarit répété ; sur mobile hero, h2, phrases et citations font tous 32 à 34 px. Commandes : distill, typeset.
5. [P2] « Pourquoi moi » est le creux (2,2 à 4 écrans ; les quatre faits sont le plus petit texte). Commandes : distill, layout.
6. [P2] Réassurance et sorties manquantes (rien sous le bouton final, pas de lien vers la chaîne, menu mobile à quatre ancres). Commandes : clarify, harden.

Système : 33 `clamp()` en ligne dans 9 fichiers, 13 pas d'espacement, 5 gouttières, h2 à −0,04em plus serrés que l'affiche à −0,028em.

## Drapeaux rouges par persona

- Jordan : aucun indice de suite au premier écran ; « Parlons de votre projet » ne dit pas qu'il ouvre un agenda ; deux agents IA différents.
- Riley : « Conversion 0,0 % » sous « Des landing pages qui convertissent » ; compteurs à 0 en modes Agent IA et Dashboard ; à 320 px bouton de barre sur deux lignes, ligne de prix cassée.
- Casey : récit désynchronisé ; bouton final à 13 écrans ; frise de 2,7 écrans.

## Observations mineures

- Hero : pastille lisible après 2 s, logos après 3 s ; nom coupé en deux lignes à 1440, 1024, 320.
- Défilé de logos hors colonne (48 px à 1440, 264 à 1920).
- Contenus à 1024 : 73 px contre 32 entre titre et objet.
- Preuve des métiers : six lignes de quinze caractères à 320.
- Bouton newsletter à 12 px, les deux autres à 14.
- Dix espaces sécables avant « : » ou « ? » ; « € HT » sécable.
- `zod` chargé côté navigateur.

## Questions

- Après l'acte 3, quelle phrase un concurrent ne pourrait-il pas signer ?
- Et si la vidéo servait de preuve dans un métier ?
- Quatre scènes fictives en grand, cinq cas réels en petit : pourquoi pas l'inverse ?
