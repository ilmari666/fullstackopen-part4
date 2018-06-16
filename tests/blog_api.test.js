const supertest = require('supertest');
const { app, server } = require('../index');
const Blog = require('../models/blog');
const { testData } = require('./data.js');
const api = supertest(app);

beforeAll(async () => {
  // remove all blogs
  await Blog.remove({});
  // populate db with test data
  const blogObjects = testData.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  server.close();
});
