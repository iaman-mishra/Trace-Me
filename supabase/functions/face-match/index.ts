
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
    // Using ANON KEY directly instead of extracting from Authorization header
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiY212bGhzZGJqaml4Z3Fod2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjUyODUsImV4cCI6MjA2MjA0MTI4NX0.m-c3W2zhrZcrCbse6fx8NN2KzNcmdQTvTWPl2W65dHM";
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get all missing persons from the database
    const { data: missingPersons, error } = await supabase
      .from('missing_persons')
      .select('id, name, age, gender, photo_url, last_seen_date, last_seen_location, status, description')
      .eq('status', 'missing');

    if (error) {
      console.error('Error fetching missing persons:', error);
      throw error;
    }

    console.log(`Found ${missingPersons?.length || 0} missing persons in database`);

    // In a real implementation, we would use ML models for face comparison
    // For this demo, we'll simulate finding matches with a random probability

    // Get 0-2 random potential matches
    const matchCount = Math.floor(Math.random() * 3); // 0, 1, or 2 matches
    const matches = [];
    
    if (matchCount > 0 && missingPersons && missingPersons.length > 0) {
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

    console.log(`Returning ${matches.length} potential matches for the uploaded image`);

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
