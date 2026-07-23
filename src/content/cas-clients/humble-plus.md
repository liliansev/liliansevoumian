---
title: "Des bons de commande B2B aux factures, sans ressaisie"
secteur: "Nutrition fonctionnelle · E-commerce B2B"
date: 2026-07-23
tags: ["Ops", "Finance", "IA"]
tools: ["n8n", "Mistral", "Shopify", "Pennylane", "Slack", "Gmail"]
kpis:
  - value: "2 flux"
    label: "PDF + XLS unifiés"
  - value: "60+"
    label: "Nœuds orchestrés"
  - value: "0,00 €"
    label: "Écart sur cas test"
draft: false
---

## L'entreprise

Humble+ est une marque française de compléments alimentaires spécialisée dans le collagène et le bien-vieillir. En plus de sa boutique en ligne, elle développe un réseau B2B auprès des pharmacies et des salles de sport.

Ces commandes professionnelles arrivent sous deux formes très différentes : des bons de commande en **PDF pour les pharmacies**, et des fichiers **Excel pour les salles de sport**. Elles doivent ensuite devenir une commande Shopify et une facture Pennylane, avec les bons produits, les bonnes quantités, les bonnes remises et le bon client.

## Le problème

Un premier workflow Make automatisait déjà une partie du traitement, mais il restait trop fragile pour absorber le volume attendu.

- Il ne traitait **qu'un email à la fois**. Il fallait attendre la fin d'une commande avant d'envoyer la suivante.
- La création d'un nouveau client Shopify pouvait échouer et imposer une reprise manuelle.
- L'extraction confondait parfois une quantité avec un taux de TVA.
- Les deux circuits PDF et Excel partageaient la même entrée malgré des structures et des règles métier différentes.
- Les conversions entre unités et cartons reposaient sur des règles difficiles à maintenir.
- Une commande rejouée pouvait créer un doublon si elle n'était pas détectée assez tôt.

Le brief fixait un objectif clair : pouvoir absorber jusqu'à **50 emails de commande par heure**, sans surveillance continue, et ne solliciter l'équipe qu'en cas d'anomalie ou de décision métier.

## La solution

Après l'audit, j'ai reconstruit le parcours dans **n8n** autour d'une règle simple : l'IA extrait, mais les contrôles critiques restent déterministes.

### Une entrée unique pour deux flux

Les emails Gmail sont séparés par type de commande, puis chaque pièce jointe est traitée individuellement. Le workflow détecte le format, envoie le PDF vers le circuit pharmacie et l'Excel vers le circuit salle de sport. Un fichier non reconnu déclenche une alerte au lieu de disparaître silencieusement.

Cette boucle permet de traiter plusieurs pièces jointes dans un même message et d'enchaîner les commandes sans bloquer la file.

### Extraction IA, contrôle déterministe

Un agent **Mistral** lit le document et renvoie un JSON structuré : client, adresses, produits, EAN, quantités, remises et totaux.

La sortie n'est jamais utilisée telle quelle. Une étape de normalisation recalcule chaque ligne depuis les montants imprimés, redéduit la remise, écarte les lignes offertes ou sans EAN valide et remonte les incohérences. L'IA comprend le document ; les règles métier garantissent le résultat.

### Une commande Shopify fidèle au bon de commande

Le workflow cherche le client Shopify, le crée s'il n'existe pas, puis retrouve chaque variante par son EAN. Une Data Table n8n contient les correspondances entre EAN carton et nombre d'unités : la conversion ne s'applique que lorsqu'une règle connue existe.

Si la quantité ne tombe pas juste, l'arrondi au carton supérieur passe par une validation Slack avant toute création. Les adresses françaises et belges sont normalisées avec le bon code pays, les lignes ignorées sont tracées dans la commande et un stock nul déclenche une alerte dédiée.

### Un client Pennylane retrouvé sans doublon

La recherche Pennylane privilégie les identifiants légaux stables, puis utilise l'email comme repli. Le workflow peut retrouver, créer ou mettre à jour le client avant de préparer la facture.

Chaque ligne conserve sa quantité, son prix, sa TVA et sa remise. La facture est toujours créée en **brouillon**, avec sa date d'échéance et le bon mode de règlement, avant toute finalisation.

### Une validation humaine pensée comme une transition

Pendant la phase de stabilisation, Slack affiche le client, les lignes et les totaux HT, TVA et TTC. Deux contrôles sont prévus : l'un pour les arrondis de cartons, l'autre pour la facture finale.

Une validation finalise la facture, attend la génération du PDF puis déclenche son envoi. Un refus laisse la facture en brouillon ou arrête la création, sans bloquer les commandes suivantes. Ce filet de sécurité est conçu pour être retiré progressivement une fois les premiers lots validés.

### Anti-doublon et gestion des reliquats

Dès que la facture brouillon existe, le numéro du bon de commande est enregistré dans une Data Table. Une nouvelle tentative avec le même numéro est arrêtée proprement.

Le workflow traite aussi les produits en reliquat : il enrichit la description de facture, attend le PDF final puis l'envoie au client. Les exceptions restent visibles sans casser le parcours standard.

## Les étapes

### Audit du workflow existant

Cartographie du scénario Make, des deux formats de commande et des règles Shopify/Pennylane. Les points de fragilité ont été isolés avant toute reconstruction.

### Refonte dans n8n

Construction d'un workflow de plus de 60 nœuds, organisé autour de trois blocs : lecture et contrôle du document, création de la commande, puis facturation. Les règles de packs, l'identification client et les garde-fous anti-doublon sont centralisés au lieu d'être dispersés.

### Tests puis mise en production progressive

Le parcours a été validé sur un PDF pharmacie et un fichier Excel salle de sport, avec des adresses françaises et belges. Les validations Slack ont ensuite permis de tester les commandes réelles tout en gardant une décision humaine sur les cas sensibles.

## Les résultats

> Projet en phase de stabilisation : les résultats ci-dessous viennent des tests réels et des premières commandes traitées. La capacité de 50 emails par heure reste l'objectif de dimensionnement, pas une mesure de production.

- **Deux formats métier réunis dans un seul système** : PDF pharmacie et Excel salle de sport suivent chacun leurs règles sans multiplier les automatisations.
- Sur le cas de référence documenté dans le workflow, les totaux étaient **identiques au centime** dans Slack, Shopify et Pennylane, soit **0,00 € d'écart**.
- Les parcours de test PDF pharmacie et Excel salle de sport ont couvert la recherche client, les remises, les conversions de cartons et les adresses en France comme en Belgique.
- La création d'un client absent, l'anti-doublon, les stocks nuls et les reliquats disposent désormais de branches explicites.
- L'équipe est passée d'une surveillance technique commande par commande à un **point de validation structuré dans Slack** pendant la phase de stabilisation.

Le workflow est publié sur l'instance n8n de Humble+ et fonctionne sur des commandes réelles. La dernière étape consiste à retirer progressivement les validations manuelles une fois le comportement verrouillé sur l'ensemble des formats reçus.
