import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuLoaderCircle, LuLogOut, LuShieldAlert } from 'react-icons/lu';
import { supabase } from '../lib/supabase';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './admin.css';

function useNoIndex() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Admin — DSR Tech Solutions';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.title = prevTitle; meta.remove(); };
  }, []);
}

export default function AdminApp() {
  useNoIndex();
  const [session, setSession] = useState(undefined); // undefined = still loading
  const [access, setAccess] = useState({ state: 'checking' }); // checking | admin | denied | setup

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setAccess({ state: 'checking' });
    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setAccess({ state: 'setup', message: error.message });
        else setAccess({ state: data ? 'admin' : 'denied' });
      });
    return () => { cancelled = true; };
  }, [session]);

  const signOut = () => supabase.auth.signOut();

  if (session === undefined || (session && access.state === 'checking')) {
    return (
      <div className="adm-center">
        <LuLoaderCircle className="spin adm-center__spinner" />
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  if (access.state === 'admin') return <AdminDashboard session={session} onSignOut={signOut} />;

  return (
    <div className="adm-center">
      <div className="adm-card adm-notice">
        <div className="adm-notice__icon"><LuShieldAlert /></div>
        {access.state === 'denied' ? (
          <>
            <h1>Access denied</h1>
            <p>
              <strong>{session.user.email}</strong> is signed in but is not an admin.
              Ask the site owner to add this account to the <code>admin_users</code> table.
            </p>
          </>
        ) : (
          <>
            <h1>Database not set up</h1>
            <p>
              The admin tables were not found. Run <code>supabase/schema.sql</code> in the
              Supabase SQL Editor, then reload this page.
            </p>
            <p className="adm-muted">{access.message}</p>
          </>
        )}
        <div className="adm-notice__actions">
          <button type="button" className="adm-btn adm-btn--primary" onClick={signOut}><LuLogOut /> Sign out</button>
          <Link to="/" className="adm-btn">Back to website</Link>
        </div>
      </div>
    </div>
  );
}
