const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const User = require('../models/user');
const { clearUsersInDb, getUsersInDb } = require('./test_helper.js');

describe('POST', async () => {
  beforeAll(async () => await clearUsersInDb());

  test('an user is created', async () => {
    const usersBefore = await getUsersInDb();
    const response = await api
      .post('/api/users')
      .send({
        name: 'harri hauki',
        username: 'harha',
        password: 'kiulu',
        adult: true
      })
      .expect(201);
    const usersAfter = await getUsersInDb();
    const names = usersAfter.map(({ name }) => name);
    expect(names).toContainEqual('harri hauki');
    expect(usersAfter.length).toBe(usersBefore.length + 1);
  });

  test('a duplicate user is not created', async () => {
    const usersBefore = await getUsersInDb();
    const response = await api
      .post('/api/users')
      .send({
        name: 'harri hauki',
        username: 'harha',
        password: 'kiulu',
        adult: true
      })
      .expect(400);
    const usersAfter = await getUsersInDb();
    expect(usersAfter.length).toBe(usersBefore.length);
    expect(response.body.error).toEqual('username must be unique');
  });

  test('too short password fails', async () => {
    const usersBefore = await getUsersInDb();
    const response = await api
      .post('/api/users')
      .send({
        name: 'harri zauki',
        username: 'harza',
        password: 'ki',
        adult: true
      })
      .expect(400);
    const usersAfter = await getUsersInDb();
    expect(usersAfter.length).toBe(usersBefore.length);
    expect(response.body.error).toEqual(
      'password must be atleast 3 characters long'
    );
  });
});

afterAll(() => {
  server.close();
});
