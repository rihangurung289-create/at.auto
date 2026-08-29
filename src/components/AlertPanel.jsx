import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { AlertOctagon, AlertTriangle, Info, Check, Eye, ShieldAlert, X } from 'lucide-react';

export const AlertPanel = () => {
  const { alerts, dismissAlert, setSelectedAlert } = useAttendance();

  if (alerts.length === 0) {
    return (
      <div className="nss-card" style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldAlert size={20} color="#10B981" />
          </div>
          <div>
            <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--primary-900)" }}>All Systems & Security Clear</h4>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>No unknown faces or low-confidence match alerts flagged.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nss-card" style={{ padding: "1.25rem 1.5rem" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#EF4444"
          }}>
            <AlertOctagon size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--primary-900)" }}>
                Security & Anomaly Alerts
              </h3>
              <span className="badge badge-absent" style={{ fontSize: "0.68rem" }}>
                {alerts.length} Action Required
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Automated flags for unrecognized faces, low confidence matches (&lt;75%), or terminal offline warnings
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {alerts.map((alert) => {
          const isError = alert.severity === 'error';
          const isWarning = alert.severity === 'warning';

          return (
            <div
              key={alert.id}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                border: isError ? "1px solid #FCA5A5" : isWarning ? "1px solid #FDBA74" : "1px solid #93C5FD",
                background: isError ? "#FEF2F2" : isWarning ? "#FFFBEB" : "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", flex: 1, minWidth: "260px" }}>
                <div style={{ marginTop: "0.15rem" }}>
                  {isError && <AlertOctagon size={20} color="#DC2626" />}
                  {isWarning && <AlertTriangle size={20} color="#D97706" />}
                  {!isError && !isWarning && <Info size={20} color="#2563EB" />}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h4 style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--primary-900)" }}>
                      {alert.title}
                    </h4>
                    <span style={{ fontSize: "0.68rem", fontWeight: "600", padding: "0.15rem 0.45rem", borderRadius: "4px", background: "white", color: "#475569", border: "1px solid #E2E8F0" }}>
                      {alert.timestamp}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.78rem", color: "#334155", marginTop: "0.2rem" }}>
                    {alert.description}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.4rem", fontSize: "0.72rem", color: "#64748B" }}>
                    <span>Location: <strong>{alert.location}</strong></span>
                    {alert.confidence && <span>Match Score: <strong style={{ color: "#DC2626" }}>{alert.confidence}%</strong></span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  onClick={() => setSelectedAlert(alert)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-strong)",
                    background: "white",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "var(--primary-900)",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem"
                  }}
                >
                  <Eye size={13} /> Investigate
                </button>

                <button
                  onClick={() => dismissAlert(alert.id)}
                  title="Dismiss Alert"
                  style={{
                    padding: "0.4rem 0.6rem",
                    borderRadius: "var(--radius-sm)",
                    border: "none",
                    background: "rgba(0,0,0,0.06)",
                    color: "#475569",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  <Check size={14} /> Dismiss
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
