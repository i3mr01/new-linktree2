import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // No authentication required - allow all requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/links/:id/click"],
};


