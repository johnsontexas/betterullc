"use client";

import Image from "next/image";
import { useRef } from "react";
import { Linkedin } from "lucide-react";
import { Reveal } from "@/components/reveal";

const team = [
  {
    name: "Lucas Borgarello",
    image: "/lucas.jpeg",
    linkedin: "https://www.linkedin.com/in/lucas-borgarello-322804356",
    color: "#3ee0e0",
  },
  {
    name: "Daniel Johnson",
    image: "/dan3.JPG",
    linkedin: "https://www.linkedin.com/in/johnsontx",
    color: "#f97316",
  },
  {
    name: "Enrique Ortiz",
    image: "/enrique.jpeg",
    linkedin: "https://www.linkedin.com/in/enrique-ortiz-397588399",
    color: "#22c55e",
  },
];

// Card tilts toward the pointer (desktop); flat on touch.
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="tilt"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

export function Team() {
  return (
    <section id="team" className="relative bg-ink py-24 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <span className="brand-rule mb-6" />
          <h2 className="font-display font-extrabold text-white leading-[1.0] tracking-[-0.035em] text-[clamp(2rem,4.6vw,3.6rem)] max-w-3xl text-balance">
            Three co-founders. We build the apps together.
          </h2>
          <p className="mt-4 text-white/55 text-lg max-w-2xl text-pretty">
            We split the work loosely and all end up touching every part of it: product, the apps
            themselves, growth and the infrastructure underneath.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <TiltCard>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-white/5">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover grayscale-[35%] transition-[transform,filter] duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 h-1.5 w-10 rounded-full" style={{ background: m.color }} />
                  <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display font-bold text-white text-xl">{m.name}</h3>
                      <p className="text-white/55 text-xs font-semibold tracking-[0.16em] uppercase mt-1">Co-founder</p>
                    </div>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="w-10 h-10 shrink-0 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
