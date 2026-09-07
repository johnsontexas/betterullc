import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Reveal } from "@/components/reveal";

const team = [
  {
    name: "Lucas Borgarello",
    image: "/lucas.jpeg",
    linkedin: "https://www.linkedin.com/in/lucas-borgarello-322804356",
  },
  {
    name: "Daniel Johnson",
    image: "/dan3.JPG",
    linkedin: "https://www.linkedin.com/in/johnsontx",
  },
  {
    name: "Enrique Ortiz",
    image: "/enrique.jpeg",
    linkedin: "https://www.linkedin.com/in/enrique-ortiz-397588399",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 md:py-28 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <span className="brand-rule mb-6" />
          <h2 className="font-display font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] text-[clamp(1.9rem,4vw,3rem)] max-w-3xl text-balance">
            Three co-founders. We build the apps together.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl text-pretty">
            We split the work loosely and all end up touching every part of it — product, the
            apps themselves, growth and the infrastructure underneath.
          </p>
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
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-foreground text-xl">{member.name}</h3>
                    <p className="text-accent text-xs font-semibold tracking-[0.14em] uppercase mt-1">
                      Co-founder
                    </p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors shrink-0"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
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
