const mongoose = require("mongoose");

const pieceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: false },
    prix: { type: Number, required: true },
    quantite: { type: Number, required: true },
    image: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Piece", pieceSchema);