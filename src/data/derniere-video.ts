/*
 * La dernière vidéo longue de la chaîne YouTube, telle qu'elle était connue au
 * moment de la mise en ligne : c'est ce que la page d'accueil écrit dans son
 * HTML (un moteur ou un navigateur sans script la lit telle quelle).
 *
 * Le serveur de production, lui, connaît toujours la dernière : il lit le flux
 * de la chaîne (`/api/derniere-video`, dans `deploy/server.mjs`) et la page
 * remplace d'elle-même le lien, le titre et la vignette quand une vidéo plus
 * récente est sortie. Il n'y a donc rien à faire ici à chaque publication ;
 * mettre ce fichier à jour de temps en temps garde seulement le HTML de départ
 * proche de la réalité.
 *
 * Le flux est celui des vidéos longues, sans les Shorts :
 * https://www.youtube.com/feeds/videos.xml?playlist_id=UULFGH0eGI6I9EFsaKpuXXIisg
 * (« UULF » suivi de l'identifiant de la chaîne sans son « UC »). La vignette
 * est copiée dans `public/videos/<id>.webp` : appelée chez YouTube, elle
 * laissait un rectangle sombre dès qu'un bloqueur ou le réseau la refusait.
 *
 * Relevé le 8 octobre 2026.
 */
export const derniereVideo = {
  id: 'p7zrKvfo6TY',
  titre: 'JEV est incroyable\u00a0! 3 exemples avec n8n',
  /** Date de publication (AAAA-MM-JJ) : la page ne remplace cette vidéo que
      par une plus récente. */
  publiee: '2026-10-06',
};

export const urlVideo = (id: string) => `https://www.youtube.com/watch?v=${id}`;
