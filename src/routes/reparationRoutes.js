const express = require("express");
const ReparationController = require("../controllers/ReparationController");

const router = express.Router();

router.get("/", ReparationController.getAllReparations);
router.get("/:id", ReparationController.getReparationById);
router.post("/", ReparationController.createReparation);
router.put("/:id", ReparationController.updateReparation);
router.delete("/:id", ReparationController.deleteReparation);
router.post("/affect-piece", ReparationController.addPieceToReparation);
router.post("/affect-personnel", ReparationController.assignEmployeeToReparation);

module.exports = router;
