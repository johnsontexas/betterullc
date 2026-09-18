// The four BetterU LLC apps — one source of truth for the homepage hero,
// the app chapters and the footer.

export type AppId = "betteru" | "snapshot" | "cogtrack" | "terrarium";

export type Shot = {
  src: string;
  alt: string;
  /** step headline shown while this screen is in front */
  title: string;
  body: string;
};

export type AppInfo = {
  id: AppId;
  n: string;
  name: string;
  short: string;
  tag: string;
  status: string;
  line: string;
  href: string;
  external?: boolean;
  cta: string;
  /** particle / accent colour */
  color: string;
  /** second accent, used sparingly */
  color2: string;
  bg: string;
  /** "phone" = 1206×2622 portrait screens, "desktop" = 16:10 windows */
  device: "phone" | "desktop";
  shots: Shot[];
  toy: { title: string; hint: string };
};

export const APPS: AppInfo[] = [
  {
    id: "betteru",
    n: "01",
    name: "BetterU Social Fitness",
    short: "BetterU",
    tag: "Social fitness",
    status: "On the App Store",
    line: "Workouts, meals and mindfulness, with a team, a feed and a league table keeping everyone honest.",
    href: "https://betteruai.com",
    external: true,
    cta: "Visit betteruai.com",
    color: "#3ee0e0",
    color2: "#f97316",
    bg: "#05090a",
    device: "phone",
    shots: [
      {
        src: "/apps/betteru/workouts.webp",
        alt: "BetterU workouts screen with Create Workout and Generate Workout buttons",
        title: "Build it, or let it build it",
        body: "Make a workout, generate one, or grab the one your friend just shared with you.",
      },
      {
        src: "/apps/betteru/log.webp",
        alt: "BetterU logging sets of bench press",
        title: "Log every set",
        body: "Weight, reps, rest. Tap through a session without leaving the gym floor.",
      },
      {
        src: "/apps/betteru/feed.webp",
        alt: "BetterU community feed with friends' workouts and meditation",
        title: "Your friends see it",
        body: "Every session lands in the feed. Likes, comments, and a quiet nudge to keep up.",
      },
      {
        src: "/apps/betteru/leaderboard.webp",
        alt: "BetterU global team leaderboard",
        title: "Teams climb leagues",
        body: "Earn trophies together and move your team from Bronze to the top of the table.",
      },
      {
        src: "/apps/betteru/coach.webp",
        alt: "Atlas, BetterU's AI fitness coach",
        title: "A coach in your pocket",
        body: "Atlas answers the 'how do I…' questions, and plans meals that fit your goals.",
      },
      {
        src: "/apps/betteru/meditate.webp",
        alt: "BetterU mindful meditation timer",
        title: "Mind counts too",
        body: "Breathing, meditation and stress relief sessions sit right beside your lifts.",
      },
    ],
    toy: { title: "Race your friends", hint: "Tap to log a rep" },
  },
  {
    id: "snapshot",
    n: "02",
    name: "Snapshot",
    short: "Snapshot",
    tag: "Photo-tag game",
    status: "On the App Store",
    line: "A secret target and a task every round. Catch them on camera before someone catches you.",
    href: "/snapshot",
    cta: "See how it works",
    color: "#22c55e",
    color2: "#ef4444",
    bg: "#0b0d10",
    device: "phone",
    shots: [
      {
        src: "/apps/snapshot/hero.webp",
        alt: "Snapshot: your friends are the targets",
        title: "Your friends are the targets",
        body: "Everyone in the group chat gets someone to hunt, and someone hunting them.",
      },
      {
        src: "/apps/snapshot/hunt.webp",
        alt: "Snapshot hunt screen with a target and a task",
        title: "Catch them in the act",
        body: "A pose, a gesture, a habit. Snap your target doing it before the clock runs out.",
      },
      {
        src: "/apps/snapshot/vote.webp",
        alt: "Snapshot blind voting screen",
        title: "The group votes blind",
        body: "No names attached. Approve the proof or reject it. It's up to the room.",
      },
      {
        src: "/apps/snapshot/feed.webp",
        alt: "Snapshot group chat feed showing an approved hit",
        title: "Every kill hits the chat",
        body: "Who got who, and the photo that proved it, posted straight to the group.",
      },
      {
        src: "/apps/snapshot/reckoning.webp",
        alt: "Snapshot leaderboard and punishment vote",
        title: "Last place pays up",
        body: "+10 for a clean catch, −10 for getting caught. Then the group picks the punishment.",
      },
    ],
    toy: { title: "Snap the target", hint: "Tap them before they move" },
  },
  {
    id: "cogtrack",
    n: "03",
    name: "CogTrack",
    short: "CogTrack",
    tag: "Mind training",
    status: "Coming soon",
    line: "A 60-second check-in and five science-backed tests that turn a few minutes a day into a trend line.",
    href: "/cogtrack",
    cta: "Preview CogTrack",
    color: "#ff7eb6",
    color2: "#c9b8ff",
    bg: "#1a0d3a",
    device: "phone",
    shots: [
      {
        src: "/apps/cogtrack/home.webp",
        alt: "CogTrack home with streak and daily check-in",
        title: "Check in daily",
        body: "Sleep, mood and a streak. Context that makes your scores mean something.",
      },
      {
        src: "/apps/cogtrack/tests.webp",
        alt: "CogTrack list of cognitive tests",
        title: "Five real tests",
        body: "Reaction time, Go/No-Go, Stroop, N-Back and sustained attention.",
      },
      {
        src: "/apps/cogtrack/stroop.webp",
        alt: "CogTrack Stroop test showing the word RED",
        title: "Millisecond timing",
        body: "Say the colour, not the word. Every tap is timed to the millisecond.",
      },
      {
        src: "/apps/cogtrack/training.webp",
        alt: "CogTrack free training mode",
        title: "Train for fun",
        body: "Endless modes with leaderboards that don't touch your real trend data.",
      },
      {
        src: "/apps/cogtrack/data.webp",
        alt: "CogTrack trend charts",
        title: "Watch the line move",
        body: "Every result, charted against typical ranges for your age group.",
      },
    ],
    toy: { title: "Test your reaction time", hint: "Tap when it turns pink" },
  },
  {
    id: "terrarium",
    n: "04",
    name: "Terrarium",
    short: "Terrarium",
    tag: "Desktop app",
    status: "Coming soon · Mac & Windows",
    line: "Browser tabs, notes, timers and mini-apps arranged on a pinboard, saved to disk, synced across your machines.",
    href: "/Terrarium",
    cta: "Preview Terrarium",
    color: "#8990f4",
    color2: "#c9b8ff",
    bg: "#0b0e14",
    device: "desktop",
    shots: [
      {
        src: "/Terrarium/desktop.jpg",
        alt: "Terrarium desktop with floating browser, timer and notes windows",
        title: "Your whole desk, in one app",
        body: "Real Chromium tabs, notes, timers and files floating on one canvas.",
      },
      {
        src: "/Terrarium/command-palette.jpg",
        alt: "Terrarium ⌘K command palette",
        title: "⌘K for everything",
        body: "Open, find and arrange anything without touching the mouse.",
      },
      {
        src: "/Terrarium/launcher.jpg",
        alt: "Terrarium panel launcher",
        title: "Panels on tap",
        body: "Browser, Notes, Files, Reminders, Timer, Alarm, Stopwatch, Clock.",
      },
      {
        src: "/Terrarium/settings.jpg",
        alt: "Terrarium settings and theme engine",
        title: "Make it yours",
        body: "Themes, backgrounds and workspaces, and it all travels with you.",
      },
    ],
    toy: { title: "Arrange the pinboard", hint: "Drag the windows around" },
  },
];
