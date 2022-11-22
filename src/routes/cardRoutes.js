const { Router } = require('express');

const { getCardValidator, updateCardValidator } = require('../middlewares/validator');
// import all controllers
const {
  getCards, getCard, createCard, updateCard,
} = require('../controllers/cardController');

const routes = new Router();

// Add routes
routes.get('/:id', getCardValidator, getCard);
routes.get('/', getCards);
routes.post('/', createCard);
routes.put('/:id', updateCardValidator, updateCard);
// routes.delete('/', SessionController.store);

module.exports = routes;
