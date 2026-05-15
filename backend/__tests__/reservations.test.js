const app = require('../app');
const supertest = require('supertest');
const {
  getCsrfToken,
  loginAs,
  signupUser,
  futureDateISO,
} = require('../test-helpers');

describe('reservation routes', () => {
  describe('POST /api/reservations/:id/available', () => {
    it('returns 200 with an array of available timeslots', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .post('/api/reservations/1/available')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ dateTime: futureDateISO() });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('does not require authentication', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .post('/api/reservations/1/available')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO() });
      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/reservations/new', () => {
    it('returns 401 when not authenticated', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 2, cartId: 1 });
      expect(res.status).toBe(401);
    });

    it('creates a reservation and returns it when authenticated', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);
      const res = await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ dateTime: futureDateISO(), partySize: 3, cartId: 1 });
      expect(res.status).toBe(200);
      expect(res.body.partySize).toBe(3);
      expect(res.body.cartId).toBe(1);
      expect(res.body.userId).toBeDefined();
    });

    it('assigns the reservation to the authenticated user', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);
      const sessionRes = await agent.get('/api/session');
      const userId = sessionRes.body.user.id;

      const res = await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 1, cartId: 2 });
      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(userId);
    });
  });

  describe('PATCH /api/reservations/:id', () => {
    it('returns 401 when not authenticated', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .patch('/api/reservations/1')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 2 });
      expect(res.status).toBe(401);
    });

    it("returns 403 when editing another user's reservation (IDOR protection)", async () => {
      // Create a reservation as the demo user
      const owner = supertest.agent(app);
      const ownerCsrf = await getCsrfToken(owner);
      await loginAs(owner, ownerCsrf);
      const createRes = await owner
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', ownerCsrf)
        .send({ dateTime: futureDateISO(), partySize: 1, cartId: 1 });
      expect(createRes.status).toBe(200);
      const reservationId = createRes.body.id;

      // Sign up an unrelated user and try to edit the demo user's reservation
      const attacker = supertest.agent(app);
      const attackerCsrf = await getCsrfToken(attacker);
      await signupUser(attacker, attackerCsrf);

      const res = await attacker
        .patch(`/api/reservations/${reservationId}`)
        .set('XSRF-TOKEN', attackerCsrf)
        .send({ dateTime: futureDateISO(), partySize: 5 });
      expect(res.status).toBe(403);
    });

    it('updates the reservation when requested by the owner', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);

      const createRes = await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 1, cartId: 1 });
      expect(createRes.status).toBe(200);
      const reservationId = createRes.body.id;

      const newDate = futureDateISO(2);
      const patchRes = await agent
        .patch(`/api/reservations/${reservationId}`)
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ dateTime: newDate, partySize: 4 });
      expect(patchRes.status).toBe(200);
      // Response is the full list of future reservations
      expect(Array.isArray(patchRes.body)).toBe(true);
      const edited = patchRes.body.find((r) => r.id === reservationId);
      expect(edited).toBeDefined();
      expect(edited.partySize).toBe(4);
    });
  });

  describe('DELETE /api/reservations/:id', () => {
    it('returns 401 when not authenticated', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .delete('/api/reservations/1')
        .set('XSRF-TOKEN', csrf);
      expect(res.status).toBe(401);
    });

    it("returns 403 when deleting another user's reservation (IDOR protection)", async () => {
      // Create a reservation as the demo user
      const owner = supertest.agent(app);
      const ownerCsrf = await getCsrfToken(owner);
      await loginAs(owner, ownerCsrf);
      const createRes = await owner
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', ownerCsrf)
        .send({ dateTime: futureDateISO(), partySize: 1, cartId: 1 });
      expect(createRes.status).toBe(200);
      const reservationId = createRes.body.id;

      const attacker = supertest.agent(app);
      const attackerCsrf = await getCsrfToken(attacker);
      await signupUser(attacker, attackerCsrf);

      const res = await attacker
        .delete(`/api/reservations/${reservationId}`)
        .set('XSRF-TOKEN', attackerCsrf);
      expect(res.status).toBe(403);
    });

    it('deletes the reservation and returns confirmation when requested by the owner', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);

      const createRes = await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 2, cartId: 1 });
      expect(createRes.status).toBe(200);
      const reservationId = createRes.body.id;

      const deleteRes = await agent
        .delete(`/api/reservations/${reservationId}`)
        .set('XSRF-TOKEN', csrf);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe('Reservation Deleted');
      expect(deleteRes.body.id).toBe(reservationId);
    });
  });
});
