const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date        : { type: Date, required: true },
    client      : { type: mongoose.Schema.Types.Mixed, ref: "Client" },
    state       : { type: Number , required: false, default: 10 },
    description : { type: String, required: false },
    image       : { type: String, required: false },
    createdAt   : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);