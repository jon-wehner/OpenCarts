const app = require('../app');
const supertest = require('supertest');
const { getCsrfToken } = require('../test-helpers');

describe('cart routes', () => {
  const agent = supertest.agent(app);
  let csrf;
  // Cart names are seeded with faker.lorem.slug() so they're non-deterministic
  // across DB resets. Pull a real one from the live data before searching.
  let sampleCartNameFragment;
  let sampleCuisineName;

  beforeAll(async () => {
    csrf = await getCsrfToken(agent);
    const seedRes = await agent.get('/api/carts').set('Accept', 'application/json');
    const carts = seedRes.body;
    // Use a substring of an existing cart name; slugs always contain a hyphen
    // so grab the first word for a meaningful iLike match.
    sampleCartNameFragment = carts[0].name.split('-')[0];
    // Pick a cuisine that at least one cart references, so the cuisine search
    // is guaranteed to return results.
    sampleCuisineName = carts[0].Cuisine.name;
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
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ query: sampleCartNameFragment });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      const re = new RegExp(sampleCartNameFragment, 'i');
      expect(
        res.body.some((cart) => re.test(cart.name)
          || (cart.Cuisine && re.test(cart.Cuisine.name))),
      ).toBe(true);
    });

    it('returns matching carts when searching by cuisine name', async () => {
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ query: sampleCuisineName });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      const re = new RegExp(sampleCuisineName, 'i');
      // Every returned cart must match either by name or by cuisine — same
      // OR condition the route uses.
      res.body.forEach((cart) => {
        expect(re.test(cart.name) || re.test(cart.Cuisine.name)).toBe(true);
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
        .send({ query: sampleCartNameFragment });
      expect(res.status).toBe(200);
      const cart = res.body[0];
      expect(cart).toHaveProperty('State');
      expect(cart).toHaveProperty('Cuisine');
    });

    it('search is case-insensitive', async () => {
      const lower = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .send({ query: sampleCuisineName.toLowerCase() });
      const upper = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .send({ query: sampleCuisineName.toUpperCase() });
      expect(lower.status).toBe(200);
      expect(upper.status).toBe(200);
      expect(lower.body.length).toBe(upper.body.length);
    });

    it('whitespace-only query is treated as empty (matches everything via iLike "%%")', async () => {
      const res = await agent
        .post('/api/carts')
        .set('XSRF-TOKEN', csrf)
        .send({ query: '   ' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      // documents current behavior; an empty trimmed query returns every cart
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
