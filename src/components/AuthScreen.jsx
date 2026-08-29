import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { ShieldCheck, Lock, UserCheck, Scan, Sparkles, Key, AlertCircle } from 'lucide-react';

export const AuthScreen = () => {
  const { login } = useAttendance();
  const [selectedRole, setSelectedRole] = useState("Principal / Admin");
  const [email, setEmail] = useState("admin@nss.edu.np");
  const [password, setPassword] = useState("••••••••••••");
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(selectedRole);
  };

  const triggerBiometricScan = () => {
    setIsScanning(true);
    setScanMessage("Initializing Biometric Camera Scanner...");
    setTimeout(() => setScanMessage("Detecting Facial Coordinates..."), 1000);
    setTimeout(() => setScanMessage("Matching Template against NSS Faculty Database (99.4% Match)..."), 2200);
    setTimeout(() => {
      setIsScanning(false);
      login("Principal / Admin");
    }, 3200);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at 50% 20%, #0F2C59 0%, #0A192F 100%)",
      padding: "1.5rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Subtle Background Glow Accent */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0) 70%)",
        top: "-100px",
        right: "-100px",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />

      <div style={{
        width: "100%",
        maxWidth: "460px",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        zIndex: 1
      }}>

        {/* Brand Header */}
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #2563EB 0%, #0F2C59 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
            marginBottom: "1rem"
          }}>
            <ShieldCheck size={36} color="#FFFFFF" />
          </div>
          <h1 style={{ fontSize: "1.65rem", fontWeight: "700", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            National School of Sciences
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#94A3B8", marginTop: "0.25rem" }}>
            Smart Attendance Intelligence Portal
          </p>
        </div>

        {/* Auth Box */}
        <div style={{
          background: "rgba(255, 255, 255, 0.98)",
          borderRadius: "20px",
          padding: "2.25rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}>
          {/* Simulated Facial Scanner Overlay if Active */}
          {isScanning ? (
            <div style={{
              textAlign: "center",
              padding: "2rem 1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem"
            }}>
              <div style={{
                position: "relative",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "rgba(37,99,235,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #2563EB",
                animation: "pulse 1.5s infinite"
              }}>
                <Scan size={44} color="#2563EB" />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#0F2C59" }}>Facial Recognition Demo</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", marginTop: "0.35rem" }}>{scanMessage}</p>
              </div>
              <div className="confidence-bar-track" style={{ width: "80%", height: "6px", marginTop: "0.5rem" }}>
                <div className="confidence-bar-fill confidence-high" style={{ width: "88%", animation: "shimmer 1s infinite" }} />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Role Selection Tabs */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: "600", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>
                  Select Portal Role
                </label>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.5rem",
                  background: "#F1F5F9",
                  padding: "4px",
                  borderRadius: "10px"
                }}>
                  {["Principal / Admin", "Dept Head", "Teacher"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role);
                        setEmail(role === "Teacher" ? "teacher@nss.edu.np" : "admin@nss.edu.np");
                      }}
                      style={{
                        padding: "0.5rem 0.25rem",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: selectedRole === role ? "#0F2C59" : "transparent",
                        color: selectedRole === role ? "#FFFFFF" : "#64748B",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1E293B", display: "block", marginBottom: "0.4rem" }}>
                  Official Email / Admin ID
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.85rem 0.75rem 2.5rem",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      fontSize: "0.9rem",
                      color: "#0F172A"
                    }}
                  />
                  <UserCheck size={18} color="#64748B" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1E293B", display: "block", marginBottom: "0.4rem" }}>
                  Security Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.85rem 0.75rem 2.5rem",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      fontSize: "0.9rem",
                      color: "#0F172A"
                    }}
                  />
                  <Lock size={18} color="#64748B" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
                </div>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #0F2C59 0%, #1E3E62 100%)",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(15, 44, 89, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem"
                }}
              >
                <Key size={18} /> Enter Intelligence Dashboard
              </button>

              {/* Alternative Biometric Face Login Quick Access */}
              <div style={{ textAlign: "center", margin: "0.5rem 0" }}>
                <span style={{ fontSize: "0.75rem", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Or Use Facial Recognition Pass
                </span>
              </div>

              <button
                type="button"
                onClick={triggerBiometricScan}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "10px",
                  border: "1px solid #2563EB",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                <Scan size={18} /> Quick Face ID Sign In (Demo)
              </button>
            </form>
          )}
        </div>

        {/* Academic Project Honesty Disclaimer */}
        <div style={{
          background: "rgba(15, 44, 89, 0.6)",
          borderRadius: "12px",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#E2E8F0",
          fontSize: "0.75rem"
        }}>
          <Sparkles size={20} color="#60A5FA" style={{ flexShrink: 0 }} />
          <span>
            <strong>National School of Sciences (NSS) Project</strong> — Biometric attendance simulation demo for academic presentation.
          </span>
        </div>

      </div>
    </div>
  );
};
