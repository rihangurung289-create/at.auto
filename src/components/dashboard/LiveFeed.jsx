import React from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';
import { Radio } from 'lucide-react';

export const LiveFeed = ({ events = [] }) => {
  return (
    <div style={{
      ...cardBase,
      padding: "1.25rem 1.4rem",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <h3 style={{
            fontFamily: fonts.headline,
            fontSize: "0.95rem",
            fontWeight: 600,
            color: colors.navy,
            margin: 0
          }}>
            Live Face Match Feed
          </h3>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 8px",
            borderRadius: 9999,
            backgroundColor: "#E3F5EC",
            color: "#127A50",
            fontSize: "0.7rem",
            fontWeight: 600
          }}>
            <Radio size={10} className="animate-pulse" /> Live Stream
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: 340, overflowY: "auto", paddingRight: 4 }}>
        {events.length === 0 ? (
          <p style={{ fontFamily: fonts.body, fontSize: "0.8rem", color: colors.sub, textAlign: "center", padding: "1.5rem" }}>
            Waiting for live biometric face scans...
          </p>
        ) : (
          events.map((ev, idx) => (
            <div
              key={ev.id || idx}
              className="feed-item-slide-in"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 0.85rem",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                backgroundColor: idx === 0 ? "#F8FAFC" : colors.card,
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Avatar name={ev.name} photoUrl={ev.photoUrl} match={ev.match} size={38} />
                <div>
                  <span style={{ fontFamily: fonts.body, fontSize: "0.85rem", fontWeight: 600, color: colors.ink, display: "block" }}>
                    {ev.name}
                  </span>
                  <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
                    {ev.class} • <span style={{ fontFamily: fonts.mono }}>{ev.device}</span>
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{
                  display: "inline-block",
                  fontFamily: fonts.body,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: ev.match >= 95 ? colors.green : ev.match >= 80 ? colors.amber : colors.red,
                  backgroundColor: ev.match >= 95 ? "#E3F5EC" : ev.match >= 80 ? "#FCF1E4" : "#FBEAE8",
                  padding: "2px 8px",
                  borderRadius: 6
                }}>
                  {ev.match}% Match
                </span>
                <span style={{ fontFamily: fonts.body, fontSize: "0.7rem", color: colors.muted, display: "block", marginTop: 2 }}>
                  {ev.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
