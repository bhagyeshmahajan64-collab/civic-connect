import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut, ShieldCheck } from "lucide-react";

export default function Navbar({ role = "citizen" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("civicUser");
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to={role === "admin" ? "/admin" : "/dashboard"}>
        <span className="brand-mark">C</span>
        <span>CivicConnect</span>
      </Link>

      <nav className="nav-links">
        {role === "citizen" ? (
          <>
            <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">Dashboard</Link>
            <Link className={location.pathname === "/report" ? "active" : ""} to="/report">Report Issue</Link>
            <Link className={location.pathname === "/reports" ? "active" : ""} to="/reports">My Reports</Link>
            <Link to="/notifications"><Bell size={18} /></Link>
          </>
        ) : (
          <>
            <Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">Command Center</Link>
            <Link className={location.pathname === "/admin/issues" ? "active" : ""} to="/admin/issues">Issues</Link>
            <Link className={location.pathname === "/analytics" ? "active" : ""} to="/analytics">Analytics</Link>
          </>
        )}
      </nav>

      <div className="nav-right">
        {role === "admin" && <span className="role-chip"><ShieldCheck size={16}/> Admin</span>}
        <button className="icon-button" onClick={logout} title="Logout"><LogOut size={18}/></button>
      </div>
    </header>
  );
}

