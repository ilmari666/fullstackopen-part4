const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author');
  const formattedBlogs = blogs.map(blog => Blog.format(blog));
  response.json(formattedBlogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      blog.populate('author');
      return response.json(Blog.format(blog));
    } else {
      return response.status(404).end();
    }
  } catch (e) {
    return response.status(400).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const { title, url, likes } = request.body;

  if (title && url) {
    const user = User.findOne({});
    const blog = new Blog({
      title,
      url,
      likes,
      author: user.id
    });

    const result = await blog.save();
    return response.status(201).json(result);
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
  const id = request.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (e) {
    response.status(400).end();
  }
});

module.exports = blogsRouter;
