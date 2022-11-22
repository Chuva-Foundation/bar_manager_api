const { Router } = require('express');
const { createSession } = require('../controllers/sessionController');
const { sessionCreateValidator } = require('../middlewares/validator');

const router = Router();

// router.delete('/:id', deleteSession);

router.post('/', sessionCreateValidator, createSession);

module.exports = router;
