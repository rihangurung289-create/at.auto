import React, { useState } from 'react';
import { cardBase, colors, fonts } from '../theme/tokens';
import { INITIAL_STUDENTS } from '../data/mockData';
import { FileSpreadsheet, Download, Printer, Calendar, Users, Filter, CheckCircle } from 'lucide-react';

export const ReportsPage = ({ students = [] }) => {
  const [selectedPreset, setSelectedPreset] = useState('today');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isGenerated, setIsGenerated] = useState(false);

  const datePresets = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'this_week', label: 'This Week' },
    { key: 'this_month', label: 'This Month' },
    { key: 'last_30', label: 'Last 30 Days' }
  ];

  const classOptions = ['All Classes', 'Grade 11 Science A', 'Grade 11 Science B', 'Grade 11 Management A', 'Grade 12 Science A', 'Grade 12 Science B', 'Grade 12 Management A', 'Grade 12 Management B'];
  const statusOptions = ['All', 'Present', 'Absent', 'Late', 'Flagged'];

  const filtered = students.filter(st => {
    const matchClass = selectedClass === 'All Classes' || (st.class || st.classSection) === selectedClass;
    const matchStatus = selectedStatus === 'All' || (st.status || '').toLowerCase() === selectedStatus.toLowerCase();
    return matchClass && matchStatus;
  });

  const handleGenerateReport = () => setIsGenerated(true);

  const handleDownloadCsv = () => {
    const headers = ['ID', 'Name', 'Class', 'Roll No', 'Status', 'Confidence %', 'Timestamp'];
    const rows = filtered.map(s => [
      s.id, `"${s.name}"`, `"${s.class || s.classSection}"`,
      s.rollNo || '—', s.status,
      s.match ?? s.confidence ?? 'N/A',
      s.lastSeen || s.timestamp || 'N/A'
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `attendance_report_${selectedPreset}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => window.print();

  const presentCount = filtered.filter(s => s.status === 'present').length;
  const absentCount = filtered.filter(s => s.status === 'absent').length;
  const lateCount = filtered.filter(s => s.status === 'late').length;

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: fonts.headline, fontSize: '1.35rem', fontWeight: 700, color: colors.navy, margin: 0 }}>
          Attendance Reports & Export Center
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: '0.82rem', color: colors.sub, margin: '2px 0 0 0' }}>
          Build customized attendance reports by date, class section, and attendance status
        </p>
      </div>

      {/* Report Builder Card */}
      <div style={{ ...cardBase, padding: '1.5rem' }}>
        <h3 style={{ fontFamily: fonts.headline, fontSize: '0.95rem', fontWeight: 700, color: colors.navy, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color={colors.sapphire} /> Report Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {/* Date Range Selector */}
          <div>
            <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Date Range
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {datePresets.map(preset => (
                <button
                  key={preset.key}
                  onClick={() => { setSelectedPreset(preset.key); setIsGenerated(false); }}
                  style={{
                    padding: '5px 12px', borderRadius: 999,
                    border: `1px solid ${selectedPreset === preset.key ? colors.sapphire : colors.border}`,
                    backgroundColor: selectedPreset === preset.key ? colors.sapphireLight : colors.card,
                    color: selectedPreset === preset.key ? colors.sapphire : colors.sub,
                    fontFamily: fonts.body, fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Class Filter */}
          <div>
            <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Class / Section
            </label>
            <select
              value={selectedClass}
              onChange={e => { setSelectedClass(e.target.value); setIsGenerated(false); }}
              style={{ width: '100%', padding: '0.5rem 0.85rem', borderRadius: 8, border: `1px solid ${colors.borderStrong}`, fontFamily: fonts.body, fontSize: '0.85rem', outline: 'none', backgroundColor: colors.card }}
            >
              {classOptions.map(cls => <option key={cls}>{cls}</option>)}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '0.75rem', fontWeight: 700, color: colors.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Attendance Status
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {statusOptions.map(st => (
                <button
                  key={st}
                  onClick={() => { setSelectedStatus(st); setIsGenerated(false); }}
                  style={{
                    padding: '5px 12px', borderRadius: 999,
                    border: `1px solid ${selectedStatus === st ? colors.sapphire : colors.border}`,
                    backgroundColor: selectedStatus === st ? colors.sapphireLight : colors.card,
                    color: selectedStatus === st ? colors.sapphire : colors.sub,
                    fontFamily: fonts.body, fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleGenerateReport}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.35rem', borderRadius: 8, border: 'none',
              backgroundColor: colors.sapphire, color: '#FFF',
              fontFamily: fonts.body, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
            }}
          >
            <FileSpreadsheet size={16} /> Generate Report Preview
          </button>

          {isGenerated && (
            <>
              <button
                onClick={handleDownloadCsv}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.1rem', borderRadius: 8,
                  border: `1px solid ${colors.emeraldBorder}`, backgroundColor: colors.emeraldLight,
                  color: colors.emeraldDark, fontFamily: fonts.body, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer'
                }}
              >
                <Download size={16} /> Download CSV
              </button>
              <button
                onClick={handlePrint}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.1rem', borderRadius: 8,
                  border: `1px solid ${colors.border}`, backgroundColor: colors.card,
                  color: colors.slate, fontFamily: fonts.body, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer'
                }}
              >
                <Printer size={16} /> Print Sheet
              </button>
            </>
          )}
        </div>
      </div>

      {/* Report Preview */}
      {isGenerated && (
        <div className="page-enter">
          {/* Summary Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ ...cardBase, padding: '0.9rem 1.15rem', borderLeft: `4px solid ${colors.sapphire}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: '0.68rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Total Records</span>
              <div style={{ fontFamily: fonts.headline, fontSize: '1.5rem', fontWeight: 700, color: colors.navy }}>{filtered.length}</div>
            </div>
            <div style={{ ...cardBase, padding: '0.9rem 1.15rem', borderLeft: `4px solid ${colors.emerald}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: '0.68rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Present</span>
              <div style={{ fontFamily: fonts.headline, fontSize: '1.5rem', fontWeight: 700, color: colors.navy }}>{presentCount}</div>
            </div>
            <div style={{ ...cardBase, padding: '0.9rem 1.15rem', borderLeft: `4px solid ${colors.amber}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: '0.68rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Late</span>
              <div style={{ fontFamily: fonts.headline, fontSize: '1.5rem', fontWeight: 700, color: colors.navy }}>{lateCount}</div>
            </div>
            <div style={{ ...cardBase, padding: '0.9rem 1.15rem', borderLeft: `4px solid ${colors.coral}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: '0.68rem', fontWeight: 700, color: colors.sub, textTransform: 'uppercase' }}>Absent</span>
              <div style={{ fontFamily: fonts.headline, fontSize: '1.5rem', fontWeight: 700, color: colors.navy }}>{absentCount}</div>
            </div>
          </div>

          {/* Data Preview Table */}
          <div style={{ ...cardBase, overflow: 'hidden' }}>
            <div style={{ padding: '0.85rem 1.25rem', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} color={colors.emerald} />
              <span style={{ fontFamily: fonts.headline, fontSize: '0.9rem', fontWeight: 700, color: colors.navy }}>
                Report Preview — {filtered.length} Records
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: colors.navy }}>
                  <tr>
                    {['Student ID', 'Full Name', 'Class', 'Status', 'Confidence', 'Last Seen'].map(h => (
                      <th
                        key={h}
                        style={{
                          padding: '0.65rem 0.85rem', textAlign: 'left',
                          fontFamily: fonts.body, fontSize: '0.72rem', fontWeight: 700,
                          color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em'
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((st, idx) => (
                    <tr
                      key={st.id}
                      className="table-row-hover"
                      style={{ backgroundColor: idx % 2 === 0 ? colors.card : colors.cardSubtle }}
                    >
                      <td style={{ padding: '0.55rem 0.85rem', fontFamily: fonts.mono, fontSize: '0.76rem', color: colors.sub }}>{st.id}</td>
                      <td style={{ padding: '0.55rem 0.85rem', fontFamily: fonts.body, fontSize: '0.82rem', fontWeight: 600, color: colors.navy }}>{st.name}</td>
                      <td style={{ padding: '0.55rem 0.85rem', fontFamily: fonts.body, fontSize: '0.78rem', color: colors.slate }}>{st.class || st.classSection}</td>
                      <td style={{ padding: '0.55rem 0.85rem' }}>
                        <span style={{
                          padding: '2px 8px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                          backgroundColor: st.status === 'present' ? colors.emeraldLight : st.status === 'late' ? colors.amberLight : colors.coralLight,
                          color: st.status === 'present' ? colors.emeraldDark : st.status === 'late' ? colors.amberDark : colors.coralDark
                        }}>
                          {st.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.55rem 0.85rem', fontFamily: fonts.mono, fontSize: '0.78rem', color: colors.slate }}>
                        {(st.match ?? st.confidence) ? `${st.match ?? st.confidence}%` : '—'}
                      </td>
                      <td style={{ padding: '0.55rem 0.85rem', fontFamily: fonts.body, fontSize: '0.76rem', color: colors.sub }}>
                        {st.lastSeen || st.timestamp || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
