# Funnel de conversion DataFast — liliansevoumian.fr

Objectif business : **être contacté pour une mission** (appel cal.com rempli OU mail envoyé).

Le tracking est posé en code (attributs `data-fast-goal` lus nativement par le
script DataFast cookieless). Le **funnel** se configure dans le dashboard DataFast
à partir des goals ci-dessous.

---

## 1. Taxonomie des goals (posée en code)

### Conversion principale — `contact_lead`
Un seul goal pour TOUTE action de contact mission → permet une étape de funnel unique.
Deux paramètres pour l'attribution :

| Param | Valeurs | Sert à |
|-------|---------|--------|
| `type` | `form` (formulaire on-site) · `call` (cal.com) · `email` (mailto) | Savoir comment les gens entrent en contact |
| `source` | `contact` (form + appel + mail section contact), `hero`, `roi`, `offre_regie`, `offre_mentoring`, `offre_mission`, `nav`, `nav_mobile`, `faq`, `footer`, `principes` | Savoir QUEL point convertit le mieux |

→ Le **formulaire on-site** (`type=form`) est la conversion la plus fiable : il fire sur **soumission réussie** (pas juste un clic). Les `type=call`/`email` firent au clic (intention).

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

**Dashboard → Funnels → « + Funnel »** → nommer « Lead Mission » → ajouter 3 étapes :

| # | Étape | Type | Valeur |
|---|-------|------|--------|
| 1 | Visite | Page visit | URL equals `/` |
| 2 | A vu les offres | Goal | `scroll_to_section_offres` |
| 3 | A contacté | Goal | `contact_lead` |

C'est tout. 3 étapes = on voit où ça décroche (visite → intérêt offres → contact).

### Analyses complémentaires (filtres sur l'étape 3)
- Filtrer `contact_lead` par `type` → **call vs email** (les gens réservent-ils ou écrivent-ils ?).
- Filtrer `contact_lead` par `source` → **quel CTA convertit** (hero ? offres ? footer ?).
- Funnel plus fin possible en insérant `scroll_to_section_roi` entre 1 et 2.

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
</content>
</invoke>
