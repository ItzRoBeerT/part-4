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
	let mostBlogAuthor = {
		author: '',
		blogs: 0,
	};

	blogs.forEach((blog) => {
		if (blog.blogs >= mostBlogAuthor.blogs) {
			mostBlogAuthor.author = blog.author;
			mostBlogAuthor.blogs = blog.blogs;
		}
	});

	return mostBlogAuthor;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
  mostBlogs,
};
