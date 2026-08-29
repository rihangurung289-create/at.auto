import React from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const TrendChart = ({
  dataPoints = [
    { day: "Mon", rate: 92.4 },
    { day: "Tue", rate: 94.8 },
    { day: "Wed", rate: 93.1 },
    { day: "Thu", rate: 95.6 },
    { day: "Fri", rate: 94.2 }
  ]
}) => {
  const labels = dataPoints.map(d => d.day);
  const rates = dataPoints.map(d => d.rate);

  // Point radius array: 0 for all points except the last (today's) point which is 5px
  const pointRadii = rates.map((_, idx) => (idx === rates.length - 1 ? 5 : 0));
  const pointHoverRadii = rates.map(() => 6);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: rates,
        borderColor: '#17284A', // Exact 2.5px line color
        borderWidth: 2.5,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const chartArea = context.chart.chartArea;
          if (!chartArea) return 'rgba(23,40,74,0.15)';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(23,40,74,0.22)');
          gradient.addColorStop(1, 'rgba(23,40,74,0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#17284A',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: pointRadii,
        pointHoverRadius: pointHoverRadii
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#101B2D',
        titleFont: { family: 'Poppins', size: 12, weight: '600' },
        bodyFont: { family: 'Inter', size: 11, weight: '500' },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}% Attendance`
        }
      }
    },
    scales: {
      y: {
        min: 80,
        max: 100,
        ticks: {
          stepSize: 5,
          callback: (value) => `${value}%`,
          font: { family: 'Inter', size: 10 },
          color: colors.sub
        },
        grid: {
          color: '#E3E7EE',
          drawBorder: false
        },
        border: { display: false } // Hidden axis line
      },
      x: {
        ticks: {
          font: { family: 'Inter', size: 11, weight: '500' },
          color: colors.sub
        },
        grid: { display: false },
        border: { display: false } // Hidden axis line
      }
    }
  };

  return (
    <div style={{
      ...cardBase,
      padding: "1.25rem 1.4rem",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h3 style={{
            fontFamily: fonts.headline,
            fontSize: "0.95rem",
            fontWeight: 600,
            color: colors.navy,
            margin: 0
          }}>
            Weekly Attendance Trend
          </h3>
          <span style={{ fontFamily: fonts.body, fontSize: "0.72rem", color: colors.sub }}>
            Biometric recognition check-ins (Mon – Fri)
          </span>
        </div>

        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "3px 8px",
          borderRadius: "6px",
          backgroundColor: "#E3F5EC",
          color: "#127A50",
          fontSize: "0.72rem",
          fontWeight: 600,
          fontFamily: fonts.body
        }}>
          <TrendingUp size={12} /> 94.2% Avg Rate
        </span>
      </div>

      <div style={{ height: "190px", width: "100%" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
