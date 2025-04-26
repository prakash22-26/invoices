import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "./Dashboard.css"; // 👈 Import external CSS for the Dashboard component

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    };
    fetchData();
  }, []);

  if (!stats)
    return (
      <Layout>
        <div className="loading-message">Loading...</div>
      </Layout>
    );

  return (
    <Layout>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stats-grid">
        <StatCard label="Total Invoices" value={stats.totalInvoices} />
        <StatCard label="Total Received" value={`₹${stats.totalReceived}`} />
        <StatCard label="Outstanding" value={`₹${stats.outstanding}`} />
        <StatCard label="Upcoming Due" value={stats.upcomingDue.length} />
      </div>

      <div className="recent-invoices">
        <h2 className="recent-invoices-title">Recent Invoices</h2>
        <table className="invoice-table">
          <thead>
            <tr>
              <th className="table-header">Invoice No</th>
              <th className="table-header">Status</th>
              <th className="table-header">Total</th>
              <th className="table-header">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentInvoices.map((inv, idx) => (
              <tr key={idx} className="table-row">
                <td className="table-cell">{inv.invoice_no}</td>
                <td className="table-cell">{inv.status}</td>
                <td className="table-cell">₹{inv.total}</td>
                <td className="table-cell">{inv.issue_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <p className="stat-label">{label}</p>
    <p className="stat-value">{value}</p>
  </div>
);

export default Dashboard;
