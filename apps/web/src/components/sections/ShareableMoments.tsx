import React from 'react';
import { TranslationType } from '@/lib/translations/en';
import { EventCard } from '../ui/EventCard';

interface ShareableMomentsProps {
  t: TranslationType;
}

export const ShareableMoments: React.FC<ShareableMomentsProps> = ({ t }) => {
  return (
    <section className="section-padding bg-[var(--surface-2)]" aria-labelledby="shareable-heading">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text (6 cols desktop) */}
          <div className="lg:col-span-6 text-start space-y-4">
            <h2 id="shareable-heading" className="display-h2 text-[var(--ink)]">
              {t.public.h2}
            </h2>

            <p className="text-body text-base">
              {t.public.lead}
            </p>
          </div>

          {/* Right EventCard Preview (6 cols desktop) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <EventCard
              venueName={t.public.venue}
              dateTime={t.public.time}
              participantsCount={t.public.participants}
              isPublic={true}
              t={t}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
