const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const listWithMultipleBlogs = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f9',
		title: 'Go To Statement Considered Harmful 2',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f0',
		title: 'Go To Statement Considered Harmful 3',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 15,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f1',
		title: 'Go To Statement Considered Harmful 4',
		author: 'Roberto',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 0,
		__v: 0,
	},
];

test('dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	assert.strictEqual(result, 1);
});

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 5,
			__v: 0,
		},
	];

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		assert.strictEqual(result, 5);
	});
});

describe('favorite blog', () => {
	test('when list has multiple blogs, equals the likes of the most liked one', () => {
		const result = listHelper.favoriteBlog(listWithMultipleBlogs);
		assert.deepStrictEqual(result, listWithMultipleBlogs[2]);
	});
});

describe('most blogs', () => {
	const expectedMostBlogs = {
		author: 'Edsger W. Dijkstra',
		blogs: 3,
	};

	test('when list has multiple blogs, equals the author with most blogs', () => {
		const result = listHelper.mostBlogs(listWithMultipleBlogs);
		assert.deepStrictEqual(result, expectedMostBlogs);
	});
});

describe('most likes', () => {
	const expectedMostLikes = {
		author: 'Edsger W. Dijkstra',
		likes: 30,
	};

	test('when list has multiple blogs, equals the author with most likes', () => {
		const result = listHelper.mostLikes(listWithMultipleBlogs);
		assert.deepStrictEqual(result, expectedMostLikes);
	});
});

describe('delete blog', () => {
	const idToDelete = '5a422aa71b54a676234d17f8';

	const blogsFiltered = listWithMultipleBlogs.filter((blog) => blog._id !== idToDelete);

	test('when list has multiple blogs, equals the list without the deleted blog', () => {
		const result = listHelper.deleteBlog(listWithMultipleBlogs, idToDelete);
		assert.deepStrictEqual(result, blogsFiltered);
	});
});

describe('update blog', () => {
	const idToUpdate = '5a422aa71b54a676234d17f8';

	const newBLog = {
		title: 'Go To Statement Updated!!!!',
		author: 'Update!!!!',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 999,
	};

	const expextedBlogsResponse = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Updated!!!!',
			author: 'Update!!!!',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 999,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f9',
			title: 'Go To Statement Considered Harmful 2',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 10,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f0',
			title: 'Go To Statement Considered Harmful 3',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 15,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f1',
			title: 'Go To Statement Considered Harmful 4',
			author: 'Roberto',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 0,
			__v: 0,
		},
	];

	test('when list has multiple blogs, equals the blogs with the updated one', () => {
		const result = listHelper.updateBlog(listWithMultipleBlogs, idToUpdate, newBLog);
		assert.deepStrictEqual(result, expextedBlogsResponse);
	});
});
