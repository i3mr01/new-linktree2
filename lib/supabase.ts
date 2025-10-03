import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

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
  const headerStore = headers();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
    headers: {
      get(key: string) {
        return headerStore.get(key) ?? undefined;
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}


