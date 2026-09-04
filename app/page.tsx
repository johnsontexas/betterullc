import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { AppChapters } from "@/components/app-chapters";
import { Values } from "@/components/values";
import { Team } from "@/components/team";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <AppChapters />
      <Values />
      <Team />
      <Footer />
    </main>
  );
}
