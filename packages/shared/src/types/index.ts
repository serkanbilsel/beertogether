import { z } from 'zod';

export type EventStatus =
  | 'draft'
  | 'pending_invite'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'declined'
  | 'expired'
  | 'cancelled'
  | 'expired_no_proof';

export type VenueCategory =
  | 'bar'
  | 'pub'
  | 'craft_beer'
  | 'bistro'
  | 'cafe'
  | 'home'
  | 'friends_home';

export type EventVisibility = 'public' | 'private';

export type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export type TargetType = 'user' | 'event' | 'timeline_post' | 'photo';

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  birth_date?: string; // ISO date for 18+ age verification
  is_age_verified: boolean;
  visibility_default: EventVisibility;
  created_at: string;
  updated_at: string;
}

export interface Friendship {
  id: string;
  user_a: string;
  user_b: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  user_b_profile?: UserProfile;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  category: VenueCategory;
  latitude: number;
  longitude: number;
  source: 'fsq_os_places' | 'user_added' | 'curated';
  rating?: number;
  image_url?: string;
  created_at: string;
}

export interface EventInvite {
  id: string;
  event_id: string;
  invitee_id: string;
  status: InviteStatus;
  responded_at?: string;
  invitee_profile?: UserProfile;
  created_at: string;
}

export interface BeerEvent {
  id: string;
  slug: string;
  title: string;
  description?: string;
  host_id: string;
  host_profile?: UserProfile;
  venue_id?: string;
  venue?: Venue;
  custom_venue_name?: string;
  custom_venue_address?: string;
  scheduled_at: string; // ISO timestamp
  status: EventStatus;
  visibility: EventVisibility;
  proof_photo_url?: string;
  proof_thumbnail_url?: string;
  check_in_at?: string;
  check_in_latitude?: number;
  check_in_longitude?: number;
  is_gps_verified?: boolean;
  invites?: EventInvite[];
  created_at: string;
  updated_at: string;
}

export interface TimelinePost {
  id: string;
  event_id: string;
  host_id: string;
  host_profile?: UserProfile;
  event?: BeerEvent;
  photo_url: string;
  thumbnail_url?: string;
  caption?: string;
  visibility: EventVisibility;
  cheers_count: number;
  created_at: string;
}

export interface LiveLocation {
  id: string;
  event_id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  updated_at: string;
  expires_at: string;
}

export interface InviteLink {
  id: string;
  token: string;
  event_id: string;
  created_by: string;
  expires_at: string;
  used_by: string[];
  event?: BeerEvent;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_id: string;
  target_type: TargetType;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
}

// Zod Schemas for Validation
export const CreateEventSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalı').max(60),
  description: z.string().max(300).optional(),
  venue_id: z.string().uuid().optional(),
  custom_venue_name: z.string().max(100).optional(),
  custom_venue_address: z.string().max(200).optional(),
  scheduled_at: z.string().datetime({ message: 'Geçerli bir tarih ve saat seçiniz' }),
  visibility: z.enum(['public', 'private']).default('private'),
  invitee_ids: z.array(z.string().uuid()).min(1, 'En az 1 arkadaş seçilmelidir')
});

export type CreateEventInput = z.infer<typeof CreateEventSchema>;

export const CheckInSchema = z.object({
  event_id: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  proof_photo_url: z.string().url('Fotoğraf URL geçerli olmalı')
});

export type CheckInInput = z.infer<typeof CheckInSchema>;

export const AgeVerificationSchema = z.object({
  birth_date: z.string().refine((val) => {
    const birth = new Date(val);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate()) ? age - 1 : age;
    return actualAge >= 18;
  }, { message: 'Beer Together kullanmak için 18 yaşından büyük olmalısınız (Bölüm 20 uyumluluğu)' })
});
