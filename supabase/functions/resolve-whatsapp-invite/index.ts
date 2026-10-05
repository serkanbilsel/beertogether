// Supabase Edge Function: resolve-whatsapp-invite
// Resolves WhatsApp token, deferred deep link handling, and app link landing

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
    const { token, userId } = await req.json();
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: inviteLink, error } = await supabase
      .from('invite_links')
      .select(`
        id,
        token,
        event_id,
        expires_at,
        used_by,
        events (
          id,
          title,
          scheduled_at,
          status,
          visibility,
          venues (name, address, category),
          profiles:host_id (username, full_name, avatar_url)
        )
      `)
      .eq('token', token)
      .single();

    if (error || !inviteLink) {
      return new Response(JSON.stringify({ error: 'Invite link not found or expired' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      });
    }

    if (new Date(inviteLink.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'This invite link has expired' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 410
      });
    }

    // If userId provided and not in used_by, record interaction
    if (userId && !inviteLink.used_by.includes(userId)) {
      await supabase
        .from('invite_links')
        .update({ used_by: [...inviteLink.used_by, userId] })
        .eq('id', inviteLink.id);
    }

    return new Response(JSON.stringify({
      success: true,
      event: inviteLink.events,
      token: inviteLink.token,
      deepLinkUrl: `beertogether://invite/${token}`
    }), {
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
