import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { createClient } from '@supabase/supabase-js';

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const secret = new TextEncoder().encode(process.env.PERSONNEL_SESSION_SECRET);
const normalizePhone = value => String(value || '').replace(/\D/g, '');

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  if (!process.env.PERSONNEL_SESSION_SECRET) return response.status(500).json({ error: 'Personnel session secret is not configured' });

  const { telephone, pin } = request.body || {};
  const normalizedTelephone = normalizePhone(telephone);
  if (!normalizedTelephone || !/^\d{4}$/.test(String(pin || ''))) return response.status(400).json({ error: 'Telephone and 4-digit PIN are required' });

  const { data: personnelRows, error } = await client.from('personnel').select('id, nom, role, magasin_id, code_pin_hash, telephone').eq('actif', true);
  const personnel = (personnelRows || []).find(row => normalizePhone(row.telephone) === normalizedTelephone);
  if (error || !personnel || !(await bcrypt.compare(String(pin), personnel.code_pin_hash))) return response.status(401).json({ error: 'Invalid credentials' });

  const token = await new SignJWT({ type: 'personnel', personnelId: personnel.id, magasinId: personnel.magasin_id, role: personnel.role })
    .setProtectedHeader({ alg: 'HS256' }).setSubject(personnel.id).setIssuedAt().setExpirationTime('12h').sign(secret);
  return response.status(200).json({ token, personnel: { id: personnel.id, nom: personnel.nom, role: personnel.role, magasin_id: personnel.magasin_id } });
}
