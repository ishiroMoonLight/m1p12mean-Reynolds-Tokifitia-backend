const express = require('express');
const { registerManager, loginManager } = require('../controllers/managerController');

const router = express.Router();

router.post('/register', registerManager);
router.post('/login', loginManager);

module.exports = router;
