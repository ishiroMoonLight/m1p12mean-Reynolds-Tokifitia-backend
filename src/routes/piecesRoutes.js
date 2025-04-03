const express = require("express");
const PieceController = require("../controllers/PieceController");

const router = express.Router();

router.get("/", PieceController.getAllPieces);
router.get("/:id", PieceController.getPieceById);
router.post("/", PieceController.createPiece);
router.put("/:id", PieceController.updatePiece);
router.delete("/:id", PieceController.deletePiece);

module.exports = router;
