const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('crud routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should add a message to the emails db then send an amazon email to my gmail', async () => {
    const result = await request(app)
      .post('/api/v1/emails')
      .send({ message: 'from app.test.js'});

    expect(result.body).toEqual({
      id: '1',
      message: 'from app.test.js', 
    });
  });

  it('should get all messages', async () => {

    await request(app)
      .post('/api/v1/emails')
      .send({ message: 'from app.test.js'});

    const result = await request(app)
      .get('/api/v1/emails');

      expect(result.body).toEqual([
        {
          id: '1',
          message: 'from app.test.js', 
        },
    ]);    
  });

  it('should get a message by id', async () => {

    await request(app)
      .post('/api/v1/emails')
      .send({ message: 'from app.test.js'});

    const result = await request(app)
      .get('/api/v1/emails/1');

      expect(result.body).toEqual(
        {
          id: '1',
          message: 'from app.test.js',
        },
    );    
  });

  it('should update a message', async () => {
    await request(app)
    .post('/api/v1/emails')
    .send({ message: 'from app.test.js'});

    await request(app)
      .put('/api/v1/emails/1')
      .send({ message: 'now updated'});

    const result = await request(app)
      .get('/api/v1/emails');

      expect(result.body).toEqual([{
        id: '1', message: 'now updated'
      }])
  })

  it('should delete a message by id', async () => {
    await request(app)
    .post('/api/v1/emails').send({ message: 'test'});

    await request(app)
    .post('/api/v1/emails').send({ message: 'test'});

    await request(app).delete('/api/v1/emails/2')

    const result = await request(app).get('/api/v1/emails');
      expect(result.body).toEqual([{
        id: '1', message: 'Suh dude',
      }])
  });
});
