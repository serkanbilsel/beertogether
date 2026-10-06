import React from 'react';
import type { Metadata } from 'next';
import { StoreBadge } from '@/components/ui/StoreBadge';
import { Card } from '@/components/ui/Card';
import { Calendar } from 'lucide-react';
import { getTranslation } from '@/lib/translations';

export const dynamic = 'force-dynamic';

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between p-6">
      {/* Header Logo */}
      <header className="container-main flex items-center justify-center pt-8">
        <a href="/" aria-label={t.a11y.home} className="flex items-center gap-2 font-bold text-base text-[var(--ink)]">
          <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center font-bold text-xs">
            BT
          </div>
          <span>Beer Together</span>
        </a>
      </header>

      {/* Center Invite Card */}
      <main className="container-narrow my-auto py-8">
        {isExpired ? (
          <Card className="text-center p-8 space-y-4">
            <h1 className="display-h3">{t.invite.expired}</h1>
            <p className="text-body text-sm">
              {t.invite.expiredDesc}
            </p>
            <div className="pt-2">
              <a href="/" className="text-sm font-semibold text-[var(--accent-text)] hover:underline">
                {t.invite.backHome}
              </a>
            </div>
          </Card>
        ) : (
          <Card className="text-center p-8 sm:p-12 space-y-6 shadow-md">
            <div className="space-y-2">
              <div className="eyebrow">{t.invite.eyebrow}</div>
              <h1 className="display-h2">
                {t.invite.invited.replace('{name}', inviterName)}
              </h1>
            </div>

            {/* Event details */}
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] max-w-sm mx-auto text-start space-y-2 text-xs text-[var(--ink)]">
              <div className="font-semibold text-sm">{venueName}</div>
              <div className="flex items-center gap-2 text-[var(--ink-2)]">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span className="tabular font-medium">{time}</span>
              </div>
            </div>

            {/* Store Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>

            {/* Secondary Link */}
            <div className="pt-2">
              <a
                href={deepLink}
                className="text-xs font-semibold text-[var(--accent-text)] hover:underline"
              >
                {t.invite.alreadyHave}
              </a>
            </div>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="container-main text-center text-xs text-[var(--ink-3)] pb-4">
        {t.trust.drinkResponsibly}
      </footer>
    </div>
  );
}
