const User = require('../models/User');

exports.adminRestricted = async (req, res, next) => {
  const adminRoleId = 1;

  const { userId } = req;

  const user = await User.selectById(userId);

  if (user.role_id !== adminRoleId) return res.status(401).json({ message: 'Access restricted' });
  next();
};

exports.cashierRestricted = async (req, res, next) => {
  const adminRoleId = 1;
  const cashierRoleId = 4;

  const { userId } = req;

  const user = await User.selectById(userId);

  if (user.role_id !== adminRoleId && user.role_id !== cashierRoleId) {
    return res.status(401).json({ message: 'Access restricted' });
  }
  next();
};

exports.cashierAndWaiterRestricted = async (req, res, next) => {
  const adminRoleId = 1;
  const waiterRoleId = 3;
  const cashierRoleId = 4;

  const { userId } = req;

  const user = await User.selectById(userId);

  if (user.role_id !== adminRoleId
    && user.role_id !== cashierRoleId
    && user.role_id !== waiterRoleId) {
    return res.status(401).json({ message: 'Access restricted' });
  }
  next();
};

exports.doormanRestricted = async (req, res, next) => {
  const adminRoleId = 1;
  const doormanRoleId = 2;

  const { userId } = req;

  const user = await User.selectById(userId);

  if (user.role_id !== adminRoleId && user.role_id !== doormanRoleId) {
    return res.status(401).json({ message: 'Access restricted' });
  }
  next();
};
