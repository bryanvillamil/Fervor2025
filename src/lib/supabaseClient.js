import { createClient } from '@supabase/supabase-js';

let supabaseClient = null;

export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.env.DEV) {
      console.warn('Supabase: faltan PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY en el entorno.');
    }
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}