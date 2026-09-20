import Link from "next/link";
import type { Metadata } from "next";
import { ScreenRail } from "@/components/screen-rail";

export const metadata: Metadata = {
  title: "FrameGuide - A live framing coach for your photos",
  description:
    "FrameGuide helps you frame stronger photos while you shoot, not after. AR Frame Match draws a better composition in the scene and you walk until it locks. On-device coaching is free.",
};

const APP_STORE = "https://apps.apple.com/us/app/frameguide/id6799570925";
const PRIVACY = "/frameguide/privacy";
const TERMS = "/frameguide/terms";

const GREEN = "#2fbf9b";

/* ------------------------------------------------------------------ */
/*  Small building blocks for the phone mockups                        */
/* ------------------------------------------------------------------ */

function StatusBar({ time = "17:47" }: { time?: string }) {
  return (
    <div className="fgd-status">
      <span>{time}</span>
      <span className="fgd-status-icons">
        <i className="fgd-sig" />
        <i className="fgd-wifi" />
        <i className="fgd-batt" />
      </span>
    </div>
  );
}

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`fgd-phone ${className}`}>
      <div className="fgd-notch" />
      <div className="fgd-screen">{children}</div>
    </div>
  );
}

/** The viewfinder backdrop every camera screen sits on. */
function Viewfinder({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fgd-view">
      <span className="fgd-sky" />
      <span className="fgd-ground" />
      <span className="fgd-sun" />
      <span className="fgd-peak" />
      <span className="fgd-peak fgd-peak-2" />
      {children}
    </div>
  );
}

function ShutterRow() {
  return (
    <div className="fgd-shutter-row">
      <span className="fgd-roll" />
      <span className="fgd-shutter" />
      <span className="fgd-grid-btn" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen sketches                                                    */
/* ------------------------------------------------------------------ */

function ARScreen() {
  return (
    <>
      <StatusBar time="17:46" />
      <Viewfinder>
        <span className="fgd-chip">AR FRAME MATCH</span>
        <span className="fgd-arframe">
          <i className="fgd-c fgd-c-tl" />
          <i className="fgd-c fgd-c-tr" />
          <i className="fgd-c fgd-c-bl" />
          <i className="fgd-c fgd-c-br" />
        </span>
        <span className="fgd-walk">
          <b>⌃</b>
          WALK INTO THE SHOT
          <em>2.4 m · step back a little</em>
        </span>
      </Viewfinder>
      <ShutterRow />
    </>
  );
}

function ThirdsScreen() {
  return (
    <>
      <StatusBar />
      <div className="fgd-topbar">
        <span className="fgd-title">FrameGuide</span>
        <span className="fgd-mode">▦ RULE OF THIRDS</span>
      </div>
      <Viewfinder>
        <span className="fgd-thirds">
          <i className="fgd-gv1" />
          <i className="fgd-gv2" />
          <i className="fgd-gh1" />
          <i className="fgd-gh2" />
          <i className="fgd-pp fgd-pp-1" />
          <i className="fgd-pp fgd-pp-2" />
          <i className="fgd-pp fgd-pp-3" />
          <i className="fgd-pp fgd-pp-4" />
        </span>
      </Viewfinder>
      <ShutterRow />
    </>
  );
}

function SceneScreen() {
  return (
    <>
      <StatusBar />
      <div className="fgd-s-pad">
        <div className="fgd-sheet-top">
          <span>Cancel</span>
          <span className="fgd-link">Skip</span>
        </div>
        <div className="fgd-eyebrow">
          AR FrameGuide <i className="fgd-badge">AR</i>
        </div>
        <div className="fgd-h1">Scene info</div>
        <div className="fgd-sub">Tell FrameGuide who&apos;s in the shot and where you are.</div>
        <div className="fgd-dots">
          <i className="fgd-dot-on" />
          <i className="fgd-dot-off" />
        </div>

        <div className="fgd-group-head">
          <span>SUBJECT</span>
          <span className="fgd-hint">People coaching on</span>
        </div>
        <div className="fgd-pills">
          <span>None</span>
          <span>Selfie</span>
          <span className="fgd-on">Person</span>
          <span>Group</span>
        </div>

        <div className="fgd-group-head">
          <span>PLACE</span>
          <span className="fgd-hint">Doors, walls, rooms</span>
        </div>
        <div className="fgd-pills">
          <span className="fgd-on">Indoors</span>
          <span>Outdoors</span>
          <span>Landscape</span>
        </div>

        <div className="fgd-cta-fill">Continue</div>
        <div className="fgd-link fgd-centre">Skip — open AR</div>
      </div>
    </>
  );
}

function AlbumScreen() {
  return (
    <>
      <StatusBar time="17:40" />
      <div className="fgd-s-pad">
        <div className="fgd-label">LIBRARY</div>
        <div className="fgd-album">
          <span className="fgd-album-ico" />
          <span>
            <b>Album</b>
            <em>19 shots · Save to Photos from here</em>
          </span>
          <i className="fgd-chev" />
        </div>
        <div className="fgd-roll-grid">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={`fgd-tile fgd-tile-${i % 3}`} />
          ))}
        </div>
      </div>
    </>
  );
}

function ProScreen() {
  return (
    <>
      <StatusBar />
      <div className="fgd-s-pad fgd-pro">
        <span className="fgd-chip fgd-chip-static">FRAMEGUIDE PRO</span>
        <div className="fgd-h1 fgd-centre">Clean saves.</div>
        <div className="fgd-h1 fgd-centre">No watermark.</div>
        <div className="fgd-sub fgd-centre">Free exports can carry a watermark.</div>
        {["No ads", "Clean Photos saves", "Unlimited AR allowance"].map((t) => (
          <div className="fgd-feat" key={t}>
            <i className="fgd-tick" />
            {t}
          </div>
        ))}
        {[
          ["Weekly", "$1.99", false],
          ["Monthly", "$5.99", false],
          ["Yearly", "$39.99", true],
        ].map(([name, price, best]) => (
          <div className={`fgd-plan ${best ? "fgd-plan-best" : ""}`} key={name as string}>
            <b>{name}</b>
            <span>{price}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature section                                                    */
/* ------------------------------------------------------------------ */

function Feature({
  accent,
  variant,
  title,
  body,
  phones,
  flip = false,
}: {
  accent: string;
  variant: string;
  title: React.ReactNode;
  body: string;
  phones: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section className={`fgd-feature fgd-feature-${variant} ${flip ? "fgd-flip" : ""}`}>
      <div className="fgd-feature-inner">
        <div className="fgd-copy">
          <span className="fgd-dash" style={{ background: accent }} />
          <h2 className="fgd-title-lg">{title}</h2>
          <p className="fgd-body">{body}</p>
        </div>
        <div className="fgd-stage">{phones}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FrameGuidePage() {
  return (
    <main className="fgd">
      <style>{CSS}</style>

      <header className="fgd-header">
        <Link href="/" className="fgd-wordmark">
          <span className="fgd-b">B</span>
          BETTERU&nbsp;LLC
        </Link>
        <Link href="/" className="fgd-back">
          ← Back to site
        </Link>
      </header>

      {/* Hero */}
      <section className="fgd-hero">
        <div className="fgd-feature-inner">
          <div className="fgd-copy">
            <span className="fgd-dash" style={{ background: GREEN }} />
            <h1 className="fgd-hero-title">
              Fix the photo
              <br />
              before you take it.
            </h1>
            <p className="fgd-body">
              FrameGuide is a framing coach that lives in the viewfinder. It draws a stronger
              composition over the scene in front of you, and you move until the shot locks in.
            </p>
            <div className="fgd-cta-row">
              <span className="fgd-badge-pill">
                <span className="fgd-dot" /> Out now on iOS
              </span>
              <a className="fgd-btn" href={APP_STORE} target="_blank" rel="noopener noreferrer">
                Download on the App Store →
              </a>
            </div>
            <div className="fgd-legal">
              <span>Free, with FrameGuide Pro available</span>
              <span>·</span>
              <Link href={TERMS}>Terms</Link>
              <span>·</span>
              <Link href={PRIVACY}>Privacy</Link>
            </div>
          </div>
          <div className="fgd-stage">
            <Phone className="fgd-p-back">
              <ThirdsScreen />
            </Phone>
            <Phone className="fgd-p-front">
              <ARScreen />
            </Phone>
          </div>
        </div>
      </section>

      <Feature
        accent={GREEN}
        variant="ar"
        title={
          <>
            It draws the
            <br />
            better frame.
          </>
        }
        body="AR Frame Match pins a suggested composition to the real world. Walk until your view matches it, then shoot — no cropping it back into shape afterwards."
        phones={
          <>
            <Phone className="fgd-p-back">
              <ThirdsScreen />
            </Phone>
            <Phone className="fgd-p-front">
              <ARScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent="#f0923a"
        variant="coach"
        flip
        title={<>On-device coaching, free.</>}
        body="Grids, thirds and live guidance run on your phone at no cost. The AI help is there when you want it, not in the way when you don't."
        phones={
          <>
            <Phone className="fgd-p-back">
              <ARScreen />
            </Phone>
            <Phone className="fgd-p-front">
              <ThirdsScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent={GREEN}
        variant="scene"
        title={
          <>
            Tell it what
            <br />
            it&apos;s looking at.
          </>
        }
        body="One person or a group, indoors or a wide landscape. Set the scene once and the coaching changes to match what you're actually shooting."
        phones={
          <>
            <Phone className="fgd-p-back">
              <AlbumScreen />
            </Phone>
            <Phone className="fgd-p-front">
              <SceneScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent="#f0923a"
        variant="album"
        flip
        title={
          <>
            Shoot first.
            <br />
            Save when ready.
          </>
        }
        body="Shots land in FrameGuide's own album instead of spraying your camera roll. Open one when you're ready and send just the keepers to Photos."
        phones={
          <>
            <Phone className="fgd-p-back">
              <SceneScreen />
            </Phone>
            <Phone className="fgd-p-front">
              <AlbumScreen />
            </Phone>
          </>
        }
      />

      <Feature
        accent={GREEN}
        variant="pro"
        title={
          <>
            Pro drops the
            <br />
            watermark.
          </>
        }
        body="Free exports can carry a FrameGuide watermark. Pro clears it, removes ads and unlocks unlimited AR — and Sign in with Apple keeps it synced across your devices."
        phones={
          <>
            <Phone className="fgd-p-back">
              <AlbumScreen />
            </Phone>
            <Phone className="fgd-p-front">
              <ProScreen />
            </Phone>
          </>
        }
      />

      <ScreenRail
        label="The real thing"
        accent={GREEN}
        shots={[
          { src: "/apps/frameguide/hero.webp", alt: "FrameGuide AR Frame Match" },
          { src: "/apps/frameguide/thirds.webp", alt: "FrameGuide rule-of-thirds camera view" },
          { src: "/apps/frameguide/scene.webp", alt: "FrameGuide scene info sheet" },
          { src: "/apps/frameguide/album.webp", alt: "FrameGuide album" },
          { src: "/apps/frameguide/pro.webp", alt: "FrameGuide Pro" },
        ]}
      />

      {/* CTA */}
      <section className="fgd-final">
        <span className="fgd-dash fgd-dash-center" style={{ background: GREEN }} />
        <h2 className="fgd-title-lg">Your next photo can be the good one.</h2>
        <p className="fgd-body fgd-body-center">
          FrameGuide is on the App Store. On-device coaching is free — open the camera and see
          what it does with the shot you were about to take.
        </p>
        <a className="fgd-btn" href={APP_STORE} target="_blank" rel="noopener noreferrer">
          Download on the App Store →
        </a>
      </section>

      <footer className="fgd-footer">
        <span>© {new Date().getFullYear()} BetterU LLC</span>
        <span className="fgd-foot-links">
          <Link href="/">Home</Link>
          <Link href={PRIVACY}>Privacy</Link>
          <Link href={TERMS}>Terms</Link>
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
.fgd{
  --text:#eef2f1;
  --dim:#8fa5a0;
  --green:#2fbf9b;
  --green-hi:#48c5a0;
  --card:rgba(255,255,255,0.045);
  --stroke:rgba(255,255,255,0.10);
  min-height:100vh;
  color:var(--text);
  background:#07100f;
  font-family:var(--font-inter),Inter,system-ui,sans-serif;
  overflow-x:clip;
}
.fgd a{text-decoration:none;}

/* header */
.fgd-header{
  position:absolute;top:0;left:0;right:0;z-index:10;
  display:flex;align-items:center;justify-content:space-between;
  padding:22px clamp(20px,5vw,64px);
}
.fgd-wordmark{display:flex;align-items:center;gap:10px;font-weight:600;letter-spacing:.06em;font-size:14px;color:#fff;}
.fgd-b{
  width:26px;height:26px;border-radius:999px;background:#fff;color:#07100f;
  display:grid;place-items:center;font-weight:800;font-size:13px;
}
.fgd-back{font-size:13px;color:var(--dim);}
.fgd-back:hover{color:#fff;}

/* shared layout */
.fgd-feature-inner{
  max-width:1200px;margin:0 auto;padding:0 clamp(20px,5vw,64px);
  display:grid;grid-template-columns:1.15fr 1fr;gap:32px;align-items:center;
  min-height:min(88vh,760px);position:relative;
}
.fgd-copy{max-width:600px;padding:80px 0;}
.fgd-dash{display:block;width:64px;height:5px;border-radius:999px;margin-bottom:28px;}
.fgd-dash-center{margin-left:auto;margin-right:auto;}
.fgd-hero-title,.fgd-title-lg{
  font-family:var(--font-dm-sans),"DM Sans",system-ui,sans-serif;
  font-weight:800;letter-spacing:-0.025em;line-height:0.98;margin:0 0 22px;
}
.fgd-hero-title{font-size:clamp(40px,5.2vw,72px);}
.fgd-title-lg{font-size:clamp(34px,4.4vw,58px);}
.fgd-body{font-size:clamp(17px,1.5vw,20px);line-height:1.5;color:var(--dim);margin:0;max-width:34ch;}
.fgd-body-center{margin-left:auto;margin-right:auto;text-align:center;}

/* hero */
.fgd-hero{
  position:relative;
  background:
    radial-gradient(120% 90% at 85% 0%, rgba(47,191,155,.26), transparent 60%),
    radial-gradient(120% 120% at 0% 100%, rgba(20,80,70,.45), transparent 55%),
    linear-gradient(160deg,#0d2a25,#0a1a18 60%,#07100f);
}
.fgd-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;margin-top:34px;}
.fgd-badge-pill{
  display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border-radius:999px;
  background:rgba(255,255,255,0.07);border:1px solid var(--stroke);font-size:13px;color:#d7e6e2;
}
.fgd-dot{width:7px;height:7px;border-radius:999px;background:var(--green);}
.fgd-btn{
  display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:12px;
  font-weight:600;font-size:15px;background:var(--green);color:#052019;
}
.fgd-btn:hover{background:var(--green-hi);}
.fgd-legal{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;font-size:13px;color:var(--dim);}
.fgd-legal a{color:var(--dim);}
.fgd-legal a:hover{color:#fff;}

/* feature backgrounds */
.fgd-feature{position:relative;}
.fgd-feature-ar{background:
  radial-gradient(120% 90% at 90% 10%, rgba(47,191,155,.18), transparent 55%),
  linear-gradient(160deg,#0b201d,#07100f 70%);}
.fgd-feature-coach{background:
  radial-gradient(120% 90% at 10% 10%, rgba(240,146,58,.14), transparent 55%),
  linear-gradient(160deg,#101b1a,#07100f 70%);}
.fgd-feature-scene{background:
  radial-gradient(120% 100% at 88% 0%, rgba(47,191,155,.22), transparent 55%),
  linear-gradient(160deg,#0c2522,#07100f 70%);}
.fgd-feature-album{background:
  radial-gradient(120% 90% at 10% 10%, rgba(240,146,58,.12), transparent 55%),
  linear-gradient(160deg,#0e1c1b,#07100f 70%);}
.fgd-feature-pro{background:
  radial-gradient(120% 100% at 85% 5%, rgba(47,191,155,.24), transparent 55%),
  linear-gradient(160deg,#0d2a25,#07100f 70%);}
.fgd-flip .fgd-feature-inner{grid-template-columns:1fr 1.05fr;}
.fgd-flip .fgd-copy{order:2;justify-self:end;}
.fgd-flip .fgd-stage{order:1;}
.fgd-flip .fgd-stage .fgd-phone{left:auto;right:6%;}
.fgd-flip .fgd-p-front{right:16%;}

/* phone stage */
.fgd-stage{position:relative;height:100%;min-height:520px;}
.fgd-phone{
  position:absolute;top:50%;left:8%;
  width:270px;height:560px;border-radius:42px;
  background:#05100e;border:1px solid rgba(255,255,255,0.12);
  box-shadow:0 40px 90px -30px rgba(0,0,0,.8);
  overflow:hidden;
}
.fgd-p-back{transform:translateY(-46%) rotate(-4deg) scale(.94);opacity:.7;}
.fgd-p-front{left:26%;transform:translateY(-52%) rotate(2deg);}
.fgd-notch{
  position:absolute;top:12px;left:50%;transform:translateX(-50%);
  width:110px;height:22px;border-radius:999px;background:#05100e;z-index:3;
}
.fgd-screen{position:absolute;inset:0;background:#0a1413;padding-top:6px;font-size:11px;
  display:flex;flex-direction:column;}

/* status bar */
.fgd-status{display:flex;justify-content:space-between;align-items:center;
  padding:10px 20px 4px;font-size:11px;font-weight:600;color:#cfe0dc;flex:none;}
.fgd-status-icons{display:flex;gap:5px;align-items:center;}
.fgd-sig,.fgd-wifi,.fgd-batt{display:inline-block;background:#cfe0dc;border-radius:2px;}
.fgd-sig{width:14px;height:9px;}
.fgd-wifi{width:12px;height:9px;}
.fgd-batt{width:20px;height:10px;border-radius:3px;}

/* camera chrome */
.fgd-topbar{flex:none;text-align:center;padding:4px 0 8px;}
.fgd-title{display:block;color:var(--green-hi);font-weight:700;font-size:13px;}
.fgd-mode{display:inline-block;margin-top:5px;padding:3px 10px;border-radius:999px;
  border:1px solid rgba(47,191,155,.5);color:var(--green-hi);font-size:9px;letter-spacing:.06em;}
.fgd-view{position:relative;flex:1;overflow:hidden;}
.fgd-sky{position:absolute;inset:0 0 38% 0;background:linear-gradient(#1b3b46,#3d6470 70%,#7d8f84);}
.fgd-ground{position:absolute;inset:62% 0 0 0;background:linear-gradient(#123029,#08181a);}
.fgd-sun{position:absolute;left:66%;top:22%;width:26px;height:26px;border-radius:999px;
  background:#f6c98d;box-shadow:0 0 30px 12px rgba(246,201,141,.45);}
.fgd-peak{position:absolute;left:8%;bottom:38%;width:0;height:0;
  border-left:44px solid transparent;border-right:44px solid transparent;
  border-bottom:58px solid #24443f;}
.fgd-peak-2{left:40%;border-left-width:34px;border-right-width:34px;border-bottom-width:42px;
  border-bottom-color:#1b3833;}

/* AR overlay */
.fgd-chip{
  position:absolute;top:10px;left:50%;transform:translateX(-50%);
  padding:5px 12px;border-radius:999px;background:rgba(5,26,21,.88);
  color:var(--green-hi);font-size:9px;font-weight:700;letter-spacing:.1em;white-space:nowrap;
}
.fgd-chip-static{position:static;transform:none;align-self:center;margin-bottom:10px;}
.fgd-arframe{position:absolute;left:14%;right:14%;top:22%;bottom:26%;
  border:1.5px solid var(--green-hi);box-shadow:0 0 22px rgba(72,197,160,.5);}
.fgd-c{position:absolute;width:14px;height:14px;border:2.5px solid var(--green-hi);}
.fgd-c-tl{top:-2px;left:-2px;border-right:0;border-bottom:0;}
.fgd-c-tr{top:-2px;right:-2px;border-left:0;border-bottom:0;}
.fgd-c-bl{bottom:-2px;left:-2px;border-right:0;border-top:0;}
.fgd-c-br{bottom:-2px;right:-2px;border-left:0;border-top:0;}
.fgd-walk{position:absolute;left:0;right:0;bottom:8px;text-align:center;
  color:var(--green-hi);font-size:10px;font-weight:700;letter-spacing:.08em;}
.fgd-walk b{display:block;font-size:14px;line-height:1;}
.fgd-walk em{display:block;margin-top:4px;font-style:normal;font-weight:500;
  letter-spacing:0;color:#dcebe7;font-size:9px;}

/* thirds overlay */
.fgd-thirds{position:absolute;inset:0;}
.fgd-thirds i{position:absolute;background:rgba(255,255,255,.65);}
.fgd-gv1,.fgd-gv2{top:0;bottom:0;width:1px;}
.fgd-gv1{left:33.33%;}
.fgd-gv2{left:66.66%;}
.fgd-gh1,.fgd-gh2{left:0;right:0;height:1px;}
.fgd-gh1{top:33.33%;}
.fgd-gh2{top:66.66%;}
.fgd-pp{width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:999px;
  background:#f0923a !important;}
.fgd-pp-1{left:33.33%;top:33.33%;}
.fgd-pp-2{left:66.66%;top:33.33%;}
.fgd-pp-3{left:33.33%;top:66.66%;}
.fgd-pp-4{left:66.66%;top:66.66%;}

/* shutter */
.fgd-shutter-row{flex:none;display:flex;align-items:center;justify-content:space-between;
  padding:12px 18px 16px;background:#050c0b;}
.fgd-roll{width:30px;height:30px;border-radius:8px;
  background:linear-gradient(#35565c,#123029);border:1px solid rgba(255,255,255,.2);}
.fgd-shutter{width:42px;height:42px;border-radius:999px;background:#fff;
  box-shadow:0 0 0 3px #050c0b,0 0 0 5px var(--green);}
.fgd-grid-btn{width:30px;height:30px;border-radius:8px;background:#141d1c;
  background-image:linear-gradient(var(--green) 1px,transparent 1px),
    linear-gradient(90deg,var(--green) 1px,transparent 1px);
  background-size:10px 10px;background-position:-1px -1px;opacity:.85;}

/* sheet screens */
.fgd-s-pad{padding:8px 14px 14px;display:flex;flex-direction:column;gap:7px;flex:1;min-height:0;}
.fgd-sheet-top{display:flex;justify-content:space-between;font-size:11px;color:#cfe0dc;}
.fgd-link{color:var(--green-hi);font-weight:600;}
.fgd-centre{text-align:center;}
.fgd-eyebrow{display:flex;align-items:center;gap:6px;color:var(--green-hi);
  font-weight:700;font-size:10px;margin-top:4px;}
.fgd-badge{font-style:normal;background:rgba(47,191,155,.18);border-radius:6px;
  padding:1px 5px;font-size:8px;}
.fgd-h1{font-family:var(--font-dm-sans),"DM Sans",sans-serif;font-weight:800;
  font-size:19px;color:#fff;line-height:1.1;}
.fgd-sub{color:#8fa5a0;font-size:10px;line-height:1.35;}
.fgd-dots{display:flex;gap:5px;align-items:center;margin:2px 0 4px;}
.fgd-dot-on{width:16px;height:4px;border-radius:999px;background:var(--green);}
.fgd-dot-off{width:4px;height:4px;border-radius:999px;background:rgba(255,255,255,.28);}
.fgd-group-head{display:flex;justify-content:space-between;align-items:baseline;
  font-size:9px;font-weight:700;letter-spacing:.08em;color:#b6c8c4;margin-top:5px;}
.fgd-hint{font-weight:500;letter-spacing:0;color:#6f8581;}
.fgd-pills{display:flex;flex-wrap:wrap;gap:5px;}
.fgd-pills span{padding:5px 11px;border-radius:999px;background:#1d2524;
  font-size:10px;font-weight:600;color:#e6efed;}
.fgd-pills .fgd-on{background:var(--green);color:#052019;}
.fgd-cta-fill{margin-top:auto;background:var(--green);color:#052019;font-weight:700;
  font-size:12px;text-align:center;padding:10px;border-radius:12px;}

/* album */
.fgd-label{font-size:9px;font-weight:700;letter-spacing:.1em;color:#8fa5a0;}
.fgd-album{display:flex;align-items:center;gap:9px;background:#161f1e;border-radius:14px;padding:9px;}
.fgd-album-ico{width:30px;height:30px;border-radius:9px;background:rgba(47,191,155,.2);
  border:1.5px solid var(--green-hi);flex:none;}
.fgd-album b{display:block;color:#fff;font-size:12px;}
.fgd-album em{display:block;font-style:normal;color:#8fa5a0;font-size:9px;margin-top:2px;}
.fgd-chev{margin-left:auto;width:7px;height:7px;border-right:2px solid #8fa5a0;
  border-top:2px solid #8fa5a0;transform:rotate(45deg);flex:none;}
.fgd-roll-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-top:2px;}
.fgd-tile{aspect-ratio:3/4;border-radius:6px;}
.fgd-tile-0{background:linear-gradient(160deg,#3d6470,#123029);}
.fgd-tile-1{background:linear-gradient(200deg,#7d8f84,#1b3833);}
.fgd-tile-2{background:linear-gradient(140deg,#f6c98d,#24443f);}

/* pro */
.fgd-pro{align-items:stretch;}
.fgd-feat{display:flex;align-items:center;gap:8px;background:#16201e;border-radius:12px;
  padding:9px 11px;font-size:11px;font-weight:600;color:#e6efed;}
.fgd-tick{width:15px;height:15px;border-radius:999px;background:var(--green);flex:none;}
.fgd-plan{display:flex;justify-content:space-between;align-items:center;
  background:#141c1b;border:1px solid rgba(255,255,255,.08);border-radius:12px;
  padding:9px 12px;font-size:11px;color:#e6efed;}
.fgd-plan b{font-size:12px;}
.fgd-plan-best{background:rgba(47,191,155,.14);border-color:var(--green);}
.fgd-plan-best span{color:var(--green-hi);font-weight:700;}

/* final + footer */
.fgd-final{
  text-align:center;padding:clamp(90px,14vw,150px) clamp(20px,5vw,64px);
  background:
    radial-gradient(90% 120% at 50% 0%, rgba(47,191,155,.2), transparent 60%),
    linear-gradient(180deg,#0a1a18,#07100f);
}
.fgd-final .fgd-btn{margin-top:30px;}
.fgd-footer{
  display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;align-items:center;
  padding:26px clamp(20px,5vw,64px);border-top:1px solid var(--stroke);
  color:#6f8581;font-size:13px;background:#050c0b;
}
.fgd-foot-links{display:flex;gap:18px;flex-wrap:wrap;}
.fgd-foot-links a{color:#6f8581;}
.fgd-foot-links a:hover{color:#fff;}

/* responsive */
@media (max-width:960px){
  .fgd-feature-inner,.fgd-flip .fgd-feature-inner{grid-template-columns:1fr;min-height:0;}
  .fgd-copy,.fgd-flip .fgd-copy{padding:96px 0 24px;order:1;justify-self:start;max-width:none;}
  .fgd-body{max-width:none;}
  .fgd-stage{order:2;height:auto;min-height:0;margin-bottom:70px;
    display:flex;justify-content:center;gap:0;}
  .fgd-phone,.fgd-flip .fgd-stage .fgd-phone{position:relative;top:auto;left:auto;right:auto;
    width:210px;height:440px;}
  .fgd-p-back{transform:rotate(-4deg) scale(.9);margin-right:-70px;}
  .fgd-p-front,.fgd-flip .fgd-p-front{transform:rotate(3deg);right:auto;}
  .fgd-header{padding:16px 20px;}
  .fgd-hero-title{font-size:clamp(38px,9.5vw,54px);}
}
@media (max-width:420px){
  .fgd-stage{transform:scale(.86);}
  .fgd-cta-row{gap:12px;}
}
`;
