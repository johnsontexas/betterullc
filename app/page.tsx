import type { Viewport } from "next";
import { Navbar } from "@/components/navbar";
import { HeroStage } from "@/components/hero-stage";
import { AppWorld } from "@/components/app-world";
import { Manifesto } from "@/components/manifesto";
import { Team } from "@/components/team";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { APPS } from "@/lib/apps";
import { fetchSiteStats } from "@/lib/site-stats";

export const viewport: Viewport = {
  themeColor: "#07080a",
};

export default async function Home() {
  // ISR (hourly). users_total is also collected daily (see refresh-user-counts)
  // but deliberately not shown yet.
  const stats = await fetchSiteStats();
  return (
    <main className="home-dark min-h-screen bg-ink text-white">
      <ScrollProgress />
      <Navbar />
      <HeroStage downloads={stats.downloads} />
      <div id="apps">
        {APPS.map((app, i) => (
          <AppWorld
            key={app.id}
            app={app}
            nextBg={APPS[i + 1]?.bg ?? "#07080a"}
          />
        ))}
      </div>
      <Manifesto />
      <Team />
      <Newsletter />
      <Footer />
    </main>
  );
}
