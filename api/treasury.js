import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const secret = new TextEncoder().encode(process.env.PERSONNEL_SESSION_SECRET);

export default async function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' });
  const authorization = request.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token || !process.env.PERSONNEL_SESSION_SECRET) return response.status(401).json({ error: 'Authentication required' });

  let personnelSession;
  try {
    ({ payload: personnelSession } = await jwtVerify(token, secret));
  } catch {
    return response.status(401).json({ error: 'Invalid personnel session' });
  }
  if (personnelSession.type !== 'personnel' || !personnelSession.personnelId || !personnelSession.magasinId) return response.status(403).json({ error: 'Personnel access required' });

  const magasinId = personnelSession.magasinId;

  const [storeResult, allSalesResult, allExpensesResult, cashResult] = await Promise.all([
    client.from('magasins').select('nom').eq('id', magasinId).single(),
    client.from('ventes').select('id, nom_produit, montant, mode_paiement, date_heure, annulee, personnel(nom)').eq('magasin_id', magasinId).order('date_heure', { ascending: false }),
    client.from('depenses').select('id, motif, montant, date_heure, personnel(nom)').eq('magasin_id', magasinId).order('date_heure', { ascending: false }),
    client.from('caisses').select('montant_ouverture, montant_fermeture, ecart, date_ouverture, date_fermeture').eq('magasin_id', magasinId).order('date_ouverture', { ascending: false }).limit(1).maybeSingle()
  ]);
  const queryError = [storeResult, allSalesResult, allExpensesResult, cashResult].find(result => result.error)?.error;
  if (queryError) return response.status(500).json({ error: queryError.message });

  const storeName = storeResult.data.nom;
  const toTime = value => value ? new Date(value).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '';
  const isToday = value => {
    if (!value) return false;
    const date = new Date(value);
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
  };

  const salesList = (allSalesResult.data || []).map(item => ({
    id: item.id, timestamp: item.date_heure, cancelled: item.annulee, product: item.nom_produit,
    amount: item.montant, payment: item.mode_paiement, seller: item.personnel?.nom || 'Personnel non identifié',
    store: storeName, time: toTime(item.date_heure)
  }));
  const expensesList = (allExpensesResult.data || []).map(item => ({
    id: item.id, timestamp: item.date_heure, reason: item.motif, amount: item.montant,
    addedBy: item.personnel?.nom || 'Personnel', store: storeName, time: toTime(item.date_heure)
  }));

  const todaySales = salesList.filter(sale => !sale.cancelled && isToday(sale.timestamp));
  const todayExpenses = expensesList.filter(expense => isToday(expense.timestamp));
  const cashSales = todaySales.filter(sale => sale.payment === 'liquide').reduce((total, sale) => total + sale.amount, 0);
  const mobileSales = todaySales.filter(sale => sale.payment === 'mobile_money').reduce((total, sale) => total + sale.amount, 0);
  const expensesTotal = todayExpenses.reduce((total, expense) => total + expense.amount, 0);
  const cash = cashResult.data;
  const expected = cash ? cash.montant_ouverture + cashSales - expensesTotal : 0;

  return response.status(200).json({
    store: storeName,
    salesList,
    expensesList,
    salesTotal: cashSales + mobileSales,
    transactions: todaySales.length,
    cashSales,
    mobileSales,
    expensesTotal,
    cash: cash ? { opening: cash.montant_ouverture, expected, counted: cash.montant_fermeture, variance: cash.ecart, open: !cash.date_fermeture } : null,
    refreshedAt: new Date().toISOString()
  });
}