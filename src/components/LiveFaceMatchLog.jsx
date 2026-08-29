import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Scan, Radio, ShieldCheck, Camera, Sparkles, CheckCircle2 } from 'lucide-react';

export const LiveFaceMatchLog = () => {
  const { liveMatches, isSimulationActive, toggleSimulation } = useAttendance();

  return (
    <div className="nss-card" style={{ padding: "1.25rem 1.5rem" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #0F2C59 0%, #2563EB 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}>
            <Scan size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--primary-900)" }}>
                Live Biometric Face Scan Log
              </h3>
              {isSimulationActive && (
                <span className="badge badge-present" style={{ fontSize: "0.68rem" }}>
                  <span className="pulse-dot" /> Streaming Real-time
                </span>
              )}
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              AI recognition match events surfaced instantly from biometric hardware terminals
            </span>
          </div>
        </div>

        {/* Live Simulation Indicator & Toggle */}
        <button
          onClick={toggleSimulation}
          style={{
            fontSize: "0.75rem",
            fontWeight: "600",
            padding: "0.35rem 0.75rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-strong)",
            background: isSimulationActive ? "#EFF6FF" : "var(--bg-subtle)",
            color: isSimulationActive ? "#2563EB" : "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem"
          }}
        >
          <Radio size={14} className={isSimulationActive ? "animate-pulse" : ""} />
          {isSimulationActive ? "Simulation Stream Active" : "Stream Paused"}
        </button>
      </div>

      {/* Live Match Feed Grid / Stream */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        maxHeight: "360px",
        overflowY: "auto",
        paddingRight: "0.25rem"
      }}>
        {liveMatches.map((match, idx) => {
          const isHighConfidence = match.confidence >= 95;
          const isMediumConfidence = match.confidence >= 85 && match.confidence < 95;

          return (
            <div
              key={match.id}
              className={`animate-slide-in ${idx === 0 ? 'glass-panel' : ''}`}
              style={{
                padding: "0.9rem",
                borderRadius: "var(--radius-md)",
                border: idx === 0 ? "1px solid #93C5FD" : "1px solid var(--border-subtle)",
                background: idx === 0 ? "#F8FAFC" : "white",
                boxShadow: idx === 0 ? "0 4px 12px rgba(37,99,235,0.08)" : "none",
                display: "flex",
                gap: "0.85rem",
                alignItems: "center",
                position: "relative"
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <img
                  src={match.avatar}
                  alt={match.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #2563EB"
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: match.status === 'present' ? "#10B981" : "#F97316",
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <CheckCircle2 size={10} color="white" />
                </div>
              </div>

              {/* Match Details */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--primary-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {match.name}
                  </h4>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: "500" }}>
                    {match.timestamp}
                  </span>
                </div>

                <p style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
                  {match.studentId} • {match.classSection}
                </p>

                {/* AI Confidence Score Indicator */}
                <div className="confidence-bar-wrapper">
                  <div className="confidence-bar-track">
                    <div
                      className={`confidence-bar-fill ${
                        isHighConfidence ? 'confidence-high' : isMediumConfidence ? 'confidence-medium' : 'confidence-low'
                      }`}
                      style={{ width: `${match.confidence}%` }}
                    />
                  </div>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: "700",
                    color: isHighConfidence ? "#065F46" : isMediumConfidence ? "#92400E" : "#991B1B"
                  }}>
                    {match.confidence}% Match
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.3rem", fontSize: "0.68rem", color: "#64748B" }}>
                  <Camera size={11} /> {match.device}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
