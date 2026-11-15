import React, { useEffect, useState } from 'react';
import { X, Upload, Camera, Trash2, Check } from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';

interface ChangeAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string | null;
  onSaveAvatar: (newAvatar: string | null) => void;
}

export const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSaveAvatar
}) => {
  const [preview, setPreview] = useState<string | null>(currentAvatar);

  useEffect(() => {
    setPreview(currentAvatar);
  }, [currentAvatar, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onSaveAvatar(result);
      try {
        localStorage.setItem('algonet_user_avatar', result);
        window.dispatchEvent(new Event('user-avatar-updated'));
      } catch {
        // ignore
      }
      onClose();
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onSaveAvatar(null);
    try {
      localStorage.removeItem('algonet_user_avatar');
      window.dispatchEvent(new Event('user-avatar-updated'));
    } catch {
      // ignore
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="تغییر تصویر پروفایل"
    >
      {/* Blurred Backdrop - بلور کل صفحه اصلی */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] sm:rounded-[32px] shadow-[0_24px_70px_rgba(0,0,0,0.35)] p-5 sm:p-7 max-w-md w-full space-y-6 text-right z-10 popover-morph"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20">
              <Camera className="size-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                تغییر تصویر پروفایل
              </h3>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                تصویر جدید برای حساب کاربری و نمایش در کل سامانه
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="بستن"
            title="بستن"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Current Preview */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          <div className="relative size-24 rounded-full ring-4 ring-[#666cff]/25 shadow-xl overflow-hidden bg-gradient-to-tr from-[#666cff] to-[#7c82ff] flex items-center justify-center text-white">
            {preview ? (
              <img
                src={preview}
                alt={CURRENT_USER.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold font-['Vazirmatn']">
                {CURRENT_USER.initials}
              </span>
            )}
          </div>
          <p className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1]">
            پیش‌نمایش تصویر شما
          </p>
        </div>

        {/* Upload Zone */}
        <label className="rounded-2xl border-2 border-dashed border-[#d0d2e0] dark:border-[#42455f] hover:border-[#666cff] bg-[#f8f9fd] dark:bg-[#282a40] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group space-y-2.5">
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
          <div className="size-12 rounded-2xl bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] flex items-center justify-center text-[#666cff] group-hover:scale-110 transition-transform shadow-sm">
            <Upload className="size-5" />
          </div>
          <div className="space-y-1">
            <p className="font-['Vazirmatn'] text-xs font-bold text-[#1e1e2d] dark:text-[#eaeafb]">
              برای انتخاب تصویر کلیک کنید یا عکس را بکشید
            </p>
            <p className="font-['Vazirmatn'] text-[11px] text-[#62657a] dark:text-[#8386a1]">
              پشتیبانی از JPG، PNG و WebP (حداکثر ۵ مگابایت)
            </p>
          </div>
        </label>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
          {preview ? (
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 text-xs font-['Vazirmatn'] text-[#ea5455] hover:text-[#d33a3b] transition-colors cursor-pointer py-1.5 px-2 rounded-lg hover:bg-[#ea5455]/10"
            >
              <Trash2 className="size-3.5" />
              <span>حذف تصویر فعلی</span>
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={onClose}
            className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-full h-[38px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer mr-auto"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};
