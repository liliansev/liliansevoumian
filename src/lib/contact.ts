/*
 * Les deux moyens d'écrire à Lilian hors agenda, en un seul endroit.
 *
 * La barre d'écriture de l'accueil (`home-invite.astro`) n'a pas de serveur :
 * elle ouvre WhatsApp ou la messagerie du visiteur avec son message déjà
 * rédigé, et c'est lui qui l'envoie. Lilian le reçoit là où il répond déjà.
 */

/** L'adresse de contact publique, celle de /llms.txt. */
export const EMAIL_CONTACT = 'bonjour@liliansevoumian.fr';

/**
 * Le numéro WhatsApp Business de Lilian (06 08 11 87 13, donné par lui le
 * 2 octobre 2026), au format international sans « + » ni espaces : c'est celui
 * qu'attend `wa.me`. Vide, la barre ne proposerait pas WhatsApp.
 */
export const WHATSAPP_CONTACT = '33608118713';
