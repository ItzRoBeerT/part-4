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

module.exports = {
	dummy,
	totalLikes,
};
