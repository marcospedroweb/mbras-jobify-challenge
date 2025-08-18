create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  company_name text not null,
  title text not null,
  category text not null,
  job_id int4 not null
);