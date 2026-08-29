import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { X, AlertTriangle, ShieldCheck, UserPlus, EyeOff } from 'lucide-react';

export const AlertModal = () => {
  const { selectedAlert, setSelectedAlert, dismissAlert } = useAttendance();

  if (!selectedAlert) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 300,
      backgroundColor: "rgba(15, 23, 42, 0.65)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div className="nss-card" style={{
        width: "100%",
        maxWidth: "480px",
        padding: "1.75rem",
        boxShadow: "var(--shadow-modal)",
        position: "relative"
      }}>
        {/* Close Button */}
        <button
          onClick={() => setSelectedAlert(null)}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "#F1F5F9",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <X size={18} color="#64748B" />
        </button>

        {/* Modal Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <AlertTriangle size={24} color={selectedAlert.severity === 'error' ? '#DC2626' : '#D97706'} />
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--primary-900)" }}>
              {selectedAlert.title}
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Alert ID: {selectedAlert.id} • {selectedAlert.timestamp}
            </span>
          </div>
        </div>

        {/* Snapshot Preview if Available */}
        {selectedAlert.snapshotUrl && (
          <div style={{ position: "relative", marginBottom: "1.25rem", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-strong)" }}>
            <img
              src={selectedAlert.snapshotUrl}
              alt="Camera Snapshot"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute",
              bottom: 0,
              insetX: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              padding: "0.75rem",
              color: "white",
              fontSize: "0.75rem"
            }}>
              Camera Feed Snapshot: {selectedAlert.location}
            </div>
          </div>
        )}

        {/* Description & Metadata */}
        <div style={{ background: "#F8FAFC", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.82rem" }}>
          <p style={{ color: "#334155", marginBottom: "0.5rem" }}>
            {selectedAlert.description}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B", fontSize: "0.75rem" }}>
            <span>Location: <strong>{selectedAlert.location}</strong></span>
            {selectedAlert.confidence && (
              <span>Confidence: <strong style={{ color: "#DC2626" }}>{selectedAlert.confidence}%</strong></span>
            )}
          </div>
        </div>

        {/* Resolution Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button
            onClick={() => {
              alert("Opening NSS Student Enrollment Portal to register face template...");
              dismissAlert(selectedAlert.id);
            }}
            style={{
              padding: "0.65rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: "#2563EB",
              color: "white",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem"
            }}
          >
            <UserPlus size={16} /> Register Face Template to Student Profile
          </button>

          <button
            onClick={() => dismissAlert(selectedAlert.id)}
            style={{
              padding: "0.65rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-strong)",
              background: "white",
              color: "#475569",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem"
            }}
          >
            <EyeOff size={16} /> Dismiss Warning
          </button>
        </div>

      </div>
    </div>
  );
};
