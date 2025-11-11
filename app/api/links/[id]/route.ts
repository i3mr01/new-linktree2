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

  // Build update data, converting datetime strings to Date objects
  const updateData: {
    title?: string;
    url?: string;
    description?: string | null;
    order?: number;
    isActive?: boolean;
    flagged?: boolean;
    flaggedReason?: string | null;
    visibleFrom?: Date | null;
    visibleTo?: Date | null;
  } = {};
  
  if (parsed.data.title !== undefined) updateData.title = parsed.data.title;
  if (parsed.data.url !== undefined) {
    updateData.url = parsed.data.url;
    updateData.flagged = isBlacklisted(parsed.data.url);
    updateData.flaggedReason = updateData.flagged ? "Domain blacklisted" : null;
  }
  if (parsed.data.description !== undefined) updateData.description = parsed.data.description;
  if (parsed.data.order !== undefined) updateData.order = parsed.data.order;
  if (parsed.data.isActive !== undefined) updateData.isActive = parsed.data.isActive;
  
  // Convert datetime strings to Date objects
  if (parsed.data.visibleFrom !== undefined) {
    updateData.visibleFrom = parsed.data.visibleFrom ? new Date(parsed.data.visibleFrom) : null;
  }
  if (parsed.data.visibleTo !== undefined) {
    updateData.visibleTo = parsed.data.visibleTo ? new Date(parsed.data.visibleTo) : null;
  }
  
  const updated = await prisma.link.update({ where: { id: params.id }, data: updateData });
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


