const storageKey = 'solma-shop-demo-v1';
const ICONS = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  trendingUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  trendingDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 7 9 13 13 9 21 17"/><polyline points="14 17 21 17 21 10"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="M18 12h.01"/><path d="M3 9h13"/></svg>',
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M9 21v-6h6v6"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z"/><path d="M9 8h6M9 12h6"/></svg>',
  banknote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0Z"/><path d="M7 5H4a2 2 0 0 0 2 4M17 5h3a2 2 0 0 1-2 4"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M5 7l3-4 3 4M13 7l3-4 3 4"/><path d="M2 7h6M16 7h6"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8Z"/></svg>'
};
function icon(name, size = 16) { return `<span class="icon" style="width:${size}px;height:${size}px">${ICONS[name] || ''}</span>`; }
const initialData = {
  sales: [
    { product: 'Pack eau Kirène', amount: 2500, payment: 'liquide', seller: 'Fatou Diop', store: 'Plateau', time: 'Aujourd’hui, 14:32' },
    { product: 'Sac de riz 5kg', amount: 7800, payment: 'mobile_money', seller: 'Moussa Fall', store: 'Médina', time: 'Aujourd’hui, 13:48' },
    { product: 'Huile Dinor 1L', amount: 1450, payment: 'liquide', seller: 'Fatou Diop', store: 'Plateau', time: 'Aujourd’hui, 12:16' },
    { product: 'Sucre en poudre', amount: 900, payment: 'mobile_money', seller: 'Awa Sarr', store: 'Médina', time: 'Aujourd’hui, 11:04' }
  ],
  expenses: [
    { reason: 'Transport livraison', amount: 3500, addedBy: 'Moussa Fall', store: 'Médina', time: 'Aujourd’hui, 10:20' },
    { reason: 'Petite monnaie', amount: 5000, addedBy: 'Fatou Diop', store: 'Plateau', time: 'Hier, 17:45' }
  ],
  products: [
    { name: 'Pack eau Kirène', price: 2500, category: 'Boissons' },
    { name: 'Sac de riz 5kg', price: 7800, category: 'Épicerie' },
    { name: 'Huile Dinor 1L', price: 1450, category: 'Épicerie' },
    { name: 'Sucre en poudre', price: 900, category: 'Épicerie' },
    { name: 'Lait en poudre', price: 2200, category: 'Épicerie' },
    { name: 'Jus Kirène', price: 1200, category: 'Boissons' }
  ],
  team: [
    { name: 'Fatou Diop', role: 'Vendeuse', phone: '77 123 45 67', store: 'Plateau', initials: 'FD' },
    { name: 'Moussa Fall', role: 'Vendeur', phone: '76 987 65 43', store: 'Médina', initials: 'MF' },
    { name: 'Awa Sarr', role: 'Vendeuse', phone: '78 456 12 30', store: 'Médina', initials: 'AS' }
  ],
  cash: [
    { store: 'Plateau', opened: true, opening: 100000, expected: 126450, openedBy: 'Fatou Diop', openedAt: 'Aujourd’hui, 08:02' },
    { store: 'Médina', opened: false, opening: 75000, expected: 94300, openedBy: 'Moussa Fall', openedAt: 'Hier, 08:17' }
  ]
};
let data = { sales: [], expenses: [], products: [], team: [], cash: [] };
let currentView = 'dashboard';
let selectedProduct = null;
let paymentMethod = 'liquide';
let remoteDataLoaded = false;
let remoteDataLoading = false;
let remoteDataError = '';
let stores = [];
let treasurySnapshot = null;
const page = document.querySelector('#page-content');

const money = value => new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
function persist() { localStorage.setItem(storageKey, JSON.stringify(data)); }
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
function initials(name) { return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(); }
function currentUserName() { return window.solmaPersonnelSession?.personnel?.nom || window.solmaAdminProfile?.name || window.solmaAdminProfile?.email || 'Administrateur'; }
function pageTitle() { return { dashboard: 'Tableau de bord', sales: 'Ventes', cash: 'Caisses', expenses: 'Dépenses', collection: 'Collection', products: 'Produits', team: 'Personnel', reports: 'Rapports' }[currentView]; }
function getFiltered(items) { const store = document.querySelector('#store-filter')?.value || 'all'; return store === 'all' ? items : items.filter(item => item.store.toLowerCase() === store || item.store.toLowerCase().includes(store)); }
function isToday(timestamp) { if (!timestamp) return true; const date = new Date(timestamp); const today = new Date(); return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate(); }
async function loadRemoteDataLegacy() {
  if (remoteDataLoaded || remoteDataLoading || window.solmaPersonnelSession || !window.solmaSupabase) return;
  remoteDataLoading = true;
  remoteDataError = '';
  try {
    const client = window.solmaSupabase;
    const [storesResult, salesResult, expensesResult, productsResult, teamResult, cashResult] = await Promise.all([
      client.from('magasins').select('id, nom').order('nom'),
      client.from('ventes').select('*, magasins(nom), personnel(nom)').order('date_heure', { ascending: false }),
      client.from('depenses').select('*, magasins(nom), personnel(nom)').order('date_heure', { ascending: false }),
      client.from('produits').select('*').eq('actif', true).order('nom'),
      client.from('personnel').select('*').eq('actif', true).order('nom'),
      client.from('caisses').select('*, magasins(nom)').order('date_ouverture', { ascending: false })
    ]);
    const firstError = [storesResult, salesResult, expensesResult, productsResult, teamResult, cashResult].find(result => result.error)?.error;
    if (firstError) throw new Error(firstError.message);
    stores = storesResult.data;
    const toTime = value => value ? new Date(value).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
    data.sales = salesResult.data.map(item => ({ id: item.id, cancelled: item.annulee, product: item.nom_produit, amount: item.montant, payment: item.mode_paiement, seller: item.personnel?.nom || item.personnel_id || 'Personnel non identifié', store: item.magasins?.nom || 'Magasin', time: toTime(item.date_heure) }));
    data.expenses = expensesResult.data.map(item => ({ id: item.id, reason: item.motif, amount: item.montant, addedBy: item.personnel?.nom || 'Administrateur', store: item.magasins?.nom || 'Magasin', time: toTime(item.date_heure) }));
    data.products = productsResult.data.map(item => ({ id: item.id, name: item.nom, price: item.prix, category: 'Produit' }));
    data.team = teamResult.data.map(item => ({ id: item.id, name: item.nom, role: item.role === 'admin' ? 'Administrateur' : 'Vendeur', phone: item.telephone, store: stores.find(store => store.id === item.magasin_id)?.nom || 'Magasin', initials: initials(item.nom) }));
    data.cash = cashResult.data.reduce((stores, item) => { const store = item.magasins?.nom || 'Magasin'; if (!stores.some(entry => entry.store === store)) stores.push({ id: item.magasin_id, store, opened: !item.date_fermeture, opening: item.montant_ouverture, expected: item.montant_fermeture || item.montant_ouverture, openedBy: item.personnel?.nom || 'Personnel', openedAt: toTime(item.date_ouverture) }); return stores; }, []);
    remoteDataLoaded = true;
  } catch (error) {
    remoteDataError = error.message || 'Erreur de connexion à Supabase';
    showToast(`Supabase : ${remoteDataError}`);
  } finally {
    remoteDataLoading = false;
    render();
  }
}
async function loadRemoteData() {
  if (remoteDataLoaded || remoteDataLoading || window.solmaPersonnelSession || !window.solmaSupabase) return;
  remoteDataLoading = true;
  remoteDataError = '';
  try {
    const session = (await window.solmaSupabase.auth.getSession()).data.session;
    if (!session) throw new Error('Session administrateur expirée');
    const response = await fetch('/api/admin-data', { headers: { Authorization: `Bearer ${session.access_token}` } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'Impossible de charger les données en ligne');
    const toTime = value => value ? new Date(value).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
    stores = payload.stores || [];
    data.sales = (payload.sales || []).map(item => ({ id: item.id, timestamp: item.date_heure, cancelled: item.annulee, product: item.nom_produit, amount: item.montant, payment: item.mode_paiement, seller: item.personnel?.nom || item.personnel_id || 'Personnel non identifié', store: item.magasins?.nom || 'Magasin', time: toTime(item.date_heure) }));
    data.expenses = (payload.expenses || []).map(item => ({ id: item.id, timestamp: item.date_heure, reason: item.motif, amount: item.montant, addedBy: item.personnel?.nom || 'Administrateur', store: item.magasins?.nom || 'Magasin', time: toTime(item.date_heure) }));
    data.products = (payload.products || []).map(item => ({ id: item.id, name: item.nom, price: item.prix, category: 'Produit' }));
    data.team = (payload.personnel || []).map(item => ({ id: item.id, name: item.nom, role: item.role === 'admin' ? 'Administrateur' : 'Vendeur', phone: item.telephone, store: stores.find(store => store.id === item.magasin_id)?.nom || 'Magasin', initials: initials(item.nom) }));
    data.cash = (payload.cash || []).reduce((items, item) => { const store = item.magasins?.nom || 'Magasin'; if (!items.some(entry => entry.store === store)) items.push({ id: item.magasin_id, store, opened: !item.date_fermeture, opening: item.montant_ouverture, expected: item.montant_fermeture || item.montant_ouverture, openedBy: item.personnel?.nom || 'Personnel', openedAt: toTime(item.date_ouverture) }); return items; }, []);
    remoteDataLoaded = true;
  } catch (error) {
    remoteDataError = error.message || 'Erreur de connexion';
  } finally {
    remoteDataLoading = false;
    render();
  }
}
async function loadPersonnelTreasury() {
  const token = window.solmaPersonnelSession?.token;
  if (!token) return;
  const result = await fetch('/api/treasury', { headers: { Authorization: `Bearer ${token}` } });
  if (!result.ok) { showToast('Impossible de charger la trésorerie.'); return; }
  treasurySnapshot = await result.json();
  data.cash = treasurySnapshot.cash ? [{ store: treasurySnapshot.store, opened: treasurySnapshot.cash.open, opening: treasurySnapshot.cash.opening, expected: treasurySnapshot.cash.expected, openedBy: 'Session actuelle', openedAt: 'Aujourd’hui' }] : [];
  document.body.classList.add('seller-mode');
  render();
}

function dashboardView() {
  if (remoteDataLoading) return '<div class="loading-state glass-card"><strong>Chargement des données en ligne…</strong><span>Connexion à Supabase en cours.</span></div>';
  if (remoteDataError) return `<div class="empty-state glass-card"><strong>Les données en ligne ne sont pas disponibles.</strong><span>${escapeHtml(remoteDataError)}</span><button class="btn btn-primary" data-action="retry-remote">Réessayer</button></div>`;
  const sales = getFiltered(data.sales).filter(sale => !sale.cancelled);
  const todaySales = sales.filter(sale => isToday(sale.timestamp));
  const todayExpenses = getFiltered(data.expenses).filter(expense => isToday(expense.timestamp));
  const totalSales = treasurySnapshot?.salesTotal ?? todaySales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalExpenses = treasurySnapshot?.expenses ?? todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const cashSales = treasurySnapshot?.cashSales ?? sales.filter(sale => sale.payment === 'liquide').reduce((sum, sale) => sum + sale.amount, 0);
  const transactionCount = treasurySnapshot?.transactions ?? todaySales.length;
  const cashExpected = treasurySnapshot?.cash?.expected ?? cashSales + 175000;
  return `<div class="page-heading"><div><p class="eyebrow">Lundi 12 juin 2024</p><h1>Bonjour ${escapeHtml(currentUserName())}</h1><p class="subtle">Voici ce qui se passe dans vos magasins aujourd’hui.</p></div><button class="btn btn-primary" data-action="new-sale">${icon('plus', 14)} Nouvelle vente</button></div>
  <section class="stats-grid">
    <article class="glass-card stat-card"><div class="stat-top"><span>Ventes du jour</span><span class="stat-symbol">${icon('trendingUp')}</span></div><h2>${money(totalSales)}</h2><div class="stat-foot"><b>+12,8%</b> vs. hier</div></article>
    <article class="glass-card stat-card"><div class="stat-top"><span>Transactions</span><span class="stat-symbol">${icon('activity')}</span></div><h2>${transactionCount}</h2><div class="stat-foot neutral">Depuis l’ouverture du jour</div></article>
    <article class="glass-card stat-card"><div class="stat-top"><span>Dépenses du jour</span><span class="stat-symbol">${icon('trendingDown')}</span></div><h2>${money(totalExpenses)}</h2><div class="stat-foot neutral">2 dépenses enregistrées</div></article>
    <article class="glass-card stat-card"><div class="stat-top"><span>${treasurySnapshot ? 'Trésorerie attendue' : 'Solde en caisse'}</span><span class="stat-symbol">${icon('wallet')}</span></div><h2>${money(cashExpected)}</h2><div class="stat-foot ${treasurySnapshot?.cash?.open ? '' : 'neutral'}">${treasurySnapshot?.cash?.open ? 'Caisse ouverte' : 'Caisse non ouverte'}</div></article>
  </section>
  <section class="content-grid"><article class="glass-card panel"><div class="panel-header"><div><h3>Performance des ventes</h3><p>Chiffre d’affaires des 7 derniers jours</p></div><button class="text-link" data-view-link="reports">Voir le rapport ↗</button></div><div class="chart-wrap"><svg class="chart" viewBox="0 0 700 220" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#80bca0" stop-opacity=".30"/><stop offset="1" stop-color="#80bca0" stop-opacity="0"/></linearGradient></defs><line class="chart-grid" x1="0" y1="30" x2="700" y2="30"/><line class="chart-grid" x1="0" y1="87" x2="700" y2="87"/><line class="chart-grid" x1="0" y1="144" x2="700" y2="144"/><path class="chart-area" d="M0 169 C45 157, 69 137, 100 150 S158 150, 200 119 S260 138, 300 115 S354 87, 397 104 S440 128, 480 91 S543 109, 580 65 S630 100, 700 49 L700 200 L0 200Z"/><path class="chart-line" d="M0 169 C45 157, 69 137, 100 150 S158 150, 200 119 S260 138, 300 115 S354 87, 397 104 S440 128, 480 91 S543 109, 580 65 S630 100, 700 49"/><circle class="chart-dot" cx="580" cy="65" r="5"/><text class="axis-label" x="0" y="216">06 juin</text><text class="axis-label" x="112" y="216">07 juin</text><text class="axis-label" x="225" y="216">08 juin</text><text class="axis-label" x="337" y="216">09 juin</text><text class="axis-label" x="450" y="216">10 juin</text><text class="axis-label" x="562" y="216">11 juin</text><text class="axis-label" x="660" y="216">12 juin</text></svg></div><div class="legend"><span><i></i> Total des ventes</span><span><i class="secondary"></i> Période précédente</span></div></article>
  <article class="glass-card panel"><div class="panel-header"><div><h3>État des caisses</h3><p>Suivi en temps réel</p></div><button class="text-link" data-view-link="cash">Tout voir</button></div><div class="cash-list">${data.cash.map(cash => `<div class="cash-item"><div class="store-icon">${icon('store', 18)}</div><div class="cash-info"><strong>${cash.store}</strong><span>${cash.opened ? 'Ouverte à ' + cash.openedAt.split(', ')[1] : 'Fermée hier à 19:06'}</span></div><div class="cash-amount"><strong>${money(cash.expected)}</strong><span class="${cash.opened ? '' : 'closed'}">${cash.opened ? 'En cours' : 'Fermée'}</span></div><div class="cash-progress"><i class="${cash.opened ? '' : 'closed'}"></i></div></div>`).join('')}</div></article></section>
  <section class="glass-card panel activity-panel"><div class="panel-header"><div><h3>Dernières transactions</h3><p>Les ventes les plus récentes de vos magasins</p></div><button class="text-link" data-view-link="sales">Voir toutes les ventes ↗</button></div>${salesTable(sales.slice(0, 4))}</section>`;
}
function salesTable(sales) { const admin = !window.solmaPersonnelSession; return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Produit</th><th>Vendeur</th><th>Magasin</th><th>Paiement</th><th>Montant</th><th>Date et heure</th>${admin ? '<th>Action</th>' : ''}</tr></thead><tbody>${sales.map((sale, index) => `<tr class="${sale.cancelled ? 'cancelled-row' : ''}"><td><strong>${escapeHtml(sale.product)}</strong></td><td><div class="person"><span class="person-avatar">${initials(sale.seller)}</span>${escapeHtml(sale.seller)}</div></td><td class="muted">${escapeHtml(sale.store)}</td><td><span class="badge ${sale.payment === 'liquide' ? 'badge-cash' : 'badge-money'}">${sale.payment === 'liquide' ? 'Liquide' : 'Mobile money'}</span></td><td><strong>${money(sale.amount)}</strong></td><td class="muted">${escapeHtml(sale.time)}${sale.cancelled ? ' · Annulée' : ''}</td>${admin ? `<td>${sale.cancelled ? '<span class="muted">Annulée</span>' : `<button class="text-link danger-link" data-cancel-sale="${sale.id || ''}" data-cancel-local="${index}">Annuler</button>`}</td>` : ''}</tr>`).join('')}</tbody></table></div>`; }
function genericHeader(title, subtitle, action, actionLabel) { return `<div class="page-heading"><div><p class="eyebrow">Gestion opérationnelle</p><h1>${title}</h1><p class="subtle">${subtitle}</p></div>${action ? `<button class="btn btn-primary" data-action="${action}">${icon('plus', 14)} ${actionLabel}</button>` : ''}</div>`; }
function salesView() { return genericHeader('Ventes', 'Toutes les ventes enregistrées dans vos magasins.', 'new-sale', 'Nouvelle vente') + `<section class="glass-card view-card"><div class="filters"><select class="filter-input"><option>Cette semaine</option><option>Aujourd’hui</option><option>Ce mois</option></select><select class="filter-input"><option>Tous les moyens de paiement</option><option>Liquide</option><option>Mobile money</option></select><button class="btn btn-light">Exporter CSV ↗</button></div>${salesTable(getFiltered(data.sales))}</section>`; }
function expensesView() { return genericHeader('Dépenses', 'Gardez une trace claire des sorties de chaque magasin.', 'new-expense', 'Ajouter une dépense') + `<section class="glass-card view-card">${data.expenses.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Motif</th><th>Ajoutée par</th><th>Magasin</th><th>Montant</th><th>Date</th></tr></thead><tbody>${getFiltered(data.expenses).map(item => `<tr><td><strong>${escapeHtml(item.reason)}</strong></td><td>${escapeHtml(item.addedBy)}</td><td class="muted">${item.store}</td><td class="negative"><strong>− ${money(item.amount)}</strong></td><td class="muted">${item.time}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty-state"><strong>Aucune dépense</strong>Les dépenses ajoutées apparaîtront ici.</div>'}</section>`; }
function cashView() { return genericHeader('Caisses', 'Ouvertures, fermetures et écarts de caisse.', null, '') + `<section class="cash-list">${data.cash.map(cash => `<article class="glass-card view-card"><div class="panel-header"><div><h3>Caisse ${escapeHtml(cash.store)}</h3><p>${cash.opened ? 'Ouverte' : 'Fermée'} · ${escapeHtml(cash.openedBy || 'Historique')}</p></div><span class="badge ${cash.opened ? 'badge-money' : 'badge-cash'}">${cash.opened ? 'En cours' : 'Fermée'}</span></div><div class="form-grid"><div><span class="muted">Montant d’ouverture</span><h3>${money(cash.opening)}</h3></div><div><span class="muted">Montant attendu</span><h3>${money(cash.expected)}</h3></div></div><div class="form-actions"><button class="btn ${cash.opened ? 'btn-danger' : 'btn-primary'}" data-action="${cash.opened ? 'close-cash' : 'open-cash'}" data-store="${escapeHtml(cash.store)}">${cash.opened ? 'Fermer la caisse' : 'Ouvrir la caisse'}</button></div></article>`).join('')}</section>`; }
function productsView() { return genericHeader('Produits', 'Votre catalogue de vente rapide, sans gestion de stock.', 'new-product', 'Nouveau produit') + `<section class="glass-card view-card">${data.productsTable ? '' : `<div class="table-wrap"><table class="data-table"><thead><tr><th>Produit</th><th>Catégorie</th><th>Prix de vente</th><th></th></tr></thead><tbody>${data.products.map((product, index) => `<tr><td><strong>${escapeHtml(product.name)}</strong></td><td class="muted">${product.category}</td><td><strong>${money(product.price)}</strong></td><td><button class="text-link" data-remove-product="${index}">Supprimer</button></td></tr>`).join('')}</tbody></table></div>`}</section>`; }
function collectionView() { return genericHeader('Collection', 'Catalogue disponible pour préparer rapidement une vente.', null, '') + `<section class="glass-card view-card"><div class="product-collection">${data.products.map(product => `<button class="product-pick" data-collection-product="${escapeHtml(product.name)}"><strong>${escapeHtml(product.name)}</strong><span>${money(product.price)}</span></button>`).join('')}</div></section>`; }
function teamView() { return genericHeader('Personnel', 'Les personnes autorisées à enregistrer des opérations.', 'new-team', 'Ajouter une personne') + `<section class="glass-card view-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Nom</th><th>Rôle</th><th>Téléphone</th><th>Magasin</th><th>Accès</th><th></th></tr></thead><tbody>${data.team.map(member => `<tr><td><div class="person"><span class="person-avatar">${member.initials}</span><strong>${escapeHtml(member.name)}</strong></div></td><td class="muted">${member.role}</td><td>${escapeHtml(member.phone)}</td><td class="muted">${member.store}</td><td><span class="badge badge-money">Actif</span></td><td><button class="text-link danger-link" data-deactivate-personnel="${member.id}">Désactiver</button></td></tr>`).join('')}</tbody></table></div></section>`; }
function reportsView() { return genericHeader('Rapports', 'Analysez les résultats par période, magasin ou vendeur.', null, '') + `<section class="stats-grid"><article class="glass-card stat-card"><div class="stat-top"><span>Ticket moyen</span><span class="stat-symbol">${icon('receipt')}</span></div><h2>${money(3162)}</h2><div class="stat-foot"><b>+6,2%</b> ce mois</div></article><article class="glass-card stat-card"><div class="stat-top"><span>Liquide</span><span class="stat-symbol">${icon('banknote')}</span></div><h2>61%</h2><div class="stat-foot neutral">des paiements</div></article><article class="glass-card stat-card"><div class="stat-top"><span>Meilleur magasin</span><span class="stat-symbol">${icon('trophy')}</span></div><h2>Plateau</h2><div class="stat-foot"><b>+18,4%</b> vs. Médina</div></article><article class="glass-card stat-card"><div class="stat-top"><span>Écart caisse</span><span class="stat-symbol">${icon('scale')}</span></div><h2 class="positive">+ 0 FCFA</h2><div class="stat-foot neutral">Sur les 7 derniers jours</div></article></section><section class="glass-card panel"><div class="panel-header"><div><h3>Résumé des performances</h3><p>Comparaison par magasin</p></div><select class="filter-input"><option>Ce mois</option><option>Cette semaine</option></select></div>${salesTable(data.sales)}</section>`; }

function render() { const views = { dashboard: dashboardView, sales: salesView, cash: cashView, expenses: expensesView, collection: collectionView, products: productsView, team: teamView, reports: reportsView }; page.innerHTML = views[currentView](); document.querySelector('#breadcrumb-current').textContent = pageTitle(); document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === currentView)); bindViewEvents(); }
function openModal(type) { const modal = document.createElement('div'); modal.className = 'modal-backdrop'; let title = 'Nouvelle entrée'; let fields = ''; const storeOptions = stores.map(store => `<option value="${store.id}">${escapeHtml(store.nom)}</option>`).join(''); if (type === 'sale') { title = 'Enregistrer une vente'; fields = `<div class="field"><label>Produit</label><input id="modal-product" placeholder="Nom du produit" value="${selectedProduct?.name || ''}" /></div><div class="field"><label>Montant (FCFA)</label><input id="modal-amount" type="number" placeholder="0" value="${selectedProduct?.price || ''}" /></div><div class="field"><label>Magasin</label><select id="modal-store">${storeOptions}</select></div><div class="field"><label>Mode de paiement</label><select id="modal-payment"><option value="liquide">Liquide</option><option value="mobile_money">Mobile money</option></select></div>`; } else if (type === 'expense') { title = 'Ajouter une dépense'; fields = `<div class="field"><label>Motif</label><input id="modal-reason" placeholder="Ex. Transport livraison" /></div><div class="field"><label>Montant (FCFA)</label><input id="modal-amount" type="number" placeholder="0" /></div><div class="field"><label>Magasin</label><select id="modal-store">${storeOptions}</select></div>`; } else if (type === 'product') { title = 'Ajouter un produit'; fields = `<div class="field"><label>Nom du produit</label><input id="modal-product" placeholder="Ex. Biscuit" /></div><div class="field"><label>Prix de vente (FCFA)</label><input id="modal-amount" type="number" placeholder="0" /></div><div class="field"><label>Magasin</label><select id="modal-store">${storeOptions}</select></div>`; } else { title = 'Ajouter une personne'; fields = `<div class="field"><label>Nom complet</label><input id="modal-name" placeholder="Nom et prénom" /></div><div class="field"><label>Téléphone</label><input id="modal-phone" placeholder="77 000 00 00" /></div><div class="field"><label>Magasin</label><select id="modal-store">${storeOptions}</select></div><div class="field"><label>Code à 4 chiffres</label><input id="modal-pin" type="password" maxlength="4" placeholder="••••" /></div>`; }
  modal.innerHTML = `<div class="modal glass-card"><button class="modal-close" aria-label="Fermer">${icon('close', 16)}</button><p class="eyebrow">Solma Shop Business</p><h2>${title}</h2><p class="subtle">Les informations sont enregistrées immédiatement dans cette caisse.</p><div class="form-grid modal-fields">${fields}</div><div class="form-actions"><button class="btn btn-light modal-cancel">Annuler</button><button class="btn btn-primary modal-save">Enregistrer</button></div></div>`; document.body.appendChild(modal); modal.querySelector('.modal-close').onclick = () => modal.remove(); modal.querySelector('.modal-cancel').onclick = () => modal.remove(); modal.querySelector('.modal-save').onclick = () => saveModalDeprecated(type, modal); }
async function saveModalDeprecated(type, modal) { const amount = Number(modal.querySelector('#modal-amount')?.value || 0); const storeId = modal.querySelector('#modal-store')?.value; const store = stores.find(item => item.id === storeId)?.nom || 'Magasin'; if (type === 'product') { const name = modal.querySelector('#modal-product').value.trim(); if (!name || amount <= 0 || !window.solmaSupabase || !storeId) { showToast('Renseignez le nom, le prix et le magasin.'); return; } const { error: insertError } = await window.solmaSupabase.from('produits').insert({ nom: name, prix: amount, magasin_id: storeId }); if (insertError) { showToast(insertError.code === '23505' ? 'Ce produit existe déjà dans ce magasin.' : 'Impossible d’ajouter le produit.'); return; } modal.remove(); remoteDataLoaded = false; await loadRemoteData(); showToast('Produit ajouté dans Supabase.'); return; } if (type === 'team') { const name = modal.querySelector('#modal-name').value.trim(); const telephone = modal.querySelector('#modal-phone').value.trim(); const pin = modal.querySelector('#modal-pin').value; const accessToken = (await window.solmaSupabase.auth.getSession()).data.session?.access_token; if (!name || !telephone || !/^\d{4}$/.test(pin) || !storeId || !accessToken) { showToast('Renseignez le nom, le téléphone, le PIN à 4 chiffres et le magasin.'); return; } const result = await fetch('/api/personnel-create', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }, body: JSON.stringify({ nom: name, telephone, pin, magasin_id: storeId, role: 'vendeur' }) }); if (!result.ok) { const payload = await result.json().catch(() => ({})); showToast(payload.error === 'Telephone already exists' ? 'Ce numéro existe déjà.' : 'Impossible de créer le vendeur.'); return; } modal.remove(); remoteDataLoaded = false; await loadRemoteData(); showToast('Vendeur créé avec un PIN sécurisé.'); return; } if (type === 'sale' && amount > 0) data.sales.unshift({ product: modal.querySelector('#modal-product').value || 'Produit personnalisé', amount, payment: modal.querySelector('#modal-payment').value, seller: 'Amadou Mbaye', store, time: 'À l’instant' }); else if (type === 'expense' && amount > 0) data.expenses.unshift({ reason: modal.querySelector('#modal-reason').value || 'Dépense diverse', amount, addedBy: 'Amadou Mbaye', store, time: 'À l’instant' }); else { showToast('Veuillez renseigner les champs requis.'); return; } persist(); modal.remove(); render(); showToast('Enregistrement effectué.'); }
function bindViewEvents() { document.querySelectorAll('[data-view-link]').forEach(button => button.onclick = () => { currentView = button.dataset.viewLink; document.querySelector('#header-menu')?.classList.remove('open'); render(); }); document.querySelectorAll('[data-action]').forEach(button => button.onclick = () => { const action = button.dataset.action; if (action === 'retry-remote') { remoteDataLoaded = false; remoteDataError = ''; loadRemoteData(); } if (action === 'new-sale') openModal('sale'); if (action === 'new-expense') openModal('expense'); if (action === 'new-product') openModal('product'); if (action === 'new-team') openModal('team'); if (action === 'edit-profile') openProfileModal(); if (action === 'toggle-cash') { const cash = data.cash.find(item => item.store === button.dataset.store); cash.opened = !cash.opened; persist(); render(); showToast(cash.opened ? 'Caisse ouverte.' : 'Caisse fermée.'); } }); document.querySelectorAll('[data-remove-product]').forEach(button => button.onclick = () => { data.products.splice(Number(button.dataset.removeProduct), 1); persist(); render(); showToast('Produit supprimé.'); }); document.querySelectorAll('[data-deactivate-personnel]').forEach(button => button.onclick = () => deactivatePersonnel(button.dataset.deactivatePersonnel)); document.querySelectorAll('[data-cancel-sale]').forEach(button => button.onclick = () => { if (window.solmaPersonnelSession) { showToast('Un vendeur ne peut pas annuler une vente.'); return; } button.dataset.cancelSale ? cancelSale(button.dataset.cancelSale) : cancelLocalSale(Number(button.dataset.cancelLocal)); }); document.querySelectorAll('[data-collection-product]').forEach(button => button.onclick = () => { selectedProduct = data.products.find(product => product.name === button.dataset.collectionProduct); openModal('sale'); }); }

function cancelLocalSale(index) { if (!confirm('Annuler cette vente locale ?')) return; const sale = data.sales[index]; if (!sale) return; sale.cancelled = true; persist(); render(); showToast('Vente annulée.'); }

function openProfileModal() { const modal = document.createElement('div'); modal.className = 'modal-backdrop'; const currentName = escapeHtml(window.solmaAdminProfile?.name || ''); modal.innerHTML = `<div class="modal glass-card"><button class="modal-close" aria-label="Fermer">${icon('close', 16)}</button><p class="eyebrow">Profil administrateur</p><h2>Modifier votre nom</h2><p class="subtle">Ce nom apparaîtra dans votre espace et sur vos opérations.</p><div class="field"><label for="profile-name-input">Nom affiché</label><input id="profile-name-input" value="${currentName}" placeholder="Votre nom complet" autocomplete="name" /></div><div class="form-actions"><button class="btn btn-light modal-cancel">Annuler</button><button class="btn btn-primary modal-save">Enregistrer</button></div></div>`; document.body.appendChild(modal); const close = () => modal.remove(); modal.querySelector('.modal-close').onclick = close; modal.querySelector('.modal-cancel').onclick = close; modal.querySelector('.modal-save').onclick = async () => { const name = modal.querySelector('#profile-name-input').value.trim(); const { data: result, error } = await window.solmaSupabase.auth.updateUser({ data: { full_name: name } }); if (error) { showToast('Impossible de modifier le profil.'); return; } window.solmaAdminProfile = { email: result.user.email, name, role: 'admin' }; close(); render(); document.querySelector('#profile-name').textContent = currentUserName(); showToast('Nom administrateur mis à jour.'); }; }

async function cancelSale(saleId) { if (!confirm('Annuler cette vente ? Elle restera visible dans l’historique.')) return; const session = (await window.solmaSupabase.auth.getSession()).data.session; if (!session) { showToast('Session admin expirée.'); return; } const result = await fetch('/api/sales-delete', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ sale_id: saleId }) }); if (!result.ok) { showToast('Impossible d’annuler cette vente.'); return; } remoteDataLoaded = false; await loadRemoteData(); showToast('Vente annulée.'); }

const modalObserver = new MutationObserver(() => { const fields = document.querySelector('.modal-backdrop .modal-fields'); if (fields && !fields.querySelector('#modal-role') && document.querySelector('.modal h2')?.textContent.includes('personne')) fields.insertAdjacentHTML('beforeend', '<div class="field"><label>Rôle</label><select id="modal-role"><option value="vendeur">Vendeur</option><option value="admin">Administrateur</option></select></div>'); });
modalObserver.observe(document.body, { childList: true, subtree: true });
const adminFieldsObserver = new MutationObserver(() => { const fields = document.querySelector('.modal-backdrop .modal-fields'); const role = fields?.querySelector('#modal-role'); if (!fields || !role) return; const sync = () => { const existing = fields.querySelector('.admin-auth-fields'); if (role.value === 'admin' && !existing) fields.insertAdjacentHTML('beforeend', '<div class="admin-auth-fields"><div class="field"><label>Email administrateur</label><input id="admin-personnel-email" type="email" placeholder="admin@exemple.com" /></div><div class="field"><label>Mot de passe (8 caractères minimum)</label><input id="admin-personnel-password" type="password" minlength="8" placeholder="Mot de passe" /></div></div>'); if (role.value !== 'admin' && existing) existing.remove(); }; role.addEventListener('change', sync); sync(); });
adminFieldsObserver.observe(document.body, { childList: true, subtree: true });
const saleFieldsObserver = new MutationObserver(() => { const fields = document.querySelector('.modal-backdrop .modal-fields'); if (!fields || !document.querySelector('.modal h2')?.textContent.includes('vente')) return; if (!fields.querySelector('.catalog-picks')) { fields.insertAdjacentHTML('afterbegin', `<div class="catalog-picks"><label>Choisir dans le catalogue</label><div class="product-picks">${data.products.map(product => `<button type="button" class="product-pick" data-sale-product="${escapeHtml(product.name)}"><strong>${escapeHtml(product.name)}</strong><span>${money(product.price)}</span></button>`).join('')}</div></div>`); fields.querySelectorAll('[data-sale-product]').forEach(button => button.onclick = () => { const product = data.products.find(item => item.name === button.dataset.saleProduct); if (product) { fields.querySelector('#modal-product').value = product.name; fields.querySelector('#modal-amount').value = product.price; fields.querySelector('#modal-product').dataset.productId = product.id || ''; } }); } if (!fields.querySelector('#add-to-catalog')) fields.insertAdjacentHTML('beforeend', '<label class="catalog-check"><input id="add-to-catalog" type="checkbox" /> Ajouter ce nouveau produit au catalogue</label>'); if (!fields.querySelector('#modal-seller') && !window.solmaPersonnelSession) fields.insertAdjacentHTML('beforeend', `<div class="field"><label>Vendeur</label><select id="modal-seller">${data.team.filter(member => member.id).map(member => `<option value="${member.id}">${escapeHtml(member.name)}</option>`).join('')}</select></div>`); });
saleFieldsObserver.observe(document.body, { childList: true, subtree: true });
const browserFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => { if (String(input).includes('/api/personnel-create') && init.body) { const payload = JSON.parse(init.body); payload.role = document.querySelector('#modal-role')?.value || 'vendeur'; init.body = JSON.stringify(payload); } return browserFetch(input, init); };

async function saveModal(type, modal) {
  const amount = Number(modal.querySelector('#modal-amount')?.value || 0);
  const storeId = modal.querySelector('#modal-store')?.value;
  const session = (await window.solmaSupabase.auth.getSession()).data.session;
  const token = window.solmaPersonnelSession?.token || session?.access_token;
  if (!token) { showToast('Session expirée.'); return; }
  if (type === 'product') {
    const name = modal.querySelector('#modal-product').value.trim();
    if (!name || amount <= 0 || !storeId) { showToast('Renseignez le nom, le prix et le magasin.'); return; }
    const result = await window.solmaSupabase.from('produits').insert({ nom: name, prix: amount, magasin_id: storeId });
    if (result.error) { showToast(result.error.code === '23505' ? 'Ce produit existe déjà dans ce magasin.' : 'Impossible d’ajouter le produit.'); return; }
    modal.remove(); remoteDataLoaded = false; await loadRemoteData(); showToast('Produit enregistré en ligne.'); return;
  }
  if (type === 'team') {
    const payload = { nom: modal.querySelector('#modal-name').value.trim(), telephone: modal.querySelector('#modal-phone').value.trim(), pin: modal.querySelector('#modal-pin').value, magasin_id: storeId, role: modal.querySelector('#modal-role')?.value || 'vendeur', email: modal.querySelector('#admin-personnel-email')?.value.trim(), password: modal.querySelector('#admin-personnel-password')?.value };
    if (!payload.nom || !payload.telephone || !/^\d{4}$/.test(payload.pin) || !storeId) { showToast('Renseignez tous les champs du personnel.'); return; }
    const result = await browserFetch('/api/personnel-create', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
    if (!result.ok) { const error = await result.json().catch(() => ({})); showToast(error.error || 'Impossible de créer le personnel.'); return; }
    modal.remove(); remoteDataLoaded = false; await loadRemoteData(); showToast('Personnel enregistré en ligne.'); return;
  }
  if (type === 'expense') {
    const motif = modal.querySelector('#modal-reason').value.trim();
    if (!motif || amount <= 0 || !storeId) { showToast('Renseignez le motif, le montant et le magasin.'); return; }
    const result = await browserFetch('/api/expenses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ motif, montant: amount, magasin_id: storeId }) });
    if (!result.ok) { showToast('Impossible d’enregistrer la dépense.'); return; }
    modal.remove(); remoteDataLoaded = false; if (window.solmaPersonnelSession) await loadPersonnelTreasury(); else await loadRemoteData(); showToast('Dépense enregistrée en ligne.'); return;
  }
  if (type === 'sale') {
    const product = modal.querySelector('#modal-product').value.trim();
    const personnelId = window.solmaPersonnelSession?.personnel?.id || modal.querySelector('#modal-seller')?.value;
    let productId = modal.querySelector('#modal-product').dataset.productId || null;
    if (!product || amount <= 0 || !storeId || !personnelId) { showToast('Renseignez le produit, le montant, le magasin et le vendeur.'); return; }
    if (!productId && modal.querySelector('#add-to-catalog')?.checked) { const catalog = await window.solmaSupabase.from('produits').insert({ nom: product, prix: amount, magasin_id: storeId }).select('id').single(); if (catalog.error && catalog.error.code !== '23505') { showToast('Impossible d’ajouter le produit au catalogue.'); return; } productId = catalog.data?.id || null; }
    const result = await browserFetch('/api/sales', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ nom_produit: product, montant: amount, mode_paiement: modal.querySelector('#modal-payment').value, magasin_id: storeId, personnel_id: personnelId, produit_id: productId }) });
    if (!result.ok) { showToast('Impossible d’enregistrer la vente en ligne.'); return; }
    modal.remove(); remoteDataLoaded = false; if (window.solmaPersonnelSession) await loadPersonnelTreasury(); else await loadRemoteData(); showToast('Vente enregistrée en ligne.');
  }
}

saveModalDeprecated = saveModal;

async function saveModalOriginal(type, modal) {
  const amount = Number(modal.querySelector('#modal-amount')?.value || 0);
  const storeId = modal.querySelector('#modal-store')?.value;
  const productName = modal.querySelector('#modal-product')?.value.trim();
  if (type === 'expense') {
    const motif = modal.querySelector('#modal-reason')?.value.trim();
    const personnelToken = window.solmaPersonnelSession?.token;
    const adminSession = (await window.solmaSupabase.auth.getSession()).data.session;
    const token = personnelToken || adminSession?.access_token;
    if (!motif || amount <= 0 || !storeId || !token) { showToast('Renseignez le motif, le montant et le magasin.'); return; }
    const result = await fetch('/api/expenses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ motif, montant: amount, magasin_id: storeId }) });
    if (!result.ok) { showToast('Impossible d’enregistrer la dépense.'); return; }
    modal.remove(); remoteDataLoaded = false; if (personnelToken) await loadPersonnelTreasury(); else await loadRemoteData(); showToast('Dépense enregistrée dans Supabase.'); return;
  }
  if (type !== 'sale') return saveModalOriginal(type, modal);
  const personnelSession = window.solmaPersonnelSession;
  const adminSession = (await window.solmaSupabase.auth.getSession()).data.session;
  const token = personnelSession?.token || adminSession?.access_token;
  const personnelId = personnelSession?.personnel?.id || modal.querySelector('#modal-seller')?.value;
  if (!productName || amount <= 0 || !storeId || !token || !personnelId) { showToast('Renseignez le produit, le montant, le magasin et le vendeur.'); return; }
  let productId = modal.querySelector('#modal-product')?.dataset.productId || null;
  if (!productId && modal.querySelector('#add-to-catalog')?.checked) { const catalogResult = await window.solmaSupabase.from('produits').insert({ nom: productName, prix: amount, magasin_id: storeId }).select('id').single(); if (catalogResult.error && catalogResult.error.code !== '23505') { showToast('Impossible d’ajouter le produit au catalogue.'); return; } productId = catalogResult.data?.id || null; }
  const result = await fetch('/api/sales', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ nom_produit: productName, montant: amount, mode_paiement: modal.querySelector('#modal-payment').value, magasin_id: storeId, personnel_id: personnelId, produit_id: productId }) });
  if (!result.ok) { showToast('Impossible d’enregistrer la vente.'); return; }
  modal.remove(); remoteDataLoaded = false; if (personnelSession) await loadPersonnelTreasury(); else await loadRemoteData(); showToast('Vente enregistrée dans Supabase.');
}

async function deactivatePersonnel(personnelId) { if (!personnelId || !window.solmaSupabase || !confirm('Désactiver cet accès vendeur ? Ses ventes seront conservées.')) return; const session = (await window.solmaSupabase.auth.getSession()).data.session; if (!session) { showToast('Session admin expirée.'); return; } const result = await fetch('/api/personnel-delete', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ personnel_id: personnelId }) }); if (!result.ok) { showToast('Impossible de désactiver ce vendeur.'); return; } remoteDataLoaded = false; await loadRemoteData(); showToast('Accès vendeur désactivé.'); }

function openCashModal(action, storeId, storeName) { const isOpen = action === 'open'; const modal = document.createElement('div'); modal.className = 'modal-backdrop'; modal.innerHTML = `<div class="modal glass-card"><button class="modal-close" aria-label="Fermer">${icon('close', 16)}</button><p class="eyebrow">Caisse ${escapeHtml(storeName)}</p><h2>${isOpen ? 'Ouvrir la caisse' : 'Fermer la caisse'}</h2><p class="subtle">${isOpen ? 'Saisissez le montant réellement présent au démarrage.' : 'Comptez l’argent physiquement avant de confirmer.'}</p><div class="field"><label>Montant (FCFA)</label><input id="cash-amount" type="number" min="0" placeholder="0" /></div><div class="form-actions"><button class="btn btn-light modal-cancel">Annuler</button><button class="btn btn-primary modal-save">Confirmer</button></div></div>`; document.body.appendChild(modal); const close = () => modal.remove(); modal.querySelector('.modal-close').onclick = close; modal.querySelector('.modal-cancel').onclick = close; modal.querySelector('.modal-save').onclick = async () => { const amount = Number(modal.querySelector('#cash-amount').value); const token = window.solmaPersonnelSession?.token || (await window.solmaSupabase.auth.getSession()).data.session?.access_token; if (!Number.isInteger(amount) || amount < 0 || !token) { showToast('Montant invalide ou session expirée.'); return; } const result = await fetch('/api/cash', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ action, magasin_id: storeId, ...(isOpen ? { montant_ouverture: amount } : { montant_fermeture: amount }) }) }); if (!result.ok) { showToast('Impossible de modifier la caisse.'); return; } close(); remoteDataLoaded = false; if (window.solmaPersonnelSession) await loadPersonnelTreasury(); else await loadRemoteData(); showToast(isOpen ? 'Caisse ouverte.' : 'Caisse fermée.'); }; }

document.addEventListener('click', event => { const button = event.target.closest('[data-action="open-cash"], [data-action="close-cash"]'); if (!button) return; event.stopImmediatePropagation(); const cash = data.cash.find(item => item.store === button.dataset.store); const store = stores.find(item => item.nom === button.dataset.store); openCashModal(button.dataset.action === 'open-cash' ? 'open' : 'close', cash?.id || store?.id, button.dataset.store); }, true);

document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => { currentView = item.dataset.view; document.querySelector('#sidebar').classList.remove('open'); render(); }));
document.querySelector('#store-filter').addEventListener('change', render);
document.querySelector('#mobile-menu').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'));
render();
window.addEventListener('solma-auth-ready', () => {
  if (window.solmaPersonnelSession?.token) {
    document.body.classList.add('seller-mode');
    loadPersonnelTreasury();
  } else {
    document.body.classList.remove('seller-mode');
    remoteDataLoaded = false;
    loadRemoteData();
  }
});
if (window.solmaSupabase) window.solmaSupabase.auth.getSession().then(({ data: sessionData }) => { if (sessionData.session) loadRemoteData(); });
if (window.solmaPersonnelSession?.token) { document.body.classList.add('seller-mode'); loadPersonnelTreasury(); setInterval(loadPersonnelTreasury, 30000); }

const legacyIdentity = ['Amadou Mbaye', 'Mamadou Mbaye'];
data.sales.forEach(sale => { if (legacyIdentity.includes(sale.seller)) sale.seller = currentUserName(); });
render();
