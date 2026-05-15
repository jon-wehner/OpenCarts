/**
 * Regression tests for store/csrf.js — specifically the retry-on-stale-CSRF
 * path that recovers from a 403 EBADCSRFTOKEN by refreshing /api/csrf/restore
 * and retrying the original request.
 */
import Cookies from 'js-cookie';
import { fetch as csrfFetch } from '../store/csrf';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

function jsonResponse(body, { status = 200, headers = {} } = {}) {
  return {
    ok: status < 400,
    status,
    headers: {
      get: (name) => (name.toLowerCase() === 'content-type'
        ? 'application/json; charset=utf-8'
        : headers[name.toLowerCase()]),
    },
    json: () => Promise.resolve(body),
  };
}

describe('store/csrf fetch wrapper', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('sends the XSRF-Token header on POST from the cookie', async () => {
    Cookies.get.mockReturnValue('cookie-token');
    global.fetch = jest.fn(() => Promise.resolve(jsonResponse({ ok: true })));

    await csrfFetch('/api/users', { method: 'POST', body: '{}' });

    const [[, opts]] = global.fetch.mock.calls;
    expect(opts.headers['XSRF-Token']).toBe('cookie-token');
    expect(opts.headers['Content-Type']).toBe('application/json');
  });

  it('does not send XSRF-Token on GET', async () => {
    Cookies.get.mockReturnValue('cookie-token');
    global.fetch = jest.fn(() => Promise.resolve(jsonResponse({ ok: true })));

    await csrfFetch('/api/carts');

    const [[, opts]] = global.fetch.mock.calls;
    expect(opts.headers['XSRF-Token']).toBeUndefined();
  });

  it('retries once after a 403 EBADCSRFTOKEN response', async () => {
    Cookies.get
      .mockReturnValueOnce('stale-token') // first POST attempt
      .mockReturnValueOnce('fresh-token'); // retry after /api/csrf/restore

    global.fetch = jest.fn()
      .mockResolvedValueOnce(jsonResponse(
        { code: 'EBADCSRFTOKEN', message: 'invalid csrf token' },
        { status: 403 },
      ))
      .mockResolvedValueOnce(jsonResponse({}, { status: 200 })) // /api/csrf/restore
      .mockResolvedValueOnce(jsonResponse({ user: { id: 1 } }, { status: 200 })); // retried POST

    const res = await csrfFetch('/api/users', { method: 'POST', body: '{}' });

    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    const urls = global.fetch.mock.calls.map((c) => c[0]);
    expect(urls).toEqual(['/api/users', '/api/csrf/restore', '/api/users']);
    // The retry must use the fresh token, not the stale one
    const retryOpts = global.fetch.mock.calls[2][1];
    expect(retryOpts.headers['XSRF-Token']).toBe('fresh-token');
  });

  it('does not retry indefinitely — a second 403 is thrown', async () => {
    Cookies.get.mockReturnValue('stale-token');
    const badCsrf = jsonResponse(
      { code: 'EBADCSRFTOKEN', message: 'invalid csrf token' },
      { status: 403 },
    );
    global.fetch = jest.fn()
      .mockResolvedValueOnce(badCsrf)
      .mockResolvedValueOnce(jsonResponse({}, { status: 200 })) // restore
      .mockResolvedValueOnce(badCsrf);

    await expect(
      csrfFetch('/api/users', { method: 'POST', body: '{}' }),
    ).rejects.toMatchObject({ status: 403 });
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('does not loop when /api/csrf/restore itself 403s', async () => {
    Cookies.get.mockReturnValue('stale-token');
    global.fetch = jest.fn().mockResolvedValue(jsonResponse(
      { code: 'EBADCSRFTOKEN' },
      { status: 403 },
    ));

    await expect(csrfFetch('/api/csrf/restore')).rejects.toMatchObject({ status: 403 });
    // Exactly one call — no retry attempted for the restore endpoint itself
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws the response for non-CSRF 4xx errors without retrying', async () => {
    Cookies.get.mockReturnValue('valid-token');
    global.fetch = jest.fn().mockResolvedValue(jsonResponse(
      { errors: ['Email already in use'] },
      { status: 400 },
    ));

    await expect(
      csrfFetch('/api/users', { method: 'POST', body: '{}' }),
    ).rejects.toMatchObject({ status: 400 });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
