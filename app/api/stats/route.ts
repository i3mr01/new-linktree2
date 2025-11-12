import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get stats in parallel
    const [totalUsers, totalLinks, totalClicks, usersToday, linksToday, clicksToday] = await Promise.all([
      prisma.user.count(),
      prisma.link.count({ where: { isActive: true } }),
      prisma.clickAnalytics.count(),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.link.count({ where: { createdAt: { gte: today }, isActive: true } }),
      prisma.clickAnalytics.count({ where: { createdAt: { gte: today } } }),
    ]);

    // Calculate average rating (we'll use a simple calculation based on engagement)
    // For now, we'll use a fixed 4.9/5 rating, but you could calculate this based on actual metrics
    const averageRating = 4.9;

    return NextResponse.json(
      {
        totalUsers,
        totalLinks,
        totalClicks,
        usersToday,
        linksToday,
        clicksToday,
        averageRating,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

