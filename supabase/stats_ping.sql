-- stats_ping — run this ONCE in every app's Supabase project
-- (Dashboard → SQL Editor → paste → Run).
--
-- It adds one function the betterullc.com website calls once a day:
--   * writes a heartbeat timestamp (real database activity, so a free-tier
--     project never looks idle and never gets auto-paused), and
--   * returns how many users the project has (count of auth.users).
-- That count is the ONLY thing it exposes. No keys ever leave the project;
-- the website only needs this project's URL + publishable (anon) key.

create schema if not exists betterullc_stats;
revoke all on schema betterullc_stats from public, anon, authenticated;

create table if not exists betterullc_stats.heartbeat (
  id int primary key default 1 check (id = 1),
  pinged_at timestamptz not null default now(),
  pings bigint not null default 0
);

create or replace function public.stats_ping()
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into betterullc_stats.heartbeat (id, pinged_at, pings)
  values (1, now(), 1)
  on conflict (id) do update
    set pinged_at = now(), pings = betterullc_stats.heartbeat.pings + 1;
  return (select count(*) from auth.users);
end;
$$;

revoke all on function public.stats_ping() from public;
grant execute on function public.stats_ping() to anon, authenticated;
