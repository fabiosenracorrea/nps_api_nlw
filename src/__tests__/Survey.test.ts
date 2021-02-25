import request from 'supertest';
import server from '../app';
import createConnection from '../database';

const surveyTitle = 'example';
const surveyDescription = 'This is an example description';

const CREATED = 201;

const connection = createConnection();

let totalSurveys = 0;

describe('Surveys', () => {
  beforeAll(async () => {
    await (await connection).runMigrations();
  });

  afterAll(async () => {
    await (await connection).undoLastMigration();
    await (await connection).undoLastMigration();
  });

  it('should create a survey when correct information is provided', async () => {
    const response = await request(server)
      .post('/surveys')
      .send({ title: surveyTitle, description: surveyDescription });

    expect(response.status).toBe(CREATED);
    expect(response.body).toHaveProperty('id');

    totalSurveys += 1;
  });

  it('should be able to list all surveys', async () => {
    const response = await request(server)
      .post('/surveys')
      .send({ title: surveyTitle, description: surveyDescription });

    expect(response.status).toBe(CREATED);

    totalSurveys += 1;

    const getResponse = await request(server).get('/surveys');
    expect(getResponse.body).toHaveLength(totalSurveys);
  });
});
