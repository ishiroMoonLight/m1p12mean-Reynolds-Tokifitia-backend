const ReparationModel = require("../models/Reparation/Reparation");
const PieceModel = require("../models/Pieces/Pieces");
const Employee = require("../models/Manager/Employee");

const ReparationController = {

    // Ajouter un employe à une réparation
    async assignEmployeeToReparation(req, res) {
        try {
            const { employeeId, reparationId } = req.body;

            // Vérifier si l'employé existe
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: "Employé introuvable" });
            }

            // Vérifier si la réparation existe
            const reparation = await ReparationModel.findById(reparationId);
            if (!reparation) {
                return res.status(404).json({ message: "Réparation non trouvée" });
            }

            // Mettre à jour l'employé avec l'objet complet de la réparation
            employee.reparation = reparation.toObject(); // Convertir en objet JS
            await employee.save();

            // Vérifier si l'employé est déjà dans `reparation.employees`
            const isAlreadyAssigned = reparation.employees.some(emp => emp._id.toString() === employee._id.toString());

            if (isAlreadyAssigned) {
                return res.status(400).json({ message: "L'employé est déjà assigné à cette réparation" });
            }

            // Mettre à jour la réparation avec l'objet complet de l'employé
            reparation.employees.push(employee.toObject());
            await reparation.save();

            // ✅ Réponse JSON indiquant que l'opération a réussi
            res.json({ message: "Employé assigné à la réparation avec succès" });

        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Ajouter une pièce à une réparation
    async addPieceToReparation(req, res) {
        try {
            const { reparationId, pieceId, quantite } = req.body;

            // Vérifier si la réparation existe
            const reparation = await ReparationModel.findById(reparationId);
            if (!reparation) {
                return res.status(404).json({ message: "Réparation non trouvée" });
            }

            // Vérifier si la pièce existe
            const piece = await PieceModel.findById(pieceId);
            if (!piece) {
                return res.status(404).json({ message: "Pièce non trouvée" });
            }

            // Vérifier si la quantité demandée est disponible
            if (piece.quantite < quantite) {
                return res.status(400).json({ message: "Quantité insuffisante en stock" });
            }

            // Ajouter la pièce à la réparation
            reparation.pieces.push({ piece: piece.toObject(), quantiteReparation: quantite });
            piece.reparation.push({
                reparation: reparation.toObject(),
                quantiteReparation: quantite
            });

            // Sauvegarder les modifications
            await reparation.save();
            await piece.save();

            res.json({ message: "Pièce ajoutée à la réparation avec succès", reparation });
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    // Récupérer toutes les réparations
    async getAllReparations(req, res) {
        try {
            const reparations = await ReparationModel.find().populate({
                path: "pieces.piece", // Récupère l'objet complet de la pièce
                model: "Piece"
            })
                .exec();
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
