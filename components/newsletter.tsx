import { Reveal } from "@/components/reveal";
import { EmailSignup } from "@/components/email-signup";

export function Newsletter() {
  return (
    <section className="bg-background border-t border-border py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="brand-rule mb-5" />
              <h2 className="font-display font-extrabold text-foreground leading-[1.05] tracking-[-0.03em] text-[clamp(1.8rem,3.6vw,2.6rem)] text-balance">
                Get the occasional update
              </h2>
              <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed max-w-md">
                One email when we ship something new — a launch, a beta, a big
                update. Nothing else.
              </p>
            </div>
            <div className="md:justify-self-end w-full">
              <EmailSignup source="general" variant="site" cta="Keep me posted" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
