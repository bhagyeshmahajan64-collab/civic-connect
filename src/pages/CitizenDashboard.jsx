import React from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, Bell, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import IssueCard from "../components/IssueCard";
import { getIssues } from "../data/mockIssues";
import { useMemo } from "react";

export default function CitizenDashboard() {
  const user = JSON.parse(localStorage.getItem("civicUser") || '{"name":"Citizen"}');
  const issues = useMemo(() => getIssues(), []);
  const recent = issues.slice(0, 3);

  return (
    <><Navbar/><main className="container page">
      <section className="welcome-row">
        <div><div className="eyebrow">CITIZEN PORTAL</div><h1>Good evening, {user.name} 👋</h1><p>Help make your neighborhood safer, cleaner and better.</p></div>
        <Link className="btn btn-primary" to="/report"><Plus size={18}/> Report New Issue</Link>
      </section>

      <section className="stats-grid">
        <StatCard label="Total Reports" value={issues.length} type="reports"/>
        <StatCard label="Pending / Active" value={issues.filter(i => i.status !== "Resolved").length} type="pending"/>
        <StatCard label="Resolved" value={issues.filter(i => i.status === "Resolved").length} type="resolved"/>
        <StatCard label="High Priority" value={issues.filter(i => i.priority === "HIGH").length} type="high"/>
      </section>

      <section className="section-header"><div><h2>Recent Civic Reports</h2><p>Track issues submitted by the community.</p></div><Link to="/reports" className="text-link">View all <ArrowRight size={16}/></Link></section>
      <div className="issue-grid">{recent.map(issue => <IssueCard key={issue.id} issue={issue} onClick={(i) => window.location.href = `/issue/${i.id}`}/>)}</div>

      <div className="info-banner"><Bell size={22}/><div><b>Stay updated</b><p>You'll receive notifications when your report is acknowledged, assigned and resolved.</p></div></div>
    </main></>
  );
}

