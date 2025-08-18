create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users (id) on delete cascade,
  job_id uuid references jobs (id) on delete cascade
);