import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock, Eye, Edit3, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

export const StudentTable = () => {
  const {
    students,
    searchQuery,
    setSearchQuery,
    filterSection,
    setFilterSection,
    filterStatus,
    setFilterStatus,
    setSelectedStudent,
    overrideAttendance
  } = useAttendance();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  const filteredStudents = students.filter(st => {
    const matchesSearch = searchQuery === "" ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.includes(searchQuery);

    const matchesSection = filterSection === "All" || st.classSection === filterSection;
    const matchesStatus = filterStatus === "All" || st.status === filterStatus.toLowerCase();

    return matchesSearch && matchesSection && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const sectionsList = ["All", "Grade 11 Science A", "Grade 11 Science B", "Grade 11 Management A", "Grade 12 Science A", "Grade 12 Science B", "Grade 12 Management B"];

  return (
    <div className="nss-card" style={{ padding: "1.25rem 1.5rem" }}>
      
      {/* Table Header & Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
        <div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--primary-900)" }}>
            Student Attendance Intelligence Log
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Showing {filteredStudents.length} records • Filter by section, status, or search student ID
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          
          {/* Section Filter Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "#F1F5F9", padding: "0.4rem 0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <Filter size={14} color="var(--text-muted)" />
            <select
              value={filterSection}
              onChange={(e) => { setFilterSection(e.target.value); setCurrentPage(1); }}
              style={{ background: "transparent", border: "none", fontSize: "0.8rem", fontWeight: "600", color: "var(--primary-900)", cursor: "pointer" }}
            >
              {sectionsList.map(sec => <option key={sec} value={sec}>{sec === "All" ? "All Sections" : sec}</option>)}
            </select>
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: "flex", background: "#F1F5F9", padding: "3px", borderRadius: "var(--radius-md)" }}>
            {["All", "Present", "Absent", "Late"].map(st => (
              <button
                key={st}
                onClick={() => { setFilterStatus(st); setCurrentPage(1); }}
                style={{
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  background: filterStatus === st ? "white" : "transparent",
                  color: filterStatus === st ? "var(--primary-900)" : "var(--text-muted)",
                  boxShadow: filterStatus === st ? "var(--shadow-subtle)" : "none"
                }}
              >
                {st}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Table Component */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 0.5rem" }}>
          <thead>
            <tr style={{ textTransform: "uppercase", fontSize: "0.7rem", color: "#64748B", letterSpacing: "0.05em", textAlign: "left" }}>
              <th style={{ padding: "0.5rem 1rem" }}>Student</th>
              <th style={{ padding: "0.5rem 1rem" }}>Student ID</th>
              <th style={{ padding: "0.5rem 1rem" }}>Class / Section</th>
              <th style={{ padding: "0.5rem 1rem" }}>Status</th>
              <th style={{ padding: "0.5rem 1rem" }}>Check-in Time</th>
              <th style={{ padding: "0.5rem 1rem" }}>AI Confidence</th>
              <th style={{ padding: "0.5rem 1rem" }}>Terminal Device</th>
              <th style={{ padding: "0.5rem 1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "2.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  No student records match the selected filters.
                </td>
              </tr>
            ) : (
              paginatedStudents.map((st) => (
                <tr
                  key={st.id}
                  style={{
                    background: "white",
                    border: "1px solid var(--border-subtle)",
                    transition: "var(--transition-fast)"
                  }}
                >
                  {/* Student Info */}
                  <td style={{ padding: "0.75rem 1rem", borderTopLeftRadius: "var(--radius-md)", borderBottomLeftRadius: "var(--radius-md)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
                      />
                      <div>
                        <p style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--primary-900)" }}>{st.name}</p>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Roll #{st.rollNo}</span>
                      </div>
                    </div>
                  </td>

                  {/* ID */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", fontWeight: "600", color: "#334155" }}>
                    {st.id}
                  </td>

                  {/* Section */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {st.classSection}
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span className={`badge ${
                      st.status === 'present' ? 'badge-present' : st.status === 'absent' ? 'badge-absent' : 'badge-late'
                    }`}>
                      {st.status === 'present' && <CheckCircle size={12} />}
                      {st.status === 'absent' && <XCircle size={12} />}
                      {st.status === 'late' && <Clock size={12} />}
                      {st.status}
                    </span>
                  </td>

                  {/* Timestamp */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", fontWeight: "500", color: "var(--primary-900)" }}>
                    {st.timestamp}
                  </td>

                  {/* Confidence Bar */}
                  <td style={{ padding: "0.75rem 1rem", width: "160px" }}>
                    {st.confidence > 0 ? (
                      <div className="confidence-bar-wrapper">
                        <div className="confidence-bar-track">
                          <div
                            className={`confidence-bar-fill ${
                              st.confidence >= 95 ? 'confidence-high' : st.confidence >= 85 ? 'confidence-medium' : 'confidence-low'
                            }`}
                            style={{ width: `${st.confidence}%` }}
                          />
                        </div>
                        <span style={{ fontSize: "0.7rem", fontWeight: "600", color: "#475569" }}>
                          {st.confidence}%
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>N/A</span>
                    )}
                  </td>

                  {/* Device */}
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {st.device}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderTopRightRadius: "var(--radius-md)", borderBottomRightRadius: "var(--radius-md)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.4rem" }}>
                      <button
                        onClick={() => setSelectedStudent(st)}
                        title="View Full Biometric Profile & History"
                        style={{
                          padding: "0.35rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-subtle)",
                          background: "var(--bg-subtle)",
                          color: "var(--primary-600)",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem"
                        }}
                      >
                        <Eye size={13} /> View
                      </button>

                      {/* Status Quick Toggle */}
                      <button
                        onClick={() => {
                          const nextStatus = st.status === 'present' ? 'absent' : st.status === 'absent' ? 'late' : 'present';
                          overrideAttendance(st.id, nextStatus);
                        }}
                        title="Manual Override Status"
                        style={{
                          padding: "0.35rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-subtle)",
                          background: "white",
                          color: "var(--text-muted)",
                          cursor: "pointer"
                        }}
                      >
                        <Edit3 size={13} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          Page {currentPage} of {totalPages}
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "white",
              fontSize: "0.75rem",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "white",
              fontSize: "0.75rem",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};
