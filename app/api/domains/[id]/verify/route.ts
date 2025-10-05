import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dns from "node:dns/promises";
import { getSupabaseServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const record = await prisma.domain.findUnique({ where: { id: params.id } });
  if (!record || record.userId !== user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const txts = await dns.resolveTxt(record.domain);
    const flat = txts.flat().map((t) => t.toString());
    const expected = `linkflow-verification=${record.verificationToken}`;
    const verified = flat.some((v) => v.includes(expected));
    if (!verified) return NextResponse.json({ verified: false, expected }, { status: 200 });
    const updated = await prisma.domain.update({ where: { id: record.id }, data: { status: "VERIFIED", verifiedAt: new Date() } });
    return NextResponse.json({ verified: true, domain: updated });
  } catch {
    return NextResponse.json({ verified: false, error: "DNS lookup failed" }, { status: 200 });
  }
}


