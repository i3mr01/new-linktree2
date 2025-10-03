import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import LinkList from "@/components/LinkList";

export const revalidate = 60;

type PageProps = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { username: params.username } });
  if (!user) return {};
  const title = user.name ? `${user.name} (@${user.username}) • Linkflow` : `@${user.username} • Linkflow`;
  const description = `Explore ${user.name || user.username}'s links on Linkflow.`;
  const ogImage = user.imageUrl || `${process.env.NEXT_PUBLIC_APP_URL}/api/og?u=${encodeURIComponent(user.username)}`;
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/${user.username}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage }],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: { links: { where: { isActive: true }, orderBy: { order: "asc" } } },
  });

  if (!user) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: user.name || user.username,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/${user.username}`,
    image: user.imageUrl,
    alternateName: `@${user.username}`,
    sameAs: [] as string[],
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
        <section className="mb-6">
          <div className="glass p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary" />
              <div>
                <div className="font-medium">Share Preview</div>
                <div className="text-sm text-muted-foreground truncate max-w-xs">{user.name || `@${user.username}`}</div>
              </div>
            </div>
          </div>
        </section>
        <LinkList links={user.links} />
      </div>
    </main>
  );
}


