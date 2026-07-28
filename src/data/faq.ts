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
    q: "Ça rapporte vraiment quoi ?",
    a: "Le seul chiffre que je peux prouver est celui d'un client : Fraich Touch a récupéré environ 4 h par semaine et n'a plus une facture qui traîne. Chez vous ce sera autre chose : ça dépend du volume, du nombre de personnes sur la tâche et de l'état de vos outils. On regarde vos process au premier échange et je vous donne un ordre de grandeur que je peux tenir.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Je ne mets pas de tarif sur cette page, parce que le même mot — « automatiser la facturation » — recouvre trois jours de travail chez l'un et trois mois chez l'autre. Ce que je peux promettre : le devis est ferme, posé après le premier appel, et je vous dis avant de commencer si le jeu en vaut la chandelle. Si le budget est votre sujet, dites-le dès le premier appel, on gagnera du temps tous les deux.",
  },
  {
    q: "Et si un de mes outils change de son côté ?",
    a: "Ça arrive : chez Fraich Touch, l'outil de compta avait changé d'interface deux fois avant que j'arrive. C'est pour ça que chaque automatisation que je livre a une alerte explicite — Slack, Notion ou email selon ce que vous utilisez : vous voyez l'erreur et vous savez ce qui s'est passé, au lieu de la découvrir trois semaines plus tard. Le mois qui suit la livraison, je corrige sans surcoût. Après, on cale ça ensemble.",
  },
  {
    q: "Mes équipes doivent-elles savoir coder ?",
    a: "Non. Chez Fraich Touch, l'équipe gère les paiements du quotidien elle-même, et former un nouveau collaborateur prend une trentaine de minutes. Je livre toujours une documentation faite pour vous et une session de formation en direct. Pour tout ce qui sort de l'ordinaire, vous me rappelez.",
  },
  {
    q: "Make ou n8n ? Lequel et pourquoi ?",
    a: "Ça dépend de qui maintient. n8n si vous voulez héberger vous-même — données sensibles, RGPD strict — ou si le volume est important. Make si votre équipe veut reprendre la main dessus : c'est le plus lisible des deux. Sur mes quatre derniers projets, c'est moitié-moitié. Si vous êtes déjà sur l'un, on reste dessus : je ne migre pas pour migrer.",
  },
  {
    q: "Remote ou sur site ?",
    a: "À distance sur les missions courtes. Sur une mission complète, je viens un ou deux jours au démarrage puis pour la formation, le reste à distance. Je suis en région parisienne et je me déplace ailleurs en France ou en Europe sur demande.",
  },
  {
    q: "Comment je suis sûr que vous comprenez mon métier ?",
    a: "Je ne le suis pas. C'est exactement ce que sert à valider le premier appel. Si après l'appel je sens que je ne suis pas le bon (secteur trop spécialisé, contraintes que je ne maîtrise pas), je le dis et je vous oriente. Mieux que de prendre un projet que je ne sais pas livrer.",
  },
];
