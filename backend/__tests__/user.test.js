const app = require('../app');
const db = require('../db/models');

const supertest = require('supertest');

const getCsrfToken = async (agent) => {
  const xsrfRes = await agent.get('/api/csrf/restore');
  let cookie = xsrfRes.headers['set-cookie'][1].split(';')[0];
  cookie = cookie.split('=')[1];
  return cookie;
};

describe('test the get user reservations route', () => {
  let testDb = db;

  const agent = supertest.agent(app);

  it('should respond with 200 and a json payload', async () => {
    const cookie = await getCsrfToken(agent);

    await agent
      .post('/api/session')
      .set('XSRF-TOKEN', cookie)
      .send({ credential: 'demo', password: 'password' });

    const response = await agent
      .get('/api/users/1/reservations')
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
