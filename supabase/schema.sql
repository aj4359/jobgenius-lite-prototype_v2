
-- JobGenius Lite Prototype Schema (v2)

create table if not exists profiles (
  id bigint generated always as identity primary key,
  email text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists job_prefs (
  id bigint generated always as identity primary key,
  email text references profiles(email) on delete cascade,
  desired_role text,
  preferred_location text,
  created_at timestamp with time zone default now()
);

create table if not exists applications (
  id bigint generated always as identity primary key,
  email text references profiles(email) on delete cascade,
  company text not null,
  title text not null,
  url text,
  status text check (status in ('saved','applied','interview','offer','rejected')) default 'saved',
  notes text,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;
alter table job_prefs enable row level security;
alter table applications enable row level security;

create policy if not exists "profiles_insert_any" on profiles
  for insert to anon with check (true);
create policy if not exists "profiles_select_any" on profiles
  for select to anon using (true);
create policy if not exists "profiles_upsert_any" on profiles
  for update to anon using (true);

create policy if not exists "job_prefs_rw" on job_prefs
  for all to anon using (true) with check (true);

create policy if not exists "applications_rw" on applications
  for all to anon using (true) with check (true);
