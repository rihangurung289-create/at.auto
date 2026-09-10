import React from 'react';
import { colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';
import { StatusBadge } from './StatusBadge';
import { Users, AlertCircle, ChevronRight } from 'lucide-react';

export const StudentTable = ({
  students = [],
  searchQuery = "",
  selectedClass = "All",
  selectedStatus = "All",
  onSelectStudent,
  onResetFilters
}) => {
  const filtered = students.filter(st => {
    const matchesSearch = !searchQuery ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All" || (st.class || st.classSection) === selectedClass;
    const matchesStatus = selectedStatus === "All" || (st.status || "").toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesClass && matchesStatus;
  });

  const classGroupsMap = {};
  filtered.forEach(st => {
    const cn = st.class || st.classSection || "Unassigned";
    if (!classGroupsMap[cn]) classGroupsMap[cn] = [];
    classGroupsMap[cn].push(st);
  });

  const sortedClassGroups = Object.keys(classGroupsMap).map(className => {
    const groupStudents = classGroupsMap[className];
    const presentCount = groupStudents.filter(s => s.status === 'present' || s.status === 'late').length;
    const totalCount = groupStudents.length;
    const presentRate = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;
    return { className, students: groupStudents, presentCount, totalCount, presentRate };
  }).sort((a, b) => a.presentRate - b.presentRate);

  const getPillTint = (rate) => {
    if (rate >= 90) return { bg: colors.emeraldLight, fg: colors.emeraldDark, border: colors.emeraldBorder };
    if (rate >= 75) return { bg: colors.amberLight, fg: colors.amberDark, border: colors.amberBorder };
    return { bg: colors.coralLight, fg: colors.coralDark, border: colors.coralBorder };
  };

  return (
    <div
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
        height: "100%",
        padding: "1.25rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        minHeight: 380
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Users size={18} color={colors.sapphire} />
            <h3 style={{ fontFamily: fonts.headline, fontSize: "0.92rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
              CLASS ATTENDANCE DIRECTORY
            </h3>
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
            Click any row to inspect biometric history & actions — {filtered.length} records shown
          </span>
        </div>
      </div>

      <div style={{ overflowY: "auto", flex: 1, paddingRight: 2 }}>
        {sortedClassGroups.length === 0 ? (
          <div style={{ padding: "3rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: colors.canvas, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem", border: `1px solid ${colors.border}` }}>
              <AlertCircle size={22} color={colors.sub} />
            </div>
            <h4 style={{ fontFamily: fonts.headline, fontSize: "0.95rem", fontWeight: 700, color: colors.ink, margin: 0 }}>
              No records match your filters
            </h4>
            <p style={{ fontFamily: fonts.body, fontSize: "0.78rem", color: colors.sub, margin: "0.35rem 0 1rem 0" }}>
              Try adjusting your search, class section, or status filter.
            </p>
            {onResetFilters && (
              <button
                onClick={onResetFilters}
                style={{
                  padding: "0.45rem 1rem", borderRadius: 6,
                  border: "none", backgroundColor: colors.sapphire,
                  color: "#FFFFFF", fontFamily: fonts.body, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer"
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          sortedClassGroups.map((group) => {
            const tint = getPillTint(group.presentRate);
            return (
              <div key={group.className} style={{ marginBottom: "1.25rem" }}>
                <div
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    backgroundColor: colors.navy, padding: "0.5rem 0.85rem",
                    borderRadius: 8, marginBottom: "0.4rem"
                  }}
                >
                  <span style={{ fontFamily: fonts.headline, fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                    {group.className}
                  </span>
                  <span
                    style={{
                      display: "inline-flex", alignItems: "center", padding: "2px 8px",
                      borderRadius: 9999, backgroundColor: tint.bg, color: tint.fg,
                      border: `1px solid ${tint.border}`, fontFamily: fonts.body, fontSize: "0.7rem", fontWeight: 700
                    }}
                  >
                    {group.presentCount} / {group.totalCount} present ({Math.round(group.presentRate)}%)
                  </span>
                </div>

                <div style={{ width: "100%", overflowX: "auto" }}>
                  <table style={{ width: "100%", minWidth: 480, borderCollapse: "separate", borderSpacing: 0 }}>
                    <thead>
                      <tr style={{ fontFamily: fonts.body, fontSize: "0.68rem", fontWeight: 700, color: colors.muted, textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "left" }}>
                        <th style={{ padding: "0.45rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>Student</th>
                        <th style={{ padding: "0.45rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>ID</th>
                        <th style={{ padding: "0.45rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>Status</th>
                        <th style={{ padding: "0.45rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>Match %</th>
                        <th style={{ padding: "0.45rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>Last Seen</th>
                        <th style={{ padding: "0.45rem 0.5rem", borderBottom: `1px solid ${colors.border}`, width: 30 }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.students.map((st) => (
                        <tr
                          key={st.id}
                          className="table-row-hover"
                          onClick={() => onSelectStudent && onSelectStudent(st)}
                          style={{ borderBottom: `1px solid ${colors.border}`, transition: "background-color 0.15s ease", cursor: "pointer" }}
                          title="Click to view student profile & actions"
                        >
                          <td style={{ padding: "0.55rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                              <Avatar name={st.name} photoUrl={st.photoUrl || st.avatar} match={st.match ?? st.confidence} size={32} />
                              <span style={{ fontFamily: fonts.body, fontSize: "0.82rem", fontWeight: 600, color: colors.navy }}>{st.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: "0.55rem 0.75rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.mono, fontSize: "0.74rem", color: colors.sub }}>{st.id}</td>
                          <td style={{ padding: "0.55rem 0.75rem", borderBottom: `1px solid ${colors.border}` }}>
                            <StatusBadge status={st.status} />
                          </td>
                          <td style={{ padding: "0.55rem 0.75rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.body, fontSize: "0.78rem", fontWeight: 700, color: (st.match || st.confidence) ? colors.sapphire : colors.sub }}>
                            {(st.match ?? st.confidence) ? `${st.match ?? st.confidence}%` : "—"}
                          </td>
                          <td style={{ padding: "0.55rem 0.75rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.body, fontSize: "0.75rem", color: colors.sub }}>
                            {st.lastSeen || st.timestamp || "—"}
                          </td>
                          <td style={{ padding: "0.55rem 0.5rem", borderBottom: `1px solid ${colors.border}`, textAlign: "right" }}>
                            <ChevronRight size={14} color={colors.muted} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
