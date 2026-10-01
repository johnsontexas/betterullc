"use client";

import { useEffect, type RefObject } from "react";

/**
 * Scroll progress through a tall "pinned" section, 0 → 1.
 * 0 = section top hits the viewport top, 1 = section bottom hits the viewport bottom.
 *
 * Runs outside React: `onFrame` is called at most once per animation frame, so
 * callers write styles straight to the DOM instead of re-rendering.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onFrame: (p: number) => void,
  /** "pin": through a tall pinned section. "through": from entering the bottom to leaving the top. */
  mode: "pin" | "through" = "pin",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let last = -1;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === "through") {
        p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      } else {
        const run = rect.height - vh;
        p = run > 0 ? Math.min(1, Math.max(0, -rect.top / run)) : 0;
      }
      if (p !== last) {
        last = p;
        onFrame(p);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // onFrame is intentionally read once; callers pass a stable closure over refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode]);
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Maps p from [a, b] onto [0, 1]. */
export const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
