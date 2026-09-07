import Link from "next/link";
import { ArrowRight, ArrowUpRight, Dumbbell, Crosshair, Brain, AppWindow } from "lucide-react";

type App = {
  name: string;
  sub: string;
  status: string;
  href: string;
  external?: boolean;
  bg: string;
  accent: string;
  soft: string;
  ring?: string;
  Icon: typeof Dumbbell;
};

const apps: App[] = [
  {
    name: "BetterU",
    sub: "Social fitness",
    status: "On iOS",
    href: "https://betteruai.com",
    external: true,
    bg: "#0a8043",
    accent: "#ffffff",
    soft: "rgba(255,255,255,0.78)",
    Icon: Dumbbell,
  },
  {
    name: "Snapshot",
    sub: "Photo-tag game",
    status: "On iOS",
    href: "/snapshot",
    bg: "#0b0d10",
    accent: "#22c55e",
    soft: "rgba(255,255,255,0.62)",
    ring: "rgba(255,255,255,0.09)",
    Icon: Crosshair,
  },
  {
    name: "CogTrack",
    sub: "Mind training",
    status: "Soon",
    href: "/cogtrack",
    bg: "#241049",
    accent: "#c9b8ff",
    soft: "rgba(255,255,255,0.68)",
    Icon: Brain,
  },
  {
    name: "Terrarium",
    sub: "Desktop app",
    status: "Soon",
    href: "/Terrarium",
    bg: "#0e1117",
    accent: "#8990f4",
    soft: "rgba(255,255,255,0.62)",
    ring: "rgba(137,144,244,0.28)",
    Icon: AppWindow,
  },
];

function AppCard({ app }: { app: App }) {
  const { Icon } = app;

  const inner = (
    <>
      <Icon
        className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 md:h-36 md:w-36"
        style={{ color: app.accent, opacity: 0.09 }}
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{ background: "rgba(255,255,255,0.12)", color: app.accent }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span
            className="whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]"
            style={{ background: "rgba(255,255,255,0.12)", color: app.soft }}
          >
            {app.status}
          </span>
        </div>

        <div className="mt-auto pt-7 sm:pt-10">
          <div className="font-display text-2xl font-extrabold leading-none tracking-[-0.02em] text-white md:text-[1.7rem]">
            {app.name}
          </div>
          <div className="mt-1.5 text-sm" style={{ color: app.soft }}>
            {app.sub}
          </div>
          <div
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: app.accent }}
          >
            Open
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </>
  );

  const className =
    "group relative flex w-[244px] shrink-0 flex-col overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(16,19,15,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary sm:w-[292px] sm:p-6 sm:min-h-[340px] min-h-[236px]";

  const style: React.CSSProperties = {
    background: app.bg,
    boxShadow: app.ring ? `inset 0 0 0 1px ${app.ring}` : undefined,
  };

  return app.external ? (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${app.name}`}
      className={className}
      style={style}
    >
      {inner}
    </a>
  ) : (
    <Link href={app.href} aria-label={`Open ${app.name}`} className={className} style={style}>
      {inner}
    </Link>
  );
}

export function Hero() {
  // duplicated once so the shelf loops seamlessly (translateX -50%)
  const loop = [...apps, ...apps];

  return (
    <section className="relative bg-background pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5 animate-fade-in">
            <span className="brand-rule" />
            <span className="text-accent text-xs font-semibold tracking-[0.16em] uppercase">
              Get better, together
            </span>
          </div>
          <h1 className="font-display font-extrabold text-foreground leading-[1.0] tracking-[-0.035em] text-[clamp(2.6rem,7vw,4.25rem)] animate-fade-in stagger-1">
            Our apps.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in stagger-2">
            Social apps for doing things with your friends. Tap the one you&apos;re after.
          </p>
        </div>
      </div>

      {/* never-ending, edge-to-edge glide */}
      <div className="app-shelf-wrap mt-9 md:mt-12 animate-fade-in stagger-3">
        <div className="app-shelf">
          {loop.map((app, i) => (
            <AppCard key={`${app.name}-${i}`} app={app} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm animate-fade-in stagger-4">
          <Link
            href="/#apps"
            className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors"
          >
            See what each one does
            <ArrowRight size={15} />
          </Link>
          <a
            href="https://betteruai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            betteruai.com
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
