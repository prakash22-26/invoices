const express = require("express");
const router = express.Router();
const { generateInvoicePDF } = require("../controllers/pdfController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/:id", verifyToken, generateInvoicePDF);

module.exports = router;
