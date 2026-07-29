# Funnel de conversion DataFast — liliansevoumian.fr

Objectif business : **être contacté pour une mission**. Le site n'a plus qu'un
seul canal, le **diagnostic de 20 min** réservé sur cal.com.

Le tracking est posé en code : attributs `data-fast-goal` lus nativement par le
script DataFast cookieless sur les liens cal.com, plus un appel JS sur la résa
confirmée. Les **funnels** se configurent dans le dashboard DataFast à partir des
2 goals ci-dessous.

> ⚠️ **DataFast est cookieless** (empreinte IP+UA serveur, aucun `datafast_visitor_id`
> exposé). Conséquence : impossible d'attribuer une conversion depuis un backend tiers
> (webhook cal.com → API `/v1/goals`), car cette API exige le visitor_id introuvable.
> C'est pourquoi `call_booked` passe par l'**embed cal.com on-site** (cf. ci-dessous),
> et **pas** par un webhook. Voir aussi la mémoire projet `project_datafast-cookieless`.

---

## 1. Les 2 goals (état réel du code)

### `lead_call` — clic « Réserver un appel » (cal.com)
Émis nativement sur **tout lien cal.com** via `data-fast-goal="lead_call"`.
C'est une **intention de call** (le clic), pas la réservation confirmée — celle-ci
se passe sur cal.com (voir Limite plus bas).

| Param `source` | Où |
|----------------|-----|
| `hero` · `nav` · `nav_mobile_cta` · `roi` · `offres` · `contact` · `barre-mobile` | Landing `/` |
| `expert-n8n` · `expert-n8n-bottom` · `expert-make` · `expert-make-bottom` | Pages expert SEO |
| `cas_index` · `cas_index_empty` · `cas_article` | Pages cas-clients |

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

> Seuls `lead_call` et `call_booked` sont émis. La taxonomie
> `contact_lead` / `cta_contact_click` des anciennes versions n'existe plus.
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

### Funnel A — « Landing → Call » (funnel complet en 3 étapes)
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite landing | Page visit | URL equals `/` |
| 2 | A **cliqué** Réserver | Goal | `lead_call` *(filtrer `source` ∈ hero, nav, nav_mobile, roi, offres, footer, mobile_bar)* |
| 3 | A **réservé** (résa confirmée) | Goal | `call_booked` |

> L'étape 2→3 montre enfin la **déperdition clic → résa réelle** (le fameux « 10 clics, 1 résa »).
> Le filtre `source` à l'étape 2 isole les clics venus de la landing. Les funnels B et C
> ci-dessous suivent le même schéma (remplace juste l'URL et le filtre `source` de l'étape 2) ;
> l'étape 3 `call_booked` est commune (la résa se fait dans la popup, peu importe la page d'origine).

### Funnel B — « Cas d'usage → Call »
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite cas-clients | Page visit | URL contains `/cas-clients` |
| 2 | A réservé un appel | Goal | `lead_call` *(filtrer `source` ∈ cas_index, cas_index_empty, cas_article)* |

> Couvre l'index `/cas-clients` **et** les articles `/cas-clients/<slug>` (URL contains).
> ⚠️ Ces 3 CTA viennent d'être taguées — avant, un call depuis une page cas-clients
> était invisible. Les données ne remontent donc qu'à partir du déploiement de ce commit.

### Funnel C — « Page expert → Call » (le 3ᵉ que je vois)
| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite page expert | Page visit | URL contains `/expert-` *(n8n + make)* |
| 2 | A réservé un appel | Goal | `lead_call` *(filtrer `source` ∈ expert-n8n, expert-n8n-bottom, expert-make, expert-make-bottom)* |

> Les pages `/expert-n8n` et `/expert-make` sont des pages d'acquisition SEO à forte
> intention. C'est le funnel « → call » le plus naturel après LP et cas-clients.

## ✅ Les 2 signaux (du moins au plus fiable)
- `lead_call` = **clic** « Réserver » (intention). Peut être gonflé par tes propres clics de test → **exclus ton trafic** (`localStorage.datafast_ignore = true`, IP dans Exclusions, ou teste sur preview Vercel non-trackée).
- `call_booked` = **réservation cal.com confirmée**, via l'embed on-site → `bookingSuccessfulV2`. Désormais mesuré **dans** DataFast (plus besoin de webhook). Un clic ne peut plus le déclencher.

> Historique : on a un temps cru qu'il fallait un webhook cal.com → API DataFast pour
> la résa. Impossible en cookieless (l'API `/v1/goals` exige un `datafast_visitor_id`
> jamais exposé). L'**embed cal.com** contourne ça : la résa se faisant sur le domaine,
> l'empreinte suffit. C'est la solution retenue.
