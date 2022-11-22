const { Router } = require('express');

const { getCardValidator, updateCardValidator } = require('../middlewares/validator');
// import all controllers
const {
  getCards, getCard, createCard, updateCard,
} = require('../controllers/cardController');
const { adminRestricted } = require('../middlewares/restrictions');

const routes = new Router();

// Add routes
routes.get('/:id', getCardValidator, getCard);

routes.put('/:id', updateCardValidator, updateCard);

routes.use(adminRestricted);

routes.get('/', getCards);

routes.post('/', createCard);
// routes.delete('/', SessionController.store);

module.exports = routes;
