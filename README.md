# Solma Shop Business

Prototype web de gestion pour les magasins Solma Shop Business.

## Lancer localement

Pour tester uniquement l'interface, ouvrir `index.html` ou lancer un serveur statique. Pour les fonctions securisees (connexion personnel, creation vendeur, tresorerie), utiliser `npx vercel dev` : un serveur statique sur le port 4173 ne peut pas executer les fichiers du dossier `api/`.

Avec Vercel Dev, ajouter les variables locales `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` et `PERSONNEL_SESSION_SECRET` dans les variables d'environnement demandees par Vercel. Ne jamais mettre la cle `service_role` dans `config.js`.

Le modele de variables est dans `.env.local.example`. La `SUPABASE_SERVICE_ROLE_KEY` se trouve dans Supabase, **Project Settings > API > Secret keys**. Elle doit etre ajoutee uniquement comme variable Vercel, jamais dans le code.

## Fonctionnalites du prototype

- Tableau de bord des ventes, transactions, depenses et soldes de caisse
- Filtre global par magasin
- Historique des ventes et depenses
- Ajout d'une vente, d'une depense, d'un produit et d'un membre du personnel
- Ouverture et fermeture de caisse
- Gestion des produits et du personnel
- Rapports de synthese
- Persistance locale avec `localStorage` pour les essais
- Interface responsive desktop et mobile, avec style glassmorphism

## Passage en production

Cette version est une maquette fonctionnelle front-end. Elle ne doit pas encore etre utilisee pour des donnees reelles : les donnees sont locales et l'authentification n'est pas connectee.

Pour la version production, il faudra remplacer les fonctions de `app.js` par une API serveur et Supabase :

1. Supabase Auth pour l'admin proprietaire.
2. Une table `personnel` avec hash du PIN a 4 chiffres, jamais le PIN en clair.
3. Une route serveur independante pour la connexion telephone + PIN du personnel et une session httpOnly.
4. Des policies RLS et des fonctions serveur qui interdisent l'annulation ou la modification d'une vente par un vendeur.
5. Les tables ventes, depenses, caisses, produits, magasins et les journaux d'audit.

La fonction serveur [api/sales.js](api/sales.js) est preparee pour Vercel. Ajouter dans les variables d'environnement Vercel `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`. La seconde est strictement secrete : elle ne doit jamais etre ajoutee dans `config.js`, dans le navigateur ou dans Git.

## Premiere etape Supabase

Le script [supabase/schema.sql](supabase/schema.sql) contient la structure initiale et active la RLS. Dans Supabase, ouvrir **SQL Editor**, coller ce script et l'executer une fois. Il cree les magasins `Plateau` et `Médina` et bloque par defaut l'ecriture directe des ventes depuis le navigateur.

Pour activer le premier proprietaire, creer d'abord son utilisateur dans **Authentication > Users**, puis adapter et executer [supabase/bootstrap-admin.sql](supabase/bootstrap-admin.sql) avec son UUID et son email.

Pour permettre aux admins d'ouvrir et fermer une caisse avec leur propre identite Auth, executer ensuite [supabase/migration-admin-cash.sql](supabase/migration-admin-cash.sql) dans le SQL Editor. Cette migration est necessaire si `schema.sql` avait deja ete execute auparavant.

Ne jamais mettre la `SUPABASE_SERVICE_ROLE_KEY` dans le code front-end. Elle sera utilisee uniquement par les fonctions serveur Vercel pour la connexion du personnel et l'enregistrement securise des ventes.

## Etat de verification

- Vercel : projet `solma-shop-2`, production active, variables serveur presentes dans Development, Preview et Production.
- Compatibilite : front-end JavaScript/CSS/HTML statique + fonctions serveur Node.js ESM, compatibles avec Vercel ; Supabase JS, bcryptjs et jose sont installes et `npm audit` ne signale aucune vulnerabilite.
- Persistance : les operations metier passent par les routes Vercel et Supabase ; le chargement admin apres actualisation passe par `api/admin-data`.
- GitHub : le depot Git local est initialise, mais aucun remote GitHub n'est encore configure et aucun push n'a ete effectue.
