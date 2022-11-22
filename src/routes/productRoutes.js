const { Router } = require('express');
const { productCreateValidator, productUpdateValidator } = require('../middlewares/validator');
const {
  getProducts, getProduct, createProduct, deleteProduct, updateProduct,
} = require('../controllers/productController');

const { adminRestricted } = require('../middlewares/restrictions');

const router = Router();

router.get('/:id', getProduct);

router.get('/', getProducts);

router.use(adminRestricted);

router.delete('/:id', deleteProduct);

router.put('/:id', productUpdateValidator, updateProduct);

router.post('/', productCreateValidator, createProduct);

module.exports = router;
