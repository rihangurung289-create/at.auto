import React from 'react';
import { Menu, Shield, Bell } from 'lucide-react';
import { colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';

export const MobileHeader = ({
  onOpenMobileSidebar,
  activeAlertsCount = 0,
  activePageTitle = "Overview",
  user = { name: "Dr. Ram Adhikari", role: "Principal / Admin" }
}) => {
  return (
    <header
      className="dashboard-mobile-header"
      style={{
        backgroundColor: colors.navy,
        borderBottom: `1px solid ${colors.navyBorder}`,
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        color: '#FFFFFF'
      }}
    >
      {/* Left: Hamburger menu + Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open Navigation Menu"
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            border: `1px solid ${colors.navyBorder}`,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#FFFFFF'
          }}
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <Shield size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontFamily: fonts.headline, fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
              AT.AUTO
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: '0.66rem', color: '#94A3B8', lineHeight: 1 }}>
              {activePageTitle}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Alert notification & User avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {activeAlertsCount > 0 && (
          <div
            style={{
              position: 'relative',
              width: 34,
              height: 34,
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bell size={16} color="#FCA5A5" />
            <span
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: colors.coral,
                color: 'white',
                fontSize: '0.62rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {activeAlertsCount}
            </span>
          </div>
        )}

        <Avatar name={user?.name || "Dr. Ram Adhikari"} photoUrl={user?.photoUrl} match={null} size={32} />
      </div>
    </header>
  );
};
