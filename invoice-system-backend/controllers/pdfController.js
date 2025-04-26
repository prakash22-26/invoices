const pool = require("../config/db");
const PDFDocument = require("pdfkit");

const generateInvoicePDF = async (req, res) => {
  const { id } = req.params;

  try {
    const invoiceResult = await pool.query(
      "SELECT * FROM invoices WHERE id = $1",
      [id]
    );
    const itemsResult = await pool.query(
      "SELECT * FROM invoice_items WHERE invoice_id = $1",
      [id]
    );

    const invoice = invoiceResult.rows[0];
    const items = itemsResult.rows;

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${invoice.invoice_no}.pdf`
    );
    doc.pipe(res);

    doc
      .fontSize(20)
      .text(`Invoice #${invoice.invoice_no}`, { underline: true });
    doc.moveDown();

    doc.text(`Status: ${invoice.status}`);
    doc.text(`Issue Date: ${invoice.issue_date}`);
    doc.text(`Due Date: ${invoice.due_date}`);
    doc.text(`Tax: ₹${invoice.tax}`);
    doc.text(`Discount: ₹${invoice.discount}`);
    doc.text(`Total: ₹${invoice.total}`);
    doc.moveDown();

    doc.fontSize(16).text("Items:");
    items.forEach((item) => {
      doc
        .fontSize(12)
        .text(
          `- ${item.description}: ${item.qty} x ₹${item.unit_price} = ₹${item.total}`
        );
    });

    doc.end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error generating PDF", error: err.message });
  }
};

module.exports = { generateInvoicePDF };
