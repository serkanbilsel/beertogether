import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { StoreBadge } from '../ui/StoreBadge';
import { IPhone3D } from '../ui/IPhone3D';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  t: TranslationType;
  theme?: 'light' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ t, theme = 'dark' }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Dynamic Ambient Golden Brew Glows */}
      <div
        className="absolute top-1/4 end-[-100px] w-[550px] h-[550px] -translate-y-1/2 rounded-full pointer-events-none blur-[120px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, #D97706 40%, rgba(245, 158, 11, 0) 70%)',
        }}
      />
      <div
        className="absolute bottom-10 start-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, rgba(245, 158, 11, 0) 70%)',
        }}
      />

      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Slogan, Value Prop & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.hero.eyebrow}</span>
            </div>

            <h1 id="hero-heading" className="display-h1">
              {t.hero.h1}
            </h1>

            <p className="text-lead">
              {t.hero.lead}
            </p>

            {/* Store Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>

            {/* Micro compliance copy */}
            <div className="text-caption text-xs text-[var(--ink-3)] font-medium pt-1">
              {t.hero.micro}
            </div>
          </div>

          {/* Right Column: 3D Interactive iPhone Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <IPhone3D t={t} theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
};

