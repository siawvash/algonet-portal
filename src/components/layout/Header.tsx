import React, { useState } from 'react';
import { AlgonetLogo } from '../common/AlgonetLogo';
import { PresenceBadge, PRESENCE_CONFIG } from '../common/PresenceBadge';
import { UserAvatar } from '../common/UserAvatar';
import { UserPresenceStatus, PortalNavId } from '../../types';
import { CURRENT_USER } from '../../data/mockData';
import { toPersianDigits } from '../../utils/formatters';
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  presence: UserPresenceStatus;
  onPresenceChange: (status: UserPresenceStatus) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenQuickAction: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (event?: React.MouseEvent) => void;
  unreadNotificationsCount: number;
  onNavigate: (navId: PortalNavId) => void;
  activeNav: PortalNavId;
}

export const Header: React.FC<HeaderProps> = ({
  presence,
  onPresenceChange,
  searchQuery,
  onSearchChange,
  onOpenQuickAction,
  theme,
  onToggleTheme,
  unreadNotificationsCount,
  onNavigate,
  activeNav
}) => {
  const [presenceDropdownOpen, setPresenceDropdownOpen] = useState(false);

  const statuses: UserPresenceStatus[] = ['present', 'remote', 'meeting', 'leave'];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Right side: Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-field p-1"
          >
            <AlgonetLogo variant="persian" size={40} theme="auto" />
          </button>
        </div>

        {/* Center: Live Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="جستجوی سرویس‌ها، اسپرینت‌ها، تیکت‌ها و مستندات..."
              className="w-full h-10 pr-10 pl-4 rounded-pill bg-[var(--surface-1)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)] focus:ring-1 focus:ring-[var(--focus-ring)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                پاک کردن
              </button>
            )}
          </div>
        </div>

        {/* Left side: Controls, Quick Action, Theme, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Button (+ اقدام سریع جدید) */}
          <button
            onClick={onOpenQuickAction}
            className="h-10 px-3.5 sm:px-4 rounded-pill bg-[#CFFF04] text-black font-bold text-xs sm:text-sm hover:brightness-95 active:scale-98 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(207,255,4,0.25)] flex-shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">اقدام سریع جدید</span>
            <span className="sm:hidden">اقدام</span>
          </button>

          {/* Presence Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPresenceDropdownOpen(!presenceDropdownOpen)}
              className="h-10 px-2 sm:px-3 rounded-pill bg-[var(--surface-1)] border border-[var(--border)] hover:bg-[var(--surface-2)] flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              <PresenceBadge status={presence} />
              <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </button>

            {presenceDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setPresenceDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-48 rounded-field bg-[var(--surface-1)] border border-[var(--border)] shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                  <div className="px-3 py-1.5 text-[10px] text-[var(--text-muted)] font-light border-b border-[var(--border)] mb-1">
                    تغییر وضعیت حضور
                  </div>
                  {statuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        onPresenceChange(st);
                        setPresenceDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-field text-xs transition-colors ${
                        presence === st ? 'bg-[var(--surface-2)] font-bold text-[var(--text)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                      }`}
                    >
                      <span>{PRESENCE_CONFIG[st].label}</span>
                      <span className={`w-2 h-2 rounded-full ${PRESENCE_CONFIG[st].dotClass || 'bg-transparent'}`} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={() => onNavigate('notifications')}
            className={`relative w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center transition-colors ${
              activeNav === 'notifications'
                ? 'bg-[#CFFF04] text-black border-transparent'
                : 'bg-[var(--surface-1)] text-[var(--text)] hover:bg-[var(--surface-2)]'
            }`}
            title="مرکز اعلانات"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && activeNav !== 'notifications' && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FA5A14] text-black font-bold text-[10px] flex items-center justify-center">
                {toPersianDigits(unreadNotificationsCount)}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={(e) => onToggleTheme(e)}
            data-theme-switcher="true"
            className="w-10 h-10 rounded-full bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)] flex items-center justify-center transition-colors active:scale-90"
            title={theme === 'dark' ? 'تم روشن' : 'تم تیره'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#CFFF04]" /> : <Moon className="w-4 h-4 text-[#5F5CE1]" />}
          </button>

          {/* User Profile Avatar Pill */}
          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center gap-2 p-1 pr-2.5 rounded-pill border transition-all ${
              activeNav === 'profile'
                ? 'border-[#CFFF04] bg-[#CFFF04]/10'
                : 'border-[var(--border)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)]'
            }`}
            title="مشاهده شناسنامه پرسنلی"
          >
            <span className="text-xs font-medium hidden lg:inline text-[var(--text)]">
              {CURRENT_USER.name}
            </span>
            <UserAvatar size="xs" showPresence={false} />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="mt-2.5 md:hidden">
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجوی سرویس‌ها، اسپرینت‌ها و مستندات..."
            className="w-full h-9 pr-9 pl-3 rounded-pill bg-[var(--surface-1)] border border-[var(--border)] text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--focus-ring)]"
          />
        </div>
      </div>
    </header>
  );
};
