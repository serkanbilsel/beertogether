import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Eyebrow } from '../ui/Eyebrow';
import { StoreBadge } from '../ui/StoreBadge';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Calendar, MapPin, Users, Send, Check } from 'lucide-react';

interface HeroProps {
  t: TranslationType;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden" aria-labelledby="hero-heading">
      {/* Soft, warm amber ambient light */}
      <div
        className="absolute top-1/3 end-[-120px] w-[500px] h-[500px] -translate-y-1/2 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, rgba(245, 158, 11, 0) 70%)',
        }}
      />

      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (6 cols desktop for generous breathing room) */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-text)] text-xs font-bold tracking-wide">
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

          {/* Right Column (6 cols desktop): Clean iOS Phone Frame */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <PhoneFrame ariaLabel={t.a11y.phoneDescription}>
              <div className="space-y-3 pt-1 text-start" aria-hidden="true">
                {/* Header in phone */}
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                    <span className="font-sans font-bold text-sm text-[var(--ink)]">{t.phoneMockup.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--accent-text)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded-full">
                    {t.phoneMockup.statusConfirmed}
                  </span>
                </div>

                {/* Event Card in Phone */}
                <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-2.5">
                  <div className="font-sans font-bold text-sm text-[var(--ink)]">{t.phoneMockup.eventTitle}</div>

                  {/* Venue */}
                  <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[var(--ink)] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                      <span>{t.phoneMockup.venue}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] flex items-center gap-2 text-xs text-[var(--ink)] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                    <span className="tabular font-medium">{t.phoneMockup.time}</span>
                  </div>
                </div>

                {/* Friend Invites Section */}
                <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                      <span>{t.phoneMockup.participantsTitle}</span>
                    </span>
                    <span className="text-[10px] text-[var(--success)] font-bold">{t.phoneMockup.participantsStatus}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center font-bold text-[10px]">
                          1
                        </div>
                        <span className="font-medium text-[var(--ink)]">{t.phoneMockup.hostName}</span>
                      </div>
                      <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center font-bold text-[10px]">
                          2
                        </div>
                        <span className="font-medium text-[var(--ink)]">{t.phoneMockup.friendName}</span>
                      </div>
                      <Check className="w-3.5 h-3.5 text-[var(--success)]" />
                    </div>
                  </div>
                </div>

                {/* Send WhatsApp CTA in phone */}
                <div className="pt-1">
                  <div className="h-[42px] rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-95">
                    <Send className="w-3.5 h-3.5 rtl:scale-x-[-1]" />
                    <span>{t.phoneMockup.inviteWhatsApp}</span>
                  </div>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
};
