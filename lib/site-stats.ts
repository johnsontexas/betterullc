// Homepage counters, read from Supabase `site_stats` (public SELECT, no public
// write — the daily edge function is the only writer). Same publishable values
// as the waitlist; safe to ship.
const SUPABASE_URL = "https://yzxuupveyyonvrzaeefp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_LV972rq-8atTjp9azv9QNQ_j5WGLwMu";

/** Total downloads across all apps. Returns null if the value can't be read. */
export async function fetchDownloadsTotal(): Promise<number | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_stats?key=eq.downloads_total&select=value`,
      {
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        // ISR: refresh at most hourly (the source only updates once a day)
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const rows: Array<{ value: number }> = await res.json();
    const v = rows?.[0]?.value;
    return typeof v === "number" && v > 0 ? v : null;
  } catch {
    return null;
  }
}
