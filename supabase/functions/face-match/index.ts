
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = 'https://cbcmvlhsdbjjixgqhwhs.supabase.co';
    const supabaseKey = req.headers.get('Authorization')?.split(' ')[1] || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Decode base64 image for AI processing
    const imageBuffer = Uint8Array.from(atob(imageBase64.split(',')[1]), c => c.charCodeAt(0));

    // Get all missing persons from the database
    const { data: missingPersons, error } = await supabase
      .from('missing_persons')
      .select('id, name, age, gender, photo_url, last_seen_date, last_seen_location, status')
      .eq('status', 'missing');

    if (error) {
      throw error;
    }

    // In a real implementation, we would use ML models for face comparison
    // For this demo, we'll simulate finding matches with a random probability

    // Get 0-2 random potential matches
    const matchCount = Math.floor(Math.random() * 3); // 0, 1, or 2 matches
    const matches = [];
    
    if (matchCount > 0 && missingPersons.length > 0) {
      // Shuffle the array to get random matches
      const shuffled = [...missingPersons].sort(() => 0.5 - Math.random());
      
      // Take the first matchCount elements
      for (let i = 0; i < Math.min(matchCount, shuffled.length); i++) {
        matches.push({
          ...shuffled[i],
          confidence: Math.floor(Math.random() * 30) + 70 // Random confidence between 70-99%
        });
      }
      
      // Sort by confidence
      matches.sort((a, b) => b.confidence - a.confidence);
    }

    console.log(`Found ${matches.length} potential matches for the uploaded image`);

    return new Response(
      JSON.stringify({ matches }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing face match:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
