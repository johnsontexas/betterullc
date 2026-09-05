"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Card = {
  name: string;
  tag: string;
  bg: string;
  href: string;
  external?: boolean;
  shot: string;
};

const cards: Card[] = [
  {
    name: "BetterU Social Fitness",
    tag: "Social fitness",
    bg: "#070d0d",
    href: "https://betteruai.com",
    external: true,
    shot: "/screenshots/betteru.jpeg",
  },
  {
    name: "Snapshot",
    tag: "Photo tag game",
    bg: "#0b0d10",
    href: "/snapshot",
    shot: "/screenshots/snapshot.png",
  },
  {
    name: "CogTrack",
    tag: "Mind training",
    bg: "#241049",
    href: "/cogtrack",
    shot: "/screenshots/cogtrack.jpg",
  },
];

// position 0 = front, 1 = middle, 2 = back
const POSE = [
  { x: 0, y: 0, scale: 1, rot: 0, z: 30, opacity: 1 },
  { x: 40, y: 26, scale: 0.92, rot: 6, z: 20, opacity: 0.82 },
  { x: 78, y: 54, scale: 0.84, rot: 12, z: 10, opacity: 0.5 },
];

const INTERVAL = 3200;

function CardFace({ card }: { card: Card }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.shot}
          alt={`${card.name} app screenshot`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
          draggable={false}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/80 to-transparent">
        <span className="block text-white font-display font-bold text-[15px] leading-tight">
          {card.name}
        </span>
        <span className="block text-white/60 text-[10px] font-semibold tracking-[0.14em] uppercase mt-1">
          {card.tag}
        </span>
      </div>
    </>
  );
}

export function AppDeck() {
  const [top, setTop] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => setTop((t) => (t + 1) % cards.length), []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    timer.current = setInterval(advance, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [advance, paused]);

  return (
    <div
      className="relative h-[380px] sm:h-[440px] hidden md:block animate-fade-in stagger-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[210px] h-[420px]">
          {cards.map((card, i) => {
            const pos = (i - top + cards.length) % cards.length;
            const p = POSE[pos];

            const cls =
              "absolute inset-0 rounded-[26px] overflow-hidden border border-black/10 shadow-[0_28px_70px_-34px_rgba(16,19,15,0.6)] cursor-pointer transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
            const style: React.CSSProperties = {
              background: card.bg,
              transform: `translate(${p.x}px, ${p.y}px) scale(${p.scale}) rotate(${p.rot}deg)`,
              zIndex: p.z,
              opacity: p.opacity,
            };

            return card.external ? (
              <a
                key={card.name}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${card.name}`}
                className={cls}
                style={style}
              >
                <CardFace card={card} />
              </a>
            ) : (
              <Link
                key={card.name}
                href={card.href}
                aria-label={`Open ${card.name}`}
                className={cls}
                style={style}
              >
                <CardFace card={card} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
