import { NextResponse, type NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isDashboard = url.pathname.startsWith("/dashboard");
  const isClickEndpoint = url.pathname.match(/^\/api\/links\/[\w-]+\/click$/);
  if (!isDashboard) return NextResponse.next();

  // Supabase sets auth cookies; we check presence to gate access.
  const hasSession = Boolean(req.cookies.get("sb:token") || req.cookies.get("sb-access-token") || req.cookies.get("supabase-auth-token"));
  if (!hasSession) {
    url.pathname = "/login";
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/links/:id/click"],
};


