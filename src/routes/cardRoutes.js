const { Router } = require('express');

// import all controllers
const {
  getCards, getCard, createCard, updateCard,
} = require('../controllers/cardController');

const routes = new Router();

// Add routes
routes.get('/:id', getCard);
routes.get('/', getCards);
routes.post('/', createCard);
routes.put('/:id', updateCard);
// routes.delete('/', SessionController.store);

module.exports = routes;
