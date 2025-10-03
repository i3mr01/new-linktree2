"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ProfileHeaderProps = {
  avatarUrl?: string | null;
  username: string;
  name?: string | null;
  bio?: string | null;
  isOwner?: boolean;
  onEdit?: () => void;
  className?: string;
};

export function ProfileHeader({ avatarUrl, username, name, bio, isOwner, onEdit, className }: ProfileHeaderProps) {
  return (
    <header className={cn("w-full", className)} aria-label="Profile header">
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name || username}
            className="h-14 w-14 rounded-full object-cover border border-[hsl(var(--border))]"
            loading="eager"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-[hsl(var(--muted))]" aria-hidden />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold truncate">{name || `@${username}`}</h1>
          <p className="text-sm text-muted-foreground truncate">@{username}</p>
        </div>
        {isOwner ? (
          <motion.button
            type="button"
            onClick={onEdit}
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline whitespace-nowrap"
            aria-label="Edit profile"
          >
            Edit
          </motion.button>
        ) : null}
      </div>
      {bio ? (
        <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--foreground))] opacity-90">{bio}</p>
      ) : null}
    </header>
  );
}

export default ProfileHeader;


