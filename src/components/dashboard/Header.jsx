import React from 'react';
import { Bell, ChevronDown, Shield } from 'lucide-react';
import { colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';

export const Header = ({ user, activeAlertsCount = 2, isLive = true, onToggleLive }) => {
  return (
    <header style={{
      backgroundColor: colors.card,
      borderBottom: `1px solid ${colors.border}`,
      padding: "0.85rem 1.75rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1rem",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Identity Block */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: colors.navy,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}>
          <Shield size={22} color="#FFFFFF" />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {/* Product Identity AT.AUTO + School Name */}
            <span style={{
              fontFamily: fonts.headline,
              fontSize: "1.15rem",
              fontWeight: 700,
              color: colors.navy,
              letterSpacing: "-0.01em"
            }}>
              AT.AUTO
            </span>

            <span style={{ color: colors.border, fontSize: "0.9rem" }}>|</span>

            <h1 style={{
              fontFamily: fonts.headline,
              fontSize: "1.05rem",
              fontWeight: 600,
              color: colors.ink,
              margin: 0,
              lineHeight: 1.2
            }}>
              National School of Sciences
            </h1>

            {/* Pulsing Live Badge */}
            <div
              className={`live-badge ${isLive ? 'live-badge-active' : ''}`}
              onClick={onToggleLive}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Click to toggle live recognition stream"
            >
              <span className="live-dot" />
              <span>LIVE</span>
            </div>
          </div>

          <p style={{
            fontFamily: fonts.body,
            fontSize: "0.74rem",
            color: colors.sub,
            margin: 0,
            fontWeight: 400
          }}>
            Smart Attendance Intelligence System
          </p>
        </div>
      </div>

      {/* Right Tools: Notifications & Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        
        {/* Notifications Bell */}
        <button
          style={{
            position: "relative",
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          title="Security Notifications"
        >
          <Bell size={18} color={colors.navy} />
          {activeAlertsCount > 0 && (
            <span style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: colors.red,
              color: "white",
              fontSize: "0.65rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white"
            }}>
              {activeAlertsCount}
            </span>
          )}
        </button>

        {/* Profile Avatar & Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <Avatar name={user?.name || "Dr. Ram Adhikari"} photoUrl={user?.photoUrl} match={null} size={36} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: fonts.body, fontSize: "0.82rem", fontWeight: 600, color: colors.ink, lineHeight: 1.2 }}>
              {user?.name || "Dr. Ram Adhikari"}
            </span>
            <span style={{ fontFamily: fonts.body, fontSize: "0.7rem", color: colors.sub }}>
              {user?.role || "Principal"}
            </span>
          </div>
          <ChevronDown size={14} color={colors.sub} />
        </div>

      </div>
    </header>
  );
};
