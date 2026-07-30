/*
 * faq.ts — SOURCE UNIQUE du contenu FAQ.
 *
 * Consommée par FAQ.astro (texte visible) ET index.astro (JSON-LD FAQPage).
 * Avant, les 2 copies divergeaient : le JSON-LD était une version raccourcie,
 * différente du visible → risque vis-à-vis des guidelines Google (le structured
 * data doit refléter le contenu visible). Désormais un seul texte, dérivé ici.
 *
 * LES RÉPONSES SONT ÉCRITES POUR ÊTRE EXTRAITES, pas seulement lues. Trois
 * règles en découlent, et elles expliquent la forme de chaque réponse :
 *  — la PREMIÈRE phrase répond à elle seule à la question posée. C'est elle
 *    qu'un extrait enrichi ou un moteur de réponse citera, souvent sans les
 *    suivantes ;
 *  — aucun pronom sans antécédent dans la réponse même : « il », « ça » ou
 *    « le mien » deviennent illisibles une fois la phrase sortie de la page ;
 *  — les entités sont NOMMÉES (agent IA, n8n, Make, workflow) plutôt que
 *    reprises par un synonyme, parce que c'est sur ces mots que la question
 *    est posée.
 *
 * Format visé : 3 à 4 phrases, 40 à 70 mots. Au-delà, l'extrait est tronqué au
 * milieu d'une idée ; en deçà, la réponse n'a pas de quoi être choisie.
 */

export interface FaqItem {
  /** Question affichée. */
  q: string;
  /** Réponse : texte visible ET source de l'answer JSON-LD. */
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "C'est quoi un agent IA ?",
    a: "Un agent IA est un programme qui reçoit une consigne en langage courant, décide seul des étapes à suivre et les exécute dans vos outils. Un logiciel classique attend qu'on clique ; l'agent lit un document, en tire les informations utiles et déclenche la suite. Sur mes missions, il est toujours encadré par un workflow qui vérifie son résultat avant de l'envoyer plus loin. Un agent seul reste une démonstration, c'est ce qui l'entoure qui en fait un outil de production.",
  },
  {
    q: "Quelle différence avec une automatisation ?",
    a: "Une automatisation suit un chemin écrit à l'avance : quand tel événement arrive, faire telle action, toujours dans le même ordre. Un agent IA interprète une situation qu'on n'avait pas prévue et choisit quoi faire. L'automatisation est prévisible et se répare vite, l'agent absorbe la variété des cas réels. En pratique je combine les deux : l'agent comprend le document, le workflow garantit le résultat.",
  },
  {
    q: "Je dois prendre n8n ou Make ?",
    a: "Make si vos équipes doivent lire et corriger le scénario elles-mêmes : chaque module montre ce qui passe et où ça casse. n8n si l'automatisation doit orchestrer un agent IA, agir dans vos outils métier, ou tourner sur vos propres serveurs. Les deux font tourner de la production sérieuse, et le choix se joue surtout sur qui maintiendra derrière. Si vous êtes déjà installé sur l'un des deux, on reste dessus.",
  },
  {
    q: "Comment vous contacter rapidement ?",
    a: "Le plus rapide est de réserver un créneau de 20 minutes dans mon agenda, sans engagement. Vous décrivez le process qui vous coûte le plus de temps, je vous dis ce qui s'automatise et par quoi commencer. La personne qui vous répond est celle qui construit ensuite.",
  },
];
