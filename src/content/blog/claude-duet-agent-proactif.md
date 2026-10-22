---
title: "Claude Duet : l’agent qui vient vers vous, et ce que j’en attends"
description: "Anthropic a lancé Claude Duet, un agent qui lit vos outils et vous prévient de lui-même. Ce qu’il change par rapport à mes agents, et ce que j’attends de lui."
seoTitle: "Claude Duet : ce que l’agent d’Anthropic change"
keywords: ["Claude Duet", "agent IA proactif", "Anthropic", "agent IA", "assistant IA personnel"]
date: 2026-10-22
---

Claude Duet est un agent d’Anthropic qui consulte votre messagerie, votre agenda et vos autres applications connectées, vous envoie un point chaque matin et vous prévient quand une décision vous revient. Il a été lancé hier, le 21 octobre 2026, d’après MacRumors. Il est en préversion, sur liste d’attente, pour les abonnés Claude Pro et Max aux États-Unis. Je ne peux donc pas encore le tester depuis la France.

**En bref :** Duet n’attend pas qu’on lui écrive, et il demande votre accord avant d’envoyer un message ou de payer. Ma règle, celle que j’applique déjà dans les workflows que je livre, ne change pas : ce qui se répète reste dans un workflow, l’agent prend l’ambigu, et un humain garde la validation de ce qui engage.

## Il commence la conversation

Claude, comme les autres assistants, attend qu’on lui écrive : on pose une question, il répond. Duet inverse l’ordre. Il lit votre messagerie et votre agenda, il trie, et il ouvre la conversation le matin. Selon MacRumors, il repasse ensuite sur vos outils plusieurs fois par jour.

Il travaille sur son propre ordinateur dans le cloud. MacRumors précise qu’il y dispose d’un navigateur à lui, sans aucun accès à votre machine. Il reprend ce que votre compte Claude sait déjà : votre mémoire, vos connecteurs et vos skills, ces consignes écrites que Claude réutilise d’une conversation à l’autre. Il rend des livrables : un document, un tableur, une présentation ou un tableau de bord.

Son fonctionnement, ses limites et ses conditions d’accès sont détaillés dans [la fiche complète sur Augmentés](https://augmentes.fr/blog/claude-duet-agent-proactif-anthropic).

## Mon agent à moi attend que je lui donne le mail

J’ai déjà un agent qui travaille sur ma boîte mail. Je le décris dans [Comment j’utilise l’IA au quotidien](/blog/comment-j-utilise-l-ia-au-quotidien) : quand un mail contient une tâche, je le déplace vers un libellé « Agent ». Mon workflow n8n le détecte, le résume en une phrase, le priorise et crée la tâche dans Todoist.

Le point important, c’est le geste de départ. Mon agent ne lit que les mails que je lui donne. C’est moi qui décide, mail par mail, ce qui mérite une tâche. Duet fait l’inverse : il lit tout, et il décide de ce qui mérite mon attention.

C’est exactement ce qui me ferait gagner du temps, et exactement ce qui peut rater. Anthropic l’écrit sur sa page produit : Duet peut mal lire un fil, se tromper sur ce qui est urgent ou rater une information arrivée entre deux vérifications. Un mail important classé comme secondaire, je ne le verrais pas, puisque je ne lirais plus ma boîte comme avant.

## Ce qui me rassure

Duet demande votre accord avant les opérations sensibles. La page produit cite l’envoi d’un message et le paiement ; MacRumors ajoute la signature d’un document et la suppression d’un fichier. D’après Inc42, certaines opérations lui restent fermées même avec votre accord : les virements entre comptes et les opérations en bourse.

Je pose le même genre de garde-fou chez mes clients. Dans les workflows que je livre, l’IA lit et prépare, et un humain garde la main sur les cas douteux. Chez [Humble+](/cas-clients/humble-plus), une facture remonte dans Slack avant de partir, le temps que le système fasse ses preuves. Ce contrôle sera retiré progressivement, une fois les premiers lots passés sans erreur.

Un garde-fou qu’on retire une fois la confiance établie : je m’attends à vivre la même chose avec Duet. Les premières semaines, je validerais chaque brouillon. Ensuite, seulement ce qui sort de l’ordinaire.

## Ce que je lui confierais

Je ne compte pas sur Duet pour remplacer mes workflows. Une tâche qui revient à l’identique, avec des règles fixes, tourne mieux dans [Make](/expert-make) ou [n8n](/expert-n8n) : la même suite d’étapes, chaque fois, et un historique qu’on relit. Un agent peut relancer une facture impayée. Il ne doit pas être celui qui la crée.

J’attends de lui qu’il prenne ce qu’aucun workflow ne prend : le mail ambigu, la relance qu’on oublie, le rendez-vous qui manque dans l’agenda. Et j’attends de voir ce qu’il donne en français, sur des outils français. Parmi ses connecteurs, Anthropic met en avant QuickBooks pour la comptabilité ; la mienne passe par Pennylane, et c’est Claude qui la catégorise déjà. Je verrai s’il sait lire Pennylane, ou s’il faudra lui brancher mon propre connecteur.

Anthropic n’a annoncé aucune date hors des États-Unis. Le jour où Duet arrive ici, je le branche d’abord sur une boîte secondaire, je le laisse trier une semaine sans rien envoyer, et je compare avec ce que j’aurais fait moi-même. Je raconterai le résultat sur ce blog.

Et vous, quelle partie de votre boîte mail lui laisseriez-vous lire en premier ?
