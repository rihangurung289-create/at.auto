import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import { BarChart3, TrendingUp, Calendar, Users, Award } from 'lucide-react';
import { ATTENDANCE_TREND_WEEK, ATTENDANCE_TREND_MONTH, CLASS_PERFORMANCE_DATA } from '../../data/mockData';

export const AttendanceTrendChart = ({ onSelectStudent, recentEvents = [] }) => {
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const trendData = viewMode === 'week' ? ATTENDANCE_TREND_WEEK : ATTENDANCE_TREND_MONTH;

  return (
    <div
      style={{
        ...cardBase,
        padding: "1.35rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 360
      }}
    >
      {/* Top Header & Switcher */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: colors.sapphireLight,
              border: `1px solid ${colors.sapphireBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BarChart3 size={20} color={colors.sapphire} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: fonts.headline,
                fontSize: "1rem",
                fontWeight: 700,
                color: colors.navy,
                margin: 0
              }}
            >
              ATTENDANCE RATE TRENDS
            </h3>
            <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
              Campus-wide daily attendance distribution
            </span>
          </div>
        </div>

        {/* Week / Month Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: colors.canvas,
            padding: "3px",
            borderRadius: 8,
            border: `1px solid ${colors.border}`
          }}
        >
          <button
            onClick={() => setViewMode('week')}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              border: "none",
              backgroundColor: viewMode === 'week' ? colors.card : "transparent",
              color: viewMode === 'week' ? colors.sapphire : colors.sub,
              fontFamily: fonts.body,
              fontSize: "0.76rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: viewMode === 'week' ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            Past 5 Days
          </button>
          <button
            onClick={() => setViewMode('month')}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              border: "none",
              backgroundColor: viewMode === 'month' ? colors.card : "transparent",
              color: viewMode === 'month' ? colors.sapphire : colors.sub,
              fontFamily: fonts.body,
              fontSize: "0.76rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: viewMode === 'month' ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            Monthly View
          </button>
        </div>
      </div>

      {/* Visual Bar Graph */}
      <div style={{ margin: "1rem 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${trendData.labels.length}, 1fr)`,
            gap: "1rem",
            alignItems: "flex-end",
            height: 150,
            padding: "0 0.5rem 0.5rem 0.5rem",
            borderBottom: `1px solid ${colors.border}`
          }}
        >
          {trendData.labels.map((label, idx) => {
            const presentVal = trendData.present[idx];
            const lateVal = trendData.late[idx];
            const absentVal = trendData.absent[idx];

            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                  gap: "6px"
                }}
              >
                {/* Rate Value Label */}
                <span style={{ fontFamily: fonts.headline, fontSize: "0.78rem", fontWeight: 700, color: colors.navy }}>
                  {presentVal}%
                </span>

                {/* Stacked Bars Container */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: 42,
                    height: `${(presentVal / 100) * 110}px`,
                    backgroundColor: colors.emerald,
                    borderRadius: "6px 6px 0 0",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    transition: "height 0.4s ease",
                    boxShadow: "0 2px 6px rgba(16, 185, 129, 0.25)"
                  }}
                  title={`${label}: ${presentVal}% Present, ${lateVal}% Late, ${absentVal}% Absent`}
                >
                  {/* Late Top Stripe */}
                  <div
                    style={{
                      height: `${(lateVal / presentVal) * 100}%`,
                      minHeight: 4,
                      backgroundColor: colors.amber
                    }}
                  />
                </div>

                {/* Day Label */}
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: colors.sub,
                    marginTop: "2px"
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "0.85rem",
            fontSize: "0.75rem",
            fontFamily: fonts.body,
            color: colors.sub
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: colors.emerald }} />
            <span>On-Time Present</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: colors.amber }} />
            <span>Late Arrival</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: colors.coral }} />
            <span>Absent Unexcused</span>
          </div>
        </div>
      </div>

      {/* Class Leaderboard Performance Highlight Strip */}
      <div
        style={{
          marginTop: "0.5rem",
          padding: "0.75rem 1rem",
          borderRadius: 8,
          backgroundColor: colors.cardSubtle,
          border: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: colors.amberLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Award size={16} color={colors.amberDark} />
          </div>
          <div>
            <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub, display: "block" }}>
              Top Attendance Section
            </span>
            <span style={{ fontFamily: fonts.headline, fontSize: "0.86rem", fontWeight: 700, color: colors.navy }}>
              Grade 12 Science A (98.2%)
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <TrendingUp size={16} color={colors.emerald} />
          <span style={{ fontFamily: fonts.body, fontSize: "0.78rem", fontWeight: 600, color: colors.emeraldDark }}>
            Average: 95.4% this week
          </span>
        </div>
      </div>
    </div>
  );
};
