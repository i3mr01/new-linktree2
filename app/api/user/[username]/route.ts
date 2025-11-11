import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { username: string } };

// Get public user profile by username
export async function GET(_request: Request, { params }: Params) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user, links: user.links });
}

