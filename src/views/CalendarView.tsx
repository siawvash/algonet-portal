import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PortalNavId } from '../types';
import { toPersianDigits } from '../utils/formatters';
import {
  Calendar as CalendarIcon,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Clock,
  Video,
  Users,
  X,
  Check,
  CalendarDays,
  ExternalLink,
  ShieldCheck,
  Bell,
  CheckCircle2,
  AlertCircle,
  Menu,
  ChevronDown,
  UserPlus,
  ShieldAlert,
  Trash2
} from 'lucide-react';

interface CalendarViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

export type MeetingCategory = 'onboarding' | 'retro' | 'daily' | 'planning' | 'grooming';

export interface CalendarMeeting {
  id: string;
  code?: string;
  title: string;
  time: string;
  endTime?: string;
  dayNumber: number; // in Aban (1 to 30)
  category: MeetingCategory;
  categoryLabel: string;
  color: string; // hex
  bgColor: string;
  room: string;
  meetUrl?: string;
  organizer: string;
  attendeesCount: number;
}

export interface UnavailableSlot {
  id: string;
  title: string;
  dayNumber: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: string;
}

const WEEKDAY_NAMES = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه'
];

const getDayOfWeekName = (dayNumber: number): string => {
  const idx = (dayNumber + 5) % 7;
  return WEEKDAY_NAMES[idx];
};

// Hours for Week View (01:00 to 23:00)
const WEEK_HOURS_LIST = [
  '۰۱:۰۰', '۰۲:۰۰', '۰۳:۰۰', '۰۴:۰۰', '۰۵:۰۰', '۰۶:۰۰',
  '۰۷:۰۰', '۰۸:۰۰', '۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰',
  '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰', '۱۷:۰۰', '۱۸:۰۰',
  '۱۹:۰۰', '۲۰:۰۰', '۲۱:۰۰', '۲۲:۰۰', '۲۳:۰۰'
];

// Hours for Day View: 7 AM to 7 PM (13 hours)
const DAY_WORK_HOURS = [
  '۰۷:۰۰', '۰۸:۰۰', '۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰', '۱۲:۰۰',
  '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰', '۱۷:۰۰', '۱۸:۰۰', '۱۹:۰۰'
];

// Hours for Day View: 24 Hours
const DAY_ALL_HOURS = [
  '۰۰:۰۰', '۰۱:۰۰', '۰۲:۰۰', '۰۳:۰۰', '۰۴:۰۰', '۰۵:۰۰',
  '۰۶:۰۰', '۰۷:۰۰', '۰۸:۰۰', '۰۹:۰۰', '۱۰:۰۰', '۱۱:۰۰',
  '۱۲:۰۰', '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰', '۱۷:۰۰',
  '۱۸:۰۰', '۱۹:۰۰', '۲۰:۰۰', '۲۱:۰۰', '۲۲:۰۰', '۲۳:۰۰'
];

// Helper to check if an hour slot falls inside an unavailable interval
const isHourInsideRange = (hourStr: string, startStr: string, endStr: string): boolean => {
  const clean = (s: string) => parseInt(s.replace(/[^0-9]/g, ''), 10);
  const h = clean(hourStr);
  const s = clean(startStr);
  const e = clean(endStr);
  if (isNaN(h) || isNaN(s) || isNaN(e)) return false;
  return h >= s && h < e;
};

export const CalendarView: React.FC<CalendarViewProps> = () => {
  // View Switcher (روز، هفته، ماه، برنامه، سال)
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month' | 'agenda' | 'year'>('month');

  // Selected Day (in Aban 1405: 11 is selected by default in reference image)
  const [selectedDay, setSelectedDay] = useState<number>(11);

  // Day View timeline mode (work hours 7 AM to 7 PM vs 24 hours)
  const [dayViewMode, setDayViewMode] = useState<'workhours' | '24hours'>('workhours');

  // Active week index for week view (0: 2-8, 1: 9-15, 2: 16-22, 3: 23-29)
  const [weekIndex, setWeekIndex] = useState<number>(1); // Default to Week 2 (9-15 Aban)

  // Year view half selector (0 = spring/summer, 1 = autumn/winter)
  const [yearHalf, setYearHalf] = useState<0 | 1>(0);

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string>('');

  // Modals state
  const [isCreateMeetingOpen, setIsCreateMeetingOpen] = useState<boolean>(false);
  const [isReminderSettingsOpen, setIsReminderSettingsOpen] = useState<boolean>(false);
  const [isUnavailableModalOpen, setIsUnavailableModalOpen] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<CalendarMeeting | null>(null);

  // New meeting form state
  const [newMeetingTitle, setNewMeetingTitle] = useState<string>('');
  const [newMeetingProject, setNewMeetingProject] = useState<string>('تست - پروژه پورتال');
  const [newMeetingCategoryType, setNewMeetingCategoryType] = useState<string>('تست و جلسه گروه رنگ');
  const [newMeetingStartDate, setNewMeetingStartDate] = useState<string>('1405/08/11');
  const [newMeetingStartTime, setNewMeetingStartTime] = useState<string>('09:00');
  const [newMeetingEndDate, setNewMeetingEndDate] = useState<string>('1405/08/11');
  const [newMeetingEndTime, setNewMeetingEndTime] = useState<string>('10:00');
  const [newMeetingOrganizer, setNewMeetingOrganizer] = useState<string>('سیدمجتبی سیدآبادی - حضور او در جلسه اختیاری نیست');
  const [newMeetingLocation, setNewMeetingLocation] = useState<string>('');
  const [newMeetingNotes, setNewMeetingNotes] = useState<string>('');
  const [newMeetingRepeat, setNewMeetingRepeat] = useState<string>('تکرار نشود');
  const [newMeetingConfirmEmail, setNewMeetingConfirmEmail] = useState<boolean>(false);

  // Unavailable Slot form state
  const [unavailPrivateTitle, setUnavailPrivateTitle] = useState<string>('در دسترس نیستم');
  const [unavailStartDate, setUnavailStartDate] = useState<string>('1405/08/11');
  const [unavailStartTime, setUnavailStartTime] = useState<string>('13:00');
  const [unavailEndDate, setUnavailEndDate] = useState<string>('1405/08/11');
  const [unavailEndTime, setUnavailEndTime] = useState<string>('15:00');

  // Reminder settings form state
  const [remindMethodSms, setRemindMethodSms] = useState<boolean>(false);
  const [remindMethodMattermost, setRemindMethodMattermost] = useState<boolean>(false);
  const [remindMethodEmail, setRemindMethodEmail] = useState<boolean>(true);
  const [remindStart, setRemindStart] = useState<boolean>(false);
  const [remind5Min, setRemind5Min] = useState<boolean>(false);
  const [remind10Min, setRemind10Min] = useState<boolean>(true);
  const [remind15Min, setRemind15Min] = useState<boolean>(false);
  const [remind20Min, setRemind20Min] = useState<boolean>(false);
  const [remind60Min, setRemind60Min] = useState<boolean>(false);
  const [remind1440Min, setRemind1440Min] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<string>('15');
  const [remindDailySummary, setRemindDailySummary] = useState<boolean>(false);

  // Registered Unavailable Slots (can be added by user!)
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableSlot[]>([
    {
      id: 'un-1',
      title: 'در دسترس نیستم',
      dayNumber: 11,
      startDate: '1405/08/11',
      endDate: '1405/08/11',
      startTime: '13:00',
      endTime: '15:00',
      type: 'عدم دسترسی'
    }
  ]);

  // Meetings on Calendar
  const [meetings, setMeetings] = useState<CalendarMeeting[]>([
    {
      id: 'm-1',
      title: 'تست ۴- ماندنی',
      time: '۰۹:۰۰',
      endTime: '۱۰:۰۰',
      dayNumber: 6,
      category: 'retro',
      categoryLabel: 'تست جلسه رترو',
      color: '#ea580c',
      bgColor: '#ea580c',
      room: 'اتاق مجازی Meet #3',
      meetUrl: 'https://meet.algonet.ir/retro-room',
      organizer: 'مونا کاظمی',
      attendeesCount: 2
    },
    {
      id: 'm-2',
      title: 'تست ۵- ماندنی',
      time: '۱۱:۰۰',
      endTime: '۱۲:۰۰',
      dayNumber: 6,
      category: 'onboarding',
      categoryLabel: 'تست جلسه آنبوردینگ',
      color: '#22c55e',
      bgColor: '#22c55e',
      room: 'اتاق کنفرانس طبقه ۴',
      meetUrl: 'https://meet.algonet.ir/onboarding',
      organizer: 'سیاوش بختیاری',
      attendeesCount: 1
    },
    {
      id: 'm-3',
      title: 'جلسه استندآپ روزانه پلتفرم',
      time: '۱۰:۰۰',
      endTime: '۱۰:۳۰',
      dayNumber: 11,
      category: 'daily',
      categoryLabel: 'تست جلسه روزانه',
      color: '#3b82f6',
      bgColor: '#2563eb',
      room: 'اتاق مجازی Meet #1',
      meetUrl: 'https://meet.algonet.ir/daily',
      organizer: 'کاوه شریفی',
      attendeesCount: 6
    },
    {
      id: 'm-4',
      title: 'بررسی معماری میکروسرویس‌ها و کوبرنتیز',
      time: '۱۱:۰۰',
      endTime: '۱۲:۰۰',
      dayNumber: 11,
      category: 'planning',
      categoryLabel: 'تست جلسه پلن',
      color: '#06b6d4',
      bgColor: '#0891b2',
      room: 'سالن کنفرانس شیشه‌ای',
      meetUrl: 'https://meet.algonet.ir/architecture',
      organizer: 'سیاوش بختیاری',
      attendeesCount: 5
    },
    {
      id: 'm-5',
      title: 'جلسه اضطراری استقرار ریلیز شبانه',
      time: '۲۱:۳۰',
      endTime: '۲۲:۳۰',
      dayNumber: 11,
      category: 'grooming',
      categoryLabel: 'جلسه فنی ریلیز',
      color: '#f43f5e',
      bgColor: '#e11d48',
      room: 'اتاق مجازی اضطراری Meet #Release',
      meetUrl: 'https://meet.algonet.ir/night-release',
      organizer: 'تیم زیرساخت',
      attendeesCount: 4
    },
    {
      id: 'm-6',
      title: 'بررسی بک‌لاگ و گرومینگ اسپرینت',
      time: '۱۴:۳۰',
      endTime: '۱۵:۳۰',
      dayNumber: 13,
      category: 'grooming',
      categoryLabel: 'تست جلسه گرومینگ',
      color: '#a855f7',
      bgColor: '#9333ea',
      room: 'اتاق مجازی Meet #2',
      meetUrl: 'https://meet.algonet.ir/grooming',
      organizer: 'مونا کاظمی',
      attendeesCount: 7
    },
    {
      id: 'm-7',
      title: 'پلنینگ اسپرینت و تخمین تسک‌ها',
      time: '۱۶:۰۰',
      endTime: '۱۷:۰۰',
      dayNumber: 20,
      category: 'planning',
      categoryLabel: 'تست جلسه پلن',
      color: '#06b6d4',
      bgColor: '#0891b2',
      room: 'سالن جلسات طبقه ۵',
      meetUrl: 'https://meet.algonet.ir/planning',
      organizer: 'سیاوش بختیاری',
      attendeesCount: 8
    }
  ]);

  // Calendar structure for Aban 1405 (Month View)
  const calendarGridRows = [
    [
      { dayNum: 25, isCurrentMonth: false, isFriday: false },
      { dayNum: 26, isCurrentMonth: false, isFriday: false },
      { dayNum: 27, isCurrentMonth: false, isFriday: false },
      { dayNum: 28, isCurrentMonth: false, isFriday: false },
      { dayNum: 29, isCurrentMonth: false, isFriday: false },
      { dayNum: 30, isCurrentMonth: false, isFriday: false },
      { dayNum: 1, isCurrentMonth: true, isFriday: true }
    ],
    [
      { dayNum: 2, isCurrentMonth: true, isFriday: false },
      { dayNum: 3, isCurrentMonth: true, isFriday: false },
      { dayNum: 4, isCurrentMonth: true, isFriday: false },
      { dayNum: 5, isCurrentMonth: true, isFriday: false },
      { dayNum: 6, isCurrentMonth: true, isFriday: false },
      { dayNum: 7, isCurrentMonth: true, isFriday: false },
      { dayNum: 8, isCurrentMonth: true, isFriday: true }
    ],
    [
      { dayNum: 9, isCurrentMonth: true, isFriday: false },
      { dayNum: 10, isCurrentMonth: true, isFriday: false },
      { dayNum: 11, isCurrentMonth: true, isFriday: false },
      { dayNum: 12, isCurrentMonth: true, isFriday: false },
      { dayNum: 13, isCurrentMonth: true, isFriday: false },
      { dayNum: 14, isCurrentMonth: true, isFriday: false },
      { dayNum: 15, isCurrentMonth: true, isFriday: true }
    ],
    [
      { dayNum: 16, isCurrentMonth: true, isFriday: false },
      { dayNum: 17, isCurrentMonth: true, isFriday: false },
      { dayNum: 18, isCurrentMonth: true, isFriday: false },
      { dayNum: 19, isCurrentMonth: true, isFriday: false },
      { dayNum: 20, isCurrentMonth: true, isFriday: false },
      { dayNum: 21, isCurrentMonth: true, isFriday: false },
      { dayNum: 22, isCurrentMonth: true, isFriday: true }
    ],
    [
      { dayNum: 23, isCurrentMonth: true, isFriday: false },
      { dayNum: 24, isCurrentMonth: true, isFriday: false },
      { dayNum: 25, isCurrentMonth: true, isFriday: false },
      { dayNum: 26, isCurrentMonth: true, isFriday: false },
      { dayNum: 27, isCurrentMonth: true, isFriday: false },
      { dayNum: 28, isCurrentMonth: true, isFriday: false },
      { dayNum: 29, isCurrentMonth: true, isFriday: true }
    ],
    [
      { dayNum: 30, isCurrentMonth: true, isFriday: false },
      { dayNum: 1, isCurrentMonth: false, isFriday: false },
      { dayNum: 2, isCurrentMonth: false, isFriday: false },
      { dayNum: 3, isCurrentMonth: false, isFriday: false },
      { dayNum: 4, isCurrentMonth: false, isFriday: false },
      { dayNum: 5, isCurrentMonth: false, isFriday: false },
      { dayNum: 6, isCurrentMonth: false, isFriday: true }
    ]
  ];

  // Weeks for Week View (Saturday to Friday)
  const weeksList = [
    [2, 3, 4, 5, 6, 7, 8].map((d) => ({ dayNum: d, weekdayName: getDayOfWeekName(d), isFriday: d === 8 })),
    [9, 10, 11, 12, 13, 14, 15].map((d) => ({ dayNum: d, weekdayName: getDayOfWeekName(d), isFriday: d === 15 })),
    [16, 17, 18, 19, 20, 21, 22].map((d) => ({ dayNum: d, weekdayName: getDayOfWeekName(d), isFriday: d === 22 })),
    [23, 24, 25, 26, 27, 28, 29].map((d) => ({ dayNum: d, weekdayName: getDayOfWeekName(d), isFriday: d === 29 }))
  ];

  const currentWeekDays = weeksList[weekIndex] || weeksList[1];

  // Helper for Year View: 12 Months of 1405
  const yearMonths = [
    { name: 'فروردین', startOffset: 0, daysCount: 31, circledDay: 1 },
    { name: 'اردیبهشت', startOffset: 3, daysCount: 31, circledDay: 1 },
    { name: 'خرداد', startOffset: 6, daysCount: 31, circledDay: 1 },
    { name: 'تیر', startOffset: 2, daysCount: 31, circledDay: 1 },
    { name: 'مرداد', startOffset: 5, daysCount: 31, circledDay: 1 },
    { name: 'شهریور', startOffset: 1, daysCount: 31, circledDay: 1 },
    { name: 'مهر', startOffset: 4, daysCount: 30, circledDay: 1 },
    { name: 'آبان', startOffset: 6, daysCount: 30, circledDay: 11 },
    { name: 'آذر', startOffset: 1, daysCount: 30, circledDay: 1 },
    { name: 'دی', startOffset: 3, daysCount: 30, circledDay: 1 },
    { name: 'بهمن', startOffset: 5, daysCount: 30, circledDay: 1 },
    { name: 'اسفند', startOffset: 0, daysCount: 29, circledDay: 1 }
  ];

  const currentHalfMonths = yearHalf === 0 ? yearMonths.slice(0, 6) : yearMonths.slice(6, 12);

  // Dynamic toolbar title
  const getToolbarTitle = () => {
    if (activeTab === 'year') return '۱۴۰۵';
    if (activeTab === 'day') return `${toPersianDigits(selectedDay)} آبان ۱۴۰۵`;
    return 'آبان ۱۴۰۵';
  };

  // Handle toolbar prev/next clicks
  const handlePrev = () => {
    if (activeTab === 'year') {
      setYearHalf((prev) => (prev === 0 ? 1 : 0));
    } else if (activeTab === 'week') {
      setWeekIndex((prev) => (prev > 0 ? prev - 1 : weeksList.length - 1));
    } else if (activeTab === 'day') {
      setSelectedDay((prev) => (prev > 1 ? prev - 1 : 30));
    }
  };

  const handleNext = () => {
    if (activeTab === 'year') {
      setYearHalf((prev) => (prev === 0 ? 1 : 0));
    } else if (activeTab === 'week') {
      setWeekIndex((prev) => (prev < weeksList.length - 1 ? prev + 1 : 0));
    } else if (activeTab === 'day') {
      setSelectedDay((prev) => (prev < 30 ? prev + 1 : 1));
    }
  };

  const handleTodayClick = () => {
    setSelectedDay(11);
    setWeekIndex(1);
    setUnavailStartDate('1405/08/11');
    setNewMeetingStartDate('1405/08/11');
  };

  // Day View specific helpers
  const dayDisplayHours = dayViewMode === 'workhours' ? DAY_WORK_HOURS : DAY_ALL_HOURS;
  const meetingsToday = meetings.filter((m) => m.dayNumber === selectedDay);
  const outsideWorkhoursMeetings = meetingsToday.filter((m) => {
    const h = parseInt(m.time.replace(/[^0-9]/g, ''), 10);
    return h < 700 || h > 1900;
  });

  // Handle Create Meeting Submit
  const handleCreateMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim()) return;

    const newM: CalendarMeeting = {
      id: `m-${Date.now()}`,
      title: newMeetingTitle,
      time: toPersianDigits(newMeetingStartTime),
      endTime: toPersianDigits(newMeetingEndTime),
      dayNumber: selectedDay,
      category: 'daily',
      categoryLabel: newMeetingCategoryType || 'تست جلسه روزانه',
      color: '#3b82f6',
      bgColor: '#2563eb',
      room: newMeetingLocation || 'اتاق مجازی Meet #1',
      meetUrl: newMeetingLocation.startsWith('http') ? newMeetingLocation : 'https://meet.algonet.ir/new-room',
      organizer: newMeetingOrganizer,
      attendeesCount: 3
    };

    setMeetings((prev) => [...prev, newM]);
    setIsCreateMeetingOpen(false);
    setNewMeetingTitle('');
    setToastMessage('جلسه جدید با موفقیت در تقویم ثبت شد.');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Handle Add Unavailable Slot Submit
  const handleAddUnavailableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const day = parseInt(unavailStartDate.split('/')[2] || '11', 10);
    const newSlot: UnavailableSlot = {
      id: `un-${Date.now()}`,
      title: unavailPrivateTitle || 'در دسترس نیستم',
      dayNumber: isNaN(day) ? selectedDay : day,
      startDate: unavailStartDate,
      endDate: unavailEndDate,
      startTime: unavailStartTime,
      endTime: unavailEndTime,
      type: 'عدم دسترسی'
    };

    setUnavailableTimes((prev) => [newSlot, ...prev]);
    setIsUnavailableModalOpen(false);
    setToastMessage(`ساعت عدم دسترسی (${toPersianDigits(unavailStartTime)} تا ${toPersianDigits(unavailEndTime)}) ثبت گردید.`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleDeleteUnavailable = (id: string) => {
    setUnavailableTimes((prev) => prev.filter((u) => u.id !== id));
    setToastMessage('بازه عدم دسترسی حذف شد.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 pb-12 font-['Vazirmatn'] animate-in fade-in duration-200 relative">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-[#171822] border border-[#e0e2ec] dark:border-[#666cff] text-[#1e1e2d] dark:text-[#eaeafb] px-5 py-3 rounded-[100px] shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center gap-2.5 text-xs font-['Vazirmatn'] animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="size-4 text-[#28c76f] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 
        ==================================================
        1. TOP HEADER: عنوان تقویم + دکمه‌های ایجاد جلسه و تنظیمات
        (Primary Button strictly matching Figma 11:21996 / 11:23224)
        ================================================== 
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Right Section: Title and Subtitle */}
        <div className="space-y-1 text-right">
          <h1 className="font-['Vazirmatn'] font-bold text-2xl text-[#1e1e2d] dark:text-[#eaeafb]">
            تقویم من
          </h1>
          <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
            جلسات، یادآوری‌ها و زمان‌های عدم دسترسی را مدیریت کنید.
          </p>
        </div>

        {/* Left Section: Actions */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* 
            Button: + ایجاد جلسه (White text for high contrast on purple button)
          */}
          <button
            onClick={() => setIsCreateMeetingOpen(true)}
            className="flex items-center gap-2 bg-[#666cff] hover:bg-[#7c82ff] active:bg-[#5b60e6] text-white rounded-[100px] h-[42px] px-6 text-xs font-['Vazirmatn'] font-bold transition-all shadow-[0px_4px_14px_0px_rgba(183,154,255,0.22)] hover:shadow-[0px_6px_20px_0px_rgba(183,154,255,0.3)] cursor-pointer"
          >
            <Plus className="size-4 stroke-[3] text-white" />
            <span className="text-white">ایجاد جلسه</span>
          </button>

          {/* 
            Button: تنظیمات یادآوری
          */}
          <button
            onClick={() => setIsReminderSettingsOpen(true)}
            className="flex items-center gap-2 backdrop-blur-[4px] bg-white dark:bg-[rgba(32,30,47,0.7)] hover:bg-[#f4f5fa] dark:hover:bg-[rgba(40,37,58,0.85)] border border-[#e0e2ec] dark:border-[rgba(255,255,255,0.1)] hover:border-[#666cff]/40 text-[#1e1e2d] dark:text-[#eaeafb] rounded-[100px] h-[42px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer shadow-xs"
          >
            <Settings className="size-4 text-[#62657a] dark:text-[#8386a1]" />
            <span>تنظیمات یادآوری</span>
          </button>
        </div>
      </div>

      {/* 
        ==================================================
        2. CALENDAR TOOLBAR:
           امروز | ماه قبل | ماه بعد | عنوان داینامیک
           جستجوی جلسه | روز - هفته - ماه - برنامه - سال | فیلتر
        ================================================== 
      */}
      <div className="rounded-[20px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs dark:shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.3)]">
        {/* Right Section: منو + عنوان + فلش‌ها + امروز */}
        <div className="flex items-center gap-3">
          <button
            className="size-8 rounded-full hover:bg-[#f4f5fa] dark:hover:bg-[#34364d] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] flex items-center justify-center transition-colors cursor-pointer"
            title="منوی تقویم"
          >
            <Menu className="size-4" />
          </button>

          <button
            onClick={handleTodayClick}
            className="px-4 py-1.5 rounded-[100px] bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff] text-xs font-['Vazirmatn'] font-semibold text-[#1e1e2d] dark:text-[#eaeafb] transition-all cursor-pointer"
          >
            امروز
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="size-8 rounded-full hover:bg-[#f4f5fa] dark:hover:bg-[#34364d] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] flex items-center justify-center transition-colors cursor-pointer"
              title="قبلی"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              onClick={handleNext}
              className="size-8 rounded-full hover:bg-[#f4f5fa] dark:hover:bg-[#34364d] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] flex items-center justify-center transition-colors cursor-pointer"
              title="بعدی"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>

          <h2 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb] pr-2">
            {getToolbarTitle()}
          </h2>
        </div>

        {/* Left Section: جستجو + تب‌های حالت نمایش + فیلتر */}
        <div className="flex items-center gap-3 justify-between sm:justify-end flex-wrap">
          {/* اینپوت جستجوی جلسه */}
          <div className="relative flex-1 sm:flex-initial sm:w-60">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#62657a] dark:text-[#8386a1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی جلسه"
              className="w-full h-9 pr-9 pl-3 rounded-[100px] bg-[#f8f9fd] dark:bg-[rgba(13,14,20,0.9)] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#8386a1] dark:placeholder:text-[#585b74] outline-none font-['Vazirmatn'] transition-all"
            />
          </div>

          {/* تب‌های حالت نمایش (روز، هفته، ماه، برنامه، سال) */}
          <div className="flex items-center bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[100px] p-0.5 text-xs font-['Vazirmatn']">
            {(
              [
                { id: 'day', label: 'روز' },
                { id: 'week', label: 'هفته' },
                { id: 'month', label: 'ماه' },
                { id: 'agenda', label: 'برنامه' },
                { id: 'year', label: 'سال' }
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1 rounded-[100px] transition-all cursor-pointer whitespace-nowrap font-medium ${
                  activeTab === t.id
                    ? 'bg-[#666cff] text-white font-bold shadow-[0px_2px_8px_rgba(183,154,255,0.25)]'
                    : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* آیکون فیلتر پیشرفته */}
          <button
            className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] flex items-center justify-center transition-colors cursor-pointer"
            title="فیلترها"
          >
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* 
        ==================================================
        3. MAIN CONTENT: Switch based on activeTab
        ================================================== 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* MAIN CALENDAR COLUMN (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-4">
          {/* TAB 1: ماه (Month View) */}
          {activeTab === 'month' && (
            <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col justify-between min-h-[680px]">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 border-b border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f8f9fd] dark:bg-[#34364d]/80 text-center py-3 font-['Vazirmatn'] text-xs font-semibold text-[#62657a] dark:text-[#8386a1]">
                <div className="text-right pr-4">شنبه</div>
                <div className="text-right pr-4">یکشنبه</div>
                <div className="text-right pr-4">دوشنبه</div>
                <div className="text-right pr-4">سه‌شنبه</div>
                <div className="text-right pr-4">چهارشنبه</div>
                <div className="text-right pr-4">پنجشنبه</div>
                <div className="text-right pr-4 text-[#ef4444]">جمعه</div>
              </div>

              {/* 6 Rows Grid */}
              <div className="grid grid-cols-7 divide-x divide-x-reverse divide-[#e0e2ec] dark:divide-[#3d3f59] divide-y divide-[#e0e2ec] dark:divide-[#3d3f59] flex-1">
                {calendarGridRows.map((row, rIdx) =>
                  row.map((cell, cIdx) => {
                    const isSelected = cell.isCurrentMonth && cell.dayNum === selectedDay;
                    const cellMeetings = cell.isCurrentMonth
                      ? meetings.filter((m) => m.dayNumber === cell.dayNum)
                      : [];
                    const isCellUnavailable = cell.isCurrentMonth && unavailableTimes.some((u) => u.dayNumber === cell.dayNum);

                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => {
                          if (cell.isCurrentMonth) setSelectedDay(cell.dayNum);
                        }}
                        className={`min-h-[105px] sm:min-h-[115px] p-2 flex flex-col justify-between transition-colors cursor-pointer relative ${
                          !cell.isCurrentMonth
                            ? 'bg-[#fcfdff] dark:bg-[#0e0f13]/60 text-[#a5a7b8] dark:text-[#4a4b56]'
                            : isSelected
                            ? 'bg-[#666cff]/8 dark:bg-[#34364d] border-2 border-[#666cff] shadow-[inset_0_0_12px_rgba(183,154,255,0.18)] z-10'
                            : 'bg-white dark:bg-[#30334e] hover:bg-[#f8f9fd] dark:hover:bg-[#34364d]'
                        }`}
                      >
                        {/* Top Day Number (Right aligned) */}
                        <div className="flex justify-between items-center pr-1 pl-1 pt-1">
                          {isCellUnavailable && (
                            <span className="size-2 rounded-full bg-[#f43f5e] shadow-[0_0_6px_#f43f5e]" title="عدم دسترسی در این روز" />
                          )}
                          {!isCellUnavailable && <span />}

                          {isSelected ? (
                            <span className="size-6 rounded-full bg-[#666cff] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                              {toPersianDigits(cell.dayNum)}
                            </span>
                          ) : (
                            <span
                              className={`font-['Vazirmatn'] text-xs font-semibold px-1 ${
                                cell.isFriday && cell.isCurrentMonth
                                  ? 'text-[#ef4444]'
                                  : !cell.isCurrentMonth
                                  ? 'text-[#a5a7b8] dark:text-[#4a4b56]'
                                  : 'text-[#1e1e2d] dark:text-[#8386a1]'
                              }`}
                            >
                              {toPersianDigits(cell.dayNum)}
                            </span>
                          )}
                        </div>

                        {/* Meeting Badges inside cell */}
                        <div className="space-y-1.5 flex-1 pt-1 overflow-hidden">
                          {cellMeetings.map((meet) => (
                            <div
                              key={meet.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMeeting(meet);
                              }}
                              style={{ backgroundColor: meet.bgColor }}
                              className="rounded-[6px] px-2 py-1 text-[11px] font-['Vazirmatn'] text-white font-medium truncate flex items-center justify-between gap-1 shadow-sm hover:brightness-110 transition-all cursor-pointer"
                            >
                              <span className="truncate">{meet.title}</span>
                              <span className="font-['Vazirmatn'] text-[10px] opacity-90 dir-ltr shrink-0">
                                {toPersianDigits(meet.time)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom padding anchor */}
                        <div className="h-1" />
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Footer Link inside grid */}
              <div className="p-3 border-t border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f8f9fd] dark:bg-[#30334e] text-right">
                <button
                  onClick={() => setIsUnavailableModalOpen(true)}
                  className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] hover:text-[#666cff] transition-colors cursor-pointer"
                >
                  زمان‌های عدم دسترسی من
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: هفته (Week View - Corrected Persian Fonts for Hours) */}
          {activeTab === 'week' && (
            <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col justify-between min-h-[680px]">
              {/* Week Header */}
              <div className="flex border-b border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f8f9fd] dark:bg-[#34364d]/80 text-center py-2.5 font-['Vazirmatn'] text-xs font-semibold text-[#62657a] dark:text-[#8386a1]">
                <div className="flex-1 grid grid-cols-7 divide-x divide-x-reverse divide-[#e0e2ec] dark:divide-[#3d3f59]/60">
                  {currentWeekDays.map((d) => (
                    <div
                      key={d.dayNum}
                      onClick={() => {
                        setSelectedDay(d.dayNum);
                        setActiveTab('day');
                      }}
                      className={`py-1 text-center cursor-pointer transition-colors truncate px-1 flex items-center justify-center ${
                        d.isFriday
                          ? 'text-[#ef4444]'
                          : d.dayNum === selectedDay
                          ? 'bg-[#666cff] text-white font-bold rounded-full shadow-xs px-2'
                          : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
                      }`}
                    >
                      {`۱۴۰۵ آبان ${toPersianDigits(d.dayNum)}، ${d.weekdayName}`}
                    </div>
                  ))}
                </div>
                <div className="w-16 shrink-0 border-r border-[#e0e2ec] dark:border-[#3d3f59]/60" />
              </div>

              {/* Week Time Grid with Persian Digits and Vazirmatn Font */}
              <div className="flex-1 overflow-y-auto max-h-[620px] relative divide-y divide-[#e0e2ec] dark:divide-[#3d3f59]/40">
                {WEEK_HOURS_LIST.map((hour, hIdx) => (
                  <div key={hIdx} className="flex min-h-[52px] group">
                    <div className="flex-1 grid grid-cols-7 divide-x divide-x-reverse divide-[#e0e2ec] dark:divide-[#3d3f59]/40">
                      {currentWeekDays.map((d) => {
                        const meetingAtHour = meetings.find(
                          (m) => m.dayNumber === d.dayNum && m.time.startsWith(hour.slice(0, 2))
                        );
                        const isUnavailable = unavailableTimes.some(
                          (u) => u.dayNumber === d.dayNum && isHourInsideRange(hour, u.startTime, u.endTime)
                        );

                        return (
                          <div
                            key={d.dayNum}
                            onClick={() => {
                              setSelectedDay(d.dayNum);
                              setNewMeetingStartDate(`1405/08/${String(d.dayNum).padStart(2, '0')}`);
                              setNewMeetingEndDate(`1405/08/${String(d.dayNum).padStart(2, '0')}`);
                              setNewMeetingStartTime(hour);
                              setIsCreateMeetingOpen(true);
                            }}
                            className={`p-1 hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]/40 transition-colors relative cursor-pointer ${
                              isUnavailable ? 'bg-[#f43f5e]/10 border-r border-l border-[#f43f5e]/30' : ''
                            }`}
                          >
                            {meetingAtHour && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMeeting(meetingAtHour);
                                }}
                                style={{ backgroundColor: meetingAtHour.bgColor }}
                                className="rounded-[6px] p-1.5 text-[11px] font-['Vazirmatn'] text-white font-medium truncate flex flex-col justify-between shadow-sm hover:brightness-110 transition-all cursor-pointer"
                              >
                                <span className="truncate font-semibold">{meetingAtHour.title}</span>
                                <span className="font-['Vazirmatn'] text-[10px] opacity-90 dir-ltr">{toPersianDigits(meetingAtHour.time)} - {toPersianDigits(meetingAtHour.endTime || '۱۲:۰۰')}</span>
                              </div>
                            )}

                            {!meetingAtHour && isUnavailable && (
                              <div className="h-full flex items-center justify-center text-[10px] text-[#ea5455] font-['Vazirmatn']">
                                ⛔ عدم دسترسی
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Time Label on the Right with Vazirmatn Persian Font */}
                    <div className="w-16 shrink-0 border-r border-[#e0e2ec] dark:border-[#3d3f59]/60 flex items-start justify-center pt-1 text-xs font-['Vazirmatn'] font-semibold text-[#62657a] dark:text-[#8386a1] select-none">
                      {hour}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Footer Link inside grid */}
              <div className="p-3 border-t border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f8f9fd] dark:bg-[#30334e] text-right">
                <button
                  onClick={() => setIsUnavailableModalOpen(true)}
                  className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] hover:text-[#666cff] transition-colors cursor-pointer"
                >
                  زمان‌های عدم دسترسی من
                </button>
              </div>
            </div>
          )}

          {/* 
            TAB 3: روز (Day View - Vertical Timeline 7 AM to 7 PM + 24H Toggle, Persian Font Numbers & Meeting Tag Colors)
          */}
          {activeTab === 'day' && (
            <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 space-y-6 min-h-[680px]">
              {/* Day Header with 24H Toggle */}
              <div className="border-b border-[#e0e2ec] dark:border-[#3d3f59] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb]">
                    {`۱۴۰۵ آبان ${toPersianDigits(selectedDay)}، ${getDayOfWeekName(selectedDay)}`}
                  </h3>
                  <p className="text-xs text-[#62657a] dark:text-[#8386a1] mt-0.5">
                    {toPersianDigits(meetingsToday.length)} جلسه برنامه‌ریزی‌شده در این روز
                  </p>
                </div>

                {/* 7 AM to 7 PM vs 24 Hours switcher capsule */}
                <div className="flex items-center gap-1 bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[100px] p-1 text-xs font-['Vazirmatn']">
                  <button
                    onClick={() => setDayViewMode('workhours')}
                    className={`px-3.5 py-1.5 rounded-[100px] transition-all cursor-pointer font-medium ${
                      dayViewMode === 'workhours'
                        ? 'bg-[#666cff] text-white font-bold shadow-sm'
                        : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
                    }`}
                  >
                    ساعات کاری (۰۷:۰۰ تا ۱۹:۰۰)
                  </button>
                  <button
                    onClick={() => setDayViewMode('24hours')}
                    className={`px-3.5 py-1.5 rounded-[100px] transition-all cursor-pointer font-medium ${
                      dayViewMode === '24hours'
                        ? 'bg-[#666cff] text-white font-bold shadow-sm'
                        : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
                    }`}
                  >
                    ۲۴ ساعته (شبانه روز)
                  </button>
                </div>
              </div>

              {/* Informational banner when meetings exist outside work hours */}
              {dayViewMode === 'workhours' && outsideWorkhoursMeetings.length > 0 && (
                <div className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#666cff]/10 border border-[#666cff]/25 text-xs text-[#1e1e2d] dark:text-[#eaeafb]">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-[#666cff] shrink-0" />
                    <span>
                      {toPersianDigits(outsideWorkhoursMeetings.length)} جلسه خارج از بازه ساعت کاری (مانند شب) ثبت شده است.
                    </span>
                  </div>
                  <button
                    onClick={() => setDayViewMode('24hours')}
                    className="text-[#666cff] hover:underline font-bold shrink-0 cursor-pointer mr-3"
                  >
                    نمایش ۲۴ ساعته
                  </button>
                </div>
              )}

              {/* 
                VERTICAL TIMELINE (Single line spine with Persian hour fonts, meeting nodes and "جلسه" labels)
              */}
              <div className="relative pr-2">
                {/* Continuous Vertical Timeline Spine Line */}
                <div className="absolute right-[86px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#e0e2ec] dark:from-[#42455f] via-[#cacede] dark:via-[#41414e] to-[#e0e2ec] dark:to-[#42455f] pointer-events-none" />

                <div className="space-y-4">
                  {dayDisplayHours.map((hour, idx) => {
                    const hourMeetings = meetings.filter(
                      (m) => m.dayNumber === selectedDay && m.time.startsWith(hour.slice(0, 2))
                    );
                    const isUnavailable = unavailableTimes.find(
                      (u) => u.dayNumber === selectedDay && isHourInsideRange(hour, u.startTime, u.endTime)
                    );

                    return (
                      <div key={idx} className="relative flex items-start gap-4 group">
                        {/* 1. Time Label with Persian font Vazirmatn */}
                        <div className="w-16 shrink-0 pt-2.5 text-left font-['Vazirmatn'] font-semibold text-xs text-[#62657a] dark:text-[#8386a1] select-none">
                          {hour}
                        </div>

                        {/* 2. Spine Node Badge */}
                        <div className="shrink-0 pt-1.5 z-10 flex items-center justify-center">
                          {hourMeetings.length > 0 ? (
                            <div
                              style={{
                                backgroundColor: hourMeetings[0].bgColor,
                                boxShadow: `0 0 16px ${hourMeetings[0].bgColor}55`
                              }}
                              className="size-8 rounded-full flex items-center justify-center text-white shrink-0 border-2 border-white dark:border-[#30334e] transition-transform hover:scale-110 cursor-pointer shadow-md"
                              onClick={() => setSelectedMeeting(hourMeetings[0])}
                              title={hourMeetings[0].title}
                            >
                              <Video className="size-4 text-white" />
                            </div>
                          ) : isUnavailable ? (
                            <div
                              className="size-8 rounded-full flex items-center justify-center text-white shrink-0 border-2 border-white dark:border-[#30334e] bg-[#f43f5e] shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                              title="زمان عدم دسترسی"
                            >
                              <ShieldAlert className="size-4 text-white" />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setNewMeetingStartDate(`1405/08/${String(selectedDay).padStart(2, '0')}`);
                                setNewMeetingEndDate(`1405/08/${String(selectedDay).padStart(2, '0')}`);
                                setNewMeetingStartTime(hour);
                                setIsCreateMeetingOpen(true);
                              }}
                              className="size-4 rounded-full border-2 border-[#cacede] dark:border-[#42455f] bg-[#f8f9fd] dark:bg-[#30334e] group-hover:border-[#666cff] group-hover:bg-[#666cff]/25 group-hover:scale-125 transition-all cursor-pointer mt-2"
                              title="ثبت جلسه در این ساعت"
                            />
                          )}
                        </div>

                        {/* 3. Event Card / Unavailable Slot / Free Slot */}
                        <div className="flex-1 min-w-0">
                          {hourMeetings.length > 0 ? (
                            <div className="space-y-3">
                              {hourMeetings.map((meet) => (
                                <div
                                  key={meet.id}
                                  onClick={() => setSelectedMeeting(meet)}
                                  style={{ '--meet-color': meet.color } as React.CSSProperties}
                                  className="meeting-day-card rounded-[20px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50 dark:hover:border-[#42455f] p-4.5 sm:p-5 cursor-pointer relative overflow-hidden group/card space-y-3"
                                >
                                  <div className="flex items-center justify-between flex-wrap gap-2">
                                    {/* Explicit Meeting Badge with distinct color per type */}
                                    <div className="flex items-center gap-2">
                                      <span
                                        style={{
                                          backgroundColor: `${meet.color}15`,
                                          borderColor: `${meet.color}35`,
                                          color: meet.color
                                        }}
                                        className="px-3 py-1 rounded-[100px] text-[11px] font-bold border"
                                      >
                                        جلسه: {meet.categoryLabel}
                                      </span>
                                    </div>

                                    <span className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr flex items-center gap-1.5 font-medium">
                                      <Clock className="size-3.5 text-[#62657a] dark:text-[#8386a1]" />
                                      {toPersianDigits(meet.time)} – {toPersianDigits(meet.endTime || '۱۲:۰۰')}
                                    </span>
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] group-hover/card:text-[#666cff] dark:group-hover/card:text-white transition-colors">
                                      {meet.title}
                                    </h4>
                                  </div>

                                  <div className="flex items-center justify-between text-xs text-[#62657a] dark:text-[#8386a1] pt-2 border-t border-[#e0e2ec] dark:border-[#3d3f59]/60 flex-wrap gap-2 font-medium">
                                    <div className="flex items-center gap-4 flex-wrap">
                                      <span className="flex items-center gap-1.5 text-[#1e1e2d] dark:text-[#eaeafb]">
                                        <Video className="size-3.5 text-[#666cff]" />
                                        {meet.room}
                                      </span>
                                      <span className="flex items-center gap-1.5">
                                        <Users className="size-3.5 text-[#62657a] dark:text-[#8386a1]" />
                                        {toPersianDigits(meet.attendeesCount)} نفر
                                      </span>
                                      <span>برگزارکننده: {meet.organizer}</span>
                                    </div>

                                    {meet.meetUrl && (
                                      <a
                                        href={meet.meetUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="px-4 py-1.5 rounded-[100px] bg-[#666cff] hover:bg-[#555ae6] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-98 cursor-pointer"
                                      >
                                        <Video className="size-3.5 text-white" />
                                        <span className="text-white">ورود به Meet</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : isUnavailable ? (
                            <div className="rounded-[18px] bg-[#fff1f2] dark:bg-[#1a151b] border border-[#f43f5e]/30 p-4 transition-all shadow-xs space-y-2">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <span className="px-2.5 py-0.5 rounded-[100px] text-[11px] font-bold border border-[#f43f5e]/40 bg-[#f43f5e]/15 text-[#ea5455]">
                                  ⛔ زمان عدم دسترسی (بازه ثبت‌شده)
                                </span>
                                <span className="font-['Vazirmatn'] text-xs text-[#ea5455]">
                                  {toPersianDigits(isUnavailable.startTime)} تا {toPersianDigits(isUnavailable.endTime)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <p className="text-xs text-[#62657a] dark:text-[#8386a1]">
                                  {isUnavailable.title} · در این بازه جلسه‌ای تنظیم نمی‌شود.
                                </p>
                                <button
                                  onClick={() => handleDeleteUnavailable(isUnavailable.id)}
                                  className="text-xs text-[#ea5455] hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-[100px] bg-[#f43f5e]/20 hover:bg-[#f43f5e] transition-all cursor-pointer"
                                >
                                  <Trash2 className="size-3.5" />
                                  <span>حذف</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setNewMeetingStartDate(`1405/08/${String(selectedDay).padStart(2, '0')}`);
                                setNewMeetingEndDate(`1405/08/${String(selectedDay).padStart(2, '0')}`);
                                setNewMeetingStartTime(hour);
                                setIsCreateMeetingOpen(true);
                              }}
                              className="rounded-[14px] bg-[#f8f9fd] dark:bg-[#34364d]/40 border border-[#e0e2ec] dark:border-[#3d3f59]/40 hover:bg-[#f1f3fa] dark:hover:bg-[#34364d]/70 hover:border-[#666cff]/40 p-3 flex items-center justify-between transition-all cursor-pointer group/slot text-xs"
                            >
                              <span className="text-[#8386a1] group-hover/slot:text-[#666cff] font-medium">
                                زمان آزاد
                              </span>
                              <button
                                type="button"
                                className="opacity-0 group-hover/slot:opacity-100 px-3 py-1 rounded-[100px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#666cff] hover:border-[#666cff] text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                              >
                                <Plus className="size-3" />
                                <span>ثبت جلسه در این ساعت</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Footer Link inside grid */}
              <div className="p-3 border-t border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f8f9fd] dark:bg-[#30334e] text-right">
                <button
                  onClick={() => setIsUnavailableModalOpen(true)}
                  className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] hover:text-[#666cff] transition-colors cursor-pointer"
                >
                  زمان‌های عدم دسترسی من
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: برنامه (Agenda / Schedule View) */}
          {activeTab === 'agenda' && (
            <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] overflow-hidden p-6 space-y-6 min-h-[680px]">
              <div className="border-b border-[#e0e2ec] dark:border-[#3d3f59] pb-3 flex items-center justify-between">
                <h3 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                  ۱۴۰۵ آبان ۶، چهارشنبه
                </h3>
                <span className="text-xs text-[#62657a] dark:text-[#8386a1]">۲ جلسه برنامه‌ریزی‌شده</span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setSelectedMeeting(meetings[0])}
                  className="rounded-[16px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50 dark:hover:border-[#42455f] p-4 flex items-center justify-between transition-all cursor-pointer shadow-xs dark:shadow-sm relative overflow-hidden group hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-[#ea580c]" />
                    <div className="space-y-0.5">
                      <h4 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] group-hover:text-[#666cff] transition-colors">
                        تست ۴- ماندنی
                      </h4>
                      <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr text-right">
                        ۰۹:۰۰ – ۱۰:۰۰
                      </p>
                    </div>
                  </div>

                  <div className="text-left font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                    <span>تست جلسه رترو · ۲ نفر</span>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedMeeting(meetings[1])}
                  className="rounded-[16px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50 dark:hover:border-[#42455f] p-4 flex items-center justify-between transition-all cursor-pointer shadow-xs dark:shadow-sm relative overflow-hidden group hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-[#22c55e]" />
                    <div className="space-y-0.5">
                      <h4 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] group-hover:text-[#666cff] transition-colors">
                        تست ۵- ماندنی
                      </h4>
                      <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr text-right">
                        ۱۱:۰۰ – ۱۲:۰۰
                      </p>
                    </div>
                  </div>

                  <div className="text-left font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                    <span>تست جلسه آنبوردینگ · ۱ نفر</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e0e2ec] dark:border-[#3d3f59] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                    ۱۴۰۵ آبان ۱۱، دوشنبه
                  </h3>
                  <span className="text-xs text-[#62657a] dark:text-[#8386a1]">۳ جلسه</span>
                </div>

                <div
                  onClick={() => setSelectedMeeting(meetings[2])}
                  className="rounded-[16px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50 dark:hover:border-[#42455f] p-4 flex items-center justify-between transition-all cursor-pointer shadow-xs dark:shadow-sm relative overflow-hidden group hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-[#3b82f6]" />
                    <div className="space-y-0.5">
                      <h4 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] group-hover:text-[#666cff] transition-colors">
                        جلسه استندآپ روزانه پلتفرم
                      </h4>
                      <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr text-right">
                        ۱۰:۰۰ – ۱۰:۳۰
                      </p>
                    </div>
                  </div>

                  <div className="text-left font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                    <span>تست جلسه روزانه · ۶ نفر</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#e0e2ec] dark:border-[#3d3f59] text-right">
                <button
                  onClick={() => setIsUnavailableModalOpen(true)}
                  className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] hover:text-[#666cff] transition-colors cursor-pointer"
                >
                  زمان‌های عدم دسترسی من
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: سال (Year View) */}
          {activeTab === 'year' && (
            <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] overflow-hidden p-6 space-y-6 min-h-[680px]">
              <div className="flex items-center justify-between border-b border-[#e0e2ec] dark:border-[#3d3f59] pb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setYearHalf(0)}
                    className={`px-4 py-1.5 rounded-[100px] text-xs font-medium transition-all cursor-pointer ${
                      yearHalf === 0
                        ? 'bg-[#666cff] text-white font-bold shadow-sm'
                        : 'bg-[#f4f5fa] dark:bg-[#34364d] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
                    }`}
                  >
                    نیمه اول سال (بهار و تابستان)
                  </button>
                  <button
                    onClick={() => setYearHalf(1)}
                    className={`px-4 py-1.5 rounded-[100px] text-xs font-medium transition-all cursor-pointer ${
                      yearHalf === 1
                        ? 'bg-[#666cff] text-white font-bold shadow-sm'
                        : 'bg-[#f4f5fa] dark:bg-[#34364d] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
                    }`}
                  >
                    نیمه دوم سال (پاییز و زمستان)
                  </button>
                </div>

                <span className="text-xs text-[#62657a] dark:text-[#8386a1] font-mono">سال ۱۴۰۵ هجری شمسی</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentHalfMonths.map((m, mIdx) => {
                  const daysArray = Array.from({ length: 42 }, (_, i) => {
                    const dayNum = i - m.startOffset + 1;
                    const isValid = dayNum >= 1 && dayNum <= m.daysCount;
                    const isFriday = i % 7 === 6;
                    const isCircled = isValid && dayNum === m.circledDay;
                    return { dayNum, isValid, isFriday, isCircled };
                  });

                  return (
                    <div
                      key={mIdx}
                      className="rounded-[20px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] p-4 flex flex-col justify-between space-y-3 shadow-xs"
                    >
                      <h4 className="text-center font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                        {m.name}
                      </h4>

                      <div className="grid grid-cols-7 text-center font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] border-b border-[#e0e2ec] dark:border-[#3d3f59] pb-1.5">
                        <span>ش</span>
                        <span>ی</span>
                        <span>د</span>
                        <span>س</span>
                        <span>چ</span>
                        <span>پ</span>
                        <span className="text-[#ef4444]">ج</span>
                      </div>

                      <div className="grid grid-cols-7 gap-y-1.5 text-center font-['Vazirmatn'] text-xs">
                        {daysArray.slice(0, 35).map((d, dIdx) => (
                          <div
                            key={dIdx}
                            onClick={() => {
                              if (d.isValid) {
                                setSelectedDay(d.dayNum);
                                setActiveTab('month');
                              }
                            }}
                            className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                              !d.isValid
                                ? 'text-transparent pointer-events-none'
                                : d.isCircled
                                ? 'bg-[#666cff] border-2 border-[#666cff] text-white font-bold shadow-sm'
                                : d.isFriday
                                ? 'text-[#ef4444] hover:bg-[#f4f5fa] dark:hover:bg-[#282a40]'
                                : 'text-[#1e1e2d] dark:text-[#8386a1] hover:text-[#666cff] dark:hover:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#282a40]'
                            }`}
                          >
                            {d.isValid ? toPersianDigits(d.dayNum) : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#e0e2ec] dark:border-[#3d3f59] text-right">
                <button
                  onClick={() => setIsUnavailableModalOpen(true)}
                  className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] hover:text-[#666cff] transition-colors cursor-pointer"
                >
                  زمان‌های عدم دسترسی من
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 
          ==================================================
          SIDEBAR COLUMN (Mini Calendar + Legend + Unavailability Button BELOW Legend)
          ================================================== 
        */}
        <div className="lg:col-span-3 space-y-6 text-right">
          {/* 1. Mini Calendar Card */}
          <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#e0e2ec] dark:border-[#3d3f59] pb-3">
              <button className="text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] p-1 cursor-pointer">
                <ChevronRight className="size-4" />
              </button>
              <h3 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
                آبان ۱۴۰۵
              </h3>
              <button className="text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] p-1 cursor-pointer">
                <ChevronLeft className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1] pb-1">
              <span>ش</span>
              <span>ی</span>
              <span>د</span>
              <span>س</span>
              <span>چ</span>
              <span>پ</span>
              <span className="text-[#ef4444]">ج</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-['Vazirmatn'] text-xs">
              {calendarGridRows.map((row) =>
                row.map((cell, idx) => {
                  const isSelected = cell.isCurrentMonth && cell.dayNum === selectedDay;
                  const hasEvent = cell.isCurrentMonth && meetings.some((m) => m.dayNumber === cell.dayNum);
                  const isUnavailDay = cell.isCurrentMonth && unavailableTimes.some((u) => u.dayNumber === cell.dayNum);

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (cell.isCurrentMonth) {
                          setSelectedDay(cell.dayNum);
                          if (cell.dayNum >= 2 && cell.dayNum <= 8) setWeekIndex(0);
                          else if (cell.dayNum >= 9 && cell.dayNum <= 15) setWeekIndex(1);
                          else if (cell.dayNum >= 16 && cell.dayNum <= 22) setWeekIndex(2);
                          else if (cell.dayNum >= 23 && cell.dayNum <= 29) setWeekIndex(3);
                        }
                      }}
                      className={`h-7 w-7 mx-auto rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#666cff] text-white font-bold shadow-md'
                          : cell.isCurrentMonth
                          ? 'text-[#1e1e2d] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]'
                          : 'text-[#cacede] dark:text-[#42455f]'
                      }`}
                    >
                      <span>{toPersianDigits(cell.dayNum)}</span>
                      {hasEvent && !isSelected && (
                        <span className="size-1 rounded-full bg-[#666cff] absolute bottom-0.5" />
                      )}
                      {isUnavailDay && !isSelected && (
                        <span className="size-1 rounded-full bg-[#f43f5e] absolute top-0.5" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* 2. راهنمای انواع جلسه (Meeting Types Legend with 5 colored dots) */}
          <div className="rounded-[24px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-xs dark:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-5 space-y-3">
            <h3 className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb]">
              انواع جلسه
            </h3>

            <div className="space-y-2.5 font-['Vazirmatn'] text-xs">
              <div className="flex items-center gap-2 text-[#62657a] dark:text-[#8386a1]">
                <span className="size-2 rounded-full bg-[#22c55e] shrink-0" />
                <span>تست جلسه آنبوردینگ</span>
              </div>
              <div className="flex items-center gap-2 text-[#62657a] dark:text-[#8386a1]">
                <span className="size-2 rounded-full bg-[#ea580c] shrink-0" />
                <span>تست جلسه رترو</span>
              </div>
              <div className="flex items-center gap-2 text-[#62657a] dark:text-[#8386a1]">
                <span className="size-2 rounded-full bg-[#3b82f6] shrink-0" />
                <span>تست جلسه روزانه</span>
              </div>
              <div className="flex items-center gap-2 text-[#62657a] dark:text-[#8386a1]">
                <span className="size-2 rounded-full bg-[#06b6d4] shrink-0" />
                <span>تست جلسه پلن</span>
              </div>
              <div className="flex items-center gap-2 text-[#62657a] dark:text-[#8386a1]">
                <span className="size-2 rounded-full bg-[#a855f7] shrink-0" />
                <span>تست جلسه گرومینگ</span>
              </div>
            </div>
          </div>

          {/* 
            3. ثبت زمان عدم دسترسی (BELOW انواع جلسه per user request!)
            با کلیک روی این دکمه مودال ثبت بازه عدم دسترسی باز می‌شود و ساعت ثبت می‌گردد.
          */}
          <button
            onClick={() => setIsUnavailableModalOpen(true)}
            className="w-full py-3 px-4 rounded-[16px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff] text-xs font-['Vazirmatn'] font-semibold text-[#1e1e2d] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#383b59] transition-all cursor-pointer shadow-xs text-center flex items-center justify-center gap-2 group"
          >
            <Clock className="size-4 text-[#62657a] dark:text-[#8386a1] group-hover:text-[#666cff] transition-colors" />
            <span>ثبت زمان عدم دسترسی</span>
          </button>

          {/* 4. Footer Timezone */}
          <div className="text-center font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#585b74]">
            تقویم شمسی · ساعت تهران
          </div>
        </div>
      </div>

      {/* 
        ===================================================================
        MODAL 1: ثبت زمان عدم دسترسی (Unavailability Modal)
        =================================================================== 
      */}
      {isUnavailableModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-w-lg w-full max-h-[90vh] flex flex-col text-right relative font-['Vazirmatn'] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Fixed Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  ثبت زمان عدم دسترسی
                </h3>
                <p className="text-xs text-[#62657a] dark:text-[#8386a1]">
                  همه تاریخ‌ها شمسی و ساعت‌ها به وقت تهران هستند.
                </p>
              </div>

              <button
                onClick={() => setIsUnavailableModalOpen(false)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form id="unavailForm" onSubmit={handleAddUnavailableSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              <p className="text-xs text-[#62657a] dark:text-[#8386a1] leading-relaxed">
                در این بازه برای دیگران مشغول نمایش داده می‌شوید. این ثبت، درخواست یا تأیید مرخصی اداری نیست.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  عنوان خصوصی
                </label>
                <input
                  type="text"
                  required
                  value={unavailPrivateTitle}
                  onChange={(e) => setUnavailPrivateTitle(e.target.value)}
                  className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-4 outline-none font-['Vazirmatn'] transition-all"
                />
              </div>

              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    تاریخ شروع
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={unavailStartDate}
                      onChange={(e) => setUnavailStartDate(e.target.value)}
                      className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none font-['Vazirmatn']"
                    />
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1]" />
                  </div>
                </div>

                <div className="col-span-4 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    ساعت شروع
                  </label>
                  <input
                    type="text"
                    value={unavailStartTime}
                    onChange={(e) => setUnavailStartTime(e.target.value)}
                    placeholder="۱۳:۰۰"
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-3 outline-none font-['Vazirmatn'] text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    تاریخ پایان
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={unavailEndDate}
                      onChange={(e) => setUnavailEndDate(e.target.value)}
                      className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none font-['Vazirmatn']"
                    />
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1]" />
                  </div>
                </div>

                <div className="col-span-4 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    ساعت پایان
                  </label>
                  <input
                    type="text"
                    value={unavailEndTime}
                    onChange={(e) => setUnavailEndTime(e.target.value)}
                    placeholder="۱۵:۰۰"
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-3 outline-none font-['Vazirmatn'] text-center"
                  />
                </div>
              </div>

              <p className="text-[11px] text-[#62657a] dark:text-[#585b74] leading-relaxed">
                ساعت‌ها به صورت ۲۴ ساعته و به وقت تهران هستند؛ برای نمونه ۱۰:۰۰ تا ۱۱:۰۰.
              </p>
            </form>

            {/* Modal Fixed Footer with Purple Button */}
            <div className="flex items-center justify-start gap-3 p-4 sm:px-6 border-t border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <button
                type="submit"
                form="unavailForm"
                className="bg-[#666cff] hover:bg-[#575ce6] text-white rounded-[100px] h-[40px] px-8 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                ثبت بازه
              </button>
              <button
                type="button"
                onClick={() => setIsUnavailableModalOpen(false)}
                className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-[100px] h-[40px] px-6 text-xs font-medium transition-all cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 
        ===================================================================
        MODAL 2: جلسه جدید (Purple Button + Fixed overflow)
        =================================================================== 
      */}
      {isCreateMeetingOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-w-xl w-full max-h-[90vh] flex flex-col text-right relative font-['Vazirmatn'] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Fixed Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  جلسه جدید
                </h3>
                <p className="text-xs text-[#62657a] dark:text-[#8386a1]">
                  همه تاریخ‌ها شمسی و ساعت‌ها به وقت تهران هستند.
                </p>
              </div>

              <button
                onClick={() => setIsCreateMeetingOpen(false)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form id="createMeetingForm" onSubmit={handleCreateMeetingSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {/* موضوع جلسه */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  موضوع جلسه
                </label>
                <input
                  type="text"
                  required
                  placeholder="[موضوع جلسه یا رویداد را انتخاب کنید]"
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#42455f] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#a0a2b1] dark:placeholder-[#585b74] px-4 outline-none font-['Vazirmatn'] transition-all"
                />
              </div>

              {/* پروژه تیم */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  پروژه تیم
                </label>
                <div className="relative">
                  <select
                    value={newMeetingProject}
                    onChange={(e) => setNewMeetingProject(e.target.value)}
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none appearance-none font-['Vazirmatn'] cursor-pointer"
                  >
                    <option value="تست - پروژه پورتال">تست - پروژه پورتال</option>
                    <option value="پلتفرم هسته الگونت">پلتفرم هسته الگونت</option>
                    <option value="زیرساخت ابری و کوبرنتیز">زیرساخت ابری و کوبرنتیز</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1] pointer-events-none" />
                </div>
              </div>

              {/* نوع جلسه */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  نوع جلسه
                </label>
                <div className="relative">
                  <select
                    value={newMeetingCategoryType}
                    onChange={(e) => setNewMeetingCategoryType(e.target.value)}
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none appearance-none font-['Vazirmatn'] cursor-pointer"
                  >
                    <option value="تست و جلسه گروه رنگ">تست و جلسه گروه رنگ</option>
                    <option value="تست جلسه آنبوردینگ">تست جلسه آنبوردینگ</option>
                    <option value="تست جلسه رترو">تست جلسه رترو</option>
                    <option value="تست جلسه روزانه">تست جلسه روزانه</option>
                    <option value="تست جلسه پلن">تست جلسه پلن</option>
                    <option value="تست جلسه گرومینگ">تست جلسه گرومینگ</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1] pointer-events-none" />
                </div>
              </div>

              {/* تاریخ شروع + ساعت شروع */}
              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    تاریخ شروع
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newMeetingStartDate}
                      onChange={(e) => setNewMeetingStartDate(e.target.value)}
                      className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none font-['Vazirmatn']"
                    />
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1]" />
                  </div>
                </div>

                <div className="col-span-4 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    ساعت شروع
                  </label>
                  <input
                    type="text"
                    value={newMeetingStartTime}
                    onChange={(e) => setNewMeetingStartTime(e.target.value)}
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-3 outline-none font-['Vazirmatn'] text-center"
                  />
                </div>
              </div>

              {/* تاریخ پایان + ساعت پایان */}
              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    تاریخ پایان
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newMeetingEndDate}
                      onChange={(e) => setNewMeetingEndDate(e.target.value)}
                      className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none font-['Vazirmatn']"
                    />
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1]" />
                  </div>
                </div>

                <div className="col-span-4 space-y-1.5">
                  <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                    ساعت پایان
                  </label>
                  <input
                    type="text"
                    value={newMeetingEndTime}
                    onChange={(e) => setNewMeetingEndTime(e.target.value)}
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-3 outline-none font-['Vazirmatn'] text-center"
                  />
                </div>
              </div>

              {/* Helper text & + افزودن دسته‌بندی */}
              <div className="flex items-center justify-between text-[11px] text-[#62657a] dark:text-[#585b74]">
                <span>ساعت‌ها به صورت ۲۴ ساعته و به وقت تهران هستند؛ برای نمونه ۱۰:۰۰ تا ۱۱:۰۰.</span>
                <button type="button" className="text-[#8386a1] hover:text-[#666cff] cursor-pointer">
                  + افزودن دسته‌بندی
                </button>
              </div>

              {/* برگزارکننده (مدیر) */}
              <div className="space-y-1">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  برگزارکننده (مدیر)
                </label>
                <p className="text-xs text-[#62657a] dark:text-[#8386a1] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[14px] p-3">
                  {newMeetingOrganizer}
                </p>
              </div>

              {/* افزودن همکار */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-[14px] bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] cursor-pointer transition-colors"
                  >
                    <UserPlus className="size-4 text-[#8386a1]" />
                    <span>افزودن همکار</span>
                  </button>

                  <button type="button" className="text-xs text-[#8386a1] hover:text-[#666cff] cursor-pointer">
                    👥 بررسی عدم دسترسی همکاران
                  </button>
                </div>
                <p className="text-[11px] text-[#62657a] dark:text-[#585b74]">
                  فقط همکارانی در دسترس باشند قابل دعوت هستند.
                </p>
              </div>

              {/* محل برگزاری یا پیوند جلسه */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  محل برگزاری یا پیوند جلسه
                </label>
                <input
                  type="text"
                  value={newMeetingLocation}
                  onChange={(e) => setNewMeetingLocation(e.target.value)}
                  placeholder="مثلاً https://meet.algonet.ir/room-1 یا سالن کنفرانس طبقه ۴"
                  className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#a0a2b1] dark:placeholder-[#585b74] px-4 outline-none font-['Vazirmatn']"
                />
              </div>

              {/* توضیحات / دستور جلسه */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  توضیحات / دستور جلسه
                </label>
                <textarea
                  rows={3}
                  value={newMeetingNotes}
                  onChange={(e) => setNewMeetingNotes(e.target.value)}
                  className="w-full p-3 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#a0a2b1] dark:placeholder-[#585b74] outline-none font-['Vazirmatn'] resize-y"
                />
              </div>

              {/* تکرار */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  تکرار
                </label>
                <div className="relative">
                  <select
                    value={newMeetingRepeat}
                    onChange={(e) => setNewMeetingRepeat(e.target.value)}
                    className="w-full h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] text-xs text-[#1e1e2d] dark:text-[#eaeafb] pr-4 pl-10 outline-none appearance-none font-['Vazirmatn'] cursor-pointer"
                  >
                    <option value="تکرار نشود">تکرار نشود</option>
                    <option value="روزانه">روزانه</option>
                    <option value="هفتگی در همین روز">هفتگی در همین روز</option>
                    <option value="ماهانه">ماهانه</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8386a1] pointer-events-none" />
                </div>
              </div>

              {/* چک‌باکس تایید اعلان‌ها */}
              <label className="flex items-start gap-2.5 p-3 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMeetingConfirmEmail}
                  onChange={(e) => setNewMeetingConfirmEmail(e.target.checked)}
                  className="size-4 mt-0.5 rounded accent-[#666cff]"
                />
                <div className="space-y-0.5 text-right">
                  <span className="text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb]">
                    ارسال اعلان‌های ایمیل/پیام برای جلسه را تأیید می‌کنم
                  </span>
                  <p className="text-[11px] text-[#62657a] dark:text-[#8386a1]">
                    یادآوری و خلاصه روزانه هم بر اساس این فیلدهای تقویم شما برای همکاران ارسال می‌شود.
                  </p>
                </div>
              </label>
            </form>

            {/* Modal Fixed Footer with Brand Purple Button */}
            <div className="flex items-center justify-start gap-3 p-4 sm:px-6 border-t border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <button
                type="submit"
                form="createMeetingForm"
                className="bg-[#666cff] hover:bg-[#575ce6] text-white rounded-[100px] h-[40px] px-8 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                ذخیره
              </button>
              <button
                type="button"
                onClick={() => setIsCreateMeetingOpen(false)}
                className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-[100px] h-[40px] px-6 text-xs font-medium transition-all cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 
        ===================================================================
        MODAL 3: تنظیمات یادآوری من
        =================================================================== 
      */}
      {isReminderSettingsOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-w-lg w-full max-h-[90vh] flex flex-col text-right relative font-['Vazirmatn'] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Fixed Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  تنظیمات یادآوری من
                </h3>
                <p className="text-xs text-[#62657a] dark:text-[#8386a1]">
                  همه تاریخ‌ها شمسی و ساعت‌ها به وقت تهران هستند.
                </p>
              </div>

              <button
                onClick={() => setIsReminderSettingsOpen(false)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              <p className="text-xs text-[#62657a] dark:text-[#8386a1] leading-relaxed">
                این تنظیمات فقط برای حساب شماست و با بسته بودن مرورگر نیز اجرا می‌شود.
              </p>

              {/* روش دریافت */}
              <div className="space-y-2">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  روش دریافت
                </label>
                <div className="flex items-center gap-6 text-xs text-[#1e1e2d] dark:text-[#eaeafb]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remindMethodSms}
                      onChange={(e) => setRemindMethodSms(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>پیامک</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remindMethodMattermost}
                      onChange={(e) => setRemindMethodMattermost(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>مترموست</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remindMethodEmail}
                      onChange={(e) => setRemindMethodEmail(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>ایمیل</span>
                  </label>
                </div>
              </div>

              {/* پیش از هر جلسه */}
              <div className="space-y-2">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  پیش از هر جلسه
                </label>
                <div className="grid grid-cols-3 gap-y-3 gap-x-4 text-xs text-[#1e1e2d] dark:text-[#eaeafb]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remindStart}
                      onChange={(e) => setRemindStart(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>زمان شروع</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remind5Min}
                      onChange={(e) => setRemind5Min(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>۵ دقیقه قبل</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remind10Min}
                      onChange={(e) => setRemind10Min(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>۱۰ دقیقه قبل</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remind15Min}
                      onChange={(e) => setRemind15Min(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>۱۵ دقیقه قبل</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remind20Min}
                      onChange={(e) => setRemind20Min(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>۲۰ دقیقه قبل</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remind60Min}
                      onChange={(e) => setRemind60Min(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>۶۰ دقیقه قبل</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remind1440Min}
                      onChange={(e) => setRemind1440Min(e.target.checked)}
                      className="size-4 rounded accent-[#666cff]"
                    />
                    <span>۱,۴۴۰ دقیقه قبل</span>
                  </label>
                </div>
              </div>

              {/* زمان دلخواه به دقیقه */}
              <div className="space-y-2">
                <label className="text-xs text-[#62657a] dark:text-[#8386a1] font-medium block">
                  زمان دلخواه به دقیقه
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage(`یادآوری ${toPersianDigits(customMinutes)} دقیقه قبل اضافه شد.`);
                      setTimeout(() => setToastMessage(''), 3000);
                    }}
                    className="px-5 h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff] text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb] cursor-pointer transition-colors"
                  >
                    افزودن
                  </button>
                  <input
                    type="number"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    className="flex-1 h-11 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] px-4 outline-none font-['Vazirmatn'] text-center"
                  />
                </div>
              </div>

              {/* خلاصه روزانه جلسات */}
              <div className="p-3 rounded-[14px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59]">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remindDailySummary}
                    onChange={(e) => setRemindDailySummary(e.target.checked)}
                    className="size-4 rounded accent-[#666cff]"
                  />
                  <span className="text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb]">
                    خلاصه روزانه جلسات
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Fixed Footer with Purple Button */}
            <div className="flex justify-start p-4 sm:px-6 border-t border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <button
                type="button"
                onClick={() => setIsReminderSettingsOpen(false)}
                className="bg-[#666cff] hover:bg-[#575ce6] text-white rounded-[100px] h-[40px] px-8 text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                ذخیره تنظیمات
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 
        ===================================================================
        MODAL 4: جزئیات جلسه (Meeting Details)
        =================================================================== 
      */}
      {selectedMeeting && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-w-lg w-full max-h-[90vh] flex flex-col text-right relative font-['Vazirmatn'] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              <div className="space-y-1">
                <span
                  style={{ backgroundColor: `${selectedMeeting.color}15`, color: selectedMeeting.color, borderColor: `${selectedMeeting.color}35` }}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border inline-block"
                >
                  {selectedMeeting.categoryLabel}
                </span>

                <h3 className="font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb] pt-1">
                  {selectedMeeting.title}
                </h3>

                <p className="text-xs text-[#62657a] dark:text-[#8386a1]">
                  زمان: {toPersianDigits(selectedMeeting.dayNumber)} آبان ۱۴۰۵ · ساعت {toPersianDigits(selectedMeeting.time)} تا {toPersianDigits(selectedMeeting.endTime || '۱۲:۰۰')}
                </p>
              </div>

              <button
                onClick={() => setSelectedMeeting(null)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
              <div className="p-4 rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[#62657a] dark:text-[#8386a1]">
                  <span>محل برگزاری / پیوند:</span>
                  <span className="text-[#1e1e2d] dark:text-[#eaeafb] font-semibold flex items-center gap-1.5">
                    <Video className="size-3.5 text-[#666cff]" />
                    {selectedMeeting.room}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#62657a] dark:text-[#8386a1]">
                  <span>برگزارکننده:</span>
                  <span className="text-[#1e1e2d] dark:text-[#eaeafb] font-semibold">{selectedMeeting.organizer}</span>
                </div>
                <div className="flex items-center justify-between text-[#62657a] dark:text-[#8386a1]">
                  <span>تعداد شرکت‌کنندگان:</span>
                  <span className="text-[#1e1e2d] dark:text-[#eaeafb] font-semibold">{toPersianDigits(selectedMeeting.attendeesCount)} نفر</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 sm:px-6 border-t border-[#e0e2ec] dark:border-[#3d3f59] shrink-0 bg-white dark:bg-[#30334e]">
              {selectedMeeting.meetUrl ? (
                <a
                  href={selectedMeeting.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#666cff] hover:bg-[#575ce6] text-white rounded-[100px] h-[38px] px-5 text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <Video className="size-4" />
                  <span>ورود به اتاق Meet</span>
                </a>
              ) : <div />}

              <button
                onClick={() => setSelectedMeeting(null)}
                className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-[100px] h-[38px] px-5 text-xs font-medium transition-all cursor-pointer"
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
