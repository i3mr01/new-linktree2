import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isBlacklisted, sanitizeText } from "@/lib/security";
import { getCurrentUser } from "@/lib/auth";

const UpdateLinkSchema = z.object({
  title: z.string().min(1).max(120).optional().transform((v) => (v ? sanitizeText(v) : v)),
  url: z.string().url().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  // Require authentication for updating links
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const data: Partial<z.infer<typeof UpdateLinkSchema>> & { flagged?: boolean; flaggedReason?: string | null } = { ...parsed.data };
  if (parsed.data.url) {
    data.flagged = isBlacklisted(parsed.data.url);
    data.flaggedReason = data.flagged ? "Domain blacklisted" : null;
  }
  const updated = await prisma.link.update({ where: { id: params.id }, data });
  return NextResponse.json({ link: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  // Require authentication for deleting links
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.clickAnalytics.deleteMany({ where: { linkId: params.id } });
  await prisma.link.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


