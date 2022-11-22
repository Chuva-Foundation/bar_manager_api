const { Router } = require('express');
const { productCreateValidator, productUpdateValidator } = require('../middlewares/validator');
const {
  getProducts, getProduct, createProduct, deleteProduct, updateProduct,
} = require('../controllers/productController');

const router = Router();

router.get('/:id', getProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', productUpdateValidator, updateProduct);

router.post('/', productCreateValidator, createProduct);

router.get('/', getProducts);

module.exports = router;
