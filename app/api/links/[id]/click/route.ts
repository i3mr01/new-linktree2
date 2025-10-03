import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Params = { params: { id: string } };

async function lookupCountry(ip?: string) {
  try {
    if (!ip) return undefined;
    const res = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN || ""}`);
    if (!res.ok) return undefined;
    const data = await res.json();
    return (data && (data.country || data.country_name)) || undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  // Rate limit by IP (e.g., 10 req / 10s)
  const limiter = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(10, "10 s") });
  const ipKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.ip || "unknown";
  const { success } = await limiter.limit(`click:${ipKey}`);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link || !link.isActive) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.ip || "";
  const referrer = request.headers.get("referer") || undefined;
  const userAgent = request.headers.get("user-agent") || undefined;

  let country: string | undefined = undefined;
  try {
    country = await lookupCountry(ip || undefined);
  } catch {}

  await prisma.clickAnalytics.create({
    data: {
      linkId: link.id,
      ip: ip || undefined,
      country,
      userAgent,
      referrer,
    },
  });

  return NextResponse.json({ ok: true, redirectTo: link.url }, { status: 201 });
}


