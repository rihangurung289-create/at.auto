import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Users, CheckCircle, XCircle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCards = () => {
  const { totalStudentsCount, presentCount, absentCount, lateCount } = useAttendance();

  const presentPercentage = totalStudentsCount > 0 ? ((presentCount / totalStudentsCount) * 100).toFixed(1) : 0;
  const absentPercentage = totalStudentsCount > 0 ? ((absentCount / totalStudentsCount) * 100).toFixed(1) : 0;
  const latePercentage = totalStudentsCount > 0 ? ((lateCount / totalStudentsCount) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: "Total Enrolled Students",
      value: totalStudentsCount,
      subtext: "Across Grade 11 & 12",
      icon: Users,
      color: "#2563EB",
      bg: "#EFF6FF",
      border: "#BFDBFE",
      trend: "+12 new enrollments"
    },
    {
      title: "Present Today",
      value: presentCount,
      subtext: `${presentPercentage}% of total enrolled`,
      icon: CheckCircle,
      color: "#10B981",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      trend: "On target"
    },
    {
      title: "Absent",
      value: absentCount,
      subtext: `${absentPercentage}% unexcused/excused`,
      icon: XCircle,
      color: "#EF4444",
      bg: "#FEF2F2",
      border: "#FCA5A5",
      trend: "-0.8% vs avg"
    },
    {
      title: "Late Check-ins",
      value: lateCount,
      subtext: `${latePercentage}% checked in > 08:30 AM`,
      icon: Clock,
      color: "#F97316",
      bg: "#FFF7ED",
      border: "#FDBA74",
      trend: "Monitored by Gate 2"
    }
  ];

  return (
    <div className="grid-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="nss-card"
            style={{
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              cursor: "pointer"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div>
                <span style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {card.title}
                </span>
                <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "var(--primary-900)", marginTop: "0.2rem", lineHeight: "1.1" }}>
                  {card.value}
                </div>
              </div>

              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-md)",
                background: card.bg,
                border: `1px solid ${card.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <IconComponent size={22} color={card.color} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>
                {card.subtext}
              </span>
              <span style={{ fontSize: "0.7rem", fontWeight: "600", color: card.color }}>
                {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
