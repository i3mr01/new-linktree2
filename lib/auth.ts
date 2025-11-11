import { cookies } from "next/headers";

/**
 * Get the current user's ID token from cookies (server-side)
 */
export async function getServerAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  return token?.value || null;
}

/**
 * Verify Firebase ID token on the server
 */
export async function verifyAuthToken(token: string): Promise<{ uid: string; email: string | null } | null> {
  try {
    const { adminAuth } = await import("@/lib/firebase/admin");
    if (!adminAuth) {
      console.error("Firebase Admin not initialized");
      return null;
    }
    const decodedToken = await adminAuth.verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

/**
 * Get the current authenticated user (server-side)
 */
export async function getCurrentUser(): Promise<{ uid: string; email: string | null } | null> {
  const token = await getServerAuthToken();
  if (!token) return null;
  return verifyAuthToken(token);
}

