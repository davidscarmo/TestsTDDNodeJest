const request = require('supertest'); 
const app = require('../../src/app');
const {User} = require('../../src/app/models');
const truncate = require('../utils/truncate');


describe('Authentication', ()=>
{ 

beforeEach(async () => 
{
  await truncate();
})

it('Should atuthenticate with valid credentials', async ()=>
{
  const user = await User.create(
      {
          name: 'David', 
          email: 'david@david.com', 
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
  const user = await User.create(
      {
          name: 'David', 
          email: 'david@david.com', 
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

});