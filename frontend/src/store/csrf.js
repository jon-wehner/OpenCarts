/* eslint-disable no-param-reassign */
import Cookies from 'js-cookie';

async function rawFetch(url, options) {
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  const res = await window.fetch(url, options);
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data;
  }
  return res;
}

// Detects the csurf "invalid csrf token" failure mode. csurf returns 403 with
// `code: 'EBADCSRFTOKEN'` on the error body — which surfaces in our JSON
// envelope as a stack trace mentioning the code. Either signal is enough.
function isBadCsrfToken(res) {
  if (res.status !== 403) return false;
  const { data } = res;
  if (!data) return false;
  if (data.code === 'EBADCSRFTOKEN') return true;
  if (typeof data.stack === 'string' && data.stack.includes('EBADCSRFTOKEN')) return true;
  if (typeof data.message === 'string' && data.message.toLowerCase().includes('csrf')) return true;
  return false;
}

export async function fetch(url, options = {}) {
  options.headers = options.headers || {};
  options.method = options.method || 'GET';

  let res = await rawFetch(url, options);

  // Self-heal: a stale XSRF-TOKEN cookie (e.g. left over from a previous
  // backend session when the `_csrf` secret cookie has expired) produces a
  // 403 even though the browser thinks it has a valid token. Refresh once
  // and retry, so the user doesn't have to clear cookies manually.
  if (isBadCsrfToken(res) && url !== '/api/csrf/restore') {
    await window.fetch('/api/csrf/restore', { method: 'GET', credentials: 'same-origin' });
    // rawFetch re-reads XSRF-TOKEN from the cookie on the retry
    res = await rawFetch(url, options);
  }

  if (res.status >= 400) throw res;
  return res;
}

export function restoreCSRF() {
  return fetch('/api/csrf/restore');
}
