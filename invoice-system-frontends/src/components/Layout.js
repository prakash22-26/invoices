import { Link } from "react-router-dom";
import "./Layout.css"; // 👈 Import the external CSS

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <Link to="/clients/new" className="button add-client">
            Add Client
          </Link>
          <Link to="/invoices/new" className="button add-invoice">
            Add Invoice
          </Link>
          <Link to="/" className="button logout">
            Logout
          </Link>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/invoices" className="nav-link">
            Invoices
          </Link>
          <Link to="/clients" className="nav-link">
            Clients
          </Link>
          <Link to="/payments" className="nav-link">
            Payments
          </Link>
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
