// Vercel serverless function: POST /api/submit
// Receives every website form, verifies Turnstile, applies rate limits, saves to Supabase.
import { clientIp, createDeps, handleSubmission } from '../server/forms.js';

const MAX_BODY_BYTES = 20 * 1024;

function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  // Vercel pre-parses JSON bodies; the Vite dev server does not.
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY_BYTES) throw Object.assign(new Error('Body too large'), { code: 'SIZE' });
  }
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return send(res, 405, { ok: false, error: 'Method not allowed.' }, { Allow: 'POST' });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (err) {
    return send(res, err.code === 'SIZE' ? 413 : 400, { ok: false, error: 'Invalid request.' });
  }

  try {
    const deps = createDeps();
    const meta = { ip: clientIp(req.headers, req.socket), userAgent: req.headers['user-agent'] };
    const result = await handleSubmission(body, meta, deps);
    return send(res, result.status, result.body, result.headers);
  } catch (err) {
    console.error('[api/submit]', err);
    return send(res, 500, {
      ok: false,
      error: err.code === 'CONFIG'
        ? 'The form is not configured yet. Please email us directly.'
        : 'Something went wrong. Please try again or email us directly.',
    });
  }
}
