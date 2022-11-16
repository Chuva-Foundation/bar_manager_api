const User = require('../models/User');

const re = /^\d+$/;

exports.getUsers = async (req, res) => {
  const users = await User.getAll();

  if (users.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json({ users });
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const user = await User.getById(id);

  if (user.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json({ user });
};
