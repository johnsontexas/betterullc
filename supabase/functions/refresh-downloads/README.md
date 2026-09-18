# refresh-downloads

Daily job that keeps `public.site_stats(key = 'downloads_total')` up to date from
App Store Connect. The homepage hero reads that row ("N downloads across our apps").

## How it runs

`pg_cron` job `refresh-downloads-daily` (10:20 UTC daily) POSTs to the deployed
edge function with an `x-cron-secret` header. The function:

1. reads the current total + `detail.last_report_date` from `site_stats`
2. signs an App Store Connect JWT (ES256) with the `.p8` key
3. pulls the DAILY / SALES / SUMMARY report for each not-yet-counted day
4. sums `Units` for first-time-download product types across **all** apps
5. adds the delta and writes the row back (service role)

The counter was **seeded to 214** (App Store Connect Trends, 365-day = lifetime
since the account is < 1 year old) with `last_report_date = 2026-09-05`.

## Required secrets

Set once — these are NOT in the repo and must never be:

```bash
supabase secrets set --project-ref yzxuupveyyonvrzaeefp \
  APPLE_KEY_ID=JBQN42CPJJ \
  APPLE_ISSUER_ID=<issuer-uuid> \
  APPLE_VENDOR_NUMBER=93868770 \
  CRON_SECRET=<the value in the cron job> \
  APPLE_PRIVATE_KEY="$(cat AuthKey_JBQN42CPJJ.p8)"
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected by the platform.

## Manual test

```bash
curl -i -X POST \
  https://yzxuupveyyonvrzaeefp.supabase.co/functions/v1/refresh-downloads \
  -H 'x-cron-secret: <CRON_SECRET>'
```

## Deploy

```bash
supabase functions deploy refresh-downloads --no-verify-jwt --project-ref yzxuupveyyonvrzaeefp
```
