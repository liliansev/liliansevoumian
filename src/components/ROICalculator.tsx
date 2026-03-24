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
      id="calculateur-roi"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      {/* Dot grid dark */}
      <div className="absolute inset-0 dot-grid-dark opacity-50" aria-hidden="true" />

      <div className="relative z-[1] py-16 md:py-24 px-4 md:px-8 lg:px-[7.5rem]">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-5 mb-12">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[2px] uppercase"
              style={{
                color: '#E86A33',
                fontFamily: 'var(--font-mono)',
              }}
            >
              CALCULATEUR ROI
            </span>
            <h2
              className="text-2xl md:text-4xl font-bold text-center"
              style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)' }}
            >
              Combien vous coûte le travail manuel ?
            </h2>
            <p
              className="text-center max-w-[600px] text-[15px] md:text-lg leading-relaxed"
              style={{ color: 'var(--color-text-light-secondary)', fontFamily: 'var(--font-body)' }}
            >
              Estimez les heures et l'argent que l'automatisation peut vous faire économiser.
            </p>
          </div>

          {/* Calculator card */}
          <div
            className="max-w-[700px] mx-auto p-6 md:p-10"
            style={{
              background: '#222222',
              border: '1.5px solid #333333',
              borderRadius: '16px',
              boxShadow: '5px 5px 5px 0 #E86A33',
            }}
          >
            {/* Sliders */}
            <div className="flex flex-col gap-8 mb-10">
              {/* Hours slider */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-hours"
                    className="text-[15px] font-medium"
                    style={{ color: '#AAAAAA', fontFamily: 'var(--font-body)' }}
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
                  className="flex justify-between text-[11px]"
                  style={{ color: '#666666', fontFamily: 'var(--font-mono)' }}
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
                    className="text-[15px] font-medium"
                    style={{ color: '#AAAAAA', fontFamily: 'var(--font-body)' }}
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
                  className="flex justify-between text-[11px]"
                  style={{ color: '#666666', fontFamily: 'var(--font-mono)' }}
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
                    className="text-[15px] font-medium"
                    style={{ color: '#AAAAAA', fontFamily: 'var(--font-body)' }}
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
                  className="flex justify-between text-[11px]"
                  style={{ color: '#666666', fontFamily: 'var(--font-mono)' }}
                >
                  <span>10€</span>
                  <span>200€</span>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div
              className="h-px w-full mb-8"
              style={{ background: '#333333' }}
            />

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="flex flex-col gap-2 p-5 rounded-xl"
                style={{ background: 'rgba(232, 106, 51, 0.08)', border: '1px solid rgba(232, 106, 51, 0.19)' }}
              >
                <span
                  className="text-[12px] font-medium uppercase tracking-wider"
                  style={{ color: '#666666', fontFamily: 'var(--font-mono)' }}
                >
                  Heures économisées / an
                </span>
                <span
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: '#E86A33', fontFamily: 'var(--font-mono)' }}
                >
                  <AnimatedNumber value={hoursSaved} suffix="h" />
                </span>
              </div>
              <div
                className="flex flex-col gap-2 p-5 rounded-xl"
                style={{ background: 'rgba(232, 106, 51, 0.08)', border: '1px solid rgba(232, 106, 51, 0.19)' }}
              >
                <span
                  className="text-[12px] font-medium uppercase tracking-wider"
                  style={{ color: '#666666', fontFamily: 'var(--font-mono)' }}
                >
                  Gains estimés / an
                </span>
                <span
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}
                >
                  <AnimatedNumber value={moneySaved} suffix=" €" />
                </span>
              </div>
            </div>

            {/* Methodology note */}
            <p
              className="text-[12px] mb-8 text-center"
              style={{ color: '#666666', fontFamily: 'var(--font-mono)' }}
            >
              Basé sur 70 % d'heures récupérables et votre taux horaire de {hourlyCost} €
            </p>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3">
              <a
                href="https://cal.com/lilian-sevoumian/20min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d inline-flex items-center justify-center text-[15px] font-semibold px-7 py-3.5 min-h-[48px] w-full md:w-auto"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Récupérer ces heures &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
