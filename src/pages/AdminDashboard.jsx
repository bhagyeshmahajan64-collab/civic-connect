import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import MapView from "../components/MapView";
import IssueCard from "../components/IssueCard";
import { getIssues } from "../data/mockIssues";
import { ArrowRight, Activity, Timer, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const issues = getIssues();

  const active = issues.filter(
    (issue) => issue.status !== "Resolved"
  );

  const high = issues.filter(
    (issue) => issue.priority === "HIGH"
  );

  const resolved = issues.filter(
    (issue) => issue.status === "Resolved"
  );

  const resolutionRate =
    issues.length > 0
      ? Math.round((resolved.length / issues.length) * 100)
      : 0;

  return (
    <>
      <Navbar role="admin" />

      <main className="container page">

        {/* Header */}
        <section className="welcome-row">
          <div>
            <div className="eyebrow">
              MUNICIPAL COMMAND CENTER
            </div>

            <h1>Civic Operations Dashboard</h1>

            <p>
              Monitor, prioritize and resolve
              community-reported issues.
            </p>
          </div>

          <Link
            className="btn btn-primary"
            to="/admin/issues"
          >
            Manage Issues
            <ArrowRight size={17} />
          </Link>
        </section>

        {/* Statistics */}
        <section className="stats-grid">

          <StatCard
            label="Total Reports"
            value={issues.length}
            type="reports"
            subtext="Live reports"
          />

          <StatCard
            label="Pending / Active"
            value={active.length}
            type="pending"
            subtext={`${high.length} high priority`}
          />

          <StatCard
            label="Resolved"
            value={resolved.length}
            type="resolved"
            subtext={`${resolutionRate}% resolution rate`}
          />

          <StatCard
            label="High Priority"
            value={high.length}
            type="high"
            subtext="Requires attention"
          />

        </section>

        {/* Map + Priority Queue */}
        <div className="dashboard-grid">

          <div className="panel map-panel">

            <div className="panel-header">

              <div>
                <h2>Live Issue Map</h2>
                <p>
                  Real-time community reports
                </p>
              </div>

              <span className="live-chip">
                <span />
                LIVE
              </span>

            </div>

            <MapView
              issues={issues}
              height={450}
            />

          </div>

          <div className="panel">

            <div className="panel-header">

              <div>
                <h2>Priority Queue</h2>

                <p>
                  Issues requiring attention
                </p>
              </div>

              <Link
                to="/admin/issues"
                className="text-link"
              >
                View all
              </Link>

            </div>

            <div className="mini-issues">

              {high.length === 0 ? (

                <div className="empty-state">
                  <h3>No high-priority issues</h3>

                  <p>
                    High-priority reports will appear here
                    when citizens submit them.
                  </p>
                </div>

              ) : (

                high
                  .slice(0, 4)
                  .map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onClick={() =>
                        window.location.href =
                          `/issue/${issue.id}`
                      }
                    />
                  ))

              )}

            </div>

          </div>

        </div>

        {/* Quick metrics */}
        <div className="quick-metrics">

          <div>
            <Activity size={20} />

            <span>
              <b>{issues.length}</b>
              <small>
                Total community reports
              </small>
            </span>
          </div>

          <div>
            <Timer size={20} />

            <span>
              <b>
                {issues.length === 0
                  ? "—"
                  : "Tracking"}
              </b>

              <small>
                Response monitoring
              </small>
            </span>
          </div>

          <div>
            <Users size={20} />

            <span>
              <b>Demo</b>

              <small>
                Municipal staff management
              </small>
            </span>
          </div>

          <div>
            <TrendingUp size={20} />

            <span>
              <b>
                {resolutionRate}%
              </b>

              <small>
                Resolution efficiency
              </small>
            </span>
          </div>

        </div>

      </main>
    </>
  );
}