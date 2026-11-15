import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)] z-10 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 my-auto`}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-black/10 dark:bg-white/20 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
          <div>
            {title && <h3 className="text-lg font-bold text-[#1e1e2d] dark:text-[#eaeafb]">{title}</h3>}
            {subtitle && <p className="text-xs text-[#62657a] dark:text-[#8386a1] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#e0e2ec] dark:border-[#42455f] flex items-center justify-center text-[#62657a] dark:text-[#8386a1] hover:bg-[#f4f5fa] dark:hover:bg-[#34364d] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
