// Supabase Edge Function: send-reminder-notifications
// Triggered every minute by pg_cron to notify users 60 mins before their confirmed beer date

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find confirmed events occurring within the next 55-65 minute window
    const now = new Date();
    const windowStart = new Date(now.getTime() + 55 * 60000).toISOString();
    const windowEnd = new Date(now.getTime() + 65 * 60000).toISOString();

    const { data: upcomingEvents, error: eventsError } = await supabase
      .from('events')
      .select(`
        id,
        title,
        scheduled_at,
        host_id,
        venues (name),
        invites (invitee_id, status)
      `)
      .eq('status', 'confirmed')
      .gte('scheduled_at', windowStart)
      .lte('scheduled_at', windowEnd);

    if (eventsError) throw eventsError;

    const pushPayloads = [];

    for (const event of upcomingEvents || []) {
      const participantIds = [
        event.host_id,
        ...(event.invites || [])
          .filter((inv: any) => inv.status === 'accepted')
          .map((inv: any) => inv.invitee_id)
      ];

      // Fetch push tokens for participants
      const { data: tokens } = await supabase
        .from('device_tokens')
        .select('token')
        .in('user_id', participantIds);

      const venueName = event.venues?.name || 'Seçilen mekan';

      for (const t of tokens || []) {
        pushPayloads.push({
          to: t.token,
          sound: 'default',
          title: '🍻 1 Saat Kaldı: Bira Buluşması!',
          body: `"${event.title}" randevun 1 saat sonra ${venueName} mekanında başlıyor.`,
          data: { eventId: event.id }
        });
      }
    }

    // Send to Expo Push Service
    if (pushPayloads.length > 0) {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pushPayloads)
      });
    }

    return new Response(JSON.stringify({ success: true, processed: pushPayloads.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
