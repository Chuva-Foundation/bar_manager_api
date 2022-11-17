const Joi = require('joi');

const Product = require('../models/Product');

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
  category_id: Joi.string()
    .pattern(/^\d+$/)
    .required(),
  price: Joi.number()
    .precision(2)
    .sign('positive')
    .required(),
});

exports.getProducts = async (req, res) => {
  const products = await Product.selectAll();

  if (products.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const product = await Product.selectById(id);

  if (!product) return res.status(400).json({ erro: 'Product not found, Provide a valid Id' });

  if (product.error) return res.status(500).json({ erro: 'Internal Server Error' });

  return res.status(200).json({ product });
};

exports.createProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  const {
    name, description, category_id, price,
  } = req.body;

  const { value, error } = createSchema.validate({
    name, description, category_id, price,
  });

  if (error) return res.status(400).json({ message: error.message });

  const product = await Product.insert(value);

  if (product.error) return res.status(500).json({ erro: product.message });

  return res.status(201).json({ message: `Product ${product.name} created` });
};

exports.deleteProduct = async (req, res) => {

};
exports.updateProduct = async (req, res) => {

};
