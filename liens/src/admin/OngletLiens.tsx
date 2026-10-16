import { useState } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Bloc, TypeBloc } from '../lib/types.ts';
import { estEnLigne, nouveauBloc } from '../lib/types.ts';
import { ICONES } from '../lib/icones.ts';
import { Icone } from '../components/Icone.tsx';
import { Feuille } from './ui.tsx';

export const TYPES: { type: TypeBloc; nom: string; aide: string; picto: string }[] = [
  { type: 'lien', nom: 'Lien', aide: 'Un bouton vers n’importe quelle adresse', picto: '🔗' },
  { type: 'titre', nom: 'Titre de section', aide: 'Pour regrouper les liens', picto: '🔠' },
  { type: 'texte', nom: 'Texte', aide: 'Un court paragraphe', picto: '📝' },
  { type: 'video', nom: 'Vidéo YouTube', aide: 'Lue directement dans la page', picto: '▶️' },
  { type: 'derniere-video', nom: 'Ma dernière vidéo', aide: 'Se met à jour toute seule', picto: '✨' },
  { type: 'newsletter', nom: 'Inscription newsletter', aide: 'Branchée sur Lumail', picto: '💌' },
];
const NOM_TYPE = Object.fromEntries(TYPES.map(t => [t.type, t.nom])) as Record<TypeBloc, string>;

export function OngletLiens({ blocs, clics, onOrdonner, onModifier, onOuvrir, onAjouter }: {
  blocs: Bloc[];
  clics: Record<string, number>;
  onOrdonner: (blocs: Bloc[]) => void;
  onModifier: (bloc: Bloc) => void;
  onOuvrir: (bloc: Bloc) => void;
  onAjouter: (bloc: Bloc) => void;
}) {
  const [choix, setChoix] = useState(false);
  const capteurs = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  function deplacer({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const de = blocs.findIndex(b => b.id === active.id), vers = blocs.findIndex(b => b.id === over.id);
    onOrdonner(arrayMove(blocs, de, vers));
  }
  function ajouter(type: TypeBloc) {
    setChoix(false);
    onAjouter(nouveauBloc(type, `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`));
  }

  return (
    <div className="flex flex-col gap-4">
      <button type="button" onClick={() => setChoix(true)}
        className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-peche text-[16px] font-semibold text-nuit shadow-[0_10px_30px_-12px_rgba(255,179,138,0.6)] transition active:scale-[0.99]">
        <span className="text-xl leading-none">+</span> Ajouter
      </button>

      <DndContext sensors={capteurs} collisionDetection={closestCenter} onDragEnd={deplacer}>
        <SortableContext items={blocs.map(b => b.id)} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2.5">
            {blocs.map(bloc => <Ligne key={bloc.id} bloc={bloc} clics={clics[bloc.id] ?? 0} onModifier={onModifier} onOuvrir={onOuvrir} />)}
          </ul>
        </SortableContext>
      </DndContext>
      {blocs.length === 0 && <p className="py-10 text-center text-white/50">Ta page est vide. Ajoute ton premier lien.</p>}
      {blocs.length > 1 && <p className="text-center text-[13px] text-white/40">Maintiens la poignée ⋮⋮ pour déplacer un bloc.</p>}

      <Feuille ouverte={choix} onFermer={() => setChoix(false)} titre="Ajouter un bloc">
        <ul className="grid grid-cols-2 gap-2.5 pb-2">
          {TYPES.map(t => (
            <li key={t.type}>
              <button type="button" onClick={() => ajouter(t.type)} className="flex h-full w-full flex-col items-start gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3.5 text-left transition hover:border-peche/50 hover:bg-white/[0.07] active:scale-[0.98]">
                <span className="text-2xl">{t.picto}</span>
                <span className="text-[15px] font-semibold text-white">{t.nom}</span>
                <span className="text-[12.5px] leading-snug text-white/50">{t.aide}</span>
              </button>
            </li>
          ))}
        </ul>
      </Feuille>
    </div>
  );
}

function Ligne({ bloc, clics, onModifier, onOuvrir }: { bloc: Bloc; clics: number; onModifier: (b: Bloc) => void; onOuvrir: (b: Bloc) => void }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: bloc.id });
  const enLigne = estEnLigne(bloc);
  const programme = bloc.public && !enLigne;
  const titre = bloc.titre || (bloc.type === 'lien' ? bloc.url || 'Lien sans titre' : NOM_TYPE[bloc.type]);
  const sousLigne = bloc.type === 'lien' ? bloc.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : NOM_TYPE[bloc.type];
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative flex items-stretch rounded-2xl border bg-[#141c2e] transition-shadow ${isDragging ? 'z-10 border-peche/60 shadow-2xl' : 'border-white/[0.07]'} ${!bloc.public ? 'opacity-60' : ''}`}>
      <button ref={setActivatorNodeRef} type="button" {...attributes} {...listeners} aria-label={`Déplacer ${titre}`}
        className="flex w-10 shrink-0 cursor-grab touch-none items-center justify-center rounded-l-2xl text-white/35 hover:text-white/70 active:cursor-grabbing">
        <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor" aria-hidden="true"><circle cx="4" cy="4" r="1.7" /><circle cx="10" cy="4" r="1.7" /><circle cx="4" cy="10" r="1.7" /><circle cx="10" cy="10" r="1.7" /><circle cx="4" cy="16" r="1.7" /><circle cx="10" cy="16" r="1.7" /></svg>
      </button>
      <button type="button" onClick={() => onOuvrir(bloc)} className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-2 text-left">
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/[0.07] text-lg">
          {bloc.image ? <img src={bloc.image} alt="" className="h-full w-full object-cover" />
            : bloc.icone && ICONES[bloc.icone] ? <Icone nom={bloc.icone} taille={20} className="text-white" />
            : bloc.icone || TYPES.find(t => t.type === bloc.type)?.picto}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-[15px] font-semibold text-white">{titre}</span>
            {bloc.vedette && <span className="shrink-0 text-[13px] text-peche" title="Mis en avant">★</span>}
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-[12.5px] text-white/45">
            <span className="truncate">{sousLigne}</span>
            {programme && <span className="shrink-0 text-amber-300/80">⏱ Programmé</span>}
            {!bloc.indexable && bloc.public && <span className="shrink-0" title="Masqué pour Google">🙈</span>}
          </span>
        </span>
        {bloc.type === 'lien' && <span className="shrink-0 text-right text-[12px] leading-tight text-white/45"><span className="block text-[15px] font-semibold text-white/80">{clics}</span>clics</span>}
      </button>
      <div className="flex items-center pr-3">
        <button type="button" role="switch" aria-checked={bloc.public} aria-label={bloc.public ? `Rendre ${titre} privé` : `Rendre ${titre} public`}
          onClick={() => onModifier({ ...bloc, public: !bloc.public })}
          className={`relative h-7 w-[46px] shrink-0 rounded-full transition-colors ${bloc.public ? 'bg-peche' : 'bg-white/15'}`}>
          <span className={`absolute top-1 left-1 h-5 w-5 rounded-full shadow transition-transform ${bloc.public ? 'translate-x-[18px] bg-nuit' : 'bg-white'}`} />
        </button>
      </div>
    </li>
  );
}
