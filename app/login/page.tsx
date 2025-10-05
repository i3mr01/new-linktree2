"use client";

import { FormEvent, useState, useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase-client";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only initialize Supabase on the client side
    try {
      setSupabase(getSupabaseBrowserClient());
    } catch {
      setError("Failed to initialize authentication. Please check your configuration.");
    }
  }, []);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication not initialized. Please refresh the page.");
      return;
    }
    setMessage(null);
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    setLoading(false);
    if (error) setError(error.message);
    else setMessage("Check your email for the sign-in link.");
  }

  async function signInWithProvider(provider: "github" | "google") {
    if (!supabase) {
      setError("Authentication not initialized. Please refresh the page.");
      return;
    }
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}/dashboard` } });
    if (error) setError(error.message);
  }

  if (!supabase) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="card w-full max-w-md p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Loading...</h1>
            <p className="text-sm text-muted-foreground">Initializing authentication...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground">Use a magic link or OAuth provider.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-sm mb-1">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="you@example.com"
            />
          </label>
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </form>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-[hsl(var(--border))]" /> or <div className="h-px flex-1 bg-[hsl(var(--border))]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="btn-outline" onClick={() => signInWithProvider("github")}>GitHub</button>
          <button className="btn-outline" onClick={() => signInWithProvider("google")}>Google</button>
        </div>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </main>
  );
}


