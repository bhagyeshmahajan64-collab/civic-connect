import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import NotificationPanel from "../components/NotificationPanel";
import MapView from "../components/MapView";
import { getIssues } from "../data/mockIssues";
import { ArrowLeft, MapPin, Building2, UserRound } from "lucide-react";

export default function IssueDetails() {
  const { id } = useParams();
  const issue = getIssues().find(i => i.id === id);

  if (!issue) return <><Navbar/><main className="container page"><h1>Issue not found</h1><Link to="/reports">Back</Link></main></>;

  return <><Navbar/><main className="container page">
    <Link className="back-link" to="/reports"><ArrowLeft size={16}/> Back to reports</Link>
    <div className="detail-header"><div><div className="eyebrow">{issue.id}</div><h1>{issue.title}</h1><p>{issue.description}</p></div><StatusBadge status={issue.status}/></div>
    <div className="detail-grid">
      <div>
        <div className="detail-card"><h2>Report information</h2>
          <div className="detail-list">
            <div><MapPin size={18}/><span>Location<b>{issue.location}</b></span></div>
            <div><Building2 size={18}/><span>Department<b>{issue.department}</b></span></div>
            <div><UserRound size={18}/><span>Assigned to<b>{issue.assignedTo || "Awaiting assignment"}</b></span></div>
          </div>
        </div>
        <div className="detail-card"><h2>Resolution timeline</h2><NotificationPanel issue={issue}/></div>
      </div>
      <div>
        <div className="detail-card"><h2>Issue location</h2><MapView issues={[issue]} height={330}/></div>
        <div className="detail-card"><h2>Priority assessment</h2><div className={`priority-large ${issue.priority.toLowerCase()}`}>{issue.priority}<small>Based on report metadata and urgency indicators</small></div></div>
      </div>
    </div>
  </main></>;
}

