const pool = require("../config/db");

const addPayment = async (req, res) => {
  const { invoice_id, amount, mode } = req.body;

  try {
    await pool.query(
      `INSERT INTO payments (invoice_id, amount, mode) VALUES ($1, $2, $3)`,
      [invoice_id, amount, mode]
    );

    // Sum all payments for the invoice
    const payments = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS total_paid FROM payments WHERE invoice_id = $1`,
      [invoice_id]
    );

    const invoice = await pool.query(
      `SELECT total FROM invoices WHERE id = $1`,
      [invoice_id]
    );

    const totalPaid = parseFloat(payments.rows[0].total_paid);
    const invoiceTotal = parseFloat(invoice.rows[0].total);
    const status = totalPaid >= invoiceTotal ? "Paid" : "Partially Paid";

    await pool.query(`UPDATE invoices SET status = $1 WHERE id = $2`, [
      status,
      invoice_id,
    ]);

    res.status(201).json({ message: "Payment recorded", status });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding payment", error: err.message });
  }
};

const getPaymentsByInvoice = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM payments WHERE invoice_id = $1 ORDER BY date DESC`,
      [req.params.invoice_id]
    );
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching payments", error: err.message });
  }
};

module.exports = {
  addPayment,
  getPaymentsByInvoice,
};
