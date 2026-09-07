import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fetchDownloadsTotal } from "@/lib/site-stats";

// wayfinding index — mirrors the numbered chapters in <AppChapters />.
// clicking an entry scrolls to that app's full section below.
const index = [
  { n: "01", name: "BetterU", tag: "Social fitness", slug: "betteru" },
  { n: "02", name: "Snapshot", tag: "Photo-tag game", slug: "snapshot" },
  { n: "03", name: "CogTrack", tag: "Mind training", slug: "cogtrack" },
  { n: "04", name: "Terrarium", tag: "Desktop app", slug: "terrarium" },
];

export async function Hero() {
  const downloads = await fetchDownloadsTotal();

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

          {downloads ? (
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground animate-fade-in stagger-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>
                <strong className="font-semibold text-foreground tabular-nums">
                  {downloads.toLocaleString()}
                </strong>{" "}
                downloads across our apps
              </span>
            </p>
          ) : null}
        </div>

        {/* table of contents — number + app, jumps to the section below */}
        <nav
          aria-label="Our apps"
          className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border animate-fade-in stagger-3"
        >
          {index.map((app) => (
            <Link
              key={app.slug}
              href={`/#${app.slug}`}
              className="group flex items-center gap-4 bg-background px-5 py-5 transition-colors hover:bg-secondary"
            >
              <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-primary/40 tabular-nums group-hover:text-primary">
                {app.n}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-bold text-foreground">
                  {app.name}
                </span>
                <span className="block text-[13px] text-muted-foreground truncate">
                  {app.tag}
                </span>
              </span>
              <ArrowRight
                size={15}
                className="ml-auto shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-primary"
              />
            </Link>
          ))}
        </nav>

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
