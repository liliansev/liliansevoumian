---
title: "Comment M Partners scrape et qualifie ses prospects avec un agent IA"
seoTitle: "Scraping et qualification de prospects par agent IA : cas client Make"
description: "M Partners qualifie 23 cibles en 7 minutes et scrape 300 entreprises par semaine, sourcing des signaux et notation des profils compris."
client: "M Partners"
enClair: "Un agent IA qui trouve et qualifie les prospects"
accroche: "J’ai construit l’agent IA qui lit la page « Équipe » de chaque entreprise, note chaque profil et envoie les bons contacts dans leur CRM."
secteur: "Chasse de têtes · startups et capital-risque"
date: 2026-05-05
tags: ["Sales", "Ops"]
tools: ["Make", "Claude", "Apollo", "Loxo"]
kpis:
  - value: "~10 min"
    label: "Par run, contre 1 à 3 h pour 50 entreprises à la main"
  - value: "×6"
    label: "Capacité de scraping hebdomadaire (~50 → 300)"
  - value: "23"
    label: "Cibles qualifiées sur 4 entreprises (run mesuré, ~7 min)"
flow:
  describe: "Schéma du workflow de prospection M Partners : chaque semaine, un agent lit les pages d’équipe de 300 entreprises, Claude note chaque profil, le dirigeant valide la liste, puis les cibles retenues sont ajoutées dans Loxo et un e-mail récapitule le passage."
  trigger: { icon: "lucide:users", kicker: "Chaque semaine", title: "300 entreprises lues", sub: "pages d’équipe" }
  agent: { icon: "simple-icons:anthropic", kicker: "Claude", title: "Note chaque profil", sub: "décideurs · priorité 1 ou 2" }
  actions:
    - { icon: "lucide:user-check", kicker: "Le dirigeant", title: "Valide la liste" }
    - { icon: "lucide:contact-round", kicker: "Loxo", title: "Cibles ajoutées" }
    - { icon: "lucide:mail", kicker: "E-mail", title: "Récapitulatif envoyé" }
bascule:
  - { avant: "Une cinquantaine d’entreprises passées en revue par semaine", apres: "300 entreprises par semaine" }
  - { avant: "1 à 3 heures pour 50 entreprises, à la main", apres: "7 à 10 minutes à chaque lancement de l’agent" }
  - { avant: "Le dirigeant prospecte", apres: "Le dirigeant valide" }
nomenclature:
  - { etape: "Détection des signaux de levée et de recrutement", outil: "Make", role: "declencheur" }
  - { etape: "Constitution des listes de cibles", outil: "Make", role: "action" }
  - { etape: "Parcours des pages d'équipe", outil: "Agent navigateur", role: "agent" }
  - { etape: "Filtrage de la page collectée", outil: "Agent IA", role: "controle" }
  - { etape: "Notation et grade des profils", outil: "Claude", role: "agent" }
  - { etape: "Validation avant lancement des séquences", outil: "Make", role: "controle" }
  - { etape: "Poussée des cibles dans le CRM", outil: "Loxo", role: "action" }
  - { etape: "Séquences de prospection", outil: "Loxo", role: "action" }
  - { etape: "Récapitulatif de fin de run", outil: "Email", role: "controle" }
draft: false
---

## L’entreprise

M Partners est un cabinet de chasse de têtes (executive search) spécialisé sur l’écosystème startup et capital-risque. Le cœur du métier : identifier et approcher les bons dirigeants (founders, CTO, CPO, partners de fonds) au bon moment, quand une entreprise lève des fonds ou recrute.

## Le problème

Toute la prospection se faisait **à la main**. Chaque semaine, **50 à 80 entreprises** étaient passées en revue une par une : ouvrir chaque page d’équipe, repérer les bons contacts, les recopier. Comptez **1 à 3 heures rien que pour 50 boîtes**. Au total, à peine **400 contacts par mois**, jugés très insuffisants pour couvrir le marché des levées récentes et des signaux de recrutement.

L’objectif : **passer de ~50 à 300 entreprises scrapées par semaine** (×6) sans y passer ses journées, et sans dégrader la qualité du ciblage.

## La solution

J’ai industrialisé la prospection de bout en bout, orchestrée dans **Make**, en quatre étages.

### Sourcing des signaux

Les bons moments sont détectés automatiquement : entreprises qui viennent de lever (*funding signals*), mouvements de dirigeants (*talent signals*), investisseurs actifs. Les signaux alimentent des listes structurées, prêtes à être travaillées.

### Scraping des entreprises

Un **agent navigateur** reproduit le workflow manuel : pour chaque entreprise, il parcourt la page d’équipe et extrait noms, postes et profils **LinkedIn**. Une page scrapée = une entreprise traitée, d’où le passage à l’échelle (300/semaine) sans surcoût de temps.

### Qualification par agent IA

Un **agent IA** note chaque profil selon sa pertinence : il repère les décideurs (CTO, CPO, DG, People…), attribue un **grade** (1 = prioritaire, 2 = secondaire) et justifie son choix. Sur une page de 26 profils, il n’en remonte que les bons. Le dirigeant valide en un coup d'œil avant lancement.

### CRM & campagnes

Les cibles qualifiées sont ajoutées automatiquement dans **Loxo**, qui centralise le **CRM et les séquences de prospection**. Un email récapitulatif tombe après chaque exécution avec les statistiques du run.

## Les résultats

- **De ~50 à 300 entreprises scrapées par semaine** (×6), pour un temps de travail divisé d’autant.
- Un **run automatisé tourne en ~7 à 10 minutes** là où 50 entreprises prenaient 1 à 3 heures à la main.
- Run validé : **23 cibles qualifiées sur 4 entreprises en ~7 minutes** (8 prioritaires, 6 secondaires, 9 investisseurs), email récap à l’appui.
- Le dirigeant est passé de **prospecteur manuel** à **valideur** : il garde la main sur la décision finale, la machine fait le reste.
