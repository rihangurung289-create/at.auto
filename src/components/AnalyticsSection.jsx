import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { ATTENDANCE_TREND_WEEK, ATTENDANCE_TREND_MONTH, CLASS_PERFORMANCE_DATA } from '../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { TrendingUp, PieChart as PieIcon, BarChart3, Filter } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsSection = () => {
  const { presentCount, absentCount, lateCount } = useAttendance();
  const [timeframe, setTimeframe] = useState('week'); // 'week' | 'month'

  const trendData = timeframe === 'week' ? ATTENDANCE_TREND_WEEK : ATTENDANCE_TREND_MONTH;

  // Line/Area Chart Config
  const lineChartData = {
    labels: trendData.labels,
    datasets: [
      {
        label: 'Present %',
        data: trendData.present,
        borderColor: '#2563EB',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0.01)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#2563EB',
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Late %',
        data: trendData.late,
        borderColor: '#F97316',
        backgroundColor: 'transparent',
        borderDash: [4, 4],
        tension: 0.35,
        pointRadius: 3
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { boxWidth: 12, usePointStyle: true, font: { family: 'Inter', size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0F2C59',
        titleFont: { family: 'Poppins', size: 12 },
        bodyFont: { family: 'Inter', size: 11 },
        padding: 10,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        min: 80,
        max: 100,
        ticks: { stepSize: 5, callback: (v) => `${v}%`, font: { size: 10 } },
        grid: { color: '#F1F5F9' }
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false }
      }
    }
  };

  // Donut Chart Config
  const doughnutData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [
      {
        data: [presentCount, absentCount, lateCount],
        backgroundColor: ['#10B981', '#EF4444', '#F97316'],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 4
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 10, usePointStyle: true, font: { family: 'Inter', size: 11 } }
      }
    },
    cutout: '72%'
  };

  // Bar Chart Config
  const barData = {
    labels: CLASS_PERFORMANCE_DATA.labels,
    datasets: [
      {
        label: 'Attendance Rate %',
        data: CLASS_PERFORMANCE_DATA.rates,
        backgroundColor: '#0F2C59',
        borderRadius: 6,
        hoverBackgroundColor: '#2563EB'
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F2C59',
        padding: 8,
        callbacks: { label: (context) => ` Rate: ${context.parsed.y}%` }
      }
    },
    scales: {
      y: {
        min: 75,
        max: 100,
        ticks: { stepSize: 5, callback: (v) => `${v}%`, font: { size: 9 } },
        grid: { color: '#F1F5F9' }
      },
      x: {
        ticks: { font: { size: 9 } },
        grid: { display: false }
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      
      {/* BI Layout Top Row */}
      <div className="grid-bi-layout">

        {/* Panel 1: Attendance Trend Chart */}
        <div className="nss-card" style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingUp size={18} color="#2563EB" />
              </div>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-900)" }}>
                  Biometric Attendance Trends
                </h3>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                  Real-time pattern analysis across streams
                </span>
              </div>
            </div>

            {/* Week / Month Toggle */}
            <div style={{ display: "flex", background: "#F1F5F9", padding: "3px", borderRadius: "8px" }}>
              <button
                onClick={() => setTimeframe('week')}
                style={{
                  padding: "0.3rem 0.65rem",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: timeframe === 'week' ? "white" : "transparent",
                  color: timeframe === 'week' ? "#0F2C59" : "#64748B",
                  boxShadow: timeframe === 'week' ? "var(--shadow-subtle)" : "none"
                }}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('month')}
                style={{
                  padding: "0.3rem 0.65rem",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: timeframe === 'month' ? "white" : "transparent",
                  color: timeframe === 'month' ? "#0F2C59" : "#64748B",
                  boxShadow: timeframe === 'month' ? "var(--shadow-subtle)" : "none"
                }}
              >
                Monthly
              </button>
            </div>
          </div>

          <div style={{ height: "240px", width: "100%" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Panel 2: Present / Absent / Late Breakdown Chart */}
        <div className="nss-card" style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PieIcon size={18} color="#10B981" />
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-900)" }}>
                Status Distribution
              </h3>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Today's biometric breakdown
              </span>
            </div>
          </div>

          <div style={{ height: "200px", position: "relative" }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div style={{
              position: "absolute",
              top: "43%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none"
            }}>
              <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0F2C59" }}>
                {presentCount + lateCount}
              </span>
              <span style={{ fontSize: "0.65rem", color: "#64748B", display: "block", textTransform: "uppercase" }}>
                Checked In
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* BI Layout Bottom Row: Class Performance Bar Chart */}
      <div className="nss-card" style={{ padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart3 size={18} color="#0F2C59" />
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--primary-900)" }}>
                Section & Faculty Performance
              </h3>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Comparing Grade 11 & 12 Science and Management streams
              </span>
            </div>
          </div>
        </div>

        <div style={{ height: "180px", width: "100%" }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

    </div>
  );
};
