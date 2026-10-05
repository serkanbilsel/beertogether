import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { Eyebrow } from '../ui/Eyebrow';
import { StoreBadge } from '../ui/StoreBadge';
import { PhoneFrame } from '../ui/PhoneFrame';
import { Calendar, MapPin, Users, Send, Check, Sparkles } from 'lucide-react';

interface HeroProps {
  t: TranslationType;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden" aria-labelledby="hero-heading">
      {/* Radiant Electric Amber Flare */}
      <div
        className="absolute top-1/3 end-[-100px] w-[640px] h-[640px] -translate-y-1/2 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, rgba(245, 158, 11, 0) 70%)',
        }}
      />

      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column (5 cols desktop) */}
          <div className="lg:col-span-5 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--accent-soft)] border border-[var(--accent)]/20">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[var(--accent-text)]">
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 id="hero-heading" className="display-h1 text-[var(--ink)]">
              {t.hero.h1}
            </h1>

            <p className="text-lead">
              {t.hero.lead}
            </p>

            {/* Store Badges & QR Code */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />

              {/* Desktop Small QR code container */}
              <div className="hidden sm:flex items-center gap-2 p-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
                <div className="w-[36px] h-[36px] bg-[var(--surface-2)] p-1.5 rounded-[var(--radius-sm)] flex items-center justify-center">
                  <svg className="w-full h-full text-[var(--ink)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm8-2h7v7h-7V3zm2 2v3h3V5h-3zM3 13h7v7H3v-7zm2 2v3h3v-3H5zm13-2h3v2h-3v-2zm-5 0h2v2h-2v-2zm0 4h2v4h-2v-4zm3 2h2v2h-2v-2zm2 0h2v2h-2v-2zm-2-4h2v2h-2v-2zm2 0h2v2h-2v-2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-[var(--ink-2)] pe-2 leading-tight max-w-[70px]">
                  SCAN QR
                </span>
              </div>
            </div>

            {/* Micro compliance copy */}
            <div className="text-caption text-xs text-[var(--ink-3)] font-semibold pt-1">
              {t.hero.micro}
            </div>
          </div>

          {/* Right Column (7 cols desktop): PhoneFrame with HTML create-event mockup */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <PhoneFrame ariaLabel={t.a11y.phoneDescription}>
              <div className="space-y-3 pt-1 text-start" aria-hidden="true">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="font-display font-bold text-sm text-[var(--ink)]">{t.phoneMockup.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--accent-text)] bg-[var(--accent-soft)] px-2.5 py-0.5 rounded-full">
                    {t.phoneMockup.statusConfirmed}
                  </span>
                </div>

                {/* Event Card in Phone */}
                <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-2.5">
                  <div className="font-display font-bold text-base text-[var(--ink)]">{t.phoneMockup.eventTitle}</div>

                  {/* Venue */}
                  <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[var(--ink)] font-semibold">
                      <MapPin className="w-4 h-4 text-[var(--accent-text)]" />
                      <span>{t.phoneMockup.venue}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] flex items-center gap-2 text-xs text-[var(--ink)] font-semibold">
                    <Calendar className="w-4 h-4 text-[var(--accent-text)]" />
                    <span className="tabular">{t.phoneMockup.time}</span>
                  </div>
                </div>

                {/* Friend Invites Section */}
                <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[var(--accent-text)]" />
                      <span>{t.phoneMockup.participantsTitle}</span>
                    </span>
                    <span className="text-[10px] text-[var(--success)] font-bold">{t.phoneMockup.participantsStatus}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center font-bold text-[11px]">
                          1
                        </div>
                        <span className="font-semibold text-[var(--ink)]">{t.phoneMockup.hostName}</span>
                      </div>
                      <Check className="w-4 h-4 text-[var(--success)]" />
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center font-bold text-[11px]">
                          2
                        </div>
                        <span className="font-semibold text-[var(--ink)]">{t.phoneMockup.friendName}</span>
                      </div>
                      <Check className="w-4 h-4 text-[var(--success)]" />
                    </div>
                  </div>
                </div>

                {/* Send WhatsApp CTA in phone */}
                <div className="pt-1">
                  <div className="h-[46px] rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs flex items-center justify-center gap-2 shadow-[var(--shadow-md)]">
                    <Send className="w-4 h-4 rtl:scale-x-[-1]" />
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
