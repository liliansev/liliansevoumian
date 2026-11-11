# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal brand site for Lilian Sevoumian: the reference point for his track record and everything he does today (client work, videos, newsletter, training). His agency, agenceafk, is set aside since 10 November 2026: the site no longer features it anywhere (see Key Implementation Notes). The two offers (automation/AI and websites) stay, in the background. Product truth lives in `PRODUCT.md`. Built with Astro 5.x.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview production build locally
```

## Tech Stack

- **Framework**: Astro 5.x with static output
- **Styling**: Tailwind CSS v4 (via @tailwindcss/vite)
- **Icons**: astro-icon with Lucide and Simple Icons
- **Fonts**: Roboto Flex Variable everywhere since 10 November 2026 (`@fontsource-variable/roboto-flex`, imported and preloaded by `layouts/Layout.astro` for every page, the blog included), Roboto Mono 500 for the tool pills only. Geist Mono, Bricolage Grotesque and Gochi Hand stay in `package.json` but no page loads them; `@fontsource/jetbrains-mono` stays only for `scripts/og-carnet` (the share image)
- **pnpm**: the lockfile and the Dockerfile are pnpm 10.26.2; with an older global pnpm, run `npx -y pnpm@10.26.2 <command>`
- **Language**: French (fr)
- **QA**: agent-browser (headless). Playwright est INTERDIT sur ce projet : désinstallé, ne pas réinstaller, ne pas créer de fichier .spec.ts.

## Architecture

```
src/
├── components/
│   │   # — communs à toutes les pages —
│   ├── Navigation.astro       # la barre, la même partout : rend `robot/barre.astro` (pilule blanche flottante) avec les liens de la page et un seul bouton « Parlons de votre projet »
│   ├── Footer.astro           # rend `robot/pied.astro` (« À très vite. »)
│   ├── BoutonReservation.astro # le bouton d'appel : mène au formulaire de contact (goal contact_opened) ; `direct` pour l'agenda
│   ├── formulaire-contact.astro # e-mail, nom, message, envoyés par /api/contact (Resend) dans la boîte de Lilian ; une erreur de saisie s'écrit sous son champ (toutes d'un coup à l'envoi, l'adresse vérifiée en quittant le champ, un domaine écorché proposé corrigé), le brouillon suit d'une page à l'autre (`sessionStorage`), l'envoi, l'échec et l'envoi réussi se lisent à côté du bouton, qui reste focalisable (`aria-disabled`) et finit sur « Envoyé », puis « Écrire un autre message » ; les champs passent en lecture seule pendant l'envoi, un échec s'annonce tout de suite (`aria-live="assertive"`), le brouillon est aussi gardé en quittant la page (`pagehide`)
│   ├── tete-de-page.astro     # en-tête d'une page intérieure : retour, h1, chapô, bouton, preuves
│   ├── partie.astro           # une partie d'une page de lecture : titre à gauche, texte à droite ; `clair` en fait une île claire
│   ├── questions.astro        # la FAQ, la même partout : un accordéon classique, en `details`, sans script
│   ├── fin-de-page.astro      # la fin de chaque page : une phrase, le formulaire de contact (sans l'adresse e-mail dessous, `note={false}`), le lien vers l'agenda (prix en une ligne sur l'accueil) ; `titreLargeur` règle la mesure du titre
│   ├── pourquoi-moi.astro     # île claire : portrait, notice à la troisième personne, puis « je »
│   ├── retour.astro           # fil de retour d'une page intérieure
│   ├── SectionHeader.astro    # titre + chapô d'une section (ni sur-titre ni filet)
│   ├── LinkCTA.astro          # lien secondaire fléché
│   ├── Outil.astro            # logo + nom d'un outil dans le fil du texte
│   ├── robot/                 # l'accueil « Citron et lilas » (10 novembre 2026), le seul rendu sur `/`
│   │   ├── robot.css          # la grammaire, rangée sous `.tenue-robot` : noir chaud, citron (gestes), lilas (surfaces), Roboto Flex ; passe « plus fin » : titres en graisse 600, filets d'un pixel, une seule courbe sans rebond
│   │   ├── bureau.css         # à partir de 1100 px seulement : chaque section devient un composant dessiné (ouverture à fils, une scène par métier, pile de cas en cartes d'étapes, trois cartes d'avis) ; sous 1100 px elle ne change rien
│   │   ├── robot.astro        # le petit robot (SVG décoratif) ; ses yeux suivent la souris (script de index.astro) ; quatre endroits seulement : barre, salut, contact, pied
│   │   ├── outils.astro       # une pastille par outil, chacune sa couleur (data/outils.ts)
│   │   ├── barre.astro        # la barre flottante en pilule blanche, menu en `dialog` ; sur l'accueil quatre liens (pas de « Contact », le bouton y mène), le lien de la section à l'écran est marqué (dans le menu aussi), le bouton d'appel passe au trait quand le formulaire est à l'écran et reste dans la pilule à côté de « Menu » jusqu'à 900 px (sous 560 px : le robot sans le nom, et le bouton s'efface tant que celui de l'ouverture est à l'écran ; sous 344 px « Menu » seul) ; la pilule ne change pas de largeur sous le pointeur ; le menu ouvert fige la page, un de ses liens emmène le focus dans sa section, et « Menu » ne s'affiche pas sans script
│   │   ├── ouverture.astro    # le nom, le portrait non retouché et ses trois étiquettes, un seul bouton « Parlons de votre projet » (après la photo sur téléphone ; c'était « Me contacter » jusqu'au 11 novembre 2026) ; au bureau, un scénario : les trois étiquettes en modules reliés au portrait par des fils
│   │   ├── metiers.astro      # les 4 métiers en onglets (sous 700 px : une colonne de 82 px d'icônes avec leur nom court dessous, le panneau à droite ; de 700 à 1000 px chaque onglet écrit son nom ; le bloc garde sa hauteur d'un onglet à l'autre, les panneaux au repos portent `data-repos` au lieu de `hidden`) ; au bureau, un panneau lilas avec la scène animée du métier (`metiers/scene-*.astro`, une par sujet ; les agents IA jouent `scene-appels.astro`, un téléphone et un support client, les formations `scene-cours.astro`, un atelier)
│   │   ├── clients.astro      # le mur de logos à filets (data/clients.ts), puis les quatre chiffres de l'audience sur une ligne à filets (sortis de l'ouverture), leur signe en lilas ; au bureau, un défilé avec son bouton pause (un mur en mouvement réduit)
│   │   ├── avis.astro         # trois citations séparées par des filets, le passage retenu en texte citron ; au bureau, trois cartes : une grande sur lilas, deux sombres à sa droite ; aucun script
│   │   ├── projets.astro      # les cas clients en cartes, ceux qui ont un avant / après d'abord ; au bureau, une pile de feuilles qui se recouvrent au défilement, chacune avec ses étapes en cartes et un écart avant / après ; rien n'y est animé
│   │   ├── etapes.astro       # les étapes d'un cas en cartes fixes, d'après son `flow` (deux puis trois) ou son `parcours` (trois puis deux, numérotées) ; ni fil ni script ; bureau seulement
│   │   ├── contact.astro      # « Parlons de votre projet » et le formulaire seul : ni agenda ni adresse e-mail
│   │   ├── pied.astro         # « À très vite. », les liens (la page où l'on est porte `aria-current`), et « S’abonner à la newsletter » tout en bas, au trait (sur toutes les pages, via Footer)
│   │   # — la tenue « Entre les deux » (3 novembre 2026), celle des autres pages ; `sobre/` n'est plus l'accueil mais entete/pied servent partout —
│   ├── sobre/                 # l'accueil et la barre/le pied de tout le site
│   │   ├── sobre.css          # la colonne de l'accueil (900 px) et ses titres de section
│   │   ├── entete.astro       # la barre collante de toutes les pages (rendue par Navigation) : logo « ls » à curseur, liens, « Parlons de votre projet », menu en `dialog` ; se détache en barre flottante au défilement
│   │   ├── pied.astro         # le pied de toutes les pages (rendu par Footer) : logo, « Ailleurs », « Sur le site »
│   │   ├── ouverture.astro    # le nom, une ligne, le chapô, « S’abonner sur YouTube », le portrait, quatre chiffres
│   │   ├── services.astro     # « Ce que je fais » : les 4 métiers (data/metiers.ts), icônes dessinées pour le site
│   │   ├── clients.astro      # la grille des logos clients (data/clients.ts)
│   │   ├── projets.astro      # les cas clients en lignes cliquables (collection cas-clients)
│   │   ├── terrain.astro      # trois photos de Lilian au travail
│   │   ├── avis.astro         # trois recommandations (data/avis.ts)
│   │   └── contact.astro      # `#ecrire` : le formulaire de contact et le lien vers l'agenda
│   │   # — accueil « Le carnet » (27 octobre au 3 novembre 2026), plus rendu ; carnet.css porte encore les jetons de toutes les pages —

│   ├── carnet/                # l'accueil en carnet d'ingénieur, lu comme un scénario Make : un module coloré par section, un chemin de pointillés entre eux
│   │   ├── carnet.css         # la grammaire, rangée sous `.tenue-carnet` : jetons, voix, pilules, polaroïds, scotch, modules, chemin, cartes
│   │   ├── griffe.astro       # un griffonnage (cœur, vague, icônes) tracé au build par `lib/carnet/griffonnages.ts`
│   │   ├── tete.astro         # l'en-tête d'une section : module (couleur, griffonnage, numéro), titre, chapô ; pas de sur-titre
│   │   ├── barre.astro        # barre collante (nom, sections, « Écrire »), menu plein écran en `dialog`
│   │   ├── ouverture.astro    # le nom, la signature, « S'abonner sur YouTube », l'audience datée (data/parcours.ts, `audience`), le polaroïd du NoCode Summit
│   │   ├── defile.astro       # le défilé des logos des clients, avec son bouton pause (data/clients.ts)
│   │   ├── suivre.astro       # module 1 : dernière vidéo et newsletter en cartes (dernier numéro dans data/derniere-newsletter.ts, inscription /api/newsletter), puis LinkedIn, Augmentés, agenceafk en liens
│   │   ├── adore.astro        # module 2 : « J'adore… », huit autocollants, une couleur par type de travail
│   │   ├── methode.astro      # module 3 : le kanban d'exemple ; un toucher fait avancer une carte, glisser, Entrée et flèches, remise à zéro
│   │   ├── coulisses.astro    # module 4 : quatre polaroïds
│   │   ├── avis.astro         # module 5 : trois citations (celles de documentaire/voix.astro)
│   │   ├── contact.astro      # module 6 (`#ecrire`) : formulaire-contact en habit `carnet`, lien vers l'agenda
│   │   ├── pied.astro         # le pied de l'accueil : le nom en très grand, liens dehors et pages du site, sans année
│   │   └── chemin.astro       # le chemin de pointillés d'un module à l'autre (SVG, à partir de 768 px, là où la gouttière passe à 32 px), qui se colore en violet à la lecture ; les pastilles des modules atteints passent au vert
│   │   # — accueil « Le documentaire » (14 au 27 octobre 2026), plus rendu sur `/` —
│   ├── documentaire/          # les chapitres de l'accueil, lus comme un court documentaire sur Lilian au travail
│   │   ├── documentaire.css   # la grammaire commune : plan et sa lumière, incrustation, sous-titre, carton, crédit, étalonnage
│   │   ├── chapitre.astro     # un chapitre : `data-chapitre` (son nom dans la barre), `data-lueur` (sa teinte), carton et colonne
│   │   ├── ouverture.astro    # « Salut, je m'appelle », le nom, le métier ; le bouton « Parlons de votre projet » à droite ; le plan au bureau en cinémascope, qui s'ouvre une fois ; défilé des logos (id `hero`)
│   │   ├── defile-clients.astro # le défilé des logos des clients, avec son bouton pause (data/clients.ts)
│   │   ├── plan-large.astro   # un plan en cinémascope sur toute la colonne : lumière, incrustation, sous-titre de Lilian, source
│   │   ├── portrait.astro     # « À propos » : portrait et ce qu'il dit, le plan au micro, les faits sans date en carton, ses formations en champ et contrechamp (data/parcours.ts, `faits`)
│   │   ├── contrechamp.astro  # deux plans côte à côte (le champ, le contrechamp), chacun son incrustation, un seul sous-titre
│   │   ├── en-ce-moment.astro # les projets en cours, une affiche chacun : le texte, et le plan qui parcourt le site au survol (data/projets.ts, `enCours`)
│   │   ├── expertises.astro   # les 4 scènes des métiers en une séquence : un grand plan, la liste des plans au-dessus, la phrase en sous-titre (data/metiers.ts)
│   │   ├── publications.astro # la dernière vidéo YouTube et la newsletter (même script que l'ancien home-content)
│   │   ├── filmographie.astro # les projets clients en filmographie, lus dans les cas : un client par ligne, secteur et outils, phrase, lien, workflow en miniature
│   │   ├── voix.astro         # « Ils en parlent » : une citation en grand, le rail des trois personnes à côté (la forme de l'ancien home-voices)
│   │   ├── fin.astro          # la fin : `fin-de-page` sur la nuit, sans maille (id `fin`, chapitre « Contact » ; le générique de fin en est sorti le 14 octobre 2026)
│   │   └── barre-chapitres.astro # la barre de lecture fixe, comme une vidéo à chapitres, et l'étalonnage de la page
│   │   # — accueil d'avant, plus rendus sur `/` —
│   ├── home-hero.astro        # titre centré, bouton d'appel, grille, défilé des logos des clients
│   ├── home-story.astro       # récit en 3 actes + scène ; au bureau le défilement joue les 4 modes, sur mobile deux vues
│   ├── home-services.astro    # 4 métiers (automatisation, agents IA, dashboards et outils métiers, formations) : un nom, une phrase, une ligne, la sortie ; une scène chacun, jouée une fois ; onglets sur téléphone. Ses métiers sont dans `data/metiers.ts`
│   ├── metiers/               # les scènes des métiers + leur socle CSS (scene-metier.css) ; rejouées sur l'accueil au bureau (`robot/metiers.astro`), sans leurs lueurs. `scene-cours.astro` (un atelier : diapositive, exercice, équipe) est la scène des formations sur l'accueil et `scene-appels.astro` (un téléphone, le support client, le compte rendu) celle des agents IA ; `scene-formations.astro`, qui ressemblait à un workflow, et `scene-agents.astro`, un agent de recherche, ne servent plus qu'à /explorations-metiers
│   ├── home-today-path.astro  # « Pourquoi moi » (panneau clair) + frise du parcours
│   ├── home-content.astro     # la dernière vidéo YouTube (relevée par le serveur, voir `data/derniere-video.ts`) + newsletter écrite comme un mail
│   ├── home-voices.astro      # trois recommandations, une voix à la fois, choisie par le visiteur
│   │   # — page d'offre /automatisations-ia —
│   ├── HeroManifesto.astro    # hero : titre, chapô, bouton
│   ├── LogoMarquee.astro      # bandeau d'outils défilant
│   ├── Automatisations.astro  # les tâches qu'on automatise
│   ├── CaseStudy.astro        # carrousel de 3 projets
│   ├── Methode.astro          # 4 étapes, en île claire, + schéma (automation-control-diagram)
│   ├── Testimonials.astro     # recommandations
│   ├── APropos.astro          # trajectoire 2020 → aujourd'hui
│   ├── Stack.astro            # 4 outils (n8n, Make, Notion, Airtable), une ligne d'usage chacun
│   ├── Offres.astro           # formats, prix de création et abonnements, en île claire
│   ├── ROICalculator.astro    # simulateur de temps (2 curseurs)
│   │   # — page d'offre /outils-metiers —
│   ├── SubscriptionGrid.astro # liste de prix à plat (abonnements de /automatisations-ia)
│   ├── ProjectVisual.astro    # vignette d'une réalisation (vitrine des explorations)
│   ├── application-system-diagram.astro
│   │   # — cas clients —
│   ├── mockups/               # MockupWindow (châssis fenêtre), WorkflowCanvas (faux canvas n8n/Make)
│   │   # — hors site —
│   ├── home-sites.astro       # vitrine de trois sites, sortie de l'accueil ; visible sur /explorations-metiers/vitrine
│   └── explorations/          # essais non retenus, page /explorations-metiers
├── content/
│   └── cas-clients/           # 4 cas en .md, frontmatter typé
├── data/                      # metiers.ts (les 4 métiers), projets.ts, faq.ts, home-faq.ts, make-ou-n8n.ts (une seule réponse pour tout le site), maintenance.ts et service-pricing.ts (les prix), parcours.ts, clients.ts, derniere-video.ts, realisations.ts, outils-metiers.ts, brands.ts
├── lib/                       # reservation.ts (agenda, libellé du bouton), contact.ts (adresse de contact), contact-message.ts (envoi du formulaire par Resend), roi.ts, metiers/scene.ts (moteur des scènes), robot/fils.ts (les fils de l'ouverture de l'accueil au bureau : tracé, ports, grain), blocs/atelier.ts (formes 3D, hors accueil)
├── layouts/
│   ├── Layout.astro           # SEO, JSON-LD, embed cal.com, défilement vers le formulaire (avec son entrée d'historique ; « Précédent » rend le focus au bouton utilisé), suivi DataFast ; pose `data-clavier` sur `html` à la première tabulation (l'anneau de focus se montre alors quel que soit le pointeur)
│   ├── PageExpertOutil.astro  # charpente des pages d'outil (/expert-make, /expert-n8n)
│   └── PageReponse.astro      # charpente des pages-réponses (une question, sa réponse dans le chapô)
├── pages/
│   ├── index.astro
│   ├── automatisations-ia.astro   # offre automation complète
│   ├── outils-metiers.astro   # offre outils métiers (dashboards, portails, outils internes), sur devis ; remplace /sites-web-abonnement (redirigée) depuis le 28/10/2026
│   ├── cas-clients/index.astro et [slug].astro   # l'index porte la grammaire de l'accueil (`.tenue-robot`) : une feuille par cas, le nom du client en lettres et son logo en signature, le registre avant / après dans un puits, son résultat phare en cellule lilas ; un cas sans écart mesuré montre son parcours
│   ├── expert-make.astro · expert-n8n.astro   # contenu seul, charpente partagée
│   ├── make-ou-n8n.astro · combien-coute-une-automatisation.astro · agent-ia-pour-pme.astro   # pages-réponses
│   ├── reprendre-une-automatisation-qui-casse.astro
│   ├── contact.astro          # le formulaire seul, cible des boutons quand la page n'a pas le sien
│   ├── principes.astro · mentions-legales.astro · 404.astro
│   └── llms.txt.ts            # fiche générée au build pour les moteurs IA
├── content.config.ts          # schéma Zod de la collection
└── styles/
    └── global.css             # jetons @theme, « La tenue commune », dispositif de la DA
(liens/)                       # sorti le 17 octobre 2026 dans le dépôt liliansev/linkinbio : /liens/ est servi
                               # par son propre conteneur (linkinbio-app), Caddy y envoie /liens* avant le site
api/
├── dfst-events.js             # proxy DataFast (cookieless)
├── contact.ts                 # formulaire de contact (délègue à src/lib/contact-message)
└── newsletter.ts              # inscription à la newsletter (délègue à src/lib/newsletter-signup)
```

## Design System

`DESIGN.md` is the source of truth; tokens live in the `@theme` block of
`src/styles/global.css`.

Since 10 November 2026 the whole site wears « Citron et lilas » (DESIGN.md,
*L'accueil « Citron et lilas »* and *« Citron et lilas » sur tout le site*,
which are authoritative): warm black `#0f0d0b`, white islands, lemon
`#ffd84d` for actions, lilac `#b9a6ff` for soft surfaces and marks, one
coloured pill per tool (`data/outils.ts`), Roboto Flex, a blinking
robot mascot; Lilian's photo is never tinted, and the page never explains how
it works. The same day Lilian asked for « un peu moins de friendly » and
« plus premium et travaillé tout en gardant la DA »: the « plus fin » pass
(DESIGN.md, *La passe « plus fin »*, which overrides older lines) sets
headings at weight 600 (620 for the name and an `h1`, never 800+) on three
sizes (`--r-t-nom`, `--r-t-2`, `--r-t-3`), 1px hairlines instead of 2px ink
rings, borderless lemon pills that darken (`#f6cb33`) and lift 1px on hover,
one easing curve (`--r-sortie`) with no bounce or tilt, straight 1.5px
underlines instead of wavy ones, radii 32/28/24/18/14, and the robot in four
places only (nav, hero greeting, contact, footer). From 1100 px up the home
also wears crafted desktop components (DESIGN.md, *Au bureau : des composants
travaillés*; Lilian rejected plain cards and any bento grid as « pas assez
créatifs, composants trop simplistes »), then commented on the preview the
same evening: a hero with three modules wired to the portrait
(`lib/robot/fils.ts`) and one single button (« Me contacter » then, « Parlons de votre projet » since 11 November 2026, the same name as the nav button and the form title); one animated
scene per métier on a lilac stage, each shaped like its subject (« trouver
une animation par sujet, là on dirait un workflow »: training is a workshop,
`metiers/scene-cours.astro`, not a scenario; AI agents are a phone call and a
support chat answered by the agent, `metiers/scene-appels.astro`); a logo marquee with a pause
button, then the four audience figures (out of the hero: « j'aime pas les
stats ici »); stacked case sheets whose steps are static cards
(`robot/etapes.astro`; « pas d'animations ici, juste des belles cards »);
three testimonial cards, one large on lilac and two dark (« mets les avis
dans des cards élégantes »). The newsletter button sits at the very bottom,
in the footer of every page, and the home's contact block is the form alone
(« restons sur le formulaire point barre »). All of it lives in `robot/bureau.css` inside
`@media (min-width: 1100px)`; below 1100 px only the hero button, the
figures and the footer changed. On 11 November 2026 the live version was locked
with a critique, then polish and colorize (DESIGN.md, *Le verrou*, which
overrides older lines): lemon is for actions only (call buttons, « Envoyer »,
a case arrow on hover, the selected tab's icon on desktop, the highlighted
passage of a dark testimonial, and one single outcome per scene; everything
else in a scene is lilac and its fake button is ink), « Menu » and the
newsletter button are outlined, the selected tab under 1100 px is lilac, the
nav has four links and marks the section on screen, the blacks are three
clear layers (page, sheet on `--r-surface-2`, step cards as `--r-noir`
wells), and the form says its errors under the field. The same day Lilian
rejected the critique score and the case index (« n'est pas bonne, la critique
a 20/32 aussi c'est pas bon on veut un score maximal »): DESIGN.md, *La
reprise : viser la note maximale*, overrides « Le verrou » where they differ
(one name for the call gesture, the call button stays in the nav pill from
560 px, named tabs from 700 px, a form that prevents errors, a lilac sent
confirmation, the case index rebuilt in the home's grammar, focus rings never
lemon on inner pages). A second round of two independent reviews followed the
same day (DESIGN.md, *La reprise, second tour*, which overrides the paragraph
above it where they differ; scores as measured: home 20, 25, 29, then 31 out of 32
at the confirmation review, case index 26, 28, then 31; each kept one gap, both
fixed since: Back after a call button returns focus to that button, and the
inner-page form is drawn like the home's in every state, see the last block of
`global.css`, « UN SEUL FORMULAIRE »): under 560 px the nav pill keeps the call button
with the robot alone and hides it while the hero button is on screen, phone
tabs carry a short name under each icon in an 82 px column, the tabs block
keeps one height, case cards share subgrid rows from 861 to 1099 px, → marks
an internal link and ↗ a new tab, the open menu locks the page and a menu
link moves focus into its section, the keyboard focus ring shows on any
pointer once Tab is pressed (`data-clavier`; the no-ring-on-touch rule of
`global.css` still holds for taps and scripted focus), one easing curve
site-wide. Inner pages and the blog
get the « plus fin » pass from the very last block of `global.css` (PASSE « PLUS FIN ») and of
`carnet.css`. The home lives in `components/robot/` under `.tenue-robot` and
passes `carnet={false}` to Layout. Every other page gets the same look
through a token swap: the carnet and `@theme` token names are kept
(`--violet` and `--color-peche` are the lemon…) and the last block of
`carnet.css` and of `global.css` (« CITRON ET LILAS SUR TOUT LE SITE ») carry
the values and redraw the objects; `Navigation` and `Footer` render
`robot/barre.astro` and `robot/pied.astro`. `.bloc-encre`, the closing
contact panel (`.fin__centre`) and the `/contact` sheet are white islands
with ink text; lemon is never text on white. Never infer a colour from a
token name. Everything below (« Entre les deux », « Nuit et menthe », « Le
carnet », « nuit et pêche ») is history: structural rules still hold, colours
and type do not.

Since 3 November 2026 every other page, the blog included, wears « Entre les
deux » (DESIGN.md, *Entre les deux*, which is authoritative): paper
`#f6f6f3`, white panels, ink `#17171a`, grey `#6c6d69`, 1px rules `#dededa`,
one cobalt `#2b44f0` reserved for actions (links, YouTube and form buttons,
focus, the logo cursor, call-button hover), Geist Mono Variable only, type
scale 12/14/16/20/24/32/48 (18 for a chapô), radii 4 to 8 px, no shadows,
rectangular 44 px buttons. The home page was `components/sobre/` until 10 November 2026; `Navigation`
and `Footer` render `sobre/entete.astro` (sticky, turns into a floating bar
after 60 px of scroll) and `sobre/pied.astro`. It is a token swap: the
carnet and `@theme` token names are kept (`--violet` is the cobalt,
`--color-peche` a pale blue, `--carnet-titre` Geist Mono…), and the last
block of `carnet.css` (« ENTRE LES DEUX ») and of `global.css` (« ENTRE LES
DEUX SUR TOUT LE SITE ») redraw the objects. In Geist Mono `1ch` is one
character: prose measure is `66ch`, and `tete-de-page`/`SectionHeader`
multiply their title width prop by 1.5. Never infer a colour from a token
name. Since 5 November 2026 (« Nuit et menthe », DESIGN.md): a navy night
`#0f1430` (`--nuit`) and a third colour, mint `#6ff0c4` (`--menthe-vive`,
`#0d8f66` `--menthe-texte` on paper); `.sombre` flips the tokens of a section,
`.bande-sombre` makes it full-bleed. Home: clients+projets and avis are dark
bands; the footer is dark on every page. Everything below about « Le carnet » and « nuit et pêche » is history.

Since 28 October 2026 every page but the blog wears « Le carnet » (see
below): `Layout` wraps the page in `.tenue-carnet` and loads
`components/carnet/carnet.css` and its two fonts; `Navigation` and `Footer`
render the carnet's `barre` and `pied`. The `@theme` tokens kept their old
names but carry carnet values (`--color-paper` = paper `#f6f2e8`,
`--color-ink` and `--color-night` = ink `#1d1a22`, `--color-peche` /
`--color-accent` = lilac `#b59cff` as a surface, `--color-accent-text` =
violet `#6a3df5`, fonts = Bricolage Grotesque, mono = Bricolage too,
`--shadow-card` empty); the last block of `global.css` (« LE CARNET SUR TOUT
LE SITE ») restyles what a token cannot: caps headings, a flat ink call pill,
violet `mark`, and `.bloc-encre` as a white sheet with an ink border, no
shadow. The carnet's object classes (`pilule`, `caps`, `meta`, `tete`…) are
scoped under `.carnet-ui` (home, barre, pied, contact form) because inner
components reuse those short names. The blog (`layouts/Carnet.astro`, an
older name) keeps its white Geist look and passes `carnet={false}`.

The list below is the former « nuit et pêche » system (3 to 28 October
2026). Its structural rules still hold (one call button, islands, shared
components, measure, motion); its colours and type no longer do:

- Background: deep night `#0c121f` everywhere (`--color-paper`); white text,
  greys tinted toward the night. `#111827` is `--color-night`
- One accent: peach `#ffb38a` (highlight, primary button, focus ring)
- Any text placed ON peach reads `--color-night`, never `--color-ink` (white)
- No full-width colour bands. Light only in `.bloc-encre`, a rounded island
  that remaps every colour token: it carries what the reader came to check
  (a price, results, a method, "pourquoi moi"). At most two per page, never
  two in a row, never the first or the last section
- No sharp corners: radius scale `--radius-xs` to `--radius-xl`, pill controls
- Headings `h1`–`h4` at weight 500; `mark` is a peach underline under a
  fragment of a title (it wraps with the text), one per title. The filled
  peach pill is the call button and nothing else (8 October 2026)
- No uppercase styling, no eyebrow above a heading, no section numbers
- Measure: in Geist `1ch` is about one and a half characters of prose, so
  `46ch` is a 70-character line (base rule on `p, li`)
- Motion: the underline is drawn once (`<mark>`), a page header enters once
  (`.entree`), media open with the scroll (`.media-ouvre`), pages cross-fade.
  On the former home page (« Le documentaire ») a movement played once and
  stopped. One loop remains by choice, with its pause
  control: the client logo marquee of the first screen. The tool marquee of
  `/automatisations-ia` is the other loop on the site

Typography:
- One family: Geist (`--font-display`, `--font-body`); no monospace

Every page is built from the shared components: `Navigation`, `tete-de-page`
(or its own hero on the home and offer pages), sections, `questions`,
`fin-de-page`, `Footer`. Reading pages use `partie`. A new inner page must not
hand-roll a header, an FAQ, a contact section or a back link.

Home page only (« Le carnet », 27 October 2026): a brand page, not a services
brochure (no prices, no prestation figures). An engineer's notebook on plain
paper: ink lines, flat surfaces, four vivid colours that code the type of
work (pink AI agent, lilac automation, blue business tool, yellow training)
and each section's module, mint for contact, handwritten notes (Gochi Hand),
condensed caps titles and bold labels (Bricolage Grotesque). The page reads
as a Make scenario: numbered round modules, left-aligned on the content edge,
joined by a dotted path through the margins. Since the taste review of 30
October 2026 (DESIGN.md, *L'accueil : le carnet*): no grid paper, no
monospace, a solid offset shadow on the polaroids only, and a seven-step type
scale in `carnet.css` (14, 17, 21, 28, 42, 77, 150 px on desktop); do not add
a size outside it. First gesture: « S'abonner sur
YouTube »; the contact form closes the page. Dated audience figures as social
proof, never the newsletter subscriber count. Grammar in
`src/components/carnet/carnet.css`; DESIGN.md, *L'accueil : le carnet*.
Inner pages wear the carnet's base since 28 October 2026 (papier, encre,
titles, pills), without its modules and dotted path.

Previous home (« Le documentaire », 14 to 27 October 2026, components kept
in `src/components/documentaire/`): the page read as a
short documentary about Lilian at work. Large rounded shots of real photos
of him that cast their light on the night, lower-thirds (name and role under
a peach line), centred peach-light subtitles, big chapter titles, a fixed
chapter bar like a YouTube progress bar, and a page grade (two fixed glows)
whose hue follows the chapter. Grammar in
`src/components/documentaire/documentaire.css`. Only real photos of Lilian
appear there; the generated work scenes never do. Lilian's own subtitles are
peach-light; other people's words (testimonials) are white, one quote at a
time beside a rail of the three people. One animated 2D interface scene per service, played as shots of
one sequence (`documentaire/expertises.astro`; scenes in
`src/components/metiers/`, engine in
`src/lib/metiers/scene.ts`; the glass 3D shapes only remain on
`/explorations-blocs`).

## Key Implementation Notes

- agenceafk est en retrait depuis le 10 novembre 2026 (Lilian : « arrête de
  mettre en avant Agence AFK pour l'instant. Je mets ce projet un peu de
  côté »). Le site ne la met plus en avant : ni bouton ni lien vers
  agenceafk.fr, ni « fondateur d'agenceafk » dans les résumés, le balisage ou
  /llms.txt, ni dans le pied de page (`data/parcours.ts`, `organisations` et
  `activites`). Sa fondation reste un fait daté du parcours. Ne pas la
  remettre sans son mot.
- Les agents IA se disent comme Lilian les dit (même jour) : support client
  et agent vocal, « un agent qui prend les appels à ta place, qui répond aux
  clients à ta place ». Ne pas écrire que l'agent « prend la main », ni
  tourner la phrase de l'accueil autour de la main gardée par un humain. Les
  pastilles d'outils de l'accueil : Make et n8n (automatisation), Claude Code
  et Codex (dashboards et outils métiers).
- Le citron ne sert qu'aux gestes (11 novembre 2026, DESIGN.md, *Le
  verrou*). Ne pas en remettre sur un état, un décor ou un survol : un état
  est lilas (la confirmation d'envoi du formulaire comprise), un bouton
  secondaire est au trait, un anneau de focus n'est jamais citron, et dans
  une scène un seul objet est citron, son aboutissement. Le bouton « Envoyer » ne porte jamais
  l'attribut `disabled` (il lâcherait le focus) : `aria-disabled`.
- Un seul geste sur tout le site : « Parlons de votre projet » mène au
  formulaire de contact (14 octobre 2026 : la conversation `home-invite` est
  retirée, jugée trop compliquée par Lilian). Tout bouton d'appel passe par
  `BoutonReservation` : sa prop `source` est requise, et c'est ce qui garantit
  que le goal `contact_opened` est posé avec sa provenance. Un `<a>` écrit à la
  main vers cal.com ouvre bien l'agenda mais n'apparaît dans aucun funnel. Le
  seul lien direct vers l'agenda est « Réservez un appel », sous le formulaire
  (`direct`, goal `lead_call`), sur les pages intérieures seulement : sur
  l'accueil le contact est le formulaire seul, sans lien vers l'agenda ni
  adresse e-mail sous le bouton (Lilian, 10 novembre 2026 : « trop
  d'informations, le formulaire, l'appel, et le mail. restons sur le
  formulaire point barre » ; `note={false}` sur `formulaire-contact`, qui ne
  donne alors l'adresse que sans script ou après un échec d'envoi). L'envoi demande `RESEND_API_KEY` dans
  l'environnement du serveur (voir `deploy/README.md`). Hors composant (réponses de
  FAQ, llms.txt), l'URL vient de `lib/reservation.ts`. Voir `DATAFAST-FUNNEL.md`.
- Un fait, une source : les prix se lisent dans `data/service-pricing.ts` et
  `data/maintenance.ts`, la réponse « Make ou n8n » dans `data/make-ou-n8n.ts`,
  le parcours dans `data/parcours.ts`. Rien ne s'écrit sur une page qui ne soit
  dans `PRODUCT.md` (« Evidence on Hand »).
- L'accueil ne nomme aucun client à la main. Le défilé des logos les cite
  tous, depuis `data/clients.ts` ; le pied de page mène à l'index des cas
  (`/cas-clients`), jamais à un cas en particulier.
- La dernière vidéo YouTube est relevée par le serveur de production
  (`deploy/server.mjs`, `/api/derniere-video`, flux des vidéos longues) et la
  page la remplace d'elle-même : rien à faire à chaque publication.
- Ne jamais citer les marqueurs `{/*` et `*/}` littéralement à l'intérieur d'un
  commentaire : le `*/` interne le referme, et la fin du texte est rendue comme
  du contenu. Écrire ce genre de note en commentaires de ligne, dans le
  frontmatter.
- All text content is in French
- A brand home, two offer pages (automation, business tools; no more websites since 28 October 2026), tool pages, answer pages and case studies
- JSON-LD structured data for SEO (Person + ProfessionalService schemas)
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Custom scrollbar styling and infinite scroll animations in global.css
- Site URL: https://liliansevoumian.fr
