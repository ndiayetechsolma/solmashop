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
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.type === 'personnel') return { personnelId: payload.personnelId, magasinId: payload.magasinId };
  } catch {}
  return null;
}

export default async function handler(request, response) {
  const token = (request.headers.authorization || '').replace(/^Bearer\s+/, '');
  const identity = token && await identify(token);
  if (!identity) return response.status(401).json({ error: 'Invalid session' });
  if (request.method === 'GET') {
    const query = client.from('depenses').select('*, magasins(nom), personnel(nom)').order('date_heure', { ascending: false });
    if (identity.magasinId) query.eq('magasin_id', identity.magasinId);
    const { data, error } = await query;
    if (error) return response.status(400).json({ error: error.message });
    return response.status(200).json({ expenses: data });
  }
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const { montant, motif, magasin_id } = request.body || {};
  const storeId = identity.magasinId || magasin_id;
  if (!Number.isInteger(montant) || montant <= 0 || !motif || !storeId) return response.status(400).json({ error: 'Invalid expense data' });
  let adminNom = null;
  if (identity.adminId) {
    const { data: adminUser } = await client.auth.admin.getUserById(identity.adminId);
    adminNom = adminUser?.user?.user_metadata?.full_name || adminUser?.user?.email || 'Administrateur';
  }
  const payload = { montant, motif: motif.trim(), magasin_id: storeId, personnel_id: identity.personnelId || null, admin_id: identity.adminId || null, admin_nom: adminNom };
  const { data, error } = await client.from('depenses').insert(payload).select().single();
  if (error) return response.status(400).json({ error: error.message });
  return response.status(201).json({ expense: data });
}
