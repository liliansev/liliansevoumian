/*
 * La couleur de chaque outil, une pastille par outil (Lilian, 10 novembre
 * 2026 : « n8n a sa pastille orange, Make sa pastille violette… ne pas mettre
 * les trois mots dans une même pastille »). Lue par l'accueil « Citron et
 * lilas » (`components/robot/`). Des teintes claires, posées sur la nuit avec
 * le texte en encre ; elles rappellent la couleur de la marque sans la copier.
 * Un outil absent d'ici prend le gris neutre.
 */
export const couleursOutils: Record<string, string> = {
  n8n: '#ff8a5c',
  Make: '#d9a3ff',
  Claude: '#f0b48e',
  Mistral: '#ffa94d',
  Glide: '#ff9ecf',
  Notion: '#ece7e0',
  Airtable: '#86bdff',
  Shopify: '#8fd98a',
  HubSpot: '#ffad7d',
  Apollo: '#dfe86b',
  Pennylane: '#77e2c3',
  Slack: '#e2a8ff',
  Gmail: '#ff9a9a',
  Loxo: '#9fe0ff',
  IA: '#d9d2ff',
};

export const couleurOutil = (nom: string) => couleursOutils[nom] ?? '#cfc8bf';
