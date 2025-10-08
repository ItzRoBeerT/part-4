const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
	const users = await User.find({});
	response.json(users);
});

userRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		name,
		username,
		password: hashedPassword,
	});

  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
});

module.exports = userRouter;
