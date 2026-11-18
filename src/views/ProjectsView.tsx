import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PortalNavId } from '../types';
import { toPersianDigits } from '../utils/formatters';
import {
  FolderKanban,
  LayoutGrid,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  FileSpreadsheet,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brain,
  Code2,
  ShieldCheck,
  Award,
  Activity,
  Layers,
  User,
  Check,
  ExternalLink
} from 'lucide-react';

interface ProjectsViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

// Project Item Data Model (برگرفته از جدول تصویر ارسالی کاربر)
export interface ProjectItem {
  id: string;
  code: string;
  persianName: string; // نام پروژه فارسی
  englishName: string; // نام پروژه انگلیسی
  leadName: string; // مسئول اصلی
  memberCount: number; // تعداد اعضا
  deadline: string; // Deadline
  category: string;
  description: string;
  logoColor: string;
  gradientBg: string;
  accentGlow: string;
  progress: number;
  openTasks: number;
  completedTasks: number;
  worklogHours: number;
  status: 'active' | 'in-progress' | 'testing';
  statusLabel: string;
  statusBadgeColor: string;
  iconType: 'brain' | 'sparkles' | 'portal';
  members: { name: string; initials: string; role: string; avatarColor?: string }[];
  scorecard: {
    healthScore: number;
    qualityRating: string;
    totalCommits: number;
    openIssues: number;
    lastSprintProgress: string;
    velocity: string;
    summary: string;
  };
}

// Projects Data - Exact 3 projects from user's uploaded image
export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'annotopia-dev',
    code: 'ANNOTOPIA-DEV',
    persianName: 'Annotopia Dev',
    englishName: 'Annotopia Dev',
    leadName: '—', // در جدول عکس: خط تیره
    memberCount: 4, // در جدول عکس: 4
    deadline: '—', // در جدول عکس: -
    category: 'هوش مصنوعی و یادداشت‌گذاری داده',
    description: 'پلتفرم پردازش و یادداشت‌گذاری هوشمند داده‌ها و متون برای آموزش و بهینه‌سازی مدل‌های زبانی سازمانی',
    logoColor: '#20c997',
    gradientBg: 'from-[#20c997] to-[#0ea5e9]',
    accentGlow: 'rgba(32, 201, 151, 0.35)',
    progress: 68,
    openTasks: 4,
    completedTasks: 16,
    worklogHours: 24,
    status: 'in-progress',
    statusLabel: 'در حال توسعه',
    statusBadgeColor: '#20c997',
    iconType: 'brain',
    members: [
      { name: 'سیاوش بختیاری', initials: 'سب', role: 'مهندس پلتفرم و معماری', avatarColor: '#666cff' },
      { name: 'پویا رستگار', initials: 'پر', role: 'توسعه‌دهنده پایپ‌لاین بک‌اند', avatarColor: '#20c997' },
      { name: 'مونا کاظمی', initials: 'مک', role: 'متخصص یادداشت‌گذاری داده', avatarColor: '#ff9f43' },
      { name: 'امیرحسین نادری', initials: 'ان', role: 'توسعه‌دهنده رابط کاربری', avatarColor: '#00cfe8' }
    ],
    scorecard: {
      healthScore: 91,
      qualityRating: 'A',
      totalCommits: 142,
      openIssues: 4,
      lastSprintProgress: '۹۱٪ تحقق اهداف اسپرینت جاری',
      velocity: '۲۸ استوری‌پوینت در هر اسپرینت',
      summary: 'پروژه در وضعیت پایدار قرار دارد. ماژول‌های پردازش متن در محیط استیجینگ مستقر شده و آزمون‌های کارایی با موفقیت در جریان است.'
    }
  },
  {
    id: 'algoteria',
    code: 'ALG-TERIA',
    persianName: 'الگوتریا',
    englishName: 'AlgoTeria',
    leadName: 'مهدیه ماندنی', // در جدول عکس: مهدیه ماندنی
    memberCount: 8, // در جدول عکس: 8
    deadline: '—', // در جدول عکس: -
    category: 'موتور محاسباتی و معاملات الگوریتمی',
    description: 'هسته پردازش سفارش‌ها با فرکانس بالا، تحلیل داده‌های بلادرنگ بازار و سرویس‌های معاملاتی الگونت',
    logoColor: '#666cff',
    gradientBg: 'from-[#666cff] to-[#8c90ff]',
    accentGlow: 'rgba(102, 108, 255, 0.4)',
    progress: 88,
    openTasks: 5,
    completedTasks: 42,
    worklogHours: 57,
    status: 'active',
    statusLabel: 'در مسیر پیشرفت',
    statusBadgeColor: '#666cff',
    iconType: 'sparkles',
    members: [
      { name: 'مهدیه ماندنی', initials: 'مم', role: 'مسئول اصلی و مدیر پروژه', avatarColor: '#ff9f43' },
      { name: 'سیاوش بختیاری', initials: 'سب', role: 'معمار فنی پلتفرم', avatarColor: '#666cff' },
      { name: 'کاوه شریفی', initials: 'کش', role: 'مهندس ارشد زیرساخت', avatarColor: '#28c76f' },
      { name: 'پویا رستگار', initials: 'پر', role: 'توسعه‌دهنده الگوریتم کوانت', avatarColor: '#00cfe8' },
      { name: 'مونا کاظمی', initials: 'مک', role: 'توسعه‌دهنده بک‌اند', avatarColor: '#ea5455' },
      { name: 'امیرحسین نادری', initials: 'ان', role: 'متخصص کنترل کیفیت و تست', avatarColor: '#7c82ff' },
      { name: 'سارا یوسفی', initials: 'سی', role: 'طراح تجربه کاربری', avatarColor: '#ffb976' },
      { name: 'نیما ابراهیمی', initials: 'نا', role: 'مهندس DevOps و لودبالانس', avatarColor: '#2dd4bf' }
    ],
    scorecard: {
      healthScore: 97,
      qualityRating: 'A+',
      totalCommits: 384,
      openIssues: 5,
      lastSprintProgress: '۹۶٪ تحقق اهداف اسپرینت جاری',
      velocity: '۴۲ استوری‌پوینت در هر اسپرینت',
      summary: 'پروژه پرچم‌دار سازمان با بالاترین رتبه کیفی؛ تست‌های استرس انجین با ثبت ۵۷ ساعت کارکرد با نرخ پایداری ۹۹.۹۸٪ تکمیل گردید.'
    }
  },
  {
    id: 'test-portal-1',
    code: 'TEST-PORTAL-1',
    persianName: 'تست پروژه پورتال',
    englishName: 'Test Portal 1',
    leadName: 'مهدیه ماندنی', // در جدول عکس: مهدیه ماندنی
    memberCount: 5, // در جدول عکس: 5
    deadline: '—', // در جدول عکس: -
    category: 'محیط آزمون و استقرار پورتال',
    description: 'محیط آزمون یکپارچه خدمات سازمانی الگونت، احراز هویت متمرکز SSO، تقویم و ماژول‌های پورتفولیو',
    logoColor: '#00cfe8',
    gradientBg: 'from-[#00cfe8] to-[#2dd4bf]',
    accentGlow: 'rgba(0, 207, 232, 0.35)',
    progress: 75,
    openTasks: 3,
    completedTasks: 26,
    worklogHours: 40,
    status: 'testing',
    statusLabel: 'تست و بازبینی',
    statusBadgeColor: '#00cfe8',
    iconType: 'portal',
    members: [
      { name: 'مهدیه ماندنی', initials: 'مم', role: 'مسئول اصلی پروژه', avatarColor: '#ff9f43' },
      { name: 'سیاوش بختیاری', initials: 'سب', role: 'توسعه‌دهنده رابط و پورتفولیو', avatarColor: '#666cff' },
      { name: 'مونا کاظمی', initials: 'مک', role: 'مهندس تست E2E', avatarColor: '#28c76f' },
      { name: 'کاوه شریفی', initials: 'کش', role: 'مدیر استقرار و کانفیگ', avatarColor: '#00cfe8' },
      { name: 'امیرحسین نادری', initials: 'ان', role: 'توسعه‌دهنده فرانت‌اند', avatarColor: '#8c90ff' }
    ],
    scorecard: {
      healthScore: 93,
      qualityRating: 'A',
      totalCommits: 218,
      openIssues: 3,
      lastSprintProgress: '۸۹٪ تحقق اهداف اسپرینت جاری',
      velocity: '۳۱ استوری‌پوینت در هر اسپرینت',
      summary: 'یکپارچه‌سازی سرویس‌های پورتال نسخه ۳ در مرحله آزمون نهایی؛ تست‌های امنیت و دسترسی بدون خطا پشت سر گذاشته شد.'
    }
  }
];

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
  // Search query & filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isPageSizeDropdownOpen, setIsPageSizeDropdownOpen] = useState<boolean>(false);

  // Scorecard Modal State (کارنامه پروژه)
  const [selectedScorecardProject, setSelectedScorecardProject] = useState<ProjectItem | null>(null);

  // Filter projects based on search query, lead filter, and status filter
  const filteredProjects = PROJECTS_LIST.filter((project) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      project.persianName.toLowerCase().includes(q) ||
      project.englishName.toLowerCase().includes(q) ||
      project.leadName.toLowerCase().includes(q) ||
      project.code.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.members.some((m) => m.name.toLowerCase().includes(q));

    const matchesLead =
      selectedLead === 'all' ||
      (selectedLead === 'mahdieh' && project.leadName.includes('مهدیه')) ||
      (selectedLead === 'none' && project.leadName === '—');

    const matchesStatus =
      selectedStatus === 'all' || project.status === selectedStatus;

    return matchesSearch && matchesLead && matchesStatus;
  });

  // Reset pagination to page 1 on filter/search change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleLeadChange = (val: string) => {
    setSelectedLead(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLead('all');
    setSelectedStatus('all');
    setCurrentPage(1);
  };

  // Paginated items
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const hasActiveFilters = searchQuery.trim() !== '' || selectedLead !== 'all' || selectedStatus !== 'all';

  // Render project icon helper
  const renderProjectIcon = (iconType: string, color: string) => {
    switch (iconType) {
      case 'brain':
        return <Brain className="size-6 text-white" />;
      case 'sparkles':
        return <Sparkles className="size-6 text-white" />;
      case 'portal':
      default:
        return <FolderKanban className="size-6 text-white" />;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-175px)] sm:min-h-[calc(100vh-190px)] justify-between pb-6 animate-in fade-in duration-200 select-none text-right">
      <div className="flex-1 space-y-6">
      {/* 
        ==================================================
        1. PAGE HEADER & FILTER BAR (مشابه هدر عکس ارسالی)
        ================================================== 
      */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Title and Count Badge */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-['Vazirmatn'] font-bold text-2xl sm:text-3xl text-[#1e1e2d] dark:text-[#eaeafb]">
              فهرست پروژه‌ها
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] border border-[#666cff]/20 text-xs font-['Vazirmatn'] font-semibold">
              {toPersianDigits(PROJECTS_LIST.length)} پروژه
            </span>
          </div>
          <p className="font-['Vazirmatn'] text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1]">
            مدیریت، رهگیری اعضا و کارنامه جامع پروژه‌های فعال سازمانی
          </p>
        </div>

        {/* Toolbar: Search & Filter Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto relative">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#62657a] dark:text-[#8386a1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="جست‌وجوی پروژه، مسئول، کد…"
              className="w-full h-10 pr-10 pl-9 rounded-xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#62657a] dark:placeholder:text-[#8386a1] outline-none font-['Vazirmatn'] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 size-6 rounded-full flex items-center justify-center text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-white transition-colors"
                title="پاک کردن جستجو"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Filters Button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2 px-4 h-10 rounded-xl text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer shadow-xs border ${
                selectedLead !== 'all' || selectedStatus !== 'all' || isFilterDropdownOpen
                  ? 'bg-[#666cff] text-white border-[#666cff]'
                  : 'bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb] border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50'
              }`}
            >
              <SlidersHorizontal className="size-4" />
              <span>فیلترها</span>
              {(selectedLead !== 'all' || selectedStatus !== 'all') && (
                <span className="size-2 rounded-full bg-white animate-pulse" />
              )}
            </button>

            {/* Filter Dropdown Popover */}
            {isFilterDropdownOpen && (
              <div className="absolute left-0 sm:right-auto sm:left-0 top-12 w-64 rounded-2xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xl p-3 z-30 space-y-3 animate-in zoom-in-95 duration-150">
                {/* Filter by Lead */}
                <div className="space-y-1.5">
                  <span className="font-['Vazirmatn'] text-[11px] font-bold text-[#62657a] dark:text-[#8386a1] block px-2 pb-1 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
                    مسئول اصلی:
                  </span>
                  <button
                    onClick={() => {
                      handleLeadChange('all');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedLead === 'all'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>همه مسئولین</span>
                    {selectedLead === 'all' && <Check className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      handleLeadChange('mahdieh');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedLead === 'mahdieh'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>مهدیه ماندنی ({toPersianDigits(2)})</span>
                    {selectedLead === 'mahdieh' && <Check className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      handleLeadChange('none');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedLead === 'none'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>تعیین‌نشده ({toPersianDigits(1)})</span>
                    {selectedLead === 'none' && <Check className="size-3.5" />}
                  </button>
                </div>

                {/* Filter by Status */}
                <div className="space-y-1.5 pt-2 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
                  <span className="font-['Vazirmatn'] text-[11px] font-bold text-[#62657a] dark:text-[#8386a1] block px-2 pb-1 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
                    وضعیت پروژه:
                  </span>
                  <button
                    onClick={() => {
                      handleStatusChange('all');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedStatus === 'all'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>همه وضعیت‌ها</span>
                    {selectedStatus === 'all' && <Check className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange('active');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedStatus === 'active'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>در مسیر پیشرفت</span>
                    {selectedStatus === 'active' && <Check className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange('in-progress');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedStatus === 'in-progress'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>در حال توسعه</span>
                    {selectedStatus === 'in-progress' && <Check className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange('testing');
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-['Vazirmatn'] transition-colors ${
                      selectedStatus === 'testing'
                        ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                        : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                    }`}
                  >
                    <span>تست و بازبینی</span>
                    {selectedStatus === 'testing' && <Check className="size-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
            فیلترهای فعال:
          </span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#666cff]/10 text-[#666cff] dark:text-[#8c90ff] text-xs font-['Vazirmatn']">
              جستجو: {searchQuery}
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="hover:opacity-75"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {selectedLead !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#666cff]/10 text-[#666cff] dark:text-[#8c90ff] text-xs font-['Vazirmatn']">
              مسئول: {selectedLead === 'mahdieh' ? 'مهدیه ماندنی' : 'تعیین‌نشده'}
              <button
                type="button"
                onClick={() => handleLeadChange('all')}
                className="hover:opacity-75"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {selectedStatus !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#666cff]/10 text-[#666cff] dark:text-[#8c90ff] text-xs font-['Vazirmatn']">
              وضعیت: {selectedStatus === 'active' ? 'در مسیر پیشرفت' : selectedStatus === 'in-progress' ? 'در حال توسعه' : 'تست و بازبینی'}
              <button
                type="button"
                onClick={() => handleStatusChange('all')}
                className="hover:opacity-75"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-['Vazirmatn'] text-[#ea5455] hover:underline mr-1"
          >
            پاک کردن همه
          </button>
        </div>
      )}

      {/* 
        ==================================================
        2. VERTICAL PROJECTS GRID (کارت‌های عمودی با دیتای داخل عکس)
        ================================================== 
      */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-12 text-center space-y-4 shadow-sm">
          <div className="size-16 rounded-2xl bg-[#666cff]/10 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center mx-auto">
            <Search className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
              پروژه‌ای با این مشخصات یافت نشد
            </h3>
            <p className="font-['Vazirmatn'] text-xs sm:text-sm text-[#62657a] dark:text-[#8386a1]">
              می‌توانید فیلترهای اعمال‌شده یا عبارت جست‌وجو را تغییر دهید یا همه فیلترها را پاک کنید.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#666cff] hover:bg-[#5b60e6] text-white text-xs font-['Vazirmatn'] font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-95"
          >
            پاک کردن همه فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-[#666cff]/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Top Ambient Glow (Hover Effect) */}
            <div
              className="absolute -top-12 -left-12 size-36 rounded-full blur-3xl opacity-15 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: project.logoColor }}
            />

            {/* Top Section: Logo & Name & Status */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                {/* Logo / Brand Emblem */}
                <div
                  className={`size-14 rounded-2xl bg-gradient-to-br ${project.gradientBg} p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
                >
                  <div className="size-full rounded-[14px] bg-black/15 flex items-center justify-center backdrop-blur-xs">
                    {renderProjectIcon(project.iconType, project.logoColor)}
                  </div>
                </div>

                {/* Status Badge & Code */}
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-['Vazirmatn'] font-semibold border shadow-xs"
                    style={{
                      backgroundColor: `${project.statusBadgeColor}15`,
                      color: project.statusBadgeColor,
                      borderColor: `${project.statusBadgeColor}35`
                    }}
                  >
                    {project.statusLabel}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[#62657a] dark:text-[#8386a1] bg-[#f4f5fa] dark:bg-[#34364d] px-2 py-0.5 rounded-md border border-[#e0e2ec] dark:border-[#42455f] dir-ltr">
                    {project.code}
                  </span>
                </div>
              </div>

              {/* Project Title (فارسی و انگلیسی) */}
              <div className="space-y-1">
                <h2 className="font-['Vazirmatn'] font-bold text-lg sm:text-xl text-[#1e1e2d] dark:text-[#eaeafb] group-hover:text-[#666cff] dark:group-hover:text-white transition-colors leading-snug">
                  {project.persianName}
                </h2>
                <p className="font-mono text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr text-right font-medium">
                  {project.englishName}
                </p>
                <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] line-clamp-2 pt-1.5 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Middle Section: سایر اطلاعات جدول ارسالی */}
            <div className="my-5 pt-4 border-t border-[#e0e2ec] dark:border-[#3d3f59] space-y-3">
              {/* Row 1: مسئول اصلی */}
              <div className="flex items-center justify-between text-xs font-['Vazirmatn']">
                <span className="text-[#62657a] dark:text-[#8386a1] flex items-center gap-1.5">
                  <User className="size-3.5" />
                  <span>مسئول اصلی:</span>
                </span>
                {project.leadName !== '—' ? (
                  <span className="font-semibold text-[#1e1e2d] dark:text-[#eaeafb] bg-[#f4f5fa] dark:bg-[#34364d] px-2.5 py-1 rounded-lg border border-[#e0e2ec] dark:border-[#42455f]">
                    {project.leadName}
                  </span>
                ) : (
                  <span className="font-bold text-[#62657a] dark:text-[#8386a1] px-2 py-0.5">
                    —
                  </span>
                )}
              </div>

              {/* Row 2: تعداد اعضا */}
              <div className="flex items-center justify-between text-xs font-['Vazirmatn']">
                <span className="text-[#62657a] dark:text-[#8386a1] flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  <span>تعداد اعضا:</span>
                </span>
                <div className="flex items-center gap-2">
                  {/* Overlapping mini avatars */}
                  <div className="flex items-center -space-x-1.5 space-x-reverse">
                    {project.members.slice(0, 3).map((m, idx) => (
                      <div
                        key={idx}
                        title={m.name}
                        className="size-5 rounded-full border border-white dark:border-[#30334e] text-[9px] font-bold text-white flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: m.avatarColor || '#666cff' }}
                      >
                        {m.initials}
                      </div>
                    ))}
                    {project.memberCount > 3 && (
                      <div className="size-5 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-white dark:border-[#30334e] text-[9px] font-bold text-[#62657a] dark:text-[#8386a1] flex items-center justify-center">
                        +{toPersianDigits(project.memberCount - 3)}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-[#1e1e2d] dark:text-[#eaeafb]">
                    {toPersianDigits(project.memberCount)} نفر
                  </span>
                </div>
              </div>

              {/* Row 3: Deadline */}
              <div className="flex items-center justify-between text-xs font-['Vazirmatn']">
                <span className="text-[#62657a] dark:text-[#8386a1] flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <span>Deadline:</span>
                </span>
                <span className="font-bold text-[#62657a] dark:text-[#8386a1] px-2 py-0.5">
                  {project.deadline}
                </span>
              </div>

              {/* Progress Track */}
              <div className="pt-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-['Vazirmatn']">
                  <span className="text-[#62657a] dark:text-[#8386a1]">پیشرفت اسپرینت:</span>
                  <span className="font-mono font-bold text-[#1e1e2d] dark:text-[#eaeafb]">
                    {toPersianDigits(project.progress)}٪
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#f0f2f8] dark:bg-[#282a40] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.logoColor
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 
              Bottom Section: دکمه کارنامه پروژه در هاور
              (Hover reveal / animation as requested by user - White text & icon on hover) 
            */}
            <div className="pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
              <button
                onClick={() => setSelectedScorecardProject(project)}
                className="project-card-btn w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#f4f5fa] dark:bg-[#34364d] text-[#121217] dark:text-[#eaeafb] border border-[#e0e2ec] dark:border-[#42455f] group-hover:bg-[#666cff] group-hover:border-[#666cff] group-hover:!text-white hover:!bg-[#555ae6] hover:!text-white group-hover:shadow-[0_4px_16px_rgba(102,108,255,0.4)] text-xs font-['Vazirmatn'] font-bold transition-all duration-200 cursor-pointer active:scale-98"
              >
                <FileSpreadsheet className="size-4 transition-colors group-hover:!text-white" />
                <span className="transition-colors group-hover:!text-white">کارنامه پروژه</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:!text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
      </div>

      {/* 
        ==================================================
        3. STICKY FOOTER PAGINATION BAR (استیکی و در پایین صفحه)
        ================================================== 
      */}
      <div className="sticky bottom-20 lg:bottom-4 z-20 mt-8 rounded-[20px] bg-white/95 dark:bg-[#30334e]/95 backdrop-blur-md border border-[#e0e2ec] dark:border-[#3d3f59] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Vazirmatn'] shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-all">
        {/* Right: Items per page with popover dropdown */}
        <div className="relative flex items-center gap-2 text-[#62657a] dark:text-[#8386a1]">
          <span>تعداد در صفحه:</span>
          <button
            type="button"
            onClick={() => setIsPageSizeDropdownOpen((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] font-mono font-semibold text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-1.5 cursor-pointer hover:border-[#666cff]/50 transition-colors active:scale-95"
            title="تغییر تعداد در صفحه"
          >
            <span>{toPersianDigits(pageSize)}</span>
            <ChevronLeft className={`size-3.5 transition-transform duration-200 ${isPageSizeDropdownOpen ? 'rotate-90' : '-rotate-90'} opacity-70`} />
          </button>

          {/* Page size dropdown */}
          {isPageSizeDropdownOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-28 rounded-xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xl p-1 z-30 space-y-0.5 animate-in zoom-in-95 duration-150">
              {[5, 10, 20, 50].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setPageSize(size);
                    setCurrentPage(1);
                    setIsPageSizeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-['Vazirmatn'] transition-colors ${
                    pageSize === size
                      ? 'bg-[#666cff]/10 text-[#666cff] font-bold'
                      : 'text-[#62657a] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                  }`}
                >
                  <span className="font-mono">{toPersianDigits(size)}</span>
                  {pageSize === size && <Check className="size-3 text-[#666cff]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Page Info */}
        <div className="text-[#62657a] dark:text-[#8386a1] font-medium">
          صفحه {toPersianDigits(currentPage)} از {toPersianDigits(totalPages)}
          <span className="mr-2 text-[11px] opacity-75">
            ({toPersianDigits(filteredProjects.length)} مورد)
          </span>
        </div>

        {/* Left: Previous & Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={`px-4 py-1.5 rounded-xl border font-medium transition-all ${
              currentPage > 1
                ? 'bg-white dark:bg-[#30334e] border-[#e0e2ec] dark:border-[#42455f] text-[#1e1e2d] dark:text-[#eaeafb] hover:border-[#666cff] cursor-pointer active:scale-95'
                : 'bg-[#f4f5fa] dark:bg-[#34364d] border-[#e0e2ec] dark:border-[#42455f] text-[#62657a]/40 dark:text-[#8386a1]/40 cursor-not-allowed'
            }`}
          >
            قبلی
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={`px-4 py-1.5 rounded-xl border font-medium transition-all ${
              currentPage < totalPages
                ? 'bg-white dark:bg-[#30334e] border-[#e0e2ec] dark:border-[#42455f] text-[#1e1e2d] dark:text-[#eaeafb] hover:border-[#666cff] cursor-pointer active:scale-95'
                : 'bg-[#f4f5fa] dark:bg-[#34364d] border-[#e0e2ec] dark:border-[#42455f] text-[#62657a]/40 dark:text-[#8386a1]/40 cursor-not-allowed'
            }`}
          >
            بعدی
          </button>
        </div>
      </div>

      {/* 
        ==================================================
        4. MODAL: کارنامه پروژه (Project Scorecard Modal)
        ================================================== 
      */}
      {selectedScorecardProject && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-8 max-w-2xl w-full space-y-6 text-right relative my-auto max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
              <div className="flex items-center gap-3.5">
                <div
                  className={`size-12 rounded-2xl bg-gradient-to-br ${selectedScorecardProject.gradientBg} flex items-center justify-center shadow-md shrink-0`}
                >
                  {renderProjectIcon(selectedScorecardProject.iconType, selectedScorecardProject.logoColor)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Vazirmatn'] font-bold text-lg sm:text-xl text-[#1e1e2d] dark:text-[#eaeafb]">
                      کارنامه پروژه {selectedScorecardProject.persianName}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr text-right">
                    {selectedScorecardProject.englishName} · {selectedScorecardProject.code}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedScorecardProject(null)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scorecard KPI Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] text-center space-y-1">
                <span className="text-[11px] font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
                  نمره سلامت پروژه
                </span>
                <div className="font-['Vazirmatn'] font-black text-xl text-[#28c76f]">
                  {toPersianDigits(selectedScorecardProject.scorecard.healthScore)} / {toPersianDigits(100)}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] text-center space-y-1">
                <span className="text-[11px] font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
                  رتبه کیفی کد
                </span>
                <div className="font-mono font-black text-xl text-[#666cff] dark:text-[#8c90ff]">
                  {selectedScorecardProject.scorecard.qualityRating}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] text-center space-y-1">
                <span className="text-[11px] font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
                  پیشرفت اسپرینت
                </span>
                <div className="font-['Vazirmatn'] font-black text-xl text-[#00cfe8]">
                  {toPersianDigits(selectedScorecardProject.progress)}٪
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] text-center space-y-1">
                <span className="text-[11px] font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
                  ساعت کارکرد دوره
                </span>
                <div className="font-['Vazirmatn'] font-black text-xl text-[#ff9f43]">
                  {toPersianDigits(selectedScorecardProject.worklogHours)} س
                </div>
              </div>
            </div>

            {/* Performance Summary Box */}
            <div className="p-4 rounded-2xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1e1e2d] dark:text-[#eaeafb]">
                <Activity className="size-4 text-[#666cff]" />
                <span>خلاصه ارزیابی و گزارش عملکرد فنی:</span>
              </div>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] leading-relaxed">
                {selectedScorecardProject.scorecard.summary}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[#e0e2ec] dark:border-[#3d3f59] text-[11px] font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
                <span>تعداد کامیت‌ها: <strong className="text-[#1e1e2d] dark:text-[#eaeafb]">{toPersianDigits(selectedScorecardProject.scorecard.totalCommits)}</strong></span>
                <span>تسک‌های باز: <strong className="text-[#ff9f43]">{toPersianDigits(selectedScorecardProject.openTasks)}</strong></span>
                <span>سرعت تیم: <strong className="text-[#28c76f]">{selectedScorecardProject.scorecard.velocity}</strong></span>
              </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-2.5">
              <span className="font-['Vazirmatn'] text-xs font-bold text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-2">
                <Users className="size-4 text-[#666cff]" />
                <span>اعضای فعال پروژه ({toPersianDigits(selectedScorecardProject.memberCount)} نفر):</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedScorecardProject.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#f8f9fd] dark:bg-[#282a40] border border-[#e0e2ec] dark:border-[#3d3f59] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="size-8 rounded-full text-xs font-bold text-white flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: member.avatarColor || '#666cff' }}
                      >
                        {member.initials}
                      </div>
                      <div>
                        <span className="font-['Vazirmatn'] font-semibold text-xs text-[#1e1e2d] dark:text-[#eaeafb] block">
                          {member.name}
                        </span>
                        <span className="font-['Vazirmatn'] text-[10.5px] text-[#62657a] dark:text-[#8386a1] block">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
              <a
                href="https://pm.algonet.ir"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#666cff] hover:underline font-['Vazirmatn'] font-medium"
              >
                <span>مشاهده بورد کامل پروژه در OpenProject</span>
                <ExternalLink className="size-3.5" />
              </a>

              <button
                onClick={() => setSelectedScorecardProject(null)}
                className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-xl h-9 px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer"
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
