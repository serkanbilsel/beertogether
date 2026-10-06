import React from 'react';
import { ShieldCheck, MapPin, Beer } from 'lucide-react';
import { TranslationType } from '@/lib/translations/en';

interface EventCardProps {
  venueName?: string;
  dateTime?: string;
  participantsCount?: string;
  isPublic?: boolean;
  t: TranslationType;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  venueName,
  dateTime,
  participantsCount,
  isPublic = true,
  t,
  className = '',
}) => {
  const displayVenue = venueName || t.public.venue;
  const displayTime = dateTime || t.public.time;
  const displayCount = participantsCount || t.public.participants;

  return (
    <div
      role="region"
      aria-label={`${t.public.exampleBadge}: ${t.public.eventTitle}`}
      className={`relative max-w-sm w-full rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)] flex flex-col justify-between transition-all duration-[var(--dur-base)] hover:shadow-2xl ${className}`}
      style={{
        aspectRatio: '4 / 5',
        backgroundColor: 'var(--dark-bg)',
      }}
    >
      {/* High-res authentic pub photo with proof tag */}
      <img
        src="/photos/pub.jpg"
        alt={t.public.proofPhoto}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Smooth gradient scrim for high contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50 pointer-events-none" />

      {/* Top Header: Liquid Glass pill with Example badge & DateTime */}
      <div className="relative z-10 p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] px-3 py-1 rounded-[var(--radius-pill)] backdrop-blur-xl bg-black/45 border-none">
            {displayTime}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 px-2 py-0.5 rounded-[var(--radius-pill)] bg-white/20 backdrop-blur-md">
            {t.public.exampleBadge}
          </span>
        </div>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--success)] backdrop-blur-xl bg-black/45 border-none"
          title={t.public.verifiedMeetup}
        >
          <ShieldCheck className="w-4 h-4 stroke-[2]" />
        </div>
      </div>

      {/* Center Event Typography */}
      <div className="relative z-10 px-5 text-start space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
          BEER TOGETHER · {t.public.verifiedMeetup}
        </span>
        <h3 className="text-2xl font-black text-white leading-tight drop-shadow-sm">
          {t.public.eventTitle}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
          <span>{displayVenue} · {t.public.locationSnippet}</span>
        </div>
      </div>

      {/* Bottom Row: Participant avatars + verified cheers badge */}
      <div className="relative z-10 p-5 pt-3 flex items-center justify-between border-t border-white/10">
        <div className="flex items-center -space-x-2">
          <div className="w-8 h-8 rounded-full bg-stone-700 text-stone-200 border-2 border-white flex items-center justify-center font-bold text-xs shadow-sm">
            H
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 border-2 border-white flex items-center justify-center font-bold text-xs shadow-sm">
            M
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-black text-xs flex items-center justify-center border-2 border-white shadow-sm">
            +2
          </div>
          <span className="ps-3 text-xs font-semibold text-white/90">
            {displayCount}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-[var(--accent)] bg-black/45 px-3 py-1.5 rounded-[var(--radius-pill)] backdrop-blur-md">
          <Beer className="w-3.5 h-3.5 stroke-[2]" />
          <span>18</span>
        </div>
      </div>
    </div>
  );
};
