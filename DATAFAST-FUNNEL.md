# Funnel de conversion DataFast — liliansevoumian.fr

Objectif business : **être contacté pour une mission** — en priorité via le **formulaire on-site** (canal principal), l'appel cal.com et le mail restant en secondaire.

Le tracking est posé en code (attributs `data-fast-goal` lus nativement par le
script DataFast cookieless). Le **funnel** se configure dans le dashboard DataFast
à partir des goals ci-dessous.

---

## 1. Taxonomie des goals (posée en code)

### Étape d'intention — `cta_contact_click`
Clic sur un CTA **« Me contacter »** (nav, hero, ROI, cards offres) → scrolle vers le
formulaire en bas. C'est l'**intention** de contact, pas encore la conversion. Les CTA
ne pointent plus vers cal.com : ils mènent au formulaire on-site (canal principal).

| Param | Valeurs |
|-------|---------|
| `source` | `nav`, `nav_mobile`, `hero`, `roi`, `offre_regie`, `offre_mentoring`, `offre_mission`, `principes` |

> Les cards offres pré-remplissent le message du formulaire avec l'offre cliquée.

### Conversion — `contact_lead`
La vraie conversion (contact effectif). Un seul goal, paramétré :

| Param | Valeurs | Sert à |
|-------|---------|--------|
| `type` | `form` (formulaire soumis = conversion la + fiable) · `call` (clic cal.com) · `email` (clic mailto) | Comment ils entrent en contact |
| `source` | `contact`, `faq`, `footer` | Où |

→ `type=form` fire sur **soumission réussie** du formulaire on-site (le canal principal
désormais). `call`/`email` = options **secondaires** (section contact « ou plus direct »,
footer, FAQ), firent au clic (intention, pas complétion).

### Micro-conversions (hors funnel mission)
| Goal | Déclencheur | Params |
|------|-------------|--------|
| `book_coaching` | CTA Coaching 150 €/h (go.liliansevoumian.fr/coaching) | — |
| `newsletter_click` | Liens Substack (section contact + footer) | `source` |
| `augmentes_click` | Ponts vers augmentes.fr (formations) — intention « apprendre soi-même » | `source` (`offres`, `faq`) |

### Scroll-depth (natif DataFast, 1×/session)
`scroll_to_section_roi` · `_cas` · `_stack` · `_offres` · `_faq` · `_contact`
> Géré nativement via `data-fast-scroll` (seuil 50 %). Le handler JS custom qui
> doublait ces events a été retiré.

---

## 2. Funnel à créer dans le dashboard DataFast

**Dashboard → Funnels → « + Funnel »** → nommer « Lead Mission » → ajouter 4 étapes :

| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite | Page visit | URL equals `/` |
| 2 | A vu les offres | Goal | `scroll_to_section_offres` |
| 3 | A cliqué « Me contacter » | Goal | `cta_contact_click` |
| 4 | A contacté | Goal | `contact_lead` |

On voit exactement où ça décroche : visite → intérêt offres → intention (clic) → contact réel.
Le gros écart probable est entre l'étape 3 (clic) et 4 (form rempli) — c'est là qu'on optimise.

### Analyses complémentaires
- Filtrer `cta_contact_click` par `source` → **quel CTA déclenche l'intention** (hero ? offres ?).
- Filtrer `contact_lead` par `type` → **form vs call vs email** (canal de contact effectif).
- Variante : si tu veux mesurer seulement la conversion finale, funnel à 3 étapes = 1, 2, 4.

---

## ⚠️ Limite à connaître
- `type=form` = **conversion réelle** (le formulaire a été soumis avec succès via `/api/contact`). C'est le signal le plus fiable.
- `type=call` = clic vers cal.com, **pas** la réservation confirmée (elle se passe sur cal.com).
- `type=email` = clic mailto, **pas** le mail réellement envoyé.

Pour mesurer aussi la complétion des **appels**, il faudrait une intégration cal.com → DataFast
(webhook booking confirmé). Le formulaire, lui, est déjà une conversion mesurée de bout en bout.

## 🔧 Setup requis pour le formulaire (`/api/contact`)
Le formulaire envoie un mail via **Resend**. À configurer dans Vercel (Settings → Environment Variables) :
- `RESEND_API_KEY` — **obligatoire** (clé `re_...` depuis resend.com). Sans elle, le formulaire bascule sur son fallback mailto.
- `CONTACT_TO` — optionnel (défaut `bonjour@liliansevoumian.fr`).
- `CONTACT_FROM` — optionnel. En prod, mettre une adresse d'un **domaine vérifié dans Resend** (ex. `contact@liliansevoumian.fr`), sinon le défaut `onboarding@resend.dev` ne livre qu'à l'owner du compte.

En dev local (`pnpm dev`), les fonctions `/api/*` ne tournent pas → le formulaire utilise son fallback mailto. Pour tester l'envoi réel : `vercel dev` ou un déploiement preview.
