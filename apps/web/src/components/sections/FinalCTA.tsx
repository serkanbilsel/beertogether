import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { StoreBadge } from '../ui/StoreBadge';
import { Sparkles } from 'lucide-react';

interface FinalCTAProps {
  t: TranslationType;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ t }) => {
  return (
    <section id="download" className="py-16 md:py-24 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container-main relative z-10">
        <div className="rounded-[var(--radius-xl)] bg-gradient-to-b from-[#0F121D] to-[#080A10] text-[#FFFFFF] p-8 sm:p-16 text-center border border-[var(--accent)]/20 shadow-[0_20px_80px_-20px_rgba(255,179,0,0.2)]">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-text)] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Beer Together</span>
            </div>

            <h2 id="cta-heading" className="display-h2 text-white">
              {t.cta.h2}
            </h2>

            <p className="text-lead text-slate-300 text-base md:text-lg max-w-xl mx-auto">
              {t.cta.lead}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
