const mongoose = require('mongoose');

const blogSchema = mongoose.model('Blog', {
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: String,
  likes: { type: Number, default: 0 }
});

blogSchema.statics.format = ({ title, _id: id, url, author, likes }) => ({
  title,
  id,
  url,
  author,
  likes
});

const Blog = mongoose.model('Blogr', blogSchema);

module.exports = Blog;
