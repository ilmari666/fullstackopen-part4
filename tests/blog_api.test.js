const supertest = require('supertest');
const { app, server } = require('../index');
const Blog = require('../models/blog');
const {
  nonExistingId,
  blogsInDb,
  format,
  testData,
  resetAndPopulateDb
} = require('./test_helper.js');
const api = supertest(app);

describe('GET', async () => {
  beforeAll(async () => {
    await resetAndPopulateDb();
  });

  test('all blogs', async () => {
    const blogsInDatabase = await blogsInDb();
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.length).toBe(blogsInDatabase.length);

    const titles = response.body.map(({ title }) => title);
    blogsInDatabase.forEach(blog => {
      expect(titles).toContainEqual(blog.title);
    });
  });
  test('single blog', async () => {
    const blogsInDatabase = await blogsInDb();
    const blog = blogsInDatabase[0];
    const response = await api.get(`/api/blogs/${blog.id}`).expect(200);
    expect(response.body.title).toEqual(blog.title);
  });
  test('404 with nonexisting valid :id', async () => {
    const id = await nonExistingId();
    await api.get(`/api/blogs/${id}`).expect(404);
  });

  test('400 withd invalid :id', async () => {
    const id = '666';
    await api.get(`/api/blogs/${id}`).expect(400);
  });
});

describe('POST', async () => {
  beforeAll(async () => {
    await resetAndPopulateDb();
  });

  test('new blog is created', async () => {
    const blogsBefore = await blogsInDb();

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

    const blogsAfter = await blogsInDb();
    const titles = blogsAfter.map(r => r.title);
    expect(blogsAfter.length).toBe(blogsBefore.length + 1);
    expect(titles).toContain('Brave new blog');
  });

  test('new blog insert defaults 0 likes', async () => {
    const newBlog = {
      title: 'Great new blog',
      author: 'Great new author',
      url: 'sokeri.com/great'
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
});

describe('PUT', async () => {
  beforeAll(async () => {
    await resetAndPopulateDb();
  });
  test('update changes likes', async () => {
    const blogsBefore = await blogsInDb();
    const blog = blogsBefore[0];
    await api.put(`/api/blogs/${blog.id}`).send({
      likes: blog.likes + 1
    });
    const updatedBlog = await Blog.findById(blog.id);
    expect(updatedBlog.likes).toBe(blog.likes + 1);
  });
});

describe('DELETE', async () => {
  beforeAll(async () => {
    await resetAndPopulateDb();
  });
  test('blog is deleted', async () => {
    const blogsBefore = await blogsInDb();
    const blog = blogsBefore[0];
    const response = await api.delete(`/api/blogs/${blog.id}`).expect(204);
    const blogsNow = await blogsInDb();
    expect(blogsNow.length).toBe(blogsBefore.length - 1);
  });
});

afterAll(() => {
  server.close();
});
