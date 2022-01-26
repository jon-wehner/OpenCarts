const app = require('../app');
const db = require('../db/models');

const supertest = require('supertest');

const testReview = {
  review: 'the food was ok!',
  rating: 3,
  userId: 1,
  cartId: 3,
  reservationId: 2,
}

const getCsrfToken = async (agent) => {
  const xsrfRes = await agent
    .get('/api/csrf/restore')  
  let cookie = xsrfRes.headers['set-cookie'][1].split(';')[0]
  cookie = cookie.split('=')[1]    
  return cookie
}   

describe('test the review post route', () => {
  let testDb = db;
  
  const agent = supertest.agent(app);

  it('should respond with status 200 and the review in json format', async () => {
    const cookie = await getCsrfToken(agent);
    const response = await agent
      .post('/api/reviews')
      .set('XSRF-TOKEN', cookie)
      .send({
        testReview
      })      
      .set('Accept', 'application/json') 
      
    expect(response.headers['content-type']).toMatch(/json/)
    expect(response.status).toEqual(200);
    expect(response.body.review).toEqual(testReview.review)
  })
})