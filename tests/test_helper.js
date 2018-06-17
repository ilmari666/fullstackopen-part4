const Blog = require('../models/blog');
const { testData } = require('./data');

const nonExistingId = async () => {
  const blog = new Blog();
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(format);
};

const format = ({ title, _id: id, url, author, likes }) => ({
  title,
  id,
  url,
  author,
  likes
});

// put default data to db for testing
const resetAndPopulateDb = async () => {
  await Blog.remove({});
  // populate db with test data
  const blogObjects = testData.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
};

module.exports = {
  nonExistingId,
  blogsInDb,
  format,
  testData,
  resetAndPopulateDb
};
