import React from 'react';
import { colors } from '../../theme/tokens';

export const ConfidenceRing = ({ match, size = 44, strokeWidth = 3, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let strokeColor = colors.green; // >= 95
  let strokeDasharray = `${circumference}`;
  let strokeDashoffset = 0;

  if (match === null || match === undefined) {
    strokeColor = "#E3E7EE"; // Reference exact dashed no-scan color
    strokeDasharray = "3, 3";
    strokeDashoffset = 0;
  } else {
    if (match >= 95) {
      strokeColor = colors.green; // #1C9B6B
    } else if (match >= 80) {
      strokeColor = colors.amber; // #DD7E22
    } else {
      strokeColor = colors.red; // #B23A2E
    }

    const pct = Math.min(Math.max(match, 0), 100);
    strokeDashoffset = circumference - (pct / 100) * circumference;
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)', pointerEvents: 'none' }}
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E3E7EE"
          strokeWidth={strokeWidth}
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap={match === null ? "butt" : "round"}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>

      {/* Inner Avatar / Child */}
      <div style={{
        width: size - strokeWidth * 3,
        height: size - strokeWidth * 3,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F1F2F4'
      }}>
        {children}
      </div>
    </div>
  );
};
