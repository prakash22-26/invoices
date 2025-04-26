import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import "./Clients.css"; // 👈 Import external CSS for the Clients component

const Clients = () => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/clients", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const deleteClient = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Delete this client?")) return;
    await axios.delete(`http://localhost:5000/api/clients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients(clients.filter((c) => c.id !== id));
  };

  return (
    <Layout>
      <div className="clients-header">
        <h1 className="clients-title">Clients</h1>
        <Link to="/clients/new" className="clients-new-button">
          + New Client
        </Link>
      </div>

      <table className="clients-table">
        <thead className="clients-table-header">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Invoices</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="clients-table-row">
              <td>{client.name}</td>
              <td>{client.company}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.invoice_count}</td>
              <td>₹{client.total_due}</td>
              <td>
                <button
                  onClick={() => deleteClient(client.id)}
                  className="clients-delete-btn"
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

export default Clients;
