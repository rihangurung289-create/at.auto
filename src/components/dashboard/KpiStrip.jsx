import React from 'react';
import { Users, UserX, Cpu, TrendingUp } from 'lucide-react';
import { cardBase, colors, fonts } from '../../theme/tokens';

export const KpiStrip = ({
  presentCount = 1206,
  totalCount = 1260,
  absentCount = 54,
  avgConfidence = 96.4,
  devicesOnline = 3,
  totalDevices = 4
}) => {
  const presentRate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : "0.0";

  // Golden Rule: 10% Accents applied distinctly to each metric card
  const metrics = [
    {
      id: "present",
      label: "PRESENT TODAY",
      value: `${presentCount.toLocaleString()}`,
      rate: `${presentRate}% attendance`,
      accentColor: colors.emerald,
      accentBg: colors.emeraldLight,
      accentBorder: colors.emeraldBorder,
      icon: <Users size={20} color={colors.emeraldDark} />
    },
    {
      id: "absent",
      label: "ABSENT TODAY",
      value: absentCount.toLocaleString(),
      rate: "Requires excuse note",
      accentColor: colors.coral,
      accentBg: colors.coralLight,
      accentBorder: colors.coralBorder,
      icon: <UserX size={20} color={colors.coralDark} />
    },
    {
      id: "confidence",
      label: "AVG ATTENDANCE RATE",
      value: `${avgConfidence}%`,
      rate: "+2.3% vs last week",
      accentColor: colors.sapphire,
      accentBg: colors.sapphireLight,
      accentBorder: colors.sapphireBorder,
      icon: <TrendingUp size={20} color={colors.sapphire} />
    },
    {
      id: "devices",
      label: "GATE TERMINALS",
      value: `${devicesOnline} / ${totalDevices}`,
      rate: "Terminals active",
      accentColor: colors.amber,
      accentBg: colors.amberLight,
      accentBorder: colors.amberBorder,
      icon: <Cpu size={20} color={colors.amberDark} />
    }
  ];

  return (
    <div
      className="kpi-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        width: "100%"
      }}
    >
      {metrics.map((item) => (
        <div
          key={item.id}
          style={{
            ...cardBase,
            padding: "1.15rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            borderLeft: `4px solid ${item.accentColor}`,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: item.accentBg,
              border: `1px solid ${item.accentBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            {item.icon}
          </div>

          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: "0.68rem",
                fontWeight: 700,
                color: colors.sub,
                letterSpacing: "0.06em",
                textTransform: "uppercase"
              }}
            >
              {item.label}
            </span>

            <span
              style={{
                fontFamily: fonts.headline,
                fontSize: "1.45rem",
                fontWeight: 700,
                color: colors.ink,
                lineHeight: 1.2,
                marginTop: "1px"
              }}
            >
              {item.value}
            </span>

            <span
              style={{
                fontFamily: fonts.body,
                fontSize: "0.72rem",
                fontWeight: 600,
                color: item.accentColor,
                marginTop: "2px"
              }}
            >
              {item.rate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
