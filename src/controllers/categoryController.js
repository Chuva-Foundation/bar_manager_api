const Joi = require('joi');

const Category = require('../models/Category');

const re = /^\d+$/;

const createSchema = Joi.object({
  name: Joi.string()
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
  name: Joi.string()
    .trim()
    .lowercase()
    .alphanum()
    .min(4)
    .max(25),
  description: Joi.string()
    .trim()
    .max(255),
});

exports.getCategories = async (req, res) => {
  const categories = await Category.selectAll();

  if (categories.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const category = await Category.selectById(id);

  if (!category) return res.status(400).json({ erro: 'Category not found, Provide a valid Id' });

  if (category.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json({ category });
};

exports.createCategory = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  const {
    name, description,
  } = req.body;

  const { value, error } = createSchema.validate({
    name, description,
  });

  if (error) return res.status(400).json({ message: error.message });

  const category = await Category.insert(value);

  if (category.error) return res.status(500).json({ erro: category.message });

  return res.status(201).json({ message: `Category ${category.name} created` });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const categoryDeleted = await Category.deleteById(id);

  if (!categoryDeleted) return res.status(400).json({ erro: 'Category not found, Provide a valid Id' });

  if (categoryDeleted.error) return res.status(500).json({ erro: 'Internal server Error' });

  return res.status(200).json({ message: `Category ${categoryDeleted.name} deleted` });
};

exports.updateCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Provide a Information' });
  }
  const {
    name, description,
  } = req.body;

  const { id } = req.params;

  const { value, error } = schemaUpdate.validate({
    id, description, name,
  });
  if (error) return res.status(400).json({ message: error.message });

  const categoryUpdated = await Category.update(value);

  if (!categoryUpdated) return res.status(400).json({ erro: 'Category not found, Provide a valid Id' });

  if (categoryUpdated.error) return res.status(500).json({ erro: categoryUpdated.message });

  return res.status(200).json({ message: `Category ${categoryUpdated.name} updated` });
};
