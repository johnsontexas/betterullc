# refresh-downloads

Daily job that keeps `public.site_stats(key = 'downloads_total')` up to date from
App Store Connect. The homepage hero reads that row ("N downloads across our apps").

## How it runs

`pg_cron` job `refresh-downloads-daily` (10:20 UTC daily) POSTs to the deployed
edge function with an `x-job-token` header. The function:

1. checks `x-job-token` against `public.job_tokens('refresh-downloads')`
2. reads the current total + `detail.last_report_date` from `site_stats`
3. signs an App Store Connect JWT (ES256) with the `.p8` key
4. pulls the DAILY / SALES / SUMMARY report for each not-yet-counted day
5. sums `Units` for first-time-download product types across **all** apps
6. adds the delta and writes the row back (service role)

The counter was **seeded to 214** (App Store Connect Trends, 365-day = lifetime
since the account is < 1 year old) with `last_report_date = 2026-09-05`.

## Auth

The shared secret lives in `public.job_tokens`, not in an env var, and the cron
job reads it from there with a subquery. Both sides therefore read the *same*
row and cannot drift apart.

> This replaced a `CRON_SECRET` env var. That var was never set on the function,
> so `Deno.env.get("CRON_SECRET")` was `undefined`, every cron run got a bare
> `403 forbidden`, and the counter silently froze at its seed value from
> 2026-09-07 onward. Nothing surfaced the failure, because pg_cron only records
> that the *request* was queued successfully.

## Required secrets

Set once — these are NOT in the repo and must never be. **As of the last check
none of them were set**, which is why the counter is still showing the seed:

```bash
supabase secrets set --project-ref yzxuupveyyonvrzaeefp \
  APPLE_KEY_ID=JBQN42CPJJ \
  APPLE_ISSUER_ID=<issuer-uuid> \
  APPLE_VENDOR_NUMBER=93868770 \
  APPLE_PRIVATE_KEY="$(cat AuthKey_JBQN42CPJJ.p8)"
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected by the platform.

When a secret is missing the function no longer fails silently: it returns
`{"ok":false,"error":"missing App Store Connect secrets: ..."}` and writes the
same message to `site_stats.detail.last_error`, so the broken state is visible
in the row the site already reads.

## Manual test

```bash
psql "$DATABASE_URL" -c "select net.http_post(url := 'https://yzxuupveyyonvrzaeefp.supabase.co/functions/v1/refresh-downloads', headers := jsonb_build_object('Content-Type','application/json','x-job-token',(select token from public.job_tokens where name='refresh-downloads')), body := '{}'::jsonb);"
```

Then read the reply back out of pg_net:

```sql
select status_code, content from net._http_response order by id desc limit 1;
```

## Health check

```sql
select value, detail->>'last_report_date', detail->>'last_run', detail->>'last_error'
from public.site_stats where key = 'downloads_total';
```

`last_error` should be `null` after a good run.

## Deploy

```bash
supabase functions deploy refresh-downloads --no-verify-jwt --project-ref yzxuupveyyonvrzaeefp
```

`--no-verify-jwt` matters: the caller is pg_cron, which sends no Supabase JWT.
The function authenticates with `x-job-token` instead.
