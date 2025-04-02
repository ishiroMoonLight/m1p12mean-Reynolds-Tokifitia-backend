const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeControllers');

// Routes
router.post('/register', employeeController.registerEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
