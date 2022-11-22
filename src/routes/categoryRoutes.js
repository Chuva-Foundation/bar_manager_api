const { Router } = require('express');
const { categoryCreateValidator, categoryUpdateValidator } = require('../middlewares/validator');
const {
  getCategories, getCategory, createCategory, deleteCategory, updateCategory,
} = require('../controllers/categoryController');

const router = Router();

router.get('/:id', getCategory);

router.delete('/:id', deleteCategory);

router.put('/:id', categoryUpdateValidator, updateCategory);

router.post('/', categoryCreateValidator, createCategory);

router.get('/', getCategories);

module.exports = router;
