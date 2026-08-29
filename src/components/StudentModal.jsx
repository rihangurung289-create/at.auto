import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { X, CheckCircle, XCircle, Clock, Shield, Calendar, User, Camera } from 'lucide-react';

export const StudentModal = () => {
  const { selectedStudent, setSelectedStudent, overrideAttendance } = useAttendance();

  if (!selectedStudent) return null;

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
        maxWidth: "520px",
        padding: "1.75rem",
        boxShadow: "var(--shadow-modal)",
        position: "relative"
      }}>
        {/* Close Button */}
        <button
          onClick={() => setSelectedStudent(null)}
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

        {/* Profile Card Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <img
            src={selectedStudent.avatar}
            alt={selectedStudent.name}
            style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "3px solid #2563EB" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--primary-900)" }}>
                {selectedStudent.name}
              </h3>
              <span className={`badge ${
                selectedStudent.status === 'present' ? 'badge-present' : selectedStudent.status === 'absent' ? 'badge-absent' : 'badge-late'
              }`}>
                {selectedStudent.status}
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
              {selectedStudent.id} • Roll #{selectedStudent.rollNo} • {selectedStudent.classSection}
            </p>
          </div>
        </div>

        {/* Biometric Status Summary */}
        <div style={{
          background: "#F8FAFC",
          padding: "1rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-subtle)",
          marginBottom: "1.25rem"
        }}>
          <h4 style={{ fontSize: "0.8rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Biometric Facial Verification Data
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.8rem" }}>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Today's Check-in:</span>
              <strong style={{ color: "var(--primary-900)" }}>{selectedStudent.timestamp}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>AI Match Confidence:</span>
              <strong style={{ color: "#059669" }}>{selectedStudent.confidence}% Match</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Terminal Terminal:</span>
              <strong style={{ color: "var(--primary-900)" }}>{selectedStudent.device}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Biometric Template:</span>
              <strong style={{ color: "#2563EB" }}>Registered (512d)</strong>
            </div>
          </div>
        </div>

        {/* Attendance History Timeline */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-900)", marginBottom: "0.65rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Calendar size={16} color="#2563EB" /> Recent Attendance History
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {selectedStudent.history?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  background: "white",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.78rem"
                }}
              >
                <span style={{ fontWeight: "600", color: "var(--primary-900)" }}>{item.date}</span>
                <span style={{ color: "var(--text-muted)" }}>{item.time}</span>
                <span className={`badge ${
                  item.status === 'present' ? 'badge-present' : item.status === 'absent' ? 'badge-absent' : 'badge-late'
                }`} style={{ fontSize: "0.68rem" }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Override Action Buttons */}
        <div>
          <h4 style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            Admin Manual Override:
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            <button
              onClick={() => overrideAttendance(selectedStudent.id, 'present')}
              style={{
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #A7F3D0",
                background: "#ECFDF5",
                color: "#065F46",
                fontWeight: "600",
                fontSize: "0.75rem",
                cursor: "pointer"
              }}
            >
              Set Present
            </button>
            <button
              onClick={() => overrideAttendance(selectedStudent.id, 'late')}
              style={{
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #FDBA74",
                background: "#FFF7ED",
                color: "#9A3412",
                fontWeight: "600",
                fontSize: "0.75rem",
                cursor: "pointer"
              }}
            >
              Set Late
            </button>
            <button
              onClick={() => overrideAttendance(selectedStudent.id, 'absent')}
              style={{
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #FCA5A5",
                background: "#FEF2F2",
                color: "#991B1B",
                fontWeight: "600",
                fontSize: "0.75rem",
                cursor: "pointer"
              }}
            >
              Set Absent
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
