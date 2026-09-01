import Image from "next/image";

const team = [
  {
    name: "Lucas Borgarello",
    role: "Co-Founder / Co-Owner",
    image: "/lucas.jpeg",
    description:
      "Expert in AI and server management, bringing technical expertise to ensure BetterU's infrastructure is robust, scalable, and powered by cutting-edge artificial intelligence solutions.",
  },
  {
    name: "Daniel Johnson",
    role: "Co-Founder / Co-Owner",
    image: "/dssaw.png",
    description:
      "Primarily manages business operations, marketing strategies, and idea generation, driving BetterU's growth and ensuring our vision reaches and resonates with users worldwide.",
  },
  {
    name: "Enrique Ortiz",
    role: "Co-Founder / Co-Owner",
    image: "/enrique.jpeg",
    description:
      "Primarily focuses on app development, crafting the user experience and functionality that makes BetterU Social Fitness intuitive, engaging, and impactful for our community.",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Our team
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 text-balance">
            Meet the founders
          </h2>
          <span className="brand-rule brand-rule-center mb-5" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Three founders building social apps we&apos;d want to use with our own friends.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors duration-200"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium tracking-wide mb-4">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Box */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors">
            <p className="text-foreground text-lg mb-2">Get in touch with us</p>
            <a
              href="mailto:app@betterullc.com"
              className="text-primary hover:text-primary/80 transition-colors text-lg font-medium"
            >
              app@betterullc.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
