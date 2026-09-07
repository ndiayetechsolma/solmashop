import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

export default async function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' });
  const token = (request.headers.authorization || '').replace(/^Bearer\s+/, '');
  if (!token) return response.status(401).json({ error: 'Authentication required' });
  const { data: userData, error: userError } = await client.auth.getUser(token);
  if (userError || !userData.user) return response.status(401).json({ error: 'Invalid session' });
  const { data: admin } = await client.from('admins').select('id').eq('id', userData.user.id).maybeSingle();
  if (!admin) return response.status(403).json({ error: 'Admin access required' });

  const [stores, sales, expenses, products, personnel, cash] = await Promise.all([
    client.from('magasins').select('id, nom').order('nom'),
    client.from('ventes').select('*, magasins(nom), personnel(nom)').order('date_heure', { ascending: false }),
    client.from('depenses').select('*, magasins(nom), personnel(nom)').order('date_heure', { ascending: false }),
    client.from('produits').select('*').eq('actif', true).order('nom'),
    client.from('personnel').select('id, nom, telephone, role, magasin_id, actif').eq('actif', true).order('nom'),
    client.from('caisses').select('*, magasins(nom)').order('date_ouverture', { ascending: false })
  ]);
  const error = [stores, sales, expenses, products, personnel, cash].find(result => result.error)?.error;
  if (error) return response.status(500).json({ error: error.message });
  return response.status(200).json({ stores: stores.data, sales: sales.data, expenses: expenses.data, products: products.data, personnel: personnel.data, cash: cash.data });
}
