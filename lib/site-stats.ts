// Homepage counters, read from Supabase `site_stats` (public SELECT, no public
// write — the daily edge function is the only writer). Same publishable values
// as the waitlist; safe to ship.
const SUPABASE_URL = "https://yzxuupveyyonvrzaeefp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_LV972rq-8atTjp9azv9QNQ_j5WGLwMu";

export type SiteStats = {
  downloads: number | null;
  users: number | null;
  /** users per app id (betteru / snapshot / cogtrack / terrarium) */
  usersByApp: Record<string, number>;
};

/**
 * Everything the homepage shows, in one request. `users_total` is written daily
 * by the refresh-user-counts edge function, which pings every app's Supabase
 * project (also keeping them from being paused for inactivity).
 */
export async function fetchSiteStats(): Promise<SiteStats> {
  const empty: SiteStats = { downloads: null, users: null, usersByApp: {} };
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_stats?key=in.(downloads_total,users_total)&select=key,value,detail`,
      {
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return empty;
    const rows: Array<{ key: string; value: number; detail: { per_app?: Record<string, number> } | null }> =
      await res.json();
    const get = (k: string) => rows.find((r) => r.key === k);
    const pos = (v: unknown) => (typeof v === "number" && v > 0 ? v : null);
    return {
      downloads: pos(get("downloads_total")?.value),
      users: pos(get("users_total")?.value),
      usersByApp: get("users_total")?.detail?.per_app ?? {},
    };
  } catch {
    return empty;
  }
}
