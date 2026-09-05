import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { AppDeck } from "@/components/app-deck";

export function Hero() {
  return (
    <section className="relative bg-background pt-28 md:pt-36 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="brand-rule" />
              <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
                A social app studio
              </span>
            </div>

            <h1 className="font-display font-extrabold text-foreground text-balance animate-fade-in stagger-1 leading-[0.92] tracking-[-0.035em] text-[clamp(2.9rem,8.5vw,6.25rem)]">
              Get better,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--brand-gradient)" }}
              >
                together.
              </span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in stagger-2 text-pretty">
              We build social apps around one idea: people improve faster with their friends in it
              with them. Fitness, friendly competition, and progress you can actually see.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4 animate-fade-in stagger-3">
              <Link
                href="/#apps"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-7 py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity group"
              >
                Explore our apps
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://betteruai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-7 py-4 rounded-xl font-semibold text-base hover:bg-secondary transition-colors"
              >
                Visit betteruai.com
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in stagger-4">
              <span>
                <span className="text-foreground font-bold font-display text-base">3</span> apps
              </span>
              <span className="w-px h-4 bg-border" />
              <span>
                <span className="text-foreground font-bold font-display text-base">3</span> founders
              </span>
              <span className="w-px h-4 bg-border" />
              <span>
                <span className="text-foreground font-bold font-display text-base">1</span> mission
              </span>
            </div>
          </div>

          {/* App deck */}
          <AppDeck />
        </div>

        <a
          href="#apps"
          className="mt-14 md:mt-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowDown size={16} />
          Meet the three apps
        </a>
      </div>
    </section>
  );
}
