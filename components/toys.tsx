"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppId } from "@/lib/apps";

/* Five small, honest demos — one per app. Pointer events throughout so they
   work the same with a mouse, a trackpad or a thumb. */

export function Toy({
  id,
  color,
  color2,
  hint,
}: {
  id: AppId;
  color: string;
  color2: string;
  hint: string;
}) {
  if (id === "betteru") return <RepRace color={color} color2={color2} hint={hint} />;
  if (id === "snapshot") return <SnapTarget color={color} color2={color2} hint={hint} />;
  if (id === "frameguide") return <FrameIt color={color} color2={color2} hint={hint} />;
  if (id === "cogtrack") return <Reaction color={color} color2={color2} hint={hint} />;
  return <Pinboard color={color} hint={hint} />;
}

type P = { color: string; color2: string; hint: string };

const frame =
  "relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03]";

/* ---------------------------------------------------------------- BetterU */

const RIVALS = [
  { name: "Maya", speed: [260, 520] },
  { name: "Jordan", speed: [330, 640] },
  { name: "Sam", speed: [420, 800] },
];
const GOAL = 25;

function RepRace({ color, color2, hint }: P) {
  const [you, setYou] = useState(0);
  const [them, setThem] = useState([0, 0, 0]);
  const [state, setState] = useState<"idle" | "on" | "won" | "lost">("idle");
  const timers = useRef<number[]>([]);
  const winner = useRef<string | null>(null);

  const stop = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => stop, []);

  const start = () => {
    stop();
    winner.current = null;
    setYou(0);
    setThem([0, 0, 0]);
    setState("on");
    RIVALS.forEach((r, i) => {
      const tick = () => {
        setThem((prev) => {
          const next = [...prev];
          next[i] = Math.min(GOAL, next[i] + 1);
          if (next[i] >= GOAL && !winner.current) {
            winner.current = r.name;
            stop();
            setState("lost");
          }
          return next;
        });
        timers.current[i] = window.setTimeout(tick, r.speed[0] + Math.random() * (r.speed[1] - r.speed[0]));
      };
      timers.current[i] = window.setTimeout(tick, 600 + Math.random() * 400);
    });
  };

  const rep = () => {
    if (state === "idle" || state === "won" || state === "lost") {
      start();
      setYou(1);
      return;
    }
    setYou((v) => {
      const nv = Math.min(GOAL, v + 1);
      if (nv >= GOAL && !winner.current) {
        winner.current = "You";
        stop();
        setState("won");
      }
      return nv;
    });
  };

  const rows = [
    { name: "You", v: you, c: color },
    ...RIVALS.map((r, i) => ({ name: r.name, v: them[i], c: i === 0 ? color2 : "rgba(255,255,255,0.55)" })),
  ].sort((a, b) => b.v - a.v);

  return (
    <div className={`${frame} p-5 md:p-7`}>
      <div className="flex items-center justify-between text-[12px] text-white/50">
        <span className="font-mono tracking-[0.14em] uppercase">Push-up race · first to {GOAL}</span>
        <span>
          {state === "won" && <b style={{ color }}>You won the week 🏆</b>}
          {state === "lost" && <b className="text-white">{winner.current} got there first</b>}
          {state === "on" && "Go go go"}
          {state === "idle" && "3 friends waiting"}
        </span>
      </div>
      <ul className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <li key={r.name} className="race-row flex items-center gap-3" style={{ order: i }}>
            <span className="w-4 font-mono text-xs text-white/40">{i + 1}</span>
            <span className={`w-16 text-sm ${r.name === "You" ? "font-bold text-white" : "text-white/70"}`}>
              {r.name}
            </span>
            <span className="relative flex-1 h-3 rounded-full bg-white/[0.07] overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200 ease-out"
                style={{ width: `${(r.v / GOAL) * 100}%`, background: r.c }}
              />
            </span>
            <span className="w-7 text-right font-mono text-xs text-white/60 tabular-nums">{r.v}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={rep}
        className="mt-6 w-full rounded-2xl py-4 font-display font-extrabold text-lg text-black transition-transform active:scale-[0.97] select-none touch-manipulation"
        style={{ background: color }}
      >
        {state === "on" ? "+1 rep" : state === "idle" ? hint : "Rematch"}
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- Snapshot */

function Figure({ fill }: { fill: string }) {
  // a flat silhouette in the Snapshot art style
  return (
    <svg viewBox="0 0 60 100" className="w-full h-full" aria-hidden>
      <circle cx="30" cy="14" r="11" fill={fill} />
      <path
        d="M12 34c0-6 5-10 11-10h14c6 0 11 4 11 10v26c0 3-2 5-5 5h-2v30c0 3-2 5-5 5h-8c-3 0-5-2-5-5V65h-2c-3 0-5-2-5-5z"
        fill={fill}
      />
      <path d="M48 36l10-12" stroke={fill} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

const ROUND = 20;

function SnapTarget({ color, color2, hint }: P) {
  const arena = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(ROUND);
  const [on, setOn] = useState(false);
  const [done, setDone] = useState(false);
  const [pops, setPops] = useState<{ id: number; x: number; y: number; hit: boolean }[]>([]);
  const [flash, setFlash] = useState(0);
  const [aim, setAim] = useState<{ x: number; y: number } | null>(null);
  const popId = useRef(0);

  const hop = useCallback(() => setPos({ x: 12 + Math.random() * 76, y: 18 + Math.random() * 60 }), []);

  useEffect(() => {
    if (!on) return;
    const move = window.setInterval(hop, 950);
    const clock = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          setOn(false);
          setDone(true);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => {
      window.clearInterval(move);
      window.clearInterval(clock);
    };
  }, [on, hop]);

  const pop = (x: number, y: number, hit: boolean) => {
    const id = ++popId.current;
    setPops((p) => [...p, { id, x, y, hit }]);
    window.setTimeout(() => setPops((p) => p.filter((q) => q.id !== id)), 800);
  };

  const shoot = (e: React.PointerEvent) => {
    const r = arena.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    if (!on) {
      setScore(0);
      setLeft(ROUND);
      setDone(false);
      setOn(true);
      hop();
      return;
    }
    setFlash((f) => f + 1);
    const hit = Math.abs(x - pos.x) < 9 && Math.abs(y - pos.y) < 15;
    setScore((s) => s + (hit ? 10 : -10));
    pop(x, y, hit);
    if (hit) hop();
  };

  return (
    <div
      ref={arena}
      className={`${frame} aspect-[4/5] sm:aspect-[16/11] cursor-none touch-manipulation select-none bg-[#07080a]`}
      onPointerDown={shoot}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = arena.current!.getBoundingClientRect();
        setAim({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setAim(null)}
      role="button"
      aria-label="Snapshot mini game: tap the target"
      tabIndex={0}
    >
      <div className="absolute inset-0 snap-grid" aria-hidden />
      <div className="absolute top-4 inset-x-4 flex justify-between font-mono text-[12px] text-white/60 pointer-events-none">
        <span>
          SCORE <b className="text-white tabular-nums">{score > 0 ? `+${score}` : score}</b>
        </span>
        <span>
          00:{String(left).padStart(2, "0")}
        </span>
      </div>

      {on && (
        <div
          className="absolute w-[13%] sm:w-[9%] aspect-[3/5] -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-500 ease-[cubic-bezier(.3,1.4,.5,1)] pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
          <Figure fill={color2} />
        </div>
      )}

      {pops.map((p) => (
        <span
          key={p.id}
          className="snap-pop absolute font-mono font-bold text-sm pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, color: p.hit ? color : color2 }}
        >
          {p.hit ? "+10 clean catch" : "−10 spotted"}
        </span>
      ))}

      {flash > 0 && <span key={flash} className="snap-flash absolute inset-0 bg-white pointer-events-none" />}

      {aim && (
        <span
          className="absolute w-14 h-14 -ml-7 -mt-7 pointer-events-none"
          style={{ left: aim.x, top: aim.y }}
          aria-hidden
        >
          <svg viewBox="0 0 56 56" className="w-full h-full">
            <circle cx="28" cy="28" r="15" fill="none" stroke={color} strokeWidth="2" />
            <path d="M28 2v14M28 40v14M2 28h14M40 28h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      )}

      {!on && (
        <div className="absolute inset-0 grid place-items-center text-center px-6 pointer-events-none">
          <div>
            {done ? (
              <>
                <p className="font-display font-extrabold text-white text-3xl">
                  {score > 0 ? `+${score}` : score} pts
                </p>
                <p className="mt-1 text-white/60 text-sm">
                  {score >= 60 ? "Assassin material." : score > 0 ? "Not bad. Your group would still get you." : "You'd be doing the punishment."}
                </p>
                <p className="mt-4 text-sm font-semibold" style={{ color }}>
                  Tap to play again
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto w-10 h-16 opacity-90">
                  <Figure fill={color2} />
                </div>
                <p className="mt-3 font-display font-bold text-white text-xl">{hint}</p>
                <p className="mt-1 text-white/50 text-sm">20 seconds. Misses cost you.</p>
                <p className="mt-4 text-sm font-semibold" style={{ color }}>
                  Tap to start
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- FrameGuide */

const FW = 54; // frame width, % of stage
const FH = 64; // frame height, % of stage
const THIRD_X = FW / 6; // offset from frame centre to a vertical third
const THIRD_Y = FH / 6;

/*
  Where the shot actually is, as a % of the stage. Re-rolled each round.

  The subject and the horizon both want to sit on a third, and the frame's two
  horizontal thirds are a fixed 2 * THIRD_Y apart — so a scene where the two
  are any other distance apart simply cannot be framed well. The horizon is
  therefore derived from the subject rather than rolled independently, which
  keeps every round winnable.
*/
type Scene = { sx: number; sy: number; hy: number };

const scene = (): Scene => {
  const sy = 24 + Math.random() * 26;
  return {
    sx: 20 + Math.random() * 60,
    sy,
    // subject on the upper third puts the horizon on the lower one
    hy: sy + 2 * THIRD_Y + (Math.random() * 4 - 2),
  };
};

function FrameIt({ color, color2, hint }: P) {
  const stage = useRef<HTMLDivElement>(null);
  const [sc, setSc] = useState<Scene>({ sx: 64, sy: 42, hy: 58 });
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [shots, setShots] = useState<number[]>([]);
  const [flash, setFlash] = useState(0);
  const grab = useRef<{ dx: number; dy: number } | null>(null);

  // the scene is random, so only roll it once the client is up
  useEffect(() => setSc(scene()), []);

  // how near the subject sits to one of the frame's four power points…
  const best = Math.min(
    ...[-1, 1].flatMap((mx) =>
      [-1, 1].map((my) =>
        Math.hypot(sc.sx - (pos.x + mx * THIRD_X), sc.sy - (pos.y + my * THIRD_Y)),
      ),
    ),
  );
  // …and how near the horizon sits to one of its two horizontal thirds
  const horizonOff = Math.min(
    Math.abs(sc.hy - (pos.y + THIRD_Y)),
    Math.abs(sc.hy - (pos.y - THIRD_Y)),
  );
  // subject on a power point matters a bit more than a level horizon
  const score = Math.max(0, Math.round(100 - best * 5.5 - horizonOff * 2));
  const locked = score >= 88;

  const move = (e: React.PointerEvent) => {
    const g = grab.current;
    const r = stage.current?.getBoundingClientRect();
    if (!g || !r) return;
    const x = ((e.clientX - r.left) / r.width) * 100 - g.dx;
    const y = ((e.clientY - r.top) / r.height) * 100 - g.dy;
    setPos({
      x: Math.max(FW / 2, Math.min(100 - FW / 2, x)),
      y: Math.max(FH / 2, Math.min(100 - FH / 2, y)),
    });
  };

  const shoot = () => {
    setFlash((f) => f + 1);
    setShots((s) => [...s.slice(-4), score]);
    setSc(scene());
  };

  const bestEver = shots.length ? Math.max(...shots) : null;

  return (
    <div className={`${frame} p-0 select-none`}>
      <div
        ref={stage}
        className="relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden bg-[#07100f] touch-none"
        onPointerMove={move}
        onPointerUp={() => {
          grab.current = null;
          setDragging(false);
        }}
        onPointerCancel={() => {
          grab.current = null;
          setDragging(false);
        }}
      >
        {/* the scene: sky, ground, a horizon and one subject */}
        <span className="absolute inset-0" style={{ background: "linear-gradient(#16303a, #24424a 55%, #101d1c)" }} aria-hidden />
        <span
          className="absolute inset-x-0"
          style={{ top: `${sc.hy}%`, bottom: 0, background: "linear-gradient(#0f2422, #07100f)" }}
          aria-hidden
        />
        <span
          className="absolute inset-x-0 h-px"
          style={{ top: `${sc.hy}%`, background: "rgba(255,255,255,0.28)" }}
          aria-hidden
        />
        {/* subject */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${sc.sx}%`, top: `${sc.sy}%` }}
          aria-hidden
        >
          <svg viewBox="0 0 40 60" className="w-[26px] sm:w-[34px] h-auto">
            <circle cx="20" cy="11" r="8" fill={color2} />
            <path d="M8 27c0-4 4-7 8-7h8c4 0 8 3 8 7v15h-5v18h-4V42h-6v18h-4V42H8z" fill={color2} />
          </svg>
        </span>

        {/* the frame you drag */}
        <div
          onPointerDown={(e) => {
            const r = stage.current!.getBoundingClientRect();
            grab.current = {
              dx: ((e.clientX - r.left) / r.width) * 100 - pos.x,
              dy: ((e.clientY - r.top) / r.height) * 100 - pos.y,
            };
            setDragging(true);
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${FW}%`,
            height: `${FH}%`,
            outline: `2px solid ${locked ? color : "rgba(255,255,255,0.75)"}`,
            boxShadow: locked ? `0 0 0 9999px rgba(3,10,9,0.5), 0 0 34px ${color}` : "0 0 0 9999px rgba(3,10,9,0.5)",
            transition: dragging ? "none" : "box-shadow 0.25s, outline-color 0.25s",
          }}
        >
          {/* thirds inside the frame */}
          {[33.333, 66.667].map((v) => (
            <span key={`v${v}`} className="absolute inset-y-0 w-px" style={{ left: `${v}%`, background: locked ? color : "rgba(255,255,255,0.3)" }} />
          ))}
          {[33.333, 66.667].map((v) => (
            <span key={`h${v}`} className="absolute inset-x-0 h-px" style={{ top: `${v}%`, background: locked ? color : "rgba(255,255,255,0.3)" }} />
          ))}
          {[33.333, 66.667].flatMap((x) =>
            [33.333, 66.667].map((y) => (
              <span
                key={`p${x}-${y}`}
                className="absolute w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full"
                style={{ left: `${x}%`, top: `${y}%`, background: locked ? color : "rgba(255,255,255,0.55)" }}
              />
            )),
          )}
        </div>

        {flash > 0 && <span key={flash} className="snap-flash absolute inset-0 bg-white pointer-events-none" />}

        <p className="absolute top-3 left-4 font-mono text-[11px] text-white/50 pointer-events-none">
          {dragging || shots.length ? "DRAG THE FRAME" : hint.toUpperCase()}
        </p>
        <p
          className="absolute top-3 right-4 font-mono text-[11px] tabular-nums pointer-events-none"
          style={{ color: locked ? color : "rgba(255,255,255,0.5)" }}
        >
          {locked ? "LOCKED" : `${score}%`}
        </p>
      </div>

      <div className="flex items-center gap-4 px-5 py-3 border-t border-white/10">
        <button
          type="button"
          onClick={shoot}
          className="rounded-full px-4 py-2 text-sm font-semibold text-black transition-transform active:scale-[0.97]"
          style={{ background: locked ? color : "rgba(255,255,255,0.85)" }}
        >
          {locked ? "Take the shot" : "Shoot anyway"}
        </button>
        <span className="font-mono text-[12px] text-white/50">
          BEST <b className="text-white tabular-nums">{bestEver !== null ? `${bestEver}%` : "-"}</b>
        </span>
        <span className="ml-auto flex gap-1.5" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="w-1.5 h-4 rounded-full"
              style={{ background: i < shots.length ? color : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- CogTrack */

function Reaction({ color, color2, hint }: P) {
  const [phase, setPhase] = useState<"idle" | "wait" | "go" | "early" | "result">("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [tries, setTries] = useState<number[]>([]);
  const t0 = useRef(0);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const press = () => {
    if (phase === "wait") {
      window.clearTimeout(timer.current);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      const v = Math.round(performance.now() - t0.current);
      setMs(v);
      setTries((t) => [...t.slice(-4), v]);
      setPhase("result");
      return;
    }
    setPhase("wait");
    timer.current = window.setTimeout(() => {
      t0.current = performance.now();
      setPhase("go");
    }, 1400 + Math.random() * 2600);
  };

  const best = tries.length ? Math.min(...tries) : null;
  const avg = tries.length ? Math.round(tries.reduce((a, b) => a + b, 0) / tries.length) : null;
  const bg = phase === "go" ? color : phase === "early" ? "#2a0f1f" : "#150a30";

  return (
    <div className={`${frame} p-0`}>
      <button
        type="button"
        onPointerDown={(e) => {
          e.preventDefault();
          press();
        }}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            press();
          }
        }}
        className="w-full aspect-[4/3] sm:aspect-[16/9] grid place-items-center text-center px-6 transition-colors duration-75 select-none touch-manipulation"
        style={{ background: bg }}
      >
        <span>
          {phase === "idle" && (
            <>
              <span className="block font-display font-extrabold text-white text-3xl md:text-4xl">{hint}</span>
              <span className="block mt-2 text-white/55 text-sm">Tap anywhere in here to begin. Wait for it…</span>
            </>
          )}
          {phase === "wait" && (
            <span className="block font-display font-extrabold text-3xl md:text-4xl" style={{ color: color2 }}>
              Wait for it…
            </span>
          )}
          {phase === "go" && (
            <span className="block font-display font-extrabold text-black text-5xl md:text-6xl">TAP!</span>
          )}
          {phase === "early" && (
            <>
              <span className="block font-display font-extrabold text-white text-3xl md:text-4xl">Too soon!</span>
              <span className="block mt-2 text-white/55 text-sm">Tap to try again</span>
            </>
          )}
          {phase === "result" && ms !== null && (
            <>
              <span className="block font-display font-extrabold text-white text-6xl md:text-7xl tabular-nums">
                {ms}
                <span className="text-2xl md:text-3xl text-white/60">ms</span>
              </span>
              <span className="block mt-2 text-white/60 text-sm">
                {ms < 200 ? "Lightning." : ms < 280 ? "Right in the normal range." : "A bit sleepy? Go again."} Tap to go
                again.
              </span>
            </>
          )}
        </span>
      </button>
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 font-mono text-[12px] text-white/50">
        <span>
          BEST <b className="text-white tabular-nums">{best ?? "-"}</b>
        </span>
        <span className="flex gap-1.5" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="w-1.5 h-4 rounded-full"
              style={{ background: i < tries.length ? color : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </span>
        <span>
          AVG <b className="text-white tabular-nums">{avg ?? "-"}</b>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Terrarium */

type Win = { id: string; title: string; x: number; y: number; w: number };

const START: Win[] = [
  { id: "notes", title: "Notes", x: 6, y: 10, w: 38 },
  { id: "timer", title: "Timer", x: 54, y: 8, w: 34 },
  { id: "clock", title: "Clock", x: 50, y: 56, w: 30 },
  { id: "tabs", title: "Browser", x: 12, y: 50, w: 36 },
];

function Pinboard({ color, hint }: { color: string; hint: string }) {
  const board = useRef<HTMLDivElement>(null);
  const [wins, setWins] = useState(START);
  const [order, setOrder] = useState(START.map((w) => w.id));
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [secs, setSecs] = useState(25 * 60);

  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => {
      setNow(new Date());
      setSecs((s) => (s <= 0 ? 25 * 60 : s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const down = (e: React.PointerEvent, id: string) => {
    const r = board.current!.getBoundingClientRect();
    const win = wins.find((w) => w.id === id)!;
    drag.current = {
      id,
      dx: ((e.clientX - r.left) / r.width) * 100 - win.x,
      dy: ((e.clientY - r.top) / r.height) * 100 - win.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setOrder((o) => [...o.filter((x) => x !== id), id]);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const r = board.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100 - d.dx;
    const y = ((e.clientY - r.top) / r.height) * 100 - d.dy;
    setWins((ws) =>
      ws.map((w) => (w.id === d.id ? { ...w, x: Math.max(-4, Math.min(100 - w.w + 4, x)), y: Math.max(0, Math.min(88, y)) } : w)),
    );
  };
  const up = () => (drag.current = null);

  const body = (id: string) => {
    if (id === "notes")
      return (
        <div className="text-[11px] leading-relaxed text-white/70">
          <p className="font-semibold text-white">Today</p>
          <p>☑ ship the homepage</p>
          <p>☐ call Lucas re: sync</p>
          <p>☐ gym at 6</p>
        </div>
      );
    if (id === "timer")
      return (
        <div className="text-center">
          <p className="font-mono text-2xl md:text-3xl text-white tabular-nums">
            {String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}
          </p>
          <p className="text-[10px] text-white/50 mt-0.5">focus</p>
        </div>
      );
    if (id === "clock")
      return (
        <p className="text-center font-mono text-lg md:text-xl text-white tabular-nums">
          {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--"}
        </p>
      );
    return (
      <div className="space-y-1.5">
        <div className="flex gap-1">
          <span className="h-3.5 flex-1 rounded bg-white/15" />
          <span className="h-3.5 w-8 rounded" style={{ background: color }} />
        </div>
        <span className="block h-2 w-3/4 rounded bg-white/10" />
        <span className="block h-2 w-1/2 rounded bg-white/10" />
        <span className="block h-2 w-2/3 rounded bg-white/10" />
      </div>
    );
  };

  return (
    <div
      ref={board}
      className={`${frame} aspect-[4/5] sm:aspect-[16/11] bg-[#0b0e14] select-none`}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <div className="absolute inset-0 pin-dots" aria-hidden />
      <p className="absolute bottom-3 left-4 font-mono text-[11px] text-white/40 pointer-events-none">{hint}</p>
      {wins.map((w) => (
        <div
          key={w.id}
          onPointerDown={(e) => down(e, w.id)}
          className="absolute rounded-xl border border-white/15 bg-[#161a21] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing touch-none"
          style={{ left: `${w.x}%`, top: `${w.y}%`, width: `${w.w}%`, zIndex: order.indexOf(w.id) + 1 }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-white/10">
            <i className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <i className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <i className="w-2 h-2 rounded-full bg-[#28c840]" />
            <span className="ml-1.5 text-[10px] font-mono text-white/55">{w.title}</span>
          </div>
          <div className="p-3">{body(w.id)}</div>
        </div>
      ))}
    </div>
  );
}
