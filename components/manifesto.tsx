"use client";

import { useRef } from "react";
import { span, useScrollProgress } from "@/components/use-scroll-progress";

// Reads itself to you: each word lights up as it scrolls past.
const TEXT =
  "We make apps for doing things with your friends. Because people get better faster when someone is in it with them: keeping score, keeping streaks, keeping each other honest.";
const HIGHLIGHT = new Set(["friends.", "better", "score,", "streaks,", "honest."]);

const THROUGH = [
  { n: "01", title: "Better with friends", body: "Every app is built for a group, not a solo grind." },
  { n: "02", title: "Progress you can see", body: "Streaks, scores, trends, leagues. If it matters, it's measured." },
  { n: "03", title: "A little competition", body: "Nothing mean. Just enough scoreboard to make showing up a game." },
];

export function Manifesto() {
  const outer = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = TEXT.split(" ");

  useScrollProgress(outer, (p) => {
    const lit = span(p, 0.08, 0.7) * words.length;
    wordsRef.current.forEach((el, i) => {
      if (!el) return;
      const o = Math.max(0, Math.min(1, lit - i));
      el.style.opacity = String(0.14 + o * 0.86);
    });
  });

  return (
    <section ref={outer} className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-[100svh] flex flex-col justify-center max-w-6xl mx-auto px-5 md:px-8">
        <span className="brand-rule mb-7" />
        <p className="font-display font-extrabold tracking-[-0.03em] leading-[1.08] text-[clamp(1.75rem,4.6vw,3.9rem)] text-white">
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className={HIGHLIGHT.has(w) ? "text-gradient-static" : undefined}
              style={{ opacity: 0.14 }}
            >
              {w}{" "}
            </span>
          ))}
        </p>
        <div className="mt-8 md:mt-14 grid sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
          {THROUGH.map((t) => (
            <div key={t.n} className="border-t border-white/15 pt-3 sm:pt-4">
              <span className="font-mono text-xs text-[#f97316]">{t.n}</span>
              <h3 className="mt-1 font-display font-bold text-white">{t.title}</h3>
              <p className="hidden sm:block mt-1 text-sm text-white/55 leading-snug">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
