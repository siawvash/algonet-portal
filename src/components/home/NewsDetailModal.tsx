import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Tag, User, Clock, Share2 } from 'lucide-react';
import { NewsItem } from './NewsSlider';

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ news, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (news) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [news, onClose]);

  if (!news || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col text-[#1e1e2d] dark:text-[#eaeafb] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with close button */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#30334e] via-transparent to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 size-9 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/90 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            title="بستن"
          >
            <X className="size-5" />
          </button>

          {/* Category & Date on Image */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-[#34364d]/90 border border-[#e0e2ec] dark:border-[#42455f] text-xs font-['Vazirmatn'] font-medium text-[#666cff] backdrop-blur-md flex items-center gap-1.5 shadow-sm">
              <Tag className="size-3" />
              <span>{news.category}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-['Vazirmatn'] text-[#8386a1] backdrop-blur-md flex items-center gap-1">
              <Calendar className="size-3" />
              <span>{news.date}</span>
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <h2 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#1e1e2d] dark:text-[#eaeafb] leading-snug">
            {news.title}
          </h2>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] pb-3 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5 text-[#666cff]" />
              <span>{news.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-[#666cff]" />
              <span>مدت زمان مطالعه: {news.readTime}</span>
            </span>
          </div>

          {/* Summary Callout */}
          <div className="p-4 rounded-2xl bg-[#f4f5fa] dark:bg-[#34364d] border-r-4 border-[#666cff] border border-[#e0e2ec] dark:border-[#3d3f59] text-xs sm:text-sm font-['Vazirmatn'] text-[#1e1e2d] dark:text-[#eaeafb] leading-relaxed">
            {news.summary}
          </div>

          {/* Full Content */}
          <div className="font-['Vazirmatn'] font-normal text-sm sm:text-base text-[#4b4e6d] dark:text-[#c7c6d4] leading-[1.9] whitespace-pre-line pt-2">
            {news.fullContent}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f8f9fd] dark:bg-[#282a42] flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: news.title, text: news.summary, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('لینک خبر در کلیپ‌بورد کپی شد.');
              }
            }}
            className="flex items-center gap-2 text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] transition-colors cursor-pointer"
          >
            <Share2 className="size-4" />
            <span>اشتراک‌گذاری خبر</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#666cff] text-white font-bold text-xs font-['Vazirmatn'] hover:bg-[#5b60e5] shadow-[0_4px_14px_rgba(102,108,255,0.35)] transition-colors cursor-pointer"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
