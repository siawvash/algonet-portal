import React, { useState, useEffect } from 'react';
import { UserPresenceStatus, PortalNavId } from '../../types';
import { toPersianDigits } from '../../utils/formatters';
import { AlgonetLogo } from '../common/AlgonetLogo';
import {
  Sun,
  Moon,
  Clock,
  Bell,
  Menu
} from 'lucide-react';

interface TopbarProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: (event?: React.MouseEvent) => void;
  unreadNotificationsCount: number;
  onNavigate: (navId: PortalNavId) => void;
  presence?: UserPresenceStatus;
  onPresenceChange?: (status: UserPresenceStatus) => void;
  onOpenMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  theme,
  onToggleTheme,
  unreadNotificationsCount,
  onNavigate,
  onOpenMobileMenu,
  isMobileMenuOpen = false
}) => {
  const [currentTime, setCurrentTime] = useState<string>('۱۲:۲۶:۰۰');
  const [persianDate, setPersianDate] = useState<string>('۱۹ آبان ۱۴۰۵');
  const [gregorianDate, setGregorianDate] = useState<string>('Nov 10, 2026');

  // Live Clock & Persian Calendar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Live Persian Time (HH:MM:SS)
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(toPersianDigits(`${hours}:${minutes}:${seconds}`));

      // Persian Solar Hijri Date
      try {
        const pDate = now.toLocaleDateString('fa-IR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        setPersianDate(pDate);
      } catch {
        setPersianDate('۱۹ آبان ۱۴۰۵');
      }

      // Gregorian Date
      try {
        const gDate = now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        setGregorianDate(gDate);
      } catch {
        setGregorianDate('Nov 10, 2026');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      role="banner"
      className="w-full h-[58px] rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_2px_8px_rgba(50,50,93,0.03)] dark:shadow-[0_3px_12px_-2px_rgba(0,0,0,0.1)] px-3 sm:px-4 flex items-center justify-between transition-all select-none"
    >
      {/* ===================================================================
          RIGHT SIDE (in RTL): Mobile Hamburger + Algonet Brand + Date & Time Capsule (Desktop)
          =================================================================== */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Menu Button (< lg screens) با انیمیشن مورف ۳ خط به ضربدر و ورود منو از راست */}
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={`lg:hidden size-10 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm active:scale-90 shrink-0 ${
              isMobileMenuOpen
                ? 'bg-[#666cff] text-white shadow-[0_4px_14px_rgba(102,108,255,0.4)]'
                : 'bg-[#f4f5fa] dark:bg-[#242638] border border-[#e0e2ec] dark:border-[#3d3f59] text-[#1e1e2d] dark:text-[#eaeafb] hover:bg-[#666cff] hover:text-white'
            }`}
            aria-label={isMobileMenuOpen ? "بستن منوی ناوبری" : "باز کردن منوی ناوبری"}
            title={isMobileMenuOpen ? "بستن منو" : "منوی ناوبری"}
          >
            {/* ۳ خط متحرک که به صورت فنری و اسموت به ضربدر تبدیل می‌شوند */}
            <div className="w-[18px] h-[13px] flex flex-col justify-between items-center relative pointer-events-none">
              <span
                className={`w-[18px] h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''
                }`}
              />
              <span
                className={`w-[18px] h-[2px] rounded-full bg-current transition-all duration-200 ease-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`w-[18px] h-[2px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''
                }`}
              />
            </div>
          </button>
        )}

        {/* Compact Algonet Logo on mobile (< lg screens) */}
        <div
          onClick={() => onNavigate('home')}
          className="flex lg:hidden items-center gap-2 cursor-pointer shrink-0"
          title="پورتال الگونت"
        >
          <AlgonetLogo variant="symbol" size={30} theme={theme} />
          <span className="font-['Vazirmatn'] font-bold text-sm hidden md:inline text-[#1e1e2d] dark:text-[#eaeafb]">
            الگونت
          </span>
        </div>

        {/* Date & Time Capsule (مخفی در موبایل طبق درخواست، فقط در تبلت و دسکتاپ md+ نمایش داده می‌شود) */}
        <div className="hidden md:flex h-[40px] px-3 sm:px-4 rounded-[16px] bg-[#f4f5fa] dark:bg-[#242638] border border-[#e0e2ec] dark:border-[#3d3f59] items-center gap-2.5 shadow-inner shrink-0">
          <Clock className="size-4 text-[#666cff] shrink-0" />

          {/* Live Clock */}
          <span className="font-['Vazirmatn'] font-bold text-xs sm:text-[13px] text-[#1e1e2d] dark:text-[#eaeafb] tabular-nums tracking-wide">
            {currentTime}
          </span>

          <span className="text-[#d0d2e0] dark:text-[#3d3f59] text-xs">|</span>

          {/* Persian Date */}
          <span className="font-['Vazirmatn'] font-medium text-xs text-[#62657a] dark:text-[#8386a1] truncate max-w-[130px] md:max-w-none">
            {persianDate}
          </span>

          {/* Gregorian Date (desktop only) */}
          <span className="hidden xl:inline-block text-[10px] font-sans text-[#62657a] dark:text-[#8386a1]/80 dir-ltr bg-[#e9ebf2] dark:bg-[#2b2d42] px-2 py-0.5 rounded-md border border-[#d8dbed] dark:border-[#3d3f59]/60">
            {gregorianDate}
          </span>
        </div>
      </div>

      {/* ===================================================================
          LEFT SIDE (in RTL): Theme Switcher + Bell
          (پروفایل طبق درخواست از تاپ‌بار حذف شد و در نوار ناوبری پایین قرار دارد)
          =================================================================== */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Dark / Light Mode Switcher Capsule */}
        <button
          type="button"
          data-theme-switcher="true"
          onClick={(e) => onToggleTheme(e)}
          aria-label={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
          title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
          className="h-[32px] w-[56px] sm:w-[62px] rounded-full bg-[#f0f1f7] dark:bg-[#242638] border border-[#e0e2ec] dark:border-[#3d3f59] p-0.5 flex items-center justify-between cursor-pointer relative transition-all duration-200 shadow-inner select-none active:scale-90 hover:border-[#666cff]/50"
        >
          {/* Moon button / state */}
          <div
            className={`w-[25px] sm:w-[28px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-[#666cff] to-[#5538ee] text-white shadow-[0_0_12px_rgba(102,108,255,0.45)] scale-100'
                : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] scale-90 opacity-50'
            }`}
          >
            <Moon className={`size-3 sm:size-3.5 transition-transform duration-500 ease-out ${theme === 'dark' ? 'rotate-0' : '-rotate-90'}`} />
          </div>

          {/* Sun button / state */}
          <div
            className={`w-[25px] sm:w-[28px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-[#666cff] to-[#5538ee] text-white shadow-[0_0_12px_rgba(102,108,255,0.45)] scale-100'
                : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] scale-90 opacity-50'
            }`}
          >
            <Sun className={`size-3 sm:size-3.5 transition-transform duration-500 ease-out ${theme === 'light' ? 'rotate-0' : 'rotate-90'}`} />
          </div>
        </button>

        {/* Notification Bell with Badge */}
        <button
          type="button"
          onClick={() => onNavigate('notifications')}
          className="relative size-9 sm:size-10 rounded-full flex items-center justify-center text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#f0f1f7] dark:hover:bg-[#383a54]/40 transition-colors cursor-pointer"
          title={`اعلانات من (${unreadNotificationsCount} خوانده نشده)`}
          aria-label="اعلانات من"
        >
          <Bell className="size-4 sm:size-[19px]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-2 right-2 size-2 rounded-full bg-[#666cff] ring-2 ring-white dark:ring-[#30334e] shadow-[0_0_8px_#666cff]" />
          )}
        </button>
      </div>
    </header>
  );
};
