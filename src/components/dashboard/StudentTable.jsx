import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';
import { StatusBadge } from './StatusBadge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const StudentTable = ({
  students = [],
  searchQuery = "",
  selectedClass = "All",
  selectedStatus = "All"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter students
  const filtered = students.filter(st => {
    const matchesSearch = !searchQuery ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClass === "All" || st.class === selectedClass;
    const matchesStatus = selectedStatus === "All" || st.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesClass && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{
      ...cardBase,
      padding: "1.25rem 1.4rem",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h3 style={{
            fontFamily: fonts.headline,
            fontSize: "0.95rem",
            fontWeight: 600,
            color: colors.navy,
            margin: 0
          }}>
            Student Attendance Log
          </h3>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
            Showing {filtered.length} matching records
          </span>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
          <thead>
            <tr style={{
              fontFamily: fonts.body,
              fontSize: "0.7rem",
              fontWeight: 600,
              color: colors.sub,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              borderBottom: `1px solid ${colors.border}`,
              textAlign: "left"
            }}>
              <th style={{ padding: "0.6rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>Student</th>
              <th style={{ padding: "0.6rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>Student ID</th>
              <th style={{ padding: "0.6rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>Class</th>
              <th style={{ padding: "0.6rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>Status</th>
              <th style={{ padding: "0.6rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>Match Score</th>
              <th style={{ padding: "0.6rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>Last Seen</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", fontFamily: fonts.body, fontSize: "0.82rem", color: colors.sub }}>
                  No student records match the selected filters.
                </td>
              </tr>
            ) : (
              paginated.map((st) => (
                <tr
                  key={st.id}
                  className="table-row-hover"
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                    transition: "background-color 0.15s ease",
                    cursor: "pointer"
                  }}
                >
                  {/* Avatar & Name */}
                  <td style={{ padding: "0.75rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <Avatar name={st.name} photoUrl={st.photoUrl} match={st.match} size={38} />
                      <div>
                        <span style={{ fontFamily: fonts.body, fontSize: "0.85rem", fontWeight: 600, color: colors.ink, display: "block" }}>
                          {st.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Student ID (Monospace) */}
                  <td style={{ padding: "0.75rem 0.85rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.mono, fontSize: "0.8rem", color: colors.sub }}>
                    {st.id}
                  </td>

                  {/* Class */}
                  <td style={{ padding: "0.75rem 0.85rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.body, fontSize: "0.8rem", color: colors.ink }}>
                    {st.class}
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: "0.75rem 0.85rem", borderBottom: `1px solid ${colors.border}` }}>
                    <StatusBadge status={st.status} />
                  </td>

                  {/* Match Score */}
                  <td style={{ padding: "0.75rem 0.85rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.body, fontSize: "0.8rem", fontWeight: 600, color: st.match ? colors.navy : colors.sub }}>
                    {st.match !== null ? `${st.match}%` : "—"}
                  </td>

                  {/* Last Seen */}
                  <td style={{ padding: "0.75rem 0.85rem", borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.body, fontSize: "0.78rem", color: colors.sub }}>
                    {st.lastSeen}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "0.75rem", borderTop: `1px solid ${colors.border}` }}>
        <span style={{ fontFamily: fonts.body, fontSize: "0.75rem", color: colors.sub }}>
          Page {currentPage} of {totalPages}
        </span>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            style={{
              padding: "0.35rem 0.65rem",
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.card,
              fontSize: "0.75rem",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            style={{
              padding: "0.35rem 0.65rem",
              borderRadius: 6,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.card,
              fontSize: "0.75rem",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
