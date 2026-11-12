---
title: "Comment Zelok relie ses rendez‑vous, ses e‑mails de prospection et son CRM"
description: "Pour Zelok, trois scénarios Make relient Cal.com, Lemlist et HubSpot : un rendez-vous, une réponse ou une ouverture sans réponse arrive tout seul dans le CRM."
client: "Zelok"
enClair: "Une prospection par e‑mail branchée sur le CRM"
accroche: "J’ai relié l’agenda, les campagnes e-mail et le CRM de Zelok : chaque réaction d’un prospect arrive dans HubSpot sans saisie."
secteur: "Immobilier · startup"
date: 2026-03-26
tags: ["Sales"]
tools: ["Make", "Lemlist", "Cal.com", "HubSpot"]
flow:
  describe: "Schéma de la prospection Zelok : quand un prospect réagit à une campagne Lemlist ou réserve un rendez-vous sur Cal.com, Make crée le contact et l’opportunité dans HubSpot, met la campagne en pause après un rendez-vous, et crée une tâche d’appel pour un SDR quand un e-mail a été ouvert sans réponse."
  trigger: { icon: "lucide:mail-open", kicker: "Lemlist · Cal.com", title: "Un prospect réagit", sub: "rendez-vous, réponse, ouverture" }
  agent: { icon: "lucide:workflow", kicker: "Make", title: "Trie la réaction" }
  actions:
    - { icon: "simple-icons:hubspot", kicker: "HubSpot", title: "Contact et opportunité" }
    - { icon: "lucide:pause", kicker: "Lemlist", title: "Campagne en pause" }
    - { icon: "lucide:phone", kicker: "SDR", title: "Tâche d’appel" }
draft: false
---


## L’entreprise

Zelok est une startup de l’immobilier qui démarche des agents immobiliers. Après sa levée de fonds, début 2026, l’équipe a voulu lancer des campagnes de prospection par e-mail sans multiplier la saisie dans son CRM.

## Le besoin

Trois outils travaillaient chacun de leur côté : **Cal.com** pour les rendez-vous, **Lemlist** pour les campagnes, **HubSpot** pour les contacts et les opportunités. Il fallait qu’une réaction de prospect, quelle qu’elle soit, arrive au bon endroit du CRM, et qu’un commercial sache qui rappeler.

L’équipe de Zelok a écrit les e-mails (deux angles, cinq e-mails chacun). J’ai pris toute la partie technique : comptes, campagnes, scénarios et tests.

## La solution

Trois scénarios **Make**, déclenchés par les webhooks de Lemlist et de Cal.com :

- **Un rendez-vous est pris** : le contact et l’opportunité sont créés dans HubSpot, et la campagne du prospect est mise en pause.
- **Un prospect répond** : le contact et l’opportunité sont créés dans le pipeline dédié, à l’étape de la réponse.
- **Le deuxième ou le troisième e-mail est ouvert sans réponse** : une tâche « Appel SDR » est créée pour l’équipe commerciale, avec quatre jours pour rappeler.

Avant toute création, le scénario vérifie que le contact n’existe pas déjà, et des champs dédiés dans HubSpot évitent les doublons. Un événement Cal.com propre aux rendez-vous issus des campagnes permet de les distinguer de ceux pris par les SDR.

Côté Lemlist : arrêt automatique dès qu’un prospect répond, envois entre 9 h et 18 h, relances à J+4 et J+14, domaine de suivi personnalisé pour la délivrabilité, puis trois à quatre semaines de warm-up avant les premières vraies campagnes.

## Où en est le projet

Les trois scénarios ont été testés et fonctionnent (26 mars 2026). Au dernier point, le 8 avril, la boîte d’envoi était en warm-up et l’équipe préparait une première base qualifiée pour des tests sur de petits volumes.
