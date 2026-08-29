import React, { useState, useEffect } from 'react';
import { cardBase, colors, fonts } from '../../theme/tokens';
import { TrendTag } from './TrendTag';

export const KpiCard = ({
  title,
  value,
  animatedTarget = null,
  subtext,
  icon: IconComponent,
  tintBg,
  iconColor,
  confidenceRing = null,
  trendValue,
  trendLabel
}) => {
  const [displayCount, setDisplayCount] = useState(animatedTarget !== null ? 0 : value);

  useEffect(() => {
    if (animatedTarget === null) {
      setDisplayCount(value);
      return;
    }

    // Ease-out cubic count-up animation (~700ms) on mount once
    const duration = 700;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeProgress * animatedTarget);

      setDisplayCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [animatedTarget]);

  return (
    <div
      className="kpi-card"
      style={{
        ...cardBase,
        padding: "1.25rem 1.4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div>
          <span style={{
            fontFamily: fonts.body,
            fontSize: "0.78rem",
            fontWeight: 500,
            color: colors.sub,
            textTransform: "uppercase",
            letterSpacing: "0.03em"
          }}>
            {title}
          </span>

          <div style={{
            fontFamily: fonts.headline,
            fontSize: "1.85rem",
            fontWeight: 600,
            color: colors.ink,
            marginTop: "0.2rem",
            lineHeight: 1.1
          }}>
            {animatedTarget !== null ? displayCount : value}
          </div>
        </div>

        {/* Icon Badge or Confidence Ring */}
        {confidenceRing ? (
          confidenceRing
        ) : (
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            backgroundColor: tintBg || colors.canvas,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            {IconComponent && <IconComponent size={20} color={iconColor || colors.navy} />}
          </div>
        )}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "0.65rem",
        borderTop: `1px solid ${colors.border}`
      }}>
        {trendValue ? (
          <TrendTag value={trendValue} label={trendLabel} />
        ) : (
          <span style={{ fontFamily: fonts.body, fontSize: "0.74rem", color: colors.sub }}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
