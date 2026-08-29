import React from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import { AlertTriangle } from 'lucide-react';

export const AlertsPanel = ({
  alerts = [
    {
      id: "ALT-101",
      title: "Unknown Face Detected",
      description: "Unregistered face scan attempt at Gate 2 Camera.",
      severity: "flagged",
      time: "08:42 AM",
      device: "DEV-02"
    },
    {
      id: "ALT-102",
      title: "Low Confidence Match",
      description: "Scan match for Rohan Shrestha below 80% threshold.",
      severity: "late",
      time: "08:38 AM",
      device: "DEV-02"
    }
  ],
  onDismissAlert
}) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div style={{
      ...cardBase,
      padding: "1.25rem 1.4rem",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
        <AlertTriangle size={18} color={colors.amber} />
        <h3 style={{
          fontFamily: fonts.headline,
          fontSize: "0.95rem",
          fontWeight: 600,
          color: colors.navy,
          margin: 0
        }}>
          Security & System Alerts ({alerts.length})
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {alerts.map((alt) => (
          <div
            key={alt.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0.85rem",
              borderRadius: 10,
              backgroundColor: alt.severity === "flagged" ? "#FBEAE8" : "#FCF1E4",
              border: `1px solid ${alt.severity === "flagged" ? "#FCA5A5" : "#FDBA74"}`,
              fontSize: "0.8rem"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  color: alt.severity === "flagged" ? colors.red : colors.amber
                }}>
                  {alt.title}
                </span>
                <span style={{ fontFamily: fonts.mono, fontSize: "0.7rem", color: colors.sub }}>
                  {alt.time} • {alt.device}
                </span>
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: "0.75rem", color: colors.sub, margin: "2px 0 0 0" }}>
                {alt.description}
              </p>
            </div>

            {onDismissAlert && (
              <button
                onClick={() => onDismissAlert(alt.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontFamily: fonts.body,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: colors.sub,
                  cursor: "pointer",
                  padding: "4px 8px"
                }}
              >
                Dismiss
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
