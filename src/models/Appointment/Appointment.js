const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date        : { type: Date, required: true },
    client      : { type: mongoose.Schema.Types.Mixed, ref: "Client" },
    employee    : { type: mongoose.Schema.Types.Mixed, ref: "Employee" , required: false },
    state       : { type: Number , required: false, default: 10 },
    description : { type: String, required: false },
    image       : { type: String, required: false },
    createdAt   : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);