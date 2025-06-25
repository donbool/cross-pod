-- USERS: Supabase Auth handles core user info, but we extend with profile
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  goal text,
  timezone text,
  languages text[],
  streak int default 0,
  badges text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table pods (
  id uuid primary key default gen_random_uuid(),
  goal text,
  language text,
  timezone text,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table pod_members (
  pod_id uuid references pods(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  joined_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (pod_id, user_id)
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  pod_id uuid references pods(id) on delete cascade,
  scheduled_for timestamp with time zone,
  calendar_event_id text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  pod_id uuid references pods(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  content text,
  type text check (type in ('text', 'voice')),
  audio_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  pod_id uuid references pods(id) on delete cascade,
  week int,
  prompt text,
  created_at timestamp with time zone default timezone('utc'::text, now())
); 