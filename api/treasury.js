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
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const [storeResult, salesResult, expensesResult, cashResult] = await Promise.all([
    client.from('magasins').select('nom').eq('id', magasinId).single(),
    client.from('ventes').select('montant, mode_paiement').eq('magasin_id', magasinId).eq('annulee', false).gte('date_heure', since.toISOString()),
    client.from('depenses').select('montant').eq('magasin_id', magasinId).gte('date_heure', since.toISOString()),
    client.from('caisses').select('montant_ouverture, montant_fermeture, ecart, date_ouverture, date_fermeture').eq('magasin_id', magasinId).order('date_ouverture', { ascending: false }).limit(1).maybeSingle()
  ]);
  const queryError = [storeResult, salesResult, expensesResult, cashResult].find(result => result.error)?.error;
  if (queryError) return response.status(500).json({ error: queryError.message });

  const sales = salesResult.data || [];
  const expenses = expensesResult.data || [];
  const cashSales = sales.filter(sale => sale.mode_paiement === 'liquide').reduce((total, sale) => total + sale.montant, 0);
  const mobileSales = sales.filter(sale => sale.mode_paiement === 'mobile_money').reduce((total, sale) => total + sale.montant, 0);
  const expensesTotal = expenses.reduce((total, expense) => total + expense.montant, 0);
  const cash = cashResult.data;
  const expected = cash ? cash.montant_ouverture + cashSales - expensesTotal : 0;

  return response.status(200).json({
    store: storeResult.data.nom,
    salesTotal: cashSales + mobileSales,
    transactions: sales.length,
    cashSales,
    mobileSales,
    expenses: expensesTotal,
    cash: cash ? { opening: cash.montant_ouverture, expected, counted: cash.montant_fermeture, variance: cash.ecart, open: !cash.date_fermeture } : null,
    refreshedAt: new Date().toISOString()
  });
}
