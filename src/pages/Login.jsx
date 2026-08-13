import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, UserRound, ArrowLeft } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("citizen");
  const [name, setName] = useState("Bhagyesh");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    localStorage.setItem("civicUser", JSON.stringify({ name: name || "Citizen", role }));
    navigate(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to home</Link>
        <div className="auth-logo"><span className="brand-mark">C</span></div>
        <h1>Welcome to CivicConnect</h1>
        <p>Choose a portal to continue with the prototype.</p>

        <div className="role-tabs">
          <button className={role === "citizen" ? "selected" : ""} onClick={() => setRole("citizen")}><UserRound size={18}/> Citizen</button>
          <button className={role === "admin" ? "selected" : ""} onClick={() => setRole("admin")}><ShieldCheck size={18}/> Municipal Admin</button>
        </div>

        <form onSubmit={login}>
          {role === "citizen" && (
            <label>Citizen name<input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"/></label>
          )}
          {role === "admin" && (
            <div className="demo-note"><ShieldCheck size={18}/><div><b>Demo Admin Access</b><small>Use this mode to showcase the municipal command center.</small></div></div>
          )}
          <button className="btn btn-primary full" type="submit">Continue to {role === "admin" ? "Admin Portal" : "Citizen Portal"}</button>
        </form>
      </div>
    </div>
  );
}

