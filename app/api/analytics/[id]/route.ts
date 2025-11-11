import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [total, byDay, topReferrers, topDevices] = await Promise.all([
    prisma.clickAnalytics.count({ where: { linkId: link.id, createdAt: { gte: since } } }),
    prisma.$queryRawUnsafe(
      `SELECT to_char(date_trunc('day', "createdAt"),'YYYY-MM-DD') as day, count(*)::int as count
       FROM "ClickAnalytics"
       WHERE "linkId" = $1 AND "createdAt" >= $2
       GROUP BY 1
       ORDER BY 1`,
      link.id,
      since
    ),
    prisma.$queryRawUnsafe(
      `SELECT coalesce("referrer", 'direct') as referrer, count(*)::int as count
       FROM "ClickAnalytics"
       WHERE "linkId" = $1 AND "createdAt" >= $2
       GROUP BY 1
       ORDER BY 2 DESC
       LIMIT 5`,
      link.id,
      since
    ),
    prisma.$queryRawUnsafe(
      `SELECT
         CASE
           WHEN "userAgent" ILIKE '%mobile%' THEN 'Mobile'
           WHEN "userAgent" ILIKE '%tablet%' THEN 'Tablet'
           ELSE 'Desktop'
         END as device,
         count(*)::int as count
       FROM "ClickAnalytics"
       WHERE "linkId" = $1 AND "createdAt" >= $2
       GROUP BY 1
       ORDER BY 2 DESC`,
      link.id,
      since
    )
  ]);

  return NextResponse.json(
    { total, days: byDay, topReferrers, topDevices },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}


