const jwt = require('jsonwebtoken');

const User = require('../models/User');
require('dotenv').config();

exports.createSession = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.selectByUsername(username);

  if (!user) return res.status(401).json({ message: 'wrong username or password' });
  if (user.error) return res.status(500).json({ error: 'Internal Server Error' });

  const isPasswordCorrect = await User.correctPassword(user.id, password);
  if (!isPasswordCorrect) return res.status(401).json({ message: 'wrong username or password' });

  return res.status(201).json({
    user,
    token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    }),
  });
};
