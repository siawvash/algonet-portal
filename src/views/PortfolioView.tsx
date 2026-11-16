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
  PieChart,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface PortfolioViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

// Sample 14-day metrics for "حضور در برابر Worklog"
interface DailyMetric {
  id: number;
  dayNum: string;
  dayName: string;
  fullDate: string;
  attendance: number;
  worklog: number;
  isWeekend?: boolean;
}

const SAMPLE_14_DAYS: DailyMetric[] = [
  { id: 1, dayNum: '12', dayName: 'شنبه', fullDate: 'شنبه ۱۲ آبان', attendance: 8.5, worklog: 7.8 },
  { id: 2, dayNum: '13', dayName: 'یکشنبه', fullDate: 'یکشنبه ۱۳ آبان', attendance: 9.0, worklog: 8.5 },
  { id: 3, dayNum: '14', dayName: 'دوشنبه', fullDate: 'دوشنبه ۱۴ آبان', attendance: 8.2, worklog: 8.0 },
  { id: 4, dayNum: '15', dayName: 'سه‌شنبه', fullDate: 'سه‌شنبه ۱۵ آبان', attendance: 8.7, worklog: 8.2 },
  { id: 5, dayNum: '16', dayName: 'چهارشنبه', fullDate: 'چهارشنبه ۱۶ آبان', attendance: 7.5, worklog: 7.0 },
  { id: 6, dayNum: '17', dayName: 'پنج‌شنبه', fullDate: 'پنج‌شنبه ۱۷ آبان', attendance: 4.0, worklog: 3.5 },
  { id: 7, dayNum: '18', dayName: 'جمعه', fullDate: 'جمعه ۱۸ آبان (تعطیل)', attendance: 0, worklog: 0, isWeekend: true },
  { id: 8, dayNum: '19', dayName: 'شنبه', fullDate: 'شنبه ۱۹ آبان', attendance: 9.2, worklog: 8.8 },
  { id: 9, dayNum: '20', dayName: 'یکشنبه', fullDate: 'یکشنبه ۲۰ آبان', attendance: 8.5, worklog: 8.0 },
  { id: 10, dayNum: '21', dayName: 'دوشنبه', fullDate: 'دوشنبه ۲۱ آبان', attendance: 8.0, worklog: 7.8 },
  { id: 11, dayNum: '22', dayName: 'سه‌شنبه', fullDate: 'سه‌شنبه ۲۲ آبان', attendance: 8.8, worklog: 8.3 },
  { id: 12, dayNum: '23', dayName: 'چهارشنبه', fullDate: 'چهارشنبه ۲۳ آبان', attendance: 8.2, worklog: 7.7 },
  { id: 13, dayNum: '24', dayName: 'پنج‌شنبه', fullDate: 'پنج‌شنبه ۲۴ آبان', attendance: 3.5, worklog: 3.0 },
  { id: 14, dayNum: '25', dayName: 'جمعه', fullDate: 'جمعه ۲۵ آبان (تعطیل)', attendance: 0, worklog: 0, isWeekend: true },
];

// Sample project share distribution for "سهم پروژه‌ها" (یکپارچه با ۱۴۲.۵ ساعت کارکرد دوره جاری)
interface ProjectShare {
  id: string;
  name: string;
  percentage: number;
  hours: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  badgeBg: string;
  badgeText: string;
}

const SAMPLE_PROJECT_SHARES: ProjectShare[] = [
  {
    id: 'elgoteria',
    name: 'الگوتریا',
    percentage: 40,
    hours: 57.0,
    color: '#666cff',
    gradientFrom: '#8c90ff',
    gradientTo: '#666cff',
    badgeBg: 'bg-[#666cff]/10 dark:bg-[#666cff]/20',
    badgeText: 'text-[#666cff] dark:text-[#8c90ff]'
  },
  {
    id: 'portal-test',
    name: 'تست پروژه پورتال',
    percentage: 28,
    hours: 39.9,
    color: '#00cfe8',
    gradientFrom: '#2dd4bf',
    gradientTo: '#00cfe8',
    badgeBg: 'bg-[#00cfe8]/10 dark:bg-[#00cfe8]/20',
    badgeText: 'text-[#00cfe8]'
  },
  {
    id: 'sso-auth',
    name: 'سامانه احراز هویت (SSO)',
    percentage: 17,
    hours: 24.2,
    color: '#28c76f',
    gradientFrom: '#48da89',
    gradientTo: '#28c76f',
    badgeBg: 'bg-[#28c76f]/10 dark:bg-[#28c76f]/20',
    badgeText: 'text-[#28c76f]'
  },
  {
    id: 'other',
    name: 'سایر و جلسات تیمی',
    percentage: 15,
    hours: 21.4,
    color: '#ff9f43',
    gradientFrom: '#ffb976',
    gradientTo: '#ff9f43',
    badgeBg: 'bg-[#ff9f43]/10 dark:bg-[#ff9f43]/20',
    badgeText: 'text-[#ff9f43]'
  }
];

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

  // State for chart interactions
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(7); // Default to day 8 (شنبه ۱۹ آبان)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

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

  // Compute donut chart geometry
  const radius = 66;
  const circumference = 2 * Math.PI * radius; // ~414.69
  const segmentGap = 6; // visual gap in px between arc segments
  const totalGaps = SAMPLE_PROJECT_SHARES.length * segmentGap; // 24px

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
          <div className="flex items-center gap-5 sm:gap-6 w-full lg:w-auto">
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

            <div className="space-y-1.5 text-right">
              <h2 className="font-['Vazirmatn'] font-bold text-lg sm:text-xl text-[#1e1e2d] dark:text-[#eaeafb] leading-tight">
                {CURRENT_USER.name}
              </h2>
              <div className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] font-medium flex items-center justify-start gap-1.5">
                <span>{CURRENT_USER.englishName}</span>
                <span className="text-[#62657a]/50 dark:text-[#8386a1]/50">·</span>
                <span className="font-mono text-[11.5px]">{CURRENT_USER.username}</span>
              </div>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] leading-relaxed pt-0.5">
                {userBio}
              </p>
            </div>
          </div>

          {/* Left Section (in RTL): Presence Status & Location Above, Date of Birth Below */}
          <div className="flex flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#e0e2ec] dark:border-[#3d3f59]">
            {/* Top row: حاضر و مکان کنار هم */}
            <div className="flex flex-wrap items-center gap-2.5">
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

            {/* Bottom: تاریخ تولد */}
            <div className="text-right lg:text-left">
              <span className="text-[11px] text-[#62657a] dark:text-[#8386a1] font-['Vazirmatn'] block">
                تاریخ تولد
              </span>
              <span className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#666cff] dark:text-[#8c90ff] block mt-0.5">
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
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#1e1e2d] dark:text-[#eaeafb] leading-tight">
              {toPersianDigits('142')} ساعت و {toPersianDigits('30')} دقیقه
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              ثبت‌شده در دوره جاری
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
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#1e1e2d] dark:text-[#eaeafb] leading-tight">
              {toPersianDigits('22')} ساعت و {toPersianDigits('15')} دقیقه
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              مجموع جلسات دوره جاری
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
            <h3 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#1e1e2d] dark:text-[#eaeafb] leading-tight">
              {toPersianDigits('1')} ساعت و {toPersianDigits('20')} دقیقه
            </h3>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              ۲ مورد تأخیر ثبت‌شده
            </p>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        4. CHARTS / ANALYTICS ROW (۲ ستون در میانه صفحه با دیتا تصادفی)
        ================================================== 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Right Column (Wider ~62%): حضور در برابر Worklog */}
        <div className="lg:col-span-7 xl:col-span-8 rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 sm:p-7 flex flex-col justify-between text-right">
          {/* Header & Legends */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-5 text-[#666cff] dark:text-[#8c90ff]" />
                <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  حضور در برابر Worklog
                </h2>
              </div>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                ۱۴ روز گذشته، بر حسب ساعت
              </p>
            </div>

            {/* Legends */}
            <div className="flex items-center gap-4 text-xs font-['Vazirmatn']">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-md bg-[#666cff] shadow-sm" />
                <span className="text-[#62657a] dark:text-[#8386a1]">حضور</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-md bg-[#00cfe8] shadow-sm" />
                <span className="text-[#62657a] dark:text-[#8386a1]">Worklog</span>
              </div>
            </div>
          </div>

          {/* Active / Hovered Day Tooltip Bar - Pinned right below the header line */}
          {hoveredDayIndex !== null && (
            <div className="mt-3.5 mb-2 p-2.5 px-4 rounded-xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between flex-wrap gap-2 text-xs font-['Vazirmatn'] animate-in fade-in duration-150 shadow-xs">
              <span className="font-semibold text-[#1e1e2d] dark:text-[#eaeafb]">
                {SAMPLE_14_DAYS[hoveredDayIndex].fullDate}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[#666cff] dark:text-[#8c90ff] font-medium">
                  حضور: {toPersianDigits(SAMPLE_14_DAYS[hoveredDayIndex].attendance)} ساعت
                </span>
                <span className="text-[#00cfe8] font-medium">
                  Worklog: {toPersianDigits(SAMPLE_14_DAYS[hoveredDayIndex].worklog)} ساعت
                </span>
              </div>
            </div>
          )}

          {/* Interactive Dual Bar SVG Chart Area - Expanded to fill the remaining space */}
          <div className="flex-1 flex flex-col justify-center py-2 w-full overflow-x-auto min-h-[250px] sm:min-h-[280px]">
            <svg
              viewBox="0 0 650 250"
              className="w-full h-[250px] sm:h-[280px] overflow-visible select-none"
              style={{ direction: 'rtl' }}
            >
              <defs>
                <linearGradient id="purpleBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8c90ff" />
                  <stop offset="100%" stopColor="#666cff" />
                </linearGradient>
                <linearGradient id="cyanBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#00cfe8" />
                </linearGradient>
              </defs>

              {/* Horizontal reference grid lines (0h, 2.5h, 5h, 7.5h, 10h) */}
              {[0, 2.5, 5, 7.5, 10].map((val) => {
                const y = 215 - (val / 10) * 185;
                return (
                  <g key={val}>
                    <line
                      x1="32"
                      y1={y}
                      x2="628"
                      y2={y}
                      stroke="currentColor"
                      strokeDasharray={val === 0 ? 'none' : '4 4'}
                      className="text-[#e0e2ec] dark:text-[#3d3f59]"
                      strokeWidth="1"
                    />
                    <text
                      x="15"
                      y={y + 3.5}
                      textAnchor="middle"
                      className="text-[10px] font-['Vazirmatn'] fill-[#62657a] dark:fill-[#8386a1]"
                    >
                      {toPersianDigits(val)}
                    </text>
                  </g>
                );
              })}

              {/* 14 Days Dual Bars */}
              {SAMPLE_14_DAYS.map((item, idx) => {
                const colWidth = 40;
                const startX = 45;
                const xCenter = startX + idx * colWidth + colWidth / 2;
                const maxH = 185;
                const zeroY = 215;

                const attH = (item.attendance / 10) * maxH;
                const attY = zeroY - attH;

                const wlH = (item.worklog / 10) * maxH;
                const wlY = zeroY - wlH;

                const isHovered = hoveredDayIndex === idx;

                return (
                  <g
                    key={item.id}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredDayIndex(idx)}
                  >
                    {/* Column hover background highlight */}
                    <rect
                      x={startX + idx * colWidth}
                      y={15}
                      width={colWidth}
                      height={205}
                      rx="8"
                      className={`transition-all duration-150 ${
                        isHovered
                          ? 'fill-[#666cff]/10 dark:fill-[#666cff]/20'
                          : 'fill-transparent hover:fill-[#666cff]/5'
                      }`}
                    />

                    {/* Attendance Bar (Purple) */}
                    {item.attendance > 0 ? (
                      <rect
                        x={xCenter - 13}
                        y={attY}
                        width="11"
                        height={attH}
                        rx="5"
                        fill="url(#purpleBarGrad)"
                        className={`transition-all duration-200 ${
                          isHovered ? 'filter drop-shadow-[0_2px_8px_rgba(102,108,255,0.45)]' : ''
                        }`}
                      />
                    ) : (
                      <circle cx={xCenter - 7.5} cy={zeroY - 4} r="2" className="fill-[#62657a]/40" />
                    )}

                    {/* Worklog Bar (Cyan) */}
                    {item.worklog > 0 ? (
                      <rect
                        x={xCenter + 2}
                        y={wlY}
                        width="11"
                        height={wlH}
                        rx="5"
                        fill="url(#cyanBarGrad)"
                        className={`transition-all duration-200 ${
                          isHovered ? 'filter drop-shadow-[0_2px_8px_rgba(0,207,232,0.45)]' : ''
                        }`}
                      />
                    ) : (
                      <circle cx={xCenter + 7.5} cy={zeroY - 4} r="2" className="fill-[#62657a]/40" />
                    )}

                    {/* Day Label at bottom */}
                    <text
                      x={xCenter}
                      y="236"
                      textAnchor="middle"
                      className={`text-[11px] font-['Vazirmatn'] transition-colors ${
                        isHovered
                          ? 'fill-[#666cff] dark:fill-[#8c90ff] font-bold'
                          : item.isWeekend
                          ? 'fill-[#ea5455] dark:fill-[#ea5455]'
                          : 'fill-[#62657a] dark:fill-[#8386a1]'
                      }`}
                    >
                      {toPersianDigits(item.dayNum)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Summary Indicators */}
          <div className="pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between flex-wrap gap-3 text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
            <div className="flex items-center gap-1.5">
              <span className="font-medium">مجموع کارکرد ۱۴ روز:</span>
              <span className="font-bold text-[#1e1e2d] dark:text-[#eaeafb]">
                {toPersianDigits('86.6')} ساعت
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium">میانگین روزانه:</span>
              <span className="font-bold text-[#28c76f]">
                {toPersianDigits('6.2')} ساعت
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium">تطابق ثبت:</span>
              <span className="font-bold text-[#666cff] dark:text-[#8c90ff]">
                {toPersianDigits('94')}٪
              </span>
            </div>
          </div>
        </div>

        {/* Left Column (Narrower ~38%): سهم پروژه‌ها */}
        <div className="lg:col-span-5 xl:col-span-4 rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-5 sm:p-7 flex flex-col justify-between text-right">
          {/* Header */}
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20">
                  <PieChart className="size-4" />
                </div>
                <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  سهم پروژه‌ها
                </h2>
              </div>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                از مجموع Worklog دوره ({toPersianDigits('142.5')} ساعت)
              </p>
            </div>

            <span className="text-xs font-['Vazirmatn'] font-semibold text-[#666cff] dark:text-[#8c90ff] bg-[#666cff]/10 dark:bg-[#666cff]/20 px-3 py-1 rounded-full border border-[#666cff]/20 shadow-xs">
              {toPersianDigits('4')} پروژه
            </span>
          </div>

          {/* Donut Chart Visual Area */}
          <div className="py-5 flex flex-col items-center justify-center relative">
            <div className="relative size-48 sm:size-52 flex items-center justify-center">
              {/* Subtle ambient colored glow behind donut */}
              <div
                className="absolute inset-4 rounded-full blur-2xl transition-all duration-500 pointer-events-none opacity-40 dark:opacity-30"
                style={{
                  backgroundColor: hoveredProjectId
                    ? SAMPLE_PROJECT_SHARES.find((p) => p.id === hoveredProjectId)?.color || '#666cff'
                    : '#666cff'
                }}
              />

              <svg className="size-full -rotate-90 overflow-visible" viewBox="0 0 190 190">
                <defs>
                  {/* Gradients for each project slice */}
                  {SAMPLE_PROJECT_SHARES.map((p) => (
                    <linearGradient key={`grad-${p.id}`} id={`grad-${p.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={p.gradientFrom} />
                      <stop offset="100%" stopColor={p.gradientTo} />
                    </linearGradient>
                  ))}

                  {/* Soft Drop Glow Filter for active slice */}
                  <filter id="donutSliceGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle Background Track Ring */}
                <circle
                  cx="95"
                  cy="95"
                  r={radius}
                  className="stroke-[#f0f2f8] dark:stroke-[#25273c]"
                  strokeWidth="14"
                  fill="transparent"
                />

                {/* Inner 3D Disc */}
                <circle
                  cx="95"
                  cy="95"
                  r="52"
                  className="fill-white dark:fill-[#25273c] stroke-[#e0e2ec] dark:stroke-[#3d3f59]/60 transition-colors duration-200"
                  strokeWidth="1.2"
                />

                {/* Slices with segment gaps and rounded caps */}
                {SAMPLE_PROJECT_SHARES.map((project, idx) => {
                  const netCircumference = circumference - totalGaps;
                  const dashLength = (project.percentage / 100) * netCircumference;
                  const prevOffset = SAMPLE_PROJECT_SHARES.slice(0, idx).reduce(
                    (sum, p) => sum + (p.percentage / 100) * netCircumference + segmentGap,
                    0
                  );
                  const isHovered = hoveredProjectId === project.id;
                  const isAnyHovered = hoveredProjectId !== null;

                  return (
                    <circle
                      key={project.id}
                      cx="95"
                      cy="95"
                      r={radius}
                      stroke={`url(#grad-${project.id})`}
                      strokeWidth={isHovered ? 20 : 15}
                      strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                      strokeDashoffset={-prevOffset}
                      strokeLinecap="round"
                      fill="transparent"
                      filter={isHovered ? 'url(#donutSliceGlow)' : undefined}
                      className={`transition-all duration-300 cursor-pointer ${
                        isAnyHovered && !isHovered ? 'opacity-35 scale-98' : 'opacity-100'
                      }`}
                      style={{ transformOrigin: '95px 95px' }}
                      onMouseEnter={() => setHoveredProjectId(project.id)}
                      onMouseLeave={() => setHoveredProjectId(null)}
                    />
                  );
                })}
              </svg>

              {/* Center Info in Donut (Layered content) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4 select-none">
                {hoveredProjectId ? (
                  (() => {
                    const activeProject = SAMPLE_PROJECT_SHARES.find((p) => p.id === hoveredProjectId);
                    if (!activeProject) return null;
                    return (
                      <div className="flex flex-col items-center animate-in zoom-in-95 duration-150">
                        <span
                          className="text-[11px] font-semibold flex items-center gap-1.5 truncate max-w-[110px]"
                          style={{ color: activeProject.color }}
                        >
                          <span
                            className="size-2 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: activeProject.color }}
                          />
                          {activeProject.name}
                        </span>
                        <span
                          className="font-['Vazirmatn'] font-black text-3xl leading-none tracking-tight my-1"
                          style={{ color: activeProject.color }}
                        >
                          {toPersianDigits(activeProject.percentage)}٪
                        </span>
                        <span className="text-[11px] font-medium text-[#62657a] dark:text-[#8386a1] bg-[#f4f5fa] dark:bg-[#34364d] px-2 py-0.5 rounded-full border border-[#e0e2ec] dark:border-[#42455f]">
                          {toPersianDigits(activeProject.hours)} ساعت
                        </span>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex flex-col items-center animate-in fade-in duration-200">
                    <span className="text-[10px] font-semibold text-[#666cff] dark:text-[#8c90ff] bg-[#666cff]/10 dark:bg-[#666cff]/20 px-2 py-0.5 rounded-full border border-[#666cff]/15">
                      مجموع دوره
                    </span>
                    <span className="font-['Vazirmatn'] font-black text-2xl sm:text-3xl text-[#1e1e2d] dark:text-[#eaeafb] tracking-tight leading-none my-1">
                      {toPersianDigits('142.5')}
                    </span>
                    <span className="text-[10.5px] font-medium text-[#62657a] dark:text-[#8386a1]">
                      ساعت کارکرد
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project List Breakdown */}
          <div className="space-y-2 pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
            {SAMPLE_PROJECT_SHARES.map((project) => {
              const isHovered = hoveredProjectId === project.id;
              return (
                <div
                  key={project.id}
                  className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isHovered
                      ? 'bg-[#f4f5fa] dark:bg-[#383a54] border-[#666cff]/40 shadow-sm scale-[1.015]'
                      : 'bg-transparent hover:bg-[#f8f9fd] dark:hover:bg-[#34364d]/60 border-transparent'
                  }`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  <div className="flex items-center justify-between text-xs font-['Vazirmatn'] mb-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="size-3 rounded-md shrink-0 shadow-xs transition-transform duration-200"
                        style={{
                          backgroundColor: project.color,
                          boxShadow: isHovered ? `0 0 8px ${project.color}` : undefined
                        }}
                      />
                      <span className="font-semibold text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] truncate">
                        {project.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11.5px] font-medium text-[#62657a] dark:text-[#8386a1]">
                        {toPersianDigits(project.hours)} س
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${project.badgeBg} ${project.badgeText}`}
                      >
                        {toPersianDigits(project.percentage)}٪
                      </span>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="h-1.5 w-full bg-[#f0f2f8] dark:bg-[#282a40] rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${project.percentage}%`,
                        background: `linear-gradient(to left, ${project.gradientFrom}, ${project.gradientTo})`
                      }}
                    />
                  </div>
                </div>
              );
            })}
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
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              مرخصی
            </h2>
            <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
              دوره جاری
            </span>
          </div>

          <div className="divide-y divide-[#e0e2ec] dark:divide-[#3d3f59] py-2 flex-1 flex flex-col justify-around">
            {/* استحقاقی استفاده‌شده */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-['Vazirmatn'] font-medium text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block">
                  استحقاقی استفاده‌شده
                </span>
                <span className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] block">
                  باقی‌مانده سهمیه ماه: {toPersianDigits('0.5')} روز ({toPersianDigits('4')} ساعت)
                </span>
              </div>
              <span className="font-['Vazirmatn'] font-bold text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                {toPersianDigits('2')} روز ({toPersianDigits('16')} ساعت)
              </span>
            </div>

            {/* استعلاجی */}
            <div className="py-3.5 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-['Vazirmatn'] font-medium text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                  استعلاجی
                </span>
                <span className="font-['Vazirmatn'] text-[11px] text-[#28c76f] block">
                  بدون غیبت پزشکی در دوره
                </span>
              </div>
              <span className="font-['Vazirmatn'] font-bold text-xs sm:text-sm text-[#28c76f]">
                {toPersianDigits('0')} روز
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 (Middle): جایگاه من */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              جایگاه من
            </h2>
            <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
              رتبه‌بندی تیمی
            </span>
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
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                {toPersianDigits('4')} از {toPersianDigits('28')} نفر
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
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#ffb800]">
                {toPersianDigits('2')} از {toPersianDigits('28')} نفر
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
              <span className="font-['Vazirmatn'] text-xs font-semibold text-[#1e1e2d] dark:text-[#eaeafb]">
                توسعه نرم‌افزار (پلتفرم)
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 (Left): پروژه‌های من */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              پروژه‌های من
            </h2>
            <span className="text-xs font-['Vazirmatn'] font-medium text-[#62657a] dark:text-[#8386a1]">
              {toPersianDigits('3')} پروژه فعال
            </span>
          </div>

          <div className="divide-y divide-[#e0e2ec] dark:divide-[#3d3f59] py-1 flex-1 flex flex-col justify-around">
            {/* Project 1: الگوتریا */}
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
                    تعداد تسک‌های باز: {toPersianDigits('5')} تسک
                  </span>
                </div>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#666cff] dark:text-[#8c90ff] shrink-0">
                {toPersianDigits('57')} ساعت ({toPersianDigits('40')}٪)
              </span>
            </div>

            {/* Project 2: تست پروژه پورتال */}
            <div className="py-2.5 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-xl bg-[#00cfe8]/10 dark:bg-[#00cfe8]/20 text-[#00cfe8] border border-[#00cfe8]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="size-4" />
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-['Vazirmatn'] font-semibold text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block truncate">
                    تست پروژه پورتال
                  </span>
                  <span className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] block truncate">
                    تعداد تسک‌های باز: {toPersianDigits('3')} تسک
                  </span>
                </div>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#00cfe8] shrink-0">
                {toPersianDigits('40')} ساعت ({toPersianDigits('28')}٪)
              </span>
            </div>

            {/* Project 3: سامانه احراز هویت (SSO) */}
            <div className="py-2.5 flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-8 rounded-xl bg-[#28c76f]/10 dark:bg-[#28c76f]/20 text-[#28c76f] flex items-center justify-center shrink-0 border border-[#28c76f]/20 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="size-4" />
                </div>
                <div className="space-y-0.5 truncate">
                  <span className="font-['Vazirmatn'] font-semibold text-xs sm:text-sm text-[#1e1e2d] dark:text-[#eaeafb] block truncate">
                    سامانه احراز هویت (SSO)
                  </span>
                  <span className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] block truncate">
                    تعداد تسک‌های باز: {toPersianDigits('2')} تسک
                  </span>
                </div>
              </div>
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#28c76f] shrink-0">
                {toPersianDigits('24')} ساعت ({toPersianDigits('17')}٪)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
