import React from 'react';
import { TrendingUp } from 'lucide-react';
import { colors, fonts } from '../../theme/tokens';

export const TrendTag = ({ value = "+2.4%", label = "vs yesterday" }) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        padding: "2px 8px",
        borderRadius: "6px",
        backgroundColor: "#E3F5EC",
        color: "#127A50",
        fontSize: "0.72rem",
        fontWeight: 600,
        fontFamily: fonts.body
      }}>
        <TrendingUp size={11} color="#127A50" />
        {value}
      </span>
      {label && (
        <span style={{ fontSize: "0.72rem", color: colors.muted, fontFamily: fonts.body }}>
          {label}
        </span>
      )}
    </div>
  );
};
