/*
 * faq.ts — SOURCE UNIQUE du contenu FAQ.
 *
 * Consommée par FAQ.astro (texte visible) ET index.astro (JSON-LD FAQPage).
 * Avant, les 2 copies divergeaient : le JSON-LD était une version raccourcie,
 * différente du visible → risque vis-à-vis des guidelines Google (le structured
 * data doit refléter le contenu visible). Désormais un seul texte, dérivé ici.
 *
 */

export interface FaqItem {
  /** Question affichée. */
  q: string;
  /** Réponse : texte visible ET source de l'answer JSON-LD. */
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "Quel ROI réel ?",
    a: "Mes clients récupèrent en moyenne 12 à 20 h par semaine après déploiement. Sur un workflow ciblé, c'est rentabilisé en quelques semaines ; sur une mission complète, en quelques mois. On regarde vos vrais process ensemble au premier échange.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Un workflow ciblé : 1 500 à 3 000 €. Une mission complète (cadrage, déploiement, formation) : 8 000 à 15 000 €. En régie, intégré à votre équipe : 650 €/jour. En coaching : 150 €/h en séance ponctuelle, 2 500 €/mois en mentoring d'équipe. Pas de grille figée derrière ces fourchettes : le chiffre exact dépend de vos process, il est posé au premier appel et le devis est ferme.",
  },
  {
    q: "Et si l'API d'un de mes outils change ?",
    a: "Tous mes workflows incluent une couche d'erreur explicite (try/catch + Slack alert) et sont versionnés en JSON exportable. Si Make ou n8n bloque sur un changement d'API tiers, vous voyez l'erreur, vous savez ce qu'il s'est passé. Pendant les 30 j de SLA, je corrige sans surcoût. Au-delà, on cale ça ensemble. La plupart des évolutions courantes prennent moins d'1 h.",
  },
  {
    q: "Mes équipes ont-elles besoin de skills tech ?",
    a: "Non. Les automatisations tournent en arrière-plan. À la livraison, je forme vos équipes aux ajustements courants (modifier un filtre, ajouter un destinataire, dupliquer un scenario) via une documentation custom + 1 session live. Pour les changements profonds, une séance à la carte suffit.",
  },
  {
    q: "Make ou n8n ? Lequel et pourquoi ?",
    a: "n8n par défaut sur 80 % des cas : self-hostable (RGPD strict, données sensibles), plus puissant data-heavy, code natif quand on en a besoin. Make uniquement si votre équipe maintient elle-même et veut le plus visuel possible. Si vous êtes déjà sur l'un, on continue dessus, je migre rarement pour migrer.",
  },
  {
    q: "Remote ou sur site ?",
    a: "100 % remote sur les missions courtes (workflow seul). Pour les missions complètes, 1 ou 2 jours sur site en kick-off + en formation, le reste en remote. Basé Paris, je peux me déplacer ailleurs en France ou en Europe sur demande.",
  },
  {
    q: "Comment je suis sûr que vous comprenez mon métier ?",
    a: "Je ne le suis pas. C'est exactement ce que sert à valider le premier appel. Si après l'appel je sens que je ne suis pas le bon (secteur trop spécialisé, contraintes que je ne maîtrise pas), je le dis et je vous oriente. Mieux que de prendre un projet que je ne sais pas livrer.",
  },
];
