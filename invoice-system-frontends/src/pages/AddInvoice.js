import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "./AddInvoice.css"; // 👈 Import the external CSS

const AddInvoice = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client_id: "",
    issue_date: "",
    due_date: "",
    tax: 0,
    discount: 0,
    status: "Draft",
  });
  const [items, setItems] = useState([
    { description: "", qty: 1, unit_price: 0 },
  ]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const res = await axios.get("http://localhost:5000/api/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    };
    fetchClients();
  }, []);

  const handleItemChange = (i, e) => {
    const newItems = [...items];
    newItems[i][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", qty: 1, unit_price: 0 }]);
  };

  const removeItem = (i) => {
    const newItems = items.filter((_, index) => index !== i);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/invoices",
        {
          ...form,
          items,
          tax: Number(form.tax),
          discount: Number(form.discount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/invoices");
    } catch (err) {
      alert("Error creating invoice");
    }
  };

  return (
    <Layout>
      <div className="add-invoice-container">
        <div className="form-wrapper">
          <h1 className="form-title">Create New Invoice</h1>
          <form onSubmit={handleSubmit} className="invoice-form">
            {/* Basic Info */}
            <div className="form-section">
              <div className="form-group">
                <label>Client</label>
                <select
                  name="client_id"
                  value={form.client_id}
                  onChange={(e) =>
                    setForm({ ...form, client_id: e.target.value })
                  }
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.company})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Draft</option>
                  <option>Sent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  name="issue_date"
                  value={form.issue_date}
                  onChange={(e) =>
                    setForm({ ...form, issue_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={(e) =>
                    setForm({ ...form, due_date: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="line-items-section">
              <h2>Line Items</h2>
              {items.map((item, i) => (
                <div key={i} className="line-item">
                  <input
                    name="description"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(i, e)}
                  />
                  <input
                    name="qty"
                    type="number"
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) => handleItemChange(i, e)}
                  />
                  <input
                    name="unit_price"
                    type="number"
                    placeholder="Unit Price"
                    value={item.unit_price}
                    onChange={(e) => handleItemChange(i, e)}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="add-item-btn">
                + Add another item
              </button>
            </div>

            {/* Tax and Discount */}
            <div className="form-section">
              <div className="form-group">
                <label>Tax (%)</label>
                <input
                  type="number"
                  name="tax"
                  value={form.tax}
                  onChange={(e) => setForm({ ...form, tax: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Submit */}
            <div className="submit-section">
              <button type="submit" className="submit-btn">
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddInvoice;
