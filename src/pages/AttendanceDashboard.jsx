import React, { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_ALERTS,
  HARDWARE_DEVICES
} from '../data/mockData';
import { Sidebar } from '../components/dashboard/Sidebar';
import { MobileHeader } from '../components/dashboard/MobileHeader';
import { StudentDetailDrawer } from '../components/dashboard/StudentDetailDrawer';

// Pages
import { OverviewPage } from './OverviewPage';
import { StudentsPage } from './StudentsPage';
import { HeatmapPage } from './HeatmapPage';
import { DevicesPage } from './DevicesPage';
import { AlertsPage } from './AlertsPage';
import { ReportsPage } from './ReportsPage';
import { SettingsPage } from './SettingsPage';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview' },
  { id: 'students', label: 'Students' },
  { id: 'heatmap', label: 'Heatmap' },
  { id: 'devices', label: 'Devices' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
];

const PAGE_TITLES = {
  dashboard: 'Overview',
  students: 'Student Directory',
  heatmap: 'Attendance Heatmap',
  devices: 'Biometric Terminals',
  alerts: 'Security Alerts',
  reports: 'Reports & Export',
  settings: 'System Settings',
};

// Hash-based routing helpers
const getHashPage = () => {
  const h = window.location.hash.replace('#', '').trim();
  return NAV_ITEMS.find(n => n.id === h) ? h : 'dashboard';
};
const setHashPage = (id) => { window.location.hash = id; };

export const AttendanceDashboard = () => {
  const [activeNav, setActiveNav] = useState(getHashPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Shared state
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Keep hash in sync
  useEffect(() => {
    const handleHashChange = () => setActiveNav(getHashPage());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavSelect = useCallback((id) => {
    setHashPage(id);
    setActiveNav(id);
    setSidebarOpen(false);
  }, []);

  const handleDismissAlert = useCallback((alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  }, []);

  const handleResolveAll = useCallback(() => {
    setAlerts([]);
  }, []);

  const handleUpdateStatus = useCallback((studentId, newStatus) => {
    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s)
    );
  }, []);

  const handleAddStudent = useCallback((newStudent) => {
    setStudents(prev => [...prev, newStudent]);
  }, []);

  // Compute KPI values for Overview
  const presentCount = students.filter(s => s.status === 'present' || s.status === 'late').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const attendanceRate = students.length > 0
    ? Math.round((presentCount / students.length) * 1000) / 10
    : 0;

  // Page renderer
  const renderPage = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <OverviewPage
            students={students}
            alerts={alerts}
            presentCount={presentCount}
            absentCount={absentCount}
            attendanceRate={attendanceRate}
            devicesOnline={HARDWARE_DEVICES.filter(d => d.status === 'online').length}
            totalDevices={HARDWARE_DEVICES.length}
            onSelectStudent={setSelectedStudent}
            onDismissAlert={handleDismissAlert}
            onNavigate={handleNavSelect}
          />
        );
      case 'students':
        return (
          <StudentsPage
            students={students}
            onSelectStudent={setSelectedStudent}
            onAddStudent={handleAddStudent}
            onUpdateStatus={handleUpdateStatus}
          />
        );
      case 'heatmap':
        return <HeatmapPage students={students} />;
      case 'devices':
        return <DevicesPage />;
      case 'alerts':
        return (
          <AlertsPage
            alerts={alerts}
            onDismissAlert={handleDismissAlert}
            onResolveAll={handleResolveAll}
          />
        );
      case 'reports':
        return <ReportsPage students={students} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <OverviewPage
            students={students}
            alerts={alerts}
            presentCount={presentCount}
            absentCount={absentCount}
            attendanceRate={attendanceRate}
            devicesOnline={HARDWARE_DEVICES.filter(d => d.status === 'online').length}
            totalDevices={HARDWARE_DEVICES.length}
            onSelectStudent={setSelectedStudent}
            onDismissAlert={handleDismissAlert}
            onNavigate={handleNavSelect}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#F1F5F9',
        position: 'relative'
      }}
    >
      {/* ── Sidebar (desktop always visible, mobile via overlay) ── */}
      <Sidebar
        activeNav={activeNav}
        onNavSelect={handleNavSelect}
        activeAlertsCount={alerts.length}
        isMobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* ── Mobile sidebar backdrop ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(15,23,42,0.5)',
            zIndex: 39,
            display: 'none'
          }}
          className="mobile-overlay"
        />
      )}

      {/* ── Main content area ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden'
        }}
      >
        {/* Mobile header */}
        <MobileHeader
          activePageTitle={PAGE_TITLES[activeNav] || 'Overview'}
          activeAlertsCount={alerts.length}
          onOpenMobileSidebar={() => setSidebarOpen(true)}
          onNavSelect={handleNavSelect}
        />

        {/* Scrollable page content */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            paddingTop: '1.25rem'
          }}
          className="main-scroll"
        >
          {renderPage()}
        </main>
      </div>

      {/* ── Student Detail Drawer (global overlay) ── */}
      <StudentDetailDrawer
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AttendanceDashboard;
