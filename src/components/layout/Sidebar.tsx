import React, { useEffect } from 'react';
import { PortalNavId } from '../../types';
import { AlgonetLogo } from '../common/AlgonetLogo';
import { toPersianDigits } from '../../utils/formatters';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  CalendarDays,
  Bell,
  ClipboardList,
  ShieldCheck,
  ChevronLeft,
  X
} from 'lucide-react';

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeNav: PortalNavId;
  onNavigate: (navId: PortalNavId) => void;
  unreadNotifsCount?: number;
  pendingSurveysCount?: number;
  pendingPoliciesCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItemConfig {
  id: PortalNavId;
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
}

// Custom Sidebar Panel Toggle Icon matching reference image
const SidebarToggleIcon: React.FC<{ isCollapsed: boolean; className?: string }> = ({
  isCollapsed,
  className = 'size-5'
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} transition-transform duration-200 shrink-0`}
  >
    <rect width="18" height="18" x="3" y="3" rx="4" />
    <path d="M15 3v18" />
    <path d={isCollapsed ? 'm9 9-3 3 3 3' : 'm9 9-3 3 3 3'} />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeNav,
  onNavigate,
  unreadNotifsCount = 2,
  pendingSurveysCount = 2,
  pendingPoliciesCount = 1,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const navItems: NavItemConfig[] = [
    {
      id: 'home',
      label: 'صفحه اصلی',
      icon: LayoutDashboard,
    },
    {
      id: 'profile',
      label: 'اطلاعات من',
      icon: User,
    },
    {
      id: 'portfolio',
      label: 'پورتفولیوی من',
      icon: Briefcase,
    },
    {
      id: 'projects',
      label: 'پروژه‌های من',
      icon: FolderKanban,
    },
    {
      id: 'calendar',
      label: 'تقویم من',
      icon: CalendarDays,
    },
    {
      id: 'notifications',
      label: 'اعلانات من',
      icon: Bell,
      badgeCount: unreadNotifsCount,
    },
    {
      id: 'surveys',
      label: 'پرسشنامه‌ها',
      icon: ClipboardList,
      badgeCount: pendingSurveysCount,
    },
    {
      id: 'policies',
      label: 'قوانین و پالیسی‌ها',
      icon: ShieldCheck,
      badgeCount: pendingPoliciesCount,
    },
  ];

  // Prevent background body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleMobileNav = (id: PortalNavId) => {
    onNavigate(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* ===================================================================
          1. MOBILE DRAWER (Only rendered on < lg screens)
          انیمیشن ورود روان و فنری از سمت راست (RTL) همراه با فید پس‌زمینه
          =================================================================== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!isMobileOpen}
      >
        {/* Dark blurred backdrop */}
        <div
          onClick={onCloseMobile}
          className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-out ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Slide-over Drawer Panel from Right (RTL) with spring curve matching reference video */}
        <aside
          aria-label="منوی کشویی موبایل"
          className={`fixed top-0 bottom-0 right-0 z-50 w-[295px] sm:w-[330px] bg-[#666cff] dark:bg-[#30334e] text-white flex flex-col justify-between p-4 shadow-[-12px_0_40px_rgba(0,0,0,0.35)] mobile-drawer-slide select-none overflow-y-auto ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Section: Brand & Close button */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/20 dark:border-[#3d3f59]">
              <div
                onClick={() => handleMobileNav('home')}
                className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
              >
                <AlgonetLogo variant="symbol" size={36} theme="dark" />
                <div className="flex flex-col text-right leading-tight">
                  <span className="font-['Vazirmatn'] font-bold text-[18px] text-white">
                    الگونت
                  </span>
                  <span className="font-['Vazirmatn'] text-[11px] text-white/80">
                    پورتال یکپارچه
                  </span>
                </div>
              </div>

              {/* Close Button (Touch target 44px) */}
              <button
                type="button"
                onClick={onCloseMobile}
                className="size-11 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 active:scale-90 transition-all cursor-pointer"
                aria-label="بستن منو"
                title="بستن منو"
              >
                <X className="size-5 transition-transform duration-200 hover:rotate-90" />
              </button>
            </div>

            {/* Navigation list on mobile with staggered slide-in cascade */}
            <nav className="space-y-1.5 py-1">
              {navItems.map((item, index) => {
                const isActive = activeNav === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMobileNav(item.id)}
                    style={{
                      transitionDelay: isMobileOpen ? `${50 + index * 30}ms` : '0ms',
                      transform: isMobileOpen ? 'translateX(0)' : 'translateX(24px)',
                      opacity: isMobileOpen ? 1 : 0,
                    }}
                    className={`w-full min-h-[48px] px-3.5 rounded-[18px] flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-white dark:bg-[#666cff] text-[#666cff] dark:text-white font-bold shadow-lg'
                        : 'text-white/90 hover:bg-white/10 dark:hover:bg-[#383a54]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 shrink-0" />
                      <span className="font-['Vazirmatn'] text-[14px]">
                        {item.label}
                      </span>
                    </div>

                    {item.badgeCount && item.badgeCount > 0 ? (
                      <span
                        className={`size-[22px] min-w-[22px] rounded-full text-[11px] font-['Vazirmatn'] font-semibold tabular-nums flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#666cff] dark:bg-white text-white dark:text-[#666cff]'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {toPersianDigits(item.badgeCount)}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section on mobile */}
          <div className="pt-4 border-t border-white/20 dark:border-[#3d3f59] text-center text-xs font-['Vazirmatn'] text-white/70">
            <p>پورتال یکپارچه الگونت نسخه ۳.۰</p>
          </div>
        </aside>
      </div>

      {/* ===================================================================
          2. DESKTOP FIXED SIDEBAR (Hidden on < lg screens, visible on lg+)
          =================================================================== */}
      <aside
        aria-label="سایدبار پورتال الگونت"
        className={`portal-sidebar hidden lg:flex fixed top-4 bottom-4 right-5 sm:right-6 z-40 transition-all duration-300 ease-in-out flex-col justify-between ${
          isCollapsed ? 'w-[76px] p-2' : 'w-[264px] p-3.5'
        } rounded-[32px] bg-[#666cff] dark:bg-[#30334e] border border-[#7b80ff] dark:border-[#3d3f59] shadow-[0_12px_40px_rgba(102,108,255,0.35)] dark:shadow-[0_10px_28px_-4px_rgba(0,0,0,0.22)] select-none overflow-hidden`}
      >
        {/* TOP SECTION: Header / Brand Lockup + Category Label */}
        <div className="space-y-3">
          {/* Brand Header */}
          <div
            onClick={() => onNavigate('home')}
            className={`flex items-center cursor-pointer group select-none transition-all ${
              isCollapsed ? 'h-[54px] justify-center' : 'h-[54px] px-2.5 justify-start gap-3'
            }`}
            title="پورتال یکپارچه الگونت"
          >
            {/* Algonet Logo Symbol (Right in RTL) */}
            <div className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-white">
              <AlgonetLogo variant="symbol" size={isCollapsed ? 34 : 38} theme="dark" />
            </div>

            {/* Brand Typography (Shown only when expanded) */}
            {!isCollapsed && (
              <div className="flex flex-col text-right leading-tight select-none flex-1">
                <span className="font-['Vazirmatn'] font-bold text-[18px] text-white dark:text-[#eaeafb] group-hover:text-white transition-colors">
                  الگونت
                </span>
                <span className="font-['Vazirmatn'] text-[11px] text-white/80 dark:text-[#8386a1] mt-0.5">
                  پورتال یکپارچه
                </span>
              </div>
            )}
          </div>

          {/* Divider line under Brand */}
          <div className="h-px bg-white/20 dark:bg-[#3d3f59] mx-1" />

          {/* Section Label: منوی اصلی */}
          {!isCollapsed && (
            <div className="px-2 pt-0.5 text-right">
              <span className="font-['Vazirmatn'] text-[11px] text-white/70 dark:text-[#8386a1]/80 select-none font-medium">
                منوی اصلی
              </span>
            </div>
          )}

          {/* MIDDLE SECTION: Navigation List */}
          <nav className="space-y-1.5 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const Icon = item.icon;

              return (
                <div key={item.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`portal-nav-item w-full transition-all duration-200 select-none flex items-center cursor-pointer ${
                      isCollapsed
                        ? 'h-[46px] w-[52px] mx-auto justify-center rounded-full'
                        : 'h-[46px] px-3.5 justify-between rounded-full'
                    } ${
                      isActive
                        ? 'portal-nav-item-active bg-white dark:bg-[#232538] text-[#666cff] dark:text-white font-bold shadow-[0_6px_20px_rgba(0,0,0,0.18)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                        : 'text-white/85 dark:text-[#8b8fa8] hover:text-white dark:hover:text-[#eaeafb] hover:bg-white/15 dark:hover:bg-[#383a54]/50'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Right side: Icon + Label */}
                    <div
                      className={`flex items-center gap-3 min-w-0 ${
                        isCollapsed ? 'justify-center w-full' : 'flex-1'
                      }`}
                    >
                      <Icon
                        className={`portal-nav-icon shrink-0 transition-transform duration-200 ${
                          isCollapsed ? 'size-[22px]' : 'size-5'
                        } ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                      />

                      {/* Label (in expanded mode) */}
                      {!isCollapsed && (
                        <span className="portal-nav-label font-['Vazirmatn'] text-[13px] text-right flex-1 transition-colors whitespace-nowrap leading-[1.65]">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {/* Left side in expanded mode: Badge count pill */}
                    {!isCollapsed && item.badgeCount && item.badgeCount > 0 && (
                      <span
                        className={`size-[24px] min-w-[24px] rounded-full text-[11px] font-['Vazirmatn'] font-semibold tabular-nums flex items-center justify-center shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-[#666cff] text-white border-[#666cff]/50'
                            : 'bg-white/20 dark:bg-[#232538] text-white dark:text-[#8b8fa8] border-white/25 dark:border-[#383b54]'
                        }`}
                      >
                        {toPersianDigits(item.badgeCount)}
                      </span>
                    )}
                  </button>

                  {/* Floating Tooltip in Collapsed Mode */}
                  {isCollapsed && (
                    <div className="absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
                      <div className="bg-[#242638] text-[#eaeafb] text-[12px] font-['Vazirmatn'] font-medium py-1.5 px-3 rounded-xl border border-[#3d3f59] shadow-2xl whitespace-nowrap flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badgeCount && item.badgeCount > 0 ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#666cff]/25 text-[#666cff] border border-[#666cff]/35 font-semibold tabular-nums">
                            {toPersianDigits(item.badgeCount)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: Divider Line + Toggle Button */}
        <div className="pt-2 space-y-2">
          {/* Bottom divider line */}
          <div className="h-px bg-white/20 dark:bg-[#3d3f59] mx-1" />

          {/* Toggle Collapse Button */}
          {isCollapsed ? (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="w-[52px] h-[46px] mx-auto rounded-full flex items-center justify-center text-white/85 dark:text-[#8b8fa8] hover:text-white dark:hover:text-[#eaeafb] hover:bg-white/15 dark:hover:bg-[#383a54]/50 border border-transparent transition-all duration-200 cursor-pointer select-none"
              title="باز کردن منو"
              aria-label="باز کردن منو"
            >
              <SidebarToggleIcon isCollapsed={true} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="w-full h-[46px] px-3.5 rounded-full flex items-center justify-between text-white/85 dark:text-[#8b8fa8] hover:text-white dark:hover:text-[#eaeafb] hover:bg-white/15 dark:hover:bg-[#383a54]/50 border border-transparent transition-all duration-200 cursor-pointer select-none group"
              title="جمع کردن منو"
              aria-label="جمع کردن منو"
            >
              <div className="flex items-center gap-3">
                <SidebarToggleIcon isCollapsed={false} className="size-5 text-white/85 dark:text-[#8b8fa8] group-hover:text-white dark:group-hover:text-[#eaeafb] transition-colors" />
                <span className="font-['Vazirmatn'] text-[13px] font-medium text-white/85 dark:text-[#8b8fa8] group-hover:text-white dark:group-hover:text-[#eaeafb] transition-colors">
                  جمع کردن منو
                </span>
              </div>
              <ChevronLeft className="size-4 text-white/85 dark:text-[#8b8fa8] group-hover:text-white dark:group-hover:text-[#eaeafb] transition-colors" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
