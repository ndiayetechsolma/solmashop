(() => {
  const authScreen = document.querySelector('#auth-screen');
  const appShell = document.querySelector('.app-shell');
  const form = document.querySelector('#admin-login-form');
  const error = document.querySelector('#auth-error');
  const loginButton = document.querySelector('#admin-login-button');
  let authMode = 'admin';
  const configReady = window.SOLMA_SUPABASE_URL && window.SOLMA_SUPABASE_ANON_KEY && !window.SOLMA_SUPABASE_ANON_KEY.startsWith('A_REMPLACER');

  if (!configReady || !window.supabase?.createClient) {
    error.textContent = 'Configuration Supabase incomplète.';
    return;
  }

  const client = window.supabase.createClient(window.SOLMA_SUPABASE_URL, window.SOLMA_SUPABASE_ANON_KEY);
  window.solmaSupabase = client;

  document.querySelectorAll('[data-auth-mode]').forEach(button => button.addEventListener('click', () => {
  authMode = button.dataset.authMode;
  document.querySelectorAll('[data-auth-mode]').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('.admin-field').forEach(item => {
    item.classList.toggle('hidden-field', authMode !== 'admin');
    const input = item.querySelector('input');
    if (input) input.required = authMode === 'admin';
  });
  document.querySelectorAll('.personnel-field').forEach(item => {
    item.classList.toggle('hidden-field', authMode !== 'personnel');
    const input = item.querySelector('input');
    if (input) input.required = authMode === 'personnel';
  });
  loginButton.textContent = authMode === 'admin' ? 'Se connecter' : 'Ouvrir ma session';
}));

  const showApp = () => {
    authScreen.classList.add('hidden');
    appShell.classList.remove('locked');
    document.body.classList.toggle('seller-mode', Boolean(window.solmaPersonnelSession?.token));
    const profile = window.solmaPersonnelSession?.personnel || window.solmaAdminProfile;
    if (profile) {
      const name = profile.nom || profile.email || 'Compte propriétaire';
      document.querySelector('#profile-name').textContent = name;
      document.querySelector('#profile-role').textContent = profile.role === 'vendeur' ? 'Vendeur' : 'Administrateur';
      document.querySelector('#top-avatar').textContent = name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
    }
    window.dispatchEvent(new CustomEvent('solma-auth-ready'));
  };
  const showLogin = () => {
    authScreen.classList.remove('hidden');
    appShell.classList.add('locked');
    form.reset();
    document.querySelector('#auth-error').textContent = '';
  };

  client.auth.getSession().then(({ data }) => {
    if (data.session) { window.solmaAdminProfile = { email: data.session.user.email, name: data.session.user.user_metadata?.full_name || '', role: 'admin' }; showApp(); }
    else {
      try { window.solmaPersonnelSession = JSON.parse(sessionStorage.getItem('solma_personnel_session') || 'null'); } catch { window.solmaPersonnelSession = null; }
      if (window.solmaPersonnelSession?.token) showApp();
      else showLogin();
    }
  });

  client.auth.onAuthStateChange((_event, session) => {
    if (session) { sessionStorage.removeItem('solma_personnel_session'); window.solmaPersonnelSession = null; window.solmaAdminProfile = { email: session.user.email, name: session.user.user_metadata?.full_name || '', role: 'admin' }; showApp(); }
    else showLogin();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    error.textContent = '';
    loginButton.disabled = true;
    loginButton.textContent = 'Connexion...';
    let loginError;
    if (authMode === 'admin') {
      sessionStorage.removeItem('solma_personnel_session');
      ({ error: loginError } = await client.auth.signInWithPassword({ email: document.querySelector('#admin-email').value.trim(), password: document.querySelector('#admin-password').value }));
    } else {
      const telephoneValue = document.querySelector('#personnel-phone').value.trim();
      const pinValue = document.querySelector('#personnel-pin').value;
      await client.auth.signOut();
      const result = await fetch('/api/personnel-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ telephone: telephoneValue, pin: pinValue }) });
      if (result.ok) { const session = await result.json(); sessionStorage.setItem('solma_personnel_session', JSON.stringify(session)); window.solmaPersonnelSession = session; window.solmaAdminProfile = null; showApp(); }
      else loginError = new Error('Invalid personnel credentials');
}
    if (loginError) error.textContent = 'Email ou mot de passe incorrect.';
    loginButton.disabled = false;
    loginButton.textContent = authMode === 'admin' ? 'Se connecter' : 'Ouvrir ma session';
    if (loginError) form.reset();
  });

  document.querySelector('.logout').addEventListener('click', async () => {
    sessionStorage.removeItem('solma_personnel_session');
    window.solmaPersonnelSession = null;
    await client.auth.signOut();
  });
})();
