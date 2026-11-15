import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PortalNavId } from '../types';
import { INITIAL_PROJECTS, CURRENT_USER } from '../data/mockData';
import { toPersianDigits } from '../utils/formatters';
import { UserAvatar } from '../components/common/UserAvatar';
import {
  Award,
  GitMerge,
  Cpu,
  CheckCircle2,
  TrendingUp,
  Download,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  X,
  Code2,
  Calendar,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
  Clock
} from 'lucide-react';

interface PortfolioViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  // Filters
  const [periodFilter, setPeriodFilter] = useState<'year' | '6months' | 'all'>('year');
  const [projectStatusFilter, setProjectStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<'all' | 'arch' | 'devops' | 'frontend'>('all');

  // Selected project for modal detail
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Download resume state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1000);
  };

  // KPI Metrics (Figma Algonet/Metric/Default 11:23187-11:23190)
  const kpiMetrics = [
    {
      id: 'kpi-hours',
      title: 'ساعات کارکرد مؤثر',
      value: '۱,۸۴۰',
      unit: 'ساعت',
      growth: '+۸.۴٪',
      growthPositive: true,
      subtitle: '۹۸.۴٪ تطابق با تارگت سالانه در ۴۲ اسپرینت',
      icon: Clock,
      accent: '#666cff'
    },
    {
      id: 'kpi-uptime',
      title: 'نرخ موفقیت دیپلوی',
      value: '۹۹.۹۴٪',
      unit: 'پایداری',
      growth: '+۰.۱۲٪',
      growthPositive: true,
      subtitle: 'محیط‌های Production و اسلات‌های ابری DevSlot',
      icon: Zap,
      accent: '#28c76f'
    },
    {
      id: 'kpi-tasks',
      title: 'وظایف و ایشوهای بسته',
      value: '۳۴۲',
      unit: 'تسک',
      growth: '+۲۴ مورد',
      growthPositive: true,
      subtitle: '۱۵۸ مرج‌ریکوئست تأییدشده در GitLab و OpenProject',
      icon: GitMerge,
      accent: '#ff9f43'
    },
    {
      id: 'kpi-quality',
      title: 'شاخص کیفیت و تست',
      value: '۹۴.۶٪',
      unit: 'کیفیت',
      growth: 'Grade A',
      growthPositive: true,
      subtitle: 'پوشش تست با تحلیل استاتیک SonarQube',
      icon: ShieldCheck,
      accent: '#7c82ff'
    }
  ];

  // Domain Distribution Data (Figma Algonet/Chart/Service share 11:23191)
  const domainShare = [
    { title: 'معماری سیستم و میکروسرویس‌ها', percentage: 38, color: '#666cff', hours: '۷۰۰ ساعت' },
    { title: 'دواپس، CI/CD و زیرساخت ابری', percentage: 28, color: '#28c76f', hours: '۵۱۵ ساعت' },
    { title: 'فرانت‌اند و سیستم طراحی پورتال', percentage: 22, color: '#ff9f43', hours: '۴۰۵ ساعت' },
    { title: 'امنیت، IAM و احراز هویت متمرکز', percentage: 12, color: '#ea5455', hours: '۲۲۰ ساعت' }
  ];

  // Sprint Velocity Area Chart Data Points (Months Farvardin to Esfand)
  const monthlyTrends = [
    { month: 'فروردین', value: 140, target: 150 },
    { month: 'اردیبهشت', value: 165, target: 155 },
    { month: 'خرداد', value: 180, target: 160 },
    { month: 'تیر', value: 172, target: 160 },
    { month: 'مرداد', value: 190, target: 165 },
    { month: 'شهریور', value: 178, target: 165 },
    { month: 'مهر', value: 205, target: 170 },
    { month: 'آبان', value: 198, target: 170 },
    { month: 'آذر', value: 188, target: 170 },
    { month: 'دی', value: 215, target: 175 },
    { month: 'بهمن', value: 210, target: 175 },
    { month: 'اسفند', value: 220, target: 180 }
  ];

  // Detailed Projects List (Figma Algonet/Table/Requests populated 11:23193)
  const projectsList = [
    {
      id: 'p-1',
      code: '#PRJ-104',
      name: 'پورتال یکپارچه سازمانی الگونت (Portal 3.0)',
      role: 'معمار ارشد سیستم و لید فرانت‌اند',
      progress: 88,
      status: 'active',
      statusLabel: 'در حال توسعه',
      statusColor: '#28c76f',
      sprint: 'اسپرینت ۱۴ · آبان ۱۴۰۴',
      description: 'بازطراحی معماری میکروسرویس‌ها، یکپارچه‌سازی دیزاین سیستم با ۵ پالت اصلی و بهینه‌سازی بارگذاری ماژول‌ها زیر ۳۰۰ میلی‌ثانیه.',
      deliverables: ['سیستم طراحی مشترک (DS)', 'ماژول اخبار و اطلاعیه‌ها', 'سرویس‌های ابری یکپارچه'],
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST API'],
      teamSize: 5
    },
    {
      id: 'p-2',
      code: '#PRJ-089',
      name: 'زیرساخت اسلات‌های ابری توسعه‌دهندگان (DevSlot)',
      role: 'مهندس ارشد دواپس و پلتفرم ابری',
      progress: 100,
      status: 'completed',
      statusLabel: 'تکمیل‌شده',
      statusColor: '#666cff',
      sprint: 'اسپرینت ۱۱ · مرداد ۱۴۰۴',
      description: 'طراحی زیرساخت محیط‌های ابری ایزوله برای مهندسان با کانتینریزاسیون خودکار و کاهش زمان استقرار از ۲ ساعت به ۳ دقیقه.',
      deliverables: ['پایپ‌لاین خودکار کانتینرها', 'مانیتورینگ پایش لحظه‌ای منابع', 'ایزولاسیون شبکه'],
      techStack: ['Kubernetes', 'Docker', 'GitLab CI', 'Helm', 'Nexus'],
      teamSize: 4
    },
    {
      id: 'p-3',
      code: '#PRJ-076',
      name: 'سامانه پست الکترونیک و تقویم سازمانی (Algonet Mail)',
      role: 'توسعه‌دهنده ارشد سرویس‌های پایه',
      progress: 100,
      status: 'completed',
      statusLabel: 'تکمیل‌شده',
      statusColor: '#666cff',
      sprint: 'اسپرینت ۹ · خرداد ۱۴۰۴',
      description: 'اتصال همزمان بیش از ۳,۰۰۰ کاربر سازمانی به صندوق پستی امن، هماهنگی جلسات و سینک تقویم با سیستم مدیریت دسترسی.',
      deliverables: ['درگاه وب‌میل رسپانسیو', 'سینک دعوت‌نامه‌های تقویم', 'پروتکل امنیتی TLS 1.3'],
      techStack: ['Node.js', 'Redis', 'OAuth 2.0', 'WebSockets', 'PostgreSQL'],
      teamSize: 6
    },
    {
      id: 'p-4',
      code: '#PRJ-062',
      name: 'موتور ورود یکپارچه سازمانی (SSO & IAM Gateway)',
      role: 'مشاور معماری امنیت نرم‌افزار',
      progress: 100,
      status: 'completed',
      statusLabel: 'تکمیل‌شده',
      statusColor: '#666cff',
      sprint: 'اسپرینت ۶ · بهمن ۱۴۰۳',
      description: 'پیاده‌سازی درگاه متمرکز هویت و ورود یکپارچه بدون وقفه سازمانی همراه با احراز هویت دو مرحله‌ای (2FA) و کنترل سطوح دسترسی RBAC.',
      deliverables: ['توکن‌های رمزنگاری‌شده JWT', 'پروتکل احراز هویت 2FA', 'داشبورد نظارت سشن‌ها'],
      techStack: ['Keycloak', 'JWT', 'Spring Boot', 'PostgreSQL', 'Docker'],
      teamSize: 3
    }
  ];

  const filteredProjects = projectsList.filter((p) => {
    if (projectStatusFilter === 'all') return true;
    return p.status === projectStatusFilter;
  });

  // Skills List
  const skillsMatrix = [
    { name: 'Architecture & Microservices', category: 'arch', level: 'Senior / Lead', percent: 96, tags: 'DDD, Clean Arch' },
    { name: 'TypeScript / React / Vite', category: 'frontend', level: 'Expert', percent: 94, tags: 'Hooks, Component DS' },
    { name: 'Kubernetes & Docker', category: 'devops', level: 'Advanced', percent: 90, tags: 'Helm, Cloud Infra' },
    { name: 'GitLab CI/CD & Automation', category: 'devops', level: 'Expert', percent: 95, tags: 'Pipelines, Jenkins' },
    { name: 'Distributed Caching (Redis)', category: 'arch', level: 'Advanced', percent: 88, tags: 'Pub/Sub, Cluster' },
    { name: 'Tailwind CSS & Design Tokens', category: 'frontend', level: 'Expert', percent: 98, tags: 'Design System, RTL' },
    { name: 'REST & GraphQL APIs', category: 'arch', level: 'Senior', percent: 92, tags: 'OpenAPI, Gateway' },
    { name: 'SSO, OAuth 2.0 & Keycloak', category: 'arch', level: 'Advanced', percent: 89, tags: 'IAM, 2FA, JWT' }
  ];

  const filteredSkills = skillsMatrix.filter((s) => {
    if (skillCategoryFilter === 'all') return true;
    return s.category === skillCategoryFilter;
  });

  // SVG Chart path calculations
  const chartWidth = 700;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const maxVal = 240;
  const minVal = 120;

  const getX = (index: number) => paddingX + (index / (monthlyTrends.length - 1)) * (chartWidth - 2 * paddingX);
  const getY = (val: number) => chartHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (chartHeight - 2 * paddingY);

  const points = monthlyTrends.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPath = `M ${getX(0)} ${chartHeight - paddingY} L ${points} L ${getX(monthlyTrends.length - 1)} ${chartHeight - paddingY} Z`;
  const linePath = `M ${points}`;
  const targetPoints = monthlyTrends.map((d, i) => `${getX(i)},${getY(d.target)}`).join(' ');
  const targetLinePath = `M ${targetPoints}`;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200 select-none">
      {/* 
        ==================================================
        1. PAGE HEADER (Matches Reference Photo)
        ================================================== 
      */}
      <div className="space-y-1 text-right">
        <h1 className="font-['Vazirmatn'] font-bold text-2xl sm:text-3xl text-[#eaeafb]">
          پورتفولیوی من
        </h1>
        <p className="font-['Vazirmatn'] text-xs text-[#8386a1]">
          دوره جاری از ۱۸ مهر ۱۴۰۵ تا ۱۸ آبان ۱۴۰۵
        </p>
      </div>

      {/* 
        ==================================================
        2. USER PROFILE SUMMARY CARD (Exact Photo Replica)
        ================================================== 
      */}
      <div className="rounded-2xl border border-[#34364d] bg-[#282a42] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Right Side (in RTL): Avatar + Name + Subtitle + Bio */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Modern User Avatar with Glow Aura & Beacon */}
            <UserAvatar size="lg" showPresence={true} />

            <div className="space-y-1 text-right">
              <h2 className="font-['Vazirmatn'] font-bold text-lg sm:text-xl text-[#eaeafb]">
                {CURRENT_USER.name}
              </h2>
              <p className="font-['Vazirmatn'] text-xs text-[#8386a1] dir-ltr text-right">
                Siavash Bakhtiyari - s.bakhtiari
              </p>
              <p className="font-['Vazirmatn'] text-xs text-[#8386a1] pt-1">
                بایویی برای نمایش ثبت نشده است.
              </p>
            </div>
          </div>

          {/* Center (in RTL): Presence Status Badge */}
          <div className="flex items-center justify-center shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#243947] border border-[#166c5c]/40 text-[#5ee9b5] text-xs font-['Vazirmatn'] font-medium shadow-sm">
              <span className="size-2 rounded-full bg-[#5ee9b5] shadow-[0_0_8px_#5ee9b5] animate-pulse" />
              <span>حاضر</span>
            </div>
          </div>

          {/* Left Side (in RTL): Birth Dates */}
          <div className="flex flex-col items-end sm:items-start text-left sm:text-left space-y-3 shrink-0">
            <div>
              <span className="text-[11px] text-[#8386a1] font-['Vazirmatn'] block">
                تولد اصلی
              </span>
              <span className="font-['Vazirmatn'] font-bold text-base text-[#666cff] block mt-0.5">
                ۱۷ آذر ۱۳۷۸
              </span>
            </div>

            <div>
              <span className="text-[11px] text-[#8386a1] font-['Vazirmatn'] block">
                تولد شناسنامه‌ای
              </span>
              <span className="font-['Vazirmatn'] text-xs text-[#8386a1] block mt-0.5">
                ۱۷ آذر ۱۳۷۸
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        3. SERVICE PERFORMANCE NOTICE CARD (Exact Photo Replica)
        ================================================== 
      */}
      <div className="rounded-2xl border border-[#42455f] bg-[#30334e] p-5 sm:p-6 text-center shadow-sm">
        <p className="font-['Vazirmatn'] text-xs sm:text-[13px] text-[#8386a1] leading-relaxed">
          اطلاعات عملکرد دوره از سرویس زمان دریافت نشده است. اعداد و نمودارهای عملکرد پس از اتصال سرویس نمایش داده می‌شوند.
        </p>
      </div>

      {/* 
        ==================================================
        4. QUICK ACTIONS & FILTER PILLS
        ================================================== 
      */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#3d3f59]">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <h2 className="font-['Vazirmatn'] font-bold text-lg text-[#eaeafb] tracking-tight">
              کارنامه تحلیلی و جزئیات عملکرد
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#666cff]/15 text-[#666cff] border border-[#666cff]/30 text-[11px] font-['Vazirmatn'] font-medium">
              اسپرینت‌های تکمیل‌شده
            </span>
          </div>
        </div>

        {/* Filter Pills & Export Action */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
          <div className="flex items-center bg-[#34364d] border border-[#3d3f59] rounded-full p-1">
            <button
              onClick={() => setPeriodFilter('year')}
              className={`px-3 py-1 rounded-full text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                periodFilter === 'year'
                  ? 'bg-[#666cff] text-white font-medium shadow-sm'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              سال جاری
            </button>
            <button
              onClick={() => setPeriodFilter('6months')}
              className={`px-3 py-1 rounded-full text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                periodFilter === '6months'
                  ? 'bg-[#666cff] text-white font-medium shadow-sm'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              ۶ ماه اخیر
            </button>
            <button
              onClick={() => setPeriodFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                periodFilter === 'all'
                  ? 'bg-[#666cff] text-white font-medium shadow-sm'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              همه دوره‌ها
            </button>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-[#34364d] hover:bg-[#383b59] border border-[#42455f] hover:border-[#666cff] text-[#eaeafb] rounded-full h-[38px] px-4 text-xs font-['Vazirmatn'] font-medium transition-all duration-150 cursor-pointer shadow-sm group shrink-0"
            title="دانلود خلاصه پورتفولیو در قالب PDF"
          >
            {exportSuccess ? (
              <CheckCircle2 className="size-4 text-[#28c76f]" />
            ) : (
              <Download className="size-4 text-[#666cff] group-hover:scale-110 transition-transform" />
            )}
            <span>{exportSuccess ? 'دریافت شد' : 'خروجی کارنامه'}</span>
          </button>
        </div>
      </div>

      {/* 
        ==================================================
        2. KPI METRIC CARDS (Figma Algonet/Metric/Default 11:23187)
        ================================================== 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiMetrics.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-5 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] relative overflow-hidden group hover:border-[#666cff]/40 transition-all duration-200 text-right flex flex-col justify-between min-h-[148px]"
            >
              {/* Background subtle glow */}
              <div
                className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: kpi.accent }}
              />

              {/* Top Row: Title & Badge */}
              <div className="flex items-center justify-between z-10">
                <span className="font-['Vazirmatn'] font-medium text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Icon className="size-3.5" style={{ color: kpi.accent }} />
                  {kpi.title}
                </span>

                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-['Vazirmatn'] font-bold border"
                  style={{
                    backgroundColor: `${kpi.accent}15`,
                    color: kpi.accent,
                    borderColor: `${kpi.accent}35`
                  }}
                >
                  {kpi.growth}
                </span>
              </div>

              {/* Center: Big Value */}
              <div className="py-2 z-10 flex items-baseline gap-1.5">
                <span className="font-['Vazirmatn'] font-bold text-2xl sm:text-3xl text-[#eaeafb] tracking-tight">
                  {kpi.value}
                </span>
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] font-normal">
                  {kpi.unit}
                </span>
              </div>

              {/* Bottom: Context Subtitle */}
              <div className="z-10 border-t border-[#3d3f59] pt-2.5">
                <p className="font-['Vazirmatn'] text-[11px] text-[#8386a1] leading-snug truncate" title={kpi.subtitle}>
                  {kpi.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
        ==================================================
        3. ANALYTICS & TRENDS GRID:
           Left: Sprint Velocity & Monthly Trend (Area Chart)
           Right: Domain Share Breakdown (Donut Distribution)
        ================================================== 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sprint Velocity Area Chart (8 Cols) - Figma Algonet/Chart/Area trend 11:23192 */}
        <div className="lg:col-span-8 rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 flex flex-col justify-between space-y-5">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3d3f59] pb-4 text-right">
            <div>
              <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#eaeafb] flex items-center gap-2">
                <TrendingUp className="size-4 text-[#666cff]" />
                روند پیشرفت و بهره‌وری اسپرینت‌ها
              </h2>
              <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-0.5">
                مقایسه کارکرد ماهانه مؤثر (ساعت) در مقایسه با تارگت تعیین‌شده سازمانی
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-['Vazirmatn'] text-[#8386a1]">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#666cff]" />
                <span className="text-[#eaeafb]">کارکرد واقعی</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full border border-dashed border-[#8386a1]" />
                <span>تارگت برنامه‌ریزی</span>
              </div>
            </div>
          </div>

          {/* SVG Vector Area Chart */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[580px] h-[230px] relative">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* Purple Gradient for Area Fill */}
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#666cff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#666cff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Grid Lines */}
                {[120, 160, 200, 240].map((val) => (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={getY(val)}
                      x2={chartWidth - paddingX}
                      y2={getY(val)}
                      stroke="#3d3f59"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={chartWidth - paddingX + 8}
                      y={getY(val) + 4}
                      fill="#686773"
                      fontSize="10"
                      fontFamily="Vazirmatn"
                      textAnchor="start"
                    >
                      {toPersianDigits(val)}
                    </text>
                  </g>
                ))}

                {/* Target Baseline Line */}
                <path
                  d={targetLinePath}
                  fill="none"
                  stroke="#5a5968"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />

                {/* Area Gradient Fill */}
                <path d={areaPath} fill="url(#areaGradient)" />

                {/* Main Activity Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#666cff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points on Line */}
                {monthlyTrends.map((d, i) => (
                  <g key={i} className="group/point cursor-pointer">
                    <circle
                      cx={getX(i)}
                      cy={getY(d.value)}
                      r="4.5"
                      fill="#30334e"
                      stroke="#666cff"
                      strokeWidth="2.5"
                    />
                    {/* Tooltip on hover */}
                    <circle
                      cx={getX(i)}
                      cy={getY(d.value)}
                      r="9"
                      fill="#666cff"
                      opacity="0"
                      className="hover:opacity-30 transition-opacity"
                    />
                    {/* Month Label */}
                    <text
                      x={getX(i)}
                      y={chartHeight - 6}
                      fill="#8386a1"
                      fontSize="10"
                      fontFamily="Vazirmatn"
                      textAnchor="middle"
                    >
                      {d.month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Bottom Summary Stats */}
          <div className="grid grid-cols-3 gap-3 border-t border-[#3d3f59] pt-4 text-center">
            <div className="p-2 rounded-[14px] bg-[#34364d]">
              <span className="font-['Vazirmatn'] text-[11px] text-[#8386a1] block">میانگین ماهانه</span>
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb] mt-0.5 block">
                ۱۹۲ ساعت
              </span>
            </div>
            <div className="p-2 rounded-[14px] bg-[#34364d]">
              <span className="font-['Vazirmatn'] text-[11px] text-[#8386a1] block">بیشینه عملکرد</span>
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#28c76f] mt-0.5 block">
                ۲۲۰ ساعت (اسفند)
              </span>
            </div>
            <div className="p-2 rounded-[14px] bg-[#34364d]">
              <span className="font-['Vazirmatn'] text-[11px] text-[#8386a1] block">ضریب پایداری</span>
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#666cff] mt-0.5 block">
                ۹۹.۴٪
              </span>
            </div>
          </div>
        </div>

        {/* Domain Share Distribution (4 Cols) - Figma Algonet/Chart/Service share 11:23191 */}
        <div className="lg:col-span-4 rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 flex flex-col justify-between text-right">
          <div className="space-y-5">
          <div className="border-b border-[#3d3f59] pb-4">
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#eaeafb] flex items-center gap-2">
              <BarChart3 className="size-4 text-[#28c76f]" />
              توزیع حوزه‌های تخصصی
            </h2>
            <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-0.5">
              تفکیک ساعات کاری بر حسب دامنه‌های فنی
            </p>
          </div>

          {/* Progress Stack Bars */}
          <div className="h-3 w-full rounded-full bg-[#34364d] overflow-hidden flex">
            {domainShare.map((item, index) => (
              <div
                key={index}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full hover:opacity-85 transition-opacity"
                title={`${item.title}: ${item.percentage}٪`}
              />
            ))}
          </div>

          {/* Legend Items */}
          <div className="space-y-3.5 pt-2">
            {domainShare.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs font-['Vazirmatn']">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#eaeafb] text-[12px]">{item.title}</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[#8386a1] text-[11px]">{item.hours}</span>
                  <span className="font-bold text-[12px]" style={{ color: item.color }}>
                    {toPersianDigits(item.percentage)}٪
                  </span>
                </div>
              </div>
            ))}
          </div>

          </div>

          {/* Certification Badge Box */}
          <div className="rounded-[16px] bg-[#34364d] border border-[#3d3f59] p-3.5 flex items-center gap-3 mt-4">
            <div className="size-10 rounded-full bg-[#666cff]/15 border border-[#666cff]/30 flex items-center justify-center text-[#666cff] shrink-0">
              <Award className="size-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-['Vazirmatn'] font-bold text-xs text-[#eaeafb]">
                گواهینامه معمار ارشد ابری
              </h4>
              <p className="font-['Vazirmatn'] text-[11px] text-[#8386a1]">
                صادره از کمیته نوآوری و معماری الگونت (۱۴۰۴)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        4. FEATURED PROJECTS TABLE / CARDS
           (Figma Algonet/Table/Requests populated 11:23193)
        ================================================== 
      */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 space-y-5 text-right">
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3d3f59] pb-4">
          <div>
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#eaeafb] flex items-center gap-2">
              <Layers className="size-4 text-[#666cff]" />
              پروژه‌ها و مشارکت‌های فنی شاخص
            </h2>
            <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-0.5">
              سوابق توسعه و رهبری پروژه‌های کلیدی سازمان با جزئیات وضعیت، درصد پیشرفت و نقش تخصصی
            </p>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-[#34364d] border border-[#3d3f59] rounded-[100px] p-1">
            <button
              onClick={() => setProjectStatusFilter('all')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                projectStatusFilter === 'all'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              همه پروژه‌ها
            </button>
            <button
              onClick={() => setProjectStatusFilter('active')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                projectStatusFilter === 'active'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              در حال توسعه
            </button>
            <button
              onClick={() => setProjectStatusFilter('completed')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                projectStatusFilter === 'completed'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              تکمیل‌شده
            </button>
          </div>
        </div>

        {/* Projects List Rows */}
        <div className="space-y-3.5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="rounded-[16px] bg-[#34364d] hover:bg-[#34364d] border border-[#3d3f59] hover:border-[#666cff]/50 p-4 sm:p-5 transition-all duration-150 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
            >
              {/* Right: Code & Title */}
              <div className="space-y-1.5 flex-1 text-right">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#666cff] bg-[#666cff]/10 px-2 py-0.5 rounded-md border border-[#666cff]/25">
                    {project.code}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-['Vazirmatn'] font-medium border"
                    style={{
                      backgroundColor: `${project.statusColor}15`,
                      color: project.statusColor,
                      borderColor: `${project.statusColor}35`
                    }}
                  >
                    {project.statusLabel}
                  </span>
                  <span className="font-['Vazirmatn'] text-xs text-[#8386a1] hidden sm:inline">
                    · {project.sprint}
                  </span>
                </div>

                <h3 className="font-['Vazirmatn'] font-bold text-sm sm:text-base text-[#eaeafb] group-hover:text-[#666cff] transition-colors">
                  {project.name}
                </h3>

                <p className="font-['Vazirmatn'] text-xs text-[#8386a1] line-clamp-1 max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Left: Role, Progress & Action */}
              <div className="flex items-center gap-4 sm:gap-6 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-[#3d3f59] pt-3 md:pt-0">
                {/* Progress Bar */}
                <div className="w-28 sm:w-36 space-y-1 text-right">
                  <div className="flex items-center justify-between text-[11px] font-['Vazirmatn']">
                    <span className="text-[#8386a1]">پیشرفت</span>
                    <span className="font-mono font-bold text-[#eaeafb]">
                      {toPersianDigits(project.progress)}٪
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#3d3f59] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.progress === 100 ? '#666cff' : '#28c76f'
                      }}
                    />
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="flex items-center gap-1.5 rounded-[100px] bg-[#34364d] group-hover:bg-[#666cff] text-[#eaeafb] group-hover:text-[#17111f] border border-[#42455f] group-hover:border-[#666cff] text-xs font-['Vazirmatn'] font-medium px-3.5 py-1.5 transition-all duration-150 cursor-pointer shrink-0"
                >
                  <span>جزئیات</span>
                  <ChevronLeft className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ==================================================
        5. SKILLS MATRIX & TECHNICAL PROFICIENCIES
        ================================================== 
      */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 space-y-5 text-right">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3d3f59] pb-4">
          <div>
            <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#eaeafb] flex items-center gap-2">
              <Cpu className="size-4 text-[#ff9f43]" />
              مجموعه مهارت‌ها و تسلط‌های فنی
            </h2>
            <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-0.5">
              سطوح تخصصی ارزیابی‌شده در پروژه‌های توسعه، معماری سیستم و مدیریت زیرساخت
            </p>
          </div>

          {/* Skill Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#34364d] border border-[#3d3f59] rounded-[100px] p-1">
            <button
              onClick={() => setSkillCategoryFilter('all')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                skillCategoryFilter === 'all'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              همه مهارت‌ها
            </button>
            <button
              onClick={() => setSkillCategoryFilter('arch')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                skillCategoryFilter === 'arch'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              معماری و بک‌اند
            </button>
            <button
              onClick={() => setSkillCategoryFilter('devops')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                skillCategoryFilter === 'devops'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              دواپس و ابری
            </button>
            <button
              onClick={() => setSkillCategoryFilter('frontend')}
              className={`px-3 py-1 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                skillCategoryFilter === 'frontend'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              فرانت‌اند و DS
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="rounded-[16px] bg-[#34364d] border border-[#3d3f59] p-4 flex flex-col justify-between hover:border-[#666cff]/40 transition-all text-right group"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#8386a1] bg-[#34364d] px-2 py-0.5 rounded border border-[#3d3f59]">
                    {skill.tags}
                  </span>
                  <span className="font-['Vazirmatn'] text-[11px] font-semibold text-[#666cff]">
                    {skill.level}
                  </span>
                </div>

                <h4 className="font-mono font-bold text-xs text-[#eaeafb] pt-1 dir-ltr text-right">
                  {skill.name}
                </h4>
              </div>

              {/* Progress Level */}
              <div className="pt-3 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-[#8386a1]">
                  <span>تطابق با استاندارد</span>
                  <span>{toPersianDigits(skill.percent)}٪</span>
                </div>
                <div className="h-1.5 w-full bg-[#34364d] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#666cff]"
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ==================================================
        6. PROJECT DETAIL MODAL (Figma Algonet/Modal/Edit request 11:23247)
        ================================================== 
      */}
      {selectedProject && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] p-6 sm:p-8 max-w-xl w-full space-y-6 text-right relative my-auto">
            {/* Modal Heading */}
            <div className="flex items-start justify-between pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#666cff] bg-[#666cff]/10 px-2 py-0.5 rounded-md border border-[#666cff]/25">
                    {selectedProject.code}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-['Vazirmatn'] font-medium border"
                    style={{
                      backgroundColor: `${selectedProject.statusColor}15`,
                      color: selectedProject.statusColor,
                      borderColor: `${selectedProject.statusColor}35`
                    }}
                  >
                    {selectedProject.statusLabel}
                  </span>
                </div>

                <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb] pt-1">
                  {selectedProject.name}
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                  نقش سازمانی: {selectedProject.role}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Description & Details */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] block">
                  شرح و دستاورد کلیدی پروژه:
                </span>
                <p className="font-['Vazirmatn'] text-xs text-[#1e1e2d] dark:text-[#eaeafb] leading-relaxed bg-[#f4f5fa] dark:bg-[#282a42] p-3.5 rounded-[16px] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  {selectedProject.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="space-y-1.5">
                <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] block">
                  خروجی‌های ارائه‌شده:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedProject.deliverables.map((del: string, i: number) => (
                    <div key={i} className="p-2.5 rounded-[12px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] text-[11px] font-['Vazirmatn'] text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-[#28c76f] shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-1.5">
                <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] block">
                  استک فناوری‌های به‌کار رفته:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] text-[11px] font-mono text-[#666cff]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
              <div className="flex items-center gap-2 text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
                <Users className="size-3.5" />
                <span>تیم پروژه: {toPersianDigits(selectedProject.teamSize)} نفر متخصص</span>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-[100px] h-[38px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
