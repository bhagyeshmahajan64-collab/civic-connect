import React from "react";
import { Bell, CheckCircle2, Clock3, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { getIssues } from "../data/mockIssues";
import { Link } from "react-router-dom";

export default function Notifications() {
  const issues = getIssues().slice(0, 5);
  const notifications = issues.flatMap(issue => {
    const list = [
      { icon: CheckCircle2, title: `Report ${issue.id} submitted`, text: `Your ${issue.category.toLowerCase()} report was received.`, time: "Recently" },
    ];
    if (["Acknowledged","Assigned","In Progress","Resolved"].includes(issue.status)) list.push({ icon: Bell, title: `Report ${issue.id} acknowledged`, text: `The ${issue.department} team has received the report.`, time: "Today" });
    if (issue.status === "Resolved") list.push({ icon: CheckCircle2, title: `Report ${issue.id} resolved`, text: "The reported civic issue has been marked resolved.", time: "Today" });
    return list;
  });

  return <><Navbar/><main className="container page narrow">
    <div className="page-heading"><div className="eyebrow">UPDATES</div><h1>Notifications</h1><p>Confirmation, acknowledgement and resolution updates.</p></div>
    <div className="notification-list">{notifications.map((n, i) => { const Icon=n.icon; return <div className="notification-item" key={i}><div className="notification-icon"><Icon size={19}/></div><div><b>{n.title}</b><p>{n.text}</p><small>{n.time}</small></div><ArrowRight size={17}/></div>})}</div>
    <Link to="/reports" className="btn btn-outline">View My Reports</Link>
  </main></>;
}

