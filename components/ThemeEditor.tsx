"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ThemeValues = {
  primary: string;
  secondary: string;
  gradientFrom: string;
  gradientTo: string;
  radius: number;
  baseTextSize: number;
};

export type ThemeEditorProps = {
  initial?: Partial<ThemeValues>;
  onSave?: (values: ThemeValues) => Promise<void> | void;
  className?: string;
};

const defaultValues: ThemeValues = {
  primary: "#2563eb",
  secondary: "#7c3aed",
  gradientFrom: "#2563eb",
  gradientTo: "#7c3aed",
  radius: 16,
  baseTextSize: 16,
};

export default function ThemeEditor({ initial, onSave, className }: ThemeEditorProps) {
  const [values, setValues] = useState<ThemeValues>({ ...defaultValues, ...initial });
  const [saving, setSaving] = useState(false);

  function applyPreview() {
    const root = document.documentElement;
    root.style.setProperty("--primary", hexToHsl(values.primary));
    root.style.setProperty("--secondary", hexToHsl(values.secondary));
    root.style.setProperty("--gradient-from", values.gradientFrom);
    root.style.setProperty("--gradient-to", values.gradientTo);
    root.style.setProperty("--glass-blur", `${Math.max(8, Math.min(24, values.radius))}px`);
    document.body.style.fontSize = `${values.baseTextSize}px`;
  }

  function hexToHsl(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return `${(h * 360).toFixed(0)} ${(s * 100).toFixed(0)}% ${(l * 100).toFixed(0)}%`;
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave?.(values);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className={cn("card p-4 space-y-4", className)} aria-label="Theme editor">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Theme Editor</h2>
        <div className="h-6 w-24 rounded bg-gradient-primary" aria-hidden />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="text-muted-foreground">Primary</span>
          <input type="color" value={values.primary} onChange={(e) => setValues(v => ({ ...v, primary: e.target.value }))} className="block h-10 w-full rounded border border-[hsl(var(--border))]" aria-label="Primary color" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Secondary</span>
          <input type="color" value={values.secondary} onChange={(e) => setValues(v => ({ ...v, secondary: e.target.value }))} className="block h-10 w-full rounded border border-[hsl(var(--border))]" aria-label="Secondary color" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Gradient From</span>
          <input type="color" value={values.gradientFrom} onChange={(e) => setValues(v => ({ ...v, gradientFrom: e.target.value }))} className="block h-10 w-full rounded border border-[hsl(var(--border))]" aria-label="Gradient from color" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Gradient To</span>
          <input type="color" value={values.gradientTo} onChange={(e) => setValues(v => ({ ...v, gradientTo: e.target.value }))} className="block h-10 w-full rounded border border-[hsl(var(--border))]" aria-label="Gradient to color" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Base Text Size</span>
          <input type="range" min={14} max={20} value={values.baseTextSize} onChange={(e) => setValues(v => ({ ...v, baseTextSize: Number(e.target.value) }))} className="w-full" aria-valuemin={14} aria-valuemax={20} aria-label="Base text size" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Radius</span>
          <input type="range" min={8} max={28} value={values.radius} onChange={(e) => setValues(v => ({ ...v, radius: Number(e.target.value) }))} className="w-full" aria-valuemin={8} aria-valuemax={28} aria-label="Border radius" />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <motion.button className="btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={applyPreview} aria-label="Preview theme">
          Preview
        </motion.button>
        <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={saving} aria-label="Save theme">
          {saving ? "Saving..." : "Save"}
        </motion.button>
      </div>
    </section>
  );
}


