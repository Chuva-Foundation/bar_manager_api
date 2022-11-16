const { Router } = require('express');
const { getUsers } = require('../controllers/userController');

const router = Router();

// router.get('/:id', getUser);

// router.delete('/:id', deleteUser);

// router.put('/:id', updateUser);

// router.post('/', createUser);

router.get('/', getUsers);

module.exports = router;
