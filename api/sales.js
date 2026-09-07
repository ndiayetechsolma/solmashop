import { createClient } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';

const adminClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
const personnelSecret = new TextEncoder().encode(process.env.PERSONNEL_SESSION_SECRET || '');

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  const authorization = request.headers.authorization || '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!accessToken) return response.status(401).json({ error: 'Authentication required' });

  const { nom_produit, montant, mode_paiement, magasin_id, personnel_id, produit_id = null } = request.body || {};
  if (!nom_produit || !Number.isInteger(montant) || montant <= 0 || !['liquide', 'mobile_money'].includes(mode_paiement) || !magasin_id || !personnel_id) {
    return response.status(400).json({ error: 'Invalid sale data' });
  }

  const { data: userData } = await adminClient.auth.getUser(accessToken);
  let authenticatedPersonnelId = personnel_id;
  let authenticatedStoreId = magasin_id;
  if (!userData.user) {
    if (!process.env.PERSONNEL_SESSION_SECRET) return response.status(401).json({ error: 'Invalid session' });
    try {
      const { payload } = await jwtVerify(accessToken, personnelSecret);
      if (payload.type !== 'personnel') return response.status(403).json({ error: 'Invalid personnel session' });
      authenticatedPersonnelId = payload.personnelId;
      authenticatedStoreId = payload.magasinId;
    } catch {
      return response.status(401).json({ error: 'Invalid session' });
    }
  } else {
    const { data: admin } = await adminClient.from('admins').select('id').eq('id', userData.user.id).maybeSingle();
    if (!admin) return response.status(403).json({ error: 'Admin access required' });
  }
  const { data: personnel } = await adminClient.from('personnel').select('id').eq('id', authenticatedPersonnelId).eq('magasin_id', authenticatedStoreId).eq('actif', true).maybeSingle();
  if (!personnel) return response.status(400).json({ error: 'Active personnel not found for this store' });

  const { data: sale, error: saleError } = await adminClient.from('ventes').insert({
    nom_produit,
    montant,
    mode_paiement,
    magasin_id: authenticatedStoreId,
    produit_id,
    personnel_id: authenticatedPersonnelId
  }).select().single();

  if (saleError) return response.status(400).json({ error: saleError.message });
  return response.status(201).json({ sale });
}
