import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
  // Headers and method default to an empty object and GET
  options.headers = options.headers || {};
  options.method = options.method || 'GET';
  // if method exists but isn't GET, add XSRF TOKEN cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  const res = await window.fetch(url, options);
  // If the return is in JSON format, parse that data and add to the response
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data;
  }
  if (res.status >= 400) throw res;
  return res;
}

export function restoreCSRF() {
  return fetch('/api/csrf/restore');
}
