const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  if (blog.title && blog.url) {
    const result = await blog.save();
    return response.status(201).json(result);
  }
  return response.status(400).end();
});

module.exports = blogsRouter;
