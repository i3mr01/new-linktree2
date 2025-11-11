import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// Get current user's profile
export async function GET() {
  const firebaseUser = await getCurrentUser();
  if (!firebaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { firebaseId: firebaseUser.uid },
    include: { links: { orderBy: { order: "asc" } } },
  });

  if (!user) {
    // Create user if doesn't exist
    const newUser = await prisma.user.create({
      data: {
        firebaseId: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || null,
        avatar: firebaseUser.photoURL || null,
      },
    });
    return NextResponse.json({ user: newUser, links: [] });
  }

  return NextResponse.json({ user, links: user.links });
}

// Update user profile
export async function PATCH(request: Request) {
  const firebaseUser = await getCurrentUser();
  if (!firebaseUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  let { username } = json;
  const { displayName, bio, avatar, template, theme } = json;

  // Validate and normalize username
  if (username !== undefined && username !== null) {
    const normalizedUsername = username.trim().toLowerCase();
    
    // Validate username format (alphanumeric, dashes, underscores, 3-30 chars)
    if (normalizedUsername && !/^[a-z0-9_-]{3,30}$/.test(normalizedUsername)) {
      return NextResponse.json({ 
        error: "Username must be 3-30 characters and contain only letters, numbers, dashes, and underscores" 
      }, { status: 400 });
    }
    
    // Check if username is taken (if provided and different)
    if (normalizedUsername) {
      const existingUser = await prisma.user.findUnique({
        where: { username: normalizedUsername },
      });
      if (existingUser && existingUser.firebaseId !== firebaseUser.uid) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
    }
    
    // Use normalized username
    username = normalizedUsername || null;
  }

  const user = await prisma.user.update({
    where: { firebaseId: firebaseUser.uid },
    data: {
      ...(username !== undefined && { username }),
      ...(displayName !== undefined && { displayName }),
      ...(bio !== undefined && { bio }),
      ...(avatar !== undefined && { avatar }),
      ...(template !== undefined && { template }),
      ...(theme !== undefined && { theme }),
    },
  });

  return NextResponse.json({ user });
}

