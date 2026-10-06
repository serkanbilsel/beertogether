import React from 'react';
import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StoreBadge } from '@/components/ui/StoreBadge';
import { MapPin, Calendar, Users, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getTranslation } from '@/lib/translations';

interface Props {
  params: {
    slug: string;
  };
  searchParams?: {
    lang?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = 'Kadıköy Craft Pint Meetup — Beer Together';
  const description = 'Public beer meetup at Belfast Irish Pub. Photo verified.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://beertogether.app/e/${params.slug}`,
      languages: {
        'tr': `https://beertogether.app/tr/e/${params.slug}`,
        'en': `https://beertogether.app/en/e/${params.slug}`,
        'es': `https://beertogether.app/es/e/${params.slug}`,
        'ja': `https://beertogether.app/ja/e/${params.slug}`,
        'ar': `https://beertogether.app/ar/e/${params.slug}`,
        'it': `https://beertogether.app/it/e/${params.slug}`,
        'x-default': `https://beertogether.app/en/e/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default function PublicEventPage({ params, searchParams }: Props) {
  const t = getTranslation(searchParams?.lang || 'en');
  const event = {
    title: 'Friday Craft Pint at Belfast Irish Pub',
    venue: 'Belfast Irish Pub',
    address: 'Caferağa Mah. Moda, Kadıköy, İstanbul',
    dateIso: '2026-10-05T20:00:00.000Z',
    dateFormatted: 'Friday, Oct 5 · 20:00',
    participants: ['Serkan', 'Hakan'],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.dateIso,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address,
        addressLocality: 'İstanbul',
        addressCountry: 'TR',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Beer Together',
      url: 'https://beertogether.app',
    },
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-white p-6 md:p-12 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--accent)]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="container-narrow relative z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-display font-bold text-[var(--accent)] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 rtl:scale-x-[-1]" />
          <span>{t.event.back}</span>
        </a>

        <Card className="p-6 sm:p-10 space-y-7 border-[#1F2438] bg-[#0C0E17]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* 4:3 Proof photo placeholder */}
          <div className="relative aspect-[4/3] w-full rounded-[var(--radius-lg)] bg-gradient-to-br from-[#121626] to-[#0A0C14] border border-[#1F2438] overflow-hidden flex items-center justify-center text-center p-6">
            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-text)] flex items-center justify-center mb-3 shadow-[0_0_24px_rgba(255,179,0,0.25)]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="font-display font-bold text-base text-white">{t.public.proofPhoto}</div>
              <div className="text-xs text-slate-400 mt-1">150 m GPS Verified Check-in</div>
            </div>
          </div>

          <div className="space-y-4 text-start">
            <Badge>{t.event.publicBadge}</Badge>
            <h1 className="display-h2 text-white">{event.title}</h1>

            <div className="p-4.5 rounded-[var(--radius-md)] bg-[#10131F] border border-[#1F2438] space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 font-semibold text-white">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>{event.venue} — {event.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="tabular font-medium">{event.dateFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>{t.event.joined.replace('{names}', event.participants.join(' & '))}</span>
              </div>
            </div>
          </div>

          {/* Plan your own block */}
          <div className="pt-6 border-t border-[#1F2438] text-center space-y-4">
            <h2 className="display-h3 text-white">{t.public.planYours}</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
