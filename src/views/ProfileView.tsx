import React, { useState, useEffect } from 'react';
import { PortalNavId } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { CURRENT_USER } from '../data/mockData';
import { UserAvatar } from '../components/common/UserAvatar';
import { ChangeAvatarModal } from '../components/modals/ChangeAvatarModal';
import { ChangeLocationModal } from '../components/modals/ChangeLocationModal';
import {
  Lock,
  Image as ImageIcon,
  MapPin,
  RotateCw,
  ShieldAlert,
  Check,
  X,
  Upload,
  AlertCircle
} from 'lucide-react';

interface ProfileViewProps {
  onNavigate?: (navId: PortalNavId) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = () => {
  // Bio state & live counter
  const [bioText, setBioText] = useState<string>('');
  const [isBioSaving, setIsBioSaving] = useState<boolean>(false);
  const [bioSavedSuccess, setBioSavedSuccess] = useState<boolean>(false);

  // Service connection retry states
  const [retryingService, setRetryingService] = useState<string | null>(null);

  // Modals state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string>(() => {
    try {
      return localStorage.getItem('algonet_user_location') || 'دفتر مرکزی (تهران) · طبقه ۲';
    } catch {
      return 'دفتر مرکزی (تهران) · طبقه ۲';
    }
  });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [avatarImage, setAvatarImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('algonet_user_avatar');
    } catch {
      return null;
    }
  });

  // Sync cross-component location updates
  useEffect(() => {
    const handleLocationUpdate = () => {
      try {
        setCurrentLocation(localStorage.getItem('algonet_user_location') || 'دفتر مرکزی (تهران) · طبقه ۲');
      } catch {}
    };
    window.addEventListener('user-location-updated', handleLocationUpdate);
    return () => window.removeEventListener('user-location-updated', handleLocationUpdate);
  }, []);

  const handleUpdateAvatar = (img: string | null) => {
    setAvatarImage(img);
    try {
      if (img) {
        localStorage.setItem('algonet_user_avatar', img);
      } else {
        localStorage.removeItem('algonet_user_avatar');
      }
      window.dispatchEvent(new Event('user-avatar-updated'));
    } catch {
      // ignore
    }
  };

  // Handle bio save
  const handleSaveBio = () => {
    setIsBioSaving(true);
    setTimeout(() => {
      setIsBioSaving(false);
      setBioSavedSuccess(true);
      setTimeout(() => setBioSavedSuccess(false), 3000);
    }, 600);
  };

  // Handle retry connection
  const handleRetryConnection = (serviceName: string) => {
    setRetryingService(serviceName);
    setTimeout(() => {
      setRetryingService(null);
    }, 1200);
  };

  // Location options for modal
  const locationOptions = [
    'دفتر مرکزی (تهران) · طبقه ۲ - تیم پلتفرم',
    'دفتر مرکزی (تهران) · طبقه ۳ - توسعه نرم‌افزار',
    'دفتر ونک · واحد زیرساخت و دواپس',
    'شعبه اصفهان · مرکز نوآوری',
    'دورکاری (Remote)',
    'ثبت درخواست موقعیت مکانی جدید'
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200 select-none">
      {/* 
        ==================================================
        1. PAGE HEADER
        ================================================== 
      */}
      <div className="space-y-1">
        <h1 className="font-['Vazirmatn'] font-bold text-2xl text-[#eaeafb]">
          اطلاعات من
        </h1>
        <p className="font-['Vazirmatn'] text-xs text-[#8386a1] leading-relaxed max-w-3xl">
          اطلاعات هویتی از سامانه احراز هویت سازمان دریافت می‌شود. تغییر موقعیت مکانی به تنظیمات دسترسی سامانه بستگی دارد.
        </p>
      </div>

      {/* 
        ==================================================
        2. TOP PROFILE & CONNECTED ACCOUNTS CARD
        ================================================== 
      */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 space-y-6">
        {/* User Identity Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-right">
            <h2 className="font-['Vazirmatn'] font-bold text-[18px] sm:text-[20px] text-[#eaeafb] leading-tight">
              سیاوش بختیاری
            </h2>
            <span className="font-['Vazirmatn'] text-[13px] text-[#8386a1] font-medium mt-0.5 dir-ltr text-right">
              Siavash Bakhtiari
            </span>
            <span className="font-mono text-[11px] text-[#8386a1] mt-1 tracking-wide">
              portal-user
            </span>
          </div>

          {/* Modern User Avatar with Glow Aura & Edit Trigger */}
          <UserAvatar
            size="lg"
            src={avatarImage}
            interactive={true}
            onClick={() => setIsAvatarModalOpen(true)}
            showPresence={true}
            presenceStatus="present"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-[#3d3f59] w-full" />

        {/* Avatar Upload Prompt Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-right">
          <p className="font-['Vazirmatn'] text-[11px] text-[#8386a1] leading-relaxed">
            JPG, PNG یا WebP تا ۵ مگابایت، تصویر به‌صورت مربع از مرکز برش می‌خورد.
          </p>

          <button
            onClick={() => setIsAvatarModalOpen(true)}
            className="flex items-center gap-2 bg-[#34364d] hover:bg-[#383b59] border border-[#42455f] hover:border-[#666cff] text-[#eaeafb] rounded-[100px] h-[38px] px-4 text-xs font-['Vazirmatn'] font-medium transition-all duration-150 cursor-pointer shadow-sm group shrink-0"
          >
            <ImageIcon className="size-4 text-[#666cff] group-hover:scale-110 transition-transform" />
            <span>تغییر تصویر</span>
          </button>
        </div>

        {/* Connected Accounts 3-Column Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Box 1: GitLab */}
          <div className="rounded-[16px] bg-[#34364d] border border-[#3d3f59] p-4 flex items-center justify-between gap-3">
            <div className="flex flex-col text-right">
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb]">
                گیت‌لب
              </span>
              <span className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
                حساب متصل نشده
              </span>
            </div>

            <button
              onClick={() => handleRetryConnection('gitlab')}
              disabled={retryingService === 'gitlab'}
              className="flex items-center gap-1.5 rounded-[100px] bg-[#34364d] hover:bg-[#383b59] border border-[#42455f] hover:border-[#666cff] text-xs font-['Vazirmatn'] text-[#eaeafb] px-3.5 py-1.5 transition-all duration-150 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <RotateCw className={`size-3 text-[#666cff] ${retryingService === 'gitlab' ? 'animate-spin' : ''}`} />
              <span>تلاش مجدد</span>
            </button>
          </div>

          {/* Box 2: Messenger */}
          <div className="rounded-[16px] bg-[#34364d] border border-[#3d3f59] p-4 flex items-center justify-between gap-3">
            <div className="flex flex-col text-right">
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb]">
                پیام‌رسان
              </span>
              <span className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
                همگام نشده
              </span>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[11px] font-['Vazirmatn'] text-[#8386a1]">
              خودکار
            </span>
          </div>

          {/* Box 3: Project Management */}
          <div className="rounded-[16px] bg-[#34364d] border border-[#3d3f59] p-4 flex items-center justify-between gap-3">
            <div className="flex flex-col text-right">
              <span className="font-['Vazirmatn'] font-bold text-sm text-[#eaeafb]">
                مدیریت پروژه
              </span>
              <span className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
                حساب متصل نشده
              </span>
            </div>

            <button
              onClick={() => handleRetryConnection('pm')}
              disabled={retryingService === 'pm'}
              className="flex items-center gap-1.5 rounded-[100px] bg-[#34364d] hover:bg-[#383b59] border border-[#42455f] hover:border-[#666cff] text-xs font-['Vazirmatn'] text-[#eaeafb] px-3.5 py-1.5 transition-all duration-150 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <RotateCw className={`size-3 text-[#666cff] ${retryingService === 'pm' ? 'animate-spin' : ''}`} />
              <span>تلاش مجدد</span>
            </button>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        3. TWO COLUMNS GRID:
           Right: Identity Information (اطلاعات هویتی)
           Left: Location (موقعیت مکانی) + Bio (بایو) + Insurance (بیمه)
        ================================================== 
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT COLUMN: اطلاعات هویتی (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 space-y-4">
            {/* Header */}
            <div className="border-b border-[#3d3f59] pb-4 text-right">
              <h2 className="font-['Vazirmatn'] font-bold text-lg text-[#eaeafb]">
                اطلاعات هویتی
              </h2>
              <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
                دریافت‌شده از سامانه هویت سازمان
              </p>
            </div>

            {/* Fields List (Each row with lock indicator & subtle divider) */}
            <div className="divide-y divide-[#34364d] text-right">
              {/* 1. نام و نام خانوادگی */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  نام و نام خانوادگی
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#eaeafb]">
                  سیاوش بختیاری
                </span>
              </div>

              {/* 2. نام لاتین */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  نام لاتین
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#eaeafb] dir-ltr text-right">
                  Siavash Bakhtiari
                </span>
              </div>

              {/* 3. نام کاربری */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  نام کاربری
                </span>
                <span className="font-mono text-sm text-[#eaeafb] dir-ltr text-right font-medium">
                  s.bakhtiari
                </span>
              </div>

              {/* 4. ایمیل سازمانی */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  ایمیل سازمانی
                </span>
                <span className="font-['Vazirmatn'] text-sm text-[#eaeafb] dir-ltr text-right font-medium">
                  {CURRENT_USER.email}
                </span>
              </div>

              {/* 5. کد پرسنلی */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  کد پرسنلی
                </span>
                <span className="font-mono text-sm text-[#eaeafb] font-semibold">
                  10024
                </span>
              </div>

              {/* 6. کد ملی */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  کد ملی
                </span>
                <span className="font-mono text-sm text-[#eaeafb] font-semibold">
                  0022713328
                </span>
              </div>

              {/* 7. شماره موبایل */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  شماره موبایل
                </span>
                <span className="font-mono text-sm text-[#eaeafb] dir-ltr text-right font-medium">
                  09390550629
                </span>
              </div>

              {/* 9. تاریخ تولد */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  تاریخ تولد
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#eaeafb]">
                  ۱۷ آذر ۱۳۷۸
                </span>
              </div>

              {/* 10. تاریخ شروع همکاری */}
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  تاریخ شروع همکاری
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#eaeafb]">
                  ۲ اسفند ۱۴۰۴
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: موقعیت مکانی + بایو + بیمه (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: موقعیت مکانی */}
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 space-y-4">
            <div className="text-right">
              <h2 className="font-['Vazirmatn'] font-bold text-base text-[#eaeafb] flex items-center gap-2">
                <MapPin className="size-4 text-[#666cff]" />
                موقعیت مکانی
              </h2>
              <p className="font-['Vazirmatn'] text-[11px] text-[#8386a1] leading-relaxed mt-1.5">
                تنظیم موقعیت مکانی در برخی سرویس‌ها از جمله الگتریا مورد استفاده قرار می‌گیرد لذا در تغییر آن اطمینان حاصل کنید
              </p>
            </div>

            {/* Current Location Box */}
            <div className="rounded-[16px] bg-[#34364d] border border-[#3d3f59] p-4 text-right">
              <span className="font-['Vazirmatn'] text-xs text-[#8386a1] block font-medium">
                گروه مکانی فعلی
              </span>
              <p className="font-['Vazirmatn'] text-sm text-[#eaeafb] font-semibold mt-1.5">
                {currentLocation}
              </p>
            </div>

            {/* Action button */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="bg-[#34364d] hover:bg-[#383b59] border border-[#42455f] hover:border-[#666cff] text-[#eaeafb] rounded-[100px] h-[38px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all duration-150 cursor-pointer shadow-sm"
              >
                تغییر موقعیت مکانی
              </button>
            </div>
          </div>

          {/* Card 2: بایو */}
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 space-y-4">
            <div className="text-right">
              <h2 className="font-['Vazirmatn'] font-bold text-base text-[#eaeafb]">
                بایو
              </h2>
              <p className="font-['Vazirmatn'] text-[11px] text-[#8386a1] mt-1">
                این متن در سرویس‌های سازمانی دیگر نیز نمایش داده می‌شود.
              </p>
            </div>

            <div className="space-y-1.5 text-right">
              <label htmlFor="user-bio" className="font-['Vazirmatn'] text-xs text-[#8386a1] font-medium block">
                درباره من
              </label>

              <textarea
                id="user-bio"
                maxLength={280}
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                placeholder="مثلاً: مهندس نرم‌افزار در تیم پلتفرم"
                rows={3}
                className="w-full rounded-[16px] bg-[rgba(13,14,20,0.9)] border border-[#42455f] focus:border-2 focus:border-[#666cff] text-sm text-[#eaeafb] placeholder:text-[#585b74] p-3.5 outline-none font-['Vazirmatn'] resize-none transition-all duration-150"
              />
            </div>

            {/* Counter & Submit Button */}
            <div className="flex items-center justify-between pt-1">
              {/* Character counter (e.g. 0/280) */}
              <span className="font-['Vazirmatn'] text-xs text-[#8386a1] font-mono">
                {toPersianDigits(bioText.length)}/۲۸۰
              </span>

              <button
                onClick={handleSaveBio}
                disabled={isBioSaving}
                className="flex items-center gap-2 bg-[#666cff] hover:bg-[#a682ff] text-[#17111f] font-['Vazirmatn'] font-medium text-xs rounded-[100px] h-[38px] px-5 shadow-[0_2px_12px_rgba(183,154,255,0.25)] transition-all duration-150 cursor-pointer disabled:opacity-50"
              >
                {isBioSaving ? (
                  <RotateCw className="size-3.5 animate-spin" />
                ) : bioSavedSuccess ? (
                  <Check className="size-3.5" />
                ) : null}
                <span>{bioSavedSuccess ? 'ذخیره شد' : 'ذخیره تغییرات'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: بیمه */}
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 space-y-3">
            <h2 className="font-['Vazirmatn'] font-bold text-base text-[#eaeafb] border-b border-[#3d3f59] pb-3 text-right">
              بیمه
            </h2>

            <div className="divide-y divide-[#34364d] text-right">
              {/* بیمه اصلی */}
              <div className="py-3 flex items-center justify-between">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  بیمه اصلی
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#eaeafb]">
                  ندارد
                </span>
              </div>

              {/* بیمه تکمیلی */}
              <div className="py-3 flex items-center justify-between">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  بیمه تکمیلی
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#eaeafb]">
                  ندارد
                </span>
              </div>

              {/* اعتبار بیمه تکمیلی */}
              <div className="py-3 flex items-center justify-between">
                <span className="font-['Vazirmatn'] text-xs text-[#8386a1] flex items-center gap-1.5">
                  <Lock className="size-3 text-[#585b74]" />
                  اعتبار بیمه تکمیلی
                </span>
                <span className="font-['Vazirmatn'] font-semibold text-sm text-[#8386a1]">
                  —
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ==================================================
        4. BOTTOM SECTION: دستگاه‌های من در شبکه
        ================================================== 
      */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.45)] p-6 sm:p-7 space-y-4">
        {/* Header */}
        <div className="text-right">
          <h2 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#eaeafb]">
            دستگاه‌های من در شبکه
          </h2>
          <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
            دستگاه‌هایی که با گواهی معتبر به نام شما ثبت شده‌اند.
          </p>
        </div>

        {/* Warning Alert Banner (Figma AlgonetAlertError / Banner Tone) */}
        <div className="rounded-[16px] bg-[rgba(36,18,23,0.9)] border border-[rgba(191,71,92,0.35)] p-4 sm:p-5 flex items-start gap-3.5 text-right shadow-sm">
          <ShieldAlert className="size-5 text-[#ea5455] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-['Vazirmatn'] font-bold text-xs sm:text-sm text-[#ea5455]">
              هیچ دستگاه معتبری به نام شما ثبت نشده است.
            </h3>
            <p className="font-['Vazirmatn'] text-xs text-[#ea5455]/85 leading-relaxed">
              هیچ دستگاهی در شبکه با گواهی معتبر به نام شما وجود ندارد. لطفاً هرچه سریع‌تر به واحد فناوری اطلاعات مراجعه کنید.
            </p>
          </div>
        </div>

        {/* Empty state bottom text */}
        <div className="py-4 text-center">
          <p className="font-['Vazirmatn'] text-xs text-[#8386a1] font-medium">
            دستگاهی برای نمایش وجود ندارد.
          </p>
        </div>
      </div>

      {/* 
        ==================================================
        5. MODALS: موقعیت مکانی و تصویر آواتار (مرکز صفحه با پس‌زمینه بلور)
        ================================================== 
      */}
      <ChangeLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        locations={locationOptions}
        onSaveLocation={(newLoc) => {
          setCurrentLocation(newLoc);
          try {
            localStorage.setItem('algonet_user_location', newLoc);
            window.dispatchEvent(new Event('user-location-updated'));
          } catch {}
        }}
      />

      <ChangeAvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={avatarImage}
        onSaveAvatar={(newImg) => handleUpdateAvatar(newImg)}
      />
    </div>
  );
};
