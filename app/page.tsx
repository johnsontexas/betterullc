import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AppChapters } from "@/components/app-chapters";
import { Values } from "@/components/values";
import { Team } from "@/components/team";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AppChapters />
      <Values />
      <Team />
      <Newsletter />
      <Footer />
    </main>
  );
}
