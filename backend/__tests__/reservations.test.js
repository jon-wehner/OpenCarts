const app = require('../app');
const db = require('../db/models');
const supertest = require('supertest');

const getCsrfToken = async (agent) => {
  const xsrfRes = await agent.get('/api/csrf/restore');
  let cookie = xsrfRes.headers['set-cookie'][1].split(';')[0];
  cookie = cookie.split('=')[1];
  return cookie;
};

const loginAs = async (agent, csrf, credential = 'demo', password = 'password') => {
  await agent
    .post('/api/session')
    .set('XSRF-TOKEN', csrf)
    .send({ credential, password });
};

// A date guaranteed to be in the future for reservation tests
const futureDateISO = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString();
};

describe('reservation routes', () => {
  let testDb = db;

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
      // get current user id
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
        .patch('/api/reservations/2')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 2 });
      expect(res.status).toBe(401);
    });

    it('returns 403 when editing another user\'s reservation (IDOR protection)', async () => {
      // Sign up a second user
      const agent2 = supertest.agent(app);
      const csrf2 = await getCsrfToken(agent2);
      await agent2
        .post('/api/users')
        .set('XSRF-TOKEN', csrf2)
        .send({
          email: 'idor-patch-test@example.com',
          username: 'idorpatchuser',
          password: 'testpassword123',
          confirmPassword: 'testpassword123',
        });

      // reservation 2 belongs to the demo user (userId: 1); attempt to edit it as idorpatchuser
      const res = await agent2
        .patch('/api/reservations/2')
        .set('XSRF-TOKEN', csrf2)
        .send({ dateTime: futureDateISO(), partySize: 5 });
      expect(res.status).toBe(403);
    });

    it('updates the reservation when requested by the owner', async () => {
      // Create a fresh reservation as demo, then edit it
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);

      const createRes = await agent
        .post('/api/reservations/new')
        .set('XSRF-TOKEN', csrf)
        .send({ dateTime: futureDateISO(), partySize: 1, cartId: 1 });
      expect(createRes.status).toBe(200);
      const reservationId = createRes.body.id;

      const newDate = futureDateISO();
      const patchRes = await agent
        .patch(`/api/reservations/${reservationId}`)
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({ dateTime: newDate, partySize: 4 });
      expect(patchRes.status).toBe(200);
      // Response is the full list of future reservations
      expect(Array.isArray(patchRes.body)).toBe(true);
    });
  });

  describe('DELETE /api/reservations/:id', () => {
    it('returns 401 when not authenticated', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .delete('/api/reservations/2')
        .set('XSRF-TOKEN', csrf);
      expect(res.status).toBe(401);
    });

    it('returns 403 when deleting another user\'s reservation (IDOR protection)', async () => {
      const agent2 = supertest.agent(app);
      const csrf2 = await getCsrfToken(agent2);
      await agent2
        .post('/api/users')
        .set('XSRF-TOKEN', csrf2)
        .send({
          email: 'idor-delete-test@example.com',
          username: 'idordeleteuser',
          password: 'testpassword123',
          confirmPassword: 'testpassword123',
        });

      const res = await agent2
        .delete('/api/reservations/2')
        .set('XSRF-TOKEN', csrf2);
      expect(res.status).toBe(403);
    });

    it('deletes the reservation and returns confirmation when requested by the owner', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      await loginAs(agent, csrf);

      // Create a reservation to delete
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
