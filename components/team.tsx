import Image from "next/image";
import { Reveal } from "@/components/reveal";

const team = [
  {
    name: "Lucas Borgarello",
    role: "Co-founder · AI & infrastructure",
    image: "/lucas.jpeg",
    description: "Keeps the servers fast and the AI useful so the apps just work.",
  },
  {
    name: "Daniel Johnson",
    role: "Co-founder · Operations & growth",
    image: "/dssaw.png",
    description: "Runs the business, the marketing, and most of the ideas.",
  },
  {
    name: "Enrique Ortiz",
    role: "Co-founder · Product & app development",
    image: "/enrique.jpeg",
    description: "Builds the apps and owns how they feel to use.",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 md:py-28 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <span className="brand-rule mb-6" />
          <h2 className="font-display font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] text-[clamp(1.9rem,4vw,3rem)] max-w-3xl text-balance">
            Three founders, building apps we&apos;d use with our own friends
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 90}>
              <div className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted border border-border">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mt-5">{member.name}</h3>
                <p className="text-accent text-xs font-semibold tracking-[0.14em] uppercase mt-1 mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-4 border-t-2 border-foreground pt-8">
            <p className="font-display font-bold text-foreground text-xl flex-1">
              Want to talk? We read everything.
            </p>
            <a
              href="mailto:app@betterullc.com"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity w-fit"
            >
              app@betterullc.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
