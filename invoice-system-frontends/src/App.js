import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import PrivateRoute from "./components/PrivateRoute";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import Payments from "./pages/Payments";
import AddInvoice from "./pages/AddInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <Invoices />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/new"
          element={
            <PrivateRoute>
              <AddClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <Payments />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices/new"
          element={
            <PrivateRoute>
              <AddInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <PrivateRoute>
              <ViewInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        {/* Add routes for invoices, clients, payments */}
      </Routes>
    </Router>
  );
}

export default App;
