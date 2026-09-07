import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const normalizePhone = value => String(value || '').replace(/\D/g, '');

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const authorization = request.headers.authorization || '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const { data: userData } = await client.auth.getUser(accessToken);
  if (!userData.user) return response.status(401).json({ error: 'Authentication required' });

  const { data: admin } = await client.from('admins').select('id').eq('id', userData.user.id).maybeSingle();
  if (!admin) return response.status(403).json({ error: 'Admin access required' });

  const { nom, telephone, pin, role = 'vendeur', magasin_id, email, password } = request.body || {};
  if (!nom || !telephone || !/^\d{4}$/.test(String(pin || '')) || !magasin_id || !['vendeur', 'admin'].includes(role)) return response.status(400).json({ error: 'Invalid personnel data' });
  if (role === 'admin' && (!email || !password || String(password).length < 8)) return response.status(400).json({ error: 'Admin email and password of at least 8 characters are required' });

  const code_pin_hash = await bcrypt.hash(String(pin), 12);
  let authUserId = null;
  if (role === 'admin') {
    const { data: authUser, error: authError } = await client.auth.admin.createUser({ email: email.trim(), password, email_confirm: true, user_metadata: { full_name: nom.trim() } });
    if (authError || !authUser.user) return response.status(400).json({ error: authError?.message || 'Unable to create admin account' });
    authUserId = authUser.user.id;
    const { error: adminError } = await client.from('admins').insert({ id: authUserId, email: email.trim() });
    if (adminError) { await client.auth.admin.deleteUser(authUserId); return response.status(400).json({ error: adminError.message }); }
  }
  const { data: personnel, error } = await client.from('personnel').insert({ nom: nom.trim(), telephone: normalizePhone(telephone), code_pin_hash, role, magasin_id }).select('id, nom, telephone, role, magasin_id, actif').single();
  if (error) { if (authUserId) { await client.from('admins').delete().eq('id', authUserId); await client.auth.admin.deleteUser(authUserId); } return response.status(400).json({ error: error.code === '23505' ? 'Telephone already exists' : error.message }); }
  return response.status(201).json({ personnel });
}
