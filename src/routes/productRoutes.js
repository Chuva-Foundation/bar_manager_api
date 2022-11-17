const { Router } = require('express');
const {
  getProducts, getProduct, createProduct, deleteProduct, updateProduct,
} = require('../controllers/productController');

const router = Router();

router.get('/:id', getProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);

router.post('/', createProduct);

router.get('/', getProducts);

module.exports = router;
