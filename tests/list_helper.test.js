const listHelper = require('../utils/list_helper');
const { testData } = require('./data.js');

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
