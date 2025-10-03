import { getSupabaseServerClient } from "./supabase";

/** Server helper: require authenticated user */
export async function requireUserServer() {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}


