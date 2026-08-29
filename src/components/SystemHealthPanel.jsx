import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Cpu, Wifi, WifiOff, RefreshCw, Server, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export const SystemHealthPanel = () => {
  const { devices, toggleDeviceStatus, syncStatus, lastSyncTime, triggerManualSync } = useAttendance();

  const onlineDevicesCount = devices.filter(d => d.status === 'online').length;

  return (
    <div className="nss-card" style={{ padding: "1.25rem 1.5rem" }}>
      
      {/* Panel Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2563EB"
          }}>
            <Cpu size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "var(--primary-900)" }}>
                System & Biometric Hardware Health
              </h3>
              <span className="badge badge-present" style={{ fontSize: "0.68rem" }}>
                {onlineDevicesCount} of {devices.length} Terminals Online
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Real-time terminal connectivity monitor & automated cloud sync status
            </p>
          </div>
        </div>

        {/* Sync Trigger Action */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
              Database Sync Status
            </span>
            <span style={{ fontSize: "0.78rem", fontWeight: "600", color: syncStatus === 'syncing' ? '#2563EB' : '#10B981' }}>
              {syncStatus === 'syncing' ? 'Syncing with Server...' : `Synced (${lastSyncTime})`}
            </span>
          </div>

          <button
            onClick={triggerManualSync}
            style={{
              padding: "0.5rem 0.85rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-strong)",
              background: "white",
              fontSize: "0.8rem",
              fontWeight: "600",
              color: "var(--primary-800)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "var(--shadow-subtle)"
            }}
          >
            <RefreshCw size={14} className={syncStatus === 'syncing' ? 'spin' : ''} color="#2563EB" /> Force Re-Sync
          </button>
        </div>
      </div>

      {/* Hardware Devices Cards Grid */}
      <div className="grid-4">
        {devices.map((device) => {
          const isOnline = device.status === 'online';
          return (
            <div
              key={device.id}
              style={{
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                border: isOnline ? "1px solid #A7F3D0" : "1px solid #FCA5A5",
                background: isOnline ? "#ECFDF5" : "#FEF2F2",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.75rem",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--primary-900)" }}>
                    {device.name}
                  </h4>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    {device.location}
                  </p>
                </div>

                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: isOnline ? "#D1FAE5" : "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {isOnline ? <Wifi size={16} color="#059669" /> : <WifiOff size={16} color="#DC2626" />}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", fontSize: "0.72rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Terminal ID:</span>
                  <span style={{ fontWeight: "600" }}>{device.id}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Scans Today:</span>
                  <span style={{ fontWeight: "600" }}>{device.scansToday}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Last Heartbeat:</span>
                  <span style={{ fontWeight: "500", color: isOnline ? "#047857" : "#B91C1C" }}>{device.lastPing}</span>
                </div>
              </div>

              {/* Status Toggle Button for Interactive Demo */}
              <button
                onClick={() => toggleDeviceStatus(device.id)}
                style={{
                  width: "100%",
                  padding: "0.35rem",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: isOnline ? "#FFFFFF" : "#FFFFFF",
                  color: isOnline ? "#DC2626" : "#059669",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-subtle)",
                  marginTop: "0.25rem"
                }}
              >
                {isOnline ? "Simulate Disconnect" : "Simulate Reconnect"}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
