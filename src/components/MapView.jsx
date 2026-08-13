import React from "react";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const markerColors = {
  HIGH: "#ef4444",
  MEDIUM: "#f59e0b",
  LOW: "#22c55e",
};

function makeIcon(priority) {
  return L.divIcon({
    className: "",
    html: `<div style="width:18px;height:18px;border-radius:50%;background:${markerColors[priority] || "#2563eb"};border:3px solid white;box-shadow:0 2px 8px #0005"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FitToIssues({ issues }) {
  const map = useMap();
  useEffect(() => {
    if (!issues.length) return;
    const points = issues.filter(i => i.lat && i.lng).map(i => [i.lat, i.lng]);
    if (points.length) map.fitBounds(points, { padding: [30, 30], maxZoom: 13 });
  }, [issues, map]);
  return null;
}

export default function MapView({ issues = [], height = 430 }) {
  return (
    <div className="map-wrapper" style={{ height }}>
      <MapContainer center={[19.076, 72.8777]} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToIssues issues={issues} />
        {issues.filter(i => i.lat && i.lng).map((issue) => (
          <Marker key={issue.id} position={[issue.lat, issue.lng]} icon={makeIcon(issue.priority)}>
            <Popup>
              <strong>{issue.id}</strong><br />
              {issue.title}<br />
              <b>Priority:</b> {issue.priority}<br />
              <b>Status:</b> {issue.status}<br />
              <b>Department:</b> {issue.department}<br /><br />
              <Link to={`/issue/${issue.id}`}>Open issue</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

