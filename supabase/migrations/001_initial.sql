-- ============================================================
-- PropertiPilihan — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Properties ─────────────────────────────────────────────
create table if not exists public.properties (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text not null unique,
  description   text,
  price         bigint not null,
  location      text not null,
  address       text,
  bedrooms      int default 1,
  bathrooms     int default 1,
  land_area     int,         -- m²
  building_area int,         -- m²
  property_type text not null default 'rumah'
                  check (property_type in ('rumah','apartemen','villa','tanah','ruko')),
  status        text not null default 'tersedia'
                  check (status in ('tersedia','terjual','disewa')),
  fitur         text[],
  images        text[],
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.properties enable row level security;

create policy "Public read properties"
  on public.properties for select using (true);

create policy "Authenticated insert properties"
  on public.properties for insert with check (auth.role() = 'authenticated');

create policy "Authenticated update properties"
  on public.properties for update using (auth.role() = 'authenticated');

create policy "Authenticated delete properties"
  on public.properties for delete using (auth.role() = 'authenticated');

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
  before update on public.properties
  for each row execute function public.handle_updated_at();

-- ── Admin Users ─────────────────────────────────────────────
create table if not exists public.admin_users (
  id            uuid primary key default uuid_generate_v4(),
  email         text unique not null,
  password_hash text not null,
  name          text not null,
  created_at    timestamptz default now()
);

alter table public.admin_users enable row level security;

create policy "No public access"
  on public.admin_users for all using (false);

-- ── Storage Bucket ──────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "Public read images"
  on storage.objects for select using (bucket_id = 'property-images');

create policy "Authenticated upload images"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Authenticated delete images"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');

-- ── Seed: First Admin User ──────────────────────────────────
-- Password: admin123 (bcrypt hash)
insert into public.admin_users (email, password_hash, name)
values (
  'admin@propertipilihan.com',
  '$2a$10$YourHashHere',
  'Administrator'
)
on conflict (email) do nothing;
