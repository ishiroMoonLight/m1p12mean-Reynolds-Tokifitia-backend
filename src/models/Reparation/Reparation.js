const mongoose = require("mongoose");

const reparationSchema = new mongoose.Schema({
    nom         : { type: String, required: true },
    description : { type: String, required: false },
    prix        : { type: Number, required: true },
    duree       : { type: String, required: true },
    image       : { type: String, required: false },
    createdAt   : { type: Date, default: Date.now },
    pieces: [
        {
            piece: { type: mongoose.Schema.Types.Mixed, ref: "Piece"},
            quantiteReparation: { type: Number }
        }
    ],
    employees   : [
        { type: mongoose.Schema.Types.Mixed, ref: "Employee" }
    ]
});

module.exports = mongoose.model("Reparation", reparationSchema);