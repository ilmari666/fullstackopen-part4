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

test('new blog is saved', async () => {
  const newBlog = {
    title: 'Brave new blog',
    author: 'Brave new author',
    url: 'sokeri.com',
    likes: 0
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);

  expect(response.body.length).toBe(testData.length + 1);
  expect(titles).toContain('Brave new blog');
});

afterAll(() => {
  server.close();
});
