import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { StoreBadge } from '../ui/StoreBadge';

interface FinalCTAProps {
  t: TranslationType;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ t }) => {
  return (
    <section id="download" className="section-padding bg-[var(--bg)]" aria-labelledby="cta-heading">
      <div className="container-main">
        {/* Section 5.9: --dark-bg background, radius-xl card, Store badges */}
        <div className="rounded-[var(--radius-xl)] bg-[var(--dark-bg)] text-[var(--dark-ink)] p-8 sm:p-16 text-center shadow-[var(--shadow-lg)] border border-[var(--dark-surface)] relative overflow-hidden">
          
          {/* Subtle warm ambient glow inside the dark card */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none -z-0"
            style={{
              background: 'radial-gradient(circle, rgba(232, 163, 61, 0.08) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 id="cta-heading" className="display-h2 text-[var(--dark-ink)]">
              {t.cta.h2}
            </h2>

            <p className="text-lead text-[var(--dark-ink-2)] mx-auto">
              {t.cta.lead}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
