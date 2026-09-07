-- Solma Shop Business
-- Execute this script in the Supabase SQL editor.

create extension if not exists pgcrypto;

create type public.personnel_role as enum ('vendeur', 'admin');
create type public.payment_method as enum ('liquide', 'mobile_money');

create table public.magasins (
  id uuid primary key default gen_random_uuid(),
  nom text not null unique,
  created_at timestamptz not null default now()
);

create table public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.personnel (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  telephone text not null unique,
  code_pin_hash text not null,
  role public.personnel_role not null default 'vendeur',
  magasin_id uuid not null references public.magasins(id),
  actif boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.produits (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prix integer not null check (prix > 0),
  magasin_id uuid not null references public.magasins(id),
  actif boolean not null default true,
  created_at timestamptz not null default now(),
  unique (nom, magasin_id)
);

create table public.ventes (
  id uuid primary key default gen_random_uuid(),
  produit_id uuid references public.produits(id) on delete set null,
  nom_produit text not null,
  montant integer not null check (montant > 0),
  mode_paiement public.payment_method not null,
  personnel_id uuid not null references public.personnel(id),
  magasin_id uuid not null references public.magasins(id),
  date_heure timestamptz not null default now(),
  annulee boolean not null default false,
  annulee_par uuid references auth.users(id),
  annulee_le timestamptz,
  created_at timestamptz not null default now()
);

create table public.depenses (
  id uuid primary key default gen_random_uuid(),
  montant integer not null check (montant > 0),
  motif text not null,
  personnel_id uuid references public.personnel(id),
  admin_id uuid references auth.users(id),
  magasin_id uuid not null references public.magasins(id),
  date_heure timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint depenses_auteur_check check ((personnel_id is not null) <> (admin_id is not null))
);

create table public.caisses (
  id uuid primary key default gen_random_uuid(),
  magasin_id uuid not null references public.magasins(id),
  montant_ouverture integer not null check (montant_ouverture >= 0),
  montant_fermeture integer check (montant_fermeture >= 0),
  ecart integer,
  ouverte_par uuid references public.personnel(id),
  ouverte_par_admin uuid references auth.users(id),
  fermee_par uuid references public.personnel(id),
  fermee_par_admin uuid references auth.users(id),
  date_ouverture timestamptz not null default now(),
  date_fermeture timestamptz,
  created_at timestamptz not null default now(),
  constraint caisse_dates_check check (date_fermeture is null or date_fermeture >= date_ouverture)
  ,constraint caisse_opened_by_check check ((ouverte_par is not null) <> (ouverte_par_admin is not null))
);

create unique index one_open_cash_register_per_store
  on public.caisses (magasin_id)
  where date_fermeture is null;

create index ventes_magasin_date_idx on public.ventes (magasin_id, date_heure desc);
create index depenses_magasin_date_idx on public.depenses (magasin_id, date_heure desc);
create index personnel_telephone_idx on public.personnel (telephone);

-- Seed the two stores. The on-conflict-safe form makes this script reusable.
insert into public.magasins (nom)
values ('Plateau'), ('Médina')
on conflict do nothing;

-- RLS is enabled immediately. Browser clients cannot access sensitive tables
-- until explicit policies or protected server functions are added.
alter table public.magasins enable row level security;
alter table public.admins enable row level security;
alter table public.personnel enable row level security;
alter table public.produits enable row level security;
alter table public.ventes enable row level security;
alter table public.depenses enable row level security;
alter table public.caisses enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where id = auth.uid());
$$;

create policy admins_read_own_profile on public.admins
  for select to authenticated using (id = auth.uid());

create policy admin_manage_stores on public.magasins
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy admin_manage_personnel on public.personnel
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy admin_manage_products on public.produits
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy admin_read_sales on public.ventes
  for select to authenticated using (public.is_admin());

create policy admin_manage_expenses on public.depenses
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy admin_manage_cash_registers on public.caisses
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Sales and personnel login must go through protected server routes.
-- Do not add an anon/authenticated insert policy for ventes: this prevents
-- a seller from editing or cancelling a sale through the public client.
