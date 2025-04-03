const router  = require('express').Router();
const appointmentController = require('../controllers/AppointmentController');

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id',appointmentController.deleteAppointment);

module.exports = router;
