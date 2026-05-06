create extension if not exists pgcrypto;

create table if not exists public.profiles (
  auth_user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  business_name text,
  phone_number text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  business_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  code text not null,
  note text,
  selling_amount numeric not null default 0,
  cost_amount numeric not null default 0,
  paid_amount numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists customers_auth_user_id_idx on public.customers(auth_user_id);
create index if not exists deals_auth_user_id_idx on public.deals(auth_user_id);
create index if not exists deals_customer_id_idx on public.deals(customer_id);

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.deals enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = auth_user_id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = auth_user_id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

drop policy if exists "customers_select_own" on public.customers;
drop policy if exists "customers_insert_own" on public.customers;
drop policy if exists "customers_update_own" on public.customers;
drop policy if exists "customers_delete_own" on public.customers;

create policy "customers_select_own"
on public.customers
for select
to authenticated
using (auth.uid() = auth_user_id);

create policy "customers_insert_own"
on public.customers
for insert
to authenticated
with check (auth.uid() = auth_user_id);

create policy "customers_update_own"
on public.customers
for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

create policy "customers_delete_own"
on public.customers
for delete
to authenticated
using (auth.uid() = auth_user_id);

drop policy if exists "deals_select_own" on public.deals;
drop policy if exists "deals_insert_own" on public.deals;
drop policy if exists "deals_update_own" on public.deals;
drop policy if exists "deals_delete_own" on public.deals;

create policy "deals_select_own"
on public.deals
for select
to authenticated
using (auth.uid() = auth_user_id);

create policy "deals_insert_own"
on public.deals
for insert
to authenticated
with check (auth.uid() = auth_user_id);

create policy "deals_update_own"
on public.deals
for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

create policy "deals_delete_own"
on public.deals
for delete
to authenticated
using (auth.uid() = auth_user_id);
