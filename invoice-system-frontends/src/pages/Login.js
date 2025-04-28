import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css"; // 👈 Import the external CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="form-title">Welcome Back</h2>

          <div className="form-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="submit-btn" type="submit">
            Login
          </button>

          <p className="register-link">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link-text">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
