const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const initialValue = 0;
	const reducer = (acc, currentValue) => {
		acc += currentValue.likes;
		return acc;
	};
	return blogs.reduce(reducer, initialValue);
};

const favoriteBlog = (blogs = []) => {
	let mostLikedBlog = null;

	blogs.forEach((blog) => {
		if (!mostLikedBlog || blog.likes > mostLikedBlog.likes) {
			mostLikedBlog = blog;
		}
	});

	return mostLikedBlog;
};

const mostBlogs = (blogs = []) => {
	let authorBlogCount = [];

	blogs.forEach((blog) => {
		const authorEntry = authorBlogCount.find((entry) => entry.author === blog.author);
		if (authorEntry) {
			authorEntry.blogs += 1;
		} else {
			authorBlogCount.push({ author: blog.author, blogs: 1 });
		}
	});

	const maxBlogs = Math.max(...authorBlogCount.map((author) => author.blogs));

	let mostBlogsAuthor = authorBlogCount.find((author) => author.blogs === maxBlogs);

	return mostBlogsAuthor;
};

const mostLikes = (blogs = []) => {
	let initialValue = {
		counts: {},
		maxLikes: 0,
		maxAuthor: null,
	};

	const result = blogs.reduce((acc, blog) => {
		acc.counts[blog.author] = (acc.counts[blog.author] || 0) + (blog.likes || 0);

		if (acc.counts[blog.author] > acc.maxLikes) {
			acc.maxLikes = acc.counts[blog.author];
			acc.maxAuthor = blog.author;
		}
		return acc;
	}, initialValue);

	return { author: result.maxAuthor, likes: result.maxLikes };
};

const deleteBlog = (blogs, id) => {
	return blogs.filter((blog) => blog._id !== id);
};

const updateBlog = (blogs = [], id, newBlog) => {
	return blogs.map((blog) => {
		if (blog._id === id) {
			return { ...blog, ...newBlog }; 
		}
		return blog;
	});
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
	deleteBlog,
	updateBlog
};
