-- Seed Profiles
INSERT INTO public.profiles (user_id, username, full_name, avatar_url, phone, bio, birth_date, is_age_verified, visibility_default)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'serkan', 'Serkan Kaya', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '+905551112233', 'Craft bira & Kadıköy pub kaşifi 🍻', '1994-06-15', true, 'public'),
  ('22222222-2222-2222-2222-222222222222', 'hakan', 'Hakan Yılmaz', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '+905554445566', 'IPA ve stout tutkunu.', '1992-03-20', true, 'public'),
  ('33333333-3333-3333-3333-333333333333', 'ayse', 'Ayşe Demir', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', '+905557778899', 'Haftasonu chill buluşmaları.', '1996-09-10', true, 'public'),
  ('44444444-4444-4444-4444-444444444444', 'mert', 'Mert Öztürk', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', '+905550001122', 'Pint & chats.', '1995-11-25', true, 'public')
ON CONFLICT (user_id) DO NOTHING;

-- Seed Friendships
INSERT INTO public.friendships (user_a, user_b, status)
VALUES
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'accepted'),
  ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'accepted'),
  ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'accepted')
ON CONFLICT DO NOTHING;

-- Seed Venues (PostGIS points: Longitude, Latitude)
INSERT INTO public.venues (id, name, address, city, country, category, location, rating, image_url, source)
VALUES
  ('a1111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Belfast Irish Pub', 'Caferağa Mah. Dr. Esat Işık Cad. No:28 Kadıköy', 'İstanbul', 'Turkey', 'pub', ST_SetSRID(ST_MakePoint(29.0267, 40.9882), 4326), 4.8, 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600', 'fsq_os_places'),
  ('a2222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'The Populist Bomontiada', 'Merkez Mah. Silahşör Cad. No:1 Şişli', 'İstanbul', 'Turkey', 'craft_beer', ST_SetSRID(ST_MakePoint(28.9814, 41.0583), 4326), 4.9, 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600', 'fsq_os_places'),
  ('a3333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'United Pub Beşiktaş', 'Sinanpaşa Mah. Şair Nedim Cad. No:18 Beşiktaş', 'İstanbul', 'Turkey', 'pub', ST_SetSRID(ST_MakePoint(29.0069, 41.0428), 4326), 4.7, 'https://images.unsplash.com/photo-1538488881522-4328fb77821c?w=600', 'fsq_os_places'),
  ('a4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Zeplin Pub & Delicatessen', 'Moda Cad. No:70 Kadıköy', 'İstanbul', 'Turkey', 'craft_beer', ST_SetSRID(ST_MakePoint(29.0289, 40.9856), 4326), 4.8, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600', 'fsq_os_places')
ON CONFLICT DO NOTHING;

-- Seed Completed Event with Proof Photo
INSERT INTO public.events (id, slug, title, description, host_id, venue_id, scheduled_at, status, visibility, proof_photo_url, proof_thumbnail_url, is_gps_verified, check_in_latitude, check_in_longitude)
VALUES
  ('e1111111-1111-1111-1111-111111111111', 'kadikoy-craft-bira-gecesi-e1111', 'Kadıköy Craft Bira Gecesi', 'Haftasonu öncesi Zeplin Pubda craft bira tadımı ve sohbet.', '11111111-1111-1111-1111-111111111111', 'a4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW() - INTERVAL '2 days', 'completed', 'public', 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800', 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=300', true, 40.9856, 29.0289)
ON CONFLICT DO NOTHING;

-- Seed Active/Upcoming Event
INSERT INTO public.events (id, slug, title, description, host_id, venue_id, scheduled_at, status, visibility)
VALUES
  ('e2222222-2222-2222-2222-222222222222', 'cuma-aksami-populist-bulusmasi-e2222', 'Cuma Akşamı Populist Buluşması', 'İş çıkışı soğuk IPA eşliğinde sohbet.', '11111111-1111-1111-1111-111111111111', 'a2222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NOW() + INTERVAL '4 hours', 'confirmed', 'public')
ON CONFLICT DO NOTHING;

-- Seed Invites
INSERT INTO public.invites (event_id, invitee_id, status)
VALUES
  ('e1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'accepted'),
  ('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'accepted'),
  ('e2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'pending')
ON CONFLICT DO NOTHING;

-- Seed Timeline Post
INSERT INTO public.timeline_posts (event_id, host_id, photo_url, thumbnail_url, caption, visibility, cheers_count)
VALUES
  ('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800', 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=300', 'Hakan ile Zeplin Pubda efsane bir stout denedik! Şerefe 🍻', 'public', 14)
ON CONFLICT DO NOTHING;

-- Seed Invite Link (WhatsApp)
INSERT INTO public.invite_links (token, event_id, created_by, expires_at)
VALUES
  ('beer-tok-98f2a', 'e2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', NOW() + INTERVAL '30 days')
ON CONFLICT DO NOTHING;
