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
	let mostLikedAuthor = {
		author: '',
		likes: 0,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
