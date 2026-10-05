import { BeerEvent, TimelinePost, Venue, UserProfile } from '@beer-together/shared';

export const INITIAL_USER: UserProfile = {
  id: '11111111-1111-1111-1111-111111111111',
  user_id: '11111111-1111-1111-1111-111111111111',
  username: 'serkan',
  full_name: 'Serkan Kaya',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  phone: '+905551112233',
  bio: 'Craft bira kaşifi & pub tutkunu 🍻',
  birth_date: '1994-06-15',
  is_age_verified: true,
  visibility_default: 'public',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const INITIAL_FRIENDS: UserProfile[] = [
  {
    id: '22222222-2222-2222-2222-222222222222',
    user_id: '22222222-2222-2222-2222-222222222222',
    username: 'hakan',
    full_name: 'Hakan Yılmaz',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+905554445566',
    bio: 'IPA ve stout aşığı.',
    is_age_verified: true,
    visibility_default: 'public',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    user_id: '33333333-3333-3333-3333-333333333333',
    username: 'ayse',
    full_name: 'Ayşe Demir',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phone: '+905557778899',
    bio: 'Chill pub sohbetleri.',
    is_age_verified: true,
    visibility_default: 'public',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    user_id: '44444444-4444-4444-4444-444444444444',
    username: 'mert',
    full_name: 'Mert Öztürk',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '+905550001122',
    bio: 'Pints & friends.',
    is_age_verified: true,
    visibility_default: 'public',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'a1111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Belfast Irish Pub',
    address: 'Caferağa Mah. Dr. Esat Işık Cad. No:28 Kadıköy',
    city: 'İstanbul',
    country: 'Turkey',
    category: 'pub',
    latitude: 40.9882,
    longitude: 29.0267,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
    source: 'fsq_os_places',
    created_at: new Date().toISOString()
  },
  {
    id: 'a2222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'The Populist Bomontiada',
    address: 'Merkez Mah. Silahşör Cad. No:1 Şişli',
    city: 'İstanbul',
    country: 'Turkey',
    category: 'craft_beer',
    latitude: 41.0583,
    longitude: 28.9814,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600',
    source: 'fsq_os_places',
    created_at: new Date().toISOString()
  },
  {
    id: 'a3333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'United Pub Beşiktaş',
    address: 'Sinanpaşa Mah. Şair Nedim Cad. No:18 Beşiktaş',
    city: 'İstanbul',
    country: 'Turkey',
    category: 'pub',
    latitude: 41.0428,
    longitude: 29.0069,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1538488881522-4328fb77821c?w=600',
    source: 'fsq_os_places',
    created_at: new Date().toISOString()
  },
  {
    id: 'a4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Zeplin Pub & Delicatessen',
    address: 'Moda Cad. No:70 Kadıköy',
    city: 'İstanbul',
    country: 'Turkey',
    category: 'craft_beer',
    latitude: 40.9856,
    longitude: 29.0289,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
    source: 'fsq_os_places',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_EVENTS: BeerEvent[] = [
  {
    id: 'e1111111-1111-1111-1111-111111111111',
    slug: 'kadikoy-craft-bira-gecesi-e1111',
    title: 'Kadıköy Craft Bira Gecesi',
    description: 'Haftasonu öncesi Zeplin Pubda craft bira tadımı ve sohbet.',
    host_id: INITIAL_USER.id,
    host_profile: INITIAL_USER,
    venue_id: INITIAL_VENUES[3].id,
    venue: INITIAL_VENUES[3],
    scheduled_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    status: 'completed',
    visibility: 'public',
    proof_photo_url: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800',
    proof_thumbnail_url: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=300',
    check_in_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    check_in_latitude: 40.9856,
    check_in_longitude: 29.0289,
    is_gps_verified: true,
    invites: [
      {
        id: 'i-1',
        event_id: 'e1111111-1111-1111-1111-111111111111',
        invitee_id: INITIAL_FRIENDS[0].id,
        invitee_profile: INITIAL_FRIENDS[0],
        status: 'accepted',
        created_at: new Date().toISOString()
      }
    ],
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'e2222222-2222-2222-2222-222222222222',
    slug: 'cuma-aksami-populist-bulusmasi-e2222',
    title: 'Cuma Akşamı Populist Buluşması',
    description: 'İş çıkışı soğuk IPA eşliğinde sohbet.',
    host_id: INITIAL_USER.id,
    host_profile: INITIAL_USER,
    venue_id: INITIAL_VENUES[1].id,
    venue: INITIAL_VENUES[1],
    scheduled_at: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    status: 'confirmed',
    visibility: 'public',
    invites: [
      {
        id: 'i-2',
        event_id: 'e2222222-2222-2222-2222-222222222222',
        invitee_id: INITIAL_FRIENDS[0].id,
        invitee_profile: INITIAL_FRIENDS[0],
        status: 'accepted',
        created_at: new Date().toISOString()
      },
      {
        id: 'i-3',
        event_id: 'e2222222-2222-2222-2222-222222222222',
        invitee_id: INITIAL_FRIENDS[1].id,
        invitee_profile: INITIAL_FRIENDS[1],
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const INITIAL_TIMELINE: TimelinePost[] = [
  {
    id: 'tp-1',
    event_id: INITIAL_EVENTS[0].id,
    host_id: INITIAL_USER.id,
    host_profile: INITIAL_USER,
    event: INITIAL_EVENTS[0],
    photo_url: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800',
    caption: 'Hakan ile Zeplin Pubda efsane bir stout denedik! Şerefe 🍻',
    visibility: 'public',
    cheers_count: 14,
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
];
