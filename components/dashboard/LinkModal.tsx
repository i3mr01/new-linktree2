"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LinkModalProps = {
  open: boolean;
  initial?: {
    id?: string;
    title?: string;
    url?: string;
    description?: string | null;
    visibleFrom?: string | null;
    visibleTo?: string | null;
  };
  onClose: () => void;
  onSave: (payload: { id?: string; title: string; url: string; description?: string | null; visibleFrom?: string | null; visibleTo?: string | null; }) => Promise<void> | void;
};

export default function LinkModal({ open, initial, onClose, onSave }: LinkModalProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [url, setUrl] = useState(initial?.url || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [visibleFrom, setVisibleFrom] = useState(initial?.visibleFrom || "");
  const [visibleTo, setVisibleTo] = useState(initial?.visibleTo || "");
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || "");
      setUrl(initial?.url || "");
      setDescription(initial?.description || "");
      setVisibleFrom(initial?.visibleFrom || "");
      setVisibleTo(initial?.visibleTo || "");
    }
  }, [open, initial]);

  async function handleSave() {
    await onSave({ id: initial?.id, title, url, description: description || null, visibleFrom: visibleFrom || null, visibleTo: visibleTo || null });
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
          <motion.div className="card w-full max-w-lg p-4 relative z-10" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} role="dialog" aria-modal="true" aria-label={isEdit ? "Edit link" : "Add link"}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{isEdit ? "Edit link" : "Add link"}</h3>
              <button className="btn-outline px-2" onClick={onClose} aria-label="Close">✕</button>
            </div>
            <div className="grid gap-3">
              <label className="text-sm">
                <span className="text-muted-foreground">Title</span>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2" placeholder="My link" />
              </label>
              <label className="text-sm">
                <span className="text-muted-foreground">URL</span>
                <input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2" placeholder="https://example.com" />
              </label>
              <label className="text-sm">
                <span className="text-muted-foreground">Description (optional)</span>
                <input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2" placeholder="Short description" />
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm">
                  <span className="text-muted-foreground">Visible from</span>
                  <input type="datetime-local" value={visibleFrom} onChange={(e) => setVisibleFrom(e.target.value)} className="mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2" />
                </label>
                <label className="text-sm">
                  <span className="text-muted-foreground">Visible to</span>
                  <input type="datetime-local" value={visibleTo} onChange={(e) => setVisibleTo(e.target.value)} className="mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2" />
                </label>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button className="btn-outline" onClick={onClose}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{isEdit ? "Save" : "Add"}</button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


