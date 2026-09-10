import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../theme/tokens';
import { AttendanceHeatmap } from '../components/dashboard/AttendanceHeatmap';
import { Calendar, TrendingUp, Award, Clock, ArrowUpRight, BarChart2 } from 'lucide-react';
import { CLASS_PERFORMANCE_DATA } from '../data/mockData';

export const HeatmapPage = () => {
  const [activeTab, setActiveTab] = useState('matrix');

  const dayStats = [
    { day: "Sunday", rate: 96.8, present: 1220, badge: "Highest Attendance" },
    { day: "Monday", rate: 95.4, present: 1202, badge: "Consistent" },
    { day: "Tuesday", rate: 94.2, present: 1187, badge: "Normal" },
    { day: "Wednesday", rate: 95.9, present: 1208, badge: "Mid-week Peak" },
    { day: "Thursday", rate: 93.6, present: 1179, badge: "Normal" },
    { day: "Friday", rate: 91.2, present: 1149, badge: "Needs Attention" }
  ];

  return (
    <div className="page-enter" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontFamily: fonts.headline, fontSize: "1.35rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
          Attendance Activity Heatmap & Trends
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: "0.82rem", color: colors.sub, margin: "2px 0 0 0" }}>
          Longitudinal presence matrix, day-of-week breakdown, and section rankings
        </p>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem"
        }}
      >
        <div style={{ ...cardBase, padding: "1.25rem", borderLeft: `4px solid ${colors.emerald}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 700, color: colors.sub, textTransform: "uppercase" }}>
              Semester Attendance Average
            </span>
            <TrendingUp size={18} color={colors.emerald} />
          </div>
          <div style={{ fontFamily: fonts.headline, fontSize: "1.65rem", fontWeight: 700, color: colors.navy, margin: "4px 0" }}>
            95.2%
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.74rem", color: colors.emeraldDark, fontWeight: 600 }}>
            +1.8% higher than spring term
          </span>
        </div>

        <div style={{ ...cardBase, padding: "1.25rem", borderLeft: `4px solid ${colors.sapphire}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 700, color: colors.sub, textTransform: "uppercase" }}>
              Peak Attendance Day
            </span>
            <Calendar size={18} color={colors.sapphire} />
          </div>
          <div style={{ fontFamily: fonts.headline, fontSize: "1.65rem", fontWeight: 700, color: colors.navy, margin: "4px 0" }}>
            Sundays (96.8%)
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.74rem", color: colors.sub }}>
            1,220 avg daily present check-ins
          </span>
        </div>

        <div style={{ ...cardBase, padding: "1.25rem", borderLeft: `4px solid ${colors.amber}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", fontWeight: 700, color: colors.sub, textTransform: "uppercase" }}>
              Current 90%+ Streak
            </span>
            <Award size={18} color={colors.amber} />
          </div>
          <div style={{ fontFamily: fonts.headline, fontSize: "1.65rem", fontWeight: 700, color: colors.navy, margin: "4px 0" }}>
            19 School Days
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: "0.74rem", color: colors.amberDark, fontWeight: 600 }}>
            Active campus streak
          </span>
        </div>
      </div>

      {/* Main Heatmap Matrix Component */}
      <AttendanceHeatmap weeksCount={6} />

      {/* Two Columns: Day-of-Week Distribution + Class Rankings */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem"
        }}
      >
        {/* Day-of-Week Analysis */}
        <div style={{ ...cardBase, padding: "1.25rem 1.4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Clock size={18} color={colors.sapphire} />
            <h3 style={{ fontFamily: fonts.headline, fontSize: "0.95rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
              Day of Week Attendance Breakdown
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {dayStats.map((ds) => (
              <div key={ds.day} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                  <span style={{ fontFamily: fonts.body, fontWeight: 600, color: colors.navy }}>{ds.day}</span>
                  <span style={{ fontFamily: fonts.headline, fontWeight: 700, color: colors.navy }}>
                    {ds.rate}% <span style={{ fontFamily: fonts.body, fontSize: "0.7rem", color: colors.sub, fontWeight: 400 }}>({ds.present} students)</span>
                  </span>
                </div>
                <div style={{ width: "100%", height: 8, backgroundColor: colors.canvas, borderRadius: 999, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${ds.rate}%`,
                      height: "100%",
                      backgroundColor: ds.rate >= 95 ? colors.emerald : ds.rate >= 93 ? colors.sapphire : colors.amber,
                      borderRadius: 999
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Leaderboard */}
        <div style={{ ...cardBase, padding: "1.25rem 1.4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <BarChart2 size={18} color={colors.emeraldDark} />
            <h3 style={{ fontFamily: fonts.headline, fontSize: "0.95rem", fontWeight: 700, color: colors.navy, margin: 0 }}>
              Section Performance Ranking
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {CLASS_PERFORMANCE_DATA.labels.map((cls, idx) => {
              const rate = CLASS_PERFORMANCE_DATA.rates[idx];
              const isTop = idx === 3; // Gr 12 Sci A

              return (
                <div
                  key={cls}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.65rem 0.85rem",
                    borderRadius: 8,
                    backgroundColor: isTop ? colors.emeraldLight : colors.cardSubtle,
                    border: `1px solid ${isTop ? colors.emeraldBorder : colors.border}`
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: isTop ? colors.emerald : colors.slate,
                        color: "#FFFFFF",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ fontFamily: fonts.body, fontSize: "0.82rem", fontWeight: 600, color: colors.navy }}>
                      {cls}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: fonts.headline,
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: isTop ? colors.emeraldDark : colors.navy
                    }}
                  >
                    {rate}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
