const Appointment = require("../models/Appointment/Appointment");

const AppointmentController = {
   async createAppointment(req, res) {
       try{
            const { date, client, state, description, image } = req.body;

            const newAppointment = new Appointment({ date, client, state, description, image });
            await newAppointment.save();
            res.status(201).json(newAppointment);
       } catch (error) {
           res.status(500).json({ message: "Erreur lors de la création du RDV", error: error.message });
       }
   },


   async getAllAppointments(req, res) {
       try {
           const appointments = await Appointment.find();
           res.json(appointments);
       } catch (error) {
           res.status(500).json({ message: "Erreur lors de la recherche des RDV", error: error.message });
       }
   },

   async getAppointmentById(req, res) {
       try {
           const appointment = await Appointment.findById(req.params.id);
           if (!appointment) {
               return res.status(404).json({ message: "RDV non trouvé" });
           }
           res.json(appointment);
       } catch (error) {
           res.status(500).json({ message: "Erreur lors de la recherche du RDV", error: error.message });
       }
   },

   async updateAppointment(req, res) {
       try {
           const updatedAppointment = await Appointment.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true }
           );
           if (!updatedAppointment) {
               return res.status(404).json({ message: "RDV non trouvé" });
           }
           res.json(updatedAppointment);
       } catch (error) {
           res.status(500).json({ message: "Erreur lors de la mise à jour du RDV", error: error.message });
       }
   },

   async deleteAppointment(req, res) {
       try {
           const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
           if (!deletedAppointment) {
               return res.status(404).json({ message: "RDV non trouvé" });
           }
           res.json({ message: "RDV supprimé avec succès" });
       } catch (error) {
           res.status(500).json({ message: "Erreur lors de la suppression du RDV", error: error.message });
       }
   }
}

module.exports = AppointmentController;