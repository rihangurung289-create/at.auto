import React from 'react';
import { colors, fonts } from '../../theme/tokens';
import { Search, Calendar, ChevronDown, Download, X } from 'lucide-react';

export const FilterBar = ({
  searchQuery = "",
  onSearchChange,
  selectedClass = "All",
  onClassChange,
  selectedStatus = "All",
  onStatusChange,
  selectedDate = "Today, Jul 26",
  onDateChange,
  totalStudents = 0,
  presentStudents = 0,
  absentStudents = 0,
  statusCounts = { All: 0, Present: 0, Absent: 0, Late: 0, Flagged: 0 },
  onExportCsv
}) => {
  const statusOptions = ["All", "Present", "Absent", "Late", "Flagged"];
  const classOptions = [
    "All Classes", "Grade 11 Science A", "Grade 11 Science B", "Grade 11 Management A",
    "Grade 12 Science A", "Grade 12 Science B", "Grade 12 Management A", "Grade 12 Management B"
  ];
  const dateOptions = ["Today, Jul 26", "Yesterday, Jul 25", "Thu, Jul 24", "Wed, Jul 23"];

  return (
    <div
      style={{
        background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        padding: "0.85rem 1.15rem", display: "flex", flexDirection: "column", gap: "0.75rem"
      }}
    >
      {/* Controls Row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        {/* Left: Date + Class + Status chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          {/* Date selector */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <Calendar size={13} color={colors.sub} style={{ position: "absolute", left: "0.65rem", pointerEvents: "none" }} />
            <select
              value={selectedDate}
              onChange={e => onDateChange && onDateChange(e.target.value)}
              style={{ padding: "0.42rem 1.8rem 0.42rem 1.9rem", borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.canvas, fontFamily: fonts.body, fontSize: "0.78rem", fontWeight: 500, color: colors.navy, cursor: "pointer", appearance: "none", WebkitAppearance: "none", outline: "none" }}
            >
              {dateOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown size={12} color={colors.sub} style={{ position: "absolute", right: "0.55rem", pointerEvents: "none" }} />
          </div>

          {/* Class selector */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <select
              value={selectedClass}
              onChange={e => onClassChange && onClassChange(e.target.value)}
              style={{ padding: "0.42rem 1.8rem 0.42rem 0.85rem", borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.canvas, fontFamily: fonts.body, fontSize: "0.78rem", fontWeight: 500, color: colors.navy, cursor: "pointer", appearance: "none", WebkitAppearance: "none", outline: "none" }}
            >
              {classOptions.map(cls => <option key={cls} value={cls === "All Classes" ? "All" : cls}>{cls}</option>)}
            </select>
            <ChevronDown size={12} color={colors.sub} style={{ position: "absolute", right: "0.55rem", pointerEvents: "none" }} />
          </div>

          {/* Status filter chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px", backgroundColor: colors.canvas, padding: "2px", borderRadius: 8, border: `1px solid ${colors.border}`, overflowX: "auto" }}>
            {statusOptions.map(st => {
              const isSelected = selectedStatus.toLowerCase() === st.toLowerCase();
              const count = statusCounts[st] ?? 0;
              return (
                <button
                  key={st}
                  onClick={() => onStatusChange && onStatusChange(st)}
                  style={{
                    padding: "0.32rem 0.6rem", borderRadius: 6, border: "none",
                    backgroundColor: isSelected ? colors.sapphire : "transparent",
                    color: isSelected ? "#FFFFFF" : colors.sub,
                    fontFamily: fonts.body, fontSize: "0.75rem",
                    fontWeight: isSelected ? 700 : 500, cursor: "pointer",
                    transition: "all 0.15s ease", whiteSpace: "nowrap",
                    display: "flex", alignItems: "center", gap: "4px"
                  }}
                >
                  <span>{st}</span>
                  <span style={{ fontSize: "0.66rem", padding: "1px 5px", borderRadius: 999, backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : colors.border, color: isSelected ? "#FFF" : colors.sub }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search + Export */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: "1 1 260px", justifyContent: "flex-end" }}>
          <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 300 }}>
            <Search size={14} color={colors.sub} style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={e => onSearchChange && onSearchChange(e.target.value)}
              style={{ width: "100%", padding: "0.42rem 2rem 0.42rem 2.1rem", borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.card, fontFamily: fonts.body, fontSize: "0.8rem", color: colors.navy, outline: "none" }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange && onSearchChange("")}
                style={{ position: "absolute", right: "0.6rem", top: "50%", transform: "translateY(-50%)", border: "none", background: "transparent", cursor: "pointer", color: colors.muted, padding: 2, display: "flex", alignItems: "center" }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          <button
            onClick={onExportCsv}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.42rem 0.85rem", borderRadius: 8,
              border: `1px solid ${colors.sapphireBorder}`, backgroundColor: colors.sapphireLight,
              color: colors.sapphire, fontFamily: fonts.body, fontSize: "0.78rem",
              fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap"
            }}
          >
            <Download size={14} color={colors.sapphire} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary sub-bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", paddingTop: "0.45rem", borderTop: `1px solid ${colors.border}`, fontSize: "0.72rem", fontFamily: fonts.body, color: colors.sub, flexWrap: "wrap" }}>
        <span>
          <strong style={{ color: colors.navy }}>{totalStudents}</strong> total records
        </span>
        <span style={{ color: colors.border }}>•</span>
        <span style={{ color: colors.emeraldDark, fontWeight: 600 }}>
          <strong>{presentStudents}</strong> present
        </span>
        <span style={{ color: colors.border }}>•</span>
        <span style={{ color: colors.coralDark, fontWeight: 600 }}>
          <strong>{absentStudents}</strong> absent
        </span>
      </div>
    </div>
  );
};
