---
title: "Comment j’utilise l’IA au quotidien, et ce que je garde pour moi"
description: "Mes agents, Claude Code et n8n font une bonne partie de mon travail répétitif. Voici ce que je leur confie chaque semaine, et ce que je refuse de déléguer."
date: 2026-10-14
draft: true
---

Je construis des agents IA pour des entreprises. Il serait étrange de ne pas en utiliser moi-même, alors voici à quoi ressemble ma semaine, outil par outil.

## Mes mails deviennent des tâches en deux clics

Un mail arrive, je le lis dans les transports, et je me rends compte qu’il contient une tâche. Si je l’archive, je l’oublie. Si je le laisse en non lu, il pollue ma boîte pendant des jours.

J’ai donc construit un agent sur n8n. Je déplace le mail vers un libellé « Agent ». L’agent le détecte, résume son contenu en une phrase, le priorise et crée la tâche dans Todoist avec le lien vers le mail d’origine.

Ce workflow me fait gagner au moins une heure par semaine. Le plus gros gain, c’est de ne plus garder ces tâches en tête.

## Ma comptabilité passe par Claude

Mon comptable me relançait régulièrement pour catégoriser mes transactions dans Pennylane. J’avais la flemme, honnêtement.

J’ai passé une heure à construire un serveur MCP qui relie Pennylane à Claude, avec n8n. Depuis, c’est Claude qui fait ce travail. Je garde un œil sur le résultat, et le comptable a ce qu’il lui faut.

## Je construis mes propres outils avec Claude Code

Quand un logiciel ne me convient pas, je le construis. Pour mon CRM personnel par exemple, j’ai fait le tour du marché (Notion, Attio, Folk, Pipedrive, HubSpot, Twenty) : chacun était trop cher, trop lourd ou trop limité pour un indépendant.

Avec Claude Code, je construis ce genre d’outil interne moi-même, exactement à ma mesure. J’utilise la même méthode pour mes clients : des dashboards et des outils métiers sur mesure, branchés sur les logiciels qu’ils utilisent déjà.

## Mon agent personnel demande de la configuration

J’utilise aussi Hermes, un agent IA qui tourne sur ma machine et garde une mémoire d’une conversation à l’autre. Il demande pas mal de réglages, et c’est précisément ce qui m’intéresse : je décide de ce qu’il voit, de ce qu’il peut faire, et de ce qu’il doit me demander avant d’agir.

## Ce que je garde pour moi

Voici la liste qui compte le plus, parce que c’est celle que je recommande aussi à mes clients.

- **Les décisions qui engagent quelqu’un.** Un devis, un refus de mission, une réponse à un client mécontent. L’IA peut préparer un brouillon, et c’est moi qui envoie.
- **La validation des cas douteux.** Dans les workflows que je livre, une facture inhabituelle ou une donnée qui ne colle pas remonte à un humain, souvent dans Slack. Je m’applique la même règle.
- **Ce que j’écris en mon nom.** Ce blog, mes posts et ma newsletter partent de mes idées et de mes projets. Je m’aide de l’IA pour structurer et relire, et chaque phrase publiée est relue par moi.
- **La formation.** Quand je forme une équipe en direct, dans ses locaux ou en visio, je reste disponible pour ses questions, parce qu’elles me montrent ce qui bloque vraiment chez elle.

## La règle que j’applique partout

Une tâche répétitive, avec des règles claires et un résultat facile à vérifier, je la confie à une machine. Une tâche où une erreur coûte une relation, de l’argent ou ma réputation, je la garde, ou je garde au moins la dernière validation.

Et vous, qu’est-ce que vous seriez prêt à confier à un agent IA dès la semaine prochaine ?
