import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "./Payments.css"; // 👈 Import the external CSS for the Payments component

const Payments = () => {
  const [invoiceId, setInvoiceId] = useState("");
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Cash");

  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    if (!invoiceId) return;
    const res = await axios.get(
      `http://localhost:5000/api/payments/invoice/${invoiceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setPayments(res.data);
  };

  const addPayment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/payments`,
        { invoice_id: invoiceId, amount, mode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount("");
      fetchPayments();
    } catch (err) {
      alert("Error adding payment");
    }
  };

  useEffect(() => {
    if (invoiceId) fetchPayments();
  }, [invoiceId]);

  return (
    <Layout>
      <h1 className="payments-title">Payments</h1>

      <div className="payments-form">
        <label className="form-label">Invoice ID</label>
        <input
          className="form-input"
          type="number"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
        />
      </div>

      {invoiceId && (
        <>
          <div className="payments-details">
            <div className="details-item">
              <label className="form-label">Amount</label>
              <input
                className="form-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="details-item">
              <label className="form-label">Mode</label>
              <select
                className="form-select"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Bank</option>
              </select>
            </div>
            <div className="details-item">
              <button onClick={addPayment} className="btn-add-payment">
                Add Payment
              </button>
            </div>
          </div>

          <h2 className="payment-history-title">Payment History</h2>
          <table className="payments-table">
            <thead className="table-header">
              <tr>
                <th>Amount</th>
                <th>Mode</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="table-row">
                  <td>₹{p.amount}</td>
                  <td>{p.mode}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Layout>
  );
};

export default Payments;
