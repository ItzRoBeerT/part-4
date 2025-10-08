const blogsRouter = require('express').Router();
/** @type {import('mongoose').Model} */
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const body = request.body;

	const user = await User.findById(body.userId);
	if (!user) {
		return response.status(400).json({ error: 'Invalid userId' });
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndDelete(request.params.id);
	if (blog) {
		response.status(204).end();
	} else {
		response.status(404).json({ error: 'Blog not found' });
	}
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });

	if (blog) {
		response.status(200).json(blog);
	} else {
		response.status(404).json({ error: 'Blog not found' });
	}
});

module.exports = blogsRouter;
