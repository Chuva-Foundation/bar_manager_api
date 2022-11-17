const { Router } = require('express');
const { createSession } = require('../controllers/sessionController');

const router = Router();

// router.delete('/:id', deleteSession);

router.post('/', createSession);

module.exports = router;
