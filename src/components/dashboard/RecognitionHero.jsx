import React, { useState, useEffect } from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';
import { ConfidenceRing } from './ConfidenceRing';
import { Camera, CheckCircle2, Play, Pause, RefreshCw } from 'lucide-react';

export const RecognitionHero = ({
  events = [],
  onSimulateScan,
  isLive = true,
  onToggleLive,
  onSelectStudent
}) => {
  const [flash, setFlash] = useState(false);
  const latestEvent = events.length > 0 ? events[0] : null;
  const tickerEvents = events.length > 1 ? events.slice(1, 5) : [];

  // Trigger flash animation when latestEvent changes
  useEffect(() => {
    if (!latestEvent) return;
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 500);
    return () => clearTimeout(timer);
  }, [latestEvent?.id, latestEvent?.time]);

  return (
    <div
      style={{
        ...cardBase,
        height: "100%",
        padding: "1.25rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        minHeight: 280
      }}
    >
      {/* 4 Camera-Viewfinder Corner Brackets */}
      <div style={{ position: "absolute", top: 12, left: 12, width: 16, height: 16, borderTop: "2px solid rgba(23,40,74,0.3)", borderLeft: "2px solid rgba(23,40,74,0.3)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 12, right: 12, width: 16, height: 16, borderTop: "2px solid rgba(23,40,74,0.3)", borderRight: "2px solid rgba(23,40,74,0.3)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, width: 16, height: 16, borderBottom: "2px solid rgba(23,40,74,0.3)", borderLeft: "2px solid rgba(23,40,74,0.3)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16, borderBottom: "2px solid rgba(23,40,74,0.3)", borderRight: "2px solid rgba(23,40,74,0.3)", pointerEvents: "none" }} />

      {/* Header with Title and Tactical Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1, flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Camera size={18} color={colors.navy} />
          <h3
            style={{
              fontFamily: fonts.headline,
              fontSize: "0.92rem",
              fontWeight: 600,
              color: colors.navy,
              margin: 0
            }}
          >
            LIVE BIOMETRIC SCANNER
          </h3>
        </div>

        {/* Live Controls: Simulate Scan Button + Stream State */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Simulate Next Scan Button */}
          <button
            onClick={onSimulateScan}
            title="Simulate immediate face detection scan"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 10px",
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.card,
              color: colors.navy,
              fontSize: "0.72rem",
              fontWeight: 600,
              fontFamily: fonts.body,
              cursor: "pointer",
              transition: "all 0.15s ease"
            }}
          >
            <RefreshCw size={12} color={colors.navy} />
            <span>Simulate Scan</span>
          </button>

          {/* Pause / Play Live Stream */}
          <button
            onClick={onToggleLive}
            title={isLive ? "Pause live event simulation" : "Resume live event stream"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              borderRadius: 9999,
              backgroundColor: isLive ? "#E3F5EC" : "#F1F2F4",
              color: isLive ? "#127A50" : colors.sub,
              border: "none",
              fontSize: "0.68rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {isLive ? <Pause size={11} /> : <Play size={11} />}
            <span>{isLive ? "LIVE" : "PAUSED"}</span>
          </button>
        </div>
      </div>

      {/* Hero Single Latest Event Card */}
      {latestEvent ? (
        <div
          className="hero-scan-card"
          onClick={() => onSelectStudent && onSelectStudent(latestEvent)}
          style={{
            margin: "0.85rem 0",
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            padding: "0.95rem 1.15rem",
            backgroundColor: "#FAFBFC",
            borderRadius: 12,
            border: `1px solid ${colors.border}`,
            zIndex: 1,
            cursor: "pointer",
            transition: "background-color 0.15s ease, border-color 0.15s ease"
          }}
          title="Click to inspect student profile"
        >
          {/* Large ConfidenceRing */}
          <div className={flash ? "ring-flash" : ""} style={{ position: "relative", flexShrink: 0 }}>
            <ConfidenceRing match={latestEvent.match} size={76} strokeWidth={3.5}>
              <span
                style={{
                  fontFamily: fonts.headline,
                  fontSize: "1.45rem",
                  fontWeight: 600,
                  color: colors.navy
                }}
              >
                {Math.round(latestEvent.match)}%
              </span>
            </ConfidenceRing>
          </div>

          {/* Student Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
              <span
                style={{
                  fontFamily: fonts.headline,
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: colors.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {latestEvent.name}
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  fontFamily: fonts.body,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#127A50",
                  backgroundColor: "#E3F5EC",
                  padding: "2px 7px",
                  borderRadius: 6
                }}
              >
                <CheckCircle2 size={12} /> VERIFIED
              </span>
            </div>

            <p style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: colors.sub, margin: 0, fontWeight: 500 }}>
              {latestEvent.class || latestEvent.classSection}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.4rem", fontFamily: fonts.mono, fontSize: "0.74rem", color: colors.muted, flexWrap: "wrap" }}>
              <span>Terminal: <strong style={{ color: colors.ink }}>{latestEvent.device || "Main Gate"}</strong></span>
              <span>•</span>
              <span>Time: <strong style={{ color: colors.ink }}>{latestEvent.time}</strong></span>
              <span>•</span>
              <span style={{ color: colors.navy, textDecoration: "underline", fontSize: "0.7rem" }}>Click for details</span>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: colors.sub, textAlign: "center", padding: "1.5rem" }}>
          Awaiting face recognition stream...
        </p>
      )}

      {/* Condensed Ticker for recent events */}
      <div style={{ zIndex: 1 }}>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: "0.68rem",
            fontWeight: 600,
            color: colors.muted,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            display: "block",
            marginBottom: 6
          }}
        >
          Recent Verifications Feed
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {tickerEvents.map((ev, idx) => (
            <div
              key={ev.id || idx}
              onClick={() => onSelectStudent && onSelectStudent(ev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                fontFamily: fonts.body,
                padding: "3px 8px",
                borderRadius: 6,
                backgroundColor: "#F8FAFC",
                border: `1px solid ${colors.border}`,
                cursor: "pointer"
              }}
              title="Click to view details"
            >
              <Avatar name={ev.name} photoUrl={ev.photoUrl} match={null} size={22} />
              <span style={{ fontWeight: 600, color: colors.ink }}>{ev.name}</span>
              <span style={{ fontFamily: fonts.mono, fontSize: "0.68rem", color: colors.muted }}>{ev.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
