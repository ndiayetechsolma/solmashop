import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const secret = new TextEncoder().encode(process.env.PERSONNEL_SESSION_SECRET || '');

async function identify(token) {
  const { data: userData } = await client.auth.getUser(token);
  if (userData.user) {
    const { data: admin } = await client.from('admins').select('id').eq('id', userData.user.id).maybeSingle();
    if (admin) return { adminId: userData.user.id };
  }
  try { const { payload } = await jwtVerify(token, secret); if (payload.type === 'personnel') return { personnelId: payload.personnelId, magasinId: payload.magasinId }; } catch {}
  return null;
}

export default async function handler(request, response) {
  const token = (request.headers.authorization || '').replace(/^Bearer\s+/, '');
  const identity = token && await identify(token);
  if (!identity) return response.status(401).json({ error: 'Invalid session' });
  const storeId = identity.magasinId || request.query.magasin_id || request.body?.magasin_id;
  if (!storeId) return response.status(400).json({ error: 'Store is required' });
  if (request.method === 'GET') {
    if (request.query.history === 'true') {
      const { data, error } = await client.from('caisses').select('*').eq('magasin_id', storeId).order('date_ouverture', { ascending: false }).limit(90);
      if (error) return response.status(400).json({ error: error.message });
      return response.status(200).json({ history: data });
    }
    const { data, error } = await client.from('caisses').select('*').eq('magasin_id', storeId).order('date_ouverture', { ascending: false }).limit(1).maybeSingle();
    if (error) return response.status(400).json({ error: error.message });
    return response.status(200).json({ cash: data });
}
  const { action, montant_ouverture, montant_fermeture } = request.body || {};
  if (action === 'open') {
    if ((!identity.personnelId && !identity.adminId) || !Number.isInteger(montant_ouverture) || montant_ouverture < 0) return response.status(400).json({ error: 'Invalid opening data' });
    const { data, error } = await client.from('caisses').insert({ magasin_id: storeId, montant_ouverture, ouverte_par: identity.personnelId || null, ouverte_par_admin: identity.adminId || null }).select().single();
    if (error) return response.status(400).json({ error: error.code === '23505' ? 'Cash register already open' : error.message });
    return response.status(201).json({ cash: data });
  }
  if (action === 'close') {
    if ((!identity.personnelId && !identity.adminId) || !Number.isInteger(montant_fermeture) || montant_fermeture < 0) return response.status(400).json({ error: 'Invalid closing data' });
    const { data: cash } = await client.from('caisses').select('*').eq('magasin_id', storeId).is('date_fermeture', null).maybeSingle();
    if (!cash) return response.status(404).json({ error: 'No open cash register' });
    const since = cash.date_ouverture;
    const [{ data: sales }, { data: expenses }] = await Promise.all([
      client.from('ventes').select('montant').eq('magasin_id', storeId).eq('mode_paiement', 'liquide').eq('annulee', false).gte('date_heure', since),
      client.from('depenses').select('montant').eq('magasin_id', storeId).gte('date_heure', since)
    ]);
    const expected = cash.montant_ouverture + (sales || []).reduce((sum, row) => sum + row.montant, 0) - (expenses || []).reduce((sum, row) => sum + row.montant, 0);
    const { data, error } = await client.from('caisses').update({ montant_fermeture, ecart: montant_fermeture - expected, fermee_par: identity.personnelId || null, fermee_par_admin: identity.adminId || null, date_fermeture: new Date().toISOString() }).eq('id', cash.id).select().single();
    if (error) return response.status(400).json({ error: error.message });
    return response.status(200).json({ cash: data, expected });
  }
    if (action === 'reopen') {
    if (!identity.personnelId && !identity.adminId) return response.status(403).json({ error: 'Not authorized' });
    const { data: cash } = await client.from('caisses').select('*').eq('magasin_id', storeId).order('date_ouverture', { ascending: false }).limit(1).maybeSingle();
    if (!cash || !cash.date_fermeture) return response.status(400).json({ error: 'No closed cash register to reopen' });
    const { data, error } = await client.from('caisses').update({ montant_fermeture: null, ecart: null, date_fermeture: null }).eq('id', cash.id).select().single();
    if (error) return response.status(400).json({ error: error.message });
    return response.status(200).json({ cash: data });
  }
  return response.status(400).json({ error: 'Unknown cash action' });
}
