import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase";
import { isBlacklisted, SafeLinkSchema } from "@/lib/security";

const CreateLinkSchema = SafeLinkSchema;

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || user.id;
  if (userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const links = await prisma.link.findMany({ where: { userId }, orderBy: { order: "asc" } });
  return NextResponse.json({ links });
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
      order: parsed.data.order ?? 0,
      isActive: parsed.data.isActive ?? true,
      flagged: isBlacklisted(parsed.data.url),
      flaggedReason: isBlacklisted(parsed.data.url) ? "Domain blacklisted" : null,
    },
  });

  return NextResponse.json({ link: newLink }, { status: 201 });
}


