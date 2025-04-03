const PieceModel = require("../models/Pieces/Pieces");
const ReparationModel = require("../models/Reparation/Reparation");

const PieceController = {

    // Récupérer toutes les pièces
    async getAllPieces(req, res) {
        try {
            // const pieces = await PieceModel.find();
            // res.json(pieces);

            const pieces = await PieceModel.find().lean(); // Convertir en objet JS natif

            const piecesWithReparations = await Promise.all(pieces.map(async (piece) => {
                // Trouver toutes les réparations où cette pièce est utilisée
                const reparations = await ReparationModel.find({ "pieces.piece": piece._id });
                // .select("nom description prix duree image");

                return { ...piece, reparations };
            }));

            res.json(piecesWithReparations);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Récupérer une pièce par ID
    async getPieceById(req, res) {
        try {
            const piece = await PieceModel.findById(req.params.id);
            if (!piece) {
                return res.status(404).json({ message: "Pièce non trouvée" });
            }
            res.json(piece);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Ajouter une nouvelle pièce
    async createPiece(req, res) {
        try {
            const { nom, description, prix, quantite, image } = req.body;
            const newPiece = new PieceModel({ nom, description, prix, quantite, image });
            await newPiece.save();
            res.status(201).json(newPiece);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Mettre à jour une pièce
    async updatePiece(req, res) {
        try {
            const updatedPiece = await PieceModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedPiece) {
                return res.status(404).json({ message: "Pièce non trouvée" });
            }
            res.json(updatedPiece);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Supprimer une pièce
    async deletePiece(req, res) {
        try {
            const deletedPiece = await PieceModel.findByIdAndDelete(req.params.id);
            if (!deletedPiece) {
                return res.status(404).json({ message: "Pièce non trouvée" });
            }
            res.json({ message: "Pièce supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    }
};

module.exports = PieceController;
