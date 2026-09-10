import React, { useState } from 'react';
import { colors, fonts } from '../../theme/tokens';
import { Calendar, Info } from 'lucide-react';

export const AttendanceHeatmap = ({ weeksCount = 6, historyData = null }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [hoveredCell, setHoveredCell] = useState(null);

  const generateHeatmapGrid = () => {
    if (historyData) return historyData;
    const baseDate = new Date(2026, 6, 26);
    const grid = [];
    for (let w = 0; w < weeksCount; w++) {
      for (let d = 0; d < 6; d++) {
        const dateObj = new Date(baseDate);
        dateObj.setDate(baseDate.getDate() - ((weeksCount - 1 - w) * 7 + (5 - d)));
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const rate = parseFloat((84 + ((w * 6 + d * 3.7) % 15.5)).toFixed(1));
        grid.push({ week: w, dayIndex: d, dayName: days[d], dateStr, rate });
      }
    }
    return grid;
  };

  const cells = generateHeatmapGrid();

  // Color based on rate — from coral (low) to emerald (high)
  const getCellColor = (rate) => {
    if (rate < 85) return { bg: colors.coralLight, border: colors.coralBorder };
    if (rate < 90) return { bg: colors.amberLight, border: colors.amberBorder };
    if (rate < 94) return { bg: colors.sapphireLight, border: colors.sapphireBorder };
    if (rate < 97) return { bg: colors.emeraldLight, border: colors.emeraldBorder };
    return { bg: colors.emerald, border: colors.emerald };
  };

  const legend = [
    { label: '<85%', bg: colors.coralLight, border: colors.coralBorder },
    { label: '85–90%', bg: colors.amberLight, border: colors.amberBorder },
    { label: '90–94%', bg: colors.sapphireLight, border: colors.sapphireBorder },
    { label: '94–97%', bg: colors.emeraldLight, border: colors.emeraldBorder },
    { label: '97%+', bg: colors.emerald, border: colors.emerald }
  ];

  return (
    <div
      style={{
        background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        height: "100%", padding: "1.25rem 1.4rem",
        display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 320
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.sapphireLight, border: `1px solid ${colors.sapphireBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Calendar size={16} color={colors.sapphire} />
            </div>
            <h3 style={{ fontFamily: fonts.headline, fontSize: "0.92rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
              ATTENDANCE ACTIVITY HEATMAP
            </h3>
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub, fontWeight: 500 }}>
            6-Week History · Sun–Fri
          </span>
        </div>
        <p style={{ fontFamily: fonts.body, fontSize: "0.74rem", color: colors.sub, margin: "0 0 1rem 0" }}>
          Daily campus attendance density — hover for exact date & rate
        </p>
      </div>

      {/* Heatmap Grid with color-coded cells */}
      <div style={{ width: "100%", overflowX: "auto", paddingBottom: "0.5rem" }}>
        <div style={{ display: "inline-flex", gap: "0.65rem", alignItems: "flex-start", minWidth: 240 }}>
          {/* Day Labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {days.map((day) => (
              <div key={day} style={{ height: 20, fontFamily: fonts.body, fontSize: "0.68rem", color: colors.sub, fontWeight: 600, lineHeight: "20px", minWidth: 28 }}>
                {day}
              </div>
            ))}
          </div>

          {/* 6 Week Columns */}
          <div style={{ display: "flex", gap: "5px" }}>
            {Array.from({ length: weeksCount }).map((_, wIdx) => {
              const weekCells = cells.filter(c => c.week === wIdx);
              return (
                <div key={wIdx} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {weekCells.map((cell) => {
                    const cellStyle = getCellColor(cell.rate);
                    const isHovered = hoveredCell === `${cell.week}-${cell.dayIndex}`;
                    return (
                      <div
                        key={`${cell.week}-${cell.dayIndex}`}
                        onMouseEnter={() => setHoveredCell(`${cell.week}-${cell.dayIndex}`)}
                        onMouseLeave={() => setHoveredCell(null)}
                        title={`${cell.dateStr} (${cell.dayName}): ${cell.rate}% attendance`}
                        style={{
                          width: 20, height: 20, borderRadius: 4,
                          backgroundColor: cellStyle.bg,
                          border: `1px solid ${cellStyle.border}`,
                          cursor: "pointer",
                          transform: isHovered ? "scale(1.3)" : "scale(1)",
                          transition: "transform 0.15s ease",
                          boxShadow: isHovered ? "0 2px 6px rgba(0,0,0,0.12)" : "none"
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: "1rem", paddingTop: "0.65rem", borderTop: `1px solid ${colors.border}`,
          flexWrap: "wrap", gap: "0.5rem"
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: fonts.body, fontSize: "0.7rem", color: colors.sub }}>
          <Info size={12} /> Hover cell for date & rate
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {legend.map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: l.bg, border: `1px solid ${l.border}` }} />
              <span style={{ fontFamily: fonts.body, fontSize: "0.66rem", color: colors.sub }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
