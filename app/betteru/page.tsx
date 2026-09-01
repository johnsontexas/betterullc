import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Apple,
  ArrowRight,
  Dumbbell,
  Users,
  Trophy,
  TrendingUp,
  HeartPulse,
  CalendarCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "BetterU Social Fitness - by BetterU LLC",
  description:
    "BetterU Social Fitness connects you with friends to hit your wellness goals through shared workouts, progress tracking and friendly competition. Free on the App Store.",
};

const APP_STORE = "https://apps.apple.com/us/app/betteru-social-fitness/id6744857930";

const features = [
  {
    icon: Users,
    title: "Work out with friends",
    description: "Build a circle, share sessions, and keep each other honest about showing up.",
  },
  {
    icon: TrendingUp,
    title: "Track real progress",
    description: "Log workouts and watch your streaks, volume and consistency trend over time.",
  },
  {
    icon: Trophy,
    title: "Friendly competition",
    description: "Weekly challenges and leaderboards that make consistency the thing you compete on.",
  },
  {
    icon: HeartPulse,
    title: "Built around habits",
    description: "Small, repeatable goals — the app is designed to make the next session easy to start.",
  },
  {
    icon: CalendarCheck,
    title: "Check in daily",
    description: "A quick daily check keeps your group in the loop without another group chat to manage.",
  },
  {
    icon: Dumbbell,
    title: "Any kind of training",
    description: "Lifting, running, classes, walks — if it counts to you, it counts in BetterU.",
  },
];

export default function BetterUPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex items-center justify-center pt-36 pb-24 bg-secondary border-b border-border">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center">
            <span className="brand-rule brand-rule-center mb-7" />
            <div className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-muted-foreground text-sm font-medium">Free on the App Store</span>
            </div>

            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-primary flex items-center justify-center">
              <Dumbbell size={44} className="text-primary-foreground" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              BetterU
              <span className="block text-primary">Social Fitness</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed text-pretty">
              Getting in shape is easier with friends.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              BetterU Social Fitness connects you with the people you know to set goals, share
              workouts, and keep each other consistent through friendly competition.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={APP_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors group"
              >
                <Apple size={24} />
                Download on the App Store
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://betteruai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-transparent border border-border text-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-card transition-colors"
              >
                Visit betteruai.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 text-balance">
              Consistency, made social
            </h2>
            <span className="brand-rule brand-rule-center mb-5" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              The point isn&apos;t a perfect program. It&apos;s showing up — and BetterU is built to make
              that the easy choice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/40 transition-colors duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">How it works</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 text-balance">
              Start in a couple of minutes
            </h2>
            <span className="brand-rule brand-rule-center mb-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Add your people", d: "Invite friends and form a group you actually want to answer to." },
              { t: "Log your sessions", d: "Record any workout in seconds and keep your streak alive." },
              { t: "Compete on showing up", d: "Weekly challenges reward consistency, not just personal bests." },
            ].map((s, i) => (
              <div key={s.t} className="bg-card rounded-2xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary font-semibold font-display">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Apple size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Bring your friends. Get after it.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto text-pretty">
            BetterU Social Fitness is free on the App Store.
          </p>
          <a
            href={APP_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors group"
          >
            <Apple size={24} />
            Download on the App Store
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="mt-8">
            <Link href="/#apps" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
              See our other apps →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
