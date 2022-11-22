const { Router } = require('express');
const { categoryCreateValidator, categoryUpdateValidator } = require('../middlewares/validator');
const {
  getCategories, getCategory, createCategory, deleteCategory, updateCategory,
} = require('../controllers/categoryController');
const { adminRestricted } = require('../middlewares/restrictions');

const router = Router();

router.get('/:id', getCategory);

router.get('/', getCategories);

router.use(adminRestricted);

router.delete('/:id', deleteCategory);

router.put('/:id', categoryUpdateValidator, updateCategory);

router.post('/', categoryCreateValidator, createCategory);

module.exports = router;
