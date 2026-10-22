---
title: "Claude Duet : l’agent qui vient vers vous, et ce que j’en attends"
description: "Anthropic a lancé Claude Duet le 21 octobre 2026, un agent qui surveille vos outils et vous prévient de lui-même. Ce qu’il change, et ce que je garde pour moi."
seoTitle: "Claude Duet : ce que l’agent d’Anthropic change"
keywords: ["Claude Duet", "agent IA proactif", "Anthropic", "agent IA", "assistant IA personnel"]
date: 2026-10-22
---

Anthropic a lancé Claude Duet hier, le 21 octobre 2026. C’est un agent qui consulte votre messagerie, votre agenda et vos autres applications connectées, vous envoie un point chaque matin et vous prévient quand une décision vous revient. Il est en préversion, sur liste d’attente, pour les abonnés Claude Pro et Max aux États-Unis. Je ne peux donc pas encore le tester depuis la France.

**En bref :** Duet est un agent qui n’attend pas qu’on lui écrive. Il demande votre accord avant d’envoyer un message ou de payer. C’est la règle que j’applique déjà dans tout ce que je construis, et c’est elle qui compte.

## Ce qui change : il commence la conversation

Jusqu’ici, j’utilisais Claude comme on utilise un collègue très rapide : je lui pose une question, il répond. Avec Duet, l’ordre s’inverse. Il lit votre messagerie et votre agenda, il trie, et c’est lui qui ouvre la conversation le matin. Selon MacRumors, il repasse ensuite sur vos outils toutes les quelques heures.

Il travaille sur son propre ordinateur dans le cloud. MacRumors précise qu’il y a son propre navigateur et aucun accès à votre machine. Il reprend ce que votre compte Claude sait déjà : votre mémoire, vos skills et vos connecteurs. Il rend des livrables, un document, un tableur, une présentation ou un tableau de bord.

J’ai détaillé son fonctionnement, ses limites et ses conditions d’accès dans [la fiche complète sur Augmentés](https://augmentes.fr/blog/claude-duet-agent-proactif-anthropic).

## Ce que je fais déjà sans lui

Je n’ai pas attendu Duet pour avoir un agent qui travaille à côté de moi. J’en parle dans [Comment j’utilise l’IA au quotidien](/blog/comment-j-utilise-l-ia-au-quotidien) : un agent sur n8n transforme mes mails en tâches, Claude catégorise ma comptabilité, et Hermes tourne sur ma machine avec sa propre mémoire.

La différence, c’est le réglage. Mes agents, je les configure un par un : je décide de ce qu’ils voient et de ce qu’ils peuvent faire. Duet propose ce travail tout fait, pour quelqu’un qui n’a ni le temps ni l’envie de construire. C’est une bonne nouvelle pour les entreprises que j’accompagne, qui veulent le résultat sans la mécanique.

## La partie qui me rassure

Duet demande votre accord avant les opérations sensibles. La page produit cite l’envoi d’un message et le paiement ; MacRumors ajoute la signature d’un document et la suppression d’un fichier. D’après Inc42, certaines opérations lui restent fermées même avec votre accord : les virements entre comptes et les opérations en bourse.

C’est ce que je mets en place chez mes clients. Dans les workflows que je livre, l’IA lit et prépare, et un humain valide les cas douteux. Chez [Humble+](/cas-clients/humble-plus), une facture à valider avant envoi remonte dans Slack, et une personne tranche. La ligne passe toujours au même endroit : ce qui part chez un client, ce qui fait sortir de l’argent et ce qui entre en comptabilité attend un humain.

Anthropic reconnaît aussi que Duet peut mal lire un fil, se tromper sur ce qui est urgent ou rater une information arrivée entre deux vérifications. Je préfère un éditeur qui l’écrit sur sa page produit à un agent présenté comme infaillible.

## Ce qu’il ne remplacera pas

Duet prend le travail flou : lire une boîte entière pour savoir quoi relancer, préparer un brouillon, signaler un rendez-vous qui manque. Il repasse toutes les quelques heures et, comme tout modèle de langage, il ne fera pas toujours le même tri.

Une tâche qui revient à l’identique, avec des règles fixes, tourne mieux dans un workflow [Make](/expert-make) ou [n8n](/expert-n8n). Chaque commande crée sa facture, chaque fois, avec un historique qu’on peut relire étape par étape. Un agent peut relancer une facture impayée. Il ne doit pas être celui qui la crée.

## Ce que je conseille d’ici là

Anthropic n’a annoncé aucune date hors des États-Unis. Ce qu’il réutilise existe déjà dans Claude, et se prépare dès maintenant :

1. **Connectez vos outils à Claude**, en commençant par la messagerie et l’agenda.
2. **Écrivez vos façons de faire en skills**, des consignes que Claude réutilise : comment vous répondez à un devis, comment vous rangez une facture.
3. **Listez ce que vous ne déléguerez pas.** Duet demande déjà votre accord pour l’envoi et le paiement ; ajoutez vos propres lignes rouges.

Le jour où il arrive en France, je le teste et je raconte ce qu’il vaut ici. Et vous, qu’est-ce que vous le laisseriez lire en premier ?
