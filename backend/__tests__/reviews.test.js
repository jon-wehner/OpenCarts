const app = require('../app');
const supertest = require('supertest');
const {
  getCsrfToken,
  loginAs,
  signupUser,
  futureDateISO,
} = require('../test-helpers');

const createReservationAsDemo = async (cartId = 1) => {
  const agent = supertest.agent(app);
  const csrf = await getCsrfToken(agent);
  await loginAs(agent, csrf);
  const res = await agent
    .post('/api/reservations/new')
    .set('XSRF-TOKEN', csrf)
    .send({ dateTime: futureDateISO(), partySize: 2, cartId });
  return {
    agent, csrf, reservation: res.body,
  };
};

describe('review routes', () => {
  describe('GET /api/reviews/:id', () => {
    it('returns reviews for the given cart', async () => {
      const agent = supertest.agent(app);
      // cart 1 has a seeded review
      const res = await agent.get('/api/reviews/1').set('Accept', 'application/json');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((review) => {
        expect(review.cartId).toBe(1);
      });
    });

    it('returns an empty array for a cart with no reviews', async () => {
      const agent = supertest.agent(app);
      // cart 20 has no seeded reviews
      const res = await agent.get('/api/reviews/20');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /api/reviews', () => {
    it('returns 401 when not authenticated', async () => {
      const agent = supertest.agent(app);
      const csrf = await getCsrfToken(agent);
      const res = await agent
        .post('/api/reviews')
        .set('XSRF-TOKEN', csrf)
        .send({
          review: 'great', rating: 5, cartId: 1, reservationId: 1,
        });
      expect(res.status).toBe(401);
    });

    it('creates a review and marks the reservation as reviewed', async () => {
      const { agent, csrf, reservation } = await createReservationAsDemo(1);

      const res = await agent
        .post('/api/reviews')
        .set('XSRF-TOKEN', csrf)
        .set('Accept', 'application/json')
        .send({
          review: 'great food',
          rating: 4,
          cartId: 1,
          reservationId: reservation.id,
        });
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.status).toBe(200);
      expect(res.body.review).toBe('great food');
      expect(res.body.rating).toBe(4);
      expect(res.body.reservationId).toBe(reservation.id);

      // Verify the reservation now reports reviewed=true via the user
      // reservations endpoint
      const sessionRes = await agent.get('/api/session');
      const userId = sessionRes.body.user.id;
      const userRes = await agent.get(`/api/users/${userId}/reservations`);
      // The newly-reviewed reservation should appear in the future list (we
      // booked it 1y out) with reviewed: true.
      const found = userRes.body.future.find((r) => r.id === reservation.id);
      expect(found).toBeDefined();
      expect(found.reviewed).toBe(true);
    });

    it("returns 403 when reviewing another user's reservation (IDOR protection)", async () => {
      // Demo creates a reservation
      const { reservation } = await createReservationAsDemo(2);

      // Attacker tries to review it
      const attacker = supertest.agent(app);
      const attackerCsrf = await getCsrfToken(attacker);
      await signupUser(attacker, attackerCsrf);

      const res = await attacker
        .post('/api/reviews')
        .set('XSRF-TOKEN', attackerCsrf)
        .send({
          review: 'malicious',
          rating: 1,
          cartId: 2,
          reservationId: reservation.id,
        });
      expect(res.status).toBe(403);
    });

    it('returns 400 when cartId does not match the reservation', async () => {
      const { agent, csrf, reservation } = await createReservationAsDemo(1);

      const res = await agent
        .post('/api/reviews')
        .set('XSRF-TOKEN', csrf)
        .send({
          review: 'mismatched cart',
          rating: 3,
          cartId: 999, // wrong
          reservationId: reservation.id,
        });
      expect(res.status).toBe(400);
    });

    it('rejects rating below the minimum (0)', async () => {
      const { agent, csrf, reservation } = await createReservationAsDemo(1);

      const res = await agent
        .post('/api/reviews')
        .set('XSRF-TOKEN', csrf)
        .send({
          review: 'too low',
          rating: 0,
          cartId: 1,
          reservationId: reservation.id,
        });
      expect(res.status).not.toBe(200);
    });

    it('rejects rating above the maximum (6)', async () => {
      const { agent, csrf, reservation } = await createReservationAsDemo(1);

      const res = await agent
        .post('/api/reviews')
        .set('XSRF-TOKEN', csrf)
        .send({
          review: 'too high',
          rating: 6,
          cartId: 1,
          reservationId: reservation.id,
        });
      expect(res.status).not.toBe(200);
    });
  });
});
