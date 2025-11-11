import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isBlacklisted, SafeLinkSchema } from "@/lib/security";
import { getCurrentUser } from "@/lib/auth";

const CreateLinkSchema = SafeLinkSchema;

export async function GET() {
  // No authentication required - get all links (for backward compatibility)
  // In production, this might be removed or restricted
  const links = await prisma.link.findMany({ 
    where: { isActive: true },
    orderBy: { order: "asc" } 
  });
  return NextResponse.json({ links });
}

export async function POST(request: Request) {
  // Require authentication for creating links
  const firebaseUser = await getCurrentUser();
  if (!firebaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get or create user
  let user = await prisma.user.findUnique({
    where: { firebaseId: firebaseUser.uid },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        firebaseId: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || null,
        avatar: firebaseUser.photoURL || null,
      },
    });
  }

  const json = await request.json();
  const parsed = CreateLinkSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const newLink = await prisma.link.create({
    data: {
      userId: user.id,
      title: parsed.data.title,
      url: parsed.data.url,
      description: parsed.data.description || null,
      order: parsed.data.order ?? 0,
      isActive: parsed.data.isActive ?? true,
      flagged: isBlacklisted(parsed.data.url),
      flaggedReason: isBlacklisted(parsed.data.url) ? "Domain blacklisted" : null,
    },
  });

  return NextResponse.json({ link: newLink }, { status: 201 });
}


