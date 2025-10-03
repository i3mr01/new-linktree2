"use client";

type LinkItem = {
  id: string;
  title: string;
  url: string;
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
      {links.map((l) => (
        <li key={l.id}>
          <button
            className="w-full text-center px-4 py-3 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors"
            onClick={() => handleClick(l.id, l.url)}
          >
            {l.title}
          </button>
        </li>
      ))}
    </ul>
  );
}


