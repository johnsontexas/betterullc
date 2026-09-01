"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Dumbbell, Crosshair, Brain } from "lucide-react";

type App = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  href: string;
  cta: string;
  status?: string;
  Icon: typeof Dumbbell;
  iconClass: string;
};

const apps: App[] = [
  {
    name: "BetterU Social Fitness",
    tagline: "Get fit together",
    description:
      "A social fitness platform that connects you with friends to hit your wellness goals through shared workouts, progress tracking and friendly competition.",
    features: ["Social workouts", "Progress tracking", "Community challenges"],
    href: "/betteru",
    cta: "Explore BetterU",
    status: "On the App Store",
    Icon: Dumbbell,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    name: "Snapshot",
    tagline: "Catch them in the act",
    description:
      "A social game for your friend group. Everyone gets a secret target and a task — catch your target doing it, snap the proof, and don't finish last.",
    features: ["Targets & tasks", "Blind photo voting", "Punishment for last place"],
    href: "/snapshot",
    cta: "See how Snapshot works",
    status: "On the App Store",
    Icon: Crosshair,
    iconClass: "bg-[#166534]/12 text-[#166534]",
  },
  {
    name: "CogTrack",
    tagline: "Your mind, measured daily",
    description:
      "A daily check-in and five science-backed tests turn a few minutes into clear trends for your focus, memory and reaction speed over time.",
    features: ["Daily check-in", "Five cognitive tests", "Trends vs. age norms"],
    href: "/cogtrack",
    cta: "Preview CogTrack",
    status: "Coming soon",
    Icon: Brain,
    iconClass: "bg-[#7c6cf0]/12 text-[#7c6cf0]",
  },
];

export function AppsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(apps.length - 1, i));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const c = el.offsetLeft - track.offsetLeft + el.clientWidth / 2;
          const d = Math.abs(c - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="apps" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">Our Products</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4 text-balance">
            Three apps, one mission
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Everything we build helps people connect, compete and improve. Swipe through what we&apos;re
            working on.
          </p>
        </div>

        <div className="relative">
          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {apps.map((app) => {
              const { Icon } = app;
              return (
                <article
                  key={app.name}
                  className="snap-center shrink-0 w-[86%] sm:w-[70%] lg:w-[60%] xl:w-[52%] mx-auto"
                >
                  <div className="h-full bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${app.iconClass}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      {app.status && (
                        <span className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full border border-border">
                          {app.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">{app.name}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{app.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{app.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {app.features.map((f) => (
                        <span
                          key={f}
                          className="bg-secondary border border-border text-muted-foreground text-sm px-3 py-1.5 rounded-lg"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={app.href}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors group w-fit"
                    >
                      {app.cta}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous app"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-11 h-11 items-center justify-center rounded-full bg-card border border-border text-foreground hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next app"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === apps.length - 1}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-11 h-11 items-center justify-center rounded-full bg-card border border-border text-foreground hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-6">
          {apps.map((app, i) => (
            <button
              key={app.name}
              type="button"
              aria-label={`Go to ${app.name}`}
              aria-current={active === i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
