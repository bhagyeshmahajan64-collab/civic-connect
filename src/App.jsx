import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import ReportIssue from "./pages/ReportIssue";
import MyReports from "./pages/MyReports";
import IssueDetails from "./pages/IssueDetails";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import AdminIssues from "./pages/AdminIssues";
import Analytics from "./pages/Analytics";

function Guard({ children, role }) {
  const user = JSON.parse(localStorage.getItem("civicUser") || "null");
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Guard role="citizen"><CitizenDashboard/></Guard>}/>
        <Route path="/report" element={<Guard role="citizen"><ReportIssue/></Guard>}/>
        <Route path="/reports" element={<Guard role="citizen"><MyReports/></Guard>}/>
        <Route path="/issue/:id" element={<Guard><IssueDetails/></Guard>}/>
        <Route path="/notifications" element={<Guard role="citizen"><Notifications/></Guard>}/>
        <Route path="/admin" element={<Guard role="admin"><AdminDashboard/></Guard>}/>
        <Route path="/admin/issues" element={<Guard role="admin"><AdminIssues/></Guard>}/>
        <Route path="/analytics" element={<Guard role="admin"><Analytics/></Guard>}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}
