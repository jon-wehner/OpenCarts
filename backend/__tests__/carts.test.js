const app = require('../app');
const db = require('../db/models');
const supertest = require('supertest');

const getCsrfToken = async (agent) => {
  const xsrfRes = await agent.get('/api/csrf/restore');
  let cookie = xsrfRes.headers['set-cookie'][1].split(';')[0];
  cookie = cookie.split('=')[1];
  return cookie;
};

describe('cart routes', () => {
  let testDb = db;
  const agent = supertest.agent(app);
  let csrf;

  beforeAll(async () => {
    csrf = await getCsrfToken(agent);
  });

  describe('GET /api/carts', () => {
    it('returns 200 with an array of carts', async () => {
      const res = await agent.get('/api/carts').set('Accept', 'application/json');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('includes State and Cuisine associations on each cart', async () => {
      const res = await agent.get('/api/carts').set('Accept', 'application/json');
      expect(res.status).toBe(200);
      const cart = res.body[0];
      expect(cart).toHaveProperty('State');
      expect(cart).toHaveProperty('Cuisine');
      expect(cart.State).toHaveProperty('name');
      expect(cart.Cuisine).toHaveProperty('name');
    });

    it('returns carts sorted by id ascending', async () => {
      const res = await agent.get('/api/carts').set('Accept', 'application/json');
      expect(res.status).toBe(200);
      const ids = res.body.map((c) => c.id);
      const sorted = [...ids].sort((a, b) => a - b);
      expect(ids).toEqual(sorted);
    });
  });

  describe('POST /api/carts (search)', () => {
    it('returns matching carts when searching by cart name', async () => {
      // Use a name substring from the seeded data
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ query: 'facere' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].name).toMatch(/facere/i);
    });

    it('returns matching carts when searching by cuisine name', async () => {
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ query: 'Japanese' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((cart) => {
        expect(cart.Cuisine.name).toMatch(/Japanese/i);
      });
    });

    it('returns empty array for a query with no matches', async () => {
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ query: 'zzznomatchzzz' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });

    it('search results include State and Cuisine associations', async () => {
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ query: 'facere' });
      expect(res.status).toBe(200);
      const cart = res.body[0];
      expect(cart).toHaveProperty('State');
      expect(cart).toHaveProperty('Cuisine');
    });

    it('search is case-insensitive', async () => {
      const lower = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .send({ query: 'japanese' });
      const upper = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .send({ query: 'JAPANESE' });
      expect(lower.status).toBe(200);
      expect(upper.status).toBe(200);
      expect(lower.body.length).toBe(upper.body.length);
    });
  });
});
