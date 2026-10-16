import { useEffect, useRef, useState } from 'react';
import type { Animation, Bloc } from '../lib/types.ts';
import { idYoutube } from '../lib/types.ts';
import { RESEAUX } from '../lib/types.ts';
import { adresse } from '../lib/valider.ts';
import { Icone, NOMS_RESEAUX } from '../components/Icone.tsx';
import { BoutonPrincipal, Champ, Feuille, Interrupteur, Segments, classeSaisie, preparerImage } from './ui.tsx';
import { TYPES } from './OngletLiens.tsx';

const EMOJIS = ['🔗', '💬', '📅', '🎥', '🎙️', '✍️', '📚', '🎓', '⚙️', '🤖', '💡', '🚀', '🔥', '⭐', '💌', '🛒', '🎁', '📈', '🧠', '👋'];
const ANIMATIONS: { id: Animation; nom: string }[] = [{ id: 'aucune', nom: 'Aucune' }, { id: 'brille', nom: 'Reflet' }, { id: 'pulse', nom: 'Pulsation' }, { id: 'secoue', nom: 'Secousse' }];

/** Une date ISO vers la valeur d'un `<input type="datetime-local">`, en heure locale. */
const versLocal = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
};
const depuisLocal = (v: string) => (v ? new Date(v).toISOString() : '');

export function EditeurBloc({ bloc, nouveau, onFermer, onEnregistrer, onSupprimer, onDupliquer, envoyerImage, clics }: {
  bloc: Bloc | null;
  nouveau: boolean;
  onFermer: () => void;
  onEnregistrer: (bloc: Bloc) => void;
  onSupprimer: (bloc: Bloc) => void;
  onDupliquer: (bloc: Bloc) => void;
  envoyerImage: (dataUrl: string) => Promise<string>;
  clics: number;
}) {
  const [b, setB] = useState<Bloc | null>(bloc);
  const [erreur, setErreur] = useState('');
  const [envoi, setEnvoi] = useState(false);
  const [plus, setPlus] = useState(false);
  const fichier = useRef<HTMLInputElement>(null);
  useEffect(() => { setB(bloc); setErreur(''); setPlus(!!bloc && (!!bloc.debut || !!bloc.fin)); }, [bloc]);
  if (!b) return null;
  const maj = (champs: Partial<Bloc>) => setB({ ...b, ...champs });
  const type = TYPES.find(t => t.type === b.type)!;
  const avecUrl = b.type === 'lien' || b.type === 'video';

  function valider() {
    if (!b) return;
    const url = adresse(b.url);
    if (b.type === 'lien' && !url) { setErreur('Indique l’adresse du lien.'); return; }
    if (b.type === 'video' && !idYoutube(url)) { setErreur('Colle l’adresse d’une vidéo YouTube.'); return; }
    if ((b.type === 'titre' || b.type === 'texte') && !b.titre.trim()) { setErreur('Écris le texte du bloc.'); return; }
    onEnregistrer({ ...b, url });
  }

  async function choisirImage(f: File | undefined) {
    if (!f) return;
    setEnvoi(true); setErreur('');
    try { maj({ image: await envoyerImage(await preparerImage(f, b!.vedette ? 'large' : 'carre')) }); }
    catch { setErreur('L’image n’est pas passée. Essaie une autre photo.'); }
    finally { setEnvoi(false); if (fichier.current) fichier.current.value = ''; }
  }

  return (
    <Feuille ouverte onFermer={onFermer} titre={nouveau ? `Nouveau : ${type.nom.toLowerCase()}` : type.nom}
      pied={
        <div className="flex items-center gap-2">
          {!nouveau && (
            <>
              <button type="button" onClick={() => onSupprimer(b)} className="grid h-12 w-12 place-items-center rounded-full text-red-300 hover:bg-red-500/10" aria-label="Supprimer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" /></svg>
              </button>
              <button type="button" onClick={() => onDupliquer(b)} className="grid h-12 w-12 place-items-center rounded-full text-white/60 hover:bg-white/10" aria-label="Dupliquer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><rect x="8" y="8" width="13" height="13" rx="3" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
              </button>
            </>
          )}
          <BoutonPrincipal className="flex-1" onClick={valider} disabled={envoi}>{nouveau ? 'Ajouter à ma page' : 'Enregistrer'}</BoutonPrincipal>
        </div>
      }>
      <div className="flex flex-col gap-4 pt-1">
        {erreur && <p role="alert" className="rounded-xl bg-red-500/15 px-3.5 py-2.5 text-[14px] text-red-200">{erreur}</p>}

        {avecUrl && (
          <Champ label={b.type === 'video' ? 'Adresse de la vidéo YouTube' : 'Adresse'}>
            <input className={classeSaisie} type="url" inputMode="url" autoCapitalize="none" autoCorrect="off" placeholder={b.type === 'video' ? 'https://youtu.be/…' : 'https://…'}
              value={b.url} onChange={e => maj({ url: e.target.value })} autoFocus={nouveau} />
          </Champ>
        )}

        {b.type !== 'derniere-video' && (
          <Champ label={b.type === 'lien' ? 'Texte du bouton' : b.type === 'texte' ? 'Texte' : 'Titre'}>
            {b.type === 'texte'
              ? <textarea className={`${classeSaisie} min-h-28`} value={b.titre} onChange={e => maj({ titre: e.target.value })} maxLength={1000} autoFocus={nouveau} />
              : <input className={classeSaisie} value={b.titre} onChange={e => maj({ titre: e.target.value })} maxLength={160} placeholder={b.type === 'lien' ? 'Mon super lien' : ''} autoFocus={nouveau && !avecUrl} />}
          </Champ>
        )}
        {b.type === 'derniere-video' && (
          <Champ label="Petit titre au-dessus" aide="La vidéo elle-même change toute seule à chaque nouvelle publication sur la chaîne.">
            <input className={classeSaisie} value={b.titre} onChange={e => maj({ titre: e.target.value })} maxLength={160} />
          </Champ>
        )}

        {(b.type === 'lien' || b.type === 'newsletter') && (
          <Champ label="Sous-titre (facultatif)">
            <input className={classeSaisie} value={b.sousTitre} onChange={e => maj({ sousTitre: e.target.value })} maxLength={240} />
          </Champ>
        )}

        {b.type === 'lien' && (
          <>
            <div>
              <span className="mb-1.5 block text-[13px] font-medium text-white/70">Icône</span>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                <button type="button" onClick={() => maj({ icone: '' })} className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[12px] ${!b.icone ? 'bg-white text-nuit' : 'bg-white/[0.07] text-white/60'}`}>Sans</button>
                {RESEAUX.map(r => (
                  <button key={r} type="button" onClick={() => maj({ icone: r })} aria-label={NOMS_RESEAUX[r]} className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${b.icone === r ? 'bg-white text-nuit' : 'bg-white/[0.07] text-white'}`}><Icone nom={r} taille={20} /></button>
                ))}
                {EMOJIS.map(e => (
                  <button key={e} type="button" onClick={() => maj({ icone: e })} className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl ${b.icone === e ? 'bg-white' : 'bg-white/[0.07]'}`}>{e}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {b.image ? <img src={b.image} alt="" className="h-14 w-14 rounded-xl object-cover" /> : <span className="grid h-14 w-14 place-items-center rounded-xl border border-dashed border-white/20 text-white/30">🖼️</span>}
              <div className="flex flex-1 flex-wrap gap-2">
                <button type="button" onClick={() => fichier.current?.click()} disabled={envoi} className="min-h-10 rounded-full bg-white/[0.08] px-4 text-[14px] font-medium text-white hover:bg-white/[0.13]">{envoi ? 'Envoi…' : b.image ? 'Changer l’image' : 'Ajouter une image'}</button>
                {b.image && <button type="button" onClick={() => maj({ image: '' })} className="min-h-10 rounded-full px-3 text-[14px] text-white/55 hover:text-white">Retirer</button>}
              </div>
              <input ref={fichier} type="file" accept="image/*" hidden onChange={e => choisirImage(e.target.files?.[0])} />
            </div>
          </>
        )}

        <div className="divide-y divide-white/[0.06] rounded-2xl bg-white/[0.035] px-4">
          <Interrupteur label="Public" aide={b.public ? 'Visible sur ta page.' : 'Privé : gardé ici, invisible sur ta page.'} actif={b.public} onChange={v => maj({ public: v })} />
          {b.type !== 'titre' && b.type !== 'texte' && b.type !== 'newsletter' && (
            <Interrupteur label="Mis en avant" aide="Une grande carte, plus visible que les autres." actif={b.vedette} onChange={v => maj({ vedette: v })} />
          )}
          {b.type === 'lien' && (
            <Interrupteur label="Visible par Google" aide={b.indexable ? 'Lien suivi par les moteurs de recherche.' : 'Lien en nofollow, exclu des extraits et des données structurées.'} actif={b.indexable} onChange={v => maj({ indexable: v })} />
          )}
        </div>

        {b.type === 'lien' && (
          <div>
            <span className="mb-1.5 block text-[13px] font-medium text-white/70">Animation pour attirer l’œil</span>
            <Segments label="Animation" valeur={b.animation} options={ANIMATIONS} onChange={v => maj({ animation: v })} />
          </div>
        )}

        <button type="button" onClick={() => setPlus(!plus)} className="flex min-h-11 items-center justify-between rounded-xl px-1 text-[14px] font-medium text-white/70">
          <span>⏱ Programmer l’affichage</span><span className={`transition-transform ${plus ? 'rotate-180' : ''}`}>⌄</span>
        </button>
        {plus && (
          <div className="grid gap-3 sm:grid-cols-2">
            <Champ label="Afficher à partir du">
              <input type="datetime-local" className={classeSaisie} value={versLocal(b.debut)} onChange={e => maj({ debut: depuisLocal(e.target.value) })} />
            </Champ>
            <Champ label="Masquer à partir du">
              <input type="datetime-local" className={classeSaisie} value={versLocal(b.fin)} onChange={e => maj({ fin: depuisLocal(e.target.value) })} />
            </Champ>
            {(b.debut || b.fin) && <button type="button" onClick={() => maj({ debut: '', fin: '' })} className="text-left text-[13px] text-white/55 underline">Retirer la programmation</button>}
          </div>
        )}

        {!nouveau && b.type === 'lien' && <p className="text-center text-[13px] text-white/45">{clics} clic{clics > 1 ? 's' : ''} ces 30 derniers jours</p>}
      </div>
    </Feuille>
  );
}
