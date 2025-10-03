import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSupabaseServerClient } from "@/lib/supabase";
import { z } from "zod";

const AddDomainSchema = z.object({
  domain: z.string().min(3).max(255),
});

export async function GET() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const domains = await prisma.domain.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ domains });
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json();
  const parsed = AddDomainSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const token = Math.random().toString(36).slice(2, 10);
  const created = await prisma.domain.create({
    data: {
      userId: user.id,
      domain: parsed.data.domain.toLowerCase(),
      verificationToken: token,
    },
  });
  return NextResponse.json({ domain: created }, { status: 201 });
}


