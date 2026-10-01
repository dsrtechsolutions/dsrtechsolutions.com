-- ════════════════════════════════════════════════════════════════
-- DSR Tech Solutions — form submissions + admin access
-- Run once in Supabase: Dashboard → SQL Editor → New query → Run.
-- Safe to re-run.
-- ════════════════════════════════════════════════════════════════

-- ── Submissions from every website form ─────────────────────────
create table if not exists public.form_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  form_type   text not null default 'contact',
  name        text,
  email       text,
  phone       text,
  subject     text,
  message     text,
  data        jsonb not null default '{}'::jsonb,   -- extra fields for future forms
  status      text not null default 'new'
              check (status in ('new', 'read', 'replied', 'archived')),
  ip_hash     text,                                  -- salted SHA-256, used for rate limiting
  user_agent  text,
  page_url    text
);

create index if not exists form_submissions_created_idx on public.form_submissions (created_at desc);
create index if not exists form_submissions_status_idx  on public.form_submissions (status, created_at desc);
create index if not exists form_submissions_ip_idx      on public.form_submissions (ip_hash, created_at desc);

alter table public.form_submissions enable row level security;

-- ── Who is an admin ─────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- ── Policies ────────────────────────────────────────────────────
-- Inserts come only from the website's server function (secret key bypasses RLS),
-- so there is deliberately NO insert policy: the public key cannot write or read.

drop policy if exists "Admins can view their own admin row" on public.admin_users;
create policy "Admins can view their own admin row"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "Admins can read submissions" on public.form_submissions;
create policy "Admins can read submissions"
  on public.form_submissions for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update submissions" on public.form_submissions;
create policy "Admins can update submissions"
  on public.form_submissions for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete submissions" on public.form_submissions;
create policy "Admins can delete submissions"
  on public.form_submissions for delete to authenticated
  using (public.is_admin());

-- Table privileges: anonymous visitors get nothing; signed-in admins may only change `status`.
revoke all on public.form_submissions from anon;
revoke all on public.admin_users      from anon;
revoke insert, update on public.form_submissions from authenticated;
grant select, delete on public.form_submissions to authenticated;
grant update (status) on public.form_submissions to authenticated;
revoke insert, update, delete on public.admin_users from authenticated;
grant select on public.admin_users to authenticated;

-- ════════════════════════════════════════════════════════════════
-- AFTER creating your admin login (Authentication → Users → Add user),
-- make that user an admin by running (replace the email):
--
--   insert into public.admin_users (user_id)
--   select id from auth.users where email = 'you@example.com'
--   on conflict do nothing;
-- ════════════════════════════════════════════════════════════════
