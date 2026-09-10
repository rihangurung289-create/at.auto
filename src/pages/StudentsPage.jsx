import React, { useState } from 'react';
import { FilterBar } from '../components/dashboard/FilterBar';
import { StudentTable } from '../components/dashboard/StudentTable';
import { colors, fonts, cardBase } from '../theme/tokens';
import { UserPlus, Download, Users, CheckCircle, AlertCircle, X } from 'lucide-react';

export const StudentsPage = ({
  students = [],
  onSelectStudent,
  onAddStudent
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today, Jul 26");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("Grade 12 Science A");
  const [newStudentRoll, setNewStudentRoll] = useState("");

  const statusCounts = students.reduce(
    (acc, st) => {
      const s = (st.status || 'present').toLowerCase();
      acc.All = (acc.All || 0) + 1;
      if (s === 'present') acc.Present = (acc.Present || 0) + 1;
      else if (s === 'absent') acc.Absent = (acc.Absent || 0) + 1;
      else if (s === 'late') acc.Late = (acc.Late || 0) + 1;
      else if (s === 'flagged') acc.Flagged = (acc.Flagged || 0) + 1;
      return acc;
    },
    { All: 0, Present: 0, Absent: 0, Late: 0, Flagged: 0 }
  );

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentId.trim()) {
      alert("Please provide student full name and student ID.");
      return;
    }

    const newStudent = {
      id: newStudentId.trim(),
      name: newStudentName.trim(),
      class: newStudentClass,
      classSection: newStudentClass,
      rollNo: newStudentRoll.trim() || "1000",
      status: "present",
      match: 99.0,
      lastSeen: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      photoUrl: null,
      history: [
        { date: "Jul 26", status: "present", time: "08:15 AM" }
      ]
    };

    if (onAddStudent) onAddStudent(newStudent);
    setIsAddModalOpen(false);
    setNewStudentName("");
    setNewStudentId("");
    setNewStudentRoll("");
    alert(`Student ${newStudent.name} successfully registered into ${newStudent.class}!`);
  };

  const handleExportCsv = () => {
    const headers = ["ID", "Name", "Class", "Roll No", "Status", "Confidence %", "Last Seen"];
    const rows = students.map(s => [
      s.id,
      `"${s.name}"`,
      `"${s.class || s.classSection}"`,
      s.rollNo || "—",
      s.status,
      s.match ?? s.confidence ?? "N/A",
      s.lastSeen || s.timestamp || "N/A"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Action Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontFamily: fonts.headline, fontSize: "1.35rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
            Student Roster & Directory
          </h2>
          <p style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: colors.sub, margin: "2px 0 0 0" }}>
            Search, inspect biometric verifications, and record manual attendance overrides
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.55rem 1.15rem",
              borderRadius: 8,
              border: "none",
              backgroundColor: colors.sapphire,
              color: "#FFFFFF",
              fontFamily: fonts.body,
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37, 99, 235, 0.3)"
            }}
          >
            <UserPlus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        totalStudents={students.length}
        presentStudents={statusCounts.Present || 0}
        absentStudents={statusCounts.Absent || 0}
        statusCounts={statusCounts}
        onExportCsv={handleExportCsv}
      />

      {/* Main Students Table */}
      <StudentTable
        students={students}
        searchQuery={searchQuery}
        selectedClass={selectedClass}
        selectedStatus={selectedStatus}
        onSelectStudent={onSelectStudent}
        onResetFilters={() => {
          setSearchQuery("");
          setSelectedClass("All");
          setSelectedStatus("All");
        }}
      />

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div
          onClick={() => setIsAddModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            animation: "fadeIn 0.2s ease-out"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.card,
              borderRadius: 14,
              border: `1px solid ${colors.border}`,
              width: "100%",
              maxWidth: 480,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${colors.border}`, paddingBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <UserPlus size={20} color={colors.sapphire} />
                <h3 style={{ fontFamily: fonts.headline, fontSize: "1.1rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
                  Register New Student
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", color: colors.sub }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: fonts.body, fontSize: "0.76rem", fontWeight: 600, color: colors.slate, marginBottom: 4 }}>
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samyukta Basnet"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.85rem",
                    borderRadius: 8,
                    border: `1px solid ${colors.borderStrong}`,
                    fontFamily: fonts.body,
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: fonts.body, fontSize: "0.76rem", fontWeight: 600, color: colors.slate, marginBottom: 4 }}>
                    Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NSS-2024-025"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.85rem",
                      borderRadius: 8,
                      border: `1px solid ${colors.borderStrong}`,
                      fontFamily: fonts.mono,
                      fontSize: "0.82rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: fonts.body, fontSize: "0.76rem", fontWeight: 600, color: colors.slate, marginBottom: 4 }}>
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1240"
                    value={newStudentRoll}
                    onChange={(e) => setNewStudentRoll(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.85rem",
                      borderRadius: 8,
                      border: `1px solid ${colors.borderStrong}`,
                      fontFamily: fonts.mono,
                      fontSize: "0.82rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: fonts.body, fontSize: "0.76rem", fontWeight: 600, color: colors.slate, marginBottom: 4 }}>
                  Assigned Section / Class
                </label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.85rem",
                    borderRadius: 8,
                    border: `1px solid ${colors.borderStrong}`,
                    fontFamily: fonts.body,
                    fontSize: "0.85rem",
                    backgroundColor: colors.card,
                    outline: "none"
                  }}
                >
                  <option value="Grade 11 Science A">Grade 11 Science A</option>
                  <option value="Grade 11 Science B">Grade 11 Science B</option>
                  <option value="Grade 11 Management A">Grade 11 Management A</option>
                  <option value="Grade 11 Management B">Grade 11 Management B</option>
                  <option value="Grade 12 Science A">Grade 12 Science A</option>
                  <option value="Grade 12 Science B">Grade 12 Science B</option>
                  <option value="Grade 12 Management A">Grade 12 Management A</option>
                  <option value="Grade 12 Management B">Grade 12 Management B</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: "0.55rem 1rem",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.card,
                    color: colors.slate,
                    fontFamily: fonts.body,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: 8,
                    border: "none",
                    backgroundColor: colors.sapphire,
                    color: "#FFFFFF",
                    fontFamily: fonts.body,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
