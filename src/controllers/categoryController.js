const Category = require('../models/Category');

const re = /^\d+$/;

exports.getCategories = async (req, res) => {
  const categories = await Category.selectAll();

  if (categories.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const category = await Category.selectById(id);

  if (!category) return res.status(400).json({ error: 'Category not found, Provide a valid Id' });

  if (category.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json({ category });
};

exports.createCategory = async (req, res) => {
  const category = await Category.insert(req.body);

  if (category.error) return res.status(500).json({ error: category.message });

  return res.status(201).json({ message: `Category ${category.name} created` });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const categoryDeleted = await Category.deleteById(id);

  if (!categoryDeleted) return res.status(400).json({ error: 'Category not found, Provide a valid Id' });

  if (categoryDeleted.error) return res.status(500).json({ error: 'Internal server Error' });

  return res.status(200).json({ message: `Category ${categoryDeleted.name} deleted` });
};

exports.updateCategory = async (req, res) => {
  const categoryUpdated = await Category.update(req.body);

  if (!categoryUpdated) return res.status(400).json({ error: 'Category not found, Provide a valid Id' });

  if (categoryUpdated.error) return res.status(500).json({ erro: categoryUpdated.message });

  return res.status(200).json({ message: `Category ${categoryUpdated.name} updated` });
};
