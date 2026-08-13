import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import IssueCard from "../components/IssueCard";
import { getIssues } from "../data/mockIssues";

export default function MyReports() {
  const [issues] = useState(getIssues());
  const [selected, setSelected] = useState("All");
  const statuses = ["All", "Submitted", "Acknowledged", "Assigned", "In Progress", "Resolved"];
  const filtered = selected === "All" ? issues : issues.filter(i => i.status === selected);

  return <><Navbar/><main className="container page">
    <div className="page-heading"><div className="eyebrow">TRACKING</div><h1>My Reports</h1><p>Follow every stage of your civic issue reports.</p></div>
    <div className="filter-pills">{statuses.map(s => <button key={s} className={selected === s ? "selected" : ""} onClick={() => setSelected(s)}>{s}</button>)}</div>
    <div className="issue-grid">{filtered.map(issue => <IssueCard key={issue.id} issue={issue} onClick={i => window.location.href = `/issue/${i.id}`}/>)}</div>
  </main></>;
}

