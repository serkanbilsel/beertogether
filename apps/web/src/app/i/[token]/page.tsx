import React from 'react';
import type { Metadata } from 'next';
import { StoreBadge } from '@/components/ui/StoreBadge';
import { Card } from '@/components/ui/Card';
import { Calendar, Sparkles } from 'lucide-react';
import { getTranslation } from '@/lib/translations';

interface Props {
  params: {
    token: string;
  };
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beer Together — You have an invite',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function InvitePage({ params, searchParams }: Props) {
  const t = getTranslation(searchParams?.lang || 'en');
  const isExpired = false;
  const inviterName = 'Serkan';
  const venueName = 'Belfast Irish Pub';
  const time = 'Friday · 20:00';
  const deepLink = `beertogether://invite/${params.token}`;

  return (
    <div className="min-h-screen bg-[#05060A] text-white flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Small Header Logo */}
      <header className="container-main flex items-center justify-center pt-8 relative z-10">
        <a href="/" aria-label={t.a11y.home} className="flex items-center gap-2.5 font-display font-extrabold text-lg text-white">
          <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-gradient-to-br from-[#FFB300] to-[#FF8F00] text-[#05060A] flex items-center justify-center font-black text-xs shadow-[0_0_16px_rgba(255,179,0,0.35)]">
            BT
          </div>
          <span className="tracking-tight">Beer Together</span>
        </a>
      </header>

      {/* Center Invite Card */}
      <main className="container-narrow my-auto py-12 relative z-10">
        {isExpired ? (
          <Card className="text-center p-8 sm:p-12 space-y-4 border-[#1F2438]">
            <h1 className="display-h3 text-white">{t.invite.expired}</h1>
            <p className="text-body text-sm text-slate-400">
              {t.invite.expiredDesc}
            </p>
            <div className="pt-3">
              <a href="/" className="text-sm font-display font-bold text-[var(--accent)] hover:underline">
                {t.invite.backHome}
              </a>
            </div>
          </Card>
        ) : (
          <Card className="text-center p-8 sm:p-14 space-y-7 border-[#1F2438] bg-[#0C0E17]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-text)] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.invite.eyebrow}</span>
              </div>
              <h1 className="display-h2 text-white">
                {t.invite.invited.replace('{name}', inviterName)}
              </h1>
            </div>

            {/* Event details */}
            <div className="p-4.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] max-w-sm mx-auto text-start space-y-2 text-xs text-white">
              <div className="font-display font-bold text-base text-white">{venueName}</div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 text-[var(--accent)]" />
                <span className="tabular font-medium">{time}</span>
              </div>
            </div>

            {/* Store Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>

            {/* Secondary Link */}
            <div className="pt-2">
              <a
                href={deepLink}
                className="text-xs font-display font-semibold text-[var(--accent)] hover:underline"
              >
                {t.invite.alreadyHave}
              </a>
            </div>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="container-main text-center text-xs text-slate-500 pb-6 relative z-10">
        {t.trust.drinkResponsibly}
      </footer>
    </div>
  );
}
