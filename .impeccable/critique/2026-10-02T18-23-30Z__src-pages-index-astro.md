---
target: page d accueil, troisieme mesure apres barre d ecriture
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/a1207/CODE/landings/liliansevoumian/.claude/worktrees/site-branding-color-palette-25ecd1/src/pages/index.astro"
target_fingerprint: "sha256:29fd1a86733caf4bea9920efffa0d72826c27209627fe538974a2337616934b7"
target_path: /Users/a1207/CODE/landings/liliansevoumian/.claude/worktrees/site-branding-color-palette-25ecd1/src/pages/index.astro
timestamp: 2026-10-02T18-23-30Z
slug: src-pages-index-astro
---
Method: dual-agent (A : critique-a3 · B : critique-b3), plus deux audits isolés (textes, polices).

## Santé du design

| # | Heuristique | Note | Constat clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 2 | Rien ne dit que le message de la conversation n'est pas parti ; un envoi vide ne fait rien |
| 2 | Correspondance au réel | 3 | La barre de prompt promet une IA et ouvre un mailto |
| 3 | Contrôle et liberté | 3 | Un ajout au message ne peut plus être retiré |
| 4 | Cohérence | 3 | Le pied de page nomme les offres autrement que la page |
| 5 | Prévention des erreurs | 2 | Message trop court ignoré sans un mot, fil perdu au rechargement |
| 6 | Reconnaissance | 3 | Icône du menu mobile peu reconnaissable |
| 7 | Flexibilité | n/a | Page de persuasion |
| 8 | Esthétique et minimalisme | 3 | La barre du coin écrit sans fin et recouvre du contenu |
| 9 | Récupération d'erreur | 3 | Newsletter bien traitée, lue dans le code |
| 10 | Aide | n/a | Page de persuasion |
| **Total** | | **22/32 (69 %)** | **Acceptable, à un point de « bon »** |

## Verdict de spécificité

Revue de design : les deux tiers hauts sont ancrés dans le produit (récit piloté au défilement, mail de newsletter, sites dans leurs fenêtres). Interchangeables ou fragiles : « Ce qu'ils en disent. », le pied de page, la barre d'écriture (idée la plus propre au produit, promesse la moins tenue).

Détecteur : 4 constats en ligne de commande, tous voulus (`codex-grid-background` ×2, `design-system-color` ×2 dans Footer.astro) ; `--scope type` et `--scope layout` : 0. Dans la page : 63 constats sur 59 éléments, pour l'essentiel le décor des scènes ; 12 `low-contrast` faux positifs. axe-core : 0 violation.

Superposition : navigateur sans tête, aucune superposition visible par l'humain.

Mesures : 0 débordement, 0 erreur console, 0 texte exposé ou de scène sous 4,5:1, mouvement réduit propre sur la page entière, aucun module zod.

## Ce qui marche

- Le récit piloté au défilement.
- La robustesse (320 px, mouvement réduit, cibles de 44 px).
- Les formes qui viennent de leur objet (mail, fenêtres de sites).

## Problèmes prioritaires

1. [P1] La conversation simule un échange et ne dit jamais que rien n'est envoyé (`home-invite.astro`). Commandes : clarify, harden.
2. [P1] Sur ordinateur et tablette, la barre du coin écrit sans fin et masque du contenu. Commande : quieter.
3. [P2] La barre du hero est avant-dernière au clavier, et muette à vide. Commande : harden.
4. [P2] « Ce qu'ils en disent. » est le creux, juste avant la demande. Commande : clarify.
5. [P2] Sur téléphone, la pastille rogne des fins de ligne et double l'appel du haut. Commande : adapt.

## Drapeaux rouges par persona

- Jordan : croit parler à une IA ; la flèche ne réagit pas à vide.
- Riley : « asdf » reçoit « Merci, c'est clair. » ; le fil disparaît au rechargement.
- Casey : la pastille masque des fins de ligne ; le fil n'existe qu'en mémoire.

## Observations mineures

- Scène du récit sans commande d'arrêt.
- Boutons de pause des scènes : zone de 42 px.
- « e-mail » coupé en fin de ligne sous le champ de fin.
- Six coupes de titres ; six interlignes pour le petit corps.
- Le bouton de la barre de navigation porte encore le goal `lead_call`.

## Questions

- Si le vrai agent n'est pas pour maintenant, pourquoi garder le geste d'un agent ?
- Huit interfaces dessinées et aucun vrai scénario Make ou n8n ?
- Si les trois citations disparaissaient, la page perdrait-elle quelque chose ?
