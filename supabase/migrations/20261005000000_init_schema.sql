-- Enable PostGIS and pg_cron extensions
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- ==============================================================================
-- 1. PROFILES TABLE (Supabase Auth linked)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  birth_date DATE,
  is_age_verified BOOLEAN DEFAULT false,
  visibility_default TEXT NOT NULL DEFAULT 'private' CHECK (visibility_default IN ('public', 'private')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Age 18+ enforcement trigger function (Section 20 Compliance)
CREATE OR REPLACE FUNCTION public.check_user_age_requirement()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.birth_date IS NOT NULL THEN
    IF age(NEW.birth_date) < INTERVAL '18 years' THEN
      RAISE EXCEPTION 'Beer Together requires users to be at least 18 years old.'
        USING ERRCODE = 'check_violation';
    END IF;
    NEW.is_age_verified := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_user_age ON public.profiles;
CREATE TRIGGER trg_check_user_age
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.check_user_age_requirement();

-- ==============================================================================
-- 2. FRIENDSHIPS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  user_b UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_friendship UNIQUE (user_a, user_b),
  CONSTRAINT self_friendship_check CHECK (user_a <> user_b)
);

-- ==============================================================================
-- 3. VENUES TABLE (PostGIS Geography)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('bar', 'pub', 'craft_beer', 'bistro', 'cafe', 'home', 'friends_home')),
  location GEOGRAPHY(Point, 4326) NOT NULL,
  source TEXT NOT NULL DEFAULT 'fsq_os_places' CHECK (source IN ('fsq_os_places', 'user_added', 'curated')),
  rating NUMERIC(2, 1) DEFAULT 4.5,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial GIST index for fast radius search
CREATE INDEX IF NOT EXISTS idx_venues_location ON public.venues USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_venues_category ON public.venues (category);

-- ==============================================================================
-- 4. EVENTS (MEETUPS) TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  host_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
  custom_venue_name TEXT,
  custom_venue_address TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending_invite', 'confirmed', 'in_progress', 'completed', 'declined', 'expired', 'cancelled', 'expired_no_proof'
  )),
  visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('public', 'private')),
  proof_photo_url TEXT,
  proof_thumbnail_url TEXT,
  check_in_at TIMESTAMPTZ,
  check_in_latitude DOUBLE PRECISION,
  check_in_longitude DOUBLE PRECISION,
  is_gps_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_host ON public.events (host_id);
CREATE INDEX IF NOT EXISTS idx_events_scheduled_at ON public.events (scheduled_at);
CREATE INDEX IF NOT EXISTS idx_events_status_visibility ON public.events (status, visibility);

-- ==============================================================================
-- 5. INVITES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  invitee_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_event_invitee UNIQUE (event_id, invitee_id)
);

CREATE INDEX IF NOT EXISTS idx_invites_event ON public.invites (event_id);
CREATE INDEX IF NOT EXISTS idx_invites_invitee ON public.invites (invitee_id);

-- Auto-update event status when invite is accepted
CREATE OR REPLACE FUNCTION public.handle_invite_response()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'accepted' THEN
    UPDATE public.events
    SET status = 'confirmed', updated_at = NOW()
    WHERE id = NEW.event_id AND status IN ('draft', 'pending_invite');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_invite_response ON public.invites;
CREATE TRIGGER trg_invite_response
AFTER UPDATE OF status ON public.invites
FOR EACH ROW EXECUTE FUNCTION public.handle_invite_response();

-- ==============================================================================
-- 6. TIMELINE POSTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.timeline_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('public', 'private')),
  cheers_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_timeline_visibility ON public.timeline_posts (visibility, created_at DESC);

-- ==============================================================================
-- 7. LIVE LOCATIONS TABLE (Realtime + TTL)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.live_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  point GEOGRAPHY(Point, 4326) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT unique_user_event_location UNIQUE (event_id, user_id)
);

-- ==============================================================================
-- 8. INVITE LINKS TABLE (WhatsApp & Deferred Deep Links)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.invite_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 9. DEVICE TOKENS & REPORTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.device_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_device_token UNIQUE (user_id, token)
);

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('user', 'event', 'timeline_post', 'photo')),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.device_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view, user can edit own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Venues: Anyone can view, users can add
CREATE POLICY "Venues viewable by everyone" ON public.venues FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add venues" ON public.venues FOR INSERT TO authenticated WITH CHECK (source = 'user_added');

-- Events: Public completed events viewable by all; private viewable by host/invitees
CREATE POLICY "Public completed events viewable by all" ON public.events FOR SELECT USING (
  visibility = 'public' OR 
  auth.uid() = host_id OR 
  EXISTS (SELECT 1 FROM public.invites WHERE invites.event_id = events.id AND invites.invitee_id = auth.uid())
);
CREATE POLICY "Hosts can insert and update their events" ON public.events FOR ALL USING (auth.uid() = host_id);

-- Invites: Host and invitee can view/update
CREATE POLICY "Participants can view and update invites" ON public.invites FOR ALL USING (
  auth.uid() = invitee_id OR 
  EXISTS (SELECT 1 FROM public.events WHERE events.id = invites.event_id AND events.host_id = auth.uid())
);

-- Timeline: Public posts viewable by all, private by participants
CREATE POLICY "Timeline visibility policy" ON public.timeline_posts FOR SELECT USING (
  visibility = 'public' OR 
  auth.uid() = host_id OR
  EXISTS (SELECT 1 FROM public.invites WHERE invites.event_id = timeline_posts.event_id AND invites.invitee_id = auth.uid())
);
CREATE POLICY "Hosts can create timeline posts" ON public.timeline_posts FOR INSERT WITH CHECK (auth.uid() = host_id);

-- Live locations: Only active event participants
CREATE POLICY "Event participants can see live locations" ON public.live_locations FOR ALL USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM public.events e
    WHERE e.id = live_locations.event_id 
    AND (e.host_id = auth.uid() OR EXISTS (SELECT 1 FROM public.invites i WHERE i.event_id = e.id AND i.invitee_id = auth.uid()))
  )
);

-- ==============================================================================
-- 11. PG_CRON SCHEDULED MAINTENANCE (Section 9 & 11)
-- ==============================================================================
-- Cleanup expired live locations every 5 minutes
-- SELECT cron.schedule('cleanup-expired-locations', '*/5 * * * *', $$DELETE FROM public.live_locations WHERE expires_at < NOW()$$);
-- Cleanup 48h expired pending invites every hour
-- SELECT cron.schedule('expire-pending-invites', '0 * * * *', $$UPDATE public.invites SET status = 'expired' WHERE status = 'pending' AND created_at < NOW() - INTERVAL '48 hours'$$);
