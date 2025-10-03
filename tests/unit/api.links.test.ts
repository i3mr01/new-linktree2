import { describe, it, expect } from "vitest";
import { SafeLinkSchema, isSafeUrl } from "@/lib/security";

describe("API link validation", () => {
  it("rejects javascript URLs", () => {
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
  });

  it("sanitizes title", () => {
    const parsed = SafeLinkSchema.safeParse({ title: "<b>x</b>", url: "https://x.com" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.title).not.toContain("<b>");
    }
  });
});


