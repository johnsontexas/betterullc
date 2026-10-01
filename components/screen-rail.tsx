"use client";

import { useRef } from "react";
import { span, useScrollProgress } from "@/components/use-scroll-progress";

/*
  A row of real app screens that slides sideways as you scroll past it.
*/
export function ScreenRail({
  shots,
  label,
  accent,
}: {
  shots: { src: string; alt: string }[];
  label: string;
  accent: string;
}) {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useScrollProgress(
    outer,
    (p) => {
      const t = track.current;
      const o = outer.current;
      if (!t || !o) return;
      const overflow = Math.max(0, t.scrollWidth - o.clientWidth);
      t.style.transform = `translate3d(${-span(p, 0.12, 0.88) * overflow}px,0,0)`;
    },
    "through",
  );

  return (
    <section ref={outer} className="relative py-16 md:py-24 pb-24 md:pb-32 overflow-hidden" aria-label={label}>
      <p
        className="px-6 md:px-12 mb-8 text-[12px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: accent, fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
      >
        {label}
      </p>
      <div>
        <div ref={track} className="flex gap-4 md:gap-6 px-6 md:px-12 w-max will-change-transform">
          {shots.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading="lazy"
              draggable={false}
              className="w-[46vw] sm:w-[30vw] md:w-[250px] h-auto rounded-[26px] border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
              style={{ transform: `translateY(${i % 2 ? 28 : 0}px)` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
