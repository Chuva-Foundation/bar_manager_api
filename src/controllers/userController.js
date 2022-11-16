const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.getAll();
  res.status(200).json({ success: 'success', users });
};
