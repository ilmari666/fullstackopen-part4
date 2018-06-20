const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  });

  response.json(users.map(User.format));
});

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const { username, name, adult, password } = request.body;

    if (!username || !password) {
      return response.status(400).json({ error: 'credentials must be given' });
    }

    const existingUser = await User.find({ username });

    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' });
    }
    if (password.length <= 3) {
      return response
        .status(400)
        .json({ error: 'password must be atleast 3 characters long' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      adult: adult || true,
      passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(User.format(savedUser));
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

module.exports = usersRouter;
