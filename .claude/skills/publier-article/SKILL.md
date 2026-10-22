---
name: publier-article
description: Publier un article de blog sur augmentes.fr ou liliansevoumian.fr. À suivre pour chaque article, une fois rédigé : une relecture par un agent indépendant (relecteur-article) qui corrige lui-même, puis publication sans attendre Lilian.
---

# Publier un article

Règle posée par Lilian le 22 octobre 2026 : chaque article est relu une fois par un agent indépendant, qui corrige lui-même. Ensuite, l'article est publié sans attendre de validation humaine.

Le relecteur juge d'abord deux choses : est-ce que le texte sonne écrit par un humain, et est-ce qu'il apporte de la valeur au lecteur. Ensuite, est-ce qu'il est bien écrit.

## 1. Une relecture, qui corrige

Lance l'agent `relecteur-article` (`.claude/agents/relecteur-article.md`). S'il n'est pas disponible sous ce nom, lance un agent généraliste en lui donnant le contenu de ce fichier comme consigne.

Donne-lui seulement :

- le chemin de l'article ;
- le site (augmentes.fr ou liliansevoumian.fr) ;
- la liste des sources utilisées.

Ne lui donne ni ton avis sur l'article, ni ce que tu as hésité à écrire.

Une seule relecture. Pas de deuxième tour.

## 2. Vérifier ses corrections

Relis le diff du relecteur avant de publier. Deux choses seulement :

- il n'a rien inventé (aucun fait nouveau sans source, rien sur Lilian hors de ses sources) ;
- le build passe.

Si sa réponse contient quelque chose sous « À SIGNALER À LILIAN », traite-le avant de publier, ou demande à Lilian si tu ne peux pas trancher.

## 3. Publier

- **augmentes.fr** : `pnpm build` à la racine (le contrôle des liens sortants doit passer), puis suivre `packages/site/BLOG-VEILLE.md` : commit, push sur `main`, puis attendre le HTTP 200 sur `https://augmentes.fr/blog/<slug>` et vérifier que le titre s'affiche. Si l'article est dans une pull request, la fusionner une fois la CI verte.
- **liliansevoumian.fr** : `pnpm build`, puis fusionner la PR (ou pousser sur `main`) : le workflow `deploy-hostinger.yml` déploie. Attendre le HTTP 200 sur `https://liliansevoumian.fr/blog/<slug>`.
- **Articles liés** : quand un article renvoie vers un autre qui n'est pas encore en ligne, publier la cible d'abord.

Ne dis jamais « publié » sans ce 200.

## 4. Rendre compte à Lilian

En quelques lignes : l'adresse en ligne, les notes du relecteur avant et après correction, et ses corrections principales.

## Ce qui reste à Lilian

La relecture remplace sa validation pour la publication, pas pour le reste. Demande-lui avant :

- un article qui le cite sur un sujet sensible (un client nommé, un avis sur une personne, un conflit) ;
- l'envoi de l'article par e-mail aux abonnés ou sur les réseaux : la relecture couvre le site seulement.
