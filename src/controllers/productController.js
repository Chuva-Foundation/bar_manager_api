const Product = require('../models/Product');

const re = /^\d+$/;

exports.getProducts = async (req, res) => {
  const products = await Product.selectAll();

  if (products.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const product = await Product.selectById(id);

  if (!product) return res.status(400).json({ error: 'Product not found, Provide a valid Id' });

  if (product.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json({ product });
};

exports.createProduct = async (req, res) => {
  const product = await Product.insert(req.body);

  if (product.error) return res.status(500).json({ error: product.message });

  return res.status(201).json({ message: `Product ${product.name} created` });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const productDeleted = await Product.deleteById(id);

  if (!productDeleted) return res.status(400).json({ error: 'Category not found, Provide a valid Id' });

  if (productDeleted.error) return res.status(500).json({ error: 'Internal server Error' });

  return res.status(200).json({ message: `Product ${productDeleted.name} deleted` });
};

exports.updateProduct = async (req, res) => {
  const productUpdated = await Product.update(req.body);

  if (!productUpdated) return res.status(400).json({ error: 'Product not found, Provide a valid Id' });

  if (productUpdated.error) return res.status(500).json({ error: productUpdated.message });

  return res.status(200).json({ message: `Product ${productUpdated.name} updated` });
};
