import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Calendar, Users, ShieldCheck, MapPin } from 'lucide-react';
import { TranslationType } from '@/lib/translations/en';

interface EventCardProps {
  venueName?: string;
  dateTime?: string;
  participantsCount?: string;
  isPublic?: boolean;
  t?: TranslationType;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  venueName = 'Belfast Irish Pub',
  dateTime = 'Friday · 20:00',
  participantsCount = '2 joined',
  isPublic = true,
  t,
  className = '',
}) => {
  const proofLabel = t?.public?.proofPhoto || 'Proof photo';
  const badgeLabel = isPublic
    ? (t?.snippets?.public || 'Public')
    : (t?.snippets?.private || 'Private');

  return (
    <Card hoverable className={`max-w-md w-full border-[#1F2438] bg-[#0C0E17]/90 ${className}`}>
      {/* Example proof photo container */}
      <div className="relative aspect-[4/3] w-full rounded-[var(--radius-md)] bg-gradient-to-br from-[#121626] to-[#0A0C14] border border-[#1F2438] overflow-hidden mb-5 flex items-center justify-center">
        <div className="text-center p-6 space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-[var(--accent-text)] flex items-center justify-center shadow-[0_0_20px_rgba(255,179,0,0.2)]">
            <ShieldCheck className="w-6 h-6 text-[var(--accent-text)]" />
          </div>
          <div className="text-sm font-bold text-white tracking-wide">{proofLabel}</div>
          <div className="text-[11px] text-slate-400">150 m GPS Verified Check-in</div>
        </div>

        <div className="absolute top-3 end-3">
          <Badge>{badgeLabel}</Badge>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-start">
        <div className="font-display font-extrabold text-xl text-white tracking-tight">
          {venueName}
        </div>

        <div className="flex items-center gap-5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--accent)]" />
            <span className="tabular">{dateTime}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[var(--accent)]" />
            <span>{participantsCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
