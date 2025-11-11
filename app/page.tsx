import LinkList from "@/components/LinkList";
import { prisma } from "@/lib/prisma";
import type { Link } from "@prisma/client";

// Force dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let links: Link[] = [];
  
  try {
    links = await prisma.link.findMany({ 
      where: { isActive: true }, 
      orderBy: { order: "asc" } 
    });
  } catch (error) {
    // Gracefully handle database connection errors
    console.error("Error fetching links:", error);
    // Continue with empty links array
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
          <div>
            <h1 className="text-xl font-semibold">My Links</h1>
            <p className="text-gray-600">Welcome to my link collection</p>
          </div>
        </div>
        <section className="mb-6">
          <div className="glass p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary" />
              <div>
                <div className="font-medium">Share Preview</div>
                <div className="text-sm text-muted-foreground truncate max-w-xs">My Link Collection</div>
              </div>
            </div>
          </div>
        </section>
        <LinkList links={links} />
        <div className="mt-8 text-center space-x-4">
          <a href="/dashboard" className="text-sm text-blue-600 hover:underline">
            Manage Links →
          </a>
          <span className="text-gray-400">|</span>
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </main>
  );
}


