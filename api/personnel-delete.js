import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const authorization = request.headers.authorization || '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!accessToken) return response.status(401).json({ error: 'Authentication required' });

  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return response.status(401).json({ error: 'Invalid session' });
  const { data: admin } = await client.from('admins').select('id').eq('id', userData.user.id).maybeSingle();
  if (!admin) return response.status(403).json({ error: 'Admin access required' });

  const { personnel_id } = request.body || {};
  if (!personnel_id) return response.status(400).json({ error: 'Personnel id is required' });
  const { data: personnel, error: updateError } = await client.from('personnel').update({ actif: false }).eq('id', personnel_id).select('id').maybeSingle();
  if (updateError) return response.status(400).json({ error: updateError.message });
  if (!personnel) return response.status(404).json({ error: 'Personnel not found' });
  return response.status(200).json({ success: true });
}
