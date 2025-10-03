import { z } from "zod";

export const SafeLinkSchema = z.object({
  title: z.string().min(1).max(120).transform(sanitizeText),
  url: z.string().url().refine((u) => isSafeUrl(u), { message: "Invalid or potentially unsafe URL" }),
  description: z.string().max(200).optional().transform((v) => (v ? sanitizeText(v) : v)),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  visibleFrom: z.string().datetime().optional(),
  visibleTo: z.string().datetime().optional(),
});

export function sanitizeText(input: string) {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isSafeUrl(url: string) {
  try {
    const u = new URL(url);
    if (["javascript:", "data:", "vbscript:"].includes(u.protocol)) return false;
    return true;
  } catch {
    return false;
  }
}

export const DOMAIN_BLACKLIST = [
  "malware.com",
  "phishing.test",
];

export function isBlacklisted(url: string) {
  try {
    const u = new URL(url);
    return DOMAIN_BLACKLIST.some((d) => u.hostname.endsWith(d));
  } catch {
    return true;
  }
}


