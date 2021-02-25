import request from 'supertest';
import server from '../app';
import createConnection from '../database';

const userName = 'example';
const userEmail = 'example@email.com';

const CREATED = 201;
const BAD_REQUEST = 400;

const connection = createConnection();

describe('Users', () => {
  beforeAll(async () => {
    await (await connection).runMigrations();
  });

  afterAll(async () => {
    await (await connection).undoLastMigration();
    await (await connection).undoLastMigration();
  });

  it('should create a user when correct information is provided', async () => {
    const response = await request(server).post('/users').send({ name: userName, email: userEmail });

    expect(response.status).toBe(CREATED);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email as one registered', async () => {
    const response = await request(server).post('/users').send({ name: userName, email: userEmail });

    expect(response.status).toBe(BAD_REQUEST);
  });
});
