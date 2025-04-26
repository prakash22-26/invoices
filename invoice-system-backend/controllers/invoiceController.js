const pool = require("../config/db");

const generateInvoiceNumber = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM invoices");
  return `INV-${1000 + Number(result.rows[0].count) + 1}`;
};

const createInvoice = async (req, res) => {
  const { client_id, status, tax, discount, issue_date, due_date, items } =
    req.body;

  try {
    const invoice_no = await generateInvoiceNumber();

    const invoiceResult = await pool.query(
      `INSERT INTO invoices (invoice_no, client_id, status, tax, discount, issue_date, due_date, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        invoice_no,
        client_id,
        status,
        tax,
        discount,
        issue_date,
        due_date,
        req.user.userId,
      ]
    );

    const invoice_id = invoiceResult.rows[0].id;
    let total = 0;

    for (const item of items) {
      const { description, qty, unit_price } = item;
      const itemTotal = qty * unit_price;
      total += itemTotal;

      await pool.query(
        `INSERT INTO invoice_items (invoice_id, description, qty, unit_price, total)
         VALUES ($1, $2, $3, $4, $5)`,
        [invoice_id, description, qty, unit_price, itemTotal]
      );
    }

    total = total + tax - discount;

    await pool.query(`UPDATE invoices SET total = $1 WHERE id = $2`, [
      total,
      invoice_id,
    ]);

    res
      .status(201)
      .json({ message: "Invoice created successfully", invoice_id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: err.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, c.name as client_name FROM invoices i
      JOIN clients c ON i.client_id = c.id
    `);
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: err.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await pool.query(`SELECT * FROM invoices WHERE id = $1`, [
      req.params.id,
    ]);
    const items = await pool.query(
      `SELECT * FROM invoice_items WHERE invoice_id = $1`,
      [req.params.id]
    );
    res.json({ invoice: invoice.rows[0], items: items.rows });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching invoice", error: err.message });
  }
};

const updateInvoice = async (req, res) => {
  // Simplified – could include full update logic
  res.status(501).json({ message: "Update endpoint to be implemented" });
};

const deleteInvoice = async (req, res) => {
  try {
    await pool.query(`DELETE FROM invoices WHERE id = $1`, [req.params.id]);
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting invoice", error: err.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
