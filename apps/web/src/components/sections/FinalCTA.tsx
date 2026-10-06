import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { StoreBadge } from '../ui/StoreBadge';

interface FinalCTAProps {
  t: TranslationType;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ t }) => {
  return (
    <section id="download" className="py-14 bg-[var(--bg)]" aria-labelledby="cta-heading">
      <div className="container-main">
        <div className="rounded-[var(--radius-xl)] bg-[#18181B] text-[#FAFAFA] p-8 sm:p-14 text-center shadow-lg border border-[#27272A]">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 id="cta-heading" className="display-h2 text-white">
              {t.cta.h2}
            </h2>

            <p className="text-body text-zinc-400 text-base">
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
