import { Reveal } from "@/components/reveal";

const values = [
  {
    title: "Better with friends",
    body: "Every app is built for a group. Accountability, competition and hype work better when your people are in it with you.",
  },
  {
    title: "Progress you can see",
    body: "Streaks, scores, trends, leaderboards. If it matters, we make it measurable — and hard to argue with.",
  },
  {
    title: "A little competition",
    body: "Nothing mean. Just enough of a scoreboard to make showing up feel like a game you want to win.",
  },
];

export function Values() {
  return (
    <section className="bg-background py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <span className="brand-rule mb-6" />
          <h2 className="font-display font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] text-[clamp(1.9rem,4vw,3rem)] max-w-3xl text-balance">
            The through-line in everything we ship
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-x-10 gap-y-12">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="border-t-2 border-foreground pt-5">
                <span className="font-display font-bold text-accent text-sm">0{i + 1}</span>
                <h3 className="font-display font-bold text-foreground text-xl mt-2 mb-2.5">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
