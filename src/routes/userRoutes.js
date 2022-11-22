const { Router } = require('express');
const { userCreateValidate, userUpdateValidate } = require('../middlewares/validator');
const {
  getUsers, getUser, createUser, deleteUser, updateUser,
} = require('../controllers/userController');

const router = Router();

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', userUpdateValidate, updateUser);

router.post('/', userCreateValidate, createUser);

router.get('/', getUsers);

module.exports = router;
