---
title: "Scraping, sourcing et qualification alimentée par l'IA"
seoTitle: "Prospection et qualification automatisées par agent IA — cas client"
description: "M Partners qualifie 23 cibles en 7 minutes là où l'équipe ouvrait chaque page d'entreprise une par une."
secteur: "Executive Search · Tech & VC"
date: 2026-05-05
tags: ["Sales", "Ops"]
tools: ["Make", "Claude", "Apollo", "Attio", "Instantly"]
kpis:
  - value: "50 → 300"
    label: "Entreprises scrapées /sem"
  - value: "~10 min"
    label: "Par run (vs 3 h à la main)"
  - value: "23"
    label: "Cibles qualifiées /run"
draft: false
---

## L'entreprise

M Partners est un cabinet de chasse de têtes (executive search) spécialisé sur l'écosystème startup et capital-risque. Le cœur du métier : identifier et approcher les bons dirigeants — founders, CTO, CPO, partners de fonds — au bon moment, c'est-à-dire quand une entreprise lève des fonds ou recrute.

## Le problème

Toute la prospection se faisait **à la main**. Chaque semaine, **50 à 80 entreprises** étaient passées en revue une par une — comptez **1 à 3 heures rien que pour 50 boîtes** : ouvrir chaque page d'équipe, repérer les bons contacts, les recopier. Au total, à peine **400 contacts par mois**, jugés très insuffisants pour couvrir le marché des levées récentes et des signaux de recrutement.

L'objectif : **passer de ~50 à 300 entreprises scrapées par semaine** (×6) sans y passer ses journées, et sans dégrader la qualité du ciblage.

## La solution

J'ai industrialisé la prospection de bout en bout, orchestrée dans **Make**, en quatre étages.

### Sourcing des signaux

Les bons moments sont détectés automatiquement : entreprises qui viennent de lever (*funding signals*), mouvements de dirigeants (*talent signals*), investisseurs actifs. Les signaux alimentent des listes structurées, prêtes à être travaillées.

### Scraping des entreprises

Un **agent navigateur** reproduit le workflow manuel : pour chaque entreprise, il parcourt la page d'équipe et extrait noms, postes et profils LinkedIn — là où une simple API atteint vite ses limites. Une page scrapée = une entreprise traitée, d'où le passage à l'échelle (300/semaine) sans surcoût de temps.

### Qualification par agent IA

Un **agent IA** note chaque profil selon sa pertinence : il distingue les vrais décideurs (CTO, CPO, DG, People…) des profils secondaires, attribue un **grade** (1 = prioritaire, 2 = secondaire) et justifie son choix. Sur une page de 26 profils, il n'en remonte que les bons. Le dirigeant valide en un coup d'œil avant lancement.

### CRM & campagnes

Les cibles qualifiées sont poussées automatiquement dans le **CRM (Attio)** avec le bon mapping, puis dans les **séquences multicanales (Instantly)** — email + LinkedIn. Un email récapitulatif tombe après chaque exécution avec les statistiques du run.

## Les résultats

- **De ~50 à 300 entreprises scrapées par semaine** (×6), pour un temps de travail divisé d'autant.
- Un **run automatisé tourne en ~7 à 10 minutes** là où 50 entreprises prenaient 1 à 3 heures à la main.
- Run validé : **23 cibles qualifiées sur 4 entreprises en ~7 minutes** (8 prioritaires, 6 secondaires, 9 investisseurs), email récap à l'appui.
- Le dirigeant est passé de **prospecteur manuel** à **valideur** : il garde la main sur la décision finale, la machine fait le reste.
