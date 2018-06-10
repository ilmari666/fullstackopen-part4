const listHelper = require('../utils/list_helper');
const testData = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

describe('dummy()', () => {
  test('dummy works', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('favoriteBlog()', () => {
  test('single blog', () => {
    const blogs = [testData[0]];
    const result = listHelper.favoriteBlog(blogs);
    expect(result.likes).toBe(7);
  });
  test('multiple blogs', () => {
    const blogs = testData;
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(testData[2]);
  });
  test('no blog', () => {
    const blogs = [];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBe(null);
  });
});

describe('mostBlogs()', () => {
  test('single', () => {
    const blogs = [testData[0]];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual('Michael Chan');
  });
  test('multiple blogs', () => {
    const blogs = testData;
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual('Robert C. Martin');
  });
  test('no blogs', () => {
    const blogs = [];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toBe(null);
  });
});

describe('mostLikes()', () => {
  test('single', () => {
    const blogs = [testData[0]];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual('Michael Chan');
  });
  test('multiple blogs', () => {
    const blogs = testData;
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual('Edsger W. Dijkstra');
  });
  test('no blogs', () => {
    const blogs = [];
    const result = listHelper.mostLikes(blogs);
    expect(result).toBe(null);
  });
});

describe('totalLikes()', () => {
  test('single blog', () => {
    const blogs = [testData[0]];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(7);
  });
  test('multiple blogs', () => {
    const blogs = testData;
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
  test('no blogs', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
});
