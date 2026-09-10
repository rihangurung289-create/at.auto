import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../theme/tokens';
import { Settings, Clock, Shield, Bell, Mail, Save, CheckCircle, Sliders } from 'lucide-react';

export const SettingsPage = () => {
  const [cutoffTime, setCutoffTime] = useState('08:30');
  const [graceMinutes, setGraceMinutes] = useState(15);
  const [matchThreshold, setMatchThreshold] = useState(85);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [schoolName, setSchoolName] = useState('National School of Sciences');
  const [branch, setBranch] = useState('Main Campus, Lalitpur');
  const [term, setTerm] = useState('2024–2025 Academic Year');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 999, cursor: 'pointer', position: 'relative',
        backgroundColor: value ? colors.sapphire : colors.border,
        transition: 'background-color 0.2s ease'
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: value ? 22 : 2, width: 18, height: 18,
        borderRadius: '50%', backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.2s ease'
      }} />
    </div>
  );

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 760 }}>
      <div>
        <h2 style={{ fontFamily: fonts.headline, fontSize: '1.35rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
          System Settings & Preferences
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: '0.82rem', color: colors.sub, margin: '2px 0 0 0' }}>
          Configure school information, biometric rules, and notification automations
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* School Information */}
        <div style={{ ...cardBase, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${colors.border}` }}>
            <Shield size={18} color={colors.sapphire} />
            <h3 style={{ fontFamily: fonts.headline, fontSize: '0.95rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
              Institution Identity
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Institution Name', value: schoolName, setter: setSchoolName },
              { label: 'Campus Branch', value: branch, setter: setBranch },
              { label: 'Academic Term / Year', value: term, setter: setTerm }
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={e => setter(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: 8, border: `1px solid ${colors.borderStrong}`, fontFamily: fonts.body, fontSize: '0.85rem', outline: 'none', backgroundColor: colors.card }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Rules */}
        <div style={{ ...cardBase, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${colors.border}` }}>
            <Clock size={18} color={colors.amber} />
            <h3 style={{ fontFamily: fonts.headline, fontSize: '0.95rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
              Attendance & Gate Rules
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Arrival Cut-off Time
              </label>
              <input
                type="time"
                value={cutoffTime}
                onChange={e => setCutoffTime(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: 8, border: `1px solid ${colors.borderStrong}`, fontFamily: fonts.mono, fontSize: '0.9rem', outline: 'none', backgroundColor: colors.card }}
              />
              <p style={{ fontFamily: fonts.body, fontSize: '0.72rem', color: colors.sub, margin: '4px 0 0 0' }}>
                Students arriving after this time are marked <strong>Late</strong>.
              </p>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Late Grace Period: <strong style={{ color: colors.navy }}>{graceMinutes} minutes</strong>
              </label>
              <input
                type="range" min={0} max={60} step={5}
                value={graceMinutes}
                onChange={e => setGraceMinutes(Number(e.target.value))}
                style={{ width: '100%', accentColor: colors.amber }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.body, fontSize: '0.68rem', color: colors.muted }}>
                <span>0 min</span><span>30 min</span><span>60 min</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Biometric Match Threshold: <strong style={{ color: colors.navy }}>{matchThreshold}%</strong>
              </label>
              <input
                type="range" min={70} max={99} step={1}
                value={matchThreshold}
                onChange={e => setMatchThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: colors.sapphire }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.body, fontSize: '0.68rem', color: colors.muted }}>
                <span>70% (Lenient)</span><span>85% (Recommended)</span><span>99%</span>
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: '0.72rem', color: colors.sub, margin: '4px 0 0 0' }}>
                Scans below <strong>{matchThreshold}%</strong> are flagged for manual review.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Automations */}
        <div style={{ ...cardBase, padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${colors.border}` }}>
            <Bell size={18} color={colors.emerald} />
            <h3 style={{ fontFamily: fonts.headline, fontSize: '0.95rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
              Notification Automations
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                label: 'Parent SMS Alert on Absence',
                desc: 'Automatically dispatch SMS to registered parent contact when a student is marked absent.',
                icon: <Bell size={16} color={colors.emeraldDark} />,
                value: smsEnabled, setter: setSmsEnabled
              },
              {
                label: 'Principal Daily Email Summary',
                desc: 'Send a comprehensive daily attendance summary report to the admin email each evening at 4:00 PM.',
                icon: <Mail size={16} color={colors.sapphire} />,
                value: emailEnabled, setter: setEmailEnabled
              }
            ].map(({ label, desc, icon, value, setter }) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.85rem 1rem', borderRadius: 8,
                  backgroundColor: value ? colors.cardSubtle : colors.canvas,
                  border: `1px solid ${value ? colors.sapphireBorder : colors.border}`,
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <span style={{ fontFamily: fonts.body, fontSize: '0.85rem', fontWeight: 600, color: colors.navy, display: 'block' }}>{label}</span>
                    <span style={{ fontFamily: fonts.body, fontSize: '0.74rem', color: colors.sub }}>{desc}</span>
                  </div>
                </div>
                <Toggle value={value} onChange={setter} />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.5rem', borderRadius: 8, border: 'none',
              backgroundColor: colors.sapphire, color: '#FFF',
              fontFamily: fonts.body, fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
            }}
          >
            <Save size={17} /> Save All Changes
          </button>

          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: colors.emeraldDark, fontFamily: fonts.body, fontSize: '0.85rem', fontWeight: 600 }}>
              <CheckCircle size={18} color={colors.emerald} />
              Settings saved successfully!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
