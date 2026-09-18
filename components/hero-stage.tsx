"use client";

import { useEffect, useRef } from "react";
import { APPS } from "@/lib/apps";
import { SHAPES, sampleShape } from "@/components/hero-shapes";
import { CountUp } from "@/components/count-up";
import { easeInOut, span, useScrollProgress } from "@/components/use-scroll-progress";

/*
  The opening scene, scrubbed by scroll:
    1. "Get better,"  ……  "together."  — two words far apart, a field of scattered dots.
    2. The words slide into one line; the dots (people) pull together into one swarm.
    3. The swarm splits into four shapes that say what each app is — a dumbbell,
       a target, a head, a desktop — each labelled and clickable.
  Pointer / finger pushes the dots around the whole time.
*/

type Dot = {
  k: number; // app index
  sx: number; sy: number; // scattered (0..1 of the viewport)
  ca: number; cr: number; // swarm angle / radius (0..1)
  hx: number; hy: number; // spot on its app's shape (unit space)
  w: number; // angular speed
  ph: number; // drift phase
  size: number;
  alpha: number;
  ox: number; oy: number; vx: number; vy: number; // pointer offset + velocity
};

function centers(w: number, h: number) {
  if (w < 768) {
    return [
      [w * 0.27, h * 0.44],
      [w * 0.73, h * 0.44],
      [w * 0.27, h * 0.72],
      [w * 0.73, h * 0.72],
    ];
  }
  return [0.17, 0.39, 0.61, 0.83].map((x) => [w * x, h * 0.6]);
}

const shapeSize = (w: number, h: number) => Math.min(w, h) * (w < 768 ? 0.15 : 0.11);

export function HeroStage({ downloads }: { downloads: number | null }) {
  const outer = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const outro = useRef<HTMLParagraphElement>(null);
  const labels = useRef<(HTMLAnchorElement | null)[]>([]);
  const progress = useRef(0);
  const hovered = useRef(-1);

  useScrollProgress(outer, (p) => {
    progress.current = p;
    const st = stage.current;
    if (!st) return;
    const w = st.clientWidth;
    const h = st.clientHeight;
    const mobile = w < 768;
    const t1 = easeInOut(span(p, 0, 0.38));
    const t2 = easeInOut(span(p, 0.42, 0.82));

    const d = (1 - t1) * w * (mobile ? 0.1 : 0.16);
    if (left.current) left.current.style.transform = `translate3d(${-d}px,0,0)`;
    if (right.current) right.current.style.transform = `translate3d(${d}px,0,0)`;
    if (words.current) {
      const lift = t2 * h * (mobile ? 0.3 : 0.24);
      const sc = 1 - t2 * (mobile ? 0.3 : 0.45);
      words.current.style.transform = `translate3d(0,${-lift}px,0) scale(${sc})`;
      words.current.style.letterSpacing = `${(1 - t1) * 0.06 - 0.035}em`;
    }
    if (intro.current) {
      intro.current.style.opacity = String(1 - span(p, 0.02, 0.2));
      intro.current.style.transform = `translate3d(0,${span(p, 0, 0.2) * 30}px,0)`;
    }
    if (outro.current && words.current) {
      // pin the caption under the (lifted, shrunken) headline
      const wh = words.current.offsetHeight;
      const mid = words.current.offsetTop + wh / 2;
      const lift = t2 * h * (mobile ? 0.3 : 0.24);
      const sc = 1 - t2 * (mobile ? 0.3 : 0.45);
      const o = span(p, 0.6, 0.8);
      outro.current.style.opacity = String(o);
      outro.current.style.top = `${mid - lift + (wh * sc) / 2 + (mobile ? 10 : 14)}px`;
      outro.current.style.transform = `translate3d(-50%,${(1 - o) * 14}px,0)`;
    }
    const cs = centers(w, h);
    const lr = shapeSize(w, h) * 1.2;
    labels.current.forEach((el, i) => {
      if (!el) return;
      const o = span(p, 0.62 + i * 0.03, 0.8 + i * 0.03);
      el.style.opacity = String(o);
      el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      el.style.left = `${cs[i][0]}px`;
      el.style.top = `${cs[i][1] + lr + 14}px`;
      el.style.transform = `translate3d(-50%,${(1 - o) * 16}px,0)`;
    });
  });

  useEffect(() => {
    const cv = canvas.current;
    const st = stage.current;
    if (!cv || !st) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const n = w < 768 ? 240 : 360;
      const per = n / 4;
      const pts = SHAPES.map((shape) => sampleShape(shape, per));
      dots = Array.from({ length: n }, (_, i) => ({
        k: i % 4,
        sx: Math.random() * 1.2 - 0.1,
        sy: Math.random() * 1.2 - 0.1,
        ca: Math.random() * Math.PI * 2,
        cr: Math.sqrt(Math.random()),
        hx: pts[i % 4][Math.floor(i / 4)][0],
        hy: pts[i % 4][Math.floor(i / 4)][1],
        w: (0.12 + Math.random() * 0.4) * (Math.random() < 0.5 ? -1 : 1),
        ph: Math.random() * Math.PI * 2,
        size: (w < 768 ? 1.4 : 1.8) + Math.random() * (w < 768 ? 1.2 : 1.6),
        alpha: 0.55 + Math.random() * 0.45,
        ox: 0, oy: 0, vx: 0, vy: 0,
      }));
    };

    const resize = () => {
      const nw = st.clientWidth;
      const nh = st.clientHeight;
      // iOS toolbar show/hide changes height only; skip the rebuild for that
      const rebuild = Math.abs(nw - w) > 1 || dots.length === 0;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      if (rebuild) build();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(st);

    const move = (x: number, y: number) => {
      const r = cv.getBoundingClientRect();
      pointer.x = x - r.left;
      pointer.y = y - r.top;
      pointer.active = true;
    };
    const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onLeave = () => {
      pointer.active = false;
      pointer.x = pointer.y = -9999;
    };
    st.addEventListener("pointermove", onPointer);
    st.addEventListener("pointerdown", onPointer);
    st.addEventListener("pointerleave", onLeave);
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };
    st.addEventListener("pointerup", onUp);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(st);

    const spread = new Float32Array(4).fill(1);
    let raf = 0;
    let prev = performance.now();
    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const time = reduced ? 0 : now / 1000;
      const p = progress.current;
      const t1 = easeInOut(span(p, 0, 0.38));
      const t2 = easeInOut(span(p, 0.42, 0.82));
      const mobile = w < 768;
      const cs = centers(w, h);
      const swarmR = Math.min(w, h) * (mobile ? 0.34 : 0.27);
      const R = shapeSize(w, h);
      const cx = w / 2;
      const cy = h * (mobile ? 0.5 : 0.52);

      for (let k = 0; k < 4; k++) {
        const target = hovered.current === k ? 1.18 : 1;
        spread[k] += (target - spread[k]) * 0.12;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let k = 0; k < 4; k++) {
        ctx.fillStyle = APPS[k].color;
        for (let i = k; i < dots.length; i += 4) {
          const d = dots[i];
          // 1. scattered, drifting
          const x0 = d.sx * w + Math.sin(time * 0.3 + d.ph) * 14;
          const y0 = d.sy * h + Math.cos(time * 0.25 + d.ph) * 14;
          // 2. one swarm, slowly turning
          const a = d.ca + time * d.w * 0.6;
          const x1 = cx + Math.cos(a) * d.cr * swarmR;
          const y1 = cy + Math.sin(a) * d.cr * swarmR * 0.72;
          // 3. four shapes, each dot shimmering around its spot on the outline
          const b = d.ca + time * d.w * 4;
          const sc = R * spread[k] * (1 + Math.sin(time * 1.2 + k) * 0.02);
          const x2 = cs[k][0] + d.hx * sc + Math.cos(b) * 1.6;
          const y2 = cs[k][1] + d.hy * sc + Math.sin(b) * 1.6;

          let x = x0 + (x1 - x0) * t1;
          let y = y0 + (y1 - y0) * t1;
          x += (x2 - x) * t2;
          y += (y2 - y) * t2;

          // pointer: push away, spring back
          if (pointer.active) {
            const dx = x + d.ox - pointer.x;
            const dy = y + d.oy - pointer.y;
            const dist2 = dx * dx + dy * dy;
            const R = 120;
            if (dist2 < R * R && dist2 > 0.01) {
              const dist = Math.sqrt(dist2);
              const f = (1 - dist / R) * 900 * dt;
              d.vx += (dx / dist) * f;
              d.vy += (dy / dist) * f;
            }
          }
          d.vx += -d.ox * 0.06;
          d.vy += -d.oy * 0.06;
          d.vx *= 0.86;
          d.vy *= 0.86;
          d.ox += d.vx;
          d.oy += d.vy;

          const s = d.size * (1 + t2 * 0.25);
          ctx.globalAlpha = d.alpha;
          ctx.fillRect(x + d.ox - s / 2, y + d.oy - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;

      if (visible) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      st.removeEventListener("pointermove", onPointer);
      st.removeEventListener("pointerdown", onPointer);
      st.removeEventListener("pointerleave", onLeave);
      st.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section ref={outer} className="relative h-[260vh] md:h-[280vh] bg-ink" aria-label="BetterU LLC">
      <div
        ref={stage}
        className="sticky top-0 h-[100svh] overflow-hidden touch-pan-y select-none"
      >
        <div className="hero-vignette" aria-hidden />
        <canvas ref={canvas} className="absolute inset-0" aria-hidden />

        {/* headline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            <div
              ref={intro}
              className="mb-5 md:mb-7 flex items-center gap-3 text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-white/55"
            >
              <span className="brand-rule !w-8 !h-[3px]" />
              BetterU LLC
            </div>
            <h1
              ref={words}
              className="hero-words font-display font-extrabold text-white leading-[0.92] text-center flex flex-col md:flex-row md:gap-[0.28em] items-center will-change-transform"
            >
              <span ref={left} className="block will-change-transform">
                Get better,
              </span>
              <span ref={right} className="block text-gradient pb-[0.14em] -mb-[0.14em] will-change-transform">
                together.
              </span>
            </h1>
          </div>
          <p
            ref={outro}
            className="absolute left-1/2 top-0 whitespace-nowrap text-center text-white/60 text-sm md:text-base opacity-0"
          >
            {downloads ? (
              <>
                Four apps. <span className="text-white font-semibold">{downloads.toLocaleString("en-US")} downloads</span>. Pick one.
              </>
            ) : (
              "Four apps, one idea. Pick one."
            )}
          </p>
        </div>

        {/* app labels — positioned onto each orbit by the scroll handler */}
        {APPS.map((app, i) => (
          <a
            key={app.id}
            ref={(el) => {
              labels.current[i] = el;
            }}
            href={`#${app.id}`}
            onPointerEnter={() => (hovered.current = i)}
            onPointerLeave={() => (hovered.current = -1)}
            onFocus={() => (hovered.current = i)}
            onBlur={() => (hovered.current = -1)}
            className="group absolute opacity-0 pointer-events-none text-center whitespace-nowrap"
            style={{ left: "50%", top: "70%" }}
          >
            <span className="block font-mono text-[10px] tracking-[0.2em]" style={{ color: app.color }}>
              {app.n}
            </span>
            <span className="block font-display font-bold text-white text-[17px] md:text-xl leading-tight group-hover:underline underline-offset-4 decoration-2">
              {app.short}
            </span>
            <span className="block text-[12px] md:text-[13px] text-white/50">{app.tag}</span>
          </a>
        ))}

        {/* bottom rail */}
        <div className="absolute bottom-0 inset-x-0 px-5 md:px-8 pb-5 md:pb-7 flex items-end justify-between gap-4 text-[12px] md:text-[13px] text-white/55 pointer-events-none">
          {downloads ? (
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
              </span>
              <p className="leading-none">
                <CountUp
                  value={downloads}
                  className="block font-display font-extrabold text-white text-[28px] md:text-[36px] tracking-[-0.03em] tabular-nums"
                />
                <span className="block mt-1.5 text-[11px] md:text-xs tracking-[0.14em] uppercase text-white/55">
                  Downloads across our apps
                </span>
              </p>
            </div>
          ) : (
            <span />
          )}
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="scroll-cue" aria-hidden />
            Scroll · move your cursor through the dots
          </span>
          <span className="sm:hidden inline-flex items-center gap-2">
            <span className="scroll-cue" aria-hidden />
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
