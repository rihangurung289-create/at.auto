import React from 'react';
import { statusColors, fonts } from '../../theme/tokens';

export const StatusBadge = ({ status = "absent" }) => {
  const normalized = (status || "").toLowerCase();
  const pair = statusColors[normalized] || statusColors.absent;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 9px",
        borderRadius: "9999px",
        backgroundColor: pair.bg,
        color: pair.fg,
        border: `1px solid ${pair.border}`,
        fontSize: "0.73rem",
        fontWeight: 700,
        fontFamily: fonts.body,
        textTransform: "capitalize",
        lineHeight: 1.3
      }}
    >
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: pair.fg }} />
      {normalized}
    </span>
  );
};
