import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isBlacklisted, SafeLinkSchema } from "@/lib/security";
import { getCurrentUser } from "@/lib/auth";

const CreateLinkSchema = SafeLinkSchema;

export async function GET() {
  // No authentication required - get all links
  const links = await prisma.link.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ links });
}

export async function POST(request: Request) {
  // Require authentication for creating links
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = CreateLinkSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const newLink = await prisma.link.create({
    data: {
      title: parsed.data.title,
      url: parsed.data.url,
      order: parsed.data.order ?? 0,
      isActive: parsed.data.isActive ?? true,
      flagged: isBlacklisted(parsed.data.url),
      flaggedReason: isBlacklisted(parsed.data.url) ? "Domain blacklisted" : null,
    },
  });

  return NextResponse.json({ link: newLink }, { status: 201 });
}


