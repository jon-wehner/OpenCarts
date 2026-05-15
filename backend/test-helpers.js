const getCsrfToken = async (agent) => {
  const xsrfRes = await agent.get('/api/csrf/restore');
  const cookies = xsrfRes.headers['set-cookie'] || [];
  const xsrf = cookies.find((c) => c.startsWith('XSRF-TOKEN='));
  if (!xsrf) {
    throw new Error('XSRF-TOKEN cookie not found on /api/csrf/restore response');
  }
  return xsrf.split(';')[0].split('=')[1];
};

const loginAs = async (
  agent,
  csrf,
  credential = 'demo',
  password = 'password',
) => agent
  .post('/api/session')
  .set('XSRF-TOKEN', csrf)
  .send({ credential, password });

const signupUser = async (agent, csrf, overrides = {}) => {
  const payload = {
    email: `user-${Date.now()}-${Math.random()}@example.com`,
    username: `user${Date.now()}${Math.floor(Math.random() * 1000)}`,
    password: 'testpassword123',
    confirmPassword: 'testpassword123',
    ...overrides,
  };
  const res = await agent
    .post('/api/users')
    .set('XSRF-TOKEN', csrf)
    .send(payload);
  return { res, payload };
};

const futureDateISO = (yearsAhead = 1) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + yearsAhead);
  return d.toISOString();
};

module.exports = {
  getCsrfToken,
  loginAs,
  signupUser,
  futureDateISO,
};
