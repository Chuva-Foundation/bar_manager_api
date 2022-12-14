const { Router } = require('express');
const { billByCardIdValidate } = require('../middlewares/validator');
// import all controllers
const {
  getBills, getBill, createBill, closeBill, getBillByCardId,
} = require('../controllers/billController');
const { cashierRestricted } = require('../middlewares/restrictions');

const routes = new Router();

// Add routes
routes.get('/:id', getBill);

routes.get('/card/:card_id', billByCardIdValidate, getBillByCardId);

routes.get('/', getBills);

routes.post('/', billByCardIdValidate, createBill);

routes.put('/close', cashierRestricted, billByCardIdValidate, closeBill);
// routes.delete('/', deleteBill);

module.exports = routes;
