const router = require('express').Router();
const clientController = require('../controllers/ClientController');

// Signup route
router.post('/signup', clientController.signup);

// Signin route
router.post('/signin', clientController.signin);

module.exports = router;