import Link from "next/link";
import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Reveal } from "@/components/reveal";

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

export const metadata: Metadata = {
  title: "Terrarium — a desktop app, coming soon | BetterU LLC",
  description:
    "Terrarium is a desktop app: one customizable environment that holds your browser tabs, notes, timers and mini-apps on a pinboard — saved to disk and synced across Mac and Windows. In development.",
};

const NOTIFY = "mailto:app@betterullc.com?subject=Terrarium%20beta";

const panelChips = [
  "Browser",
  "Notes",
  "Files",
  "App mirror",
  "Reminders",
  "Timer",
  "Alarm",
  "Stopwatch",
  "Clock",
  "⌘K",
];

function Win({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`tr-win ${className}`}>
      <div className="tr-win-bar">
        <i />
        <i />
        <i />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function Feature({
  num,
  step,
  title,
  body,
  points,
  shot,
  alt,
  second,
  flip = false,
}: {
  num: string;
  step: string;
  title: React.ReactNode;
  body: string;
  points?: string[];
  shot: string;
  alt: string;
  second?: string;
  flip?: boolean;
}) {
  return (
    <section className={`tr-feature ${flip ? "tr-flip" : ""}`}>
      <span className="tr-ghost" aria-hidden>
        {num}
      </span>
      <div className="tr-feature-inner">
        <Reveal className="tr-copy">
          <span className="tr-dash" />
          <span className="tr-step">{step}</span>
          <h2 className="tr-title">{title}</h2>
          <p className="tr-body">{body}</p>
          {points && (
            <ul className="tr-points">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </Reveal>
        <Reveal className="tr-stage" delay={120}>
          <Win src={shot} alt={alt} className="tr-win-main" />
          {second && <Win src={second} alt="" className="tr-win-float" />}
        </Reveal>
      </div>
    </section>
  );
}

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
    <main className={`tr ${plexSans.variable} ${plexMono.variable}`}>
      <style>{CSS}</style>

      <header className="tr-head">
        <Link href="/" className="tr-wordmark">
          <span className="tr-b">B</span>
          BETTERU&nbsp;LLC
        </Link>
        <Link href="/" className="tr-back">
          ← Back to site
        </Link>
      </header>

      {/* Hero */}
      <section className="tr-hero">
        <span className="tr-ghost tr-ghost-hero" aria-hidden>
          ⌘
        </span>
        <div className="tr-feature-inner">
          <div className="tr-copy">
            <span className="tr-dash" />
            <span className="tr-badge">
              <span className="tr-dot" /> Desktop app · coming soon
            </span>
            <h1 className="tr-hero-title">
              Your whole <span className="tr-grad">desktop</span>,
              <br />
              right where you left it.
            </h1>
            <p className="tr-body">
              Terrarium is a desktop app — not a phone one. Browser tabs, notes, timers and mini-apps
              on a pinboard you never have to rebuild. Quit, come back, and it&apos;s all still
              there — down to the seconds on a running timer.
            </p>
            <div className="tr-cta-row">
              <a className="tr-btn" href={NOTIFY}>
                Get notified at launch →
              </a>
              <span className="tr-mini">macOS now · Windows next</span>
            </div>
            <div className="tr-chips" aria-hidden>
              {panelChips.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
          <div className="tr-stage tr-stage-hero">
            <Win
              src="/Terrarium/desktop.jpg"
              alt="The Terrarium desktop — floating windows on a pinboard"
              className="tr-win-main"
            />
            <Win src="/Terrarium/command-palette.jpg" alt="" className="tr-win-float" />
          </div>
        </div>
      </section>

      <Feature
        num="01"
        step="The canvas"
        title="A pinboard you pan and zoom."
        body="Drag any empty space to pan, from anywhere, at any zoom. ⌘-scroll zooms toward the cursor. Hit Fit and every window snaps into frame."
        points={[
          "Floating windows — drag, resize, raise, snap to an edge to tile",
          "Layers: send behind, keep normal, or pin always-on-top",
          "Workspaces — a row of pills, each with its own windows and theme",
        ]}
        shot="/Terrarium/canvas.jpg"
        alt="Zoomed-out view of the Terrarium canvas with several windows"
        flip
      />

      <Feature
        num="02"
        step="The panels"
        title="Everything, in one window manager."
        body="A real browser, real notes, real files — plus the small stuff you keep reaching for."
        points={[
          "Browser with real Chromium tabs and logins that stick",
          "Rich-text Notes with a saved library · a File viewer for images and PDFs",
          "A live mirror of any Mac app · Reminders, Timer, Alarm, Stopwatch, Clock",
        ]}
        shot="/Terrarium/desktop.jpg"
        alt="Terrarium with a browser, a stopwatch and a notes panel open"
        second="/Terrarium/settings.jpg"
      />

      <Feature
        num="03"
        step="⌘K"
        title="One keystroke to anything."
        body="A fuzzy command palette over every action — open a panel of any type, run layout and zoom commands, jump between workspaces, open settings. Rebind the shortcut if ⌘K isn't yours."
        shot="/Terrarium/command-palette.jpg"
        alt="The Terrarium command palette listing actions"
        flip
      />

      <Feature
        num="04"
        step="Make it yours"
        title="Themed down to the pixel."
        body="Light and dark, glass chrome, styled scrollbars. Set the accent, text and background colour, or drop in a background image — for this workspace, or all of them at once."
        shot="/Terrarium/settings.jpg"
        alt="Terrarium settings — appearance, shortcuts, browser and workspaces"
      />

      <Feature
        num="05"
        step="On every machine"
        title="The same desktop, wherever you open it."
        body="Windows, positions, layers, note contents, workspaces and themes are kept as plain files — not locked inside one computer. They sync end-to-end encrypted, so the server only ever relays a blob. Open Terrarium on another machine and your setup is already there. macOS ships first; Windows is the next port."
        shot="/Terrarium/launcher.jpg"
        alt="The Terrarium launcher with a tile for every panel type"
        flip
      />

      {/* Roadmap */}
      <section className="tr-road-sec">
        <div className="tr-road-inner">
          <Reveal>
            <span className="tr-dash" />
            <span className="tr-step">Not built yet</span>
            <h2 className="tr-title">Where it&apos;s going</h2>
            <ul className="tr-road">
              {roadmap.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="tr-final">
        <span className="tr-dash tr-dash-center" />
        <h2 className="tr-title">Terrarium is coming to macOS.</h2>
        <p className="tr-body tr-body-center">
          It&apos;s in early development. Leave a note and we&apos;ll tell you the moment the beta
          opens.
        </p>
        <a className="tr-btn" href={NOTIFY}>
          Get notified at launch →
        </a>
      </section>

      <footer className="tr-foot">
        <span>© {new Date().getFullYear()} BetterU LLC</span>
        <span className="tr-foot-links">
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:app@betterullc.com">app@betterullc.com</a>
        </span>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles — the architecture doc's indigo palette, the vivid   */
/*  full-bleed layout of the other bespoke pages.                      */
/* ------------------------------------------------------------------ */

const CSS = `
.tr{
  --bg:#0b0e14;
  --panel:#161a21;
  --line:rgba(255,255,255,0.09);
  --ink:#e8ebf2;
  --dim:#9aa3b4;
  --accent:#8990f4;
  --accent-2:#c9b8ff;
  --accent-soft:#20233a;
  min-height:100vh; color:var(--ink);
  background:#0b0e14;
  font-family:var(--tr-sans), system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size:16px; -webkit-font-smoothing:antialiased;
  overflow-x:clip;
}
.tr a{text-decoration:none; color:inherit;}
.tr *{box-sizing:border-box;}

/* faint pinboard dot-grid, sitewide on this page */
.tr-hero, .tr-feature, .tr-road-sec, .tr-final{
  background-image:radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px);
  background-size:26px 26px;
  background-position:center top;
}

.tr-head{
  position:absolute; top:0; left:0; right:0; z-index:10;
  display:flex; align-items:center; justify-content:space-between;
  padding:22px clamp(20px,5vw,64px);
}
.tr-wordmark{display:flex; align-items:center; gap:10px; font-family:var(--tr-mono),monospace; font-size:12px; letter-spacing:.14em; font-weight:600; color:#fff;}
.tr-b{width:24px; height:24px; border-radius:7px; background:var(--accent); color:#0b0e14; display:grid; place-items:center; font-family:var(--tr-sans),sans-serif; font-weight:700; font-size:12px;}
.tr-back{font-family:var(--tr-mono),monospace; font-size:12px; color:var(--dim);}
.tr-back:hover{color:#fff;}

.tr-feature-inner{
  max-width:1200px; margin:0 auto; padding:0 clamp(20px,5vw,64px);
  display:grid; grid-template-columns:1.02fr 1fr; gap:clamp(28px,5vw,60px);
  align-items:center; min-height:min(92vh,820px); position:relative; z-index:1;
}
.tr-copy{max-width:560px; padding:104px 0;}
.tr-dash{
  display:block; width:60px; height:5px; border-radius:999px; margin-bottom:22px;
  background:linear-gradient(90deg, var(--accent), var(--accent-2));
}
.tr-dash-center{margin-left:auto; margin-right:auto;}
.tr-step{
  font-family:var(--tr-mono),monospace; font-size:.72rem; letter-spacing:.18em;
  text-transform:uppercase; color:var(--accent-2);
}
.tr-hero-title,.tr-title{
  font-family:var(--tr-sans),sans-serif; font-weight:700;
  letter-spacing:-.032em; line-height:1.0; margin:14px 0 20px; color:#fff;
  text-wrap:balance;
}
.tr-hero-title{font-size:clamp(2.6rem,6vw,4.6rem); margin-top:0;}
.tr-title{font-size:clamp(2rem,3.8vw,3.1rem);}
.tr-grad{
  background:linear-gradient(96deg, var(--accent) 10%, var(--accent-2) 90%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.tr-body{font-size:clamp(1rem,1.25vw,1.15rem); line-height:1.62; color:var(--dim); margin:0; max-width:46ch;}
.tr-body-center{margin-left:auto; margin-right:auto; text-align:center; max-width:52ch;}
.tr-points{list-style:none; padding:0; margin:22px 0 0; display:flex; flex-direction:column; gap:11px;}
.tr-points li{position:relative; padding-left:22px; font-size:.95rem; color:var(--ink);}
.tr-points li::before{content:""; position:absolute; left:0; top:.5em; width:9px; height:9px; border-radius:3px; background:var(--accent); box-shadow:0 0 0 4px rgba(137,144,244,.18);}

/* giant ghost numerals / glyph */
.tr-ghost{
  position:absolute; z-index:0; pointer-events:none; user-select:none;
  font-family:var(--tr-sans),sans-serif; font-weight:700; line-height:1;
  color:transparent;
  -webkit-text-stroke:1.5px rgba(137,144,244,.16);
  font-size:clamp(9rem,26vw,20rem);
  top:6%; left:clamp(-1rem,2vw,2rem);
}
.tr-flip .tr-ghost{left:auto; right:clamp(-1rem,2vw,2rem);}
.tr-ghost-hero{
  -webkit-text-stroke:1.5px rgba(137,144,244,.12);
  font-size:clamp(12rem,32vw,28rem); top:2%; right:2%; left:auto; opacity:.9;
}

/* hero */
.tr-hero{
  position:relative;
  background-color:#0b0e14;
  background-image:
    radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
    radial-gradient(130% 90% at 82% -5%, rgba(137,144,244,.26), transparent 55%),
    radial-gradient(120% 120% at 0% 110%, rgba(201,184,255,.10), transparent 55%);
  background-size:26px 26px, cover, cover;
}
.tr-badge{
  display:inline-flex; align-items:center; gap:8px; margin:16px 0 6px;
  padding:8px 14px; border-radius:999px; background:var(--accent-soft);
  border:1px solid rgba(137,144,244,.28); font-family:var(--tr-mono),monospace;
  font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; color:#d3d7fb;
}
.tr-dot{width:7px; height:7px; border-radius:999px; background:var(--accent); box-shadow:0 0 0 4px rgba(137,144,244,.25);}
.tr-cta-row{display:flex; flex-wrap:wrap; align-items:center; gap:16px; margin-top:30px;}
.tr-btn{
  display:inline-flex; align-items:center; gap:8px; padding:13px 22px; border-radius:12px;
  font-weight:600; font-size:.95rem; background:var(--accent); color:#0b0e14;
  box-shadow:0 12px 40px -12px rgba(137,144,244,.6);
}
.tr-btn:hover{background:#9ba1f7;}
.tr-mini{font-family:var(--tr-mono),monospace; font-size:.72rem; color:var(--dim);}
.tr-chips{display:flex; flex-wrap:wrap; gap:8px; margin-top:34px; max-width:38ch;}
.tr-chips span{
  font-family:var(--tr-mono),monospace; font-size:.7rem; color:#aeb4f0;
  border:1px solid rgba(137,144,244,.24); border-radius:7px; padding:5px 10px;
  background:rgba(137,144,244,.06);
}

/* feature section washes */
.tr-feature{position:relative; border-top:1px solid rgba(255,255,255,0.05);}
.tr-feature:nth-of-type(even){
  background-image:
    radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    radial-gradient(120% 90% at 12% 10%, rgba(201,184,255,.09), transparent 55%);
  background-size:26px 26px, cover;
}
.tr-feature:nth-of-type(odd){
  background-image:
    radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
    radial-gradient(120% 90% at 88% 12%, rgba(137,144,244,.13), transparent 55%);
  background-size:26px 26px, cover;
}
.tr-flip .tr-feature-inner{grid-template-columns:1fr 1.02fr;}
.tr-flip .tr-copy{order:2; justify-self:end;}
.tr-flip .tr-stage{order:1;}

/* window mockups */
.tr-stage{position:relative; min-height:360px; display:flex; justify-content:center; align-items:center;}
.tr-win{
  border-radius:14px; overflow:hidden; background:var(--panel);
  border:1px solid rgba(255,255,255,0.13);
  box-shadow:0 50px 110px -34px rgba(0,0,0,.8), 0 0 0 1px rgba(137,144,244,.06);
}
.tr-win-bar{
  height:30px; background:#1d222c; display:flex; align-items:center; gap:7px;
  padding:0 13px; border-bottom:1px solid rgba(255,255,255,0.07);
}
.tr-win-bar i{width:10px; height:10px; border-radius:999px; background:rgba(255,255,255,0.16);}
.tr-win-bar i:first-child{background:#e06c60;}
.tr-win-bar i:nth-child(2){background:#e0b23c;}
.tr-win-bar i:nth-child(3){background:#4fb488;}
.tr-win img{display:block; width:100%; height:auto;}

.tr-win-main{width:116%; transform:rotate(-3deg) translateX(6%);}
.tr-flip .tr-win-main{transform:rotate(3deg) translateX(-6%);}
.tr-win-float{
  position:absolute; width:52%; z-index:2;
  right:-6%; bottom:-12%;
  transform:rotate(4deg);
  box-shadow:0 40px 80px -26px rgba(0,0,0,.85);
}
.tr-flip .tr-win-float{right:auto; left:-6%; transform:rotate(-4deg);}
.tr-stage-hero .tr-win-main{width:120%; transform:rotate(-4deg) translateX(8%);}
.tr-stage-hero .tr-win-float{width:56%; right:-10%; bottom:-16%; transform:rotate(5deg);}

/* roadmap */
.tr-road-sec{border-top:1px solid rgba(255,255,255,0.05); position:relative;}
.tr-road-inner{max-width:1200px; margin:0 auto; padding:clamp(70px,10vw,120px) clamp(20px,5vw,64px); position:relative; z-index:1;}
.tr-road{list-style:none; padding:0; margin:24px 0 0; display:flex; flex-direction:column; gap:13px; max-width:64ch;}
.tr-road li{position:relative; padding-left:24px; color:var(--dim); font-size:1rem;}
.tr-road li::before{content:"▹"; position:absolute; left:0; color:var(--accent-2);}

/* final */
.tr-final{
  text-align:center; padding:clamp(96px,15vw,160px) clamp(20px,5vw,64px);
  border-top:1px solid rgba(255,255,255,0.05); position:relative;
  background-color:#0b0e14;
  background-image:
    radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
    radial-gradient(90% 130% at 50% -10%, rgba(137,144,244,.2), transparent 60%);
  background-size:26px 26px, cover;
}
.tr-final > *{position:relative; z-index:1;}
.tr-final .tr-btn{margin-top:28px;}

.tr-foot{
  display:flex; flex-wrap:wrap; gap:14px; justify-content:space-between; align-items:center;
  padding:24px clamp(20px,5vw,64px); border-top:1px solid var(--line);
  font-family:var(--tr-mono),monospace; font-size:.72rem; color:var(--dim);
  background:#090c11;
}
.tr-foot-links{display:flex; gap:18px; flex-wrap:wrap;}
.tr-foot-links a:hover{color:#fff;}

/* reveal (pairs with <Reveal>) */
.tr .reveal{opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);}
.tr .reveal.reveal-in{opacity:1; transform:none;}

@media (max-width:960px){
  .tr-feature-inner,.tr-flip .tr-feature-inner{grid-template-columns:1fr; min-height:0;}
  .tr-copy,.tr-flip .tr-copy{padding:118px 0 20px; order:1; justify-self:start; max-width:none;}
  .tr-body{max-width:none;}
  .tr-chips{max-width:none;}
  .tr-stage,.tr-stage-hero{order:2; margin:8px 0 72px;}
  .tr-win-main,.tr-flip .tr-win-main,.tr-stage-hero .tr-win-main{width:100%; transform:none;}
  .tr-win-float,.tr-flip .tr-win-float,.tr-stage-hero .tr-win-float{width:58%; right:-4%; left:auto; bottom:-14%; transform:rotate(4deg);}
  .tr-ghost{font-size:clamp(7rem,24vw,12rem); top:60px;}
  .tr-ghost-hero{font-size:clamp(9rem,40vw,16rem);}
  .tr-head{padding:16px 20px;}
}
@media (prefers-reduced-motion: reduce){
  .tr *{transition:none !important; animation:none !important;}
  .tr .reveal{opacity:1; transform:none;}
}
`;
