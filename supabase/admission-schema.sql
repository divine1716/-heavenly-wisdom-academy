-- Run this once in Supabase Dashboard -> SQL Editor.
create table if not exists public.admission_applications (
  id uuid primary key default gen_random_uuid(),
  application_id text not null unique,
  full_name text not null,
  date_of_birth date not null,
  sex text not null,
  birth_place text not null,
  state_of_origin text not null,
  residential_address text not null,
  applying_class text not null,
  religion text,
  former_school text,
  guardian_name text not null,
  guardian_phone text not null,
  guardian_email text,
  guardian_address text not null,
  occupation text not null,
  place_of_work text,
  next_of_kin text,
  kin_phone text,
  authorized_persons text,
  knows_way_home text not null,
  christian_training text not null,
  genotype text,
  blood_group text,
  hepatitis_vaccination text,
  disability text,
  medical_conditions text,
  attestation text,
  passport_path text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by text
);

alter table public.admission_applications enable row level security;

-- Passport images stay private and can only be accessed through a secure server.
insert into storage.buckets (id, name, public)
values ('admission-passports', 'admission-passports', false)
on conflict (id) do nothing;
