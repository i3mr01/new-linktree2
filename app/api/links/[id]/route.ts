import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isBlacklisted, sanitizeText } from "@/lib/security";
import { getCurrentUser } from "@/lib/auth";

const UpdateLinkSchema = z.object({
  title: z.string().min(1).max(120).optional().transform((v) => (v ? sanitizeText(v) : v)),
  url: z.string().url().optional(),
  description: z.string().max(200).optional().nullable().transform((v) => (v ? sanitizeText(v) : v)),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  visibleFrom: z.string().datetime().optional().nullable(),
  visibleTo: z.string().datetime().optional().nullable(),
});

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  // Require authentication for updating links
  const firebaseUser = await getCurrentUser();
  if (!firebaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { firebaseId: firebaseUser.uid },
  });
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const json = await request.json();
  const parsed = UpdateLinkSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Verify ownership
  if (link.userId !== dbUser.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data: Partial<z.infer<typeof UpdateLinkSchema>> & { 
    flagged?: boolean; 
    flaggedReason?: string | null;
    visibleFrom?: Date | null;
    visibleTo?: Date | null;
  } = { ...parsed.data };
  
  if (parsed.data.url) {
    data.flagged = isBlacklisted(parsed.data.url);
    data.flaggedReason = data.flagged ? "Domain blacklisted" : null;
  }
  
  // Convert datetime strings to Date objects
  if (parsed.data.visibleFrom !== undefined) {
    data.visibleFrom = parsed.data.visibleFrom ? new Date(parsed.data.visibleFrom) : null;
  }
  if (parsed.data.visibleTo !== undefined) {
    data.visibleTo = parsed.data.visibleTo ? new Date(parsed.data.visibleTo) : null;
  }
  
  const updated = await prisma.link.update({ where: { id: params.id }, data });
  return NextResponse.json({ link: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  // Require authentication for deleting links
  const firebaseUser = await getCurrentUser();
  if (!firebaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: { firebaseId: firebaseUser.uid },
  });
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Verify ownership
  if (link.userId !== dbUser.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.clickAnalytics.deleteMany({ where: { linkId: params.id } });
  await prisma.link.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


