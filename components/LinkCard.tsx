"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type LinkCardProps = {
  title: string;
  href: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
  ctaText?: string;
  disabled?: boolean;
  visibleFrom?: Date | string | null;
  visibleTo?: Date | string | null;
  onClick?: () => void;
  className?: string;
};

function isScheduledVisible(visibleFrom?: Date | string | null, visibleTo?: Date | string | null) {
  const now = new Date();
  const from = visibleFrom ? new Date(visibleFrom) : null;
  const to = visibleTo ? new Date(visibleTo) : null;
  if (from && now < from) return false;
  if (to && now > to) return false;
  return true;
}

export function LinkCard({ title, href, description, iconUrl, imageUrl, ctaText = "Open", disabled, visibleFrom, visibleTo, onClick, className }: LinkCardProps) {
  const scheduledVisible = isScheduledVisible(visibleFrom, visibleTo);
  const isDisabled = disabled || !scheduledVisible;

  return (
    <motion.div
      className={cn("card p-4", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        {iconUrl || imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconUrl || imageUrl!} alt="" className="h-10 w-10 rounded-xl object-cover" aria-hidden />
        ) : (
          <div className="h-10 w-10 rounded-xl bg-gradient-primary" aria-hidden />
        )}
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{title}</div>
          {description ? <div className="text-sm text-muted-foreground truncate">{description}</div> : null}
        </div>
        <motion.a
          href={isDisabled ? undefined : href}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            onClick?.();
          }}
          className={cn(
            "btn-primary",
            isDisabled && "opacity-50 pointer-events-none"
          )}
          aria-disabled={isDisabled}
          role="button"
        >
          {ctaText}
        </motion.a>
      </div>
      {!scheduledVisible ? (
        <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">Not currently visible</p>
      ) : null}
    </motion.div>
  );
}

export default LinkCard;


