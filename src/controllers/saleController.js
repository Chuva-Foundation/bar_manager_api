const Bill = require('../models/Bill');
// const Card = require('../models/Card');
const Sale = require('../models/Sale');
const Product = require('../models/Product');

const re = /^\d+$/;

exports.getSales = async (req, res) => {
  const sales = await Sale.selectAll();

  if (sales.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(sales);
};

exports.getSalesByCard = async (req, res) => {
  const { id: card_id } = req.body;

  const bill = await Bill.selectByCardId(card_id);

  console.log(bill);

  if (!bill) return res.status(400).json({ error: 'Bill not found, Provide a valid Id' });

  if (bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  const sales = await Sale.selectByBill(bill.id);

  if (sales.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(sales);
};

exports.createSale = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // get seller id trough auth
  const seller = req.userId;

  const { card_id, product_id, amount } = req.body;

  const bill = await Bill.selectByCardId(card_id);

  if (!bill) Bill.insert({ card_id });

  if (bill && bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  const product = await Product.selectById(product_id);

  if (!product) return res.status(400).json({ error: 'product not found, Provide a valid Id' });

  if (product.error) return res.status(500).json({ error: 'Internal Server Error' });

  const sale = await Sale.insert(product_id, amount, product.price, seller, bill.id);

  if (sale.error) return res.status(500).json({ error: sale.message });

  return res.status(201).json({ message: `sale ${sale.id} created` });
};

exports.createSales = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Provide a Information' });

  // get seller id trough auth
  const seller = req.userId;

  const { sales, card_id } = req.body;

  let bill = await Bill.selectByCardId(card_id);

  if (!bill) {
    Bill.insert({ card_id });
    bill = await Bill.selectByCardId(card_id);
    console.log(bill);
  }

  if (bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  const product_ids = sales.map((sale) => sale[0]);

  const products = await Product.selectByMultipleIds(product_ids);

  if (products.length !== product_ids.length) return res.status(400).json({ error: 'missing products, provide correct data' });

  if (products.error) return res.status(500).json({ error: 'Internal Server Error' });

  const sale = await Sale.insertMultiple(sales, products, seller, bill.id);

  if (sale.error) return res.status(500).json({ error: sale.message });

  return res.status(201).json({ message: 'sale  created' }); // ${sale.id}
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;

  // get seller id trough auth
  const seller = 2;

  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const sale = await Sale.update(id, seller, req.body);

  if (sale.error) return res.status(500).json({ error: sale.message });

  return res.status(201).json({ message: `sale ${sale.id} updated` });
};
