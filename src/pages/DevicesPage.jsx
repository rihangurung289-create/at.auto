import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../theme/tokens';
import { HARDWARE_DEVICES } from '../data/mockData';
import { Cpu, Wifi, WifiOff, RefreshCw, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export const DevicesPage = () => {
  const [devices, setDevices] = useState(HARDWARE_DEVICES);
  const [pingStatus, setPingStatus] = useState({});

  const handleTestPing = (deviceId) => {
    setPingStatus(prev => ({ ...prev, [deviceId]: 'testing' }));

    setTimeout(() => {
      setPingStatus(prev => ({
        ...prev,
        [deviceId]: {
          latency: `${Math.floor(18 + Math.random() * 25)}ms`,
          status: 'ok',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
      }));
    }, 600);
  };

  const handleToggleDeviceStatus = (deviceId) => {
    setDevices(prev =>
      prev.map(d => {
        if (d.id === deviceId) {
          const nextStatus = d.status === 'online' ? 'offline' : 'online';
          return { ...d, status: nextStatus, lastPing: nextStatus === 'online' ? 'Just now' : 'Manual offline' };
        }
        return d;
      })
    );
  };

  const onlineCount = devices.filter(d => d.status === 'online').length;
  const totalScans = devices.reduce((sum, d) => sum + (d.scansToday || 0), 0);

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontFamily: fonts.headline, fontSize: "1.35rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
            Gate Terminals & Biometric Hardware
          </h2>
          <p style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: colors.sub, margin: "2px 0 0 0" }}>
            Campus entrance cameras, attendance kiosks, network latency, and device telemetry
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 999,
              backgroundColor: colors.emeraldLight,
              color: colors.emeraldDark,
              fontFamily: fonts.body,
              fontSize: "0.78rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <CheckCircle size={14} /> {onlineCount} of {devices.length} Units Operational
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem"
        }}
      >
        <div style={{ ...cardBase, padding: "1.1rem 1.25rem", borderLeft: `4px solid ${colors.emerald}` }}>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 700, color: colors.sub, textTransform: "uppercase" }}>
            Active Terminals
          </span>
          <div style={{ fontFamily: fonts.headline, fontSize: "1.5rem", fontWeight: 700, color: colors.navy }}>
            {onlineCount} / {devices.length}
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.emeraldDark, fontWeight: 600 }}>
            West, East & Science gates
          </span>
        </div>

        <div style={{ ...cardBase, padding: "1.1rem 1.25rem", borderLeft: `4px solid ${colors.sapphire}` }}>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 700, color: colors.sub, textTransform: "uppercase" }}>
            Total Scans Logged Today
          </span>
          <div style={{ fontFamily: fonts.headline, fontSize: "1.5rem", fontWeight: 700, color: colors.navy }}>
            {totalScans.toLocaleString()}
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
            Zero data loss buffer
          </span>
        </div>

        <div style={{ ...cardBase, padding: "1.1rem 1.25rem", borderLeft: `4px solid ${colors.amber}` }}>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 700, color: colors.sub, textTransform: "uppercase" }}>
            Network Protocol
          </span>
          <div style={{ fontFamily: fonts.headline, fontSize: "1.5rem", fontWeight: 700, color: colors.navy }}>
            TLS 1.3 / WPA3
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
            Encrypted biometric handshake
          </span>
        </div>
      </div>

      {/* Terminal Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem"
        }}
      >
        {devices.map((device) => {
          const isOnline = device.status === 'online';
          const ping = pingStatus[device.id];

          return (
            <div
              key={device.id}
              style={{
                ...cardBase,
                padding: "1.35rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderTop: `4px solid ${isOnline ? colors.emerald : colors.coral}`,
                gap: "1rem"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        backgroundColor: isOnline ? colors.emeraldLight : colors.coralLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Cpu size={20} color={isOnline ? colors.emeraldDark : colors.coralDark} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: fonts.headline, fontSize: "1rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
                        {device.name}
                      </h4>
                      <span style={{ fontFamily: fonts.mono, fontSize: "0.72rem", color: colors.sub }}>
                        {device.id} • {device.ipAddress}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "2px 8px",
                      borderRadius: 999,
                      backgroundColor: isOnline ? colors.emeraldLight : colors.coralLight,
                      color: isOnline ? colors.emeraldDark : colors.coralDark,
                      fontFamily: fonts.body,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase"
                    }}
                  >
                    {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
                    {device.status}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.8rem", color: colors.slate, padding: "0.75rem 0", borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: colors.sub }}>Location:</span>
                    <strong style={{ color: colors.navy }}>{device.location}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: colors.sub }}>Terminal Hardware:</span>
                    <span>{device.type}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: colors.sub }}>Today's Successful Scans:</span>
                    <strong style={{ color: colors.emeraldDark }}>{device.scansToday}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: colors.sub }}>Last Ping Check:</span>
                    <span>{device.lastPing}</span>
                  </div>
                </div>

                {/* Ping Result if tested */}
                {ping && (
                  <div
                    style={{
                      marginTop: "0.75rem",
                      padding: "0.5rem 0.75rem",
                      borderRadius: 6,
                      backgroundColor: colors.cardSubtle,
                      border: `1px solid ${colors.border}`,
                      fontSize: "0.75rem",
                      fontFamily: fonts.mono,
                      color: colors.slate
                    }}
                  >
                    {ping === 'testing' ? (
                      <span>Testing network handshake...</span>
                    ) : (
                      <span>Latency: <strong style={{ color: colors.emeraldDark }}>{ping.latency}</strong> • Ping OK at {ping.timestamp}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginTop: "0.5rem" }}>
                <button
                  onClick={() => handleTestPing(device.id)}
                  style={{
                    padding: "0.45rem",
                    borderRadius: 6,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.card,
                    color: colors.navy,
                    fontFamily: fonts.body,
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px"
                  }}
                >
                  <Activity size={13} color={colors.sapphire} />
                  Ping Test
                </button>

                <button
                  onClick={() => handleToggleDeviceStatus(device.id)}
                  style={{
                    padding: "0.45rem",
                    borderRadius: 6,
                    border: `1px solid ${isOnline ? colors.coralBorder : colors.emeraldBorder}`,
                    backgroundColor: isOnline ? colors.coralLight : colors.emeraldLight,
                    color: isOnline ? colors.coralDark : colors.emeraldDark,
                    fontFamily: fonts.body,
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {isOnline ? "Simulate Offline" : "Restore Online"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
