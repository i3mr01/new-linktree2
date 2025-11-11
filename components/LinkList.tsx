"use client";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
};

export default function LinkList({ links }: { links: LinkItem[] }) {
  async function handleClick(id: string, to: string) {
    try {
      await fetch(`/api/links/${id}/click`, { method: "POST" });
    } catch {
      // ignore
    } finally {
      window.location.href = to;
    }
  }

  return (
    <ul className="space-y-3">
      {links.length === 0 ? (
        <li className="text-center text-gray-500 py-8">No links available yet</li>
      ) : (
        links.map((l) => (
          <li key={l.id}>
            <button
              className="w-full text-left px-4 py-3 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors bg-white shadow-sm"
              onClick={() => handleClick(l.id, l.url)}
            >
              <div className="font-medium">{l.title}</div>
              {l.description && (
                <div className="text-sm text-gray-600 mt-1">{l.description}</div>
              )}
            </button>
          </li>
        ))
      )}
    </ul>
  );
}


