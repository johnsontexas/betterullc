"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { AppInfo } from "@/lib/apps";
import { span, useScrollProgress } from "@/components/use-scroll-progress";
import { Reveal } from "@/components/reveal";
import { Toy } from "@/components/toys";
import { SocialLinks } from "@/components/social-links";

/*
  One app's chapter. The section is tall; inside it a full-screen stage stays
  pinned while scrolling drives a 3-D coverflow of the app's real screens.
  Whatever screen is in front, its caption is the one lit up on the left.
*/

// hold still for a moment at each end of the pinned run
const PAD = 0.06;

export function AppWorld({
  app,
  nextBg,
}: {
  app: AppInfo;
  nextBg: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const n = app.shots.length;
  const desktop = app.device === "desktop";

  useScrollProgress(outer, (p) => {
    const a = span(p, PAD, 1 - PAD) * (n - 1);
    if (bar.current) bar.current.style.transform = `scaleX(${span(p, PAD, 1 - PAD)})`;
    const first = cards.current[0];
    const cw = first ? first.offsetWidth : 260;
    const narrow = window.innerWidth < 768;
    const gap = cw * (desktop ? (narrow ? 0.42 : 0.5) : narrow ? 0.5 : 0.6);

    cards.current.forEach((el, i) => {
      if (!el) return;
      const o = i - a;
      const ao = Math.abs(o);
      const side = Math.max(-1, Math.min(1, o));
      const x = o * gap;
      const z = -ao * (desktop ? 140 : 110);
      const ry = -side * (desktop ? 22 : 30);
      const lift = ao < 0.5 ? (0.5 - ao) * -24 : 0;
      el.style.transform = `translate3d(${x}px, ${lift}px, ${z}px) rotateY(${ry}deg)`;
      // on desktop the copy sits to the left, so screens behind it bow out sooner
      const behindCopy = o < 0 && !narrow;
      const fadeFrom = behindCopy ? 0.6 : 1.6;
      el.style.opacity = String(Math.max(0, 1 - Math.max(0, ao - fadeFrom) * (behindCopy ? 1.4 : 1)));
      el.style.zIndex = String(100 - Math.round(ao * 10));
      const shade = el.lastElementChild as HTMLElement | null;
      if (shade) shade.style.opacity = String(Math.min(ao, 2) * 0.25);
    });

    const idx = Math.round(a);
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  });

  // tap a screen (or a caption) → scroll to where that screen is in front
  const goTo = (i: number) => {
    const el = outer.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    const p = PAD + (i / (n - 1)) * (1 - 2 * PAD);
    window.scrollTo({ top: top + p * run + 2, behavior: "smooth" });
  };

  const shot = app.shots[active] ?? app.shots[0];
  const accent = { color: app.color };

  return (
    <section
      id={app.id}
      className="app-world relative scroll-mt-0"
      style={{ background: app.bg, ["--app" as string]: app.color, ["--app2" as string]: app.color2 }}
    >
      <div
        ref={outer}
        className="relative"
        // ~a third of a screen of scrolling per screenshot
        style={{ height: `${100 + (n - 1) * (desktop ? 38 : 30)}vh` }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="world-wash" aria-hidden />
          <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-24 pb-6 md:pb-10 grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 md:gap-10 items-center">
            {/* copy */}
            <div className="relative z-10 min-w-0">
              <div className="flex items-center gap-3 text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase">
                <span className="font-mono" style={accent}>
                  {app.n}
                </span>
                <span className="h-px w-8 bg-white/25" />
                <span className="text-white/55">{app.status}</span>
              </div>
              <h2 className="mt-3 md:mt-4 font-display font-extrabold text-white leading-[0.95] tracking-[-0.035em] text-[clamp(2.1rem,6.2vw,4.6rem)]">
                {app.name}
              </h2>
              <p className="hidden md:block mt-5 text-white/65 text-lg max-w-md leading-relaxed">
                {app.line}
              </p>

              {/* captions: all listed on desktop, just the live one on phones */}
              <ol className="hidden md:block mt-8 space-y-1 max-w-md">
                {app.shots.map((s, i) => (
                  <li key={s.src}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className="group w-full text-left flex gap-4 py-2.5 border-t border-white/10"
                      aria-current={i === active ? "step" : undefined}
                    >
                      <span
                        className="font-mono text-xs pt-1 transition-colors"
                        style={{ color: i === active ? app.color : "rgba(255,255,255,0.3)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-display font-bold transition-colors ${
                            i === active ? "text-white" : "text-white/40 group-hover:text-white/70"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className="step-body block text-[14px] text-white/60 leading-snug"
                          data-open={i === active}
                        >
                          <span className="block pt-1">{s.body}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div key={active} className="md:hidden mt-3 min-h-[4.6rem] caption-swap">
                <p className="font-display font-bold text-white text-lg leading-tight">
                  <span className="font-mono text-xs mr-2" style={accent}>
                    {String(active + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}
                  </span>
                  {shot.title}
                </p>
                <p className="mt-1 text-white/60 text-[14px] leading-snug">{shot.body}</p>
              </div>

              <div className="mt-4 md:mt-8 flex items-center gap-3 md:gap-4">
                <AppCta app={app} />
                <SocialLinks social={app.social} name={app.name} color={app.color} />
                <div className="hidden md:block flex-1 max-w-[140px] h-[3px] rounded-full bg-white/10 overflow-hidden">
                  <div ref={bar} className="h-full origin-left" style={{ background: app.color, transform: "scaleX(0)" }} />
                </div>
              </div>
            </div>

            {/* coverflow */}
            <div className="deck relative h-full min-h-0 flex items-center justify-center">
              {app.shots.map((s, i) => (
                <button
                  key={s.src}
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show: ${s.title}`}
                  className={`deck-card absolute ${desktop ? "deck-card--desktop" : "deck-card--phone"}`}
                  style={i === 0 ? undefined : { opacity: 0 }}
                >
                  {desktop && (
                    <span className="win-bar" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} loading={i < 2 ? "eager" : "lazy"} draggable={false} />
                  <span className="deck-shade" aria-hidden />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* the toy */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pb-24 md:pb-32 pt-6">
        <Reveal>
          <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-14 items-center">
            <div>
              <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase" style={accent}>
                Try a tiny piece of it
              </p>
              <h3 className="mt-3 font-display font-extrabold text-white text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.02] tracking-[-0.03em]">
                {app.toy.title}
              </h3>
              <p className="mt-3 text-white/60 max-w-sm">{app.line}</p>
            </div>
            <Toy id={app.id} color={app.color} color2={app.color2} hint={app.toy.hint} />
          </div>
        </Reveal>
      </div>
      {/* melt into the next world instead of a hard edge */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-24 md:h-32"
        style={{ background: `linear-gradient(to bottom, transparent, ${nextBg})` }}
        aria-hidden
      />
    </section>
  );
}

function AppCta({ app }: { app: AppInfo }) {
  const cls =
    "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-[gap,transform] hover:gap-3 active:scale-[0.97]";
  if (app.external) {
    return (
      <a href={app.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {app.cta}
        <ArrowUpRight size={16} />
      </a>
    );
  }
  return (
    <Link href={app.href} className={cls}>
      {app.cta}
      <ArrowRight size={16} />
    </Link>
  );
}
