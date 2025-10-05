import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client
 * Uses service role key for privileged server actions (never expose to client).
 * Place keys in `.env.local`:
 * - NEXT_PUBLIC_SUPABASE_URL=...
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY=...
 * - SUPABASE_SERVICE_ROLE_KEY=... (server-only)
 */
export function getSupabaseServerClient() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  // Validate URL format
  if (!supabaseUrl.startsWith('https://') || supabaseUrl === 'https://placeholder.supabase.co') {
    throw new Error('Invalid Supabase URL. Please set NEXT_PUBLIC_SUPABASE_URL in your environment variables.');
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
}

/**
 * Browser Supabase client (anon key only)
 * Place keys in `.env.local`:
 * - NEXT_PUBLIC_SUPABASE_URL=...
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY=...
 */
export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}


