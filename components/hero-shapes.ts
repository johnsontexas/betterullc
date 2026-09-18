// Outline shapes the hero dots settle into, one per app, in unit space
// (roughly -1..1 on both axes, y down). Each shape is a list of polylines;
// dots are spread evenly along their total length so the outline reads
// clearly even with only ~40 dots on a phone.

type Pt = [number, number];
type Line = Pt[];

const rect = (x0: number, y0: number, x1: number, y1: number): Line => [
  [x0, y0],
  [x1, y0],
  [x1, y1],
  [x0, y1],
  [x0, y0],
];

const circle = (cx: number, cy: number, r: number, steps = 40): Line =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const a = (i / steps) * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as Pt;
  });

// 01 BetterU — a dumbbell
const DUMBBELL: Line[] = [
  rect(-1.18, -0.64, -0.86, 0.64),
  rect(-0.86, -0.44, -0.64, 0.44),
  rect(0.64, -0.44, 0.86, 0.44),
  rect(0.86, -0.64, 1.18, 0.64),
  [
    [-0.64, -0.08],
    [0.64, -0.08],
  ],
  [
    [-0.64, 0.08],
    [0.64, 0.08],
  ],
];

// 02 Snapshot — a camera reticle on a target
const TARGET: Line[] = [
  circle(0, 0, 0.95, 56),
  circle(0, 0, 0.55, 36),
  circle(0, 0, 0.16, 12),
  [
    [0, -1.2],
    [0, -0.7],
  ],
  [
    [0, 0.7],
    [0, 1.2],
  ],
  [
    [-1.2, 0],
    [-0.7, 0],
  ],
  [
    [0.7, 0],
    [1.2, 0],
  ],
];

// 03 CogTrack — a head in profile with a trend line where the brain is
const HEAD: Line[] = [
  [
    [-0.3, 1.05],
    [-0.36, 0.62],
    [-0.62, 0.36],
    [-0.76, -0.06],
    [-0.7, -0.5],
    [-0.42, -0.84],
    [0.02, -0.98],
    [0.44, -0.86],
    [0.7, -0.52],
    [0.76, -0.18],
    [0.9, 0.12],
    [0.98, 0.3],
    [0.8, 0.36],
    [0.82, 0.5],
    [0.74, 0.56],
    [0.76, 0.68],
    [0.6, 0.76],
    [0.34, 0.74],
    [0.3, 1.05],
  ],
  [
    [-0.46, -0.1],
    [-0.22, -0.1],
    [-0.1, -0.44],
    [0.06, 0.22],
    [0.2, -0.22],
    [0.42, -0.22],
  ],
];

// 04 Terrarium — a desktop monitor with windows floating on it
const DESKTOP: Line[] = [
  rect(-1.05, -0.78, 1.05, 0.5),
  [
    [0, 0.5],
    [0, 0.82],
  ],
  [
    [-0.38, 0.86],
    [0.38, 0.86],
  ],
  rect(-0.82, -0.56, -0.12, -0.04),
  rect(0.0, -0.4, 0.8, 0.28),
];

export const SHAPES: Line[][] = [DUMBBELL, TARGET, HEAD, DESKTOP];

/** `count` points spaced evenly along the shape's outline. */
export function sampleShape(shape: Line[], count: number): Pt[] {
  const segs: { a: Pt; b: Pt; len: number }[] = [];
  for (const line of shape) {
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1];
      const b = line[i];
      segs.push({ a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1]) });
    }
  }
  const total = segs.reduce((s, g) => s + g.len, 0);
  const out: Pt[] = [];
  let si = 0;
  let walked = 0;
  for (let i = 0; i < count; i++) {
    const at = ((i + 0.5) / count) * total;
    while (si < segs.length - 1 && walked + segs[si].len < at) {
      walked += segs[si].len;
      si++;
    }
    const g = segs[si];
    const t = g.len ? Math.min(1, (at - walked) / g.len) : 0;
    out.push([g.a[0] + (g.b[0] - g.a[0]) * t, g.a[1] + (g.b[1] - g.a[1]) * t]);
  }
  return out;
}
