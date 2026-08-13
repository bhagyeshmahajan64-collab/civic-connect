import React from "react";
import Navbar from "../components/Navbar";
import { getIssues } from "../data/mockIssues";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function Analytics() {
  const issues = getIssues();

  const categories = [
    "Pothole",
    "Garbage",
    "Streetlight",
    "Water Leakage",
    "Traffic Signal",
  ];

  const categoryData = categories.map((name) => ({
    name,
    reports: issues.filter(
      (issue) => issue.category === name
    ).length,
  }));

  const statusNames = [
    "Resolved",
    "In Progress",
    "Acknowledged",
    "Submitted",
    "Assigned",
  ];

  const pie = statusNames.map((name) => ({
    name,
    value: issues.filter(
      (issue) => issue.status === name
    ).length,
  }));

  const total = issues.length;

  const resolved =
    issues.filter(
      (issue) => issue.status === "Resolved"
    ).length;

  const resolvedPercentage =
    total > 0
      ? Math.round((resolved / total) * 100)
      : 0;

  const departmentNames = [
    "Public Works",
    "Sanitation",
    "Electrical Department",
    "Water & Drainage",
    "Traffic Department",
  ];

  const deptData = departmentNames.map(
    (name) => ({
      name,
      reports: issues.filter(
        (issue) => issue.department === name
      ).length,
    })
  );

  /*
   * Build a simple trend from actual submitted reports.
   * With zero reports, the chart remains empty.
   */
  const lastSevenDays = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(
      date.getDate() - i
    );

    const dateString =
      date.toISOString().split("T")[0];

    const count = issues.filter(
      (issue) =>
        issue.createdAt?.startsWith(
          dateString
        )
    ).length;

    lastSevenDays.push({
      day: date.toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
        }
      ),
      reports: count,
    });
  }

  return (
    <>
      <Navbar role="admin" />

      <main className="container page">

        <div className="page-heading">

          <div className="eyebrow">
            INSIGHTS & ACCOUNTABILITY
          </div>

          <h1>
            Analytics & Reporting
          </h1>

          <p>
            Understand reporting trends,
            response times and overall
            system effectiveness.
          </p>

        </div>

        <div className="analytics-grid">

          {/* Reporting Trends */}
          <div className="chart-card wide">

            <h2>Reporting Trends</h2>

            <p>
              Community reports over the
              last 7 days
            </p>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <LineChart
                data={lastSevenDays}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="day" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* Resolution Status */}
          <div className="chart-card">

            <h2>Resolution Status</h2>

            <p>
              Current issue distribution
            </p>

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <PieChart>

                <Pie
                  data={pie.filter(
                    (item) =>
                      item.value > 0
                  )}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >

                  {pie
                    .filter(
                      (item) =>
                        item.value > 0
                    )
                    .map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            [
                              "#22c55e",
                              "#2563eb",
                              "#f59e0b",
                              "#94a3b8",
                              "#8b5cf6",
                            ][index]
                          }
                        />
                      )
                    )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

            <div className="chart-center">

              {resolvedPercentage}%

              <small>
                resolved
              </small>

            </div>

          </div>

          {/* Category */}
          <div className="chart-card">

            <h2>
              Reports by Category
            </h2>

            <p>
              Most frequently reported issues
            </p>

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <BarChart
                data={categoryData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 11,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="reports"
                  fill="#2563eb"
                  radius={[
                    5,
                    5,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Department */}
          <div className="chart-card wide">

            <h2>
              Department Report Volume
            </h2>

            <p>
              Reports routed to each department
            </p>

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <BarChart
                data={deptData}
                layout="vertical"
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={140}
                />

                <Tooltip />

                <Bar
                  dataKey="reports"
                  fill="#111827"
                  radius={[
                    0,
                    5,
                    5,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </main>
    </>
  );
}
