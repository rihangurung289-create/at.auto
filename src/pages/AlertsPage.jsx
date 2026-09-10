import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../theme/tokens';
import { INITIAL_ALERTS } from '../data/mockData';
import { AlertTriangle, ShieldAlert, WifiOff, Eye, Check, X, Filter } from 'lucide-react';

export const AlertsPage = ({ alerts, onDismissAlert, onResolveAll }) => {
  const [severityFilter, setSeverityFilter] = useState('all');

  const severityMap = {
    all: alerts,
    warning: alerts.filter(a => a.severity === 'warning' || a.severity === 'flagged'),
    info: alerts.filter(a => a.severity === 'info'),
    error: alerts.filter(a => a.severity === 'error')
  };

  const filtered = severityMap[severityFilter] || alerts;

  const severityOptions = [
    { key: 'all', label: 'All Incidents', count: alerts.length },
    { key: 'warning', label: 'Critical Warning', count: severityMap.warning.length },
    { key: 'info', label: 'Low Confidence', count: severityMap.info.length },
    { key: 'error', label: 'Hardware Timeout', count: severityMap.error.length }
  ];

  const getSeverityStyle = (severity) => {
    if (severity === 'error') return { bg: colors.coralLight, border: colors.coralBorder, fg: colors.coralDark, icon: <WifiOff size={18} color={colors.coralDark} /> };
    if (severity === 'warning' || severity === 'flagged') return { bg: '#FFF7ED', border: '#FED7AA', fg: '#C2410C', icon: <ShieldAlert size={18} color="#C2410C" /> };
    return { bg: colors.sapphireLight, border: colors.sapphireBorder, fg: colors.sapphire, icon: <AlertTriangle size={18} color={colors.sapphire} /> };
  };

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontFamily: fonts.headline, fontSize: '1.35rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
            Security & System Alerts
          </h2>
          <p style={{ fontFamily: fonts.body, fontSize: '0.82rem', color: colors.sub, margin: '2px 0 0 0' }}>
            Active incident log, anomaly reports, and hardware failure notifications
          </p>
        </div>
        {alerts.length > 0 && (
          <button
            onClick={onResolveAll}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', borderRadius: 8,
              border: `1px solid ${colors.border}`, backgroundColor: colors.card,
              color: colors.slate, fontFamily: fonts.body, fontSize: '0.82rem',
              fontWeight: 600, cursor: 'pointer'
            }}
          >
            <Check size={16} /> Resolve All ({alerts.length})
          </button>
        )}
      </div>

      {/* Summary stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ ...cardBase, padding: '1rem 1.25rem', borderLeft: `4px solid ${colors.coral}` }}>
          <span style={{ fontFamily: fonts.body, fontSize: '0.7rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Active Incidents</span>
          <div style={{ fontFamily: fonts.headline, fontSize: '1.65rem', fontWeight: 700, color: colors.navy }}>{alerts.length}</div>
          <span style={{ fontFamily: fonts.body, fontSize: '0.72rem', color: colors.coralDark, fontWeight: 600 }}>Requires admin review</span>
        </div>
        <div style={{ ...cardBase, padding: '1rem 1.25rem', borderLeft: `4px solid ${colors.amber}` }}>
          <span style={{ fontFamily: fonts.body, fontSize: '0.7rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Critical Warnings</span>
          <div style={{ fontFamily: fonts.headline, fontSize: '1.65rem', fontWeight: 700, color: colors.navy }}>{severityMap.warning.length}</div>
          <span style={{ fontFamily: fonts.body, fontSize: '0.72rem', color: colors.amberDark, fontWeight: 600 }}>Unknown faces or low match</span>
        </div>
        <div style={{ ...cardBase, padding: '1rem 1.25rem', borderLeft: `4px solid ${colors.sapphire}` }}>
          <span style={{ fontFamily: fonts.body, fontSize: '0.7rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Hardware Timeouts</span>
          <div style={{ fontFamily: fonts.headline, fontSize: '1.65rem', fontWeight: 700, color: colors.navy }}>{severityMap.error.length}</div>
          <span style={{ fontFamily: fonts.body, fontSize: '0.72rem', color: colors.sub }}>Offline gate terminals</span>
        </div>
      </div>

      {/* Severity Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Filter size={16} color={colors.sub} />
        {severityOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => setSeverityFilter(opt.key)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: 999,
              border: `1px solid ${severityFilter === opt.key ? colors.sapphire : colors.border}`,
              backgroundColor: severityFilter === opt.key ? colors.sapphireLight : colors.card,
              color: severityFilter === opt.key ? colors.sapphire : colors.sub,
              fontFamily: fonts.body, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer'
            }}
          >
            {opt.label}
            <span style={{ backgroundColor: severityFilter === opt.key ? colors.sapphire : colors.canvas, color: severityFilter === opt.key ? '#fff' : colors.sub, borderRadius: 999, padding: '0px 6px', fontSize: '0.68rem' }}>
              {opt.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      {filtered.length === 0 ? (
        <div style={{ ...cardBase, padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', backgroundColor: colors.emeraldLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={26} color={colors.emeraldDark} />
          </div>
          <h3 style={{ fontFamily: fonts.headline, fontSize: '1.05rem', fontWeight: 700, color: colors.navy, margin: 0 }}>All Systems Secure</h3>
          <p style={{ fontFamily: fonts.body, fontSize: '0.82rem', color: colors.sub, margin: 0 }}>No active security anomalies or offline gate terminals.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filtered.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            return (
              <div
                key={alert.id}
                style={{
                  ...cardBase, padding: '1.25rem 1.35rem',
                  borderLeft: `4px solid ${style.fg}`,
                  display: 'flex', alignItems: 'flex-start',
                  justifyContent: 'space-between', gap: '1rem',
                  backgroundColor: style.bg
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>{style.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontFamily: fonts.body, fontWeight: 700, color: style.fg, fontSize: '0.9rem' }}>{alert.title}</span>
                      <span style={{ fontFamily: fonts.mono, fontSize: '0.7rem', color: colors.sub }}>
                        {alert.id} • {alert.timestamp} • {alert.location}
                      </span>
                    </div>
                    <p style={{ fontFamily: fonts.body, fontSize: '0.78rem', color: colors.slate, margin: 0, lineHeight: 1.4 }}>
                      {alert.description}
                    </p>
                    {alert.confidence && (
                      <span style={{ display: 'inline-block', marginTop: 6, fontFamily: fonts.mono, fontSize: '0.72rem', color: colors.sub }}>
                        Biometric Match Confidence: {alert.confidence}%
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  {alert.snapshotUrl && (
                    <button
                      onClick={() => alert && window.alert(`Snapshot preview: ${alert.title}`)}
                      title="View evidence snapshot"
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: colors.slate, padding: 4, borderRadius: 6 }}
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => onDismissAlert && onDismissAlert(alert.id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '4px 10px', borderRadius: 6,
                      border: `1px solid ${style.fg}`, backgroundColor: 'rgba(255,255,255,0.7)',
                      color: style.fg, fontFamily: fonts.body, fontSize: '0.74rem', fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    <X size={13} /> Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
