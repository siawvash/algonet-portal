import React, { useEffect } from 'react';
import { X, Check, MapPin } from 'lucide-react';

interface ChangeLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSaveLocation: (newLocation: string) => void;
  locations?: string[];
}

const DEFAULT_LOCATIONS = [
  'دفتر مرکزی (تهران) · طبقه ۲',
  'دفتر مرکزی (تهران) · طبقه ۳',
  'شعبه پارک فناوری پردیس',
  'دورکاری / هوم آفیس',
  'ماموریت کاری خارج از سازمان',
  'ثبت درخواست موقعیت مکانی جدید'
];

export const ChangeLocationModal: React.FC<ChangeLocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSaveLocation,
  locations = DEFAULT_LOCATIONS
}) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="تغییر موقعیت مکانی"
    >
      {/* Blurred Backdrop - بلور صفحه اصلی و تاریک‌سازی */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] sm:rounded-[32px] shadow-[0_24px_70px_rgba(0,0,0,0.35)] p-5 sm:p-7 max-w-lg w-full space-y-5 text-right z-10 popover-morph"
      >
        {/* Modal Heading */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-[#8c90ff] flex items-center justify-center shrink-0 border border-[#666cff]/20">
              <MapPin className="size-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-['Vazirmatn'] font-bold text-base sm:text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                تغییر موقعیت مکانی
              </h3>
              <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                موقعیت کاری و استقرار فعلی خود را انتخاب کنید.
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

        {/* Options list */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar py-1">
          {locations.map((opt, i) => {
            const isSelected = currentLocation === opt;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onSaveLocation(opt);
                  onClose();
                }}
                className={`w-full text-right p-3.5 rounded-2xl border text-xs sm:text-sm font-['Vazirmatn'] transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.98] ${
                  isSelected
                    ? 'bg-[#666cff]/10 dark:bg-[#666cff]/20 border-[#666cff] text-[#666cff] dark:text-[#eaeafb] font-bold shadow-sm'
                    : 'bg-[#f4f5fa] dark:bg-[#282a40] border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50 text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#333650]'
                }`}
              >
                <span className="font-medium">{opt}</span>
                {isSelected && (
                  <div className="size-5 rounded-full bg-[#666cff] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="size-3 stroke-[2.5]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal footer */}
        <div className="flex justify-end gap-3 pt-3 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#eaeafb] rounded-full h-[38px] px-5 text-xs font-['Vazirmatn'] font-medium transition-all cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};
