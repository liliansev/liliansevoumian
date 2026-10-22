# Écrire un article

Ce fichier est ignoré par le site (son nom commence par `_`).

1. Créer un fichier `.md` dans ce dossier. Son nom devient l'adresse :
   `mon-idee.md` est publié sur `/blog/mon-idee`. Minuscules, tirets, sans accents.
2. Copier cet en-tête en haut du fichier et le remplir :

```
---
title: "Le titre de l'article"
description: "Une ou deux phrases. Elles servent de chapô, de résumé dans la liste et de description sur Google."
date: 2026-10-14
draft: true
---
```

3. Écrire le texte en Markdown en dessous : `## Intertitre`, `**gras**`,
   `[un lien](https://...)`, listes avec `-`, citations avec `>`.
4. Avec `draft: true`, l'article se voit en local (`pnpm dev`) mais pas sur le
   site. Passer à `draft: false` (ou supprimer la ligne) pour le publier.
5. Après une correction importante, ajouter `updated: 2026-10-20` sous `date`.

Les abonnés ne reçoivent pas l'article tout seul : l'envoi se fait depuis
Mailcheap, comme la newsletter. Le flux `/blog/rss.xml` liste les articles
publiés, si un outil doit les relever.

Avant publication, chaque article est relu une fois par un agent indépendant
(`.claude/agents/relecteur-article.md`) : il juge si le texte sonne écrit par
un humain et s'il apporte de la valeur au lecteur, puis il le corrige.
L'article part ensuite sans autre validation ; la procédure est dans
`.claude/skills/publier-article/SKILL.md`.
