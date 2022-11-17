const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
require('dotenv').config();

const schemaCreate = Joi.object({
  username: Joi.string()
    .trim()
    .lowercase()
    .alphanum()
    .min(4)
    .max(25)
    .required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .required(),
});

exports.createSession = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const { value, error } = schemaCreate.validate({
    password, username,
  });
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.selectByUsername(value.username);

  if (!user) return res.status(401).json({ message: 'wrong email or password' });
  if (user.error) return res.status(500).json({ erro: 'Internal Server Error' });

  const isPasswordCorrect = await User.correctPassword(user.id, value.password);
  if (!isPasswordCorrect) return res.status(401).json({ message: 'wrong email or password' });

  return res.status(201).json({
    user,
    token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    }),
  });
};
