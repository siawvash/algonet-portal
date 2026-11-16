import React, { useState, useEffect } from 'react';
import { PortalNavId } from '../types';
import { CURRENT_USER } from '../data/mockData';
import { toPersianDigits } from '../utils/formatters';
import { UserAvatar } from '../components/common/UserAvatar';
import {
  Clock,
  ClipboardCheck,
  Users,
  AlertTriangle,
  FolderGit2,
  Calendar,
  Trophy,
  MapPin,
  Inbox,
  PieChart,
  BarChart3,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface PortfolioViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  // Sync avatar, location & bio from localStorage
  const [avatarImage, setAvatarImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('algonet_user_avatar');
    } catch {
      return null;
    }
  });

  const [currentLocation, setCurrentLocation] = useState<string>(() => {
    try {
      return localStorage.getItem('algonet_user_location') || 'Hafez Building ، Floor 2';
    } catch {
      return 'Hafez Building ، Floor 2';
    }
  });

  const [userBio, setUserBio] = useState<string>(() => {
    try {
      return localStorage.getItem('algonet_user_bio') || 'بایویی برای نمایش ثبت نشده است.';
    } catch {
      return 'بایویی برای نمایش ثبت نشده است.';
    }
  });

  useEffect(() => {
    const handleAvatarUpdate = () => {
      try {
        setAvatarImage(localStorage.getItem('algonet_user_avatar'));
      } catch {}
    };
    const handleLocationUpdate = () => {
      try {
        setCurrentLocation(localStorage.getItem('algonet_user_location') || 'Hafez Building ، Floor 2');
      } catch {}
    };

    window.addEventListener('user-avatar-updated', handleAvatarUpdate);
    window.addEventListener('user-location-updated', handleLocationUpdate);
    return () => {
      window.removeEventListener('user-avatar-updated', handleAvatarUpdate);
      window.removeEventListener('user-location-updated', handleLocationUpdate);
    };
  }, []);

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200 select-none">
      {/* 
        ==================================================
        1. PAGE HEADER (عنوان و دوره جاری پورتفولیو)
        ================================================== 
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-right">
        <div className="space-y-1">
          <h1 className="font-['Vazirmatn'] font-bold text-2xl sm:text-3xl text-[#1e1e2d] dark:text-[#eaeafb]">
            پورتفولیوی من
          </h1>
          <p className="font-['Vazirmatn'] text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1]">
            دوره جاری: از ۲۵ مهر ۱۴۰۵ تا ۲۵ آبان ۱۴۰۵
          </p>
        </div>
      </div>

      {/* 
        ==================================================
        2. USER PROFILE SUMMARY BANNER CARD (کارت هویت کاربری)
        ================================================== 
      */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 sm:p-7 transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Right Section (in RTL): Avatar + Name + Subtitle + Bio */}
          <div className="flex items-center gap-4.5 w-full lg:w-auto">
            {/* Circular Avatar with Teal/Emerald ring accent */}
            <div className="relative shrink-0">
              <div className="p-1 rounded-full border-2 border-[#20c997] shadow-sm">
                <UserAvatar
                  size="lg"
                  src={avatarImage}
                  showPresence={false}
                  interactive={!!onNavigate}
                  onClick={() => onNavigate && onNavigate('profile')}
                />
              </div>
            </div>

            <div className="space-y-1 text-right">
              <h2 className="font-['Vazirmatn'] font-bold text-lg sm:text-xl text-[#1e1e2d] dark:text-[#eaeafb]">
                {CURRENT_USER.name}
              </h2>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr text-right font-medium">
                {CURRENT_USER.englishName} · {CURRENT_USER.username}
              </p>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] pt-0.5">
                {userBio}
              </p>
            </div>
          </div>

          {/* Center Section: Presence Status Badge + Location Capsule */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-stretch lg:self-auto justify-start lg:justify-center">
            {/* Presence Badge: • حاضر */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#28c76f]/15 border border-[#28c76f]/30 text-[#28c76f] text-xs font-['Vazirmatn'] font-semibold shadow-sm">
              <span className="size-2 rounded-full bg-[#28c76f] shadow-[0_0_8px_#28c76f] animate-pulse" />
              <span>حاضر</span>
            </div>

            {/* Location Pill: مکان: Hafez Building ، Floor 2 */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#eaeafb] font-medium shadow-sm">
              <span className="text-[#62657a] dark:text-[#8386a1]">مکان:</span>
              <span className="font-mono text-[11.5px] dir-ltr">{currentLocation}</span>
            </div>
          </div>

          {/* Left Section (in RTL): Birth Dates */}
          <div className="flex items-center lg:flex-col lg:items-start justify-between w-full lg:w-auto gap-4 lg:gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#e0e2ec] dark:border-[#3d3f59]">
            <div className="text-right">
              <span className="text-[11px] text-[#62657a] dark:text-[#8386a1] font-['Vazirmatn'] block">
                تولد اصلی
              </span>
              <span className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#666cff] dark:text-[#8c90ff] block mt-0.5">
                {toPersianDigits('17')} آذر {toPersianDigits('1378')}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#62657a] dark:text-[#8386a1] font-['Vazirmatn'] block">
                تولد شناسنامه‌ای
              </span>
              <span className="font-['Vazirmatn'] text-xs sm:text-sm font-semibold text-[#1e1e2d] dark:text-[#eaeafb] block mt-0.5">
                {toPersianDigits('17')} آذر {toPersianDigits('1378')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        3. ROW OF 4 KPI METRIC CARDS (شاخص‌های چهارگانه عملکرد)
        ================================================== 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: مجموع حضور */}
        <div className="rounded-[22px] sm:rounded-[26px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_18px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 text-right flex flex-col justify-between group hover:border-[#666cff]/40 transition-colors">
          <div className="flex items-start justify-between gap-3">
            <div className="size-10 rounded-2xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] border border-[#666cff]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="size-5" />
            </div>
            <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] font-medium">
              مجموع حضور
            </span>
          </div>

          <div className="space-y-1 pt-4">
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#1e1e2d] dark:text-[#eaeafb] leading-tight">
              {toPersianDigits('153')} ساعت و {toPersianDigits('15')} دقیقه
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              در دوره جاری
            </p>
          </div>
        </div>

        {/* Card 2: مجموع Worklog */}
        <div className="rounded-[22px] sm:rounded-[26px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_18px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 text-right flex flex-col justify-between group hover:border-[#00cfe8]/40 transition-colors">
          <div className="flex items-start justify-between gap-3">
            <div className="size-10 rounded-2xl bg-[#00cfe8]/10 dark:bg-[#00cfe8]/20 text-[#00cfe8] border border-[#00cfe8]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ClipboardCheck className="size-5" />
            </div>
            <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] font-medium">
              مجموع Worklog
            </span>
          </div>

          <div className="space-y-1 pt-4">
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#62657a] dark:text-[#8386a1] leading-tight">
              نامشخص
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              داده کارکرد دوره موجود نیست
            </p>
          </div>
        </div>

        {/* Card 3: ساعات جلسات */}
        <div className="rounded-[22px] sm:rounded-[26px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_18px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 text-right flex flex-col justify-between group hover:border-[#ff9f43]/40 transition-colors">
          <div className="flex items-start justify-between gap-3">
            <div className="size-10 rounded-2xl bg-[#ff9f43]/10 dark:bg-[#ff9f43]/20 text-[#ff9f43] border border-[#ff9f43]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Users className="size-5" />
            </div>
            <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] font-medium">
              ساعات جلسات
            </span>
          </div>

          <div className="space-y-1 pt-4">
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#62657a] dark:text-[#8386a1] leading-tight">
              نامشخص
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              داده جلسات دوره موجود نیست
            </p>
          </div>
        </div>

        {/* Card 4: تأخیر و غیبت */}
        <div className="rounded-[22px] sm:rounded-[26px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_18px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 text-right flex flex-col justify-between group hover:border-[#ea5455]/40 transition-colors">
          <div className="flex items-start justify-between gap-3">
            <div className="size-10 rounded-2xl bg-[#ea5455]/10 dark:bg-[#ea5455]/20 text-[#ea5455] border border-[#ea5455]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <AlertTriangle className="size-5" />
            </div>
            <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] font-medium">
              تأخیر و غیبت
            </span>
          </div>

          <div className="space-y-1 pt-4">
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#62657a] dark:text-[#8386a1] leading-tight">
              نامشخص
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              داده تاخیر و غیبت موجود نیست
            </p>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        4. CHARTS / ANALYTICS ROW (۲ ستون در میانه صفحه)
        ================================================== 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Right Column (Wider ~62%): حضور در برابر Worklog */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="space-y-1">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              حضور در برابر Worklog
            </h2>
            <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
              ۱۴ روز گذشته، بر حسب ساعت
            </p>
          </div>

          {/* Empty State Card Area */}
          <div className="my-8 py-10 sm:py-14 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-dashed border-[#dce0ee] dark:border-[#3d3f59] flex flex-col items-center justify-center text-center">
            <div className="size-14 rounded-2xl bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] flex items-center justify-center shadow-sm mb-3">
              <Inbox className="size-7 stroke-[1.75]" />
            </div>
            <p className="font-['Vazirmatn'] text-xs sm:text-sm font-medium text-[#62657a] dark:text-[#8386a1]">
              داده روزانه‌ای برای نمودار موجود نیست
            </p>
          </div>
        </div>

        {/* Left Column (Narrower ~38%): سهم پروژه‌ها */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="space-y-1">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              سهم پروژه‌ها
            </h2>
            <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
              از مجموع Worklog دوره
            </p>
          </div>

          {/* Empty State Card Area */}
          <div className="my-8 py-10 sm:py-14 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-dashed border-[#dce0ee] dark:border-[#3d3f59] flex flex-col items-center justify-center text-center">
            <div className="size-14 rounded-2xl bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] flex items-center justify-center shadow-sm mb-3">
              <PieChart className="size-7 stroke-[1.75]" />
            </div>
            <p className="font-['Vazirmatn'] text-xs sm:text-sm font-medium text-[#62657a] dark:text-[#8386a1]">
              داده سهم کارکرد پروژه‌ها موجود نیست
            </p>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        5. BOTTOM 3-CARDS ROW (مرخصی + جایگاه من + پروژه‌های من)
        ================================================== 
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1 (Right): مرخصی */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              مرخصی
            </h2>
          </div>

          <div className="divide-y divide-[#e0e2ec] dark:divide-[#3d3f59] py-2 flex-1 flex flex-col justify-around">
            {/* استحقاقی استفاده‌شده */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-['Vazirmatn'] font-medium text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block">
                  استحقاقی استفاده‌شده
                </span>
                <span className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] block">
                  سهمیه مرخصی دوره موجود نیست
                </span>
              </div>
              <span className="font-['Vazirmatn'] font-bold text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1]">
                نامشخص
              </span>
            </div>

            {/* استعلاجی */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <span className="font-['Vazirmatn'] font-medium text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                استعلاجی
              </span>
              <span className="font-['Vazirmatn'] font-bold text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1]">
                نامشخص
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 (Middle): جایگاه من */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              جایگاه من
            </h2>
          </div>

          <div className="py-2 space-y-3.5 flex-1 flex flex-col justify-around">
            {/* رتبه حضور */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20">
                  <Clock className="size-4" />
                </div>
                <span className="font-['Vazirmatn'] text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1] font-medium">
                  رتبه حضور
                </span>
              </div>
              <span className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb]">
                —
              </span>
            </div>

            {/* رتبه Worklog */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-[#ffb800]/10 dark:bg-[#ffb800]/20 text-[#ffb800] flex items-center justify-center shrink-0 border border-[#ffb800]/20">
                  <Trophy className="size-4" />
                </div>
                <span className="font-['Vazirmatn'] text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1] font-medium">
                  رتبه Worklog
                </span>
              </div>
              <span className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb]">
                —
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e0e2ec] dark:bg-[#3d3f59]" />

            {/* تیم اصلی */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-[#00cfe8]/10 dark:bg-[#00cfe8]/20 text-[#00cfe8] flex items-center justify-center shrink-0 border border-[#00cfe8]/20">
                  <Users className="size-4" />
                </div>
                <span className="font-['Vazirmatn'] text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1] font-medium">
                  تیم اصلی
                </span>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-semibold text-[#62657a] dark:text-[#8386a1]">
                —
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 (Left): پروژه‌های من */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              پروژه‌های من
            </h2>
          </div>

          <div className="divide-y divide-[#e0e2ec] dark:divide-[#3d3f59] py-1 flex-1 flex flex-col justify-around">
            {/* Project 1 */}
            <div className="py-2.5 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="size-4" />
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-['Vazirmatn'] font-medium text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block truncate">
                    تعداد تسک‌های باز: نامشخص
                  </span>
                </div>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] shrink-0">
                نامشخص
              </span>
            </div>

            {/* Project 2: الگوتریا */}
            <div className="py-2.5 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="size-4" />
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-['Vazirmatn'] font-semibold text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block truncate">
                    الگوتریا
                  </span>
                  <span className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] block truncate">
                    تعداد تسک‌های باز: نامشخص
                  </span>
                </div>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] shrink-0">
                نامشخص
              </span>
            </div>

            {/* Project 3: تست پروژه پورتال */}
            <div className="py-2.5 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="size-4" />
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-['Vazirmatn'] font-semibold text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block truncate">
                    تست پروژه پورتال
                  </span>
                  <span className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] block truncate">
                    تعداد تسک‌های باز: نامشخص
                  </span>
                </div>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] shrink-0">
                نامشخص
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
