const Role = require('../models/Role');

const re = /^\d+$/;

exports.getRoles = async (req, res) => {
  const roles = await Role.selectAll();

  if (roles.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json(roles);
};

exports.getRole = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const role = await Role.selectById(id);

  if (!role) return res.status(400).json({ erro: 'Role not found, Provide a valid Id' });

  if (role.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json({ role });
};

exports.createRole = async (req, res) => {
  const role = await Role.insertRole(req.body);

  if (role.error) return res.status(500).json({ erro: role.message });

  return res.status(201).json({ message: `Role ${role.role_name} created` });
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const roleDeleted = await Role.deleteById(id);

  if (!roleDeleted) return res.status(400).json({ erro: 'Role not found, Provide a valid Id' });

  if (roleDeleted.error) return res.status(500).json({ erro: 'Internal server Error' });

  return res.status(200).json({ message: `Role ${roleDeleted.role_name} deleted` });
};

exports.updateRole = async (req, res) => {
  const roleUpdated = await Role.updateRole(req.body);

  if (!roleUpdated) return res.status(400).json({ erro: 'Role not found, Provide a valid Id' });

  if (roleUpdated.error) return res.status(500).json({ erro: roleUpdated.message });

  return res.status(200).json({ message: `Role ${roleUpdated.role_name} updated` });
};
