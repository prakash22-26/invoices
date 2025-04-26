const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const totalInvoices = await pool.query(`SELECT COUNT(*) FROM invoices`);
    const totalReceived = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) FROM payments`
    );
    const outstanding = await pool.query(`
      SELECT COALESCE(SUM(i.total) - COALESCE(SUM(p.amount), 0), 0) AS due
      FROM invoices i
      LEFT JOIN payments p ON i.id = p.invoice_id
    `);
    const upcomingDue = await pool.query(`
      SELECT id, invoice_no, due_date FROM invoices
      WHERE due_date > CURRENT_DATE AND status != 'Paid'
      ORDER BY due_date ASC
      LIMIT 5
    `);
    const recentInvoices = await pool.query(`
      SELECT invoice_no, status, total, issue_date FROM invoices
      ORDER BY issue_date DESC
      LIMIT 5
    `);

    res.json({
      totalInvoices: Number(totalInvoices.rows[0].count),
      totalReceived: Number(totalReceived.rows[0].coalesce),
      outstanding: Number(outstanding.rows[0].due),
      upcomingDue: upcomingDue.rows,
      recentInvoices: recentInvoices.rows,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: err.message });
  }
};

module.exports = { getDashboardStats };
