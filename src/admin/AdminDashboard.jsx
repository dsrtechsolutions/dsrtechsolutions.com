import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LuArchive, LuCalendarDays, LuChevronLeft, LuChevronRight, LuCircleAlert, LuDownload,
  LuExternalLink, LuInbox, LuLoaderCircle, LuLogOut, LuMail, LuMailOpen, LuPhone,
  LuRefreshCw, LuReply, LuSearch, LuTrash2, LuX,
} from 'react-icons/lu';
import { supabase } from '../lib/supabase';
import { FORM_TYPES, formLabel } from '../data/forms';

const PAGE_SIZE = 20;
const TABLE = 'form_submissions';

const STATUSES = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'read', label: 'Read' },
  { key: 'replied', label: 'Replied' },
  { key: 'archived', label: 'Archived' },
];

// ── helpers ─────────────────────────────────────────────────────
const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const daysAgo = (n) => new Date(Date.now() - n * 864e5);

function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)} d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const fullDate = (iso) => new Date(iso).toLocaleString(undefined, {
  dateStyle: 'medium', timeStyle: 'short',
});

// PostgREST `or` filters use commas/parentheses as syntax — strip them from user input.
const sanitizeSearch = (q) => q.replace(/[,()*%\\]/g, ' ').trim();

function applyFilters(query, { status, formType, search }) {
  let q = query;
  if (status !== 'all') q = q.eq('status', status);
  if (formType !== 'all') q = q.eq('form_type', formType);
  const term = sanitizeSearch(search);
  if (term) {
    const p = `%${term}%`;
    q = q.or(`name.ilike.${p},email.ilike.${p},subject.ilike.${p},message.ilike.${p},phone.ilike.${p}`);
  }
  return q;
}

function toCsv(rows) {
  const cols = ['created_at', 'form_type', 'status', 'name', 'email', 'phone', 'subject', 'message', 'page_url'];
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\r\n');
}

async function countRows(build) {
  const { count, error } = await build(supabase.from(TABLE).select('id', { count: 'exact', head: true }));
  if (error) throw error;
  return count ?? 0;
}

// ── component ───────────────────────────────────────────────────
export default function AdminDashboard({ session, onSignOut }) {
  const [filters, setFilters] = useState({ status: 'all', formType: 'all', search: '' });
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [selected, setSelected] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((f) => (f.search === searchInput ? f : { ...f, search: searchInput }));
      setPage(0);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // List
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const from = page * PAGE_SIZE;
    applyFilters(
      supabase.from(TABLE).select('*', { count: 'exact' }).order('created_at', { ascending: false }),
      filters,
    )
      .range(from, from + PAGE_SIZE - 1)
      .then(({ data, count, error: err }) => {
        if (cancelled) return;
        setLoading(false);
        if (err) { setError(err.message); return; }
        setError('');
        setRows(data);
        setTotal(count ?? 0);
      });
    return () => { cancelled = true; };
  }, [filters, page, reloadKey]);

  // Stats + per-status counts
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      countRows((q) => q),
      countRows((q) => q.gte('created_at', startOfToday().toISOString())),
      countRows((q) => q.gte('created_at', daysAgo(7).toISOString())),
      ...STATUSES.slice(1).map((s) => countRows((q) => q.eq('status', s.key))),
    ])
      .then(([all, today, week, ...byStatus]) => {
        if (cancelled) return;
        const counts = { all };
        STATUSES.slice(1).forEach((s, i) => { counts[s.key] = byStatus[i]; });
        setStats({ all, today, week, counts });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [reloadKey]);

  const setFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(0);
  };

  const updateStatus = async (row, status) => {
    if (row.status === status) return;
    const { error: err } = await supabase.from(TABLE).update({ status }).eq('id', row.id);
    if (err) { window.alert(`Could not update: ${err.message}`); return; }
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
    setSelected((s) => (s && s.id === row.id ? { ...s, status } : s));
    refresh();
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete the submission from ${row.name || row.email}? This cannot be undone.`)) return;
    const { error: err } = await supabase.from(TABLE).delete().eq('id', row.id);
    if (err) { window.alert(`Could not delete: ${err.message}`); return; }
    setSelected(null);
    refresh();
  };

  const open = (row) => {
    setSelected(row);
    if (row.status === 'new') updateStatus(row, 'read');
  };

  const exportCsv = async () => {
    setExporting(true);
    const { data, error: err } = await applyFilters(
      supabase.from(TABLE).select('*').order('created_at', { ascending: false }),
      filters,
    ).limit(5000);
    setExporting(false);
    if (err) { window.alert(`Export failed: ${err.message}`); return; }
    const blob = new Blob([`﻿${toCsv(data)}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsr-form-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Close drawer with Escape
  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const showingFrom = total ? page * PAGE_SIZE + 1 : 0;
  const showingTo = Math.min(total, (page + 1) * PAGE_SIZE);

  const statCards = useMemo(() => [
    { icon: LuInbox, label: 'Total Submissions', value: stats?.all },
    { icon: LuMail, label: 'New / Unread', value: stats?.counts.new, accent: true },
    { icon: LuCalendarDays, label: 'Today', value: stats?.today },
    { icon: LuRefreshCw, label: 'Last 7 Days', value: stats?.week },
  ], [stats]);

  return (
    <div className="adm">
      {/* Top bar */}
      <header className="adm-top">
        <div className="adm-top__inner">
          <Link to="/admin" className="adm-top__brand">
            <span className="logo-box">DSR</span>
            <span className="adm-top__title">Admin Panel</span>
          </Link>
          <div className="adm-top__right">
            <span className="adm-top__user">{session.user.email}</span>
            <Link to="/" className="adm-btn adm-btn--ghost" target="_blank"><LuExternalLink /> <span>View site</span></Link>
            <button type="button" className="adm-btn adm-btn--ghost" onClick={onSignOut}><LuLogOut /> <span>Sign out</span></button>
          </div>
        </div>
      </header>

      <main className="adm-main">
        <div className="adm-head">
          <div>
            <h1>Form Submissions</h1>
            <p className="adm-muted">Messages sent through the website forms.</p>
          </div>
          <div className="adm-head__actions">
            <button type="button" className="adm-btn" onClick={refresh}><LuRefreshCw /> Refresh</button>
            <button type="button" className="adm-btn adm-btn--primary" onClick={exportCsv} disabled={exporting || !total}>
              {exporting ? <LuLoaderCircle className="spin" /> : <LuDownload />} Export CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="adm-stats">
          {statCards.map((c) => (
            <div key={c.label} className={`adm-stat${c.accent ? ' adm-stat--accent' : ''}`}>
              <div className="adm-stat__icon"><c.icon /></div>
              <div>
                <div className="adm-stat__value">{c.value ?? '–'}</div>
                <div className="adm-stat__label">{c.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="adm-card adm-toolbar">
          <div className="adm-tabs" role="tablist">
            {STATUSES.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={filters.status === s.key}
                className={`adm-tab${filters.status === s.key ? ' active' : ''}`}
                onClick={() => setFilter('status', s.key)}
              >
                {s.label}
                {stats && <span className="adm-tab__count">{stats.counts[s.key] ?? 0}</span>}
              </button>
            ))}
          </div>
          <div className="adm-toolbar__filters">
            <div className="adm-input adm-input--search">
              <LuSearch />
              <input
                type="search"
                placeholder="Search name, email, subject, message…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <select
              className="adm-select"
              value={filters.formType}
              onChange={(e) => setFilter('formType', e.target.value)}
              aria-label="Filter by form"
            >
              <option value="all">All forms</option>
              {Object.entries(FORM_TYPES).map(([key, f]) => (
                <option key={key} value={key}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List */}
        <div className="adm-card adm-list">
          {error && (
            <div className="form-msg form-msg--error adm-list__msg"><LuCircleAlert /> {error}</div>
          )}

          {!error && loading && !rows.length && (
            <div className="adm-empty"><LuLoaderCircle className="spin" /> Loading submissions…</div>
          )}

          {!error && !loading && !rows.length && (
            <div className="adm-empty">
              <LuInbox className="adm-empty__icon" />
              <strong>No submissions found</strong>
              <span>{filters.search || filters.status !== 'all' || filters.formType !== 'all'
                ? 'Try changing the filters or search.'
                : 'New messages from the website will appear here.'}</span>
            </div>
          )}

          {!!rows.length && (
            <table className={`adm-table${loading ? ' is-loading' : ''}`}>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject / Message</th>
                  <th>Form</th>
                  <th>Status</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className={r.status === 'new' ? 'is-new' : undefined}
                    onClick={() => open(r)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') open(r); }}
                  >
                    <td data-label="From">
                      <div className="adm-from">
                        <span className="adm-avatar">{(r.name || r.email || '?').charAt(0).toUpperCase()}</span>
                        <div>
                          <div className="adm-from__name">{r.name || '—'}</div>
                          <div className="adm-from__email">{r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Message" className="adm-table__msg">
                      <div className="adm-table__subject">{r.subject || 'No subject'}</div>
                      <div className="adm-table__preview">{r.message}</div>
                    </td>
                    <td data-label="Form"><span className="adm-chip">{formLabel(r.form_type)}</span></td>
                    <td data-label="Status"><span className={`adm-status adm-status--${r.status}`}>{r.status}</span></td>
                    <td data-label="Received" className="adm-table__date" title={fullDate(r.created_at)}>{timeAgo(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {total > 0 && (
            <div className="adm-pager">
              <span className="adm-muted">Showing {showingFrom}–{showingTo} of {total}</span>
              <div className="adm-pager__btns">
                <button type="button" className="adm-btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                  <LuChevronLeft /> Prev
                </button>
                <span className="adm-pager__page">Page {page + 1} / {pages}</span>
                <button type="button" className="adm-btn" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>
                  Next <LuChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Detail drawer */}
      {selected && (
        <div className="adm-drawer" role="dialog" aria-modal="true" aria-label="Submission details">
          <div className="adm-drawer__overlay" onClick={() => setSelected(null)} />
          <aside className="adm-drawer__panel">
            <div className="adm-drawer__head">
              <div>
                <span className="adm-chip">{formLabel(selected.form_type)}</span>
                <h2>{selected.subject || 'No subject'}</h2>
                <p className="adm-muted">{fullDate(selected.created_at)}</p>
              </div>
              <button type="button" className="adm-icon-btn" onClick={() => setSelected(null)} aria-label="Close">
                <LuX />
              </button>
            </div>

            <div className="adm-drawer__body">
              <div className="adm-contact">
                <span className="adm-avatar adm-avatar--lg">{(selected.name || selected.email || '?').charAt(0).toUpperCase()}</span>
                <div>
                  <div className="adm-from__name">{selected.name}</div>
                  <a href={`mailto:${selected.email}`} className="adm-link"><LuMail /> {selected.email}</a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone.replace(/[^\d+]/g, '')}`} className="adm-link"><LuPhone /> {selected.phone}</a>
                  )}
                </div>
              </div>

              <h3 className="adm-drawer__label">Message</h3>
              <div className="adm-message">{selected.message}</div>

              {selected.data && Object.keys(selected.data).length > 0 && (
                <>
                  <h3 className="adm-drawer__label">Other fields</h3>
                  <dl className="adm-meta">
                    {Object.entries(selected.data).map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{String(v ?? '—')}</dd></div>
                    ))}
                  </dl>
                </>
              )}

              <h3 className="adm-drawer__label">Status</h3>
              <div className="adm-status-picker">
                {STATUSES.slice(1).map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    className={`adm-status-opt adm-status--${s.key}${selected.status === s.key ? ' active' : ''}`}
                    onClick={() => updateStatus(selected, s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <h3 className="adm-drawer__label">Details</h3>
              <dl className="adm-meta">
                <div><dt>Page</dt><dd>{selected.page_url || '—'}</dd></div>
                <div><dt>Browser</dt><dd>{selected.user_agent || '—'}</dd></div>
                <div><dt>Visitor ID</dt><dd><code>{selected.ip_hash ? `${selected.ip_hash.slice(0, 12)}…` : '—'}</code></dd></div>
                <div><dt>Submission ID</dt><dd><code>{selected.id}</code></dd></div>
              </dl>
            </div>

            <div className="adm-drawer__foot">
              <a
                className="adm-btn adm-btn--primary"
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject || 'Your enquiry'}`)}`}
                onClick={() => updateStatus(selected, 'replied')}
              >
                <LuReply /> Reply by email
              </a>
              {selected.status !== 'archived'
                ? <button type="button" className="adm-btn" onClick={() => updateStatus(selected, 'archived')}><LuArchive /> Archive</button>
                : <button type="button" className="adm-btn" onClick={() => updateStatus(selected, 'read')}><LuMailOpen /> Unarchive</button>}
              <button type="button" className="adm-btn adm-btn--danger" onClick={() => remove(selected)}><LuTrash2 /> Delete</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
