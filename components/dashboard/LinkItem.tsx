"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { LinkCard } from "@/components/LinkCard";

export type LinkRecord = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  isActive: boolean;
  flagged?: boolean;
  flaggedReason?: string | null;
  order: number;
  visibleFrom?: string | null;
  visibleTo?: string | null;
};

export default function LinkItem({ link, onDuplicate, onDisable, onSchedule, onAnalytics }: {
  link: LinkRecord;
  onDuplicate: (id: string) => void;
  onDisable: (id: string, next: boolean) => void;
  onSchedule: (id: string) => void;
  onAnalytics: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <li ref={setNodeRef} style={style} {...attributes} className="list-none">
      <motion.div animate={{ scale: isDragging ? 1.02 : 1 }} transition={{ duration: 0.1 }}>
        <div className="flex items-center gap-3">
          <button aria-label="Drag handle" className="btn-outline px-2" {...listeners}>≡</button>
          <div className="flex-1">
            <LinkCard
              title={link.title}
              href={link.url}
              description={link.description || undefined}
              disabled={!link.isActive}
              visibleFrom={link.visibleFrom}
              visibleTo={link.visibleTo}
            />
          </div>
          <div className="flex items-center gap-2">
            {link.flagged ? (
              <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded" title={link.flaggedReason || "Flagged"}>Flagged</span>
            ) : null}
            <button className="btn-outline" onClick={() => onDuplicate(link.id)} aria-label="Duplicate">Duplicate</button>
            <button className="btn-outline" onClick={() => onSchedule(link.id)} aria-label="Schedule">Schedule</button>
            <button className="btn-outline" onClick={() => onDisable(link.id, !link.isActive)} aria-label={link.isActive ? "Disable" : "Enable"}>{link.isActive ? "Disable" : "Enable"}</button>
            <button className="btn-outline" onClick={() => onAnalytics(link.id)} aria-label="Analytics">Analytics</button>
          </div>
        </div>
      </motion.div>
    </li>
  );
}


