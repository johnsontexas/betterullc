import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Camera, Users, Target, Trophy, Eye, Zap, ArrowRight, Apple, Shield, FileText } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Users,
    title: "Join Private Groups",
    description: "Create or join groups with your friends to start playing together",
  },
  {
    icon: Target,
    title: "Secret Challenges",
    description: "Receive secret missions involving your friends - they won't know they're part of the game",
  },
  {
    icon: Camera,
    title: "Capture Proof",
    description: "Take photos to prove you completed your mission successfully",
  },
  {
    icon: Trophy,
    title: "Compete on Leaderboards",
    description: "Rise through the ranks and become the ultimate Snapshot Assassin",
  },
  {
    icon: Eye,
    title: "Stay Alert",
    description: "Outsmart your friends while avoiding being caught yourself",
  },
  {
    icon: Zap,
    title: "Real-Time Action",
    description: "Challenges happen in real-time during your everyday hangouts",
  },
];

const challenges = [
  "Catch a friend yawning",
  "Photo someone tying their shoes",
  "Snap someone checking their phone",
  "Capture a friend laughing",
  "Get someone eating",
];

export default function SnapshotPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Development Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full mb-8 animate-pulse-glow">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-medium">Currently in Development</span>
            </div>

            {/* Logo Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl shadow-primary/30 animate-float">
              <Camera size={48} className="text-primary-foreground" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Snapshot
              <span className="block text-primary">Assassin</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed text-pretty">
              A social game built around catching real moments.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Players join groups and receive secret challenges involving their friends. 
              The goal is simple: capture a photo of someone completing the task without them 
              realizing they're part of the mission.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="https://testflight.apple.com/join/wWCrYPSd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 group"
              >
                <Apple size={24} />
                Join TestFlight Beta
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link
                href="/snapshot/terms"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText size={16} />
                Terms of Service
              </Link>
              <Link
                href="/snapshot/privacy"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Shield size={16} />
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Example Challenges */}
      <section className="py-16 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-muted-foreground mb-8">Example challenges:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {challenges.map((challenge) => (
              <div
                key={challenge}
                className="bg-secondary border border-border px-4 py-2 rounded-full text-sm text-foreground"
              >
                {challenge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4 text-balance">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Snapshot turns normal hangouts into a game of strategy, timing, and creativity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Apple size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Be the First to Play
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto text-pretty">
            Snapshot is currently in development. Join our public TestFlight to get early access 
            and help shape the future of social gaming.
          </p>
          <a
            href="https://testflight.apple.com/join/wWCrYPSd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 group"
          >
            <Apple size={24} />
            Download TestFlight Beta
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
