const Bill = require('../models/Bill');
const Card = require('../models/Card');

const re = /^\d+$/;

exports.getBills = async (req, res) => {
  const bills = await Bill.selectAll();

  if (bills.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(bills);
};

exports.getBill = async (req, res) => {
  const { id } = req.params;
  if (!re.test(id)) return res.status(400).json({ message: 'Provide a valid Id' });

  const bill = await Bill.selectById(id);

  if (!bill) return res.status(400).json({ error: 'Bill not found, Provide a valid Id' });

  if (bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json({ bill });
};

exports.getBillByCardId = async (req, res) => {
  const { card_id } = req.body;
  const bill = await Bill.selectByCardId(card_id);

  if (!bill) return res.status(400).json({ error: 'Bill not found, Provide a valid Id' });

  if (bill.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json({ bill });
};

exports.createBill = async (req, res) => {
  const {
    card_id,
  } = req.body;

  const card = await Card.selectById(card_id);

  if (!card) return res.status(400).json({ error: 'Card not found, Provide a valid Id' });

  if (card.error) return res.status(500).json({ error: 'Internal Server Error' });

  if (!card.active) return res.status(500).json({ error: `Card ${card.id} is not active` });

  // check is associate whit ay unpaid bill.
  // const billsAssociated = await Bill.selectByCardId(value.card_id);

  // console.log(billsAssociated);

  // if (billsAssociated.error) return res.status(500).json({ error: 'Internal Server Error' });

  // if (billsAssociated) {
  //   return res.status(500).json({
  //     error: `Card ${value.card_id} already associated with the bill ${billsAssociated.id}`,
  //   });
  // }

  const bill = await Bill.insert(req.body);

  if (bill.error) return res.status(500).json({ error: bill.message });

  return res.status(201).json({ message: `Bill ${bill.id} created` });
};

exports.closeBill = async (req, res) => {
  const billUpdated = await Bill.update(req.body);

  if (!billUpdated) return res.status(400).json({ error: 'Bill not found, Provide a valid Id' });

  if (billUpdated.error) return res.status(500).json({ error: billUpdated.message });

  return res.status(200).json({ message: `Bill ${billUpdated.id} updated` });
};
