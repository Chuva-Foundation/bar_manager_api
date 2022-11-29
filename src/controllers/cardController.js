const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

const Card = require('../models/Card');

exports.getCards = async (req, res) => {
  const cards = await Card.selectAll();

  if (cards.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json(cards);
};

exports.getCard = async (req, res) => {
  const { id } = req.body;

  const card = await Card.selectById(id);

  if (!card) return res.status(400).json({ error: 'Card not found, Provide a valid Id' });

  if (card.error) return res.status(500).json({ error: 'Internal Server Error' });

  return res.status(200).json({ card });
};

exports.createCard = async (req, res) => {
  const id = uuidv4();

  const card = await Card.insert(id);

  if (card.error) return res.status(500).json({ error: card.message });

  QRCode.toFile(`public/qr/${id}.png`, id, {
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000', // Blue dots
      light: '#fff', // Transparent background
    },
  }, (err) => {
    if (err) throw err;
    console.log('done');
  });

  return res.status(201).json({ message: `Card ${card.id} created` });
};

exports.updateCard = async (req, res) => {
  // if active = false check if id is associate with unpaid bill.

  const cardUpdated = await Card.update(req.body);

  if (!cardUpdated) return res.status(400).json({ error: 'Card not found, Provide a valid Id' });

  if (cardUpdated.error) return res.status(500).json({ error: cardUpdated.message });

  return res.status(200).json({ message: `Card ${cardUpdated.id} updated` });
};
