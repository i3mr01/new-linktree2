import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isBlacklisted, sanitizeText } from "@/lib/security";
import { getSupabaseServerClient } from "@/lib/supabase";

const UpdateLinkSchema = z.object({
  title: z.string().min(1).max(120).optional().transform((v) => (v ? sanitizeText(v) : v)),
  url: z.string().url().optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json();
  const parsed = UpdateLinkSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link || link.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data: any = { ...parsed.data };
  if (parsed.data.url) {
    data.flagged = isBlacklisted(parsed.data.url);
    data.flaggedReason = data.flagged ? "Domain blacklisted" : null;
  }
  const updated = await prisma.link.update({ where: { id: params.id }, data });
  return NextResponse.json({ link: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const link = await prisma.link.findUnique({ where: { id: params.id } });
  if (!link || link.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.clickAnalytics.deleteMany({ where: { linkId: params.id } });
  await prisma.link.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


