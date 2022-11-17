const { Router } = require('express');
const {
  getRoles, getRole, createRole, deleteRole, updateRole,
} = require('../controllers/roleController');

const router = Router();

router.get('/:id', getRole);

router.delete('/:id', deleteRole);

router.put('/:id', updateRole);

router.post('/', createRole);

router.get('/', getRoles);

module.exports = router;
