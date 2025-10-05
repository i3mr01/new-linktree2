import { createBrowserClient } from "@supabase/ssr";

/**
 * Client-side Supabase client
 * Safe to use in client components
 */
export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
