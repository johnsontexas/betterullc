import Link from "next/link";
import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif } from "next/font/google";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--tr-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--tr-mono",
  display: "swap",
});
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--tr-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terrarium — coming soon | BetterU LLC",
  description:
    "Terrarium is one customizable desktop that holds your mini-apps, browser tabs, notes, timers and more — saved to disk and built to sync across Mac and Windows. In early development.",
};

const features: { t: string; d: string }[] = [
  {
    t: "The pinboard canvas",
    d: "Drag empty space to pan from anywhere. Wheel to pan, ⌘/Ctrl-wheel to zoom toward the cursor. A zoom bar frames all windows with one click.",
  },
  {
    t: "Floating windows",
    d: "Drag by the title bar, resize from the corner, raise on click. Snap to a screen edge to tile half or maximise. Layers: back, normal, always-on-top. Per-window accent colour.",
  },
  {
    t: "Workspaces",
    d: "A row of pills across the title bar — new, rename, duplicate, delete. Each workspace keeps its own windows, layout and theme.",
  },
  {
    t: "Command palette",
    d: "⌘K (rebindable) fuzzy-searches every action — new panel of any type, layer and zoom commands, all workspace commands, settings.",
  },
  {
    t: "Themes & backgrounds",
    d: "Light and dark, glass chrome, styled scrollbars. Set accent, text and background colour, or a background image — for this workspace or all of them.",
  },
  {
    t: "The panels",
    d: "Browser with real Chromium tabs and sticky logins · rich-text Notes and a library · Files and a File viewer for images and PDFs · a live App mirror · Reminders, Timer, Alarm, Stopwatch, Clock.",
  },
  {
    t: "Everything persists",
    d: "Windows, positions, sizes, layers, note contents, running timers, workspaces and settings all save to disk (debounced) and come back on relaunch. Older saves migrate forward.",
  },
  {
    t: "Calm by default",
    d: "Subtle open animations, a shake-and-warn border when an alarm fires — and all of it disabled the moment your system asks for reduced motion.",
  },
];

const roadmap = [
  "A third-party plugin runtime — web, worker and native tiers",
  "Connectors with an MCP layer, so an in-app Claude gets tools for free",
  "In-app Claude — an edge-bar chat, a full panel, and ⌘K",
  "Cross-device sync — end-to-end encrypted layouts, notes and themes",
  "A mobile companion shell",
  "The Windows port",
];

export default function TerrariumPage() {
  return (
    <main className={`tr ${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}>
      <style>{CSS}</style>

      <header className="tr-head">
        <Link href="/" className="tr-wordmark">
          BETTERU&nbsp;LLC
        </Link>
        <Link href="/" className="tr-back">
          ← Back to site
        </Link>
      </header>

      <div className="tr-page">
        <section className="tr-masthead">
          <p className="tr-eyebrow">Coming soon</p>
          <h1>Terrarium</h1>
          <p className="tr-sub">
            One customizable desktop that holds your mini-apps, browser tabs, notes, timers — the
            lot — under a single roof. Everything you arrange is saved to disk, and it&apos;s built to
            travel with you across Mac and Windows.
          </p>
          <div className="tr-meta">
            <span>in development</span>
            <span>Electron + TypeScript</span>
            <span>Mac first, Windows next</span>
            <span>a BetterU LLC project</span>
          </div>
        </section>

        <section className="tr-thesis-wrap">
          <blockquote className="tr-thesis">
            <p>
              A pinboard you never have to rebuild. Open a browser, some notes, a timer and a clock,
              drop them where you want them, zoom out to see everything at once — then quit. Next
              time you launch, it&apos;s all exactly where you left it, down to the seconds on the
              timer.
            </p>
            <p>
              Terrarium is the whole workspace as plain, portable files. So the same desktop can open
              on your other computer.
            </p>
          </blockquote>
        </section>

        <section className="tr-features">
          <p className="tr-kicker">What&apos;s in it</p>
          <h2>Built for arranging, not managing</h2>
          <ul className="tr-grid">
            {features.map((f) => (
              <li key={f.t}>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="tr-sync">
          <p className="tr-kicker">The point of it</p>
          <h2>Your desktop, on every machine</h2>
          <div className="tr-sync-body">
            <p>
              Terrarium keeps your entire setup — windows, positions, layers, note contents,
              workspaces and themes — as files, not as a state locked inside one computer. Those
              files sync end-to-end encrypted: the server relays a blob and never sees your content.
            </p>
            <p>
              Open the app on another machine and the exact same desktop is waiting. Mac ships first;
              the Windows build is the next port.
            </p>
          </div>
        </section>

        <section className="tr-roadmap">
          <p className="tr-kicker">Not built yet</p>
          <h2>Where it&apos;s going</h2>
          <ul className="tr-road">
            {roadmap.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section className="tr-cta">
          <p>
            Terrarium is in early development. Want a nudge when the beta opens?
          </p>
          <a href="mailto:app@betterullc.com?subject=Terrarium%20beta">app@betterullc.com</a>
        </section>
      </div>

      <footer className="tr-foot">
        <span>© {new Date().getFullYear()} BetterU LLC</span>
        <Link href="/">betterullc.com</Link>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles — palette + type ported from the architecture doc    */
/* ------------------------------------------------------------------ */

const CSS = `
.tr{
  --bg:#f5f6f9; --surface:#ffffff; --sunken:#ecedf3;
  --border:#d7dbe3; --border-strong:#c1c7d3;
  --text:#191d26; --text-muted:#596273;
  --accent:#4b57cf; --accent-text:#3b45b2; --accent-soft:#e6e7fb;
  --shadow:0 1px 2px rgba(20,24,35,.06), 0 10px 28px -14px rgba(20,24,35,.20);
  --maxw:1120px;
  background:var(--bg); color:var(--text);
  font-family:var(--tr-sans), system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size:16px; line-height:1.65;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
}
@media (prefers-color-scheme: dark){
  .tr{
    --bg:#0e1117; --surface:#161a21; --sunken:#1d222c;
    --border:#2a313d; --border-strong:#3a424f;
    --text:#e5e8ef; --text-muted:#98a1b1;
    --accent:#8990f4; --accent-text:#a4aaf8; --accent-soft:#21243c;
    --shadow:0 1px 2px rgba(0,0,0,.3), 0 14px 34px -18px rgba(0,0,0,.65);
    color-scheme:dark;
  }
}
.tr *{box-sizing:border-box;}
.tr a{color:inherit;}

.tr-head{
  max-width:var(--maxw); margin:0 auto;
  padding:22px clamp(20px,5vw,56px);
  display:flex; align-items:center; justify-content:space-between;
}
.tr-wordmark{font-family:var(--tr-mono),monospace; font-size:12px; letter-spacing:.16em; font-weight:600; text-decoration:none;}
.tr-back{font-family:var(--tr-mono),monospace; font-size:12px; color:var(--text-muted); text-decoration:none;}
.tr-back:hover{color:var(--text);}

.tr-page{
  max-width:var(--maxw); margin:0 auto;
  padding:clamp(20px,4vw,44px) clamp(20px,5vw,56px) 110px;
}
.tr-page > section{
  border-top:1px solid var(--border);
  padding-top:clamp(30px,5vw,46px);
  margin-top:clamp(44px,8vw,80px);
}
.tr-page > section:first-child{border-top:none; padding-top:0; margin-top:0;}

.tr-eyebrow{
  font-family:var(--tr-mono),monospace; font-size:.74rem; letter-spacing:.2em;
  text-transform:uppercase; color:var(--accent-text); margin:0 0 16px;
}
.tr h1{
  font-family:var(--tr-sans),sans-serif;
  font-size:clamp(2.2rem,6.5vw,3.4rem); line-height:1.04;
  letter-spacing:-.025em; font-weight:700; margin:0; text-wrap:balance;
}
.tr-sub{font-size:1.06rem; color:var(--text-muted); max-width:60ch; margin:18px 0 0;}
.tr-meta{display:flex; flex-wrap:wrap; gap:8px 10px; margin-top:26px;}
.tr-meta span{
  font-family:var(--tr-mono),monospace; font-size:.72rem; color:var(--text-muted);
  border:1px solid var(--border); border-radius:999px; padding:4px 12px;
}

.tr-kicker{
  font-family:var(--tr-mono),monospace; font-size:.72rem; text-transform:uppercase;
  letter-spacing:.16em; color:var(--accent-text); margin:0 0 14px; font-weight:500;
}
.tr h2{
  font-family:var(--tr-sans),sans-serif;
  font-size:clamp(1.4rem,3vw,1.7rem); letter-spacing:-.015em; font-weight:600;
  margin:0 0 1em; text-wrap:balance;
}
.tr h3{font-size:1rem; font-weight:600; margin:0 0 .35em;}

.tr-thesis{
  font-family:var(--tr-serif),Georgia,"Times New Roman",serif;
  font-size:1.15rem; line-height:1.62; margin:0;
  background:var(--sunken); border-left:3px solid var(--accent);
  border-radius:0 10px 10px 0; padding:24px 30px; max-width:72ch;
}
.tr-thesis p{margin:0 0 .85em;}
.tr-thesis p:last-child{margin-bottom:0;}

.tr-shot-grid{
  display:grid; grid-template-columns:repeat(2,minmax(0,1fr));
  gap:clamp(16px,3vw,26px);
}
.tr-shot{margin:0;}
.tr-shot-wide{grid-column:1 / -1;}
.tr-shot-frame{
  position:relative; border:1px solid var(--border-strong); border-radius:12px;
  overflow:hidden; background:var(--sunken); box-shadow:var(--shadow);
  aspect-ratio:16 / 10; display:grid; place-items:center;
}
.tr-shot-ph{
  font-family:var(--tr-mono),monospace; font-size:.7rem; letter-spacing:.14em;
  text-transform:uppercase; color:var(--text-muted);
}
.tr-shot-frame img{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top left;
}
.tr-shot figcaption{
  font-size:.85rem; color:var(--text-muted); margin-top:10px; line-height:1.5; max-width:60ch;
}

.tr-grid{
  list-style:none; padding:0; margin:0;
  display:grid; grid-template-columns:repeat(auto-fit,minmax(248px,1fr)); gap:14px;
}
.tr-grid li{
  background:var(--surface); border:1px solid var(--border); border-radius:12px;
  padding:18px 20px; box-shadow:var(--shadow);
}
.tr-grid p{margin:0; font-size:.9rem; color:var(--text-muted); line-height:1.55;}

.tr-sync-body{max-width:70ch;}
.tr-sync-body p{margin:.9em 0; color:var(--text-muted);}
.tr-sync-body p:first-child{margin-top:0;}

.tr-road{
  list-style:none; padding:0; margin:4px 0 0;
  display:flex; flex-direction:column; gap:12px; max-width:70ch;
}
.tr-road li{position:relative; padding-left:22px; color:var(--text-muted);}
.tr-road li::before{content:"▹"; position:absolute; left:0; color:var(--accent-text);}

.tr-cta p{margin:0 0 6px; color:var(--text-muted);}
.tr-cta a{
  font-family:var(--tr-mono),monospace; font-weight:600; color:var(--accent-text);
  text-decoration:none; text-underline-offset:2px;
}
.tr-cta a:hover{text-decoration:underline;}

.tr-foot{
  max-width:var(--maxw); margin:0 auto;
  padding:22px clamp(20px,5vw,56px) 40px;
  display:flex; justify-content:space-between; gap:12px;
  border-top:1px solid var(--border);
  font-family:var(--tr-mono),monospace; font-size:.72rem; color:var(--text-muted);
}
.tr-foot a{text-decoration:none;}
.tr-foot a:hover{color:var(--text);}

@media (max-width:720px){
  .tr-shot-grid{grid-template-columns:1fr;}
  .tr-shot-wide{grid-column:auto;}
}
@media (prefers-reduced-motion: reduce){
  .tr *{transition:none !important; animation:none !important;}
}
`;
