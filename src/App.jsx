import React from 'react';
import { AttendanceProvider } from './context/AttendanceContext';
import { AttendanceDashboard } from './pages/AttendanceDashboard';

export default function App() {
  return (
    <AttendanceProvider>
      <AttendanceDashboard />
    </AttendanceProvider>
  );
}
