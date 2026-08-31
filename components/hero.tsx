import { ArrowRight, Smartphone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-24 bg-primary overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary-foreground rounded-full" />
            <span className="text-primary-foreground/80 text-sm">Building the future of social apps</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in stagger-1 text-balance">
            Transform Your
            <span className="block text-[#8fd6a3]">Potential</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in stagger-2 text-pretty">
            BetterU LLC creates innovative social apps that bring people together through
            fitness, competition, and connection. Experience the next generation of social interaction.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3">
            <a
              href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary-foreground/90 transition-colors group"
            >
              <Smartphone size={20} />
              Download BetterU
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
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
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground font-display">3</div>
              <div className="text-primary-foreground/60 text-sm mt-1">Apps Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground font-display">3</div>
              <div className="text-primary-foreground/60 text-sm mt-1">Founders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground font-display">1</div>
              <div className="text-primary-foreground/60 text-sm mt-1">Mission</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
