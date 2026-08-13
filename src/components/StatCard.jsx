import React from "react";
import { Activity, CheckCircle2, Clock3, AlertTriangle } from "lucide-react";

const icons = {
  reports: Activity,
  pending: Clock3,
  resolved: CheckCircle2,
  high: AlertTriangle,
};

export default function StatCard({ label, value, type = "reports", subtext }) {
  const Icon = icons[type] || Activity;
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={22} /></div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {subtext && <div className="stat-subtext">{subtext}</div>}
      </div>
    </div>
  );
}

