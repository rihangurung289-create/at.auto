import React from 'react';
import { KpiStrip } from '../components/dashboard/KpiStrip';
import { AttendanceTrendChart } from '../components/dashboard/AttendanceTrendChart';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { AttendanceHeatmap } from '../components/dashboard/AttendanceHeatmap';
import { StudentTable } from '../components/dashboard/StudentTable';
import { colors, fonts } from '../theme/tokens';
import { Shield, ArrowRight, CheckCircle, Users, Cpu } from 'lucide-react';

export const OverviewPage = ({
  students = [],
  alerts = [],
  onDismissAlert,
  onResolveAllAlerts,
  onSelectStudent,
  onNavigate
}) => {
  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* 1. FLUID RESPONSIVE KPI STRIP WITH 60-30-10 ACCENT COLORS */}
      <KpiStrip
        presentCount={1206}
        totalCount={1260}
        absentCount={54}
        avgConfidence={96.4}
        devicesOnline={3}
        totalDevices={4}
      />

      {/* 2. ROW 1: Attendance Trend Chart (replaces fake Live Scanner) (~60%) + AlertsPanel (~40%) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "1.25rem",
          alignItems: "stretch"
        }}
        className="asymmetric-row-1"
      >
        <AttendanceTrendChart onSelectStudent={onSelectStudent} />
        <AlertsPanel
          alerts={alerts}
          onDismissAlert={onDismissAlert}
          onResolveAll={onResolveAllAlerts}
        />
      </div>

      {/* 3. ROW 2: AttendanceHeatmap (~40%) + StudentTable grouped by class (~60%) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "1.25rem",
          alignItems: "stretch"
        }}
        className="asymmetric-row-2"
      >
        <AttendanceHeatmap />
        <StudentTable
          students={students}
          searchQuery=""
          selectedClass="All"
          selectedStatus="All"
          onSelectStudent={onSelectStudent}
        />
      </div>

      {/* 4. QUICK PORTAL NAVIGATION CARDS (Direct deep link to other pages) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem"
        }}
      >
        <div
          onClick={() => onNavigate('students')}
          style={{
            backgroundColor: colors.card,
            padding: "1.1rem 1.25rem",
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "all 0.15s ease",
            borderLeft: `4px solid ${colors.sapphire}`
          }}
          className="table-row-hover"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.sapphireLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={18} color={colors.sapphire} />
            </div>
            <div>
              <h4 style={{ fontFamily: fonts.headline, fontSize: "0.88rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
                Student Directory
              </h4>
              <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
                Manage all student profiles & rosters
              </span>
            </div>
          </div>
          <ArrowRight size={16} color={colors.sub} />
        </div>

        <div
          onClick={() => onNavigate('devices')}
          style={{
            backgroundColor: colors.card,
            padding: "1.1rem 1.25rem",
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "all 0.15s ease",
            borderLeft: `4px solid ${colors.emerald}`
          }}
          className="table-row-hover"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.emeraldLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Cpu size={18} color={colors.emeraldDark} />
            </div>
            <div>
              <h4 style={{ fontFamily: fonts.headline, fontSize: "0.88rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
                Gate Terminals
              </h4>
              <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
                Test hardware pings & camera gates
              </span>
            </div>
          </div>
          <ArrowRight size={16} color={colors.sub} />
        </div>

        <div
          onClick={() => onNavigate('reports')}
          style={{
            backgroundColor: colors.card,
            padding: "1.1rem 1.25rem",
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "all 0.15s ease",
            borderLeft: `4px solid ${colors.amber}`
          }}
          className="table-row-hover"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: colors.amberLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={18} color={colors.amberDark} />
            </div>
            <div>
              <h4 style={{ fontFamily: fonts.headline, fontSize: "0.88rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
                Generate Reports
              </h4>
              <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
                Export customized daily attendance logs
              </span>
            </div>
          </div>
          <ArrowRight size={16} color={colors.sub} />
        </div>
      </div>
    </div>
  );
};
