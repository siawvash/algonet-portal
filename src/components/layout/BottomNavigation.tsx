import React from 'react';
import { PortalNavId } from '../../types';
import { UserAvatar } from '../common/UserAvatar';
import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  Briefcase
} from 'lucide-react';

interface BottomNavigationProps {
  activeNav: PortalNavId;
  onNavigate: (navId: PortalNavId) => void;
  onOpenMobileMenu?: () => void;
  unreadNotifsCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeNav,
  onNavigate
}) => {
  const handleItemClick = (navId: PortalNavId) => {
    // Light haptic feedback on mobile devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(8);
      } catch {
        // ignore
      }
    }
    onNavigate(navId);
  };

  const navItems = [
    {
      id: 'home' as PortalNavId,
      label: 'خانه',
      type: 'icon' as const,
      icon: LayoutDashboard,
    },
    {
      id: 'projects' as PortalNavId,
      label: 'پروژه‌ها',
      type: 'icon' as const,
      icon: FolderKanban,
    },
    {
      id: 'calendar' as PortalNavId,
      label: 'تقویم',
      type: 'icon' as const,
      icon: CalendarDays,
    },
    {
      id: 'portfolio' as PortalNavId,
      label: 'پورتفولیو',
      type: 'icon' as const,
      icon: Briefcase,
    },
    {
      id: 'profile' as PortalNavId,
      label: 'پروفایل',
      type: 'avatar' as const,
    }
  ];

  return (
    <nav
      aria-label="منوی ناوبری موبایل"
      className="fixed bottom-3 inset-x-4 sm:inset-x-6 z-40 lg:hidden block pb-[env(safe-area-inset-bottom)] select-none pointer-events-auto"
    >
      <div className="w-full max-w-md mx-auto h-[64px] px-2 rounded-[24px] bg-white/92 dark:bg-[#30334e]/92 backdrop-blur-xl border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.35)] flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] h-[52px] rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#666cff] dark:text-[#8c90ff]'
                  : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
              } active:scale-90`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active pill background indicator with smooth spring morph matching reference video */}
              {isActive && (
                <span className="absolute inset-x-1.5 inset-y-1 bg-[#666cff]/15 dark:bg-[#666cff]/25 rounded-2xl -z-10 tab-pill-morph" />
              )}

              {/* Icon or Avatar Container with spring pop */}
              <div className={`relative flex items-center justify-center ${isActive ? 'icon-spring-pop' : ''}`}>
                {item.type === 'avatar' ? (
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive ? 'ring-2 ring-[#666cff] ring-offset-2 ring-offset-white dark:ring-offset-[#30334e] shadow-md' : ''
                    }`}
                  >
                    <UserAvatar size="xs" showPresence={true} interactive={false} />
                  </div>
                ) : (
                  Icon && (
                    <Icon
                      className={`size-5 transition-all duration-300 ${
                        isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'
                      }`}
                    />
                  )
                )}
              </div>

              {/* Label */}
              <span
                className={`font-['Vazirmatn'] text-[11px] mt-0.5 leading-none transition-all duration-200 ${
                  isActive ? 'font-bold scale-105' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
