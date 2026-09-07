import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const authorization = request.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return response.status(401).json({ error: 'Authentication required' });
  const { data: userData, error: userError } = await client.auth.getUser(token);
  if (userError || !userData.user) return response.status(401).json({ error: 'Invalid session' });
  const { data: admin } = await client.from('admins').select('id').eq('id', userData.user.id).maybeSingle();
  if (!admin) return response.status(403).json({ error: 'Admin access required' });
  const { sale_id } = request.body || {};
  if (!sale_id) return response.status(400).json({ error: 'Sale id is required' });
  const { data: sale, error } = await client.from('ventes').update({ annulee: true, annulee_par: userData.user.id, annulee_le: new Date().toISOString() }).eq('id', sale_id).eq('annulee', false).select('id').maybeSingle();
  if (error) return response.status(400).json({ error: error.message });
  if (!sale) return response.status(404).json({ error: 'Sale not found or already cancelled' });
  return response.status(200).json({ success: true });
}
