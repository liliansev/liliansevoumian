---
title: "Un catalogue produits qui s'enrichit tout seul"
secteur: "Distributeur IT B2B"
date: 2026-06-20
tags: ["Ops"]
tools: ["n8n", "Mistral", "Odoo", "Claude"]
kpis:
  - value: "2–3 ¢"
    label: "Coût IA par fiche"
  - value: ">60 %"
    label: "Matching auto (319/515)"
  - value: "797"
    label: "Fiches specs scrapées"
draft: false
---

## L'entreprise

Celeris est un distributeur IT B2B établi (PC, serveurs HPE, Dell, Lenovo), dont tout le catalogue et la gestion commerciale tournent sur Odoo. Un acteur avec une exigence forte : **garder la maîtrise de ses données**, beaucoup devant rester en interne.

## Le problème

L'enrichissement du catalogue produits était **100 % manuel** : les commerciaux recopiaient les fiches depuis des fichiers constructeurs (CTO) aux colonnes différentes selon les marques. Chronophage, source de doublons et d'erreurs — et un frein direct à la mise en ligne des produits.

## La solution

J'accompagne les équipes Celeris dans leur montée en compétence sur l'automatisation, et j'ai conçu un système qui enrichit le catalogue **directement dans leur ERP**, pensé pour tourner en interne.

### Une architecture à deux agents IA (n8n + MCP Odoo)

- **Agent 1** lit le fichier constructeur, extrait et structure les données, génère la fiche produit.
- **Agent 2** vérifie la sortie, applique les bons attributs (sans jamais créer de doublon) et crée le produit dans Odoo via un **MCP Odoo**.

### Scraping des fiches techniques

Les specs constructeurs sont récupérées automatiquement (déjà **797 pages** de fiches techniques scrapées), avec un déclenchement mensuel pour rester à jour.

### Une IA souveraine

Le moteur de génération est **Mistral** — IA française, données en Europe — choisi pour répondre à l'exigence de souveraineté de Celeris. Les données sensibles ne transitent pas par le cloud public : le MCP tourne en local, protégé par une URL secrète et une clé cryptographique.

### Validation humaine

Chaque fiche est créée **en brouillon** : le commercial reçoit le lien Odoo et valide avant publication. L'agent sait même **modifier une fiche après coup**, en langage naturel.

## Les résultats

> Projet en cours de déploiement (mise en production visée à l'été 2026) — chiffres mesurés à ce stade.

- Workflow d'enrichissement **fonctionnel sur l'environnement de test**, validé sur les serveurs HPE.
- **Coût IA quasi nul** : 2 à 3 centimes par fiche générée.
- Sur les données existantes, **plus de 60 % de correspondances automatiques** (319 produits sur ~515) — le reste fléché pour revue humaine.
- Une architecture pensée pour s'étendre aux autres marques (Dell, HP) et à d'autres départements.
