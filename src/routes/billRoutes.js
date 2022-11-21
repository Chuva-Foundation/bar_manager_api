const { Router } = require('express');

// import all controllers
const {
  getBills, getBill, createBill, closeBill, getBillByCardId,
} = require('../controllers/billController');

const routes = new Router();

// Add routes
routes.get('/:id', getBill);
routes.get('/card/:card_id', getBillByCardId);
routes.get('/', getBills);
routes.post('/', createBill);
routes.put('/close', closeBill);
// routes.delete('/', deleteBill);

module.exports = routes;
