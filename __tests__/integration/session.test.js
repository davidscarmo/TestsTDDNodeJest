const request = require('supertest'); 
const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');


describe('Authentication', ()=>
{ 

beforeEach(async () => 
{
  await truncate();
})

it('Should atuthenticate with valid credentials', async ()=>
{
  const user = await factory.create('User',
      {
          password: "123123"
      }
  ); 

  const response = await  request(app)
  .post("/sessions")
      .send({
        email: user.email, 
        password: "123123"
      }); 

  expect(response.status).toBe(200);
});

it('Should not atuthenticate with valid credentials', async ()=>
{
  const user = await factory.create('User',
      {
          password: "123123"
      }
  ); 

  const response = await request(app)
  .post("/sessions")
      .send({
        email: user.email, 
        password: "123456"
      }); 

  expect(response.status).toBe(401);
});

it('should return a jwt token when authenticated', async () => 
{
  const user = await factory.create('User',
      {
          password: "123123"
      }
  ); 

const response = await request(app)
.post("/sessions")
    .send({
      email: user.email, 
      password: "123123"
    }); 

expect(response.body).toHaveProperty("token"); 
})
{

}
});