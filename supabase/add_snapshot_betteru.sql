-- Run in the betterullc-web project (yzxuupveyyonvrzaeefp): Dashboard → SQL Editor.
-- Adds the Snapshot + BetterU Supabase projects to the daily ping list
-- (keeps them from being paused + counts their users for the homepage),
-- then runs the job once right away so you can see it work.
-- The keys below are the projects' PUBLISHABLE keys — the same ones already
-- shipped inside the apps — not secret keys.

insert into public.tracked_projects (app, label, url, publishable_key) values
  ('snapshot', 'SnapShot Assasain', 'https://hasihuyjypuaejbxwapg.supabase.co', 'sb_publishable_KpH2596KhKmgvihOoaLHfw_qVSYgHYo'),
  ('betteru',  'BetterU',           'https://yrhfnorbcroumlqutsga.supabase.co', 'sb_publishable_MSSi3gR3_0eOPC7MSk1hpA_4kro0iM3')
on conflict (app) do update
  set url = excluded.url, publishable_key = excluded.publishable_key, label = excluded.label, enabled = true;

-- run it now instead of waiting for 10:30 UTC
select net.http_post(
  url := 'https://yzxuupveyyonvrzaeefp.supabase.co/functions/v1/refresh-user-counts',
  headers := jsonb_build_object(
    'Content-Type', 'application/json',
    'x-job-token', (select token from public.job_tokens where name = 'refresh-user-counts')
  ),
  body := '{}'::jsonb,
  timeout_milliseconds := 60000
);

-- wait ~5 seconds, then run this to check (expect snapshot 120, betteru 2, cogtrack 2):
-- select app, last_count, last_ok_at, last_error from public.tracked_projects order by app;
