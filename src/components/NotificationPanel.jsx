import React from "react";
import { CheckCircle2, Bell, Clock3 } from "lucide-react";

export default function NotificationPanel({ issue }) {
  const steps = [
    ["Report submitted", true, "Your issue has been received by CivicConnect."],
    ["Municipality acknowledged", ["Acknowledged", "Assigned", "In Progress", "Resolved"].includes(issue.status), "The municipal team has acknowledged the report."],
    ["Work in progress", ["In Progress", "Resolved"].includes(issue.status), "The assigned department is working on the issue."],
    ["Issue resolved", issue.status === "Resolved", "The reported civic issue has been resolved."],
  ];

  return (
    <div className="timeline">
      {steps.map(([title, done, text], index) => (
        <div className={`timeline-item ${done ? "done" : ""}`} key={title}>
          <div className="timeline-icon">{done ? <CheckCircle2 size={18}/> : index === 0 ? <Bell size={18}/> : <Clock3 size={18}/>}</div>
          <div>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

