import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient>;

export async function getSupabaseClient() {
  if (!supabaseClient) {
    const response = await fetch('/api/supabase-config');
    const { supabaseUrl, supabaseAnonKey } = await response.json();
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}
