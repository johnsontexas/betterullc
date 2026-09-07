const ITEMS = [
  "Social fitness",
  "Photo tag game",
  "Cognitive training",
  "Get better, together",
];

export function Marquee() {
  const run = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      className="bg-foreground text-background py-4 overflow-hidden border-y border-foreground select-none"
      aria-hidden
    >
      <div className="marquee">
        {run.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6 text-sm font-semibold tracking-[0.16em] uppercase">{item}</span>
            <span className="text-background/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
