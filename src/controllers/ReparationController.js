const ReparationModel = require("../models/Reparation/Reparation");

const ReparationController = {

    // Récupérer toutes les réparations
    async getAllReparations(req, res) {
        try {
            const reparations = await ReparationModel.find();
            res.json(reparations);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Récupérer une réparation par ID
    async getReparationById(req, res) {
        try {
            const reparation = await ReparationModel.findById(req.params.id);
            if (!reparation) {
                return res.status(404).json({ message: "Réparation non trouvée" });
            }
            res.json(reparation);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Créer une nouvelle réparation
    async createReparation(req, res) {
        try {
            const { nom, description, prix, duree, image } = req.body;
            const newReparation = new ReparationModel({ nom, description, prix, duree, image });
            await newReparation.save();
            res.status(201).json(newReparation);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Mettre à jour une réparation
    async updateReparation(req, res) {
        try {
            const updatedReparation = await ReparationModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedReparation) {
                return res.status(404).json({ message: "Réparation non trouvée" });
            }
            res.json(updatedReparation);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Supprimer une réparation
    async deleteReparation(req, res) {
        try {
            const deletedReparation = await ReparationModel.findByIdAndDelete(req.params.id);
            if (!deletedReparation) {
                return res.status(404).json({ message: "Réparation non trouvée" });
            }
            res.json({ message: "Réparation supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    }
};

module.exports = ReparationController;
