import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS, HARDWARE_DEVICES, INITIAL_ALERTS, SIMULATION_POOL } from '../data/mockData';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for quick demo
  const [user, setUser] = useState({
    name: "Dr. Ram Kumar Adhikari",
    role: "Principal / Admin",
    email: "admin@nss.edu.np",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  });

  // Simulation & Engine State
  const [isSimulationActive, setIsSimulationActive] = useState(true);
  const [syncStatus, setSyncStatus] = useState("synced"); // 'synced' | 'syncing' | 'error'
  const [lastSyncTime, setLastSyncTime] = useState("Just now");

  // Data State
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [devices, setDevices] = useState(HARDWARE_DEVICES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  // Initial live matches from present students
  const [liveMatches, setLiveMatches] = useState(() => 
    INITIAL_STUDENTS
      .filter(s => s.status === 'present' || s.status === 'late')
      .slice(0, 4)
      .map(s => ({
        id: `MATCH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        studentId: s.id,
        name: s.name,
        classSection: s.classSection,
        timestamp: s.timestamp,
        confidence: s.confidence,
        device: s.device,
        avatar: s.avatar,
        status: s.status
      }))
  );

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSection, setFilterSection] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modals & Drawers
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Real-time Simulation Loop
  useEffect(() => {
    if (!isSimulationActive) return;

    const interval = setInterval(() => {
      // Pick random student from simulation pool or absent students
      const randomPoolIndex = Math.floor(Math.random() * SIMULATION_POOL.length);
      const targetSim = SIMULATION_POOL[randomPoolIndex];

      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const onlineDevices = devices.filter(d => d.status === 'online');
      const randomDevice = onlineDevices[Math.floor(Math.random() * onlineDevices.length)] || devices[0];

      const isLate = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 30);
      const matchedStatus = isLate ? 'late' : 'present';
      const confidenceScore = parseFloat((95 + Math.random() * 4.9).toFixed(1));

      const newMatch = {
        id: `MATCH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        studentId: targetSim.id,
        name: targetSim.name,
        classSection: targetSim.classSection,
        timestamp: timeString,
        confidence: confidenceScore,
        device: randomDevice.name,
        avatar: targetSim.avatar,
        status: matchedStatus
      };

      // Add to live match feed
      setLiveMatches(prev => [newMatch, ...prev.slice(0, 15)]);

      // Update student record status in table if student exists or insert new record
      setStudents(prevStudents => {
        const existingIndex = prevStudents.findIndex(s => s.id === targetSim.id);
        if (existingIndex >= 0) {
          const updated = [...prevStudents];
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: matchedStatus,
            timestamp: timeString,
            confidence: confidenceScore,
            device: randomDevice.name
          };
          return updated;
        } else {
          return [
            {
              id: targetSim.id,
              name: targetSim.name,
              classSection: targetSim.classSection,
              rollNo: `${Math.floor(1000 + Math.random() * 9000)}`,
              status: matchedStatus,
              timestamp: timeString,
              confidence: confidenceScore,
              device: randomDevice.name,
              avatar: targetSim.avatar,
              history: [{ date: "Jul 26", status: matchedStatus, time: timeString }]
            },
            ...prevStudents
          ];
        }
      });

      // Update scan count on target device
      setDevices(prevDevices => 
        prevDevices.map(d => d.id === randomDevice.id ? { ...d, scansToday: d.scansToday + 1, lastPing: "Just now" } : d)
      );

      // Trigger brief syncing indicator
      setSyncStatus("syncing");
      setTimeout(() => {
        setSyncStatus("synced");
        setLastSyncTime("Just now");
      }, 1200);

    }, 7000); // Trigger every 7 seconds

    return () => clearInterval(interval);
  }, [isSimulationActive, devices]);

  // Auth Handlers
  const login = (role = "Principal / Admin") => {
    setUser({
      name: role === "Principal / Admin" ? "Dr. Ram Kumar Adhikari" : "Prof. Sita Dahal",
      role: role,
      email: role === "Principal / Admin" ? "principal@nss.edu.np" : "teacher@nss.edu.np",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Simulation Handler
  const toggleSimulation = () => {
    setIsSimulationActive(prev => !prev);
  };

  // Device Toggle Handler
  const toggleDeviceStatus = (deviceId) => {
    setDevices(prev => prev.map(dev => {
      if (dev.id === deviceId) {
        const nextStatus = dev.status === 'online' ? 'offline' : 'online';
        return { ...dev, status: nextStatus, lastPing: nextStatus === 'online' ? 'Just now' : 'Disconnected' };
      }
      return dev;
    }));
  };

  // Dismiss Security Alert
  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
    if (selectedAlert?.id === alertId) setSelectedAlert(null);
  };

  // Force Manual System Sync
  const triggerManualSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("synced");
      setLastSyncTime("Just now");
    }, 1500);
  };

  // Override Student Attendance
  const overrideAttendance = (studentId, newStatus) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: newStatus,
          timestamp: newStatus === 'absent' ? '-' : s.timestamp === '-' ? new Date().toLocaleTimeString() : s.timestamp
        };
      }
      return s;
    }));
  };

  // Computed Metrics
  const totalStudentsCount = students.length;
  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const attendanceRate = totalStudentsCount > 0 
    ? (((presentCount + lateCount) / totalStudentsCount) * 100).toFixed(1) 
    : 0;

  return (
    <AttendanceContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isSimulationActive,
        toggleSimulation,
        syncStatus,
        lastSyncTime,
        triggerManualSync,
        students,
        liveMatches,
        devices,
        toggleDeviceStatus,
        alerts,
        dismissAlert,
        searchQuery,
        setSearchQuery,
        filterSection,
        setFilterSection,
        filterStatus,
        setFilterStatus,
        selectedStudent,
        setSelectedStudent,
        selectedAlert,
        setSelectedAlert,
        overrideAttendance,
        totalStudentsCount,
        presentCount,
        absentCount,
        lateCount,
        attendanceRate
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
