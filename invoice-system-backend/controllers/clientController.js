const pool = require("../config/db");

const addClient = async (req, res) => {
  const { name, email, phone, company, address, gst_no } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO clients (name, email, phone, company, address, gst_no)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, phone, company, address, gst_no]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding client", error: err.message });
  }
};

const getClients = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.*,
        COUNT(i.id) AS invoice_count,
        COALESCE(SUM(i.total), 0) AS total_due
      FROM clients c
      LEFT JOIN invoices i ON i.client_id = c.id
      GROUP BY c.id
    `);
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching clients", error: err.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM clients WHERE id = $1`, [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching client", error: err.message });
  }
};

const updateClient = async (req, res) => {
  const { name, email, phone, company, address, gst_no } = req.body;
  try {
    await pool.query(
      `UPDATE clients SET name=$1, email=$2, phone=$3, company=$4, address=$5, gst_no=$6 WHERE id=$7`,
      [name, email, phone, company, address, gst_no, req.params.id]
    );
    res.json({ message: "Client updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating client", error: err.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    await pool.query(`DELETE FROM clients WHERE id=$1`, [req.params.id]);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting client", error: err.message });
  }
};

module.exports = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
