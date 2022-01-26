const app = require('../app');
const db = require('../db/models');

const supertest = require('supertest');

const testReview = {
  review: 'the food was ok!',
  rating: 3,
  userId: 1,
  cartId: 3,
  reservationId: 1,
}
describe('test the review post route', () => {
  let testDb = db;

  it('should respond with status 200 and the review in json format', async () => {
    const response = await supertest(app)
      .post('/api/reviews')
      .send({
        testReview
      })      
      .set('Accept', 'application/json')
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200);
  })
})