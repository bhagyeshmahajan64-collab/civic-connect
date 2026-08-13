import React from "react";
export default function StatusBadge({ status }) {
  const cls = {
    Submitted: "status submitted",
    Acknowledged: "status acknowledged",
    Assigned: "status assigned",
    "In Progress": "status progress",
    Resolved: "status resolved",
  }[status] || "status";

  return <span className={cls}>{status}</span>;
}

