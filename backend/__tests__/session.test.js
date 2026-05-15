const app = require('../app');
const supertest = require('supertest');
const { getCsrfToken } = require('../test-helpers');

describe('session routes', () => {
  it('GET /api/session returns empty object when unauthenticated', async () => {
    const agent = supertest.agent(app);
    const res = await agent.get('/api/session').set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  it('POST /api/session returns user object on valid credentials', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .set('Accept', 'application/json')
      .send({ credential: 'demo', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.username).toBe('demo');
    expect(res.body.user.email).toBe('demo@user.io');
  });

  it('POST /api/session does not expose hashed password', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'demo', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body.user.hashedPassword).toBeUndefined();
  });

  it('POST /api/session accepts email as credential', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'demo@user.io', password: 'password' });
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('demo');
  });

  it('POST /api/session returns 401 on wrong password', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'demo', password: 'wrongpassword' });
    expect(res.status).toBe(401);
  });

  it('POST /api/session returns 401 on unknown username', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'doesnotexist', password: 'password' });
    expect(res.status).toBe(401);
  });

  it('POST /api/session returns 400 when credential is missing', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ password: 'password' });
    expect(res.status).toBe(400);
  });

  it('POST /api/session returns 400 when password is missing', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    const res = await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'demo' });
    expect(res.status).toBe(400);
  });

  it('DELETE /api/session logs out authenticated user and returns success', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'demo', password: 'password' });
    const res = await agent
      .delete('/api/session')
      .set('XSRF-TOKEN', csrf);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('success');
  });

  it('GET /api/session returns user after login', async () => {
    const agent = supertest.agent(app);
    const csrf = await getCsrfToken(agent);
    await agent
      .post('/api/session')
      .set('XSRF-TOKEN', csrf)
      .send({ credential: 'demo', password: 'password' });
    const res = await agent
      .get('/api/session')
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.username).toBe('demo');
  });
});
