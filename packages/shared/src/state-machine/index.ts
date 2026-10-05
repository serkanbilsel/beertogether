import { EventStatus } from '../types/index.js';

export const ALLOWED_TRANSITIONS: Record<EventStatus, EventStatus[]> = {
  draft: ['pending_invite', 'cancelled'],
  pending_invite: ['confirmed', 'declined', 'expired', 'cancelled'],
  confirmed: ['in_progress', 'cancelled', 'expired'],
  in_progress: ['completed', 'expired_no_proof', 'cancelled'],
  completed: [],
  declined: [],
  expired: [],
  cancelled: [],
  expired_no_proof: []
};

export function canTransition(current: EventStatus, next: EventStatus): boolean {
  const allowed = ALLOWED_TRANSITIONS[current];
  return allowed ? allowed.includes(next) : false;
}

export function isCheckInWindowActive(scheduledAtIso: string): {
  isOpen: boolean;
  reason?: 'too_early' | 'too_late' | 'valid';
  minutesUntilStart: number;
} {
  const scheduledTime = new Date(scheduledAtIso).getTime();
  const now = Date.now();
  const diffMinutes = (scheduledTime - now) / (1000 * 60);

  // Active from 30 min before to 120 min after
  if (diffMinutes > 30) {
    return {
      isOpen: false,
      reason: 'too_early',
      minutesUntilStart: Math.round(diffMinutes)
    };
  }

  if (diffMinutes < -120) {
    return {
      isOpen: false,
      reason: 'too_late',
      minutesUntilStart: Math.round(diffMinutes)
    };
  }

  return {
    isOpen: true,
    reason: 'valid',
    minutesUntilStart: Math.round(diffMinutes)
  };
}
