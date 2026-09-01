import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AppsCarousel } from "@/components/apps-carousel";
import { Team } from "@/components/team";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AppsCarousel />
      <Team />
      <Footer />
    </main>
  );
}
