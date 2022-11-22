const Joi = require('joi');

const Bill = require('../models/Bill');
// const Card = require('../models/Card');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

const re = /^\d+$/;

const createSchema = Joi.object({
  card_id: Joi.string()
    .trim()
    .guid({ version: ['uuidv4'] })
    .required(),
  product_id: Joi.string()
    .pattern(/^\d+$/)
    .required(),
  amount: Joi.string()
    .pattern(/^\d+$/)
    .required(),
});
const updateSchema = Joi.object({
  product_id: Joi.string()
    .pattern(/^\d+$/),
  amount: Joi.string()
    .pattern(/^\d+$/),
});
const getByCardSchema = Joi.object({
  card_id: Joi.string()
    .trim()
    .guid({ version: ['uuidv4'] })
    .required(),
});

exports.getSales = async (req, res) => {
  const sales = await Sale.selectAll();

  if (sales.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(sales);
};

exports.getSalesByCard = async (req, res) => {
  const {
    card_id,
  } = req.params;

  const { value, error } = getByCardSchema.validate({
    card_id,
  });

  if (error) return res.status(400).json({ message: error.message });

  const bill = await Bill.selectByCardId(value.card_id);

  if (!bill) return res.status(400).json({ error: 'Bill not found, Provide a valid Id' });

  if (bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  const sales = await Sale.selectByBill(bill.id);

  if (sales.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(sales);
};

exports.createSale = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // get seller id trough auth
  const seller = 2;

  const {
    product_id, amount, card_id,
  } = req.body;

  const { value, error } = createSchema.validate({
    product_id, amount, card_id,
  });

  if (error) return res.status(400).json({ message: error.message });

  const bill = await Bill.selectByCardId(value.card_id);

  if (!bill) return res.status(400).json({ error: 'Bill not found, Provide a valid Id' });

  if (bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  const product = await Product.selectById(product_id);

  if (!product) return res.status(400).json({ error: 'product not found, Provide a valid Id' });

  if (product.error) return res.status(500).json({ error: 'Internal Server Error' });

  const sale = await Sale.insert(value.product_id, value.amount, product.price, seller, bill.id);

  if (sale.error) return res.status(500).json({ error: sale.message });

  return res.status(201).json({ message: `sale ${sale.id} created` });
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;

  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });
  // get seller id trough auth
  const seller = 2;

  const {
    product_id, amount,
  } = req.body;

  const { value, error } = updateSchema.validate({
    product_id, amount,
  });

  if (error) return res.status(400).json({ message: error.message });

  const sale = await Sale.update(id, seller, value);

  if (sale.error) return res.status(500).json({ error: sale.message });

  return res.status(201).json({ message: `sale ${sale.id} updated` });
};
