import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuCircleAlert, LuLoaderCircle, LuLock, LuLogIn, LuMail } from 'react-icons/lu';
import { supabase } from '../lib/supabase';
import Turnstile from '../components/Turnstile';

// Client-side brake on repeated failures. Supabase Auth also rate-limits on the server.
const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 60;

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [failures, setFailures] = useState(0);
  const [lockedFor, setLockedFor] = useState(0);
  const turnstileRef = useRef(null);

  useEffect(() => {
    if (lockedFor <= 0) return undefined;
    const t = setTimeout(() => setLockedFor((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [lockedFor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy || lockedFor > 0) return;
    if (!email.trim() || !password) return setError('Enter your email and password.');
    if (!token) return setError('Please complete the security check.');

    setBusy(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
      options: { captchaToken: token },
    });
    turnstileRef.current?.reset();
    setBusy(false);

    if (authError) {
      const next = failures + 1;
      setFailures(next);
      if (next >= MAX_ATTEMPTS) {
        setFailures(0);
        setLockedFor(LOCK_SECONDS);
        setError(`Too many failed attempts. Try again in ${LOCK_SECONDS} seconds.`);
      } else if (authError.status === 429) {
        setError('Too many sign-in attempts. Please wait a few minutes and try again.');
      } else {
        setError(authError.message === 'Invalid login credentials'
          ? 'Incorrect email or password.'
          : authError.message);
      }
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <div className="adm-login__brand">
          <span className="logo-box">DSR</span>
          <span className="logo-name">Tech<span>Solutions</span></span>
        </div>
        <h1>Admin Sign In</h1>
        <p className="adm-muted">Manage website form submissions.</p>

        {error && (
          <div className="form-msg form-msg--error"><LuCircleAlert /> {error}</div>
        )}

        <form onSubmit={handleSubmit} noValidate className="adm-login__form">
          <label className="adm-field">
            <span>Email</span>
            <div className="adm-input">
              <LuMail />
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
              />
            </div>
          </label>
          <label className="adm-field">
            <span>Password</span>
            <div className="adm-input">
              <LuLock />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </label>

          <Turnstile ref={turnstileRef} action="admin-login" onToken={setToken} />

          <button type="submit" className="adm-btn adm-btn--primary adm-btn--block" disabled={busy || lockedFor > 0}>
            {busy && <><LuLoaderCircle className="spin" /> Signing in…</>}
            {!busy && lockedFor > 0 && <>Locked — {lockedFor}s</>}
            {!busy && lockedFor <= 0 && <><LuLogIn /> Sign In</>}
          </button>
        </form>

        <Link to="/" className="adm-login__back"><LuArrowLeft /> Back to website</Link>
      </div>
    </div>
  );
}
