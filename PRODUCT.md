# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Register

brand

## Users

Le site s'adresse d'abord à **quelqu'un qui vient de croiser Lilian ailleurs** et qui veut savoir à qui il a affaire. Il arrive après une vidéo YouTube, un post LinkedIn, un numéro de la newsletter, une formation, une recommandation, ou en tapant son nom dans un moteur de recherche ou un assistant IA.

Trois profils confirmés, par ordre d'importance :

- **Les décideurs qui envisagent de lui confier un projet** : heads of Ops / RevOps, fondateurs de startups, dirigeants de PME, agences et studios qui sous-traitent. Ils veulent vérifier la légitimité avant de prendre contact.
- **Les personnes qui veulent apprendre** : celles qui suivent ses vidéos, sa newsletter ou ses formations Make et n8n, et cherchent le reste de ce qu'il publie.
- **Les moteurs de recherche et de réponse** : ce ne sont pas des visiteurs, mais ce sont eux qui répondent à la question « qui est Lilian Sevoumian ? ». Le site doit être la source qu'ils citent.

Leur tâche commune : **en une visite, comprendre qui est Lilian, ce qu'il a fait, ce qu'il fait aujourd'hui, et trouver le bon chemin pour la suite.**

## Product Purpose

Être **le point de référence sur Lilian Sevoumian** : l'endroit où l'on retrouve, au même endroit, son parcours, ses accomplissements et tout ce qu'il fait aujourd'hui. Un visiteur doit pouvoir se dire « ah, Lilian a fait tout ça, et aujourd'hui il fait tout ça, il en est là ».

Ce changement de cap date du 1er octobre 2026. Auparavant, le site était un site de prestation dont l'unique succès était la prise d'un appel de découverte, autour de deux offres de même poids. Les offres restent, mais **au second plan** : elles sont une des choses que Lilian fait aujourd'hui, elles ne portent plus la page d'accueil.

**Succès = le visiteur retrouve tout, puis choisit son chemin.** Il n'y a pas une action unique à obtenir : selon son besoin, il part vers une vidéo, s'abonne à la newsletter, regarde une formation, découvre l'agence ou prend contact pour une mission. Le second critère de succès est la présence dans les moteurs : le site doit sortir facilement sur le nom de Lilian et sur ses sujets, et être repris correctement par les moteurs de réponse.

Aucun objectif chiffré n'est fixé à ce jour (abonnés, clics sortants, positions).

**Le fil de la page d'accueil**, donné par Lilian le 1er octobre 2026 : la page ne commence pas par une présentation, elle prend position puis raconte. Dans l'ordre : « si vous avez la sensation de perdre du temps dans votre business, vous avez raison » ; voilà pourquoi ; voilà pourquoi automatiser ; voilà pourquoi faire appel à moi. C'est un récit qui se déroule au défilement, avec du mouvement, pas une suite de rubriques. Le premier écran est le titre seul, centré, et au bas de l'écran le défilé des logos des entreprises avec lesquelles il a travaillé (`src/data/clients.ts` ; treize logos pris sur les sites officiels le 2 octobre 2026, quatre noms restent en lettres faute d'identification sûre : M Partners, KlaK, Movecool, Reborn).

Précision du 2 octobre 2026 : en passant sur la page, on doit comprendre que Lilian fait **de l'automatisation, de l'IA, des formations et des sites web ou des dashboards**. La page le dit dans sa barre de navigation et dans une section « Je fais quatre choses. », un bloc par métier, chacun avec sa sculpture de verre en trois dimensions. Trois sites suffisent sur l'accueil. Aucun titre ne doit en répéter un autre.

Ce que la page doit mettre en avant, sans ordre imposé : construire des automatisations et des agents IA personnalisés ; créer des landing pages qui convertissent ; créer des vidéos en motion design ; ses formations ou son agence ; sa newsletter (Lumail) ; sa chaîne YouTube.

Pour « qui je suis » : il fait ça depuis six ans, il l'a appliqué dans ses propres activités, et il connaît de l'intérieur la contrainte d'avoir une équipe et des clients, de devoir livrer tout en perdant du temps ou sans avoir les bons outils métier.

## Positioning

Une seule et même personne construit pour des clients, enseigne ce qu'elle construit et le publie. Ce qu'un site voisin ne pourrait pas copier sans mentir, c'est l'addition, vérifiable ligne par ligne : freelance depuis 2020, plus de 100 entreprises accompagnées, premier Français certifié Make niveau 5, plus de 300 personnes formées, une chaîne YouTube, une newsletter, des cas clients aux résultats mesurés, une plateforme de formation (Augmentés, 2023) et une agence (agenceafk, 2026).

Le site ne présente donc pas « un freelance et ses offres » mais **un praticien et sa trajectoire** : ce qu'il a fait, ce qu'il fait maintenant, où le suivre.

## Operating Context

- **Arrivées** : YouTube, LinkedIn, newsletter, recommandation, recherche sur le nom, réponse d'un assistant IA.
- **Sorties** : la chaîne YouTube, l'inscription à la newsletter (sur le site, via Lumail), les formations (augmentes.fr), l'agence (agenceafk.fr), la réservation d'un appel (Cal.com, toujours via `BoutonReservation`), LinkedIn.
- **Lecture par les moteurs** : données structurées `Person` et `ProfessionalService` dans `src/layouts/Layout.astro`, fiche `/llms.txt` générée au build depuis les mêmes sources que les pages (`src/pages/llms.txt.ts`), sitemap.
- **Mesure** : DataFast, sans cookie, avec des objectifs par action (`data-fast-goal`). Voir `DATAFAST-FUNNEL.md`.
- **Langue** : français. Une version anglaise est possible plus tard, sans engagement.

## Capabilities and Constraints

- Site statique Astro, sans compte ni espace connecté.
- **Les pages d'offre existent et restent** : `/automatisations-ia`, `/sites-web-abonnement`, `/expert-make`, `/expert-n8n`, `/reprendre-une-automatisation-qui-casse`, `/cas-clients` et ses fiches, `/principes`. Elles passent au second plan, elles ne sont pas supprimées.
- **Un fait, une source.** Un chiffre ou un titre affiché sur une page, dans le balisage et dans `/llms.txt` vient du même endroit dans le code. Un moteur qui lit deux versions d'un fait n'en cite aucune.
- **Rien d'inventé.** Seuls les faits listés dans « Evidence on Hand » peuvent être affirmés. Tout chiffre d'audience est daté et doit pouvoir être mis à jour à un seul endroit.
- **Arbitrages du 1er octobre 2026**, quand le site et LinkedIn divergeaient : LinkedIn fait foi pour le parcours (un an chez Jellysmack, cofondateur de La Capsule, au passé) ; le site n'affiche pas de nombre de vidéos YouTube ; Substack n'est plus cité nulle part.
- Tout lien vers l'agenda passe par `BoutonReservation` (suivi de l'objectif `lead_call`).

**Décisions encore ouvertes** (à trancher par Lilian avant de les écrire sur le site) :

- Le **nombre d'abonnés à la newsletter** n'est pas établi. La newsletter de référence, elle, est tranchée : c'est celle du formulaire du site, branché sur Lumail (`src/lib/newsletter-signup.ts`). L'ancien Substack n'est plus la référence.
- D'autres accomplissements à faire figurer (conférences, presse, prix) : aucun n'est documenté.

## Brand Commitments

- **Nom** : Lilian Sevoumian. Site : https://liliansevoumian.fr.
- **Personnalité** : opinionated, technique, premium. Lilian a des avis tranchés sur les outils et les process ; le registre est celui de la précision (durées, pourcentages, noms d'outils) ; l'exécution est soignée au pixel.
- **Une âme, quitte à cliver** (demande de Lilian, 1er octobre 2026) : le site doit être unique et laisser quelque chose en mémoire ; qu'il divise n'est pas grave. Une page propre faite de listes à filets, de cartes et de grilles lui paraît générique (« IA slop »). Chaque section porte un composant qui n'existe que là, avec un mouvement conçu pour lui, et le texte prend parti.
- **Voix** : directe, factuelle, sans fioriture. Pas de « passionné par la transformation digitale ». Plutôt « j'ai fait économiser X heures par semaine à Y en branchant Z à W ».
- **Direction, précisée le 1er octobre 2026 au soir** : « tech moderne, propre », appuyée sur des grilles ; références désignées par Lilian : novu.co, vimcal.com, juanmora.co, qdrant.tech. Il veut aussi de la 3D, sous forme de blocs « tech, lego, premium » (proposition sur `/explorations-blocs`, style non encore choisi). Titre du premier écran, dicté par lui : « Salut, je m'appelle Lilian Sevoumian et je suis expert en Automatisations & Agents IA ».
- **Direction visuelle** : « nuit et pêche », validée le 1er octobre 2026, sans angle vif et avec trois gestes de mouvement. Le détail fait foi dans `DESIGN.md`. Le lime est abandonné sur ce site : c'est déjà la couleur d'agenceafk.fr et d'augmentes.fr, et le site personnel doit s'en distinguer.
- **À fuir** :
  - le look agence freelance générique : hero en dégradé bleu/violet, photo casquette, « bonjour je suis X et je vous accompagne », grille 3×3 d'icônes colorées ;
  - la sur-décoration : ombres multicolores, blobs flous, illustrations 3D vibrantes, dégradés sur le texte, verre décoratif ;
  - le ton chaleureux convenu : palette crème / sable / terracotta, polices rondes humanistes, vocabulaire « bienveillance » et « accompagnement » ;
  - l'ancien site : crème et orange chaud, ombres colorées, accents quadricolores, Bricolage Grotesque.
- **Références positives** (à étudier, pas à copier) : vercel.com pour la grille tenue et les filets ; plain.com pour les micro-animations et les logos intégrés au titre ; modal.com pour la sensation premium par la précision.

## Evidence on Hand

Ce qui peut être affirmé aujourd'hui, avec sa source. « LinkedIn » désigne le profil public de Lilian, lu le 1er octobre 2026 ; les autres sources sont des chemins du dépôt.

**Ce qu'il fait aujourd'hui**

- **agenceafk** (agenceafk.fr), fondée en janvier 2026 : agents IA, automatisations Make et n8n et outils métiers sur mesure pour les entreprises de 5 à 50 personnes. Chaque projet part d'un processus réel et va jusqu'à un système utilisable en production (LinkedIn).
- **Augmentés** (augmentes.fr), fondée en novembre 2023 : formations pratiques à Make, n8n et à l'IA, pour les indépendants et les équipes, en ligne, à distance ou dans leurs locaux. Parcours Make sur apprendre-make.com, parcours n8n sur formation-n8n.com, formation en entreprise sur augmentes.fr (LinkedIn).
- **Freelance en automatisation et agents IA**, depuis septembre 2020 : conception, reprise et maintenance de workflows (LinkedIn, `src/pages/llms.txt.ts`).
- **Formateur invité** : Maria Schools (Lion, l'école pour mettre l'IA au service de son métier), de juillet à septembre 2026 (LinkedIn).
- **Publication** : chaîne YouTube `@lilian.sevoumian`, 96 vidéos, 1,87 k abonnés et 103 094 vues (page publique de la chaîne, 1er octobre 2026) ; LinkedIn, 11 444 abonnés ; newsletter hebdomadaire sur l'automatisation, tenue sur Lumail et à laquelle on s'inscrit depuis le site (`src/components/home-content.astro`, `src/lib/newsletter-signup.ts`). La dernière vidéo est embarquée sur la page d'accueil (`src/components/home-content.astro`).

- **Ce qu'il propose**, tel que Lilian le formule (1er octobre 2026) : automatisations et agents IA personnalisés ; landing pages qui convertissent ; vidéos en motion design. Aucune réalisation de motion design n'est encore documentée dans le dépôt : ne pas en montrer ni en chiffrer sans qu'il les fournisse.

**Ce qu'il a fait**

- **Chiffres** : plus de 100 entreprises accompagnées, plus de 300 personnes formées à Make, n8n et à l'IA (LinkedIn, `src/pages/llms.txt.ts`).
- **Certifications** : premier Français certifié Make niveau 5 ; Airtable Certified (`src/layouts/Layout.astro`, bloc `hasCredential`).
- **La Capsule** : cofondateur et COO du studio de podcast, à Vanves, de novembre 2023 à février 2026. Il y a automatisé le back-office : réservations et paiements, livraison des fichiers, support client, comptabilité (LinkedIn).
- **Jellysmack** : No-Code Engineer en CDI, d'avril 2022 à avril 2023 (LinkedIn).
- **École O'clock** : développeur back-end, stage d'avril à octobre 2023 (LinkedIn).
- **Missions freelance datées** (LinkedIn) : Familytrip (mars-avril 2021), Qonto et KlaK (novembre 2021 à février 2022), Edumiam (janvier 2022 à janvier 2024), Movecool (mai 2022 à février 2023), Reborn (juillet 2023 à janvier 2024), Deuxième Souffle (juillet 2023 à mars 2024), Boost ton Biz (juillet 2024 à août 2025).
- **Cas clients documentés sur le site** : Humble+, M Partners, Fraich Touch, Celeris, Deuxième Souffle (`src/content/cas-clients/`), chacun avec ses outils et ses chiffres mesurés chez le client.
- **Réalisations citées** (LinkedIn) : commandes B2B reliées à Shopify et Pennylane ; facturation synchronisée entre HubSpot et Pennylane ; prospection qualifiée par des agents IA ; enrichissement de fiches produits dans Odoo ; back-office de La Capsule.
- **Recommandations** : Ismail Landoulsi (CasanovaParis), Alexis Kovalenko (Contournement), Benjamin Potet (Solution Architect Customer Experience chez Make, précisé par Lilian le 2 octobre 2026) (`src/components/Testimonials.astro`).
- **Sites réalisés** : son propre site, agenceafk, Augmentés, Youmanista, meilleurs.tools, La Petite Stack (`src/data/realisations.ts`, captures dans `public/sites-web/projects/`, vérifiées contre les sites en ligne le 1er octobre 2026). Flameborn est sorti de la liste ce jour-là : flameborn.fr ne répondait plus (zone DNS vide).

**Sa façon de travailler**, telle qu'il la formule (LinkedIn) : partir des processus réels et non d'une liste d'outils ; construire avec l'équipe, sur les logiciels qu'elle utilise déjà ; livrer des systèmes fiables en production, où un humain garde la main sur les cas douteux ; accompagner la prise en main pour que l'équipe sache s'en servir sans lui.

Ce qui n'existe pas et ne doit pas être fabriqué : presse, conférences, prix, nombre d'abonnés à la newsletter, chiffres ou noms de clients de l'agence, effectifs, volumes par formation. Les statistiques privées du profil LinkedIn (vues, impressions) ne sont pas des faits publics et ne figurent pas sur le site.

## Product Principles

1. **Le site est la source de référence.** Chaque fait sur Lilian (un titre, un chiffre, une date) y est exact, daté, écrit une seule fois, et lisible par un humain comme par un moteur. C'est ce qui le fait sortir dans les recherches et ce qui le fait citer.
2. **Une trajectoire, pas un catalogue.** Le site raconte ce que Lilian a fait, ce qu'il fait aujourd'hui et où il en est. Les prestations sont une étape de ce récit, pas son sujet.
3. **Complet sur les faits, bref sur chacun.** Tout ce qui compte y figure, mais un accomplissement tient en une ligne avec sa preuve ; le détail est à un clic. Prendre position reste la règle : pas de liste de tout ce qu'il « pourrait » faire.
4. **Chaque activité a sa sortie.** Vidéo, newsletter, formation, agence, mission : le site oriente vers le bon endroit, il ne cherche pas à retenir.
5. **Le site est la démonstration.** La rigueur d'exécution que Lilian revendique se voit dans la construction du site lui-même. S'il bugue ou flotte, le propos tombe.

## Accessibility & Inclusion

- **WCAG AA** sur tous les textes et états interactifs : corps ≥ 4,5:1 sur le fond nuit comme sur le panneau clair, bordures interactives ≥ 3:1. Tout texte posé sur la pêche est de la nuit. Les valeurs mesurées sont dans `DESIGN.md`.
- **Mouvement réduit** respecté : toutes les animations dégradent proprement, et rien n'est masqué si un script ne tourne pas.
- **Navigation clavier complète** : focus visible sur les deux surfaces, ordre de tabulation logique, lien d'évitement vers `#main-content`.
- **Version anglaise possible plus tard** : éviter d'écrire de longs textes en dur dans les composants.
