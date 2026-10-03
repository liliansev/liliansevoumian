# Funnel de conversion DataFast — liliansevoumian.fr

Objectif business : **être contacté pour une mission**. Le site n'a plus qu'un
seul canal, le **diagnostic de 20 min** réservé sur cal.com.

Le tracking est posé en code : attributs `data-fast-goal` lus nativement par le
script DataFast cookieless sur les liens cal.com, plus un appel JS sur la résa
confirmée. Les **funnels** se configurent dans le dashboard DataFast à partir des
9 goals ci-dessous.

> ⚠️ **DataFast est cookieless** (empreinte IP+UA serveur, aucun `datafast_visitor_id`
> exposé). Conséquence : impossible d'attribuer une conversion depuis un backend tiers
> (webhook cal.com → API `/v1/goals`), car cette API exige le visitor_id introuvable.
> C'est pourquoi `call_booked` passe par l'**embed cal.com on-site** (cf. ci-dessous),
> et **pas** par un webhook. Voir aussi la mémoire projet `project_datafast-cookieless`.

---

## 1. Les 10 goals (état réel du code)

### `service_path_opened` — choix d'une expertise
Émis à trois endroits de l'accueil et depuis le menu mobile des autres pages.
La prop `source` dit lequel a converti :

- `home_metier_automation`, `home_metier_web` : le lien d'offre des blocs
  Automatisation et Dashboards et outils métiers de la section « Mes expertises ». `home_metier_web` garde son nom pour ne pas casser les filtres : le
  bloc s'appelait « Sites web et dashboards » jusqu'au 3 octobre 2026, et son
  lien mène maintenant à `/sites-web-abonnement#applications` ;
- `home_metier_agents` : le prix du bloc Agents IA, qui mène à
  `/automatisations-ia` (le bouton du bloc, lui, sort vers agenceafk) ;
- `home_services_automation`, `home_services_web` : la ligne de prix sous le
  bouton de fin de page (`home_services_web` : « Dashboards et outils métiers,
  sur devis », même remarque) ;
- `nav_mobile_offers` : le menu mobile, hors accueil (sur l'accueil le menu ne
  liste que les quatre métiers).

Jusqu'au 2 octobre 2026 les blocs des métiers et les lignes de prix émettaient
la même source, et le funnel ne pouvait pas dire lequel des deux avait servi.

### `lead_call` — clic « Réserver un appel » (cal.com)
Émis sur le **seul lien direct vers l'agenda** : le moyen « Réserver un appel ·
45 min » de la conversation (`home-invite.astro`), source `home_causerie`, sur
toutes les pages. C'est une **intention de call** (le clic), pas la réservation
confirmée — celle-ci se passe sur cal.com (voir Limite plus bas).

Jusqu'au 3 octobre 2026, chaque bouton du site ouvrait l'agenda et émettait
`lead_call` avec sa source (`hero`, `offres`, `expert-make`, `cas_article`…).
Depuis, tous les « Parlons de votre projet » ouvrent la conversation et
émettent `causerie_opened` (ci-dessous) : la source par page se lit là. Un
`lead_call` vient après, si le visiteur choisit l'appel.

Sans script, ou si la conversation n'a pas démarré, un bouton reste un lien
vers l'agenda : l'overlay s'ouvre, mais le goal émis est celui que porte le
lien, `causerie_opened`.

### `call_booked` — réservation cal.com confirmée (embed on-site)
La **vraie conversion appel** (pas juste le clic). Les boutons cal.com ouvrent une
**popup embarquée** (embed cal.com, init dans `Layout.astro`) au lieu d'un onglet :
le visiteur **reste sur le domaine**, donc DataFast l'attribue via son empreinte —
ce qui marche en cookieless, **sans redirection ni webhook**. Émis en JS sur
l'événement cal.com `bookingSuccessfulV2` (dédupliqué par `uid` de booking).

| Param `source` | Valeur |
|----------------|--------|
| `source` | source du dernier bouton cliqué (`hero`, `roi`, `offres`, `cas_article`, `expert-*`…) ou `cal_embed` |

> Un clic ne peut plus gonfler cette stat : seule une réservation réellement
> confirmée déclenche `call_booked`. `lead_call` (le clic) reste l'étape d'intention.

### `cal_abandoned` — calendrier ouvert, refermé sans réserver
Émis à la fermeture de l'overlay quand aucune réservation n'a été confirmée, avec
la `source` du bouton d'origine. **C'est le goal qui rend la déperdition lisible** :
entre `lead_call` (le clic) et `call_booked` (la résa), tout se passait dans un
iframe cross-origin, donc dans l'angle mort. `lead_call − call_booked` donnait un
écart sans cause ; `cal_abandoned` dit lesquels sont allés voir le calendrier.

### `lead_email` — n'est plus émis
Il comptait le clic sur l'adresse e-mail du pied de page et de la section de
contact. Aucune adresse n'est plus affichée en lien : écrire par e-mail passe
par la conversation, et se compte dans `lead_message` (`canal` = `email`).

### `roi_used` — premier mouvement d'un curseur du simulateur
Émis **une fois par page**. Le simulateur est la deuxième section et le principal
signal d'intérêt de la page — il n'était pas instrumenté du tout.

### `faq_opened` — première ouverture d'une question
Prop `question` = le libellé. Une question ouverte est une objection nommée : le
classement des libellés dit laquelle bloque le plus. Depuis le 3 octobre 2026
les questions sont des bulles (`questions.astro`), toutes ouvertes sur grand
écran : le goal ne part donc que **sur téléphone**, quand le visiteur touche une
question fermée. Sur grand écran il n'y a plus de geste à mesurer.

### `case_opened` — clic vers un cas client
Prop `href`. Couvre les « VOIR LE CAS » du carrousel, « VOIR TOUS LES CAS », et
les liens de `/cas-clients` depuis À propos et Offres. Aucun n'était tagué.

### `causerie_opened` — ouverture de la conversation depuis un bouton
Posé par `BoutonReservation` sur tous les « Parlons de votre projet » du site,
qui ouvrent la conversation de `home-invite.astro` (WhatsApp, e-mail ou appel).
La prop `source` dit d'où :

| Param `source` | Où |
|----------------|-----|
| `home_nav` · `home_nav_mobile` · `home_pourquoi_moi` · `home_offres` | Accueil `/` |
| `automatisations_nav` · `automatisations_nav_mobile` · `hero` · `roi` · `offres` · `automatisations_fin` | Offre `/automatisations-ia` |
| `sites_web_nav` · `sites_web_nav_mobile` · `sites_web_hero` · `sites_web_applications` · `sites_web_fin` | Offre `/sites-web-abonnement` |
| `expert-make` · `expert-make_nav` · `expert-make_fin` · `expert-n8n` · `expert-n8n_nav` · `expert-n8n_fin` | Pages d'outil |
| `cas_index_nav` · `cas_index_fin` · `cas_article_nav` · `cas_article_fin` | Pages cas-clients |
| `reprise_nav` · `reprise-hero` · `reprise_fin` | `/reprendre-une-automatisation-qui-casse` |
| `make-ou-n8n_nav` · `make-ou-n8n_fin` · `combien-coute-une-automatisation_nav` · `combien-coute-une-automatisation_fin` · `agent-ia-pour-pme_nav` · `agent-ia-pour-pme_fin` | Pages-réponses |
| `principes_nav` · `principes_fin` · `mentions_nav` · `404_nav` · `404` · `footer` | Autres pages |
| `nav_mobile_cta` | Bouton du menu mobile, sur les pages qui portent les liens du site (toutes sauf l'accueil et les deux pages d'offre, qui émettent `…_nav_mobile`) |

Les sources `…_fin` sont celles du champ de fin de page (`fin-de-page.astro`) :
le visiteur y a peut-être écrit une phrase avant de cliquer.

### `lead_message` — message envoyé depuis la barre d'écriture
Prop `canal` = `whatsapp` ou `email`. Posé sur les deux liens de la conversation
(`home-invite.astro`), présente sur toutes les pages : le clic ouvre WhatsApp ou
la messagerie du visiteur avec son message déjà rédigé. Il mesure l'ouverture,
pas l'envoi : celui-ci se fait hors du site. Le troisième moyen, l'appel, est
un `lead_call` de source `home_causerie`.

### `youtube_opened` — sortie vers YouTube depuis l'accueil
Sources : `home_content` (la dernière vidéo, vignette et titre) et
`home_content_chaine` (le lien « Voir toutes les vidéos sur YouTube »), tous deux
dans la section « Je montre comment je fais » (`home-content.astro`). Le clic
ouvre YouTube dans un nouvel onglet : il mesure la sortie, pas le visionnage.

### `outbound_formations` — sortie vers augmentes.fr
Sources : `offres`, `faq`, `home_services`, `footer`. Ce n'est pas une perte : c'est
l'intention « apprendre soi-même » qui trouve sa route.

### `outbound_agence` — sortie vers agenceafk.fr
Sources : `home_services`, `footer`. Depuis octobre 2026 l'accueil présente ce que Lilian
fait aujourd'hui, et l'agence est une de ses sorties : comme pour les
formations, un clic ici est une orientation réussie, pas une fuite.

> Dix goals. La taxonomie `contact_lead` / `cta_contact_click` des anciennes
> versions n'existe plus.
>
> **Ce qui reste volontairement absent : le scroll-depth et les goals
> d'engagement.** Un scroll ne dit pas ce que le lecteur veut, il dit qu'il
> descend. Les six goals ajoutés sont des gestes délibérés rattachés à un endroit
> précis de la page, et les goals continus n'émettent qu'une fois : on mesure
> « il a essayé », pas combien de fois.
>
> **`lead_form` n'existe plus.** Le formulaire de contact a été retiré du site au
> profit d'un canal unique, la réservation. `api/contact.js` a été supprimé avec
> lui. Tout funnel du dashboard fondé sur ce goal tombera à zéro à la mise en
> ligne : c'est attendu, ce n'est pas une panne de tracking.

---

## 2. Les 3 funnels à créer dans le dashboard DataFast

**Dashboard → Funnels → « + Funnel »**. Étape 1 = visite d'une URL, étape 2 = goal.
Les funnels DataFast sont par session : un visiteur qui voit l'URL puis fire le goal
dans la même session compte comme converti.

### Funnel A — « Accueil → Expertise »
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite accueil | Page visit | URL equals `/` |
| 2 | A choisi une expertise | Goal | `service_path_opened` *(filtrer `source` ∈ home_metier_automation, home_metier_web, home_services_automation, home_services_web)* |

### Funnel A2 — « Automatisation → Call » (funnel complet en 5 étapes)
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite landing | Page visit | URL equals `/automatisations-ia` |
| 2 | A **ouvert la conversation** | Goal | `causerie_opened` *(filtrer `source` ∈ automatisations_nav, automatisations_nav_mobile, hero, roi, offres, automatisations_fin, footer)* |
| 3 | A **choisi l'appel** | Goal | `lead_call` *(source `home_causerie`)* |
| 4 | A **ouvert le calendrier sans réserver** | Goal | `cal_abandoned` *(étape de diagnostic, pas de conversion)* |
| 5 | A **réservé** (résa confirmée) | Goal | `call_booked` |

> ⚠️ Jusqu'au 3 octobre 2026 l'étape 2 était `lead_call`, filtré sur les sources
> de la page. Un funnel resté sur cette configuration tombe à zéro : les boutons
> n'émettent plus `lead_call`. Même remarque pour les funnels B et C.
> Celui qui écrit plutôt qu'il n'appelle sort par `lead_message` : à suivre en
> parallèle de l'étape 3.

> Le filtre `source` à l'étape 2 isole les clics venus de la landing. Les funnels B et C
> ci-dessous suivent le même schéma (remplace juste l'URL et le filtre `source` de l'étape 2) ;
> l'étape finale `call_booked` est commune (la résa se fait dans la popup, peu importe la page d'origine).

### Funnel B — « Cas d'usage → Conversation »
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite cas-clients | Page visit | URL contains `/cas-clients` |
| 2 | A ouvert la conversation | Goal | `causerie_opened` *(filtrer `source` ∈ cas_index_nav, cas_index_fin, cas_article_nav, cas_article_fin)* |

> Couvre l'index `/cas-clients` **et** les articles `/cas-clients/<slug>` (URL contains).

### Funnel C — « Page expert → Conversation »
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite page expert | Page visit | URL contains `/expert-` *(n8n + make)* |
| 2 | A ouvert la conversation | Goal | `causerie_opened` *(filtrer `source` ∈ expert-n8n, expert-n8n_nav, expert-n8n_fin, expert-make, expert-make_nav, expert-make_fin)* |

> Les pages `/expert-n8n` et `/expert-make` sont des pages d'acquisition SEO à forte
> intention. C'est le funnel « → conversation » le plus naturel après LP et cas-clients.

## ✅ Les signaux (du moins au plus fiable)
- `lead_call` = **clic** « Réserver » (intention). Peut être gonflé par tes propres clics de test → **exclus ton trafic** (`localStorage.datafast_ignore = true`, IP dans Exclusions, ou teste sur preview Vercel non-trackée).
- `call_booked` = **réservation cal.com confirmée**, via l'embed on-site → `bookingSuccessfulV2`. Désormais mesuré **dans** DataFast (plus besoin de webhook). Un clic ne peut plus le déclencher.

> Historique : on a un temps cru qu'il fallait un webhook cal.com → API DataFast pour
> la résa. Impossible en cookieless (l'API `/v1/goals` exige un `datafast_visitor_id`
> jamais exposé). L'**embed cal.com** contourne ça : la résa se faisant sur le domaine,
> l'empreinte suffit. C'est la solution retenue.
