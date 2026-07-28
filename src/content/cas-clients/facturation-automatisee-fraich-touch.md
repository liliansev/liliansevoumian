---
title: "Facturation complexe 100% automatisée depuis HubSpot"
seoTitle: "Automatiser la facturation depuis HubSpot — cas client Make"
description: "Fraich Touch est passée de 33 à 4 scénarios Make et de 16 factures en erreur à 0, en récupérant environ 4 h par semaine."
secteur: "Agence de gestion de talents"
date: 2026-01-30
tags: ["Finances", "Ops"]
tools: ["Make", "Notion", "HubSpot", "API"]
kpis:
  - value: "33 → 4"
    label: "Scénarios Make"
  - value: "16 → 0"
    label: "Factures en erreur"
  - value: "~4 h/sem"
    label: "Maintenance économisée"
draft: false
---

## L'entreprise

Fraich Touch est une agence de management qui représente des créateurs de contenu et des athlètes de premier plan, dont Major Mouvement. Leur modèle repose sur une commission de 20 % sur chaque deal négocié entre un talent et une marque (L'Oréal, NutriPur…).

Concrètement, ça implique des dizaines de transactions en parallèle, chacune avec son cycle de vie : devis, facturation échelonnée (jusqu'à 12 factures par deal), VHR (frais variables), gestion de la TVA selon que le talent est français ou étranger, et des bons de commande pour certains clients. Tout est géré entre HubSpot (CRM), Pennylane (comptabilité) et les communications aux talents.

## Le problème

Fraich Touch avait déjà investi dans l'automatisation de sa facturation avec un premier prestataire. Mais le projet, prévu pour septembre 2025, n'était livré qu'à 70-80 % en décembre. Entre-temps, Pennylane avait changé son API deux fois, obligeant le prestataire à reconstruire le système trois fois, sans jamais nettoyer les anciennes versions.

Résultat concret :

- **33 scénarios Make empilés**, dont 28 étaient des reliques inutilisées (tests, backups, anciennes versions).
- **16 factures bloquées** dans la file d'erreurs de Make, jamais envoyées aux clients : du CA en suspens que personne ne voyait.
- Un **bug d'acomptes** qui marquait les deals comme « payés » alors que seul un acompte avait été versé (3-4 deals faussés par mois).
- **Zéro visibilité** : les factures étaient stockées dans un Data Store Make accessible uniquement par API. Les erreurs étaient découvertes par hasard.
- Chaque pipeline annuel (2025, 2026) était **codé en dur** : ajouter 2027 obligeait à dupliquer tous les scénarios à la main.

Quand William, le fondateur, nous contacte en janvier 2026, son équipe a perdu confiance dans le système. Ils ne savent pas quelles factures sont parties, lesquelles sont bloquées, ni pourquoi.

## La solution

Après un audit complet des 33 scénarios, 17 connexions et 3 Data Stores, le diagnostic est clair : patcher l'existant serait plus long et plus coûteux que de tout reconstruire. On repart de zéro avec une architecture pensée pour durer.

### Nouvelle architecture

HubSpot reste la source unique (CRM), mais Notion remplace les Data Stores opaques de Make pour le suivi et la configuration. 4 scénarios Make propres et documentés remplacent les 33 précédents.

### Génération automatique des devis

Dès qu'un deal passe en « BRAVO » dans HubSpot, le devis se crée dans Pennylane avec le bon montant, la bonne TVA et le bon contact, et s'envoie au client. Si le client signe, le devis passe automatiquement en « accepté ».

### Facturation échelonnée intelligente

Jusqu'à 12 factures par deal, créées en brouillon avec les bonnes dates. Chaque jour à 9 h, les factures du jour sont finalisées et envoyées. VHR intégrés automatiquement à la première facture. TVA calculée selon le code pays du talent.

### Demande de facture talent

Quand un paiement client est reçu, le talent reçoit automatiquement un email avec les détails de la transaction. Talent non trouvé dans la base ? Alerte automatique à l'équipe.

### Dashboard Notion temps réel

Chaque facture a son statut en temps réel, ses erreurs détaillées et un lien direct vers le deal HubSpot. L'équipe filtre par client, date ou statut en un clic. Alertes automatiques en cas d'erreur.

### Configuration dynamique

Au lieu de coder les IDs des pipelines en dur, les scénarios lisent une table de configuration Notion. Pour ajouter le pipeline 2027, il suffit d'ajouter une ligne : zéro scénario à toucher.

## Les étapes

### Semaine 1 — Audit et diagnostic

Analyse complète du compte Make (33 scénarios, 17 connexions, 3 Data Stores). Mapping du pipeline commercial HubSpot et des spécificités métier (TVA, VHR, échelonnement, bons de commande). Livraison d'un rapport d'audit détaillé avec vidéo explicative et recommandation de refonte.

### Semaine 2 — Développement

Construction des 4 scénarios Make, dashboard Notion, intégration Pennylane API v2. Mise en place des webhooks HubSpot en remplacement du polling horaire. Configuration du mapping dynamique et de la logique TVA par code pays.

### Semaines 3-4 — Tests et itérations

Sessions de test en live avec l'équipe sur de vrais deals. Corrections TVA, ajustement des workflows devis, validation du processus de réclamation facture talents. Migration des données historiques HubSpot vers Notion. Points de suivi bi-hebdomadaires.

### Mise en production

Nettoyage des statuts par l'équipe, activation progressive, vidéo de formation pour les agents. 1 mois de support post-livraison inclus.

## Les résultats

### Fiabilité totale de la facturation

Les 16 factures bloquées dans la Dead Letter Queue, c'est terminé. Chaque facture est envoyée à temps, chaque erreur remonte instantanément dans Notion. Plus de CA bloqué, plus de retards de paiement découverts par hasard.

### Visibilité en temps réel

L'équipe est passée de zéro visibilité à un dashboard Notion où chaque facture a son statut, ses erreurs détaillées et un lien direct vers le deal HubSpot. Lise gère les paiements quotidiens (6-7 par jour) en quelques clics au lieu de naviguer entre HubSpot, Pennylane et des fichiers Excel.

### 4 h/semaine économisées

Debugging d'une erreur : 5 min au lieu de 30-60 min. Modification d'un flux : 1 h au lieu de 2 h × 2 scénarios. Vérification des factures : 1 clic au lieu d'un contrôle manuel souvent oublié.

### Scalabilité intégrée

Le système est prêt pour 2027, 2028 et au-delà sans refonte. Ajouter un pipeline annuel prend 30 minutes au lieu d'une journée : une ligne à ajouter dans la table de configuration Notion.

### Autonomie de l'équipe

Système documenté, vidéo de formation, dashboard intuitif. L'équipe gère les paiements, les vérifications et le suivi en autonomie complète. La formation d'un nouveau collaborateur prend 30 minutes au lieu de plusieurs heures.
