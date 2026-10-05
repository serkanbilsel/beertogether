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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] p-6 md:p-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-narrow">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 rtl:scale-x-[-1]" />
          <span>{t.event.back}</span>
        </a>

        <Card className="p-6 sm:p-10 space-y-6">
          {/* 4:3 Proof photo placeholder */}
          <div className="relative aspect-[4/3] w-full rounded-[var(--radius-lg)] bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden flex items-center justify-center text-center p-6">
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="font-semibold text-sm text-[var(--ink)]">{t.public.proofPhoto}</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">150 m GPS</div>
            </div>
          </div>

          <div className="space-y-3 text-start">
            <Badge>{t.event.publicBadge}</Badge>
            <h1 className="display-h2 text-[var(--ink)]">{event.title}</h1>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] space-y-2 text-xs text-[var(--ink-2)]">
              <div className="flex items-center gap-2 font-semibold text-[var(--ink)]">
                <MapPin className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <span>{event.venue} — {event.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <span className="tabular">{event.dateFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <span>{t.event.joined.replace('{names}', event.participants.join(' & '))}</span>
              </div>
            </div>
          </div>

          {/* Plan your own block */}
          <div className="pt-6 border-t border-[var(--border)] text-center space-y-4">
            <h2 className="display-h3 text-[var(--ink)]">{t.public.planYours}</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <StoreBadge platform="apple" t={t} />
              <StoreBadge platform="google" t={t} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
