import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Calendar, Users, ShieldCheck } from 'lucide-react';
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
    <Card hoverable className={`max-w-md w-full ${className}`}>
      {/* Example proof photo container */}
      <div className="relative aspect-[4/3] w-full rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden mb-4 flex items-center justify-center">
        <div className="text-center p-4 space-y-1.5">
          <div className="w-10 h-10 mx-auto rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-text)]" />
          </div>
          <div className="text-xs font-semibold text-[var(--ink)]">{proofLabel}</div>
          <div className="text-[11px] text-[var(--ink-3)]">150m GPS verified</div>
        </div>

        <div className="absolute top-3 end-3">
          <Badge>{badgeLabel}</Badge>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-start">
        <div className="font-sans font-bold text-lg text-[var(--ink)]">
          {venueName}
        </div>

        <div className="flex items-center gap-4 text-xs text-[var(--ink-2)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[var(--accent-text)]" />
            <span className="tabular">{dateTime}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[var(--accent-text)]" />
            <span>{participantsCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
