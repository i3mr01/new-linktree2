import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LinkList from "@/components/LinkList";
import Image from "next/image";

type Params = { params: { username: string } };

export const dynamic = 'force-dynamic';

export default async function UserProfilePage({ params }: Params) {
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
    notFound();
  }

  // Filter links based on visibility dates
  const now = new Date();
  const visibleLinks = user.links.filter((link) => {
    if (link.visibleFrom && new Date(link.visibleFrom) > now) return false;
    if (link.visibleTo && new Date(link.visibleTo) < now) return false;
    return true;
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full max-w-md">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          {user.avatar ? (
            <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
              <Image
                src={user.avatar}
                alt={user.displayName || user.username || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4 border-4 border-white shadow-lg flex items-center justify-center text-white text-3xl font-bold">
              {(user.displayName || user.username || user.email)?.[0]?.toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2">{user.displayName || user.username || "Linkflow User"}</h1>
          {user.bio && (
            <p className="text-gray-600 text-center max-w-sm">{user.bio}</p>
          )}
        </div>

        {/* Links */}
        <LinkList links={visibleLinks} />
      </div>
    </main>
  );
}

