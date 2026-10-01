// Server-side form handling shared by the Vercel function (api/submit.js)
// and the Vite dev server. Never import this from browser code — it reads secrets.
import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

// ── Forms the website accepts ──────────────────────────────────
// Add a new entry here when adding a form to the site.
export const FORMS = {
  contact: {
    fields: {
      name:    { required: true,  min: 2,  max: 100 },
      email:   { required: true,  max: 254, email: true },
      phone:   { required: false, max: 30, pattern: /^[0-9+()\-.\s]*$/ },
      subject: { required: false, max: 120 },
      message: { required: true,  min: 10, max: 5000 },
    },
  },
};

// ── Rate limits (per visitor IP, per form) ─────────────────────
export const RATE_LIMITS = [
  { windowMs: 10 * 60 * 1000,      max: 3 },   // 3 submissions per 10 minutes
  { windowMs: 24 * 60 * 60 * 1000, max: 10 },  // 10 submissions per day
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LONGEST_WINDOW = Math.max(...RATE_LIMITS.map((r) => r.windowMs));

const clean = (v) => (typeof v === 'string'
  ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
  : '');

export function validate(formType, body) {
  const form = FORMS[formType];
  if (!form) return { error: 'Unknown form.' };

  const values = {};
  for (const [key, rule] of Object.entries(form.fields)) {
    const v = clean(body[key]);
    if (!v) {
      if (rule.required) return { error: 'Please fill in all required fields.', field: key };
      values[key] = null;
      continue;
    }
    if (rule.min && v.length < rule.min) return { error: `The ${key} field is too short.`, field: key };
    if (rule.max && v.length > rule.max) return { error: `The ${key} field is too long.`, field: key };
    if (rule.email && !EMAIL_RE.test(v)) return { error: 'Please enter a valid email address.', field: 'email' };
    if (rule.pattern && !rule.pattern.test(v)) return { error: `Please enter a valid ${key}.`, field: key };
    values[key] = v;
  }
  return { values };
}

/** Returns seconds until the visitor may submit again, or 0 if allowed. */
export function retryAfterSeconds(timestamps, now = Date.now()) {
  let wait = 0;
  for (const { windowMs, max } of RATE_LIMITS) {
    const inWindow = timestamps
      .map((t) => new Date(t).getTime())
      .filter((t) => now - t < windowMs)
      .sort((a, b) => a - b);
    if (inWindow.length >= max) {
      // The oldest submission that must expire before one more is allowed.
      const unlockAt = inWindow[inWindow.length - max] + windowMs;
      wait = Math.max(wait, Math.ceil((unlockAt - now) / 1000));
    }
  }
  return wait;
}

export function hashIp(ip, salt) {
  return createHash('sha256').update(`${salt}:${ip || 'unknown'}`).digest('hex');
}

/**
 * Core handler. All side effects come in through `deps` so it can be tested.
 * @returns {{ status: number, body: object, headers?: object }}
 */
export async function handleSubmission(body, meta, deps) {
  if (!body || typeof body !== 'object') {
    return { status: 400, body: { ok: false, error: 'Invalid request.' } };
  }

  const formType = typeof body.formType === 'string' ? body.formType : '';
  if (!FORMS[formType]) {
    return { status: 400, body: { ok: false, error: 'Unknown form.' } };
  }

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (clean(body.website)) {
    return { status: 200, body: { ok: true } };
  }

  const { values, error, field } = validate(formType, body);
  if (error) return { status: 400, body: { ok: false, error, field } };

  const token = clean(body.turnstileToken);
  if (!token) {
    return { status: 400, body: { ok: false, error: 'Please complete the security check.' } };
  }
  const human = await deps.verifyTurnstile(token, meta.ip, formType);
  if (!human) {
    return { status: 403, body: { ok: false, error: 'Security check failed. Please try again.' } };
  }

  const ipHash = deps.hashIp(meta.ip);
  const recent = await deps.recentSubmissionTimes(ipHash, formType, new Date(Date.now() - LONGEST_WINDOW));
  const wait = retryAfterSeconds(recent);
  if (wait > 0) {
    const minutes = Math.ceil(wait / 60);
    return {
      status: 429,
      headers: { 'Retry-After': String(wait) },
      body: {
        ok: false,
        error: `You've sent several messages recently. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
        retryAfter: wait,
      },
    };
  }

  const { name, email, phone, subject, message, ...extra } = values;
  await deps.insertSubmission({
    form_type: formType,
    name, email, phone, subject, message,
    data: extra,
    ip_hash: ipHash,
    user_agent: (meta.userAgent || '').slice(0, 500) || null,
    page_url: clean(body.pageUrl).slice(0, 500) || null,
  });

  return { status: 200, body: { ok: true } };
}

// ── Real implementations (Cloudflare Turnstile + Supabase) ─────
export function createDeps(env = process.env) {
  const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const secretKey = env.SUPABASE_SECRET_KEY;
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;

  const missing = [
    !supabaseUrl && 'SUPABASE_URL',
    !secretKey && 'SUPABASE_SECRET_KEY',
    !turnstileSecret && 'TURNSTILE_SECRET_KEY',
  ].filter(Boolean);
  if (missing.length) {
    const err = new Error(`Server is missing environment variables: ${missing.join(', ')}`);
    err.code = 'CONFIG';
    throw err;
  }
  if (secretKey.startsWith('sb_publishable_')) {
    const err = new Error(
      'SUPABASE_SECRET_KEY is set to the publishable key. Use the secret key instead '
      + '(Supabase → Project Settings → API Keys → Secret keys, starts with sb_secret_).',
    );
    err.code = 'CONFIG';
    throw err;
  }

  const db = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const salt = env.RATE_LIMIT_SALT || turnstileSecret;

  return {
    hashIp: (ip) => hashIp(ip, salt),

    async verifyTurnstile(token, ip, action) {
      const form = new URLSearchParams({ secret: turnstileSecret, response: token });
      if (ip) form.set('remoteip', ip);
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      // The widget is rendered with `action` = form type; reject tokens issued for another form.
      return data.success === true && (!data.action || data.action === action);
    },

    async recentSubmissionTimes(ipHash, formType, since) {
      const { data, error } = await db
        .from('form_submissions')
        .select('created_at')
        .eq('ip_hash', ipHash)
        .eq('form_type', formType)
        .gte('created_at', since.toISOString())
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data.map((r) => r.created_at);
    },

    async insertSubmission(row) {
      const { error } = await db.from('form_submissions').insert(row);
      if (error) throw error;
    },
  };
}

export function clientIp(headers, socket) {
  const real = headers['x-real-ip'];
  if (real) return String(real).trim();
  const fwd = headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return socket?.remoteAddress || '';
}
