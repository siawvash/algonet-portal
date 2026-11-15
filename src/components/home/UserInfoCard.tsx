import React from 'react';
import { CURRENT_USER } from '../../data/mockData';
import { toPersianDigits } from '../../utils/formatters';
import { UserAvatar } from '../common/UserAvatar';
import {
  Mail,
  Hash,
  MapPin,
  Briefcase,
  Sparkles,
  Camera
} from 'lucide-react';

interface UserInfoCardProps {
  onNavigateProfile?: () => void;
  onOpenAvatarModal?: () => void;
  onOpenLocationModal?: () => void;
  currentLocation?: string;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({
  onNavigateProfile,
  onOpenAvatarModal,
  onOpenLocationModal,
  currentLocation = 'دفتر مرکزی (تهران) · طبقه ۲'
}) => {
  return (
    <section
      aria-label="اطلاعات هویتی و پرسنلی کاربر"
      className="relative w-full rounded-[20px] sm:rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e0e8] dark:border-[#3d3f59] shadow-[0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.12)] p-3.5 sm:p-6 md:p-8 text-[#19191f] dark:text-[#eaeafb] overflow-hidden select-none"
    >
      {/* Background subtle brand accent blur */}
      <div
        className="absolute -top-12 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-[#666cff]/15 via-[#666cff]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 left-12 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-tr from-[#666cff]/10 via-[#28c76f]/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-3 sm:space-y-5">
        {/* ========================================================
            ROW 1: Identity Header + Status Indicators (Compact on mobile)
            ======================================================== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5">
          {/* Right Section (in RTL): Avatar + Name + Username */}
          <div className="flex items-center gap-3 sm:gap-4.5">
            {/* Clickable Avatar with Camera Edit Badge */}
            <div
              className="relative group cursor-pointer"
              onClick={onOpenAvatarModal || onNavigateProfile}
              title="تغییر تصویر پروفایل"
            >
              <UserAvatar
                size="lg"
                showPresence={true}
                presenceStatus="present"
                interactive={true}
              />
              <div
                className="absolute -bottom-1 -left-1 size-6 sm:size-7 rounded-full bg-[#666cff] text-white flex items-center justify-center shadow-md border-2 border-white dark:border-[#30334e] group-hover:scale-110 active:scale-90 transition-all cursor-pointer"
                title="تغییر تصویر"
              >
                <Camera className="size-3 sm:size-3.5" />
              </div>
            </div>

            <div className="space-y-1 text-right">
              <h1 className="font-['Vazirmatn'] font-bold text-base sm:text-xl md:text-2xl text-[#19191f] dark:text-[#eaeafb] leading-tight">
                {CURRENT_USER.name}
              </h1>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="font-mono text-[11px] sm:text-xs text-[#666cff] dark:text-[#8c90ff] bg-[#f0eaff] dark:bg-[#34364d] px-2 py-0.5 rounded-md dir-ltr border border-[#ddd6fe] dark:border-[#42455f] font-medium">
                  @{CURRENT_USER.username}
                </span>
              </div>
            </div>
          </div>

          {/* Left Section (in RTL): Status Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-stretch sm:self-auto pt-1 sm:pt-0">
            {/* Status Pill: حاضر در سازمان */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4f4f7] dark:bg-[#34364d] border border-[#e0e0e8] dark:border-[#42455f] text-[11px] sm:text-xs font-['Vazirmatn'] text-[#585866] dark:text-[#8386a1] font-medium shadow-sm">
              <span className="size-2 rounded-full bg-[#28c76f] shadow-[0_0_8px_#28c76f] animate-pulse" />
              <span>حاضر در سازمان</span>
            </div>

            {/* SSO Pill */}
            <span className="font-mono text-[10.5px] sm:text-xs text-[#585866] dark:text-[#8386a1] bg-[#f4f4f7] dark:bg-[#34364d] px-2.5 py-1 rounded-full border border-[#e0e0e8] dark:border-[#42455f]">
              SSO فعال
            </span>

            {/* Role Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4f4f7] dark:bg-[#34364d] border border-[#e0e0e8] dark:border-[#42455f] text-[11px] sm:text-xs font-['Vazirmatn'] font-medium text-[#19191f] dark:text-[#eaeafb] shadow-sm">
              <Sparkles className="size-3 text-[#666cff] dark:text-[#8c90ff]" />
              <span>{CURRENT_USER.role}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#e0e0e8] dark:via-[#3d3f59] to-transparent" />

        {/* ========================================================
            ROW 2: Detailed Information Grid (2 cols on mobile, 4 cols on desktop)
            ======================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
          {/* 1. Personnel Code */}
          <div className="p-2.5 sm:p-3.5 rounded-[14px] sm:rounded-[18px] bg-[#f7f7fa] dark:bg-[#34364d] border border-[#e0e0e8] dark:border-[#3d3f59] flex items-center gap-2.5 sm:gap-3 hover:border-[#666cff]/30 transition-colors group">
            <div className="size-8 sm:size-9 rounded-[10px] sm:rounded-[12px] bg-[#f0eaff] dark:bg-[#34364d] border border-[#ddd6fe] dark:border-[#42455f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Hash className="size-3.5 sm:size-4 text-[#666cff]" />
            </div>
            <div className="space-y-0.5 text-right min-w-0">
              <span className="text-[10px] sm:text-xs text-[#787785] dark:text-[#8386a1] font-['Vazirmatn'] block">
                کد پرسنلی
              </span>
              <span className="font-['Vazirmatn'] text-xs sm:text-sm font-bold tabular-nums text-[#1e1e2d] dark:text-[#eaeafb] block">
                {toPersianDigits('10024')}
              </span>
            </div>
          </div>

          {/* 2. Organization Email */}
          <div className="p-2.5 sm:p-3.5 rounded-[14px] sm:rounded-[18px] bg-[#f7f7fa] dark:bg-[#34364d] border border-[#e0e0e8] dark:border-[#3d3f59] flex items-center gap-2.5 sm:gap-3 hover:border-[#666cff]/30 transition-colors group">
            <div className="size-8 sm:size-9 rounded-[10px] sm:rounded-[12px] bg-[#f0eaff] dark:bg-[#34364d] border border-[#ddd6fe] dark:border-[#42455f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="size-3.5 sm:size-4 text-[#666cff]" />
            </div>
            <div className="space-y-0.5 text-right min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs text-[#787785] dark:text-[#8386a1] font-['Vazirmatn'] block">
                ایمیل سازمانی
              </span>
              <span className="font-['Vazirmatn'] text-[11px] sm:text-xs font-semibold text-[#1e1e2d] dark:text-[#eaeafb] block truncate dir-ltr text-right" title={CURRENT_USER.email}>
                {CURRENT_USER.email}
              </span>
            </div>
          </div>

          {/* 3. Department */}
          <div className="p-2.5 sm:p-3.5 rounded-[14px] sm:rounded-[18px] bg-[#f7f7fa] dark:bg-[#34364d] border border-[#e0e0e8] dark:border-[#3d3f59] flex items-center gap-2.5 sm:gap-3 hover:border-[#666cff]/30 transition-colors group">
            <div className="size-8 sm:size-9 rounded-[10px] sm:rounded-[12px] bg-[#f0eaff] dark:bg-[#34364d] border border-[#ddd6fe] dark:border-[#42455f] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Briefcase className="size-3.5 sm:size-4 text-[#666cff]" />
            </div>
            <div className="space-y-0.5 text-right min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs text-[#787785] dark:text-[#8386a1] font-['Vazirmatn'] block">
                واحد سازمانی
              </span>
              <span className="font-['Vazirmatn'] text-[11px] sm:text-xs font-semibold text-[#1e1e2d] dark:text-[#eaeafb] block truncate" title="تیم مهندسی پلتفرم و زیرساخت ابری">
                پلتفرم و زیرساخت
              </span>
            </div>
          </div>

          {/* 4. Location (Clickable to change location in modal) */}
          <div
            onClick={onOpenLocationModal}
            className="p-2.5 sm:p-3.5 rounded-[14px] sm:rounded-[18px] bg-[#f7f7fa] dark:bg-[#34364d] border border-[#e0e0e8] dark:border-[#3d3f59] flex items-center gap-2.5 sm:gap-3 hover:border-[#666cff] hover:shadow-sm transition-all group cursor-pointer active:scale-[0.98] select-none"
            title="کلیک برای تغییر موقعیت مکانی"
          >
            <div className="size-8 sm:size-9 rounded-[10px] sm:rounded-[12px] bg-[#f0eaff] dark:bg-[#34364d] border border-[#ddd6fe] dark:border-[#42455f] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#666cff] group-hover:text-white transition-all">
              <MapPin className="size-3.5 sm:size-4 text-[#666cff] group-hover:text-white transition-colors" />
            </div>
            <div className="space-y-0.5 text-right min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-[#787785] dark:text-[#8386a1] font-['Vazirmatn'] block">
                  موقعیت مکانی
                </span>
                <span className="text-[9px] font-['Vazirmatn'] text-[#666cff] dark:text-[#8c90ff] opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  تغییر
                </span>
              </div>
              <span className="font-['Vazirmatn'] text-[11px] sm:text-xs font-semibold text-[#1e1e2d] dark:text-[#eaeafb] block truncate" title={currentLocation}>
                {currentLocation}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
