import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '../config';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let scriptPromise;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.turnstile);
      s.onerror = () => { scriptPromise = undefined; reject(new Error('Turnstile failed to load')); };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget.
 * Calls onToken(token) when verified and onToken('') when the token expires or errors.
 * Parent can call ref.current.reset() after each submission (tokens are single-use).
 */
const Turnstile = forwardRef(function Turnstile({ action, onToken, theme = 'light' }, ref) {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset() {
      onTokenRef.current?.('');
      if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetId.current = turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action,
          theme,
          callback: (token) => onTokenRef.current?.(token),
          'expired-callback': () => onTokenRef.current?.(''),
          'error-callback': () => onTokenRef.current?.(''),
        });
      })
      .catch(() => onTokenRef.current?.(''));

    return () => {
      cancelled = true;
      if (widgetId.current !== null) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [action, theme]);

  return <div ref={containerRef} className="turnstile" />;
});

export default Turnstile;
