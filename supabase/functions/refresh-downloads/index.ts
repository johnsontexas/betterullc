// refresh-downloads — Supabase Edge Function
// ---------------------------------------------------------------------------
// Runs once a day (via pg_cron). Pulls the App Store Connect DAILY Sales
// summary for every day we haven't counted yet, sums first-time app downloads
// across ALL apps on the account, and adds the delta to
// public.site_stats(key='downloads_total'). The homepage reads that row.
//
// Deployed with --no-verify-jwt: callers are the pg_cron job, not end users, so
// the function does its own auth below rather than checking a Supabase JWT.
//
// Secrets (set with `supabase secrets set` or in the dashboard — NONE of these
// belong in the repo or the website bundle):
//   APPLE_KEY_ID           e.g. JBQN42CPJJ
//   APPLE_ISSUER_ID        the App Store Connect API issuer UUID
//   APPLE_VENDOR_NUMBER    the 8-digit vendor number
//   APPLE_PRIVATE_KEY      full contents of the AuthKey_XXXX.p8 file
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected by the platform.
//
// Callers authenticate with `x-job-token` matching public.job_tokens
// ('refresh-downloads') — the same DB-backed scheme refresh-user-counts uses.
// The previous CRON_SECRET env var drifted out of sync with the literal in the
// pg_cron job, so every run 403'd and the counter silently froze; keeping the
// token in the database means the cron job and the function cannot disagree.
//
// Failures are recorded in site_stats.detail.last_error so a broken run is
// visible in the same row the homepage reads, instead of vanishing into logs.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { importPKCS8, SignJWT } from "npm:jose@5.9.6";

const KEY_ID = Deno.env.get("APPLE_KEY_ID") ?? "";
const ISSUER_ID = Deno.env.get("APPLE_ISSUER_ID") ?? "";
const VENDOR = Deno.env.get("APPLE_VENDOR_NUMBER") ?? "";
const PRIVATE_KEY = (Deno.env.get("APPLE_PRIVATE_KEY") ?? "").replace(/\\n/g, "\n");
const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Product Type Identifiers that represent a first-time app download.
// (Updates are 7*, in-app purchases are IA*, both excluded.)
const DOWNLOAD_PTIS = new Set(["1", "1F", "1T", "1E", "1EP", "1EU", "F1"]);

const ymd = (d: Date) => d.toISOString().slice(0, 10);
function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return ymd(d);
}

async function appleToken(): Promise<string> {
  const key = await importPKCS8(PRIVATE_KEY, "ES256");
  return await new SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: KEY_ID, typ: "JWT" })
    .setIssuer(ISSUER_ID)
    .setIssuedAt()
    .setExpirationTime("14m")
    .setAudience("appstoreconnect-v1")
    .sign(key);
}

/** Downloads for one day, or null if Apple has no report for it yet. */
async function dayDownloads(token: string, date: string): Promise<number | null> {
  const url = new URL("https://api.appstoreconnect.apple.com/v1/salesReports");
  url.searchParams.set("filter[frequency]", "DAILY");
  url.searchParams.set("filter[reportType]", "SALES");
  url.searchParams.set("filter[reportSubType]", "SUMMARY");
  url.searchParams.set("filter[vendorNumber]", VENDOR);
  url.searchParams.set("filter[reportDate]", date);
  url.searchParams.set("filter[version]", "1_0");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/a-gzip" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Apple ${res.status}: ${(await res.text()).slice(0, 300)}`);

  const text = await new Response(
    res.body!.pipeThrough(new DecompressionStream("gzip")),
  ).text();

  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length < 2) return 0;
  const header = lines[0].split("\t");
  const ptiIdx = header.indexOf("Product Type Identifier");
  const unitsIdx = header.indexOf("Units");
  if (ptiIdx < 0 || unitsIdx < 0) return 0;

  let total = 0;
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split("\t");
    if (DOWNLOAD_PTIS.has((cols[ptiIdx] ?? "").trim())) {
      total += parseInt(cols[unitsIdx], 10) || 0;
    }
  }
  return total;
}

const svc = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };

/** Names of the Apple secrets that aren't set, so a misconfigured deploy says so. */
function missingSecrets(): string[] {
  return Object.entries({
    APPLE_KEY_ID: KEY_ID,
    APPLE_ISSUER_ID: ISSUER_ID,
    APPLE_VENDOR_NUMBER: VENDOR,
    APPLE_PRIVATE_KEY: PRIVATE_KEY,
  })
    .filter(([, v]) => !v)
    .map(([k]) => k);
}

/** Leave a breadcrumb on the row the homepage reads. */
async function noteError(detail: Record<string, unknown>, error: string) {
  await fetch(`${SB_URL}/rest/v1/site_stats?key=eq.downloads_total`, {
    method: "PATCH",
    headers: { ...svc, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      detail: { ...detail, last_error: error.slice(0, 500), last_error_at: new Date().toISOString() },
    }),
  });
}

Deno.serve(async (req) => {
  // auth: token lives in the database, so the cron job can't drift out of sync
  const tokRes = await fetch(`${SB_URL}/rest/v1/job_tokens?name=eq.refresh-downloads&select=token`, {
    headers: svc,
  });
  const tok = await tokRes.json();
  if (!tok?.[0]?.token || req.headers.get("x-job-token") !== tok[0].token) {
    return new Response("unauthorized", { status: 401 });
  }

  const stateRes = await fetch(
    `${SB_URL}/rest/v1/site_stats?key=eq.downloads_total&select=value,detail`,
    { headers: svc },
  );
  const [row] = await stateRes.json();
  const detail = row?.detail ?? {};

  const missing = missingSecrets();
  if (missing.length) {
    const error = `missing App Store Connect secrets: ${missing.join(", ")}`;
    await noteError(detail, error);
    return new Response(JSON.stringify({ ok: false, error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    let value: number = row?.value ?? 0;
    let last: string = detail.last_report_date ?? addDays(ymd(new Date()), -2);

    const token = await appleToken();
    const stopAt = addDays(ymd(new Date()), -1); // yesterday, UTC
    const added: Record<string, number> = {};

    for (let i = 0; i < 40; i++) {
      const day = addDays(last, 1);
      if (day > stopAt) break;

      const n = await dayDownloads(token, day);
      if (n === null) {
        // report not published yet. Skip only if the day is old enough that it
        // never will be; otherwise stop and try again tomorrow.
        if (day <= addDays(ymd(new Date()), -4)) {
          last = day;
          continue;
        }
        break;
      }
      value += n;
      added[day] = n;
      last = day;
    }

    const newDetail = {
      ...detail,
      last_report_date: last,
      last_run: new Date().toISOString(),
      last_run_added: Object.values(added).reduce((a, b) => a + b, 0),
      last_error: null,
      last_error_at: null,
    };

    await fetch(`${SB_URL}/rest/v1/site_stats?key=eq.downloads_total`, {
      method: "PATCH",
      headers: { ...svc, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        value,
        detail: newDetail,
        updated_at: new Date().toISOString(),
      }),
    });

    return new Response(
      JSON.stringify({ ok: true, value, added, last_report_date: last }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    const error = String(e instanceof Error ? e.message : e);
    await noteError(detail, error);
    return new Response(JSON.stringify({ ok: false, error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
