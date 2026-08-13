import React from "react";
import { MapPin, Building2, CalendarDays } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function IssueCard({ issue, onClick }) {
  return (
    <button className="issue-card" onClick={() => onClick?.(issue)}>
      <div className="issue-card-top">
        <div>
          <span className={`priority-dot ${issue.priority.toLowerCase()}`} />
          <span className="issue-id">{issue.id}</span>
        </div>
        <StatusBadge status={issue.status} />
      </div>
      <h3>{issue.title}</h3>
      <p>{issue.description}</p>
      <div className="issue-meta">
        <span><MapPin size={15} /> {issue.location}</span>
        <span><Building2 size={15} /> {issue.department}</span>
        <span><CalendarDays size={15} /> {new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>
    </button>
  );
}

