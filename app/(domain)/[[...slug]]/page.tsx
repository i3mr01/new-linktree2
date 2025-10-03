import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

export default async function DomainRouter() {
  const h = headers();
  const host = h.get("host") || "";
  const isDefault = process.env.NEXT_PUBLIC_APP_URL?.includes(host);

  if (isDefault) {
    redirect("/");
  }

  const domain = await prisma.domain.findUnique({ where: { domain: host }, include: { user: true } });
  if (!domain || domain.status !== "VERIFIED") return notFound();

  // Fetch links and render same as profile page
  const user = await prisma.user.findUnique({ where: { id: domain.userId }, include: { links: { where: { isActive: true }, orderBy: { order: "asc" } } } });
  if (!user) return notFound();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          {user.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt={user.username} className="h-12 w-12 rounded-full object-cover" />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200" />)
          }
          <div>
            <h1 className="text-xl font-semibold">@{user.username}</h1>
            {user.name && <p className="text-gray-600">{user.name}</p>}
          </div>
        </div>
        <ul className="space-y-3">
          {user.links.map((l) => (
            <li key={l.id}>
              <a className="block w-full text-center px-4 py-3 rounded border hover:bg-gray-50" href={`/api/links/${l.id}/click`}>
                {l.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}


