const { Router } = require('express');
const {
  getRoles, getRole, createRole, deleteRole, updateRole,
} = require('../controllers/roleController');

const { roleCreateValidator, roleUpdateValidator } = require('../middlewares/validator');

const router = Router();

router.get('/:id', getRole);

router.delete('/:id', deleteRole);

router.put('/:id', roleUpdateValidator, updateRole);

router.post('/', roleCreateValidator, createRole);

router.get('/', getRoles);

module.exports = router;
