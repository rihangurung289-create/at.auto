// Mock Data for National School of Sciences (NSS) Biometric Attendance Intelligence

export const INITIAL_STUDENTS = [
  {
    id: "NSS-2024-001",
    name: "Aarav Sharma",
    classSection: "Grade 12 Science A",
    rollNo: "1201",
    status: "present",
    timestamp: "08:14:22 AM",
    confidence: 99.2,
    device: "Main Entrance Gate 1",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "present", time: "08:14 AM" },
      { date: "Jul 25", status: "present", time: "08:10 AM" },
      { date: "Jul 24", status: "late", time: "08:35 AM" },
      { date: "Jul 23", status: "present", time: "08:12 AM" },
      { date: "Jul 22", status: "present", time: "08:08 AM" },
    ]
  },
  {
    id: "NSS-2024-002",
    name: "Sujata Adhikari",
    classSection: "Grade 12 Science A",
    rollNo: "1202",
    status: "present",
    timestamp: "08:16:05 AM",
    confidence: 98.7,
    device: "Main Entrance Gate 1",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "present", time: "08:16 AM" },
      { date: "Jul 25", status: "present", time: "08:15 AM" },
      { date: "Jul 24", status: "present", time: "08:11 AM" },
      { date: "Jul 23", status: "present", time: "08:14 AM" },
      { date: "Jul 22", status: "present", time: "08:09 AM" },
    ]
  },
  {
    id: "NSS-2024-003",
    name: "Rohan Shrestha",
    classSection: "Grade 12 Management B",
    rollNo: "1245",
    status: "late",
    timestamp: "08:38:12 AM",
    confidence: 94.5,
    device: "Main Entrance Gate 2",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "late", time: "08:38 AM" },
      { date: "Jul 25", status: "present", time: "08:19 AM" },
      { date: "Jul 24", status: "present", time: "08:18 AM" },
      { date: "Jul 23", status: "absent", time: "-" },
      { date: "Jul 22", status: "present", time: "08:20 AM" },
    ]
  },
  {
    id: "NSS-2024-004",
    name: "Pooja Karki",
    classSection: "Grade 11 Science B",
    rollNo: "1112",
    status: "present",
    timestamp: "08:09:41 AM",
    confidence: 99.8,
    device: "Science Building Kiosk",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "present", time: "08:09 AM" },
      { date: "Jul 25", status: "present", time: "08:12 AM" },
      { date: "Jul 24", status: "present", time: "08:08 AM" },
      { date: "Jul 23", status: "present", time: "08:10 AM" },
      { date: "Jul 22", status: "present", time: "08:11 AM" },
    ]
  },
  {
    id: "NSS-2024-005",
    name: "Bibek Thapa",
    classSection: "Grade 11 Management A",
    rollNo: "1150",
    status: "absent",
    timestamp: "-",
    confidence: 0,
    device: "-",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "absent", time: "-" },
      { date: "Jul 25", status: "late", time: "08:40 AM" },
      { date: "Jul 24", status: "present", time: "08:20 AM" },
      { date: "Jul 23", status: "present", time: "08:15 AM" },
      { date: "Jul 22", status: "absent", time: "-" },
    ]
  },
  {
    id: "NSS-2024-006",
    name: "Ananya Gautam",
    classSection: "Grade 12 Science B",
    rollNo: "1218",
    status: "present",
    timestamp: "08:21:10 AM",
    confidence: 97.4,
    device: "Main Entrance Gate 1",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "present", time: "08:21 AM" },
      { date: "Jul 25", status: "present", time: "08:10 AM" },
      { date: "Jul 24", status: "present", time: "08:14 AM" },
      { date: "Jul 23", status: "present", time: "08:12 AM" },
      { date: "Jul 22", status: "present", time: "08:09 AM" },
    ]
  },
  {
    id: "NSS-2024-007",
    name: "Kshitiz Bhattarai",
    classSection: "Grade 11 Science A",
    rollNo: "1105",
    status: "present",
    timestamp: "08:05:30 AM",
    confidence: 99.1,
    device: "Science Building Kiosk",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "present", time: "08:05 AM" },
      { date: "Jul 25", status: "present", time: "08:07 AM" },
      { date: "Jul 24", status: "present", time: "08:06 AM" },
      { date: "Jul 23", status: "present", time: "08:04 AM" },
      { date: "Jul 22", status: "present", time: "08:05 AM" },
    ]
  },
  {
    id: "NSS-2024-008",
    name: "Nisha Poudel",
    classSection: "Grade 12 Management A",
    rollNo: "1230",
    status: "late",
    timestamp: "08:42:19 AM",
    confidence: 91.2,
    device: "Main Entrance Gate 2",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    history: [
      { date: "Jul 26", status: "late", time: "08:42 AM" },
      { date: "Jul 25", status: "present", time: "08:18 AM" },
      { date: "Jul 24", status: "present", time: "08:16 AM" },
      { date: "Jul 23", status: "late", time: "08:31 AM" },
      { date: "Jul 22", status: "present", time: "08:22 AM" },
    ]
  }
];

export const HARDWARE_DEVICES = [
  {
    id: "DEV-01",
    name: "Gate 1 Scanner",
    location: "Main Gate (West Entrance)",
    type: "Biometric Face Camera Terminal",
    status: "online",
    ipAddress: "192.168.1.101",
    lastPing: "Just now",
    scansToday: 482
  },
  {
    id: "DEV-02",
    name: "Gate 2 Scanner",
    location: "Main Gate (East Entrance)",
    type: "Biometric Face Camera Terminal",
    status: "online",
    ipAddress: "192.168.1.102",
    lastPing: "2 sec ago",
    scansToday: 410
  },
  {
    id: "DEV-03",
    name: "Science Block Kiosk",
    location: "Science Building Foyer",
    type: "Dual-Lens AI Recognition Kiosk",
    status: "online",
    ipAddress: "192.168.1.105",
    lastPing: "5 sec ago",
    scansToday: 314
  },
  {
    id: "DEV-04",
    name: "Library Terminal",
    location: "Central Library Entrance",
    type: "Wall-mount Recognition Unit",
    status: "offline",
    ipAddress: "192.168.1.108",
    lastPing: "14 mins ago",
    scansToday: 0
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-801",
    title: "Unknown Face Detected",
    description: "Unregistered individual detected at Gate 2 Camera with low matching threshold.",
    severity: "warning",
    timestamp: "08:42:10 AM",
    location: "Main Entrance Gate 2",
    confidence: 54.2,
    snapshotUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    status: "active"
  },
  {
    id: "ALT-802",
    title: "Low Confidence Face Match",
    description: "Face scan match for Rohan Shrestha (NSS-2024-003) below standard 85% threshold.",
    severity: "info",
    timestamp: "08:38:12 AM",
    location: "Main Entrance Gate 2",
    confidence: 71.8,
    snapshotUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "active"
  },
  {
    id: "ALT-803",
    title: "Library Scanner Offline",
    description: "Device DEV-04 (Library Terminal) lost connectivity or ping timeout.",
    severity: "error",
    timestamp: "08:15:00 AM",
    location: "Central Library Entrance",
    confidence: null,
    snapshotUrl: null,
    status: "active"
  }
];

export const ATTENDANCE_TREND_WEEK = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  present: [92.4, 94.8, 93.1, 95.6, 94.2],
  late: [4.2, 3.1, 4.5, 2.8, 3.6],
  absent: [3.4, 2.1, 2.4, 1.6, 2.2]
};

export const ATTENDANCE_TREND_MONTH = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  present: [91.8, 93.5, 94.0, 94.2],
  late: [4.8, 3.8, 3.5, 3.6],
  absent: [3.4, 2.7, 2.5, 2.2]
};

export const CLASS_PERFORMANCE_DATA = {
  labels: ["Gr. 11 Sci A", "Gr. 11 Sci B", "Gr. 11 Mgmt", "Gr. 12 Sci A", "Gr. 12 Sci B", "Gr. 12 Mgmt"],
  rates: [96.5, 94.0, 89.8, 98.2, 95.1, 91.4]
};

// Simulation Pool of Random Students for real-time live events
export const SIMULATION_POOL = [
  { name: "Suman Dahal", id: "NSS-2024-009", classSection: "Grade 11 Science A", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { name: "Kripa Regmi", id: "NSS-2024-010", classSection: "Grade 12 Science B", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
  { name: "Manish Gurung", id: "NSS-2024-011", classSection: "Grade 11 Management B", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { name: "Prashant Koirala", id: "NSS-2024-012", classSection: "Grade 12 Management A", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { name: "Reema Bhandari", id: "NSS-2024-013", classSection: "Grade 11 Science B", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }
];
