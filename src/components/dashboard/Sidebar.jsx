import React from 'react';
import {
  Shield,
  LayoutDashboard,
  Users,
  Calendar,
  Cpu,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { colors, fonts } from '../../theme/tokens';
import { Avatar } from './Avatar';

export const Sidebar = ({
  activeNav = 'dashboard',
  onNavSelect,
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  activeAlertsCount = 2,
  devicesOnline = 3,
  totalDevices = 4,
  studentsCount = 1260,
  user = { name: "Dr. Ram Adhikari", role: "Principal / Admin" }
}) => {
  // Navigation structure without any AI / fake live icons
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'students',
      label: 'Student Directory',
      icon: Users,
      badge: (
        <span
          style={{
            fontSize: '0.7rem',
            padding: '2px 7px',
            borderRadius: 999,
            backgroundColor: activeNav === 'students' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            fontWeight: 600
          }}
        >
          {studentsCount}
        </span>
      )
    },
    {
      id: 'heatmap',
      label: 'Activity Heatmap',
      icon: Calendar,
      badge: null
    },
    {
      id: 'devices',
      label: 'Gate Terminals',
      icon: Cpu,
      badge: (
        <span
          style={{
            fontSize: '0.68rem',
            padding: '2px 7px',
            borderRadius: 999,
            backgroundColor: activeNav === 'devices' ? 'rgba(255, 255, 255, 0.25)' : colors.emeraldLight,
            color: activeNav === 'devices' ? '#FFFFFF' : colors.emeraldDark,
            fontWeight: 600
          }}
        >
          {devicesOnline}/{totalDevices}
        </span>
      )
    },
    {
      id: 'alerts',
      label: 'Security Alerts',
      icon: AlertTriangle,
      badge: activeAlertsCount > 0 ? (
        <span
          style={{
            fontSize: '0.68rem',
            padding: '2px 7px',
            borderRadius: 999,
            backgroundColor: activeNav === 'alerts' ? 'rgba(255, 255, 255, 0.25)' : colors.coral,
            color: '#FFFFFF',
            fontWeight: 700
          }}
        >
          {activeAlertsCount}
        </span>
      ) : null
    }
  ];

  const secondaryNavItems = [
    {
      id: 'reports',
      label: 'Attendance Reports',
      icon: FileSpreadsheet,
      badge: null
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleItemClick = (id) => {
    if (onNavSelect) onNavSelect(id);
    if (isMobileOpen && onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: colors.navy,
        borderRight: `1px solid ${colors.navyBorder}`,
        userSelect: 'none',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        width: isCollapsed ? 68 : 256,
        position: 'relative',
        color: '#FFFFFF'
      }}
    >
      {/* 1. Header Brand & Title */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: isCollapsed ? '0' : '0 1rem',
          borderBottom: `1px solid ${colors.navyBorder}`
        }}
      >
        <div
          onClick={() => handleItemClick('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', cursor: 'pointer' }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
            }}
            title="AT.AUTO Intelligence"
          >
            <Shield size={22} color="#FFFFFF" />
          </div>

          {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span
                style={{
                  fontFamily: fonts.headline,
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2
                }}
              >
                AT.AUTO
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: '0.68rem',
                  color: '#94A3B8',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                National School of Sciences
              </span>
            </div>
          )}
        </div>

        {/* Mobile close button if rendered in mobile drawer */}
        {isMobileOpen ? (
          <button
            onClick={onCloseMobile}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6
            }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        ) : (
          /* Desktop Collapse toggle button */
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              border: `1px solid ${colors.navyBorder}`,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              display: isCollapsed ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#94A3B8'
            }}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Re-expand button when collapsed on desktop */}
      {isCollapsed && !isMobileOpen && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
          <button
            onClick={onToggleCollapse}
            title="Expand Sidebar"
            style={{
              width: 34,
              height: 34,
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
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* 2. Navigation Link Groups */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: isCollapsed ? '0.5rem 0.4rem' : '0.85rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        {/* Main Section */}
        <div>
          {!isCollapsed && (
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.5rem 0.4rem 0.5rem'
              }}
            >
              Command Center
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    width: '100%',
                    padding: isCollapsed ? '0.65rem 0' : '0.6rem 0.75rem',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: isActive ? colors.sapphire : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    fontFamily: fonts.body,
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  className={`sidebar-nav-item ${isActive ? 'sidebar-nav-active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <Icon size={18} color={isActive ? '#FFFFFF' : '#94A3B8'} style={{ flexShrink: 0 }} />
                    {!isCollapsed && (
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.label}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && item.badge && <div>{item.badge}</div>}

                  {/* Dot indicator if collapsed with badge */}
                  {isCollapsed && (item.id === 'alerts' && activeAlertsCount > 0) && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 14,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: colors.coral
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Administration Section */}
        <div>
          {!isCollapsed && (
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.25rem 0.5rem 0.4rem 0.5rem'
              }}
            >
              Administration
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'space-between',
                    width: '100%',
                    padding: isCollapsed ? '0.65rem 0' : '0.6rem 0.75rem',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: isActive ? colors.sapphire : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    fontFamily: fonts.body,
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  className={`sidebar-nav-item ${isActive ? 'sidebar-nav-active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <Icon size={18} color={isActive ? '#FFFFFF' : '#94A3B8'} style={{ flexShrink: 0 }} />
                    {!isCollapsed && (
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.label}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. User Profile Card & Sign Out */}
      <div
        style={{
          borderTop: `1px solid ${colors.navyBorder}`,
          padding: isCollapsed ? '0.75rem 0.4rem' : '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
          <Avatar name={user?.name || "Dr. Ram Adhikari"} photoUrl={user?.photoUrl} match={null} size={34} />
          {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {user?.name || "Dr. Ram Adhikari"}
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: '0.68rem',
                  color: '#94A3B8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {user?.role || "Principal"}
              </span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            title="Sign out / Switch account"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '4px',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Rail */}
      <aside className="dashboard-sidebar-desktop" style={{ height: '100vh', position: 'sticky', top: 0, zIndex: 40 }}>
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Drawer with Backdrop */}
      {isMobileOpen && (
        <div
          className="dashboard-sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 260,
              zIndex: 999,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              animation: 'slideInLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
