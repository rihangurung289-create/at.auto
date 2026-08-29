import React from 'react';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { cardBase, colors, fonts } from '../../theme/tokens';

export const FilterBar = ({
  searchQuery = "",
  onSearchChange,
  selectedClass = "All",
  onClassChange,
  selectedStatus = "All",
  onStatusChange,
  selectedDate = "Today, Jul 26"
}) => {
  const statusOptions = ["All", "Present", "Absent", "Late", "Flagged"];
  const classOptions = ["All Classes", "Grade 11 Science A", "Grade 11 Science B", "Grade 11 Management A", "Grade 12 Science A", "Grade 12 Science B", "Grade 12 Management B"];

  return (
    <div style={{
      ...cardBase,
      padding: "0.85rem 1.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem"
    }}>
      {/* Left: Filters (Date, Class, Status Chips) */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
        
        {/* Date Selector */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.4rem 0.85rem",
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.canvas,
          fontFamily: fonts.body,
          fontSize: "0.8rem",
          fontWeight: 500,
          color: colors.ink
        }}>
          <Calendar size={14} color={colors.sub} />
          <span>{selectedDate}</span>
        </div>

        {/* Class / Section Dropdown */}
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <select
            value={selectedClass}
            onChange={(e) => onClassChange && onClassChange(e.target.value)}
            style={{
              padding: "0.4rem 2rem 0.4rem 0.85rem",
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.canvas,
              fontFamily: fonts.body,
              fontSize: "0.8rem",
              fontWeight: 500,
              color: colors.ink,
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none"
            }}
          >
            {classOptions.map(cls => (
              <option key={cls} value={cls === "All Classes" ? "All" : cls}>
                {cls}
              </option>
            ))}
          </select>
          <ChevronDown size={14} color={colors.sub} style={{ position: "absolute", right: "0.6rem", pointerEvents: "none" }} />
        </div>

        {/* Status Filter Chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: colors.canvas, padding: "3px", borderRadius: 8 }}>
          {statusOptions.map(st => {
            const isSelected = selectedStatus.toLowerCase() === st.toLowerCase();
            return (
              <button
                key={st}
                onClick={() => onStatusChange && onStatusChange(st)}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: isSelected ? colors.card : "transparent",
                  color: isSelected ? colors.navy : colors.sub,
                  fontFamily: fonts.body,
                  fontSize: "0.78rem",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  boxShadow: isSelected ? "0 1px 3px rgba(16,27,45,0.08)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                {st}
              </button>
            );
          })}
        </div>

      </div>

      {/* Right: Search Box (Strictly located in FilterBar) */}
      <div style={{ position: "relative", minWidth: 260, flex: "1 1 260px", maxWidth: 360 }}>
        <Search size={16} color={colors.sub} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
        <input
          type="text"
          placeholder="Search student name, ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.45rem 0.85rem 0.45rem 2.3rem",
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.card,
            fontFamily: fonts.body,
            fontSize: "0.82rem",
            color: colors.ink,
            outline: "none"
          }}
        />
      </div>
    </div>
  );
};
