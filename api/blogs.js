const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  const formattedBlogs = blogs.map(blog => Blog.format(blog));
  response.json(formattedBlogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      blog.populate('user');
      return response.json(Blog.format(blog));
    } else {
      return response.status(404).end();
    }
  } catch (e) {
    return response.status(400).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes, author } = request.body;

  if (title && url) {
    try {
      const token = request.token;
      if (!(token && token.id)) {
        return response.status(401).json({ error: 'invalid or missing token' });
      }

      const user = await User.findById(token.id);
      const blog = new Blog({
        title,
        url,
        likes,
        author,
        user: user._id
      });
      const result = await blog.save();
      user.blogs = user.blogs.concat(blog._id);
      user.save();
      return response.status(201).json(result);
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        response.status(401).json({ error: e.message });
      } else {
        response.status(500).json({ error: 'something went wrong...' });
      }
    }
  }
  return response.status(400).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const update = request.body;

  try {
    const blog = await Blog.findByIdAndUpdate(id, update);

    if (blog) {
      return response.json(blog);
    } else {
      return response.status(404).end();
    }
  } catch (e) {
    response.status(400).end();
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  if (!(token && token.id)) {
    return response.status(401).json({ error: 'invalid or missing token' });
  }
  const id = request.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: 'not found' });
    }
    if (!blog.user.toString() === token.id) {
      return response.status(401).json({ error: 'unauthorized' });
    }
    blog.remove();
    response.status(204).end();
  } catch (e) {
    response.status(400).end();
  }
});

module.exports = blogsRouter;
