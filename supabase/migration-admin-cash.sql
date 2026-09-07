-- Run this once in Supabase SQL Editor after schema.sql.
-- It keeps a precise distinction between a personnel opener and an admin opener.

alter table public.caisses alter column ouverte_par drop not null;
alter table public.caisses add column if not exists ouverte_par_admin uuid references auth.users(id);
alter table public.caisses add column if not exists fermee_par_admin uuid references auth.users(id);

alter table public.caisses drop constraint if exists caisse_opened_by_check;
alter table public.caisses add constraint caisse_opened_by_check
  check ((ouverte_par is not null) <> (ouverte_par_admin is not null));
