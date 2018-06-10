const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = blogs =>
  blogs.length === 0
    ? null
    : blogs.reduce(
        (favorite, blog) => (blog.likes > favorite.likes ? blog : favorite),
        blogs[0]
      );

const getAuthorStats = blogs =>
  blogs.reduce((authors, blog) => {
    const authorName = blog.author;
    if (!authors[authorName]) {
      authors[authorName] = {
        author: authorName,
        likes: 0,
        blogs: 0
      };
    }
    const author = authors[authorName];
    author.likes += blog.likes;
    author.blogs++;
    return authors;
  }, {});

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null;
  }
  const stats = getAuthorStats(blogs);
  const authors = Object.keys(stats);
  return authors.reduce(
    (maxAuthor, author) =>
      stats[author].blogs > stats[maxAuthor].blogs ? author : maxAuthor
  );
};

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null;
  }
  const stats = getAuthorStats(blogs);
  const authors = Object.keys(stats);
  return authors.reduce(
    (maxAuthor, author) =>
      stats[author].likes > stats[maxAuthor].likes ? author : maxAuthor
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
