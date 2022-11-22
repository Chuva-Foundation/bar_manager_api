const { Router } = require('express');
const {
  getRoles, getRole, createRole, deleteRole, updateRole,
} = require('../controllers/roleController');

const { roleCreateValidator, roleUpdateValidator } = require('../middlewares/validator');
const { adminRestricted } = require('../middlewares/restrictions');

const router = Router();

router.get('/:id', getRole);

router.get('/', getRoles);

router.use(adminRestricted);

router.delete('/:id', deleteRole);

router.put('/:id', roleUpdateValidator, updateRole);

router.post('/', roleCreateValidator, createRole);

module.exports = router;
