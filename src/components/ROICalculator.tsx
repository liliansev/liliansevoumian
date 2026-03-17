import { useState, useEffect, useRef } from 'react';

const HOURLY_COST = 30;
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

  const hoursSaved = Math.round(hours * people * RECOVERY_RATE * WEEKS_PER_YEAR);
  const moneySaved = hoursSaved * HOURLY_COST;

  return (
    <section
      id="calculateur-roi"
      className="py-16 md:py-24 px-4 md:px-8 lg:px-[7.5rem]"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 mb-12">
          <span
            className="inline-block rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-[2px] uppercase"
            style={{
              background: '#1A1028',
              borderColor: 'rgba(139,92,246,0.19)',
              color: '#8B5CF6',
              fontFamily: 'var(--font-mono)',
            }}
          >
            CALCULATEUR ROI
          </span>
          <h2
            className="text-2xl md:text-4xl font-bold text-center"
            style={{ color: '#EDEDED', fontFamily: 'var(--font-display)' }}
          >
            Combien vous coûte le travail manuel ?
          </h2>
          <p
            className="text-center max-w-[600px] text-[15px] md:text-lg leading-relaxed"
            style={{ color: '#888888', fontFamily: 'var(--font-body)' }}
          >
            Estimez les heures et l'argent que l'automatisation peut vous faire économiser.
          </p>
        </div>

        {/* Calculator card */}
        <div
          className="max-w-[700px] mx-auto rounded-2xl p-6 md:p-10"
          style={{
            background: '#111111',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          {/* Sliders */}
          <div className="flex flex-col gap-8 mb-10">
            {/* Hours slider */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label
                  className="text-[15px] font-medium"
                  style={{ color: '#CCCCCC', fontFamily: 'var(--font-body)' }}
                >
                  Heures manuelles / semaine
                </label>
                <span
                  className="text-lg font-bold tabular-nums"
                  style={{ color: '#8B5CF6', fontFamily: 'var(--font-mono)' }}
                >
                  {hours}h
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="roi-slider w-full"
              />
              <div
                className="flex justify-between text-[11px]"
                style={{ color: '#555555', fontFamily: 'var(--font-mono)' }}
              >
                <span>1h</span>
                <span>40h</span>
              </div>
            </div>

            {/* People slider */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label
                  className="text-[15px] font-medium"
                  style={{ color: '#CCCCCC', fontFamily: 'var(--font-body)' }}
                >
                  Personnes concernées
                </label>
                <span
                  className="text-lg font-bold tabular-nums"
                  style={{ color: '#8B5CF6', fontFamily: 'var(--font-mono)' }}
                >
                  {people}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="roi-slider w-full"
              />
              <div
                className="flex justify-between text-[11px]"
                style={{ color: '#555555', fontFamily: 'var(--font-mono)' }}
              >
                <span>1</span>
                <span>20</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div
            className="h-px w-full mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #333333, transparent)' }}
          />

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              className="flex flex-col gap-2 p-5 rounded-xl"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.1)' }}
            >
              <span
                className="text-[12px] font-medium uppercase tracking-wider"
                style={{ color: '#888888', fontFamily: 'var(--font-mono)' }}
              >
                Heures économisées / an
              </span>
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: '#8B5CF6', fontFamily: 'var(--font-mono)' }}
              >
                <AnimatedNumber value={hoursSaved} suffix="h" />
              </span>
            </div>
            <div
              className="flex flex-col gap-2 p-5 rounded-xl"
              style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.1)' }}
            >
              <span
                className="text-[12px] font-medium uppercase tracking-wider"
                style={{ color: '#888888', fontFamily: 'var(--font-mono)' }}
              >
                Gains estimés / an
              </span>
              <span
                className="text-3xl md:text-4xl font-bold"
                style={{ color: '#EDEDED', fontFamily: 'var(--font-mono)' }}
              >
                <AnimatedNumber value={moneySaved} suffix=" €" />
              </span>
            </div>
          </div>

          {/* Methodology note */}
          <p
            className="text-[12px] mb-8 text-center"
            style={{ color: '#555555', fontFamily: 'var(--font-mono)' }}
          >
            Basé sur 70 % d'heures récupérables et un coût horaire moyen de 30 €
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://cal.com/lilian-sevoumian/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[15px] font-medium text-white rounded-lg px-7 py-3.5 min-h-[48px] transition-all duration-200 w-full md:w-auto"
              style={{
                background: '#8B5CF6',
                fontFamily: 'var(--font-body)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7C3AED';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,92,246,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#8B5CF6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Récupérer ces heures →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
