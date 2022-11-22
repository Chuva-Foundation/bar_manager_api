const User = require('../models/User');

const re = /^\d+$/;

exports.getUsers = async (req, res) => {
  const users = await User.selectAll();

  if (users.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(users);
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ error: 'Provide a valid Id' });

  const user = await User.selectById(id);

  if (!user) return res.status(400).json({ error: 'User not found, Provide a valid Id' });

  if (user.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json({ user });
};

exports.createUser = async (req, res) => {
  const user = await User.insertUser(req.body);

  if (user.error) return res.status(500).json({ error: user.message });

  return res.status(201).json({ message: `User ${user.username} created` });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ error: 'Provide a valid Id' });

  const userDeleted = await User.deleteById(id);

  if (!userDeleted) return res.status(400).json({ error: 'User not found, Provide a valid Id' });

  if (userDeleted.error) return res.status(500).json({ error: 'Internal server Error' });

  return res.status(200).json({ message: `User ${userDeleted.username} deleted` });
};

exports.updateUser = async (req, res) => {
  const userUpdated = await User.updateUser(req.body);

  if (!userUpdated) return res.status(400).json({ error: 'User not found, Provide a valid Id' });

  if (userUpdated.error) return res.status(500).json({ error: 'Internal server Error' });

  return res.status(200).json({ message: `User ${userUpdated.username} updated` });
};
