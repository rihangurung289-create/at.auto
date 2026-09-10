import React from 'react';
import { colors } from '../../theme/tokens';

export const ConfidenceRing = ({ match, size = 44, strokeWidth = 3, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let strokeColor = colors.emerald;
  let strokeDasharray = `${circumference}`;
  let strokeDashoffset = 0;

  if (match === null || match === undefined) {
    strokeColor = colors.border;
    strokeDasharray = "3, 3";
    strokeDashoffset = 0;
  } else {
    if (match >= 95) strokeColor = colors.emerald;
    else if (match >= 80) strokeColor = colors.amber;
    else strokeColor = colors.coral;

    const pct = Math.min(Math.max(match, 0), 100);
    strokeDashoffset = circumference - (pct / 100) * circumference;
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)', pointerEvents: 'none' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={colors.border} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={strokeColor} strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}
          strokeLinecap={match === null ? "butt" : "round"}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div style={{ width: size - strokeWidth * 3, height: size - strokeWidth * 3, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.canvas }}>
        {children}
      </div>
    </div>
  );
};
