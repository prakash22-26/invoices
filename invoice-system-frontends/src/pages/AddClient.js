import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "./AddClient.css"; // 👈 Import the external CSS

const AddClient = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    gst_no: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/clients", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/clients");
    } catch (err) {
      alert("Error adding client");
    }
  };

  return (
    <Layout>
      <div className="add-client-container">
        <div className="form-wrapper">
          <h1 className="form-title">Add New Client</h1>
          <form onSubmit={handleSubmit} className="client-form">
            {["name", "email", "phone", "company", "address", "gst_no"].map(
              (field) => (
                <div key={field} className="form-group">
                  <label className="form-label">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={`Enter ${field.replace("_", " ")}`}
                  />
                </div>
              )
            )}
            <div className="submit-section">
              <button type="submit" className="submit-btn">
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddClient;
