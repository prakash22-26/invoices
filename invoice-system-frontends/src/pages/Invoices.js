import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import "./Invoices.css"; // 👈 Import external CSS for the Invoices component

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(res.data);
    };
    fetchInvoices();
  }, []);

  const deleteInvoice = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this invoice?")) return;
    await axios.delete(`http://localhost:5000/api/invoices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  return (
    <Layout>
      <div className="invoices-header">
        <h1 className="invoices-title">Invoices</h1>
        <Link to="/invoices/new" className="invoices-new-button">
          + New Invoice
        </Link>
      </div>

      <table className="invoices-table">
        <thead className="invoices-table-header">
          <tr>
            <th>Invoice No</th>
            <th>Client</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="invoices-table-row">
              <td>{inv.invoice_no}</td>
              <td>{inv.client_name}</td>
              <td>{inv.status}</td>
              <td>₹{inv.total}</td>
              <td>
                <Link to={`/invoices/${inv.id}`} className="text-blue-600 mr-2">
                  View
                </Link>
                <button
                  onClick={() => deleteInvoice(inv.id)}
                  className="text-red-600 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Invoices;
