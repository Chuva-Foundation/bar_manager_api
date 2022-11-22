const { Router } = require('express');

const { saleCreateValidator, saleUpdateValidator, getCardValidator } = require('../middlewares/validator');

const { adminRestricted, cashierAndWaiterRestricted } = require('../middlewares/restrictions');

// import all controllers
const {
  getSales, createSale, updateSale, getSalesByCard,
} = require('../controllers/saleController');

const routes = new Router();

// Add routes
routes.get('/card/:card_id', getCardValidator, getSalesByCard);
routes.get('/', getSales);
routes.post('/', cashierAndWaiterRestricted, saleCreateValidator, createSale);
routes.put('/:id', adminRestricted, saleUpdateValidator, updateSale);
// routes.delete('/:id', deleteSale);

module.exports = routes;
