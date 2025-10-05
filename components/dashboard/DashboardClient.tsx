"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import LinkItem, { type LinkRecord } from "./LinkItem";
import LinkModal from "./LinkModal";
import ThemeEditor from "@/components/ThemeEditor";
import DomainsPanel from "@/components/dashboard/DomainsPanel";
import ProfileHeader from "@/components/ProfileHeader";

function optimisticUpdate<T>(setState: React.Dispatch<React.SetStateAction<T>>, next: (prev: T) => T) {
  setState(next);
}

export default function DashboardClient() {
  const [links, setLinks] = useState<LinkRecord[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<LinkRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/links");
      const data = await res.json();
      setLinks(data.links || []);
      setLoading(false);
    })();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: { active: { id: string }; over: { id: string } | null }) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const prev = links;
    const reordered = arrayMove(prev, oldIndex, newIndex).map((l, idx) => ({ ...l, order: idx }));

    // optimistic update
    optimisticUpdate(setLinks, () => reordered);

    // persist
    fetch(`/api/links/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: newIndex })
    }).then((res) => {
      if (!res.ok) throw new Error("Failed");
    }).catch(() => {
      // rollback
      setLinks(prev);
    });
  }

  async function saveLink(payload: { id?: string; title: string; url: string; description?: string | null; visibleFrom?: string | null; visibleTo?: string | null; }) {
    if (payload.id) {
      const optimistic: LinkRecord[] = links.map((l) => (l.id === payload.id ? { ...l, ...payload } as LinkRecord : l));
      const snapshot = links;
      setLinks(optimistic);
      const res = await fetch(`/api/links/${payload.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) setLinks(snapshot);
    } else {
      const res = await fetch(`/api/links`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const { link } = await res.json();
        setLinks((prev) => [...prev, link]);
      }
    }
    setModalOpen(false);
    setEditItem(null);
  }

  function duplicateLink(id: string) {
    const item = links.find((l) => l.id === id);
    if (!item) return;
    const snapshot = links;
    const tempId = `temp-${Date.now()}`;
    const optimistic = [...links, { ...item, id: tempId, title: `${item.title} (copy)` }];
    setLinks(optimistic);
    fetch(`/api/links`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: `${item.title} (copy)`, url: item.url, description: item.description }) })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        const { link } = await r.json();
        setLinks((prev) => prev.map((l) => (l.id === tempId ? link : l)));
      })
      .catch(() => setLinks(snapshot));
  }

  function disableLink(id: string, next: boolean) {
    const snapshot = links;
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, isActive: next } : l)));
    fetch(`/api/links/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: next }) })
      .then((r) => { if (!r.ok) throw new Error(); })
      .catch(() => setLinks(snapshot));
  }

  function scheduleLink(id: string) {
    const item = links.find((l) => l.id === id);
    if (!item) return;
    setEditItem(item);
    setModalOpen(true);
  }

  return (
    <main className="container py-6 grid lg:grid-cols-[320px,1fr] gap-6">
      <aside className="space-y-4">
        <ProfileHeader username="me" name="My Name" bio="Short bio here" isOwner onEdit={() => setModalOpen(true)} />
        <ThemeEditor onSave={async (vals) => { await fetch("/api/settings/theme", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(vals) }); }} />
        <DomainsPanel />
        <a className="btn-outline w-full text-center" href="/[username]" target="_blank" rel="noreferrer">Preview public page</a>
      </aside>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Your Links</h1>
          <button className="btn-primary" onClick={() => { setEditItem(null); setModalOpen(true); }}>Add link</button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3">
                {links.map((link) => (
                  <LinkItem
                    key={link.id}
                    link={link}
                    onDuplicate={duplicateLink}
                    onDisable={disableLink}
                    onSchedule={scheduleLink}
                    onAnalytics={(id) => { window.location.href = `/dashboard/analytics/${id}`; }}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </section>

      <LinkModal
        open={modalOpen}
        initial={editItem || undefined}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={saveLink}
      />
    </main>
  );
}


