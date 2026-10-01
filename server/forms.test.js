// Run with: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleSubmission, retryAfterSeconds, validate } from './forms.js';

const valid = {
  formType: 'contact',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 919-555-0123',
  subject: 'General Inquiry',
  message: 'Hello, I would like a quote for a new app.',
  turnstileToken: 'tok',
  pageUrl: 'https://dsrtechsolutions.com/contact',
};
const meta = { ip: '203.0.113.7', userAgent: 'test-agent' };

function fakeDeps({ human = true, recent = [] } = {}) {
  const inserted = [];
  return {
    inserted,
    hashIp: (ip) => `hash:${ip}`,
    verifyTurnstile: async () => human,
    recentSubmissionTimes: async () => recent,
    insertSubmission: async (row) => { inserted.push(row); },
  };
}

test('valid submission is saved', async () => {
  const deps = fakeDeps();
  const r = await handleSubmission(valid, meta, deps);
  assert.equal(r.status, 200);
  assert.equal(deps.inserted.length, 1);
  const row = deps.inserted[0];
  assert.equal(row.form_type, 'contact');
  assert.equal(row.email, 'jane@example.com');
  assert.equal(row.ip_hash, 'hash:203.0.113.7');
  assert.deepEqual(row.data, {});
});

test('unknown form type is rejected', async () => {
  const r = await handleSubmission({ ...valid, formType: 'hack' }, meta, fakeDeps());
  assert.equal(r.status, 400);
});

test('honeypot silently accepts without saving', async () => {
  const deps = fakeDeps();
  const r = await handleSubmission({ ...valid, website: 'http://spam' }, meta, deps);
  assert.equal(r.status, 200);
  assert.equal(deps.inserted.length, 0);
});

test('missing required fields and bad email are rejected', async () => {
  assert.equal((await handleSubmission({ ...valid, name: ' ' }, meta, fakeDeps())).status, 400);
  const bad = await handleSubmission({ ...valid, email: 'nope' }, meta, fakeDeps());
  assert.equal(bad.status, 400);
  assert.equal(bad.body.field, 'email');
  assert.equal((await handleSubmission({ ...valid, message: 'short' }, meta, fakeDeps())).status, 400);
  assert.equal((await handleSubmission({ ...valid, message: 'x'.repeat(5001) }, meta, fakeDeps())).status, 400);
});

test('missing or failed Turnstile is rejected', async () => {
  const noTok = await handleSubmission({ ...valid, turnstileToken: '' }, meta, fakeDeps());
  assert.equal(noTok.status, 400);
  const deps = fakeDeps({ human: false });
  const failed = await handleSubmission(valid, meta, deps);
  assert.equal(failed.status, 403);
  assert.equal(deps.inserted.length, 0);
});

test('rate limit: 3 per 10 minutes', async () => {
  const now = Date.now();
  const recent = [1, 2, 3].map((m) => new Date(now - m * 60_000).toISOString());
  const deps = fakeDeps({ recent });
  const r = await handleSubmission(valid, meta, deps);
  assert.equal(r.status, 429);
  assert.equal(deps.inserted.length, 0);
  // Oldest was 3 min ago → unlocks in ~7 min
  assert.ok(r.body.retryAfter > 6 * 60 && r.body.retryAfter <= 7 * 60, `retryAfter=${r.body.retryAfter}`);
  assert.ok(r.headers['Retry-After']);
});

test('rate limit: 10 per day', () => {
  const now = Date.now();
  const recent = Array.from({ length: 10 }, (_, i) => new Date(now - (i + 1) * 60 * 60_000).toISOString());
  const wait = retryAfterSeconds(recent, now);
  // Oldest is 10 h ago → unlocks in ~14 h
  assert.ok(wait > 13.9 * 3600 && wait <= 14 * 3600, `wait=${wait}`);
});

test('two recent submissions are still allowed', () => {
  const now = Date.now();
  assert.equal(retryAfterSeconds([new Date(now - 60_000).toISOString(), new Date(now - 120_000).toISOString()], now), 0);
});

test('control characters are stripped and phone validated', () => {
  const { values } = validate('contact', { ...valid, name: 'Ja\u0000ne' });
  assert.equal(values.name, 'Jane');
  assert.ok(validate('contact', { ...valid, phone: '<script>' }).error);
});
