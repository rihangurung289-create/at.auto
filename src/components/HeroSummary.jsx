import React, { useState, useEffect } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Sparkles, Calendar, Clock, Download, PlusCircle, TrendingUp, CheckCircle2 } from 'lucide-react';

export const HeroSummary = () => {
  const { user, attendanceRate, presentCount, totalStudentsCount } = useAttendance();
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="nss-card" style={{
      background: "linear-gradient(135deg, #0F2C59 0%, #1E3E62 60%, #0A192F 100%)",
      color: "white",
      padding: "1.75rem 2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Geometric Overlay */}
      <div style={{
        position: "absolute",
        right: "-20px",
        bottom: "-40px",
        width: "280px",
        height: "280px",
        background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(255,255,255,0) 70%)",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
        position: "relative",
        zIndex: 1
      }}>

        {/* Headline & Welcome Text */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{
              background: "rgba(255,255,255,0.12)",
              padding: "0.25rem 0.65rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#93C5FD",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem"
            }}>
              <Sparkles size={14} color="#60A5FA" /> Academic Year 2026 / 2027
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "#CBD5E1" }}>
              <Calendar size={14} /> {todayDate}
              <Clock size={14} style={{ marginLeft: "0.5rem" }} /> {timeString}
            </div>
          </div>

          <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "white", marginBottom: "0.35rem" }}>
            Welcome back, {user?.name || "Admin"}
          </h2>

          <p style={{ fontSize: "0.9rem", color: "#94A3B8", fontWeight: "400", maxWidth: "600px" }}>
            Real-time attendance insights powered by biometric recognition.
          </p>
        </div>

        {/* Headline Attendance Stat Block */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1.75rem",
          background: "rgba(255, 255, 255, 0.08)",
          padding: "1.25rem 1.75rem",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)"
        }}>
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#93C5FD", fontWeight: "600" }}>
              Today's Attendance Rate
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginTop: "0.2rem" }}>
              <span style={{ fontSize: "2.3rem", fontWeight: "800", color: "#FFFFFF", lineHeight: "1" }}>
                {attendanceRate}%
              </span>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#10B981",
                background: "rgba(16,185,129,0.15)",
                padding: "0.2rem 0.5rem",
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}>
                <TrendingUp size={12} /> +2.4% vs yesterday
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#CBD5E1", marginTop: "0.35rem" }}>
              {presentCount} of {totalStudentsCount} students checked in
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button
              onClick={() => alert("Generating official NSS Daily Attendance Report (PDF)...")}
              style={{
                padding: "0.55rem 0.95rem",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: "#2563EB",
                color: "white",
                fontSize: "0.8rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                boxShadow: "0 4px 10px rgba(37,99,235,0.3)"
              }}
            >
              <Download size={14} /> Export Report
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
