import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

const ViewInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInvoice = async () => {
      const res = await axios.get(`http://localhost:5000/api/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoice(res.data.invoice);
      setItems(res.data.items);
    };
    fetchInvoice();
  }, [id]);

  if (!invoice)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoice #{invoice.invoice_no}</h1>
        <Link to="/invoices" className="text-blue-600">
          ← Back to list
        </Link>
      </div>

      <div className="mb-6 space-y-2">
        <p>
          <strong>Status:</strong> {invoice.status}
        </p>
        <p>
          <strong>Client ID:</strong> {invoice.client_id}
        </p>
        <p>
          <strong>Issued On:</strong> {invoice.issue_date}
        </p>
        <p>
          <strong>Due Date:</strong> {invoice.due_date}
        </p>
        <p>
          <strong>Tax:</strong> ₹{invoice.tax}
        </p>
        <p>
          <strong>Discount:</strong> ₹{invoice.discount}
        </p>
        <p>
          <strong>Total:</strong> ₹{invoice.total}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-2">Line Items</h2>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2">Description</th>
            <th className="text-left px-4 py-2">Qty</th>
            <th className="text-left px-4 py-2">Unit Price</th>
            <th className="text-left px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.qty}</td>
              <td className="px-4 py-2">₹{item.unit_price}</td>
              <td className="px-4 py-2">₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a
        href={`http://localhost:5000/api/pdf/${invoice.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </a>
    </Layout>
  );
};

export default ViewInvoice;
