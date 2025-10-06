const blogsRouter = require('express').Router();
/** @type {import('mongoose').Model} */
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
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
