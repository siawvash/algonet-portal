import React, { useState } from 'react';
import { PortalNavId, PortalProject } from '../types';
import { INITIAL_PROJECTS } from '../data/mockData';
import { toPersianDigits } from '../utils/formatters';
import {
  FolderKanban,
  Kanban,
  LayoutGrid,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  GitMerge,
  Search,
  ExternalLink,
  ChevronLeft,
  X,
  Users,
  Code2,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  Check
} from 'lucide-react';

interface ProjectsViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

interface KanbanTask {
  id: string;
  code: string;
  title: string;
  projectCode: string;
  projectName: string;
  priority: 'high' | 'medium' | 'low';
  priorityLabel: string;
  hours: number;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
  // View mode: Cards Grid vs Kanban Board
  const [viewMode, setViewMode] = useState<'cards' | 'kanban'>('cards');

  // Search query & status filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on-track' | 'review' | 'at-risk'>('all');

  // Modal states
  const [selectedProject, setSelectedProject] = useState<PortalProject | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskProject, setNewTaskProject] = useState<string>('ALG-PORTAL-V3');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [newTaskHours, setNewTaskHours] = useState<number>(6);

  // Initial Kanban Tasks
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    {
      id: 't-1',
      code: 'ALG-427',
      title: 'بازطراحی رابط کاربری داشبورد پورتال و سیستم طراحی V3',
      projectCode: 'ALG-PORTAL-V3',
      projectName: 'پورتال یکپارچه الگونت',
      priority: 'high',
      priorityLabel: 'اولویت فوری',
      hours: 8,
      status: 'in-progress',
      assignee: 'سیاوش بختیاری'
    },
    {
      id: 't-2',
      code: 'ALG-419',
      title: 'یکپارچه‌سازی پروتکل SSO با اسلات‌های ابری DevSlot',
      projectCode: 'ALG-DEVSLOT-CLOUD',
      projectName: 'محیط‌های ابری DevSlot',
      priority: 'high',
      priorityLabel: 'اولویت بالا',
      hours: 12,
      status: 'in-progress',
      assignee: 'سیاوش بختیاری'
    },
    {
      id: 't-3',
      code: 'ALG-431',
      title: 'افزودن قابلیت پیش‌نمایش فایل‌های چندرسانه‌ای در پیام‌رسان',
      projectCode: 'ALG-PORTAL-V3',
      projectName: 'پورتال یکپارچه الگونت',
      priority: 'medium',
      priorityLabel: 'متوسط',
      hours: 6,
      status: 'todo',
      assignee: 'مونا کاظمی'
    },
    {
      id: 't-4',
      code: 'ALG-408',
      title: 'بهینه‌سازی کوئری‌های گزارش کارکرد و تایم‌شیت سازمانی',
      projectCode: 'ALG-SSO-CORE',
      projectName: 'درگاه احراز هویت متمرکز',
      priority: 'medium',
      priorityLabel: 'متوسط',
      hours: 4,
      status: 'done',
      assignee: 'سیاوش بختیاری'
    },
    {
      id: 't-5',
      code: 'ALG-412',
      title: 'پیاده‌سازی صفحه پورتفولیو و اتصال نویگیشن مشترک',
      projectCode: 'ALG-PORTAL-V3',
      projectName: 'پورتال یکپارچه الگونت',
      priority: 'high',
      priorityLabel: 'اولویت بالا',
      hours: 10,
      status: 'done',
      assignee: 'سیاوش بختیاری'
    },
    {
      id: 't-6',
      code: 'ALG-399',
      title: 'تنظیم لودبالانسر NGINX برای وب‌میل و پروتکل TLS 1.3',
      projectCode: 'ALG-MAIL-CORE',
      projectName: 'وب‌میل و تقویم سازمانی',
      priority: 'medium',
      priorityLabel: 'متوسط',
      hours: 5,
      status: 'done',
      assignee: 'کاوه شریفی'
    },
    {
      id: 't-7',
      code: 'ALG-435',
      title: 'تست رگرسیون پایپ‌لاین‌های CI/CD در محیط استیجینگ',
      projectCode: 'ALG-DEVSLOT-CLOUD',
      projectName: 'محیط‌های ابری DevSlot',
      priority: 'low',
      priorityLabel: 'اولویت عادی',
      hours: 3,
      status: 'todo',
      assignee: 'امیرحسین نادری'
    }
  ]);

  // Extended Projects List
  const allProjects: PortalProject[] = [
    ...INITIAL_PROJECTS,
    {
      id: 'p-4',
      code: 'ALG-MAIL-CORE',
      name: 'سامانه پست الکترونیک و سرویس‌های همگام‌سازی تقویم',
      role: 'توسعه‌دهنده ارشد سرویس‌های پایه',
      progress: 100,
      sprint: 'اسپرینت ۱۱ (شهریور ۱۴۰۴)',
      openTasks: 0,
      completedTasks: 22,
      status: 'on-track',
      teamMembers: [
        { name: 'سیاوش بختیاری', initials: 'سب', color: '#666cff' },
        { name: 'پویا رستگار', initials: 'پر', color: '#28c76f' }
      ]
    }
  ];

  // Filtered projects
  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Metrics (Figma Algonet/Metric/Default 11:23187)
  const sprintKpis = [
    {
      id: 'active-projects',
      title: 'پروژه‌های فعال من',
      value: '۴',
      unit: 'پروژه سازمانی',
      badge: 'اسپرینت ۱۴',
      badgeColor: '#666cff',
      subtitle: '۱ مورد لید معماری · ۳ مورد مشارکت اصلی',
      icon: FolderKanban
    },
    {
      id: 'tasks-completed',
      title: 'تسک‌های انجام‌شده',
      value: '۷۳',
      unit: 'وظیفه',
      badge: '+۸ این هفته',
      badgeColor: '#28c76f',
      subtitle: '۹۱.۸٪ نرخ موفقیت در کنترل کیفیت و تست',
      icon: CheckCircle2
    },
    {
      id: 'tasks-in-progress',
      title: 'وظایف در دست اقدام',
      value: '۱۰',
      unit: 'تسک فعال',
      badge: 'در جریان',
      badgeColor: '#ff9f43',
      subtitle: 'تخصیص‌یافته به اسپرینت جاری در OpenProject',
      icon: Clock
    },
    {
      id: 'code-reviews',
      title: 'کدهای منتظر بازبینی',
      value: '۳',
      unit: 'MR باز',
      badge: 'Code Review',
      badgeColor: '#7c82ff',
      subtitle: 'در انتظار تأیید نهایی جهت استقرار در DevSlot',
      icon: GitMerge
    }
  ];

  // Handle task status toggle in Kanban
  const handleMoveTaskStatus = (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    setKanbanTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  // Handle new task creation
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `t-${Date.now()}`,
      code: `ALG-${Math.floor(450 + Math.random() * 50)}`,
      title: newTaskTitle.trim(),
      projectCode: newTaskProject,
      projectName:
        allProjects.find((p) => p.code === newTaskProject)?.name || 'پروژه الگونت',
      priority: newTaskPriority,
      priorityLabel:
        newTaskPriority === 'high'
          ? 'اولویت بالا'
          : newTaskPriority === 'medium'
          ? 'متوسط'
          : 'اولویت عادی',
      hours: newTaskHours,
      status: 'todo',
      assignee: 'سیاوش بختیاری'
    };

    setKanbanTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setIsNewTaskModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200 select-none">
      {/* 
        ==================================================
        1. PAGE HEADER & ACTIONS
        ================================================== 
      */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <div className="flex items-center gap-2">
            <h1 className="font-['Vazirmatn'] font-bold text-2xl text-[#eaeafb]">
              پروژه‌های من
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#666cff]/15 text-[#666cff] border border-[#666cff]/30 text-[11px] font-['Vazirmatn'] font-medium">
              اسپرینت ۱۴ · آبان ۱۴۰۴
            </span>
          </div>
          <p className="font-['Vazirmatn'] text-xs text-[#8386a1] leading-relaxed max-w-3xl">
            پیگیری وظایف، برنامه‌ریزی اسپرینت‌ها، کنترل کیفیت کدهای در حال توسعه و وضعیت تیم در سامانه‌های OpenProject و GitLab
          </p>
        </div>

        {/* Action Button & View Switcher */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          {/* Switcher */}
          <div className="flex items-center bg-[#34364d] border border-[#3d3f59] rounded-[100px] p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium shadow-sm'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>کارت‌ها</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium shadow-sm'
                  : 'text-[#8386a1] hover:text-[#eaeafb]'
              }`}
            >
              <Kanban className="size-3.5" />
              <span>بورد کانبان</span>
            </button>
          </div>

          {/* New Task Button */}
          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="flex items-center gap-2 bg-[#666cff] hover:bg-[#a682ff] text-[#17111f] font-['Vazirmatn'] font-medium text-xs rounded-[100px] h-[38px] px-4 shadow-[0_2px_12px_rgba(183,154,255,0.25)] transition-all duration-150 cursor-pointer shrink-0"
          >
            <Plus className="size-4" />
            <span>ثبت وظیفه جدید</span>
          </button>
        </div>
      </div>

      {/* 
        ==================================================
        2. SPRINT KPI METRIC CARDS (Figma Algonet/Metric/Default 11:23187)
        ================================================== 
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sprintKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-5 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] relative overflow-hidden group hover:border-[#666cff]/40 transition-all duration-200 text-right flex flex-col justify-between min-h-[148px]"
            >
              {/* Background glow */}
              <div
                className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: kpi.badgeColor }}
              />

              {/* Header */}
              <div className="flex items-center justify-between z-10">
                <span className="font-['Vazirmatn'] font-medium text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Icon className="size-3.5" style={{ color: kpi.badgeColor }} />
                  {kpi.title}
                </span>

                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-['Vazirmatn'] font-bold border"
                  style={{
                    backgroundColor: `${kpi.badgeColor}15`,
                    color: kpi.badgeColor,
                    borderColor: `${kpi.badgeColor}35`
                  }}
                >
                  {kpi.badge}
                </span>
              </div>

              {/* Value */}
              <div className="py-2 z-10 flex items-baseline gap-1.5">
                <span className="font-['Vazirmatn'] font-bold text-2xl sm:text-3xl text-[#eaeafb] tracking-tight">
                  {toPersianDigits(kpi.value)}
                </span>
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] font-normal">
                  {kpi.unit}
                </span>
              </div>

              {/* Subtitle */}
              <div className="z-10 border-t border-[#34364d] pt-2.5">
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
        3. SEARCH & STATUS FILTER BAR
        ================================================== 
      */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#30334e] border border-[#3d3f59] rounded-[20px] p-4 text-right">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                : 'text-[#8386a1] hover:text-[#eaeafb]'
            }`}
          >
            همه پروژه‌ها ({toPersianDigits(allProjects.length)})
          </button>
          <button
            onClick={() => setStatusFilter('on-track')}
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'on-track'
                ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                : 'text-[#8386a1] hover:text-[#eaeafb]'
            }`}
          >
            در مسیر پیشرفت
          </button>
          <button
            onClick={() => setStatusFilter('review')}
            className={`px-3.5 py-1.5 rounded-[100px] text-xs font-['Vazirmatn'] transition-all cursor-pointer whitespace-nowrap ${
              statusFilter === 'review'
                ? 'bg-[#34364d] text-[#eaeafb] border border-[#42455f] font-medium'
                : 'text-[#8386a1] hover:text-[#eaeafb]'
            }`}
          >
            مرحله بازبینی
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:w-72">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8386a1]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جست‌وجوی عنوان یا شناسه…"
            className="w-full h-10 pr-10 pl-4 rounded-[100px] bg-[rgba(13,14,20,0.9)] border border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#eaeafb] placeholder:text-[#585b74] outline-none font-['Vazirmatn'] transition-all"
          />
        </div>
      </div>

      {/* 
        ==================================================
        4. MAIN VIEW: CARDS GRID vs KANBAN BOARD
        ================================================== 
      */}
      {viewMode === 'cards' ? (
        /* ================= CARDS GRID ================= */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isCompleted = project.progress === 100;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] hover:border-[#666cff]/50 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 cursor-pointer text-right group"
              >
                {/* Top Code & Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#666cff] bg-[#666cff]/10 px-2.5 py-1 rounded-md border border-[#666cff]/25 dir-ltr">
                      {project.code}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-['Vazirmatn'] font-semibold border ${
                        project.status === 'on-track'
                          ? 'bg-[#28c76f]/15 text-[#28c76f] border-[#28c76f]/30'
                          : project.status === 'review'
                          ? 'bg-[#666cff]/15 text-[#666cff] border-[#666cff]/30'
                          : 'bg-[#ff9f43]/15 text-[#ff9f43] border-[#ff9f43]/30'
                      }`}
                    >
                      {project.status === 'on-track'
                        ? 'در مسیر پیشرفت'
                        : project.status === 'review'
                        ? 'مرحله بازبینی'
                        : 'ریسک ددلاین'}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#eaeafb] group-hover:text-[#666cff] transition-colors leading-snug">
                      {project.name}
                    </h3>
                    <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
                      نقش سازمانی: <span className="text-[#8386a1] font-medium">{project.role}</span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar with Segmented Feeling */}
                <div className="space-y-2 bg-[#34364d] p-4 rounded-[16px] border border-[#3d3f59]">
                  <div className="flex items-center justify-between text-xs font-['Vazirmatn']">
                    <span className="text-[#8386a1]">{project.sprint}</span>
                    <span className="font-mono font-bold text-[#eaeafb]">
                      {toPersianDigits(project.progress)}٪
                    </span>
                  </div>

                  <div className="h-2 w-full bg-[#34364d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: isCompleted ? '#666cff' : '#28c76f'
                      }}
                    />
                  </div>

                  {/* Task counts */}
                  <div className="flex items-center justify-between text-[11px] font-['Vazirmatn'] text-[#8386a1] pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3 text-[#ff9f43]" />
                      {toPersianDigits(project.openTasks)} وظیفه باز
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3 text-[#28c76f]" />
                      {toPersianDigits(project.completedTasks)} وظیفه تکمیل‌شده
                    </span>
                  </div>
                </div>

                {/* Footer: Team Avatars & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#3d3f59]">
                  {/* Team Members */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center -space-x-2 space-x-reverse">
                      {project.teamMembers.map((m, idx) => (
                        <div
                          key={idx}
                          title={m.name}
                          className="size-7 rounded-full bg-[#34364d] border-2 border-[#30334e] flex items-center justify-center text-[10px] font-['Vazirmatn'] font-bold text-[#eaeafb] shadow-sm"
                        >
                          {m.initials}
                        </div>
                      ))}
                    </div>
                    <span className="font-['Vazirmatn'] text-[11px] text-[#8386a1] hidden sm:inline">
                      تیم همکار
                    </span>
                  </div>

                  {/* Detail Action */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="flex items-center gap-1.5 bg-[#34364d] hover:bg-[#666cff] text-[#eaeafb] hover:text-[#17111f] border border-[#42455f] hover:border-[#666cff] text-xs font-['Vazirmatn'] font-medium rounded-[100px] h-[34px] px-3.5 transition-all duration-150 cursor-pointer"
                    >
                      <span>جزئیات پروژه</span>
                      <ChevronLeft className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= KANBAN BOARD ================= */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: To Do */}
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-5 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-[#3d3f59] pb-3">
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb] flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#8386a1]" />
                برای انجام (To Do)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#34364d] text-[11px] font-mono text-[#8386a1]">
                {toPersianDigits(kanbanTasks.filter((t) => t.status === 'todo').length)}
              </span>
            </div>

            <div className="space-y-3 min-h-[380px]">
              {kanbanTasks
                .filter((t) => t.status === 'todo')
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-[16px] bg-[#34364d] border border-[#3d3f59] hover:border-[#42455f] transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#666cff]">
                        {task.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-['Vazirmatn'] bg-[#34364d] text-[#8386a1]">
                        {task.priorityLabel}
                      </span>
                    </div>

                    <h4 className="font-['Vazirmatn'] font-semibold text-xs text-[#eaeafb] leading-snug">
                      {task.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-[#34364d] text-[11px] text-[#8386a1]">
                      <span>{task.projectName}</span>
                      <button
                        onClick={() => handleMoveTaskStatus(task.id, 'in-progress')}
                        className="text-xs text-[#666cff] hover:underline cursor-pointer"
                      >
                        شروع کار ←
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-5 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-[#3d3f59] pb-3">
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb] flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#ff9f43]" />
                در حال اقدام (In Progress)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#34364d] text-[11px] font-mono text-[#ff9f43]">
                {toPersianDigits(kanbanTasks.filter((t) => t.status === 'in-progress').length)}
              </span>
            </div>

            <div className="space-y-3 min-h-[380px]">
              {kanbanTasks
                .filter((t) => t.status === 'in-progress')
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-[16px] bg-[#34364d] border border-[#666cff]/30 hover:border-[#666cff] transition-all space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#666cff]">
                        {task.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-['Vazirmatn'] bg-[#666cff]/15 text-[#666cff]">
                        {task.priorityLabel}
                      </span>
                    </div>

                    <h4 className="font-['Vazirmatn'] font-semibold text-xs text-[#eaeafb] leading-snug">
                      {task.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-[#34364d] text-[11px] text-[#8386a1]">
                      <span className="font-mono">{toPersianDigits(task.hours)} ساعت تخمینی</span>
                      <button
                        onClick={() => handleMoveTaskStatus(task.id, 'done')}
                        className="text-xs text-[#28c76f] font-semibold hover:underline cursor-pointer"
                      >
                        تکمیل شد ✓
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 3: Done */}
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-5 space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-[#3d3f59] pb-3">
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb] flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#28c76f]" />
                انجام‌شده (Done)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#34364d] text-[11px] font-mono text-[#28c76f]">
                {toPersianDigits(kanbanTasks.filter((t) => t.status === 'done').length)}
              </span>
            </div>

            <div className="space-y-3 min-h-[380px]">
              {kanbanTasks
                .filter((t) => t.status === 'done')
                .map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-[16px] bg-[#34364d]/70 border border-[#3d3f59] hover:border-[#28c76f]/40 transition-all space-y-3 opacity-90"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-[#28c76f] line-through">
                        {task.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-['Vazirmatn'] bg-[#28c76f]/15 text-[#28c76f]">
                        انجام شد
                      </span>
                    </div>

                    <h4 className="font-['Vazirmatn'] font-normal text-xs text-[#8386a1] leading-snug line-through">
                      {task.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-[#34364d] text-[11px] text-[#8386a1]">
                      <span>{task.projectName}</span>
                      <Check className="size-3.5 text-[#28c76f]" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 
        ==================================================
        5. MODAL: CREATE NEW TASK (Figma Algonet/Modal/Edit request 11:23247)
        ================================================== 
      */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] p-6 sm:p-8 max-w-lg w-full space-y-6 text-right relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
              <div className="space-y-1">
                <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  ثبت وظیفه جدید در اسپرینت
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                  وظیفه پس از ثبت به بورد OpenProject و بک‌لاگ اسپرینت ۱۴ متصل می‌گردد.
                </p>
              </div>

              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              {/* Task Title */}
              <div className="space-y-1.5">
                <label className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  عنوان وظیفه:
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="مثلاً: بهینه‌سازی کدهای بخش احراز هویت"
                  className="w-full h-11 rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#a0a2b1] dark:placeholder-[#585b74] px-4 outline-none font-['Vazirmatn'] transition-all"
                />
              </div>

              {/* Project Selection */}
              <div className="space-y-1.5">
                <label className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  انتخاب پروژه:
                </label>
                <select
                  value={newTaskProject}
                  onChange={(e) => setNewTaskProject(e.target.value)}
                  className="w-full h-11 rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-3 outline-none font-['Vazirmatn'] transition-all"
                >
                  {allProjects.map((p) => (
                    <option key={p.id} value={p.code} className="bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb]">
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority & Estimated Hours */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    اولویت:
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full h-11 rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-3 outline-none font-['Vazirmatn'] transition-all"
                  >
                    <option value="high" className="bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb]">اولویت فوری / بالا</option>
                    <option value="medium" className="bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb]">اولویت متوسط</option>
                    <option value="low" className="bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb]">اولویت عادی</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    برآورد ساعت (Hours):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={80}
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(Number(e.target.value))}
                    className="w-full h-11 rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-4 outline-none font-['Vazirmatn'] transition-all"
                  />
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-[100px] h-[38px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="bg-[#666cff] hover:bg-[#575ce6] text-white rounded-[100px] h-[38px] px-6 text-xs font-['Vazirmatn'] font-semibold transition-all cursor-pointer shadow-md"
                >
                  ثبت وظیفه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ==================================================
        6. MODAL: PROJECT DETAIL (Figma Algonet/Modal/Edit request 11:23247)
        ================================================== 
      */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[32px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] p-6 sm:p-8 max-w-xl w-full space-y-6 text-right relative">
            <div className="flex items-start justify-between pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#666cff] bg-[#666cff]/10 px-2 py-0.5 rounded-md border border-[#666cff]/25 dir-ltr">
                  {selectedProject.code}
                </span>
                <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb] pt-1">
                  {selectedProject.name}
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                  اسپرینت: {selectedProject.sprint}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
              <div className="rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] p-4 border border-[#e0e2ec] dark:border-[#3d3f59] space-y-2">
                <div className="flex items-center justify-between text-xs font-['Vazirmatn']">
                  <span className="text-[#62657a] dark:text-[#8386a1]">پیشرفت اسپرینت جاری</span>
                  <span className="font-mono font-bold text-[#666cff]">
                    {toPersianDigits(selectedProject.progress)}٪
                  </span>
                </div>
                <div className="h-2 w-full bg-[#e0e2ec] dark:bg-[#34364d] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#666cff]"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Roles & Team */}
              <div className="space-y-2">
                <span className="font-['Vazirmatn'] text-xs font-bold text-[#62657a] dark:text-[#8386a1] block">
                  اعضای تیم پروژه:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.teamMembers.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-[12px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] flex items-center gap-2"
                    >
                      <div className="size-6 rounded-full bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[10px] font-bold text-[#666cff] dark:text-[#eaeafb] flex items-center justify-center shadow-xs">
                        {m.initials}
                      </div>
                      <span className="font-['Vazirmatn'] text-xs text-[#1e1e2d] dark:text-[#eaeafb]">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
              <a
                href="https://pm.algonet.ir"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#666cff] hover:underline"
              >
                <span>باز کردن بورد در OpenProject</span>
                <ArrowUpRight className="size-3.5" />
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-[100px] h-[38px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
