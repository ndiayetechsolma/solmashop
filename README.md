# Solma Shop Business

## La plateforme de gestion commerciale pour les commerces multi-sites

Solma Shop Business est une application web de pilotage conçue pour les boutiques, supérettes, pharmacies, points de vente, franchises et petites ou moyennes chaînes commerciales. Elle aide chaque entreprise à suivre les ventes, les dépenses, les caisses, les produits et les équipes depuis un seul espace de travail.

L’objectif est simple : donner au propriétaire une vision claire de son activité, tout en permettant aux équipes de vente de travailler rapidement et de manière structurée dans leur magasin.

## Pourquoi utiliser Solma Shop Business ?

La gestion d’un commerce repose souvent sur des cahiers, des messages WhatsApp et des calculs manuels. Cette méthode rend le suivi difficile : les écarts de caisse sont longs à analyser, les dépenses sont dispersées et le propriétaire n’a pas toujours une vue fiable de ses différents magasins.

Solma Shop Business permet de :

- Suivre les ventes par magasin, vendeur et moyen de paiement.
- Enregistrer les dépenses immédiatement.
- Comparer le montant attendu en caisse au montant réellement compté.
- Centraliser le catalogue de produits et les équipes.
- Consulter les performances d’un magasin ou de tout le réseau.
- Prendre des décisions à partir de données fiables.

## Pour quels types de commerce ?

La solution est adaptée à toute activité qui réalise des ventes quotidiennes et manipule une caisse :

- Boutiques de quartier et supérettes.
- Magasins d’alimentation, de cosmétiques ou de vêtements.
- Pharmacies et parapharmacies.
- Restaurants rapides, boulangeries et points de restauration.
- Commerces disposant de plusieurs agences ou magasins.
- Franchises, réseaux de revendeurs et activités de distribution légère.

## Fonctionnalités métier

### Tableau de bord décisionnel

Le tableau de bord présente les indicateurs essentiels de la journée : chiffre d’affaires, nombre de transactions, ventes en espèces, ventes Mobile Money, dépenses et montant attendu en caisse.

### Enregistrement des ventes

Une vente peut être enregistrée avec le produit, le montant, le magasin et le moyen de paiement. Les ventes en espèces et les paiements Mobile Money sont séparés afin de faciliter le suivi des encaissements.

### Gestion de caisse

Chaque point de vente peut ouvrir sa caisse avec un montant initial, suivre son solde théorique pendant la journée, puis clôturer la caisse avec le montant réellement compté. L’historique conserve les ouvertures, fermetures et écarts constatés.

### Suivi des dépenses

Les équipes peuvent enregistrer les sorties d’argent liées à l’activité : transport, achat urgent, fournitures, petite monnaie ou autres charges.

### Catalogue produits

Le catalogue rassemble les produits et leurs prix de vente. Il accélère la création de ventes et limite les erreurs de saisie.

### Gestion des équipes et des accès

Les administrateurs gèrent les membres du personnel, leur magasin d’affectation et leur accès. Les vendeurs utilisent une connexion par téléphone et PIN ; les administrateurs disposent d’une connexion distincte.

### Rapports et visibilité multi-magasins

Les rapports permettent de consulter les ventes, les dépenses et les historiques de caisse. Le filtre par magasin aide un responsable à analyser un point de vente ou tout le réseau.

## Rôles utilisateurs

| Rôle | Utilisation principale |
| --- | --- |
| Administrateur / propriétaire | Consulte les données globales, gère les produits, le personnel, les magasins et les opérations de caisse. |
| Vendeur | Enregistre les ventes et utilise les fonctions prévues pour son magasin. |

## Parcours type d’une journée

1. Le responsable ou le vendeur ouvre la caisse avec le fonds de départ.
2. Les ventes sont enregistrées au fil de la journée.
3. Les dépenses nécessaires sont ajoutées immédiatement.
4. Le propriétaire consulte le tableau de bord ou les rapports.
5. En fin de journée, la caisse est comptée et clôturée.

## Architecture technique

L’interface est développée en HTML, CSS et JavaScript natif afin de rester rapide, légère et adaptée aux ordinateurs comme aux mobiles.

```text
Navigateur
  ├─ Interface web responsive
  ├─ Supabase Auth pour les administrateurs
  ├─ Client Supabase avec règles d’accès RLS
  └─ Routes Vercel /api pour les opérations métier sensibles
       └─ Base de données PostgreSQL Supabase
```

La solution utilise Supabase pour la base de données, l’authentification et la sécurité, ainsi que Vercel Functions pour les opérations serveur. Les PIN sont hashés avec `bcryptjs` et les sessions personnel utilisent des JWT sécurisés.

## Tester le projet en local

```bash
git clone https://github.com/ndiayetechsolma/solmashop.git
cd solmashop
npm install
```

Copiez `config.example.js` en `config.js`, puis renseignez l’URL Supabase et la clé publique du projet.

Ajoutez ensuite ces variables dans Vercel :

```text
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre-cle-secrete-service-role
PERSONNEL_SESSION_SECRET=une-chaine-longue-aleatoire-et-secrete
```

Lancez le projet :

```bash
npx vercel dev
```

Puis ouvrez l’adresse affichée dans le terminal.

## Vérification

```bash
npm run check
```

## Sécurité

- Les PIN ne sont jamais stockés en clair.
- Les sessions du personnel sont signées et expirent automatiquement.
- Les opérations sensibles passent par des routes serveur.
- Les tables Supabase utilisent Row Level Security.
- Les clés secrètes ne doivent jamais être envoyées dans GitHub ou dans le navigateur.
