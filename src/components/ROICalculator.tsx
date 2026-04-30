import { useState, useEffect, useRef, useDeferredValue } from 'react';

// Tarif de référence pour calcul ROI : milieu de la fourchette Mission Complète (8K-25K€).
// Si le coût se rapproche de ce tarif, on bascule sur "Workflow simple" (1.5K€).
const PROJECT_PRICE_MID = 12000;
const PROJECT_PRICE_LOW = 1500;
const RECOVERY_RATE = 0.55; // 55% au lieu de 70% — plus conservateur, défendable en audit
const WEEKS_PER_YEAR = 48; // 48 sem. effectives (vacances, fériés)
const MAX_REASONABLE_HOURS = 20; // à partir de ce seuil, on capote l'estimation
const MAX_REASONABLE_PEOPLE = 10;

// Format français avec NBSP standard (U+00A0) au lieu de narrow NBSP (U+202F)
// qui se rend cassé en Geist 600 large size. Le replace cible   →  .
function formatFR(n: number): string {
  return n.toLocaleString('fr-FR').replace(/ /g, ' ');
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const displayedRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = displayedRef.current;
    const diff = value - start;
    if (diff === 0) return;

    const duration = 350;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + diff * eased);
      displayedRef.current = current;
      setDisplayed(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span>
      {formatFR(displayed)}
      {suffix}
    </span>
  );
}

interface SliderProps {
  id: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
}

function MonoSlider({ id, label, unit = '', min, max, step = 1, value, onChange }: SliderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="mono-caption"
          style={{ color: 'var(--color-ink-low)' }}
        >
          {label}
        </label>
        <span
          className="font-display font-semibold tabular-nums text-2xl tracking-[-0.02em]"
          style={{ color: 'var(--color-ink)' }}
        >
          {formatFR(value)}
          <span className="mono-caption ml-1" style={{ color: 'var(--color-ink-low)' }}>
            {unit}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value}${unit ? ' ' + unit : ''}`}
        className="roi-slider"
      />
      <div className="flex justify-between mono-caption" style={{ color: 'var(--color-ink-low)' }}>
        <span>
          {formatFR(min)}
          {unit}
        </span>
        <span>
          {formatFR(max)}
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [hours, setHours] = useState(8);
  const [people, setPeople] = useState(3);
  const [hourlyCost, setHourlyCost] = useState(55);

  // useDeferredValue → React peint les sliders en priorité, défère le calcul/animation
  // des outputs derrière. Évite l'empilement de rAF sur drag rapide.
  const dHours = useDeferredValue(hours);
  const dPeople = useDeferredValue(people);
  const dHourlyCost = useDeferredValue(hourlyCost);

  const cappedHours = Math.min(dHours, MAX_REASONABLE_HOURS);
  const cappedPeople = Math.min(dPeople, MAX_REASONABLE_PEOPLE);
  const isCapped = dHours >= MAX_REASONABLE_HOURS || dPeople >= MAX_REASONABLE_PEOPLE;

  const hoursSaved = Math.round(cappedHours * cappedPeople * RECOVERY_RATE * WEEKS_PER_YEAR);
  const moneySaved = hoursSaved * dHourlyCost;

  const projectPrice = moneySaved < 20000 ? PROJECT_PRICE_LOW : PROJECT_PRICE_MID;
  const monthsToROI =
    moneySaved > 0 ? Math.max(1, Math.ceil((projectPrice * 12) / moneySaved)) : 99;

  return (
    <section
      id="roi"
      data-section
      className="relative"
      style={{
        background: 'var(--color-paper)',
        paddingTop: 'var(--spacing-section-y)',
        paddingBottom: 'var(--spacing-section-y)',
        paddingLeft: 'var(--spacing-section-x)',
        paddingRight: 'var(--spacing-section-x)',
      }}
    >
      <div className="relative max-w-[1200px] mx-auto">
        {/* Header — bg-paper sans border (pattern minimaliste light) */}
        <div className="reveal mb-12 md:mb-16">
          <div
            className="inline-block py-2 pr-2"
            style={{ background: 'var(--color-paper)' }}
          >
            <div className="section-number" style={{ marginBottom: '0.5rem' }}>
              04 — ROI
            </div>
            <h2
              className="font-display font-semibold leading-[1.05] tracking-[-0.035em] m-0"
              style={{
                fontSize: 'var(--text-headline)',
                color: 'var(--color-ink)',
                maxWidth: '20ch',
              }}
            >
              Combien votre temps coûte-t-il ?
            </h2>
          </div>
          <div
            className="mt-4 py-2 pr-2"
            style={{
              background: 'var(--color-paper)',
              maxWidth: '60ch',
            }}
          >
            <p
              className="m-0"
              style={{
                fontSize: 'var(--text-body-large)',
                color: 'var(--color-ink-mid)',
                lineHeight: '1.5',
              }}
            >
              Estimation conservatrice : 55 % des heures manuelles récupérées via automatisation, 48 semaines effectives par an. Au-delà de 20 h/sem ou 10 employés, l'estimation est plafonnée — l'audit réel descend dans le détail.
            </p>
          </div>
        </div>

        {/* Calculator grid — light : sliders sur paper, output sur surface-low pour différenciation */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-px bg-[var(--color-divider)] border border-[var(--color-divider)] rounded-[var(--radius-md)] overflow-hidden reveal">
          {/* Sliders panel */}
          <fieldset className="bg-[var(--color-paper)] p-8 md:p-10 flex flex-col gap-8 border-0 m-0">
            <legend className="sr-only">Paramètres d'estimation ROI</legend>
            <MonoSlider
              id="roi-hours"
              label="HEURES /SEM PERDUES SUR PROCESS RÉPÉTITIFS"
              unit="H"
              min={1}
              max={30}
              value={hours}
              onChange={setHours}
            />
            <MonoSlider
              id="roi-people"
              label="EMPLOYÉS CONCERNÉS"
              min={1}
              max={15}
              value={people}
              onChange={setPeople}
            />
            <MonoSlider
              id="roi-rate"
              label="COÛT HORAIRE INTERNE"
              unit="€"
              min={25}
              max={120}
              step={5}
              value={hourlyCost}
              onChange={setHourlyCost}
            />
          </fieldset>

          {/* Output panel — surface-low pour différenciation latérale */}
          <div className="bg-[var(--color-surface-low)] p-8 md:p-10 flex flex-col">
            <div className="mono-caption mb-2" style={{ color: 'var(--color-ink-low)' }}>
              ÉCONOMIE ESTIMÉE
            </div>
            <div
              className="font-display font-semibold leading-[0.98] tracking-[-0.045em] mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: 'var(--color-ink)',
              }}
            >
              <AnimatedNumber value={moneySaved} suffix=" €" />
              <span className="mono-caption ml-2 align-middle" style={{ color: 'var(--color-ink-low)' }}>
                /AN
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[var(--color-divider)] mb-6">
              <div>
                <div className="mono-caption mb-1" style={{ color: 'var(--color-ink-low)' }}>
                  HEURES /AN
                </div>
                <div
                  className="font-display font-semibold tabular-nums tracking-[-0.025em]"
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--color-ink)',
                  }}
                >
                  <AnimatedNumber value={hoursSaved} suffix=" H" />
                </div>
              </div>
              <div>
                <div className="mono-caption mb-1" style={{ color: 'var(--color-ink-low)' }}>
                  ROI EN
                </div>
                <div
                  className="font-display font-semibold tabular-nums tracking-[-0.025em]"
                  style={{
                    fontSize: '1.5rem',
                    color: 'var(--color-violet)',
                  }}
                >
                  ~{monthsToROI} MOIS
                </div>
              </div>
            </div>

            <div
              className="mono-caption mb-6 leading-[1.6] flex flex-col gap-1"
              style={{ color: 'var(--color-ink-low)' }}
            >
              <span>
                FORMULE : {cappedHours}H × {cappedPeople} EMP × 0,55 RÉCUP × 48 SEM × {dHourlyCost}€
              </span>
              <span>
                COÛT PROJET RÉFÉRENCE : {formatFR(projectPrice)} € ({moneySaved < 20000 ? 'WORKFLOW' : 'MISSION COMPLÈTE'})
              </span>
              {isCapped && (
                <span style={{ color: 'var(--color-error)' }}>
                  [!] ESTIMATION PLAFONNÉE. L'AUDIT RÉEL DESCEND DANS LE DÉTAIL
                </span>
              )}
            </div>

            <a
              href="https://cal.com/lilian-sevoumian/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center mt-auto"
            >
              Discuter de mon cas · 30 min
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
