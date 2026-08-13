import React from "react";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import { getIssues, saveIssues } from "../data/mockIssues";
import { Search, SlidersHorizontal, X, UserCheck } from "lucide-react";

const departments = ["All", "Public Works", "Sanitation", "Electrical Department", "Water & Drainage", "Traffic Department", "Municipal Helpdesk"];
const statuses = ["All", "Submitted", "Acknowledged", "Assigned", "In Progress", "Resolved"];
const priorities = ["All", "HIGH", "MEDIUM", "LOW"];
const categories = ["All", "Pothole", "Garbage", "Streetlight", "Water Leakage", "Drainage", "Traffic Signal", "Public Space", "Other"];

export default function AdminIssues() {
  const [issues, setIssues] = useState(getIssues());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => issues.filter(i =>
    (category === "All" || i.category === category) &&
    (priority === "All" || i.priority === priority) &&
    (status === "All" || i.status === status) &&
    (department === "All" || i.department === department) &&
    `${i.id} ${i.title} ${i.location}`.toLowerCase().includes(search.toLowerCase())
  ), [issues, search, category, priority, status, department]);

  const updateIssue = (id, updates) => {
    const next = issues.map(i => i.id === id ? {...i, ...updates} : i);
    setIssues(next); saveIssues(next);
    setSelected(next.find(i => i.id === id));
  };

  return <><Navbar role="admin"/><main className="container page">
    <div className="page-heading"><div className="eyebrow">OPERATIONS</div><h1>Issue Management</h1><p>Filter, categorize, assign and update incoming civic reports.</p></div>
    <div className="filter-bar">
      <div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search issue, ID or location..."/></div>
      <select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{categories.slice(1).map(x=><option key={x}>{x}</option>)}</select>
      <select value={priority} onChange={e=>setPriority(e.target.value)}>{priorities.map(x=><option key={x}>{x}</option>)}</select>
      <select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(x=><option key={x}>{x}</option>)}</select>
      <select value={department} onChange={e=>setDepartment(e.target.value)}>{departments.map(x=><option key={x}>{x}</option>)}</select>
    </div>

    <div className="table-card">
      <div className="table-header"><b>{filtered.length} issues</b><span><SlidersHorizontal size={16}/> Filters active</span></div>
      <div className="table-wrap"><table><thead><tr><th>ID</th><th>Issue</th><th>Category</th><th>Priority</th><th>Department</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>{filtered.map(issue => <tr key={issue.id}><td><b>{issue.id}</b></td><td><div className="table-issue"><b>{issue.title}</b><small>{issue.location}</small></div></td><td>{issue.category}</td><td><span className={`priority-text ${issue.priority.toLowerCase()}`}>{issue.priority}</span></td><td>{issue.department}</td><td><StatusBadge status={issue.status}/></td><td><button className="small-btn" onClick={()=>setSelected(issue)}>Manage</button></td></tr>)}</tbody>
      </table></div>
    </div>

    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><div className="eyebrow">{selected.id}</div><h2>{selected.title}</h2><p>{selected.description}</p>
      <div className="analysis-box"><div><span>Priority</span><b className={`priority-text ${selected.priority.toLowerCase()}`}>{selected.priority}</b></div><div><span>Department</span><b>{selected.department}</b></div></div>
      <label>Status<select value={selected.status} onChange={e=>updateIssue(selected.id,{status:e.target.value})}>{statuses.slice(1).map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Assign task to<input value={selected.assignedTo || ""} onChange={e=>updateIssue(selected.id,{assignedTo:e.target.value})} placeholder="e.g. Rahul Patil"/></label>
      <div className="button-row"><button className="btn btn-primary" onClick={()=>updateIssue(selected.id,{status:selected.assignedTo ? "Assigned" : selected.status})}><UserCheck size={17}/> Save Assignment</button><button className="btn btn-outline" onClick={()=>setSelected(null)}>Done</button></div>
    </div></div>}
  </main></>;
}

