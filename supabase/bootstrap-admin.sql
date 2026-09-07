-- Apres avoir cree le premier utilisateur dans Authentication > Users,
-- remplace les deux valeurs puis execute ce script dans SQL Editor.
insert into public.admins (id, email)
select id, email
from auth.users
where id = '1dd523ca-49cd-4a5a-887a-7dc3414dd80b'
  and email = 'ablaye.ndiaye.etude@gmail.com'
on conflict (id) do update set email = excluded.email;
