const { Router } = require('express');
const {
  getCategories, getCategory, createCategory, deleteCategory, updateCategory,
} = require('../controllers/categoryController');

const router = Router();

router.get('/:id', getCategory);

router.delete('/:id', deleteCategory);

router.put('/:id', updateCategory);

router.post('/', createCategory);

router.get('/', getCategories);

module.exports = router;
