// Sends any website form to the server (/api/submit).
// Resolves to { ok: true } or { ok: false, error, field?, retryAfter? }.
export default async function submitForm(formType, fields, turnstileToken) {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...fields,
        formType,
        turnstileToken,
        pageUrl: window.location.href,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error || 'Something went wrong. Please try again.', ...data };
  } catch {
    return { ok: false, error: 'Network error — please check your connection and try again.' };
  }
}
