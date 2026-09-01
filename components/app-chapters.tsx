import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

type Chapter = {
  n: string;
  kicker: string;
  name: string;
  line: string;
  points: string[];
  href: string;
  cta: string;
  bg: string;
  accent: string;
  muted: string;
  ghost: string;
  art: "rings" | "reticle" | "bars";
};

const chapters: Chapter[] = [
  {
    n: "01",
    kicker: "Social fitness · On the App Store",
    name: "BetterU Social Fitness",
    line: "Bring your friends, set goals, and turn just showing up into the thing you compete on.",
    points: ["Work out with your friends", "Keep your streak alive", "Weekly group challenges"],
    href: "/betteru",
    cta: "Explore BetterU",
    bg: "#0a8043",
    accent: "#ffd8a8",
    muted: "rgba(255,255,255,0.74)",
    ghost: "rgba(255,255,255,0.16)",
    art: "rings",
  },
  {
    n: "02",
    kicker: "Photo tag game · On the App Store",
    name: "Snapshot",
    line: "Everyone gets a secret target and a task. Catch them on camera before someone catches you.",
    points: [
      "Get a target and a task",
      "Snap the proof",
      "Blind group vote, then a punishment for last place",
    ],
    href: "/snapshot",
    cta: "See how it works",
    bg: "#0b0d10",
    accent: "#22c55e",
    muted: "rgba(255,255,255,0.66)",
    ghost: "rgba(255,255,255,0.08)",
    art: "reticle",
  },
  {
    n: "03",
    kicker: "Mind training · Coming soon",
    name: "CogTrack",
    line: "A 60-second daily check-in and five science-backed tests turn minutes into clear trends over time.",
    points: [
      "Daily check-in for streak, sleep and mood",
      "Five cognitive tests",
      "Trends vs. your age group",
    ],
    href: "/cogtrack",
    cta: "Preview CogTrack",
    bg: "#241049",
    accent: "#c9b8ff",
    muted: "rgba(255,255,255,0.7)",
    ghost: "rgba(255,255,255,0.10)",
    art: "bars",
  },
];

function Art({ kind, accent }: { kind: Chapter["art"]; accent: string }) {
  if (kind === "rings") {
    return (
      <svg viewBox="0 0 240 240" className="w-full max-w-[340px]" role="img" aria-label="Activity rings">
        {[92, 66, 40].map((r, i) => (
          <circle
            key={r}
            cx="120"
            cy="120"
            r={r}
            fill="none"
            stroke={i === 1 ? accent : "rgba(255,255,255,0.9)"}
            strokeOpacity={i === 0 ? 0.9 : i === 1 ? 1 : 0.55}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * r * (0.62 + i * 0.12)} ${2 * Math.PI * r}`}
            transform="rotate(-90 120 120)"
          />
        ))}
      </svg>
    );
  }
  if (kind === "reticle") {
    return (
      <svg viewBox="0 0 240 240" className="w-full max-w-[340px]" role="img" aria-label="Camera reticle">
        <rect x="34" y="34" width="172" height="172" rx="10" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="3" transform="rotate(-6 120 120)" />
        {[
          [34, 34, 1, 1],
          [206, 34, -1, 1],
          [34, 206, 1, -1],
          [206, 206, -1, -1],
        ].map(([x, y, sx, sy], i) => (
          <path
            key={i}
            d={`M ${x} ${y + sy * 30} L ${x} ${y} L ${x + sx * 30} ${y}`}
            fill="none"
            stroke={accent}
            strokeWidth="5"
            strokeLinecap="round"
            transform="rotate(-6 120 120)"
          />
        ))}
        <circle cx="120" cy="120" r="24" fill="none" stroke={accent} strokeWidth="5" />
        <line x1="120" y1="78" x2="120" y2="102" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <line x1="120" y1="138" x2="120" y2="162" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <line x1="78" y1="120" x2="102" y2="120" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <line x1="138" y1="120" x2="162" y2="120" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }
  // bars
  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[340px]" role="img" aria-label="Rising trend">
      {[52, 92, 74, 132, 168].map((h, i) => (
        <rect
          key={i}
          x={20 + i * 44}
          y={200 - h}
          width="28"
          height={h}
          rx="6"
          fill="rgba(255,255,255,0.9)"
          fillOpacity={0.35 + i * 0.14}
        />
      ))}
      <polyline
        points="34,150 78,120 122,132 166,74 210,44"
        fill="none"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 12"
      />
      {[
        [34, 150],
        [78, 120],
        [122, 132],
        [166, 74],
        [210, 44],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={accent} />
      ))}
    </svg>
  );
}

export function AppChapters() {
  return (
    <div id="apps" className="scroll-mt-4">
      {chapters.map((c, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={c.name} style={{ background: c.bg, color: "#ffffff" }}>
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
              <div
                className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  flip ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div
                    className="ghost-num -mb-2 md:-mb-4 select-none"
                    style={{ color: c.ghost }}
                    aria-hidden
                  >
                    {c.n}
                  </div>
                  <div
                    className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
                    style={{ color: c.accent }}
                  >
                    {c.kicker}
                  </div>
                  <h2 className="font-display font-extrabold leading-[0.98] tracking-[-0.03em] text-[clamp(2.1rem,4.6vw,3.6rem)]">
                    {c.name}
                  </h2>
                  <p className="mt-5 text-lg md:text-xl max-w-md" style={{ color: c.muted }}>
                    {c.line}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px]">
                        <span
                          className="mt-1.5 w-2.5 h-2.5 rounded-[3px] shrink-0"
                          style={{ background: c.accent }}
                        />
                        <span style={{ color: "rgba(255,255,255,0.92)" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={c.href}
                    className="mt-9 inline-flex items-center gap-2 bg-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-transform hover:gap-3"
                    style={{ color: c.bg }}
                  >
                    {c.cta}
                    <ArrowRight size={17} />
                  </Link>
                </Reveal>

                <Reveal delay={120} className="flex justify-center">
                  <Art kind={c.art} accent={c.accent} />
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
