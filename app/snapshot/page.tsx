import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapshot - Catch them in the act",
  description:
    "Snapshot is a social game for your friend group. You get a secret target and a task — catch them doing it on camera, submit the proof, and don't finish last. Rounds, blind voting, and a punishment for the loser.",
};

/* ------------------------------------------------------------------ */
/*  Phone mockup building blocks                                       */
/* ------------------------------------------------------------------ */

function StatusBar({ time = "17:41" }: { time?: string }) {
  return (
    <div className="snp-status">
      <span>{time}</span>
      <span className="snp-status-icons">
        <i className="snp-sig" />
        <i className="snp-wifi" />
        <i className="snp-batt" />
      </span>
    </div>
  );
}

function TabBar({ active }: { active: "chat" | "hunt" | "board" | "profile" }) {
  const items: { k: typeof active; label: string }[] = [
    { k: "chat", label: "Chat" },
    { k: "hunt", label: "Hunt" },
    { k: "board", label: "Leaderboard" },
    { k: "profile", label: "Profile" },
  ];
  return (
    <div className="snp-tabbar">
      {items.map((it) => (
        <span key={it.k} className={`snp-tab ${active === it.k ? "snp-tab-on" : ""}`}>
          <i className="snp-tab-dot" />
          {it.label}
        </span>
      ))}
    </div>
  );
}

function Photo({ label }: { label?: string }) {
  return (
    <div className="snp-photo">
      <svg viewBox="0 0 80 110" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2b2f36" />
            <stop offset="1" stopColor="#15171b" />
          </linearGradient>
        </defs>
        <rect width="80" height="110" fill="url(#pg)" />
        <circle cx="40" cy="42" r="15" fill="#3b4048" />
        <rect x="18" y="60" width="44" height="42" rx="14" fill="#3b4048" />
      </svg>
      {label && <span className="snp-photo-tag">{label}</span>}
    </div>
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`snp-phone ${className}`}>
      <div className="snp-notch" />
      <div className="snp-screen">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen sketches                                                    */
/* ------------------------------------------------------------------ */

function RevealScreen() {
  return (
    <>
      <StatusBar />
      <div className="snp-pad snp-center snp-mid">
        <div className="snp-eyebrow">TARGET</div>
        <div className="snp-big">Donald Gonzalez</div>
        <div className="snp-eyebrow snp-mt">TASK</div>
        <div className="snp-big snp-big-sm">Hand/s Making Finger Guns</div>
        <div className="snp-btn-light snp-mt2">Continue</div>
      </div>
    </>
  );
}

function HuntScreen() {
  return (
    <>
      <StatusBar />
      <div className="snp-pad">
        <div className="snp-row snp-between">
          <span className="snp-h1">Hunt</span>
          <span className="snp-chip-light">Host</span>
        </div>
        <div className="snp-card snp-center">
          <div className="snp-tiny snp-spread">ROUND 1 · TIME LEFT</div>
          <div className="snp-clock">
            <span>05</span>
            <b>:</b>
            <span>59</span>
            <b>:</b>
            <span>43</span>
          </div>
        </div>
        <div className="snp-card">
          <div className="snp-line snp-green">⚑ Round 1</div>
          <div className="snp-strong snp-mb">Round in progress</div>
          <div className="snp-inset">
            <div className="snp-tiny">YOUR TARGET</div>
            <div className="snp-strong">Donald Gonzalez</div>
            <div className="snp-tiny snp-mt">YOUR TASK</div>
            <div className="snp-strong">Hand/s Making Finger Guns</div>
          </div>
          <div className="snp-btn-ghost">Reroll task (1 per round)</div>
          <div className="snp-btn-light">Take photo for proof</div>
        </div>
      </div>
      <TabBar active="hunt" />
    </>
  );
}

function VoteScreen() {
  return (
    <>
      <StatusBar time="17:46" />
      <div className="snp-pad">
        <div className="snp-strong">Vote on submissions</div>
        <div className="snp-tiny snp-mb">
          Blind voting — no names shown. Approve if the proof shows the task.
        </div>
        <div className="snp-card">
          <div className="snp-strong snp-mb">Hand On Forehead</div>
          <div className="snp-tiny snp-mb">Proof (blind — assassin photo hidden until approved)</div>
          <Photo />
          <div className="snp-btn-split">
            <span className="snp-btn-light snp-flex">Approve</span>
            <span className="snp-btn-ghost snp-flex">Reject</span>
          </div>
        </div>
      </div>
      <TabBar active="hunt" />
    </>
  );
}

function FeedScreen() {
  return (
    <>
      <StatusBar time="17:48" />
      <div className="snp-pad">
        <div className="snp-row snp-between">
          <span>
            <span className="snp-h1">Friend Group</span>
            <span className="snp-tiny snp-block">3 members</span>
          </span>
          <span className="snp-chip-ghost">＋ Invite</span>
        </div>
        <div className="snp-card snp-bar-green">
          <div className="snp-line snp-green">
            <span className="snp-badge-green">⚡</span> ASSASSINATION
          </div>
          <div className="snp-strong snp-mt">
            Donald Gonzalez was assassinated by Jeremy Smith.
          </div>
          <div className="snp-chip-flag">⚑ Hand/s Making Finger Guns</div>
          <div className="snp-pill-green">✓ Approved</div>
          <Photo label="PROOF" />
        </div>
      </div>
      <div className="snp-msgbar">
        <span className="snp-msg-gif">GIF</span>
        <span className="snp-msg-input">Message…</span>
        <span className="snp-msg-send">Send</span>
      </div>
    </>
  );
}

function BoardScreen() {
  const rows = [
    { r: 1, n: "Jeremy Smith", tag: "host", pts: "10", cls: "snp-pts-green" },
    { r: 2, n: "Jane Johnson", tag: "you", pts: "0", cls: "" },
    { r: 3, n: "Donald Gonzalez", tag: "", pts: "-10", cls: "snp-pts-red" },
  ];
  return (
    <>
      <StatusBar time="17:48" />
      <div className="snp-pad">
        <div className="snp-h1">Leaderboard</div>
        <div className="snp-chip-ghost snp-inline">Current game</div>
        <div className="snp-card">
          <div className="snp-line">
            <span className="snp-strong">Punishment vote</span>
            <span className="snp-chip-ghost snp-sm">24h left</span>
          </div>
          <div className="snp-btn-light snp-mt">Suggest punishment</div>
          <div className="snp-inset snp-mt">
            <div className="snp-between">
              <span className="snp-strong">Buy dinner for the group!</span>
              <span className="snp-pill-mini">✓ Voted</span>
            </div>
            <div className="snp-tiny">Jeremy Smith · 2 votes</div>
          </div>
        </div>
        {rows.map((row) => (
          <div className="snp-card snp-rank" key={row.n}>
            <span className="snp-rank-n">{row.r}</span>
            <span className="snp-avatar" />
            <span className="snp-rank-mid">
              <span className="snp-strong">
                {row.n}
                {row.tag && <span className="snp-dim"> · {row.tag}</span>}
              </span>
              <span className={`snp-rank-pts ${row.cls}`}>{row.pts} pts</span>
            </span>
          </div>
        ))}
      </div>
      <TabBar active="board" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature section                                                    */
/* ------------------------------------------------------------------ */

function Feature({
  accent,
  variant,
  step,
  title,
  body,
  phones,
  flip = false,
}: {
  accent: string;
  variant: string;
  step: string;
  title: React.ReactNode;
  body: string;
  phones: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section className={`snp-feature snp-feature-${variant} ${flip ? "snp-flip" : ""}`}>
      <div className="snp-feature-inner">
        <div className="snp-copy">
          <span className="snp-dash" style={{ background: accent }} />
          <span className="snp-step" style={{ color: accent }}>
            {step}
          </span>
          <h2 className="snp-title">{title}</h2>
          <p className="snp-body">{body}</p>
        </div>
        <div className="snp-stage">{phones}</div>
      </div>
    </section>
  );
}

const GREEN = "#22c55e";
const RED = "#ef4444";
const APP_STORE = "https://apps.apple.com/us/app/snapshot-assassin/id6759542117";
const TESTFLIGHT = "https://testflight.apple.com/join/wWCrYPSd";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SnapshotPage() {
  return (
    <main className="snp">
      <style>{CSS}</style>

      <header className="snp-header">
        <Link href="/" className="snp-wordmark">
          <span className="snp-b">B</span>
          BETTERU&nbsp;LLC
        </Link>
        <Link href="/" className="snp-back">
          ← Back to site
        </Link>
      </header>

      {/* Hero */}
      <section className="snp-hero">
        <div className="snp-feature-inner">
          <div className="snp-copy">
            <span className="snp-dash" style={{ background: GREEN }} />
            <h1 className="snp-hero-title">
              Catch them
              <br />
              in the act.
            </h1>
            <p className="snp-body">
              Snapshot is a social game for your friend group. You get a secret target and a task —
              catch them doing it on camera before someone catches you.
            </p>
            <div className="snp-cta-row">
              <span className="snp-badge">
                <span className="snp-dot" /> Out now on iOS
              </span>
              <a className="snp-btn" href={APP_STORE} target="_blank" rel="noopener noreferrer">
                Download on the App Store →
              </a>
            </div>
            <div className="snp-legal">
              <a href={TESTFLIGHT} target="_blank" rel="noopener noreferrer">
                TestFlight beta
              </a>
              <span>·</span>
              <Link href="/snapshot/terms">Terms</Link>
              <span>·</span>
              <Link href="/snapshot/privacy">Privacy</Link>
            </div>
          </div>
          <div className="snp-stage">
            <Phone className="snp-p-back">
              <HuntScreen />
            </Phone>
            <Phone className="snp-p-front">
              <RevealScreen />
            </Phone>
          </div>
        </div>
      </section>

      <Feature
        accent={GREEN}
        variant="target"
        step="01 · The setup"
        title={<>You get a target and a task.</>}
        body="At the start of every round Snapshot hands you one person in the group and one thing to catch them doing — a pose, a gesture, a habit. Everyone is hunting someone."
        phones={
          <>
            <Phone className="snp-p-back">
              <RevealScreen />
            </Phone>
            <Phone className="snp-p-front">
              <HuntScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent={RED}
        variant="vote"
        flip
        step="02 · The proof"
        title={
          <>
            Snap it. The group
            <br />
            votes blind.
          </>
        }
        body="Take a photo that clearly shows the task. Everyone else votes on the proof with no names attached — approve if it shows the task, reject if it doesn't."
        phones={
          <>
            <Phone className="snp-p-back">
              <VoteScreen />
            </Phone>
            <Phone className="snp-p-front">
              <VoteScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent={GREEN}
        variant="feed"
        step="03 · The kill feed"
        title={<>Every hit hits the feed.</>}
        body="Approved catches drop straight into the group chat — who got assassinated, by whom, the task, and the photo. Rejected attempts just quietly disappear."
        phones={
          <>
            <Phone className="snp-p-back">
              <FeedScreen />
            </Phone>
            <Phone className="snp-p-front">
              <FeedScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent={GREEN}
        variant="board"
        flip
        step="04 · The reckoning"
        title={
          <>
            Rounds stack up.
            <br />
            Last place pays.
          </>
        }
        body="+10 for a clean catch, −10 for getting caught. After the final round the group runs a 24-hour punishment vote — and whoever finished last does whatever wins."
        phones={
          <>
            <Phone className="snp-p-back">
              <BoardScreen />
            </Phone>
            <Phone className="snp-p-front">
              <BoardScreen />
            </Phone>
          </>
        }
      />

      {/* CTA */}
      <section className="snp-final">
        <span className="snp-dash snp-dash-center" style={{ background: GREEN }} />
        <h2 className="snp-title">Round one starts tonight.</h2>
        <p className="snp-body snp-body-center">
          Snapshot is on the App Store. Download it, start a group, and hand out the first targets.
        </p>
        <a className="snp-btn" href={APP_STORE} target="_blank" rel="noopener noreferrer">
          Download on the App Store →
        </a>
      </section>

      <footer className="snp-footer">
        <span>© {new Date().getFullYear()} BetterU LLC</span>
        <span className="snp-foot-links">
          <Link href="/">Home</Link>
          <Link href="/snapshot/privacy">Privacy</Link>
          <Link href="/snapshot/terms">Terms</Link>
          <a href="mailto:app@betterullc.com">app@betterullc.com</a>
        </span>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                      */
/* ------------------------------------------------------------------ */

const CSS = `
.snp{
  --text:#f4f5f7;
  --dim:#8b909a;
  --card:rgba(255,255,255,0.04);
  --stroke:rgba(255,255,255,0.09);
  --green:#22c55e;
  --red:#ef4444;
  min-height:100vh;color:var(--text);
  background:#08090b;
  font-family:var(--font-inter),Inter,system-ui,sans-serif;
  overflow-x:clip;
}
.snp a{text-decoration:none;}

.snp-header{
  position:absolute;top:0;left:0;right:0;z-index:10;
  display:flex;align-items:center;justify-content:space-between;
  padding:22px clamp(20px,5vw,64px);
}
.snp-wordmark{display:flex;align-items:center;gap:10px;font-weight:600;letter-spacing:.06em;font-size:14px;color:#fff;}
.snp-b{width:26px;height:26px;border-radius:999px;background:#fff;color:#08090b;display:grid;place-items:center;font-weight:800;font-size:13px;}
.snp-back{font-size:13px;color:var(--dim);}
.snp-back:hover{color:#fff;}

.snp-feature-inner{
  max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,64px);
  display:grid;grid-template-columns:1.15fr 1fr;gap:32px;align-items:center;
  min-height:min(88vh,760px);position:relative;
}
.snp-copy{max-width:600px;padding:80px 0;}
.snp-dash{display:block;width:60px;height:5px;border-radius:999px;margin-bottom:22px;}
.snp-dash-center{margin-left:auto;margin-right:auto;}
.snp-step{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;}
.snp-hero-title,.snp-title{
  font-family:var(--font-dm-sans),"DM Sans",system-ui,sans-serif;
  font-weight:800;letter-spacing:-0.02em;line-height:0.98;margin:14px 0 20px;
}
.snp-hero-title{font-size:clamp(42px,5.6vw,78px);margin-top:0;}
.snp-title{font-size:clamp(32px,4.4vw,58px);}
.snp-body{font-size:clamp(16px,1.4vw,20px);line-height:1.55;color:var(--dim);margin:0;max-width:34ch;}
.snp-body-center{margin-left:auto;margin-right:auto;text-align:center;max-width:46ch;}

.snp-hero{
  position:relative;
  background:
    radial-gradient(120% 90% at 88% 0%, rgba(34,197,94,.14), transparent 55%),
    radial-gradient(120% 120% at 0% 100%, rgba(255,255,255,.04), transparent 55%),
    linear-gradient(170deg,#0c0f10,#08090b);
}
.snp-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:32px;}
.snp-badge{
  display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border-radius:999px;
  background:rgba(255,255,255,0.05);border:1px solid var(--stroke);font-size:13px;color:#d6d9de;
}
.snp-dot{width:7px;height:7px;border-radius:999px;background:var(--green);}
.snp-btn{
  display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:12px;
  font-weight:700;font-size:15px;background:#fff;color:#08090b;
}
.snp-btn:hover{background:#e6e7ea;}
.snp-legal{display:flex;gap:10px;align-items:center;margin-top:20px;font-size:13px;color:var(--dim);}
.snp-legal a:hover{color:#fff;}

.snp-feature{position:relative;border-top:1px solid rgba(255,255,255,0.05);}
.snp-feature-target{background:linear-gradient(170deg,#0a0c0d,#08090b);}
.snp-feature-vote{background:
  radial-gradient(120% 90% at 90% 12%, rgba(239,68,68,.10), transparent 55%),
  linear-gradient(170deg,#0c0a0b,#08090b);}
.snp-feature-feed{background:
  radial-gradient(120% 90% at 90% 12%, rgba(34,197,94,.12), transparent 55%),
  linear-gradient(170deg,#0a0d0b,#08090b);}
.snp-feature-board{background:linear-gradient(170deg,#0b0d0e,#08090b);}
.snp-flip .snp-feature-inner{grid-template-columns:1fr 1.15fr;}
.snp-flip .snp-copy{order:2;justify-self:end;}
.snp-flip .snp-stage{order:1;}
.snp-flip .snp-stage .snp-phone{left:auto;right:8%;}
.snp-flip .snp-p-front{right:24%;}

.snp-stage{position:relative;height:100%;min-height:520px;}
.snp-phone{
  position:absolute;top:50%;left:8%;
  width:270px;height:560px;border-radius:42px;background:#000;
  border:1px solid rgba(255,255,255,0.14);
  box-shadow:0 40px 90px -30px rgba(0,0,0,.8);overflow:hidden;
}
.snp-p-back{transform:translateY(-46%) rotate(-4deg) scale(.94);opacity:.7;}
.snp-p-front{left:26%;transform:translateY(-52%) rotate(2deg);}
.snp-notch{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:110px;height:22px;border-radius:999px;background:#000;z-index:3;}
.snp-screen{position:absolute;inset:0;background:#0a0b0d;padding-top:6px;font-size:11px;display:flex;flex-direction:column;}

.snp-status{display:flex;justify-content:space-between;align-items:center;padding:10px 22px 4px;font-size:11px;font-weight:600;color:#cdd0d6;}
.snp-status-icons{display:flex;gap:5px;align-items:center;}
.snp-sig,.snp-wifi,.snp-batt{display:inline-block;background:#cdd0d6;border-radius:2px;}
.snp-sig{width:14px;height:9px;}
.snp-wifi{width:12px;height:9px;}
.snp-batt{width:20px;height:10px;border-radius:3px;}

.snp-pad{padding:10px 15px 14px;display:flex;flex-direction:column;gap:9px;flex:1;overflow:hidden;}
.snp-h1{font-family:var(--font-dm-sans),"DM Sans",sans-serif;font-weight:800;font-size:19px;color:#fff;}
.snp-block{display:block;}
.snp-inline{display:inline-block;}
.snp-strong{font-weight:700;color:#fff;font-size:12px;}
.snp-dim{color:var(--dim);font-weight:500;}
.snp-tiny{color:#8b909a;font-size:10px;line-height:1.4;letter-spacing:.02em;}
.snp-spread{letter-spacing:.12em;}
.snp-eyebrow{color:#6f747d;font-size:11px;font-weight:700;letter-spacing:.16em;}
.snp-mb{margin-bottom:6px;}
.snp-mt{margin-top:6px;}
.snp-mt2{margin-top:18px;}
.snp-row{display:flex;align-items:center;gap:8px;}
.snp-between{justify-content:space-between;}
.snp-center{align-items:center;text-align:center;}
.snp-mid{justify-content:center;flex:1;}
.snp-card{background:var(--card);border:1px solid var(--stroke);border-radius:14px;padding:11px 12px;display:flex;flex-direction:column;gap:7px;}
.snp-inset{background:rgba(255,255,255,0.04);border:1px solid var(--stroke);border-radius:10px;padding:9px 10px;}
.snp-line{display:flex;align-items:center;gap:7px;font-size:11px;color:#d7dae0;}
.snp-green{color:var(--green);font-weight:700;font-size:10px;letter-spacing:.06em;}
.snp-big{font-family:var(--font-dm-sans),"DM Sans",sans-serif;font-weight:800;font-size:20px;color:#fff;line-height:1.1;margin-top:2px;}
.snp-big-sm{font-size:16px;}
.snp-btn-light{background:#fff;color:#08090b;font-weight:700;font-size:12px;text-align:center;padding:11px;border-radius:11px;}
.snp-btn-ghost{background:rgba(255,255,255,0.06);border:1px solid var(--stroke);color:#e7e9ec;font-weight:700;font-size:12px;text-align:center;padding:11px;border-radius:11px;}
.snp-btn-split{display:flex;gap:8px;}
.snp-flex{flex:1;}
.snp-chip-light{background:#fff;color:#08090b;font-weight:700;font-size:10px;padding:4px 10px;border-radius:999px;}
.snp-chip-ghost{background:rgba(255,255,255,0.06);border:1px solid var(--stroke);color:#c8ccd2;font-size:10px;padding:4px 10px;border-radius:999px;}
.snp-chip-ghost.snp-sm{font-size:9px;padding:3px 8px;}
.snp-chip-flag{background:rgba(255,255,255,0.05);border:1px solid var(--stroke);color:#d7dae0;font-size:10px;padding:6px 9px;border-radius:8px;}
.snp-clock{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:4px;}
.snp-clock span{background:rgba(255,255,255,0.06);border:1px solid var(--stroke);border-radius:9px;padding:8px 10px;font-family:var(--font-dm-sans),"DM Sans",sans-serif;font-weight:800;font-size:16px;color:#fff;}
.snp-clock b{color:#565b63;}
.snp-bar-green{border-left:3px solid var(--green);}
.snp-badge-green{background:rgba(34,197,94,.18);color:var(--green);width:20px;height:20px;border-radius:6px;display:inline-grid;place-items:center;font-size:11px;}
.snp-pill-green{align-self:flex-start;display:inline-flex;align-items:center;gap:5px;background:var(--green);color:#04140a;font-weight:800;font-size:10px;padding:5px 10px;border-radius:999px;}
.snp-pill-mini{background:#fff;color:#08090b;font-weight:800;font-size:9px;padding:3px 8px;border-radius:999px;}
.snp-photo{position:relative;width:96px;height:132px;border-radius:10px;overflow:hidden;border:1px solid var(--stroke);}
.snp-photo svg{width:100%;height:100%;display:block;}
.snp-photo-tag{position:absolute;top:6px;left:6px;font-size:8px;font-weight:800;letter-spacing:.1em;color:#cdd0d6;background:rgba(0,0,0,.45);padding:2px 5px;border-radius:5px;}
.snp-msgbar{margin-top:auto;display:flex;align-items:center;gap:7px;padding:9px 12px;border-top:1px solid var(--stroke);}
.snp-msg-gif{font-size:9px;font-weight:700;color:#c8ccd2;background:rgba(255,255,255,0.06);border-radius:999px;padding:6px 9px;}
.snp-msg-input{flex:1;font-size:10px;color:#7b808a;background:rgba(255,255,255,0.05);border-radius:999px;padding:7px 11px;}
.snp-msg-send{font-size:9px;font-weight:800;color:#08090b;background:#fff;border-radius:999px;padding:6px 11px;}
.snp-rank{flex-direction:row;align-items:center;gap:10px;}
.snp-rank-n{font-family:var(--font-dm-sans),"DM Sans",sans-serif;font-weight:800;font-size:14px;color:#fff;width:14px;text-align:center;}
.snp-avatar{width:30px;height:30px;border-radius:999px;background:linear-gradient(135deg,#3a3f47,#22262c);flex-shrink:0;}
.snp-rank-mid{display:flex;flex-direction:column;gap:2px;flex:1;}
.snp-rank-pts{font-size:11px;font-weight:800;color:#e7e9ec;}
.snp-pts-green{color:var(--green);}
.snp-pts-red{color:var(--red);}
.snp-tabbar{margin-top:auto;display:flex;justify-content:space-between;padding:10px 16px 12px;border-top:1px solid var(--stroke);}
.snp-tab{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:8px;color:#6b7079;}
.snp-tab-dot{width:12px;height:12px;border-radius:4px;background:#6b7079;}
.snp-tab-on{color:#fff;}
.snp-tab-on .snp-tab-dot{background:#fff;}

.snp-final{
  text-align:center;padding:clamp(90px,14vw,150px) clamp(20px,5vw,64px);
  border-top:1px solid rgba(255,255,255,0.05);
  background:radial-gradient(90% 120% at 50% 0%, rgba(34,197,94,.12), transparent 60%),linear-gradient(180deg,#0a0d0b,#08090b);
}
.snp-final .snp-btn{margin-top:28px;}
.snp-footer{
  display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;align-items:center;
  padding:24px clamp(20px,5vw,64px);border-top:1px solid var(--stroke);
  color:#767b84;font-size:13px;background:#070809;
}
.snp-foot-links{display:flex;gap:18px;flex-wrap:wrap;}
.snp-foot-links a:hover{color:#fff;}

@media (max-width:960px){
  .snp-feature-inner,.snp-flip .snp-feature-inner{grid-template-columns:1fr;min-height:0;}
  .snp-copy,.snp-flip .snp-copy{padding:96px 0 20px;order:1;justify-self:start;max-width:none;}
  .snp-body{max-width:none;}
  .snp-stage{order:2;height:auto;min-height:0;margin-bottom:64px;display:flex;justify-content:center;}
  .snp-phone,.snp-flip .snp-stage .snp-phone{position:relative;top:auto;left:auto;right:auto;width:212px;height:440px;}
  .snp-p-back{transform:rotate(-4deg) scale(.9);margin-right:-64px;}
  .snp-p-front,.snp-flip .snp-p-front{transform:rotate(3deg);right:auto;}
  .snp-header{padding:16px 20px;}
  .snp-hero-title{font-size:clamp(38px,10vw,52px);}
}
@media (max-width:420px){
  .snp-stage{transform:scale(.86);}
}
`;
