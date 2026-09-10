import React, { useEffect } from 'react';
import {
  X, CheckCircle2, Clock, Calendar,
  MessageSquare, FileText, ShieldCheck, UserCheck
} from 'lucide-react';
import { colors, fonts, statusColors } from '../../theme/tokens';
import { ConfidenceRing } from './ConfidenceRing';
import { StatusBadge } from './StatusBadge';

export const StudentDetailDrawer = ({ student, isOpen, onClose, onUpdateStatus }) => {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;

  const history = student.history || [
    { date: "Jul 26", status: student.status || "present", time: student.lastSeen || "08:14 AM" },
    { date: "Jul 25", status: "present", time: "08:10 AM" },
    { date: "Jul 24", status: "present", time: "08:12 AM" },
    { date: "Jul 23", status: student.status === 'late' ? 'late' : 'present', time: "08:35 AM" },
    { date: "Jul 22", status: student.status === 'absent' ? 'absent' : 'present', time: "08:08 AM" },
  ];

  const matchVal = student.match ?? student.confidence ?? null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex', justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 460, height: '100%',
          backgroundColor: colors.card,
          boxShadow: '-4px 0 32px rgba(15, 23, 42, 0.18)',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem', backgroundColor: colors.navy,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'sticky', top: 0, zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={20} color="#94A3B8" />
            <h2 style={{ fontFamily: fonts.headline, fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Student Profile & Verification
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94A3B8' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.35rem', flex: 1 }}>

          {/* Identity Card */}
          <div style={{ padding: '1.25rem', borderRadius: 12, backgroundColor: colors.cardSubtle, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ flexShrink: 0 }}>
              <ConfidenceRing match={matchVal} size={76} strokeWidth={3.5}>
                {student.photoUrl || student.avatar ? (
                  <img src={student.photoUrl || student.avatar} alt={student.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontFamily: fonts.headline, fontSize: '1.4rem', fontWeight: 700, color: colors.navy }}>
                    {student.name ? student.name[0] : 'S'}
                  </span>
                )}
              </ConfidenceRing>
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h3 style={{ fontFamily: fonts.headline, fontSize: '1.15rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
                  {student.name}
                </h3>
                <StatusBadge status={student.status} />
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: '0.83rem', color: colors.sub, margin: '0 0 0.25rem 0', fontWeight: 500 }}>
                {student.class || student.classSection}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: fonts.mono, fontSize: '0.74rem', color: colors.muted }}>
                <span>{student.id}</span>
                {student.rollNo && <span>• Roll: {student.rollNo}</span>}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem 1rem', borderRadius: 10, backgroundColor: colors.card, border: `1px solid ${colors.sapphireBorder}`, borderLeft: `4px solid ${colors.sapphire}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: colors.sub, fontSize: '0.73rem', marginBottom: 4 }}>
                <ShieldCheck size={14} color={colors.sapphire} />
                <span>Biometric Confidence</span>
              </div>
              <div style={{ fontFamily: fonts.headline, fontSize: '1.3rem', fontWeight: 700, color: colors.navy }}>
                {matchVal !== null ? `${matchVal}%` : '—'}
              </div>
              <span style={{ fontSize: '0.7rem', color: matchVal >= 90 ? colors.emeraldDark : colors.amberDark, fontWeight: 600 }}>
                {matchVal >= 90 ? 'High Confidence Pass' : 'Review Recommended'}
              </span>
            </div>

            <div style={{ padding: '0.85rem 1rem', borderRadius: 10, backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderLeft: `4px solid ${colors.emerald}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: colors.sub, fontSize: '0.73rem', marginBottom: 4 }}>
                <Clock size={14} color={colors.emerald} />
                <span>Last Scan Time</span>
              </div>
              <div style={{ fontFamily: fonts.headline, fontSize: '1.1rem', fontWeight: 700, color: colors.navy }}>
                {student.lastSeen || student.timestamp || '—'}
              </div>
              <span style={{ fontSize: '0.7rem', color: colors.sub }}>
                {student.device || 'Main Campus Gate'}
              </span>
            </div>
          </div>

          {/* 5-Day Timeline */}
          <div>
            <h4 style={{ fontFamily: fonts.headline, fontSize: '0.88rem', fontWeight: 700, color: colors.navy, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Calendar size={15} color={colors.sapphire} /> 5-Day Attendance Timeline
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {history.map((record, i) => {
                const ns = (record.status || 'present').toLowerCase();
                const cp = statusColors[ns] || statusColors.present;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem', borderRadius: 8,
                      border: `1px solid ${cp.border}`, backgroundColor: cp.bg, fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontFamily: fonts.mono, fontWeight: 600, color: colors.navy, minWidth: 56 }}>{record.date}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.6)', color: cp.fg, fontSize: '0.7rem', fontWeight: 700, textTransform: 'capitalize' }}>
                        {ns}
                      </span>
                    </div>
                    <span style={{ fontFamily: fonts.mono, fontSize: '0.73rem', color: colors.sub }}>{record.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Administrative Actions */}
          <div>
            <h4 style={{ fontFamily: fonts.headline, fontSize: '0.88rem', fontWeight: 700, color: colors.navy, marginBottom: '0.75rem' }}>
              Administrative Actions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => { if (onUpdateStatus) onUpdateStatus(student.id, 'present'); onClose(); }}
                  style={{ padding: '0.6rem', borderRadius: 8, border: `1px solid ${colors.emeraldBorder}`, backgroundColor: colors.emeraldLight, color: colors.emeraldDark, fontFamily: fonts.body, fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <CheckCircle2 size={15} /> Mark Present
                </button>
                <button
                  onClick={() => { if (onUpdateStatus) onUpdateStatus(student.id, 'late'); onClose(); }}
                  style={{ padding: '0.6rem', borderRadius: 8, border: `1px solid ${colors.amberBorder}`, backgroundColor: colors.amberLight, color: colors.amberDark, fontFamily: fonts.body, fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Clock size={15} /> Mark Late
                </button>
              </div>
              <button
                onClick={() => alert(`SMS dispatched to parent of ${student.name}.`)}
                style={{ padding: '0.55rem', borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.canvas, color: colors.navy, fontFamily: fonts.body, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <MessageSquare size={15} /> Dispatch Parent SMS Alert
              </button>
              <button
                onClick={() => alert(`Attendance slip generated for ${student.name}.`)}
                style={{ padding: '0.55rem', borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.sub, fontFamily: fonts.body, fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <FileText size={15} /> Export Attendance Slip
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: `1px solid ${colors.border}`, backgroundColor: colors.cardSubtle, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '0.5rem 1.25rem', borderRadius: 8, border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.slate, fontFamily: fonts.body, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
