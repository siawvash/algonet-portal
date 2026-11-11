import React from 'react';
import { PortalNavId } from '../../types';
import {
  LayoutDashboard,
  User,
  Award,
  Kanban,
  Calendar,
  Bell,
  ClipboardList,
  ShieldCheck
} from 'lucide-react';
import { toPersianDigits } from '../../utils/formatters';

interface NavigationProps {
  activeNav: PortalNavId;
  onNavigate: (navId: PortalNavId) => void;
  unreadCount?: number;
  pendingPoliciesCount?: number;
  pendingSurveysCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeNav,
  onNavigate,
  unreadCount = 0,
  pendingPoliciesCount = 0,
  pendingSurveysCount = 0
}) => {
  const primaryTabs: { id: PortalNavId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'صفحه اصلی', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'اطلاعات من', icon: <User className="w-4 h-4" /> },
    { id: 'portfolio', label: 'پورتفولیوی من', icon: <Award className="w-4 h-4" /> },
    { id: 'projects', label: 'پروژه‌های من', icon: <Kanban className="w-4 h-4" /> },
    { id: 'calendar', label: 'تقویم من', icon: <Calendar className="w-4 h-4" /> },
  ];

  const secondaryTabs: {
    id: PortalNavId;
    label: string;
    icon: React.ReactNode;
    badgeCount?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'notifications',
      label: 'اعلانات',
      icon: <Bell className="w-4 h-4" />,
      badgeCount: unreadCount,
      badgeColor: 'bg-[#FA5A14] text-black'
    },
    {
      id: 'surveys',
      label: 'پرسشنامه‌ها',
      icon: <ClipboardList className="w-4 h-4" />,
      badgeCount: pendingSurveysCount,
      badgeColor: 'bg-[#5F5CE1] text-white'
    },
    {
      id: 'policies',
      label: 'پالیسی‌ها',
      icon: <ShieldCheck className="w-4 h-4" />,
      badgeCount: pendingPoliciesCount,
      badgeColor: 'bg-[#CFFF04] text-black'
    },
  ];

  return (
    <nav className="w-full border-b border-[var(--border)] bg-[var(--bg)] px-4 sm:px-6 py-2 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
        {/* Primary Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--surface-1)] rounded-pill border border-[var(--border)] flex-shrink-0">
          {primaryTabs.map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`flex items-center gap-2 py-1.5 px-3.5 rounded-pill text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#CFFF04] text-black font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--surface-1)] rounded-pill border border-[var(--border)] flex-shrink-0">
          {secondaryTabs.map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`relative flex items-center gap-2 py-1.5 px-3.5 rounded-pill text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#CFFF04] text-black font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badgeCount && tab.badgeCount > 0 && !isActive ? (
                  <span
                    className={`min-w-4 h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${tab.badgeColor}`}
                  >
                    {toPersianDigits(tab.badgeCount)}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
