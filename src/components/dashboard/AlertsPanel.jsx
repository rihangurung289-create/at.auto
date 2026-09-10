import React from 'react';
import { colors, fonts } from '../../theme/tokens';
import { AlertTriangle, Check, ShieldAlert, WifiOff, Eye, X } from 'lucide-react';

export const AlertsPanel = ({ alerts = [], onDismissAlert, onResolveAll }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div
        style={{
          background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12,
          boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
          padding: "1.25rem 1.4rem", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          height: "100%", minHeight: 280
        }}
      >
        <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: colors.emeraldLight, border: `1px solid ${colors.emeraldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
          <Check size={24} color={colors.emeraldDark} />
        </div>
        <h4 style={{ fontFamily: fonts.headline, fontSize: "0.95rem", fontWeight: 700, color: colors.navy, margin: 0 }}>All Systems Secure</h4>
        <p style={{ fontFamily: fonts.body, fontSize: "0.78rem", color: colors.sub, margin: "0.35rem 0 0 0", maxWidth: 220 }}>
          No active security anomalies or offline biometric gates.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        padding: "1.25rem 1.4rem", display: "flex", flexDirection: "column",
        height: "100%", minHeight: 280
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.coralLight, border: `1px solid ${colors.coralBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertTriangle size={16} color={colors.coralDark} />
          </div>
          <h3 style={{ fontFamily: fonts.headline, fontSize: "0.92rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
            SECURITY ALERTS ({alerts.length})
          </h3>
        </div>
        {onResolveAll && alerts.length > 1 && (
          <button
            onClick={onResolveAll}
            style={{ border: "none", background: "transparent", fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 600, color: colors.sapphire, cursor: "pointer", padding: "2px 6px" }}
          >
            Dismiss All
          </button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", overflowY: "auto", flex: 1, paddingRight: 2 }}>
        {alerts.map((alt) => {
          const isRed = alt.severity === "flagged" || alt.severity === "error" || alt.severity === "warning";
          const bg = isRed ? colors.coralLight : colors.amberLight;
          const border = isRed ? colors.coralBorder : colors.amberBorder;
          const textColor = isRed ? colors.coralDark : colors.amberDark;

          return (
            <div
              key={alt.id}
              style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                padding: "0.75rem 0.85rem", borderRadius: 10, backgroundColor: bg,
                border: `1px solid ${border}`, gap: "0.6rem"
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", minWidth: 0, flex: 1 }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  {alt.title.includes("Offline") ? <WifiOff size={15} color={textColor} /> : <ShieldAlert size={15} color={textColor} />}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: fonts.body, fontWeight: 700, color: textColor, fontSize: "0.8rem" }}>{alt.title}</span>
                    <span style={{ fontFamily: fonts.mono, fontSize: "0.68rem", color: colors.sub }}>
                      {alt.time || alt.timestamp} • {alt.device || alt.location}
                    </span>
                  </div>
                  <p style={{ fontFamily: fonts.body, fontSize: "0.74rem", color: colors.slate, margin: "2px 0 0 0", lineHeight: 1.3 }}>
                    {alt.description}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
                {alt.snapshotUrl && (
                  <button onClick={() => {}} title="View Snapshot" style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4, color: colors.slate, borderRadius: 4 }}>
                    <Eye size={14} />
                  </button>
                )}
                <button
                  onClick={() => onDismissAlert && onDismissAlert(alt.id)}
                  title="Dismiss Alert"
                  style={{ border: `1px solid ${border}`, background: "rgba(255,255,255,0.7)", fontFamily: fonts.body, fontSize: "0.7rem", fontWeight: 600, color: textColor, cursor: "pointer", padding: "3px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 3 }}
                >
                  <X size={12} /> Dismiss
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
