import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';

/* Les petites pièces du back office, pensées pour le pouce : 44 px au moins. */

export function Interrupteur({ actif, onChange, label, aide, disabled }: { actif: boolean; onChange: (v: boolean) => void; label: string; aide?: ReactNode; disabled?: boolean }) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
        <span className="block text-[15px] font-medium text-white">{label}</span>
        {aide && <span className="mt-0.5 block text-[13px] leading-snug text-white/55">{aide}</span>}
      </label>
      <button id={id} type="button" role="switch" aria-checked={actif} disabled={disabled} onClick={() => onChange(!actif)}
        className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors disabled:opacity-40 ${actif ? 'bg-peche' : 'bg-white/15'}`}>
        <span className={`absolute top-1 left-1 h-6 w-6 rounded-full shadow transition-transform ${actif ? 'translate-x-5 bg-nuit' : 'bg-white'}`} />
      </button>
    </div>
  );
}

export function Champ({ label, aide, children }: { label: string; aide?: ReactNode; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-white/70">{label}</span>
      {children}
      {aide && <span className="mt-1.5 block text-[12.5px] leading-snug text-white/45">{aide}</span>}
    </label>
  );
}

export const classeSaisie = 'w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-[16px] text-white placeholder:text-white/30 outline-none transition focus:border-peche/70 focus:bg-white/[0.09]';

export function Carte({ titre, action, children, className = '' }: { titre?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 ${className}`}>
      {(titre || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {titre && <h2 className="text-[15px] font-semibold text-white">{titre}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/** Une feuille qui monte du bas sur téléphone, une fenêtre centrée sur ordinateur. */
export function Feuille({ ouverte, onFermer, titre, children, pied }: { ouverte: boolean; onFermer: () => void; titre: string; children: ReactNode; pied?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ouverte) return;
    const touche = (e: KeyboardEvent) => { if (e.key === 'Escape') onFermer(); };
    document.addEventListener('keydown', touche);
    const avant = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => { document.removeEventListener('keydown', touche); document.body.style.overflow = avant; };
  }, [ouverte, onFermer]);
  if (!ouverte) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={titre}>
      <button type="button" aria-label="Fermer" className="adm-fondu absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onFermer} />
      <div ref={ref} tabIndex={-1} className="adm-feuille relative flex max-h-[92dvh] w-full flex-col rounded-t-3xl border border-white/10 bg-[#121a2b] shadow-2xl outline-none sm:max-w-lg sm:rounded-3xl">
        <div className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" />
        <header className="flex shrink-0 items-center justify-between gap-3 px-5 pt-3 pb-2 sm:pt-5">
          <h2 className="text-[17px] font-semibold text-white">{titre}</h2>
          <button type="button" onClick={onFermer} className="grid h-10 w-10 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white" aria-label="Fermer">✕</button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">{children}</div>
        {pied && <footer className="shrink-0 border-t border-white/[0.07] px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">{pied}</footer>}
      </div>
    </div>
  );
}

export function BoutonPrincipal({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-peche px-6 text-[15px] font-semibold text-nuit transition hover:brightness-105 active:scale-[0.98] disabled:opacity-50 ${props.className ?? ''}`}>{children}</button>;
}

export function BoutonSecondaire({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-5 text-[15px] font-medium text-white transition hover:bg-white/[0.13] active:scale-[0.98] disabled:opacity-50 ${props.className ?? ''}`}>{children}</button>;
}

/** Un choix parmi quelques options, en pastilles. */
export function Segments<T extends string>({ valeur, options, onChange, label }: { valeur: T; options: { id: T; nom: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1 rounded-full bg-white/[0.06] p-1">
      {options.map(o => (
        <button key={o.id} type="button" role="radio" aria-checked={valeur === o.id} onClick={() => onChange(o.id)}
          className={`min-h-10 flex-1 rounded-full px-3 text-[14px] font-medium transition ${valeur === o.id ? 'bg-white text-nuit shadow' : 'text-white/65 hover:text-white'}`}>
          {o.nom}
        </button>
      ))}
    </div>
  );
}

/** Réduit une image choisie sur le téléphone, carrée ou en 16:9, côté navigateur. */
export async function preparerImage(fichier: File, format: 'carre' | 'large'): Promise<string> {
  const bitmap = await createImageBitmap(fichier);
  const [w, h] = format === 'carre' ? [400, 400] : [960, 540];
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const echelle = Math.max(w / bitmap.width, h / bitmap.height);
  const dw = bitmap.width * echelle, dh = bitmap.height * echelle;
  ctx.drawImage(bitmap, (w - dw) / 2, (h - dh) / 2, dw, dh);
  // Safari ne sait pas toujours encoder en WebP : le JPEG prend alors le relais.
  const webp = canvas.toDataURL('image/webp', 0.85);
  return webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', 0.86);
}
