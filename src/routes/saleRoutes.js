const { Router } = require('express');

// import all controllers
const {
  getSales, createSale, updateSale, getSalesByCard,
} = require('../controllers/saleController');

const routes = new Router();

// Add routes
routes.get('/card/:card_id', getSalesByCard);
routes.get('/', getSales);
routes.post('/', createSale);
routes.put('/:id', updateSale);
// routes.delete('/:id', deleteSale);

module.exports = routes;
