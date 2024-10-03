import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient>;
// Commented out original implementation
// export async function getSupabaseClient() {
//   if (!supabaseClient) {
//     const response = await fetch('/api/supabase-config');
//     const { supabaseUrl, supabaseAnonKey } = await response.json();
//     supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
//   }
//   return supabaseClient;
// }

// New implementation using environment variables
export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is missing in environment variables');
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}
