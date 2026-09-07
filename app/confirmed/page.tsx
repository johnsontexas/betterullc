import Link from "next/link";
import type { Metadata } from "next";
import { Check, Dumbbell, Crosshair, Brain, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Email confirmed - BetterU LLC",
  description: "Your email address has been confirmed for BetterU LLC apps.",
  robots: { index: false, follow: false },
};

const apps = [
  {
    name: "BetterU Social Fitness",
    blurb: "Get fit with friends.",
    href: "https://betteruai.com",
    external: true,
    Icon: Dumbbell,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    name: "Snapshot",
    blurb: "Catch your target in the act.",
    href: "/snapshot",
    external: false,
    Icon: Crosshair,
    iconClass: "bg-[#166534]/12 text-[#166534]",
  },
  {
    name: "CogTrack",
    blurb: "Your mind, measured daily.",
    href: "/cogtrack",
    external: false,
    Icon: Brain,
    iconClass: "bg-[#7c6cf0]/12 text-[#7c6cf0]",
  },
];

export default function ConfirmedPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            B
          </span>
          <span className="text-foreground font-medium tracking-wide font-display">BETTERU LLC</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Check size={40} className="text-primary" strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Email confirmed</h1>
          <span className="brand-rule brand-rule-center mb-5" />
          <p className="text-muted-foreground text-lg mb-10 text-pretty">
            Your email address is verified. You can head back to the app and sign in — this works for
            all of our apps.
          </p>

          <div className="space-y-3 text-left">
            {apps.map((app) => {
              const { Icon } = app;
              const inner = (
                <>
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${app.iconClass}`}>
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-foreground">{app.name}</span>
                    <span className="block text-muted-foreground text-sm">{app.blurb}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                  />
                </>
              );
              const cls =
                "group flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/40 transition-colors";
              return app.external ? (
                <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link key={app.name} href={app.href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>

          <p className="text-muted-foreground text-sm mt-10">
            Trouble signing in? Email{" "}
            <a href="mailto:app@betterullc.com" className="text-primary hover:underline">
              app@betterullc.com
            </a>
          </p>
        </div>
      </div>

      <footer className="px-6 py-6 border-t border-border text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} BetterU LLC ·{" "}
          <Link href="/" className="hover:text-primary transition-colors">
            betterullc.com
          </Link>
        </p>
      </footer>
    </main>
  );
}
