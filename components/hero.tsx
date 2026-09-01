import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center pt-32 pb-24 overflow-hidden"
      style={{ background: "var(--brand-hero)" }}
    >
      {/* flat decorative shapes — no blur, no glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-white/[0.06]" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 w-[42rem] h-[42rem] rounded-full bg-black/[0.04]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center">
          <span className="brand-rule brand-rule-center mb-7 animate-fade-in" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-[#fdba74] rounded-full" />
            <span className="text-primary-foreground/85 text-sm">Building the future of social apps</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in stagger-1 text-balance">
            Get better,
            <span className="block text-[#fdba74]">together.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in stagger-2 text-pretty">
            BetterU LLC builds social apps around one idea: people improve faster with their friends
            in it with them. Fitness, friendly competition, and progress you can actually see.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3">
            <Link
              href="/#apps"
              className="flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-foreground/90 transition-colors group"
            >
              Explore our apps
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://betteruai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-transparent border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary-foreground/10 transition-colors group"
            >
              Visit betteruai.com
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in stagger-4">
            {[
              { n: "3", l: "Apps built" },
              { n: "3", l: "Founders" },
              { n: "1", l: "Mission" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground font-display">{s.n}</div>
                <div className="text-primary-foreground/60 text-sm mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
