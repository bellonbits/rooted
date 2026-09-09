-- ROOTED: initial schema for real (non-mock) per-user data.
-- Run this in the Supabase SQL editor, or via `supabase db push`, against a
-- fresh project. Requires the pgcrypto extension for gen_random_uuid().

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null default '',
  spiritual_stage text not null default 'beginner',
  interests text[] not null default '{}',
  notifications_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- journal_entries (Spiritual Journal)
-- ---------------------------------------------------------------------------
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  verse text not null default '',
  highlight text not null default '',
  learning text not null default '',
  prayer text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists journal_entries_user_id_idx on public.journal_entries (user_id, created_at desc);

alter table public.journal_entries enable row level security;

create policy "journal_entries_owner_all" on public.journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- personal_prayers (Prayer Room / "Secret Place")
-- ---------------------------------------------------------------------------
create table if not exists public.personal_prayers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  text text not null,
  category text not null default 'Personal',
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists personal_prayers_user_id_idx on public.personal_prayers (user_id, created_at desc);

alter table public.personal_prayers enable row level security;

create policy "personal_prayers_owner_all" on public.personal_prayers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- prayer_wall_posts (public community Prayer Wall)
-- ---------------------------------------------------------------------------
create table if not exists public.prayer_wall_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  topic text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists prayer_wall_posts_created_at_idx on public.prayer_wall_posts (created_at desc);

alter table public.prayer_wall_posts enable row level security;

create policy "prayer_wall_posts_select_all" on public.prayer_wall_posts
  for select to authenticated using (true);
create policy "prayer_wall_posts_insert_own" on public.prayer_wall_posts
  for insert to authenticated with check (auth.uid() = user_id);
create policy "prayer_wall_posts_update_own" on public.prayer_wall_posts
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "prayer_wall_posts_delete_own" on public.prayer_wall_posts
  for delete to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- prayer_intercessions ("Praying for you" toggle on the Prayer Wall)
-- ---------------------------------------------------------------------------
create table if not exists public.prayer_intercessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  prayer_id uuid not null references public.prayer_wall_posts (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, prayer_id)
);

create index if not exists prayer_intercessions_prayer_id_idx on public.prayer_intercessions (prayer_id);

alter table public.prayer_intercessions enable row level security;

create policy "prayer_intercessions_select_all" on public.prayer_intercessions
  for select to authenticated using (true);
create policy "prayer_intercessions_insert_own" on public.prayer_intercessions
  for insert to authenticated with check (auth.uid() = user_id);
create policy "prayer_intercessions_delete_own" on public.prayer_intercessions
  for delete to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- lesson_completions (Discipleship Courses)
-- ---------------------------------------------------------------------------
create table if not exists public.lesson_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id int not null,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_completions enable row level security;

create policy "lesson_completions_owner_all" on public.lesson_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- reading_plan_progress (Reading Plans)
-- ---------------------------------------------------------------------------
create table if not exists public.reading_plan_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  plan_id text not null,
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  is_current boolean not null default false,
  enrolled_at timestamptz not null default now(),
  unique (user_id, plan_id)
);

alter table public.reading_plan_progress enable row level security;

create policy "reading_plan_progress_owner_all" on public.reading_plan_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- daily_step_completions (Today's Journey — also drives the sidebar badge)
-- ---------------------------------------------------------------------------
create table if not exists public.daily_step_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  step_id int not null,
  journey_date date not null default current_date,
  completed_at timestamptz not null default now(),
  unique (user_id, step_id, journey_date)
);

create index if not exists daily_step_completions_user_date_idx on public.daily_step_completions (user_id, journey_date);

alter table public.daily_step_completions enable row level security;

create policy "daily_step_completions_owner_all" on public.daily_step_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- activity_log (streak + activity grid on "Your Growth")
-- ---------------------------------------------------------------------------
create table if not exists public.activity_log (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  activity_date date not null default current_date,
  primary key (user_id, activity_date)
);

alter table public.activity_log enable row level security;

create policy "activity_log_owner_all" on public.activity_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- kids_progress (Little Explorers — single row per account)
-- ---------------------------------------------------------------------------
create table if not exists public.kids_progress (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  growth_points int not null default 0,
  streak_days int not null default 0,
  unlocked_artifacts text[] not null default '{}',
  memorized_verses jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

alter table public.kids_progress enable row level security;

create policy "kids_progress_owner_all" on public.kids_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- ai_messages (AI Companion chat log)
-- ---------------------------------------------------------------------------
create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  sender text not null check (sender in ('user', 'ai')),
  text text not null,
  verse_references text[] not null default '{}',
  saved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists ai_messages_user_id_idx on public.ai_messages (user_id, created_at);

alter table public.ai_messages enable row level security;

create policy "ai_messages_owner_all" on public.ai_messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
