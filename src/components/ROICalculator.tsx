import { useState, useEffect, useRef } from 'react';

const DEFAULT_HOURLY_COST = 30;
const RECOVERY_RATE = 0.7;
const WEEKS_PER_YEAR = 52;

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = displayed;
    const diff = value - start;
    if (diff === 0) return;

    const duration = 400;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    }

    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [value]);

  return (
    <span>
      {displayed.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

export default function ROICalculator() {
  const [hours, setHours] = useState(10);
  const [people, setPeople] = useState(3);
  const [hourlyCost, setHourlyCost] = useState(DEFAULT_HOURLY_COST);

  const hoursSaved = Math.round(hours * people * RECOVERY_RATE * WEEKS_PER_YEAR);
  const moneySaved = hoursSaved * hourlyCost;

  return (
    <section
      data-bg="white"
      id="calculateur-roi"
      className="relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" aria-hidden="true" />

      <div className="relative z-[1] py-[var(--spacing-section)] px-[var(--spacing-section-x)]">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-5 mb-12">
            <span
              className="inline-block rounded-full px-4 py-1.5 font-medium tracking-[2px] uppercase"
              style={{
                fontSize: 'var(--text-caption)',
                color: '#E86A33',
                fontFamily: 'var(--font-mono)',
              }}
            >
              CALCULATEUR ROI
            </span>
            <h2
              className="text-[length:var(--text-heading)] font-bold text-center"
              style={{ color: '#1A1A1A', fontFamily: 'var(--font-display)' }}
            >
              Combien vous coûte le travail manuel ?
            </h2>
            <p
              className="text-center max-w-[600px] leading-relaxed"
              style={{ fontSize: 'var(--text-body-lg)', color: '#666666', fontFamily: 'var(--font-body)' }}
            >
              Estimez les heures et l'argent que l'automatisation peut vous faire économiser.
            </p>
          </div>

          {/* Calculator card — dark charcoal */}
          <div
            className="max-w-[700px] mx-auto p-6 md:p-10"
            style={{
              background: '#352F29',
              border: '1.5px solid #504840',
              borderRadius: '16px',
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 0 rgba(0, 0, 0, 0.3), 5px 5px 10px 0 rgba(232, 106, 51, 0.35)',
            }}
          >
            {/* Sliders */}
            <div className="flex flex-col gap-8 mb-10">
              {/* Hours slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-hours"
                    className="font-medium"
                    style={{ fontSize: 'var(--text-body)', color: '#C8BFB3', fontFamily: 'var(--font-body)' }}
                  >
                    Heures manuelles / semaine
                  </label>
                  <span
                    className="text-lg font-bold tabular-nums"
                    style={{ color: '#E86A33', fontFamily: 'var(--font-mono)' }}
                  >
                    {hours}h
                  </span>
                </div>
                <input
                  id="roi-hours"
                  type="range"
                  min={1}
                  max={40}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="roi-slider w-full"
                />
                <div
                  className="flex justify-between"
                  style={{ fontSize: 'var(--text-micro)', color: '#A89E94', fontFamily: 'var(--font-mono)' }}
                >
                  <span>1h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* People slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-people"
                    className="font-medium"
                    style={{ fontSize: 'var(--text-body)', color: '#C8BFB3', fontFamily: 'var(--font-body)' }}
                  >
                    Personnes concernées
                  </label>
                  <span
                    className="text-lg font-bold tabular-nums"
                    style={{ color: '#E86A33', fontFamily: 'var(--font-mono)' }}
                  >
                    {people}
                  </span>
                </div>
                <input
                  id="roi-people"
                  type="range"
                  min={1}
                  max={20}
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="roi-slider w-full"
                />
                <div
                  className="flex justify-between"
                  style={{ fontSize: 'var(--text-micro)', color: '#A89E94', fontFamily: 'var(--font-mono)' }}
                >
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Hourly rate input */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-rate"
                    className="font-medium"
                    style={{ fontSize: 'var(--text-body)', color: '#C8BFB3', fontFamily: 'var(--font-body)' }}
                  >
                    Taux horaire (€ HT)
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      id="roi-rate"
                      type="number"
                      min={10}
                      max={200}
                      value={hourlyCost}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v >= 10 && v <= 200) setHourlyCost(v);
                      }}
                      className="w-[60px] text-right text-lg font-bold tabular-nums bg-transparent border-b-2 border-[#E86A33] outline-none"
                      style={{ color: '#E86A33', fontFamily: 'var(--font-mono)' }}
                    />
                    <span
                      className="text-lg font-bold"
                      style={{ color: '#E86A33', fontFamily: 'var(--font-mono)' }}
                    >€</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="roi-slider w-full"
                />
                <div
                  className="flex justify-between"
                  style={{ fontSize: 'var(--text-micro)', color: '#A89E94', fontFamily: 'var(--font-mono)' }}
                >
                  <span>10€</span>
                  <span>200€</span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div
              className="h-px w-full mb-8"
              style={{ background: '#5A5249' }}
            />

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="flex flex-col gap-2 p-5 rounded-xl"
                style={{ background: '#2E2924', border: '1px solid #4A4239' }}
              >
                <span
                  className="font-medium uppercase tracking-wider"
                  style={{ fontSize: 'var(--text-caption)', color: '#B5AA9E', fontFamily: 'var(--font-mono)' }}
                >
                  Heures économisées / an
                </span>
                <span
                  className="font-bold"
                  style={{ fontSize: 'var(--text-heading)', color: '#E86A33', fontFamily: 'var(--font-mono)' }}
                >
                  <AnimatedNumber value={hoursSaved} suffix="h" />
                </span>
              </div>
              <div
                className="flex flex-col gap-2 p-5 rounded-xl"
                style={{ background: '#2E2924', border: '1px solid #4A4239' }}
              >
                <span
                  className="font-medium uppercase tracking-wider"
                  style={{ fontSize: 'var(--text-caption)', color: '#B5AA9E', fontFamily: 'var(--font-mono)' }}
                >
                  Gains estimés / an
                </span>
                <span
                  className="font-bold"
                  style={{ fontSize: 'var(--text-heading)', color: '#F5EDE5', fontFamily: 'var(--font-mono)' }}
                >
                  <AnimatedNumber value={moneySaved} suffix=" €" />
                </span>
              </div>
            </div>

            {/* Methodology note */}
            <p
              className="mb-8 text-center"
              style={{ fontSize: 'var(--text-caption)', color: '#B5AA9E', fontFamily: 'var(--font-mono)' }}
            >
              Basé sur 70 % d'heures récupérables et votre taux horaire de {hourlyCost} €
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://cal.com/lilian-sevoumian/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center font-semibold px-7 py-3.5 min-h-[48px] w-full md:w-auto rounded-full bg-white text-[#2A2520] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06),5px_5px_12px_0_rgba(0,0,0,0.25)] hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-[1px_1px_3px_rgba(0,0,0,0.1)] transition-all duration-[250ms]"
                style={{ fontSize: 'var(--text-body)', fontFamily: 'var(--font-body)' }}
              >
                Récupérer mes {hoursSaved.toLocaleString('fr-FR')}h
                <span className="inline-block ml-1 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
