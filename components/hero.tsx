import { ArrowRight, Smartphone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      {/* Decorative Line Pattern */}
      <div className="absolute left-8 top-1/3 w-24 h-64 line-pattern opacity-50 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary border border-border px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-muted-foreground text-sm">Building the future of social apps</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in stagger-1 text-balance">
            Transform Your
            <span className="block text-primary">Potential</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in stagger-2 text-pretty">
            BetterU LLC creates innovative social apps that bring people together through 
            fitness, competition, and connection. Experience the next generation of social interaction.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3">
            <a
              href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 group"
            >
              <Smartphone size={20} />
              Download BetterU
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://betteruai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-transparent border border-border text-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-secondary transition-all hover:border-muted group"
            >
              Visit betteruai.com
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in stagger-4">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">2</div>
              <div className="text-muted-foreground text-sm mt-1">Apps Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">3</div>
              <div className="text-muted-foreground text-sm mt-1">Founders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">1</div>
              <div className="text-muted-foreground text-sm mt-1">Mission</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
