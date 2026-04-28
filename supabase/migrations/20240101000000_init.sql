-- ============================================================
-- Teardown (safe to re-run on empty or existing DB)
-- ============================================================
drop trigger if exists on_auth_user_created on auth.users;

-- Table drops cascade their own triggers and constraints
drop table if exists public.projects cascade;
drop table if exists public.profiles cascade;

drop function if exists public.handle_new_user();
drop function if exists public.handle_updated_at();
drop function if exists public.protect_created_at();

-- ============================================================
-- Extensions
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- Profiles
-- ============================================================
create table public.profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url   text,
  created_at   timestamptz default now() not null,
  updated_at   timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Allows recovery if the signup trigger failed or profile was deleted
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============================================================
-- Projects
-- ============================================================
create table public.projects (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  description text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

alter table public.projects enable row level security;
alter table public.projects replica identity full;
alter publication supabase_realtime add table public.projects;

create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can create own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- ============================================================
-- Immutable created_at: silently preserve the original value
-- ============================================================
create or replace function public.protect_created_at()
returns trigger language plpgsql as $$
begin
  new.created_at = old.created_at;
  return new;
end;
$$;

alter function public.protect_created_at() owner to postgres;

create trigger protect_profiles_created_at
  before update on public.profiles
  for each row execute procedure public.protect_created_at();

create trigger protect_projects_created_at
  before update on public.projects
  for each row execute procedure public.protect_created_at();

-- ============================================================
-- updated_at: auto-stamp on every update
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter function public.handle_updated_at() owner to postgres;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_projects_updated
  before update on public.projects
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- Auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

alter function public.handle_new_user() owner to postgres;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
