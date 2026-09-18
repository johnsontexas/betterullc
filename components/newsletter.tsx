import { Reveal } from "@/components/reveal";
import { EmailSignup } from "@/components/email-signup";

export function Newsletter() {
  return (
    <section className="relative bg-ink overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32">
        <Reveal>
          <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/45">
            Next up
          </p>
          <h2 className="mt-4 font-display font-extrabold text-white leading-[0.95] tracking-[-0.04em] text-[clamp(2.6rem,8vw,6.5rem)] text-balance">
            Be first to hear <span className="text-gradient">what&apos;s next.</span>
          </h2>
          <div className="mt-8 md:mt-10 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end">
            <p className="text-white/55 text-base md:text-lg max-w-md leading-relaxed">
              One email when we ship something: CogTrack&apos;s launch, Terrarium&apos;s beta, a big
              update. Nothing else.
            </p>
            <EmailSignup source="general" variant="ink" cta="Keep me posted" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
