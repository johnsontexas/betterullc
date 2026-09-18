// refresh-user-counts — Supabase Edge Function (betterullc-web project)
// ---------------------------------------------------------------------------
// Runs once a day via pg_cron. For every row in public.tracked_projects it calls
// that project's public.stats_ping() RPC (see supabase/stats_ping.sql), which
//   1. writes a heartbeat row → the project sees real DB activity daily and
//      never gets auto-paused for inactivity, and
//   2. returns the project's auth.users count.
// The counts are summed into public.site_stats(key='users_total'), which the
// homepage reads. Per-app numbers go in detail.per_app.
//
// No secrets to set: the only keys used are each project's publishable key
// (stored in tracked_projects) and this project's injected service role key.
// Callers must send x-job-token matching public.job_tokens('refresh-user-counts').

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const svc = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json" };

type Project = {
  app: string;
  label: string;
  url: string;
  publishable_key: string;
  last_count: number | null;
};

async function rest(path: string, init: RequestInit = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, { ...init, headers: { ...svc, ...(init.headers ?? {}) } });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function ping(p: Project): Promise<number> {
  const headers: Record<string, string> = { apikey: p.publishable_key, "Content-Type": "application/json" };
  // legacy anon keys are JWTs and also go in Authorization; sb_publishable_ keys don't
  if (p.publishable_key.startsWith("eyJ")) headers.Authorization = `Bearer ${p.publishable_key}`;
  const res = await fetch(`${p.url.replace(/\/$/, "")}/rest/v1/rpc/stats_ping`, {
    method: "POST",
    headers,
    body: "{}",
    signal: AbortSignal.timeout(20_000),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${body.slice(0, 200)}`);
  const n = Number(JSON.parse(body));
  if (!Number.isFinite(n)) throw new Error(`unexpected response ${body.slice(0, 100)}`);
  return n;
}

Deno.serve(async (req) => {
  try {
    const tok = await rest("job_tokens?name=eq.refresh-user-counts&select=token");
    if (!tok?.[0]?.token || req.headers.get("x-job-token") !== tok[0].token) {
      return new Response("unauthorized", { status: 401 });
    }

    const projects: Project[] = await rest(
      "tracked_projects?enabled=eq.true&select=app,label,url,publishable_key,last_count",
    );

    const results = await Promise.all(
      projects.map(async (p) => {
        try {
          const count = await ping(p);
          await rest(`tracked_projects?app=eq.${encodeURIComponent(p.app)}`, {
            method: "PATCH",
            body: JSON.stringify({ last_count: count, last_ok_at: new Date().toISOString(), last_error: null }),
          });
          return { app: p.app, count, ok: true as const };
        } catch (e) {
          const msg = String(e instanceof Error ? e.message : e).slice(0, 500);
          await rest(`tracked_projects?app=eq.${encodeURIComponent(p.app)}`, {
            method: "PATCH",
            body: JSON.stringify({ last_error: msg }),
          });
          // keep yesterday's number so one bad day doesn't dent the total
          return { app: p.app, count: p.last_count ?? 0, ok: false as const, error: msg };
        }
      }),
    );

    const perApp: Record<string, number> = {};
    for (const r of results) perApp[r.app] = (perApp[r.app] ?? 0) + r.count;
    const total = Object.values(perApp).reduce((a, b) => a + b, 0);
    const failed = results.filter((r) => !r.ok).map((r) => r.app);

    await rest("site_stats?key=eq.users_total", {
      method: "PATCH",
      body: JSON.stringify({
        value: total,
        detail: { per_app: perApp, failed, last_run: new Date().toISOString() },
        updated_at: new Date().toISOString(),
      }),
    });

    return Response.json({ total, perApp, failed });
  } catch (e) {
    return new Response(`error: ${e instanceof Error ? e.message : e}`, { status: 500 });
  }
});
