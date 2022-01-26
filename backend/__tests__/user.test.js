const app = require('../app');
const db = require('../db/models');

const supertest = require('supertest');

describe('test the get user reservations route', () => {
  let testDb = db;
  
  it("should respond with 200 and a json payload", async () => {
    const response = await supertest(app)
    .get('/api/users/1/reservations')
    .set('Accept', 'application/json')
    console.log(response)
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
  })
})