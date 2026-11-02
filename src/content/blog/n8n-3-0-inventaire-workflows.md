---
title: "n8n 3.0 arrive : l’inventaire de mes 399 workflows avant décembre"
description: "n8n 3.0 est en bêta, version stable en décembre. J’ai fait compter par Claude les nœuds retirés dans mon instance : 8 workflows touchés sur 399."
seoTitle: "n8n 3.0 : l’inventaire de mes 399 workflows"
keywords: ["n8n 3.0", "migration n8n 3.0", "rapport de migration n8n", "nœuds retirés n8n", "MCP n8n Claude"]
date: 2026-11-02
---

n8n a publié le 27 octobre 2026 la bêta de sa version 3.0, et la version stable est annoncée pour début décembre. Avant d’ouvrir le rapport de migration, j’ai demandé à Claude, branché sur mon instance n8n, de compter les nœuds qui disparaissent : **sur les 399 workflows de mon instance, 8 utilisent un nœud retiré en 3.0.**

**En bref :** les 8 workflows concernés sont un outil de dédoublonnage de clients et sept workflows de démonstration. Le changement le plus large chez moi est ailleurs : le nœud Code s’arrête désormais au bout d’une minute par défaut, et il est présent dans 86 de mes workflows.

## Ce que la 3.0 retire

La liste complète est dans [les changements de la 3.0 publiés par n8n](https://docs.n8n.io/changelog/v30-breaking-changes). Pour un indépendant qui fait tourner ses automatisations sur n8n, quatre points comptent :

- des nœuds disparaissent : Function et Function Item (remplacés par le nœud Code), Cron et Interval (remplacés par le Schedule Trigger), Item Lists, HTML Extract, Manual Chat Trigger, l’ancien nœud OpenAI, et d’autres ;
- le nœud Code s’arrête au bout de 60 secondes par défaut, contre 300 secondes jusqu’ici ;
- l’auto-hébergement passe par Docker, et l’installation avec npm s’arrête ;
- la mise à jour est à sens unique : une instance passée en 3.0 reste en 3.0.

Mon instance tourne sur n8n Cloud, donc la partie Docker ne me concerne pas. Le reste, si.

## L’inventaire de mon instance

Le serveur MCP officiel de n8n donne à Claude un outil qui compte les types de nœuds utilisés dans l’instance. Je lui ai donné la liste des nœuds retirés, il m’a rendu le nombre de workflows qui en contiennent chacun.

| Nœud retiré en 3.0 | Mes workflows qui l’utilisent | Remplaçant indiqué par n8n |
|---|---|---|
| Function, Function Item | 0 | Code |
| Cron, Interval | 0 | Schedule Trigger, déjà présent dans 29 de mes workflows |
| Item Lists | 1 | Split Out, Aggregate, Sort, Limit, Remove Duplicates ou Summarize, selon l’opération |
| HTML Extract | 1 | Nœud HTML, opération Extract HTML Content, déjà présent dans 11 de mes workflows |
| Manual Chat Trigger | 6 | Chat Trigger, déjà présent dans 9 de mes workflows |

Zéro Function et zéro Cron : mes déclencheurs planifiés passent tous par le Schedule Trigger.

Le seul workflow « métier » touché est un nettoyage des doublons dans une base clients, modifié pour la dernière fois en janvier 2026. Les sept autres sont des workflows de démonstration : l’extraction de contenu d’une page web avec HTML Extract, et six démos autour de l’agent IA, des outils, de la mémoire, du RAG et du nœud MCP Client, qui contiennent toutes un Manual Chat Trigger. **Les huit restent hors production, puisqu’aucun n’est publié : chez moi, les nœuds retirés ne feront tomber aucune automatisation en production.**

## Le changement que je surveille : une minute pour le nœud Code

Le comptage trouve le nœud Code dans 86 workflows. Le comptage dit où il se trouve, sans dire combien de temps il tourne. **Avec le nouveau délai par défaut, un script qui tenait en deux minutes en 2.x échoue en 3.0, sans que personne ait touché au workflow.**

C’est la ligne que je lirai en premier dans le rapport de migration. n8n classe ce genre de cas dans « Executions might fail » : une valeur par défaut change, et le workflow peut échouer. Sur une instance auto-hébergée, le délai se règle avec la variable `N8N_RUNNERS_TASK_TIMEOUT`.

Le Gmail Trigger change aussi de comportement : il relève 10 mails par passage par défaut, ignore les brouillons et ne se déclenche plus sur les mails envoyés. Il est présent dans 8 de mes workflows.

## Le rapport de migration, l’étape suivante

Le [rapport de migration](https://docs.n8n.io/changelog/v30-migration-tool) se trouve dans **Settings > Migration Report**, à partir de la version 2.39. Il liste les workflows touchés et les réglages d’instance à revoir, avec un niveau d’impact pour chaque ligne. Quand une correction automatique existe, le bouton Migrate réécrit les nœuds et enregistre le résultat comme une nouvelle version : **la version publiée continue de tourner tant que je n’ai pas cliqué sur Publish.**

Le rapport propose aussi de marquer « Won’t fix » les workflows qui n’ont pas tourné depuis plus de 12 mois. Sur une instance qui contient des démos, des essais et des workflows clients, ce tri compte autant que les corrections.

## Le même inventaire chez vous

Si Claude est déjà branché sur votre instance par le serveur MCP officiel de n8n, l’inventaire prend quelques minutes : donnez-lui la liste des nœuds retirés et demandez combien de workflows utilisent chacun. La mise en place du serveur est décrite dans [le guide MCP de n8n sur Augmentés](https://augmentes.fr/guides/n8n-mcp-claude-construit-workflows).

Sinon, le rapport de migration fait ce travail depuis les réglages de n8n, et il ajoute ce qu’un comptage de nœuds ne voit pas : les variables d’environnement, les identifiants et les changements de comportement.

Combien de vos workflows ont encore un nœud Code qui tourne plus d’une minute ?
