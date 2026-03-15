import { ArrowRight, Dumbbell, Camera, Zap, Users, Trophy, Target } from "lucide-react";
import Link from "next/link";

const products = [
  {
    name: "BetterU Social Fitness",
    tagline: "Transform together",
    description:
      "A social fitness platform that connects you with friends to achieve your wellness goals through community support and friendly competition.",
    features: ["Social workouts", "Progress tracking", "Community challenges"],
    icon: Dumbbell,
    href: "https://apps.apple.com/us/app/betteru-social-fitness/id6744857930",
    external: true,
    available: true,
  },
  {
    name: "Snapshot Assassin",
    tagline: "Catch the moment",
    description:
      "A social game built around catching real moments. Receive secret challenges involving your friends and capture photos without them knowing.",
    features: ["Secret missions", "Photo challenges", "Leaderboards"],
    icon: Camera,
    href: "/snapshot",
    external: false,
    available: false,
  },
];

const featureIcons = {
  "Social workouts": Users,
  "Progress tracking": Target,
  "Community challenges": Trophy,
  "Secret missions": Target,
  "Photo challenges": Camera,
  "Leaderboards": Trophy,
};

export function Products() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Our Products
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4 text-balance">
            What We Build
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Innovative apps designed to bring people together and make life more engaging
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => {
            const IconComponent = product.icon;
            const Content = (
              <div className="group h-full bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  {!product.available && (
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {product.features.map((feature) => {
                      const FeatureIcon = featureIcons[feature as keyof typeof featureIcons] || Zap;
                      return (
                        <div
                          key={feature}
                          className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm text-muted-foreground"
                        >
                          <FeatureIcon size={14} className="text-primary" />
                          {feature}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                  {product.available ? "Download Now" : "Learn More"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );

            return product.external ? (
              <a
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {Content}
              </a>
            ) : (
              <Link key={product.name} href={product.href} className="block h-full">
                {Content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
