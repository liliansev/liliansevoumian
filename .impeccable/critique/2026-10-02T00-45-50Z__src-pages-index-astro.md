---
target: page d accueil
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/a1207/CODE/landings/liliansevoumian/.claude/worktrees/site-branding-color-palette-25ecd1/src/pages/index.astro"
target_fingerprint: "sha256:9d0bd8cc6b2497b0b3c217031df5298be5569d2ecb12fea3f8a97d732e72b8a7"
target_path: /Users/a1207/CODE/landings/liliansevoumian/.claude/worktrees/site-branding-color-palette-25ecd1/src/pages/index.astro
timestamp: 2026-10-02T00-45-50Z
slug: src-pages-index-astro
---
Method: dual-agent (A: critique-a · B: critique-b)

# Critique de la page d'accueil — 2 octobre 2026

Cible : `src/pages/index.astro` (commit `b33aa2d`), inspectée à 1440×900 et 402×874.

## Design Health Score

| # | Heuristique | Note | Problème clé |
|---|---|---|---|
| 1 | Visibilité de l'état | 3 | Sur mobile, rien ne dit où en est la scène dans ses trois temps. |
| 2 | Correspondance avec le réel | 3 | Jargon résiduel : « par run », « Créer avec Reflare ». |
| 3 | Contrôle et liberté | 3 | Le défilement annule sans prévenir le choix « Automatisé ». |
| 4 | Cohérence | 2 | Deux systèmes sur une page, quatre noms pour la même offre. |
| 5 | Prévention des erreurs | 3 | Formulaire bien gardé ; non testé en soumission. |
| 6 | Reconnaissance | 3 | Déclencheur de menu mobile sans libellé visible. |
| 7 | Flexibilité | n/a | Surface Persuade. |
| 8 | Esthétique et minimalisme | 3 | Bas de page redondant : prix répétés, Humble+ cité trois fois. |
| 9 | Récupération d'erreur | 3 | Si Three.js échoue, il reste un cadre vide. |
| 10 | Aide et documentation | n/a | Surface Persuade. |
| **Total** | | **23/32 (72 %)** | **Bon, bas de fourchette** |

## Verdict de spécificité

**Revue design.** La moitié haute est écrite pour Lilian, la moitié basse est un gabarit. Le récit (`#histoire`) est la signature de la page : un bon de commande recopié dans une facture, l'horloge, puis les lignes qui partent seules. Les quatre métiers ont un contenu spécifique sur une structure en zigzag. Vidéo et newsletter, témoignages et offres retombent dans le motif que le client a refusé : un titre à pastille au-dessus de lignes à filets ou d'une carte. Rien sur la page n'est clivant.

**Détecteur.** En ligne de commande : aucun constat primaire, 3 constats consultatifs (grille de fond de la scène, deux couleurs de marque du pied de page). Dans le navigateur : 18 à 23 constats d'éléments selon la passe, dont la plupart sont des faux positifs (contraste des liens fléchés mesuré sur une bande au repos, éléments de la scène illustrée, repères d'années de la frise). Constats réels : liens « Lire le cas » de 64×18 px sur mobile, boutons de mode de 38 px sur ordinateur, vingt textes à 11 px, avertissement Three.js `PCFSoftShadowMap` déprécié, 16 animations CSS infinies qui tournent à toutes les positions de défilement. Les exclusions de `.impeccable/config.json` sont respectées. Aucun débordement horizontal, un seul `h1`, aucun saut de niveau de titre, tous les liens, boutons et champs nommés.

**Calques.** L'injection du détecteur a réussi dans une session sans affichage ; aucun calque visible ne subsiste.

## Impression d'ensemble

Le pic est au début, la fin est la partie la plus faible. La plus grande opportunité : donner au dernier tiers le même niveau d'écriture que le récit, et une vraie fin.

## Ce qui marche

1. La scène du récit démontre au lieu d'affirmer ; le bouton « À la main / Automatisé » fonctionne, la boucle mobile tient ses durées.
2. La hiérarchie du hero est réglée par un seul geste, la pastille pêche, qui se replie proprement à 402 px.
3. Le socle : contrastes de 7,09:1 à 18,72:1, titres sans saut, lien d'évitement, anneau de focus, ancres qui atterrissent sous la barre.

## Problèmes prioritaires

- **[P1] Le dernier tiers retombe dans le motif refusé.** `home-content`, `Testimonials` et `home-offers` n'ont qu'un titre à pastille au-dessus de lignes à filets. Correctif : faire des offres une vraie clôture, donner aux témoignages un composant propre, réécrire les titres de la vidéo et de la newsletter. Commande : `/impeccable bolder`, puis `/impeccable layout`.
- **[P1] La preuve chiffrée est mince et mal placée.** Cinq cas mesurés existent, la page en montre deux, Humble+ sert trois fois, aucun lien vers `/cas-clients` dans le corps de page, « Ils ont travaillé avec moi. » redit le hero. Correctif : lien vers les cinq cas, autre preuve pour le bloc Automatisation, « par run » en clair. Commande : `/impeccable clarify`.
- **[P2] Sur mobile, chaque forme 3D se lit comme l'illustration du métier suivant.** Correctif : la forme avant le texte sous 900 px. Commande : `/impeccable adapt`.
- **[P2] Deux systèmes visibles et des noms qui changent.** Grille des gouttières par-dessus les filets de l'accueil, barre et menu en `#111827` sur une page en `#0c121f`, quatre libellés pour l'offre web, menu mobile qui met deux offres au-dessus des quatre métiers. Commande : `/impeccable polish`.
- **[P2] Mouvement sans commande d'arrêt, scène muette pour un lecteur d'écran.** Défilé, faisceaux, boucle mobile et formes bougent sans fin ; la scène est `aria-hidden` sans restitution. Commande : `/impeccable harden`.

## Signaux d'alerte par persona

- **Jordan (première visite)** : le hero occupe exactement l'écran à 1440×900, aucun indice d'une suite ; bute sur « par run » et « Voir les offres et le suivi ».
- **Riley (cherche la faille)** : choisit « Automatisé », défile, la scène revient « À la main » ; cadre vide si Three.js échoue.
- **Casey (mobile)** : « Lire le cas » fait 64×18 px ; défilé impossible à arrêter au doigt.
- **Sam (clavier, lecteur d'écran)** : scène muette, deux liens « Lire le cas » au même intitulé, aucun arrêt du mouvement.
- **Le décideur qui vérifie** : deux chiffres mesurés sur toute la page, pas de chemin vers l'index des cas, le bloc Agents IA ne sort que vers l'agence.

## Observations mineures

- Acte 3 : la pastille déborde de sa colonne et recouvre le coin du cadre de la scène.
- Frise : les années (graisse 600) dominent le titre « D'où je viens. ».
- « Pourquoi moi » : grille 2×2 à filets, le motif refusé.
- Fenêtre de la facture rognée par le bas du cadre.
- Faisceau vertical qui traverse le titre du hero à 1440 px.
- Liens fléchés en capitales espacées à côté d'une barre en bas de casse.
- Agenda en `#111827` sur une page en `#0c121f`.

## Questions à considérer

1. Rien ici ne peut déplaire : qu'est-ce que Lilian affirmerait qu'un concurrent n'oserait pas écrire ?
2. Si la scène du récit est la meilleure preuve du site, pourquoi les métiers passent-ils par des métaphores en verre plutôt que par des scènes aussi littérales ?
3. La page a-t-elle besoin de « Combien ça coûte. », ou seulement d'une vraie fin ?
