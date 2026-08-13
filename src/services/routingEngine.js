export function routeIssue(category = "") {
  const routing = {
    "Pothole": "Public Works",
    "Road Damage": "Public Works",
    "Garbage": "Sanitation",
    "Streetlight": "Electrical Department",
    "Water Leakage": "Water & Drainage",
    "Drainage": "Water & Drainage",
    "Traffic Signal": "Traffic Department",
    "Public Space": "Public Works",
    "Other": "Municipal Helpdesk",
  };

  return routing[category] || "Municipal Helpdesk";
}
