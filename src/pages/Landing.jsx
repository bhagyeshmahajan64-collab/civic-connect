import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPinned, Camera, Route, BarChart3, ShieldCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="landing">
      <header className="navbar landing-nav">
        <Link className="brand" to="/"><span className="brand-mark">C</span>CivicConnect</Link>
        <div className="nav-right">
          <Link className="btn btn-ghost" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/login">Get Started <ArrowRight size={17}/></Link>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot"/> SMART CIVIC REPORTING PLATFORM</div>
            <h1>Your City.<br/><span>Your Voice.</span><br/>Your Action.</h1>
            <p>Report potholes, garbage, streetlights and other civic issues in real time. CivicConnect connects citizens with municipal teams and helps close the loop faster.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/login">Report an Issue <ArrowRight size={18}/></Link>
              <Link className="btn btn-outline btn-lg" to="/login">Track a Report</Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="mini-map">
              <div className="map-grid"/>
              <span className="map-pin p1">!</span><span className="map-pin p2">!</span><span className="map-pin p3">!</span>
              <div className="map-overlay"><MapPinned size={18}/><div><b>1,248 issues</b><small>reported across Mumbai</small></div></div>
            </div>
          </div>
        </section>

        <section className="container feature-grid">
          {[
            [Camera, "Capture in seconds", "Photo, text, voice and automatic location tagging."],
            [Route, "Smart routing", "Automatically route issues to the relevant department."],
            [ShieldCheck, "Transparent tracking", "Citizens can follow every stage of resolution."],
            [BarChart3, "Actionable analytics", "Measure trends, response times and effectiveness."],
          ].map(([Icon, title, text]) => (
            <div className="feature-card" key={title}><Icon size={25}/><h3>{title}</h3><p>{text}</p></div>
          ))}
        </section>

        <section className="container impact">
          <div><b>1,248+</b><span>Issues Reported</span></div>
          <div><b>682</b><span>Issues Resolved</span></div>
          <div><b>87%</b><span>Resolution Rate</span></div>
          <div><b>4.2 hrs</b><span>Avg Response</span></div>
        </section>
      </main>
    </div>
  );
}

