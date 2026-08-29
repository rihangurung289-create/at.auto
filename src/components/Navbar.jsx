import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Shield, Search, Bell, Activity, LogOut, Radio, User, ChevronDown, RefreshCw, AlertTriangle } from 'lucide-react';

export const Navbar = () => {
  const {
    user,
    logout,
    searchQuery,
    setSearchQuery,
    isSimulationActive,
    toggleSimulation,
    syncStatus,
    lastSyncTime,
    triggerManualSync,
    alerts,
    setSelectedAlert
  } = useAttendance();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="glass-panel" style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid var(--border-subtle)",
      padding: "0.75rem 1.5rem"
    }}>
      <div style={{
        maxWidth: "1440px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem"
      }}>

        {/* Brand Block */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #0F2C59 0%, #2563EB 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 10px rgba(15, 44, 89, 0.25)"
          }}>
            <Shield size={24} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h1 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--primary-900)", lineHeight: "1.2" }}>
                National School of Sciences
              </h1>
              <span className="badge badge-simulated" style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem" }}>
                Biometric AI
              </span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>
              Smart Attendance Intelligence
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: "420px", position: "relative" }}>
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search student by name, ID (e.g. NSS-2024-001) or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem 1rem 0.6rem 2.6rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-strong)",
              backgroundColor: "var(--bg-subtle)",
              fontSize: "0.85rem",
              color: "var(--text-main)",
              transition: "var(--transition-fast)"
            }}
          />
        </div>

        {/* Right Action Tools */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          
          {/* Live Simulation Engine Toggle Button */}
          <button
            onClick={toggleSimulation}
            title="Toggle simulated live biometric face scan events stream"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-full)",
              border: isSimulationActive ? "1px solid #93C5FD" : "1px solid var(--border-strong)",
              background: isSimulationActive ? "#EFF6FF" : "var(--bg-subtle)",
              color: isSimulationActive ? "#1D4ED8" : "var(--text-muted)",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "var(--transition-fast)"
            }}
          >
            <Radio size={15} color={isSimulationActive ? "#2563EB" : "#94A3B8"} className={isSimulationActive ? "animate-pulse" : ""} />
            <span>{isSimulationActive ? "Simulated Live Stream: ON" : "Simulation Paused"}</span>
          </button>

          {/* Sync Status Badge */}
          <button
            onClick={triggerManualSync}
            title={`Last synchronized: ${lastSyncTime}. Click to force sync.`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.75rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid #E2E8F0",
              background: "white",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            <RefreshCw size={13} className={syncStatus === "syncing" ? "spin" : ""} color="#2563EB" />
            <span style={{ fontWeight: "500" }}>
              {syncStatus === "syncing" ? "Syncing..." : lastSyncTime}
            </span>
          </button>

          {/* Notifications Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: "relative",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1px solid var(--border-subtle)",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "var(--transition-fast)"
              }}
            >
              <Bell size={18} color="var(--primary-800)" />
              {alerts.length > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "var(--status-absent)",
                  color: "white",
                  fontSize: "0.65rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid white"
                }}>
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            {showNotifications && (
              <div className="nss-card" style={{
                position: "absolute",
                right: 0,
                top: "48px",
                width: "320px",
                padding: "0.85rem",
                zIndex: 200,
                boxShadow: "var(--shadow-modal)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: "700" }}>System Security Alerts</h4>
                  <span className="badge badge-absent" style={{ fontSize: "0.65rem" }}>{alerts.length} Active</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "240px", overflowY: "auto" }}>
                  {alerts.length === 0 ? (
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", padding: "1rem" }}>No active security alerts.</p>
                  ) : (
                    alerts.map((alt) => (
                      <div
                        key={alt.id}
                        onClick={() => { setSelectedAlert(alt); setShowNotifications(false); }}
                        style={{
                          padding: "0.6rem",
                          borderRadius: "var(--radius-sm)",
                          background: alt.severity === 'warning' ? '#FFFBEB' : alt.severity === 'error' ? '#FEF2F2' : '#EFF6FF',
                          border: "1px solid #E2E8F0",
                          cursor: "pointer"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                          <AlertTriangle size={14} color={alt.severity === 'warning' ? '#D97706' : '#DC2626'} />
                          <span style={{ fontSize: "0.78rem", fontWeight: "600", color: "var(--primary-900)" }}>{alt.title}</span>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{alt.description}</p>
                        <span style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: "0.2rem", display: "block" }}>{alt.timestamp} • {alt.location}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
                borderRadius: "var(--radius-md)"
              }}
            >
              <img
                src={user?.avatar}
                alt="Profile"
                style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary-600)" }}
              />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--primary-900)", lineHeight: "1.2" }}>{user?.name}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{user?.role}</p>
              </div>
              <ChevronDown size={16} color="var(--text-muted)" />
            </button>

            {showProfileMenu && (
              <div className="nss-card" style={{
                position: "absolute",
                right: 0,
                top: "48px",
                width: "200px",
                padding: "0.5rem",
                zIndex: 200,
                boxShadow: "var(--shadow-modal)"
              }}>
                <div style={{ padding: "0.5rem", borderBottom: "1px solid var(--border-subtle)" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Signed in as</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--primary-900)", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem",
                    border: "none",
                    background: "transparent",
                    color: "var(--status-absent)",
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    borderRadius: "var(--radius-sm)",
                    marginTop: "0.25rem"
                  }}
                >
                  <LogOut size={16} /> Sign Out of Portal
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
