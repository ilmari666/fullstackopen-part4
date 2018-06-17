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
    url: 'sokeri.com'
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

test('new blog insert defaults 0 likes', async () => {
  const newBlog = {
    title: 'Brave new blog',
    author: 'Brave new author',
    url: 'sokeri.com'
  };

  const response = await api.post('/api/blogs').send(newBlog);

  const body = response.body;
  expect(body.likes).toBe(0);
});

test('blog without title returns 401', async () => {
  const newBlog = {
    author: 'Brave new author',
    url: 'sokeri.com'
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('blog without url returns 401', async () => {
  const newBlog = {
    title: 'Brave new blog',
    author: 'Brave new author'
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});
// test default value for likes is inserted

afterAll(() => {
  server.close();
});
