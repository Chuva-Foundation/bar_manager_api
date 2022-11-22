const { Router } = require('express');

const { saleCreateValidator, saleUpdateValidator, getCardValidator } = require('../middlewares/validator');

// import all controllers
const {
  getSales, createSale, updateSale, getSalesByCard,
} = require('../controllers/saleController');

const routes = new Router();

// Add routes
routes.get('/card/:card_id', getCardValidator, getSalesByCard);
routes.get('/', getSales);
routes.post('/', saleCreateValidator, createSale);
routes.put('/:id', saleUpdateValidator, updateSale);
// routes.delete('/:id', deleteSale);

module.exports = routes;
