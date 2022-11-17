const Joi = require('joi');

const User = require('../models/User');

const re = /^\d+$/;

const createSchema = Joi.object({
  username: Joi.string()
    .trim()
    .lowercase()
    .alphanum()
    .min(4)
    .max(25)
    .required(),
  name: Joi.string()
    .trim()
    .min(10)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .required(),
  confirm_password: Joi.ref('password'),
  role: Joi.string()
    .pattern(/^\d+$/)
    .required(),
}).with('password', 'confirm_password');

const schemaUpdate = Joi.object({
  id: Joi.string()
    .pattern(/^\d+$/),
  name: Joi.string()
    .trim()
    .min(10)
    .max(255),
  password: Joi.string()
    .min(8)
    .max(255),
  confirm_password: Joi.ref('password'),
  role: Joi.string()
    .pattern(/^\d+$/),
}).with('password', 'confirm_password');

exports.getUsers = async (req, res) => {
  const users = await User.selectAll();

  if (users.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json(users);
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const user = await User.selectById(id);

  if (!user) return res.status(400).json({ erro: 'User not found, Provide a valid Id' });

  if (user.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json({ user });
};

exports.createUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }

  const {
    username, name, password, confirm_password, role,
  } = req.body;

  const { value, error } = createSchema.validate({
    username, name, password, confirm_password, role,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const user = await User.insertUser(value);

  if (user.error) return res.status(500).json({ erro: user.message });

  return res.status(201).json({ message: `User ${user.username} created` });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const userDeleted = await User.deleteById(id);

  if (!userDeleted) return res.status(400).json({ erro: 'User not found, Provide a valid Id' });

  if (userDeleted.error) return res.status(500).json({ erro: 'Internal server Error' });

  return res.status(200).json({ message: `User ${userDeleted.username} deleted` });
};

exports.updateUser = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  const {
    name, password, confirm_password, role,
  } = req.body;

  const { id } = req.params;

  const { value, error } = schemaUpdate.validate({
    id, name, password, confirm_password, role,
  });
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const userUpdated = await User.updateUser(value);

  if (!userUpdated) return res.status(400).json({ erro: 'User not found, Provide a valid Id' });

  if (userUpdated.error) return res.status(500).json({ erro: 'Internal server Error' });

  return res.status(200).json({ message: `User ${userUpdated.username} updated` });
};
