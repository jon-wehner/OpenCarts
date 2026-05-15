const app = require('../app');
const supertest = require('supertest');
const {
  getCsrfToken,
  loginAs,
  signupUser,
  futureDateISO,
} = require('../test-helpers');

describe('user routes', () => {
  describe('POST /api/users (signup)', () => {
    it('creates a user and returns them with a session cookie', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const { res, payload } = await signupUser(agent, csrf);
      expect(res.status).toBe(200);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.username).toBe(payload.username);
      expect(res.body.user.hashedPassword).toBeUndefined();
      // signup should set the session cookie; verify by hitting /api/session
      const session = await agent.get('/api/session');
      expect(session.body.user).toBeDefined();
      expect(session.body.user.username).toBe(payload.username);
    });

    it('returns a validation error for a short password', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const { res } = await signupUser(agent, csrf, {
        password: 'short',
        confirmPassword: 'short',
      });
      expect(res.status).not.toBe(200);
    });

    it('returns a validation error when passwords do not match', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const { res } = await signupUser(agent, csrf, {
        password: 'password123',
        confirmPassword: 'something-else',
      });
      expect(res.status).not.toBe(200);
    });

    it('returns a validation error for an invalid email', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const { res } = await signupUser(agent, csrf, { email: 'not-an-email' });
      expect(res.status).not.toBe(200);
    });

    it('returns a validation error when the email is already taken', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const { res } = await signupUser(agent, csrf, { email: 'demo@user.io' });
      expect(res.status).not.toBe(200);
    });
  });

  describe('GET /api/users/:id/reservations', () => {
    it('returns 401 when not authenticated', async () => {
      const agent = supertest.agent(app);
      const res = await agent.get('/api/users/1/reservations');
      expect(res.status).toBe(401);
    });

    it('returns past and future reservations for the authenticated user', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);
      const sessionRes = await agent.get('/api/session');
      const userId = sessionRes.body.user.id;

      // Ensure there is at least one future reservation
      await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 2, cartId: 1 });

      const res = await agent
        .get(`/api/users/${userId}/reservations`)
        .set('Accept', 'application/json');

      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('past');
      expect(res.body).toHaveProperty('future');
      expect(Array.isArray(res.body.past)).toBe(true);
      expect(Array.isArray(res.body.future)).toBe(true);
      expect(res.body.future.length).toBeGreaterThan(0);
      // All returned reservations should belong to the authenticated user
      [...res.body.future, ...res.body.past].forEach((r) => {
        expect(r.userId).toBe(userId);
      });
    });

    it("returns 403 when fetching another user's reservations", async () => {
      // Sign up a fresh user
      const attacker = supertest.agent(app);
      const attackerCsrf = await getCsrfToken(attacker);
      await signupUser(attacker, attackerCsrf);

      // Attempt to read demo (userId 1) reservations
      const res = await attacker.get('/api/users/1/reservations');
      expect(res.status).toBe(403);
    });
  });
});
