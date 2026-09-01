import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  Crosshair,
  Brain,
  Users,
  Flame,
  Trophy,
  Target,
  Camera,
  Vote,
  ClipboardCheck,
  Timer,
  LineChart,
} from "lucide-react";

type Aspect = { Icon: typeof Users; label: string };

type App = {
  name: string;
  tagline: string;
  description: string;
  aspects: Aspect[];
  href: string;
  cta: string;
  status: string;
  live: boolean;
  Icon: typeof Dumbbell;
  accent: string;
  tint: string; // translucent accent for the icon tile
};

const apps: App[] = [
  {
    name: "BetterU Social Fitness",
    tagline: "Get fit together",
    description:
      "Bring your friends, set goals, and turn showing up into the thing you compete on.",
    aspects: [
      { Icon: Users, label: "Work out with your friends" },
      { Icon: Flame, label: "Keep your streak alive" },
      { Icon: Trophy, label: "Weekly group challenges" },
    ],
    href: "/betteru",
    cta: "Explore BetterU",
    status: "On the App Store",
    live: true,
    Icon: Dumbbell,
    accent: "#0a8043",
    tint: "rgba(10,128,67,0.12)",
  },
  {
    name: "Snapshot",
    tagline: "Catch them in the act",
    description:
      "Everyone gets a secret target and a task. Catch them on camera before someone catches you.",
    aspects: [
      { Icon: Target, label: "Get a target and a task" },
      { Icon: Camera, label: "Snap the proof" },
      { Icon: Vote, label: "Blind group vote, then punishment" },
    ],
    href: "/snapshot",
    cta: "See how Snapshot works",
    status: "On the App Store",
    live: true,
    Icon: Crosshair,
    accent: "#166534",
    tint: "rgba(22,101,52,0.12)",
  },
  {
    name: "CogTrack",
    tagline: "Your mind, measured daily",
    description:
      "A quick daily check-in and five science-backed tests turn minutes into clear trends over time.",
    aspects: [
      { Icon: ClipboardCheck, label: "60-second daily check-in" },
      { Icon: Timer, label: "Five cognitive tests" },
      { Icon: LineChart, label: "Trends vs. your age group" },
    ],
    href: "/cogtrack",
    cta: "Preview CogTrack",
    status: "Coming soon",
    live: false,
    Icon: Brain,
    accent: "#7c6cf0",
    tint: "rgba(124,108,240,0.14)",
  },
];

export function AppsCarousel() {
  return (
    <section id="apps" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Our apps</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 text-balance">
            Three apps, one mission
          </h2>
          <span className="brand-rule brand-rule-center mb-5" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Every app helps people connect, compete and improve — here&apos;s what each one actually
            does.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {apps.map((app, i) => {
            const { Icon } = app;
            return (
              <article
                key={app.name}
                className="group flex flex-col bg-card border border-border border-t-[3px] rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(16,19,15,0.35)] animate-fade-in"
                style={{ borderTopColor: app.accent, animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-[3.25rem] h-[3.25rem] shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: app.tint, color: app.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full border"
                    style={
                      app.live
                        ? { color: app.accent, borderColor: app.accent, background: app.tint }
                        : {
                            color: "var(--color-muted-foreground)",
                            borderColor: "var(--color-border)",
                            background: "var(--color-secondary)",
                          }
                    }
                  >
                    {app.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground">{app.name}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: app.accent }}>
                  {app.tagline}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{app.description}</p>

                <ul className="space-y-2.5 mb-7">
                  {app.aspects.map(({ Icon: AspectIcon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <span
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: app.tint, color: app.accent }}
                      >
                        <AspectIcon className="w-3.5 h-3.5" />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>

                <Link
                  href={app.href}
                  className="mt-auto inline-flex items-center justify-center gap-2 text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm transition-transform group-hover:gap-3"
                  style={{ background: app.accent }}
                >
                  {app.cta}
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
