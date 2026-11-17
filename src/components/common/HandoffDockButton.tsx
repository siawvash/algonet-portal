import React from 'react';
import { Layers, Code2, ArrowRight, Sparkles } from 'lucide-react';

interface HandoffDockButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export const HandoffDockButton: React.FC<HandoffDockButtonProps> = ({
  isActive,
  onToggle
}) => {
  return (
    <aside
      aria-label="دسترسی سریع به هندآف فیگما"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 group pointer-events-auto select-none"
    >
      <button
        type="button"
        onClick={onToggle}
        className={`relative flex items-center gap-3 py-3 pl-3 pr-4.5 rounded-r-2xl border-y border-r transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.25)] ${
          isActive
            ? 'translate-x-0 bg-[#666cff] text-white border-[#8c90ff] shadow-[0_0_24px_rgba(102,108,255,0.6)]'
            : '-translate-x-[calc(100%-44px)] hover:translate-x-0 bg-[#1e1e2d]/95 dark:bg-[#282a3f]/95 text-white border-[#666cff]/40 hover:border-[#666cff] hover:shadow-[0_8px_32px_rgba(102,108,255,0.45)] backdrop-blur-md'
        }`}
        title={isActive ? 'بازگشت به پورتال' : 'مشاهده فایل هندآف دیزاین فیگما'}
      >
        {/* Figma Official 5-Color Vector Logo */}
        <div className="size-8 rounded-xl bg-black/30 dark:bg-black/40 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform relative">
          <svg
            className="size-5"
            viewBox="0 0 38 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
              fill="#1ABCFE"
            />
            <path
              d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
              fill="#0ACF83"
            />
            <path
              d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
              fill="#FF7262"
            />
            <path
              d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
              fill="#F24E1E"
            />
            <path
              d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
              fill="#A259FF"
            />
          </svg>

          {/* Green Pulse indicator for Figma "Dev Ready" */}
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-[#10b981] ring-2 ring-[#1e1e2d] shadow-[0_0_8px_#10b981] animate-pulse" />
        </div>

        {/* Text Section (Revealed fully on hover or active) */}
        <div className="flex flex-col items-start text-left whitespace-nowrap pl-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-wide font-sans text-white">
              Handoff
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/15 text-white/90 font-semibold border border-white/10">
              DEV
            </span>
          </div>
          <span className="text-[11px] font-['Vazirmatn'] text-[#8c90ff] dark:text-[#a5a9ff] group-hover:text-white transition-colors">
            {isActive ? 'بازگشت به پورتال ✕' : 'اسپک فیگما برای فرانت‌اند'}
          </span>
        </div>

        {/* Small arrow indicator */}
        <div className="size-5 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0">
          <Code2 className="size-3" />
        </div>
      </button>
    </aside>
  );
};
