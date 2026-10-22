---
name: publier-article
description: Publier un article de blog sur augmentes.fr ou liliansevoumian.fr. À suivre pour chaque article, une fois rédigé : relecture par un agent indépendant (relecteur-article), corrections, puis publication sans attendre Lilian si la relecture dit PUBLIER.
---

# Publier un article

Règle posée par Lilian le 22 octobre 2026 : chaque article est relu par un agent indépendant avant de partir. Si la relecture dit PUBLIER, l'article est publié sans attendre de validation humaine.

## 1. Relire avec un agent indépendant

Lance l'agent `relecteur-article` (`.claude/agents/relecteur-article.md`). S'il n'est pas disponible sous ce nom, lance un agent généraliste en lui donnant le contenu de ce fichier comme consigne.

Donne-lui seulement :

- le chemin de l'article ;
- le site (augmentes.fr ou liliansevoumian.fr) ;
- la liste des sources utilisées.

Ne lui donne ni ton avis sur l'article, ni ce que tu as hésité à écrire. Un relecteur à qui on dit que c'est bon le confirme.

## 2. Corriger

- **CORRIGER** : applique chaque bloquant, puis les points « À améliorer » qui sont justes. Si un point te paraît faux, vérifie-le avant de l'écarter, et note pourquoi tu l'écartes.
- Relance une relecture neuve (un nouvel agent, pas le même) sur la version corrigée.
- **Trois tours au plus.** Après trois relectures qui disent encore CORRIGER, ne publie pas : envoie l'article à Lilian avec le dernier verdict.

Si un bloquant porte sur un fait que tu ne peux pas vérifier, retire le fait plutôt que de l'affaiblir.

## 3. Publier

Seulement quand la dernière relecture dit **PUBLIER**, et que le build passe.

- **augmentes.fr** : `pnpm build` à la racine (le contrôle des liens sortants doit passer), puis suivre `packages/site/BLOG-VEILLE.md` : commit, push sur `main`, puis attendre le HTTP 200 sur `https://augmentes.fr/blog/<slug>` et vérifier que le titre s'affiche. Si l'article est déjà dans une pull request, fusionner la PR une fois la CI verte.
- **liliansevoumian.fr** : `pnpm build`, puis fusionner la PR (ou pousser sur `main`) : le workflow `deploy-hostinger.yml` déploie. Attendre le HTTP 200 sur `https://liliansevoumian.fr/blog/<slug>`.
- **Articles liés** : quand un article renvoie vers un autre qui n'est pas encore en ligne, publier la cible d'abord.

Ne dis jamais « publié » sans ce 200.

## 4. Rendre compte à Lilian

En quelques lignes : l'adresse en ligne, le verdict final et ses notes, le nombre de tours de relecture, et ce qui a été corrigé. Si un point de la relecture a été écarté, dis lequel et pourquoi.

## Ce qui reste à Lilian

La relecture remplace sa validation pour la publication, pas pour le reste. Demande-lui avant :

- un article qui le cite sur un sujet sensible (un client nommé, un avis sur une personne, un conflit) ;
- un article qui raconte un test qu'il n'a pas fait lui-même ;
- l'envoi de l'article par e-mail aux abonnés ou sur les réseaux : la relecture couvre le site seulement.
