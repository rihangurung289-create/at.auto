import React from 'react';
import { ConfidenceRing } from './ConfidenceRing';
import { colors, fonts } from '../../theme/tokens';

export const initials = (name = "") => {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar = ({ name, photoUrl, match = null, size = 44 }) => {
  return (
    <ConfidenceRing match={match} size={size}>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name || "Avatar"}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span style={{
          fontFamily: fonts.body,
          fontSize: size * 0.32,
          fontWeight: 600,
          color: colors.navy,
          userSelect: "none"
        }}>
          {initials(name)}
        </span>
      )}
    </ConfidenceRing>
  );
};
