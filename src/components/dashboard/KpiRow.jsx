import React from 'react';
import { Users, UserX, Wifi } from 'lucide-react';
import { badgeTints } from '../../theme/tokens';
import { KpiCard } from './KpiCard';
import { ConfidenceRing } from './ConfidenceRing';

export const KpiRow = ({
  presentCount = 1206,
  totalCount = 1280,
  absentCount = 54,
  avgConfidence = 96.4,
  devicesOnline = 3,
  totalDevices = 4
}) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.25rem"
    }}>
      {/* 1. Present Today (with count-up animation from 0 on mount) */}
      <KpiCard
        title="Present Today"
        value={presentCount}
        animatedTarget={presentCount}
        subtext={`of ${totalCount} enrolled students`}
        icon={Users}
        tintBg={badgeTints.present.bg}
        iconColor={badgeTints.present.icon}
        trendValue="+2.4%"
        trendLabel="vs yesterday"
      />

      {/* 2. Absent Today */}
      <KpiCard
        title="Absent Today"
        value={absentCount}
        subtext="Unexcused / Excused"
        icon={UserX}
        tintBg={badgeTints.absent.bg}
        iconColor={badgeTints.absent.icon}
        trendValue="-0.8%"
        trendLabel="vs weekly avg"
      />

      {/* 3. Avg. Match Confidence (with Signature ConfidenceRing) */}
      <KpiCard
        title="Avg. Match Confidence"
        value={`${avgConfidence}%`}
        subtext="AI Recognition Threshold"
        confidenceRing={
          <ConfidenceRing match={avgConfidence} size={42} strokeWidth={3}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#17284A' }}>
              {Math.round(avgConfidence)}%
            </span>
          </ConfidenceRing>
        }
      />

      {/* 4. Devices Online */}
      <KpiCard
        title="Devices Online"
        value={`${devicesOnline} / ${totalDevices}`}
        subtext="Hardware Scanners Active"
        icon={Wifi}
        tintBg={badgeTints.devices.bg}
        iconColor={badgeTints.devices.icon}
      />
    </div>
  );
};
