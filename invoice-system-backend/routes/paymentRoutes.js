const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addPayment,
  getPaymentsByInvoice,
} = require("../controllers/paymentController");

router.use(verifyToken);

router.post("/", addPayment);
router.get("/invoice/:invoice_id", getPaymentsByInvoice);

module.exports = router;
