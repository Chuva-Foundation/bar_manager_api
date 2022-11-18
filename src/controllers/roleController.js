const Joi = require('joi');

const Role = require('../models/Role');

const re = /^\d+$/;

const createSchema = Joi.object({
  role_name: Joi.string()
    .trim()
    .lowercase()
    .alphanum()
    .min(4)
    .max(25)
    .required(),
  description: Joi.string()
    .trim()
    .max(255),
});
const schemaUpdate = Joi.object({
  id: Joi.string()
    .pattern(/^\d+$/)
    .required(),
  role_name: Joi.string()
    .trim()
    .lowercase()
    .alphanum()
    .min(4)
    .max(25),
  description: Joi.string()
    .trim()
    .max(255),
});

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
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  const {
    role_name, description,
  } = req.body;

  const { value, error } = createSchema.validate({
    role_name, description,
  });

  if (error) return res.status(400).json({ message: error.message });

  const role = await Role.insertRole(value);

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
  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }
  const {
    role_name, description,
  } = req.body;

  const { id } = req.params;

  const { value, error } = schemaUpdate.validate({
    id, description, role_name,
  });
  if (error) return res.status(400).json({ message: error.message });

  const roleUpdated = await Role.updateRole(value);

  if (!roleUpdated) return res.status(400).json({ erro: 'Role not found, Provide a valid Id' });

  if (roleUpdated.error) return res.status(500).json({ erro: roleUpdated.message });

  return res.status(200).json({ message: `Role ${roleUpdated.role_name} updated` });
};
