import React, { useState, useEffect } from 'react';
import { colors } from '../theme/tokens';
import { Header } from '../components/dashboard/Header';
import { KpiRow } from '../components/dashboard/KpiRow';
import { FilterBar } from '../components/dashboard/FilterBar';
import { TrendChart } from '../components/dashboard/TrendChart';
import { StudentTable } from '../components/dashboard/StudentTable';
import { LiveFeed } from '../components/dashboard/LiveFeed';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';

// Mock Dataset for Attendance System
const INITIAL_STUDENTS = [
  { id: "NSS-2024-001", name: "Aarav Sharma", class: "Grade 12 Science A", status: "present", match: 99.2, lastSeen: "08:14 AM", photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80" },
  { id: "NSS-2024-002", name: "Sujata Adhikari", class: "Grade 12 Science A", status: "present", match: 98.7, lastSeen: "08:16 AM", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
  { id: "NSS-2024-003", name: "Rohan Shrestha", class: "Grade 12 Management B", status: "late", match: 84.5, lastSeen: "08:38 AM", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
  { id: "NSS-2024-004", name: "Pooja Karki", class: "Grade 11 Science B", status: "present", match: 99.8, lastSeen: "08:09 AM", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" },
  { id: "NSS-2024-005", name: "Bibek Thapa", class: "Grade 11 Management A", status: "absent", match: null, lastSeen: "—", photoUrl: null },
  { id: "NSS-2024-006", name: "Ananya Gautam", class: "Grade 12 Science B", status: "present", match: 97.4, lastSeen: "08:21 AM", photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" },
  { id: "NSS-2024-007", name: "Kshitiz Bhattarai", class: "Grade 11 Science A", status: "present", match: 99.1, lastSeen: "08:05 AM", photoUrl: null },
  { id: "NSS-2024-008", name: "Nisha Poudel", class: "Grade 12 Management A", status: "flagged", match: 72.8, lastSeen: "08:42 AM", photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" }
];

const INITIAL_LIVE_EVENTS = [
  { id: "EV-01", name: "Kshitiz Bhattarai", class: "Grade 11 Science A", match: 99.1, device: "DEV-03", time: "08:05 AM" },
  { id: "EV-02", name: "Pooja Karki", class: "Grade 11 Science B", match: 99.8, device: "DEV-03", time: "08:09 AM" },
  { id: "EV-03", name: "Aarav Sharma", class: "Grade 12 Science A", match: 99.2, device: "DEV-01", time: "08:14 AM" },
  { id: "EV-04", name: "Sujata Adhikari", class: "Grade 12 Science A", match: 98.7, device: "DEV-01", time: "08:16 AM" }
];

export const AttendanceDashboard = () => {
  const [students] = useState(INITIAL_STUDENTS);
  const [liveEvents, setLiveEvents] = useState(INITIAL_LIVE_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLive, setIsLive] = useState(true);

  // Live recognition event polling simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const candidates = [
        { name: "Suman Dahal", class: "Grade 11 Science A", match: 98.9, device: "DEV-01" },
        { name: "Kripa Regmi", class: "Grade 12 Science B", match: 99.4, device: "DEV-02" },
        { name: "Manish Gurung", class: "Grade 11 Management B", match: 97.6, device: "DEV-03" }
      ];
      const randomCand = candidates[Math.floor(Math.random() * candidates.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const newEv = {
        id: `EV-${Math.random().toString(36).substring(2, 7)}`,
        ...randomCand,
        time: timeStr
      };

      setLiveEvents(prev => [newEv, ...prev.slice(0, 7)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: colors.canvas,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <Header
        user={{ name: "Dr. Ram Adhikari", role: "Principal / Admin" }}
        activeAlertsCount={2}
        isLive={isLive}
        onToggleLive={() => setIsLive(!isLive)}
      />

      {/* Main Dashboard Container */}
      <main style={{
        maxWidth: 1440,
        width: "100%",
        margin: "0 auto",
        padding: "1.5rem 1.5rem 3rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
        
        {/* 1. KPI Cards Row (4 cards) */}
        <KpiRow
          presentCount={1206}
          totalCount={1280}
          absentCount={54}
          avgConfidence={96.4}
          devicesOnline={3}
          totalDevices={4}
        />

        {/* 2. Filter Bar (Date, Class, Status Chips, Search Input) */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* 3. Analytics BI Row (Trend Chart + Live Feed) */}
        <div className="dashboard-grid-bi" style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "1.25rem"
        }}>
          <TrendChart />
          <LiveFeed events={liveEvents} />
        </div>

        {/* 4. Student Attendance Table Log */}
        <StudentTable
          students={students}
          searchQuery={searchQuery}
          selectedClass={selectedClass}
          selectedStatus={selectedStatus}
        />

        {/* 5. Security Alerts Panel */}
        <AlertsPanel />

      </main>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "1.25rem",
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.card,
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.75rem",
        color: colors.sub,
        marginTop: "auto"
      }}>
        National School of Sciences (NSS) • Biometric Attendance Intelligence • Academic System Demo
      </footer>
    </div>
  );
};
