import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Eyebrow } from '../ui/Eyebrow';
import { StoreBadge } from '../ui/StoreBadge';
import { IPhone3D } from '../ui/IPhone3D';
import { QrCode } from 'lucide-react';

interface HeroProps {
  t: TranslationType;
  theme?: 'light' | 'dark';
  locale?: string;
}

export const Hero: React.FC<HeroProps> = ({ t, theme = 'dark', locale = 'tr' }) => {
  return (
    <section className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden" aria-labelledby="hero-heading">
      <div className="container-main">
        {/* Responsive grid with full breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
          
          {/* Left Column: Eyebrow, H1, Lead, Badges + QR, Micro copy */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-7 text-start">
            {t.hero.eyebrow ? (
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            ) : null}

            <h1 id="hero-heading" className="display-h1 text-[var(--ink)]">
              {t.hero.h1}
            </h1>

            <p className="text-lead text-[var(--ink-2)]">
              {t.hero.lead}
            </p>

            {/* Official Store Badges & Desktop QR Code */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />

              {/* Desktop QR code badge per Section 5.2 */}
              <a
                href="#download"
                title="Scan to download"
                className="hidden xl:inline-flex items-center gap-2 h-[52px] px-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--accent)] transition-all group"
              >
                <div className="w-8 h-8 rounded-md bg-[var(--surface-2)] flex items-center justify-center text-[var(--ink)]">
                  <QrCode className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="text-start leading-tight">
                  <div className="text-[10px] font-semibold uppercase text-[var(--ink-3)]">Scan QR</div>
                  <div className="text-[13px] font-bold text-[var(--ink)]">Get App</div>
                </div>
              </a>
            </div>

            {/* Micro compliance copy: Free · 18+ only · No ads */}
            <p className="text-caption text-xs text-[var(--ink-3)] font-medium pt-1">
              {t.hero.micro}
            </p>
          </div>

          {/* Right Column: Phone mockup with single warm radial light */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end relative">
            {/* Single subtle warm amber radial glow (≤ 12% opacity) per Section 2 & 5.2 */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(232, 163, 61, 0.11) 0%, rgba(232, 163, 61, 0.03) 55%, transparent 75%)',
                filter: 'blur(40px)',
              }}
            />

            <IPhone3D t={t} theme={theme} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
};
